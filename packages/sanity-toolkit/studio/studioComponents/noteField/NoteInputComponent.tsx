import React from 'react';
import { Card, Flex, Box, Inline, Heading, Text } from '@sanity/ui';
import type { NoteFieldInputProps } from './types';

const toTitleCase = (str: string): string => {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function NoteInputComponent({ schemaType, path }: Readonly<NoteFieldInputProps>) {
  const { title, description, options } = schemaType;

  const pathId = String(path.at(-1));
  const displayTitle = toTitleCase(pathId) === title ? null : title;

  const { icon: Icon, tone = 'primary' } = options ?? {};

  if (!displayTitle && !description) return null;

  return (
    <Card padding={[2, 4]} radius={3} tone={tone}>
      {displayTitle && (
        <Box marginBottom={description ? 2 : 0}>
          <Inline space={1}>
            {Icon && <Icon />}
            <Heading size={1}>{displayTitle}</Heading>
          </Inline>
        </Box>
      )}
      {description && (
        <Flex align="center">
          <Box style={{ flexShrink: 0, lineHeight: 0 }}>
            {Icon && !displayTitle && <Icon style={{ fontSize: 24 }} />}
          </Box>
          <Box marginLeft={displayTitle ? 0 : 3} marginTop={!Icon && displayTitle ? 1 : 0}>
            <Text size={[1, 1, 1]}>{description}</Text>
          </Box>
        </Flex>
      )}
    </Card>
  );
}
