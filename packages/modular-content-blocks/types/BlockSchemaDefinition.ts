import type { ObjectDefinition } from 'sanity';

/**
 * Pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/object-type
 */
export interface BlockSchemaDefinition extends Omit<ObjectDefinition, 'options'> {
  options?: BlockOptions;
}

export interface BlockOptions extends Pick<ObjectDefinition, 'options'> {}
