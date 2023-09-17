/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx' //tudo dentro de src e que termina com tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

