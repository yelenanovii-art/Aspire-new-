import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' — clean History-API URLs with nested paths (e.g. /services/social-media)
// resolve their assets from the domain root.
//
// Dedicated ports so this site never collides with rck-web (5180/4180) or the
// older aspire-agency-web-new (5173).
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 5190, strictPort: true },
  preview: { port: 4190, strictPort: true },
})
