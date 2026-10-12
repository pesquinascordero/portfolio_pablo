import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, /api se reenvía a la API local. Así no hace falta CORS.
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    },
  },
})
