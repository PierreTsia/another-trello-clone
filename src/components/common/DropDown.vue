<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createPopper } from '@popperjs/core';
import { onClickOutside } from '@vueuse/core';

export default defineComponent({
  name: 'DropDown',
  setup() {
    const dropdownRef = ref({} as HTMLElement);
    const activatorRef = ref({} as HTMLElement);
    const isVisible = ref(false);

    const toggleDropdown = () => {
      if (isVisible.value) {
        isVisible.value = false;
      } else {
        isVisible.value = true;
        createPopper(activatorRef.value, dropdownRef.value, {
          placement: 'bottom-start',
        });
      }

      onClickOutside(dropdownRef, () => {
        isVisible.value = false;
      });
    };

    return {
      dropdownRef,
      activatorRef,
      isVisible,
      toggleDropdown,
    };
  },
});
</script>

<template>
  <div class="flex flex-wrap">
    <div class="relative inline-flex align-middle w-full">
      <div ref="activatorRef" class="cursor-pointer" @click="toggleDropdown">
        <slot name="activator" />
      </div>
      <div
        :class="!isVisible ? 'hidden' : 'block'"
        class="
          animate-animated animate-faster animate-zoomIn
          drop-down-container
          w-64
        "
        ref="dropdownRef"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style>
.drop-down-container {
  @apply bg-white  z-50  text-base  list-none  text-left  rounded  shadow-lg  mt-1;
}
</style>
