interface Block {
  _id: string;
  label: string;
}

interface List {
  _id: string;
  label: string;
  blocks: Block[];
}

interface Board {
  id: string;
  name: string;
  description: string;
  lists?: List[];
}

const MOCK_BLOCKS: Block[] = [
  {
    _id: 'block_1',
    label:
      "Ceci est une carte. Faites la glisser vers « Trucs Essayés » pour montrer que c'est terminé.",
  },
  {
    _id: 'block_2',
    label: 'Block 2',
  },
  {
    _id: 'block_3',
    label: 'Block 3',
  },
  {
    _id: 'block_4',
    label: 'Block 4',
  },
  {
    _id: 'block_5',
    label: 'Block 5',
  },
  {
    _id: 'block_6',
    label: 'Block 6',
  },
  {
    _id: 'block_7',
    label: 'Block 7',
  },
  {
    _id: 'block_8',
    label: 'Block 8',
  },
];

const MOCK_BOARDS: Board[] = [
  {
    id: '1',
    name: 'Board 1',
    description: 'This is the first board',
    lists: [
      {
        _id: 'list1',
        label: 'List 1',
        blocks: MOCK_BLOCKS,
      },
      {
        _id: 'list2',
        label: 'List 2',
        blocks: [],
      },
      {
        _id: 'list3',
        label: 'List 3',
        blocks: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Board 2',
    description: 'This is the second board',
  },
  {
    id: '3',
    name: 'Board 3',
    description: 'This is the third board',
  },
];

export async function getBoardById(boardId: string): Promise<any | null> {
  try {
    return MOCK_BOARDS.find(board => board.id === boardId);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

export async function getBoards(): Promise<any[]> {
  try {
    return MOCK_BOARDS;
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}
