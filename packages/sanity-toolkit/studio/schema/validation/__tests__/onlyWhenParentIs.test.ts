import { describe, it, expect, vi } from 'vitest';
import { onlyWhenParentIs } from '../onlyWhenParentIs';
import { createValidationContext } from '../../../../sanity-test-utils';

describe('onlyWhenParentIs', () => {
  const mockValidator = vi.fn((value) => (value ? true : { message: 'Invalid value' }));

  it('should run validator when parent matches single value', async () => {
    const validator = onlyWhenParentIs({ type: 'test' }, mockValidator);
    const context = createValidationContext({ type: 'test' });

    await validator('someValue', context);

    expect(mockValidator).toHaveBeenCalledWith('someValue', context);
  });

  it('should run validator when parent matches one of multiple values', async () => {
    const validator = onlyWhenParentIs({ type: ['test', 'other'] }, mockValidator);
    const context = createValidationContext({ type: 'test' });

    await validator('someValue', context);

    expect(mockValidator).toHaveBeenCalledWith('someValue', context);
  });

  it('should run validator when multiple parent fields match', async () => {
    const validator = onlyWhenParentIs({ type: 'test', status: 'published' }, mockValidator);
    const context = createValidationContext({ type: 'test', status: 'published' });

    await validator('someValue', context);

    expect(mockValidator).toHaveBeenCalledWith('someValue', context);
  });

  it('should run validator when multiple parent fields with arrays match', async () => {
    const validator = onlyWhenParentIs(
      { type: ['test', 'draft'], status: ['published', 'review'] },
      mockValidator,
    );
    const context = createValidationContext({ type: 'test', status: 'review' });

    await validator('someValue', context);

    expect(mockValidator).toHaveBeenCalledWith('someValue', context);
  });

  it('should not run validator when parent does not match', async () => {
    const validator = onlyWhenParentIs({ type: 'test' }, mockValidator);
    const context = createValidationContext({ type: 'other' });

    const result = await validator('someValue', context);

    expect(mockValidator).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should not run validator when one of multiple parent fields does not match', async () => {
    const validator = onlyWhenParentIs({ type: 'test', status: 'published' }, mockValidator);
    const context = createValidationContext({ type: 'test', status: 'draft' });

    const result = await validator('someValue', context);

    expect(mockValidator).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should invert condition when not is true', async () => {
    const validator = onlyWhenParentIs({ type: 'test' }, mockValidator, true);
    const context = createValidationContext({ type: 'other' });

    await validator('someValue', context);

    expect(mockValidator).toHaveBeenCalledWith('someValue', context);
  });

  it('should throw error when no validator is provided', () => {
    const validator = onlyWhenParentIs({ type: 'test' });
    const context = createValidationContext({ type: 'test' });

    expect(() => validator('someValue', context)).toThrow(
      'Cannot validate in `onlyWhenParentIs` as no validator function passed',
    );
  });
});
