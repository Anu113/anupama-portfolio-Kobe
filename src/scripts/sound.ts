// Page sound: the speaker button in the nav (Nav.astro) and the small
// sounds it unlocks. (It began as a Sound switch in the old dock's
// Preferences; the rules and sounds are unchanged.)
// Behaviour follows huyml.co's audio toggle:
//   - Off by default. Turning it on lasts for the tab's session, so it
//     survives moving between pages, but a reload starts off again.
//   - Safari always starts off (the reference does the same; its audio
//     unlock rules make a remembered "on" unreliable there).
//   - Nothing plays until the visitor turns it on.
// The sounds are synthesised with Web Audio rather than loaded as files:
// no assets to license or download, and each is well under a second.
//   tick   — unused (hover sound removed on request, 2026-11-13)
//   tap    — once as sound turns on, so the press is heard (turning
//            off is silent). Links no longer tap on click (2026-11-13).
//   theme  — switching Light/Dark: a ~100ms sine, falling toward Dark and
//            rising toward Light (was the old day/night button's tick)
//
// Six more, chosen on request (2026-11-17) from experiments/sound/, and the
// only other places with sound — any more would be overdoing it:
//   pluck   — /work archive rows on hover or focus (ArchiveList): a harp
//             string per row, a major pentatonic falling down the list, so a
//             sweep is a run that never clashes ("A · Harp")
//   key     — Moss typing a reply (AskBubble, AskMoss): a muted key click
//             every second letter ("C · Soft keys")
//   pin     — the Privacy before/after line crossing a pin under the
//             visitor's hand, brighter toward After ("A · Click"); its own
//             sway is silent
//   sand    — the word "pixel" breaking (PixelBreak), and a soft settle as it
//             lands back into type ("B · Sand")
//   detent  — the Beyond work ring passing a photo through the front while
//             thrown, dragged or turned by key, never on its idle drift
//             ("B · Metal detent")
//   count   — case-study numbers counting up (CaseNumbers): ticks that slow
//             with the count, then a soft landed note ("A · Counter")

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
  if (on) ctx()?.resume().then(() => playTap());
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

function envelope(a: AudioContext, peak: number, attack: number, release: number, t = a.currentTime) {
  const g = a.createGain();
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

// --- The six from experiments/sound ----------------------------------------

/** A filtered noise hit, `delay` seconds from now. */
function hit(a: AudioContext, freq: number, q: number, peak: number, attack: number, release: number, type: BiquadFilterType = 'bandpass', delay = 0) {
  const t = a.currentTime + delay, len = attack + release + 0.03;
  const n = noise(a, len);
  const f = a.createBiquadFilter();
  f.type = type; f.frequency.value = freq; f.Q.value = q;
  n.connect(f); f.connect(envelope(a, peak, attack, release, t));
  n.start(t); n.stop(t + len);
}

/** A sine blip, `delay` seconds from now. */
function blip(a: AudioContext, freq: number, peak: number, attack: number, release: number, delay = 0, type: OscillatorType = 'sine') {
  const t = a.currentTime + delay;
  const o = a.createOscillator();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  o.connect(envelope(a, peak, attack, release, t));
  o.start(t); o.stop(t + attack + release + 0.02);
}

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

// Karplus–Strong string, rendered once per note and kept.
const strings = new Map<number, AudioBuffer>();
function stringBuffer(a: AudioContext, freq: number) {
  const key = Math.round(freq * 100);
  const have = strings.get(key);
  if (have) return have;
  const sr = a.sampleRate, n = Math.ceil(sr * 2.2), N = Math.round(sr / freq);
  const buf = a.createBuffer(1, n, sr), out = buf.getChannelData(0), ring = new Float32Array(N);
  for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
  for (let k = 0; k < 2; k++) for (let i = 1; i < N; i++) ring[i] = (ring[i] + ring[i - 1]) * 0.5;  // a softer attack
  for (let i = 0, p = 0; i < n; i++) {
    const cur = ring[p];
    ring[p] = (cur + ring[(p + 1) % N]) * 0.5 * 0.996;
    out[i] = cur;
    p = (p + 1) % N;
  }
  strings.set(key, buf);
  return buf;
}

const PENTA = [0, 2, 4, 7, 9];
let lastPluck = 0;
/** Archive row `index` of `count`: newest highest, oldest lowest. */
export function playPluck(index: number, count: number) {
  const a = ready(); if (!a) return;
  const now = performance.now();
  if (now - lastPluck < 45) return;   // a fast sweep is a run, not a buzz
  lastPluck = now;
  const step = Math.max(0, count - 1 - index);
  const midi = 57 + Math.floor(step / 5) * 12 + PENTA[step % 5];
  const s = a.createBufferSource();
  s.buffer = stringBuffer(a, hz(midi));
  const f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 5000;
  const g = a.createGain(); g.gain.value = 0.2;
  s.connect(f); f.connect(g);
  if (a.createStereoPanner) {
    const pan = a.createStereoPanner();
    pan.pan.value = (0.5 - index / Math.max(1, count - 1)) * 0.4;
    g.connect(pan); pan.connect(a.destination);
  } else g.connect(a.destination);
  s.start();
}

/** One muted key of Moss typing. */
export function playKey() {
  const a = ready(); if (!a) return;
  hit(a, 3200 + Math.random() * 800, 4, 0.05, 0.001, 0.025);
}

/** The before/after line crossing a pin; brighter going to After. */
export function playPin(toAfter: boolean) {
  const a = ready(); if (!a) return;
  hit(a, toAfter ? 2600 : 1400, 3, 0.1, 0.002, 0.04);
  blip(a, toAfter ? 1320 : 880, 0.03, 0.002, 0.05);
}

/** "pixel" breaking into dots: a dry scatter of grains. */
export function playSand() {
  const a = ready(); if (!a) return;
  for (let i = 0; i < 14; i++) hit(a, 5000 + Math.random() * 3000, 6, 0.04, 0.001, 0.015, 'bandpass', i * 0.012 + Math.random() * 0.01);
}

/** "pixel" landing back into type. */
export function playSettle() {
  const a = ready(); if (!a) return;
  hit(a, 2500, 0.8, 0.04, 0.08, 0.15, 'lowpass');
}

let lastDetent = 0;
/** The ring passing a photo through the front; `strength` 0–1 from its speed. */
export function playDetent(strength: number) {
  const a = ready(); if (!a) return;
  const now = performance.now();
  if (now - lastDetent < 40) return;   // ~25 a second at most on a hard throw
  lastDetent = now;
  const k = Math.min(1, 0.35 + strength * 0.65);
  hit(a, 4200, 8, 0.07 * k, 0.001, 0.03);
  blip(a, 2400, 0.008 * k, 0.001, 0.02, 0, 'square');
}

/** One tick of a number counting up. */
export function playCountTick() {
  const a = ready(); if (!a) return;
  hit(a, 2400, 5, 0.035, 0.001, 0.02);
}

/** The count landing. */
export function playCountLand() {
  const a = ready(); if (!a) return;
  blip(a, 880, 0.05, 0.004, 0.3);
  blip(a, 1320, 0.025, 0.004, 0.25, 0.02);
}
