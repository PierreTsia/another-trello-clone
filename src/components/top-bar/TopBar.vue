<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import Button from '/@/components/common/Button.vue';
import TextInput from '/@/components/common/TextInput.vue';
import { ColorName, COLORS } from '/@/styles/colors.constant';
import Navbar from '/@/components/top-bar/Navbar.vue';

export default defineComponent({
  name: 'TopBar',
  components: {
    Navbar,
    Icon,
    TextInput,
    Button,
  },
  setup() {
    const colorNames = ColorName;
    const colorValues = COLORS;
    return {
      colorNames,
      colorValues,
    };
  },
});
</script>
<template>
  <div>
    <Navbar />
    <div class="flex-wrap flex items-center m-4 justify-between">
      <div class="flex items-center">
        <Button color="blue-light" class="h-9 mr-2 mb-2 md:mb-0">
          <h3 class="text-white text-sm font-bold text-center px-2">
            Nom du Tableau
          </h3>
        </Button>

        <ul class="list-reset text-white hidden md:flex">
          <li class="mr-2">
            <Button color="blue-light" class="h-9 w-9 mb-2 md:mb-0"
              ><Icon
                icon="akar-icons:star"
                color="white"
                height="18"
                class="mx-auto"
              />
            </Button>
          </li>

          <li class="">
            <Button color="blue-light" class="h-9 mb-2 md:mb-0"
              ><Icon
                icon="fa-solid:lock"
                color="white"
                height="12"
                class="mr-2"
              />
              <p class="text-white text-center">Privé</p>
            </Button>
          </li>

          <li class="separator separator-blue-light" />

          <li class="flex items-center mb-2 md:mb-0">
            <span class="text-sm">Abonnement: </span>
            <span class="tag tag-blue-light ml-2">Free</span>
          </li>
          <li class="separator separator-blue-light" />
          <li class="">
            <Button color="blue-darker" class="h-9 mb-2 md:mb-0"
              ><Icon
                icon="bx:bx-user-plus"
                color="white"
                height="16"
                class="mr-2"
              />
              <p class="text-white text-center">Inviter</p>
            </Button>
          </li>
        </ul>
      </div>
      <ul class="flex flex-wrap">
        <li>
          <Button color="blue-light" class='mb-2 md:mb-0'>
            <Icon
              icon="bi:lightning-charge-fill"
              color="white"
              height="16"
              class="mr-2"
            />
            <p class="text-white text-center">Automatisation</p>
          </Button>
        </li>
        <li class="separator separator-blue-light" />
        <li class="mr-2">
          <Button color="blue-light" class='mb-2 md:mb-0'>
            <Icon icon="bi:filter" color="white" height="16" class="mr-2" />
            <p class="text-white text-center">Filtre</p>
          </Button>
        </li>
        <li>
          <Button color="blue-light" class='mb-2 md:mb-0'>
            <Icon icon="bi:three-dots" color="white" height="16" class="mr-2" />
            <p class="text-white text-center">Afficher le menu</p>
          </Button>
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>
