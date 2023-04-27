/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      minHeight: {
        main: 'calc(100vh - 173px)',
        'main-desktop': 'calc(100vh - 176px)',
      },
      colors: {
        purple: '#B794F4',
      },
      borderColor: {
        purple: '#B794F4',
      },
    },
  },
  plugins: [],
};
