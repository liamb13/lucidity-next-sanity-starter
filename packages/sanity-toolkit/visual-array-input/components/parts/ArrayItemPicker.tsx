import { Stack, ThemeProvider } from '@sanity/ui';
import { buildTheme } from '@sanity/ui/theme';
import styled from 'styled-components';
import type { ItemGroups, OnItemAddFn } from '../../types';
import { ItemGroupHeading } from './ItemGroupHeading';
import { ItemListView } from './ItemListView';
import { ItemGridCard } from './ItemGridCard';

interface Props {
  itemGroups: ItemGroups;
  onItemAdd: OnItemAddFn;
  gridView?: boolean;
}

const Wrapper = styled.div`
  height: 450px;
  @media only screen and (min-width: 768px) {
    height: 650px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

export function ArrayItemPicker({
  itemGroups = [],
  onItemAdd,
  gridView = true,
}: Readonly<Props>) {
  return (
    <ThemeProvider theme={buildTheme()}>
      <Wrapper>
        <Stack space={4} paddingY={3}>
          {gridView && (
            itemGroups
              .filter((itemGroup) => itemGroup.items.length)
              .map((itemGroup) => (
                <Stack key={itemGroup.name} space={3}>

                  <ItemGroupHeading itemGroup={itemGroup} />
                  <Stack space={2} paddingY={3}>
                    <Grid>
                      {itemGroup.items.map((item) => (
                        <ItemGridCard
                          key={item.title}
                          item={item}
                          onItemAdd={onItemAdd}
                        />
                      ))}
                    </Grid>
                  </Stack>
                </Stack>
              ))
          )}

          {!gridView && (
            <Stack space={4}>
              {itemGroups
                .filter((itemGroup) => itemGroup.items.length)
                .map((itemGroup) => (
                  <Stack key={itemGroup.name} space={3}>

                    <ItemGroupHeading itemGroup={itemGroup} showDescription={false} />
                    <Stack space={2} paddingY={3}>
                      {itemGroup.items.map((item) => (
                        <ItemListView
                          key={item.title}
                          item={item}
                          onItemAdd={onItemAdd}
                        />
                      ))}
                    </Stack>
                  </Stack>
                ))}
            </Stack>
          )}
        </Stack>
      </Wrapper>
    </ThemeProvider>
  );
}
