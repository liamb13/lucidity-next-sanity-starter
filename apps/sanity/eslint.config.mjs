import studio from '@sanity/eslint-config-studio';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';

export default [
  {
    ignores: [
      'lint-staged.config.cjs',
      'types/sanity-queries.ts',
      'features/modular-content-blocks/scripts/generate-sanity-block-schema-imports.cjs',
    ],
  },
  reactCompilerPlugin.configs.recommended,
  ...studio,
  {
    languageOptions: {
      sourceType: 'module',
    },
  },
];
