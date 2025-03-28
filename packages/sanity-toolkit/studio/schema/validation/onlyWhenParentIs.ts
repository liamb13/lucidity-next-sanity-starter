import type { CustomValidatorResult, ValidationContext } from 'sanity';

/**
 * Only run validation when parent fields match specified values.
 * Pass `true` to `not` parameter to only run validation when parent fields do NOT match specified values.
 *
 * Accepts an object where each key is a parent field name and each value is either a single value or an array of values.
 * Returns passed validator function if all parent fields match their specified values, otherwise `true`.
 *
 * Example:
 * onlyWhenParentIs({ type: 'test' }, validator) // Single field, single value
 * onlyWhenParentIs({ type: ['test', 'draft'] }, validator) // Single field, multiple values
 * onlyWhenParentIs({ type: 'test', status: 'published' }, validator) // Multiple fields
 * onlyWhenParentIs({ type: ['test', 'draft'], status: ['published', 'review'] }, validator) // Multiple fields with multiple values
 */
export function onlyWhenParentIs(
  parentConditions: Record<string, unknown | unknown[]>,
  validator?: <ValidatorRuleType>(
    value: ValidatorRuleType,
    context: ValidationContext,
  ) => CustomValidatorResult | Promise<CustomValidatorResult>,
  not = false,
) {
  return async function onlyWhenParentIsValidator<RuleType>(
    value: RuleType,
    context: ValidationContext,
  ) {
    let shouldValidate = Object.entries(parentConditions).every(
      ([parentName, parentValue]) => {
        const actualValue = (context.parent as Record<string, unknown>)[parentName];
        return Array.isArray(parentValue)
          ? parentValue.includes(actualValue)
          : actualValue === parentValue;
      },
    );

    if (not) {
      shouldValidate = !shouldValidate;
    }

    if (!shouldValidate) {
      return true;
    }

    if (!validator) {
      throw new Error('Cannot validate in `onlyWhenParentIs` as no validator function passed');
    }

    return validator(value, context);
  };
}
