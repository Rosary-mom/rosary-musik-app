/* I-Ging-Münzorakel für Sphärenharfe/Musik-Baum – Fidelio. Eigenständiges Modul, keine Abhängigkeiten.
   Daten: window.ORAKEL_DATEN (orakel-daten.js) oder Orakel.mount(el,{daten}).
   Wurf-Format: 6 Zeichen "0"/"1", erstes Zeichen = erster Wurf = unterste Linie (Linie 1). 1 = Zahl = Yang, 0 = Wappen = Yin. */
var Orakel=(function(){
"use strict";
var KWORD=[7,4,2,1,0,3,5,6],KWT=[[1,34,5,26,11,9,14,43],[25,51,3,27,24,42,21,17],[6,40,29,4,7,59,64,47],[33,62,39,52,15,53,56,31],
 [12,16,8,23,2,20,35,45],[44,32,48,18,46,57,50,28],[13,55,63,22,36,37,30,49],[10,54,60,41,19,61,38,58]];
var TRI=["Erde ☷","Berg ☶","Wasser ☵","Wind ☴","Donner ☳","Feuer ☲","See ☱","Himmel ☰"];
var STROPHE={A:"Tanz im Nebel",A3:"Heimkehr der Geister",A4:"Segen der Alb",B1:"Eine Stunde Glück",B2:"Eine Stunde Glück (Refrain)",C0:"Osten",C1:"Ein Ring ist rund – Süd",C2:"Ein Ring ist rund – Nord",CR:"Refrain",D0:"Drei Ringe",D1:"Gespräch",D2:"Ruhe am Teich",F0:"Grundstein",F1:"Baumeister",F2:"Vollendung"};
// --- reine Logik (node-testbar) ---
function pruefe(w){return typeof w==="string"&&/^[01]{6}$/.test(w);}
function wert(w){return parseInt(w,2);}                       // Linie1 = MSB (wie Beet-Kern)
function kingWen(w){var v=wert(w),lo=v>>3,up=v&7;return KWT[KWORD.indexOf(lo)][KWORD.indexOf(up)];}
function trigramme(w){var v=wert(w);return{unten:TRI[v>>3],oben:TRI[v&7]};}
function fuxiPos(w){var v=wert(w);return v>=32?63-v:v+32;}     // 0 = Süd ☰☰, 32 = Nord ☷☷
function dunkel(p){return p<32?p/31:(63-p)/31;}
function modus(p){return ["Lydisch","Ionisch","Mixolydisch","Dorisch","Äolisch"][Math.min(4,Math.floor(dunkel(p)*5))];}
function zufallsWurf(){var a=new Uint8Array(6);(typeof crypto!=="undefined"?crypto:require("crypto").webcrypto).getRandomValues(a);
 return Array.prototype.map.call(a,function(x){return x&1;}).join("");}
// Patent-Stimmung: Melodiesaiten D4, Bünde D E F G A H C D E; Hebel +1 Halbton (F->Fis, C->Cis, G->Gis)
var BUND=[62,64,65,67,69,71,72,74,76],BASS={G2:43,G1:31,D3:50,A2:45};
var MOTIV=[72,71,69,71,69,62,69,72],ANTW_F=[69,71,69,67,65,64,65,62],RHY=[1,.5,.5,1,1,1.5,.5,2];
var HEBEL={Lydisch:[65,72,67],Ionisch:[65,72],Mixolydisch:[65],Dorisch:[],Äolisch:[]};
function hebel(m,mod){return HEBEL[mod].indexOf(m%12+60)>=0||HEBEL[mod].indexOf(m%12+48)>=0?m+1:m;}
var SPUREN=["Rahmentrommel","Bass-Sphärenharfe","Harfe","Sphärenharfe","Querflöte","Dudelsack"];
function komposition(w){ // Events {spur,beat,midi,dur,vel}; 6 Phrasen à 8 Schläge (Linie 1..6), Adagio 60 BPM
 var L=w.split("").map(Number),p=fuxiPos(w),mod=modus(p),ev=[],E=function(s,b,m,d,v){ev.push({spur:s,beat:b,midi:m,dur:d,vel:v});};
 var chord=mod==="Äolisch"||mod==="Dorisch"?[62,65,69]:[62,hebel(65,mod),69],bassF=[BASS.D3,BASS.G2,BASS.A2,BASS.D3,BASS.G1,BASS.D3];
 for(var k=0;k<6;k++){var t=k*8,yang=L[k];
  var mel=yang?MOTIV:ANTW_F,b=t;
  if(mod==="Äolisch"&&!yang)mel=[69,72,69,67,65,62,65,62];   // H gemieden (Patent kennt kein B)
  for(var i=0;i<8;i++){E(3,b,mel[i],Math.max(RHY[i],1.5),yang?84:62);b+=RHY[i];}
  // Schichten: Spur j klingt, wenn Linie j Yang ist; sonst leiser Schatten
  for(var j=0;j<6;j++){var on=L[j];
   if(j===0){if(on){E(0,t,41,.5,70);E(0,t+4,41,.5,55);}else E(0,t,41,.5,28);}
   if(j===1)E(1,t,bassF[k],8,on?72:30);
   if(j===2&&on)chord.concat([74]).forEach(function(m,q){E(2,t+q*.5,m,4,48);});
   if(j===4&&on&&yang)E(4,t+4,mel[5]+12,3,46);
   if(j===5)E(5,t,50,8,on?40:18);}}
 [62,69,74,78,74].forEach(function(m,i){E(1,48+i*1.2,m,6,50);});   // Flageolett-Ausklang (Teiltöne der D3-Saite)
 return{events:ev,modus:mod,pos:p,dauer:48+6+6};}
// --- MIDI (SMF Typ 1) ---
function vlq(n){var b=[n&127];while(n>>=7)b.unshift((n&127)|128);return b;}
function u32(n){return[(n>>>24)&255,(n>>16)&255,(n>>8)&255,n&255];}
function trk(e){e.sort(function(a,b){return a[0]-b[0]||a[2]-b[2];});var d=[],l=0;e.forEach(function(x){d.push.apply(d,vlq(x[0]-l));d.push.apply(d,x[1]);l=x[0];});d.push(0,255,47,0);return[77,84,114,107].concat(u32(d.length),d);}
function nm(s){var b=[];for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);b.push(c<128?c:63);}return[255,3].concat(vlq(b.length),b);}
function midi(w){var K=komposition(w),T=480,us=1000000,o=[77,84,104,100,0,0,0,6,0,1,0,7,1,224];
 o=o.concat(trk([[0,nm("Orakel "+w+" Hex "+kingWen(w)),0],[0,[255,81,3,(us>>16)&255,(us>>8)&255,us&255],0],[0,[255,88,4,4,2,24,8],0]]));
 var PG=[0,46,46,46,73,109];
 for(var s=0;s<6;s++){var c=s===0?9:s,e=[[0,nm(SPUREN[s]),0]];if(s)e.push([0,[192|c,PG[s]],0]);
  K.events.filter(function(x){return x.spur===s;}).forEach(function(x){var a=Math.round(x.beat*T);e.push([a,[144|c,x.midi,x.vel],2]);e.push([a+Math.round(x.dur*T),[128|c,x.midi,0],1]);});o=o.concat(trk(e));}
 return new Uint8Array(o);}
