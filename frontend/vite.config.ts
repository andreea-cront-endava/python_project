import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pow':       'http://127.0.0.1:8000',
      '/fibonacci': 'http://127.0.0.1:8000',
      '/factorial': 'http://127.0.0.1:8000',
    }
  }
})