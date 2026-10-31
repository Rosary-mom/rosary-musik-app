/* Prism Zwei-Klick-Gate: kein iframe, kein Preconnect vor Zustimmung. sessionStorage only. */
(function () {
  "use strict";
  var KEY = "rosary-prism-consent-v1";
  var TERMS_VERSION = "2026-10-31-draft-1";
  var PRISM_URL = "https://argonsynth.si/prism/";
  var $ = function (id) { return document.getElementById(id); };

  function readConsent() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || o.version !== TERMS_VERSION || !o.ts) return null;
      return o;
    } catch (e) { return null; }
  }
  function saveConsent() {
    sessionStorage.setItem(KEY, JSON.stringify({
      version: TERMS_VERSION,
      ts: new Date().toISOString(),
      checks: ["privacy", "cookies", "terms", "noncommercial", "ownworks"]
    }));
  }
  function clearConsent() {
    try { sessionStorage.removeItem(KEY); } catch (e) {}
  }
  function allChecked() {
    return ["c-privacy", "c-cookies", "c-terms", "c-noncommercial", "c-ownworks"]
      .every(function (id) { return $(id) && $(id).checked; });
  }
  function updateAccept() {
    $("btn-accept").disabled = !allChecked();
  }
  function setStatus(msg) {
    $("pg-status").textContent = msg || "";
  }
  function unloadFrame() {
    var wrap = $("pg-frame-wrap");
    var frame = $("pg-frame");
    if (frame) {
      frame.removeAttribute("src");
      try { frame.src = "about:blank"; } catch (e) {}
      frame.remove();
    }
    wrap.classList.remove("open");
    wrap.innerHTML = "";
    $("btn-revoke").hidden = true;
    $("consent-panel").hidden = false;
  }
  function loadFrame() {
    var wrap = $("pg-frame-wrap");
    wrap.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.id = "pg-frame";
    iframe.title = "Prism Synthesizer (Drittanbieter Argonsynth)";
    iframe.setAttribute("referrerpolicy", "no-referrer");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("allow", "midi; autoplay; fullscreen");
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox");
    // src erst jetzt setzen – keine Anfrage vorher
    iframe.src = PRISM_URL;
    wrap.appendChild(iframe);
    wrap.classList.add("open");
    $("consent-panel").hidden = true;
    $("btn-revoke").hidden = false;
    setStatus("Prism geladen (Sitzungs-Zustimmung " + TERMS_VERSION + ").");
  }
  function applyConsentUI() {
    var c = readConsent();
    if (c) {
      ["c-privacy", "c-cookies", "c-terms", "c-noncommercial", "c-ownworks"].forEach(function (id) {
        if ($(id)) $(id).checked = true;
      });
      updateAccept();
      loadFrame();
    } else {
      unloadFrame();
      setStatus("Keine Zustimmung in dieser Sitzung. Prism ist nicht geladen.");
    }
  }

  ["c-privacy", "c-cookies", "c-terms", "c-noncommercial", "c-ownworks"].forEach(function (id) {
    $(id).addEventListener("change", updateAccept);
  });
  $("btn-accept").addEventListener("click", function () {
    if (!allChecked()) return;
    saveConsent();
    loadFrame();
  });
  $("btn-decline").addEventListener("click", function () {
    clearConsent();
    ["c-privacy", "c-cookies", "c-terms", "c-noncommercial", "c-ownworks"].forEach(function (id) {
      $(id).checked = false;
    });
    updateAccept();
    unloadFrame();
    setStatus("Abgelehnt. Es wurde kein Prism-Inhalt geladen.");
  });
  $("btn-revoke").addEventListener("click", function () {
    clearConsent();
    ["c-privacy", "c-cookies", "c-terms", "c-noncommercial", "c-ownworks"].forEach(function (id) {
      $(id).checked = false;
    });
    updateAccept();
    unloadFrame();
    setStatus("Zustimmung widerrufen. iframe entladen, sessionStorage gelöscht.");
  });

  updateAccept();
  applyConsentUI();
})();
