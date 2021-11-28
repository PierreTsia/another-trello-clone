<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
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
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useColors } from '/@/composables/useColors';
import { useModal, ModalName } from '/@/store/modal.store';
import { useCards } from '/@/composables/useCards';
import { useCreateList } from '/@/composables/useCreateList';

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
    const route = useRoute();
    const boardsStore = useBoards();
    const { currentBoard, cardsByListId } = storeToRefs(boardsStore);
    const { fetchBoard, fetchBoardLists } = boardsStore;

    const { colorValues, colorName } = useColors();

    const { openModal, closeModal } = useModal();

    const {
      draftCard,
      editDraftCard,
      createDraftCard,
      canValidate,
      isEditMode,
      validateDraftCard,
      deleteCard,
    } = useCards();

    const {
      draftList,
      validateDraftList,
      onInputListChange,
      onCreateNewList,
      isListEdited,
      handleArchiveClick,
    } = useCreateList();

    const openEditBlockModal = (card: any) => {
      openModal(ModalName.EditBlock, {
        payload: card,
        onConfirm: () => {
          closeModal();
        },
        onCancel: closeModal,
      });
    };

    onBeforeMount(async () => {
      fetchBoard(+route.params.id);
      fetchBoardLists(+route.params.id);
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
      openEditBlockModal,
      onCreateNewList,
      validateDraftList,
      onInputListChange,
      handleArchiveClick,
      validateDraftCard,
      cardsByListId,
      deleteCard,
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
        class="min-w-64"
      >
        <template v-slot:header>
          <h3 class="text-sm font-bold">{{ list.name }}</h3>

          <DropDown ref="" class="relative">
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
            @onEditClick="openEditBlockModal(card)"
            @onDeleteClick="deleteCard(card.id, list.id)"
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
        <h3
          class="text-white text-sm font-bold text-center px-2 whitespace-nowrap"
        >
          Ajouter une autre liste
        </h3>
      </Button>

      <ListEditor
        v-else
        :list="draftList"
        @onCancel="draftList = null"
        @onValidate="validateDraftList"
        @onChange="onInputListChange"
        class="min-w-64"
      />
    </div>
  </Dashboard>
</template>

<style>
#board-container::-webkit-scrollbar {
  display: none;
}
</style>
