import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from a subpath; Vercel serves it from /. 
  base: process.env.GITHUB_ACTIONS ? '/React/midterm/' : '/',
})
