// Shared bits for the three fintech-direction mocks:
// the direction switcher, a pixel guilloche renderer, and rolling digits.

export const IMG = '../../public/images/';

export function switcher(current) {
  const el = document.createElement('nav');
  el.className = 'dir-switch';
  el.setAttribute('aria-label', 'Mock direction');
  el.innerHTML = [['wallet', 'A · Wallet'], ['ledger', 'B · Ledger'], ['security', 'C · Security print']]
    .map(([k, l]) => `<a href="${k}.html"${k === current ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  document.body.appendChild(el);
  const css = document.createElement('style');
  css.textContent = `.dir-switch{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:999;display:flex;gap:2px;background:#111;border-radius:999px;padding:3px;font:500 12px/1 'Geist',system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.25)}
  .dir-switch a{color:#bbb;text-decoration:none;padding:9px 14px;border-radius:999px}
  .dir-switch a:hover{color:#fff}
  .dir-switch a[aria-current]{background:#fff;color:#000}`;
  document.head.appendChild(css);
}

/* Pixel guilloche: hypotrochoid bands plotted into a low-res grid,
   then drawn up with smoothing off, so every line is made of square pixels.
   progress 0..1 draws the curves in; returns nothing. */
export function guilloche(canvas, opts = {}) {
  if (opts.lines) return guillocheLines(canvas, opts);
  return guillocheDots(canvas, opts);
}

/* Engraved-line version: the same curves, but each step is joined to the
   last with a pixel line, and few enough turns that the lines stay apart. */
function guillocheLines(canvas, { cell = 3, color = '#000', alpha = 1, progress = 1, bands, cx = .5, cy = .5, scale = 1, turns = 6 } = {}) {
  const W = Math.round(canvas.offsetWidth || canvas.parentElement.offsetWidth), H = Math.round(canvas.offsetHeight || canvas.parentElement.offsetHeight);
  if (!W || !H) { requestAnimationFrame(() => guillocheLines(canvas, arguments[1])); return; }
  const gw = Math.ceil(W / cell), gh = Math.ceil(H / cell);
  const off = new OffscreenCanvas(gw, gh), o = off.getContext('2d');
  const img = o.createImageData(gw, gh), d = img.data;
  const [r, g, b] = hexRgb(color);
  const ox = gw * cx, oy = gh * cy, S = Math.min(gw, gh) * .5 * scale;
  const plot = (x, y) => { if (x < 0 || y < 0 || x >= gw || y >= gh) return; const j = (y * gw + x) * 4; d[j] = r; d[j + 1] = g; d[j + 2] = b; d[j + 3] = 255 * alpha; };
  const line = (x0, y0, x1, y1) => { // Bresenham
    let dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, e = dx + dy;
    for (;;) { plot(x0, y0); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; x0 += sx; } if (e2 <= dx) { e += dx; y0 += sy; } }
  };
  for (const bd of bands) {
    const total = 2400 * (bd.turns ?? turns), steps = Math.floor(total * progress);
    let px = null, py = null;
    for (let i = 0; i <= steps; i++) {
      const t = i / 2400 * Math.PI * 2, a = bd.R - bd.r;
      const x = a * Math.cos(t) + bd.d * Math.cos(a / bd.r * t);
      const y = a * Math.sin(t) - bd.d * Math.sin(a / bd.r * t);
      const cr = Math.cos(bd.rot || 0), sr = Math.sin(bd.rot || 0);
      const xx = x * cr - y * sr, yy = x * sr + y * cr;
      const qx = Math.round(ox + xx * S * bd.k), qy = Math.round(oy + yy * S * bd.k);
      if (px !== null) line(px, py, qx, qy);
      px = qx; py = qy;
    }
  }
  o.putImageData(img, 0, 0);
  canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
  const c = canvas.getContext('2d');
  c.imageSmoothingEnabled = false;
  c.drawImage(off, 0, 0, gw * cell * devicePixelRatio, gh * cell * devicePixelRatio);
}

function guillocheDots(canvas, { cell = 3, color = '#000', alpha = 1, progress = 1, bands, cx = .5, cy = .5, scale = 1 } = {}) {
  const box = canvas.getBoundingClientRect();
  const W = Math.round(canvas.offsetWidth || box.width || canvas.parentElement.offsetWidth), H = Math.round(canvas.offsetHeight || box.height || canvas.parentElement.offsetHeight);
  if (!W || !H) { requestAnimationFrame(() => guilloche(canvas, arguments[1])); return; }
  const gw = Math.ceil(W / cell), gh = Math.ceil(H / cell);
  const off = new OffscreenCanvas(gw, gh), o = off.getContext('2d');
  const img = o.createImageData(gw, gh), d = img.data;
  const [r, g, b] = hexRgb(color);
  const ox = gw * cx, oy = gh * cy, S = Math.min(gw, gh) * .5 * scale;
  bands = bands || [
    { R: 1, r: .23, d: .52, k: 1 }, { R: 1, r: .19, d: .38, k: .86 },
    { R: 1, r: .29, d: .62, k: .7 }, { R: 1, r: .17, d: .44, k: .55 },
  ];
  for (const bd of bands) {
    const steps = 9000 * progress;
    for (let i = 0; i < steps; i++) {
      const t = i / 9000 * Math.PI * 2 * 23;
      const a = bd.R - bd.r;
      const x = a * Math.cos(t) + bd.d * Math.cos(a / bd.r * t);
      const y = a * Math.sin(t) - bd.d * Math.sin(a / bd.r * t);
      const px = Math.round(ox + x * S * bd.k), py = Math.round(oy + y * S * bd.k);
      if (px < 0 || py < 0 || px >= gw || py >= gh) continue;
      const j = (py * gw + px) * 4;
      d[j] = r; d[j + 1] = g; d[j + 2] = b; d[j + 3] = 255 * alpha;
    }
  }
  o.putImageData(img, 0, 0);
  canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
  const c = canvas.getContext('2d');
  c.imageSmoothingEnabled = false;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(off, 0, 0, gw * cell * devicePixelRatio, gh * cell * devicePixelRatio);
}
function hexRgb(h) { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); }

/* Rolling digits: each digit is a column 0–9 that rolls to its value.
   Non-digits ("%", ",", "M") sit still. */
export function rolling(el, delay = 0) {
  const text = el.dataset.value || el.textContent;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  [...text].forEach((ch, i) => {
    if (!/\d/.test(ch)) { const s = document.createElement('span'); s.textContent = ch; s.setAttribute('aria-hidden', 'true'); el.appendChild(s); return; }
    const w = document.createElement('span'); w.className = 'roll'; w.setAttribute('aria-hidden', 'true');
    const col = document.createElement('span'); col.className = 'roll__col';
    col.innerHTML = '0123456789'.split('').map(n => `<span>${n}</span>`).join('');
    w.appendChild(col); el.appendChild(w);
    const go = () => { col.style.transform = `translateY(-${+ch * 10}%)`; };
    if (reduce) go(); else setTimeout(go, delay + i * 70);
  });
}
export const ROLL_CSS = `.roll{display:inline-block;height:1em;line-height:1em;overflow:hidden;vertical-align:top}
.roll__col{display:flex;flex-direction:column;transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.roll__col span{height:1em;line-height:1em}`;

export function onVisible(el, fn, threshold = .3) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fn(); io.disconnect(); } }), { threshold });
  io.observe(el);
}
