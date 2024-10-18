import type { SuperStringSchemaDefinition } from './types';
import { SuperStringInput } from './SuperStringInput';

export function defineSuperStringField(
  schemaTypeDefinition: Omit<SuperStringSchemaDefinition, 'type'>,
): SuperStringSchemaDefinition {
  return {
    ...schemaTypeDefinition,
    type: 'string',
    components: { input: SuperStringInput },
  };
}
