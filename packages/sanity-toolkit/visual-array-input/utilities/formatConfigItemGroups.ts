import type {
  ConfigItemGroups,
  ConfigItemWithoutVariants,
  ConfigItemWithVariants,
  ItemGroups,
} from '../types';

export function formatConfigItemGroups(configItemGroups: ConfigItemGroups) {
  return configItemGroups.map((group) => ({
    ...group,
    items: group.items
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
  })) satisfies ItemGroups;
}

function hasVariants(
  item: ConfigItemWithoutVariants | ConfigItemWithVariants,
): item is ConfigItemWithVariants {
  return (item as ConfigItemWithVariants).variants !== undefined;
}
