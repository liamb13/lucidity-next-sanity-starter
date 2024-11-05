import {
  modifyActions,
  defineActionModifier,
  defineNewAction,
} from '@pkg/sanity-toolkit/studio/actions/resolver';
import { changePublishText } from '@pkg/sanity-toolkit/studio/actions/changePublishText';

// See: https://www.sanity.io/docs/document-actions

export const documentActions = modifyActions([
  /** Add list of modifiers here, defined using `defineActionModifier()` or `defineNewAction()` */
  defineActionModifier({
    actions: ['publish'],
    handler: (action) => changePublishText(action, 'Update'), // Use "Update" if document already published
  }),
]);
