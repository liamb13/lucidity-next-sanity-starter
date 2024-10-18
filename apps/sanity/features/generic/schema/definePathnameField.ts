import {
  defineField,
  FieldDefinition,
  SlugOptions,
  SlugValidationContext
} from 'sanity';
import { type PathnameParams } from '../types';

export function definePathnameField(schema: PathnameParams = {}) {
  return definePathname({
    ...schema,
    options: {
      // @todo Pass in domain from options
      // prefix: options.preview.domain,
    },
  });
}


function definePathname(
  schema: { name?: string; title?: string; options?: SlugOptions } = {}
): FieldDefinition<'slug'> {
  return defineField({
    ...schema,
    name: schema.name ?? 'pathname',
    title: schema.title ?? 'URL',
    type: 'slug',
    options: {
      isUnique,
      ...(schema?.options ?? {}),
    },
  });
}

async function isUnique(
  slug: string,
  context: SlugValidationContext
): Promise<boolean> {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2023-06-21' });
  const id = document?._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    locale: document?.locale ?? null,
  };
  const query = `*[!(_id in [$draft, $published]) && pathname.current == $slug && locale == $locale]`;
  const result = await client.fetch(query, params);
  return result.length === 0;
}
