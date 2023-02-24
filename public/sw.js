//console.log("it's working!! tension not ");
let cacheData = "v1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/",
        "index.html",
        "/static/js/bundle.js",
        "favicon.ico",
        "manifest.json",
        "logo512.png",
        "logo192.png",
        "/users",
        "/about",
      ]);
    })
  );
});
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res;
        }
        // let requestUrl = event.request.clone();
        // fetch(requestUrl);
      })
    );
  }
});
