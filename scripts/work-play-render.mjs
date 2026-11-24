// work-play-render.mjs — renders the redrawn case screens for the /work
// hover play (WorkPlay.astro) into public/images/work-play/ as 2x WebP.
//
// The screens are code in experiments/work-phones/ (redraw.js +
// redraw.css, set in each brand's own type, e.g. PayPal Sans Big, which
// is licensed and installed only on her Mac). Rendering them to images
// keeps the licensed fonts off the live site and the product colours
// out of the site's CSS: they belong to the work, like any screenshot.
//
// Needs: Google Chrome, and the experiments folder served at
// http://localhost:4345 (the "case-v2-mockup" entry in .claude/launch.json).
// Run: node scripts/work-play-render.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:4345/experiments/work-phones/render.html';
const OUT = new URL('../public/images/work-play/', import.meta.url).pathname;
const TMP = join(tmpdir(), 'work-play-render');

// [file name, screen key, part, height in pt]
const jobs = [
  ['pv-shopping', 'pv-shopping'],
  ['pv-hub', 'pv-hub', 'full', 1224],          // tall: the hub scrolls on hover
  ['pv-hub-bar', 'pv-hub', 'bar'],             // its status bar + back, which stay put
  ['id-steps', 'id-steps'],
  ['id-scan', 'id-scan'],
  ['id-camera-under', 'id-camera', 'under'],
  ['id-camera-alert', 'id-camera', 'alert'],
  ['ads-privacy', 'ads-privacy'],
  ['ads-checkup-under', 'ads-checkup', 'under'],
  ['ads-checkup-sheet', 'ads-checkup', 'sheet'],
  ['ads-prefs', 'ads-prefs'],
  ['debit-intro', 'debit-intro'],
  ['debit-confirm', 'debit-confirm'],
  ['debit-setup', 'debit-setup', 'nospin'],    // the spinner turns in CSS
  ['sg-scan-base', 'sg-scan', 'base'],         // before the scan
  ['sg-scan-sheet', 'sg-scan', 'sheet'],       // "Item added", rises after it
  ['sg-scan-bar', 'sg-scan', 'bar'],           // subtotal $2.50
  ['sg-cart', 'sg-cart'],
  ['sg-finish', 'sg-finish'],
  ['ch-setup', 'ch-setup'],
  ['ch-benefits', 'ch-benefits'],
  ['ch-settings', 'ch-settings'],
  ['okta-phone', 'okta-phone-shot'],
];

// The home page's Privacy card shows its phone at 0.8 (--phone-scale):
// a 284px screen drawn 227px wide, 454 device pixels on a 2x screen.
// The 786px renders squeezed into that went soft, so these screens are
// rendered again at that width, as <name>-454.webp (and -227 for 1x screens), and the card picks
// them with srcset (HOME_SIZES in work-play-layer.ts). Re-render if the
// phone's size or scale changes. `node scripts/work-play-render.mjs home`
// renders only these.
const HOME_W = [454, 227];   // 2x and 1x screens
const homeJobs = ['pv-shopping', 'pv-hub', 'pv-hub-bar'];
// `node scripts/work-play-render.mjs pv-hub pv-hub-bar` renders only those (every size)
const onlyHome = process.argv[2] === 'home';
const only = onlyHome ? [] : process.argv.slice(2);
const pick = (j) => !only.length || only.includes(j[0]);

if (existsSync(TMP)) rmSync(TMP, { recursive: true });
mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

const runs = [
  ...(onlyHome ? [] : jobs.filter(pick).map((j) => [j, j[0], 2])),
  ...HOME_W.flatMap((w) => jobs.filter((j) => homeJobs.includes(j[0]) && pick(j)).map((j) => [j, `${j[0]}-${w}`, w / 393])),
];

for (const [[, key, part = 'full', h = 852], name, scale] of runs) {
  const png = join(TMP, `${name}.png`);
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    `--force-device-scale-factor=${scale}`, `--window-size=393,${h}`,
    '--default-background-color=00000000', '--virtual-time-budget=4000',
    `--screenshot=${png}`, `${BASE}?k=${key}&part=${part}&h=${h}`,
  ], { stdio: 'ignore' });
  const transparent = ['sheet', 'alert', 'bar'].includes(part);
  // home renders keep more of the type's edge: at 454px every pixel of it shows
  await sharp(png).webp({ quality: scale === 2 ? 90 : 95, alphaQuality: 100, effort: 6, ...(transparent ? {} : { nearLossless: false }) })
    .toFile(join(OUT, `${name}.webp`));
  console.log(name);
}

// Okta's laptop screen: her export, padded to the laptop's 16:10 on its own ground
if (!onlyHome && !only.length) {
const DESK = new URL('../experiments/work-phones/screens/okta-desk.webp', import.meta.url).pathname;
const meta = await sharp(DESK).metadata();
const H10 = Math.round(meta.width * 10 / 16);
await sharp(DESK).extend({ top: 0, bottom: Math.max(0, H10 - meta.height), background: '#f9fbfc' })
  .resize({ width: meta.width, height: H10, fit: 'cover', position: 'top' })
  .webp({ quality: 90 }).toFile(join(OUT, 'okta-desk.webp'));
console.log('okta-desk', meta.width, meta.height, '->', H10);
}
