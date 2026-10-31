/* Missa Live: Beamer-Karaoke, Live-Modus, Offline-Cache. Erhält Unison-Chor. */
(function () {
  "use strict";
  var $ = function (i) { return document.getElementById(i); };
  var au = $("au"), D = null, cur = null, curIdx = -1, last = null;
  var langMode = "alle"; // la | de | fr | alle
  var fadeTimer = null, liveOpen = false, offlineBusy = false;
  var CACHE_MESSE = "rosary-messe-v1";
  var FADE_MS = 3000;

  function fmt(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function fadeTo(vol, ms, done) {
    if (fadeTimer) { clearInterval(fadeTimer); fadeTimer = null; }
    if (reduceMotion() || !ms) { au.volume = vol; if (done) done(); return; }
    var t0 = performance.now(), v0 = au.volume;
    fadeTimer = setInterval(function () {
      var p = Math.min(1, (performance.now() - t0) / ms);
      au.volume = v0 + (vol - v0) * p;
      if (p >= 1) { clearInterval(fadeTimer); fadeTimer = null; if (done) done(); }
    }, 40);
  }
  function langOf(z) {
    var s = (z && (z.strophe || "")).toLowerCase();
    if (s.indexOf("la") === 0) return "la";
    if (s.indexOf("de") === 0) return "de";
    if (s.indexOf("fr") === 0) return "fr";
    var t = (z && (z.text || z.zeile || "")) || "";
    if (/(Kyrie|Christe|Sanctus|Agnus|Credo|Pater|Domine|Deo|eleison|Gloria|pacem|Lux |Non no)/i.test(t)) return "la";
    if (/(prends|Seigneur|paix|Gloire|Père|Frère)/i.test(t)) return "fr";
    return "de";
  }
  function visibleLines(satz) {
    if (!satz || !satz.zeilen) return [];
    if (langMode === "alle") return satz.zeilen;
    return satz.zeilen.filter(function (z) { return langOf(z) === langMode; });
  }
  function lineAt(t, lines) {
    for (var i = 0; i < lines.length; i++) {
      if (t >= lines[i].start && t < lines[i].ende) return { z: lines[i], i: i };
    }
    for (var j = lines.length - 1; j >= 0; j--) if (t >= lines[j].ende) return { z: null, i: j, past: true };
    return { z: null, i: -1 };
  }
  function renderKara(el, z, t) {
    if (!el) return;
    if (!z) { el.innerHTML = ""; return; }
    var sb = z.silben || [];
    if (!sb.length) {
      el.textContent = (z.text || z.zeile || "").replace(/-/g, "");
      return;
    }
    el.innerHTML = sb.map(function (s) { return "<span>" + s.s + "</span>"; }).join(" ");
    var kids = el.children;
    for (var j = 0; j < kids.length; j++) {
      var n = sb[j + 1] ? sb[j + 1].t : z.ende;
      kids[j].className = t >= n ? "done" : t >= sb[j].t ? "on" : "";
    }
  }
  function sync() {
    if (!cur) return;
    var t = au.currentTime, lines = visibleLines(cur), hit = lineAt(t, lines);
    var z = hit.z, next = null;
    if (z) next = lines[hit.i + 1] || null;
    else if (hit.past && hit.i >= 0) next = lines[hit.i + 1] || null;
    else next = lines[0] || null;

    if (z !== last) {
      last = z;
      $("lineinfo").textContent = z ? ((z.stimme || "") + (z.strophe ? " · " + z.strophe : "")) : "";
      maybeChoir(z);
    }
    renderKara($("kara"), z, t);
    renderKara($("kara-next"), next, -1);
    if ($("kara-next") && next) {
      $("kara-next").textContent = "→ " + (next.text || next.zeile || "").replace(/-/g, " ");
    } else if ($("kara-next")) $("kara-next").textContent = "";

    // Beamer
    var bm = $("beamer");
    if (bm && bm.classList.contains("open")) {
      renderKara($("b-cur"), z, t);
      $("b-next").textContent = next ? ("→ " + (next.text || next.zeile || "").replace(/-/g, " ")) : "";
      $("b-teil").textContent = cur.satz || "";
      $("b-rest").textContent = "Rest " + fmt((au.duration || 0) - t);
    }
    if ($("live-rest")) $("live-rest").textContent = "Rest " + fmt((au.duration || 0) - t);
  }
  function maybeChoir(z) {
    if (!z || !$("live-choir-toggle") || !$("live-choir-toggle").checked || !window.UnisonChoir) return;
    var cleanText = (z.text || z.zeile || "").replace(/[-_]+/g, " ");
    var lang = langOf(z) === "fr" ? "de" : langOf(z);
    if (lang === "alle") lang = "la";
    if (z.silben && z.silben.length && typeof UnisonChoir.singLineMelody === "function") {
      var syls = z.silben.map(function (s) { return s.s; });
      var contour = [0, 2, 4, 2, 0, -2, 0];
      var chantNotes = syls.map(function (_, idx) { return 62 + contour[idx % contour.length]; });
      var chantDurs = z.silben.map(function (s, idx) {
        var nextT = z.silben[idx + 1] ? z.silben[idx + 1].t : z.ende;
        return Math.max(0.6, Math.min(2.5, nextT - s.t));
      });
      UnisonChoir.singLineMelody(syls, chantNotes, chantDurs, null, lang === "fr" ? "de" : lang);
    } else if (typeof UnisonChoir.speak === "function") {
      UnisonChoir.speak(cleanText, lang === "fr" ? "de" : lang);
    }
  }

  function setCurrentTile(i) {
    [].forEach.call(document.querySelectorAll(".ml-teil"), function (x) {
      x.classList.remove("on");
      x.removeAttribute("aria-current");
    });
    var el = document.querySelector('.ml-teil[data-i="' + i + '"]');
    if (el) { el.classList.add("on"); el.setAttribute("aria-current", "true"); }
    [].forEach.call(document.querySelectorAll(".ml-live-grid button"), function (b) {
      b.removeAttribute("aria-current");
      if (+b.getAttribute("data-i") === i) b.setAttribute("aria-current", "true");
    });
  }
  function playIdx(i, opts) {
    opts = opts || {};
    if (!D || !D.saetze[i]) return;
    var start = function () {
      cur = D.saetze[i]; curIdx = i; last = null;
      setCurrentTile(i);
      au.src = "audio/" + cur.datei + ".mp3";
      au.volume = opts.fadeIn && !reduceMotion() ? 0 : 1;
      var p = au.play();
      if (p && p.catch) p.catch(function () {});
      if (opts.fadeIn) fadeTo(1, FADE_MS);
      sync();
    };
    if (opts.fadeOut && !au.paused && au.src) {
      fadeTo(0, FADE_MS, function () { au.pause(); start(); });
    } else start();
  }
  window.MissaLive = {
    playIdx: playIdx,
    next: function () { if (curIdx < (D.saetze.length - 1)) playIdx(curIdx + 1, { fadeOut: true, fadeIn: true }); },
    prev: function () { if (curIdx > 0) playIdx(curIdx - 1, { fadeOut: true, fadeIn: true }); },
    togglePause: function () {
      if (au.paused) { au.play().catch(function () {}); fadeTo(1, 800); }
      else fadeTo(0, 800, function () { au.pause(); au.volume = 1; });
    },
    fadeOutStop: function () {
      fadeTo(0, FADE_MS, function () { au.pause(); au.volume = 1; });
    }
  };

  function buildList() {
    var list = $("list"); list.innerHTML = "";
    D.saetze.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "ml-teil"; b.setAttribute("data-i", i);
      var nr = (s.satz.match(/^(\d+b?)/) || ["", String(i + 1)])[1];
      b.innerHTML = '<span class="ml-nr">' + nr + "</span><span>" + s.satz.replace(/^\d+b?\s*[·.]\s*/, "") + "</span>";
      b.setAttribute("aria-label", "Teil abspielen: " + s.satz);
      b.onclick = function () { playIdx(i, { fadeIn: true }); };
      list.appendChild(b);
    });
    var grid = $("live-grid");
    if (grid) {
      grid.innerHTML = "";
      D.saetze.forEach(function (s, i) {
        var nr = (s.satz.match(/^(\d+b?)/) || ["", ""])[1];
        var b = document.createElement("button");
        b.type = "button"; b.textContent = nr; b.setAttribute("data-i", i);
        b.setAttribute("aria-label", "Live: " + s.satz);
        b.onclick = function () { playIdx(i, { fadeOut: true, fadeIn: true }); };
        grid.appendChild(b);
      });
    }
  }

  function setLang(m) {
    langMode = m;
    [].forEach.call(document.querySelectorAll(".ml-lang button"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === m ? "true" : "false");
    });
    last = null; sync();
  }

  function openBeamer(on) {
    var bm = $("beamer");
    if (!bm) return;
    bm.classList.toggle("open", on);
    bm.setAttribute("aria-hidden", on ? "false" : "true");
    if (on && bm.requestFullscreen) bm.requestFullscreen().catch(function () {});
    if (!on && document.fullscreenElement) document.exitFullscreen().catch(function () {});
    sync();
  }
  function openLive(on) {
    liveOpen = on;
    $("live-bar").classList.toggle("open", on);
    $("btn-live").setAttribute("aria-pressed", on ? "true" : "false");
  }

  function messeUrls() {
    var base = new URL(".", location.href).href;
    var urls = [
      base, base + "index.html", base + "missa-live.css", base + "missa-live.js",
      base + "messe-karaoke.json", base + "messe-liedblatt.pdf",
      base + "audio/messe-gesamt-48k.mp3"
    ];
    if (D) D.saetze.forEach(function (s) { urls.push(base + "audio/" + s.datei + ".mp3"); });
    return urls;
  }
  function setOfflineStatus(msg, pct) {
    $("offline-status").textContent = msg;
    $("offline-bar").style.width = (pct || 0) + "%";
    $("offline-bar").parentElement.setAttribute("aria-valuenow", String(pct || 0));
  }
  async function saveOffline() {
    if (offlineBusy || !("caches" in window)) {
      setOfflineStatus("Cache API nicht verfügbar.", 0); return;
    }
    offlineBusy = true;
    $("btn-offline").disabled = true;
    var urls = messeUrls(), ok = 0, fail = 0;
    setOfflineStatus("Speichere … 0/" + urls.length, 0);
    try {
      var cache = await caches.open(CACHE_MESSE);
      for (var i = 0; i < urls.length; i++) {
        try {
          var res = await fetch(urls[i], { cache: "reload" });
          if (res.ok) { await cache.put(urls[i], res); ok++; }
          else fail++;
        } catch (e) { fail++; }
        var pct = Math.round(((i + 1) / urls.length) * 100);
        setOfflineStatus("Speichere … " + (i + 1) + "/" + urls.length + (fail ? " (" + fail + " Fehler)" : ""), pct);
      }
      localStorage.setItem("missa-offline-ready", "1");
      setOfflineStatus(fail ? ("Teilweise bereit (" + ok + " ok, " + fail + " Fehler).") : "Offline bereit (" + ok + " Dateien).", 100);
    } catch (e) {
      setOfflineStatus("Fehler: " + (e.message || e), 0);
    }
    offlineBusy = false;
    $("btn-offline").disabled = false;
  }
  async function checkOffline() {
    if (!("caches" in window)) return;
    try {
      var c = await caches.open(CACHE_MESSE);
      var keys = await c.keys();
      if (keys.length > 10 || localStorage.getItem("missa-offline-ready") === "1")
        setOfflineStatus("Offline bereit (" + keys.length + " Einträge im Cache).", 100);
    } catch (e) {}
  }

  // Keyboard
  document.addEventListener("keydown", function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === " " || e.code === "Space") { e.preventDefault(); MissaLive.togglePause(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); MissaLive.next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); MissaLive.prev(); }
    else if (e.key === "Escape") { openBeamer(false); }
    else if (e.key === "b" || e.key === "B") { openBeamer(!$("beamer").classList.contains("open")); }
    else if (e.key === "f" || e.key === "F") { MissaLive.fadeOutStop(); }
    else if (/^[0-9]$/.test(e.key)) {
      var n = e.key === "0" ? 9 : (+e.key - 1);
      // map 1->0 … 9->8; 06b is index 6 — digits can't hit 06b easily; use live grid
      if (D && D.saetze[n]) playIdx(n, { fadeOut: true, fadeIn: true });
    }
  });

  fetch("messe-karaoke.json").then(function (r) { return r.json(); }).then(function (d) {
    D = d;
    $("wid").textContent = d.widmung || "";
    buildList();
    checkOffline();
  });

  au.addEventListener("timeupdate", sync);
  au.addEventListener("ended", function () {
    if (liveOpen && curIdx < D.saetze.length - 1) playIdx(curIdx + 1, { fadeIn: true });
  });
  (function loop() { if (!au.paused) sync(); requestAnimationFrame(loop); })();

  $("btn-beamer").onclick = function () { openBeamer(true); };
  $("btn-live").onclick = function () { openLive(!liveOpen); };
  $("btn-offline").onclick = saveOffline;
  $("btn-pause").onclick = function () { MissaLive.togglePause(); };
  $("btn-fade").onclick = function () { MissaLive.fadeOutStop(); };
  $("btn-prev").onclick = function () { MissaLive.prev(); };
  $("btn-next").onclick = function () { MissaLive.next(); };
  $("b-close").onclick = function () { openBeamer(false); };
  $("b-pause").onclick = function () { MissaLive.togglePause(); };
  [].forEach.call(document.querySelectorAll(".ml-lang button"), function (b) {
    b.onclick = function () { setLang(b.getAttribute("data-lang")); };
  });
  setLang("alle");

  if ($("btn-solo-antiphon")) $("btn-solo-antiphon").onclick = function () {
    if (!cur || !cur.zeilen || !window.UnisonChoir) return;
    var lines = visibleLines(cur);
    var z = last || lines[0] || cur.zeilen[0];
    maybeChoir(z);
  };

  if ("serviceWorker" in navigator && location.protocol !== "file:")
    navigator.serviceWorker.register("../service-worker.js");
})();
