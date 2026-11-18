import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const serviceWorkerPath = fileURLToPath(new URL('./src/service-worker.js', import.meta.url))
const publicAssets = [
  'manifest.json',
  'offline.html',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'favicon.svg',
  'allanime.jpg',
]

function pwaServiceWorker() {
  let base = '/'

  return {
    name: 'pwa-service-worker',
    configResolved(config) {
      base = config.base
    },
    generateBundle(_, bundle) {
      const workerSource = readFileSync(serviceWorkerPath, 'utf8')
      const precacheFiles = Object.keys(bundle).filter((fileName) => {
        const output = bundle[fileName]
        return output.type === 'chunk'
          || (output.type === 'asset' && /\.(?:css|js|svg|png|jpe?g|webp|woff2?)$/i.test(fileName))
      })
      const publicUrls = publicAssets.map((fileName) => `${base}${fileName}`)
      const precacheUrls = [...new Set([
        base,
        `${base}offline.html`,
        ...publicUrls,
        ...precacheFiles.map((fileName) => `${base}${fileName}`),
      ])]
      const versionInput = [
        workerSource,
        ...precacheUrls,
        ...publicAssets.map((fileName) => {
          const assetPath = fileURLToPath(new URL(`./public/${fileName}`, import.meta.url))
          return createHash('sha256').update(readFileSync(assetPath)).digest('hex')
        }),
      ].join('|')
      const version = createHash('sha256').update(versionInput).digest('hex').slice(0, 12)
      const output = workerSource
        .replace('__BUILD_VERSION__', version)
        .replace('__PRECACHE_URLS__', JSON.stringify(precacheUrls))

      this.emitFile({ type: 'asset', fileName: 'sw.js', source: output })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pwaServiceWorker()],
})
