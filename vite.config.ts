/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
  },
  build: {
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'form-wizard-vue3',
      fileName: format => `form-wizard-vue3.${format}.js`
    }
  }
})
