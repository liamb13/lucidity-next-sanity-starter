import { Card, Text } from '@sanity/ui';
import styled from 'styled-components';
import { useColorSchemeValue } from 'sanity';
import type { Item, OnItemAddFn } from '../../types';

interface Props {
  item: Item;
  onItemAdd: OnItemAddFn;
}

const BlockVariantCardWrapper = styled(Card)<{ $currentScheme?: 'light' | 'dark' }>`
  --hover-bg: ${(props) => (props.$currentScheme === 'light' ? '#F2F3F5' : '#2A2C30')};

  all: initial;
  border-radius: 0.1875rem;

  &:hover {
    background: var(--hover-bg);
    cursor: pointer;
  }
`;

export function ItemListView({ item, onItemAdd }: Readonly<Props>) {
  const scheme = useColorSchemeValue();

  // @todo support multiple variants
  const itemVariant = item.variants[0];

  if (!itemVariant) return;

  const itemTitle = item.title;

  // @todo do the styling for ListView

  return (
    <BlockVariantCardWrapper
      as="button"
      type="button"
      tone="transparent"
      data-has-asset={!!itemVariant.variantAssetUrl}
      padding={2}
      radius={2}
      style={{ position: 'relative' }}
      onClick={() => {
        // Change this to call the original add function from ArrayInput
        onItemAdd({ itemsToAdd: itemVariant.itemsToAdd });
      }}
      $currentScheme={scheme}
    >
      <Text>{itemTitle}</Text>
    </BlockVariantCardWrapper>
  );
}
