import type { SlugContext, SuperSlugInputProps } from '../types';
import { useCallback } from 'react';
import { PatchEvent, set, setIfMissing, unset, useGetFormValue } from 'sanity';
import type { SanityDocument } from 'sanity';
import { stringToSlug, getSlugSourceContext } from '../utilities';
import { useSlugContext } from './useSlugContext';

export type UpdateSlugFn = (nextSlug?: string) => void | Promise<void>;

export function useSuperSlugField(props: SuperSlugInputProps & { apiVersion: string }) {
  const { schemaType, onChange } = props;

  const slugContext = useSlugContext({ apiVersion: props.apiVersion });
  const getFormValue = useGetFormValue();

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

      // Allow trailing slashes to make it possible to create folders
      const finalNextSlug = nextSlug ? await slugifyFn(nextSlug) : undefined;

      const patch = finalNextSlug
        ? [setIfMissing({ _type: schemaType.name }), set(finalNextSlug, ['current'])]
        : unset([]);

      onChange(PatchEvent.from(patch));

      // @todo add auto-navigate if on Presentation screen
    },
    [onChange, schemaType, props, slugContext, getFormValue],
  );

  return {
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

  return slugify
    ? async (slug: string) => {
        const sourceContext = getSlugSourceContext(path, document, slugContext);

        return slugify(slug, props.schemaType, sourceContext);
      }
    : (slug: string) => stringToSlug(slug, { allowTrailingSlash: true });
}
