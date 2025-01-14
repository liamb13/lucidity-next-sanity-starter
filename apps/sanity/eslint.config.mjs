import studio from '@sanity/eslint-config-studio';

export default [
  {
    ignores: ['lint-staged.config.cjs'],
  },
  ...studio,
  {
    languageOptions: {
      sourceType: 'module',
    },
  },
];
