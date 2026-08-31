const CACHE_NAME = 'english-journey-v1';

// ติดตั้ง Service Worker และบันทึกไฟล์หน้าเว็บลงแคช
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/main.tsx',
        '/src/App.tsx',
        '/src/index.css'
      ]);
    })
  );
  self.skipWaiting();
});

// ดึงข้อมูลจากแคชเมื่อไม่มีอินเทอร์เน็ต (Cache-First Strategy)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('/'));
    })
  );
});

// ล้างแคชเวอร์ชันเก่าออกเมื่อมีการอัปเดตระบบ
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
