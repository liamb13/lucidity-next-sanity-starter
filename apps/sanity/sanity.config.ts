import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema/types';
import { codeInput } from '@sanity/code-input';
import { defaultDocumentNode } from '@/structure/defaultDocumentNode';
import { setupSingletons } from '@pkg/sanity-toolkit/studio/singletons';
import { LOCKED_DOCUMENT_TYPES } from '@pkg/common/config/schemaTypes';
import { noteField } from '@pkg/sanity-toolkit/studio/studioComponents/noteField/plugin';
import { PreventClickAwayItemComponent } from '@pkg/modular-content-blocks/sanity/components/PreventClickAwayItemComponent';
import { structure } from '@/structure';
import { documentActions } from '@/actions';
import { appConfig } from './config/app';
import { presentationTool } from 'sanity/presentation';

export default defineConfig({
  name: 'default',
  title: appConfig.title,

  projectId: appConfig.projectId,
  dataset: appConfig.dataset,

  plugins: [
    noteField(),
    codeInput(),
    setupSingletons(LOCKED_DOCUMENT_TYPES),
    structureTool({
      name: 'content',
      title: 'Content',
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: appConfig.preview.domain,
        previewMode: {
          enable: appConfig.preview.draftModeRouteEnable,
          disable: appConfig.preview.draftModeRouteDisable,
        },
      },
    }),
  ],

  document: {
    actions: documentActions,
  },

  form: {
    components: {
      item: PreventClickAwayItemComponent,
    },
  },

  schema: {
    types: schemaTypes,
  },
});
