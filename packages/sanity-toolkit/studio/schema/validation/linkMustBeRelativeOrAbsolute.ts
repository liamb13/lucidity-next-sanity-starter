/**
 * A rule for ensuring a field starts with "/" or "http(s)", and is such a relative or an absolute URL.
 */
export function linkMustBeRelativeOrAbsolute(message?: string) {
  return function linkMustBeRelativeOrAbsoluteValidator<RuleType>(value: RuleType) {
    if (typeof value === 'string') {
      return value && !value.startsWith('/') && !value.startsWith('http')
        ? { message: message ?? 'Link must start with "/" or "http(s)"' }
        : true;
    }

    return true;
  };
}
