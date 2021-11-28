import { computed, ComputedRef, ref, Ref } from 'vue';
import { useBoards } from '/@/store/boards.store';
import { storeToRefs } from 'pinia';

export interface CreatelistComposition {
  draftList: Ref<DraftList | null>;
  validateDraftList: () => Promise<void>;
  onInputListChange: (content: string) => void;
  onCreateNewList: () => void;
  isListEdited: ComputedRef<boolean>;
  handleArchiveClick: (listId: number) => Promise<void>;
}

type DraftList = { board: number; name: string };

export function useCreateList(): CreatelistComposition {
  const draftList = ref<DraftList | null>(null);
  const boardsStore = useBoards();
  const { currentBoard } = storeToRefs(boardsStore);
  const { createList, archiveList } = boardsStore;

  const validateDraftList = async () => {
    if (!draftList.value) return;
    const highestListIndex =
      currentBoard.value?.lists.reduce(
        (acc, list) => (list.index > acc ? list.index : acc),
        0,
      ) ?? 0;
    await createList({
      name: draftList.value?.name!,
      board: draftList.value?.board!,
      index: highestListIndex + 1_000_000,
      description: '',
    });
    draftList.value = null;
  };

  const onInputListChange = (content: string) => {
    if (draftList.value) {
      draftList.value.name = content;
    }
  };
  const onCreateNewList = () => {
    draftList.value = {
      board: currentBoard.value?.id!,
      name: '',
    };
  };

  const isListEdited = computed(() => {
    return !!draftList.value;
  });

  const handleArchiveClick = async (listId: number) => {
    await archiveList(listId);
  };

  return {
    draftList,
    validateDraftList,
    onInputListChange,
    onCreateNewList,
    isListEdited,
    handleArchiveClick,
  };
}
