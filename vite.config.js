import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/openoura_landing_page/',
  plugins: [react()],
})