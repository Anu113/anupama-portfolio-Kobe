/* work-play.ts — the /work hover play (WorkStage.astro).

   At rest a tile's iPhone shows its flow's first screen. Hover the card,
   or tab to it, and the flow plays: a grey touch mark lands where a
   person would press (or swipes up, on a screen that scrolls), the next
   screen arrives the way iOS brings it — pushed in from the right, a
   sheet rising, an alert popping, or the page scrolling — and on the
   last screen it holds, then starts again. Leave and it fades back to
   the first screen. Scan & Go's first screen plays its own scan while
   live (CSS, `.is-live`).

   Why: the grid stays calm for a recruiter skimming it; whoever pauses
   on a case sees the product working, without leaving the page.

   Enter/leave are listened for on the card itself: pointerover would
   fire again each time a new screen slid in under a still pointer and
   restart the flow. Nothing plays under reduced motion; touch screens
   keep the still first screen (a tap there opens the case). Images are
   fetched when the tile comes near the screen, not before.

   The home page's Privacy card plays the same flow in its own phone,
   with no hover: `autoPlay` starts and stops it on the card's
   phone:play / phone:pause (ProjectCard.astro), and it loops while on. */
import { layerHtml } from './work-play-layer';
import { cssMs } from './css-time';
import type { Play, PlayStep } from '../data/workPlay';

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// The flow inside `scr` (the element that holds the screen layers), with start and stop.
function flow(scr: HTMLElement, play: Play, dots: HTMLElement[] = []) {
  const steps = play.steps;
  const T = {
    first: cssMs('--work-first', 600), read: cssMs('--work-read', 1300), hold: cssMs('--work-hold', 1800),
    push: cssMs('--dur-work-push', 420), sheet: cssMs('--dur-work-sheet', 460),
    scroll: cssMs('--dur-work-scroll', 1100), fade: cssMs('--dur-work-fade', 360), tap: cssMs('--dur-work-tap', 900),
  };
  let on = false, tok = 0, at = 0, turn = 0;

  // fetch the rest of the flow once the tile is near
  new IntersectionObserver((es, io) => {
    if (!es.some((e) => e.isIntersecting)) return;
    io.disconnect();
    for (const s of steps) for (const u of [s.src, s.over, s.bar, s.scan?.sheet, s.scan?.bar]) if (u) new Image().src = u;
  }, { rootMargin: '400px' }).observe(scr);

  const top = () => [...scr.querySelectorAll<HTMLElement>('.wp-layer')].pop()!;
  const setDot = (i: number) => dots.forEach((d, j) => d.classList.toggle('on', j === i));

  function lay(s: PlayStep, kind: string | null) {
    const old = top();
    scr.insertAdjacentHTML('beforeend', layerHtml(s, true));
    const host = top();
    const mine = ++turn;
    const done = () => { if (mine === turn) scr.querySelectorAll('.wp-layer').forEach((l) => l !== host && l.remove()); };
    if (!old || !kind) return done();
    host.dataset.in = kind;
    if (kind === 'push') old.dataset.out = 'push';
    setTimeout(done, (kind === 'scroll' ? T.scroll : kind === 'push' ? T.push : T.sheet) + 60);
  }

  async function tap(p: { x: number; y: number }, swipe = false) {
    const m = document.createElement('span');
    m.className = swipe ? 'wp-tap wp-tap--swipe' : 'wp-tap';
    m.style.left = `${p.x}%`; m.style.top = `${p.y}%`;
    scr.appendChild(m);
    setTimeout(() => m.remove(), T.tap + 100);
    await sleep(swipe ? T.tap * 0.4 : T.tap * 0.55);
  }

  async function run() {
    const me = ++tok;
    const alive = () => tok === me && on;
    scr.classList.add('is-live');
    if (at === 0) lay(steps[0], null); // fresh, so its own animation (the scan) starts over
    await sleep(steps[at].dwell ?? (at ? T.read : T.first));
    while (alive()) {
      const s = steps[at];
      if (at === steps.length - 1) {
        await sleep(T.hold); if (!alive()) return;
        at = 0; lay(steps[0], 'fade'); setDot(0);
        await sleep(steps[0].dwell ?? T.first); continue;
      }
      if (s.tap) await tap(s.tap);
      else if (s.swipe) await tap(s.swipe, true);
      if (!alive()) return;
      at += 1;
      lay(steps[at], steps[at].enter ?? 'push'); setDot(at);
      await sleep((steps[at].dwell ?? T.read) + T.push); if (!alive()) return;
    }
  }

  function start() {
    if (on || reduce.matches) return;
    on = true; run();
  }
  function stop() {
    if (!on) return;
    on = false; tok++;
    scr.classList.remove('is-live');
    if (at) { at = 0; lay(steps[0], 'fade'); setDot(0); }
  }
  return { start, stop };
}

function setup(stage: HTMLElement) {
  const play: Play = JSON.parse(stage.dataset.play!);
  const scr = stage.querySelector<HTMLElement>('.wp-screen')!;
  const dots = [...stage.querySelectorAll<HTMLElement>('.wp-dots i')];
  const card = (stage.closest('a') as HTMLElement) || stage;
  const { start, stop } = flow(scr, play, dots);
  const still = () => card.matches(':hover') || card.contains(document.activeElement);
  card.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') start(); });
  card.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') setTimeout(() => !still() && stop()); });
  card.addEventListener('focusin', () => start());
  card.addEventListener('focusout', () => setTimeout(() => !still() && stop()));
  reduce.addEventListener('change', () => reduce.matches && stop());
}

document.querySelectorAll<HTMLElement>('.wp-stage[data-play]').forEach(setup);

// Home page: the flow plays whenever its card says it may (on screen, tab visible, motion allowed).
export function autoPlay(scr: HTMLElement, play: Play, host: Element) {
  const { start, stop } = flow(scr, play);
  host.addEventListener('phone:play', start);
  host.addEventListener('phone:pause', stop);
}
