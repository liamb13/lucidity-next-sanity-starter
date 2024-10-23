import type { ConfigItemGroups, ItemGroups } from '../../types';
import { CiBoxList } from 'react-icons/ci';

export const itemGroups: ConfigItemGroups = [
  {
    name: 'test',
    title: 'Test',
    description: 'A test group',
    icon: CiBoxList,
    items: [
      {
        name: 'function',
        title: 'Test Function call',
        icon: CiBoxList,
        tags: ['test'],
        assetUrl: undefined,
        itemsToAdd: {
          type: 'modularContentBlocks.outer.section',
        },
      },
      {
        name: 'function',
        title: 'Test Function call',
        icon: CiBoxList,
        tags: ['test'],
        variants: [
          {
            variantName: 'variant1',
            variantTitle: 'Variant 1',
            variantAssetUrl: undefined,
            itemsToAdd: ({ index, inputProps, addItems }) => {
              console.log('add item', index, inputProps);
              return addItems([
                {
                  type: 'modularContentBlocks.outer.section',
                },
              ], index);
            },
          }
        ],
      },
      {
        name: 'array',
        title: 'Test Array',
        icon: CiBoxList,
        tags: ['test'],
        variants: [
          {
            variantName: 'variant1',
            variantTitle: 'Variant 1',
            variantAssetUrl: undefined,
            // Return a function to call it, return an object or an array to have them added
            itemsToAdd: [
              {
                type: 'modularContentBlocks.outer.section',
              },
            ],
          }
        ],
      },
      {
        name: 'item1',
        title: 'Item 1',
        icon: CiBoxList,
        tags: ['test'],
        variants: [
          {
            variantName: 'variant1',
            variantTitle: 'Variant 1',
            variantAssetUrl: undefined,
            // Return a function to call it, return an object or an array to have them added
            itemsToAdd: {
              type: 'modularContentBlocks.outer.section',
            },
          },
        ],
      },
    ],
  },
];
