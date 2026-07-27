/* prepare-play-images.mjs — the asset pass behind the playground tiles.
 *
 *   node scripts/prepare-play-images.mjs <source-dir>
 *
 * Anupama's artwork came off the About page of the Wix site
 * (anupama.design/about-anupama) at full resolution. Those originals are NOT
 * in this repo — they're 27MB and they're still on the live site. This script
 * is the record of what was done to them, so the pass is repeatable: point it
 * at a folder of the originals named as in `SOURCES` below and it rewrites
 * `public/images/play-*.jpg`.
 *
 * Two problems it fixes, both measured rather than eyeballed:
 *
 * 1. INCONSISTENT BORDERS. Five of the ten files carried a baked-in blank
 *    surround — 12% to 61% of the file — while the other five bled to their
 *    own edge. On the page that read as some pieces floating in a cream void
 *    next to others that didn't. `trim()` removes it, so nothing has a border
 *    and there is nothing left to be inconsistent. Sizes still vary; that's
 *    the collage, and it was never the problem.
 *
 * 2. FLAT SCANS. Colour spread (the distance between the strongest and
 *    weakest channel mean) under 15 reads as washed out against the bone
 *    ground, which is itself very light. Three pieces measured under 15 and
 *    two more under 30. The lift is tiered off that measurement, so the
 *    already-vivid work — the crown at 77, the porch at 65 — is left alone.
 *
 * Stats are taken AFTER the trim on purpose. Measuring the untrimmed file
 * counts the blank margin, which drags saturation down and would have bought
 * the mermaid a lift it doesn't need.
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/prepare-play-images.mjs <source-dir>');
  process.exit(1);
}

/** Output name → original filename as downloaded from the Wix media host. */
const SOURCES = {
  'play-porch': '980438_f3aa630565a145af9313f4b3acd17c73~mv2.jpg',
  'play-reading': '980438_3a52fda7242a4d4ab2eb547e4fac6be4~mv2.jpg',
  'play-hermione': '980438_32a1cd6074494f33a9060ac0b4c32594~mv2.jpg',
  'play-sage': '980438_27dee606f965451ebfa925e09c1bb3ce~mv2.jpg',
  'play-mermaid': '980438_6bb612f8e8e54ef69b33cf45fd8b74e6~mv2.jpg',
  'play-earrings': '980438_9a278ceb83a1493886adf3864e4e3d08~mv2.jpg',
  'play-crown': '980438_38d30411c28f4239b950407764a11bdf~mv2.jpg',
  'play-care': '980438_7ebee9721101432984e3b8fe749fa176~mv2.png',
  'play-bob': '980438_63e81bff687d4d22b5040d7598823cf1~mv2.jpg',
  'play-green-eyes': '980438_9e3e88c1f68d4b67822b1ae0b7335c19~mv2.jpg',
};

const LONG_EDGE = 1200;   // the widest a tile is ever drawn, at 2x
const QUALITY = 82;
const TRIM_THRESHOLD = 15;  // loose enough to survive JPEG ringing at the edge

const spread = ({ channels: [r, g, b] }) =>
  Math.max(r.mean, g.mean, b.mean) - Math.min(r.mean, g.mean, b.mean);
const deviation = ({ channels: [r, g, b] }) => (r.stdev + g.stdev + b.stdev) / 3;

const results = [];

for (const [name, file] of Object.entries(SOURCES)) {
  const input = path.join(src, file);
  const before = await sharp(input).metadata();

  const trimmed = await sharp(input).trim({ threshold: TRIM_THRESHOLD }).toBuffer();
  const after = await sharp(trimmed).metadata();

  const stats = await sharp(trimmed).stats();
  const sat = spread(stats);
  const sd = deviation(stats);
  const saturation = sat < 15 ? 1.35 : sat < 30 ? 1.18 : 1;
  const contrast = sd < 60 ? 1.14 : 1;

  let pipe = sharp(trimmed);
  if (contrast !== 1) pipe = pipe.linear(contrast, -14);
  if (saturation !== 1) pipe = pipe.modulate({ saturation });

  const out = path.join(root, 'public/images', `${name}.jpg`);
  const info = await pipe
    .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(out);

  const cropped = 100 - Math.round(((after.width * after.height) / (before.width * before.height)) * 100);
  results.push({ name, cropped, sat: Math.round(sat), saturation, contrast, w: info.width, h: info.height, kb: Math.round(info.size / 1024) });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad('piece', 17), pad('trimmed', 9), pad('spread', 8), pad('lift', 18), pad('out', 12), 'size');
for (const r of results) {
  const lift = [r.saturation !== 1 && `sat x${r.saturation}`, r.contrast !== 1 && `contrast x${r.contrast}`]
    .filter(Boolean).join(', ') || '—';
  console.log(pad(r.name, 17), pad(r.cropped + '%', 9), pad(r.sat, 8), pad(lift, 18), pad(`${r.w}x${r.h}`, 12), `${r.kb}KB`);
}
console.log('\nPaste these into src/data/play.ts:');
for (const r of results) console.log(`  ${r.name}: w: ${r.w}, h: ${r.h},`);
