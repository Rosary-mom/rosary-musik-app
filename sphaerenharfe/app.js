(function(){
"use strict";
var $=function(id){return document.getElementById(id);};
var NN=["C","Cis","D","Dis","E","F","Fis","G","Gis","A","B","H"];
function nm(m){return NN[m%12]+(Math.floor(m/12)-1);}
// Stimmungen (leer + 8 Bünde)
var TUNINGS={patent:[62,64,65,67,69,71,72,74,76],ddur:[62,64,66,67,69,71,73,74,76]};
var tuning="patent";
var BASS=[43,31,50,45]; // G2 G1 D3 A2
var ac=null,master=null,live=[],timers=[];
function ctx(){if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=0.5;master.connect(ac.destination);}if(ac.state==="suspended")ac.resume();return ac;}
function hz(m){return 440*Math.pow(2,(m-69)/12);}
function pluck(m,t,dur,bass,vol){var a=ctx();t=t||a.currentTime;dur=dur||(bass?2.5:1.6);
 var f=hz(m),o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),g2=a.createGain();
 o.type="triangle";o2.type="sine";o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=0.25;o2.connect(g2);g2.connect(g);o.connect(g);g.connect(master);
 var v=vol||(bass?0.5:0.35);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v,t+0.008);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
 o.start(t);o2.start(t);o.stop(t+dur+0.05);o2.stop(t+dur+0.05);live.push(o,o2);}
// Flageolett: reiner Sinus auf Teilton n der Saite, ~6 s Ausklang
function flag(m,n,t,vol){var a=ctx();t=t||a.currentTime;var o=a.createOscillator(),g=a.createGain();o.type="sine";o.frequency.value=hz(m)*n;o.connect(g);g.connect(master);
 g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||0.25,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+6);o.start(t);o.stop(t+6.1);live.push(o);}
function flagSet(m,t){[2,3,4].forEach(function(n,i){flag(m,n,(t||ctx().currentTime)+i*0.35,0.22-i*0.04);});}
function stopAll(){live.forEach(function(o){try{o.stop();}catch(e){}});live=[];timers.forEach(clearTimeout);timers=[];clearKara();}
// Aufnahme
var rec=false,recEv=[],recT0=0;
function note(m,bass){pluck(m,0,0,bass);if(rec){recEv.push({t:performance.now()-recT0,m:m});$("sh-recinfo").textContent=recEv.length+" Töne aufgenommen";}}
function noteFlag(m){flagSet(m);if(rec){[2,3,4].forEach(function(n,i){recEv.push({t:performance.now()-recT0+i*350,m:m+Math.round(12*Math.log2(n))});});$("sh-recinfo").textContent=recEv.length+" Töne aufgenommen";}}
// Raster
var grid=$("sh-grid"),fretBtns=[];
function buildGrid(){grid.innerHTML="";fretBtns=[];grid.appendChild(document.createElement("div"));
 for(var b=0;b<9;b++){var h=document.createElement("div");h.textContent=b===0?"leer":b+". Bund";h.style.justifyContent="center";h.style.fontSize="12px";grid.appendChild(h);}
 for(var s=1;s<=3;s++){var l=document.createElement("div");l.textContent="Saite "+s;l.style.fontSize="13px";grid.appendChild(l);
  for(var f=0;f<9;f++)(function(f){var btn=document.createElement("button");btn.addEventListener("pointerdown",function(e){e.preventDefault();note(TUNINGS[tuning][f],false);});grid.appendChild(btn);fretBtns.push([btn,f]);})(f);}
 label();}
function label(){fretBtns.forEach(function(x){x[0].textContent=nm(TUNINGS[tuning][x[1]]);});}
function setTuning(t){tuning=t;$("sh-tun-patent").classList.toggle("on",t==="patent");$("sh-tun-ddur").classList.toggle("on",t==="ddur");label();}
$("sh-tun-patent").onclick=function(){setTuning("patent");};$("sh-tun-ddur").onclick=function(){setTuning("ddur");};
buildGrid();
BASS.forEach(function(m,i){var col=document.createElement("div");col.className="bcol";
 var btn=document.createElement("button");btn.className="bass";btn.textContent=(i+4)+". Saite · "+nm(m);btn.addEventListener("pointerdown",function(e){e.preventDefault();note(m,true);});
 var fb=document.createElement("button");fb.className="flag";fb.textContent="Flageolett "+nm(m+12)+" "+nm(m+19)+" "+nm(m+24);fb.addEventListener("pointerdown",function(e){e.preventDefault();noteFlag(m);});
 col.appendChild(btn);col.appendChild(fb);$("sh-bass").appendChild(col);});
