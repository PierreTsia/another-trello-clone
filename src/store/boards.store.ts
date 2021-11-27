import { defineStore } from 'pinia';
import { BoardService } from '/@/api/services/board.service';
import { BoardDto } from '/@/dtos/board.dto';


interface BoardState {
  boards: BoardDto[];
  board: BoardDto | null;
}

export const useBoards = defineStore('boards', {
  state: (): BoardState => {
    return {
      board: null,
      boards: [],
    };
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
  },
});
