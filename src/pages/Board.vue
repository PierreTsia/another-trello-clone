<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';

import Dashboard from '/@/layouts/Dashboard.vue';
import ListContainer from '/@/components/common/ListContainer.vue';
import TextInput from '/@/components/common/TextInput.vue';
import DropDown from '/@/components/common/DropDown.vue';
import ContextualMenu from '/@/components/common/ContextualMenu.vue';
import Button from '/@/components/common/Button.vue';
import CardItem from '/@/components/common/CardItem.vue';
import CreateCardInput from '/@/components/CreateCardInput.vue';
import ListEditor from '/@/components/ListEditor.vue';
import { Icon } from '@iconify/vue';
import { useBoards } from '/@/store/boards.store';
import { useAuth } from '/@/store/auth.store';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useColors } from '/@/composables/useColors';
import { useModal, ModalName } from '/@/store/modal.store';

export default defineComponent({
  name: 'Board',
  components: {
    Icon,
    Dashboard,
    ListContainer,
    TextInput,
    DropDown,
    Button,
    ContextualMenu,
    CardItem,
    CreateCardInput,
    ListEditor,
  },
  setup() {
    const boardsStore = useBoards();
    const { currentBoard, cardsByListId } = storeToRefs(boardsStore);
    const { fetchBoard, fetchBoardLists, createList, archiveList, createCard } =
      boardsStore;

    const draftList = ref<{ board: number; name: string } | null>(null);

    const authStore = useAuth();
    const { getCurrentUser } = authStore;

    const route = useRoute();
    const { colorValues, colorName } = useColors();

    const { openModal, closeModal } = useModal();

    const draftCard = ref<{ listId: number; name: string } | null>(null);

    const openEditBlockModal = (card: any) => {
      openModal(ModalName.EditBlock, {
        payload: card,
        onConfirm: () => {
          closeModal();
        },
        onCancel: closeModal,
      });
    };

    const isEditMode = (listId?: number): boolean => {
      return !!(draftCard.value && draftCard.value?.listId === listId);
    };

    const insertBlock = () => {
      if (!draftCard.value) return;
      draftCard.value = null;
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

    const validateDraftList = async () => {
      if (!draftList.value) return;
      const highestListIndex =
        currentBoard.value?.lists.reduce(
          (acc, list) => (list.index > acc ? list.index : acc),
          0,
        ) ?? 0;
      await createList({
        ...draftList.value,
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

    onBeforeMount(async () => {
      fetchBoard(+route.params.id);
      fetchBoardLists(+route.params.id);
      getCurrentUser();
    });

    return {
      currentBoard,
      isListEdited,
      colorName,
      colorValues,
      draftCard,
      draftList,
      createDraftCard,
      isEditMode,
      editDraftCard,
      canValidate,
      insertBlock,
      openEditBlockModal,
      onCreateNewList,
      validateDraftList,
      onInputListChange,
      handleArchiveClick,
      validateDraftCard,
      cardsByListId,
    };
  },
});
</script>

<template>
  <Dashboard>
    <div
      id="board-container"
      v-if="currentBoard"
      class="h-full flex px-4 pb-8 items-start overflow-x-scroll"
    >
      <ListContainer
        v-for="list in currentBoard.lists"
        :list="list"
        :key="list.id"
        :is-edit-mode="isEditMode(list.id)"
        :can-validate="canValidate(list.id)"
        @onCreateNewClick="createDraftCard"
        @onCancel="draftCard = null"
        @onValidate="validateDraftCard(list.id)"
      >
        <template v-slot:header>
          <h3 class="text-sm font-bold">{{ list.name }}</h3>

          <DropDown ref="dropDownRef">
            <template v-slot:activator>
              <Button :color="colorName.GreyLight" class="w-6 h-6" is-small>
                <Icon
                  icon="bi:three-dots"
                  :color="colorValues['grey-dark']"
                  class="mx-auto"
              /></Button>
            </template>
            <template v-slot:content>
              <ContextualMenu @onArchiveClick="handleArchiveClick(list.id)">
                <template v-slot:menu-top-bar> Header </template>
              </ContextualMenu>
            </template>
          </DropDown>
        </template>

        <template v-slot:blocks>
          <CardItem
            v-for="(card, cardIndex) in cardsByListId(list.id)"
            :card="card"
            :key="`card__${cardIndex}`"
            @click.native="openEditBlockModal(card)"
          />
          <CreateCardInput
            v-if="isEditMode(list.id)"
            @onChange="editDraftCard"
          />
        </template>
      </ListContainer>
      <Button
        v-if="!isListEdited"
        color="blue-light"
        @click="onCreateNewList"
        class="h-9 mr-2 mb-2 md:mb-0"
      >
        <Icon icon="akar-icons:plus" class="mr-1" :color="colorValues.white" />
        <h3 class="text-white text-sm font-bold text-center px-2">
          Ajouter une autre liste
        </h3>
      </Button>

      <ListEditor
        v-else
        :list="draftList"
        @onCancel="draftList = null"
        @onValidate="validateDraftList"
        @onChange="onInputListChange"
      />
    </div>
  </Dashboard>
</template>

<style>
#board-container::-webkit-scrollbar {
  display: none;
}
</style>
