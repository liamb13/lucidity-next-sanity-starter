import { defineArrayMember } from 'sanity';
import { OBJECT } from '@pkg/common/constants/schemaTypes';
import { ONLY } from '../constants';
import { blocksObjectSchema, innerOnlyBlocks, outerOnlyBlocks } from './blockSchemas';
import { GetBlocksOptions } from '../types';
import { type ModularBlockArrayMember } from '../types';

// @todo Consider moving this code to the modular blocks package, and then using this current file to set it up

const outerBlockNames = outerOnlyBlocks.map((block) => block?.name);
const innerBlockNames = innerOnlyBlocks.map((block) => block?.name);

/**
 * This function will provide a list of modular content blocks to be used in a sanity `array` field.
 * E.G.
 *   defineField({
 *     name: 'content',
 *     title: 'Modular Content',
 *     type: 'array',
 *     group: 'content',
 *     of: getModularBlocks(),
 *   }),
 *
 * It can optionally be filtered to include or exclude specific blocks, as well as only
 * including SECTION or INNER blocks.
 */
export function getModularBlocks(opts: GetBlocksOptions = {}) {
  const modularContentBlockTypes: Array<ModularBlockArrayMember> = blocksObjectSchema.map(
    (blockSchema) =>
      defineArrayMember({
        title: blockSchema.title,
        name: blockSchema.name,
        type: blockSchema.name as OBJECT,
      }),
  );

  return filterBlocks(modularContentBlockTypes, opts);
}

function filterBlocks(
  blockList: Array<ModularBlockArrayMember>,
  opts: GetBlocksOptions = {},
) {
  const include = opts.include ?? [];
  const exclude = opts.exclude ?? [];

  if (typeof opts.only !== 'undefined') {
    if (opts.only === ONLY.OUTER) {
      blockList = blockList.filter((block) => outerBlockNames.includes(block.type));
    }
    if (opts.only === ONLY.INNER) {
      blockList = blockList.filter((block) => innerBlockNames.includes(block.type));
    }
  }

  if (exclude.length) {
    blockList = blockList.filter((block) => !exclude.includes(block.type));
  }

  if (include.length) {
    blockList = blockList.filter((block) => include.includes(block.type));
  }

  return blockList;
}
