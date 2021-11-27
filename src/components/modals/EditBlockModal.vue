<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import { useColors } from '/@/composables/useColors';
import { useModal } from '/@/store/modal.store';
import BlockContent from '/@/components/modals/edit-block-modal/BlockContent.vue';
import EditBlockModalBtn from '/@/components/modals/edit-block-modal/EditBlockModalBtn.vue';

export default defineComponent({
  name: 'EditBlockModal',
  components: { Icon, BlockContent, EditBlockModalBtn },
  setup() {
    const { colorValues } = useColors();
    const { closeModal } = useModal();
    return {
      closeModal,
      colorValues,
    };
  },
});
</script>

<template>
  <div class="edit-block-modal">
    <div class="relative flex w-full">
      <span class="w-1/8 pl-2 pt-3">
        <Icon
          icon="bi:card-heading"
          :color="colorValues['grey-dark']"
          height="24"
          class="mr-2"
        />
      </span>
      <div class="w-7/8 flex flex-col">
        <h1 class="main-title w-full mb-1 !leading-4">
          Vous pouvez voir l'activité d'un tableau et bien plus encore
        </h1>
        <h2 class="w-full text-sm text-grey-dark text-sm">sous titre</h2>
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
        <BlockContent />
        <BlockContent icon="mdi:checkbox-marked-outline" title="Checkbox" />
        <BlockContent icon="grommet-icons:list" title="Activités" />
      </div>
      <aside class="col-span-12 md:col-span-4">
        <h3 class="text-sm text-grey-dark mb-2">Ajouter à la carte</h3>
        <EditBlockModalBtn class='mb-2'> Membres </EditBlockModalBtn>
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
  text-lg
  font-bold
  pr-4
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
