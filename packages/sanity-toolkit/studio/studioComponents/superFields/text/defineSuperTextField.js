import { SuperTextInput } from './SuperTextInput';
import { defineField } from 'sanity';
export function defineSuperTextField(schemaTypeDefinition) {
  return {
    ...schemaTypeDefinition,
    type: 'text',
    components: { input: SuperTextInput },
  };
}
