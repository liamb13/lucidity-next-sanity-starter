import type { ValidationContext } from 'sanity';

/**
 * For two fields containing a "datetime" field, compare them and ensure this field comes before/after the other field.
 * Optionally specify an error message, or override the field titles used in the default error message via `thisName` and `thatName`.
 */
export function validPostTimestamps(
  otherFieldName: string,
  order: 'before' | 'after',
  message?: string,
  thisName?: string,
  thatName?: string,
) {
  return function validPostTimestampsValidator<RuleType>(
    value: RuleType,
    context: ValidationContext,
  ) {
    const document = context.document;

    const otherField = document?.[otherFieldName];

    if (!value || !otherField || typeof value !== 'string' || typeof otherField !== 'string') {
      return true;
    }

    const thisField = Date.parse(value);
    const thatField = Date.parse(otherField);

    const compare = order === 'before' ? thatField > thisField : thatField < thisField;

    const hint = order === 'before' ? 'later' : 'earlier';

    return compare
      ? {
          message:
            message ??
            `${thisName}${thisName ? ' m' : 'M'}ust be ${hint} than ${thatName ?? otherFieldName}`,
        }
      : true;
  };
}
