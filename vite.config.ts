import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, './src/data'),
      '@interface': path.resolve(__dirname, './src/interface'),
    }
  },
  plugins: [svelte()]
})