// Karaoke / Texte (gesang-plan.md, Fidelio)
var MOTIV=[72,71,69,71,69,62,69,72],ANTW_FIS=[69,71,69,67,66,64,66,62],ANTW_F=[69,71,69,67,65,64,65,62],RHY=[1,0.5,0.5,1,1,1.5,0.5,2];
var LINES=window.SH_LINES||[];
function syl(t){return t.split(/[-\s]+/).filter(Boolean);}
LINES.forEach(function(l,i){$("sh-line").add(new Option(l[0]+": "+l[1].replace(/-/g," "),i));});
function melodyFor(l){return l[2]==="M"?MOTIV:l[2]==="F"?ANTW_F:ANTW_FIS;}
function clearKara(){var k=$("sh-kara");if(k)Array.prototype.forEach.call(k.children,function(s){s.className="";});}
function showKara(text){var k=$("sh-kara");k.innerHTML="";syl(text).forEach(function(s){var sp=document.createElement("span");sp.textContent=s;k.appendChild(sp);});}
function karaAt(i,ms){timers.push(setTimeout(function(){var ks=$("sh-kara").children;for(var j=0;j<ks.length;j++)ks[j].className=j<i?"done":j===i?"on":"";},ms));}
// Melodie mit Karaoke ab Zeitpunkt t (s, AudioContext); durs in s je Ton. Gibt Endzeit zurück.
function singLine(l,t,durs){var a=ctx(),mel=melodyFor(l),s=syl(l[1]),tt=t;showKara(l[1]);
 mel.forEach(function(m,i){pluck(m,tt,Math.max(1.2,durs[i]*1.5),false,0.38);karaAt(i,(tt-a.currentTime)*1000);tt+=durs[i];});
 timers.push(setTimeout(function(){var ks=$("sh-kara").children;for(var j=0;j<ks.length;j++)ks[j].className="done";},(tt-a.currentTime)*1000));return tt;}
$("sh-bau").onclick=function(){stopAll();var a=ctx(),t=a.currentTime+0.1,l=LINES[+$("sh-line").value],spb=60/60;
 pluck(50,t,8,true,0.35);singLine(l,t,RHY.map(function(r){return r*spb;}));$("sh-motto").textContent=l[2]==="M"?"Leitmotiv C H A H A D A C":"Antwort A H A G "+(l[2]==="F"?"F":"Fis")+" E "+(l[2]==="F"?"F":"Fis")+" D";};
// Finale Vollendung
function chord(ms,t,d,v){ms.forEach(function(m){pluck(m,t,d,m<55,v||0.22);});}
$("sh-fin").onclick=function(){stopAll();var a=ctx(),t=a.currentTime+0.1;
 chord([50,54,57,60],t,2.2);chord([43,55,59,62],t+2,3);          // D7 -> G
 chord([45,57,61,64,67],t+4.5,2.2);chord([38,50,57,62,69],t+6.5,4); // A7 -> leere Quinte D-A
 var t2=t+9;pluck(38,t2,7,true,0.3);
 var end=singLine(LINES.filter(function(l){return /^Finale/.test(l[0]);})[0]||LINES[0],t2,MOTIV.map(function(){return 0.8;}));   // adagio 0,8 s/Ton
 flag(50,2,end+0.2,0.25);flag(50,4,end+0.9,0.2);flag(38,4,end+1.6,0.18);flag(50,8,end+2.3,0.12); // Flageolett-Oktaven auf D
 $("sh-motto").textContent="Christus baut auf, bau auch Du auf Christus";};
$("sh-stopall").onclick=stopAll;
$("sh-rec").onclick=function(){rec=!rec;if(rec){recEv=[];recT0=performance.now();$("sh-recinfo").textContent="0 Töne aufgenommen";}
 this.textContent="● Aufnahme: "+(rec?"an":"aus");this.classList.toggle("on",rec);};
