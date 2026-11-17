// Loaded blocking in <head> so the option is set before first paint.
const OPTIONS = {
  0: ['Today', 'A straight cut: the new page simply replaces the old one.'],
  A: ['A · Dip', 'daneden.me: the old page fades and shrinks a hair (150ms), the new one fades in. The nav holds still.'],
  B: ['B · Rise', 'andreas.vision: the page swaps at once, then its parts rise 10px into place, one after another.'],
  C: ['C · Carry', 'A, plus the project’s colour block travels from the card into the case cover, and back.'],
  D: ['D · Wipe', 'After huyml.co’s curtain: the new page slides in over the old from the right.'],
};
const root = document.documentElement;
const t = localStorage.getItem('pt') || 'A';
root.dataset.t = t;
if (t === 'B' && sessionStorage.getItem('pt-nav')) root.classList.add('arrived');
sessionStorage.removeItem('pt-nav');

// Today: no transition at all.
addEventListener('pageswap', (e) => { if (root.dataset.t === '0') e.viewTransition?.skipTransition(); });
addEventListener('pagereveal', (e) => { if (root.dataset.t === '0') e.viewTransition?.skipTransition(); });

addEventListener('DOMContentLoaded', () => {
  // C: each project's colour block carries the same name on every page.
  if (t === 'C') document.querySelectorAll('[data-p]').forEach((el) => { el.style.viewTransitionName = 'p-' + el.dataset.p; });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && a.origin === location.origin) sessionStorage.setItem('pt-nav', '1');
  });

  const bar = document.createElement('div');
  bar.className = 'switch';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Page transition');
  const note = document.createElement('p');
  note.className = 'note';
  note.textContent = OPTIONS[t][1] + ' Click around the pages.';
  for (const [k, [label]] of Object.entries(OPTIONS)) {
    const b = document.createElement('button');
    b.textContent = label;
    b.setAttribute('aria-pressed', String(k === t));
    b.onclick = () => { localStorage.setItem('pt', k); location.reload(); };
    bar.append(b);
  }
  document.body.append(note, bar);

  // B: number the parts that rise, top to bottom.
  document.querySelectorAll('[data-rise]').forEach((el, i) => el.style.setProperty('--i', i));
});
