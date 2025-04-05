/**
 * Converts a string into a URL-friendly slug format.
 * This involves converting to lowercase, replacing spaces with dashes,
 * removing non-alphanumeric characters (except internal dashes and slashes),
 * consolidating multiple dashes or slashes, and ensuring it starts with a slash.
 *
 * @param input The string to convert.
 * @param options Configuration options.
 * @param options.allowTrailingSlash If true, allows the slug to end with a slash. Defaults to false.
 *
 * @returns The generated slug string.
 */
export function stringToSlug(input: string, options?: { allowTrailingSlash?: boolean }) {
  let sanitized = input
    // Convert to lowercase first to ensure consistent character handling
    .toLowerCase()
    // Replace spaces with dashes before any other processing
    .replace(/\s+/g, '-')
    // Remove consecutive slashes inside the path except the first character
    .replace(/(?!^)\/+/g, '/')
    // Remove non-URL friendly characters, allowing internal slashes and dashes
    .replace(/[^a-z0-9-\/]+/g, '')
    // Prevent multiple dashes in a row (optional, for aesthetics)
    .replace(/-+/g, '-')
    // Remove duplicate slashes
    .replace(/\/+/g, '/');

  sanitized = options?.allowTrailingSlash ? sanitized : sanitized.replace(/\/$/, '');

  return (
    `/${sanitized}`
      // Remove duplicate slashes
      .replace(/\/+/g, '/')
  );
}
