import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const firebaseEsm = (subpath) =>
  path.resolve(__dirname, `node_modules/firebase/${subpath}/dist/esm/index.esm.js`)

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: {
      // firebase@11.9.x ships dist/index.mjs missing in this install; pin subpaths to ESM builds for SSR/prerender.
      'firebase/analytics': firebaseEsm('analytics'),
      'firebase/app': firebaseEsm('app'),
      'firebase/app-check': firebaseEsm('app-check'),
      'firebase/firestore': firebaseEsm('firestore'),
    },
  },
  optimizeDeps: {
    // Pre-bundle every runtime dependency at dev-server start. Several are only
    // reached lazily (dynamic imports, route-specific pages); if Vite discovers them
    // mid-session it re-optimizes, and an already-open tab ends up mixing two React
    // copies ("Cannot read properties of null (reading 'useContext')").
    include: [
      '@emailjs/browser',
      'canvas-confetti',
      'firebase/analytics',
      'firebase/app',
      'firebase/app-check',
      'firebase/firestore',
      'jspdf',
      'react-hook-form',
      'react-icons/fa',
      'react-icons/fa6',
      'react-icons/gi',
    ],
  },
})
