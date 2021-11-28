import { ref, Ref } from 'vue';
import { useBoards } from '/@/store/boards.store';

export interface CreateCardComposition {
  draftCard: Ref<DraftCard | null>;
  isEditMode: (listId: number) => boolean;
  canValidate: (listId: number) => boolean;
  createDraftCard: (listId: number) => void;
  editDraftCard: (content: string) => void;
  validateDraftCard: (listId: number) => Promise<void>;
}

type DraftCard = { listId: number; name: string };

export function useCreateCards(): CreateCardComposition {
  const draftCard = ref<DraftCard | null>(null);

  const { createCard } = useBoards();

  const isEditMode = (listId?: number): boolean => {
    return !!(draftCard.value && draftCard.value?.listId === listId);
  };

  const canValidate = (listId: number) => {
    return !!(isEditMode(listId) && draftCard.value?.name?.length);
  };

  const createDraftCard = (listId: number) => {
    draftCard.value = { listId, name: '' };
  };

  const editDraftCard = (content: string) => {
    if (draftCard.value) {
      draftCard.value.name = content;
    }
  };

  const validateDraftCard = async (listId: number) => {
    if (!draftCard.value?.name?.length) return;
    await createCard(listId, draftCard.value?.name);
    draftCard.value = null;
  };

  return {
    draftCard,
    isEditMode,
    canValidate,
    validateDraftCard,
    editDraftCard,
    createDraftCard,
  };
}
