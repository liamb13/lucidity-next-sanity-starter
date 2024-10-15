import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '882lz72r',
    dataset: 'lucidity-example'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
