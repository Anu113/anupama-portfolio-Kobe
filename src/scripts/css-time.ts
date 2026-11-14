/* css-time.ts — read a time token from tokens.css as milliseconds.

   The production build minifies CSS, and the minifier rewrites times to
   their shortest form: `1000ms` becomes `1s`, `650ms` becomes `.65s`.
   A plain parseFloat then reads seconds as milliseconds, and an animation
   meant to take a second takes one millisecond (it looks static on the
   live site while working in dev, where CSS isn't minified). Always read
   time tokens through this. */
export function cssMs(prop: string, fallback: number, el: Element = document.documentElement): number {
  const raw = getComputedStyle(el).getPropertyValue(prop).trim();
  const n = parseFloat(raw);
  if (!Number.isFinite(n)) return fallback;
  return /\ds$/.test(raw) ? n * 1000 : n; // "1s" / ".65s"; "650ms" stays
}
