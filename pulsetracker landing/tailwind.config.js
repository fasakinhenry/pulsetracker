/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:  {
 screens: {
    'xs': '420px',
    '2md': '900px',
    },
    },
  },
  plugins: [],
}