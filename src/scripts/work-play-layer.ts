/* work-play-layer.ts — one screen of a /work hover play, as HTML.
   Shared by WorkStage.astro (the first screen, server-rendered so the
   tile has a picture without JS) and work-play.ts (every later screen).
   All images are decorative here: the card's link names the case, and
   the stage carries one label for the whole flow. */
import type { PlayStep } from '../data/workPlay';

const box = (b: { x: number; y: number; w: number; h: number }) =>
  `left:${b.x - b.w / 2}%;top:${b.y - b.h / 2}%;width:${b.w}%;height:${b.h}%`;

/* The home page's Privacy card draws its phone smaller than a /work
   tile's (--phone-scale, 0.8: a 227px screen; 176px under 860px), so
   its screens also come rendered at that size, <name>-454.webp
   and -227.webp (2x and 1x screens)
   (scripts/work-play-render.mjs), and the browser picks by sizes. A
   786px screen squeezed to 454 pixels read as blurry. Pass HOME_SIZES
   only for a flow whose screens have -454 renders. */
export const HOME_SIZES = '(max-width: 860px) 176px, 227px';
export const srcsetFor = (src: string) =>
  `${src.replace(/\.webp$/, '-227.webp')} 227w, ${src.replace(/\.webp$/, '-454.webp')} 454w, ${src} 786w`;

const tag = (src: string, cls: string, eager: boolean, sizes?: string) =>
  `<img class="${cls}" src="${src}"${sizes ? ` srcset="${srcsetFor(src)}" sizes="${sizes}"` : ''} alt="" decoding="async"${eager ? '' : ' loading="lazy"'}>`;

export function layerHtml(s: PlayStep, eager = false, sizes?: string): string {
  const img = (src: string, cls: string) => tag(src, cls, eager, sizes);
  let inner = '';
  if (s.tall) {
    const shift = -((s.tall - 852) / s.tall) * 100;
    inner = `<div class="wp-tall${s.scrolled ? ' is-down' : ''}" style="--wp-shift:${shift.toFixed(2)}%">${img(s.src, 'wp-img')}</div>`
      + (s.bar ? img(s.bar, 'wp-bar') : '');
  } else {
    inner = img(s.src, 'wp-img');
  }
  if (s.over) inner += img(s.over, `wp-over wp-over--${s.enter === 'alert' ? 'alert' : 'sheet'}`);
  if (s.scan) {
    inner += `<span class="wp-band" style="${box(s.scan.frame)}"></span>`
      + `<span class="wp-hit" style="${box(s.scan.hit)}"></span><span class="wp-flash"></span>`
      + img(s.scan.sheet, 'wp-scan-sheet') + img(s.scan.bar, 'wp-scan-bar');
  }
  if (s.spinner) inner += `<span class="wp-spin" style="${box(s.spinner)}"></span>`;
  return `<div class="wp-layer">${inner}</div>`;
}
