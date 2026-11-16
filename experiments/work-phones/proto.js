// Prototype — round 8. Click a tile and its flow opens on one large
// iPhone. Each screen's real button moves on (its "hotspot"); back
// arrows and Cancel / Not now / No thanks / Don't allow go back. A click
// anywhere else shows where to tap, as Figma does. Pushes slide like
// iOS; sheets rise and alerts pop over the screen they sit on.
// Keyboard: Tab to a control, Enter or Space; arrow keys step; Escape
// closes (native <dialog>). Reduced motion: screens swap instantly.

// The control that moves each screen on: matched by its words, or a
// selector. null = the flow ends here.
const hot = {
  'pv-shopping': 'Review your settings', 'pv-hub': { sel: '.pvhub', swipe: true, label: 'Scroll down' }, 'pv-hub-down': null,
  'id-steps': 'Agree and continue', 'id-scan': 'I’m ready', 'id-camera': 'OK',
  'ads-privacy': 'Start checkup', 'ads-checkup': 'Allow', 'ads-prefs': { sel: '.toggle', toggle: true, label: 'Share my info with ad partners' },
  'debit-intro': 'Continue', 'debit-confirm': 'Continue', 'debit-setup': null,
  'sg-scan': 'View cart', 'sg-cart': 'Check out', 'sg-finish': 'Scan QR code',
  'ch-setup': 'Chase Pay', 'ch-benefits': 'Link Chase Pay', 'ch-settings': null,
};
// how each screen arrives: push (slide from the right), sheet, alert
const enter = { 'pv-hub-down': 'scroll', 'ads-checkup': 'sheet', 'id-camera': 'alert' };
const BACK_WORDS = ['Cancel', 'Not now', 'No thanks', 'Don’t allow'];

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const byText = (root, t) => [...root.querySelectorAll('*')].find((el) => el.children.length < 3 && el.textContent.trim() === t);
const tappable = (el) => el.closest('.btn, .row, .card, .link, .alert__a span, .toggle') || el;

const dlg = document.createElement('dialog');
dlg.className = 'proto';
dlg.setAttribute('aria-labelledby', 'proto-title');
dlg.innerHTML = `
  <div class="proto__head">
    <p class="proto__co mono" id="proto-co"></p>
    <h2 class="proto__title" id="proto-title"></h2>
  </div>
  <div class="proto__phone"></div>
  <div class="proto__bar">
    <button type="button" class="proto__btn" data-a="back" aria-label="Previous screen">‹</button>
    <span class="proto__count mono" aria-live="polite"></span>
    <button type="button" class="proto__btn" data-a="next" aria-label="Next screen">›</button>
    <button type="button" class="proto__btn proto__btn--text" data-a="restart">Restart</button>
  </div>
  <p class="proto__tip mono">Tap the screen as you would on a phone. Arrow keys step through.</p>
  <button type="button" class="proto__close" data-a="close" aria-label="Close prototype">×</button>`;
document.body.appendChild(dlg);

const phoneBox = dlg.querySelector('.proto__phone');
let flow = [], at = 0, opener = null, hintTimer = 0, turn = 0;

function frame() {
  phoneBox.innerHTML = '<div class="iphone"><i></i><i></i><i></i><i></i><div class="iphone__body"><div class="iphone__glass"><div class="iphone__screen proto__screen is-live"></div></div></div></div>';
  return phoneBox.querySelector('.proto__screen');
}

function layer(key) {
  const host = document.createElement('div');
  host.className = 'proto__layer';
  host.innerHTML = ui[key]();
  return host;
}

