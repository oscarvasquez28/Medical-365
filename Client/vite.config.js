import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['medical-365-production.up.railway.app', 'd962-148-234-249-85.ngrok-free.app'],
  },
})
