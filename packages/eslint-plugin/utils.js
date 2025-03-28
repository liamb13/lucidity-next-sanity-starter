import process from 'node:process';
import { isPackageExists } from 'local-pkg';
import { fileURLToPath } from 'node:url';

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));
const isCwdInScope = isPackageExists('@pkg/eslint-plugin');

/**
 * @param {Awaitable<T>} m
 * @returns {T extends { default: infer U } ? U : T}
 */
export async function interopDefault(m) {
  const resolved = await m;
  return resolved.default || resolved;
}

/**
 * @param {(string | undefined)[]} packages
 * @returns {Promise<void>}
 */
export async function ensurePackages(packages) {
  if (process.env.CI || process.stdout.isTTY === false || isCwdInScope === false) return;

  const nonExistingPackages = packages.filter((i) => i && !isPackageInScope(i));
  if (nonExistingPackages.length === 0) return;

  const p = await import('@clack/prompts');
  const result = await p.confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  });
  if (result)
    await import('@antfu/install-pkg').then((i) =>
      i.installPackage(nonExistingPackages, { dev: true }),
    );
}

/**
 * @returns {boolean}
 */
export function isInEditorEnv() {
  if (process.env.CI) return false;
  if (isInGitHooksOrLintStaged()) return false;
  return !!(
    process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM ||
    process.env.NVIM
  );
}

/**
 * @returns {boolean}
 */
export function isInGitHooksOrLintStaged() {
  return !!(
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  );
}

/**
 * @param {string} name
 * @returns {boolean}
 */
export function isPackageInScope(name) {
  return isPackageExists(name, { paths: [scopeUrl] });
}
