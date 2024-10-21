import path from 'path';
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '882lz72r',
    dataset: 'lucidity-example'
  },

  vite: config => {
    if (!config.resolve) config.resolve = {};

    config.resolve.alias = {
      ...config.resolve.alias ?? {},
      '@': path.resolve(__dirname),
    }

    return config;
  },
});
