import type { SlugContext, SuperSlugInputProps } from '../types';
import { useCallback } from 'react';
import { PatchEvent, set, setIfMissing, unset, useGetFormValue } from 'sanity';
import type { SanityDocument } from 'sanity';
import { stringToSlug, getSlugSourceContext } from '../utilities';
import { useSlugContext } from './useSlugContext';

export type UpdateSlugFn = (nextSlug?: string) => void | Promise<void>;

export function useSuperSlugField(props: SuperSlugInputProps & { apiVersion: string }) {
  const { value, schemaType, onChange } = props;
  const { afterUpdate } = schemaType.options ?? {};

  const slugContext = useSlugContext({ apiVersion: props.apiVersion });
  const getFormValue = useGetFormValue();

  const segments = value?.current?.split('/').slice(0);
  const folderSlug = segments?.slice(0, -1).join('/');
  const slug = segments?.slice(-1)[0] ?? '';

  /**
   * Updates the slug field in the Sanity document.
   * Takes the proposed next slug string, processes it using the configured slugify function (or a default),
   * and patches the document via the `onChange` prop.
   * Handles empty slugs by unsetting the field.
   *
   * @param nextSlug The proposed new slug string.
   */
  const updateSlug: UpdateSlugFn = useCallback(
    async (nextSlug?: string) => {
      const document =
        (getFormValue([]) as SanityDocument | undefined) ||
        ({ _type: schemaType.name } as SanityDocument);

      const slugifyFn = createSlugifyFn(props, document, slugContext);

      const maybePromiseFinalSlug = nextSlug ? slugifyFn(nextSlug) : undefined;
      const finalSlug =
        typeof maybePromiseFinalSlug === 'string'
          ? maybePromiseFinalSlug
          : await maybePromiseFinalSlug;

      const patch =
        finalSlug !== 'string'
          ? [setIfMissing({ _type: schemaType.name }), set(finalSlug, ['current'])]
          : unset([]);

      onChange(PatchEvent.from(patch));

      if (afterUpdate) {
        afterUpdate(props, document, slugContext);
      }
    },
    [getFormValue, schemaType.name, props, slugContext, onChange, afterUpdate],
  );

  return {
    segments,
    folderSlug,
    slug,
    updateSlug,
  };
}

function createSlugifyFn(
  props: SuperSlugInputProps,
  document: SanityDocument,
  slugContext: SlugContext,
) {
  const { path } = props;
  const { slugify } = props.schemaType.options ?? {};

  if (!slugify) {
    // Allow trailing slashes to make it possible to create folders, e.g. if user types `/recipes/`, trailing slash is not stripped at this point.
    return (slug: string) => stringToSlug(slug, { allowTrailingSlash: true });
  }

  // eslint-disable-next-line @typescript-eslint/promise-function-async -- Disable because if the return isn't a Promise then we don't wait to await it (if we do await, it jumps caret to end of slug when editing—frustrating!)
  return (slug: string) => {
    const sourceContext = getSlugSourceContext(path, document, slugContext);

    return slugify(slug, props.schemaType, sourceContext);
  };
}
