import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://dukes-1234-backend.vercel.app',
        
    },
  },
  plugins: [react()],
})
