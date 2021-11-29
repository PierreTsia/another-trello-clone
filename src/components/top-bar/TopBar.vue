<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

import { IconSave, IconCross } from '/@/components/common/icons/index.icons';
import Button from '/@/components/common/Button.vue';
import { ColorName, COLORS } from '/@/styles/colors.constant';
import Navbar from '/@/components/top-bar/Navbar.vue';
import TextInput from '/@/components/common/TextInput.vue';

import { useBoards } from '/@/store/boards.store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TopBar',
  components: {
    Navbar,
    Icon,
    TextInput,
    Button,
    IconSave,
    IconCross,
  },
  setup() {
    const colorNames = ColorName;
    const colorValues = COLORS;
    const boardsStore = useBoards();
    const { board } = storeToRefs(boardsStore);
    const route = useRoute();

    const draftBoardName = ref('');
    watch(
      () => board.value,
      board => {
        if (board?.name) {
          draftBoardName.value = board.name;
        }
      },
    );

    const isEditNameMode = ref(false);

    const updateBoardName = async () => {
      if (!draftBoardName.value.trim().length) {
        return;
      }
      await boardsStore.updateBoard(+route.params.id, {
        name: draftBoardName.value,
      });
      isEditNameMode.value = false;
    };

    const handleInputChange = (e: any) => {
      draftBoardName.value = e?.target?.value ?? 'undefined value';
    };

    return {
      updateBoardName,
      handleInputChange,
      draftBoardName,
      isEditNameMode,
      board,
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
        <div v-if="board" class="relative min-w-32 mb-2">
          <Button
            v-show="!isEditNameMode"
            @click="isEditNameMode = true"
            color="blue-light"
            class="h-9 mr-2 mb-2 md:mb-0"
          >
            <h3
              class="text-white text-sm font-bold text-center px-2 truncate whitespace-nowrap"
            >
              {{ board.name }}
            </h3>
          </Button>

          <div
            v-show="isEditNameMode"
            ref="inputRef"
            class="shadow-lg mb-2 flex intems-center justify-center"
          >
            <input
              type="text"
              autofocus
              :value="draftBoardName"
              @input="handleInputChange($event)"
              class="bg-white rounded-md text-blue-grey font-bold text-lg px-10 py-2"
            />
            <IconSave
              @click="updateBoardName"
              class="w-5 text-blue-grey absolute inset-0 top-3 left-2"
            />
            <IconCross
              @click="isEditNameMode = false"
              class="w-5 text-blue-grey absolute top-3 right-2"
            />
          </div>
        </div>

        <ul class="ml-4  mb-2 list-reset text-white hidden md:flex">
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
          <Button color="blue-light" class="mb-2 md:mb-0">
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
          <Button color="blue-light" class="mb-2 md:mb-0">
            <Icon icon="bi:filter" color="white" height="16" class="mr-2" />
            <p class="text-white text-center">Filtre</p>
          </Button>
        </li>
        <li>
          <Button color="blue-light" class="mb-2 md:mb-0">
            <Icon icon="bi:three-dots" color="white" height="16" class="mr-2" />
            <p class="text-white text-center">Afficher le menu</p>
          </Button>
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>
