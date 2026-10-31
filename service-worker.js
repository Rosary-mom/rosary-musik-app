const CACHE="rosary-musik-v15";
const MESSE_CACHE="rosary-messe-v1";
const ASSETS=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","sphaerenharfe/","sphaerenharfe/index.html","sphaerenharfe/karaoke.js","sphaerenharfe/app.js","sphaerenharfe/music-tree.js","music-tree/","music-tree/index.html","music-tree/orakel/orakel.css","music-tree/orakel/orakel-sand.css","music-tree/orakel/orakel-daten.js","music-tree/orakel/orakel.js","noten/","noten/index.html","noten/noten.js","assets/theme.css","assets/unison-sound.js","assets/unison-data.json","assets/rosary-logo.png","assets/fonts/Rosario.woff2","assets/fonts/Rosario-Italic.woff2","assets/fonts/RobotoSlab.woff2","assets/fonts/EBGaramond.woff2","assets/fonts/EBGaramond-Italic.woff2","stimme/","stimme/index.html","stimme/stimme.js","messe/","messe/index.html","messe/messe-karaoke.json","messe/missa-live.css","messe/missa-live.js","messe/messe-liedblatt.pdf","prism/","prism/index.html","prism/prism-gate.css","prism/prism-gate.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x!=="rosary-audio-v1"&&x!==MESSE_CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const url=new URL(e.request.url);
  // Prism/Argonsynth NIEMALS cachen
  if(/argonsynth\.si$/i.test(url.hostname)||/\.netlify\./i.test(url.hostname)||url.hostname.endsWith("netlify.app")){
    e.respondWith(fetch(e.request));
    return;
  }
  const path=url.pathname;
  if(/\.(mp3|ogg|opus|wav)$/.test(path)){
    e.respondWith(caches.open(MESSE_CACHE).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request))));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&url.origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
    return res;
  }).catch(()=>caches.match("index.html"))));
});
