// the fallowing variable is used to store the name of the version
var CACHE_DB_NAME = 'vr1';
this.addEventListener('install', event => {
  // waituntil is used to wait untill files store in the cache
  event.waitUntil(
    caches.open(CACHE_DB_NAME).then(cache => {
      cache.addAll(
        [
          // '/index.html',
          // '/css/styles.css',
          // '/restaurant.html',
          // '/css/restaurant.css',
          // '/data/restaurant.json',
          // '/js/main.js',
          // '/js/dbhelper.js',
          // '/js/restaurant_info.js',
          // '/img/1.jpg',
          // '/img/2.jpg',
          // '/img/3.jpg',
          // '/img/4.jpg',
          // '/img/5.jpg',
          // '/img/6.jpg',
          // '/img/7.jpg',
          // '/img/8.jpg',
          // '/img/9.jpg',
          // '/img/10.jpg'
        ]
      )
    })
  )
});

self.addEventListener('activate', function(event) {

  var listCache = ['pages-cache-v1', 'blog-posts-cache-v1'];
  console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (listCache.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
            // console.log("deleted");
          }
        })
      );
    })
  );
});


// fetch is used to data from the cache and also clone the data and store in cache
this.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_DB_NAME).then(cache => {
      return cache.match(event.request).then(res => {
        return res || fetch(event.request).then(res => {
          cache.put(event.request, res.clone());
          return res;
        });
      });
    })
  );
});
