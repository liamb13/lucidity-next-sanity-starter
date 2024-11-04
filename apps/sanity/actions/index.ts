import { DocumentActionsResolver } from 'sanity';
import {
  modifyActions,
  defineActionModifier,
  modifyActionsFn,
} from '@pkg/sanity-toolkit/studio/actions/resolver';
import { changePublishText } from '@pkg/sanity-toolkit/studio/actions/changePublishText';

// See: https://www.sanity.io/docs/document-actions

const useLabelPublishOrUpdate = defineActionModifier({
  actions: ['publish'],
  handler: (action) => changePublishText(action, 'Update'), // Use "Update" if document already published
});

export const documentActions = modifyActionsFn([
  /** Add list of modifiers here, defined using `defineActionModifier()` */
  useLabelPublishOrUpdate,
]);
