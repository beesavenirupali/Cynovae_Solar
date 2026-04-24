/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: { 900: '#0a0a0a', 950: '#030303' },
        gold: { 400: '#ffb340', 500: '#ff8800', 600: '#cc6a00' },
        ember: { 500: '#ff4d00' }
      },
      fontFamily: { 
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif']
      }
    },
  },
  plugins: [],
}
