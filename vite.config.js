import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: '/CombinatorialCalculator/',
  plugins: [viteSingleFile()],
  build: {
    minify: false, // Keep readable JS and CSS
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensure everything is inlined
      },
    },
  },
})