// --- UI ---
var D=null,ac=null,bus=null,nodes=[],timers=[],akt=null,root=null;
function $(id){return document.getElementById("ork-"+id);}
function daten(){return D||(typeof window!=="undefined"&&window.ORAKEL_DATEN)||null;}
function eintrag(w){var d=daten();return d&&d.hexagramme[String(kingWen(w))];}
function ctx(){if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();bus=ac.createGain();bus.gain.value=.5;var dl=ac.createDelay(2),fb=ac.createGain(),wet=ac.createGain();
 dl.delayTime.value=.42;fb.gain.value=.38;wet.gain.value=.35;bus.connect(ac.destination);bus.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(ac.destination);}
 if(ac.state==="suspended"&&ac.resume)ac.resume();return ac;}
function ton(t,m,d,v,typ,att,rel){var o=ac.createOscillator(),g=ac.createGain();o.type=typ;o.frequency.value=440*Math.pow(2,(m-69)/12);o.connect(g);g.connect(bus);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+att);g.gain.exponentialRampToValueAtTime(.0001,t+d+rel);o.start(t);o.stop(t+d+rel+.1);nodes.push(o);}
function spiele(w){stop();ctx();var K=komposition(w),t0=ac.currentTime+.1;
 K.events.forEach(function(e){var t=t0+e.beat,v=e.vel/127;
  if(e.spur===0)ton(t,e.midi===41?43:55,.05,.4*v,"sine",.005,.3);
  else if(e.spur===1)ton(t,e.midi,.05,(e.beat>=48?.16:.28)*v,e.beat>=48?"sine":"triangle",.01,e.beat>=48?5:3);
  else if(e.spur===2||e.spur===3)ton(t,e.midi,.05,.16*v,"triangle",.004,e.spur===3?2.2:1.4);
  else if(e.spur===4)ton(t,e.midi,e.dur,.08*v,"sine",.12,.4);
  else ton(t,e.midi,e.dur,.035*v,"sawtooth",.6,.6);});
 timers.push(setTimeout(stop,K.dauer*1000));return K;}
