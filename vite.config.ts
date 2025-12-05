import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/public-api-requests-react/',
  plugins: [react()],
  build: {
    outDir: 'docs'
  },
  server: {
    port: 3000,
    open: true
  }
})