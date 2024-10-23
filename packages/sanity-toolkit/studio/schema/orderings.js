function createSortOrdering(
  defaultTitle,
  defaultName,
  defaultField,
  defaultDirection,
  options = {},
) {
  return {
    title: options.title ?? defaultTitle,
    name: options.name ?? defaultName,
    i18n: options.i18n,
    by: [
      {
        field: options.field ?? defaultField,
        direction: options.direction ?? defaultDirection,
      },
    ],
  };
}
export function orderByPathname(options = {}) {
  return createSortOrdering('URL', 'url', 'pathname.current', 'asc', options);
}
export function orderByTitle(options = {}) {
  return createSortOrdering('Title', 'title', 'title', 'asc', options);
}
export function orderByPublishedDate(options = {}) {
  return createSortOrdering('Published Date', 'publishedDate', 'publishedAt', 'desc', options);
}
export function orderByCreationDate(options = {}) {
  return createSortOrdering('Creation Date', 'creationDate', '_createdAt', 'desc', options);
}
export function orderByLastModifiedDate(options = {}) {
  return createSortOrdering(
    'Last Modified Date',
    'lastModifiedDate',
    '_updatedAt',
    'desc',
    options,
  );
}
export function orderByAuthorName(options = {}) {
  return createSortOrdering('Author Name', 'authorName', 'author.name', 'asc', options);
}
export function orderByCategory(options = {}) {
  return createSortOrdering('Category', 'category', 'category.name', 'asc', options);
}
export function orderByRating(options = {}) {
  return createSortOrdering('Rating', 'rating', 'rating', 'desc', options);
}
export function orderByPrice(options = {}) {
  return createSortOrdering('Price', 'price', 'price', 'desc', options);
}
