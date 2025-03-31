import { createClient } from 'next-sanity';
import { appConfig } from '@/config/app';

export const client = createClient({
  projectId: appConfig.sanity.projectId,
  dataset: appConfig.sanity.dataset,
  apiVersion: appConfig.sanity.apiVersion,
  useCdn: !appConfig.sanity.revalidateSecret,
  stega: {
    studioUrl: `${appConfig.sanity.studioUrl}/${appConfig.sanity.workspace}`,
    logger: appConfig.sanity.debugStega ? console : undefined, // Log out encoded and skipped paths to help debug
  },
});
