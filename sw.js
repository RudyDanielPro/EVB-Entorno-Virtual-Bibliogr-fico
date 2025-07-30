const CACHE_NAME = 'app-cache-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/assets/*.{jpg,png,svg}',
  '/src/Component/*.{js,css}'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cached) => cached || fetch(event.request))
  )
})