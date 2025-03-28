import { GLOB_JSX, GLOB_TSX } from '../globs.js';

/**
 * @returns {TypedFlatConfigItem[]}
 */
export async function jsx() {
  return [
    {
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: 'eslint-plugin/jsx/setup',
    },
  ];
}
