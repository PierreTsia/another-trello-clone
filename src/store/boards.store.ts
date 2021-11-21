import { defineStore } from 'pinia';
import { getBoards, getBoardById, List } from '/@/api/boards.api';

interface BoardState {
  boards: any[];
  board: any;
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
      this.boards = await getBoards();
    },
    async fetchBoard(boardId: string) {
      this.board = await getBoardById(boardId);
    },

    async saveBlock(block: { listId: string; label: string }) {
      const listToUpdate = this.board.lists.find(
        (list: List) => list._id === block.listId,
      );
      if (listToUpdate) {
        listToUpdate.blocks.push(block);
      }
    },
  },
});
