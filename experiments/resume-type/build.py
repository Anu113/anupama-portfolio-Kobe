"""Resume type mocks: quieter takes on resume/resume.html.

Each variant is the real resume with one extra <style> layered on top, so the
words stay identical and only the typography changes.

    python3 experiments/resume-type/build.py
writes <letter>.html, <letter>.pdf and <letter>.png here, and sheet.png.
"""
import pathlib, subprocess

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE.parent.parent / "resume" / "resume.html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

FONTS = """
  @font-face { font-family: 'Crimson Pro'; font-weight: 300; src: url(fonts/crimson-pro-300-normal.woff2) format('woff2'); }
  @font-face { font-family: 'Crimson Pro'; font-weight: 300; font-style: italic; src: url(fonts/crimson-pro-300-italic.woff2) format('woff2'); }
  @font-face { font-family: 'Azeret Mono'; font-weight: 400; src: url(fonts/azeret-mono-400-normal.woff2) format('woff2'); }
  @font-face { font-family: 'DM Sans'; font-weight: 500; src: url(fonts/dm-sans-500-normal.woff2) format('woff2'); }
"""

# Shared quieting: no bold inside sentences, one weight step for names.
QUIET = """
  strong { font-weight: inherit; color: inherit; }
  .job h3 b { font-weight: 500; }
  li::before { background: #b5b5b5; width: 2.5pt; height: 2.5pt; }
  header .contact span:not(:last-child)::after { color: #b5b5b5; }
  .skills span:not(:last-child)::after { color: #b5b5b5; }
"""

VARIANTS = {
    "A": ("Quiet sans", """
  body { font-size: 8.8pt; line-height: 1.55; padding: 16mm 19mm 8mm; color: #4a4a4a; }
  header h1 { font-size: 15pt; font-weight: 500; letter-spacing: 0; }
  header .role { font-size: 9.5pt; font-weight: 400; color: #6b6b6b; margin-top: 2pt; }
  header .contact { font-size: 8pt; color: #6b6b6b; margin-top: 7pt; }
  h2 { font-size: 7.4pt; font-weight: 500; letter-spacing: .14em; color: #767676; border: 0; padding: 0; margin: 17pt 0 7pt; }
  .job { margin-top: 10pt; }
  .job h3 { font-size: 9.4pt; }
  .job h3 .sep { color: #b5b5b5; }
  .dates { font-size: 8pt; color: #767676; }
  li { margin-top: 1.5pt; }
"""),
    "B": ("Label column", """
  body { font-size: 8.6pt; line-height: 1.5; padding: 16mm 17mm 8mm 50mm; position: relative; color: #4a4a4a; }
  header { margin-left: -33mm; margin-bottom: 4pt; }
  header h1 { font-size: 15pt; font-weight: 500; letter-spacing: 0; }
  header .role { font-size: 9.4pt; font-weight: 400; color: #6b6b6b; margin-top: 2pt; }
  header .contact { font-size: 8pt; color: #6b6b6b; margin-top: 7pt; }
  h2 { position: absolute; left: 17mm; width: 28mm; margin: 15pt 0 0; padding: 0; border: 0;
       font-size: 7.4pt; font-weight: 500; letter-spacing: .14em; color: #767676; }
  h2 + * { margin-top: 15pt !important; }
  .job { margin-top: 9pt; }
  .job h3 { font-size: 9.2pt; }
  .job h3 .sep { color: #b5b5b5; }
  .dates { font-size: 7.8pt; color: #767676; }
  li { margin-top: 1.4pt; }
"""),
    "C": ("Serif heads", """
  body { font-size: 8.7pt; line-height: 1.5; padding: 14mm 19mm 6mm; color: #4a4a4a; }
  header h1 { font-family: 'Crimson Pro', serif; font-weight: 300; font-size: 26pt; letter-spacing: -0.01em; }
  header .role { font-size: 9.4pt; font-weight: 400; color: #6b6b6b; margin-top: 3pt; }
  header .contact { font-size: 8pt; color: #6b6b6b; margin-top: 7pt; }
  h2 { font-family: 'Crimson Pro', serif; font-style: italic; font-weight: 300; font-size: 13pt;
       letter-spacing: 0; text-transform: none; color: #262626; border: 0; padding: 0; margin: 12pt 0 4pt; }
  .job { margin-top: 9pt; }
  .job h3 { font-size: 9.4pt; }
  .job h3 .sep { color: #b5b5b5; }
  .dates { font-size: 8pt; color: #767676; }
  li { margin-top: 1.5pt; }
"""),
    "D": ("Mono details", """
  body { font-size: 8.8pt; line-height: 1.55; padding: 16mm 19mm 8mm; color: #4a4a4a; }
  header h1 { font-size: 15pt; font-weight: 500; letter-spacing: 0; }
  header .role { font-size: 9.4pt; font-weight: 400; color: #6b6b6b; margin-top: 2pt; }
  header .contact { font-family: 'Azeret Mono', monospace; font-size: 7pt; color: #6b6b6b; margin-top: 8pt; letter-spacing: .01em; }
  h2 { font-family: 'Azeret Mono', monospace; font-size: 7pt; font-weight: 400; letter-spacing: .1em;
       color: #767676; border: 0; padding: 0; margin: 17pt 0 7pt; }
  .job { margin-top: 10pt; }
  .job h3 { font-size: 9.4pt; }
  .job h3 .sep { color: #b5b5b5; }
  .dates { font-family: 'Azeret Mono', monospace; font-size: 7pt; color: #767676; letter-spacing: .02em; }
  li { margin-top: 1.5pt; }
"""),
}

base = SRC.read_text().replace("url(fonts/dm-sans", "url(../../resume/fonts/dm-sans")
pngs = []
for key, (name, css) in VARIANTS.items():
    html = base.replace("</head>", f"<style>{FONTS}{QUIET}{css}</style>\n</head>")
    out = HERE / f"{key}.html"
    out.write_text(html)
    pdf = HERE / f"{key}.pdf"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    "--virtual-time-budget=8000", f"--print-to-pdf={pdf}", out.as_uri()],
                   check=True, capture_output=True)
    pages = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True).stdout
    pages = [l for l in pages.splitlines() if l.startswith("Pages")][0].split()[-1]
    subprocess.run(["pdftoppm", "-r", "110", "-png", "-f", "1", "-l", "1", "-singlefile", str(pdf), str(HERE / key)], check=True)
    pngs.append((key, name, HERE / f"{key}.png"))
    print(key, name, "pages:", pages)

# Contact sheet, captions above each page.
from PIL import Image, ImageDraw, ImageFont
ims = [Image.open(p) for _, _, p in pngs]
w, h = ims[0].size
gap, top = 48, 70
sheet = Image.new("RGB", (len(ims) * w + (len(ims) + 1) * gap, h + top + gap), "#efefec")
d = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 30)
except Exception:
    font = ImageFont.load_default()
for i, ((key, name, _), im) in enumerate(zip(pngs, ims)):
    x = gap + i * (w + gap)
    d.text((x, 22), f"{key} · {name}", fill="#262626", font=font)
    sheet.paste(im, (x, top))
    d.rectangle([x - 1, top - 1, x + w, top + h], outline="#d6d6d2")
sheet.save(HERE / "sheet.png")
print("sheet", sheet.size)
