/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.tsx',
    './src/**/*.jsx',
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
        'blue-gray': colors.blueGray,
        // 'gray-gray': colors.gray,
        // 'warm-gray': colors.warmGray,
        // orange: colors.orange,
        // amber: colors.amber,
        // lime: colors.lime,
        // emerald: colors.emerald,
        // teal: colors.teal,
        // cyan: colors.cyan,
        'light-blue': colors.lightBlue,
        // violet: colors.violet,
        // fuchsia: colors.fuchsia,
        // rose: colors.rose,
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
    extend: {
      borderWidth: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
