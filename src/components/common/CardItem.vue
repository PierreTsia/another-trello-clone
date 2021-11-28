<script lang="ts">
import { defineComponent } from 'vue';
import { IconDelete } from '/@/components/common/icons/index.icons';

import ContextualMenu from '/@/components/common/ContextualMenu.vue';
import DropDown from '/@/components/common/DropDown.vue';

import { useCards } from '/@/composables/useCards';

export default defineComponent({
  name: 'CardItem',
  components: {
    IconDelete,
    ContextualMenu,
    DropDown,
  },
  props: {
    card: { type: Object, default: () => ({ name: '' }) },
    animateDirection: { type: String, default: 'up' },
  },

  setup() {
    const { deleteCard } = useCards();
    return { deleteCard };
  },
});
</script>

<template>
  <div
    class="flex justify-between items-start group animate-animated animate-faster bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer text-sm text-grey-darker hover:bg-grey-lighter"
    :class="{
      'animate-slideInLeft': animateDirection === 'left',
      'animate-slideInUp': animateDirection === 'up',
    }"
  >
    <h1 class="min-h-7" @click="$emit('onEditClick')">
      {{ card.name }}
    </h1>

    <span
      class="h-8 w-8 opacity-0 flex items-center group-hover:(opacity-100 animate-animated animate-bounceIn) hover:text-red-dark rounded-full hover:bg-grey-light"
      @click="$emit('onDeleteClick')"
    >
      <IconDelete class="h-3 w-3 mx-auto" />
    </span>
  </div>
</template>
