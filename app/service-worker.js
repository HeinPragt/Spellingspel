// Cache names

var dataCacheName = `SpellingspelD-v2.1.1`
var cacheName = `SpellingspelC-v2.1.1`

// Application shell files to be cached

var filesToCache = [
'/',
'/index.html',
'/service-worker.js',
'/c2runtime.js',
'/data.js',
'/jquery-2.0.0.min.js',
'/images\background.png',
'/images\panel2.png',
'/images\tiledbackground4.png',
'/images\horizontalline.png',
'/images\antwoord_knop-sheet0.png',
'/images\antwoord_knop2-sheet0.png',
'/images\controleer.png',
'/images\uitkomst-sheet0.png',
'/images\uitkomst-sheet1.png',
'/loading-logo.png'
]

self.addEventListener(`install`, function (e) {
  console.log(`[ServiceWorker] Install`)
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log(`[ServiceWorker] Caching app shell`)
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener(`activate`, function (e) {
  console.log(`[ServiceWorker] Activate`)
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log(`[ServiceWorker] Removing old cache`, key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener(`fetch`, function (e) {
  console.log(`[ServiceWorker] Fetch`, e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request)
    })
  )
})


