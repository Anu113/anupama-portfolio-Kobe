// Hover play — round 9 (design N). One phone per tile, on its first
// screen. Hover or focus the tile and the flow plays itself: a tap mark
// lands on the button a person would press (the same hotspots as the
// prototype, `hot` in proto.js), the next screen arrives the way it
// would on iOS (push, sheet, alert), and at the end it holds, then
// starts again. Leave and it fades back to the first screen.
// Why: the tile stays calm for a skimming recruiter; the flow is there
// for whoever lingers. Touch: a tap plays / stops. Reduced motion: no
// playback, the first screen only.

(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const T = { first: 700, read: 1300, tap: 520, settle: 480, hold: 1800 };
  // screens that need longer before the next tap (the scan plays first)
  const dwell = { 'sg-scan': 3300, 'pv-hub': 1100, 'pv-hub-down': 1400 };

  const top = (scr) => [...scr.querySelectorAll('.proto__layer')].pop();

  function lay(scr, key, kind) {
    const host = document.createElement('div');
    host.className = 'proto__layer';
    host.innerHTML = ui[key]();
    const old = top(scr);
    scr.appendChild(host);
    fitUI(scr);
    const mine = scr._turn = (scr._turn || 0) + 1;
    const done = () => { if (mine === scr._turn) scr.querySelectorAll('.proto__layer').forEach((l) => l !== host && l.remove()); };
    if (old && kind) { host.dataset.in = kind; if (kind === 'push') old.dataset.out = 'push'; setTimeout(done, kind === 'scroll' ? 1150 : 520); } else done();
  }

  function target(layer, key) {
    const h = hot[key];
    if (!h) return null;
    const el = typeof h === 'string' ? byText(layer, h) : layer.querySelector(h.sel);
    return el ? tappable(el) : null;
  }

  // a grey touch mark, as screen recordings show taps
  async function tap(scr, el, swipe) {
    const s = scr.getBoundingClientRect(), r = el.getBoundingClientRect();
    const k = s.width / 393;
    const dot = document.createElement('span');
    dot.className = swipe ? 'play__tap play__tap--swipe' : 'play__tap';
    const y = swipe ? r.top - s.top + r.height * .75 : r.top - s.top + r.height / 2;
    dot.style.cssText = `left:${r.left - s.left + r.width / 2}px;top:${y}px;--d:${Math.max(30 * k * 1.6, 18)}px;--dy:${-r.height * .45}px`;
    scr.appendChild(dot);
    if (!swipe) el.classList.add('is-pressed');
    await sleep(swipe ? 360 : T.tap);
    el.classList.remove('is-pressed');
    setTimeout(() => dot.remove(), 400);
  }

  function dots(media, i) { media.querySelectorAll('.play__steps i').forEach((d, j) => d.classList.toggle('on', j === i)); }

  async function play(media) {
    if (reduce.matches) return;
    const flow = cases[+media.dataset.play].ui;
    const scr = media.querySelector('.play');
    const tok = media._tok = (media._tok || 0) + 1;
    const alive = () => media._tok === tok;
    let i = media._i || 0;
    scr.classList.add('is-live');
    if (!i) lay(scr, flow[0], null); // fresh, so its own animation (the scan) plays from the start
    await sleep(dwell[flow[i]] || (i ? T.read : T.first));
    while (alive()) {
      const key = flow[i];
      const t = target(top(scr), key);
      if (i === flow.length - 1) {
        if (t && hot[key].toggle) { await tap(scr, t); t.classList.toggle('toggle--off'); }
        await sleep(T.hold); if (!alive()) return;
        i = 0; lay(scr, flow[0], 'fade'); dots(media, 0); media._i = 0;
        await sleep(dwell[flow[0]] || T.first); continue;
      }
      if (t) { await tap(scr, t, hot[key].swipe); if (!alive()) return; }
      i += 1; media._i = i;
      lay(scr, flow[i], enter[flow[i]] || 'push'); dots(media, i);
      await sleep(T.settle + (dwell[flow[i]] || T.read)); if (!alive()) return;
    }
  }

  function stop(media) {
    media._tok = (media._tok || 0) + 1;
    const scr = media.querySelector('.play');
    setTimeout(() => { if (!media._on) scr.classList.remove('is-live'); }, 250);
    if (media._i) { setTimeout(() => { if (!media._on) { lay(scr, cases[+media.dataset.play].ui[0], 'fade'); dots(media, 0); media._i = 0; } }, 250); }
  }

  const tileOf = (e) => e.target.closest && e.target.closest('[data-play]');
  // enter / leave on the tile itself (captured, since they don't bubble).
  // pointerover would fire again each time a new screen slides in under a
  // still pointer, and restart the flow.
  const start = (m) => { if (!m._on) { m._on = true; play(m); } };
  const end = (m) => { if (m._on && !m.matches(':hover') && document.activeElement !== m) { m._on = false; stop(m); } };
  const isTile = (e) => e.target.matches && e.target.matches('[data-play]') ? e.target : null;
  document.addEventListener('pointerenter', (e) => { const m = isTile(e); if (m && e.pointerType === 'mouse') start(m); }, true);
  document.addEventListener('pointerleave', (e) => { const m = isTile(e); if (m && e.pointerType === 'mouse') setTimeout(() => end(m)); }, true);
  document.addEventListener('focusin', (e) => { const m = isTile(e); if (m) start(m); });
  document.addEventListener('focusout', (e) => { const m = isTile(e); if (m) setTimeout(() => end(m)); });
  document.addEventListener('click', (e) => {
    const m = tileOf(e);
    if (!m || matchMedia('(hover: hover)').matches) return;
    if (m._on) { m._on = false; stop(m); } else start(m);
  });
})();
