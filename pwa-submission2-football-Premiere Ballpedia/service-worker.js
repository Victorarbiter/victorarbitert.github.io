const CACHE_NAME = "bolaidb";
const urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/team.html",
    "/pages/saved.html",
    "/pages/home.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/show-on-scrol.js",
    "/js/scrollbar.js",
    "/js/sw_detail.js",
    "/js/sw_index.js",
    "/js/text-animation.js",
    "/manifest.json",
    "/push.js",
    "/icon/1.jpg",
    "/icon/2.jpg",
    "/icon/3.jpg",
    "/icon/4.jpg",
    "/icon/icon72.png",
    "/icon/icon96.png",
    "/icon/icon192.png",
    "/icon/404.png",
];

self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        }).catch(err => console.log(err))
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                'ignoreSearch': true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'icon/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});