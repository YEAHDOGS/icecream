import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this repo at https://<owner>.github.io/icecream/ — the
// base path makes every asset URL resolve under that folder. Point a custom
// domain (CNAME) at it later and change this to '/'.
const PAGES_BASE = '/icecream/'

// https://vite.dev/config/
export default defineConfig({
  base: PAGES_BASE,
  plugins: [
    tailwindcss(),
    svelte()
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.js'],
  },
})
