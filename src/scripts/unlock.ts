/* unlock.ts — the one passcode, shared by every gate on the site
   (SiteGate, LockedGate, CaseGate). Typed once anywhere, it unlocks the
   whole site and every locked case on this browser for
   `site.lock.rememberHours` (data/site.ts).

   The remembered unlock is an expiry time in localStorage, so a case
   opened in a new tab doesn't ask again. Base.astro reads the same key
   before first paint (UNLOCK_KEY must match there) and sets
   `data-unlocked` on <html>, which hides the frost on locked cards and
   keeps the site gate from ever showing.

   Soft gate: the passcode and the gated pages ship to the browser. See
   the `lock` comment in data/site.ts. */
import { site } from '../data/site';

export const UNLOCK_KEY = 'site-unlocked';

export const passcodeMatches = (value: string) =>
  value.trim().toLowerCase() === site.lock.passcode.trim().toLowerCase();

export function isUnlocked(): boolean {
  if ('unlocked' in document.documentElement.dataset) return true;
  try {
    return Number(localStorage.getItem(UNLOCK_KEY)) > Date.now();
  } catch {
    return false;
  }
}

/** Remember the unlock, mark the page, and tell every gate on it. */
export function unlock() {
  try {
    localStorage.setItem(UNLOCK_KEY, String(Date.now() + site.lock.rememberHours * 3_600_000));
  } catch {
    /* Storage can be unavailable (private browsing): this page still
       unlocks, it just won't be remembered. */
  }
  document.documentElement.dataset.unlocked = '';
  dispatchEvent(new CustomEvent('site:unlocked'));
}

/** Run `fn` now if already unlocked, otherwise as soon as any gate unlocks. */
export function onUnlocked(fn: () => void) {
  if (isUnlocked()) fn();
  else addEventListener('site:unlocked', fn, { once: true });
}
