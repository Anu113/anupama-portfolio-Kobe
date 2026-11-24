"""Make the land mask the home page's globe is drawn from (GlobeStory.astro).

    curl -sL https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json -o land-110m.json
    python3 scripts/globe-land.py land-110m.json

Reads Natural Earth's 1:110m land (public domain), as TopoJSON from the
world-atlas package, and writes public/images/globe/land.png: 1024x512,
equirectangular (longitude -180..180 left to right, latitude 90..-90 top to
bottom), white land on black. The globe looks each of its pixels up here, so
the page needs no map data or library at runtime. Needs Pillow.
"""
import json
import os
import sys

from PIL import Image, ImageDraw

W, H = 1024, 512
SS = 4  # drawn 4x larger, then shrunk, so coasts are clean

topo = json.load(open(sys.argv[1]))
sx, sy = topo['transform']['scale']
tx, ty = topo['transform']['translate']

# TopoJSON arcs are delta-encoded, quantised points; decode each to lon/lat
arcs = []
for arc in topo['arcs']:
    x = y = 0
    pts = []
    for dx, dy in arc:
        x += dx
        y += dy
        pts.append((x * sx + tx, y * sy + ty))
    arcs.append(pts)


def ring(idx):
    """A ring is a list of arc indices; a negative index is that arc reversed (~i)."""
    out = []
    for i in idx:
        pts = arcs[i] if i >= 0 else arcs[~i][::-1]
        out.extend(pts if not out else pts[1:])
    return out


def to_px(lon, lat):
    return ((lon + 180) / 360 * W * SS, (90 - lat) / 180 * H * SS)


img = Image.new('L', (W * SS, H * SS), 0)
draw = ImageDraw.Draw(img)
geoms = topo['objects']['land']['geometries']
for g in geoms:
    polys = [g['arcs']] if g['type'] == 'Polygon' else g['arcs']
    for poly in polys:
        for k, r in enumerate(poly):
            # rings that cross the dateline jump 360 degrees; unwrap them so they stay one shape,
            # then draw each shape at -360, 0 and +360 so the part beyond the edge wraps round
            raw, un, prev = ring(r), [], None
            for lo, la in raw:
                if prev is not None:
                    while lo - prev > 180: lo -= 360
                    while lo - prev < -180: lo += 360
                un.append((lo, la)); prev = lo
            if len(un) > 2:
                for off in (-360, 0, 360):
                    draw.polygon([to_px(lo + off, la) for lo, la in un], fill=255 if k == 0 else 0)  # first ring land, the rest holes (lakes)

out = 'public/images/globe/land.png'
os.makedirs(os.path.dirname(out), exist_ok=True)
img.resize((W, H), Image.LANCZOS).point(lambda v: 255 if v > 127 else 0).convert('1').save(out, optimize=True)
print(out, os.path.getsize(out), 'bytes')
