const CACHE='northern-italy-v2';
const FILES=[
'./','./index.html','./venice.html','./assets/style.css',
'./manifest.webmanifest','./assets/images/app-icon.png',
'./assets/images/venice-cover.png','./assets/images/venice-2.png',
'./assets/images/venice-4.png','./assets/images/venice-5.png',
'./assets/images/venice-7.png','./assets/images/venice-8.png',
'./assets/images/venice-9.png','./assets/images/venice-11.png',
'./assets/images/venice-12.png','./assets/images/venice-14.png',
'./assets/images/venice-15.png','./assets/images/venice-17.png',
'./assets/images/venice-19.png','./assets/images/venice-20.png'];
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