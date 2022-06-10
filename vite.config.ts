/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.vue'],
      reporter: ['text', 'html', 'lcov']
    }
  }
})
