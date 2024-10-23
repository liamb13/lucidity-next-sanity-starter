import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {} from 'react';
import { Stack, Text } from '@sanity/ui';
import { toPlainText } from '@portabletext/toolkit';
import './SuperPTEInput.css';
import CharacterCount from '../../characterCount/CharacterCount';
/**
 * PTE with options for character count (with min and max length), initial height, and initial active.
 */
export function SuperPTEInput(props) {
    const { value, schemaType } = props;
    const charCount = value ? toPlainText(value).length : 0;
    const { showCount, maxLength, minLength } = schemaType.options ?? {};
    return (_jsxs(Stack, { space: 3, children: [_jsx("div", { className: "super-pte-container", style: {
                    '--pte-container-height': schemaType.options?.initialHeight ?? 'unset',
                }, id: 'PTE-height-container', children: props.renderDefault({
                    ...props,
                    initialActive: schemaType.options?.initialActive ?? false,
                }) }), (showCount ?? maxLength ?? minLength) && (_jsx(Text, { muted: true, align: 'right', size: 1, children: _jsx(CharacterCount, { charCount: charCount, options: schemaType.options }) }))] }));
}
