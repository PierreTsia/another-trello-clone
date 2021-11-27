<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import Button from '/@/components/common/Button.vue';
import BlockCard from '/@/components/common/BlockCard.vue';
import { useColors } from '/@/composables/useColors';

export default defineComponent({
  name: 'ListContainer',
  components: {
    Icon,
    BlockCard,
    Button,
  },
  props: {
    list: { type: Object, default: () => ({ label: 'New landing page' }) },
    isEditMode: { type: Boolean, default: false },
    canValidate: { type: Boolean, default: false },
  },
  setup() {
    const { colorValues } = useColors();
    return {
      colorValues,
    };
  },
});
</script>

<template>
  <div class="rounded bg-grey-light flex-no-shrink w-72 p-2 mr-3">
    <div class="flex justify-between py-1">
      <slot name="header" />
    </div>
    <slot name="blocks" />
    <div class="mt-3">
      <div v-if="isEditMode" class="flex items-center">
        <Button
          color="blue-dark"
          class="mr-3"
          :font-bold="false"
          :is-disabled="!canValidate"
          @click="$emit('onValidate')"
        >
          <Icon
            icon="akar-icons:plus"
            class="mr-1"
            :color="colorValues.white"
          />
          <p class="text-white">Ajouter une carte</p>
        </Button>
        <Icon
          icon="akar-icons:cross"
          class="mr-1 cursor-pointer"
          :color="colorValues['grey-dark']"
          @click="$emit('onCancel')"
        />
      </div>
      <div v-else class="flex items-center">
        <Button
          color="grey-light"
          :font-bold="false"
          class="w-48 text-grey-dark hover:text-grey-light"
          @click.native="$emit('onCreateNewClick', list._id)"
        >
          <Icon
            icon="akar-icons:plus"
            class="mr-1"
            :color="colorValues['grey-dark']"
          />
          <p class="">Ajouter une carte</p>
        </Button>
      </div>
    </div>
  </div>
</template>
