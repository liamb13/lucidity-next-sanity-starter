import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { Stack, Text, TextArea } from '@sanity/ui';
import { set, unset } from 'sanity';
import CharacterCount from '../../characterCount/CharacterCount';
export const SuperTextInput = (props) => {
    const { elementProps, onChange, value = '' } = props;
    const handleChange = useCallback((event) => {
        const nextValue = event.currentTarget.value;
        onChange(nextValue ? set(nextValue) : unset());
    }, [onChange]);
    return (_jsxs(Stack, { space: 2, children: [_jsx(TextArea, { ...elementProps, onChange: handleChange, value: value, style: { resize: 'vertical' } }), _jsx(Text, { align: 'right', children: _jsx(CharacterCount, { charCount: props.value?.length ?? 0, options: props.schemaType.options }) })] }));
};
