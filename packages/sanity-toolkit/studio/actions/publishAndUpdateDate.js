import { useDocumentOperation } from 'sanity';
/**
 * Set a field with the current date when a document is published.
 * If the field already has a value, it will not be overridden.
 * Defaults to the `publishedAt` field. Specify the fieldname in the second parameter.
 */
export function publishAndUpdateDate(originalPublishAction, fieldName = 'publishedAt') {
    const PublishAndUpdateDate = (props) => {
        const originalResult = originalPublishAction(props);
        const { patch } = useDocumentOperation(props.id, props.type);
        if (!originalResult) {
            return originalResult;
        }
        return {
            ...originalResult,
            onHandle: () => {
                if (!props.draft?.[fieldName]) {
                    patch.execute([{ set: { [fieldName]: new Date().toISOString() } }]);
                }
                if (originalResult?.onHandle) {
                    originalResult.onHandle();
                }
            },
        };
    };
    return PublishAndUpdateDate;
}
