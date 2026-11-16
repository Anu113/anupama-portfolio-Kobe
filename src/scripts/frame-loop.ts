/* frame-loop.ts — one requestAnimationFrame loop for everything that
   follows the pointer (CursorTrail, CursorLamp, HeroIllustration).

   Why: each of those used to run its own loop, ease by a fixed share
   per frame, and listen to its own event. So the trail, the lamp and
   the portrait moved twice as fast on a 120Hz screen as on 60Hz, a
   dropped frame showed as a jump, and the three could land a frame
   apart. Here they share one loop and one clock: every subscriber gets
   the same `dt` (ms since the last frame, capped so a stalled tab
   doesn't fling anything), in the order they subscribed.

   A subscriber returns true to keep running, false to sleep. Call
   wake(fn) again (from a pointer event, say) to start it. When nothing
   is awake the loop stops, so a still page costs nothing.

   ease(k, dt) turns a "share of the gap per 60fps frame" constant into
   the share for this frame's real length, so the feel tuned at 60Hz is
   the same at any refresh rate. */

type Sub = (dt: number, now: number) => boolean;

const awake = new Set<Sub>();
let raf = 0;
let last = 0;

const FRAME = 1000 / 60;
const MAX_DT = 50;   // after a stall, step as if ~3 frames passed, no more

const tick = (now: number) => {
  const dt = Math.min(MAX_DT, Math.max(0, now - last));
  last = now;
  for (const fn of [...awake]) {
    // One subscriber's error mustn't stop the others (or the loop):
    // it is put to sleep and the error reported, and the rest carry on.
    let keep = false;
    try { keep = fn(dt, now); } catch (err) { reportError(err); }
    if (!keep) awake.delete(fn);
  }
  raf = awake.size ? requestAnimationFrame(tick) : 0;
};

export function wake(fn: Sub) {
  awake.add(fn);
  if (!raf) {
    last = performance.now() - FRAME;   // first step is one ordinary frame
    raf = requestAnimationFrame(tick);
  }
}

export function sleep(fn: Sub) {
  awake.delete(fn);
}

/** Share of the remaining gap to close this frame, given k per 60fps frame. */
export function ease(k: number, dt: number) {
  return 1 - Math.pow(1 - k, dt / FRAME);
}
