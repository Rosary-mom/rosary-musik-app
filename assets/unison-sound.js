/**
 * Unison Sound & Chord Engine for Rosary Musik
 * Combines authentic Unison Free Mini MIDI Pack chord voicings & progressions
 * with studio-grade Web Audio Unison synthesis (stereo detune, cathedral space, sacred Naturton tuning).
 */
(function(window){
  'use strict';

  var RAW_DATA = {"chords":{"0_0":[{"roman":"I","name":"Cadd9","notes":[36,52,60,62,67]},{"roman":"ii","name":"Dm7","notes":[38,57,60,62,65]},{"roman":"iii","name":"Em7","notes":[40,52,59,62,67]},{"roman":"IV","name":"Fmaj7","notes":[41,53,57,60,64]},{"roman":"V","name":"Gadd9","notes":[43,57,59,62,67]},{"roman":"vi","name":"Am7","notes":[45,57,60,64,67]},{"roman":"vii","name":"Gadd9;B","notes":[35,55,57,62,67]}],"9_5":[{"roman":"i","name":"Am7","notes":[45,57,60,64,67]},{"roman":"ii","name":"Gadd9;B","notes":[35,55,57,62,67]},{"roman":"III","name":"Cadd9","notes":[36,52,60,62,67]},{"roman":"iv","name":"Dm7","notes":[38,57,60,62,65]},{"roman":"v","name":"Em7","notes":[40,52,59,62,67]},{"roman":"VI","name":"Fmaj7","notes":[41,53,57,60,64]},{"roman":"VII","name":"Gadd9","notes":[43,57,59,62,67]}],"1_0":[{"roman":"I","name":"Dbadd9","notes":[37,53,61,63,68]},{"roman":"ii","name":"Ebm7","notes":[39,58,61,63,66]},{"roman":"iii","name":"Fm7","notes":[41,53,60,63,68]},{"roman":"IV","name":"Gbmaj7","notes":[42,54,58,61,65]},{"roman":"V","name":"Abadd9","notes":[44,58,60,63,68]},{"roman":"vi","name":"Bbm7","notes":[46,58,61,65,68]},{"roman":"vii","name":"Abadd9;C","notes":[36,56,58,63,68]}],"10_5":[{"roman":"i","name":"Bbm7","notes":[46,58,61,65,68]},{"roman":"ii","name":"Abadd9;C","notes":[36,56,58,63,68]},{"roman":"III","name":"Dbadd9","notes":[37,53,61,63,68]},{"roman":"iv","name":"Ebm7","notes":[39,58,61,63,66]},{"roman":"v","name":"Fm7","notes":[41,53,60,63,68]},{"roman":"VI","name":"Gbmaj7","notes":[42,54,58,61,65]},{"roman":"VII","name":"Abadd9","notes":[44,58,60,63,68]}],"2_0":[{"roman":"I","name":"Dadd9","notes":[38,54,62,64,69]},{"roman":"ii","name":"Em7","notes":[40,59,62,64,67]},{"roman":"iii","name":"F#m7","notes":[42,54,61,64,69]},{"roman":"IV","name":"Gmaj7","notes":[43,55,59,62,66]},{"roman":"V","name":"Aadd9","notes":[45,59,61,64,69]},{"roman":"vi","name":"Bm7","notes":[47,59,62,66,69]},{"roman":"vii","name":"Aadd9;C#","notes":[37,57,59,64,69]}],"11_5":[{"roman":"i","name":"Bm7","notes":[47,59,62,66,69]},{"roman":"ii","name":"Aadd9;C#","notes":[37,57,59,64,69]},{"roman":"III","name":"Dadd9","notes":[38,54,62,64,69]},{"roman":"iv","name":"Em7","notes":[40,59,62,64,67]},{"roman":"v","name":"F#m7","notes":[42,54,61,64,69]},{"roman":"VI","name":"Gmaj7","notes":[43,55,59,62,66]},{"roman":"VII","name":"Aadd9","notes":[45,59,61,64,69]}],"3_0":[{"roman":"I","name":"Ebadd9","notes":[39,51,55,58,65]},{"roman":"ii","name":"Fm7","notes":[41,53,56,60,63]},{"roman":"iii","name":"Gm7","notes":[43,55,58,62,65]},{"roman":"IV","name":"Abmaj7","notes":[44,56,60,63,67]},{"roman":"V","name":"Bbadd9","notes":[34,50,58,60,65]},{"roman":"vi","name":"Cm7","notes":[36,55,58,60,63]},{"roman":"vii","name":"Bbadd9;D","notes":[38,50,53,58,60]}],"0_5":[{"roman":"i","name":"Cm7","notes":[36,55,58,60,63]},{"roman":"ii","name":"Bbadd9;D","notes":[38,50,53,58,60]},{"roman":"III","name":"Ebadd9","notes":[39,51,55,58,65]},{"roman":"iv","name":"Fm7","notes":[41,53,56,60,63]},{"roman":"v","name":"Gm7","notes":[43,55,58,62,65]},{"roman":"VI","name":"Abmaj7","notes":[44,56,60,63,67]},{"roman":"VII","name":"Bbadd9","notes":[34,50,58,60,65]}],"4_0":[{"roman":"I","name":"Eadd9","notes":[40,52,56,59,66]},{"roman":"ii","name":"F#m7","notes":[42,54,57,61,64]},{"roman":"iii","name":"G#m7","notes":[44,56,59,63,66]},{"roman":"IV","name":"Amaj7","notes":[45,57,61,64,68]},{"roman":"V","name":"Badd9","notes":[35,51,59,61,66]},{"roman":"vi","name":"C#m7","notes":[37,56,59,61,64]},{"roman":"vii","name":"Badd9;D#","notes":[39,51,54,59,61]}],"1_5":[{"roman":"i","name":"C#m7","notes":[37,56,59,61,64]},{"roman":"ii","name":"Badd9;D#","notes":[39,51,54,59,61]},{"roman":"III","name":"Eadd9","notes":[40,52,56,59,66]},{"roman":"iv","name":"F#m7","notes":[42,54,57,61,64]},{"roman":"v","name":"G#m7","notes":[44,56,59,63,66]},{"roman":"VI","name":"Amaj7","notes":[45,57,61,64,68]},{"roman":"VII","name":"Badd9","notes":[35,51,59,61,66]}],"5_0":[{"roman":"I","name":"Fadd9","notes":[41,53,57,60,67]},{"roman":"ii","name":"Gm7","notes":[43,55,58,62,65]},{"roman":"iii","name":"Am7","notes":[45,57,60,64,67]},{"roman":"IV","name":"Bbmaj7","notes":[46,58,62,65,69]},{"roman":"V","name":"Cadd9","notes":[36,52,60,62,67]},{"roman":"vi","name":"Dm7","notes":[38,57,60,62,65]},{"roman":"vii","name":"Cadd9;E","notes":[40,55,60,62,67]}],"2_5":[{"roman":"i","name":"Dm7","notes":[38,57,60,62,65]},{"roman":"ii","name":"Cadd9;E","notes":[40,55,60,62,67]},{"roman":"III","name":"Fadd9","notes":[41,53,57,60,67]},{"roman":"iv","name":"Gm7","notes":[43,55,58,62,65]},{"roman":"v","name":"Am7","notes":[45,57,60,64,67]},{"roman":"VI","name":"Bbmaj7","notes":[46,58,62,65,69]},{"roman":"VII","name":"Cadd9","notes":[36,52,60,62,67]}],"6_0":[{"roman":"I","name":"Gbadd9","notes":[42,54,58,61,68]},{"roman":"ii","name":"Abm7","notes":[44,56,59,63,66]},{"roman":"iii","name":"Bbm7","notes":[46,58,61,65,68]},{"roman":"IV","name":"Cbmaj7","notes":[47,59,63,66,70]},{"roman":"V","name":"Dbadd9","notes":[37,53,61,63,68]},{"roman":"vi","name":"Ebm7","notes":[39,58,61,63,66]},{"roman":"vii","name":"Dbadd9;F","notes":[41,56,61,63,68]}],"3_5":[{"roman":"i","name":"Ebm7","notes":[39,58,61,63,66]},{"roman":"ii","name":"Dbadd9;F","notes":[41,56,61,63,68]},{"roman":"III","name":"Gbadd9","notes":[42,54,58,61,68]},{"roman":"iv","name":"Abm7","notes":[44,56,59,63,66]},{"roman":"v","name":"Bbm7","notes":[46,58,61,65,68]},{"roman":"VI","name":"Cbmaj7","notes":[47,59,63,66,70]},{"roman":"VII","name":"Dbadd9","notes":[37,53,61,63,68]}],"7_0":[{"roman":"I","name":"Gadd9","notes":[43,57,59,62,67]},{"roman":"ii","name":"Am7","notes":[45,57,60,64,67]},{"roman":"iii","name":"Bm7","notes":[35,54,57,59,62]},{"roman":"IV","name":"Cmaj7","notes":[36,52,59,60,67]},{"roman":"V","name":"Dadd9","notes":[38,50,54,57,64]},{"roman":"vi","name":"Em7","notes":[40,52,59,62,67]},{"roman":"vii","name":"Dadd9;F#","notes":[42,50,54,57,64]}],"4_5":[{"roman":"i","name":"Em7","notes":[40,52,59,62,67]},{"roman":"ii","name":"Dadd9;F#","notes":[42,50,54,57,64]},{"roman":"III","name":"Gadd9","notes":[43,57,59,62,67]},{"roman":"iv","name":"Am7","notes":[45,57,60,64,67]},{"roman":"v","name":"Bm7","notes":[35,54,57,59,62]},{"roman":"VI","name":"Cmaj7","notes":[36,52,59,60,67]},{"roman":"VII","name":"Dadd9","notes":[38,50,54,57,64]}],"8_0":[{"roman":"I","name":"Abadd9","notes":[44,51,58,60,63]},{"roman":"ii","name":"Bbm7","notes":[46,56,58,61,65]},{"roman":"iii","name":"Cm7","notes":[36,55,58,60,63]},{"roman":"IV","name":"Dbmaj7","notes":[37,56,60,61,65]},{"roman":"V","name":"Ebadd9","notes":[39,53,55,58,63]},{"roman":"vi","name":"Fm7","notes":[41,53,56,60,63]},{"roman":"vii","name":"Ebadd9;G","notes":[43,51,55,58,65]}],"5_5":[{"roman":"i","name":"Fm7","notes":[41,53,56,60,63]},{"roman":"ii","name":"Ebadd9;G","notes":[43,51,55,58,65]},{"roman":"III","name":"Abadd9","notes":[44,51,58,60,63]},{"roman":"iv","name":"Bbm7","notes":[46,56,58,61,65]},{"roman":"v","name":"Cm7","notes":[36,55,58,60,63]},{"roman":"VI","name":"Dbmaj7","notes":[37,56,60,61,65]},{"roman":"VII","name":"Ebadd9","notes":[39,53,55,58,63]}],"9_0":[{"roman":"I","name":"Aadd9","notes":[45,52,59,61,64]},{"roman":"ii","name":"Bm7","notes":[47,57,59,62,66]},{"roman":"iii","name":"C#m7","notes":[37,56,59,61,64]},{"roman":"IV","name":"Dmaj7","notes":[38,54,61,62,69]},{"roman":"V","name":"Eadd9","notes":[40,52,56,59,66]},{"roman":"vi","name":"F#m7","notes":[42,54,61,64,69]},{"roman":"vii","name":"Eadd9;G#","notes":[44,52,56,59,66]}],"6_5":[{"roman":"i","name":"F#m7","notes":[42,54,61,64,69]},{"roman":"ii","name":"Eadd9;G#","notes":[44,52,56,59,66]},{"roman":"III","name":"Aadd9","notes":[45,52,59,61,64]},{"roman":"iv","name":"Bm7","notes":[47,57,59,62,66]},{"roman":"v","name":"C#m7","notes":[37,56,59,61,64]},{"roman":"VI","name":"Dmaj7","notes":[38,54,61,62,69]},{"roman":"VII","name":"Eadd9","notes":[40,52,56,59,66]}],"10_0":[{"roman":"I","name":"Bbadd9","notes":[46,53,60,62,65]},{"roman":"ii","name":"Cm7","notes":[36,55,58,60,63]},{"roman":"iii","name":"Dm7","notes":[38,57,60,62,65]},{"roman":"IV","name":"Ebmaj7","notes":[39,55,62,63,70]},{"roman":"V","name":"Fadd9","notes":[41,53,57,60,67]},{"roman":"vi","name":"Gm7","notes":[43,55,62,65,70]},{"roman":"vii","name":"Fadd9;A","notes":[45,53,57,60,67]}],"7_5":[{"roman":"i","name":"Gm7","notes":[43,55,62,65,70]},{"roman":"ii","name":"Fadd9;A","notes":[45,53,57,60,67]},{"roman":"III","name":"Bbadd9","notes":[46,53,60,62,65]},{"roman":"iv","name":"Cm7","notes":[36,55,58,60,63]},{"roman":"v","name":"Dm7","notes":[38,57,60,62,65]},{"roman":"VI","name":"Ebmaj7","notes":[39,55,62,63,70]},{"roman":"VII","name":"Fadd9","notes":[41,53,57,60,67]}],"11_0":[{"roman":"I","name":"Badd9","notes":[35,51,59,61,66]},{"roman":"ii","name":"C#m7","notes":[37,56,59,61,64]},{"roman":"iii","name":"D#m7","notes":[39,51,58,61,66]},{"roman":"IV","name":"Emaj7","notes":[40,52,56,59,63]},{"roman":"V","name":"F#add9","notes":[42,56,58,61,66]},{"roman":"vi","name":"G#m7","notes":[44,56,59,63,66]},{"roman":"vii","name":"F#add9;A#","notes":[34,54,56,61,66]}],"8_5":[{"roman":"i","name":"G#m7","notes":[44,56,59,63,66]},{"roman":"ii","name":"F#add9;A#","notes":[34,54,56,61,66]},{"roman":"III","name":"Badd9","notes":[35,51,59,61,66]},{"roman":"iv","name":"C#m7","notes":[37,56,59,61,64]},{"roman":"v","name":"D#m7","notes":[39,51,58,61,66]},{"roman":"VI","name":"Emaj7","notes":[40,52,56,59,63]},{"roman":"VII","name":"F#add9","notes":[42,56,58,61,66]}]},"progressions":{"0_0":[{"title":"01 - C Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[36,55,60,64],"beats":4.0},{"notes":[43,55,59,64],"beats":4.0},{"notes":[45,57,60,64],"beats":4.0},{"notes":[41,57,60,62],"beats":4.0}]},{"title":"02 - C Major - Basic (IV-I-vim7-V)","steps":[{"notes":[41,57,60,65,69],"beats":5.0},{"notes":[36,55,60,64,67],"beats":3.0},{"notes":[45,57,60,64,67],"beats":5.0},{"notes":[43,55,59,62,67],"beats":3.0}]},{"title":"03 - C Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[36,52,55,60,62],"beats":4.0},{"notes":[44,51,55,60,63],"beats":4.0},{"notes":[46,53,58,60,62],"beats":4.0},{"notes":[41,55,57,60,65],"beats":4.0}]},{"title":"04 - C Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[36,55,59,60,64],"beats":4.0},{"notes":[45,55,57,60,64],"beats":4.0},{"notes":[41,55,57,60,64],"beats":4.0},{"notes":[44,55,56,60,63],"beats":4.0}]},{"title":"05 - C Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[36,52,59,62,67],"beats":4.0},{"notes":[36,52,58,62,67],"beats":4.0},{"notes":[41,53,57,62,67],"beats":4.0},{"notes":[41,53,56,62,67],"beats":4.0},{"notes":[40,55,59,62,67],"beats":2.0},{"notes":[45,55,57,61,65],"beats":2.0},{"notes":[38,53,57,60,64],"beats":2.0},{"notes":[43,53,57,59,64],"beats":2.0},{"notes":[36,52,55,57,62],"beats":4.0},{"notes":[37,53,56,59,63],"beats":4.0}]},{"title":"06 - C Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[41,53,60,64,67],"beats":8.0},{"notes":[36,52,60,62,67],"beats":4.0},{"notes":[43,52,58,64,67],"beats":2.0},{"notes":[45,55,60,61,65],"beats":2.0},{"notes":[38,53,57,60,65],"beats":6.0},{"notes":[43,53,57,59,64],"beats":2.0},{"notes":[36,52,55,59,64],"beats":4.0},{"notes":[43,53,58,62,69],"beats":2.0},{"notes":[36,52,58,62,68],"beats":2.0}]},{"title":"Bonus - Major Prog 01 (Iadd9-bVIIsus-IV-bVImaj7-bVIIsus)","steps":[{"notes":[36,48,55,62,64],"beats":4.0},{"notes":[46,53,58,60,65],"beats":4.0},{"notes":[45,53,57,60,65],"beats":4.0},{"notes":[44,51,56,60,67],"beats":2.0},{"notes":[46,53,58,60,65],"beats":2.0}]}],"9_5":[{"title":"01 - A Minor - Basic (i-VI-VII-v)","steps":[{"notes":[45,57,60,64],"beats":4.0},{"notes":[41,57,60,65],"beats":4.0},{"notes":[43,55,59,62],"beats":4.0},{"notes":[40,55,59,64],"beats":4.0}]},{"title":"02 - A Minor - Basic (VI-V-isus-i)","steps":[{"notes":[41,60,65,69],"beats":4.0},{"notes":[40,59,64,68],"beats":4.0},{"notes":[45,59,64,69],"beats":4.0},{"notes":[45,60,64,69],"beats":4.0}]},{"title":"03 - A Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[38,53,60,64,69],"beats":4.0},{"notes":[41,53,60,64,67],"beats":4.0},{"notes":[43,55,57,62,67],"beats":4.0},{"notes":[45,52,60,62,67],"beats":4.0}]},{"title":"04 - A Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[45,52,59,60,67],"beats":4.0},{"notes":[41,53,57,60,64],"beats":4.0},{"notes":[36,52,55,60,62],"beats":4.0},{"notes":[43,50,55,59,64],"beats":4.0}]},{"title":"05 - A Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[45,59,60,64,67],"beats":4.0},{"notes":[46,57,60,62,65],"beats":4.0},{"notes":[40,59,62,64,68],"beats":4.0},{"notes":[41,57,60,64,67],"beats":4.0},{"notes":[38,53,60,64,69],"beats":4.0},{"notes":[46,53,60,62,69],"beats":4.0},{"notes":[47,53,59,62,69],"beats":4.0},{"notes":[40,56,60,62,68],"beats":4.0}]},{"title":"06 - A Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[38,53,57,60,64],"beats":4.0},{"notes":[40,56,59,62,65],"beats":4.0},{"notes":[45,55,59,62,64],"beats":4.0},{"notes":[41,55,57,60,64],"beats":4.0},{"notes":[38,53,57,60,62],"beats":4.0},{"notes":[46,53,57,58,62],"beats":4.0},{"notes":[45,52,56,57,61],"beats":4.0},{"notes":[45,52,55,57,60],"beats":4.0}]},{"title":"Bonus - Minor Prog 01 (im7-vm7-VImaj9-ivm7)","steps":[{"notes":[45,60,64,67],"beats":4.0},{"notes":[40,59,62,67],"beats":4.0},{"notes":[41,60,64,67],"beats":4.0},{"notes":[38,57,60,65],"beats":4.0}]}],"1_0":[{"title":"01 - Db Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[37,56,61,65],"beats":4.0},{"notes":[44,56,60,65],"beats":4.0},{"notes":[46,58,61,65],"beats":4.0},{"notes":[42,58,61,63],"beats":4.0}]},{"title":"02 - Db Major - Basic (IV-I-vim7-V)","steps":[{"notes":[42,54,58,61,66],"beats":5.0},{"notes":[37,53,56,61,65],"beats":3.0},{"notes":[46,53,58,61,68],"beats":5.0},{"notes":[44,56,60,63,68],"beats":3.0}]},{"title":"03 - Db Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[37,53,56,61,63],"beats":4.0},{"notes":[45,52,56,61,64],"beats":4.0},{"notes":[47,54,59,61,63],"beats":4.0},{"notes":[42,56,58,61,66],"beats":4.0}]},{"title":"04 - Db Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[37,56,60,61,65],"beats":4.0},{"notes":[46,56,58,61,65],"beats":4.0},{"notes":[42,56,58,61,65],"beats":4.0},{"notes":[45,56,57,61,64],"beats":4.0}]},{"title":"05 - Db Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[37,53,60,63,68],"beats":4.0},{"notes":[37,53,59,63,68],"beats":4.0},{"notes":[42,54,58,63,68],"beats":4.0},{"notes":[42,54,57,63,68],"beats":4.0},{"notes":[41,56,60,63,68],"beats":2.0},{"notes":[46,56,58,62,66],"beats":2.0},{"notes":[39,54,58,61,65],"beats":2.0},{"notes":[44,54,58,60,65],"beats":2.0},{"notes":[37,53,56,58,63],"beats":4.0},{"notes":[38,54,57,60,64],"beats":4.0}]},{"title":"06 - Db Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[42,54,56,61,65],"beats":8.0},{"notes":[37,53,61,63,68],"beats":4.0},{"notes":[44,53,59,65,68],"beats":2.0},{"notes":[46,56,61,62,66],"beats":2.0},{"notes":[39,54,58,61,66],"beats":6.0},{"notes":[44,54,58,60,65],"beats":2.0},{"notes":[37,53,56,60,65],"beats":4.0},{"notes":[44,54,58,59,63],"beats":2.0},{"notes":[37,53,57,59,63],"beats":2.0}]},{"title":"Bonus - Major Prog 02 (IVmaj7-V6-Imaj7-IVmaj9)","steps":[{"notes":[42,54,58,61,65],"beats":4.0},{"notes":[44,56,60,63,65],"beats":4.0},{"notes":[41,56,60,61,65],"beats":4.0},{"notes":[42,56,58,61,65],"beats":4.0}]}],"10_5":[{"title":"01 - Bb Minor - Basic (i-VI-VII-v)","steps":[{"notes":[46,58,61,65],"beats":4.0},{"notes":[42,58,61,66],"beats":4.0},{"notes":[44,56,60,63],"beats":4.0},{"notes":[41,56,60,65],"beats":4.0}]},{"title":"02 - Bb Minor - Basic (VI-V-isus-i)","steps":[{"notes":[42,58,61,66],"beats":4.0},{"notes":[41,57,60,65],"beats":4.0},{"notes":[46,58,60,65],"beats":4.0},{"notes":[46,58,61,65],"beats":4.0}]},{"title":"03 - Bb Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[39,54,61,65,70],"beats":4.0},{"notes":[42,54,61,65,68],"beats":4.0},{"notes":[44,56,58,63,68],"beats":4.0},{"notes":[46,53,61,63,68],"beats":4.0}]},{"title":"04 - Bb Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[46,53,60,61,68],"beats":4.0},{"notes":[42,54,58,61,65],"beats":4.0},{"notes":[37,53,56,61,63],"beats":4.0},{"notes":[44,51,56,60,65],"beats":4.0}]},{"title":"05 - Bb Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[46,60,61,65,68],"beats":4.0},{"notes":[47,58,61,63,66],"beats":4.0},{"notes":[41,60,63,65,69],"beats":4.0},{"notes":[42,58,61,65,68],"beats":4.0},{"notes":[39,54,61,65,70],"beats":4.0},{"notes":[47,54,61,63,70],"beats":4.0},{"notes":[48,54,60,63,70],"beats":4.0},{"notes":[41,57,61,63,69],"beats":4.0}]},{"title":"06 - Bb Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[39,54,58,61,65],"beats":4.0},{"notes":[41,57,60,63,66],"beats":4.0},{"notes":[46,56,60,63,65],"beats":4.0},{"notes":[42,56,58,61,65],"beats":4.0},{"notes":[39,54,58,61,63],"beats":4.0},{"notes":[47,54,58,59,63],"beats":4.0},{"notes":[46,53,57,58,62],"beats":4.0},{"notes":[46,53,56,58,61],"beats":4.0}]},{"title":"Bonus - Minor Prog 02 (im7-I7-ivm7-#viidim7)","steps":[{"notes":[46,58,61,65,68],"beats":4.0},{"notes":[44,58,62,65,68],"beats":4.0},{"notes":[42,58,61,63,66],"beats":4.0},{"notes":[45,57,60,63,66],"beats":4.0}]}],"2_0":[{"title":"01 - D Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[38,57,62,66],"beats":4.0},{"notes":[45,57,61,66],"beats":4.0},{"notes":[47,59,62,66],"beats":4.0},{"notes":[43,59,62,64],"beats":4.0}]},{"title":"02 - D Major - Basic (IV-I-vim7-V)","steps":[{"notes":[43,55,59,62,67],"beats":5.0},{"notes":[38,54,57,62,66],"beats":3.0},{"notes":[35,54,59,62,69],"beats":5.0},{"notes":[45,57,61,64,69],"beats":3.0}]},{"title":"03 - D Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[38,54,57,62,64],"beats":4.0},{"notes":[46,53,57,62,65],"beats":4.0},{"notes":[48,55,60,62,64],"beats":4.0},{"notes":[43,57,59,62,67],"beats":4.0}]},{"title":"04 - D Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[38,57,61,62,66],"beats":4.0},{"notes":[47,57,59,62,66],"beats":4.0},{"notes":[43,57,59,62,66],"beats":4.0},{"notes":[46,57,58,62,65],"beats":4.0}]},{"title":"05 - D Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[38,54,61,64,69],"beats":4.0},{"notes":[38,54,60,64,69],"beats":4.0},{"notes":[43,55,59,64,69],"beats":4.0},{"notes":[43,55,58,64,69],"beats":4.0},{"notes":[42,57,61,64,69],"beats":2.0},{"notes":[47,57,59,63,67],"beats":2.0},{"notes":[40,55,59,62,66],"beats":2.0},{"notes":[45,55,59,61,66],"beats":2.0},{"notes":[38,54,57,59,64],"beats":4.0},{"notes":[39,55,58,61,65],"beats":4.0}]},{"title":"06 - D Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[43,55,57,62,66],"beats":8.0},{"notes":[38,54,62,64,69],"beats":4.0},{"notes":[45,54,60,66,69],"beats":2.0},{"notes":[35,57,62,63,67],"beats":2.0},{"notes":[40,55,59,62,67],"beats":6.0},{"notes":[45,55,59,61,66],"beats":2.0},{"notes":[38,54,57,61,66],"beats":4.0},{"notes":[45,55,59,60,64],"beats":2.0},{"notes":[38,54,58,60,64],"beats":2.0}]},{"title":"Bonus - Major Prog 03 (iim9-V9-Imaj9-vm7-I7alt-IVmaj9-III7-vim7-biidim7)","steps":[{"notes":[40,55,59,62,66],"beats":4.0},{"notes":[45,55,59,61,64],"beats":4.0},{"notes":[38,54,57,61,64],"beats":2.0},{"notes":[38,57,61,64,66],"beats":2.0},{"notes":[45,57,60,64,67],"beats":2.0},{"notes":[38,57,60,63,66],"beats":2.0},{"notes":[43,57,59,62,66],"beats":4.0},{"notes":[42,58,61,64,66],"beats":4.0},{"notes":[35,57,59,62,66],"beats":4.0},{"notes":[39,57,60,63,66],"beats":4.0}]}],"11_5":[{"title":"01 - B Minor - Basic (i-VI-VII-v)","steps":[{"notes":[35,54,59,62],"beats":4.0},{"notes":[43,55,59,62],"beats":4.0},{"notes":[45,52,57,61],"beats":4.0},{"notes":[42,54,57,61],"beats":4.0}]},{"title":"02 - B Minor - Basic (VI-V-isus-i)","steps":[{"notes":[43,59,62,67],"beats":4.0},{"notes":[42,58,61,66],"beats":4.0},{"notes":[35,59,61,66],"beats":4.0},{"notes":[35,59,62,66],"beats":4.0}]},{"title":"03 - B Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[40,55,59,62,66],"beats":4.0},{"notes":[43,55,57,62,66],"beats":4.0},{"notes":[45,52,57,59,64],"beats":4.0},{"notes":[35,54,57,62,64],"beats":4.0}]},{"title":"04 - B Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[35,57,61,62,66],"beats":4.0},{"notes":[43,55,59,62,66],"beats":4.0},{"notes":[38,54,57,62,64],"beats":4.0},{"notes":[45,52,57,61,66],"beats":4.0}]},{"title":"05 - B Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[35,54,57,61,62],"beats":4.0},{"notes":[36,52,55,59,62],"beats":4.0},{"notes":[42,52,54,58,61],"beats":4.0},{"notes":[43,54,57,59,62],"beats":4.0},{"notes":[40,54,55,59,62],"beats":4.0},{"notes":[36,52,55,59,62],"beats":4.0},{"notes":[37,52,55,59,61],"beats":4.0},{"notes":[42,52,54,58,62],"beats":4.0}]},{"title":"06 - B Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[40,55,59,62,66],"beats":4.0},{"notes":[42,58,61,64,67],"beats":4.0},{"notes":[35,57,61,64,66],"beats":4.0},{"notes":[43,57,59,62,66],"beats":4.0},{"notes":[40,55,59,62,64],"beats":4.0},{"notes":[36,55,59,60,64],"beats":4.0},{"notes":[35,54,58,59,63],"beats":4.0},{"notes":[35,54,57,59,62],"beats":4.0}]},{"title":"Bonus - Minor Prog 03 (im9-ivmadd9-VII6-IIImaj7-VImaj7-iim7b5-Vsus-Valt)","steps":[{"notes":[35,54,61,62,69],"beats":4.0},{"notes":[40,55,59,64,66],"beats":4.0},{"notes":[45,52,57,61,66],"beats":4.0},{"notes":[38,54,57,61,66],"beats":4.0},{"notes":[43,50,55,59,66],"beats":4.0},{"notes":[37,52,55,61,64],"beats":4.0},{"notes":[42,52,59,61,66],"beats":4.0},{"notes":[42,52,58,61,67],"beats":4.0}]}],"3_0":[{"title":"01 - Eb Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[39,55,58,63],"beats":4.0},{"notes":[34,55,58,62],"beats":4.0},{"notes":[36,55,60,63],"beats":4.0},{"notes":[44,53,60,63],"beats":4.0}]},{"title":"02 - Eb Major - Basic (IV-I-vim7-V)","steps":[{"notes":[44,51,56,60,63],"beats":5.0},{"notes":[39,51,55,58,63],"beats":3.0},{"notes":[36,48,55,58,63],"beats":5.0},{"notes":[34,53,58,62,65],"beats":3.0}]},{"title":"03 - Eb Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[39,55,58,63,65],"beats":4.0},{"notes":[35,54,58,63,66],"beats":4.0},{"notes":[37,53,56,61,63],"beats":4.0},{"notes":[44,51,58,60,63],"beats":4.0}]},{"title":"04 - Eb Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[39,58,62,63,67],"beats":4.0},{"notes":[36,58,60,63,67],"beats":4.0},{"notes":[44,58,60,63,67],"beats":4.0},{"notes":[35,58,59,63,66],"beats":4.0}]},{"title":"05 - Eb Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[39,55,58,62,65],"beats":4.0},{"notes":[39,55,58,61,65],"beats":4.0},{"notes":[44,51,58,60,65],"beats":4.0},{"notes":[44,51,58,59,65],"beats":4.0},{"notes":[43,55,58,62,65],"beats":2.0},{"notes":[36,56,58,60,64],"beats":2.0},{"notes":[41,55,56,60,63],"beats":2.0},{"notes":[34,55,56,60,62],"beats":2.0},{"notes":[39,55,58,60,65],"beats":4.0},{"notes":[40,56,59,62,66],"beats":4.0}]},{"title":"06 - Eb Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[44,56,58,63,67],"beats":8.0},{"notes":[39,55,58,63,65],"beats":4.0},{"notes":[46,55,58,61,67],"beats":2.0},{"notes":[36,52,58,63,68],"beats":2.0},{"notes":[41,56,60,63,68],"beats":6.0},{"notes":[46,56,60,62,67],"beats":2.0},{"notes":[39,55,58,62,67],"beats":4.0},{"notes":[46,56,60,61,65],"beats":2.0},{"notes":[39,55,59,61,65],"beats":2.0}]},{"title":"Bonus - Major Prog 04 (Iadd9-III7-IVadd9-I-IVadd9-vim7-Vadd9)","steps":[{"notes":[39,51,55,58,65],"beats":2.0},{"notes":[43,53,55,59,62],"beats":2.0},{"notes":[44,51,58,60],"beats":2.0},{"notes":[43,51,55,58,63],"beats":2.0},{"notes":[44,51,58,60],"beats":2.0},{"notes":[36,48,55,58,63],"beats":2.0},{"notes":[46,53,60,62],"beats":4.0}]}],"0_5":[{"title":"01 - C Minor - Basic (i-VI-VII-v)","steps":[{"notes":[36,55,60,63],"beats":4.0},{"notes":[44,56,60,63],"beats":4.0},{"notes":[46,53,58,62],"beats":4.0},{"notes":[43,55,58,62],"beats":4.0}]},{"title":"02 - C Minor - Basic (VI-V-isus-i)","steps":[{"notes":[44,60,63,68],"beats":4.0},{"notes":[43,59,62,67],"beats":4.0},{"notes":[36,60,62,67],"beats":4.0},{"notes":[36,60,63,67],"beats":4.0}]},{"title":"03 - C Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[41,56,60,63,67],"beats":4.0},{"notes":[44,56,58,63,67],"beats":4.0},{"notes":[46,53,58,60,65],"beats":4.0},{"notes":[36,55,58,63,65],"beats":4.0}]},{"title":"04 - C Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[36,58,62,63,67],"beats":4.0},{"notes":[44,56,60,63,67],"beats":4.0},{"notes":[39,55,58,63,65],"beats":4.0},{"notes":[46,53,58,62,67],"beats":4.0}]},{"title":"05 - C Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[36,55,58,62,63],"beats":4.0},{"notes":[37,53,56,60,63],"beats":4.0},{"notes":[43,53,55,59,62],"beats":4.0},{"notes":[44,55,58,60,63],"beats":4.0},{"notes":[41,55,56,60,63],"beats":4.0},{"notes":[37,53,56,60,63],"beats":4.0},{"notes":[38,53,56,60,62],"beats":4.0},{"notes":[43,53,55,59,63],"beats":4.0}]},{"title":"06 - C Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[41,56,60,63,67],"beats":4.0},{"notes":[43,59,62,65,68],"beats":4.0},{"notes":[36,58,62,65,67],"beats":4.0},{"notes":[44,58,60,63,67],"beats":4.0},{"notes":[41,56,60,63,65],"beats":4.0},{"notes":[37,56,60,61,65],"beats":4.0},{"notes":[36,55,59,60,64],"beats":4.0},{"notes":[36,55,58,60,63],"beats":4.0}]},{"title":"Bonus - Minor Prog 04 (im9-IV13sus-IV13-iim7-V11-V9)","steps":[{"notes":[36,58,62,63,67],"beats":4.0},{"notes":[41,58,62,63,67],"beats":2.0},{"notes":[41,57,62,63,67],"beats":2.0},{"notes":[38,57,60,62,65],"beats":4.0},{"notes":[43,57,60,62,65],"beats":2.0},{"notes":[43,57,59,62,65],"beats":2.0}]}],"4_0":[{"title":"01 - E Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[40,56,59,64],"beats":4.0},{"notes":[35,56,59,63],"beats":4.0},{"notes":[37,56,61,64],"beats":4.0},{"notes":[45,54,61,64],"beats":4.0}]},{"title":"02 - E Major - Basic (IV-I-vim7-V)","steps":[{"notes":[45,52,57,61,64],"beats":5.0},{"notes":[40,52,56,59,64],"beats":3.0},{"notes":[37,49,56,59,64],"beats":5.0},{"notes":[35,54,59,63,66],"beats":3.0}]},{"title":"03 - E Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[40,56,59,64,66],"beats":4.0},{"notes":[36,55,59,64,67],"beats":4.0},{"notes":[38,54,57,62,64],"beats":4.0},{"notes":[45,52,59,61,64],"beats":4.0}]},{"title":"04 - E Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[40,56,59,63,64],"beats":4.0},{"notes":[37,56,59,61,64],"beats":4.0},{"notes":[45,56,59,61,64],"beats":4.0},{"notes":[36,55,59,60,64],"beats":4.0}]},{"title":"05 - E Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[40,56,59,63,66],"beats":4.0},{"notes":[40,56,59,62,66],"beats":4.0},{"notes":[45,52,59,61,66],"beats":4.0},{"notes":[45,52,59,60,66],"beats":4.0},{"notes":[44,56,59,63,66],"beats":2.0},{"notes":[37,57,59,61,65],"beats":2.0},{"notes":[42,56,57,61,64],"beats":2.0},{"notes":[35,56,57,61,63],"beats":2.0},{"notes":[40,56,59,61,66],"beats":4.0},{"notes":[41,57,60,63,67],"beats":4.0}]},{"title":"06 - E Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[45,57,59,64,68],"beats":8.0},{"notes":[40,56,59,64,66],"beats":4.0},{"notes":[35,56,59,62,68],"beats":2.0},{"notes":[37,53,59,64,69],"beats":2.0},{"notes":[42,57,61,64,69],"beats":6.0},{"notes":[35,57,61,63,68],"beats":2.0},{"notes":[40,56,59,63,68],"beats":4.0},{"notes":[35,57,61,62,66],"beats":2.0},{"notes":[40,56,60,62,66],"beats":2.0}]},{"title":"Bonus - Major Prog 05 (Iadd9-Vadd11-vim7-IVmaj7-Vadd9)","steps":[{"notes":[40,56,59,66],"beats":4.0},{"notes":[35,54,59,63,64],"beats":4.0},{"notes":[37,56,59,64],"beats":4.0},{"notes":[45,56,61,64],"beats":2.0},{"notes":[47,54,61,63],"beats":2.0}]}],"1_5":[{"title":"01 - C# Minor - Basic (i-VI-VII-v)","steps":[{"notes":[37,56,61,64],"beats":4.0},{"notes":[45,57,61,64],"beats":4.0},{"notes":[47,54,59,63],"beats":4.0},{"notes":[44,56,59,63],"beats":4.0}]},{"title":"02 - C# Minor - Basic (VI-V-isus-i)","steps":[{"notes":[45,61,64,69],"beats":4.0},{"notes":[44,60,63,68],"beats":4.0},{"notes":[37,61,63,68],"beats":4.0},{"notes":[37,61,64,68],"beats":4.0}]},{"title":"03 - C# Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[42,57,61,64,68],"beats":4.0},{"notes":[45,57,59,64,68],"beats":4.0},{"notes":[47,54,59,61,66],"beats":4.0},{"notes":[37,56,59,64,66],"beats":4.0}]},{"title":"04 - C# Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[37,59,63,64,68],"beats":4.0},{"notes":[45,57,61,64,68],"beats":4.0},{"notes":[40,56,59,64,66],"beats":4.0},{"notes":[35,54,59,63,68],"beats":4.0}]},{"title":"05 - C# Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[37,56,59,63,64],"beats":4.0},{"notes":[38,54,57,61,64],"beats":4.0},{"notes":[44,54,56,60,63],"beats":4.0},{"notes":[45,56,59,61,64],"beats":4.0},{"notes":[42,56,57,61,64],"beats":4.0},{"notes":[38,54,57,61,64],"beats":4.0},{"notes":[39,54,57,61,63],"beats":4.0},{"notes":[44,54,56,60,64],"beats":4.0}]},{"title":"06 - C# Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[42,56,57,61,64],"beats":4.0},{"notes":[44,54,57,60,63],"beats":4.0},{"notes":[37,54,56,59,63],"beats":4.0},{"notes":[45,52,56,59,61],"beats":4.0},{"notes":[42,52,54,57,61],"beats":4.0},{"notes":[38,50,54,57,61],"beats":4.0},{"notes":[37,53,56,60,61],"beats":4.0},{"notes":[37,52,56,59,61],"beats":4.0}]},{"title":"Bonus - Minor Prog 05 (vm7-IIImaj7-im9-VI6-vm7-im9)","steps":[{"notes":[44,56,59,63,66],"beats":1.5},{"notes":[40,52,56,59,63],"beats":2.0},{"notes":[37,52,56,59,63],"beats":4.5},{"notes":[45,52,54,57,61],"beats":1.5},{"notes":[44,51,54,59,63],"beats":2.0},{"notes":[37,52,56,59,63],"beats":4.5}]}],"5_0":[{"title":"01 - F Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[41,57,60,65],"beats":4.0},{"notes":[36,57,60,64],"beats":4.0},{"notes":[38,57,62,65],"beats":4.0},{"notes":[46,55,62,65],"beats":4.0}]},{"title":"02 - F Major - Basic (IV-I-vim7-V)","steps":[{"notes":[46,53,58,62,65],"beats":5.0},{"notes":[41,53,57,60,65],"beats":3.0},{"notes":[38,50,57,60,65],"beats":5.0},{"notes":[36,55,60,64,67],"beats":3.0}]},{"title":"03 - F Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[41,57,60,65,67],"beats":4.0},{"notes":[37,56,60,65,68],"beats":4.0},{"notes":[39,55,58,63,65],"beats":4.0},{"notes":[46,53,60,62,65],"beats":4.0}]},{"title":"04 - F Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[41,57,60,64,65],"beats":4.0},{"notes":[38,57,60,62,65],"beats":4.0},{"notes":[46,57,60,62,65],"beats":4.0},{"notes":[37,56,60,61,65],"beats":4.0}]},{"title":"05 - F Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[41,57,60,64,67],"beats":4.0},{"notes":[41,57,60,63,67],"beats":4.0},{"notes":[46,53,60,62,67],"beats":4.0},{"notes":[46,53,60,61,67],"beats":4.0},{"notes":[45,57,60,64,67],"beats":2.0},{"notes":[38,58,60,62,66],"beats":2.0},{"notes":[43,57,58,62,65],"beats":2.0},{"notes":[36,57,58,62,64],"beats":2.0},{"notes":[41,57,60,62,67],"beats":4.0},{"notes":[42,58,61,64,68],"beats":4.0}]},{"title":"06 - F Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[46,57,58,60,65],"beats":8.0},{"notes":[41,55,57,60,65],"beats":4.0},{"notes":[36,55,57,60,63],"beats":2.0},{"notes":[38,54,58,60,65],"beats":2.0},{"notes":[43,55,58,62,65],"beats":6.0},{"notes":[36,57,58,62,64],"beats":2.0},{"notes":[41,53,57,60,64],"beats":4.0},{"notes":[36,55,58,62,63],"beats":2.0},{"notes":[41,55,57,61,63],"beats":2.0}]},{"title":"Bonus - Major Prog 06 (IVmaj7-Imaj9-V6-vim7-Vadd11)","steps":[{"notes":[46,53,57,58,62],"beats":4.0},{"notes":[41,55,57,60,64],"beats":2.0},{"notes":[36,55,57,60,64],"beats":2.0},{"notes":[38,53,57,60,65],"beats":4.0},{"notes":[36,55,60,64,65],"beats":4.0}]}],"2_5":[{"title":"01 - D Minor - Basic (i-VI-VII-v)","steps":[{"notes":[38,57,62,65],"beats":4.0},{"notes":[46,58,62,65],"beats":4.0},{"notes":[48,55,60,64],"beats":4.0},{"notes":[45,57,60,64],"beats":4.0}]},{"title":"02 - D Minor - Basic (VI-V-isus-i)","steps":[{"notes":[46,58,62,65],"beats":4.0},{"notes":[45,57,61,64],"beats":4.0},{"notes":[38,57,62,64],"beats":4.0},{"notes":[38,57,62,65],"beats":4.0}]},{"title":"03 - D Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[43,58,62,65,69],"beats":4.0},{"notes":[46,58,60,65,69],"beats":4.0},{"notes":[48,55,60,62,67],"beats":4.0},{"notes":[38,57,60,65,67],"beats":4.0}]},{"title":"04 - D Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[38,60,64,65,69],"beats":4.0},{"notes":[46,58,62,65,69],"beats":4.0},{"notes":[41,57,60,65,67],"beats":4.0},{"notes":[36,55,60,64,69],"beats":4.0}]},{"title":"05 - D Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[38,57,60,64,65],"beats":4.0},{"notes":[39,55,58,62,65],"beats":4.0},{"notes":[45,55,57,61,64],"beats":4.0},{"notes":[46,57,60,62,65],"beats":4.0},{"notes":[43,57,58,62,65],"beats":4.0},{"notes":[39,55,58,62,65],"beats":4.0},{"notes":[40,55,58,62,64],"beats":4.0},{"notes":[45,55,57,61,65],"beats":4.0}]},{"title":"06 - D Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[43,57,58,62,65],"beats":4.0},{"notes":[45,55,58,61,64],"beats":4.0},{"notes":[38,55,57,60,64],"beats":4.0},{"notes":[46,53,57,60,62],"beats":4.0},{"notes":[43,53,55,58,62],"beats":4.0},{"notes":[39,51,55,58,62],"beats":4.0},{"notes":[38,54,57,61,62],"beats":4.0},{"notes":[38,53,57,60,62],"beats":4.0}]},{"title":"Bonus - Minor Prog 06 (im7add11-IV9#11-VIIb5b13-iiim9-VI13-bII9#11)","steps":[{"notes":[38,57,60,65,67],"beats":4.0},{"notes":[43,59,61,65,69],"beats":2.0},{"notes":[42,58,62,64,68],"beats":2.0},{"notes":[41,56,60,63,67],"beats":4.0},{"notes":[46,56,60,62,67],"beats":2.0},{"notes":[39,55,60,61,65,69],"beats":2.0}]}],"6_0":[{"title":"01 - Gb Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[42,58,61,66],"beats":4.0},{"notes":[37,58,61,65],"beats":4.0},{"notes":[39,58,63,66],"beats":4.0},{"notes":[47,56,63,66],"beats":4.0}]},{"title":"02 - Gb Major - Basic (IV-I-vim7-V)","steps":[{"notes":[35,54,59,63,66],"beats":5.0},{"notes":[42,54,58,61,66],"beats":3.0},{"notes":[39,51,58,61,66],"beats":5.0},{"notes":[37,56,61,65,68],"beats":3.0}]},{"title":"03 - Gb Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[42,58,61,66,68],"beats":4.0},{"notes":[38,57,61,66,69],"beats":4.0},{"notes":[40,56,59,64,66],"beats":4.0},{"notes":[47,54,61,63,66],"beats":4.0}]},{"title":"04 - Gb Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[42,58,61,65,66],"beats":4.0},{"notes":[39,58,61,63,66],"beats":4.0},{"notes":[35,58,61,63,66],"beats":4.0},{"notes":[38,57,61,62,66],"beats":4.0}]},{"title":"05 - Gb Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[42,58,61,65,68],"beats":4.0},{"notes":[42,58,61,64,68],"beats":4.0},{"notes":[47,54,61,63,68],"beats":4.0},{"notes":[47,54,61,62,68],"beats":4.0},{"notes":[46,58,61,65,68],"beats":2.0},{"notes":[39,59,61,63,67],"beats":2.0},{"notes":[44,58,59,63,66],"beats":2.0},{"notes":[37,58,59,63,65],"beats":2.0},{"notes":[42,58,61,63,68],"beats":4.0},{"notes":[43,59,62,65,69],"beats":4.0}]},{"title":"06 - Gb Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[35,58,59,61,66],"beats":8.0},{"notes":[42,56,58,61,66],"beats":4.0},{"notes":[37,56,58,61,64],"beats":2.0},{"notes":[39,55,59,61,66],"beats":2.0},{"notes":[44,56,59,63,66],"beats":6.0},{"notes":[37,58,59,63,65],"beats":2.0},{"notes":[42,54,58,61,65],"beats":4.0},{"notes":[37,56,59,63,64],"beats":2.0},{"notes":[42,56,58,62,64],"beats":2.0}]},{"title":"Bonus - Major Prog 07 (Imaj9-bIIImaj9-bVImaj9-bIImaj9)","steps":[{"notes":[42,58,61,65,68],"beats":4.0},{"notes":[45,59,61,64,68],"beats":4.0},{"notes":[38,61,64,66,69],"beats":4.0},{"notes":[43,59,62,66,69],"beats":4.0}]}],"3_5":[{"title":"01 - Eb Minor - Basic (i-VI-VII-v)","steps":[{"notes":[39,54,58,63],"beats":4.0},{"notes":[35,54,59,63],"beats":4.0},{"notes":[37,53,56,61],"beats":4.0},{"notes":[34,53,58,61],"beats":4.0}]},{"title":"02 - Eb Minor - Basic (VI-V-isus-i)","steps":[{"notes":[47,59,63,66],"beats":4.0},{"notes":[46,58,62,65],"beats":4.0},{"notes":[39,58,63,65],"beats":4.0},{"notes":[39,58,63,66],"beats":4.0}]},{"title":"03 - Eb Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[44,58,59,63,66],"beats":4.0},{"notes":[35,58,59,61,66],"beats":4.0},{"notes":[37,56,61,63,68],"beats":4.0},{"notes":[39,56,58,61,66],"beats":4.0}]},{"title":"04 - Eb Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[39,58,61,65,66],"beats":4.0},{"notes":[47,58,59,63,66],"beats":4.0},{"notes":[42,56,58,61,66],"beats":4.0},{"notes":[37,56,58,61,65],"beats":4.0}]},{"title":"05 - Eb Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[39,54,58,61,65],"beats":4.0},{"notes":[40,54,56,59,63],"beats":4.0},{"notes":[34,53,56,62,65],"beats":4.0},{"notes":[35,51,58,61,66],"beats":4.0},{"notes":[44,54,58,59,63],"beats":4.0},{"notes":[40,54,56,59,63],"beats":4.0},{"notes":[41,53,56,59,63],"beats":4.0},{"notes":[34,56,58,62,66],"beats":4.0}]},{"title":"06 - Eb Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[44,58,59,63,66],"beats":4.0},{"notes":[46,56,59,62,65],"beats":4.0},{"notes":[39,56,58,61,65],"beats":4.0},{"notes":[35,54,58,61,63],"beats":4.0},{"notes":[44,54,56,59,63],"beats":4.0},{"notes":[40,52,56,59,63],"beats":4.0},{"notes":[39,55,58,62,63],"beats":4.0},{"notes":[39,54,58,61,63],"beats":4.0}]},{"title":"Bonus - Minor Prog 07 (im9-ivm9-VImaj7-vm7)","steps":[{"notes":[39,51,54,58,61,65],"beats":4.0},{"notes":[44,51,58,59,63,66],"beats":4.0},{"notes":[35,51,54,58,63,66],"beats":4.0},{"notes":[34,53,56,58,61,65],"beats":4.0}]}],"7_0":[{"title":"01 - G Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[43,55,59,62],"beats":4.0},{"notes":[38,54,59,62],"beats":4.0},{"notes":[40,55,59,64],"beats":4.0},{"notes":[36,55,57,64],"beats":4.0}]},{"title":"02 - G Major - Basic (IV-I-vim7-V)","steps":[{"notes":[36,55,60,64,67],"beats":5.0},{"notes":[43,55,59,62,67],"beats":3.0},{"notes":[40,52,59,62,67],"beats":5.0},{"notes":[38,54,57,62,66],"beats":3.0}]},{"title":"03 - G Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[43,50,57,59,62],"beats":4.0},{"notes":[39,51,55,58,62],"beats":4.0},{"notes":[41,53,55,57,60],"beats":4.0},{"notes":[36,52,55,60,62],"beats":4.0}]},{"title":"04 - G Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[43,59,62,66,67],"beats":4.0},{"notes":[40,59,62,64,67],"beats":4.0},{"notes":[36,59,62,64,67],"beats":4.0},{"notes":[39,58,62,63,67],"beats":4.0}]},{"title":"05 - G Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[43,50,57,59,66],"beats":4.0},{"notes":[43,50,57,59,65],"beats":4.0},{"notes":[36,52,57,62,67],"beats":4.0},{"notes":[36,51,57,62,67],"beats":4.0},{"notes":[35,50,57,59,66],"beats":2.0},{"notes":[40,50,56,60,67],"beats":2.0},{"notes":[45,52,59,60,67],"beats":2.0},{"notes":[38,54,59,60,64],"beats":2.0},{"notes":[43,52,57,59,62],"beats":4.0},{"notes":[44,51,58,60,66],"beats":4.0}]},{"title":"06 - G Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[36,59,60,62,67],"beats":8.0},{"notes":[43,57,59,62,67],"beats":4.0},{"notes":[38,57,59,62,65],"beats":2.0},{"notes":[40,56,60,62,67],"beats":2.0},{"notes":[45,57,60,64,67],"beats":6.0},{"notes":[38,59,60,64,66],"beats":2.0},{"notes":[43,55,59,62,66],"beats":4.0},{"notes":[38,57,60,64,65],"beats":2.0},{"notes":[43,57,59,63,65],"beats":2.0}]},{"title":"Bonus - Major Prog 08 (Imaj9-bVImaj9-VIImaj9-bVmaj9)","steps":[{"notes":[43,57,59,62,66],"beats":4.0},{"notes":[39,55,58,62,65],"beats":4.0},{"notes":[42,56,58,61,65],"beats":4.0},{"notes":[38,54,57,61,64],"beats":4.0}]}],"4_5":[{"title":"01 - E Minor - Basic (i-VI-VII-v)","steps":[{"notes":[40,55,59,64],"beats":4.0},{"notes":[36,55,60,64],"beats":4.0},{"notes":[38,54,57,62],"beats":4.0},{"notes":[35,54,59,62],"beats":4.0}]},{"title":"02 - E Minor - Basic (VI-V-isus-i)","steps":[{"notes":[48,60,64,67],"beats":4.0},{"notes":[47,59,63,66],"beats":4.0},{"notes":[40,59,64,66],"beats":4.0},{"notes":[40,59,64,67],"beats":4.0}]},{"title":"03 - E Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[45,59,60,64,67],"beats":4.0},{"notes":[36,59,60,62,67],"beats":4.0},{"notes":[38,57,62,64,69],"beats":4.0},{"notes":[40,57,59,62,67],"beats":4.0}]},{"title":"04 - E Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[40,55,59,62,66],"beats":4.0},{"notes":[36,55,59,60,64],"beats":4.0},{"notes":[43,57,59,62,67],"beats":4.0},{"notes":[38,57,59,62,66],"beats":4.0}]},{"title":"05 - E Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[40,55,59,62,66],"beats":4.0},{"notes":[41,55,57,60,64],"beats":4.0},{"notes":[35,54,57,63,66],"beats":4.0},{"notes":[36,52,59,62,67],"beats":4.0},{"notes":[45,55,59,60,64],"beats":4.0},{"notes":[41,55,57,60,64],"beats":4.0},{"notes":[42,54,57,60,64],"beats":4.0},{"notes":[35,57,59,63,67],"beats":4.0}]},{"title":"06 - E Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[45,55,59,60,64],"beats":4.0},{"notes":[35,54,57,60,63],"beats":4.0},{"notes":[40,54,57,59,62],"beats":4.0},{"notes":[36,52,55,59,62],"beats":4.0},{"notes":[45,52,55,57,60],"beats":4.0},{"notes":[41,52,53,57,60],"beats":4.0},{"notes":[40,52,56,59,63],"beats":4.0},{"notes":[40,52,55,59,62],"beats":4.0}]},{"title":"Bonus - Minor Prog 08 (im7-VImaj7-vm7-VIIadd11)","steps":[{"notes":[40,52,55,59,62],"beats":4.0},{"notes":[36,52,55,59,64],"beats":4.0},{"notes":[35,47,54,57,62],"beats":4.0},{"notes":[38,50,54,55,62],"beats":4.0}]}],"8_0":[{"title":"01 - Ab Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[44,56,60,63],"beats":4.0},{"notes":[39,55,60,63],"beats":4.0},{"notes":[41,56,60,65],"beats":4.0},{"notes":[37,56,58,65],"beats":4.0}]},{"title":"02 - Ab Major - Basic (IV-I-vim7-V)","steps":[{"notes":[37,56,61,65,68],"beats":5.0},{"notes":[44,56,60,63,68],"beats":3.0},{"notes":[41,53,60,63,68],"beats":5.0},{"notes":[39,55,58,63,67],"beats":3.0}]},{"title":"03 - Ab Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[44,51,58,60,63],"beats":4.0},{"notes":[40,52,56,59,63],"beats":4.0},{"notes":[42,54,56,58,61],"beats":4.0},{"notes":[37,53,56,61,63],"beats":4.0}]},{"title":"04 - Ab Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[44,56,60,63,67],"beats":4.0},{"notes":[41,56,60,63,65],"beats":4.0},{"notes":[37,56,60,63,65],"beats":4.0},{"notes":[40,52,59,63,68],"beats":4.0}]},{"title":"05 - Ab Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[44,51,58,60,67],"beats":4.0},{"notes":[44,51,58,60,66],"beats":4.0},{"notes":[37,53,58,63,68],"beats":4.0},{"notes":[37,52,58,63,68],"beats":4.0},{"notes":[36,51,58,60,67],"beats":2.0},{"notes":[41,51,57,61,68],"beats":2.0},{"notes":[46,53,60,61,68],"beats":2.0},{"notes":[39,55,60,61,65],"beats":2.0},{"notes":[44,53,58,60,63],"beats":4.0},{"notes":[45,52,59,61,67],"beats":4.0}]},{"title":"06 - Ab Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[37,60,61,63,68],"beats":8.0},{"notes":[44,58,60,63,68],"beats":4.0},{"notes":[39,58,60,63,66],"beats":2.0},{"notes":[41,57,61,63,68],"beats":2.0},{"notes":[46,58,61,65,68],"beats":6.0},{"notes":[39,60,61,65,67],"beats":2.0},{"notes":[44,56,60,63,67],"beats":4.0},{"notes":[39,58,61,65,66],"beats":2.0},{"notes":[44,58,60,64,66],"beats":2.0}]},{"title":"Bonus - Major Prog 09 (iiim7-biiim7-iim7-V11-Iadd9-I6-Iadd9-I69)","steps":[{"notes":[48,55,58,63],"beats":3.0},{"notes":[47,54,57,62],"beats":1.0},{"notes":[46,53,56,61],"beats":2.0},{"notes":[39,53,56,61],"beats":2.0},{"notes":[44,58,60,63],"beats":2.0},{"notes":[44,56,60,65],"beats":2.0},{"notes":[44,58,60,63],"beats":2.0},{"notes":[44,58,60,65],"beats":2.0}]}],"5_5":[{"title":"01 - F Minor - Basic (i-VI-VII-v)","steps":[{"notes":[41,56,60,65],"beats":4.0},{"notes":[37,56,61,65],"beats":4.0},{"notes":[39,55,58,63],"beats":4.0},{"notes":[36,55,60,63],"beats":4.0}]},{"title":"02 - F Minor - Basic (VI-V-isus-i)","steps":[{"notes":[37,56,61,65],"beats":4.0},{"notes":[36,55,60,64],"beats":4.0},{"notes":[41,55,60,65],"beats":4.0},{"notes":[41,56,60,65],"beats":4.0}]},{"title":"03 - F Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[46,60,61,65,68],"beats":4.0},{"notes":[37,60,61,63,68],"beats":4.0},{"notes":[39,58,63,65,70],"beats":4.0},{"notes":[41,58,60,63,68],"beats":4.0}]},{"title":"04 - F Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[41,56,60,63,67],"beats":4.0},{"notes":[37,56,60,61,65],"beats":4.0},{"notes":[44,58,60,63,68],"beats":4.0},{"notes":[39,58,60,63,67],"beats":4.0}]},{"title":"05 - F Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[41,56,60,63,67],"beats":4.0},{"notes":[42,56,58,61,65],"beats":4.0},{"notes":[36,55,58,64,67],"beats":4.0},{"notes":[37,53,60,63,68],"beats":4.0},{"notes":[46,56,60,61,65],"beats":4.0},{"notes":[42,56,58,61,65],"beats":4.0},{"notes":[43,55,58,61,65],"beats":4.0},{"notes":[36,58,60,64,68],"beats":4.0}]},{"title":"06 - F Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[34,56,60,61,65],"beats":4.0},{"notes":[36,55,58,61,64],"beats":4.0},{"notes":[41,55,58,60,63],"beats":4.0},{"notes":[37,53,56,60,63],"beats":4.0},{"notes":[34,53,56,58,61],"beats":4.0},{"notes":[42,53,54,58,61],"beats":4.0},{"notes":[41,53,57,60,64],"beats":4.0},{"notes":[41,53,56,60,63],"beats":4.0}]},{"title":"Bonus - Minor Prog 09 (im7-VImaj7-IIImaj7-VII6)","steps":[{"notes":[41,53,60,63,68],"beats":4.0},{"notes":[37,56,60,65,68],"beats":4.0},{"notes":[44,56,60,63,67],"beats":4.0},{"notes":[39,58,60,63,67],"beats":4.0}]}],"9_0":[{"title":"01 - A Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[45,57,61,64],"beats":4.0},{"notes":[40,56,61,64],"beats":4.0},{"notes":[42,57,61,66],"beats":4.0},{"notes":[38,57,59,66],"beats":4.0}]},{"title":"02 - A Major - Basic (IV-I-vim7-V)","steps":[{"notes":[38,54,57,62,66],"beats":5.0},{"notes":[45,52,57,61,64],"beats":3.0},{"notes":[42,54,57,61,64],"beats":5.0},{"notes":[40,52,56,59,64],"beats":3.0}]},{"title":"03 - A Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[45,52,59,61,64],"beats":4.0},{"notes":[41,53,57,60,64],"beats":4.0},{"notes":[43,55,57,59,62],"beats":4.0},{"notes":[38,54,57,62,64],"beats":4.0}]},{"title":"04 - A Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[45,57,61,64,68],"beats":4.0},{"notes":[42,57,61,64,66],"beats":4.0},{"notes":[38,57,61,64,66],"beats":4.0},{"notes":[41,53,60,64,69],"beats":4.0}]},{"title":"05 - A Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[45,52,59,61,68],"beats":4.0},{"notes":[45,52,59,61,67],"beats":4.0},{"notes":[38,54,59,64,69],"beats":4.0},{"notes":[38,53,59,64,69],"beats":4.0},{"notes":[37,52,59,61,68],"beats":2.0},{"notes":[42,52,58,62,69],"beats":2.0},{"notes":[47,54,61,62,69],"beats":2.0},{"notes":[40,56,61,62,66],"beats":2.0},{"notes":[45,54,59,61,64],"beats":4.0},{"notes":[46,53,60,62,68],"beats":4.0}]},{"title":"06 - A Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[38,61,62,64,69],"beats":8.0},{"notes":[45,59,61,64,69],"beats":4.0},{"notes":[40,59,61,64,67],"beats":2.0},{"notes":[42,58,62,64,69],"beats":2.0},{"notes":[47,59,62,66,69],"beats":6.0},{"notes":[40,61,62,66,68],"beats":2.0},{"notes":[45,57,61,64,68],"beats":4.0},{"notes":[40,59,62,66,67],"beats":2.0},{"notes":[45,59,61,65,67],"beats":2.0}]},{"title":"Bonus - Major Prog 10 (Isus-iiim7-iim7-Isus-V7)","steps":[{"notes":[45,57,59,64],"beats":4.0},{"notes":[37,56,59,64],"beats":4.0},{"notes":[35,54,57,62],"beats":4.0},{"notes":[40,52,57,62],"beats":2.0},{"notes":[40,52,56,62],"beats":2.0}]}],"6_5":[{"title":"01 - F# Minor - Basic (i-VI-VII-v)","steps":[{"notes":[42,57,61,66],"beats":4.0},{"notes":[38,57,62,66],"beats":4.0},{"notes":[40,56,59,64],"beats":4.0},{"notes":[37,56,61,64],"beats":4.0}]},{"title":"02 - F# Minor - Basic (VI-V-isus-i)","steps":[{"notes":[38,57,62,66],"beats":4.0},{"notes":[37,56,61,65],"beats":4.0},{"notes":[42,56,61,66],"beats":4.0},{"notes":[42,57,61,66],"beats":4.0}]},{"title":"03 - F# Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[47,61,62,66,69],"beats":4.0},{"notes":[38,61,62,64,69],"beats":4.0},{"notes":[40,59,64,66,71],"beats":4.0},{"notes":[42,59,61,64,69],"beats":4.0}]},{"title":"04 - F# Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[42,56,57,61,64],"beats":4.0},{"notes":[38,57,61,62,66],"beats":4.0},{"notes":[45,57,59,61,64],"beats":4.0},{"notes":[40,56,59,61,64],"beats":4.0}]},{"title":"05 - F# Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[42,57,61,64,68],"beats":4.0},{"notes":[43,57,59,62,66],"beats":4.0},{"notes":[37,56,59,65,68],"beats":4.0},{"notes":[38,54,61,64,69],"beats":4.0},{"notes":[47,57,61,62,66],"beats":4.0},{"notes":[43,57,59,62,66],"beats":4.0},{"notes":[44,56,59,62,66],"beats":4.0},{"notes":[37,59,61,65,69],"beats":4.0}]},{"title":"06 - F# Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[35,57,61,62,66],"beats":4.0},{"notes":[37,56,59,62,65],"beats":4.0},{"notes":[42,56,59,61,64],"beats":4.0},{"notes":[38,54,57,61,64],"beats":4.0},{"notes":[35,54,57,59,62],"beats":4.0},{"notes":[43,54,55,59,62],"beats":4.0},{"notes":[42,54,58,61,65],"beats":4.0},{"notes":[42,54,57,61,64],"beats":4.0}]},{"title":"Bonus - Minor Prog 10 (VImaj7-IIImaj9-V7#5#9-im9)","steps":[{"notes":[38,50,57,61,66],"beats":4.0},{"notes":[45,52,59,61,68],"beats":4.0},{"notes":[37,53,59,61,64,69],"beats":4.0},{"notes":[42,57,61,64,68],"beats":4.0}]}],"10_0":[{"title":"01 - Bb Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[46,58,62,65],"beats":4.0},{"notes":[41,57,62,65],"beats":4.0},{"notes":[43,58,62,67],"beats":4.0},{"notes":[39,58,60,67],"beats":4.0}]},{"title":"02 - Bb Major - Basic (IV-I-vim7-V)","steps":[{"notes":[39,55,58,63,67],"beats":5.0},{"notes":[46,53,58,62,65],"beats":3.0},{"notes":[43,55,58,62,65],"beats":5.0},{"notes":[41,53,57,60,65],"beats":3.0}]},{"title":"03 - Bb Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[46,53,60,62,65],"beats":4.0},{"notes":[42,54,58,61,65],"beats":4.0},{"notes":[44,56,58,60,63],"beats":4.0},{"notes":[39,55,58,63,65],"beats":4.0}]},{"title":"04 - Bb Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[46,57,58,62,65],"beats":4.0},{"notes":[43,55,58,62,65],"beats":4.0},{"notes":[39,55,58,62,65],"beats":4.0},{"notes":[42,54,58,61,65],"beats":4.0}]},{"title":"05 - Bb Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[46,53,60,62,69],"beats":4.0},{"notes":[46,53,60,62,68],"beats":4.0},{"notes":[39,55,60,65,70],"beats":4.0},{"notes":[39,54,60,65,70],"beats":4.0},{"notes":[38,53,60,62,69],"beats":2.0},{"notes":[43,53,59,63,70],"beats":2.0},{"notes":[48,55,62,63,70],"beats":2.0},{"notes":[41,57,62,63,67],"beats":2.0},{"notes":[46,55,60,62,65],"beats":4.0},{"notes":[47,54,61,63,69],"beats":4.0}]},{"title":"06 - Bb Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[39,51,58,62,65],"beats":8.0},{"notes":[34,50,58,60,65],"beats":4.0},{"notes":[41,50,56,60,65],"beats":2.0},{"notes":[43,53,58,59,63],"beats":2.0},{"notes":[36,55,58,60,63],"beats":6.0},{"notes":[41,51,55,57,62],"beats":2.0},{"notes":[34,53,57,58,62],"beats":4.0},{"notes":[41,55,56,60,63],"beats":2.0},{"notes":[34,54,56,60,62],"beats":2.0}]},{"title":"Bonus - Major Prog 11 (I9-IV9-iim7-V11-V9)","steps":[{"notes":[46,56,60,62,65],"beats":4.0},{"notes":[39,55,58,61,65],"beats":4.0},{"notes":[48,55,58,60,63],"beats":4.0},{"notes":[41,58,60,63,67],"beats":2.0},{"notes":[41,57,60,63,67],"beats":2.0}]}],"7_5":[{"title":"01 - G Minor - Basic (i-VI-VII-v)","steps":[{"notes":[43,55,58,62],"beats":4.0},{"notes":[39,55,58,63],"beats":4.0},{"notes":[41,53,57,60],"beats":4.0},{"notes":[38,53,57,62],"beats":4.0}]},{"title":"02 - G Minor - Basic (VI-V-isus-i)","steps":[{"notes":[39,58,63,67],"beats":4.0},{"notes":[38,57,62,66],"beats":4.0},{"notes":[43,57,62,67],"beats":4.0},{"notes":[43,58,62,67],"beats":4.0}]},{"title":"03 - G Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[36,51,58,62,67],"beats":4.0},{"notes":[39,51,58,62,65],"beats":4.0},{"notes":[41,53,55,60,65],"beats":4.0},{"notes":[43,50,58,60,65],"beats":4.0}]},{"title":"04 - G Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[43,57,58,62,65],"beats":4.0},{"notes":[39,58,62,63,67],"beats":4.0},{"notes":[46,58,60,62,65],"beats":4.0},{"notes":[41,57,60,62,65],"beats":4.0}]},{"title":"05 - G Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[43,57,58,62,65],"beats":4.0},{"notes":[44,55,58,60,63],"beats":4.0},{"notes":[38,57,60,62,66],"beats":4.0},{"notes":[39,55,58,62,65],"beats":4.0},{"notes":[36,51,58,62,67],"beats":4.0},{"notes":[44,51,58,60,67],"beats":4.0},{"notes":[45,51,57,60,67],"beats":4.0},{"notes":[38,54,58,60,66],"beats":4.0}]},{"title":"06 - G Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[36,58,62,63,67],"beats":4.0},{"notes":[38,57,60,63,66],"beats":4.0},{"notes":[43,57,60,62,65],"beats":4.0},{"notes":[39,55,58,62,65],"beats":4.0},{"notes":[36,55,58,60,63],"beats":4.0},{"notes":[44,55,56,60,63],"beats":4.0},{"notes":[43,55,59,62,66],"beats":4.0},{"notes":[43,55,58,62,65],"beats":4.0}]},{"title":"Bonus - Minor Prog 11 (VImaj7-VII6-im7-VImaj7-VII6-vm7)","steps":[{"notes":[39,46,51,55,62],"beats":4.0},{"notes":[41,48,53,57,62],"beats":4.0},{"notes":[43,50,53,58,62],"beats":8.0},{"notes":[39,46,51,55,62],"beats":4.0},{"notes":[41,48,53,57,62],"beats":4.0},{"notes":[38,50,57,60,65],"beats":8.0}]}],"11_0":[{"title":"01 - B Major - Basic (I-iii-vi-IV6)","steps":[{"notes":[35,54,59,63],"beats":4.0},{"notes":[42,54,58,63],"beats":4.0},{"notes":[44,56,59,63],"beats":4.0},{"notes":[40,56,59,61],"beats":4.0}]},{"title":"02 - B Major - Basic (IV-I-vim7-V)","steps":[{"notes":[40,56,59,64,68],"beats":5.0},{"notes":[35,54,59,63,66],"beats":3.0},{"notes":[44,56,59,63,66],"beats":5.0},{"notes":[42,54,58,61,66],"beats":3.0}]},{"title":"03 - B Major - Intermediate (Iadd9-bVImaj7-bVIIadd9-IVadd9)","steps":[{"notes":[35,51,54,59,61],"beats":4.0},{"notes":[43,50,54,59,62],"beats":4.0},{"notes":[45,52,57,59,61],"beats":4.0},{"notes":[40,54,56,59,64],"beats":4.0}]},{"title":"04 - B Major - Intermediate (Imaj7-vim7-IVmaj9-bVImaj7)","steps":[{"notes":[47,58,59,63,66],"beats":4.0},{"notes":[44,56,59,63,66],"beats":4.0},{"notes":[40,56,59,63,66],"beats":4.0},{"notes":[43,55,59,62,66],"beats":4.0}]},{"title":"05 - B Major - Advanced (Imaj7-I7-IV6(9)-ivm6(9)-iiim7-VI7b13-iim9-V13-I6(9)-bII9)","steps":[{"notes":[35,51,58,61,66],"beats":4.0},{"notes":[35,51,57,61,66],"beats":4.0},{"notes":[40,52,56,61,66],"beats":4.0},{"notes":[40,52,55,61,66],"beats":4.0},{"notes":[39,54,58,61,66],"beats":2.0},{"notes":[44,54,56,60,64],"beats":2.0},{"notes":[37,52,56,59,63],"beats":2.0},{"notes":[42,52,56,58,63],"beats":2.0},{"notes":[35,51,54,56,61],"beats":4.0},{"notes":[36,52,55,58,62],"beats":4.0}]},{"title":"06 - B Major - Advanced (IVmaj7sus-Iadd9-vm6-VI7alt-iim7-V13-Imaj7-vm9-I9alt)","steps":[{"notes":[40,52,59,63,66],"beats":8.0},{"notes":[35,51,59,61,66],"beats":4.0},{"notes":[42,51,57,61,66],"beats":2.0},{"notes":[44,54,59,60,64],"beats":2.0},{"notes":[37,56,59,61,64],"beats":6.0},{"notes":[42,52,56,58,63],"beats":2.0},{"notes":[35,54,58,59,63],"beats":4.0},{"notes":[42,56,57,61,64],"beats":2.0},{"notes":[35,55,57,61,63],"beats":2.0}]},{"title":"Bonus - Major Prog 12 (IVmaj9-ivm6(9)-Imaj9-vim9-iim9-bII9#11-Imaj9-I7)","steps":[{"notes":[40,54,56,59,63],"beats":4.0},{"notes":[40,52,55,61,66],"beats":4.0},{"notes":[39,54,58,59,61,66],"beats":4.0},{"notes":[44,54,58,59,63],"beats":4.0},{"notes":[37,52,56,59,63],"beats":4.0},{"notes":[36,52,55,58,62,66],"beats":4.0},{"notes":[35,51,54,58,61,66],"beats":4.0},{"notes":[39,54,57,59,63],"beats":4.0}]}],"8_5":[{"title":"01 - G# Minor - Basic (i-VI-VII-v)","steps":[{"notes":[44,56,59,63],"beats":4.0},{"notes":[40,56,59,64],"beats":4.0},{"notes":[42,54,58,61],"beats":4.0},{"notes":[39,54,58,63],"beats":4.0}]},{"title":"02 - G# Minor - Basic (VI-V-isus-i)","steps":[{"notes":[40,59,64,68],"beats":4.0},{"notes":[39,58,63,67],"beats":4.0},{"notes":[44,58,63,68],"beats":4.0},{"notes":[44,59,63,68],"beats":4.0}]},{"title":"03 - G# Minor - Intermediate (ivm9-IVmaj7sus-VIIsus-im7add11)","steps":[{"notes":[37,52,59,63,68],"beats":4.0},{"notes":[40,52,59,63,66],"beats":4.0},{"notes":[42,54,56,61,66],"beats":4.0},{"notes":[44,51,59,61,66],"beats":4.0}]},{"title":"04 - G# Minor - Intermediate (im9-VImaj7-IIIadd9-VII6)","steps":[{"notes":[44,58,59,63,66],"beats":4.0},{"notes":[40,59,63,64,68],"beats":4.0},{"notes":[47,59,61,63,66],"beats":4.0},{"notes":[42,58,61,63,66],"beats":4.0}]},{"title":"05 - G# Minor - Advanced (im9-bIImaj9-V7-VImaj9-ivm9-bIImaj9-iim7b5-V7b13)","steps":[{"notes":[44,58,59,63,66],"beats":4.0},{"notes":[45,56,59,61,64],"beats":4.0},{"notes":[39,58,61,63,67],"beats":4.0},{"notes":[40,56,59,63,66],"beats":4.0},{"notes":[37,52,59,63,68],"beats":4.0},{"notes":[45,52,59,61,68],"beats":4.0},{"notes":[46,52,58,61,68],"beats":4.0},{"notes":[39,55,59,61,67],"beats":4.0}]},{"title":"06 - G# Minor - Advanced (ivm9-V7alt-I9sus-VImaj9-vm7-bIImaj7-Imaj7-im7)","steps":[{"notes":[37,59,63,64,68],"beats":4.0},{"notes":[39,58,61,64,67],"beats":4.0},{"notes":[44,58,61,63,66],"beats":4.0},{"notes":[40,56,59,63,66],"beats":4.0},{"notes":[37,56,59,61,64],"beats":4.0},{"notes":[45,56,57,61,64],"beats":4.0},{"notes":[44,56,60,63,67],"beats":4.0},{"notes":[44,56,59,63,66],"beats":4.0}]},{"title":"Bonus - Minor Prog 12 (imadd9-IIImaj7#5-im7-IV7-VIadd9)","steps":[{"notes":[44,58,59,63],"beats":4.0},{"notes":[43,58,59,63],"beats":4.0},{"notes":[42,56,59,63],"beats":4.0},{"notes":[41,56,59,61],"beats":2.0},{"notes":[40,56,59,66],"beats":2.0}]}]}};

  var NN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Just Intonation intervals from A (Naturton)
  
  var VOWELS = {
    'a': { f1: 800, q1: 5.0, g1: 0.95, f2: 1250, q2: 6.0, g2: 0.60, f3: 2600, q3: 7.0, g3: 0.35 },
    'e': { f1: 450, q1: 5.0, g1: 0.88, f2: 1850, q2: 6.0, g2: 0.70, f3: 2700, q3: 7.0, g3: 0.40 },
    'i': { f1: 300, q1: 5.0, g1: 0.82, f2: 2300, q2: 6.0, g2: 0.65, f3: 3000, q3: 7.0, g3: 0.45 },
    'o': { f1: 500, q1: 5.0, g1: 0.92, f2: 900,  q2: 6.0, g2: 0.55, f3: 2400, q3: 7.0, g3: 0.30 },
    'u': { f1: 350, q1: 5.0, g1: 0.90, f2: 800,  q2: 6.0, g2: 0.50, f3: 2200, q3: 7.0, g3: 0.25 }
  };

  var JUST_FROM_A = [
    1 / 1,      // A
    16 / 15,    // Bb
    9 / 8,      // B
    6 / 5,      // C  (minor third)
    5 / 4,      // C# (major third)
    4 / 3,      // D
    45 / 32,    // D# / tritone
    3 / 2,      // E  (fifth)
    8 / 5,      // F
    5 / 3,      // F#
    9 / 5,      // G
    15 / 8      // G#
  ];

  var UnisonData = {
    chords: RAW_DATA.chords,
    progressions: RAW_DATA.progressions,

    /**
     * Get rich Unison chord notes for a given root, mode, and scale degree
     */
    getVoicing: function(root, mode, deg, defaultTriadFn) {
      var keyId = root + '_' + mode;
      var keyChords = this.chords[keyId];
      if (keyChords && keyChords[deg] && keyChords[deg].notes) {
        return keyChords[deg].notes;
      }
      // Fallback or modal transposition: if defaultTriadFn provided, expand triad into lush open Unison voicing
      if (typeof defaultTriadFn === 'function') {
        var triad = defaultTriadFn(root, mode, deg);
        if (triad && triad.length >= 3) {
          var bass = triad[0] - 12; // deep sub octave
          var fifth = triad[2] - 12; // tenor fifth
          var rootNote = triad[0];
          var third = triad[1];
          var top = triad[2];
          return [bass, fifth, rootNote, third, top];
        }
      }
      return [60 + root, 64 + root, 67 + root];
    },

    /**
     * Get available Unison progressions for root & mode
     */
    getProgressions: function(root, mode) {
      var keyId = root + '_' + mode;
      return this.progressions[keyId] || this.progressions[root + '_0'] || [];
    },

    /**
     * Get chord name
     */
    getChordName: function(root, mode, deg) {
      var keyId = root + '_' + mode;
      var keyChords = this.chords[keyId];
      if (keyChords && keyChords[deg]) {
        return keyChords[deg].name;
      }
      return null;
    }
  };

  var UnisonAudio = {
    ac: null,
    bus: null,
    delayNodeL: null,
    delayNodeR: null,
    wetGain: null,
    limiter: null,
    tuningHz: 434.0, // Rosary Naturton default
    useJust: false,
    spaceAmount: 0.35,

    init: function(context) {
      if (context) {
        this.ac = context;
      } else if (!this.ac) {
        this.ac = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.ac.state === 'suspended') {
        this.ac.resume();
      }
      this.ensureBus();
      return this.ac;
    },

    setTuning: function(hz, just) {
      this.tuningHz = hz || 434.0;
      this.useJust = !!just;
    },

    setSpace: function(val) {
      this.spaceAmount = Math.max(0, Math.min(1, val));
      if (this.wetGain) {
        this.wetGain.gain.setValueAtTime(this.spaceAmount * 0.7, this.ac.currentTime);
      }
    },

    midiToHz: function(midi) {
      var a4 = this.tuningHz || 434.0;
      if (this.useJust) {
        var interval = ((midi - 69) % 12 + 12) % 12;
        var baseA = midi - interval;
        var octaves = (baseA - 69) / 12;
        return a4 * Math.pow(2, octaves) * JUST_FROM_A[interval];
      }
      return a4 * Math.pow(2, (midi - 69) / 12);
    },

    ensureBus: function() {
      if (this.bus || !this.ac) return;
      var ac = this.ac;

      // Master bus
      var bus = ac.createGain();
      bus.gain.value = 0.85;

      // Limiter / Compressor to keep audio clean and punchy
      var comp = ac.createDynamicsCompressor();
      comp.threshold.setValueAtTime(-2.0, ac.currentTime);
      comp.knee.setValueAtTime(8.0, ac.currentTime);
      comp.ratio.setValueAtTime(6.0, ac.currentTime);
      comp.attack.setValueAtTime(0.003, ac.currentTime);
      comp.release.setValueAtTime(0.15, ac.currentTime);

      // Stereo Cathedral Space network
      var dlL = ac.createDelay(2);
      var dlR = ac.createDelay(2);
      dlL.delayTime.value = 0.31;
      dlR.delayTime.value = 0.43;

      var fbL = ac.createGain();
      var fbR = ac.createGain();
      fbL.gain.value = 0.48;
      fbR.gain.value = 0.48;

      var filterL = ac.createBiquadFilter();
      var filterR = ac.createBiquadFilter();
      filterL.type = 'lowpass';
      filterR.type = 'lowpass';
      filterL.frequency.value = 3200;
      filterR.frequency.value = 3000;

      var wetGain = ac.createGain();
      wetGain.gain.value = this.spaceAmount * 0.7;

      var merger = ac.createChannelMerger(2);

      // Dry path
      bus.connect(comp);

      // Wet cross-feed path (Ping-Pong diffuse space)
      bus.connect(dlL);
      bus.connect(dlR);

      dlL.connect(filterL);
      filterL.connect(fbL);
      fbL.connect(dlR); // cross-feed
      filterL.connect(merger, 0, 0); // Left channel

      dlR.connect(filterR);
      filterR.connect(fbR);
      fbR.connect(dlL); // cross-feed
      filterR.connect(merger, 0, 1); // Right channel

      merger.connect(wetGain);
      wetGain.connect(comp);

      comp.connect(ac.destination);

      this.bus = bus;
      this.wetGain = wetGain;
    },

    /**
     * Play a single voice with rich Unison character
     */
    playVoice: function(t, midi, dur, vol, instr, pan) {
      var ac = this.init();
      t = t || ac.currentTime;
      dur = dur || 1.5;
      vol = (vol !== undefined) ? vol : 0.2;
      instr = instr || 'harfe';

      var f = this.midiToHz(midi);
      var liveNodes = [];

      // Create stereo panner if available, or fall back to mono
      var panner = null;
      if (typeof ac.createStereoPanner === 'function') {
        panner = ac.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan || 0)), t);
      }

      var voiceGain = ac.createGain();
      voiceGain.gain.setValueAtTime(0.0001, t);

      if (panner) {
        voiceGain.connect(panner);
        panner.connect(this.bus);
      } else {
        voiceGain.connect(this.bus);
      }

      if (instr === 'harfe' || instr === 'unison_harfe') {
        // Physical-model inspired Plucked String with Dual-Unison Detune
        var osc1 = ac.createOscillator();
        var osc2 = ac.createOscillator();
        var oscSub = ac.createOscillator();

        var filter = ac.createBiquadFilter();
        filter.type = 'lowpass';
        // Pluck transient: filter starts open and rapidly decays
        filter.frequency.setValueAtTime(Math.min(8000, f * 8), t);
        filter.frequency.exponentialRampToValueAtTime(Math.max(200, f * 1.5), t + Math.min(dur, 0.9));

        osc1.type = 'triangle';
        osc2.type = 'sine';
        oscSub.type = 'sine';

        osc1.frequency.setValueAtTime(f, t);
        // Unison micro-detune (+5 cents, -5 cents)
        osc1.detune.setValueAtTime(5, t);
        osc2.frequency.setValueAtTime(f * 2, t);
        osc2.detune.setValueAtTime(-5, t);
        oscSub.frequency.setValueAtTime(f, t);

        var gSub = ac.createGain();
        gSub.gain.value = 0.35;
        oscSub.connect(gSub);
        gSub.connect(filter);

        var g2 = ac.createGain();
        g2.gain.value = 0.28;
        osc2.connect(g2);
        g2.connect(filter);

        osc1.connect(filter);
        filter.connect(voiceGain);

        // Natural pluck envelope
        voiceGain.gain.setValueAtTime(0.0001, t);
        voiceGain.gain.exponentialRampToValueAtTime(vol, t + 0.008);
        voiceGain.gain.exponentialRampToValueAtTime(vol * 0.45, t + 0.12);
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        osc1.start(t);
        osc2.start(t);
        oscSub.start(t);
        var stopT = t + dur + 0.06;
        osc1.stop(stopT);
        osc2.stop(stopT);
        oscSub.stop(stopT);

        liveNodes.push(osc1, osc2, oscSub);

      } else if (instr === 'unison_pad') {
        // Triple-voice detuned lush Unison pad
        var oA = ac.createOscillator();
        var oB = ac.createOscillator();
        var oC = ac.createOscillator();

        oA.type = 'sawtooth';
        oB.type = 'sawtooth';
        oC.type = 'triangle';

        oA.frequency.setValueAtTime(f, t);
        oB.frequency.setValueAtTime(f, t);
        oC.frequency.setValueAtTime(f, t);

        oA.detune.setValueAtTime(-9, t);
        oB.detune.setValueAtTime(9, t);
        oC.detune.setValueAtTime(0, t);

        var pFilter = ac.createBiquadFilter();
        pFilter.type = 'lowpass';
        pFilter.frequency.setValueAtTime(Math.min(3500, f * 4), t);
        pFilter.frequency.exponentialRampToValueAtTime(Math.min(2200, f * 2.2), t + dur);

        oA.connect(pFilter);
        oB.connect(pFilter);
        oC.connect(pFilter);
        pFilter.connect(voiceGain);

        // Warm slow attack & gentle release
        var atk = Math.min(0.2, dur * 0.25);
        voiceGain.gain.setValueAtTime(0.0001, t);
        voiceGain.gain.linearRampToValueAtTime(vol * 0.7, t + atk);
        voiceGain.gain.setValueAtTime(vol * 0.6, t + dur * 0.8);
        voiceGain.gain.linearRampToValueAtTime(0.0001, t + dur);

        oA.start(t);
        oB.start(t);
        oC.start(t);
        var stopT2 = t + dur + 0.08;
        oA.stop(stopT2);
        oB.stop(stopT2);
        oC.stop(stopT2);

        liveNodes.push(oA, oB, oC);

      } else if (instr === 'glocke') {
        // Crystalline Glockenspiel / E-Piano with bell harmonics
        var bg1 = ac.createOscillator();
        var bg2 = ac.createOscillator();
        bg1.type = 'sine';
        bg2.type = 'triangle';

        bg1.frequency.setValueAtTime(f, t);
        bg2.frequency.setValueAtTime(f * 2.756, t); // Bell harmonic ratio

        var gHarm = ac.createGain();
        gHarm.gain.setValueAtTime(0.4, t);
        gHarm.gain.exponentialRampToValueAtTime(0.001, t + Math.min(dur, 0.4));
        bg2.connect(gHarm);
        gHarm.connect(voiceGain);
        bg1.connect(voiceGain);

        voiceGain.gain.setValueAtTime(0.0001, t);
        voiceGain.gain.exponentialRampToValueAtTime(vol * 0.8, t + 0.005);
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        bg1.start(t);
        bg2.start(t);
        var stopT3 = t + dur + 0.05;
        bg1.stop(stopT3);
        bg2.stop(stopT3);

        liveNodes.push(bg1, bg2);

      } else if (instr === 'chor' || instr === 'choir') {
        // Cathedral Choir Formant Synthesizer (Human vocal tract formant simulation [A] / [O])
        var o1 = ac.createOscillator();
        var o2 = ac.createOscillator();
        var o3 = ac.createOscillator();
        var vibrato = ac.createOscillator();
        var vibGain = ac.createGain();

        o1.type = 'sawtooth';
        o2.type = 'sawtooth';
        o3.type = 'triangle';

        o1.frequency.setValueAtTime(f, t);
        o2.frequency.setValueAtTime(f, t);
        o3.frequency.setValueAtTime(f, t);

        // Choral ensemble detune (Unison spread)
        o1.detune.setValueAtTime(-7, t);
        o2.detune.setValueAtTime(7, t);
        o3.detune.setValueAtTime(0, t);

        // Human vocal vibrato (5.3 Hz)
        vibrato.frequency.setValueAtTime(5.3, t);
        vibGain.gain.setValueAtTime(0.0001, t);
        vibGain.gain.exponentialRampToValueAtTime(1.8, t + Math.min(0.35, dur * 0.4));
        vibrato.connect(vibGain);
        vibGain.connect(o1.frequency);
        vibGain.connect(o2.frequency);
        vibGain.connect(o3.frequency);

        // Formant filters for vowel 'Ah' [a] and 'Oh' [o]
        var f1 = ac.createBiquadFilter();
        var f2 = ac.createBiquadFilter();
        var f3 = ac.createBiquadFilter();
        f1.type = 'bandpass'; f1.frequency.value = 750; f1.Q.value = 4.5;
        f2.type = 'bandpass'; f2.frequency.value = 1250; f2.Q.value = 5.5;
        f3.type = 'bandpass'; f3.frequency.value = 2500; f3.Q.value = 6.0;

        var g1 = ac.createGain(); g1.gain.value = 0.85;
        var g2 = ac.createGain(); g2.gain.value = 0.55;
        var g3 = ac.createGain(); g3.gain.value = 0.30;

        var choirMix = ac.createGain();
        var oscMix = ac.createGain();
        o1.connect(oscMix);
        o2.connect(oscMix);
        o3.connect(oscMix);

        oscMix.connect(f1); f1.connect(g1); g1.connect(choirMix);
        oscMix.connect(f2); f2.connect(g2); g2.connect(choirMix);
        oscMix.connect(f3); f3.connect(g3); g3.connect(choirMix);

        choirMix.connect(voiceGain);

        var atk = Math.min(0.28, dur * 0.3);
        voiceGain.gain.setValueAtTime(0.0001, t);
        voiceGain.gain.linearRampToValueAtTime(vol * 0.95, t + atk);
        voiceGain.gain.setValueAtTime(vol * 0.88, t + dur * 0.75);
        voiceGain.gain.linearRampToValueAtTime(0.0001, t + dur + 0.2);

        o1.start(t); o2.start(t); o3.start(t); vibrato.start(t);
        var stopTChoir = t + dur + 0.25;
        o1.stop(stopTChoir); o2.stop(stopTChoir); o3.stop(stopTChoir); vibrato.stop(stopTChoir);

        liveNodes.push(o1, o2, o3, vibrato);

      } else if (instr === 'blech') {
        // Brass / Horn
        var ob = ac.createOscillator();
        var fb = ac.createBiquadFilter();
        ob.type = 'sawtooth';
        ob.frequency.setValueAtTime(f, t);
        fb.type = 'lowpass';
        fb.frequency.setValueAtTime(1400, t);
        fb.Q.value = 2.2;
        ob.connect(fb);
        fb.connect(voiceGain);

        voiceGain.gain.setValueAtTime(0.0001, t);
        voiceGain.gain.linearRampToValueAtTime(vol, t + 0.04);
        voiceGain.gain.setValueAtTime(vol * 0.85, t + dur * 0.8);
        voiceGain.gain.linearRampToValueAtTime(0.0001, t + dur);

        ob.start(t);
        ob.stop(t + dur + 0.05);
        liveNodes.push(ob);

      } else {
        // Flöte
        var ofl = ac.createOscillator();
        ofl.type = 'sine';
        ofl.frequency.setValueAtTime(f, t);
        ofl.connect(voiceGain);

        voiceGain.gain.setValueAtTime(0.0001, t);
        voiceGain.gain.linearRampToValueAtTime(vol * 1.2, t + 0.06);
        voiceGain.gain.setValueAtTime(vol * 1.1, t + dur * 0.85);
        voiceGain.gain.linearRampToValueAtTime(0.0001, t + dur);

        ofl.start(t);
        ofl.stop(t + dur + 0.05);
        liveNodes.push(ofl);
      }

      return liveNodes;
    },

    /**
     * Play a full Unison chord with micro-strum and stereo spatial spread
     */
    
    /**
     * Sings a single musical note with true vocal tract formants, vibrato, and singer's resonance
     */
    singNote: function(t, midi, dur, vowel, vol, pan) {
      var ac = this.init();
      t = t || ac.currentTime;
      dur = dur || 1.2;
      vol = (vol !== undefined) ? vol : 0.28;
      vowel = (vowel || 'a').toLowerCase();
      if (!VOWELS[vowel]) vowel = 'a';

      var f = this.midiToHz(midi);
      var liveNodes = [];

      var panner = null;
      if (typeof ac.createStereoPanner === 'function') {
        panner = ac.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan || 0)), t);
      }

      var voiceGain = ac.createGain();
      if (panner) {
        voiceGain.connect(panner);
        panner.connect(this.bus);
      } else {
        voiceGain.connect(this.bus);
      }

      // Vocal cords excitation (Liljencrants-Fant glottal model approximation)
      var o1 = ac.createOscillator();
      var o2 = ac.createOscillator();
      var glottalFilter = ac.createBiquadFilter();
      glottalFilter.type = 'lowpass';
      glottalFilter.frequency.setValueAtTime(3200, t);

      o1.type = 'sawtooth';
      o2.type = 'triangle';
      o1.frequency.setValueAtTime(f, t);
      o2.frequency.setValueAtTime(f, t);
      o1.detune.setValueAtTime(-3, t);
      o2.detune.setValueAtTime(3, t);

      // Delayed singing vibrato (5.3 Hz LFO, onset after 160ms)
      var vib = ac.createOscillator();
      var vibGain = ac.createGain();
      vib.type = 'sine';
      vib.frequency.setValueAtTime(5.3, t);
      vibGain.gain.setValueAtTime(0.0001, t);
      var vibStart = t + Math.min(0.2, dur * 0.25);
      vibGain.gain.setValueAtTime(0.0001, vibStart);
      vibGain.gain.linearRampToValueAtTime(f * 0.015, vibStart + 0.22);

      vib.connect(vibGain);
      vibGain.connect(o1.frequency);
      vibGain.connect(o2.frequency);

      // Formants
      var vData = VOWELS[vowel];
      var f1 = ac.createBiquadFilter();
      var f2 = ac.createBiquadFilter();
      var f3 = ac.createBiquadFilter();
      var fSinger = ac.createBiquadFilter(); // Singer's Formant (2900 Hz classical ring)

      f1.type = 'bandpass'; f1.frequency.value = vData.f1; f1.Q.value = vData.q1;
      f2.type = 'bandpass'; f2.frequency.value = vData.f2; f2.Q.value = vData.q2;
      f3.type = 'bandpass'; f3.frequency.value = vData.f3; f3.Q.value = vData.q3;
      fSinger.type = 'bandpass'; fSinger.frequency.value = 2900; fSinger.Q.value = 4.2;

      var g1 = ac.createGain(); g1.gain.value = vData.g1;
      var g2 = ac.createGain(); g2.gain.value = vData.g2;
      var g3 = ac.createGain(); g3.gain.value = vData.g3;
      var gSinger = ac.createGain(); gSinger.gain.value = 0.25;

      var oscMix = ac.createGain();
      o1.connect(glottalFilter);
      o2.connect(glottalFilter);
      glottalFilter.connect(oscMix);

      var vowelMix = ac.createGain();
      oscMix.connect(f1); f1.connect(g1); g1.connect(vowelMix);
      oscMix.connect(f2); f2.connect(g2); g2.connect(vowelMix);
      oscMix.connect(f3); f3.connect(g3); g3.connect(vowelMix);
      oscMix.connect(fSinger); fSinger.connect(gSinger); gSinger.connect(vowelMix);

      vowelMix.connect(voiceGain);

      // Singing envelope
      var atk = 0.05;
      voiceGain.gain.setValueAtTime(0.0001, t);
      voiceGain.gain.linearRampToValueAtTime(vol, t + atk);
      voiceGain.gain.setValueAtTime(vol * 0.92, t + dur * 0.8);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.16);

      o1.start(t); o2.start(t); vib.start(t);
      var stopT = t + dur + 0.22;
      o1.stop(stopT); o2.stop(stopT); vib.stop(stopT);

      liveNodes.push(o1, o2, vib);
      return liveNodes;
    },

    playChord: function(t, notes, dur, vol, instr) {
      var that = this;
      var nodes = [];
      if (!notes || !notes.length) return nodes;
      vol = (vol !== undefined) ? vol : 0.06;
      instr = instr || 'unison_pad';

      // Humanized micro-strum delay (10-18ms)
      var strum = 0.012;
      notes.forEach(function(m, i) {
        // Stereo spread from bass (center-left) to treble (center-right)
        var pan = -0.4 + (i / Math.max(1, notes.length - 1)) * 0.8;
        // Bass notes slightly louder for grounding
        var noteVol = (i === 0) ? vol * 1.3 : vol;
        var noteTime = t + i * strum;
        var voiceNodes = that.playVoice(noteTime, m, Math.max(0.4, dur - i * strum), noteVol, instr, pan);
        nodes.push.apply(nodes, voiceNodes);
      });

      return nodes;
    }
  };

  
  var UnisonChoir = {
    voices: [],
    selectedVoice: null,
    lang: 'la', // 'la' (Latin), 'de' (German), 'en' (English)
    rate: 0.86,
    pitch: 1.0,
    volume: 1.0,

    initVoices: function(callback) {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      var that = this;
      function update() {
        that.voices = window.speechSynthesis.getVoices() || [];
        if (typeof callback === 'function') callback(that.voices);
      }
      update();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = update;
      }
    },

    getVoicesForLang: function(lang) {
      lang = lang || this.lang;
      var targets = (lang === 'la') ? ['it', 'la', 'es'] : [lang];
      var matched = this.voices.filter(function(v) {
        var l = (v.lang || '').toLowerCase();
        return targets.some(function(t) { return l.indexOf(t) === 0; });
      });
      matched.sort(function(a, b) {
        var aScore = (a.name.indexOf('Natural') >= 0 ? 10 : 0) + (a.name.indexOf('Google') >= 0 ? 5 : 0);
        var bScore = (b.name.indexOf('Natural') >= 0 ? 10 : 0) + (b.name.indexOf('Google') >= 0 ? 5 : 0);
        return bScore - aScore;
      });
      return matched.length ? matched : this.voices;
    },

    speak: function(text, lang, onWord, onEnd) {
      if (typeof window === 'undefined' || !window.speechSynthesis) return null;
      window.speechSynthesis.cancel();

      var utter = new SpeechSynthesisUtterance(text);
      lang = lang || this.lang;
      utter.rate = this.rate;
      utter.pitch = this.pitch;
      utter.volume = this.volume;

      var candidates = this.getVoicesForLang(lang);
      if (this.selectedVoice) {
        utter.voice = this.selectedVoice;
      } else if (candidates.length) {
        utter.voice = candidates[0];
      }

      if (lang === 'la') {
        utter.lang = (utter.voice && utter.voice.lang) ? utter.voice.lang : 'it-IT';
      } else {
        utter.lang = (utter.voice && utter.voice.lang) ? utter.voice.lang : (lang === 'de' ? 'de-DE' : 'en-US');
      }

      if (typeof onWord === 'function') {
        utter.onboundary = function(e) {
          if (e.name === 'word') onWord(e.charIndex, text);
        };
      }
      if (typeof onEnd === 'function') {
        utter.onend = onEnd;
      }

      window.speechSynthesis.speak(utter);
      return utter;
    },

    stop: function() {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    },

    
    detectVowel: function(syl) {
      var s = (syl || '').toLowerCase();
      for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if (c === 'a' || c === 'ä') return 'a';
        if (c === 'e') return 'e';
        if (c === 'i') return 'i';
        if (c === 'o' || c === 'ö') return 'o';
        if (c === 'u' || c === 'ü' || c === 'y') return 'u';
      }
      return 'a';
    },

    /**
     * Sings an entire line/phrase with accurate musical pitch per syllable
     */
    singLineMelody: function(syllables, notes, durs, startTime, lang, onSyllable, onEnd) {
      var that = this;
      var liveNodes = [];
      if (!syllables || !notes || !syllables.length) return liveNodes;
      var ac = UnisonAudio.init();
      startTime = startTime || (ac.currentTime + 0.05);

      var tt = startTime;
      var totalText = syllables.join(' ').replace(/[-_]+/g, ' ');

      // Calculate average pitch to intone the natural speaking/singing voice harmonically
      var avgMidi = 0;
      for (var k = 0; k < notes.length; k++) avgMidi += notes[k];
      avgMidi = avgMidi / notes.length;

      // 1. Web Audio Formant Singing Voice on exact melodic pitch & vowel
      for (var i = 0; i < syllables.length; i++) {
        var m = notes[i % notes.length];
        var d = durs[i % durs.length] || 1.0;
        var syl = syllables[i];
        var vowel = that.detectVowel(syl);

        var sNodes = UnisonAudio.singNote(tt, m, d * 1.15, vowel, 0.35, 0.0);
        liveNodes.push.apply(liveNodes, sNodes);

        if (typeof onSyllable === 'function') {
          (function(idx, timeOffset) {
            setTimeout(function() { onSyllable(idx, syllables[idx]); }, Math.max(0, (timeOffset - ac.currentTime) * 1000));
          })(i, tt);
        }

        tt += d;
      }

      // 2. Synchronized Vocal Articulation (intoned at musical singing pitch)
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        var utter = new SpeechSynthesisUtterance(totalText);
        lang = lang || that.lang;
        utter.rate = 0.82; // Cantus firmus singing rate
        // Intone SpeechSynthesis around melody center pitch
        utter.pitch = Math.max(0.6, Math.min(1.8, Math.pow(2, (avgMidi - 64) / 20)));
        utter.volume = that.volume;

        var candidates = that.getVoicesForLang(lang);
        if (that.selectedVoice) {
          utter.voice = that.selectedVoice;
        } else if (candidates.length) {
          utter.voice = candidates[0];
        }

        if (lang === 'la') {
          utter.lang = (utter.voice && utter.voice.lang) ? utter.voice.lang : 'it-IT';
        } else {
          utter.lang = (utter.voice && utter.voice.lang) ? utter.voice.lang : (lang === 'de' ? 'de-DE' : 'en-US');
        }

        window.speechSynthesis.speak(utter);
      }

      var totalDurationMs = Math.max(0, (tt - ac.currentTime) * 1000);
      if (typeof onEnd === 'function') {
        setTimeout(onEnd, totalDurationMs);
      }

      return liveNodes;
    },

    antiphons: {
      la: [
        { id: 'kyrie', title: 'Kyrie eleison', text: 'Kyrie eleison. Christe eleison. Kyrie eleison.', notes: [62, 64, 66, 64, 62] },
        { id: 'sanctus', title: 'Sanctus', text: 'Sanctus, Sanctus, Sanctus Dominus Deus Sabaoth. Pleni sunt caeli et terra gloria tua. Hosanna in excelsis.', notes: [62, 66, 69, 71, 69] },
        { id: 'gloria', title: 'Gloria in excelsis', text: 'Gloria in excelsis Deo, et in terra pax hominibus bonae voluntatis.', notes: [62, 66, 69, 74, 69] },
        { id: 'agnus', title: 'Agnus Dei', text: 'Agnus Dei, qui tollis peccata mundi, miserere nobis. Dona nobis pacem.', notes: [62, 64, 66, 67, 66, 64, 62] },
        { id: 'christus_vincit', title: 'Christus vincit', text: 'Christus vincit, Christus regnat, Christus imperat.', notes: [62, 66, 69, 74, 69] },
        { id: 'pater_noster', title: 'Pater noster', text: 'Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum.', notes: [62, 64, 66, 64, 62] },
        { id: 'lux', title: 'Lux in tenebris', text: 'Lux in tenebris lucet, et tenebrae eam non comprehenderunt.', notes: [62, 67, 69, 71, 69] },
        { id: 'verbum', title: 'In principio erat Verbum', text: 'In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum.', notes: [62, 66, 69, 71, 69] },
        { id: 'caritas', title: 'Ubi caritas', text: 'Ubi caritas et amor, Deus ibi est. Congregavit nos in unum Christi amor.', notes: [62, 64, 66, 69, 67, 66] },
        { id: 'alleluia', title: 'Alleluia', text: 'Alleluia, Alleluia, Alleluia.', notes: [62, 66, 69, 74] }
      ],
      de: [
        { id: 'baumeister', title: 'Christus baut auf', text: 'Christus baut auf, bau auch Du auf Christus.', notes: [72, 71, 69, 71, 69, 62, 69, 72] },
        { id: 'bruecke', title: 'Brücke aus Licht', text: 'Über dem Teich eine Brücke aus Licht, Rosenkranz, Ringwald, wir fürchten uns nicht.', notes: [67, 69, 71, 69, 67, 69, 71, 74] },
        { id: 'taize_hoffnung', title: 'Meine Hoffnung und Freude', text: 'Meine Hoffnung und meine Freude, meine Stärke, mein Licht: Christus meine Zuversicht, auf dich vertrau ich und fürcht mich nicht.', notes: [62, 66, 69, 71, 69] },
        { id: 'huette', title: 'Baumeister, leg den ersten Stein', text: 'Baumeister, leg den ersten Stein und lass uns deine Hütte sein.', notes: [69, 71, 69, 67, 66, 64, 66, 62] },
        { id: 'nebel', title: 'Im Nebel tanzen Geister', text: 'Im Nebel tanzen Geister leis, um Rosen, Teich und Hügelkreis.', notes: [62, 66, 69, 71, 69, 67, 66, 62] },
        { id: 'vollendet', title: 'Vollendet ist der Kreis', text: 'Vollendet ist der Kreis, der Ring, zu dem die ganze Schöpfung singt.', notes: [62, 66, 69, 74, 71, 69, 66, 62] }
      ],
      en: [
        { id: 'holy', title: 'Holy, Holy, Holy', text: 'Holy, Holy, Holy, Lord God of hosts. Heaven and earth are full of your glory.', notes: [62, 66, 69, 71, 69] },
        { id: 'bless', title: 'Bless the Lord', text: 'Bless the Lord, my soul, and bless his holy name.', notes: [62, 64, 66, 69, 67, 62] },
        { id: 'peace', title: 'Peace be with you', text: 'Peace be with you. The Lord be your light and salvation.', notes: [62, 66, 69, 74, 69] }
      ]
    }
  };

  var rootObj = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
  rootObj.UnisonData = UnisonData;
  rootObj.UnisonAudio = UnisonAudio;
  rootObj.UnisonChoir = UnisonChoir;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UnisonData: UnisonData, UnisonAudio: UnisonAudio, UnisonChoir: UnisonChoir };
  }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
