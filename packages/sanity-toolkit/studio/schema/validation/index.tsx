/**
 * Custom validations for use in your sanity schema field validations.
 *
 * All validations are wrapped in a function that allows them to be passed via rule.custom().
 * They all come with a default error message which can be overridden in the function parameters.
 *
 * E.G.
 * defineField({
 *   name: 'url',
 *   type: 'string',
 *   validation: (rule) => rule.custom(validUrl('URL is not valid, try again')).warning(),
 * })
 *
 * defineField({
 *   name: 'publishedAt',
 *   type: 'datetime',
 *   validation: (rule) => rule
 *     .custom(validPostTimestamps('updatedAt', 'after', undefined, 'Published At', 'Updated At'))
 *     .error(),
 * })
 */

export { isEmpty } from './isEmpty';
export { isSlug } from './isSlug';
export { linkMustBeRelativeOrAbsolute } from './linkMustBeRelativeOrAbsolute';
export { matchesRegex } from './matchesRegex';
export { mustStartWith } from './mustStartWith';
export { onlyWhenParentIs } from './onlyWhenParentIs';
export { requiredIfParentIs } from './requiredIfParentIs';
export { shouldBeInternalLink } from './shouldBeInternalLink';
export { validPostTimestamps } from './validPostTimestamps';
export { validUrl } from './validUrl';
