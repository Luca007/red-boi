/* RedBoi — cache-first service worker (app shell + runtime cache) */
const VERSION = 'redboi-v4';
const BASE = new URL('./', self.location).pathname;
const APP_SHELL = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.webmanifest',
  BASE + 'logo.png',
  BASE + 'css/reset.css',
  BASE + 'css/tokens.css',
  BASE + 'css/layout.css',
  BASE + 'css/components.css',
  BASE + 'css/animations.css',
  BASE + 'js/main.js',
  BASE + 'js/menu-data.js',
  BASE + 'js/constants.js',
  BASE + 'js/dom.js',
  BASE + 'js/components/header.js',
  BASE + 'js/components/nav-pills.js',
  BASE + 'js/components/section.js',
  BASE + 'js/components/full-card.js',
  BASE + 'js/components/compact-row.js',
  BASE + 'js/components/badge.js',
  BASE + 'js/components/review-cta.js',
  BASE + 'js/components/footer.js',
  BASE + 'js/components/spinner.js',
  BASE + 'js/features/theme.js',
  BASE + 'js/features/scroll-spy.js',
  BASE + 'js/features/sw-register.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          if (req.mode === 'navigate') return caches.match(BASE + 'index.html');
          return Response.error();
        });
    })
  );
});
