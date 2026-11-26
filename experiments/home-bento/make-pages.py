"""Builds four full home pages, one per bento option, from a built
dist/index.html. Usage: python3 make-pages.py <dist folder>
Each page is the real home page with that option's section inserted
after Selected work ("View all work"), before Beyond work."""
import re, sys, os
here = os.path.dirname(os.path.abspath(__file__))
dist = sys.argv[1]
mock = open(os.path.join(here, 'index.html')).read()
home = open(os.path.join(dist, 'index.html')).read()

css = mock[mock.index('/* ---- the shared card ---- */'):mock.index('</style>')]
tones = mock[mock.index('<style id="bento-tones">'):]
tones = tones[:tones.index('</style>') + len('</style>')] + '\n'
style = """<style id="bento-style">
.hb{--serif:var(--font-serif);--sans:var(--font-sans);--mono:var(--font-mono);
  --ease-out:cubic-bezier(.16,1,.3,1);--ease-in-out-go:cubic-bezier(.4,0,.2,1);
  --card:color-mix(in srgb,var(--fg) 3%,var(--bg));--card-hover:color-mix(in srgb,var(--fg) 5%,var(--bg));
  --radius-card:28px;--radius-inner:20px;--gap:1.5rem;--pad:1.75rem;
  --chip-fill:color-mix(in srgb,var(--fg) 5%,var(--bg));--chip-fg:color-mix(in srgb,var(--fg-dim) 85%,var(--fg));
  --go-w:92px;--go-h:40px;--go-ring:color-mix(in srgb,var(--fg) 18%,transparent);
  font-family:var(--font-sans);font-weight:600;color:var(--fg)}
.hb h2.u-heading{margin-bottom:var(--space-head-cards,3rem)}
.hb a{color:inherit;text-decoration:none}
.hb .label{font:400 11px/1.4 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--fg-dim)}
.hb p{margin:0}
.hb ul{margin:0;padding:0}
.hb{
""" + css + "\n}\n</style>\n" + tones

