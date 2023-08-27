import { defineConfig } from 'vite-plugin-windicss';
import { primaryColor } from './build/config/themeConfig';

export default defineConfig({
  darkMode: 'class',
  plugins: [createEnterPlugin()],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        primary: primaryColor,
        'secondary-color': '#1256BB',
        'color-background-neuture-800': '#17181f',
        'color-background-neuture-900': '#13121a',
        'color-background-neuture-700': '#292a34',
        'color-background-neuture-500': '#7B7e92',
        'color-background-neuture-600': '#5A5a67',
        'color-text-neuture-300': '#B7B6cf',
        'color-text-neuture-400': '#9597b1',
        'color-background-green-1': '#00c566',
        'color-background-red-1': '#ff4747',
        'color-background-yellow-1': '#facc15',
      },
      screens: {
        fold: { max: '300px' },
        mobile: { max: '767px' },
        'mb-notfold': { min: '320px', max: '640px' },
        'not-mobile': { min: '768px' },
        'not-desktop': { max: '1024px' },
        tablet: { min: '768px', max: '1024px' },
        laptop: { max: '1280px' },
        desktop: { min: '1281px' },
        'screen-hide-sidebar': { max: '924px' },
      },
    },
  },
});

/**
 * Used for animation when the element is displayed.
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume.
 */
function createEnterPlugin(maxOutput = 6) {
  const createCss = (index: number, d = 'x') => {
    const upd = d.toUpperCase();
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        opacity: '0',
        animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`,
      },
    };
  };
  const handler = ({ addBase }) => {
    const addRawCss = {};
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      });
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    });
  };
  return { handler };
}
