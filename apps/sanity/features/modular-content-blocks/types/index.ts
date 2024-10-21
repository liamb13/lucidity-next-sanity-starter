import { OBJECT } from '@pkg/common/constants/schemaTypes';
import { type ONLY } from '../constants';

/**
 * The structure of Array Members for Modular Blocks.
 * This represents the structure of Modular Block fields, defined with Sanity's defineArrayMember()
 * helper function, that are passed to the `of` field of an `array` type field.
 */
export interface ModularBlockArrayMember {
  type: OBJECT;
  title?: string;
  name?: string;
}

export interface GetBlocksOptions {
  include?: Array<OBJECT>;
  exclude?: Array<OBJECT>;
  only?: ONLY;
}
