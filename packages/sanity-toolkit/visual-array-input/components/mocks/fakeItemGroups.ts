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
        name: 'section',
        title: 'Section',
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
        name: 'contents',
        title: 'Contents',
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
        name: 'sectionThing',
        title: 'Section Thing',
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
  {
    name: 'ping',
    title: 'Ping',
    description: 'Another group',
    icon: CiBoxList,
    items: [
      {
        name: 'section',
        title: 'Section',
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
        name: 'contents',
        title: 'Contents',
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
        name: 'sectionThing',
        title: 'Section Thing',
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
