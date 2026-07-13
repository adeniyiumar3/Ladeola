// La'deola Cakes_n_Confectionery — minimal service worker for offline/app-shell caching.
// Bump CACHE_NAME whenever you change index.html/CSS/JS so returning visitors get the update.
const CACHE_NAME = "ladeola-cakes-v2";
const ASSETS = [
  "index.html",
  "manifest.json",
  "styles.css",
  "main.js",
  "picture1.jpeg",
  "picture2.jpeg",
  "picture3.jpeg",
  "ladeola_logo.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for HTML (so menu/price updates show up quickly),
// cache-first for everything else.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).catch(() => cached))
  );
});
