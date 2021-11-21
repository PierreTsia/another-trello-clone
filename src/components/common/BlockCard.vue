<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BlockCard',
  props: { block: { type: Object, default: () => ({ label: '' }) } },
});
</script>

<template>
  <div
    class="
      animate-animated animate-delay1s animate-bounceInUp
      bg-white
      p-2
      rounded
      mt-1
      border-b border-grey
      cursor-pointer
      text-sm text-grey-darker
      hover:bg-grey-lighter
    "
  >
    {{ block.label }}
  </div>
</template>
