import { defineField } from 'sanity';
export function withFieldset(name, fields) {
    return fields.map((field) => ({
        ...field,
        fieldset: name,
    }));
}
export function withGroup(name, fields) {
    const nameArray = Array.isArray(name) ? name : [name];
    return fields.map((field) => {
        const groupArray = field.group
            ? Array.isArray(field.group)
                ? field.group
                : [field.group]
            : [];
        const combinedGroup = nameArray.concat(groupArray);
        return {
            ...field,
            group: combinedGroup,
        };
    });
}
export function withProps(props, fields) {
    return fields.map((field) => ({
        ...field,
        ...props,
    }));
}
/**
 * Insert a new field or fields into an array of fields after a specified field name.
 * Most commonly used when importing an array of fields from a helper function.
 */
export function sliceInFields(fields, newFields, addAfterFieldName) {
    const afterFieldIndex = fields.findIndex((field) => field.name === addAfterFieldName);
    if (!afterFieldIndex) {
        console.warn(`[spliceInFields] Unable to insert field(s) after field ${addAfterFieldName}. Inserting at end of schema`);
    }
    return [
        ...fields.slice(0, afterFieldIndex),
        ...(Array.isArray(newFields) ? newFields : [newFields]),
        ...fields.slice(afterFieldIndex),
    ];
}
