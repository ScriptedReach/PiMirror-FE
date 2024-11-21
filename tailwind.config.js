/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        jost: ['Jost', 'sans-serif'],
      },
      fontSize: {
        'time': '6rem',
      }
    },
  },
  plugins: [],
};
