const CACHE_NAME = 'ash-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/logo.jpg',
];

// Modern async/await install
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
      await self.skipWaiting(); // Activate immediately
    })()
  );
});

// Modern fetch with async/await
self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Fetch from network
        const networkResponse = await fetch(event.request);
        
        // Cache successful responses
        if (networkResponse?.ok && networkResponse.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
      }
    })()
  );
});

// Modern activate with async/await
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
      await self.clients.claim(); // Take control immediately
    })()
  );
});

// Handle notification clicks with modern syntax
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    (async () => {
      const clientList = await clients.matchAll({ 
        type: 'window', 
        includeUncontrolled: true 
      });
      
      // Focus existing window if available
      const client = clientList.find(c => c.url === '/' && 'focus' in c);
      if (client) {
        return client.focus();
      }
      
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })()
  );
});

// Handle push notifications with modern syntax
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/logo.jpg',
    badge: '/logo.jpg',
    tag: data.tag ?? 'default',
    requireInteraction: data.requireInteraction ?? false,
    vibrate: [200, 100, 200],
    data: data.data,
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

