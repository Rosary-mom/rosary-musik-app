(function(){"use strict";var $=function(i){return document.getElementById(i);};
var ac=null,backing=null,backingName="",mic=null,micSrc=null,analyser=null,proc=null,rec=null;
var takes=[],cur=null,playing=[],stopTimer=null,meterBuf=null;
function ctx(){if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)({latencyHint:"interactive"});}if(ac.state==="suspended")ac.resume();return ac;}
function status(t){$("st-status").textContent=t;}
$("st-src").onchange=function(){$("st-file").style.display=this.value==="file"?"block":"none";};
$("st-lat").oninput=function(){$("st-latv").textContent=this.value;};
$("st-load").onclick=function(){var v=$("st-src").value,a=ctx();if(v==="none"){backing=null;backingName="ohne Begleitung";$("st-loadinfo").textContent="Ohne Begleitung";return;}
 $("st-loadinfo").textContent="lädt …";var p;
 if(v==="file"){var f=$("st-file").files[0];if(!f){$("st-loadinfo").textContent="Bitte erst eine Datei wählen";return;}backingName=f.name;p=f.arrayBuffer();}
 else{backingName=$("st-src").selectedOptions[0].textContent;p=fetch(v).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.arrayBuffer();});}
 p.then(function(b){return a.decodeAudioData(b);}).then(function(buf){backing=buf;$("st-loadinfo").textContent="✓ "+backingName+" ("+Math.round(buf.duration)+" s)";})
  .catch(function(e){$("st-loadinfo").textContent="Fehler beim Laden: "+e.message;});};
$("st-mic").onclick=function(){var a=ctx();
 navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false,channelCount:1}}).then(function(s){
  mic=s;micSrc=a.createMediaStreamSource(s);analyser=a.createAnalyser();analyser.fftSize=1024;micSrc.connect(analyser);meterBuf=new Float32Array(analyser.fftSize);
  $("st-rec").disabled=false;$("st-mic").textContent="🎤 Mikrofon bereit";$("st-mic").classList.add("on");meter();})
 .catch(function(e){status("Kein Mikrofon: "+e.message);});};
function meter(){requestAnimationFrame(meter);if(!analyser)return;analyser.getFloatTimeDomainData(meterBuf);var pk=0;for(var i=0;i<meterBuf.length;i++)pk=Math.max(pk,Math.abs(meterBuf[i]));
 $("st-level").style.width=Math.min(100,pk*100)+"%";}
function click(t,hi){var a=ac,o=a.createOscillator(),g=a.createGain();o.frequency.value=hi?1500:1000;o.connect(g);g.connect(a.destination);g.gain.setValueAtTime(0.4,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.08);o.start(t);o.stop(t+0.1);}
function stopAll(){playing.forEach(function(n){try{n.stop();}catch(e){}});playing=[];clearTimeout(stopTimer);}
$("st-rec").onclick=function(){var a=ctx();stopAll();var beats=+$("st-count").value,spb=60/Math.max(40,+$("st-bpm").value||60);
 var chunks=[],pcm=[];cur={id:takes.length+1,lat:+$("st-lat").value,from:+$("st-from").value||0,backingName:backingName,sr:a.sampleRate};
 // Rohdaten (für WAV) über ScriptProcessor
 proc=a.createScriptProcessor(4096,1,1);var mute=a.createGain();mute.gain.value=0;proc.onaudioprocess=function(e){if(cur&&cur.t0==null)cur.t0=e.playbackTime-e.inputBuffer.duration;pcm.push(new Float32Array(e.inputBuffer.getChannelData(0)));};
 micSrc.connect(proc);proc.connect(mute);mute.connect(a.destination);
 // komprimiert über MediaRecorder
 var mt=["audio/webm;codecs=opus","audio/ogg;codecs=opus","audio/webm"].find(function(m){return window.MediaRecorder&&MediaRecorder.isTypeSupported(m);})||"";
 rec=new MediaRecorder(mic,mt?{mimeType:mt,audioBitsPerSecond:128000}:undefined);rec.ondataavailable=function(e){if(e.data.size)chunks.push(e.data);};
 rec.onstop=function(){var t=cur;t.blob=new Blob(chunks,{type:rec.mimeType||"audio/webm"});t.ext=(rec.mimeType||"").indexOf("ogg")>=0?"ogg":"webm";
  var n=pcm.reduce(function(s,c){return s+c.length;},0),all=new Float32Array(n),o=0;pcm.forEach(function(c){all.set(c,o);o+=c.length;});t.pcm=all;
  // Offset: wie viele Sekunden nach Aufnahmebeginn die Begleitung startete, minus Latenz
  t.offset=Math.max(0,(t.bStart-(t.t0==null?t.recStart:t.t0))+t.lat/1000);takes.push(t);cur=null;renderTakes();status("Take "+t.id+" gespeichert ("+((all.length/t.sr)|0)+" s)");};
 var now=a.currentTime+0.15;cur.recStart=now;rec.start();
 for(var i=0;i<beats;i++)click(now+i*spb,i%4===0);
 var bStart=now+beats*spb;cur.bStart=bStart;
 if(backing){var s=a.createBufferSource(),g=a.createGain();g.gain.value=+$("st-bvol").value/100;s.buffer=backing;s.connect(g);g.connect(a.destination);s.start(bStart,cur.from);playing.push(s);
  s.onended=function(){if(rec&&rec.state==="recording")$("st-stop").onclick();};}
 $("st-rec").disabled=true;$("st-stop").disabled=false;$("st-rec").classList.add("on");
 var cd=beats;status(beats?"Einzähler …":"● Aufnahme läuft");var iv=setInterval(function(){cd--;if(cd>0)status("Einzähler … "+cd);else{status("● Aufnahme läuft");clearInterval(iv);}},spb*1000);cur.iv=iv;};
