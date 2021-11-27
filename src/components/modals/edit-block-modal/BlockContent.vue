<script lang="ts">
import { defineComponent } from 'vue';
import { useColors } from '/@/composables/useColors';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'BlockContent',

  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      default: 'fluent:text-description-24-filled',
    },
    title: {
      type: String,
      default: 'Description',
    },
    content: {
      type: String,
      default: 'Test description',
    },
  },
  setup() {
    const { colorValues } = useColors();
    return { colorValues };
  },
});
</script>
<template>
  <div class="flex">
    <span class="w-1/8 pl-2 pt-4">
      <Icon
        :icon="icon"
        :color="colorValues['grey-dark']"
        height="24"
        class="mr-2"
      />
    </span>
    <div class="w-7/8 flex flex-col">
      <h4 class="pt-4 w-full text-md font-bold">{{ title }}</h4>
      <h5 class="pt-1 w-full text-sm text-grey-dark">{{ content }}</h5>
    </div>
  </div>
</template>
