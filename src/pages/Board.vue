<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, ref } from 'vue';

import Dashboard from '/@/layouts/Dashboard.vue';
import ListContainer from '/@/components/common/ListContainer.vue';
import TextInput from '/@/components/common/TextInput.vue';
import { Icon } from '@iconify/vue';
import { useTheme } from '/@/composables';
import { useStore } from '/@/store/counter.store';

export default defineComponent({
  name: 'Board',
  components: {
    Icon,
    Dashboard,
    ListContainer,
    TextInput,
  },
  setup() {
    const { t, availableLocales, locale } = useI18n();
    const counter = useStore();

    const toggleLocales = () => {
      const locales = availableLocales;
      locale.value =
        locales[(locales.indexOf(locale.value) + 1) % locales.length];
    };

    const { toggleDark } = useTheme();

    const show = ref(false);

    setTimeout(() => {
      show.value = true;
    }, 1000);

    return { t, show, toggleLocales, toggleDark, counter };
  },
});
</script>
<template>
  <Dashboard>
    <div
      id="board-container"
      class="flex px-4 pb-8 items-start overflow-x-scroll"
    >
      <ListContainer />
      <div class="w-72">
        <TextInput class="bg-white" placeholder="test" text-color="#70818a" />
      </div>

      <!--      <TextInput />
      <div class="relative flex w-full flex-wrap items-stretch mb-3">
        <span
          class="
            z-10
            h-full
            leading-snug
            font-normal
            absolute
            text-center text-grey-dark
            absolute
            bg-transparent
            rounded
            text-base
            items-center
            justify-center
            w-full
            pl-3
            py-3
          "
        >
          <Icon icon="fa-solid:lock" color="grey" />
        </span>
        <input
          type="text"
          placeholder="Placeholder"
          class="
            px-3
            py-3
            placeholder-grey-dark
            text-grey-dark
            relative
            bg-white bg-white
            rounded
            text-sm
            border-0
            shadow
            outline-none
            focus:outline-none focus:ring
            w-full
            pl-10
          "
        />


      </div>-->
      <!--      <div class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3">
        <div class="flex justify-between py-1">
          <h3 class="text-sm font-bold">Old landing</h3>
          <svg
            class="h-4 fill-current text-grey-dark cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"
            />
          </svg>
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
            Delete all references from the wiki
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
            Remove analytics code
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
            Whatever
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
            <p>Think more tasks for this example</p>
            <div class="bg-red rounded p-1 mt-2 inline-flex text-white text-xs">
              <svg
                class="h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z"
                />
              </svg>
              2
            </div>
          </div>
          <p class="mt-3 text-grey-dark">Add a card...</p>
        </div>
      </div>-->
      <!--      <div class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3">
        <div class="flex justify-between py-1">
          <h3 class="text-sm font-bold">Do more cards</h3>
          <svg
            class="h-4 fill-current text-grey-dark cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"
            />
          </svg>
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
            Delete all references from the wiki
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
            Remove analytics code
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
            Whatever
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
            Delete all references from the wiki
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
            Remove analytics code
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
            Whatever
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
            <p>Think more tasks for this example</p>
            <div class="bg-red rounded p-1 mt-2 inline-flex text-white text-xs">
              <svg
                class="h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z"
                />
              </svg>
              2
            </div>
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
            Delete all references from the wiki
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
            Remove analytics code
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
            Whatever
          </div>
          <p class="mt-3 text-grey-dark">Add a card...</p>
        </div>
      </div>-->
    </div>
  </Dashboard>
</template>

<style>
#board-container::-webkit-scrollbar {
  display: none;
}
</style>
