import type { SuperSlugSchemaDefinition } from './types';
import { defineField } from 'sanity';
import { SuperSlugInput } from './components/SuperSlugInput';

export function defineSuperSlugField(schema: Partial<SuperSlugSchemaDefinition>) {
  return defineField({
    ...schema,
    name: schema.name ?? 'pathname',
    title: schema.title ?? 'URL',
    type: 'slug',
    options: {
      apiVersion: '2025-04-07',
      ...schema.options,
    },
    components: {
      ...schema.components,
      input: schema.components?.input ?? SuperSlugInput,
    },
  } satisfies SuperSlugSchemaDefinition);
}
