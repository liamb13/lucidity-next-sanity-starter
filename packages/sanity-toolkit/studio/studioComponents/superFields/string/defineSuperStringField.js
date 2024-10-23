import { SuperStringInput } from './SuperStringInput';
export function defineSuperStringField(schemaTypeDefinition) {
  return {
    ...schemaTypeDefinition,
    type: 'string',
    components: { input: SuperStringInput },
  };
}
