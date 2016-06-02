this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/caltrain/',
        '/caltrain/index.html',
        '/caltrain/css/style.css',
        '/caltrain/js/all.js',
        '/caltrain/css/bootstrap.min.css',
        'https://funnytao.github.io/caltrain/caltrain/stops.json',
        'https://funnytao.github.io/caltrain/caltrain/stop_time.json',
        'https://funnytao.github.io/caltrain/caltrain/trips.json',
        'https://funnytao.github.io/caltrain/caltrain/stop_list.json'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }));
});
