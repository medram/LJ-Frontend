import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  publicDir: './public',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@images":      path.resolve(__dirname, "./public/images"),
      "@components":  path.resolve(__dirname, "./src/components"),
      "@assets":      path.resolve(__dirname, "./src/assets"),
      "@api":         path.resolve(__dirname, "./src/api"),
      "@hooks":       path.resolve(__dirname, "./src/hooks"),
      "@pages":       path.resolve(__dirname, "./src/pages"),
      "@utils":       path.resolve(__dirname, "./src/utils")
    }
  },
  server: {
    port: 3000
  }
})
