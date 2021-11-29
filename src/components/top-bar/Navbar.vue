<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import Button from '/@/components/common/Button.vue';
import TextInput from '/@/components/common/TextInput.vue';
import { useColors } from '/@/composables/useColors';
import { useAuth } from '/@/store/auth.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Navbar',
  components: { Button, Icon, TextInput },
  setup() {
    const { colorName, colorValues } = useColors();
    const authStore = useAuth();
    const { me } = storeToRefs(authStore);
    return {
      me,
      colorValues,
      colorName,
    };
  },
});
</script>

<template>
  <nav class="flex p-2 bg-blue-dark items-center text-white">
    <ul class="hidden md:flex justify-items-center items-center">
      <li>
        <Button :color="colorName.BlueDark" class="mr-2">
          <p class="text-white text-center">Récent</p>
          <Icon
            icon="akar-icons:chevron-down"
            :color="colorValues.white"
            height="12"
            class="ml-2"
          />
        </Button>
      </li>
      <li>
        <Button :color="colorName.BlueDark" class="mr-2">
          <p class="text-white text-center">Plus</p>
          <Icon
            icon="akar-icons:chevron-down"
            :color="colorValues.white"
            height="12"
            class="ml-2"
          />
        </Button>
      </li>
      <li>
        <Button :color="colorName.BlueDark" class="mr-2">
          <p class="text-white text-center">Favoris</p>
          <Icon
            icon="akar-icons:chevron-down"
            :color="colorValues.white"
            height="12"
            class="ml-2"
          />
        </Button>
      </li>
      <li>
        <Button :color="colorName.BlueDark" class="mr-2">
          <p class="text-white text-center">Modèles</p>
          <Icon
            icon="akar-icons:chevron-down"
            :color="colorValues.white"
            height="12"
            class="ml-2"
          />
        </Button>
      </li>

      <li>
        <Button :color="colorName.BlueDarker" class="mr-2">
          <p class="text-white text-center">Créer</p>
        </Button>
      </li>
    </ul>

    <div class="mx-0 md:mx-auto">
      <h1 class="hero-text">
        <Icon icon="bx:bxl-trello" color="#BCDEFA" height="28" class="mr-2" />
        <span class="hidden lg:block">Another Trello Clone</span>
      </h1>
    </div>
    <div class="flex items-center ml-auto">
      <TextInput
        class="bg-blue-grey mr-4"
        :text-color="colorName.White"
        placeholder="Parcourir"
        icon="fa-solid:search"
        rotate-icon
      />
      <Button :color="colorName.BlueDark" class="mr-2">
        <Icon
          icon="fa-solid:info-circle"
          color="white"
          height="16"
          class="mx-auto"
        />
      </Button>
      <Button :color="colorName.BlueDark" class="mr-2">
        <Icon icon="fa-solid:bell" color="white" height="16" class="mx-auto" />
      </Button>
      <img :src="me?.avatar.thumbnail" alt="avatar" class="rounded-full w-8 h-8" />
    </div>
  </nav>
</template>

<style>
.hero-text {
  @apply text-blue-lighter lg:text-lg  flex  items-center  font-sans  italic  font-black;
}
</style>
