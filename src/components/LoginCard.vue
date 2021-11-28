<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from '/@/store/auth.store';

export default defineComponent({
  name: 'LoginCard',
  setup() {
    const email = ref('');
    const password = ref('');
    const { login } = useAuth();

    return {
      email,
      password,
      login,
    };
  },
});
</script>

<template>
  <div
    class="
      w-full
      max-w-sm
      mx-auto
      overflow-hidden
      bg-white
      rounded-lg
      shadow-md
      dark:bg-gray-800
    "
  >
    <div class="px-6 py-4">
      <h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">
        Another Trello Clone
      </h2>

      <p class="mt-3 text-center text-gray-500 dark:text-gray-400">
        Login or create account
      </p>

      <form>
        <div class="w-full mt-4">
          <input
            class="
              block
              w-full
              px-4
              py-2
              mt-2
              text-gray-700
              dark:text-white
              placeholder-gray-500
              dark:placeholder-gray-600
              bg-white
              border
              rounded-md
              dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
              focus:border-blue-500
              dark:focus:border-blue-500
              focus:outline-none focus:ring
            "
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            v-model="email"
          />
        </div>

        <div class="w-full mt-4">
          <input
            class="
              block
              w-full
              px-4
              py-2
              mt-2
              text-gray-700
              dark:text-white
              placeholder-gray-500
              dark:placeholder-gray-600
              bg-white
              border
              rounded-md
              dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
              focus:border-blue-500
              dark:focus:border-blue-500
              focus:outline-none focus:ring
            "
            v-model="password"
            type="password"
            placeholder="Password"
            aria-label="Password"
          />
        </div>

        <div class="flex items-center justify-between mt-4">
          <a
            href="#"
            class="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
            >Forget Password?</a
          >

          <button
            class="
              px-4
              py-2
              leading-5
              text-white
              transition-colors
              duration-200
              transform
              bg-gray-700
              rounded
              hover:bg-gray-600
              focus:outline-none
            "
            type="button"
            @click="login(email, password)"
          >
            Login
          </button>
        </div>
      </form>
    </div>

    <div
      class="
        flex
        items-center
        justify-center
        py-4
        text-center
        bg-gray-50
        dark:bg-gray-700
      "
    >
      <span class="text-sm text-gray-600 dark:text-gray-200"
        >Don't have an account?
      </span>

      <a
        href="#"
        class="
          mx-2
          text-sm
          font-bold
          text-blue-500
          dark:text-blue-400
          hover:underline
        "
        >Register</a
      >
    </div>
  </div>
</template>
