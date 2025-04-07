// See: https://github.com/sanity-io/sanity/blob/next/packages/sanity/src/core/form/inputs/Slug/SlugInput.tsx
// Customised specifically at time of this commit: https://github.com/sanity-io/sanity/blob/d157fca17d146886413f86577258fb24ee35e3d2/packages/sanity/src/core/form/inputs/Slug/SlugInput.tsx

import { Fragment } from 'react';
import type { ComponentType } from 'react';
import type { SuperSlugInputProps } from '../types';
import styles from './styles.module.css';
import { SuperSlug } from './index';
import { Box, Card, Flex, Stack } from '@sanity/ui';
import { useSuperSlugField } from '../hooks/useSuperSlugField';

export function makeSuperSlugInput({ apiVersion }: { apiVersion: string }) {
  const SuperSlugInput: ComponentType<SuperSlugInputProps> = (props) => {
    const { readOnly, schemaType } = props;
    const { source: sourceField, hideGenerate = false, actions } = schemaType.options ?? {};

    const superSlugField = useSuperSlugField({ ...props, apiVersion });

    return (
      <Stack space={3}>
        <Flex gap={1}>
          <Box flex={1}>
            <SuperSlug.PathInput
              {...props}
              apiVersion={apiVersion}
              disabled={superSlugField.isGenerating}
              folderSlug={superSlugField.folderSlug}
              slug={superSlugField.slug}
              onChange={superSlugField.updateSlug}
            />

            {superSlugField.generateSlugState?.status === 'error' && (
              <Card padding={2} tone="critical">
                {superSlugField.generateSlugState.error.message}
              </Card>
            )}
          </Box>

          {!hideGenerate && sourceField && (
            <SuperSlug.GenerateButton
              isGenerating={superSlugField.isGenerating}
              readOnly={!!readOnly}
              onClick={superSlugField.handleGenerateSlug}
            />
          )}

          {!!actions &&
            actions.length > 0 &&
            actions.map((action, index) => (
              // eslint-disable-next-line react/no-array-index-key -- No unique key available, but not really a problem
              <Fragment key={index}>{action({ ...props }, superSlugField)}</Fragment>
            ))}
        </Flex>

        <div className={styles.superSlugInput__preview}>
          <SuperSlug.FullUrlPreview fullPathname={superSlugField.fullPathname} />
        </div>
      </Stack>
    );
  };

  return SuperSlugInput;
}
