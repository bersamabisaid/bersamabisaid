/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue,html}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      colors: {
        primary: '#1A2980',
        secondary: '#26D0CE',
        accent: '#9C27B0',
        dark: '#1D1D1D',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037',
      },
    },
    fontFamily: {
      sans: [
        'Poppins',
        ...defaultTheme.fontFamily.sans,
      ],
      inter: defaultTheme.fontFamily.sans,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