function stop(){timers.forEach(clearTimeout);timers=[];nodes.forEach(function(n){try{n.stop();}catch(_){}});nodes=[];}
function dl(data,name,type){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:type}));a.download=name;document.body.appendChild(a);a.click();a.remove();}
function merke(w){try{var h=JSON.parse(localStorage.getItem("orakel-wuerfe")||"[]");h.unshift({wurf:w,hex:kingWen(w),zeit:new Date().toISOString()});localStorage.setItem("orakel-wuerfe",JSON.stringify(h.slice(0,64)));}catch(_){}}
function zeige(w,quelle){if(!pruefe(w))throw new Error("Wurf muss 6 Zeichen 0/1 sein: "+w);akt=w;merke(w);
 var e=eintrag(w),n=kingWen(w),tr=trigramme(w),p=fuxiPos(w),hex=$("hex");hex.innerHTML="";
 w.split("").forEach(function(b,i){var d=document.createElement("div");d.className="ork-line"+(b==="1"?"":" ork-yin");d.innerHTML=b==="1"?"<span></span>":"<span></span><span></span>";hex.appendChild(d);
  timers.push(setTimeout(function(){d.classList.add("ork-on");$("coin").textContent="Wurf "+(i+1)+": "+(b==="1"?"Zahl → Yang ⚊":"Wappen → Yin ⚋");},350+i*600));});
 $("titel").textContent=n+" · "+(e?e.name:"")+" "+(e?e.zeichen:"");
 $("meta").textContent="Wurf "+w+(quelle?" ("+quelle+")":"")+" · oben "+tr.oben+", unten "+tr.unten+" · Beet-Sektor "+(p+1)+" · Modus "+modus(p);
 $("urteil").textContent=e&&e.urteil?e.urteil:"[Text fehlt]";$("bild").textContent=e&&e.bild?e.bild:"[Text fehlt]";
 $("src").innerHTML=e?'Quelle: Richard Wilhelm, I Ging (1924), gemeinfrei – <a href="'+e.quelle.url+'" target="_blank" rel="noopener" style="color:#c9a86a">Projekt Gutenberg-DE</a>'+(e.quelle.hinweis?" · "+e.quelle.hinweis:""):"";
 var k=e&&e.karaoke;$("kara").textContent=k?k.zeile:"–";
 $("satz").textContent=k?("Passt zu: "+k.satz+" · Strophe „"+(STROPHE[k.strophe]||k.strophe)+"“ · Karaoke-Zeile "+k.nr+" ("+k.stimme+", ab "+Math.floor(k.start/60)+":"+("0"+Math.round(k.start%60)).slice(-2)+") · Pflanze: "+k.pflanze):"";
 $("ov").classList.add("ork-open");return n;}
function werfen(){return zeige(zufallsWurf(),"Zufall");}
function mount(el,opt){opt=opt||{};if(opt.daten)D=opt.daten;root=el;el.classList.add("ork-root");
 el.innerHTML='<div><button id="ork-wurf">☯ Münzen werfen</button><input id="ork-in" placeholder="101100" maxlength="6"><button id="ork-uebern">Wurf übernehmen</button></div>'+
 '<div class="ork-overlay" id="ork-ov"><div class="ork-pop" role="dialog" aria-label="I-Ging-Orakel"><button class="ork-x" id="ork-zu" aria-label="Schließen">×</button>'+
 '<h3 id="ork-titel"></h3><div class="ork-coin" id="ork-coin"></div><div class="ork-hex" id="ork-hex"></div><div class="ork-src" id="ork-meta"></div>'+
 '<h4>Das Urteil</h4><div class="ork-text" id="ork-urteil"></div><h4>Das Bild</h4><div class="ork-text" id="ork-bild"></div><div class="ork-src" id="ork-src"></div>'+
 '<h4>Karaoke-Zeile</h4><div class="ork-kara" id="ork-kara"></div><div class="ork-src" id="ork-satz"></div>'+
 '<div><button id="ork-play">♪ Zeichen spielen</button><button id="ork-stop">■ Stopp</button><button id="ork-mid">.mid</button><button id="ork-neu">Neu werfen</button></div></div></div>';
 $("wurf").onclick=werfen;$("neu").onclick=werfen;
 $("uebern").onclick=function(){var v=$("in").value.trim();if(pruefe(v))zeige(v,"übergeben");else{$("in").style.borderColor="red";}};
 $("zu").onclick=function(){stop();$("ov").classList.remove("ork-open");};
 $("play").onclick=function(){if(akt)spiele(akt);};$("stop").onclick=stop;
 $("mid").onclick=function(){if(akt)dl(midi(akt),"orakel-"+akt+"-hex"+kingWen(akt)+".mid","audio/midi");};
 var q=typeof location!=="undefined"&&new URLSearchParams(location.search).get("wurf");if(q&&pruefe(q))zeige(q,"URL");}
return{mount:mount,zeige:zeige,werfen:werfen,spiele:spiele,stop:stop,midi:midi,komposition:komposition,kingWen:kingWen,trigramme:trigramme,
 fuxiPos:fuxiPos,modus:modus,pruefe:pruefe,zufallsWurf:zufallsWurf,get aktuell(){return akt;},SPUREN:SPUREN};})();
if(typeof module!=="undefined")module.exports=Orakel;
