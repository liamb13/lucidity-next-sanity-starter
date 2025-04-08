/**
 * Creates a debounced function that delays invoking the provided function
 * until after 'wait' milliseconds have elapsed since the last time it was invoked.
 *
 * @template T - The function type
 * @param {T} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {boolean} [immediate=false] - Whether to invoke the function on the leading edge instead of the trailing edge
 * @returns {(...args: Parameters<T>) => void} - The debounced function
 */
export function debounceCallback<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(this: any, ...args: Parameters<T>): void {
    const later = (): void => {
      timeoutId = null;
      if (!immediate) func.apply(this, args);
    };

    const callNow = immediate && !timeoutId;

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);

    if (callNow) func.apply(this, args);
  };
}
