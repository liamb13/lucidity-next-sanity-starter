import { useCallback, useEffect, useState } from 'react';
import type { SanityDocument } from 'sanity';
import { useFormValue } from 'sanity';
import { useSlugContext } from './useSlugContext';
import type { SuperSlugInputProps } from '../types';

/**
 * Returns the prefix specified on this pathname field, via options.prefix.
 * It can be a string, a function or a promise, and should resolve to a string.
 */
export function useSlugPrefix(props: SuperSlugInputProps & { apiVersion: string }) {
  const sourceContext = useSlugContext({ apiVersion: props.apiVersion });
  const document = useFormValue([]) as SanityDocument | undefined;

  const optionsPrefix = props.schemaType.options?.prefix;

  const [urlPrefix, setUrlPrefix] = useState<string>('');

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
