const O=require('./orakel.js'),fs=require('fs'),a=require('assert');
const plan=JSON.parse(fs.readFileSync('../iching-pflanzplan.json')).sektoren,T=JSON.parse(fs.readFileSync('orakel-texte.json')).hexagramme;
const K=JSON.parse(fs.readFileSync('../karaoke.json'));const seen=new Set();let n=0;
for(let v=0;v<64;v++){const w=v.toString(2).padStart(6,'0'),kw=O.kingWen(w);seen.add(kw);
 const s=plan.find(x=>x.king_wen===kw);a.strictEqual(s.binaer_oben_nach_unten,w.split('').reverse().join(''),'Bits '+w);
 a.strictEqual(O.fuxiPos(w),s.position,'Pos '+w);a(T[kw].urteil&&T[kw].bild,'Text '+kw);
 a.strictEqual(T[kw].binaer_oben_nach_unten,s.binaer_oben_nach_unten);
 const kz=K.saetze.flatMap(x=>x.zeilen).find(z=>z.hexagramm.king_wen===kw);a(kz&&T[kw].karaoke.nr===kz.nr,'Karaoke '+kw);
 const k=O.komposition(w);a(k.events.length>40&&k.dauer>=30&&k.dauer<=60);const m=O.midi(w);a(m[0]===77&&m.length>500);n++;}
a.strictEqual(seen.size,64);
a.strictEqual(O.kingWen('111111'),1);a.strictEqual(O.kingWen('000000'),2);a.strictEqual(O.kingWen('100010'),3);a.strictEqual(O.kingWen('111000'),11);a.strictEqual(O.kingWen('101010'),63);a.strictEqual(O.kingWen('010101'),64);
for(let i=0;i<200;i++)a(O.pruefe(O.zufallsWurf()));a(!O.pruefe('10110'));a(!O.pruefe('10a100'));
console.log('OK: alle',n,'Würfe geprüft (KW, Bits, Fu-Xi-Position, Texte, Karaoke, Komposition, MIDI)');
