import { skipFileExtensions } from '@pkg/sanity-toolkit/redirects/config';

export type RedirectsConfig = typeof redirectsConfig;

export const redirectsConfig = {
  /** The path to the redirects API endpoint that retrieves the redirects from the CMS (as cannot cache this request in a Next middleware). */
  apiPath: '/api/redirects/cms',

  /** Do not process the redirects middleware for all paths that start with any of these prefixes. */
  skipPathPrefixes: ['/api'],

  /**
   * The file extensions that should not be processed by the redirects middleware.
   */
  skipFileExtensions: [...skipFileExtensions],
};
