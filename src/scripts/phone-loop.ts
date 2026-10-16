/* phone-loop.ts — runs a home-page phone card's flow on its own.

   ProjectCard.astro decides when each card's phone may move (on screen,
   tab visible, no reduced motion) and tells the card's stage, `[data-phone]`, with a
   `phone:play` or `phone:pause` event. This loop listens for those and
   steps through `steps`: wait, act, wait, act… and round again.
   Pausing mid-wait starts that wait over on resume.

   Used by the screen sequences in ProjectCard and by the coded PayPal
   prototypes' autoplay mode. Outside a phone card (the case-study
   pages) there's no `[data-phone]`, so nothing runs. */
export type Step = [waitMs: number, act: () => void];

export function phoneLoop(el: Element, steps: Step[]) {
  const host = el.closest('[data-phone]');
  if (!host || steps.length === 0) return;
  let i = 0;
  let timer = 0;
  let playing = false;
  const schedule = () => {
    clearTimeout(timer);
    if (!playing) return;
    timer = window.setTimeout(() => {
      steps[i][1]();
      i = (i + 1) % steps.length;
      schedule();
    }, steps[i][0]);
  };
  host.addEventListener('phone:play', () => {
    if (playing) return;
    playing = true;
    schedule();
  });
  host.addEventListener('phone:pause', () => {
    playing = false;
    clearTimeout(timer);
  });
}
