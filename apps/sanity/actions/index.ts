import {
  modifyActions,
  defineActionModifier,
} from '@pkg/sanity-toolkit/studio/actions/resolver';
import { changePublishText } from '@pkg/sanity-toolkit/studio/actions/changePublishText';

// See: https://www.sanity.io/docs/document-actions

export const documentActions = modifyActions([
  /** Add list of modifiers here, defined using `defineActionModifier()` */
  defineActionModifier({
    actions: ['publish'],
    handler: (action) => changePublishText(action, 'Update'), // Use "Update" if document already published
  }),
]);
