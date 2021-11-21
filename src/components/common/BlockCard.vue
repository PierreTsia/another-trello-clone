<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BlockCard',
  props: {
    block: { type: Object, default: () => ({ label: '' }) },
    animateDirection: { type: String, default: 'up' },
  },
});
</script>

<template>
  <div
    class="
      animate-animated animate-faster
      bg-white
      p-2
      rounded
      mt-1
      border-b border-grey
      cursor-pointer
      text-sm text-grey-darker
      hover:bg-grey-lighter
    "
    :class="{
      'animate-slideInLeft': animateDirection === 'left',
      'animate-slideInUp': animateDirection === 'up',
    }"
  >
    {{ block.label }}
  </div>
</template>
