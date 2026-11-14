#!/usr/bin/env python3
"""
Debit Card case study images, cut from her deck at full resolution.

  python3 scripts/debit-images.py "~/Downloads/PayPal Debit Card.pdf" \
                                  "~/Downloads/PayPal Debit Card.deck"

The PDF is rendered at 144 dpi (3840px per slide), which is the screens'
own resolution as placed in the deck. Each figure is cut to the phones'
bounds, found by measuring the slide, plus the same margin on every side,
so no phone is clipped and no slide label or title rides along.

Enrollment overlaps its screens on its slide, so that row is rebuilt from
the deck's original screen exports (inside the .deck zip) on the slide's
own ground. The two flow diagrams are the deck's original 4096px exports.

before-after.webp is NOT made here: the old "Cash Card" value prop screen
isn't in the deck. Export it from Figma to replace that file.

Needs: pdftoppm (poppler), Pillow, numpy.
"""
import os, sys, subprocess, tempfile, zipfile
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'paypal-debit')
GROUND = (250, 248, 245)   # the deck's slide colour
PAD = 120                  # margin around the phones, px at 144 dpi
Q = 86                     # webp quality

pdf, deck = (os.path.expanduser(a) for a in sys.argv[1:3])
tmp = tempfile.mkdtemp()


def slide(n):
    path = os.path.join(tmp, f's-{n:02d}.png')
    if not os.path.exists(path):
        subprocess.run(['pdftoppm', '-r', '144', '-png', '-singlefile',
                        '-f', str(n), '-l', str(n), pdf, path[:-4]], check=True)
    return Image.open(path).convert('RGB')


def bounds(im, box):
    """Bounding box of everything that isn't slide ground inside `box`."""
    a = np.asarray(im.crop(box)).astype(int)
    ink = np.abs(a - np.array(GROUND)).sum(2) > 24
    ys, xs = np.where(ink)
    return (box[0] + xs.min(), box[1] + ys.min(), box[0] + xs.max() + 1, box[1] + ys.max() + 1)


def fade_right(im, x0, x1, y0, y1):
    """Fade a strip into the ground between x0 and x1 (a carousel the deck
    clips with a hard edge reads as a bad crop; a fade reads as "scrolls")."""
    a = np.asarray(im.crop((x0, y0, x1, y1))).astype(float)
    t = np.linspace(0, 1, x1 - x0)
    k = (t * t * (3 - 2 * t))[None, :, None]          # smoothstep, 0 → 1 left to right
    a = a * (1 - k) + np.array(GROUND, float) * k
    im.paste(Image.fromarray(a.round().astype(np.uint8)), (x0, y0))


def cut(n, box, name, max_w=2600, pad=PAD, fix=None):
    im = slide(n)
    if fix: fix(im)
    x0, y0, x1, y1 = bounds(im, box)
    out = Image.new('RGB', (x1 - x0 + 2 * pad, y1 - y0 + 2 * pad), GROUND)
    out.paste(im.crop((x0, y0, x1, y1)), (pad, pad))
    save(out, name, max_w)


def save(im, name, max_w):
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=Q, method=6)
    print(f'{name}.webp  {im.width} x {im.height}')


def phone(img, w, radius):
    """A screen at width w with rounded corners and the deck's faint shadow."""
    if img.mode in ('RGBA', 'LA', 'P'):  # some exports have transparent corners
        img = img.convert('RGBA')
        flat = Image.new('RGB', img.size, (255, 255, 255))
        flat.paste(img, (0, 0), img)
        img = flat
    img = img.convert('RGB')
    img = img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.width - 1, img.height - 1), radius, fill=255)
    return img, mask


def row(screens, name, w=628, gap=224, radius=56, max_w=2600):
    tiles = [phone(s, w, radius) for s in screens]
    h = max(t[0].height for t in tiles)
    W = len(tiles) * w + (len(tiles) - 1) * gap + 2 * PAD
    H = h + 2 * PAD
    out = Image.new('RGB', (W, H), GROUND)
    shadow = Image.new('L', (W, H), 0)
    for i, (img, mask) in enumerate(tiles):
        shadow.paste(mask, (PAD + i * (w + gap), PAD + 12))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28)).point(lambda v: v * 0.10)
    out.paste(Image.new('RGB', (W, H), (40, 36, 30)), (0, 0), shadow)
    for i, (img, mask) in enumerate(tiles):
        x = PAD + i * (w + gap)
        out.paste(img, (x, PAD), mask)
        edge = Image.new('L', img.size, 0)
        ImageDraw.Draw(edge).rounded_rectangle((0, 0, img.width - 1, img.height - 1), radius, outline=255, width=2)
        out.paste(Image.new('RGB', img.size, (232, 229, 223)), (x, PAD), edge)
    save(out, name, max_w)


# --- cut from slides --------------------------------------------------------
save(slide(3).crop((1680, 0, 3840, 2160)), 'hero', 1600)  # the slide's own bleed
cut(15, (0, 300, 3840, 2160), 'card-details',                # below the slide title
    fix=lambda im: fade_right(im, 3080, 3356, 1410, 1840))   # the carousel's clipped card
cut(17, (0, 200, 3840, 1680), 'pin')                         # phones, not their labels
cut(19, (0, 200, 3840, 1740), 'rewards')
cut(20, (0, 200, 3840, 1740), 'offers')
cut(22, (0, 100, 3100, 1858), 'notifications')               # not the "Notifications" title

# --- from the deck's original exports ---------------------------------------
with zipfile.ZipFile(deck) as z:
    def img(h):
        return Image.open(z.open(next(n for n in z.namelist() if n.startswith('images/' + h))))
    row([img('e6d7cf49'),   # account setup, fee list
         img('e5b6c0fe'),   # confirm your info
         img('188d7e17'),   # identity confirmed
         img('96edf385'),   # where we'll ship your card
         img('5357e90f')],  # setting up your new card
        'enroll', max_w=2800)
    save(img('e8314c3d').convert('RGB'), 'flow-enroll', 3200)
    save(img('a4b882b1').convert('RGB'), 'flow-rewards', 3200)
