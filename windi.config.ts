import { defineConfig } from 'vite-plugin-windicss';
import typography from 'windicss/plugin/typography';
import { COLORS } from './src/styles/colors.constant';

export default defineConfig({
  darkMode: 'class',
  plugins: [typography()],
  theme: {
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
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      serif: ['Montserrat', 'ui-serif', 'Georgia'],
      mono: ['Fira Sans', 'ui-monospace', 'SFMono-Regular'],
    },
    variants: {
      backgroundColor: [
        'group-focus-within',
        'group-focus-visible',
        'group-active',
        'group-visited',
        'group-disabled',
        'hocus',
        'group-hocus',
        'can-hover',
        'no-hover',
      ],
    },
    plugins: [require('@windicss/plugin-interaction-variants')],
  },
});
