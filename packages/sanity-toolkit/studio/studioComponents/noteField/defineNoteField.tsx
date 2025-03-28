import { defineType } from 'sanity';
import type { StringFieldProps } from 'sanity';
import { NoteInputComponent } from './NoteInputComponent';
import type { NoteFieldSchemaDefinition } from './types';

type SchemaDefinition = Omit<NoteFieldSchemaDefinition, 'name' | 'type'> & {
  name?: NoteFieldSchemaDefinition['name']; // Make name optional
};

export function defineNoteField(schemaTypeDefinition: SchemaDefinition) {
  return defineType({
    title: 'Note',
    name: 'note',
    ...schemaTypeDefinition,
    type: 'string',
    components: {
      input: NoteInputComponent,
      field: (props: StringFieldProps) => <>{props.children}</>,
      ...(schemaTypeDefinition.components ?? {}),
    },
  });
}
