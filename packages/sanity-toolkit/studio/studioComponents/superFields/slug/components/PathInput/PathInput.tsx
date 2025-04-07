// See: https://github.com/sanity-io/sanity/blob/next/packages/sanity/src/core/form/inputs/Slug/SlugInput.tsx
// Customised specifically at time of this commit: https://github.com/sanity-io/sanity/blob/d157fca17d146886413f86577258fb24ee35e3d2/packages/sanity/src/core/form/inputs/Slug/SlugInput.tsx

import { Box, Flex, TextInput } from '@sanity/ui';
import type { FormEventHandler, MouseEventHandler, ReactElement } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { SuperSlugInputProps } from '../../types';
import { FolderInput } from '../FolderInput';
import type { UpdateSlugFn } from '../../hooks/useSuperSlugField';
import { joinSlugSegments } from '../../utilities';

const folderOptionDefaults = { canUnlock: true };

export function PathInput(
  props: Omit<SuperSlugInputProps, 'onChange'> & {
    apiVersion: string;
    disabled?: boolean;
    onChange: UpdateSlugFn;
    folderSlug?: string;
    slug?: string;
  },
): ReactElement {
  const {
    schemaType,
    disabled,
    validation,
    folderSlug,
    slug,
    readOnly,
    elementProps,
    onChange,
  } = props;
  const { folder: folderOptions = folderOptionDefaults } = schemaType.options ?? {};

  const [folderLocked, setFolderLocked] = useState(!!folderSlug);
  const folderCanUnlock = !readOnly && folderOptions.canUnlock;

  const pathInputRef = useRef<HTMLInputElement>(null);

  const value = folderLocked && folderSlug ? slug : joinSlugSegments([folderSlug, slug]);

  const handleUnlock: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault();
      setFolderLocked(false);
      requestAnimationFrame(() => {
        pathInputRef.current?.focus();
      });
    },
    [setFolderLocked, pathInputRef],
  );

  const handleChange: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault();
      let value: string | undefined = event.currentTarget.value;

      if (folderLocked && folderSlug) {
        // When updating only the final path segment, we don't allow slashes / sub-paths.
        // User must unlock the folder before doing so.
        value = joinSlugSegments([folderSlug, removeTrailingSlash(value)]);
      }

      void onChange(value);
    },
    [folderLocked, folderSlug, onChange],
  );

  const errors = useMemo(
    () => validation.filter((item) => item.level === 'error'),
    [validation],
  );

  return (
    <Flex gap={1} align="center">
      {folderLocked && folderSlug && (
        <FolderInput {...{ folderSlug, folderCanUnlock, onUnlock: handleUnlock }} />
      )}
      <Box flex={1}>
        <TextInput
          {...elementProps}
          ref={pathInputRef}
          customValidity={errors.length > 0 ? errors[0]?.message : ''}
          disabled={disabled}
          value={value ?? ''}
          readOnly={readOnly}
          onChange={handleChange}
        />
      </Box>
    </Flex>
  );
}

function removeTrailingSlash(string: string | undefined): string | undefined {
  if (!string) {
    return string;
  }

  if (string.endsWith('/')) {
    return string.slice(0, -1);
  }

  return string;
}
