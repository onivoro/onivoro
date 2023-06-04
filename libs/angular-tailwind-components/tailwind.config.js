const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    colors: {
      // primary: {
      //   DEFAULT: 'var(--primary)',
      //   light: 'var(--primary-light)',
      //   dark: 'var(--primary-dark)',
      // }
    }
  },
  plugins: [],
};
