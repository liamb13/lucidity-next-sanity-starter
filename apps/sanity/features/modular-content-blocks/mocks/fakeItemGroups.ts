import type {
  ConfigItem,
  ConfigItemGroups,
} from '@pkg/sanity-toolkit/visual-array-input/types';
import { CiBoxList } from 'react-icons/ci';
import { TbGridPattern } from 'react-icons/tb';
import { WIZARD_GROUPS } from '@/features/modular-content-blocks/constants/wizardGroups';
import { PiLego } from 'react-icons/pi';
import { SiHiveBlockchain } from 'react-icons/si';
import { GrClone } from 'react-icons/gr';
import { Image, SanityClient } from 'sanity';
import { OBJECT } from '@pkg/common/constants/schemaTypes';
import { defineQuery } from 'groq';
import { FaRecycle } from 'react-icons/fa';
import imageUrlBuilder from '@sanity/image-url';

export interface ReusableBlockDocument {
  _id: string;
  _type: string;
  title?: string;
  image?: Image;
  content?: ModularContentBlocks;
}

export type ModularContentBlocks = Array<ModularBlock> | null;

export interface ModularBlock {
  _type: OBJECT;
  _key: string;

  [key: string]: unknown;
}

const coreSectionPatternsQuery = defineQuery(`
  { 'coreSectionPatterns': *[_type == "page"] }
`);

export const itemGroups: ConfigItemGroups = [
  {
    name: WIZARD_GROUPS.CORE_SECTION_PATTERNS,
    title: 'Section Patterns',
    description:
      'Section Patterns are pre-made groups of Outer and Inner blocks that are commonly used across the site. They allow for fast page creation, without adding all the Inner blocks yourself.',
    icon: TbGridPattern,
    items: async ({ client }: { client: SanityClient }) => {
      const { coreSectionPatterns } = await client.fetch<{
        coreSectionPatterns: Array<ReusableBlockDocument>;
      }>(coreSectionPatternsQuery);

      return reusableBlocksToConfigItems(coreSectionPatterns, client);
    },
  },
  {
    name: WIZARD_GROUPS.DEFAULT,
    title: 'Blocks',
    description:
      'The modular content blocks used to build pages. Use these to build sections on this page or add more content to existing sections.',
    icon: PiLego,
    items: [
      {
        title: 'Section',
        icon: CiBoxList,
        tags: ['test'],
        variants: [
          {
            variantTitle: 'Variant 1',
            variantAssetUrl: undefined,
            itemsToAdd: ({ index, inputProps, addItems }) => {
              console.log('add item', index, inputProps);
              return addItems(
                [
                  {
                    type: 'modularContentBlocks.outer.section',
                  },
                ],
                index,
              );
            },
          },
        ],
      },
      {
        title: 'Contents',
        icon: CiBoxList,
        tags: ['test'],
        variants: [
          {
            variantTitle: 'Variant 1',
            variantAssetUrl: undefined,
            // Return a function to call it, return an object or an array to have them added
            itemsToAdd: [
              {
                type: 'modularContentBlocks.outer.section',
              },
            ],
          },
        ],
      },
      {
        title: 'Section Thing',
        icon: CiBoxList,
        tags: ['test'],
        variants: [
          {
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
    name: WIZARD_GROUPS.REUSABLE,
    title: 'Reusable Blocks',
    description:
      'Reusable blocks can be created once and then quickly inserted into any page, e.g. to quickly scaffold landing pages',
    icon: GrClone,
    items: [],
  },
  {
    name: WIZARD_GROUPS.NICHE,
    title: 'Niche Blocks',
    description:
      'Niche blocks are created for specific purposes, and should almost never be needed otherwise',
    icon: SiHiveBlockchain,
    items: [],
  },
];

function reusableBlocksToConfigItems(
  reusableBlocks: Array<ReusableBlockDocument>,
  client: SanityClient,
) {
  const builder = imageUrlBuilder(client);

  return reusableBlocks.map((blockDoc) => ({
    name: blockDoc.title ?? 'Unnamed Block', // @todo remove name entirely from all items and variants—not needed
    title: blockDoc.title ?? 'Unnamed Block',
    icon: FaRecycle,
    assetUrl: blockDoc.image && builder.image(blockDoc.image).width(600).url(),
    itemsToAdd:
      blockDoc.content?.map((block) => ({
        type: block._type,
        initialValue: block,
      })) ?? [],
  })) satisfies Array<ConfigItem>;
}
