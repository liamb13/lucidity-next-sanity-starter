import type { ArrayOfObjectsInputProps } from 'sanity';
import { useCallback } from 'react';
import { Card, Dialog, Flex, Heading, Stack, Text, TextInput, Tooltip, useClickOutsideEvent } from '@sanity/ui';
import { SearchIcon } from '@sanity/icons';
// import { IoGridOutline } from 'react-icons/io5';
// import { CiBoxList } from 'react-icons/ci';
// import { ViewButton } from './parts/ViewButton';
import { VisualArrayInputArrayFunctionsFn } from './parts/VisualArrayInputArrayFunctions';
import { ArrayItemPicker } from './parts/ArrayItemPicker';
import { itemGroups as configItemGroups } from './mocks/fakeItemGroups';
import { VisualArrayInputProvider } from '../providers/VisualArrayInputProvider';
import type { OnItemAddFn } from '../types';
import { useVisualArrayPickerDialog } from '../hooks/useVisualArrayPickerDialog';
import { useVisualArrayPickerInserter } from '../hooks/useVisualArrayPickerInserter';
import { formatConfigItemGroups } from '../utilities/formatConfigItemGroups';

export function VisualArrayInput() {
  const itemGroups = formatConfigItemGroups(configItemGroups);

  return function VisualArrayInputComponent(props: ArrayOfObjectsInputProps) {
    const {
      openVisualArrayInput,
      isOpen,
      setIsOpen,
      searchQuery,
      setSearchQuery,
      gridView,
      setGridView: _setGridView,
      dialogRef,
    } = useVisualArrayPickerDialog();

    const { addItems } = useVisualArrayPickerInserter({ props });

    const onItemAdd: OnItemAddFn = useCallback(
      ({ itemsToAdd }) => {
        setIsOpen(false);
        addItems({ itemsToAdd });
      },
      [setIsOpen, addItems],
    );

    // @ts-ignore
    return (
      <VisualArrayInputProvider openVisualArrayInput={openVisualArrayInput}>
        {props.renderDefault({
          ...props,
          arrayFunctions: VisualArrayInputArrayFunctionsFn(openVisualArrayInput),
        })}
        {isOpen && (
          <Dialog
            id="visual-array-input-dialog"
            width={5}
            onClose={() => {
              setIsOpen(false);
            }}
            zOffset={1000}
            header={
              <Flex align="center" justify="space-between" gap={2}>
                <Heading as="h2" size={1}>
                  Add item
                </Heading>
              </Flex>
            }
          >
            <Card paddingX={4} ref={dialogRef}>
              <Stack space={2}>
                <Flex
                  align="center"
                  marginTop={4}
                  marginBottom={2}
                  paddingY={1}
                  marginRight={2}
                  gap={4}
                >
                  <Card radius={4} tone="transparent" style={{ flexBasis: '100%' }}>
                    <TextInput
                      aria-label="Search by name"
                      placeholder="Search by name"
                      autoComplete="off"
                      border={false}
                      clearButton={false}
                      fontSize={[2, 2, 1]}
                      icon={SearchIcon}
                      radius={2}
                      value={searchQuery}
                      onChange={(event) => {
                        setSearchQuery(event.currentTarget.value);
                      }}
                      spellCheck={false}
                    />
                  </Card>
                  {/* // @todo turn list view back on once styled
                  <Tooltip
                    content={
                      <Text size={2}>{gridView ? 'List View' : 'Grid View'}</Text>
                    }
                    placement="top"
                  >
                    <ViewButton
                      onClick={() => {
                        setGridView(!gridView);
                      }}
                    >
                      {gridView ? <CiBoxList /> : <IoGridOutline />}
                    </ViewButton>
                  </Tooltip>*/}
                </Flex>
              </Stack>
              <ArrayItemPicker
                itemGroups={itemGroups}
                gridView={gridView}
                onItemAdd={onItemAdd}
              />
            </Card>
          </Dialog>
        )}
      </VisualArrayInputProvider>
    );
  };
}
