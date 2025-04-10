import { usePresentationParams } from 'sanity/presentation';

export function useSafePresentation() {
  try {
    return usePresentationParams();
  } catch {
    return null;
  }
}