def block(opt):
    """The option's grid, cut out by matching its <div> tags."""
    start = mock.index(f'<div class="{opt}"')
    depth, i = 0, start
    for m in re.finditer(r'<(/?)div\b', mock[start:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return mock[start:start + m.end() + len('>') - 1 + 1].rstrip()
    raise ValueError(opt)

gmail = 'https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=anupama.mishra113@gmail.com'
syms = mock[mock.index('<svg width="0"'):mock.index('</svg>\n\n<nav')+6]
for opt, name in [('A','a-like-hers'),('B','b-resume-first'),('C','c-with-photos'),('D','d-one-quiet-band')]:
    g = block(opt)
    g = g.replace('src="portrait.webp"', 'src="/images/about/anupama-portrait.webp"')
    g = g.replace('src="resume-p1.png"', 'src="/images/bento/resume-p1.png"')
    g = re.sub(r'src="(art-porch|talk-smile)\.webp"', r'src="/images/beyond/\1.webp"', g)
    g = g.replace('href="#"', f'href="{gmail}" target="_blank" rel="noopener"')
    section = (f'\n<!-- Bento option {opt} (experiments/home-bento) -->\n'
               f'<section class="u-section u-shell hb" aria-labelledby="hb-h">{syms}'
               f'<h2 class="u-heading" id="hb-h">A bit <em>about me</em></h2>\n{g}\n</section>\n')
    page = home.replace('<section class="beyond"', section + '<section class="beyond"', 1)
    page = page.replace('</head>', style + '</head>', 1)
    open(os.path.join(dist, f'home-{name}.html'), 'w').write(page)
    print(name, len(page))

# ---- One page with every option and a switcher (on request, 2026-11-26:
# "I want to be able to select different options"). Pick an option from
# the bar at the bottom left, or open home-bento.html?opt=B. "None" shows
# the home page as it is today. The bar is review chrome, not design.
names = {'A': 'Like hers', 'B': 'Resume first', 'C': 'With photos', 'D': 'One quiet band'}
sections = ''
for opt in names:
    g = block(opt)
    g = g.replace('src="portrait.webp"', 'src="/images/about/anupama-portrait.webp"')
    g = g.replace('src="resume-p1.png"', 'src="/images/bento/resume-p1.png"')
    g = re.sub(r'src="(art-porch|talk-smile)\.webp"', r'src="/images/beyond/\1.webp"', g)
    g = g.replace('href="#"', f'href="{gmail}" target="_blank" rel="noopener"')
    sections += (f'\n<!-- Bento option {opt}: {names[opt]} -->\n'
                 f'<section class="u-section u-shell hb" data-opt="{opt}" aria-labelledby="hb-h-{opt}" hidden>'
                 f'<h2 class="u-heading" id="hb-h-{opt}">A bit <em>about me</em></h2>\n{g}\n</section>\n')
buttons = ''.join(f'<button type="button" data-pick="{o}" aria-pressed="false">{o} </button>' for o, n in names.items())
switcher = f'''
<div class="hb-pick" role="group" aria-label="Bento option">
  <span>Bento</span>{buttons}<button type="button" data-pick="none" aria-pressed="false">None</button>
  <span>Cards</span><button type="button" data-set="tones" data-v="hues">Colours</button><button type="button" data-set="tones" data-v="neutral">Neutral</button>
  <span>Dot</span><button type="button" data-set="dot" data-v="ink">Ink</button><button type="button" data-set="dot" data-v="green">Green</button><button type="button" data-set="dot" data-v="blink">Blink</button><button type="button" data-set="dot" data-v="pulse">Pulse</button>
  <span>Size</span><button type="button" data-set="size" data-v="l">L</button><button type="button" data-set="size" data-v="m">M</button><button type="button" data-set="size" data-v="s">S</button>
  <span>Words</span><button type="button" data-set="line" data-v="1">1</button><button type="button" data-set="line" data-v="2">2</button><button type="button" data-set="line" data-v="3">3</button><button type="button" data-set="line" data-v="4">4</button><button type="button" data-set="line" data-v="5">5</button><button type="button" data-set="line" data-v="6">6</button>
</div>
<style>
.hb-pick{{position:fixed;left:16px;bottom:16px;z-index:2147483000;display:flex;flex-wrap:wrap;align-items:center;gap:4px;
  padding:6px;border-radius:999px;background:var(--bg);color:var(--fg);
  box-shadow:0 0 0 1px color-mix(in srgb,var(--fg) 12%,transparent),0 10px 30px -12px rgb(0 0 0/.25);
  font:400 11px/1 var(--font-mono);letter-spacing:.06em;text-transform:uppercase}}
.hb-pick{{border-radius:22px;max-width:calc(100vw - 32px)}}
.hb-pick span{{padding:0 8px 0 10px;color:var(--fg-dim)}}
.hb-pick span:not(:first-child){{margin-left:6px;padding-left:12px;border-left:1px solid color-mix(in srgb,var(--fg) 14%,transparent)}}
.hb-pick button{{font:inherit;letter-spacing:inherit;text-transform:inherit;border:0;cursor:pointer;padding:8px 9px;border-radius:999px;
  background:transparent;color:var(--fg)}}
.hb-pick button:hover{{background:color-mix(in srgb,var(--fg) 6%,var(--bg))}}
.hb-pick button[aria-pressed=true],.hb-pick button.on{{background:var(--fg);color:var(--bg)}}
.hb-pick button:focus-visible{{outline:2px solid var(--fg);outline-offset:2px}}
</style>
<script>
(() => {{
  const all = [...document.querySelectorAll('.hb[data-opt]')];
  const btns = [...document.querySelectorAll('.hb-pick [data-pick]')];
  const show = (o, keep) => {{
    const anchor = all.find(s => !s.hidden);
    const top = anchor ? anchor.getBoundingClientRect().top : null;
    all.forEach(s => s.hidden = s.dataset.opt !== o);
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.pick === o)));
    const u = new URL(location.href); u.searchParams.set('opt', o); history.replaceState(null, '', u);
    // keep the section where it was on screen, so options compare in place
    const now = all.find(s => !s.hidden);
    if (keep && now && top !== null) window.scrollBy(0, now.getBoundingClientRect().top - top);
  }};
  btns.forEach(b => b.addEventListener('click', () => show(b.dataset.pick, true)));
  const sets = [...document.querySelectorAll('.hb-pick [data-set]')];
  const setTo = (k, v) => {{
    document.body.dataset[k] = v;
    sets.forEach(b => {{ if (b.dataset.set === k) {{ b.classList.toggle('on', b.dataset.v === v); b.setAttribute('aria-pressed', String(b.dataset.v === v)); }} }});
    const u = new URL(location.href); u.searchParams.set(k, v); history.replaceState(null, '', u);
  }};
  sets.forEach(b => b.addEventListener('click', () => setTo(b.dataset.set, b.dataset.v)));
  const q = new URLSearchParams(location.search);
  setTo('tones', q.get('tones') || 'hues');
  setTo('dot', q.get('dot') || 'pulse');
  setTo('size', q.get('size') || 'm');
  setTo('line', q.get('line') || '1');
  const first = q.get('opt');
  show(['A','B','C','D','none'].includes(first) ? first : 'A', false);
}})();
</script>
'''
page = home.replace('<section class="beyond"', syms + sections + '<section class="beyond"', 1)
page = page.replace('</head>', style + '</head>', 1).replace('</body>', switcher + '</body>', 1)
open(os.path.join(dist, 'home-bento.html'), 'w').write(page)
print('home-bento', len(page))
