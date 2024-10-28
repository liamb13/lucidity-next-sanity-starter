import { defineType } from 'sanity';
import { OBJECT } from '@pkg/common/constants/schemaTypes';
import { ONLY } from '../constants';
import { getModularBlocks } from './getModularContentBlocks';
import { blocksObjectSchema } from './blockSchemas';
import { VisualArrayInput } from '@pkg/sanity-toolkit/visual-array-input/components/VisualArrayInput';
import { itemGroups } from '@/features/modular-content-blocks/config/defaultBlockGroups';
// import { ModularBlockArrayInput } from './components/ModularBlockArrayInput';
// import { BLOCK_CATEGORY } from '../constants';

// @todo link up the modularBlocksSchemaToInputConfig function and the actual schema so the blocks are generated when adding to the visual array input

export function registerModularBlockSchemas() {
  const innerBlocksSchema = getModularBlocks({ only: ONLY.INNER });
  const outerBlocksSchema = getModularBlocks({ only: ONLY.OUTER });

  return [
    // Register object schema types for inner blocks
    defineType({
      title: 'Inner Content',
      type: 'array',
      name: OBJECT.MODULAR_INNER_BLOCKS,
      of: innerBlocksSchema,
      components: {
        input: VisualArrayInput(itemGroups, {
          apiVersion: '2024-10-24',
        }),
      },
    }),

    // Register object schema types for outer blocks
    defineType({
      title: 'Modular Content',
      type: 'array',
      name: OBJECT.MODULAR_OUTER_BLOCKS,
      of: outerBlocksSchema,
      components: {
        input: VisualArrayInput(itemGroups, {
          apiVersion: '2024-10-24',
        }),
      },
    }),

    // Register all modular content blocks as objects
    ...blocksObjectSchema,
  ];
}

export { ONLY } from '../constants';
