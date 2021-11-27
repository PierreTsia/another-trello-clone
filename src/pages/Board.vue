<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';

import Dashboard from '/@/layouts/Dashboard.vue';
import ListContainer from '/@/components/common/ListContainer.vue';
import TextInput from '/@/components/common/TextInput.vue';
import DropDown from '/@/components/common/DropDown.vue';
import ContextualMenu from '/@/components/common/ContextualMenu.vue';
import Button from '/@/components/common/Button.vue';
import BlockCard from '/@/components/common/BlockCard.vue';
import CreateBlockInput from '/@/components/CreateBlockInput.vue';
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
    BlockCard,
    CreateBlockInput,
  },
  setup() {
    const boardsStore = useBoards();
    const { fetchBoard, fetchBoardLists } = boardsStore;

    const authStore = useAuth();
    const { getCurrentUser } = authStore;

    const route = useRoute();
    const { colorValues, colorName } = useColors();

    const { openModal, closeModal } = useModal();

    const openEditBlockModal = (block: any) => {
      openModal(ModalName.EditBlock, {
        payload: block,
        onConfirm: () => {
          console.log('coucou');
          closeModal();
        },
        onCancel: closeModal,
      });
    };

    const isEditMode = (listId?: number): boolean => {
      return !!(
        listId &&
        listId > 0 &&
        draftBlock.value &&
        draftBlock.value?.listId === listId
      );
    };

    const insertBlock = () => {
      if (!draftBlock.value) return;
      draftBlock.value = null;
    };

    const canValidate = (listId: number) => {
      return !!(isEditMode(listId) && draftBlock.value?.label?.length);
    };
    const draftBlock = ref<{ listId: number; label: string } | null>(null);
    const createDraftBlock = (listId: number) => {};

    const editDraftBlock = (content: string) => {
      if (draftBlock.value) {
        draftBlock.value.label = content;
      }
    };

    onBeforeMount(async () => {
      fetchBoard(+route.params.id);
      fetchBoardLists(+route.params.id);
      getCurrentUser();
    });

    const listMenuItems = [
      {
        label: 'Add List',
        handler: () => {
          console.log('Add List');
        },
      },
      {
        label: 'Archive',
        handler: () => {
          console.log('Archive');
        },
      },
    ];

    const { board } = storeToRefs(boardsStore);

    return {
      board,
      colorName,
      colorValues,
      listMenuItems,
      draftBlock,
      createDraftBlock,
      isEditMode,
      editDraftBlock,
      canValidate,
      insertBlock,
      openEditBlockModal,
    };
  },
});
</script>

<template>
  <Dashboard>
    <div
      id="board-container"
      v-if="board"
      class="h-full flex px-4 pb-8 items-start overflow-x-scroll"
    >
      <ListContainer
        v-for="list in board.lists"
        :list="list"
        :key="list.id"
        :is-edit-mode="isEditMode(list.id)"
        :can-validate="canValidate(list.id)"
        @onCreateNewClick="createDraftBlock"
        @onCancel="draftBlock = null"
        @onValidate="insertBlock"
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
              <ContextualMenu :items="listMenuItems">
                <template v-slot:menu-top-bar> Header </template>
              </ContextualMenu>
            </template>
          </DropDown>
        </template>

        <template v-slot:blocks>
          <BlockCard
            v-for="(block, blockIndex) in list.cards"
            :block="block"
            :key="`block__${blockIndex}`"
            @click.native="openEditBlockModal(block)"
          />
          <CreateBlockInput
            v-if="isEditMode(list.id)"
            @onChange="editDraftBlock"
          />
        </template>
      </ListContainer>
    </div>
  </Dashboard>
</template>

<style>
#board-container::-webkit-scrollbar {
  display: none;
}
</style>
