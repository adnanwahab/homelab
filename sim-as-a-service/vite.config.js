import { defineConfig } from 'vite'

export default defineConfig({
  port: 3333, 
  root: 'sim-as-a-service',
  build: {
    outDir: '../dist'
  }
}) 