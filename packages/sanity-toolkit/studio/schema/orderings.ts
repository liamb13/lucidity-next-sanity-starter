import type { SortOrdering, SortOrderingItem } from 'sanity';

export interface OrderingOptions {
  title?: SortOrdering['title'];
  name?: SortOrdering['name'];
  i18n?: SortOrdering['i18n'];
  field?: SortOrderingItem['field'];
  direction?: SortOrderingItem['direction'];
}

export function orderByPathname(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'URL',
    name: options.name ?? 'url',
    i18n: options.i18n,
    by: [
      { field: options.field ?? 'pathname.current', direction: options.direction ?? 'asc' },
    ],
  };
}

export function orderByTitle(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Title',
    name: options.name ?? 'title',
    by: [{ field: options.field ?? 'title', direction: options.direction ?? 'asc' }],
  };
}

export function orderByPublishedDate(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Published Date',
    name: options.name ?? 'publishedDate',
    by: [{ field: options.field ?? 'publishedAt', direction: options.direction ?? 'asc' }],
  };
}

export function orderByCreationDate(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Creation Date',
    name: options.name ?? 'creationDate',
    by: [{ field: options.field ?? '_createdAt', direction: options.direction ?? 'asc' }],
  };
}

export function orderByLastModifiedDate(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Last Modified Date',
    name: options.name ?? 'lastModifiedDate',
    by: [{ field: options.field ?? '_updatedAt', direction: options.direction ?? 'asc' }],
  };
}

export function orderByAuthorName(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Author Name',
    name: options.name ?? 'authorName',
    by: [{ field: options.field ?? 'author.name', direction: options.direction ?? 'asc' }],
  };
}

export function orderByCategory(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Category',
    name: options.name ?? 'category',
    by: [{ field: options.field ?? 'category.name', direction: options.direction ?? 'asc' }],
  };
}

export function orderByRating(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Rating',
    name: options.name ?? 'rating',
    by: [{ field: options.field ?? 'rating', direction: options.direction ?? 'asc' }],
  };
}

export function orderByPrice(options: OrderingOptions = {}): SortOrdering {
  return {
    title: options.title ?? 'Price',
    name: options.name ?? 'price',
    by: [{ field: options.field ?? 'price', direction: options.direction ?? 'asc' }],
  };
}
