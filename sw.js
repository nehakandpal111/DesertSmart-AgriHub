// Service Worker for DesertSmart AgriHub
const CACHE_NAME = 'desertsmart-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ai-model.js',
    '/js/crops.js',
    '/js/energy-solutions.js',
    '/js/irrigation.js',
    '/js/subsidies.js',
    '/js/community.js',
    '/js/utils.js',
    '/js/charts.js',
    '/data/farm_data.csv',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Install event - cache resources
// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event - clean up old caches
// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
// Fetch event - serve from cache, fallback to network, cache new requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                const fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                }).catch(() => {
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                    return new Response('Offline', {
                        status: 200,
                        statusText: 'Offline',
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
            })
    );
});

// Background sync for offline actions
// Background sync for offline actions (optional, advanced)
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Example: process pending actions from IndexedDB/localStorage
    // (Implementation can be added as needed for hackathon demo)
}

// Push notifications
// Push notifications (optional, advanced)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from DesertSmart AgriHub',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Details',
                icon: '/icon-192x192.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icon-192x192.png'
            }
        ]
    };
    event.waitUntil(
        self.registration.showNotification('DesertSmart AgriHub', options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main app
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});