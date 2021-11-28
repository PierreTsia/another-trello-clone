import { defineStore } from 'pinia';
import { BoardService } from '/@/api/services/board.service';
import { BoardDto } from '/@/dtos/board.dto';
import { plainToClass } from 'class-transformer';
import { CreateListDto, ListDto } from '/@/dtos/list.dto';
import { CardDto, CreateCardDto } from '/@/dtos/card.dto';

interface BoardState {
  boards: BoardDto[];
  board: BoardDto | null;
  cardsByList: Map<number, CardDto[] | null>;
}

type CreateListPayload = {
  board: number;
  name: string;
  description: string;
  index: number;
};
export const useBoards = defineStore('boards', {
  state: (): BoardState => {
    return {
      board: null,
      boards: [],
      cardsByList: new Map(null),
    };
  },

  getters: {
    currentBoard: (state: BoardState): BoardDto | null => state.board,
    cardsByListId:
      (state: BoardState) =>
      (listId: number): CardDto[] =>
        state.cardsByList.get(listId) ?? [],
  },

  actions: {
    async fetchBoards() {
      const api = BoardService.getInstance();
      this.boards = await api.getBoards();
    },
    async fetchBoard(boardId: number) {
      const api = BoardService.getInstance();
      this.board = await api.getBoard(boardId);
    },
    async fetchBoardLists(boardId: number) {
      const api = BoardService.getInstance();
      const lists = await api.getListsByBoardId(boardId);
      lists.forEach((list: ListDto) => {
        this.cardsByList.set(
          list.id,
          list?.cards?.filter(c => !c.archived) ?? [],
        );
      });
      if (this.board?.id === boardId) {
        this.board.lists = lists;
      }
    },

    async createBoard(boardName: string, userId: number) {
      const api = BoardService.getInstance();
      const board = await api.createBoard(boardName, userId);
      this.boards.push(board);
    },

    async createList(payload: CreateListPayload) {
      const api = BoardService.getInstance();

      const res = await api.createList(
        plainToClass(CreateListDto, payload, { excludeExtraneousValues: true }),
      );

      if (this.board?.lists.length) {
        this.board.lists.push(
          plainToClass(ListDto, res, { excludeExtraneousValues: true }),
        );
      }
    },

    async archiveList(listId: number) {
      const api = BoardService.getInstance();
      const success = await api.archiveList(listId);
      if (success && this.board?.lists) {
        this.board.lists = this.board?.lists.filter(list => list.id !== listId);
      }
    },

    async createCard(listId: number, cardName: string) {
      const api = BoardService.getInstance();

      const allCards = this.cardsByListId(listId);
      const highestIndex =
        allCards?.reduce((acc, curr) => Math.max(acc, curr.index), 0) ?? 0;

      const payload = plainToClass(CreateCardDto, {
        list: listId,
        name: cardName,
        index: highestIndex + 1000000,
      });
      const res = await api.createCard(payload);

      if (this.cardsByList.get(listId)) {
        this.cardsByList.set(listId, [
          plainToClass(CardDto, res, { excludeExtraneousValues: true }),
          ...this.cardsByList.get(listId)!,
        ]);
      }
    },
  },
});
