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
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useColors } from '/@/composables/useColors';

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
    const { saveBlock, fetchBoard } = boardsStore;
    const route = useRoute();
    const { colorValues, colorName } = useColors();

    const isEditMode = (listId: string) => {
      return draftBlock.value && draftBlock.value?.listId === listId;
    };

    const insertBlock = () => {
      if (!draftBlock.value) return;
      saveBlock(draftBlock.value);
      draftBlock.value = null;
    };

    const canValidate = (listId: string) => {
      return !!(isEditMode(listId) && draftBlock.value?.label?.length);
    };
    const draftBlock = ref<{ listId: string; label: string } | null>(null);
    const createDraftBlock = (listId: string) => {
      draftBlock.value = {
        listId,
        label: '',
      };
    };

    const editDraftBlock = (content: string) => {
      console.log('coucou');
      if (draftBlock.value) {
        draftBlock.value.label = content;
      }
    };

    onBeforeMount(() => {
      fetchBoard(route.params.id as string);
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
        :is-edit-mode="isEditMode(list._id)"
        :can-validate="canValidate(list._id)"
        @onCreateNewClick="createDraftBlock"
        @onCancel="draftBlock = null"
        @onValidate="insertBlock"
      >
        <template v-slot:header>
          <h3 class="text-sm font-bold">{{ list.label }}</h3>

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
            v-for="(block, blockIndex) in list.blocks"
            :block="block"
            :key="`block__${blockIndex}`"
          />
          <CreateBlockInput
            v-if="isEditMode(list._id)"
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
