const CACHE_NAME = 'kinetix-cache-v4';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap',
  'https://cdn-icons-png.flaticon.com/192/3048/3048344.png',
  'https://cdn-icons-png.flaticon.com/512/3048/3048344.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests that are not in our cache list logic (except images handled below)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;

        return fetch(event.request).then((networkResponse) => {
          // Check if we received a valid response
          // Note: We allow type 'opaque' (status 0) for external resources like CDN images/icons
          if (!networkResponse || (networkResponse.status !== 200 && networkResponse.status !== 0)) {
            return networkResponse;
          }

          // Don't cache if it's a POST request or similar
          if(event.request.method !== 'GET') {
              return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
             try {
                cache.put(event.request, responseToCache);
             } catch (err) {
                // Ignore errors (like quota exceeded)
             }
          });
          return networkResponse;
        });
      })
  );
});