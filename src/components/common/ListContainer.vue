<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import BlockCard from '/@/components/common/BlockCard.vue';

export default defineComponent({
  name: 'ListContainer',
  components: {
    Icon,
    BlockCard,
  },
  props: {
    list: { type: Object, default: () => ({ label: 'New landing page' }) },
  },
});
</script>

<template>
  <div class="rounded bg-grey-light flex-no-shrink w-72 p-2 mr-3">
    <div class="flex justify-between py-1">
      <slot name="header" />
    </div>
    <slot name="blocks" />
    <p class="mt-3 text-grey-dark">Add a card...</p>
  </div>
</template>
