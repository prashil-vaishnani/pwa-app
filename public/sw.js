let cacheData = "v6";
let CACHE_DYNAMIC_NAME = "dynamic-v3";
let STATIC_FILES = [
  "/",
  "index.html",
  "/static/js/bundle.js",
  "favicon.ico",
  "manifest.json",
  "logo512.png",
  "logo192.png",
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(STATIC_FILES);
    })
  );
});

this.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheData && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return this.clients.claim();
});

// this.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((res) => {
//       if (res) {
//         return res;
//       } else {
//         return fetch(event.request)
//           .then(function (res) {
//             return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
//               cache.put(event.request.url, res.clone());
//               return res;
//             });
//           })
//           .catch(function (err) {});
//       }
//     })
//   );
// });

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(this.origin) === 0) {
    // request targets domain where we serve the page from (i.e. NOT a CDN)
    console.log("matched ", string);
    cachePath = string.substring(this.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

// 3 in one
this.addEventListener("fetch", function (event) {
  var url = "https://jsonplaceholder.typicode.com/users";
  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
        return fetch(event.request).then(function (res) {
          cache.put(event.request, res.clone());
          return res;
        });
      })
    );
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(caches.match(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(function (err) {
              return caches.open(cacheData).then(function (cache) {
                if (event.request.url.indexOf("/about")) {
                  console.log("request for about huuh!!");
                }
              });
            });
        }
      })
    );
  }
});

// cache only
// this.addEventListener("fetch", (event) => {
//   event.respondWith(caches.match(event.request));
// });

// network only
// this.addEventListener("fetch", (event) => {
//   event.respondWith(fetch(event.request));
// });

// network then cache fallback
// this.addEventListener("fetch", (event) => {
//   event.respondWith(
//     fetch(event.request).catch(function (err) {
//       return caches.match(event.request);
//     })
//   );
// });
