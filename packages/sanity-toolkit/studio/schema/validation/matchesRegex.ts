/**
 * A rule to ensure a value matches a given regex. Useful for video links from YouTube, among other things.
 * Regex should start with / and end with /. E.G. /^[a-z0-9]+(-[a-z0-9]+)*$/
 */
export function matchesRegex(regex: RegExp, message?: string) {
  return function matchesRegexValidation<RuleType>(value: RuleType) {
    if (typeof value === 'string') {
      return regex.test(value) ? true : { message: message ?? 'Invalid format' };
    }

    return true;
  };
}
