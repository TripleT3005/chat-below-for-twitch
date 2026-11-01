import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,

  // Extension
  {
    files: ['background.js', 'content.js', 'store/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: { ...globals.browser, ...globals.webextensions },
    },
  },

  // Tooling
  {
    files: ['eslint.config.js', 'tests/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
