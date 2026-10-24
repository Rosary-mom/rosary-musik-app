# Rosary Musik

Statische, offline-fähige Web-App (PWA) mit drei Bereichen:

- **Sphärenharfe** (`sphaerenharfe/`): Prototyp mit 3 Melodiesaiten auf D4 (Bünde in D-Dur), Bass D2/G2/E2, Baumeister-Leitmotiv, Aufnahme als MIDI, Loop-Player für eigene Audiodateien.
- **Music Tree v3** (`music-tree/`): 7 Modi in 12 Tonarten, Bridge „Brücke aus Licht“, Meditation, CSV/MIDI-Export.
- **Noten schreiben** (`noten/`): einfacher Noteneditor im D-Dur-Raster, Leitmotiv laden, abspielen, als MIDI speichern.

Keine externen Quellen, kein Build-Schritt. Alle Klänge werden im Browser erzeugt.

## Lokal testen
```
python3 -m http.server 8000
```
Dann http://localhost:8000 öffnen.

## Veröffentlichen
Installierbar wird die App nur über HTTPS, z. B. mit Vercel (Projektordner direkt als statische Seite) oder GitHub Pages.
Nach jeder Änderung in `service-worker.js` die Cache-Version (`rosary-musik-v1`) hochzählen.
