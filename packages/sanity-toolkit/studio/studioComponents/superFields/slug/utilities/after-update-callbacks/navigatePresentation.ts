import type { SuperSlugAfterUpdateFn } from '../../types';
import { debounceCallback } from '../debounce';

const navigateDebounceTime = 1000;

export const navigatePresentation: SuperSlugAfterUpdateFn = (context) => {
  const debouncedNavigate = debounceCallback((newPreview?: string) => {
    context.navigate?.(newPreview);
  }, navigateDebounceTime);

  // Auto-navigate if this document is currently being previewed, or if it's a brand-new document being created.
  if (
    context.presentation?.preview === context.previousValue ||
    !context.document._createdAt
  ) {
    debouncedNavigate(context.nextValue);
  }
};
