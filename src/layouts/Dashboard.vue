<script lang="ts">
import { defineComponent } from 'vue';
import TopBar from '/@/components/top-bar/TopBar.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    TopBar,
  },
});
</script>
<template>
  <div class="h-screen w-full bg-blue font-sans flex flex-col">
    <TopBar />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
