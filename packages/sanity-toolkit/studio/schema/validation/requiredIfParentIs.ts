import type { CustomValidatorResult, ValidationContext } from 'sanity';
import { onlyWhenParentIs } from './onlyWhenParentIs';

/**
 * Set field as required if a parent field has a specific value.
 * Useful for conditional logic: showing or hiding fields on a document based on another fields value.
 */
export function requiredIfParentIs(
  parentConditions: Record<string, unknown | unknown[]>,
  message?: string,
  not = false,
) {
  return onlyWhenParentIs(
    parentConditions,
    (value) => (value ? true : { message: message ?? 'Field is required' }),
    not,
  );
}
