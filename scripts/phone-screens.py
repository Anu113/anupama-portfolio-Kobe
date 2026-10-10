"""Cuts single phone screens out of the wide case-study boards for the home
page's phone cards (ProjectCard.astro, `screens` media in data/work.ts).

The boards show several screens side by side; each card's phone steps
through them one at a time. Boxes are in the board's own pixels and were
measured by eye; re-measure if a board is re-exported.

    python3 scripts/phone-screens.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'public' / 'images'

# (board, out prefix, [(left, top, right, bottom), ...])
SETS = [
    ('scan-go/hero.webp', 'scan-go/phone', [
        (22, 70, 298, 664), (329, 70, 604, 664), (619, 70, 894, 664),
        (912, 70, 1187, 664), (1202, 70, 1477, 664), (1505, 70, 1781, 664),
    ]),
    ('paypal-privacy/hero.webp', 'paypal-privacy/phone', [
        (72, 60, 382, 790), (616, 72, 966, 828), (1042, 30, 1376, 830), (1432, 30, 1772, 830),
    ]),
]

for board, prefix, boxes in SETS:
    img = Image.open(ROOT / board).convert('RGB')
    for i, box in enumerate(boxes, 1):
        out = ROOT / f'{prefix}-{i}.webp'
        img.crop(box).save(out, 'WEBP', quality=88)
        print(out.relative_to(ROOT), img.crop(box).size)
