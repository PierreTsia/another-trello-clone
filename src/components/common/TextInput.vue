<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import { ColorName } from '/@/styles/colors.constant';

export default defineComponent({
  name: 'TextInput',
  components: {
    Icon,
  },
  props: {
    withIcon: {
      type: Boolean,
      default: true,
    },
    textColor: {
      type: String,
      default: ColorName.GreyDark,
    },
    icon: {
      type: String,
      default: 'fa-solid:lock',
    },
    placeholder: {
      type: String,
      default: 'Placeholder...',
    },
    rotateIcon: {
      type: Boolean,
      default: false,
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
  <div class="relative flex w-full flex-wrap items-stretch">
    <span
      class="
        z-10
        h-full
        leading-snug
        font-normal
        absolute
        text-center
        absolute
        bg-transparent
        rounded
        text-base
        items-center
        justify-center
        w-8
        py-1
        bottom-0.5
      "
      :class="{
        'text-grey-dark': textColor === colors.GreyDark,
        'text-white': textColor === colors.White,
      }"
    >
      <Icon
        :icon="icon"
        :color="textColor"
        height="12"
        :rotate="rotateIcon ? 1 : 0"
      />
    </span>
    <input
      type="text"
      :placeholder="placeholder"
      class="
        px-1
        py-1
        relative
        bg-transparent
        rounded
        text-xs
        border
        outline-none
        focus:outline-none focus:ring
        w-full
        pl-8
      "
      :class="{
        'border-grey-dark': textColor === colors.GreyDark,
        'border-white': textColor === colors.White,
        'text-white': textColor === colors.White,
        'text-grey-dark': textColor === colors.GreyDark,
        'placeholder-grey-dark': textColor === colors.GreyDark,
        'placeholder-white': textColor === colors.White,
      }"
    />
  </div>

  <!--


  -->
</template>
