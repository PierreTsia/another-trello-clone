<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  IconClock,
  IconTrello,
  IconLogout,
  IconArrowDownCircle,
} from '/@/components/common/icons/index.icons';
import { useAuth } from '/@/store/auth.store';
import { useBoards } from '/@/store/boards.store';
import { storeToRefs } from 'pinia';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import frFR from 'date-fns/locale/fr';

export default defineComponent({
  name: 'UserCard',
  components: {
    IconClock,
    IconTrello,
    IconLogout,
    IconArrowDownCircle,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { logout } = useAuth();
    const boardsStore = useBoards();
    const { boards } = storeToRefs(boardsStore);

    const avatarUrl = computed(() => props?.user?.avatar?.thumbnail ?? '');
    const lastEditionFromNow = (date: Date) =>
      formatDistanceToNow(date, { addSuffix: true, locale: frFR });

    const fetchAllBoards = async () => {
      await boardsStore.fetchUserBoards(props.user.id);
    };

    return {
      logout,
      avatarUrl,
      boards,
      lastEditionFromNow,
      fetchAllBoards,
    };
  },
});
</script>
<template>
  <div
    class="bg-white w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
  >
    <div
      class="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500"
    >
      <div
        class="w-32 h-32 bg-gray-100 rounded-full bg-cover bg-center"
        :style="{
          backgroundImage: `url('${avatarUrl}')`,
        }"
      ></div>
    </div>

    <div class="p-4 w-full">
      <h2
        class="text-gray-600 dark:text-cyan-300 text-lg font-medium text-center"
      >
        Tableaux
      </h2>
      <ul class="flex flex-col justify-start items-center w-full">
        <li
          v-for="board in boards"
          :key="board.id"
          class="w-full py-2 flex flex-col"
        >
          <router-link
            class="flex flex-col text-gray-600 dark:text-cyan-300 text-sm font-medium w-full inline-flex"
            :to="`/board/${board.id}`"
          >
            <span class="py-2 px-1 flex items-center">
              <IconTrello class="w-4 mr-1" />
              <span class="truncate">
                {{ board.name }}
              </span>
            </span>

            <h6
              class="px-1 text-xs text-gray-400 flex items-center justify-start whitespace-nowrap"
            >
              <IconClock class="mr-1 w-4" />
              Dernière modification :
              <strong
                class="truncate ml-2 font-bold text-gray-600 dark:text-cyan-300"
                >{{ lastEditionFromNow(board.updated_at) }}</strong
              >
            </h6>
          </router-link>
        </li>
      </ul>
      <section class="flex py-2 mt-4 justify-center">
        <button
          @click="fetchAllBoards"
          class="group py-2 px-2 mt-2 border border-gray-200 dark:border-cyan-300 text-gray-600 rounded hover:bg-gray-100 dark:hover:bg-cyan-500 dark:hover:text-white dark:text-cyan-300 active:bg-gray-200 disabled:opacity-50 inline-flex items-center"
        >
          <IconArrowDownCircle
            class="w-6 mr-2 group-hover:(animate-animated animate-heartBeat animate-1s)"
          />
          See all boards
        </button>
      </section>
    </div>

    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <h1 class="text-gray-600 dark:text-cyan-300 font-medium">
          {{ user.username }}
        </h1>
        <button
          @click="logout"
          class="py-2 px-2 mt-2 bg-transparent border border-gray-200 dark:border-cyan-300 text-gray-600 rounded hover:bg-gray-100 dark:hover:bg-cyan-500 dark:hover:text-white dark:text-cyan-300 active:bg-gray-200 disabled:opacity-50 inline-flex items-center"
        >
          Logout
          <IconLogout class="w-4" />
        </button>
      </div>
      <span class="text-gray-400 text-sm my-1">
        Authenticated as:
        <strong class="ml-2 font-bold text-gray-600 dark:text-cyan-300">{{
          user.role.name
        }}</strong>
      </span>
    </div>
  </div>
</template>
