"""Thumbnails for /playground's ball (PlayBall.astro).

Reads every `file:` in src/data/playground.ts and writes a 400px webp of it
to public/images/playground/, named like the source with / turned into __
(see playThumb() in the data file). Animated files ("loop") are skipped:
the ball uses them as they are. Re-run after adding or replacing a piece:

    python3 scripts/playground-thumbs.py
"""
import os
import re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'src', 'data', 'playground.ts')
SRC = os.path.join(ROOT, 'public', 'images')
OUT = os.path.join(SRC, 'playground')
SIZE = 400

os.makedirs(OUT, exist_ok=True)
files = re.findall(r"file: '([^']+)'", open(DATA).read())
for f in files:
    if 'loop' in f:
        continue
    name = re.sub(r'\.\w+$', '.webp', f.replace('/', '__'))
    im = Image.open(os.path.join(SRC, f)).convert('RGB')
    im.thumbnail((SIZE, SIZE))
    im.save(os.path.join(OUT, name), 'WEBP', quality=82)
    print(name, im.size)
