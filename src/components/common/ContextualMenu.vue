<script lang="ts">
import { defineComponent } from 'vue';

interface MenuItem {
  label: string;
  handler?: () => any;
}

export default defineComponent({
  name: 'ContextualMenu',
  props: { items: { type: Object, default: () => [] as MenuItem[] } },
});
</script>

<template>
  <h3 class="header">
    <slot name="menu-top-bar" />
  </h3>
  <ul>
    <li
      v-for="(item, i) in items"
      :key="i"
      class="
        cursor-pointer
        text-sm
        py-2
        px-4
        font-normal
        block
        hover:bg-grey-light
        w-full
        whitespace-nowrap
        bg-transparent
        text-blueGray-700
      "
      @click="item.handler"
    >
      {{ item.label }}
    </li>
  </ul>
</template>
<style scoped>
.header {
  @apply pt-2  pb-2  text-sm text-center text-grey-dark  border-b border-grey-light;
}
</style>
