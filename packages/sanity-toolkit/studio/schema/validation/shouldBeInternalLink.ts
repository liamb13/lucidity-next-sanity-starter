/**
 * A validation rule for detecting if a URL is a valid external URL, or if it is an internal url that could be a page link instead.
 * Most used as a Warning instead of an Error in case of edge cases.
 */
export function shouldBeInternalLink(message?: string) {
  return function shouldBeInternalLinkValidator<RuleType>(value: RuleType) {
    if (typeof value === 'string') {
      return value && value.startsWith('/') && /^[a-zA-Z0-9\-_/?&]+$/.test(value)
        ? {
            message:
              message ??
              'It is better to use the Page type as this link is internal. This will ensure it stays up-to-date automatically',
          }
        : true;
    }

    return true;
  };
}
