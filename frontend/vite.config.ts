import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward model & predict API calls to backend during development
      '/models': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/models/, '/models'),
      },
      '/predict': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
