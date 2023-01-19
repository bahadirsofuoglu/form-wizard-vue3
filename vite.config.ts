import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        minify: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'form-wizard-vue3',
            fileName: format => `form-wizard-vue3.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                assetFileNames: `form-wizard-vue3.[ext]`,
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    resolve: {
        dedupe: ['vue']
    }
})
