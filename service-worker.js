const CACHE='northern-italy-v7';
const FILES=["./", "./index.html", "./venice.html", "./dolomites.html", "./cinque-terre.html", "./itinerary.html", "./map.html", "./hotels.html", "./assets/style.css", "./manifest.webmanifest", "./assets/images/app-icon.png", "./assets/images/cinque-1.jpg", "./assets/images/cinque-10.jpg", "./assets/images/cinque-11.jpg", "./assets/images/cinque-12.jpg", "./assets/images/cinque-13.jpg", "./assets/images/cinque-14.jpg", "./assets/images/cinque-15.jpg", "./assets/images/cinque-16.jpg", "./assets/images/cinque-17.jpg", "./assets/images/cinque-18.jpg", "./assets/images/cinque-2.jpg", "./assets/images/cinque-3.jpg", "./assets/images/cinque-4.jpg", "./assets/images/cinque-5.jpg", "./assets/images/cinque-6.jpg", "./assets/images/cinque-7.jpg", "./assets/images/cinque-8.jpg", "./assets/images/cinque-9.jpg", "./assets/images/dolomites-1.jpg", "./assets/images/dolomites-10.jpg", "./assets/images/dolomites-11.jpg", "./assets/images/dolomites-12.jpg", "./assets/images/dolomites-13.jpg", "./assets/images/dolomites-14.jpg", "./assets/images/dolomites-15.jpg", "./assets/images/dolomites-16.jpg", "./assets/images/dolomites-2.jpg", "./assets/images/dolomites-3.jpg", "./assets/images/dolomites-4.jpg", "./assets/images/dolomites-5.jpg", "./assets/images/dolomites-6.jpg", "./assets/images/dolomites-7.jpg", "./assets/images/dolomites-8.jpg", "./assets/images/dolomites-9.jpg", "./assets/images/venice-11.jpg", "./assets/images/venice-12.jpg", "./assets/images/venice-14.jpg", "./assets/images/venice-15.jpg", "./assets/images/venice-17.jpg", "./assets/images/venice-19.jpg", "./assets/images/venice-2.jpg", "./assets/images/venice-20.jpg", "./assets/images/venice-4.jpg", "./assets/images/venice-5.jpg", "./assets/images/venice-7.jpg", "./assets/images/venice-8.jpg", "./assets/images/venice-9.jpg", "./assets/images/venice-cover.jpg"];

self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([
 self.clients.claim(),
 caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
])));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{
  const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;
 }).catch(()=>caches.match(e.request)));
});