import { defineConfig } from 'vite-plugin-windicss';
import typography from 'windicss/plugin/typography';
import { COLORS } from './src/styles/colors.constant';

export default defineConfig({
  darkMode: 'class',
  plugins: [
    typography(),
    // Other plugins
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 500,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        slideInSpeed: 350,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],
  theme: {
    extend: {
      colors: {
        ...COLORS,
      },
      backgroundColor: {
        ...COLORS,
      },
      borderColor: {
        ...COLORS,
      },
      placeholderColor: {
        ...COLORS,
      },
      fontFamily: {
        sans: [
          'Segoe UI',
          'Roboto',
          'Noto Sans',
          'Ubuntu',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        serif: ['Merriweather', 'serif'],

        mono: ['Fira Sans', 'ui-monospace', 'SFMono-Regular'],
      },
      variants: {
        ringColor: ['responsive', 'hover', 'focus', 'active'],
        backgroundColor: [
          'group-focus-within',
          'group-focus-visible',
          'group-active',
          'group-visited',
          'group-disabled',
          'focus',
          'group-focus',
          'can-hover',
          'no-hover',
        ],
        text: [
          'group-focus-within',
          'group-focus-visible',
          'group-active',
          'group-visited',
          'group-disabled',
          'focus',
          'group-focus',
          'can-hover',
          'no-hover',
        ],
        backdropOpacity: ['hover', 'focus'],
      },
    },

    plugins: [require('@windicss/plugin-interaction-variants')],
  },
});
