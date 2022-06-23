import { manifest, version } from '@parcel/service-worker';

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
}
addEventListener('install', e => e.waitUntil(install()));

async function activate() {
  const keys = await caches.keys();
  await Promise.all(keys.map(key => key !== version && caches.delete(key)));
}
addEventListener('activate', e => e.waitUntil(activate()));

async function fetch(event) {
  const cache = await caches.open(version);

  const cachedResponse = await cache.match(event.request);
  if (cachedResponse) {
    return cachedResponse;
  }
  return fetch(event.request);
}
addEventListener('fetch', event => {
  // event.respondWith(fetch);
});
