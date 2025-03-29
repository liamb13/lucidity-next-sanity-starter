import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';
import {
  javascript,
  imports,
  ignores,
  react,
  typescript,
  jsx,
  prettier,
} from './configs/index.js';
import { isInEditorEnv } from './utils.js';

/**
 * @type {keyof TypedFlatConfigItem[]}
 */
const flatConfigProps = [
  'name',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
];

/**
 * Construct an array of ESLint flat config items.
 *
 * @param {OptionsConfig & Omit<TypedFlatConfigItem, 'files'>} options
 *  The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]} userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>>}
 *  The merged ESLint configurations.
 */
export function eslintPlugin(options = {}, ...userConfigs) {
  const {
    componentExts = [],
    jsx: enableJsx = true,
    gitignore: enableGitignore = true,
    react: enableReact = false,
    typescript: enableTypeScript = isPackageExists('typescript'),
    prettier: usingPrettier = isPackageExists('prettier'),
  } = options;

  let isInEditor = options.isInEditor;
  if (isInEditor == null) {
    isInEditor = isInEditorEnv();
    if (isInEditor)
      // eslint-disable-next-line no-console
      console.log('[@pkg/eslint-plugin] Detected running in editor, some rules are disabled.');
  }

  /** @type {Awaitable<TypedFlatConfigItem[]>[]} */
  const configs = [];

  const typescriptOptions = resolveSubOptions(options, 'typescript');
  const tsconfigPath =
    'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined;

  // Base configs
  configs.push(
    ignores(options.ignores),
    javascript({
      isInEditor,
      overrides: getOverrides(options, 'javascript'),
    }),
    imports(),
  );

  if (enableJsx) {
    configs.push(jsx());
  }

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...typescriptOptions,
        componentExts,
        overrides: getOverrides(options, 'typescript'),
        type: options.type,
      }),
    );
  }

  if (enableReact) {
    configs.push(
      react({
        ...typescriptOptions,
        overrides: getOverrides(options, 'react'),
        tsconfigPath,
      }),
    );
  }

  if (usingPrettier) {
    configs.push(prettier());
  }

  if ('files' in options) {
    throw new Error(
      '[@pkg/eslint-plugin] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.',
    );
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  /** @type {TypedFlatConfigItem} */
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) acc[key] = options[key];
    return acc;
  }, {});
  if (Object.keys(fusedConfig).length) configs.push([fusedConfig]);

  let composer = new FlatConfigComposer();

  composer = composer.append(...configs, ...userConfigs);

  if (isInEditor) {
    composer = composer.disableRulesFix(
      ['unused-imports/no-unused-imports', 'test/no-only-tests', 'prefer-const'],
      {
        builtinRules: () =>
          import(['eslint', 'use-at-your-own-risk'].join('/')).then((r) => r.builtinRules),
      },
    );
  }

  return composer;
}

/**
 * @param {OptionsConfig} options
 * @param {keyof OptionsConfig} key
 * @returns {ResolvedOptions<OptionsConfig[K]>}
 */
export function resolveSubOptions(options, key) {
  return typeof options[key] === 'boolean' ? {} : options[key] || {};
}

/**
 * @template {keyof OptionsConfig} K
 * @param {OptionsConfig} options
 * @param {K} key
 * @returns {Partial<Linter.RulesRecord & RuleOptions>}
 */
export function getOverrides(options, key) {
  const sub = resolveSubOptions(options, key);
  return {
    ...(options.overrides ?? {})[key],
    ...('overrides' in sub ? sub.overrides : {}),
  };
}
