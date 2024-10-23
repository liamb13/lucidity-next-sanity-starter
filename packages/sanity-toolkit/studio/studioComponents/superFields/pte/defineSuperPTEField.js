import { SuperPTEInput } from './SuperPTEInput';
import { defineField } from 'sanity';
export function defineSuperPTEField(schemaTypeDefinition) {
    return defineField({
        ...schemaTypeDefinition,
        // @ts-ignore Typings don't seem to be right on the SuperPTEInput, but I can't figure out the exact right types.
        components: { input: SuperPTEInput },
    });
}
