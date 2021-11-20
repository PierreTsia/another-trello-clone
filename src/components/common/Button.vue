<script lang="ts">
import { defineComponent } from 'vue';
import { ColorName } from '/@/styles/colors.constant';

export default defineComponent({
  name: 'Button',
  props: {
    color: {
      type: String,
      default: ColorName.Blue,
    },
    textColor: {
      type: String,
      default: ColorName.White,
    },
  },
  setup() {
    const colors = ColorName;
    return {
      colors,
    };
  },
});
</script>

<template>
  <button
    class="
      p-2
      rounded
      font-bold
      text-sm
      min-w-max
      w-full
      flex
      justify-items-center
      items-center
    "
    :class="{
      'bg-blue': color === colors.Blue,
      'bg-blue-light': color === colors.BlueLight,
      'bg-blue-dark': color === colors.BlueDark,
      'bg-red': color === colors.Red,
      'text-white': textColor === colors.White,
    }"
  >
    <slot />
  </button>
</template>
