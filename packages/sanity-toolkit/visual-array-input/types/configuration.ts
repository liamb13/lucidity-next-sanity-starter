import type { Item, ItemGroup, OnItemAdd } from './main';

export type ConfigBaseItem = Pick<Item, 'name' | 'title' | 'icon' | 'tags'>;

export interface ConfigItemWithoutVariants extends ConfigBaseItem {
  assetUrl?: string;
  itemsToAdd: OnItemAdd;
}

export type ConfigItemWithVariants = ConfigBaseItem & Pick<Item, 'variants'>;

export type ConfigItem = ConfigItemWithVariants | ConfigItemWithoutVariants;

export type ConfigItemGroup = Omit<ItemGroup, 'items'> & {
  items: Array<ConfigItem>;
}

export type ConfigItemGroups = Array<ConfigItemGroup>;
