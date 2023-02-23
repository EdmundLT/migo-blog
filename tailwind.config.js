/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      nstc: ['Noto Sans SC Sliced', 'sans-serif']
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
