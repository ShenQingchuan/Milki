import process from 'node:process'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Inspect from 'vite-plugin-inspect'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const plugins: PluginOption[] = [
    react(),
    Inspect(),
  ]
  if (process.env.NODE_ENV !== 'test')
    plugins.push(webfontDownload())

  return {
    plugins,
    server: {
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:7611',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
