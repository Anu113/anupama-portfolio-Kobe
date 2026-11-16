/* work-play-layer.ts — one screen of a /work hover play, as HTML.
   Shared by WorkStage.astro (the first screen, server-rendered so the
   tile has a picture without JS) and work-play.ts (every later screen).
   All images are decorative here: the card's link names the case, and
   the stage carries one label for the whole flow. */
import type { PlayStep } from '../data/workPlay';

const box = (b: { x: number; y: number; w: number; h: number }) =>
  `left:${b.x - b.w / 2}%;top:${b.y - b.h / 2}%;width:${b.w}%;height:${b.h}%`;
const img = (src: string, cls: string, eager = false) =>
  `<img class="${cls}" src="${src}" alt="" decoding="async"${eager ? '' : ' loading="lazy"'}>`;

export function layerHtml(s: PlayStep, eager = false): string {
  let inner = '';
  if (s.tall) {
    const shift = -((s.tall - 852) / s.tall) * 100;
    inner = `<div class="wp-tall${s.scrolled ? ' is-down' : ''}" style="--wp-shift:${shift.toFixed(2)}%">${img(s.src, 'wp-img', eager)}</div>`
      + (s.bar ? img(s.bar, 'wp-bar', eager) : '');
  } else {
    inner = img(s.src, 'wp-img', eager);
  }
  if (s.over) inner += img(s.over, `wp-over wp-over--${s.enter === 'alert' ? 'alert' : 'sheet'}`, eager);
  if (s.scan) {
    inner += `<span class="wp-band" style="${box(s.scan.frame)}"></span>`
      + `<span class="wp-hit" style="${box(s.scan.hit)}"></span><span class="wp-flash"></span>`
      + img(s.scan.sheet, 'wp-scan-sheet', eager) + img(s.scan.bar, 'wp-scan-bar', eager);
  }
  if (s.spinner) inner += `<span class="wp-spin" style="${box(s.spinner)}"></span>`;
  return `<div class="wp-layer">${inner}</div>`;
}
