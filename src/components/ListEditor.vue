<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useColors } from '/@/composables/useColors';

export default defineComponent({
  name: 'ListEditor',
  components: {
    Icon,
  },
  setup(props, { emit }) {
    const { colorValues } = useColors();
    const name = ref('');

    watch(name, newName => {
      emit('onChange', newName ?? '');
    });
    return {
      name,
      colorValues,
    };
  },
});
</script>
<template>
  <div
    class="
      flex flex-col
      animate-animated animate-zoomIn animate-faster
      bg-white
      p-2
      rounded
      mt-1
      border-b border-grey
      cursor-pointer
      text-sm text-grey-darker
    "
  >
    <input
      placeholder="Code a trello clone..."
      class="block h-8 border-2 border-blue focus:outline-none rounded-md p-2"
      style="width: 100%"
      v-model="name"
    />
    <div class="flex items-center justify-start">
      <Button
        @click="$emit('onValidate')"
        color="blue-light"
        class="mr-2 mt-2 mb-2 w-3/4"
      >
        <Icon icon="akar-icons:plus" class="mr-1" color="white" />
        <span class="text-white text-xs text-left px-2">
          Ajouter une liste
        </span>
      </Button>

      <Icon
        icon="akar-icons:cross"
        class="cursor-pointer ml-1"
        width="20"
        :color="colorValues['grey-dark']"
        @click="$emit('onCancel')"
      />
    </div>
  </div>
</template>
