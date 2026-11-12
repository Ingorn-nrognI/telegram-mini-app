/* Английская версия интерфейса.
   Большая часть текстов приложения написана по-русски прямо в разметке и в скриптах.
   Чтобы при «Language: English» не оставалось русских надписей, здесь работает один
   общий переводчик: он смотрит на все тексты на экране (и те, что появляются позже),
   на подписи кнопок (placeholder / title / aria-label), на тексты, которые рисуются
   на канвасе, и на всплывающие окна alert/confirm — и подменяет русские фразы
   английскими по словарю из js/i18n-dict.js.
   Числа внутри фраз сохраняются: в словаре они записаны как {0}, {1}…
   При возврате на русский все подменённые тексты возвращаются обратно. */
(function () {
  "use strict";
  var KEY = "bobr_world_app_settings_v1";
  var CYR = /[А-Яа-яЁё№]/, LET = /[А-Яа-яЁё]/;
  var NUM = /\d+(?:[  ]\d{3})*(?:[.,:]\d+)*/g;

  function savedLang() {
    try { return (JSON.parse(localStorage.getItem(KEY) || "null") || {}).language || "ru"; } catch (e) { return "ru"; }
  }
  var lang = savedLang();
  function on() {
    try { if (typeof appSettings === "object" && appSettings && appSettings.language) return appSettings.language === "en"; } catch (e) {}
    return lang === "en";
  }

  /* ---------- словарь ---------- */
  var EXACT = Object.create(null), LOWER = Object.create(null), PAT = [];
  var cache = new Map(), MISS = new Map();
  window.__i18nMiss = MISS;
  function normKey(s) { return s.replace(/\s+/g, " ").trim(); }
  function numKey(s) { var i = 0; return s.replace(NUM, function () { return "{" + (i++) + "}"; }); }
  function add(dict) {
    for (var k in dict) {
      var strict = k.charAt(0) === "=", src = normKey(strict ? k.slice(1) : k), i = 0, map = {};
      // числа в ключе (и явные {n}, и обычные цифры) нумеруются по порядку
      var nk = src.replace(/\{(\d+)\}|\d+(?:[ \u00a0]\d{3})*(?:[.,:]\d+)*/g, function (m, ph) { if (ph != null) map[ph] = i; return "{" + (i++) + "}"; });
      var v = dict[k];
      if (typeof v === "string") v = v.replace(/\{(\d+)\}/g, function (m, n) { return map[n] != null ? "{" + map[n] + "}" : m; });
      EXACT[nk] = v;
      if (!strict) LOWER[nk.toLowerCase()] = v;
    }
    cache.clear();
  }
  function addPatterns(list) { PAT = PAT.concat(list); }

  function fill(v, nums) {
    if (typeof v === "function") return v(nums);
    return v.replace(/\{(\d+)\}/g, function (m, i) { return nums[+i] != null ? nums[+i] : m; });
  }
  function caseLike(src, out) {
    var letters = src.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
    if (letters.length > 1 && letters === letters.toUpperCase()) return out.toUpperCase();
    var f = src.match(/[A-Za-zА-Яа-яЁё]/);
    if (f && f[0] === f[0].toUpperCase()) { var j = out.search(/[A-Za-z]/); if (j >= 0) return out.slice(0, j) + out[j].toUpperCase() + out.slice(j + 1); }
    if (f && f[0] !== f[0].toUpperCase()) { var k = out.search(/[A-Za-z]/); if (k >= 0 && /[A-Z][a-z]/.test(out.slice(k, k + 2))) return out.slice(0, k) + out[k].toLowerCase() + out.slice(k + 1); }
    return out;
  }


  function one(t) {
    var nums = t.match(NUM) || [], key = numKey(t);
    if (key in EXACT) return fill(EXACT[key], nums);
    var lk = key.toLowerCase();
    if (lk in LOWER) return caseLike(t, fill(LOWER[lk], nums));
    for (var i = 0; i < PAT.length; i++) {
      var m = t.match(PAT[i][0]);
      if (m) { var r = PAT[i][1].apply(null, m.concat([tr])); if (r != null) return r; }
    }
    return null;
  }
  // перевод фразы целиком; если фразы нет в словаре — по частям через « · », « — », «: »
  function core(t) {
    var r = one(t);
    if (r != null) return r;
    var seps = [" · ", " — ", " | ", ": ", ", ", " / "];
    for (var s = 0; s < seps.length; s++) {
      if (t.indexOf(seps[s]) < 0) continue;
      var parts = t.split(seps[s]), ok = true;
      for (var p = 0; p < parts.length; p++) {
        if (!CYR.test(parts[p])) continue;
        var x = core(parts[p].trim());
        if (x == null) { ok = false; break; }
        parts[p] = parts[p].replace(parts[p].trim(), x);
      }
      if (ok) return parts.join(seps[s]);
    }
    // ведущий эмодзи/символ: «🎮 Комнаты» → перевести хвост
    var lead = t.match(/^([^A-Za-zА-Яа-яЁё0-9]+)(.+)$/);
    if (lead && CYR.test(lead[2])) { var y = core(lead[2]); if (y != null) return lead[1] + y; }
    var tail = t.match(/^(.+?)([^A-Za-zА-Яа-яЁё0-9]+)$/);
    if (tail && CYR.test(tail[1])) { var z = one(tail[1]); if (z != null) return z + tail[2]; }
    return null;
  }
  function tr(s) {
    if (s == null) return s;
    s = String(s);
    if (!CYR.test(s)) return s;
    var c = cache.get(s);
    if (c !== undefined) return c;
    var lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], t = normKey(s);
    var r = LET.test(t) ? core(t) : t;
    if (r != null) r = r.replace(/№\s?/g, "#");
    var out;
    if (r == null) { MISS.set(t, (MISS.get(t) || 0) + 1); out = s; }
    else out = lead + r + trail;
    if (cache.size > 5000) cache.clear();
    cache.set(s, out);
    return out;
  }

  /* ---------- DOM ---------- */
  var ORIG = [];             // [WeakRef(node), attr|null, русский оригинал]
  var mine = new WeakMap();  // node -> последний наш английский текст (чтобы не переводить себя)
  var WR = typeof WeakRef === "function";
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };
  var ATTRS = ["placeholder", "title", "aria-label", "data-label"];

  function remember(n, a, ru) { if (WR) ORIG.push([new WeakRef(n), a, ru]); }
  function doText(n) {
    var v = n.nodeValue;
    if (!v || !CYR.test(v)) return;
    var p = n.parentNode;
    if (!p || SKIP[p.nodeName] || (p.closest && p.closest("[data-no-i18n]"))) return;
    var e = tr(v);
    if (e !== v) { remember(n, null, v); mine.set(n, e); n.nodeValue = e; }
  }
  function doAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute && el.getAttribute(a);
      if (!v || !CYR.test(v)) continue;
      var e = tr(v);
      if (e !== v) { remember(el, a, v); el.setAttribute(a, e); }
    }
    if (el.tagName === "INPUT" && (el.type === "button" || el.type === "submit") && CYR.test(el.value)) {
      var ev = tr(el.value); if (ev !== el.value) { remember(el, "value", el.value); el.value = ev; }
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) { if (SKIP[root.nodeName]) return; doAttrs(root); }
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) doText(n);
      else if (!SKIP[n.nodeName]) doAttrs(n);
    }
  }

  var queue = new Set(), sched = false, mo = null;
  function flush() {
    sched = false;
    if (!on()) { queue.clear(); return; }
    var q = Array.from(queue); queue.clear();
    for (var i = 0; i < q.length; i++) { try { walk(q[i]); } catch (e) {} }
  }
  function push(n) {
    queue.add(n);
    if (!sched) { sched = true; (window.queueMicrotask || setTimeout)(flush); }
  }
  function start() {
    if (mo || !document.body) return;
    mo = new MutationObserver(function (list) {
      if (!on()) return;
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        if (m.type === "characterData") { if (mine.get(m.target) !== m.target.nodeValue) push(m.target); }
        else if (m.type === "attributes") push(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) push(m.addedNodes[j]);
      }
    });
    mo.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS.concat(["value"]) });
    if (on()) walk(document.documentElement);
  }
  function restore() {
    for (var i = ORIG.length - 1; i >= 0; i--) {
      var r = ORIG[i], n = r[0].deref();
      if (!n) continue;
      try {
        if (r[1] === null) { if (mine.get(n) === n.nodeValue) n.nodeValue = r[2]; }
        else if (r[1] === "value") n.value = r[2];
        else n.setAttribute(r[1], r[2]);
      } catch (e) {}
    }
    ORIG = [];
  }
  function setLang(l) {
    lang = l;
    try { document.documentElement.lang = l === "en" ? "en" : "ru"; } catch (e) {}
    if (l === "en") walk(document.documentElement); else restore();
  }

  /* ---------- канвас и системные окна ---------- */
  try {
    var C = CanvasRenderingContext2D.prototype;
    ["fillText", "strokeText", "measureText"].forEach(function (f) {
      var o = C[f];
      C[f] = function (t) { if (typeof t === "string" && CYR.test(t) && on()) { var a = Array.prototype.slice.call(arguments); a[0] = tr(t); return o.apply(this, a); } return o.apply(this, arguments); };
    });
  } catch (e) {}
  ["alert", "confirm", "prompt"].forEach(function (f) {
    var o = window[f];
    if (typeof o !== "function") return;
    window[f] = function (t) { var a = Array.prototype.slice.call(arguments); if (on() && typeof t === "string") a[0] = tr(t); return o.apply(window, a); };
  });
  function wrapTg() {
    try {
      var W = window.Telegram && Telegram.WebApp;
      if (!W || W.__i18n) return;
      W.__i18n = 1;
      ["showAlert", "showConfirm"].forEach(function (f) {
        var o = W[f]; if (typeof o !== "function") return;
        W[f] = function (t) { var a = Array.prototype.slice.call(arguments); if (on() && typeof t === "string") a[0] = tr(t); return o.apply(W, a); };
      });
      var sp = W.showPopup;
      if (typeof sp === "function") W.showPopup = function (p) {
        if (on() && p) { p = Object.assign({}, p); if (p.title) p.title = tr(p.title); if (p.message) p.message = tr(p.message); if (Array.isArray(p.buttons)) p.buttons = p.buttons.map(function (b) { return b && b.text ? Object.assign({}, b, { text: tr(b.text) }) : b; }); }
        return sp.apply(W, [p].concat(Array.prototype.slice.call(arguments, 1)));
      };
    } catch (e) {}
  }

  window.I18N = { add: add, addPatterns: addPatterns, tr: function (s) { return on() ? tr(s) : s; }, setLang: setLang, walk: walk };

  function boot() {
    start();
    wrapTg();
    var sal = window.setAppLanguage;
    if (typeof sal === "function" && !sal.__i18n) {
      window.setAppLanguage = function (l) { var r = sal.apply(this, arguments); setLang(l); return r; };
      window.setAppLanguage.__i18n = 1;
    }
    try { document.documentElement.lang = on() ? "en" : "ru"; } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  window.addEventListener("load", function () { boot(); if (on()) walk(document.documentElement); });
})();
