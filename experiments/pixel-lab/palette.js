// Palettes for the pixel-lab mocks. Each: ground + four tones, light → dark.
// Peach is new; Clay is the site's accent; Oxblood is the home cards' line.
export const PALETTES = {
  peach:   { name: 'Peach',          ground: '#fffaf5', t: ['#fde6d6', '#f9c9a9', '#f0a07c', '#d9744f'], ink: '#2a1d17' },
  clay:    { name: 'Clay',           ground: '#fcf8f5', t: ['#f3d6ca', '#e3a68f', '#c86a4d', '#b4482a'], ink: '#26170f' },
  oxblood: { name: 'Oxblood',        ground: '#fcf8f7', t: ['#efd3cf', '#cf968f', '#93443a', '#5c1712'], ink: '#1f0d0b' },
  mix:     { name: 'Peach + oxblood',ground: '#fffaf5', t: ['#fde3d2', '#f4b897', '#b2533f', '#5c1712'], ink: '#24120e' },
  ink:     { name: 'Ink',            ground: '#f8f8f6', t: ['#e2e2de', '#b3b3ad', '#66665f', '#1d1d1b'], ink: '#111' },
};

let current = 'peach';
try { current = new URLSearchParams(location.search).get('p') || localStorage.getItem('pixel-lab-p') || 'peach'; } catch {}
if (!PALETTES[current]) current = 'peach';
const subs = new Set();
export const pal = () => PALETTES[current];
export const onPalette = fn => { subs.add(fn); fn(pal()); };

function apply() {
  const p = pal(), r = document.documentElement.style;
  r.setProperty('--ground', p.ground); r.setProperty('--ink', p.ink);
  p.t.forEach((c, i) => r.setProperty(`--t${i + 1}`, c));
  subs.forEach(fn => fn(p));
}

export function mountSwitcher(pages) {
  const bar = document.createElement('div');
  bar.className = 'lab-bar';
  bar.innerHTML = `
    <nav aria-label="Mock pages">${pages.map(([href, label, on]) => `<a href="${href}"${on ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <div role="group" aria-label="Palette">${Object.entries(PALETTES).map(([k, p]) =>
      `<button data-p="${k}" aria-pressed="${k === current}"><i style="background:${p.t[3]};box-shadow:inset -6px 0 0 ${p.t[1]}"></i>${p.name}</button>`).join('')}</div>`;
  document.body.appendChild(bar);
  bar.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
    current = b.dataset.p;
    try { localStorage.setItem('pixel-lab-p', current); } catch {}
    bar.querySelectorAll('[data-p]').forEach(x => x.setAttribute('aria-pressed', x === b));
    apply();
  });
  const css = document.createElement('style');
  css.textContent = `.lab-bar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:999;display:flex;gap:10px;align-items:center;background:#111;color:#ddd;border-radius:999px;padding:4px;font:500 12px/1 'Geist',system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.25);white-space:nowrap}
  .lab-bar nav,.lab-bar div{display:flex;gap:2px}
  .lab-bar a,.lab-bar button{all:unset;cursor:pointer;padding:9px 12px;border-radius:999px;display:flex;gap:6px;align-items:center;color:#bbb}
  .lab-bar a:hover,.lab-bar button:hover{color:#fff}
  .lab-bar a[aria-current],.lab-bar button[aria-pressed="true"]{background:#fff;color:#000}
  .lab-bar a:focus-visible,.lab-bar button:focus-visible{outline:2px solid #fff;outline-offset:2px}
  .lab-bar i{width:12px;height:12px;border-radius:3px}
  .lab-bar div{border-left:1px solid #333;padding-left:8px}`;
  document.head.appendChild(css);
  apply();
}

/* noise + dithering helpers */
export const hash = (x, y) => { const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return v - Math.floor(v); };
const sm = t => t * t * (3 - 2 * t);
export function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * sm(xf) + (c - a) * sm(yf) + (a - b - c + d) * sm(xf) * sm(yf);
}
export const fbm = (x, y, o = 3) => { let v = 0, a = .5, f = 1; for (let i = 0; i < o; i++) { v += noise(x * f, y * f) * a; a *= .5; f *= 2.03; } return v / (1 - Math.pow(.5, o)); };
export const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + .5) / 16);
export const bayer = (x, y) => BAYER[(y & 3) * 4 + (x & 3)];
export const hexRgb = h => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* a canvas that fills its box at a low resolution, drawn up pixelated */
export function pixelCanvas(canvas, cell) {
  const W = canvas.clientWidth, H = canvas.clientHeight;
  const w = Math.ceil(W / cell), h = Math.ceil(H / cell);
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  return { ctx, w, h, img: ctx.createImageData(w, h) };
}
