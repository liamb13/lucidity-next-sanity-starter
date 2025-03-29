import { pluginImport } from '../plugins.js';

/**
 * @returns {TypedFlatConfigItem[]}
 */
export async function imports() {
  return [
    {
      name: 'eslint-plugin/imports/rules',
      plugins: { 'import-x': pluginImport },
      rules: {
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import-x/first': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-named-default': 'error',
        'import-x/no-self-import': 'error',
        'import-x/no-webpack-loader-syntax': 'error',
        'import-x/newline-after-import': ['error', { count: 1 }],
      },
    },
  ];
}