$("sh-recplay").onclick=function(){if(!recEv.length)return;var a=ctx(),t=a.currentTime+0.05;recEv.forEach(function(e){pluck(e.m,t+e.t/1000,e.m<48?2.5:1.6,e.m<48);});};
function vlq(n){var b=[n&0x7f];while(n>>=7)b.unshift((n&0x7f)|0x80);return b;}
function buildMidi(ev){var TPQ=480,us=500000,evs=[];ev.forEach(function(e){var t=Math.round(e.t*TPQ/500);evs.push([t,[0x90,e.m,100]]);evs.push([t+TPQ,[0x80,e.m,0]]);});
 evs.sort(function(a,b){return a[0]-b[0];});var d=[0,0xFF,0x51,3,(us>>16)&255,(us>>8)&255,us&255,0,0xC0,46],last=0;
 evs.forEach(function(x){d.push.apply(d,vlq(x[0]-last));d.push.apply(d,x[1]);last=x[0];});d.push(0,0xFF,0x2F,0);
 var L=d.length;return new Uint8Array([0x4D,0x54,0x68,0x64,0,0,0,6,0,0,0,1,TPQ>>8,TPQ&255,0x4D,0x54,0x72,0x6B,(L>>>24)&255,(L>>16)&255,(L>>8)&255,L&255].concat(d));}
$("sh-recmid").onclick=function(){if(!recEv.length){$("sh-recinfo").textContent="Erst etwas aufnehmen";return;}var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([buildMidi(recEv)],{type:"audio/midi"}));a.download="sphaerenharfe-aufnahme.mid";document.body.appendChild(a);a.click();a.remove();};
// Loop-Player: feste Spuren werden gestreamt; "Für offline speichern" legt nur die gewählte Spur in einen eigenen Cache
var au=$("sh-audio"),cur=null,AC="rosary-audio-v1";
function setSrc(u){if(cur)URL.revokeObjectURL(cur);cur=null;au.src=u;au.play().catch(function(){});}
function info(t){$("sh-trackinfo").textContent=t;}
$("sh-track").onchange=function(){var u=this.value;if(!u)return;if(!("caches" in window)){setSrc(u);return;}
 caches.open(AC).then(function(c){return c.match(u);}).then(function(r){if(r){info("offline gespeichert");return r.blob().then(function(b){if(cur)URL.revokeObjectURL(cur);cur=URL.createObjectURL(b);au.src=cur;au.play().catch(function(){});});}
  info("wird aus dem Netz gestreamt");setSrc(u);}).catch(function(){setSrc(u);});};
$("sh-offline").onclick=function(){var u=$("sh-track").value;if(!u){info("Bitte erst eine Spur wählen");return;}info("speichere …");
 caches.open(AC).then(function(c){return c.add(u);}).then(function(){info("✓ offline gespeichert");}).catch(function(e){info("Speichern fehlgeschlagen: "+e.message);});};
$("sh-file").onchange=function(){var f=this.files&&this.files[0];if(!f)return;if(cur)URL.revokeObjectURL(cur);cur=URL.createObjectURL(f);au.src=cur;au.play().catch(function(){});info(f.name);};
$("sh-loop").onclick=function(){au.loop=!au.loop;this.textContent="Loop: "+(au.loop?"an":"aus");this.classList.toggle("on",au.loop);};
// Karaoke synchron zur Begleitspur (Silben-Zeitstempel aus karaoke.json)
var syncLine=-1;function trackKey(){var m=(($("sh-track").value||"")+"").match(/(lang-[a-z-]+?)(-mit-chor)?\.mp3$/);return m?m[1]:null;}
function syncKara(){var rows=window.SH_KARA&&window.SH_KARA[trackKey()],t=au.currentTime;if(!rows)return;var r=null;
 for(var i=0;i<rows.length;i++)if(t>=rows[i][1]&&t<rows[i][2]){r=rows[i];break;}
 if(!r){if(syncLine!==-1){syncLine=-1;$("sh-kara").innerHTML="";$("sh-hex").textContent="";}return;}
 if(syncLine!==r[0]){syncLine=r[0];showKara(LINES[r[0]][1]);$("sh-hex").textContent="Hexagramm "+r[4];$("sh-line").value=r[0];}
 var ks=$("sh-kara").children;for(var j=0;j<ks.length;j++)ks[j].className=t>=(r[3][j+1]!==undefined?r[3][j+1]:r[2])?"done":t>=r[3][j]?"on":"";}
au.addEventListener("timeupdate",syncKara);(function loop(){if(!au.paused)syncKara();requestAnimationFrame(loop);})();
window.__sh={TUNINGS:TUNINGS,BASS:BASS,LINES:LINES,syncKara:syncKara,buildMidi:buildMidi,get tuning(){return tuning;}};
if("serviceWorker" in navigator&&location.protocol!=="file:")navigator.serviceWorker.register("../service-worker.js",{scope:"../"}).catch(function(e){console.warn("SW",e);});
})();
