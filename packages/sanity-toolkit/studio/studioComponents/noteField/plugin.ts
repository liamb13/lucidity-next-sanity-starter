import { definePlugin } from 'sanity';
import { defineNoteField } from './defineNoteField';

export const noteField = definePlugin(() => {
  return {
    name: 'sanity-toolkit-note-field',
    schema: {
      types: [defineNoteField({ name: 'note' })],
    },
  };
});
