import type { Item, ItemGroups } from '../types';
import { tokenize } from '../../studio/utilities/strings';

export function filterItemGroups(
  searchQuery: string,
  searchTags: Array<string>,
  itemGroups: ItemGroups,
) {
  const tokens = tokenize(searchQuery);

  if (tokens.length <= 0) {
    return itemGroups;
  }

  return itemGroups.map((itemGroup) => ({
    ...itemGroup,
    items: filterItems(searchQuery, searchTags, itemGroup.items),
  }));
}

export function filterItems(
  searchQuery: string,
  searchTags: Array<string>,
  items: Array<Item>,
) {
  const tokens = tokenize(searchQuery);

  if (tokens.length <= 0) {
    return items;
  }

  return items
    .filter(
      (item) =>
        searchTags.length === 0 || searchTags.some((tag) => (item.tags ?? []).includes(tag)),
    )
    .filter((item) => {
      const title = tokenize(item.title ?? '').join(' ');
      const variantTitles = item.variants.reduce<Array<string>>(
        (titles, variant) => [...titles, variant.variantTitle],
        [],
      );

      const finalSearchString = [title, ...variantTitles].join(' ');

      const matches = tokens.filter((token) => finalSearchString.includes(token));

      return !!matches.length;
    });
}
