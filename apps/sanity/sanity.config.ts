import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema/types';
import { codeInput } from '@sanity/code-input';
import { structure } from '@/structure';
import { defaultDocumentNode } from '@/structure/defaultDocumentNode';

export default defineConfig({
  name: 'default',
  title: 'My Sanity App',

  projectId: '882lz72r',
  dataset: 'lucidity-example',

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
