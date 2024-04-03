/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      grayscale: {
        90: '90%',
      },
      minHeight: {
        main: 'calc(100vh - 173px)',
        'main-desktop': 'calc(100vh - 176px)',
      },
      maxHeight: {
        'modal-dialog': 'calc(100vh - 190px)',
      },
      height: {
        modal: 'calc(100% - 50px)',
      },
      colors: {
        skeleton: '#53535e50',
        'filter-color': '#1a202c',
        purple: '#B794F4',
        secondary: '#313b4e',
        'purple-hover': '#9766ed',
        'purple-12': '#B794F412',
        'purple-50': '#B794F450',
        modal: '#2f3747',
        'main-bg': '#1a202c',
        'black-90': '#00000090',
      },
      borderColor: {
        purple: '#B794F4',
      },
      gridTemplateColumns: {
        7.3: '70% 30%',
      },
      transitionProperty: {
        left: 'left',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
