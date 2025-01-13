import type { StringDefinition, StringInputProps, StringSchemaType } from 'sanity';
import type { CardProps } from '@sanity/ui';

/**
 * The available options for a Note field.
 */
type NoteFieldSchemaOptions = {
  icon?: React.ComponentType;
  tone?: CardProps['tone'];
};

/**
 * The schema definition for the SuperString field, i.e. within the `defineField({})` call.
 * You can also pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/string-type
 */
export interface NoteFieldSchemaDefinition extends Omit<StringDefinition, 'validation'> {
  options?: StringSchemaType['options'] & NoteFieldSchemaOptions;
}

/**
 * The Input Props passed to the component during render.
 */
export interface NoteFieldInputProps extends StringInputProps {
  schemaType: StringInputProps['schemaType'] & {
    options?: StringInputProps['schemaType']['options'] & NoteFieldSchemaOptions;
  };
}
