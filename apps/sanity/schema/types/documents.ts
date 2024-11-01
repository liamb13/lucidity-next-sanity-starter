import { SchemaTypeDefinition } from 'sanity';
import { page } from './documents/page';
import { redirects } from '@pkg/sanity-toolkit/redirects/schema';
import { DOCUMENT } from '@pkg/common/constants/schemaTypes';
import { INTERNAL_LINK_TYPES } from '@/config/schema';

export const documents: SchemaTypeDefinition[] = [
  page,
  redirects({ schemaName: DOCUMENT.CONFIG_REDIRECT, internalLinkTypes: INTERNAL_LINK_TYPES }),
];
