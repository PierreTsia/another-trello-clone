<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import Button from '/@/components/common/Button.vue';
import TextInput from '/@/components/common/TextInput.vue';

export default defineComponent({
  name: 'TopBar',
  components: {
    Icon,
    TextInput,
    Button,
  },
});
</script>
<template>
  <div>
    <div class="flex p-2 bg-blue-dark items-center text-white">
      <div class="hidden md:flex justify-items-center items-center">
        <Button color="blue-light" class="w-16 mr-2">
          <Icon icon="bx:bxs-grid" color="white" height="24" class="mx-auto" />
        </Button>

        <Button color="blue-light" class="w-16 mr-2">
          <Icon
            icon="bx:bx-home-alt"
            color="white"
            height="24"
            class="mx-auto"
          />
        </Button>

        <Button color="blue-light" class="w-32 mr-4">
          <Icon icon="bx:bxl-trello" color="white" height="24" class="mr-2" />
          <p class="text-white text-center">Tableaux</p>
        </Button>

        <TextInput
          class="bg-blue-light self-end w-48 h-12"
          text-color="white"
          icon="fa-solid:search"
          rotate-icon
        />
      </div>

      <div class="mx-0 md:mx-auto">
        <h1
          class="
            text-blue-lighter text-xl
            flex
            items-center
            font-sans
            italic
            font-black
          "
        >
          <Icon icon="bx:bxl-trello" color="#BCDEFA" height="48" class="mr-2" />
          Another Trello Clone
        </h1>
      </div>
      <div class="flex items-center ml-auto">
        <Button color="blue-light" class="mr-2">
          <Icon
            icon="akar-icons:plus"
            color="white"
            height="16"
            class="mx-auto"
          />
        </Button>
        <Button color="blue-light" class="mr-2">
          <Icon
            icon="fa-solid:info-circle"
            color="white"
            height="16"
            class="mx-auto"
          />
        </Button>
        <Button color="red" class="mr-2">
          <Icon
            icon="fa-solid:bell"
            color="white"
            height="16"
            class="mx-auto"
          />
        </Button>
        <img src="https://i.imgur.com/OZaT7jl.png" class="rounded-full" />
      </div>
    </div>
    <div class="flex items-center m-4 justify-between">
      <div class="flex items-center">
        <Button color="blue-light" class="h-9 mr-2">
          <h3 class="text-white text-sm font-bold text-center px-2">
            Nom du Tableau
          </h3>
        </Button>

        <ul class="list-reset text-white hidden md:flex">
          <li>
            <Button color="blue-light" class="h-9 w-9"
              ><Icon
                icon="akar-icons:star"
                color="white"
                height="18"
                class="mx-auto"
              />
            </Button>
          </li>
          <li class="flex items-center">
            <span class="h-4 mx-2 border-l border-blue-light text-sm" />
            <span class="text-sm">Abonnement: </span>
            <span class="rounded-lg bg-blue-light text-xs px-2 py-1 mx-2"
              >Free</span
            >
            <span class="h-4 mx-2 border-r border-blue-light text-sm" />
          </li>
          <li class="ml-1">
            <Button color="blue-light" class="h-9"
              ><Icon
                icon="fa-solid:lock"
                color="white"
                height="12"
                class="mr-2"
              />
              <p class="text-white text-center">Privé</p>
            </Button>
          </li>
        </ul>
      </div>
      <div
        class="
          cursor-pointer
          text-white
          font-sm
          text-underlined
          hidden
          md:flex
          items-center
          underline
        "
      >
        <Icon icon="bi:three-dots" color="white" height="16" class="mr-2" />
        Show menu
      </div>
    </div>
    <slot />
  </div>
</template>

e>
