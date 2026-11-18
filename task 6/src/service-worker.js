const BUILD_VERSION = '__BUILD_VERSION__'
const CACHE_PREFIX = 'react-pwa-'
const SHELL_CACHE = `${CACHE_PREFIX}shell-${BUILD_VERSION}`
const STATIC_CACHE = `${CACHE_PREFIX}static-${BUILD_VERSION}`
const API_CACHE = `${CACHE_PREFIX}api-v1`
const PRECACHE_URLS = JSON.parse(String.raw`__PRECACHE_URLS__`)
const MAX_STATIC_ENTRIES = 100
const MAX_API_ENTRIES = 50
const API_MAX_AGE = 7 * 24 * 60 * 60 * 1000
const PRIVATE_PATH = /\/(?:__\/auth|auth|api\/(?:auth|private|users|profile))(?:\/|$)/i
const PUBLIC_TITLES_API = /\/api\/public\/titles(?:\/|$)/i
const STATIC_FILE = /\.(?:avif|css|eot|gif|ico|jpe?g|js|otf|png|svg|ttf|webp|woff2?)$/i

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
  )
})

self.addEventListener('activate', (event) => {
  const activeCaches = new Set([SHELL_CACHE, STATIC_CACHE, API_CACHE])
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((name) => name.startsWith(CACHE_PREFIX) && !activeCaches.has(name))
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (
    request.method !== 'GET'
    || url.origin !== self.location.origin
    || url.pathname.endsWith('/sw.js')
    || request.headers.has('authorization')
    || PRIVATE_PATH.test(url.pathname)
  ) return

  if (request.mode === 'navigate') {
    event.respondWith(networkNavigation(request))
    return
  }

  if (PUBLIC_TITLES_API.test(url.pathname)) {
    event.respondWith(networkFirstPublicApi(request))
    return
  }

  if (request.destination === 'image' || request.destination === 'font' || STATIC_FILE.test(url.pathname)) {
    event.respondWith(cacheFirstStatic(request))
  }
})

async function networkNavigation(request) {
  try {
    return await fetch(request)
  } catch {
    return (await caches.match(request, { cacheName: SHELL_CACHE, ignoreVary: true }))
      || (await caches.match(self.registration.scope, { cacheName: SHELL_CACHE, ignoreVary: true }))
      || (await caches.match(new URL('offline.html', self.registration.scope).href, { cacheName: SHELL_CACHE, ignoreVary: true }))
  }
}

async function cacheFirstStatic(request) {
  const cached = await caches.match(request, { cacheName: STATIC_CACHE, ignoreVary: true })
    || await caches.match(request, { cacheName: SHELL_CACHE, ignoreVary: true })
  if (cached) return cached

  const response = await fetch(request)
  if (response.ok && !request.headers.has('authorization')) {
    const cache = await caches.open(STATIC_CACHE)
    await cache.put(request, response.clone())
    await trimCache(STATIC_CACHE, MAX_STATIC_ENTRIES)
  }
  return response
}

async function networkFirstPublicApi(request) {
  let response
  try {
    response = await fetch(request)
  } catch {
    const cache = await caches.open(API_CACHE)
    const cached = await cache.match(request)
    if (cached) {
      const storedAt = Number(cached.headers.get('x-pwa-cached-at') || 0)
      if (!storedAt || Date.now() - storedAt > API_MAX_AGE) {
        await cache.delete(request)
      } else {
        return cached
      }
    }
    return new Response(JSON.stringify({ error: 'This public catalog item is not available offline.' }), {
      status: 503,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    })
  }

  const contentType = response.headers.get('content-type') || ''
  const cacheControl = response.headers.get('cache-control') || ''
  if (
    response.ok
    && contentType.includes('application/json')
    && !/private|no-store/i.test(cacheControl)
    && !request.headers.has('authorization')
  ) {
    try {
      const cache = await caches.open(API_CACHE)
      const headers = new Headers(response.headers)
      headers.set('x-pwa-cached-at', String(Date.now()))
      await cache.put(request, new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      }))
      await trimCache(API_CACHE, MAX_API_ENTRIES)
    } catch (error) {
      console.warn('Could not cache the public API response.', error)
    }
  }
  return response
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  const excess = keys.length - maxEntries
  if (excess > 0) {
    await Promise.all(keys.slice(0, excess).map((key) => cache.delete(key)))
  }
}
