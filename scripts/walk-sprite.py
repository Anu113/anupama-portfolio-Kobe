"""Export the loader's walk cycle (Loader.astro) from her 4s, 24fps,
1920x1080 walking clip (Refine_walking_animation_pace).

    ffmpeg -i walk.mp4 frames/f%03d.png
    python3 scripts/walk-sprite.py frames

The clip walks her on the spot on a still sheet of paper (the camera never
moves), so the page supplies all of her travel and the sheet only has to
loop. Frames 28-78 (1-based) are one full stride, two steps, 51 frames:
measured on her silhouette, frame 79 differs from 28 by 0.7x what two
neighbouring frames do, and her torso is at the same height in both, so
the seam doesn't show. One step is ~17 frames; nothing else in the clip
(no turn, no pause) needs cutting round.

Matte: because the paper never moves, the backdrop plate is the paper
itself, per pixel — the median of each pixel over the frames where she
isn't covering it — so the grain cancels out exactly instead of being
guessed at. Pixels she covers in every frame (mid-torso) are filled in
from around them; they're deep inside her, so the plate barely matters
there. The backdrop is flood-filled from the frame edges and made
transparent, with a soft ramp only along the silhouette. No enclosed
pockets are cut: the gap between her legs opens onto the floor, so the
edge fill reaches it, and her ivory trousers are close enough to the
paper that a pocket rule cut holes in them. Her ground shadow is
kept as a translucent black, so she stands on whatever ground she's on.
Semi-transparent edges have the plate un-mixed from them, so there's no
cream halo on the dark ground. The crop is the union of every frame's
silhouette, so no frame is clipped and the cells all line up; the
generator's sparkle (x~1740) is outside it.
Needs Pillow, numpy, scipy.
"""
import glob
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as nd

ALL = sorted(glob.glob(f'{sys.argv[1]}/*.png'))
LOOP = slice(27, 78)           # 0-based: frames 28-78, one stride
OUT = 'public/images/loader'
WIN = (380, 40, 1300, 1080)    # search window around her; the sparkle sits at x~1740
FH = 560                       # cell height: ~1.5x her largest size, sharp on a laptop's 2x
COLS = 8
PAD = 4                        # clear gutter per side, so a scaled cell can't bleed its neighbour
SHADOW = 1 / 40                # alpha per level of darkening below the plate


def lum(x):
    return x @ np.array([0.299, 0.587, 0.114], np.float32)


def load(p):
    return np.asarray(Image.open(p).convert('RGB').crop(WIN)).astype(np.float32)


def rough_bg(a):
    """Backdrop by colour, reachable from the frame's edge."""
    edge = np.r_[a[:8].reshape(-1, 3), a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)]
    near = np.abs(a - np.median(edge, 0)).max(2) < 28
    lab, _ = nd.label(near)
    seeds = set(np.unique(np.r_[lab[0], lab[:, 0], lab[:, -1]])) - {0}
    return nd.binary_erosion(np.isin(lab, list(seeds)), iterations=6)


# The plate: each pixel's median over every frame of the clip where it's backdrop.
stack = np.stack([load(p) for p in ALL[::2]])  # every other frame is plenty
bgs = np.stack([rough_bg(a) for a in stack])
masked = np.where(bgs[..., None], stack, np.nan)
seen = bgs.any(0)
plate = np.where(seen[..., None], np.nanmedian(np.where(seen[None, ..., None], masked, 0), 0), 0)
# never-uncovered pixels: fill from around, mostly sideways (the paper's
# shading changes top to bottom more than across)
w = nd.gaussian_filter(seen.astype(np.float32), (3, 60))
fill = np.dstack([nd.gaussian_filter(plate[..., c] * seen, (3, 60)) for c in range(3)])
fill = fill / np.maximum(w, 1e-6)[..., None]
plate = np.where(seen[..., None], plate, fill).astype(np.float32)
del stack, masked


def matte(a):
    d = np.abs(a - plate).max(2)
    dark = lum(plate) - lum(a)
    lab, _ = nd.label(d < 12)
    seeds = set(np.unique(np.r_[lab[0], lab[:, 0], lab[:, -1], lab[-1]])) - {0}
    ext = np.isin(lab, list(seeds))
    near = nd.binary_dilation(ext, iterations=4)

    alpha = np.ones(d.shape, np.float32)
    ramp = np.clip((d - 8) / 45, 0, 1)
    alpha[near] = ramp[near]
    alpha[ext] = 0
    al = np.maximum(alpha, 1e-3)[..., None]
    rgb = np.clip((a - (1 - al) * plate) / al, 0, 255)

    # the ground shadow: backdrop clearly darker than the paper, around
    # her feet only (the codec's noise sits a level or two either side)
    floor = np.zeros_like(d, bool)
    floor[int(d.shape[0] * 0.9):] = True
    cols = np.where((alpha > 0.5).any(0))[0]
    feet = np.zeros_like(floor)
    feet[:, max(cols.min() - 40, 0):cols.max() + 40] = True
    sh = np.clip((dark - 4) * SHADOW, 0, 0.45) * (ext & floor & feet)
    sh = nd.gaussian_filter(sh, 3)
    rgb = np.where((alpha == 0)[..., None], 0, rgb)
    return np.dstack([rgb, np.maximum(alpha, sh) * 255])


frames = [matte(load(p)) for p in ALL[LOOP]]
assert len(frames) == 51, len(frames)

# one crop for all: the union of every frame's silhouette and shadow, plus a margin
ys, xs = np.where(np.any([f[..., 3] > 8 for f in frames], 0))
M = 12
box = (max(xs.min() - M, 0), max(ys.min() - M, 0), xs.max() + M + 1, ys.max() + M + 1)
FW = round(FH * (box[2] - box[0]) / (box[3] - box[1]))
rows = -(-len(frames) // COLS)

CW, CH = FW + 2 * PAD, FH + 2 * PAD
sprite = Image.new('RGBA', (CW * COLS, CH * rows), (0, 0, 0, 0))
for i, f in enumerate(frames):
    im = Image.fromarray(f.astype(np.uint8), 'RGBA').crop(box).resize((FW, FH), Image.LANCZOS)
    sprite.paste(im, ((i % COLS) * CW + PAD, (i // COLS) * CH + PAD))
sprite.save(f'{OUT}/walk-sprite.webp', 'WEBP', quality=80, alpha_quality=80, method=6)
print(f'{len(frames)} frames, crop {box} in window {WIN[:2]}, cell {CW}x{CH} '
      f'(art {FW}x{FH}, pad {PAD}), sheet {COLS}x{rows}')
