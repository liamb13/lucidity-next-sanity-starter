import { eslintConfigPrettier } from '../plugins.js';

/**
 * @returns {TypedFlatConfigItem[]}
 */
export async function prettier() {
  return eslintConfigPrettier;
}
