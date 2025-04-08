import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['medical-365-production.up.railway.app', '3bb6-200-68-164-10.ngrok-free.app'],
  },
})
