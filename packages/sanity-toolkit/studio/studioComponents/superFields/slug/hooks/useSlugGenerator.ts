import { useCallback } from 'react';
import { useGetFormValue, useTranslation } from 'sanity';
import type { Path, SanityDocument } from 'sanity';
import type { SlugSourceFn, SuperSlugInputProps } from '../types';
import { useSlugContext } from './useSlugContext';
import { getNewFromSource, getSlugSourceContext } from '../utilities';
import type { UpdateSlugFn } from './useSuperSlugField';
import { useAsync } from '../../../../../hooks/useAsync';

interface Props {
  /** The Sanity API version to use for client operations. */
  apiVersion: string;
  /** The field to generate the slug from, e.g. 'title' field, or a function. */
  sourceField?: string | Path | SlugSourceFn;
  /** The schema type of the slug field. */
  schemaType: SuperSlugInputProps['schemaType'];
  /** The path to the slug field. */
  path: Path;
  /** The callback to update the slug value. */
  updateSlug: UpdateSlugFn;
}

/**
 * Manage slug generation based on a source field.
 * Provides state for loading/error status and a function to trigger generation.
 *
 * @param {Props} props Configuration for the slug generator.
 *
 * @returns An object containing generation state, the generation trigger function, and a boolean indicating if generation is in progress.
 */
export function useSlugGenerator({
  apiVersion,
  sourceField,
  schemaType,
  path,
  updateSlug,
}: Props) {
  const getFormValue = useGetFormValue();
  const slugContext = useSlugContext({ apiVersion });
  const { t } = useTranslation();

  const handleAsyncGenerateSlug = useCallback(async () => {
    if (!sourceField) {
      return Promise.reject(
        new Error(t('inputs.slug.error.missing-source', { schemaType: schemaType.name })),
      );
    }

    const document =
      (getFormValue([]) as SanityDocument | undefined) ||
      ({ _type: schemaType.name } as SanityDocument);

    const sourceContext = getSlugSourceContext(path, document, slugContext);

    const newFromSource = await getNewFromSource(sourceField, document, sourceContext);

    void updateSlug(newFromSource);
  }, [sourceField, getFormValue, schemaType, path, slugContext, updateSlug, t]);

  const [generateSlugState, handleGenerateSlug] = useAsync(handleAsyncGenerateSlug);

  return {
    generateSlugState,
    handleGenerateSlug,
    isGenerating: generateSlugState?.status === 'pending',
  };
}
