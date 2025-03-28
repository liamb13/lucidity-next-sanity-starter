import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { isPackageExists } from 'local-pkg';

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));
const isCwdInScope = isPackageExists('@antfu/eslint-config');

export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  /** @param {string} code */
  parseForESLint: (code) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
};

/**
 * Combine array and non-array configs into a single array.
 *
 * @param configs Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
 * @returns Promise<TypedFlatConfigItem[]>
 */
export async function combine(...configs) {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

/**
 * Rename plugin names a flat configs array
 *
 * @example
 * ```ts
 * import { renamePluginInConfigs } from '@antfu/eslint-config'
 * import someConfigs from './some-configs'
 *
 * export default renamePluginInConfigs(someConfigs, {
 *   '@typescript-eslint': 'ts',
 *   'import-x': 'import',
 * })
 * ```
 *
 * @param {TypedFlatConfigItem[]} configs
 * @param {Record<string, string>} map
 * @returns {TypedFlatConfigItem[]}
 */
export function renamePluginInConfigs(configs, map) {
  return configs.map((i) => {
    const clone = { ...i };
    if (clone.rules) clone.rules = renameRules(clone.rules, map);
    if (clone.plugins) {
      clone.plugins = Object.fromEntries(
        Object.entries(clone.plugins).map(([key, value]) => {
          if (key in map) return [map[key], value];
          return [key, value];
        }),
      );
    }
    return clone;
  });
}

/**
 * @param {T | T[]} value
 * @returns {T[]}
 */
export function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

/**
 * @param {string} name
 * @returns {boolean}
 */
export function isPackageInScope(name) {
  return isPackageExists(name, { paths: [scopeUrl] });
}

/**
 * @returns {boolean}
 */
export function isInGitHooksOrLintStaged() {
  return !!(
    false ||
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  );
}
