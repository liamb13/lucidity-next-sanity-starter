import type { Path, SanityDocument, SlugParent, SlugSourceContext } from 'sanity';
import type { SlugContext, SlugSourceFn } from '../types';
import * as PathUtils from '@sanity/util/paths';

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

/**
 * Constructs the context required by the slug source function or path.
 * This includes the parent document path and the parent document itself.
 * This context is given to `options.prefix` or `options.source` when a function is passed.
 *
 * @param valuePath The full path to the slug field.
 * @param document The current Sanity document.
 * @param context Additional context information for slug generation.
 *
 * @returns The context object for slug source resolution.
 */
export function getSlugSourceContext(
  valuePath: Path,
  document: SanityDocument,
  context: SlugContext,
): SlugSourceContext {
  const parentPath = valuePath.slice(0, -1);
  const parent = PathUtils.get(document, parentPath) as SlugParent;
  return { parentPath, parent, ...context };
}

/**
 * Retrieves the raw value from the specified source field or function, e.g. a 'title' field.
 * Handles both path strings and function-based sources.
 * Source is typically passed to the component via `options.source`.
 *
 * @param source The source field path, string, or function.
 * @param document The current Sanity document.
 * @param context The context for slug source resolution.
 *
 * @returns A promise resolving to the raw source value, or undefined if not found.
 */
export async function getNewFromSource(
  source: string | Path | SlugSourceFn,
  document: SanityDocument,
  context: SlugSourceContext,
): Promise<string | undefined> {
  return typeof source === 'function'
    ? source(document, context)
    : PathUtils.get(document, source);
}

export function joinSlugSegments(segments: Array<string | undefined>) {
  return segments.filter((part) => typeof part === 'string').join('/');
}
