import { GLOB_EXCLUDE } from '../globs.js';

/**
 * @param {string[]} userIgnores
 * @returns {Promise<[{ignores: (string|string)[], name: string}]>}
 */
export async function ignores(userIgnores = []) {
  return [
    {
      ignores: [...GLOB_EXCLUDE, ...userIgnores],
      name: 'eslint-plugin/ignores',
    },
  ];
}