$("st-stop").onclick=function(){if(!rec||rec.state!=="recording")return;clearInterval(cur.iv);stopAll();rec.stop();try{micSrc.disconnect(proc);}catch(e){}proc.disconnect();proc=null;
 $("st-rec").disabled=false;$("st-stop").disabled=true;$("st-rec").classList.remove("on");};
function voiceBuffer(t){var a=ctx(),skip=Math.round(t.offset*t.sr),len=Math.max(1,t.pcm.length-skip),b=a.createBuffer(1,len,t.sr);b.copyToChannel(t.pcm.subarray(skip),0);return b;}
function play(t,mode){var a=ctx();stopAll();var start=a.currentTime+0.1,vb=voiceBuffer(t),dur=vb.duration;
 if(mode!=="voice"&&backing&&t.backingName===backingName){var s=a.createBufferSource(),g=a.createGain();g.gain.value=+$("st-bvol").value/100;s.buffer=backing;s.connect(g);g.connect(a.destination);s.start(start,t.from,dur);playing.push(s);}
 if(mode!=="backing"){var v=a.createBufferSource();v.buffer=vb;v.connect(a.destination);v.start(start);playing.push(v);}
 stopTimer=setTimeout(stopAll,(dur+0.3)*1000);}
function wav(ch,sr){var n=ch.length,b=new ArrayBuffer(44+n*2),d=new DataView(b),w=function(o,s){for(var i=0;i<s.length;i++)d.setUint8(o+i,s.charCodeAt(i));};
 w(0,"RIFF");d.setUint32(4,36+n*2,true);w(8,"WAVE");w(12,"fmt ");d.setUint32(16,16,true);d.setUint16(20,1,true);d.setUint16(22,1,true);d.setUint32(24,sr,true);d.setUint32(28,sr*2,true);d.setUint16(32,2,true);d.setUint16(34,16,true);w(36,"data");d.setUint32(40,n*2,true);
 for(var i=0;i<n;i++){var x=Math.max(-1,Math.min(1,ch[i]));d.setInt16(44+i*2,x<0?x*0x8000:x*0x7fff,true);}return new Blob([b],{type:"audio/wav"});}
function dl(blob,name){var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href);},5000);}
function mixed(t){var vb=voiceBuffer(t),v=vb.getChannelData(0),out=new Float32Array(v.length);out.set(v);
 if(backing&&t.backingName===backingName){var bc=backing.numberOfChannels,g=+$("st-bvol").value/100,s0=Math.round(t.from*backing.sampleRate);
  for(var c=0;c<bc;c++){var bd=backing.getChannelData(c);for(var i=0;i<out.length&&s0+i<bd.length;i++)out[i]+=bd[s0+i]*g/bc;}}
 var pk=0;for(var j=0;j<out.length;j++)pk=Math.max(pk,Math.abs(out[j]));if(pk>1)for(j=0;j<out.length;j++)out[j]/=pk;return out;}
function info(t){return JSON.stringify({take:t.id,begleitung:t.backingName,startInBegleitungSek:t.from,offsetSek:+t.offset.toFixed(4),latenzMs:t.lat,sampleRate:t.sr,hinweis:"Die WAV-Dateien beginnen genau beim Einsatz der Begleitung (startInBegleitungSek)."},null,1);}
function renderTakes(){var el=$("st-takes");el.innerHTML="";takes.slice().reverse().forEach(function(t){var d=document.createElement("div");d.className="take";
 d.innerHTML="<b>Take "+t.id+"</b> · "+(t.pcm.length/t.sr).toFixed(1)+" s · Offset "+(t.offset*1000|0)+" ms · "+t.backingName+"<div class=row></div>";var r=d.querySelector(".row");
 [["▶ gemischt",function(){play(t,"mix");}],["▶ nur Stimme",function(){play(t,"voice");}],["▶ nur Begleitung",function(){play(t,"backing");}],["■",stopAll],
  ["."+t.ext,function(){dl(t.blob,"stimme-take"+t.id+"."+t.ext);}],["WAV Stimme",function(){dl(wav(voiceBuffer(t).getChannelData(0),t.sr),"stimme-take"+t.id+".wav");}],
  ["WAV gemischt",function(){dl(wav(mixed(t),t.sr),"mix-take"+t.id+".wav");}],["Offset-Info",function(){dl(new Blob([info(t)],{type:"application/json"}),"take"+t.id+"-offset.json");}],
  ["🗑",function(){if(confirm("Take "+t.id+" löschen?")){takes=takes.filter(function(x){return x!==t;});renderTakes();}}]]
  .forEach(function(b){var btn=document.createElement("button");btn.textContent=b[0];btn.onclick=b[1];r.appendChild(btn);});el.appendChild(d);});}
window.__st={takes:takes,get backing(){return backing;}};
})();
