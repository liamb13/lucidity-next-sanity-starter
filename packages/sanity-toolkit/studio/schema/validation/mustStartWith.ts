/**
 * Ensure a string field starts with a valid string, or one of an array of valid strings.
 */
export function mustStartWith(startWith: string | Array<string>, message?: string) {
  const validationMessage = Array.isArray(startWith)
    ? `Must start with one of "${startWith.join(', ')}"`
    : `Must start with ${startWith}`;

  return function mustStartWithValidator<RuleType>(value: RuleType) {
    if (typeof value !== 'string') {
      return true;
    }

    const doesStartWith = Array.isArray(startWith)
      ? startWith.some((prefix) => value.startsWith(prefix))
      : value.startsWith(startWith);

    return value && doesStartWith ? true : { message: message ?? validationMessage };
  };
}
