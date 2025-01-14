import type { StringDefinition, StringInputProps, StringSchemaType } from 'sanity';
import type { CardProps } from '@sanity/ui';
import type { ComponentType } from 'react';

/**
 * The available options for a Note field, e.g.:
 *
 *   defineField({
 *     type: 'note',
 *     options: {
 *       tone: 'primary',
 *     }
 *   })
 */
interface NoteFieldSchemaOptions {
  icon?: ComponentType;
  tone?: CardProps['tone'];
}

/**
 * The schema definition for the SuperString field, i.e. within the `defineField({})` call.
 * You can also pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/string-type
 */
export interface NoteFieldSchemaDefinition extends Omit<StringDefinition, 'options'> {
  options?: StringSchemaType['options'] & NoteFieldSchemaOptions;
}

/**
 * The Input Props passed to the component during render.
 */
export interface NoteFieldInputProps extends Omit<StringInputProps, 'schemaType'> {
  schemaType: StringInputProps['schemaType'] & {
    options?: StringInputProps['schemaType']['options'] & NoteFieldSchemaOptions;
  };
}
