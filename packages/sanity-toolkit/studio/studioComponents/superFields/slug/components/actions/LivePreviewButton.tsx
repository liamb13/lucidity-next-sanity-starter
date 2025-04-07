import { Button } from '@sanity/ui';
import { EyeOpenIcon } from '@sanity/icons';
import { useCallback } from 'react';
import type { SuperSlugActionsFn } from '../../types';
import { useSafePreview } from '../../hooks/useSafePreview';
import { useSafeNavigate } from '../../hooks/useSafeNavigate';
import { useIntentLink } from 'sanity/router';
import { INTENT, INTENT_MODE } from '../../../../../constants/intent';
import { joinSlugSegments } from '../../utilities';

export const LivePreviewButton: SuperSlugActionsFn = (props, field) => {
  const { fullPathname } = field;

  const navigate = useSafeNavigate();
  const preview = useSafePreview();

  const intent = useIntentLink({
    intent: INTENT.EDIT,
    params: {
      id: field.document._id,
      type: field.document._type,
      mode: INTENT_MODE.PRESENTATION,
      presentation: 'presentation',
      preview: joinSlugSegments(field.segments ?? []),
    },
  });

  const handleClick = useCallback(() => {
    if (!navigate) {
      return;
    }

    navigate(fullPathname);
  }, [navigate, fullPathname]);

  const clickHandler = navigate ? handleClick : intent.onClick;

  return (
    <Button
      mode="ghost"
      type="button"
      onClick={clickHandler}
      disabled={navigate ? preview === fullPathname : false}
      icon={EyeOpenIcon}
      title="Open live preview"
    />
  );
};
