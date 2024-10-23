import { useState, useRef, useCallback } from 'react';
import { useClickOutsideEvent } from '@sanity/ui';

export function useVisualArrayPickerDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState(true);
  const dialogRef = useRef(null);

  useClickOutsideEvent(
    () => {
      setIsOpen(false);
    },
    () => [dialogRef.current],
  );

  const openVisualArrayInput = useCallback(
    () => {
      setIsOpen(true);
    },
    [setIsOpen],
  );

  return {
    openVisualArrayInput,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    searchQuery,
    setSearchQuery,
    gridView,
    setGridView,
    dialogRef,
  };
}
