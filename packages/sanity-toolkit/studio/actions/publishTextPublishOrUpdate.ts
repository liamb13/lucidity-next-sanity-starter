import { type DocumentActionComponent } from 'sanity';
import { useEffect, useState } from 'react';

/**
 * Sanity Document Action that replaces the label of the default 'publish' action with "Update" if the
 * document has already been published.
 */
export function changePublishText(originalPublishAction: DocumentActionComponent) {
  const PublishAndUpdateDate: DocumentActionComponent = (props) => {
    const originalResult = originalPublishAction(props);

    const [isPublished, setIsPublished] = useState(false);

    useEffect(() => {
      if (props.draft && !props.published) {
        setIsPublished(false);
      } else {
        setIsPublished(true);
      }
    }, [props.draft, props.published]);

    return {
      ...originalResult,

      label: isPublished ? 'Update' : (originalResult?.label ?? 'Publish'),
    };
  };

  return PublishAndUpdateDate;
}
