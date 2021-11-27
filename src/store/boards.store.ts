import { defineStore } from 'pinia';
import { BoardService } from '/@/api/services/board.service';
import { BoardDto } from '/@/types/board.dto';

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

    async saveBlock(block: { listId: string; label: string }) {},
  },
});
