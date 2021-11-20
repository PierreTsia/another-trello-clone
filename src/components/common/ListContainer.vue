<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'ListContainer',
  components: {
    Icon,
  },
  props: {
    list: { type: Object, default: () => ({ label: 'New landing page' }) },
  },
});
</script>

<template>
  <div class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3">
    <div class="flex justify-between py-1">
      <h3 class="text-sm font-bold">{{ list.label }}</h3>
      <Icon icon="bi:three-dots" color="#70818a" height="16" />
    </div>

    <div class="text-sm mt-2">
      <div
        class="
          bg-white
          p-2
          rounded
          mt-1
          border-b border-grey
          cursor-pointer
          hover:bg-grey-lighter
        "
      >
        Do a mobile first layout
      </div>

      <div
        class="
          bg-white
          p-2
          rounded
          mt-1
          border-b border-grey
          cursor-pointer
          hover:bg-grey-lighter
        "
      >
        Check the meta tags
      </div>

      <div
        class="
          bg-white
          p-2
          rounded
          mt-1
          border-b border-grey
          cursor-pointer
          hover:bg-grey-lighter
        "
      >
        Check the responsive layout on all devices
        <div class="text-grey-darker mt-2 flex justify-between items-start">
          <span class="text-xs flex items-center text-grey-dark">
            <Icon
              icon="fluent:checkbox-checked-20-regular"
              class="mr-1"
              color="#70818a"
              height="16"
            />
            3/5
          </span>
          <img src="https://i.imgur.com/OZaT7jl.png" class="rounded-full" />
        </div>
      </div>
      <p class="mt-3 text-grey-dark">Add a card...</p>
    </div>
  </div>
</template>
