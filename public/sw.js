const CACHE_NAME = 'english-journey-v2';

// 1. ติดตั้ง Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. เคลียร์แคชเก่า
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. ระบบดึงไฟล์จากแคช และบันทึกไฟล์ใหม่ลงเครื่องอัตโนมัติ
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // เก็บเฉพาะคำขอที่สำเร็จลงในแคช
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // ถ้าไม่มีเน็ตและหาไฟล์ไม่เจอ ให้ส่งหน้าหลักกลับไป
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/');
          }
        });
    })
  );
});
