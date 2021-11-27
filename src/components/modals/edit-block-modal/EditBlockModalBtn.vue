<script>
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import { useColors } from '../../../composables/useColors';

export default defineComponent({
  name: 'EditBlockModalBtn',
  components: { Icon },
  props: {
    icon: {
      type: String,
      default: 'line-md:account',
    },
  },
  setup() {
    const { colorValues } = useColors();
    return { colorValues };
  },
});
</script>
<template>
  <button
    type="button"
    class="
      flex
      items-center
      bg-grey bg-opacity-20
      hover:bg-opacity-30
      w-full
      py-1
      px-2
      rounded-md
      text-left text-sm text-grey-darker
    "
  >
    <Icon
      :icon="icon"
      :color="colorValues['grey-dark']"
      height="16"
      class="mr-2"
    />
    <slot />
  </button>
</template>
