<script lang="ts">
import { defineComponent } from 'vue';
import { useModal } from '/@/store/modal.store';
import TopBar from '/@/components/top-bar/TopBar.vue';
import Modal from '/@/components/common/Modal.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Dashboard',
  components: {
    TopBar,
    Modal,
  },
  setup() {
    const modalStore = useModal();
    const { isOpened } = storeToRefs(modalStore);

    return {
      isOpened,
    };
  },
});
</script>
<template>
  <div class="h-screen w-full bg-blue font-sans flex flex-col">
    <TopBar />
    <div class="flex-1">
      <slot />
    </div>

    <Modal v-show="isOpened" />
  </div>
</template>
