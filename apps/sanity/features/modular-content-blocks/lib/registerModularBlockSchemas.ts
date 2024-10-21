import { defineType } from 'sanity';
import { OBJECT } from '@pkg/common/constants/schemaTypes';
import { ONLY } from '../constants';
import { getModularBlocks } from './getModularContentBlocks';
import { blocksObjectSchema } from './blockSchemas';
// import { ModularBlockArrayInput } from './components/ModularBlockArrayInput';
// import { BLOCK_CATEGORY } from '../constants';

// @todo Add missing components

export function registerModularBlockSchemas() {
  return [
    // Register object schema types for inner blocks
    defineType({
      title: 'Inner Content',
      type: 'array',
      name: OBJECT.MODULAR_INNER_BLOCKS,
      of: getModularBlocks({ only: ONLY.INNER }),
      // components: {
      //   input: ModularBlockArrayInput(BLOCK_CATEGORY.INNER),
      // },
    }),

    // Register object schema types for outer blocks
    defineType({
      title: 'Modular Content',
      type: 'array',
      name: OBJECT.MODULAR_OUTER_BLOCKS,
      of: getModularBlocks({ only: ONLY.OUTER }),
      // components: {
      //   input: ModularBlockArrayInput(BLOCK_CATEGORY.OUTER),
      // },
    }),

    // Register all modular content blocks as objects
    ...blocksObjectSchema,
  ];
}

export { ONLY } from '../constants';
