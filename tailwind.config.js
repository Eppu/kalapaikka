import plugin from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/flowbite/**/*.{js,ts}',
    './formkit.theme.ts',
  ],
  theme: {
    extend: {
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
    fontFamily: {
      body: ['Inter', 'sans-serif'],
      display: ['Manrope', 'sans-serif'],
    },
  },
  plugins: [plugin],
};
