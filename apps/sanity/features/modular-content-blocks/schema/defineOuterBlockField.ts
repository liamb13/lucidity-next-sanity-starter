import { defineOuterBlockFn } from '@pkg/modular-content-blocks/sanity/schema/defineModularBlockField';
import type { FieldToChildFieldsMap } from '@pkg/modular-content-blocks/sanity/types';

const fieldToChildFields: FieldToChildFieldsMap = {
  default: ['content'],
};

export const defineOuterBlock = defineOuterBlockFn(fieldToChildFields);
