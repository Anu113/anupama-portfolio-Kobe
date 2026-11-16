"""Export Moss's images from his 8s, 24fps, 1080x1920 clip.

    ffmpeg -i moss.mp4 -vf "select='not(mod(n\\,4))'" -vsync vfr frames/f%02d.png
    python3 scripts/moss-sprite.py frames

Takes every 4th frame (48), the same frames of the timeline hero-sprite.webp
uses, into moss-sprite.webp (8x6). Given every 2nd frame (96, mod(n\\,2)
above) it writes moss-sprite-96.webp (12x8) instead, paired with
hero-sprite-96.webp, and leaves the rest alone. Either way so frame N of Moss pairs with frame N of the portrait (AskBubble.astro
shows whichever frame HeroIllustration dispatches).

Matte: the backdrop is flood-filled from the frame edges and made
transparent, with a soft ramp only along the silhouette, so his cream belly
stays opaque and the faint ground shadow drops out. Semi-transparent edge
pixels have the backdrop un-mixed from them, so there's no halo on a dark
ground. Needs Pillow, numpy, scipy.
"""
import glob
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as nd

FRAMES = sorted(glob.glob(f'{sys.argv[1]}/*.png'))
OUT = 'public/images/moss'
CROP = (0, 300, 1080, 1590)  # full width (ears reach both edges when he turns), ear tips to feet
FW, PAD = 180, 4             # frame width in the sprite; clear gutter per side so scaled cells can't bleed
FH = round(FW * (CROP[3] - CROP[1]) / (CROP[2] - CROP[0]))
CW, CH = FW + 2 * PAD, FH + 2 * PAD  # 188 x 223 — AskBubble's aspect-ratio


def matte(path):
    a = np.asarray(Image.open(path).convert('RGB').crop(CROP)).astype(np.float32)
    bg = np.median(np.r_[a[:6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)], 0)
    d = np.abs(a - bg).max(2)
    lab, _ = nd.label(d < 16)
    # seed from top, bottom and right only: an ear touches the left edge
    edge = set(np.unique(np.r_[lab[0], lab[-1], lab[:, -1]])) - {0}
    ext = np.isin(lab, list(edge))
    near = nd.binary_dilation(ext, iterations=5)
    alpha = np.ones(d.shape, np.float32)
    ramp = np.clip((d - 10) / 60, 0, 1)
    alpha[near] = ramp[near]
    alpha[ext] = 0
    al = np.maximum(alpha, 1e-3)[..., None]
    rgb = np.clip((a - (1 - al) * bg) / al, 0, 255)
    return Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), 'RGBA')


frames = [matte(f) for f in FRAMES]
assert len(frames) in (48, 96), len(frames)
COLS, ROWS = (8, 6) if len(frames) == 48 else (12, 8)

sprite = Image.new('RGBA', (CW * COLS, CH * ROWS), (0, 0, 0, 0))
for i, im in enumerate(frames):
    sprite.paste(im.resize((FW, FH), Image.LANCZOS), ((i % COLS) * CW + PAD, (i // COLS) * CH + PAD))
if len(frames) == 96:
    sprite.save(f'{OUT}/moss-sprite-96.webp', 'WEBP', quality=82, alpha_quality=85, method=6)
    sys.exit()
sprite.save(f'{OUT}/moss-sprite.webp', 'WEBP', quality=82, alpha_quality=85, method=6)

idle = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
idle.paste(frames[0].resize((FW, FH), Image.LANCZOS), (PAD, PAD))
idle.save(f'{OUT}/moss-idle.webp', 'WEBP', quality=88, alpha_quality=90, method=6)

# panel avatar and header crop come from the same frame, so the chat shows the same Moss
frames[0].resize((240, round(240 * frames[0].height / frames[0].width)), Image.LANCZOS) \
    .save(f'{OUT}/moss-sm.webp', 'WEBP', quality=88, method=6)
Image.open(FRAMES[0]).convert('RGB').crop((200, 420, 920, 1140)).resize((128, 128), Image.LANCZOS) \
    .save(f'{OUT}/moss-head.webp', 'WEBP', quality=90, method=6)
