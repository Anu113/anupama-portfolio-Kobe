"""Clean the edge of a cut-out Moss: python3 scripts/moss-defringe.py in.webp [out.webp]

His frames were cut from a white-ish backdrop, and on the panel's dark
ground that left a pale rim along his fur and a white smear under his
feet. This fades only the pixels at the edge that are paler than the fur
just inside them (so his whiskers and the leaf's stem, which are dark,
stay), tints what's left of the rim toward that fur, and drops the flat
pale ground under his feet. Writes over the input if no output is given.
Run by moss-sprite.py on moss-sm.webp; chosen on request (2026-11-25,
experiments/moss-edges/). Needs Pillow, numpy, scipy.
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as nd

RIM = 5        # px from the outside that count as edge
PALER = 8      # how much brighter than the fur behind it a pixel must be to start fading
RAMP = 45      # ...and over how much more it fades out
GROUND = 0.90  # the ground smear lives in the bottom 10%


def defringe(im: Image.Image) -> Image.Image:
    a = np.asarray(im.convert('RGBA')).astype(np.float32)
    rgb, al = a[..., :3], a[..., 3] / 255
    h = al.shape[0]
    lum = rgb.mean(2)
    sat = rgb.max(2) - rgb.min(2)
    yy = np.arange(h)[:, None] * np.ones_like(lum)

    # the ground under his feet: anything low that isn't part of his body
    core = nd.binary_erosion(al > 0.98, iterations=3)
    body = nd.binary_dilation(core, iterations=2)
    al = np.where((yy > h * (GROUND + 0.03)) & ~body, 0, al)
    al = np.where((yy > h * GROUND) & (lum > 195) & (sat < 35), 0, al)

    # the pale rim
    dist = nd.distance_transform_edt(~(al < 0.05))
    _, (iy, ix) = nd.distance_transform_edt(~core, return_indices=True)
    pale = np.clip((lum - (lum[iy, ix] + PALER)) / RAMP, 0, 1)
    rim = np.clip((RIM - dist) / RIM, 0, 1)
    al = al * (1 - pale * rim * 0.95)
    w = (rim * 0.6)[..., None]
    rgb = rgb * (1 - w) + rgb[iy, ix] * w
    return Image.fromarray(np.dstack([np.clip(rgb, 0, 255), al * 255]).astype(np.uint8), 'RGBA')


if __name__ == '__main__':
    src = sys.argv[1]
    defringe(Image.open(src)).save(sys.argv[2] if len(sys.argv) > 2 else src, 'WEBP', quality=88, alpha_quality=95, method=6)
