<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useAuth } from '/@/store/auth.store';

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { logout } = useAuth();
    const avatarUrl = computed(() => props?.user?.avatar?.thumbnail ?? '');
    return {
      logout,
      avatarUrl,
    };
  },
});
</script>
<template>
  <div
    class="
      bg-white
      w-full
      max-w-sm
      mx-auto
      overflow-hidden
      bg-white
      rounded-lg
      shadow-lg
      dark:bg-gray-800
      cursor-pointer
    "
  >
    <div
      class="
        h-48
        w-full
        checker-bg
        flex
        items-center
        justify-center
        p-4
        text-blue-500
      "
    >
      <div
        class="w-32 h-32 bg-gray-100 rounded-full bg-cover bg-center"
        :style="{
          backgroundImage: `url('${avatarUrl}')`,
        }"
      ></div>
    </div>

    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <h1 class="text-gray-600 dark:text-cyan-300 font-medium">
          {{ user.username }}
        </h1>
        <button
          @click="logout"
          class="
            py-2
            px-2
            mt-2
            bg-transparent
            border border-gray-200
            dark:border-cyan-300
            text-gray-600
            rounded
            hover:bg-gray-100
            dark:hover:bg-cyan-500 dark:hover:text-white dark:text-cyan-300
            active:bg-gray-200
            disabled:opacity-50
            inline-flex
            items-center
          "
        >
          Logout
          <svg
            class="ml-2"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <p class="text-gray-400 text-sm my-1">Status: {{ user.role.name }}</p>
    </div>
  </div>
</template>
