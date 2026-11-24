#!/usr/bin/env python3
"""Turn a "look around" clip of her into a cursor-tracking hero mock.

The workflow from "Turn Images into Interactive Heroes" (Higgsfield
Seedance + Claude Code), fitted to her portrait:

  1. Her clip, made in Seedance from her still with the prompt in
     PROMPT.md: only her head and eyes move, she looks all round and
     the first and last frames are the same.
  2. This script: every frame out with ffmpeg, through
     scripts/hero-sprite.py's matte (same crop and cut-out as the site's
     sprite), into one small picture per frame (the guide's single sheet is too big
     for Safari at this size).
  3. It also measures where her head points in every frame (the centre
     of her face's skin against frame 0), and writes that map next to
     the frames. That map is the part the guide leaves to chance: the
     page picks the frame whose head points where the cursor is, so the
     order she looked around in during the clip doesn't matter.
  4. look.html (built from look-template.html, everything inlined) eases
     a direction toward the cursor trail's tip and shows the frame that
     matches it.

Usage:
  python3 experiments/hero-gaze/look/build.py <clip.mp4> [max_frames=120]
"""
import base64, glob, importlib.util, json, os, subprocess, sys, tempfile

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
spec = importlib.util.spec_from_file_location('hs', os.path.join(ROOT, 'scripts', 'hero-sprite.py'))
hs = importlib.util.module_from_spec(spec); spec.loader.exec_module(hs)

W, H = hs.W, hs.H            # 700 x 980, the site's frame
HEAD = (200, 90, 450, 270)   # x0, y0, x1, y1: her face band in the 700 frame


def measure(im):
    """Where her face is (centre of her skin in the head band) and how much
    eye-white shows inside it, which drops to almost nothing in a blink."""
    a = np.asarray(im).astype(float)
    x0, y0, x1, y1 = HEAD
    p = a[y0:y1, x0:x1]
    r, g, b, al = p[..., 0], p[..., 1], p[..., 2], p[..., 3]
    skin = (al > 200) & (r > 205) & (g > 150) & (g < 225) & (b > 110) & (b < 200) & (r - b > 35)
    ys, xs = np.nonzero(skin)
    if len(xs) < 50:
        return None, 0
    fy0, fy1 = np.percentile(ys, [10, 70]).astype(int)
    fx0, fx1 = np.percentile(xs, [5, 95]).astype(int)
    face = p[fy0:fy1, fx0:fx1, :3]
    mn, mx = face.min(2), face.max(2)
    white = int(((mn > 200) & (mx - mn < 35) & (p[fy0:fy1, fx0:fx1, 3] > 200)).sum())
    return (float(xs.mean() + x0), float(ys.mean() + y0)), white


def main(src, max_frames=120):
    with tempfile.TemporaryDirectory() as tmp:
        # Scaled to her source clip's 1080 x 1920, so hero-sprite.py's crop
        # (measured on that clip) fits a 720p export too.
        subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vf', 'scale=1080:1920:flags=lanczos',
                        os.path.join(tmp, 'f%04d.png')], check=True)
        files = sorted(glob.glob(os.path.join(tmp, '*.png')))
        step = max(1, -(-len(files) // max_frames))
        files = files[::step]
        imgs = [hs.frame(f) for f in files]
    m = [measure(im) for im in imgs]
    # Blinks: eye-white under 60% of the clip's usual amount, plus a frame
    # either side (half-shut lids). She never rests on those frames, but
    # she can play through them while turning: people blink mid-turn.
    whites = np.array([w for _, w in m], float)
    shut = whites < 0.6 * np.median(whites)
    shut = shut | np.roll(shut, 1) | np.roll(shut, -1)
    pos = []
    for i, (c, _) in enumerate(m):
        pos.append(c if c else (pos[-1] if pos else (W / 2, H / 4)))
    xs = np.array([c[0] for c in pos]); ys = np.array([c[1] for c in pos])
    # Centred on the middle of her range (measured on open-eyed frames), so
    # the middle of the turn is "looking at you" whichever way the clip starts.
    ox, oy = xs[~shut], ys[~shut]
    cx, cy = (ox.min() + ox.max()) / 2, (oy.min() + oy.max()) / 2
    sx, sy = max(1e-3, (ox.max() - ox.min()) / 2), (oy.max() - oy.min()) / 2
    use_y = sy * 2 >= 15          # under 15px of vertical travel is noise
    norm = [[round(float(np.clip((x - cx) / sx, -1, 1)), 4),
             round(float(np.clip((y - cy) / sy, -1, 1)), 4) if use_y else 0.0] for x, y in zip(xs, ys)]
    # A clip that turns once and then holds: drop the hold, keeping a few
    # frames past where the turn reaches its far side.
    nx = np.array([n[0] for n in norm])
    end = len(imgs)
    for far in (nx.max(), nx.min()):
        hits = [i for i in range(len(nx)) if abs(nx[i] - far) < 0.03 and not shut[i]]
        if hits and abs(far) > 0.9:
            end = min(len(imgs), max(end if end < len(imgs) else 0, hits[0] + 4))
    imgs, norm, shut = imgs[:end], norm[:end], shut[:end]
    c0 = (cx, cy)
    keep = list(range(len(imgs)))

    # One small picture per frame, not one sheet: a 96-frame sheet is
    # 8400 x 7840 (66 megapixels), more than Safari will decode, and the
    # page came up blank there.
    import io
    uris = []
    for im in imgs:
        buf = io.BytesIO(); im.save(buf, 'WEBP', quality=80, alpha_quality=70, method=6)
        uris.append('data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode())
    meta = {'count': len(imgs), 'w': W, 'h': H, 'face': [round(c0[0], 1), round(c0[1], 1)],
            'range_px': [round(sx, 1), round(sy, 1)], 'look': norm, 'src': os.path.basename(src), 'step': step,
            'shut': [bool(v) for v in shut]}
    json.dump(meta, open(os.path.join(HERE, 'map.json'), 'w'))

    t = open(os.path.join(HERE, 'look-template.html')).read()
    t = t.replace('__FRAMES__', json.dumps(uris)).replace('__MAP__', json.dumps(meta))
    open(os.path.join(os.path.dirname(HERE), 'look.html'), 'w').write(t)
    print(f'{len(imgs)} frames (every {step}, {int(sum(shut))} mid-blink), head range ±{sx:.1f}px x, ±{sy:.1f}px y{"" if use_y else " (vertical ignored)"} → look.html')


if __name__ == '__main__':
    if len(sys.argv) not in (2, 3):
        sys.exit(__doc__)
    main(sys.argv[1], int(sys.argv[2]) if len(sys.argv) == 3 else 120)
