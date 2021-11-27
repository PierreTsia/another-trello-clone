import { defineStore } from 'pinia';
import { useDark, useToggle } from '@vueuse/core';
import { Ref } from 'vue';

interface SettingsState {
  isDark: Ref<boolean>;
}
const isDark = useDark();
const toggleDark = useToggle(isDark);

export const useSettings = defineStore('settings', {
  state: (): SettingsState => {
    return {
      isDark,
    };
  },

  actions: {
    toggleDark,
  },
});
