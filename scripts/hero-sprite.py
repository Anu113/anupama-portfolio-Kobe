#!/usr/bin/env python3
"""Export the hero portrait sprite (public/images/hero-sprite.webp, 48
frames of 700x980 in an 8x6 grid) and its still (hero-idle.webp) from
her source clip, with the edge re-inked for the dark page.

Usage:
  python3 scripts/hero-sprite.py ~/Downloads/Character_animation_instructions_1080p_20260929165344.mp4

The source is a 1080x1920, 24fps watercolour clip on a near-white
backdrop. Every 4th frame is kept, cropped to the figure's union bounds
(x 40-1080, y 374-1830, 5:7) and sized to 700x980 — the same steps
HeroIllustration.astro's header describes.

Matte: the highlights are lifted so the backdrop is exactly white, then
alpha ramps from 0 at white to 1 at 40 levels below it. That keeps the
watercolour edges soft, but it leaves the palest strands of her hair (and
the paper between them) solid: on the dark page they show as a pale
cut-out outline. So, near the edge and only where the art around it is
dark (hair, chair; never the white trousers, socks, cup or laptop), the
matte is widened to 130 levels and the colour is un-mixed from the white
it was painted on: c = (observed - (1 - a) * 255) / a. Pale strands turn
into faint hair-coloured strands instead of a white rim.

Enclosed whites: the same matte can't tell the paper from white that
belongs to her, so the whites of her eyes, their catchlights and the
sparkles in her hair came out partly see-through, and on the dark page
the ground showed through them as grey-black. Any small near-white patch
fully enclosed by solid art, well inside her outline, in the head band
is made solid again. Gaps between strands at the hair's outer edge are
enclosed too but they're paper, hence the inset; the cup handle's hole
sits below the band, so it stays clear.

Needs ffmpeg, Pillow, numpy and scipy.
"""
import glob
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes, distance_transform_edt, gaussian_filter, label

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'images')
CROP = (40, 374, 1080, 1830)
W, H, COLS, ROWS = 700, 980, 8, 6
HEAD_BAND = 360   # px from the top of the 700x980 frame: her head, above the shoulders
INSET = 30        # px: an enclosed white patch must sit this far inside her outline

# Highlights 200-247 stretched to 200-255; darker values untouched.
lut = np.arange(256, dtype=float)
lut = np.where(lut <= 200, lut, 200 + (lut - 200) * 55 / 47)
lut = np.clip(np.round(lut), 0, 255).astype(np.uint8)


def frame(path):
    rgb = lut[np.array(Image.open(path).convert('RGB').crop(CROP).resize((W, H), Image.LANCZOS))].astype(float)
    mn = rgb.min(2)
    a = np.clip((255 - mn) / 40, 0, 1)

    lum = rgb @ np.array([0.299, 0.587, 0.114])
    # Edge band: within ~8px of the backdrop, fading out by 18px. The
    # backdrop is only the paper outside her: white enclosed by the art
    # (catchlights, sparkles) is hers, and measuring from it would thin
    # the skin round her eyes.
    d = distance_transform_edt(binary_fill_holes(a >= 0.05))
    edge = np.clip((18 - d) / 10, 0, 1)
    # Dark zone: the solid art nearby is darker than the trousers/socks.
    body = ((a > 0.5) & (lum < 200)).astype(float)
    near = gaussian_filter(lum * body, 10) / np.maximum(gaussian_filter(body, 10), 1e-6)
    dark = np.clip((170 - near) / 40, 0, 1)
    k = edge * dark

    a_wide = np.clip((255 - mn) / 130, 0, 1)
    unmixed = np.clip((rgb - (1 - a_wide[..., None]) * 255) / np.maximum(a_wide[..., None], 1e-3), 0, 255)
    alpha = a * (1 - k) + np.minimum(a, a_wide) * k
    colour = rgb * (1 - k[..., None]) + unmixed * k[..., None]

    # Enclosed whites in the head band (eyes, catchlights, hair sparkles):
    # holes in the solid art, small, above the shoulders. Solid again.
    # Gaps between strands at the outer edge of her hair are enclosed too,
    # but they're paper, so a patch must also sit well inside the art.
    solid = a > 0.94
    filled = binary_fill_holes(solid)
    holes, n = label(filled & ~solid)
    if n:
        inside = distance_transform_edt(filled)          # px to the paper around her
        sizes = np.bincount(holes.ravel())
        depth = np.zeros(n + 1)
        depth = np.full(n + 1, np.inf)
        np.minimum.at(depth, holes.ravel(), inside.ravel())
        rows = np.arange(H)[:, None]
        keep = np.zeros(n + 1, bool)
        keep[1:] = (sizes[1:] < 2500) & (depth[1:] > INSET)
        enclosed = keep[holes] & (rows < HEAD_BAND)
        alpha = np.where(enclosed, 1.0, alpha)
        colour = np.where(enclosed[..., None], rgb, colour)
    return Image.fromarray(np.dstack([colour, alpha * 255]).round().astype(np.uint8), 'RGBA')


def main(src):
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vf', r"select='not(mod(n\,4))'",
                        '-vsync', 'vfr', os.path.join(tmp, 'f%03d.png')], check=True)
        files = sorted(glob.glob(os.path.join(tmp, '*.png')))[:COLS * ROWS]
        imgs = [frame(f) for f in files]
    sprite = Image.new('RGBA', (W * COLS, H * ROWS), (255, 255, 255, 0))
    for i, im in enumerate(imgs):
        sprite.paste(im, ((i % COLS) * W, (i // COLS) * H))
    sprite.save(os.path.join(OUT, 'hero-sprite.webp'), 'WEBP', quality=80, alpha_quality=60, method=6)  # alpha 60 keeps it near the old 4.3MB
    imgs[0].save(os.path.join(OUT, 'hero-idle.webp'), 'WEBP', quality=88, alpha_quality=90, method=6)
    print(f'{len(imgs)} frames written')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
