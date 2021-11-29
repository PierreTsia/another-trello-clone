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
    textValue: {
      type: String,
      default: '',
    },

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
  emits: ['onChange'],

  setup(_, { emit }) {
    const colors = ColorName;

    const emitOnChange = (e: any) => {
      emit('onChange', e?.target?.value);
    };

    return {
      colors,
      emitOnChange,
    };
  },
});
</script>

<template>
  <div class="relative flex w-full flex-wrap items-stretch">
    <span
      class="h-full leading-snug font-normal text-center absolute bg-transparent rounded text-base items-center justify-center w-6 pt-2 px-2"
      :class="{
        'text-grey-dark': textColor === colors.GreyDark,
        'text-white': textColor === colors.White,
      }"
    >
      <Icon
        v-if="withIcon"
        :icon="icon"
        :color="textColor"
        height="10"
        :rotate="rotateIcon ? 1 : 0"
      />
    </span>
    <input
      type="text"
      :placeholder="placeholder"
      :value="textValue"
      @input="emitOnChange($event)"
      class="px-1 py-1 relative bg-transparent rounded text-xs border outline-none focus:outline-none focus:ring w-full"
      :class="{
        'pl-6': withIcon,
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
