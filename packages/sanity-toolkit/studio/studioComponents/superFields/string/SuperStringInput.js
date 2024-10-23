import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { Stack, Text, TextInput } from '@sanity/ui';
import { set, unset } from 'sanity';
import CharacterCount from '../../characterCount/CharacterCount';
export const SuperStringInput = (props) => {
  const { elementProps, onChange, value = '' } = props;
  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange],
  );
  return _jsxs(Stack, {
    space: 2,
    children: [
      _jsx(TextInput, { ...elementProps, onChange: handleChange, value: value }),
      _jsx(Text, {
        align: 'right',
        children: _jsx(CharacterCount, {
          charCount: props.value?.length ?? 0,
          options: props.schemaType.options,
        }),
      }),
    ],
  });
};
