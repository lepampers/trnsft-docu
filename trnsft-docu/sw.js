// Trnsft Docu. — fonctionnement hors ligne une fois l'appli installée
const VERSION = 'trnsft-docu-v2';
const APP = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];
const LIBS = [
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.zahl.js',
];
const CDN = /(^|\.)(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(APP);
    // Les bibliothèques de conversion sont mises de côté dès l'installation, pour marcher sans Internet
    await Promise.all(LIBS.map(async url => {
      try { const res = await fetch(url, { mode: 'cors' }); if (res.ok) await cache.put(url, res); } catch { /* réessayé à la première utilisation */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== VERSION) await caches.delete(key);
    await self.clients.claim();
  })());
});

async function fromNetwork(request, cacheKey) {
  let res = await fetch(request);
  // Une réponse redirigée ne peut pas resservir une navigation : on en fait une copie propre
  if (res.redirected) res = new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: res.headers });
  if (res.ok || res.type === 'opaque') {
    const cache = await caches.open(VERSION);
    await cache.put(cacheKey || request, res.clone());
  }
  return res;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      // Page : la version en ligne d'abord (mises à jour), sinon la copie gardée
      event.respondWith(fromNetwork(request, './index.html').catch(async () => (await caches.match('./index.html')) || Response.error()));
      return;
    }
    event.respondWith(caches.match(request).then(hit => hit || fromNetwork(request)));
    return;
  }
  if (CDN.test(url.hostname)) {
    // Bibliothèques et polices aux adresses versionnées : la copie gardée d'abord
    event.respondWith(caches.match(request).then(hit => hit || fromNetwork(request)));
  }
});
