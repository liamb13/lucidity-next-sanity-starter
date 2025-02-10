import { stringIsSlug } from '../../constants/regex';
import { matchesRegex } from './matchesRegex';

/**
 * A rule to test if the value is a valid slug/pathname/clean URL.
 */
export function isSlug(message?: string) {
  return matchesRegex(
    stringIsSlug,
    message ?? 'Must contain only lowercase letters [a-z], numbers [0-9], and dashes ("-")',
  );
}
