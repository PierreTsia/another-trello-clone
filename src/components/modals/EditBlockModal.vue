<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { IconDescription } from '/@/components/common/icons/index.icons';
import { useColors } from '/@/composables/useColors';
import { useModal } from '/@/store/modal.store';
import { useBoards } from '/@/store/boards.store';
import EditBlockModalBtn from '/@/components/modals/edit-block-modal/EditBlockModalBtn.vue';
import TextInput from '/@/components/common/TextInput.vue';
import { storeToRefs } from 'pinia';
import { onClickOutside } from '@vueuse/core';

export default defineComponent({
  name: 'EditBlockModal',
  components: {
    Icon,
    EditBlockModalBtn,
    TextInput,
    IconDescription,
  },
  setup() {
    const { colorValues } = useColors();
    const { closeModal } = useModal();
    const boardsStore = useBoards();
    const { editCard } = boardsStore;
    const titleRef = ref({} as HTMLElement);
    const isTitleEdited = ref(false);
    const { editedCard } = storeToRefs(boardsStore);
    const draftTitle = ref(editedCard?.value?.name ?? '');

    onClickOutside(titleRef, async () => {
      if (isTitleEdited.value) {
        await editCard(editedCard?.value?.id!, {
          name: draftTitle.value,
        });
        isTitleEdited.value = false;
      }
    });
    return {
      closeModal,
      titleRef,
      colorValues,
      editedCard,
      draftTitle,
      isTitleEdited,
    };
  },
});
</script>

<template>
  <div class="edit-block-modal">
    <div v-if="editedCard" class="relative flex w-full">
      <span class="w-1/8 pl-2 pt-3">
        <Icon
          icon="bi:card-heading"
          :color="colorValues['grey-dark']"
          height="24"
          class="mr-2 relative -top-2"
        />
      </span>
      <div class="w-7/8 flex flex-col">
        <div class="" ref="titleRef">
          <h1
            v-if="!isTitleEdited"
            @click="isTitleEdited = true"
            class="main-title w-full mb-1 !leading-4 cursor-pointer"
          >
            {{ editedCard.name }}
          </h1>
          <TextInput
            v-else
            :with-icon="false"
            :text-value="editedCard.name"
            @on-change="e => (draftTitle = e)"
            class="max-w-7/8"
            @click.prevent
          />
        </div>

        <h2 class="w-full text-sm text-grey-dark text-sm">
          Dans la liste <strong>{{ editedCard.list?.name }}</strong>
        </h2>
        <span class="icon-close" @click="closeModal">
          <Icon
            icon="akar-icons:cross"
            class="cursor-pointer"
            :color="colorValues['grey-dark']"
          />
        </span>
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-8">
        <div class="flex">
          <span class="w-1/8 pl-2 pt-4">
            <IconDescription class="w-6" />
          </span>
          <div class="w-7/8 flex flex-col">
            <h4 class="pt-4 pl-6 w-full text-md font-bold">Description</h4>
            <h5 class="pt-1 w-full text-sm text-grey-dark">
              {{ editedCard?.description }}
            </h5>
          </div>
        </div>
      </div>
      <aside class="col-span-12 md:col-span-4">
        <h3 class="text-sm text-grey-dark mb-2">Ajouter à la carte</h3>
        <EditBlockModalBtn class="mb-2"> Membres </EditBlockModalBtn>
        <EditBlockModalBtn icon="fluent:tag-multiple-24-regular">
          Etiquettes
        </EditBlockModalBtn>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.icon-close {
  @apply absolute
  -right-3
  -top-3
  rounded-full
  h-8
  w-8
  hover:bg-grey
  flex
  items-center
  justify-center;
}

.main-title {
  @apply w-full
  text-xl
  font-bold
  flex
  items-center
  justify-start;
}

.edit-block-modal {
  @apply px-4
  pt-5
  pb-4
  sm:py-6 sm:px-4 sm:pb-4
  min-w-2/3
  lg:min-w-1/3
  xl:min-w-2/5;
}
</style>
