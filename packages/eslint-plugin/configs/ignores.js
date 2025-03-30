import { GLOB_EXCLUDE } from '../globs.js';

/**
 * @param {string[]} userIgnores
 * @returns {Promise<[{ignores: (string|string)[], name: string}]>}
 */
export async function ignores(userIgnores = []) {
  return [
    {
      name: 'eslint-plugin/ignores',
      ignores: [...GLOB_EXCLUDE, ...userIgnores],
    },
  ];
}
