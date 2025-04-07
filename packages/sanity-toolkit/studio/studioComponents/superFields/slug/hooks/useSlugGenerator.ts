import { useCallback } from 'react';
import { useGetFormValue, useTranslation } from 'sanity';
import type { SlugParent, SlugSourceContext, Path, SanityDocument } from 'sanity';
import * as PathUtils from '@sanity/util/paths';
import type { SlugContext, SlugSourceFn, SuperSlugInputProps } from '../types';
import { useAsync } from '../../../../../hooks/useAsync';
import { useSlugContext } from './useSlugContext';

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
  updateSlug: (newSlug: string) => void;
}

/**
 * Constructs the context required by the slug source function or path.
 * This includes the parent document path and the parent document itself.
 * This context is given to `options.prefix` or `options.source` when a function is passed.
 *
 * @param valuePath The full path to the slug field.
 * @param document The current Sanity document.
 * @param context Additional context information for slug generation.
 *
 * @returns The context object for slug source resolution.
 */
function getSlugSourceContext(
  valuePath: Path,
  document: SanityDocument,
  context: SlugContext,
): SlugSourceContext {
  const parentPath = valuePath.slice(0, -1);
  const parent = PathUtils.get(document, parentPath) as SlugParent;
  return { parentPath, parent, ...context };
}

/**
 * Retrieves the raw value from the specified source field or function, e.g. a 'title' field.
 * Handles both path strings and function-based sources.
 * Source is typically passed to the component via `options.source`.
 *
 * @param source The source field path, string, or function.
 * @param document The current Sanity document.
 * @param context The context for slug source resolution.
 *
 * @returns A promise resolving to the raw source value, or undefined if not found.
 */
async function getNewFromSource(
  source: string | Path | SlugSourceFn,
  document: SanityDocument,
  context: SlugSourceContext,
): Promise<string | undefined> {
  return typeof source === 'function'
    ? source(document, context)
    : PathUtils.get(document, source);
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

    updateSlug(newFromSource ?? '');
  }, [sourceField, getFormValue, schemaType, path, slugContext, updateSlug, t]);

  const [generateSlugState, handleGenerateSlug] = useAsync(handleAsyncGenerateSlug);

  return {
    generateSlugState,
    handleGenerateSlug,
    isGenerating: generateSlugState?.status === 'pending',
  };
}
