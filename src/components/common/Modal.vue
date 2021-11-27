<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useModal } from '/@/store/modal.store';
import { storeToRefs } from 'pinia';
import EditBlockModal from '/@/components/modals/EditBlockModal.vue';
import { useMagicKeys } from '@vueuse/core';

export default defineComponent({
  name: 'Modal',
  components: { EditBlockModal },
  setup() {
    const modalStore = useModal();
    const { closeModal } = modalStore;

    const { activeModalName, isOpened, modalProps } = storeToRefs(modalStore);

    const { backspace, enter } = useMagicKeys();

    watch(backspace, () => {
      if (isOpened.value) {
        modalProps.value?.onCancel();
      }
    });
    watch(enter, () => {
      if (isOpened.value) {
        modalProps.value?.onConfirm();
      }
    });

    return { closeModal, activeModalName, isOpened, modalProps };
  },
});
</script>

<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="modal-container">
      <div
        class="modal-overlay animate-animated animate-fadeIn animate-faster"
        aria-hidden="true"
      />

      <component
        :is="activeModalName"
        class="
          modal-card
          animate-animated animate-zoomIn animate-delay-100 animate-faster
        "
        :class="activeModalName"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  @apply min-h-screen flex flex-col items-center justify-start  py-12 md:py-0;
}

.modal-overlay {
  @apply fixed inset-0  bg-gray-900 bg-opacity-75  transition-opacity;
}

.modal-card {
  @apply bg-grey-light  min-h-75  mt-40  lg:mt-60  rounded-sm  text-left  shadow-xl  transform  transition-all;
}

.edit-block-modal {
}
</style>
