import type {
  ConfigItemGroups,
  ConfigItemWithoutVariants,
  ConfigItemWithVariants,
  ItemGroups,
} from '../types';

/**
 * Take an Item Groups Config object and format it so its standardised as an Item Groups for use.
 * This is because the Config object is a bit more relaxed:
 *  - It supports having no variants on an item, and putting the assetUrl and initialValue on the item itself
 *  - It supports defining just a name for an item or for a variant, and not needing a title
 */
export function formatConfigItemGroups(configItemGroups: ConfigItemGroups) {
  return configItemGroups.map((group) => {
    let items = group.items;

    // This is an async entry, which should be being resolved in a useEffect externally
    if (typeof group.items === 'function') {
      items = [];
    }

    return {
      ...group,
      items: items
        /* Ensure all items have a variants array, as config doesn't require variants if there's only one */
        .map((item) => {
          if (hasVariants(item)) {
            return item;
          }

          return {
            ...item,
            variants: [
              {
                variantName: item.name,
                variantTitle: item.title,
                variantAssetUrl: item.assetUrl,
                itemsToAdd: item.itemsToAdd,
              },
            ],
          };
        })
        /* Ensure that all items and variants have a title, as these are optional */
        .map((item) => {
          return {
            ...item,
            title: item.title ?? item.name,
            variants: item.variants.map((variant) => ({
              ...variant,
              variantTitle: variant.variantTitle ?? variant.variantName,
            })),
          };
        }),
    };
  }) satisfies ItemGroups;
}

function hasVariants(
  item: ConfigItemWithoutVariants | ConfigItemWithVariants,
): item is ConfigItemWithVariants {
  return (item as ConfigItemWithVariants).variants !== undefined;
}
