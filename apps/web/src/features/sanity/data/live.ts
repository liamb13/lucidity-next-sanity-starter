import { defineLive } from 'next-sanity';
import { appConfig } from '@/config/app';
import { client } from './client';

/**
 * The defineLive function provides real-time content updates from Sanity CMS to your Next.js application.
 *
 * It exports two essential components:
 * - sanityFetch: A function for querying content with automatic draft/preview handling
 * - SanityLive: A React component that subscribes to real-time content changes
 *
 * See: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#setup
 */

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Authorizes server-side draft content access when using Sanity's Visual Editing tools or Vercel's Toolbar Edit Mode
  serverToken: appConfig.sanity.readToken,
  // Enables client-side draft previews, only sent to the browser during active Next.js Draft Mode sessions for security
  browserToken: appConfig.sanity.readToken,
});
