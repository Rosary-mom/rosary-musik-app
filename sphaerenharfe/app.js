(function(){
"use strict";
var $=function(id){return document.getElementById(id);};
var NN=["C","Cis","D","Dis","E","F","Fis","G","Gis","A","B","H"];
function nm(m){return NN[m%12]+(Math.floor(m/12)-1);}
var DDUR=[62,64,66,67,69,71,73,74]; // D4 E4 Fis4 G4 A4 H4 Cis5 D5
var BASS=[38,43,40]; // D2 G2 E2
var ac=null,master=null;
function ctx(){if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=0.5;master.connect(ac.destination);}if(ac.state==="suspended")ac.resume();return ac;}
function pluck(m,t,dur,bass){var a=ctx();t=t||a.currentTime;dur=dur||(bass?2.5:1.6);
 var f=440*Math.pow(2,(m-69)/12),o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain();
 o.type="triangle";o2.type="sine";o.frequency.value=f;o2.frequency.value=f*2;
 var g2=a.createGain();g2.gain.value=0.25;o2.connect(g2);g2.connect(g);o.connect(g);g.connect(master);
 var v=bass?0.5:0.35;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v,t+0.008);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
 o.start(t);o2.start(t);o.stop(t+dur+0.05);o2.stop(t+dur+0.05);}
// Aufnahme
var rec=false,recEv=[],recT0=0;
function note(m,bass){pluck(m,0,0,bass);if(rec){recEv.push({t:performance.now()-recT0,m:m});$("sh-recinfo").textContent=recEv.length+" Töne aufgenommen";}}
// Raster
var grid=$("sh-grid");
grid.appendChild(document.createElement("div"));
for(var b=0;b<8;b++){var h=document.createElement("div");h.textContent=b===0?"leer":b+". Bund";h.style.justifyContent="center";h.style.fontSize="13px";grid.appendChild(h);}
for(var s=1;s<=3;s++){var l=document.createElement("div");l.textContent="Saite "+s;grid.appendChild(l);
 DDUR.forEach(function(m){var btn=document.createElement("button");btn.textContent=nm(m);btn.addEventListener("pointerdown",function(e){e.preventDefault();note(m,false);});grid.appendChild(btn);});}
BASS.forEach(function(m){var btn=document.createElement("button");btn.className="bass";btn.textContent="Bass "+nm(m);btn.addEventListener("pointerdown",function(e){e.preventDefault();note(m,true);});$("sh-bass").appendChild(btn);});
// Baumeister: C5 H4 A4 H4 A4 D4 A4 C5
var BAU=[72,71,69,71,69,62,69,72],TXT="Christus baut auf, bau auch Du auf Christus";
$("sh-bau").onclick=function(){var a=ctx(),t=a.currentTime+0.05,d=0.5;BAU.forEach(function(m,i){pluck(m,t+i*d,1.2,false);});pluck(50,t,BAU.length*d+1,true);
 $("sh-motto").textContent=TXT;};
$("sh-rec").onclick=function(){rec=!rec;if(rec){recEv=[];recT0=performance.now();$("sh-recinfo").textContent="0 Töne aufgenommen";}
 this.textContent="● Aufnahme: "+(rec?"an":"aus");this.classList.toggle("on",rec);};
$("sh-recplay").onclick=function(){if(!recEv.length)return;var a=ctx(),t=a.currentTime+0.05;recEv.forEach(function(e){pluck(e.m,t+e.t/1000,e.m<48?2.5:1.6,e.m<48);});};
// MIDI: 120 BPM, 480 TPQ -> 1 ms = 0.96 ticks
function vlq(n){var b=[n&0x7f];while(n>>=7)b.unshift((n&0x7f)|0x80);return b;}
function buildMidi(ev){var TPQ=480,us=500000,evs=[];ev.forEach(function(e){var t=Math.round(e.t*TPQ/500);evs.push([t,[0x90,e.m,100]]);evs.push([t+TPQ,[0x80,e.m,0]]);});
 evs.sort(function(a,b){return a[0]-b[0];});var d=[0,0xFF,0x51,3,(us>>16)&255,(us>>8)&255,us&255,0,0xC0,46],last=0;
 evs.forEach(function(x){d.push.apply(d,vlq(x[0]-last));d.push.apply(d,x[1]);last=x[0];});d.push(0,0xFF,0x2F,0);
 var L=d.length;return new Uint8Array([0x4D,0x54,0x68,0x64,0,0,0,6,0,0,0,1,TPQ>>8,TPQ&255,0x4D,0x54,0x72,0x6B,(L>>>24)&255,(L>>16)&255,(L>>8)&255,L&255].concat(d));}
$("sh-recmid").onclick=function(){if(!recEv.length){$("sh-recinfo").textContent="Erst etwas aufnehmen";return;}var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([buildMidi(recEv)],{type:"audio/midi"}));a.download="sphaerenharfe-aufnahme.mid";document.body.appendChild(a);a.click();a.remove();};
window.__shBuildMidi=buildMidi;
// Loop-Player
var au=$("sh-audio"),cur=null;
$("sh-file").onchange=function(){var f=this.files&&this.files[0];if(!f)return;if(cur)URL.revokeObjectURL(cur);cur=URL.createObjectURL(f);au.src=cur;au.play().catch(function(){});};
$("sh-loop").onclick=function(){au.loop=!au.loop;this.textContent="Loop: "+(au.loop?"an":"aus");this.classList.toggle("on",au.loop);};
// Service Worker
if("serviceWorker" in navigator&&location.protocol!=="file:")navigator.serviceWorker.register("../service-worker.js",{scope:"../"}).catch(function(e){console.warn("SW",e);});
})();
