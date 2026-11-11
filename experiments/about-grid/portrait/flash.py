# Point-and-shoot flash on film, after her reference (a disposable-camera
# shot): on-camera flash (bright subject, hard shadow cast behind her on
# the wall, falloff to the edges), film colour (green shadows, warm
# highlights, lifted blacks, clipped whites), heavy grain, a little
# softness, a slightly crooked crop.
import sys, numpy as np
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
rng = np.random.default_rng(3)
im = Image.open(src).convert('RGB')
W = H = 1254
a = np.asarray(im).astype(np.float32) / 255

# --- subject mask: flood the wall from its edges (top, left, right);
# whatever the flood can't reach is her. Each seed floods within its own
# tolerance, which follows the wall's gentle gradient.
from PIL import ImageDraw
work = im.filter(ImageFilter.GaussianBlur(3)).copy()
seeds = [(x, 2) for x in range(2, W, 30)] + [(2, y) for y in range(2, int(H * .92), 30)] + [(W - 3, y) for y in range(2, int(H * .92), 30)]
MARK = (255, 0, 255)
for sd in seeds:
    if work.getpixel(sd) != MARK:
        ImageDraw.floodfill(work, sd, MARK, thresh=22)
w = np.asarray(work)
bgm = np.all(w == np.array(MARK), -1)
raw = Image.fromarray(((~bgm) * 255).astype(np.uint8))
# keep only what's joined to her: erode to cut thin bridges to wall
# texture, flood from her sweater, grow back, and stay inside the raw cut
core = raw.filter(ImageFilter.MinFilter(21))
ImageDraw.floodfill(core, (W // 2, H - 4), 128)
keep = Image.fromarray(((np.asarray(core) == 128) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(31))
both = np.minimum(np.asarray(keep), np.asarray(raw))
mi = Image.fromarray(both).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.5))
mask = np.asarray(mi).astype(np.float32) / 255

# --- hard flash shadow: her silhouette, shifted right and down, on the wall
sh = Image.fromarray((mask * 255).astype(np.uint8))
sh = sh.transform(sh.size, Image.AFFINE, (1, 0, -34, 0, 1, -22)).filter(ImageFilter.GaussianBlur(4))
shadow = np.asarray(sh).astype(np.float32) / 255 * (1 - mask)
a = a * (1 - 0.55 * shadow[..., None])

# --- flash: subject lifted, light falling off from the centre
yy, xx = np.mgrid[0:H, 0:W]
d = np.sqrt(((xx - W * 0.5) / W) ** 2 + ((yy - H * 0.4) / H) ** 2)
fall = np.clip(1.18 - d * 0.9, 0.55, 1.18)
a = a * fall[..., None]
inner = np.asarray(Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.GaussianBlur(4))).astype(np.float32) / 255
a = a * (1 + 0.08 * inner[..., None])         # flash hits her harder than the wall
# the wall: a little less brown, nearer the cream of a flash-lit wall
wl = (a @ np.array([0.299, 0.587, 0.114], np.float32))[..., None]
a = a * inner[..., None] + (wl + (a - wl) * 0.7) * (1 - inner[..., None])

# --- film colour
lum = (a @ np.array([0.299, 0.587, 0.114], np.float32))[..., None]
a = lum + (a - lum) * 0.92
shadows = np.clip(1 - lum * 2.2, 0, 1)
high = np.clip(lum * 1.8 - 0.8, 0, 1)
a += shadows * np.array([-0.025, 0.02, 0.0], np.float32)       # green-teal shadows
a += high * np.array([0.03, 0.015, -0.03], np.float32)        # warm highlights
a = (a - 0.5) * 1.14 + 0.5                                    # punchy
a = 0.045 + a * 0.985                                         # lifted blacks, whites clip
a = np.clip(a, 0, 1)

# --- halation: highlights bleed a little warm
hi = Image.fromarray((np.clip(lum[..., 0] - 0.78, 0, 1) * 4 * 255).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(14))
hal = np.asarray(hi).astype(np.float32)[..., None] / 255
a = np.clip(a + hal * np.array([0.10, 0.04, 0.0], np.float32), 0, 1)

# --- softness, then grain (clumped, stronger in mids, slightly colour)
img = Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.9))
a = np.asarray(img).astype(np.float32) / 255
def noise(size, s):
    n = rng.normal(0, 1, (H // size + 1, W // size + 1)).astype(np.float32)
    n = np.asarray(Image.fromarray(((n * 32) + 128).clip(0, 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)).astype(np.float32)
    return (n - 128) / 32 * s
lum = (a @ np.array([0.299, 0.587, 0.114], np.float32))
mid = (1 - np.abs(lum - 0.45) * 1.1)[..., None]
g = noise(2, 0.055)[..., None] + np.stack([noise(3, 0.018) for _ in range(3)], -1)
a = np.clip(a + g * mid, 0, 1)

# --- crooked crop, like a quick snap
img = Image.fromarray((a * 255).astype(np.uint8)).rotate(-1.6, resample=Image.BICUBIC)
c = 40
img = img.crop((c, c, W - c, H - c)).resize((1000, 1000), Image.LANCZOS)
img.save(out, quality=90)

# --- the same photo cut out: her only, transparent around her. The edge
# is pulled in a hair and feathered so no wall shows at the hair line.
al = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.GaussianBlur(1.5))
al = al.rotate(-1.6, resample=Image.BICUBIC).crop((c, c, W - c, H - c)).resize((1000, 1000), Image.LANCZOS)
cut = img.copy(); cut.putalpha(al)
cut.save(out.replace('.webp', '-cutout.webp'), quality=90)
print('ok')
