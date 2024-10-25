import type { Item, ItemGroup, OnItemAdd } from './main';
import type { SanityClient } from 'sanity';

export type ConfigBaseItem = Pick<Item, 'title' | 'icon' | 'tags'>;

export interface ConfigItemWithoutVariants extends ConfigBaseItem {
  assetUrl?: string;
  itemsToAdd: OnItemAdd;
}

export type ConfigItemWithVariants = ConfigBaseItem & Pick<Item, 'variants'>;

export type ConfigItem = ConfigItemWithVariants | ConfigItemWithoutVariants;

export type ConfigItemGroupBase = Omit<ItemGroup, 'items'>;
export type ConfigItemGroupCallable = ConfigItemGroupBase & {
  items: ({ client }: { client: SanityClient }) => Promise<Array<ConfigItem>>;
};
export type ConfigItemGroupStatic = ConfigItemGroupBase & {
  items: Array<ConfigItem>;
};

export type ConfigItemGroup = ConfigItemGroupCallable | ConfigItemGroupStatic;

export type ConfigItemGroups = Array<ConfigItemGroup>;
