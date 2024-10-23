import type { ArrayOfObjectsInputProps } from 'sanity';
import { useCallback, useMemo } from 'react';
import { VisualArrayInputProvider } from '../providers/VisualArrayInputProvider';
import type { ConfigItemGroups, OnItemAddFn } from '../types';
import { useVisualArrayPickerDialog } from '../hooks/useVisualArrayPickerDialog';
import { useVisualArrayPickerInserter } from '../hooks/useVisualArrayPickerInserter';
import { formatConfigItemGroups } from '../utilities/formatConfigItemGroups';
import { VisualArrayInputArrayFunctionsFn } from './parts/VisualArrayInputArrayFunctions';
import { ArrayItemPicker } from './parts/ArrayItemPicker';
import { ArrayItemDialogShell } from './parts/ArrayItemDialogShell';
import { ArrayItemDialogControls } from './parts/ArrayItemDialogControls';

export function VisualArrayInput(configItemGroups: ConfigItemGroups) {

  return function VisualArrayInputComponent(props: ArrayOfObjectsInputProps) {
    const itemGroups = useMemo(() => formatConfigItemGroups(configItemGroups), [configItemGroups]);

    const {
      openVisualArrayInput,
      isOpen,
      setIsOpen,
      searchQuery,
      setSearchQuery,
      gridView,
      setGridView,
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

    return (
      <VisualArrayInputProvider openVisualArrayInput={openVisualArrayInput}>
        {props.renderDefault({
          ...props,
          arrayFunctions: VisualArrayInputArrayFunctionsFn(openVisualArrayInput),
        })}
        {isOpen && (
          <ArrayItemDialogShell setIsOpen={setIsOpen} dialogRef={dialogRef}>
            <ArrayItemDialogControls searchQuery={searchQuery} setSearchQuery={setSearchQuery}  gridView={gridView} setGridView={setGridView}/>
            <ArrayItemPicker
              itemGroups={itemGroups}
              searchQuery={searchQuery}
              gridView={gridView}
              onItemAdd={onItemAdd}
            />
          </ArrayItemDialogShell>
        )}
      </VisualArrayInputProvider>
    );
  };
}
