import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'node:os'
import path from 'node:path'

// https://vite.dev/config/
// Use OS temp directory for Vite cache to avoid OneDrive file locking issues
const cacheDir = path.join(os.tmpdir(), 'vite-cache', 'placement-portal-frontend')

export default defineConfig({
  plugins: [react()],
  cacheDir,
})
