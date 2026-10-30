(function(){"use strict";var $=function(i){return document.getElementById(i);};
var ROWS=[["D5",74],["Cis5",73],["C5",72],["H4",71],["A4",69],["G4",67],["Fis4",66],["E4",64],["D4",62]],COLS=16;
var seq=new Array(COLS).fill(null),cells=[];var g=$("nt-grid"),hr=g.insertRow();hr.appendChild(document.createElement("th"));
for(var c=0;c<COLS;c++){var th=document.createElement("th");th.textContent=c+1;hr.appendChild(th);}
ROWS.forEach(function(r,ri){var tr=g.insertRow(),th=document.createElement("th");th.textContent=r[0];tr.appendChild(th);cells[ri]=[];
 for(var c=0;c<COLS;c++)(function(c){var td=tr.insertCell();td.addEventListener("pointerdown",function(){seq[c]=seq[c]===r[1]?null:r[1];if(seq[c])tone(r[1],ctx().currentTime,0.5);draw();});cells[ri][c]=td;})(c);});
function draw(){ROWS.forEach(function(r,ri){for(var c=0;c<COLS;c++)cells[ri][c].className=seq[c]===r[1]?"on":"";});$("nt-info").textContent=seq.filter(Boolean).length+" Noten";}
var ac=null,timers=[];function ctx(){if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();return ac;}
function tone(m,t,d){var a=ctx();
 if(window.UnisonAudio){UnisonAudio.init(a);var sKind=$('nt-sound')?$('nt-sound').value:'unison_harfe';UnisonAudio.playVoice(t,m,d,0.28,sKind);}
 else{var o=a.createOscillator(),gn=a.createGain();o.type="triangle";o.frequency.value=440*Math.pow(2,(m-69)/12);o.connect(gn);gn.connect(a.destination);
  gn.gain.setValueAtTime(0.0001,t);gn.gain.exponentialRampToValueAtTime(0.35,t+0.01);gn.gain.exponentialRampToValueAtTime(0.0001,t+d);o.start(t);o.stop(t+d+0.05);}}
function spb(){return 60/Math.max(40,Math.min(200,+$("nt-tempo").value||80));}
function stop(){timers.forEach(clearTimeout);timers=[];draw();}
$("nt-play").onclick=function(){stop();var a=ctx(),t0=a.currentTime+0.05,s=spb();seq.forEach(function(m,c){if(m){
  tone(m,t0+c*s,s*1.4);
  if($("nt-voice-notes")&&$("nt-voice-notes").checked&&window.UnisonChoir){
    var nName=ROWS.find(function(r){return r[1]===m;});
    if(nName){setTimeout(function(){UnisonChoir.speak(nName[0].replace(/\d/,""),"la");},c*s*1000);}
  }
}
 timers.push(setTimeout(function(){draw();ROWS.forEach(function(r,ri){cells[ri][c].classList.add("play");});},c*s*1000));});timers.push(setTimeout(draw,COLS*s*1000));};
$("nt-stop").onclick=stop;
$("nt-bau").onclick=function(){seq=new Array(COLS).fill(null);[72,71,69,71,69,62,69,72].forEach(function(m,i){seq[i]=m;});draw();$("nt-info").textContent="Leitmotiv: Christus baut auf, bau auch Du auf Christus";};
if($("nt-unison"))$("nt-unison").onclick=function(){seq=new Array(COLS).fill(null);
 // Unison D-Dur Kadenz (I - IV - V - I)
 [62,66,69,74, 67,71,74,71, 69,73,74,69, 74,69,66,62].forEach(function(m,i){if(i<COLS)seq[i]=m;});
 draw();$("nt-info").textContent="✦ Unison D-Dur Kadenz (Dadd9 · Gmaj7 · Aadd9 · Dadd9) geladen";};
if($("nt-tuning"))$("nt-tuning").onchange=function(){if(window.UnisonAudio)UnisonAudio.setTuning(parseFloat(this.value));};
$("nt-clear").onclick=function(){seq=new Array(COLS).fill(null);draw();};
function vlq(n){var b=[n&0x7f];while(n>>=7)b.unshift((n&0x7f)|0x80);return b;}
function midi(){var T=480,us=Math.round(spb()*1e6),d=[0,0xFF,0x51,3,(us>>16)&255,(us>>8)&255,us&255,0,0xC0,46],rest=0;
 seq.forEach(function(m){if(!m){rest+=T;return;}d.push.apply(d,vlq(rest));d.push(0x90,m,100);d.push.apply(d,vlq(T));d.push(0x80,m,0);rest=0;});
 d.push(0,0xFF,0x2F,0);var L=d.length;return new Uint8Array([0x4D,0x54,0x68,0x64,0,0,0,6,0,0,0,1,T>>8,T&255,0x4D,0x54,0x72,0x6B,(L>>>24)&255,(L>>16)&255,(L>>8)&255,L&255].concat(d));}
$("nt-mid").onclick=function(){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([midi()],{type:"audio/midi"}));a.download="noten.mid";document.body.appendChild(a);a.click();a.remove();};
draw();})();
