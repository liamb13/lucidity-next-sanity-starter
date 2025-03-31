/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visual Editing
 * and query draft content and preview the content as it will appear once everything is published
 */

import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/features/sanity/data/client';
import { appConfig } from '@/config/app';

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: appConfig.sanity.readToken }),
});
