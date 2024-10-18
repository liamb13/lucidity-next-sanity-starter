import { defineField } from 'sanity';
import { isSlug } from './validation';

/**
 * Helper function to define an internal title field.
 */
export function defineInternalTitleField() {
  return defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description:
      'Internal use only. Helps identify this page when adding links or browsing the CMS',
    validation: (rule) => rule.required(),
  });
}

/**
 * Helper function to define an Anchor ID field for a section or other element.
 */
export function defineAnchorIdField({ type = 'section' }: { type?: string }) {
  return defineField({
    title: 'Anchor ID',
    name: 'anchorId',
    type: 'string',
    description: `Add an Anchor ID to this ${type} to enable links to scroll directly to it.`,
    validation: (rule) => rule.custom(isSlug()),
  });
}

/**
 * Define a page reference field to be used in page links.
 * Pass in all schema types that should be allowed as internal links.
 * These will appear in the dropdown when selecting a reference.
 * You can do this in your application by importing this function and passing in the types, then exporting
 * the resulting function.
 */
export function pageReferenceFieldFn(internalLinkTypes: Array<string>) {
  const definePageReferenceField = ({
    name = 'reference',
  }: { name?: string } = {}) =>
    defineField({
      name,
      title: 'Page',
      type: 'reference',
      to: internalLinkTypes.map((docType) => ({ type: docType })),
    });

  return definePageReferenceField;
}

