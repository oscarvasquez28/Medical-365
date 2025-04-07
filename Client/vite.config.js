import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['medical-365-production.up.railway.app', 'fb3f-2806-108e-18-46a1-593a-2053-e18a-a1a5.ngrok-free.app'],
  },
})
