import {
  DefaultDocumentNodeContext,
  StructureBuilder,
  View,
  ViewBuilder,
} from 'sanity/structure';
import { LuPencilLine } from 'react-icons/lu';
import { isDeveloperOrAdmin } from '@pkg/sanity-toolkit/studio/utilities/roles';
import { JsonPane } from '@pkg/sanity-toolkit/studio/panes/json-pane';

export function defaultViews(
  S: StructureBuilder,
  context: DefaultDocumentNodeContext,
): Array<View | ViewBuilder> {
  const views: Array<View | ViewBuilder> = [S.view.form().icon(LuPencilLine)];

  if (isDeveloperOrAdmin(context.currentUser)) {
    views.push(JsonPane(S));
  }

  // if (PREVIEWABLE_DOCUMENT_TYPES.includes(context.schemaType)) {
  //   views.push(previewPane(S, context, options.apiVersion));
  // }

  // if (SEO_PREVIEW_DOCUMENT_TYPES.includes(context.schemaType)) {
  //   views.push(seoPreviewPane(S));
  // }

  // if (INCOMING_REFERENCE_LIST.includes(context.schemaType)) {
  //   views.push(backlinksPane(S));
  // }

  return views;
}