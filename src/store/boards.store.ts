import { defineStore } from 'pinia';
import { BoardService } from '/@/api/services/board.service';
import { BoardDto } from '/@/dtos/board.dto';
import { plainToClass } from 'class-transformer';
import { CreateListDto, ListDto } from '/@/dtos/list.dto';

interface BoardState {
  boards: BoardDto[];
  board: BoardDto | null;
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
    };
  },

  getters: {
    currentBoard: (state: BoardState): BoardDto | null => state.board,
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
  },
});