// Wire one screen: its hotspot and its back controls become buttons.
function wire(host, key) {
  const h = hot[key];
  let target = null;
  if (h) target = typeof h === 'string' ? byText(host, h) : host.querySelector(h.sel);
  if (target) target = tappable(target);
  if (target) {
    target.dataset.hot = h && h.toggle ? 'toggle' : 'next';
    target.setAttribute('role', h && h.toggle ? 'switch' : 'button');
    if (h && h.toggle) target.setAttribute('aria-checked', String(!target.classList.contains('toggle--off')));
    target.tabIndex = 0;
    target.setAttribute('aria-label', typeof h === 'string' ? h : h.label);
  }
  const backs = [...host.querySelectorAll('.nav > span:first-child')]
    .concat(BACK_WORDS.map((w) => byText(host, w)).filter(Boolean).map(tappable))
    .concat([...host.querySelectorAll('.sheet path[d^="M6 6l12"]')].map((p) => p.closest('span')));
  backs.forEach((b) => {
    if (!b || b === target || !b.innerHTML.trim()) return;
    b.dataset.hot = 'back'; b.setAttribute('role', 'button'); b.tabIndex = 0;
    if (!b.textContent.trim()) b.setAttribute('aria-label', 'Back');
  });
  // nothing else inside the screen takes focus
  host.querySelector('.ui').setAttribute('aria-label', `Screen ${flow.indexOf(key) + 1} of ${flow.length}`);
  host.querySelector('.ui').setAttribute('role', 'group');
  return target;
}

function count() {
  dlg.querySelector('.proto__count').textContent = `${at + 1} / ${flow.length}${at === flow.length - 1 ? ' · end of flow' : ''}`;
  dlg.querySelector('[data-a="back"]').disabled = at === 0;
  dlg.querySelector('[data-a="next"]').disabled = at === flow.length - 1;
}

function hint(host) {
  const t = host.querySelector('[data-hot="next"], [data-hot="toggle"]');
  if (!t) return;
  t.classList.remove('is-hint'); void t.offsetWidth; t.classList.add('is-hint');
}

function go(to, dir) {
  if (to < 0 || to >= flow.length || to === at && dir) return;
  const scr = phoneBox.querySelector('.proto__screen');
  const old = scr.querySelector('.proto__layer:last-child');
  const key = flow[to];
  const host = layer(key);
  scr.appendChild(host);
  fitUI(scr);
  wire(host, key);
  const kind = dir === 'back' ? 'back' : (enter[key] || 'push');
  // only the latest step may clear the stack: a fast second tap mustn't
  // let the first step's animation end wipe the screen that replaced it
  const mine = ++turn;
  const done = () => {
    if (mine !== turn) return;
    scr.querySelectorAll('.proto__layer').forEach((l) => { if (l !== host) l.remove(); else { delete l.dataset.in; } });
  };
  at = to; count();
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => hint(host), 4000);
  if (!old || reduce.matches) return done();
  host.dataset.in = kind; old.dataset.out = kind;
  host.addEventListener('animationend', (e) => { if (e.target === host) done(); });
  setTimeout(done, 700); // in case the animation never reports (hidden tab)
}

function open(c, from) {
  opener = from;
  flow = c.ui;
  dlg.querySelector('#proto-co').textContent = c.co;
  dlg.querySelector('#proto-title').textContent = c.title;
  frame();
  at = 0;
  dlg.showModal();
  go(0);
  dlg.querySelector('[data-a="close"]').focus();
}

dlg.addEventListener('click', (e) => {
  const a = e.target.closest('[data-a]');
  if (a) {
    ({ back: () => go(at - 1, 'back'), next: () => go(at + 1, 'next'), restart: () => go(0, 'back'), close: () => dlg.close() })[a.dataset.a]();
    return;
  }
  if (e.target === dlg) return dlg.close(); // click on the scrim
  const h = e.target.closest('[data-hot]');
  const host = e.target.closest('.proto__layer');
  if (!host) return;
  if (!h) return hint(host);
  if (h.dataset.hot === 'next') at < flow.length - 1 ? go(at + 1, 'next') : hint(host);
  if (h.dataset.hot === 'back') go(at - 1, 'back');
  if (h.dataset.hot === 'toggle') { h.classList.toggle('toggle--off'); h.setAttribute('aria-checked', String(!h.classList.contains('toggle--off'))); }
});
dlg.addEventListener('keydown', (e) => {
  const h = e.target.closest && e.target.closest('[data-hot]');
  if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); h.click(); return; }
  if (e.key === 'ArrowRight') { e.stopPropagation(); go(at + 1, 'next'); }
  if (e.key === 'ArrowLeft') { e.stopPropagation(); go(at - 1, 'back'); }
});
dlg.addEventListener('close', () => { turn++; clearTimeout(hintTimer); phoneBox.innerHTML = ''; opener && opener.focus(); });

// tiles call this
window.openProto = (i, btn) => open(cases[i], btn);
