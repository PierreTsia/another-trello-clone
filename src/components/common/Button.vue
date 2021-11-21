<script lang="ts">
import { defineComponent } from 'vue';
import { useColors } from '/@/composables/useColors';
import { ColorName } from '/@/styles/colors.constant';

export default defineComponent({
  name: 'Button',
  props: {
    color: {
      type: String,
      default: ColorName.Blue,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: ColorName.White,
    },
    fontBold: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { colorName } = useColors();
    return {
      colorName,
    };
  },
});
</script>

<template>
  <button
    class="btn btn-rounded"
    :class="{
      'p-2': !isSmall,
      'btn-disabled': isDisabled,
      'font-bold': fontBold,
      'bg-grey-light': color === colorName.GreyLight,
      'hover:bg-grey': color === colorName.GreyLight,
      'btn-blue': color === colorName.Blue,
      'btn-blue-light': color === colorName.BlueLight,
      'btn-blue-dark': color === colorName.BlueDark,
      'btn-blue-darker': color === colorName.BlueDarker,
      'btn-red': color === colorName.Red,
      'text-white': textColor === colorName.White,
    }"
  >
    <slot />
  </button>
</template>

<style>
.btn {
  @apply text-sm flex justify-items-center items-center;
}
.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.btn-rounded {
  @apply rounded focus:ring-0 focus:outline-none;
}
.btn-red {
  @apply bg-red hover:bg-red-light;
}
.btn-blue {
  @apply bg-blue hover:bg-blue-light focus:ring-color-blue-light;
}
.btn-blue-light {
  @apply bg-blue-light hover:bg-blue-lighter focus:bg-blue-lighter focus:ring-color-blue-lighter;
}

.btn-blue-dark {
  @apply bg-blue-dark hover:bg-blue focus:bg-blue focus:ring-color-blue;
}

.btn-blue-darker {
  @apply bg-blue-darker hover:bg-blue-grey focus:bg-blue-grey focus:ring-color-blue-grey;
}
</style>
