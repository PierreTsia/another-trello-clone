<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContextualMenu',
  emits: ['onArchiveClick'],
  setup(_, { emit }) {
    const items = [
      {
        label: 'Add List',
        handler: () => {
          console.log('Add List');
        },
      },
      {
        label: 'Archive',
        handler: () => {
          emit('onArchiveClick');
        },
      },
    ];

    return { items };
  },
});
</script>

<template>
  <div class="w-64">
    <h3 class="header">
      <slot name="menu-top-bar" />
    </h3>
    <ul>
      <li
        v-for="(item, i) in items"
        :key="i"
        class="cursor-pointer text-sm py-2 px-4 font-normal block hover:bg-grey-light w-full whitespace-nowrap bg-transparent text-blueGray-700"
        @click="item.handler"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
.header {
  @apply pt-2  pb-2  text-sm text-center text-grey-dark  border-b border-grey-light;
}
</style>
