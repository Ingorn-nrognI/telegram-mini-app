/* Кости 21 и Покер 21 — клиент.
   Всё решает сервер (dice.js на сервере): места за столом, списание входа, все броски
   кубиков, очередь ходов, таймеры, победители и выплаты. Здесь только показ:
   состояние стола приходит событием dice:state, броски анимируются физикой
   (Dice3D.world) и ложатся ровно теми числами, которые выбросил сервер.
   Ботов нет — за столом только живые игроки. */
(function () {
  'use strict';
  var H = document.documentElement;
  var PHYS = !!window.Dice3D;
  var COLORS = ['#ff5d8f', '#ffb547', '#34d17f', '#8b5cf6', '#38bdf8', '#f472b6'], MECOL = '#34d6ff';
  var EMO = ['🔥', '😂', '😱', '👏', '🎲'];
  var ROOMS = [
    { id: 'd1', n: 'Стол', ic: '1' }, { id: 'd2', n: 'Стол', ic: '2' }, { id: 'd3', n: 'Стол', ic: '3' },
    { id: 'd4', n: 'Стол', ic: '4' }, { id: 'p1', n: 'Покер 21', pk: true }
  ];
  var INVITE = 'https://t.me/Im_LaserMarket_bot/LaserMarket?startapp=dt_';

  /* ---------- мелочи ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function n2(v) { return (Math.round((Number(v) || 0) * 100) / 100).toFixed(2); }
  function r2(v) { return Math.round((Number(v) || 0) * 100) / 100; }
  function nE(v) { return String(r2(v)); }
  function G() { return typeof CASE_GRAM_ICON_SVG !== 'undefined' ? CASE_GRAM_ICON_SVG : ''; }
  function gram(v, cls) { return '<span class="dv-g' + (cls ? ' ' + cls : '') + '"><span class="dv-gi">' + G() + '</span>' + v + '</span>'; }
  function avaInner(s) { try { return getScannerPlayerAvatarHtml({ name: s.name, avatar: s.avatar }); } catch (e) { return ''; } }
  function ava(s) {
    return '<span class="dv-av" style="--c:' + s.color + '">' + (avaInner(s) || '<span class="scanner-player-avatar">' + esc(String(s.name || '?')[0]) + '</span>') + '</span>';
  }
  var FACE = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
  function die(v, cls) {
    var h = '';
    for (var i = 0; i < 9; i++) h += '<i' + (FACE[v] && FACE[v].indexOf(i) >= 0 ? ' class="on"' : '') + '></i>';
    return '<span class="dv-die' + (cls ? ' ' + cls : '') + '">' + h + '</span>';
  }
  function sumA(a) { return a.reduce(function (x, y) { return x + y; }, 0); }
  function hap() { try { Telegram.WebApp.HapticFeedback.selectionChanged(); } catch (e) {} }
  function myAvatar() { try { return getCurrentPlayer().avatar || null; } catch (e) { return null; } }
  function toast(t) {
    var e = document.createElement('div');
    e.className = 'ro-toast';
    e.textContent = t;
    document.body.appendChild(e);
    setTimeout(function () { e.classList.add('on'); }, 20);
    setTimeout(function () { e.classList.remove('on'); setTimeout(function () { e.remove(); }, 400); }, 2600);
  }

  /* ---------- соединение ---------- */
  function sk() { try { return typeof _socket !== 'undefined' && _socket ? _socket : null; } catch (e) { return null; } }
  var bound = null;
  function bind() {
    var s = sk();
    if (!s) return false;
    if (bound === s) return true;
    bound = s;
    s.on('dice:state', onState);
    s.on('dice:emo', onEmo);
    s.on('dice:notice', function (n) { if (n && n.text) toast(n.text); });
    s.on('dice:closed', function (d) {
      if (!d || d.id !== TID || !isOpen()) return;
      toast('Стол закрыт');
      open('d1');
    });
    s.on('connect', function () { if (isOpen()) watch(TID); });
    return true;
  }
  function emit(ev, data, cb, quiet) {
    var s = sk();
    if (!s || !bind()) { if (!quiet) toast('Нет соединения с сервером'); if (cb) cb({ ok: false }); return; }
    s.emit(ev, data || {}, function (r) { if (cb) cb(r || { ok: false }); });
  }

  /* ---------- состояние ---------- */
  var TID = 'd1', LASTT = 'd1';
  var SV = null, OFF = 0;
  var A = { rid: null, shown: 0, rolling: null, owner: -1, sh: {}, ww: null };
  var EM = {}, INFO = null, BUSY = false;
  var root = null, sheetEl = null, layer = null, W3 = null, T = [], tick = null, uiKey = '';

  function now() { return Date.now() + OFF; }
  function later(fn, ms) { var t = setTimeout(function () { var k = T.indexOf(t); if (k >= 0) T.splice(k, 1); fn(); }, ms); T.push(t); return t; }
  function clearT() { T.forEach(clearTimeout); T = []; }
  function isOpen() { return !!root && root.style.display !== 'none' && H.classList.contains('dcv-open'); }

  function onState(st) {
    if (!st || !root || !isOpen() || st.id !== TID) return;
    OFF = Number(st.now || Date.now()) - Date.now();
    var prev = SV;
    SV = st;
    if (st.rid !== A.rid) {
      // новый раунд: анимируем раздачу, только если застали её начало; иначе показываем как есть
      var fresh = !!st.rid && st.phase === 'deal' && now() - Number(st.ds || 0) < 1500;
      A.rid = st.rid; A.shown = fresh ? 0 : st.log.length; A.rolling = null; A.owner = -1; A.sh = {};
      clearT();
      physClear();
      if (window.WinWin && st.rid) WinWin.hide();
    }
    if (prev && prev.me >= 0 && st.me < 0) INFO = null;
    // раунд за этим столом закончился — лента истории обновляется
    if (st.phase === 'result' && (!prev || prev.phase !== 'result' || prev.rid !== st.rid)) later(function () { ghLoad(true); }, 600);
    pump();
    render();
  }
  function onEmo(d) {
    if (!d || d.id !== TID || !isOpen()) return;
    EM[d.s] = d.x;
    render();
    later(function () { delete EM[d.s]; render(); }, 1800);
  }

  /* ---------- анимация бросков по логу сервера ---------- */
  function relOf(el) {
    var r = el.getBoundingClientRect(), R = root.getBoundingClientRect();
    return { x: r.left - R.left + r.width / 2, y: r.top - R.top + root.scrollTop + r.height / 2, w: r.width, h: r.height };
  }
  function world() {
    if (W3) return W3;
    W3 = Dice3D.world(layer, function () {
      var fe = root.querySelector('.kq1-felt');
      if (!fe) return { cx: -999, cy: -999, w: 10, h: 10, R: 5 };
      var r = relOf(fe);
      return { cx: r.x, cy: r.y, w: r.w, h: r.h, R: parseFloat(getComputedStyle(fe).borderTopLeftRadius) || r.h / 2 };
    }, 30);
    return W3;
  }
  function physClear() { if (W3) W3.clear(); A.owner = -1; }
  function drained() { return !!SV && !A.rolling && A.shown >= SV.log.length; }

  function throwFor(e) {
    var i = e[0];
    if (A.owner !== i) { physClear(); A.owner = i; }
    var card = root.querySelector('.kc[data-i="' + i + '"] .kca'), fe = root.querySelector('.kq1-felt');
    if (!card || !fe || !fe.offsetWidth) return Promise.resolve();
    var c = relOf(card), f = relOf(fe), W = world();
    var list = e[1].map(function (v, k) {
      return { x0: c.x + k * 10, y0: c.y, tx: f.x + (Math.random() - 0.5) * f.w * 0.45, ty: f.y + 16 + (Math.random() - 0.5) * f.h * 0.3, v: v };
    });
    return Promise.race([W.throwMany(list), new Promise(function (r) { setTimeout(r, 7000); })]);
  }
  function pump() {
    if (!SV || A.rolling) return;
    var L = SV.log, rid = A.rid;
    while (A.shown < L.length) {
      var e = L[A.shown];
      if (e[2] === 1 || e[2] === 2) {
        // раздача в покере: кубики открываются по одному
        A.rolling = { e: e, soft: true };
        later(function () { if (A.rid !== rid) return; A.rolling = null; A.shown++; render(); pump(); }, 260);
        return;
      }
      if (!PHYS || !layer || document.hidden || L.length - A.shown > 2) { A.shown++; continue; }
      A.rolling = { e: e };
      render();
      throwFor(e).then(function () {
        if (A.rid !== rid) return;
        A.rolling = null; A.shown++;
        render();
        pump();
      });
      return;
    }
  }

  /* ---------- модель для отрисовки ---------- */
  var ACT = { f: 'пас', k: 'чек', c: 'колл', r: 'рейз', a: 'ва-банк', s: 'хватит', b: 'перебор', w: '21!' };
  function secs(t) { return Math.max(0, Math.ceil((Number(t) - now()) / 1000)); }
  function vm() {
    var st = SV, dr = drained(), shown = {}, hidS = {}, moves = {}, pend = {};
    st.log.forEach(function (e, k) {
      var i = e[0];
      if (k < A.shown) {
        if (e[2] === 1) hidS[i] = e[1][0];
        else { shown[i] = (shown[i] || []).concat(e[1]); (moves[i] = moves[i] || []).push(e[1]); }
      } else pend[i] = true;
    });
    var act = st.phase !== 'wait' && st.phase !== 'gather';
    var nextSeat = A.rolling ? A.rolling.e[0] : (A.shown < st.log.length ? st.log[A.shown][0] : -1);
    var phase = st.phase;
    if (st.g === 'd') { if (phase === 'deal') phase = 'play'; if (phase === 'result' && !dr) phase = 'play'; }
    else if (!dr && phase !== 'wait' && phase !== 'gather') {
      // покер: пока не показаны все кубики, держим фазу, к которой они относятся
      var dealLeft = st.log.slice(A.shown).some(function (e) { return e[2] === 1 || e[2] === 2; });
      phase = dealLeft ? 'deal' : 'draw';
    }
    var S = {
      g: st.g, phase: phase, me: st.me, round: st.round, entry: st.e, rid: st.rid,
      dealing: st.phase === 'deal', rolling: !!A.rolling && !A.rolling.soft, lastN: A.rolling ? A.rolling.e[1].length : 0,
      turn: dr ? st.turn : (st.g === 'p' && (A.rolling ? A.rolling.e : st.log[A.shown] || [0, 0, 1])[2] ? -1 : nextSeat),
      timer: st.te > 0 && dr ? Math.min(30, secs(st.te)) : 30, tmOn: st.te > 0 && dr,
      cd: secs(st.pe), next: secs(st.pe),
      win: st.phase === 'result' && dr ? st.win : [], best: st.best, refund: st.phase === 'result' && dr && st.refund,
      pot: st.pot, cur: st.cur, raises: st.raises, betN: st.betN, maxR: st.maxR, rs: st.rs, ante: st.ante,
      emo: EM, info: INFO,
      hist: (st.hist || []).map(function (h, k) { return { name: h.n, avatar: h.a, color: COLORS[k % 6], sum: h.s, pot: h.p }; })
    };
    S.seats = st.seats.map(function (x, i) {
      if (!x) return null;
      var me = i === st.me, d = shown[i] || [];
      var s = { i: i, name: x.n, avatar: x.a, color: me ? MECOL : COLORS[i], me: me, inr: x.in, lv: x.lv, off: x.off, dice: d, moves: moves[i] || [], won: x.won || 0, pay: x.pay || 0, stake: { gram: st.e, gifts: [] } };
      var busy = !dr && (pend[i] || nextSeat === i);
      if (st.g === 'd') {
        s.sum = sumA(d);
        if (!x.in) s.st = act ? 'queue' : 'ready';
        else if (dr) s.st = x.st;
        else if (st.phase === 'deal') s.st = d.length && s.sum === 21 && !pend[i] ? 'b21' : 'wait';
        else if (s.sum > 21) s.st = 'bust';
        else if (s.sum === 21 && !busy) s.st = 'b21';
        else if (busy) s.st = 'turn';
        else s.st = x.st === 'win' || x.st === 'lose' ? 'stand' : (x.st === 'turn' ? 'wait' : x.st);
      } else {
        var see = me || (st.phase === 'result' && dr);
        s.hid = hidS[i] != null ? (see ? (x.h || hidS[i]) : 0) : (dr && x.h ? x.h : 0);
        s.hidOn = hidS[i] != null || (dr && x.h != null);
        s.see = see;
        s.stack = x.stk; s.inPot = x.ip; s.rb = x.rb;
        s.st = !x.in ? (act ? 'queue' : 'ready') : x.st;
        s.act = ACT[x.act] || '';
        if (busy) { if (s.st === 'bust') s.st = 'in'; s.act = ''; }
        if (!dr && st.phase === 'result' && (s.st === 'win' || s.st === 'lose')) s.st = 'in';
      }
      return s;
    });
    return S;
  }
  var S = null;

  /* ===================== КОСТИ 21: отрисовка ===================== */
  var STL = { ready: 'готов', wait: 'ждёт', turn: 'ходит', stand: 'хватит', bust: 'перебор', b21: '21!', win: 'победа', lose: '', queue: 'след. раунд' };
  function flag(s) { var t = STL[s.st] || ''; return t ? '<span class="dv-fl f-' + s.st + '">' + t + '</span>' : ''; }
  function nm(s) { return s.me ? 'Ты' : s.name; }
  function cur() { return S.turn >= 0 ? S.seats[S.turn] : null; }
  function emoH(i) { return S.emo[i] ? '<span class="dv-emo">' + S.emo[i] + '</span>' : ''; }
  function bankChip(cl) {
    var idle = S.phase === 'wait' || S.phase === 'gather';
    var B = S.g === 'p' ? (idle ? 0 : S.pot) : r2(S.entry * S.seats.filter(function (s) { return s && (idle || s.inr); }).length);
    return '<div class="kq-bank ' + (cl || '') + '"><small>банк</small>' + gram(n2(B), 'b') + '</div>';
  }
  function stake(st) { return '<span class="dv-sk k-gram">' + gram(n2(st.gram)) + '</span>'; }
  function seatC(s, i) {
    if (!s) return '<div class="kc free"><span class="kc0">+</span><small>свободно</small></div>';
    var on = S.turn === i && S.phase === 'play';
    var cl = 'kc ks-' + s.st + (s.me ? ' me' : '') + (on ? ' turn' : '') + ' kv4';
    var add = s.dice.length - (A.sh[i] || 0);
    A.sh[i] = s.dice.length;
    var dd = s.dice.slice().reverse().slice(0, 5).map(function (v, k) { return die(v, 'sm' + (add > 0 && k < add ? ' nw' : '')); }).join('');
    var tm = on && S.tmOn ? '<i class="kqt" data-tm style="--t:' + S.timer + '"></i>' : '';
    return '<div class="' + cl + '" data-i="' + i + '" style="--c:' + s.color + ';--p:' + (s.dice.length ? Math.min(1, s.sum / 21) : 0).toFixed(3) + '" onclick="dvInfo(' + i + ')">' + emoH(i) +
      '<span class="kca">' + ava(s) + tm + '</span><b class="nm kcn">' + esc(nm(s)) + '</b><span class="kcv">' + stake(s.stake) + '</span>' +
      '<span class="k4n"><b>' + (s.dice.length ? s.sum : '—') + '</b><span class="k4d' + (add > 0 && s.dice.length > add ? ' push' : '') + '" style="--n:' + Math.max(0, add) + '">' + (dd || '<em>' + (s.st === 'queue' ? 'след. раунд' : 'ждёт') + '</em>') + '</span></span></div>';
  }
  function stage() {
    var c = cur();
    if (S.phase === 'wait') return '<div class="rm-wt"><span>Ожидание игроков<i class="el"><i>.</i><i>.</i><i>.</i></i></span></div>';
    if (S.phase === 'gather') return '<div class="kq-st wait"><b class="kqcd">' + S.cd + '</b><small>до раздачи</small></div>';
    if (S.phase === 'result') {
      if (!S.win.length) return '<div class="kq-st res"><small>все перебрали — вход возвращён</small></div>';
      var w = S.seats[S.win[0]];
      return '<div class="kq-st res"><span class="kqwho">' + ava(w) + '<b>' + (S.win.length > 1 ? 'Ничья' : esc(nm(w))) + '</b></span><div class="kqtray">' + w.dice.map(function (v) { return die(v, 'kqd'); }).join('') + '</div><span class="sm win">' + w.sum + '</span></div>';
    }
    if (!c || (!c.dice.length && !S.rolling)) return '<div class="kq-st wait"><small>раздача…</small></div>';
    return '<div class="kq-st ph' + (c.sum > 21 ? ' bust' : c.sum === 21 ? ' b21' : '') + '" style="--c:' + c.color + '"><span class="kqwho">' + ava(c) + '<b>' + esc(c.me ? 'Твой бросок' : c.name) + '</b></span><span class="sm">' + (c.dice.length ? c.sum : '…') + '<small>/21</small></span></div>';
  }
  function tmr() { return '<div class="dv-tm" data-tm style="--t:' + S.timer + '"><i></i><span><b data-tmv>' + S.timer + '</b> с на ход</span></div>'; }
  function tmrIn() { return S.tmOn ? '<span class="dv-tmi" data-tm style="--t:' + S.timer + '"><b data-tmv>' + S.timer + '</b> с</span>' : ''; }
  function sitBtn(txt) { return '<button type="button" class="dv-btn main rm-sit" onclick="dvSit()">' + txt + ' · ' + n2(S.entry) + ' GRAM</button>'; }
  function seatCtrl() {
    var m = S.me >= 0 ? S.seats[S.me] : null;
    var playing = S.phase !== 'wait' && S.phase !== 'gather' && S.phase !== 'result';
    if (!m) return '<div class="dv-ctrl">' + sitBtn(playing ? 'Сесть на следующий раунд' : 'Сесть за стол') + '</div>';
    if (S.phase === 'result') return '<div class="dv-ctrl"><div class="dv-acts nx"><div class="dv-next"><i style="--n:' + S.next + '"></i><span>' + (m.lv ? 'Ты выйдешь через' : 'Новый раунд через') + ' <b>' + S.next + '</b> с</span></div>' + (m.lv ? '<button type="button" class="dv-btn ghost" onclick="dvStay()">Остаться</button>' : '<button type="button" class="dv-btn ghost" onclick="dvLeave()">Встать</button>') + '</div></div>';
    if (S.phase === 'wait') return '<div class="dv-ctrl"><div class="dv-acts"><div class="dv-info">Ждём ещё игроков…</div><button type="button" class="dv-btn ghost" onclick="dvLeave()">Встать</button></div></div>';
    if (S.phase === 'gather') return '<div class="dv-ctrl"><div class="dv-acts"><div class="dv-info">Старт через <b>' + S.cd + '</b> с</div><button type="button" class="dv-btn ghost" onclick="dvLeave()">Встать</button></div></div>';
    if (!m.inr) return '<div class="dv-ctrl"><div class="dv-acts"><div class="dv-info">Ты сядешь в следующем раунде</div><button type="button" class="dv-btn ghost" onclick="dvLeave()">Встать</button></div></div>';
    if (m.lv) return '<div class="dv-ctrl"><div class="dv-acts"><div class="dv-info">Ты выйдешь после раунда</div><button type="button" class="dv-btn ghost" onclick="dvStay()">Остаться</button></div></div>';
    return null;
  }
  function ctrl() {
    var sc = seatCtrl();
    if (sc) return sc;
    var c = cur();
    if (S.turn === S.me && S.tmOn && !S.rolling && !S.dealing) return '<div class="dv-ctrl"><div class="dv-acts my"><button type="button" class="dv-btn main" onclick="dvHit(1)">' + die(5, 'xs') + 'Ещё кубик</button><button type="button" class="dv-btn risk" onclick="dvHit(2)">Риск: 2 кубика</button><button type="button" class="dv-btn ghost" onclick="dvStand()">Хватит</button></div>' + tmr() + '</div>';
    return '<div class="dv-ctrl"><div class="dv-info">' + (c && !S.dealing ? 'Ходит <b>' + esc(nm(c)) + '</b>' + (c.me ? '' : ' · ' + tmrIn()) : 'Раздача…') + '</div></div>';
  }
  function emos() { return '<div class="dv-emos">' + EMO.map(function (x) { return '<button type="button" onclick="dvEmo(\'' + x + '\')">' + x + '</button>'; }).join('') + '</div>'; }
  function hist() {
    if (!GH.items.length) return '';
    var lab = window.mxDiceTableLabel || function (it) { return it.tableTitle || ''; };
    return '<div class="dv-hist"><small>История столов</small><div class="dv-hr">' + GH.items.map(function (it) {
      var res = it.results || [], w = res.filter(function (r) { return r.status === 'win'; })[0];
      var who = it.refunded || !w ? { name: '↩', color: '#94a3b8' } : { name: w.name, avatar: w.avatar, color: w.isMe ? MECOL : w.color };
      return '<span class="dv-hi' + (it.refunded || !w ? ' ref' : '') + '" onclick="dvRoundsAll(event)">' + ava(who) + '<b>' + (it.refunded || !w ? 'Все перебрали' : esc(w.name)) + '</b>' +
        '<span class="dv-hs">' + (it.refunded || !w ? '<small>возврат</small>' : gram('+' + n2(w.payout))) + '<small>' + esc(lab(it)) + '</small></span></span>';
    }).join('') + (GH.loading && GH.items.length ? '<span class="dv-hi dv-hl">…</span>' : '') + '</div></div>';
  }
  /* последние раунды всех столов Костей и Покера — подгружаются с сервера,
     при прокрутке ленты вправо догружаются более старые */
  var GH = { items: [], more: false, next: null, loading: false, seq: 0, at: 0 };
  function ghLoad(fresh) {
    if (GH.loading && !fresh) return;
    var seq = ++GH.seq;
    GH.loading = true;
    GH.at = Date.now();
    emit('dice:history', { tableId: 'all', before: fresh ? null : GH.next, limit: 20 }, function (r) {
      if (seq !== GH.seq) return;
      GH.loading = false;
      if (!r || !r.ok || !Array.isArray(r.items)) { render(); return; }
      if (fresh) {
        // свежие сверху; уже подгруженные старые не теряем
        var have = {};
        r.items.forEach(function (x) { have[x.roundId] = 1; });
        var old = GH.items.filter(function (x) { return !have[x.roundId]; });
        // старые оставляем, только если новая страница с ними стыкуется (без пропуска раундов)
        var keepOld = old.length > 0 && old.length < GH.items.length;
        GH.items = r.items.concat(keepOld ? old : []);
        if (!keepOld) { GH.more = !!r.more; GH.next = r.next; }
      } else {
        var seen = {};
        GH.items.forEach(function (x) { seen[x.roundId] = 1; });
        r.items.forEach(function (x) { if (!seen[x.roundId]) GH.items.push(x); });
        GH.more = !!r.more;
        if (r.next != null) GH.next = r.next;
      }
      render();
    }, true);
  }
  window.dvRoundsAll = function (e) { if (e && e.stopPropagation) e.stopPropagation(); try { if (typeof toggleScannerRoundsPanel === 'function') toggleScannerRoundsPanel(e); } catch (x) {} };
  function diceHtml() {
    function row(ix) { return '<div class="kc-row">' + ix.map(function (i) { return seatC(S.seats[i], i); }).join('') + '</div>'; }
    return '<div class="kq1">' + row([0, 1, 2]) + '<div class="kq-rail kq1-rail"><div class="kq-felt kq1-felt"><i class="kqlogo">21</i>' + bankChip() + stage() + '</div></div>' + row([5, 4, 3]) + '</div>' + ctrl() + emos() + hist();
  }
  function infoSheet() {
    var s = S.seats[S.info];
    if (!s) return '';
    var st = { ready: 'готов к игре', wait: 'ждёт хода', turn: 'сейчас ходит', stand: 'остановился', bust: 'перебор', b21: 'ровно 21', win: 'победил', lose: 'проиграл', queue: 'сядет в следующем раунде' }[s.st] || '';
    var run = 0, moves = s.moves.map(function (m, k) {
      var a = sumA(m);
      run += a;
      return '<div class="dv-mv' + (run > 21 ? ' x' : '') + '"><span class="n">' + (k === 0 ? 'раздача' : 'ход ' + k + (m.length > 1 ? ' · риск' : '')) + '</span><span class="d">' + m.map(function (v) { return die(v, 'sm'); }).join('') + '</span><b>' + (k ? '+' : '') + a + '</b><em>' + run + '</em></div>';
    }).join('');
    var pct = Math.min(1, s.sum / 21);
    return '<div class="dv-sheet" onclick="if(event.target===this)dvClose()"><div class="dv-sh"><i class="grab"></i><div class="dv-sh-h">' + ava(s) + '<span><b>' + esc(nm(s)) + '</b><small>место №' + (S.info + 1) + ' · ' + st + '</small></span><button type="button" onclick="dvClose()">✕</button></div>' +
      '<div class="dv-is"><div class="dv-is-sum" style="--c:' + s.color + ';--t:' + pct.toFixed(3) + '"><small>сумма</small><b>' + (s.dice.length ? s.sum : '—') + '</b><span class="dv-bar"><i style="width:' + (pct * 100).toFixed(0) + '%"></i></span><small>' + (s.dice.length ? (s.sum > 21 ? 'перебор на ' + (s.sum - 21) : 'до 21 осталось ' + (21 - s.sum)) : 'ещё не бросал') + '</small></div>' +
      '<div class="dv-is-st"><small>ставка · GRAM</small><b>' + gram(n2(S.entry), 'big') + '</b><small>за столом ' + S.seats.filter(Boolean).length + ' из 6</small></div></div>' +
      '<div class="dv-mvs"><small>броски</small>' + (moves || '<div class="dv-w">Броски появятся после раздачи</div>') + '</div></div></div>';
  }

  /* ===================== ПОКЕР 21: отрисовка ===================== */
  var PACT = { 'пас': 'f', 'чек': 'k', 'колл': 'c', 'рейз': 'r', 'ва-банк': 'a', 'хватит': 's', 'перебор': 'b', '21!': 'w' };
  function psum(p) { return p.hid + sumA(p.dice); }
  function pcard(i) {
    var p = S.seats[i];
    if (!p) return '<div class="kc kv4 free"><span class="kc0">+</span><small>свободно</small></div>';
    var on = S.turn === i && (S.phase === 'bet' || S.phase === 'draw'), st = p.st === 'allin' ? 'in' : p.st;
    var add = p.dice.length - (A.sh[i] || 0);
    A.sh[i] = p.dice.length;
    var dd = p.dice.slice().reverse().slice(0, 5).map(function (v, k) { return die(v, 'sm' + (add > 0 && k < add ? ' nw' : '')); }).join('');
    var hid = p.hidOn ? (p.see && p.hid ? die(p.hid, 'sm pk-hd' + (p.me && S.phase !== 'result' ? ' mine' : '')) : '<span class="dv-die sm pk-hd q">?</span>') : '';
    var sm = !p.hidOn ? '—' : (p.see && p.hid ? psum(p) : (p.dice.length ? sumA(p.dice) + '+?' : '?'));
    var pill = p.act ? '<em class="pk-a a-' + (PACT[p.act] || 'k') + '">' + p.act + (p.rb > 0 && S.phase === 'bet' && (p.act === 'рейз' || p.act === 'колл') ? ' ' + n2(p.rb) : '') + '</em>' : (p.st === 'queue' ? '<em class="pk-a">след. раунд</em>' : '');
    var tm = on && S.tmOn ? '<i class="kqt" data-tm style="--t:' + S.timer + '"></i>' : '';
    return '<div class="kc kv4 pk ks-' + st + (p.me ? ' me' : '') + (on ? ' turn' : '') + '" data-i="' + i + '" style="--c:' + p.color + '">' + emoH(i) + '<span class="kca">' + ava(p) + tm + '</span><b class="nm kcn">' + esc(nm(p)) + '</b>' +
      '<span class="kcv pk-v">' + (p.inr ? gram(n2(p.stack)) : gram(n2(S.entry))) + pill + '</span><span class="k4n"><b>' + sm + '</b>' + hid + '<span class="k4d' + (add > 0 && p.dice.length > add ? ' push' : '') + '" style="--n:' + Math.max(0, add) + '">' + dd + '</span></span></div>';
  }
  function pstage() {
    if (S.phase === 'wait') return '<div class="rm-wt"><span>Ожидание игроков<i class="el"><i>.</i><i>.</i><i>.</i></i></span></div>';
    if (S.phase === 'gather') return '<div class="kq-st wait"><b class="kqcd">' + S.cd + '</b><small>до раздачи</small></div>';
    if (S.phase === 'deal') return '<div class="kq-st wait"><small>раздача…</small></div>';
    if (S.phase === 'result') {
      if (S.refund || !S.win.length) return '<div class="kq-st res"><small>все перебрали — вклады возвращены</small></div>';
      var w = S.seats[S.win[0]];
      return '<div class="kq-st res"><span class="kqwho">' + ava(w) + '<b>' + (S.win.length > 1 ? 'Ничья' : esc(nm(w))) + '</b></span><div class="kqtray">' + (w.hid ? die(w.hid, 'kqd') : '') + w.dice.map(function (v) { return die(v, 'kqd'); }).join('') + '</div><span class="sm win">' + psum(w) + '</span></div>';
    }
    var c = S.turn >= 0 ? S.seats[S.turn] : null;
    var who = c ? '<span class="kqwho" style="--c:' + c.color + '">' + ava(c) + '<b>' + esc(c.me ? 'Твой ход' : c.name) + '</b></span>' : '';
    if (S.phase === 'bet') return '<div class="kq-st ph pk-b">' + who + '<span class="pk-ph"><small>торги · круг ' + S.betN + ' из 2</small><b>' + (S.cur > 0 ? 'ставка ' + n2(S.cur) : 'ставок нет') + '</b></span></div>';
    var see = c && c.see && c.hid, s = c ? (see ? psum(c) : sumA(c.dice) + '+?') : '';
    return '<div class="kq-st ph' + (see && psum(c) > 21 ? ' bust' : '') + '" style="--c:' + (c ? c.color : '#5eead4') + '">' + who + '<span class="sm">' + s + '<small>/21</small></span></div>';
  }
  function pctrl() {
    var sc = seatCtrl();
    var m = S.me >= 0 ? S.seats[S.me] : null;
    if (sc) {
      var back = m && S.phase === 'result' ? r2(S.refund ? m.pay : m.pay - m.won) : 0;
      if (back > 0) sc = sc.replace('<div class="dv-ctrl">', '<div class="dv-ctrl"><div class="pk-ret">' + (S.refund ? 'Вклад вернулся на баланс: ' : 'Неставленные фишки вернулись на баланс: ') + gram(n2(back), 'w') + '</div>');
      if (S.phase === 'gather' && m) sc = sc.replace('Старт через', 'Анте ' + n2(S.ante) + ' · старт через');
      return sc;
    }
    var mine = '<div class="pk-me"><span>Твои фишки ' + gram(n2(m.stack), 'w') + '</span><span>в банке ' + gram(n2(m.inPot)) + '</span></div>';
    if (S.turn === S.me && S.tmOn && S.phase === 'bet') {
      var call = r2(S.cur - m.rb), canR = S.raises < S.maxR;
      return '<div class="dv-ctrl pk-c">' + mine + '<div class="dv-acts"><button type="button" class="dv-btn ghost" onclick="pkAct(\'fold\')">Пас</button>' +
        (call > 0 ? '<button type="button" class="dv-btn main" onclick="pkAct(\'' + (call >= m.stack ? 'allin' : 'call') + '\')">' + (call >= m.stack ? 'Ва-банк ' + n2(m.stack) : 'Колл ' + n2(call)) + '</button>' : '<button type="button" class="dv-btn main" onclick="pkAct(\'check\')">Чек</button>') + '</div>' +
        '<div class="pk-rs">' + S.rs.map(function (x) {
          var dis = !canR || call + x >= m.stack;
          return '<button type="button"' + (dis ? ' disabled' : '') + ' onclick="pkAct(\'raise\',' + x + ')"><small>рейз</small>+' + n2(x) + '</button>';
        }).join('') + '<button type="button" class="ai" onclick="pkAct(\'allin\')"><small>ва-банк</small>' + n2(m.stack) + '</button></div>' + tmr() + '</div>';
    }
    if (S.turn === S.me && S.tmOn && S.phase === 'draw' && !S.rolling) return '<div class="dv-ctrl pk-c">' + mine + '<div class="dv-acts"><button type="button" class="dv-btn main" onclick="pkHit()">' + die(5, 'xs') + 'Ещё кубик</button><button type="button" class="dv-btn ghost" onclick="pkStand()">Хватит</button></div>' + tmr() + '</div>';
    var c = S.turn >= 0 ? S.seats[S.turn] : null, ph = S.phase === 'bet' ? 'Торги · ' : S.phase === 'draw' ? 'Добор · ' : '';
    return '<div class="dv-ctrl pk-c">' + mine + '<div class="dv-info">' + (c ? ph + (c.me ? 'твой бросок' : 'ходит <b>' + esc(c.name) + '</b> · ' + tmrIn()) : S.phase === 'deal' ? 'Раздача: 1 закрытый + 1 открытый кубик' : '…') + '</div></div>';
  }
  function pokerHtml() {
    function row(ix) { return '<div class="kc-row">' + ix.map(pcard).join('') + '</div>'; }
    return '<div class="kq1">' + row([0, 1, 2]) + '<div class="kq-rail kq1-rail"><div class="kq-felt kq1-felt"><i class="kqlogo">21</i>' + bankChip() + pstage() + '</div></div>' + row([5, 4, 3]) + '</div>' + pctrl() + emos() + hist();
  }

  /* ---------- окно победителя ---------- */
  function winWindow() {
    if (!window.WinWin || !S.win.length || A.ww === S.rid) return;
    A.ww = S.rid;
    var w = S.win.map(function (i) { return S.seats[i]; }), w0 = w[0];
    WinWin.show({
      title: w.length > 1 ? 'Ничья — банк делится' : 'Победитель',
      name: w.length > 2 ? w.length + ' игрока' : w.map(function (x) { return x.name; }).join(', '),
      color: w0.color,
      avaHtml: avaInner(w0),
      line: 'очки: <b style="color:#86efac">' + S.best + '</b> из 21',
      total: w0.won, gram: w0.won, gifts: [],
      stake: S.g === 'p' ? w0.inPot : S.entry
    });
  }

  /* ---------- шапка: столы и «Столы игроков» ---------- */
  var SPADE = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M12 2.2c-.5 0-.9.3-1.3.7C8.4 5.4 3.8 8.6 3.8 12.6c0 2.6 2 4.5 4.4 4.5 1.3 0 2.4-.5 3.1-1.3-.2 2-.9 3.6-2.6 4.9-.3.2-.1.7.3.7h6c.4 0 .6-.5.3-.7-1.7-1.3-2.4-2.9-2.6-4.9.7.8 1.8 1.3 3.1 1.3 2.4 0 4.4-1.9 4.4-4.5 0-4-4.6-7.2-6.9-9.7-.4-.4-.8-.7-1.3-.7z"/></svg>';
  var OWN_IC = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="9" r="2.6"/><path d="M15.6 14.3c2.6-.4 4.8 1 5.4 4.2"/></svg>';
  var LOCK = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  function ownBtn() {
    if (SV && !SV.fixed) return '<span class="ro-ic">' + OWN_IC + '</span><span class="ro-t"><b>«' + esc(SV.t) + '»</b><small>' + (SV.mine ? 'твой стол' : 'стол игрока') + ' · вход ' + n2(SV.e) + ' GRAM</small></span><span class="ro-plus" aria-hidden="true">⇄</span>';
    return '<span class="ro-ic">' + OWN_IC + '</span><span class="ro-t"><b>Столы игроков</b></span><span class="ro-plus" aria-hidden="true">+</span>';
  }
  function roomHead() {
    if (root._hd) return;
    root._hd = document.createElement('div');
    root._hd.className = 'dv-head rm-h';
    root._hd.innerHTML = '<div class="dv-ti"><span><b>Кости 21</b><i class="dv-q">?</i></span><small class="dv-rn2"></small></div><div class="rm-sw">' + ROOMS.map(function (r, k) {
      return '<button type="button" data-k="' + k + '" onclick="dvRoom(' + k + ')">' + (r.pk ? '<i class="ic">' + SPADE + '</i><span>' + r.n + '</span>' : '<span>' + r.n + '</span><i class="ic n">' + r.ic + '</i>') + '</button>';
    }).join('') + '</div>';
    root.insertBefore(root._hd, root.firstChild);
    root._ow = document.createElement('button');
    root._ow.type = 'button';
    root._ow.className = 'rm-own';
    root._ow.setAttribute('onclick', 'dvOwnOpen()');
    root.insertBefore(root._ow, root._hd.nextSibling);
  }
  function headUpd() {
    if (!root || !root._hd) return;
    root._hd.querySelectorAll('.rm-sw button').forEach(function (b) { b.classList.toggle('on', ROOMS[+b.dataset.k].id === TID); });
    var ob = ownBtn();
    if (root._ow._h !== ob) { root._ow.innerHTML = ob; root._ow._h = ob; }
    root._ow.classList.toggle('on', !!(SV && !SV.fixed));
    // номер раунда общий на все столы игры и выдаётся сервером только при старте раунда,
    // поэтому пока раунд не начался, номер не показываем (заранее он неизвестен)
    var sub = SV ? 'Вход ' + nE(SV.e) + ' GRAM' + (SV.phase !== 'wait' && SV.phase !== 'gather' && SV.round > 0 ? ' · №' + SV.round : '') : '';
    var e = root._hd.querySelector('.dv-rn2');
    if (e && e.textContent !== sub) e.textContent = sub;
  }

  /* ---------- отрисовка ---------- */
  function ensureRoot() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'dcv';
    sheetEl = document.createElement('div');
    sheetEl.id = 'dcvSheet';
    document.body.appendChild(sheetEl);
    (document.getElementById('menu') || document.body).appendChild(root);
    root._in = document.createElement('div');
    root.appendChild(root._in);
    root._pk = document.createElement('div');
    root._pk.className = 'rm-pk';
    root._pk.style.display = 'none';
    root.appendChild(root._pk);
    layer = document.createElement('div');
    layer.className = 'dv-phys';
    root.appendChild(layer);
    root.addEventListener('scroll', function (e) {
      var t = e.target;
      if (!t || !t.classList || !t.classList.contains('dv-hr')) return;
      if (GH.more && !GH.loading && t.scrollLeft + t.clientWidth >= t.scrollWidth - 200) { ghLoad(false); render(); }
    }, true);
    roomHead();
  }
  function render() {
    if (!root || !isOpen()) return;
    headUpd();
    var sc = root.scrollTop;
    if (!SV) {
      root._pk.style.display = 'none';
      root._in.style.display = '';
      root._in.innerHTML = '<div class="dv-in"><div class="rm-wt"><span>Загрузка стола<i class="el"><i>.</i><i>.</i><i>.</i></i></span></div></div>';
      return;
    }
    S = vm();
    var pk = SV.g === 'p';
    root.classList.toggle('pk-root', pk);
    var box = pk ? root._pk : root._in, other = pk ? root._in : root._pk;
    other.style.display = 'none';
    if (other.innerHTML) other.innerHTML = '';
    box.style.display = '';
    var hr = root.querySelector('.dv-hr'), hx = hr ? hr.scrollLeft : 0;
    box.innerHTML = '<div class="dv-in">' + (pk ? pokerHtml() : diceHtml()) + '</div>';
    if (hx) { hr = box.querySelector('.dv-hr'); if (hr) hr.scrollLeft = hx; }
    if (S.phase === 'result') {
      // итог: кубики со стола убираем (как раньше), окно победителя — один раз за раунд
      if (A.cl !== S.rid) { A.cl = S.rid; physClear(); }
      winWindow();
    }
    var sh = !pk && S.info != null && S.seats[S.info] ? infoSheet() : '';
    if (sheetEl.dataset.k !== sh) {
      var keep = !!sheetEl.innerHTML && !!sh;
      sheetEl.innerHTML = sh;
      sheetEl.dataset.k = sh;
      sheetEl.classList.toggle('keep', keep);
    }
    root.scrollTop = sc;
    uiKey = S.phase + '|' + (S.phase === 'gather' || S.phase === 'result' ? S.cd : '');
  }
  // раз в 250 мс: секунды таймера хода и обратные отсчёты
  function onTick() {
    if (!isOpen() || !SV) return;
    if (!document.hidden && !GH.loading && Date.now() - GH.at > 30000) ghLoad(true);
    var ph = S ? S.phase : '';
    var k = ph + '|' + (ph === 'gather' || ph === 'result' ? secs(SV.pe) : '');
    if (k !== uiKey) { render(); return; }
    var t = SV.te > 0 && drained() ? Math.min(30, secs(SV.te)) : 30;
    root.querySelectorAll('[data-tm]').forEach(function (el) {
      el.style.setProperty('--t', t);
      var x = el.querySelector('[data-tmv]');
      if (x && x.textContent !== String(t)) x.textContent = t;
    });
    idleTick();
  }

  /* ---------- кубики «для красоты», пока стол ждёт игроков ---------- */
  var idleBusy = false, idleAt = 0;
  function idleTick() {
    if (!PHYS || !layer || !SV || idleBusy || document.hidden) return;
    if (SV.phase !== 'wait' && SV.phase !== 'gather') return;
    if (Date.now() < idleAt) return;
    if (SV.phase === 'gather' && secs(SV.pe) < 5) return;
    var fe = root.querySelector('.kq1-felt');
    if (!fe || !fe.offsetWidth) return;
    physClear();
    idleBusy = true;
    var f = relOf(fe), side = Math.random() < 0.5 ? -1 : 1, list = [];
    for (var k = 0; k < 2; k++) list.push({ x0: f.x + side * f.w * 0.36, y0: f.y + (k - 0.5) * 30, tx: f.x - side * f.w * 0.1 + (Math.random() - 0.5) * 60, ty: f.y + (Math.random() - 0.5) * 40 });
    var done = function () { if (idleBusy) { idleBusy = false; idleAt = Date.now() + 1300; } };
    setTimeout(done, 4700);
    world().throwMany(list).then(done);
  }

  /* ---------- действия игрока ---------- */
  function act(a, x) {
    if (BUSY) return;
    BUSY = true;
    emit('dice:act', { a: a, x: x }, function (r) {
      BUSY = false;
      if (!r.ok && r.error) toast(r.error);
    });
    hap();
  }
  window.dvHit = function (n) { if (S && S.turn === S.me && S.tmOn) act(n === 2 ? 'risk' : 'hit'); };
  window.dvStand = function () { if (S && S.turn === S.me && S.tmOn) act('stand'); };
  window.pkAct = function (k, x) { if (S && S.turn === S.me && S.tmOn) act(k, x); };
  window.pkHit = function () { if (S && S.turn === S.me && S.tmOn) act('hit'); };
  window.pkStand = function () { if (S && S.turn === S.me && S.tmOn) act('stand'); };
  window.dvSit = function () {
    if (BUSY) return;
    BUSY = true;
    emit('dice:sit', { id: TID, avatar: myAvatar() }, function (r) {
      BUSY = false;
      if (!r.ok) { if (r.error) toast(r.error); return; }
      if (r.state) onState(r.state);
    });
    hap();
  };
  window.dvStay = window.dvSit;
  window.dvLeave = function () { emit('dice:leave', {}, function () {}); hap(); };
  window.dvEmo = function (x) { if (S && S.me >= 0) emit('dice:emo', { x: x }); };
  window.pkEmo = window.dvEmo;
  window.dvInfo = function (i) { if (S && S.g === 'd' && S.seats[i]) { INFO = i; render(); } };
  window.dvClose = function () { INFO = null; render(); };

  /* ---------- открыть / сменить / закрыть стол ---------- */
  function watch(id) {
    if (!bind()) { later(function () { if (isOpen() && TID === id) watch(id); }, 1000); return; }
    emit('dice:watch', { id: id }, function (r) {
      if (TID !== id || !isOpen()) return;
      if (!r.ok) {
        toast(r.error || 'Стол закрыт');
        if (id !== 'd1') open('d1');
        return;
      }
      onState(r.state);
    });
  }
  function open(id) {
    if (SV && SV.id !== id && SV.me >= 0) emit('dice:leave', {}, null, true);
    if (TID !== id || !SV) {
      TID = id; SV = null; INFO = null; A.rid = null; A.rolling = null; A.shown = 0; A.sh = {};
      clearT(); physClear();
      if (window.WinWin) WinWin.hide();
    }
    LASTT = id;
    render();
    watch(id);
    ghLoad(true);
  }
  window.dvRoom = function (k) { if (ROOMS[k] && ROOMS[k].id !== TID) { open(ROOMS[k].id); if (root) root.scrollTop = 0; } };
  window.dvHeadSub = function () {};
  window.__dice21 = { get SV() { return SV; }, A: A, get PHYS() { return PHYS; } };

  function tgBack(on) {
    try {
      if (on) syncAppBackButton({ forceShow: true, onClick: function () { window.dvCloseTable(); } });
      else syncAppBackButton();
    } catch (e) {}
  }
  window.dvOpenTable = function (entry, room) {
    ensureRoot();
    root.style.display = '';
    root.scrollTop = 0;
    H.classList.add('dz-open', 'dcv-open');
    try { setActiveBottomNav('pvp'); } catch (x) {}
    if (!tick) tick = setInterval(onTick, 250);
    var id = typeof room === 'string' ? room : (room != null && ROOMS[room] ? ROOMS[room].id : LASTT);
    TID = null;
    open(id);
    tgBack(true);
  };
  window.dvCloseTable = function () {
    if (!root) return;
    // за столом без игры — встаём; в идущем раунде сервер доиграет за нас и поднимет после итога
    if (SV && SV.me >= 0) emit('dice:leave', {}, null, true);
    emit('dice:unwatch', {}, null, true);
    clearT(); physClear();
    if (window.WinWin) WinWin.hide();
    if (sheetEl) { sheetEl.innerHTML = ''; sheetEl.dataset.k = ''; }
    if (tick) { clearInterval(tick); tick = null; }
    window.dvOwnClose();
    // окно «История раундов» стола закрываем вместе со столом
    try { if (typeof closeScannerRoundsPanel === 'function' && window.__roundsMode && window.__roundsMode.tableId) closeScannerRoundsPanel(); } catch (e) {}
    SV = null; S = null; INFO = null; A.rid = null;
    root.style.display = 'none';
    root.classList.remove('pk-root');
    H.classList.remove('dz-open', 'dcv-open');
    tgBack(false);
  };
  window.dvBack = function () { window.dvCloseTable(); };
  // для кнопки «История раундов» в верхней панели: какой стол сейчас открыт
  window.dvTableNow = function () {
    if (!isOpen()) return null;
    var r = ROOMS.filter(function (x) { return x.id === TID; })[0];
    return { id: TID, g: SV ? SV.g : (r && r.pk ? 'p' : 'd'), entry: SV ? SV.e : null, title: r ? (r.pk ? r.n : r.n + ' ' + r.ic) : null };
  };

  /* ---------- «Столы игроков»: список с сервера и создание своего ---------- */
  var OWN = { g: 'd', v: 'list', cg: 'd', ce: 1, ct: '', cl: 0, list: [], loading: false };
  var OWN_Q = [0.1, 0.5, 1, 3, 5, 10, 25];
  var OWN_ST = [0.1, 0.2, 0.25, 0.3, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10, 15, 20, 25, 50, 100];
  function ownEl() {
    var m = document.getElementById('rmOwn');
    if (m) return m;
    m = document.createElement('div');
    m.id = 'rmOwn';
    m.className = 'ro-ov';
    m.innerHTML = '<div class="ro-bg" onclick="dvOwnClose()"></div><div class="ro-sh" role="dialog" aria-modal="true" aria-label="Столы игроков"></div>';
    document.body.appendChild(m);
    return m;
  }
  function ownLoad() {
    OWN.loading = true;
    ownR();
    emit('dice:tables', {}, function (r) {
      OWN.loading = false;
      OWN.list = r.ok ? (r.tables || []).filter(function (t) { return !t.fixed; }) : [];
      ownR();
    });
  }
  window.dvOwnOpen = function () {
    var m = ownEl();
    OWN.v = 'list';
    if (SV) OWN.g = SV.g;
    ownLoad();
    requestAnimationFrame(function () { m.classList.add('on'); });
    hap();
  };
  window.dvOwnClose = function () { var m = document.getElementById('rmOwn'); if (m) m.classList.remove('on'); };
  window.dvOwnG = function (g) { OWN.g = g; hap(); ownR(); };
  window.dvOwnV = function (v) { OWN.v = v; if (v === 'new') OWN.cg = OWN.g; ownR(); };
  window.dvOwnCG = function (g) { OWN.cg = g; ownR(); };
  window.dvOwnCL = function (l) { OWN.cl = l === 'l' ? 1 : 0; ownR(); };
  window.dvOwnName = function (v) { OWN.ct = v; };
  function ownAmtOk() { return OWN.ce >= 0.1 && OWN.ce <= 1000; }
  function ownNote() {
    var e = OWN.ce;
    // каждое предложение — отдельный кусок текста, чтобы его нашёл переводчик
    return '<span>Победитель забирает банк.</span> <span>Комиссия — как в сканере: от 20% до 2% в зависимости от банка, только с выигрыша сверх своей ставки.</span> ' +
      (OWN.cg === 'p' ? '<span>Анте ' + n2(e * 0.1) + ' · рейзы ' + n2(e * 0.1) + ' / ' + n2(e * 0.25) + ' / ' + n2(e * 0.5) + ' GRAM.</span> ' : '') + '<span>Стол закрывается, если 10 минут за ним никого нет.</span>';
  }
  function ownUpd() {
    var sh = document.querySelector('#rmOwn .ro-sh');
    if (!sh) return;
    sh.querySelectorAll('.ro-q button').forEach(function (b) { b.classList.toggle('on', +b.dataset.v === OWN.ce); });
    var mk = sh.querySelector('.ro-mk');
    if (mk) { mk.disabled = !ownAmtOk() || BUSY; mk.innerHTML = ownAmtOk() ? 'Создать стол · вход ' + n2(OWN.ce) + ' GRAM' : 'Вход от 0.1 до 1000 GRAM'; }
    var nt = sh.querySelector('.ro-note');
    if (nt) nt.innerHTML = ownNote();
  }
  window.dvOwnAmt = function (v) { var x = parseFloat(String(v).replace(',', '.')); OWN.ce = isFinite(x) ? Math.round(x * 100) / 100 : 0; ownUpd(); };
  window.dvOwnSet = function (v) { OWN.ce = v; var i = document.getElementById('roAmt'); if (i) i.value = v; hap(); ownUpd(); };
  window.dvOwnStep = function (d) {
    var c = OWN.ce, v = c;
    if (d > 0) v = OWN_ST.filter(function (x) { return x > c + 1e-9; })[0] || c;
    else { var l = OWN_ST.filter(function (x) { return x < c - 1e-9; }); v = l.length ? l[l.length - 1] : c; }
    window.dvOwnSet(v);
  };
  function ownSeg(cur, fn, items) {
    return '<div class="ro-seg">' + items.map(function (it) { return '<button type="button" class="' + (it[0] === cur ? 'on' : '') + '" onclick="' + fn + '(\'' + it[0] + '\')">' + it[1] + '</button>'; }).join('') + '</div>';
  }
  function ownR() {
    var sh = document.querySelector('#rmOwn .ro-sh');
    if (!sh) return;
    var GAMES = [['d', 'Кости 21'], ['p', '<i class="ro-sp">' + SPADE + '</i>Покер 21']];
    var X = '<button type="button" class="ro-x" aria-label="Закрыть" onclick="dvOwnClose()">×</button>';
    if (OWN.v === 'list') {
      var L = OWN.list.filter(function (r) { return r.g === OWN.g; }).sort(function (a, b) { return (b.mine ? 1 : 0) - (a.mine ? 1 : 0) || a.e - b.e; });
      sh.innerHTML = '<div class="ro-hd"><b>Столы игроков</b>' + X + '</div>' + ownSeg(OWN.g, 'dvOwnG', GAMES) + '<div class="ro-list">' +
        (OWN.loading && !OWN.list.length ? '<div class="ro-empty">Загрузка…</div>' : L.length ? L.map(function (r) {
          var full = r.p >= 6, here = r.id === TID;
          return '<div class="ro-row' + (full ? ' full' : '') + (r.mine ? ' mine' : '') + '"><span class="ro-av" style="--c:' + (r.mine ? MECOL : COLORS[r.id.charCodeAt(1) % 6]) + '">' + esc(String(r.h || '?').charAt(0).toUpperCase()) + '</span>' +
            '<span class="ro-rt"><b>' + (r.lock ? '<i class="ro-lk">' + LOCK + '</i>' : '') + esc(r.t) + '</b><small>' + (r.mine ? 'твой стол' : esc(r.h)) + ' · ' + r.p + ' из 6</small></span><span class="ro-en"><small>вход</small>' + gram(n2(r.e)) + '</span>' +
            // свой стол «по ссылке», за которым сидишь, — кнопка копирует приглашение
            (here && r.mine && r.lock ? '<button type="button" class="ro-go" onclick="dvOwnLink(\'' + r.id + '\')">Ссылка</button>' :
              '<button type="button" class="ro-go"' + (full && !here ? ' disabled' : '') + ' onclick="dvOwnJoin(\'' + r.id + '\')">' + (here ? 'Ты здесь' : full ? 'Мест нет' : 'Войти') + '</button>') + '</div>';
        }).join('') : '<div class="ro-empty">Пока никто не создал стол — будь первым</div>') +
        '</div><div class="ro-ft"><button type="button" class="ro-new" onclick="dvOwnV(\'new\')"><b>+</b> Создать свой стол</button></div>';
      return;
    }
    sh.innerHTML = '<div class="ro-hd"><button type="button" class="ro-bk" aria-label="Назад" onclick="dvOwnV(\'list\')">←</button><b>Новый стол</b>' + X + '</div>' +
      '<div class="ro-lb">Игра</div>' + ownSeg(OWN.cg, 'dvOwnCG', GAMES) +
      '<div class="ro-lb">Вход за стол</div><div class="ro-amt"><button type="button" aria-label="Меньше" onclick="dvOwnStep(-1)">−</button><label class="ro-val"><span class="ro-gi">' + G() + '</span><input id="roAmt" type="text" inputmode="decimal" autocomplete="off" value="' + OWN.ce + '" oninput="dvOwnAmt(this.value)"><small>GRAM</small></label><button type="button" aria-label="Больше" onclick="dvOwnStep(1)">+</button></div>' +
      '<div class="ro-q">' + OWN_Q.map(function (q) { return '<button type="button" data-v="' + q + '" class="' + (q === OWN.ce ? 'on' : '') + '" onclick="dvOwnSet(' + q + ')">' + q + '</button>'; }).join('') + '</div>' +
      '<div class="ro-lb">Название <i>— необязательно</i></div><input class="ro-in" id="roName" maxlength="24" autocomplete="off" placeholder="Стол ' + esc(meName()) + '" value="' + esc(OWN.ct) + '" oninput="dvOwnName(this.value)">' +
      '<div class="ro-lb">Кто может сесть</div>' + ownSeg(OWN.cl ? 'l' : 'o', 'dvOwnCL', [['o', 'Все игроки'], ['l', '<i class="ro-lk">' + LOCK + '</i>По ссылке']]) +
      '<div class="ro-note">' + ownNote() + '</div><div class="ro-ft"><button type="button" class="ro-new ro-mk" onclick="dvOwnCreate()"></button></div>';
    ownUpd();
  }
  function meName() { try { var p = getCurrentPlayer(); return p.name || 'Игрок'; } catch (e) { return 'Игрок'; } }
  function copyText(t) {
    try { if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return fallback(); }); } catch (e) {}
    return Promise.resolve(fallback());
    function fallback() {
      try { var i = document.createElement('textarea'); i.value = t; i.style.position = 'fixed'; i.style.opacity = '0'; document.body.appendChild(i); i.select(); var ok = document.execCommand('copy'); i.remove(); return ok; } catch (e) { return false; }
    }
  }
  window.dvOwnLink = function (id) {
    copyText(INVITE + id).then(function (ok) { toast(ok ? 'Ссылка-приглашение скопирована' : INVITE + id); });
  };
  window.dvOwnJoin = function (id) { window.dvOwnClose(); if (id !== TID) open(id); if (root) root.scrollTop = 0; };
  window.dvOwnCreate = function () {
    if (!ownAmtOk() || BUSY) return;
    BUSY = true;
    ownUpd();
    emit('dice:create', { g: OWN.cg, e: OWN.ce, t: (OWN.ct || '').trim(), lock: !!OWN.cl, avatar: myAvatar() }, function (r) {
      BUSY = false;
      ownUpd();
      if (!r.ok) {
        toast(r.error || 'Не удалось создать стол');
        if (r.id) window.dvOwnJoin(r.id);
        return;
      }
      OWN.ct = '';
      window.dvOwnClose();
      var lockOn = !!OWN.cl;
      open(r.id);
      if (r.state) onState(r.state);
      if (r.seated === false && r.error) toast(r.error);
      else if (lockOn) copyText(INVITE + r.id).then(function (ok) { toast(ok ? 'Стол создан · ссылка-приглашение скопирована' : 'Стол создан · ссылка: ' + INVITE + r.id); });
      else toast('Стол создан · он появился в списке у всех игроков');
    });
  };

  /* ---------- встраивание в приложение ---------- */
  window.addEventListener('load', function () {
    window.mxDiceOpen = function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
      try { window.mxDiceClose(); } catch (x) {}
      window.dvOpenTable();
    };
    window.mxDiceAt = function (amt, e) {
      if (e && e.stopPropagation) e.stopPropagation();
      window.dvOpenTable(null, Number(amt) > 1 ? 1 : 0);
    };
    window.mxDiceGo = function () {
      try { window.mxDiceClose(); } catch (e) {}
      window.dvOpenTable();
    };
    var nav = window.handleBottomNav;
    if (typeof nav === 'function') window.handleBottomNav = function () {
      if (H.classList.contains('dcv-open')) window.dvCloseTable();
      return nav.apply(this, arguments);
    };
    /* профиль из верхней панели: сначала закрываем стол, иначе он остаётся поверх профиля */
    var op = window.openProfileScreen, fromT = false;
    if (typeof op === 'function') window.openProfileScreen = function () {
      if (H.classList.contains('dcv-open')) { window.dvCloseTable(); fromT = true; }
      else if (typeof currentMenuView === 'undefined' || currentMenuView !== 'profile') fromT = false;
      return op.apply(this, arguments);
    };
    /* «назад» из профиля возвращает за тот же стол */
    var cp = window.closeProfileScreen;
    if (typeof cp === 'function') window.closeProfileScreen = function () {
      var r = cp.apply(this, arguments);
      if (fromT) { fromT = false; window.dvOpenTable(null, LASTT); }
      return r;
    };
    var bk = window.handleTelegramAppBack;
    if (typeof bk === 'function') window.handleTelegramAppBack = function () {
      if (H.classList.contains('dcv-open')) { window.dvBack(); return; }
      return bk.apply(this, arguments);
    };
    /* приглашение за стол: t.me/…?startapp=dt_<id> */
    var sp = '';
    try { sp = (Telegram.WebApp.initDataUnsafe || {}).start_param || ''; } catch (e) {}
    if (/^dt_[A-Za-z0-9]{1,20}$/.test(sp)) {
      var id = sp.slice(3), tries = 0;
      (function go() {
        var s = sk();
        if (s && s.connected) { window.dvOpenTable(null, id); return; }
        if (++tries < 60) setTimeout(go, 500);
      })();
    }
    bind();
  });
  document.addEventListener('visibilitychange', function () {
    // вернулись в приложение — догоняем стол без проигрывания пропущенных бросков
    if (!document.hidden && isOpen() && SV) { if (!A.rolling) { A.shown = SV.log.length; render(); } }
  });
})();
