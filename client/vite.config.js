import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'picocss': path.resolve(__dirname, '../node_modules/@picocss/pico/css')
    }
  },
  server: {
     proxy: {
      '/details': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/earrings': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/bracelets': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/necklaces': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/rings': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/jewelrySets': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
