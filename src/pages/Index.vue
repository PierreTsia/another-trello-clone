<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from '/@/store/auth.store';
import { storeToRefs } from 'pinia';

import LoginCard from '/@/components/LoginCard.vue';
import UserCard from '/@/components/UserCard.vue';
import Footer from '/@/components/Footer.vue';

export default defineComponent({
  name: 'Home',
  components: {
    LoginCard,
    UserCard,
    Footer,
  },
  setup() {
    const auth = useAuth();
    const { isLoggedIn, me } = storeToRefs(auth);

    const show = ref(false);
    setTimeout(() => {
      show.value = true;
    }, 1000);

    return { show, isLoggedIn, me };
  },
});
</script>
<template>
  <div
    class="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      bg-indigo-50
      dark:bg-gray-900
    "
  >
    <div class="container min-h-screen flex flex-col justify-around mx-auto">
      <div class="mb-8 h-78 flex items-center flex-1">
        <transition
          enter-active-class="transition ease-out duration-1000 transform"
          enter-from-class="-translate-x-100 opacity-0"
          enter-to-class="translate-x-0 opacity-100"
        >
          <UserCard v-if="show && me" :user="me" />
        </transition>

        <LoginCard v-if="!isLoggedIn" />
      </div>
      <Footer />
    </div>
  </div>
</template>
