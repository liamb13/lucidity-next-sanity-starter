import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema/types'

export default defineConfig({
  name: 'default',
  title: 'My Sanity App',

  projectId: '882lz72r',
  dataset: 'lucidity-example',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
