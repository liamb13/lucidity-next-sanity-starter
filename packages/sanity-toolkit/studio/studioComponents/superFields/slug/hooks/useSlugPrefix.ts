import { useCallback, useEffect, useState } from 'react';
import type { SanityDocument } from 'sanity';
import { useFormValue } from 'sanity';
import { useSlugContext } from './useSlugContext';
import type { SuperSlugInputProps } from '../types';

/**
 * Props for the `useSlugPrefix` hook.
 */
interface UseSlugPrefixProps extends SuperSlugInputProps {
  apiVersion: string;
}

/**
 * Hook to determine the appropriate prefix for the slug field based on `options.prefix`.
 * Handles static string prefixes, function-based prefixes (sync/async), and falls back to the window origin.
 * Updates the prefix when the document changes.
 *
 * @param props The component props including schemaType and apiVersion.
 * @returns An object containing the resolved `prefix` string.
 */
export function useSlugPrefix(props: UseSlugPrefixProps) {
  const sourceContext = useSlugContext({ apiVersion: props.apiVersion });
  const document = useFormValue([]) as SanityDocument | undefined;

  const optionsPrefix = props.schemaType.options?.prefix;

  const [urlPrefix, setUrlPrefix] = useState<string | undefined>();

  /**
   * Fetches or computes the URL prefix based on the `optionsPrefix` configuration.
   * Handles string, function (sync/async) types, and provides a default (window origin).
   * @param doc The current Sanity document.
   */
  const getUrlPrefix = useCallback(
    async (doc: SanityDocument | undefined) => {
      if (!doc) return;

      if (typeof optionsPrefix === 'string') {
        setUrlPrefix(optionsPrefix);
        return;
      }

      if (typeof optionsPrefix === 'function') {
        try {
          const value = await optionsPrefix(doc, sourceContext);
          setUrlPrefix(value);
          return;
        } catch (error) {
          console.error(`[prefixed-slug] Couldn't generate URL prefix: `, error);
        }
      }

      setUrlPrefix(window.location.origin);
    },
    [setUrlPrefix, optionsPrefix, sourceContext],
  );

  // Re-create the prefix whenever the document changes
  useEffect(() => {
    void getUrlPrefix(document);
  }, [document, getUrlPrefix]);

  return {
    prefix: urlPrefix,
  };
}
