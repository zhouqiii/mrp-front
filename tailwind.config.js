/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue,jsx,tsx,ts}'],
  theme: {
    colors: {
      white: '#ffffff',
      base: '#0f80d6',
      borderbase: '#dddddd',
      primary: '#1677ff',
    },
    extend: {
      backgroundImage: {
        cockpit: "url('./assets/img/cockpit.png')",
      },
    },
  },
  plugins: [],
}
