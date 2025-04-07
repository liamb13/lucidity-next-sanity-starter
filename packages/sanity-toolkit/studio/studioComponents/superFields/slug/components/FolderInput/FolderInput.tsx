// See: https://github.com/sanity-io/sanity/blob/next/packages/sanity/src/core/form/inputs/Slug/SlugInput.tsx
// Customised specifically at time of this commit: https://github.com/sanity-io/sanity/blob/d157fca17d146886413f86577258fb24ee35e3d2/packages/sanity/src/core/form/inputs/Slug/SlugInput.tsx

import React from 'react';
import type { MouseEventHandler, ReactElement } from 'react';
import { Button, Card, Flex, Text } from '@sanity/ui';
import { EditIcon, FolderIcon, LockIcon } from '@sanity/icons';
import styles from './styles.module.css';

export function FolderInput(props: {
  onUnlock: MouseEventHandler<HTMLButtonElement>;
  folderCanUnlock?: boolean;
  folderSlug?: string;
}): ReactElement {
  const { folderSlug, folderCanUnlock = false, onUnlock } = props;

  return (
    <>
      <Card
        paddingLeft={2}
        paddingRight={1}
        paddingY={1}
        border
        radius={1}
        tone="transparent"
        style={{ position: 'relative' }}
      >
        <Flex gap={2} align="center">
          <Text muted>
            <FolderIcon />
          </Text>
          <Text muted className={styles.folderText}>
            {folderSlug}
          </Text>
          <Button
            className={styles.unlockButton}
            icon={folderCanUnlock ? EditIcon : LockIcon}
            onClick={onUnlock}
            title={
              folderCanUnlock ? "Edit path's folder" : 'Folder is locked and cannot be changed'
            }
            mode="bleed"
            tone="primary"
            padding={2}
            fontSize={1}
            disabled={!folderCanUnlock}
          >
            <span />
          </Button>
        </Flex>
      </Card>
      <Text muted size={2}>
        /
      </Text>
    </>
  );
}
