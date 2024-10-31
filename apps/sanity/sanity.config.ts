import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema/types';
import { codeInput } from '@sanity/code-input';
import { structure } from '@/structure';
import { defaultDocumentNode } from '@/structure/defaultDocumentNode';
import { appConfig } from './config/app';

export default defineConfig({
  name: 'default',
  title: appConfig.title,

  projectId: appConfig.projectId,
  dataset: appConfig.dataset,

  plugins: [
    codeInput(),
    // Add the Structure Tool
    structureTool({
      name: 'content',
      title: 'Content',
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
