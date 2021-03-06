/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
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
        'blue-gray': colors.blueGray,
        'gray-gray': colors.gray,
        'warm-gray': colors.warmGray,
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        'light-blue': colors.lightBlue,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },
    },
    fontFamily: {
      sans: [
        'Roboto',
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
