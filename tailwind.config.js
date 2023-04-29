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
      maxHeight: {
        'modal-dialog': 'calc(100vh - 190px)',
      },
      height: {
        modal: "calc(100% - 50px)"
      },
      colors: {
        purple: '#B794F4',
        secondary: '#313b4e',
        'purple-hover': '#9766ed',
        'purple-12': '#B794F412',
        modal: '#2f3747',
        'main-bg': '#1a202c',
      },
      borderColor: {
        purple: '#B794F4',
      },
    },
  },
  plugins: [],
};
