import VueRouter from 'vue-router/vite'

import { type AliasOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const root = path.resolve(__dirname, 'src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter({}), vue()],
  resolve: {
    alias: {
      '@': root,
    } as AliasOptions,
  },
})
