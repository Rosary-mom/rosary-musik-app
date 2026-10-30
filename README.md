# Rosary Musik

Statische, offline-fähige Web-App (PWA) optimiert mit dem **Sound of Unison**:

- **Chor mit hörbaren Stimmen & Unison Sound Engine** (`assets/unison-sound.js`): Chormodul `UnisonChoir` mit lebendigen, natürlichen Stimmen in Latein (liturgisch, kirchliche Vokale), Deutsch (Baumeister & Taizé) und Englisch, plus Kathedral-Chor Formantsynthesizer (menschlicher Vokaltrakt [A]/[O]) in Web Audio.
- **Sound of Unison Engine**: Authentische offene 5-stimmige Akkord-Voicings (Sub-Bass + Tenor-Quinte + Terz/Septime/None) und Chord Progressions aus dem Unison MIDI Pack. Studio-WebAudio mit Stereo-Detune (Unison-Schimmer), diffusem Kathedral-Raum und umschaltbaren Stimmungen (434 Hz Rosary Naturton, 432 Hz Solfeggio, 440 Hz Konzert).
- **Sphärenharfe** (`sphaerenharfe/`): Prototyp mit 3 Melodiesaiten auf D4 (Bünde in D-Dur), Bass D2/G2/E2, Unison Akkord-Begleiter in D-Dur (Lush Pads), 434 Hz Naturton-Tuning, Baumeister-Leitmotiv, Aufnahme als MIDI, Loop-Player für eigene Audiodateien.
- **Music Tree v3** (`music-tree/`): 7 Modi in 12 Tonarten, umschaltbar zwischen klassischen Triaden und Unison Open Voicings sowie Unison Chord Progressions (Basic, Intermediate, Advanced, Bonus), Bridge „Brücke aus Licht“, Meditation, CSV/MIDI-Export (mit vollen 5-stimmigen Unison-Akkorden).
- **Stimme aufnehmen** (`stimme/`): Gesang zur Begleitung (Satz A oder eigene Datei) aufnehmen, mit Einzähler, Pegelanzeige, Latenzausgleich und mehreren Takes; Download als WebM/Ogg und WAV (Stimme allein oder gemischt, synchron ab Einsatz der Begleitung). Kopfhörer tragen. Die Begleit-MP3 wird nicht offline vorgeladen.
- **Noten schreiben** (`noten/`): einfacher Noteneditor im D-Dur-Raster mit Unison Sound, D-Dur Kadenz, 434 Hz Naturton, Leitmotiv laden, abspielen, als MIDI speichern.
- **Missa Baumeister** (`messe/`): Taizé-Abend in 14 Teilen mit synchronem Karaoke und Notenblatt.

Keine externen Quellen, kein Build-Schritt. Alle Klänge werden im Browser erzeugt.

## Lokal testen
```
python3 -m http.server 8000
```
Dann http://localhost:8000 öffnen.

## Veröffentlichen
Installierbar wird die App nur über HTTPS, z. B. mit Vercel (Projektordner direkt als statische Seite) oder GitHub Pages.
Nach jeder Änderung in `service-worker.js` die Cache-Version hochzählen (aktuell `rosary-musik-v12`).
