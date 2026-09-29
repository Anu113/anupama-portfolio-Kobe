// Page sound: the Sound switch in the dock's Preferences (Dock.astro) and
// the small sounds it unlocks. Behaviour follows huyml.co's audio toggle:
//   - Off by default. Turning it on lasts for the tab's session, so it
//     survives moving between pages, but a reload starts off again.
//   - Safari always starts off (the reference does the same; its audio
//     unlock rules make a remembered "on" unreliable there).
//   - Nothing plays until the visitor turns it on.
// The sounds are synthesised with Web Audio rather than loaded as files:
// no assets to license or download, and each is well under a second.
//   tick   — hovering the name or a dock item
//   tap    — clicking the name or a dock item
//   theme  — switching Light/Dark: a ~100ms sine, falling toward Dark and
//            rising toward Light (was the old day/night button's tick)

const KEY = 'page-sound:enabled';
const CHANGE = 'page-sound:change';

const isSafari = /^((?!chrome|chromium|android|crios|fxios|edgios).)*safari/i.test(navigator.userAgent);
const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
try {
  if (isSafari || nav?.type === 'reload') sessionStorage.removeItem(KEY);
} catch {}

let on = false;
try { on = sessionStorage.getItem(KEY) === 'true'; } catch {}
document.documentElement.dataset.pageSoundOn = String(on);

export const isSoundOn = () => on;

export function setSoundOn(next: boolean) {
  on = next;
  try { sessionStorage.setItem(KEY, String(on)); } catch {}
  document.documentElement.dataset.pageSoundOn = String(on);
  if (on) ctx()?.resume();
  dispatchEvent(new CustomEvent(CHANGE, { detail: { soundOn: on } }));
}

export function onSoundChange(fn: (on: boolean) => void) {
  addEventListener(CHANGE, (e) => fn((e as CustomEvent).detail.soundOn));
}

// --- Synthesis ------------------------------------------------------------
let ac: AudioContext | null = null;
function ctx() {
  if (!ac) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ac = new AC();
  }
  return ac;
}

// Browsers keep an AudioContext suspended until a click or key press, so
// wake it on the first one after a page load when sound is already on.
const wake = () => { if (on) ctx()?.resume(); };
addEventListener('pointerdown', wake, { once: true, capture: true });
addEventListener('keydown', wake, { once: true, capture: true });

function noise(a: AudioContext, seconds: number) {
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * seconds), a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource();
  src.buffer = buf;
  return src;
}

function envelope(a: AudioContext, peak: number, attack: number, release: number) {
  const g = a.createGain();
  const t = a.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  g.connect(a.destination);
  return g;
}

function ready() {
  if (!on) return null;
  const a = ctx();
  if (!a || a.state !== 'running') return null;
  return a;
}

/** Soft wooden tick, ~70ms. */
export function playTick() {
  const a = ready(); if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(1500, t);
  o.frequency.exponentialRampToValueAtTime(620, t + 0.06);
  o.connect(envelope(a, 0.16, 0.003, 0.07));
  o.start(t); o.stop(t + 0.09);
}

/** Muted tap, ~120ms: a short band of filtered noise. */
export function playTap() {
  const a = ready(); if (!a) return;
  const t = a.currentTime;
  const n = noise(a, 0.15);
  const f = a.createBiquadFilter();
  f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 1.2;
  n.connect(f); f.connect(envelope(a, 0.12, 0.004, 0.11));
  n.start(t); n.stop(t + 0.15);
}

/** Theme switch: ~100ms sine, pitch falling toward Dark, rising toward Light. */
export function playThemeTone(toDarker: boolean) {
  const a = ready(); if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(toDarker ? 1046 : 659, t);
  o.frequency.exponentialRampToValueAtTime(toDarker ? 523 : 1318, t + 0.07);
  o.connect(envelope(a, 0.05, 0.006, 0.085));
  o.start(t); o.stop(t + 0.1);
}
