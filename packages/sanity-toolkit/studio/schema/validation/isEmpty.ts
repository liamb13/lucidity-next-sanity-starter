/**
 * A validation rule to check if a value is empty.
 */
export function isEmpty(value?: unknown) {
  if (typeof value === 'string') {
    if (!value || value.trim() === '') return 'Field must not be empty';
    return true;
  }

  if (!value) return 'Field must not be empty';
  return true;
}
