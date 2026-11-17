/* smooth-scroll.ts — wheel and trackpad scrolls glide to a stop instead
   of halting on the last notch. Lenis (lenis.darkroom.engineering),
   added on request 2026-11-16, after the page "stopped dead" when the
   wheel stopped.

   Lenis moves the real document scroll (no transformed wrapper), so
   position: sticky, scroll listeners and IntersectionObservers all keep
   working. How far it eases is --scroll-glide in tokens.css: the share
   of the remaining distance closed per frame (lower glides longer).

   Left to the browser, untouched:
   - touch (syncTouch off), keyboard, the scrollbar;
   - wheels a component already took (defaultPrevented: the playground
     wall's sideways drag, the pan canvas);
   - inner boxes that scroll (Moss's panel, the About tabs, phone
     screens): allowNestedScroll, plus [data-lenis-prevent] by hand;
   - anything while a modal <dialog> is open (the About lightbox), or
     while the preloader is up (it holds the page at the hero).
   Off entirely under prefers-reduced-motion. In-page anchor links go
   through Lenis so they glide the same way. */

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | null = null;

const glide = () =>
  Number(getComputedStyle(document.documentElement).getPropertyValue('--scroll-glide')) || 0.1;

const start = () => {
  if (lenis || reduce.matches) return;
  lenis = new Lenis({
    lerp: glide(),
    smoothWheel: true,
    syncTouch: false,
    allowNestedScroll: true,
    anchors: true,
    autoRaf: true,
    virtualScroll: ({ event }) =>
      !event.defaultPrevented && !document.querySelector('dialog:modal') &&
      !('preloaderHold' in document.documentElement.dataset),
  });
};

const stop = () => {
  lenis?.destroy();
  lenis = null;
};

start();
reduce.addEventListener('change', () => (reduce.matches ? stop() : start()));
