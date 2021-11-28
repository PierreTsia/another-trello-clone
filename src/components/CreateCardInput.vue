<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'CreateCardInput',
  setup(props, { emit }) {
    const label = ref('');
    watch(label, newLabel => {
      emit('onChange', newLabel ?? '');
    });
    return {
      label,
    };
  },
});
</script>
<template>
  <div
    class="
      flex
      animate-animated animate-zoomIn animate-faster
      bg-white
      p-2
      rounded
      mt-1
      border-b border-grey
      cursor-pointer
      text-sm text-grey-darker
    "
  >
    <textarea
      placeholder="Code a trello clone..."
      class="block focus:ring-0 focus:outline-none rounded-md"
      style="width: 100%"
      v-model="label"
    ></textarea>
  </div>
</template>
