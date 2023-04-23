import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Site-RickandMorty/", // pour déployer sur github pages
  plugins: [vue()],
})


