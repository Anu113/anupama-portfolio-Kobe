# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

The portfolio site for **Anupama Mishra**, a product designer with 10+
years' experience. Most recently Staff
Product Designer at Okta on Identity & Access Management, where she also led a
team of six. Earlier: PayPal, Walmart Labs, Deloitte Digital, Zomato. Her domain is
**fintech first**, then enterprise software and developer tools — lead with
fintech when describing her range, not enterprise.

**The site has one job: land a Staff or Lead Product Designer role.** She
isn't only looking for remote work, so don't state "remote" as a condition
anywhere. Every decision serves that. When a change
would make the site prettier but less effective at that job, say so.

The role she is asking for is a **senior IC one** (or IC-track design-eng).
Leading six designers is evidence of scope, influence and judgement — it is
not the ask, and no page should read as a management pitch. The ask is
written once, in `site.ask` (`data/site.ts`); every place that states it reads
from there.

Live site today: `anupama.design` (Wix). This repo replaces it.

## The positioning (read this before touching anything visual)

This is **not** a graphic-design portfolio, an editorial/magazine layout, or
a generic SaaS landing page. It is a working artifact from someone who does
product design and understands how products get built — closer to
**product design × design engineering × digital craft**.

A visitor should feel, within seconds: *this person knows how to design
complex products, understands how things are built, and cares about the
final pixel.* Not "look what I can build." The site should **quietly
demonstrate** capability, not announce it.

Concretely, that means:

- **Deep product thinking and UX judgment over decoration.** Every visual
  choice should read as a design decision with a reason, not a flourish.
- **Visual-first, text-light.** If a section can communicate through a
  screenshot, interface fragment, diagram, before/after, or short interaction
  instead of a paragraph, it should. The work does the talking; copy is
  captions and short context, not essays.
- **Design-engineering felt through the implementation, not announced by it.**
  Precise spacing, real interaction states, sensible motion, clean responsive
  behavior, accessible keyboard/focus handling — that IS the design-eng
  pitch. A hand-rolled effect that exists to prove technical range is the
  opposite of this.
- **Seniority through restraint.** A senior designer doesn't over-explain a
  decision or over-decorate a page. Prefer strong visual evidence + concise
  context over paragraphs about how thoughtful the process was.

### Avoid the portfolio-template look

Do not reach for: a giant "Hi, I'm X" hero, gradient blobs, oversized
centered type as the default register, cards-inside-cards, heavy rounded
corners, glassmorphism, decorative 3D objects, fake dashboard graphics,
skill-meter/badge grids, "UX / UI / Research / Strategy" icon rows, generic
stat counters, rainbow or SaaS-startup gradients, Behance-style case-study
scrolls, or magazine layouts that put text ahead of product. If a component
under consideration matches one of these, it needs a specific reason to
exist here, not just precedent from other portfolios.

### Avoid the "showing off" look — but craft is allowed to be felt

Motion, cursor effects, and interaction flourishes still need a **UX
reason**, not just a capability to demonstrate — that principle doesn't
change. What changed is where the bar sits: a small number of signature
moments are now deliberately part of the pitch, because for a design-eng
role, *feeling* the engineering is the point. The difference between this and
"showing off" is restraint in **quantity and volume**, not in ambition per
effect:

- **One hero treatment, not effects scattered everywhere.** The hero may
  carry a genuinely crafted moment — currently a subtle WebGL flow-noise
  shader behind the headline (ink → accent, ~0.55 opacity, a scrim on top for
  text contrast, frozen to a static frame under `prefers-reduced-motion`).
  It should read as texture noticed on a second look, not a lava lamp. This
  is the one place on the site allowed to be visibly "built," and it earns
  that by being the very first thing a visitor sees — it sets the design-eng
  claim before a word of copy does.
- **The preloader, on the home page, on first paint** (`Preloader.astro`,
  "Pixel blinds", on request, 2026-11-18, "F · Pixel blinds" of
  `experiments/curtain-pixel/`, after mariavasilyeva.com's cover; rounds
  in `experiments/curtain-bars/` and `curtain-shapes/` led there). The
  whole screen is flat ink over the hero (no shadow, a hard edge;
  re-inked light in dark mode; black-in-both-modes and oxblood were mocked too, no pick made, so it stays ink). After
  a beat the ink is cut into horizontal slats that pull back to the left
  in whole-pixel steps, top first, each trailing one loose pixel; one
  pixel is the last to go, on the word "pixel" in the hero sentence,
  holds a moment and pops. Then the hero is simply there: no glide, no
  focus-in, no peek. It moves only as far as the page has loaded
  (images, and the hero's first frame via `hero-scrub:ready`, not her 4.6MB sheet): while loading,
  the slats clear in proportion and the last pixel waits; at 4s it lets
  go regardless and the page shows as it is (2.5s since 2026-11-19, was 4s;
  never a frozen black screen). ~2s on a loaded page. Home page only,
  every time it's opened or refreshed (on request); not when arriving
  from another page of the site, nor on back/forward. A deliberate key,
  click, tap or real scroll skips it (not in its first 1.2s, never a
  shortcut such as Cmd+R): the layer fades and the hero shows. A CSS
  failsafe hides it at 20s; it removes itself from the DOM. It always
  hands over to the hero (on request, 2026-11-17): no scroll restoration
  on a refresh, and the page is held at the top under the curtain
  (`data-preloader-hold`, released when it ends or at 20s). Under
  reduced motion: no slats, the ink fades. Values under PRELOADER in
  `tokens.css`. Moss pushing the curtain (2026-11-16 to 11-18, after
  huyml.co, `experiments/preloader-moss/`) is parked in
  `PreloaderMoss.astro` with his tokens and `moss-push.webp`, on request
  ("stop the pushing of Moss for now"). The terracotta "dot that went
  for a walk" loader is in git history; the walking loader
  (`Loader.astro`, `data/loader.ts`, `scripts/walk-sprite.py`, LOADER
  tokens) is parked, not deleted.
  Its reason: the one screen with nothing else to show; it opens on her
  sentence and says its last word, "pixel", once, without a word.
  The sentence itself ends on a square full stop, a pixel, to answer it
  (on request, 2026-11-18; `.hero__stop`, `--hero-stop-size`; the real
  "." stays for screen readers and copying).
- **A consistent hover system on interactive surfaces**, not one bespoke
  effect per component. Work tiles, links, and cards get *the same* motion
  vocabulary reused everywhere: default state is quiet; hover reveals
  information that was intentionally withheld (title, metric, an implied UI
  detail nudging) using one shared easing curve and duration sitewide. The
  "one curve, one duration, reused everywhere" constraint is what keeps a
  sitewide hover system from reading as a pile of tricks — pick the curve
  once (e.g. `cubic-bezier(.16,1,.3,1)`, ~500-600ms for reveals, faster for
  micro-feedback) and put it in `tokens.css`, not per component.
- **`CursorTrail`, kept.** The existing 12-point spring-chain cursor effect
  (`CursorTrail.astro`) stays, on request — it's the one earlier "capability
  demo" component that survives this pass rather than being folded into the
  hover system. It keeps its existing constraints unchanged: hover devices
  only, no pointer events, `display: none` under `prefers-reduced-motion`,
  draws in the theme colour under the pointer, suppressed sitewide only on
  `/playground` (see the dedicated section on it further down). Its one
  companion is `CursorLamp` (below); don't add a third cursor effect.
- **`CursorLamp`, approved on request** (after studio-nikita.com). In dark
  mode only, a soft pool of light sits under the pointer and glides after
  it. It runs alongside `CursorTrail`, by explicit choice over replacing
  it. Its reason: dark mode lights the hero as a late-night scene, and
  this carries the scene down the page, with the pointer as the lamp.
  Its colour is "candle", a faint warm white (`--lamp-hue`), picked from
  a mockup of fourteen; white, warm grey, deep blue, umber and a
  darkening "dent" were tried and dropped. It's a small fixed,
  screen-blended layer inside `<main>` (so the page's curve clips it off
  the footer), moved by transform, its strength rides `--hero-night`,
  it's off under reduced motion and on touch, and it shares
  `CursorTrail`'s `/playground` opt-out. Text near it used to cast a
  short shadow away from the pointer; that is off, on request
  (2026-11-13: `--lamp-cast-alpha: 0`, code kept) — don't turn it back
  on. In the hero (chosen from round 2 of the shadow mocks, on request)
  the row sits above the lamp's layer (`--z-lamp`), so the lamp lights
  the ground behind her instead of fogging her. She is lit
  in `HeroIllustration`'s canvas from the lamp's `cursor-lamp` event:
  colour × light (never a screen blend), a rim on the edge facing it,
  her far side dimmed, a faint glint on the laptop lid, and behind her
  a little extra floor light with her shadow cut out of it plus contact
  pools under the legs (all night). Moss gets the same light, rim and
  contact pool. In light mode the lamp is off the page entirely
  (`display: none`), not just at zero strength: a screen-blended layer
  fixed over the page made the browser re-blend what scrolled under it.
  Values under CURSOR LAMP in `tokens.css`.
- **Moss, the "ask about my work" character (`AskBubble.astro`),
  approved on request.** Called Pixel in the code (`.pixel-*`, `pixelTree`,
  the "Pixel" block in `tokens.css`) — that's the internal name; the visitor
  sees "Moss", a tiny design critter who looks after the portfolio. Art is
  Anupama's own watercolour and her 8s clip of him looking around
  (`public/images/moss/`, regenerated by `scripts/moss-sprite.py`). He replaced earlier Grogu and Totoro passes; unlike those he's
  an original character, so no IP caveats. His lore, added on request: he's
  Totoro's younger brother, the only difference being that he talks — a
  one-line joke in his "Who are you?" answer (`ask.ts`), not his look. Its interaction model follows
  ozgur.design's Dobby chat (studied screen by screen). Don't swap in
  another character without her asking. What's fixed:
  - Launcher: Moss himself, sitting on the books in the hero illustration,
    with a chat-preview card to his right (chosen from a round of seven
    mockups, after the old speech bubble on his head read as a notification
    badge): "Moss", small and dim with an accent dot, over "Psst…", and a
    tail pointing back at him. The card uses the page's role colours, so it
    re-inks in dark mode. Words at rest are what make it findable (after a
    UX test where a visitor nearly missed the old wordless bubble). Moss and
    the card are one button. At rest the only motion is the ellipsis after
    "Psst" slowly fading in and out, all three dots together (chosen on
    request over a bouncing typing wave; static under reduced motion); on hover/focus the card
    lifts and "Want the short version?" opens under "Psst…" in ink,
    growing right (away from her face, never over him). Where the open card
    wouldn't fit to his right (two-column screens narrower than ~1280px) it
    sits under him on the table instead; above him was tried and covered her
    face. Touch devices show the offer always. Moss answers the pointer, never moves on his own: he
    scrubs through his clip in lockstep with the portrait —
    `HeroIllustration` dispatches `hero-scrub:frame` and Moss shows the same
    frame, one timeline for both, so keep the two clips at the same 48
    frames — and the same 96: once the page is up, both swap quietly to
    96 pictures (every 2nd frame of their clips, `hero-sprite-96.webp`,
    `moss-sprite-96.webp`, from the same scripts with `96`), so they step
    half as far per move (option C of `experiments/hero-frames/`, on
    request, 2026-11-16; a blend of the 48 showed two faces mid-turn and
    was dropped). The page never waits for the 96 — and he perks up when hovered. Fine pointers only; frame 0 and
    still under reduced motion.
  - Panel: opens on click as a dialog with a scrim; dark (the site's `ink`
    values) and **monospace throughout** — deliberately unlike the rest of
    the site, so the conversation reads as a machine talking — with soft
    rounded corners. That's one of two sanctioned exceptions to the square
    `--radius` rule (the other is the page's curved end over the black
    footer, below); the site's own cards stay square. Colours, corners and
    timing live in the "Pixel" block of `tokens.css`. One Moss in the
    panel, in the header beside his name (on request, 2026-11-25,
    `experiments/moss-edges/`: "1 · Dark disc" + "Peek", and "H · No
    big Moss"; the white avatar circle and the big Moss over the greeting
    are gone): his body sits in a dark disc, his head and ears out over
    its rim. At rest he peeks, half down in it; he comes up while he
    thinks and answers or the pointer is on the panel, and sinks back
    after. Still and up under reduced motion. Values under PIXEL MOSS.
    His image, `moss-sm.webp`, has its pale rim and the white smear
    under his feet cleaned by `scripts/moss-defringe.py` (run by
    `moss-sprite.py`).
  - Content: a conversation tree in `src/data/ask.ts` — buttons only, no
    free text, no model, no backend. Moss's voice comes from her character
    brief (summarised at the top of `ask.ts`): curious, dry, slightly
    cheeky, short lines, a hook then the facts, humour about design life
    used sparingly, never baby talk. The facts are never bent by the voice,
    and when something isn't on the site he says so rather than guessing.
    The facts stay plain and come only from `cases.ts`/`site.ts`, with `site.ask`,
    `site.location`, `site.email` read from `site.ts`. Every path ends in a
    case study or a way to reach her.
  - A11y, as built: focus moves in and stays in, Escape closes and returns
    focus, replies go to screen readers once through a live region (the
    typewriter is visual only), everything static under reduced motion.
  - Pill after the hero (on request, 2026-11-19, round 3 of
    `experiments/moss-cta/`, after gauravi.design's "ask AI" pill, picked
    because the hero card alone was missable): once Moss on the books
    has scrolled out of view, his still frame stands in the bottom-right
    corner (where his panel opens) beside a light message, "Moss" over
    "Short on time? Let Moss help." (her earlier launcher line), mono,
    white on a hairline and soft shadow ("Paper"). The first time it
    shows, the line types itself in once behind a blinking accent bar
    caret (a mark, like the panel's). Hidden over the black footer and
    while the panel is open; same panel, focus returns to it. Static
    under reduced motion. Values under ASK DOCK in `tokens.css`. The
    hero card keeps its words and behaviour, on request. It's the same
    Moss following the visitor, not a second chat.
  Keep it to one character with one voice; don't give it idle animation on
  the hero beyond the breathing ellipsis, and don't add a second chat or
  mascot elsewhere. One second place for him is approved, on request:
  the "Ask Moss anything else" field under the home page's Small talk
  (below), with the same tree and voice. It's the one place a visitor
  types to him: the text is matched in the browser against `pixelKeys`
  in `ask.ts` (no model, nothing sent or kept), and when nothing
  matches he says so (`pixelUnknown`) rather than guess.

- **`PixelBreak`, approved on request, now parked** (2026-11-17, on
  request: the hero's "pixel" is plain text again; the component, its
  tokens and its sand sound stay, no page mounts it). The word "pixel" at the end of
  the hero sentence breaks into ~3px round dots when the pointer crosses
  it and settles back into type. While the pointer stays on the word
  the dots stay broken and are repelled by it like a magnet; they go
  home only when it leaves. The dots are a seven-colour rainbow (on
  request), crossfading with the text at both ends — the one sanctioned
  rainbow on the site, and only while the word is broken (`PixelBreak.astro`, tokens under PIXEL
  BREAK). Its reason: the sentence claims "the last stubborn pixel", and
  the word answering the pointer shows that claim at the scale of one
  word. Fine pointers only, plain text under reduced motion, the real
  text stays in the DOM throughout. One word only — don't spread it to
  other headings.

- **`Bookshelf`, approved on request** (after cali.so's "Books I love").
  The About page's "Books I love" stage: 3D books on a wooden plank,
  spines out; clicking one turns it to its cover while the rest slide
  and lean (650ms ease-in-out, geometry in `data/books.ts`). Spine tones
  and wood live under BOOKSHELF in `tokens.css` and, like project hues,
  belong to the objects, never to page chrome. Instant from the keyboard
  and under reduced motion. The books are hers, read off photos of her
  bookcase: ten picked at random from her photos, on one shelf (`books`
  in `data/books.ts`). Spines follow a reference she sent: a short rule,
  bold sans title, author in mono. About page only, one shelf.
  Parked since 2026-10-17 (the About rebuild, below): the component and
  `data/books.ts` stay, the page doesn't mount it; her books now show in
  the About page's Books tab and its Books tile.

- **`BeyondWork`, approved on request** (after andreas.vision's
  community ring; version D of the mocks in `experiments/beyond-work`).
  On the home page between the project cards and the playground line:
  "Beyond *work*" in our 44px serif, one grey line and his ink pill
  pair ("More about me" + an arrow that swaps on hover) in the middle,
  ringed by her photos and paintings on a tilted ring that drifts
  slowly. The near half passes in front of the words, the far half
  behind them, smaller, fainter and softened (a pre-blurred copy fading
  in, not a live CSS blur, which halved the frame rate). Drag throws it
  with inertia; arrow keys turn it; the band is one focus stop and holds
  still under keyboard focus. His rounded cards and pills are kept, on
  request, as an exception to the square `--radius` rule; the type is
  ours. Life outside work only — no UI or product work, one talk poster,
  one mic photo, and none of the crying (crown) painting, the mermaid,
  the lit bob portrait or the grandmother painting, on request. Images
  and ring numbers in `data/beyond.ts`, files in `public/images/beyond/`
  (480px wide plus a `-blur` copy), values under BEYOND WORK in
  `tokens.css`. No drift under reduced motion. Its reason: one screen
  shows who she is outside the work without a paragraph about it, then
  hands over to About. Home page only, one ring.

- **`PlayBall`, approved on request, now parked** (2026-11-13: /playground
  is the gallery wall, `PlayDepth`, below; the component and
  `data/playground.ts` stay, no page mounts it). A copy of andreas.vision/play,
  measured off his page on 2026-10-19; chosen from rounds of mocks in
  `experiments/playground-views/`, the final one `exact.html`). The
  whole of /playground as it was: ~120 cards on a ball, facing you, turning
  slowly about the vertical, with "A place for *endless*
  experimentation" in the middle (the far half drawn under it, the near
  half over it; near the words cards shrink back and slip behind them,
  "Recede" from five mocks in `experiments/playground-views/breathing.html`,
  so the line has air round it). Drag spins it like a
  globe in any direction and a throw keeps going, easing back to the
  drift; over a card the drift slows and the card lifts with a shadow;
  the ball leans a little toward the pointer. Tiles are solid (no
  see-through on overlap) and the motion slow and one-directional, on
  request, after a round of busier 3D shapes was turned down. His
  Cloud / Grid pill switches views, its icon four of her pieces in a
  loose heap that settle into 2 × 2 on Grid ("Photos", from seven mocks
  in `switch-icons.html`); Grid pours the ball into one pile per category (Animation,
  Art, Photos; no web or app screens, on request — the product work
  lives on /work): the ball holds still and cards leave from
  the bottom up, one after another, each dropping into its pile, the
  labels there from the start, and back to Cloud plays it in reverse.
  A pile opens into a strip you can drag. The ball is drawn on two
  canvases (as his is in WebGL): 120 rounded DOM layers in CSS 3D ran
  at ~30fps. The DOM cards stay for focus, screen readers and the
  grid. The 24 pieces repeat to fill the ball; repeats are aria-hidden
  and sink into their pile. His rounded cards and pill are kept, an
  exception to the square `--radius` rule, like BeyondWork's. Pieces
  and the ball's numbers in `data/playground.ts`, thumbnails from
  `scripts/playground-thumbs.py` into `public/images/playground/`,
  values under PLAYGROUND in `tokens.css`. Nothing drifts, leans or
  flies under reduced motion. Its reason: the playground's work seen
  whole at a glance, sorted by kind in one press. The old endless
  stream (`InfiniteStream.astro`, `data/play.ts`) is parked, not
  deleted. Several Animation pieces are stills until clips are
  recorded.
  /playground is now the gallery wall (on request, 2026-11-13; first
  built at a hidden `/playground/stream`, since removed),
  `PlayDepth.astro`, approved on request (2026-11-11, mocks in
  `experiments/playground-stream/`, `wall.html`; it replaced a
  three-layer depth field that read as cluttered): her paintings,
  photos and portrait (no app screens, no Bob painting, Moss or
  smiley) hung as a gallery wall — columns with even gutters,
  nothing overlapping, endless sideways (drag, swipe, arrow keys).
  It opens on the heading alone; the work starts below its line and
  rises over it while the heading drifts up slowly, then leaves. No
  fades. The wall follows the page's own scroll at 0.8x, eased, each
  column at a slightly different speed; each column ends 96px above
  the screen's bottom when the page goes on to the footer. Captions
  on hover only, 10px mono, within the piece's width; paintings get
  evocative titles and a gallery-label medium, no "by me". Numbers
  in `data/playDepth.ts`, values under PLAY DEPTH in `tokens.css`.
  Its reason: the work seen whole as a wall you walk along, at your
  own pace.
  Each picture on it breathes (on request, 2026-11-18, option A
  "Breathe" of `experiments/playground-motion/`, after
  mariavasilyeva.com, whose tiles are short loops): it slowly pushes in
  and drifts inside its frame, then eases back, 8–12s, each on its own
  phase; not the cut-out portrait; still under reduced motion. An
  approved exception to the no-idle-animation rule, this wall only.
  Wet paint, scroll pull, window light and hover-only were mocked and
  passed over. Values under PLAY DEPTH in `tokens.css`.

- **`GlobeStory`, approved on request, now parked** (2026-11-25, on
  request: "remove that for now"; the component, its map, script and
  GLOBE STORY tokens stay, no page mounts it, and "Selected work."
  keeps its square full stop, simply there). Built 2026-11-23, andreas.vision's
  globe sequence step for step, mocked in `experiments/espresso-page`
  and picked there as "Like the reference", "Table wood", "Smooth",
  "Rounded"). Between the hero and Selected work: as the hero scrolls
  away the top of a huge pixel globe comes up under it, fills the
  screen and closes in on Bangalore (Moss standing there, a tag),
  pulls back, tips north while lines run to PayPal, Okta and Walmart
  (their head offices, not where she sat) with Moss travelling them
  and the globe moving to the left half, then "Built to *untangle*"
  beside it on the right with a "More about me" pill pair ("Beside the
  globe" of `experiments/home-explore`, 2026-11-24; under 861px the
  globe stays centred and the words sit under it); it ends ("E · Into a pixel" of
  `experiments/globe-endings`, 2026-11-24) with the wood closing in on
  the globe like an iris, the globe shrinking to one square that drops
  into the page and is the full stop of "Selected work." (in the
  globe's land colour; hidden until it lands, simply there under
  reduced motion). A real
  map (`public/images/globe/land.png`, Natural Earth, made by
  `scripts/globe-land.py`), nothing loaded from elsewhere. Rounded
  pixel tiles that fade to each new colour, so it moves without
  flashing (flashing was turned down). Colours are her painting's
  table, light, and belong to the object like project hues; "untangle"
  is in her sweater's rust, her pick. Static closing frame under
  reduced motion. Values under GLOBE STORY in `tokens.css`. Its reason:
  one picture of the range (one desk in Bangalore, products used
  around the world), handing the eye to the work.

Outside those eight moments — hero shader, first-paint loader, the reused
hover system, `CursorTrail`, `CursorLamp`, Pixel, BeyondWork, the playground wall (the globe story is parked) — the old rule still applies at full strength:
prefer hover previews, subtle scale/opacity shifts, masked/positional
transitions, scroll-linked reveals tied to content appearing, fast and
physically believable feedback. Avoid slow cinematic transitions,
floating/bouncing idle animation, parallax for its own sake, a second
full-screen shader anywhere else on the site, or any interaction whose only
purpose is "this is hard to build." If you can't name the UX reason for an
interaction in one sentence, cut it — that test still applies to the five
allowed moments too, it just resolves differently for them (the hero shader's
reason is "sets the design-eng claim on first paint"; the loader's is "the
one screen with nothing else to show"; the hover system's is "reveals
information, doesn't just move"; `CursorTrail`'s is the standing one already
in this file — a felt, physical response to the pointer, not a demo;
Pixel's is "a recruiter short on time gets level, scope and the ask in two
clicks, then lands on the evidence").

## The two audiences, in tension

1. **A recruiter, 60–90 seconds, skimming.** Needs the level, the surface
   area and business impact fast, mostly from visuals and hierarchy — not
   from reading paragraphs.
2. **A hiring manager or design leader, reading properly.** Wants craft,
   judgement, and evidence she can carry a hard problem end to end. Give them
   progressive disclosure — more detail available on demand — rather than
   putting everything up front.

If a change buries her scope or a metric behind an interaction, or forces
either audience to read a wall of copy to get the point, flag it.

## Architecture

Astro 5, static output. Tailwind 4 present but **most styling is plain CSS using
custom properties**, scoped inside each `.astro` component. GSAP and anime.js
are available for motion that CSS transitions/IntersectionObserver can't
express cleanly (sequenced timelines, physics-based easing); still default to
plain CSS transitions and scroll-driven effects for anything simple enough for
those. Still no React: components ported from React sources are rewritten as
plain `.astro`.

```
src/
├─ styles/
│  ├─ tokens.css     ← every colour, type size, space value, easing. THE file.
│  └─ global.css     ← type roles (.u-display, .u-label), a11y baseline
├─ layouts/Base.astro
├─ components/       ← each with a header comment
├─ data/site.ts      ← email, links, one-liners
└─ pages/
public/
├─ images/           ← placeholder-*.svg are stand-ins, replace freely
└─ reference/        ← inspiration screenshots
```

## Rules

**1. Never hardcode a colour, font size, or spacing value.**
Use `var(--bg)`, `var(--fg)`, `var(--step-h2)`, `var(--gutter)`, etc. If a value
you need doesn't exist, add it to `tokens.css` rather than inlining a hex.
Hardcoded colours break the theme system.

**2. Colour is restrained by default, and belongs to the work.**
The base palette is near-neutral: ink/near-black, paper/off-white, warm
greys, and **one** accent colour, tokenised the same way everything else is.
That's the register every page opens in. Saturated colour is earned by the
work itself — a project's own product UI, a screenshot, a diagram — not
applied to page chrome to differentiate bands. Before adding a new palette or
themed band, ask whether a neutral treatment with the work's own imagery
providing the colour would do the job better; it almost always will. Don't
recreate the old multi-palette "chapter" system (8+ named themes wearing
different hues) — that was the editorial/expressive direction this file used
to specify, and it's exactly what reads as graphic-design rather than
product-design.

**3. Case studies lead with a visual, then answer fast, then let the work
breathe.**
This matters more than anything else in the repo. A wall of narrative prose
argues she is a mid-level designer who explains rather than a senior one who
ships. Every case study should answer, quickly and largely through visuals:

1. What was the problem? (one or two sentences, business stakes)
2. What did I own? (scope — what she owned, what she influenced, who else)
3. What was difficult? (the one real tradeoff, and the call she made)
4. What did I change? (how the work got made — briefly)
5. The craft — screens, UI fragments, interaction detail, now that scope and
   difficulty are established
6. What was the outcome? (business, craft, team — numbers where real)
7. What I'd do differently (short, if present at all)

Prefer an interface fragment, diagram, or before/after over a paragraph
wherever one can carry the point. Use progressive disclosure (expandable
detail, a "read more" for the deeper narrative) rather than presenting every
paragraph up front. If asked to write or restructure a case study and it's
mostly unbroken prose, rebuild it around visual evidence first. Pushing back
here is correct.

The case bodies in `cases.ts` may still narrate some of this in a manager's
voice ("the team I ran," "I staffed it"). That's acceptable as scope
evidence, but keep her hands visibly on the design work — the craft section
in particular should read as hers, not delegated.

**4. Accessibility is not optional.**
Anupama has a public talk titled *The Saga of Accessibility*. An inaccessible
portfolio is a specific credibility risk for her, not a generic lint failure.
Hold WCAG 2.1 AA: 4.5:1 for body text, 3:1 for large text and UI, visible focus
rings, keyboard-operable interactions, `prefers-reduced-motion` respected.

**5. Prefer editing tokens over editing components.**
Most requests ("make it warmer," "bigger headlines," "tighter spacing") are
`tokens.css` edits. Reach for component changes only when behaviour or
structure must change.

**6. Every interaction needs a stated UX reason.**
When adding or reviewing motion — hover state, transition, scroll effect —
be able to say in one sentence what it communicates to the visitor. "It
demonstrates technical skill" is not a reason. If the interaction delays
access to content, or exists mainly to be noticed, cut it or simplify it.

## Guardrails — don't undo these

- `<meta name="robots" content="index, follow">` in `Base.astro`. The Wix site
  was serving `noindex`, making it invisible to recruiters searching her name.
- The `prefers-reduced-motion` block at the bottom of `global.css`.
- The skip link in `Base.astro`.
- Keyboard support on any drag/scroll-rail-style interaction.
- The header comment at the top of each component. They exist so a designer
  can read the file. Keep them updated when behaviour changes.

## Don't add without asking

- A CMS, React, or a component library. Markdown and `.astro` are enough.
- Analytics or tracking scripts.
- A new themed colour band (the black footer, below, is the one approved
  dark band — don't add a second), or any component whose main purpose is
  demonstrating a technical effect rather than serving content — the hero
  shader, the first-paint loader, and the sitewide hover system (see above)
  are the named exceptions (plus `CursorTrail`, kept from the prior direction,
  and Pixel, `AskBubble.astro` — see above); a sixth "signature effect" is
  not automatically in scope just because those five are.
- A live model, backend or API key behind Pixel, or any logging of what
  visitors pick in it (that's tracking — see above). A live model also needs
  every `[X]` in `cases.ts` confirmed first, or it will invent the numbers.
- Testimonials, stat counters, skill-meter/badge grids, or icon rows for
  disciplines ("UX / UI / Research") — these read as generic and are on the
  explicit avoid-list for this rebuild.

## Current state — mid-repositioning

This repo was previously built toward an expressive, editorial, multi-palette
direction (see git history / `REFERENCE-NOTES.md` and `DESIGN.md` for that
prior brief). That direction is now considered **too decorative and too
text-heavy** for the senior/staff/design-eng positioning above, and is being
walked back. Concretely, in the current implementation:

- **Design system = allierho.com's, measured off the live site.** Three
  faces, one weight each: Crimson Pro 300 (roman + italic) for headlines,
  Manrope 600 for everything else, Azeret Mono 400 for ticking numbers
  and the case-study labels, tags and captions (`.u-label-mono`).
  Scale: display 34→50px, heading 32→44px, nav 14px, label 12px uppercase;
  plus title 22px, body 14px, copy 12px. On request (2026-10-16), from a mock, the whole site
  moved onto the reference's exact scale, measured across its pages: no
  page scale (1x on every screen; it used to grow every rem with the
  screen, up to 1.8x, and read as too big), reading copy 14px
  (`--step-body`), short copy 12px (`--step-copy`), sub-heads 22px
  (`--step-title`), project titles on cards as 12px caps, the footer
  sign-off 32px (`--step-signoff`). The reference's 70px page titles were
  not taken; ours stay at 44px. Emphasis is the serif turning italic mid-line, nothing
  else.
  **Superseded on the home page, nav, footer and buttons by ONE TYPE
  SCALE** (on request, 2026-11-16, after an audit found 22 text styles
  on the home page; mock in `experiments/type-scale/`). Five roles:
  display (serif 50px, the hero line only), heading (serif 32→40px,
  every section head and the footer sign-off), item (sans 18px, card
  titles and Small talk questions), copy (sans 12px / 1.8, every
  paragraph — the hero subtext's style, kept on request) and label
  (Azeret Mono 11px caps: labels, tags, numbers, `.btn`, `.btn--link`,
  the location line, the footer's base row). The nav links are the one
  exception: the label's mono caps at the name's 14px (`--step-nav`),
  on request (2026-11-17); keep them there. Home spacing is
  one gap between sections (`--space-home`, 128px at 1440) and three
  steps inside them (16 / 24 / 32); section heads sit on the left edge,
  except Beyond's, which the ring is built round, and Selected work's and
  the playground line's, centred again on request (2026-11-17). Values under ONE TYPE
  SCALE and HOME SPACING in `tokens.css`. Other pages still carry the
  older roles (`.u-label` sans caps, 14px body) until they're moved
  over; don't add a new size outside the five. One palette: `#fcfcfc` ground, `#262626` ink, one terracotta accent
  (`#b4482a`, her own — the reference's purple was swapped out) for marks
  only, never text, links or buttons (see Links, below), square corners except pill buttons and the 4px case tags (and the two approved curves: Moss's
  panel and the page's end over the black footer). Deliberate departures
  from the reference are commented in `tokens.css` (the reference's
  `#a8a8a8` grey fails AA and was darkened to `#707070`). Don't add a
  fourth family, a second weight, or a second palette.
- **Links, and no clay on text** (on request, 2026-11-13, after
  felixrieseberg.com's reading view): no text, link or button anywhere
  is in the accent, in either mode. Links are ink on a 1px ink underline
  at 45%, offset 3px; on hover the line goes solid and 2px, and the text
  never changes colour (LINKS in `tokens.css`, `a` in `global.css`).
  Links without an underline (nav, footer row, icons) go grey → ink.
  One exception, kept on request: the primary button (Resume) still
  fills with the accent on hover, now as liquid (a turning rounded
  square rises into the pill, so the clay's surface rolls across the
  label; `--liquid-*` under MOTION in `tokens.css`).
  Focus rings are ink (`--focus`). `--accent-text` now resolves to ink,
  so anything reading it follows. The accent stays only for marks: the
  cursor trail, the hero shader, Moss's dot and his panel's caret (the
  preloader is ink since 2026-11-16). None on case study pages (on request, 2026-11-16): the
  before/after pins and fixed-note dots are a plain blue
  (`--compare-pin-after`, `--compare-fixed`). Don't put the accent back
  on text, links, other buttons or case pages.
- **Dark mode** came back on request, as the same palette re-inked rather
  than a second one: `:root[data-mode='dark']` in `tokens.css` redefines
  only the palette tokens (ground `#1b1a19`, ink `#ecebe8`, grey
  `#a09d98`, accent lifted to `#e0714f` for AA), and every role colour
  follows. Switched from the theme button in the nav, a Light ↔ Dark
  toggle (sun/moon); until a visitor presses it the page is Light,
  whatever their OS is set to (on request; inline script in
  `Base.astro`). A third System state was removed
  on request — a press that changed nothing on the page felt dead.
  Any new colour must read through the role tokens or it won't follow.
  In dark mode only, the hero portrait is lit as a late-night scene
  (NIGHT LIGHT in `tokens.css`; every strength is 0 in light mode),
  chosen on request from a round of mocks: a soft, uneven warm room glow
  and a blue laptop spill behind her (`index.astro`), and, drawn in
  `HeroIllustration`'s canvas and clipped to her shape, a shade plus the
  screen's light on her chest, chin, lower face and keyboard hand. The
  face light follows her head per frame (`FACE_DX`/`FACE_DY`; re-measure
  if the sprite is re-exported). Its reason: the watercolour is matted
  against white, and on the dark ground its edge read as a pale cut-out
  outline. It fades in and out with the theme over `--dur-night`
  (instant under reduced motion); otherwise static apart from following
  the scrub; one place only. The sprite's edge has since been re-matted
  (white un-mixed from the palest hair strands) by
  `scripts/hero-sprite.py`; re-run it from her source clip rather than
  editing the webp.
- **The nav is one line** (`Nav.astro`): the name on the left (14px,
  ink); on the right, Work · About · Play (14px mono, the name's size, grey, current page in
  ink), a hairline, the sound button and the Light/Dark theme toggle.
  Links fold into Menu below 900px. "Play" is the label only; the page
  stays at /playground. On hover the name steps ink → grey (no
  underline) and the links grey → ink; on all four the letters part
  a little, one after another (option D of
  `experiments/nav-name-tracking/`, NAV NAME in `tokens.css`, on
  request, 2026-11-13). There is no Contact link: the /contact page was
  removed on request (2026-11-11), and the footer carries contact on
  every page. The old bottom dock (`Dock.astro`) is gone.
- **Page sound** came back on request (2026-11-11) as a speaker button
  beside the theme toggle (option 01 of the mocks in
  `experiments/nav-sound/`; cute note icons were tried and passed
  over): a slash when off, two waves drawing in when on, on the
  sun/moon's 15px grid. The rules and sounds are the old dock's, in
  `scripts/sound.ts`: off by default, on for the tab once pressed (a
  reload starts off), synthesised in the browser (no files, bar the
  wall's piano, below): a tap as
  sound turns on and a short tone on Light/Dark. The name
  and links make no sound on hover or click (removed on request,
  2026-11-13); don't add one back. Since 2026-11-17, on request, six
  more, picked from `experiments/sound/`, all in `sound.ts`: a harp
  string per /work archive line (the one hover sound; since 2026-11-18,
  on request, "A · Catch" of `experiments/archive-strings/`, the
  hairlines are the strings: a line catches the pointer crossing it,
  bends up to `--string-pull`, slips off and rings straight, its note
  playing as it lets go; fine pointers with motion allowed only,
  otherwise the plain borders and a pluck per row),
  soft key clicks as Moss types (panel and field), a click as the
  Privacy before/after line crosses a pin under the visitor's hand (its
  sway is silent), a sand scatter and settle on "pixel" (silent since PixelBreak was parked, 2026-11-17), a metal detent
  as the Beyond ring is thrown or turned (not on its drift), and counter
  ticks on a case's numbers (first count only). Footsteps on the
  playground wall were mocked and left out, on request. A seventh, on
  request (2026-11-25, "C · Piano settle" of `experiments/sound-scroll-5/`,
  replacing the 2026-11-17 detent click, which sounded "froggish" live):
  on the playground wall, silent while the page scrolls, and when the
  scroll comes to rest, one soft chord on a real piano (`wallScroll`). It
  is the one recorded sound: four short notes in `public/sounds/wall/`,
  cut from the University of Iowa Electronic Music Studios' piano (free
  "for any projects, without restrictions"), fetched only once sound is
  on there; everything else stays synthesised. Rounds 9–12
  (`experiments/sound-scroll-2` to `-5`) tried quieter ticks, softened
  hums, vinyl, a brook, marimba and pencil; the research behind round 11
  and what other sites do is noted in those pages. Rounds of other wall sounds (knock, wind bell, koto, per-painting
  scenes, techno music, single notes) were mocked in `experiments/sound-*`
  and turned down; a curtain sound for the preloader was mocked too but
  can't be heard (sound is always off on a first visit or reload). Nothing else has
  sound: more would be overdoing it, her words. Its reason: a felt
  response, only for a visitor who asks for it. Don't add sounds without
  asking; the About page's record player plays on its own press, apart
  from this.
- **Wheel scrolls glide, with Lenis** (on request, 2026-11-16: the page
  "stopped dead" when the wheel stopped; Lenis itself also on request).
  `scripts/smooth-scroll.ts`, loaded in `Base.astro`. Lenis moves the
  real document scroll, no transformed wrapper, so sticky, scroll
  listeners and observers are untouched. Ease is `--scroll-glide` under
  MOTION in `tokens.css` (Lenis's lerp; lower glides longer). Touch
  stays native; wheels a component already took (defaultPrevented: the
  playground wall, the pan canvas), inner boxes that scroll (nested
  scroll on; `data-lenis-prevent` by hand) and anything while a modal
  `<dialog>` is open are left to the browser. `html.lenis` turns off the
  CSS `scroll-behavior: smooth` so the two don't fight; anchor links go
  through Lenis. Off under reduced motion.
- **Page arrival rises** (on request, 2026-11-17, "B · Rise" of
  `experiments/page-transitions/`, after andreas.vision, measured; a
  dip after daneden.me, a card-to-cover carry and a curtain wipe after
  huyml.co were mocked and passed over). Arriving from another page of
  the site, the page swaps in at once and its opening parts rise 10px
  into place, 480ms ease-out, 60ms apart: the hero's lines and portrait,
  every `PageHeader` (/work's and the playground's), /work's first tiles,
  the playground's wall, a case study's head and cover (marked
  `data-rise` with `--rise-i`; About's own `.rise` already does this).
  Back and forward rise too (on request, 2026-11-17), including pages
  the browser restores from memory (`pageshow`). Not on a first visit or
  a refresh; the home page's preloader owns the first visit. Decided before paint in `Base.astro`,
  drawn in `global.css`, values under PAGE ARRIVAL in `tokens.css`. Off
  under reduced motion. Its reason: a felt step from one page to the
  next, without holding the page back. Mark only what's on the first
  screen; don't add a leave animation.
- **The location line** (`LocalTime.astro`) sits above the hero
  headline, after abstract.systems: a green "available" light with a
  pinging ring, `BANGALORE,IN`, a live weather icon, and 24h time with
  seconds on rolling digits. Two deliberate, requested exceptions live
  here: `--status` green is the one colour besides the accent and the
  project hues (only on that dot), and the weather is fetched in the
  browser from Open-Meteo (no key, no cookies, but the visitor's IP
  reaches them). Don't extend either beyond this line, bar one: the
  same pulsing light on the "Open to…" pill of the home page's bento
  (below), on request, 2026-11-26.
- **Project hues** are the one place colour appears beyond the accent: one
  muted hue per company (Okta sky `#c9dcf2`, PayPal lilac `#e0d6ef`, Walmart
  butter `#f4dc9c`), only behind that company's screenshots — home card
  stage, /work thumbnail, case study cover. Set via `data-hue` from
  `hueFor()` in `data/work.ts`; tokens in `tokens.css` (PROJECT HUES). Never
  on text, chrome or full-width bands. One requested exception: the home
  page's bento cards (below) are tinted in these hues and the home
  cards' grounds.
- **Case study type** (`work/[slug].astro`, `CaseBlocks.astro`), after
  carlthomasiv.com/work/ona-conversations, chosen on request from a mock:
  the title is the one large line (`--step-case-title`, 30→40px); section
  heads drop to `--step-title`; each section opens on
  "01  THE SITUATION" in 11px mono caps (no hairlines on case pages since
  2026-11-16, on request: lists, notes, rows, facts and section openers
  are parted by space — `--case-list-gap`, `--case-block-gap` under CASE
  STORY; don't add hairlines back); labels, row terms, captions and
  citations are mono too. "What was broken"-style points are a numbered
  13px list. The pull quote is roman serif with no rule beside it (on
  request, 2026-11-16) — no italic and no accent, on request. Body stays Manrope 600.
- **Case study contents and reading strip**, after felixrieseberg.com's
  posts (on request): the left rail (`CaseRail.astro`) is a "Contents"
  label over one mono line per section, "Start" first, grey with the
  current one in ink. Beside each line, a 3px bar as long as its
  section, filling with ink as you read it (after
  andreas.vision/work/schneider; option B of
  `experiments/case-rail-line/`, 2026-11-14, on request: his labels
  fade while scrolling, ours stay). Values under CASE RAIL in
  `tokens.css`. A strip under the nav (`CaseStrip.astro`) carries
  "◂ Work", the title once the real one scrolls away, "Part n/N ▾" (a
  contents menu, the only contents under 1080px where the rail hides),
  and a 2px ink progress line along its edge (the accent until
  2026-11-14; ink on request, to match the rail's line). It rides with the nav
  as it hides and returns. Values under CASE STRIP in `tokens.css`.
- **Every case study opens the same way** (on request, after
  gauravi.design; split head chosen 2026-11-14, option B of
  `experiments/case-spacing/`): a split head — company and tags, title
  and snippet (capped at `--measure`) on the left; Role and the case's
  meta as a 2 × 2 list of hairline facts on the right, sized so both
  sides end about level and the cover comes up under them — then cover,
  then the headline numbers a card gap under it. The rail, the strip's
  "◂ Work" and the nav share one left edge. The numbers
  (`CaseNumbers.astro`, `attached`) are the first metrics block of the
  case's Impact section, minus `[X]` placeholders and dates, shown only
  with two or more left; they count up from 0 when in view (CASE NUMBERS
  in `tokens.css`), static under reduced motion. The headline numbers and
  the Impact section's numbers sit on the About page's soft cards (3% ink
  fill, no border, 28px corners; CASE CARDS in `tokens.css`), on request
  (2026-11-14) — a requested exception to the square `--radius` rule,
  those blocks only. The old "Case snapshot" cards became the head's
  facts. Head spacing under CASE HEAD in `tokens.css`. Section openers
  and the numbered lists are parted by space, no hairlines.
- **Case tags are a crayon wash** (CASE TAGS in `tokens.css`, on
  request, 2026-11-14, from `experiments/case-spacing/`, over the lime
  and a cream chip): no chip, ink text on a highlighter stroke of her
  footer smiley's yellow (`#f8b800`, 42% light, 30% dark). The company
  in mono, then its tags in 10px mono — the same labels as its card
  (`labelsFor()`). A requested exception to rule 2: one hue, only on
  these tags; don't spread it to other chips, text or chrome.
- **The locked case page** (`LockedGate.astro`, the Okta case): mono
  line, "The interesting parts are *confidential*.", one paragraph, then
  Role, Scope and Outcome as three of the About page's soft cards (3%
  ink fill, no border, 28px corners; LOCKED GATE in `tokens.css`), then
  the passcode form. On request (2026-11-14, option A in grey of
  `experiments/locked-gate/soft-cards.html`) the numbered contents list
  with ink redaction bars and the hairlines were removed; don't bring
  them back. Its corners are a requested exception to the square
  `--radius` rule, this page only.
- **One passcode, and locks you can see before the click** (on request,
  2026-11-18, mocks in `experiments/password-lock/`). `site.lock` in
  `data/site.ts` holds the one passcode; every gate (`SiteGate`,
  `LockedGate`, `CaseGate`) takes it, and typed once anywhere it unlocks
  the site and every locked case on that browser for `rememberHours`
  (`scripts/unlock.ts`; `data-unlocked` on `<html>`, set before paint in
  `Base.astro`). There are no per-case passwords; read a case's lock
  through `lockFor()` / `isCaseLocked()` in `cases.ts`, which follow
  `site.lock.cases`: 'none' (everything open, as from 2026-11-18),
  'marked' (cases with `locked`, i.e. Okta IAM; on now, on request
  2026-11-23: "lock this case study for now") or 'all'. Don't lock anything without her asking. A locked case's card,
  on the home page and /work, frosts on hover or focus with a 24px lock
  and "Password protected" ("A · Frost", `LockFrost.astro`; at 52px the
  lock read "too huge to be cute"), and still clicks through to its gate;
  the small LockIcon stays at rest, the frost shows at rest on touch and
  is gone once unlocked. `site.lock.site` puts the whole site behind
  "C · Frosted home" (`SiteGate.astro`): the page frosted under one small
  card with the passcode field and "Email me"; the frost clears on the
  right passcode, and the preloader stands down while it's up. It is
  off by default, on purpose: turn it on only while needed. All of it is
  a soft gate (the pages ship in the HTML); real privacy is a host-level
  password. Values under LOCK FROST in `tokens.css`.
- The old night mode, the named theme palettes, tints/swatches, and the one-off
  effect components (`OneWord`, `CaseDoodle`, `Testimonials`, `Marquee`,
  `Mosaic`, the footer's variable-weight wordmark, the section watermark
  numerals) have been removed. `<Section theme="…">` still exists but every
  theme name resolves to the same colours.
- Pixel (`AskBubble.astro`) was left out of that pass on request: it keeps
  its own palette and pins its old type (Roboto Mono, still loaded only for
  it) via the block at the end of `tokens.css`.
- **The footer is black, and the page ends on a curve above it**
  (approved on request, after rachelatwork.com). `<main>` in `Base.astro`
  stacks above the footer, paints its own ground and rounds its bottom
  corners with `clip-path` (which also trims the playground's fixed
  heading layer — don't swap it for `border-radius` + `overflow`). The
  footer tucks up under the curve by `--radius-page-end` and, when it
  fits in the window, is `position: sticky; bottom: 0` under the page, so
  scrolling lifts the page off it; when it's taller than the window a
  script drops that and it scrolls normally. It's black in both light and
  dark mode: it re-inks the palette tokens to the NIGHT FOOTER values in
  `tokens.css`. Its reason: a clear, felt end to the page, landing on the
  contact line. Don't extend the dark ground or the curve anywhere else.
- **The footer's content** (option C of three mocks): row 1 — "Let's start with a
  *conversation*." in ink, where "conversation" is the link (Gmail
  compose, new tab; the site's link style, below),
  over one line in grey in the copy role (12px), exactly as wide as the
  headline: "Open to `site.seeking` roles. Projects, questions and
  feedback are welcome too." — the role on a neutral marker-pen wash
  of the ink (`--accent-wash`), and the line ends on her crayon smiley
  (`public/images/footer/smiley-loop.webp`, an 11-frame 10fps loop in
  bradleyziffer.com's rhythm — three frames of her drawing as given, two
  of it with a wider smile — built from her one
  drawing; their artwork is not used; `smiley.webp`, a still
  frame, under reduced motion). Approved on request
  as the footer's one looping animation — an exception to the no-idle-
  animation rule; don't add another. Her pencil signature was removed
  from row 1 on request (2026-10-19; `signature.webp` stays in
  `public/images/footer/`, unused). No link columns. Row 2 — the
  base line, after carlthomasiv.com's footer: a full-width hairline, then
  three equal parts (after ozgur.design): "© year name · Built with Claude
  Code & Astro" in 11px mono (`--step-fine`; "Built with…" in the fainter
  `--night-ink-faint`, the only faint text there — the rest is ink) on the left, Work / About me / Playground / Old
  portfolio ↗ (her Wix site, `site.oldPortfolio`, new tab; its free
  wixsite.com address, since anupama.design is this site) centred
  in the same mono, and LinkedIn + email line icons (Lucide, 20px) on the
  right; links and icons grey at rest, ink on hover, as the top nav's, the email icon opening Gmail. "Astro" is accurate — don't swap
  in another framework name. No illustration, no coffee copy, no Copy button, no
  Contact link, no city or clock (the hero's location line has them).
  Nothing in the footer is ever in the accent. Every
  row is inset from the gutter by `--card-pad` (the project cards'
  padding), so the footer's text lines up with the text inside the
  cards — a deliberate, token-tied exception to the one-content-edge
  rule, not a free-floating max-width.
- **Her email is `anupama.mishra113@gmail.com`** (`site.email`). There is
  no `@anupama.design` mailbox — don't reintroduce one. Links to it say
  "Email" rather than printing the address (the /contact page that
  printed it in full was removed on request, 2026-11-11).
- **The About page** (`pages/about.astro`, `data/about.ts`, ABOUT in
  `tokens.css`), chosen on request (2026-11-11) from the mocks in
  `experiments/about-grid/` ("Half and half" + "Fan out"): her portrait
  on the left (her photo as given, the porch painting as a stamp
  inside its bottom-right corner, on request 2026-11-14, no
  post-it; camera looks and a cutout were tried and turned down),
  beside "Hi, I’m Anupama.", her bio in her words, LinkedIn and email
  icons (the email icon copies her address, "Copy email" on hover; no
  separate copy icon, on request 2026-11-17) and the tabs. Since
  2026-11-14, on request, the portrait stretches to that column's
  height so both start and end on one line (it used to be 4:5 and
  sticky), and the tab list is 200px tall (`--about-reel-h`); a "Read
  more" fold for the bio was mocked and turned down. The tabs (a list that scrolls itself and loops) and Moss's
  field keep andreas.vision/about's structure (2026-10-17); since
  2026-11-14, on request, they are his three in his order:
  Testimonials (her LinkedIn recommendations from the Wix site, one
  sentence each word for word, with their photos; Vijaya Das's left
  out), Experience (company logos, as his; /work shows the same since 2026-11-17)
  and Tools (his list minus his own Cheval and GatherOS, each app's own
  icon). Testimonials here are her request, an exception to the
  "Don't add without asking" line below. Under them, six tiles, three across: Talks
  and people, Making, Travel, Food, Books, and the record player.
  Travel and Food are her photos (in `public/images/beyond/`), captioned
  in the reference's casual voice on request ("<3", ";)" as text, no
  emoji). Under 1024px it's one column: portrait, words, tiles, and the
  tabs with Moss's field last, on request. No "Outside the work" list
  (removed on request; her bio says it). Each is a stack of up to five photos that spreads on
  hover or focus (stopping at the tile's edge; resting spread on touch),
  and every photo is a button that opens large in a `<dialog>`
  lightbox. No hover label, on request. No talk title in captions, on
  request. The 28px photo and tile corners and rounded rows are a
  requested exception to the square `--radius` rule, this page only.
  Moss's field is `AskMoss.astro`, shared with Small talk: the field's
  second approved place, still one tree and one voice.
  The heading is "Hi, I'm Anupama." in serif italic, 30px, and the page
  uses the reference's lighter greys (on request, 2026-11-14, option B
  of `experiments/about-calm/`, chosen knowing they fail AA): bio,
  captions and inactive tabs at 3.2 : 1, quotes and row lines at
  2.5 : 1 (`--about-copy`, `--about-faint` under ABOUT). A requested
  exception to rule 4, this page only; don't spread these greys.
  A sixth tile, the record player (`RecordPlayer.astro`, RECORD
  PLAYER in `tokens.css`): since 2026-11-14, on request, a small cream
  player with a handle and two little feet ("E · Little feet" from
  `experiments/record-player-tiny/cute.html`; the bulkier slot-loader,
  "S5 · Speaker", read as too big). It sits on the tiles' soft card with
  a caption ("On repeat: song · artist") like the photo tiles. A round
  dotted speaker on the left; on the right one column of three pills,
  one width: "My Playlist #2026" pressed into the shell (muted on
  request), the neon green display, and the keys (round Spotify, round
  next, long play). On a press the record rises and spins and the song scrolls
  across the display; no orange, on request. It plays her Spotify
  playlist's real tracks, "My Playlist #2026" (`song` in
  `data/about.ts`), one after another, through Spotify's embedded
  player kept out of sight in the tile (on request, 2026-11-11: she
  asked for her songs over the old made-up tune). The display, caption
  and the record's label (her covers, saved into
  `public/images/about/covers/`) follow the track playing. Since 2026-11-15, on
  request: there is no visible caption under the player (title · artist stays for screen readers), the
  playlist stops after its last song instead of starting over, and
  the next key skips a song. Spotify's
  script and player load only on the first press, so nobody contacts
  Spotify or gets its cookies without pressing play; signed-in
  listeners hear whole tracks, others 30-second previews. The Spotify
  key opens the playlist in a new tab. Sound only after a press, one
  at a time, stops when the tab is hidden; nothing moves under reduced
  motion. Its reason: one personal detail she can share in a press,
  the way the paintings share hers.
- The home page is now: hero →
  "Selected *work*" head + six project cards →
  "Beyond *work*" ring → one-line playground pointer → Small talk →
  Now → footer (which carries contact). The hero is the screen minus
  `--hero-peek`, so the "Selected work" heading line shows at the
  bottom of the first screen on laptops and up (on request, 2026-11-17);
  "View all work" sits after the cards (on request, 2026-11-17). On short screens `--hero-pad-top`
  gives way first (HOME HERO in `tokens.css`).
- **A bit about me, parked** (`AboutBento.astro`, ABOUT BENTO in
  `tokens.css`; parked the same day, on request: "we will work on this
  later"; no page mounts it). Built on request, 2026-11-26, after marygans.com's bento, picked in
  `experiments/home-bento`: "A · Like hers", Colours, Pulse, size M,
  words 4, with the Email card dropped since the footer has contact).
  Between Selected work and Beyond work: her profile card (the "Open to
  `site.seeking` roles" pill with the location line's green pulsing
  light, her photo, "Hi, I'm Anupama, a *staff product designer.*", two
  lines of bio; the card opens /about), an "Outside the work" card
  (badminton, watercolour, Indian handloom, in a line she picked), and
  LinkedIn and Resume cards. Each card is a soft card tinted in a light
  hue the site already uses (profile apricot, outside sage, LinkedIn
  sky, Resume butter), mixed far down in dark mode; 28px corners as the
  home cards. On hover the tint deepens and the home cards' round
  arrow, mirrored to the top-right, fills with ink and opens to a word.
  Its reason: right after the work, a recruiter gets level, the ask,
  the person and the resume in one glance.
- **Now** (`Now.astro`, `site.now` in `data/site.ts`; on request, after
  carlthomasiv.com's): a hairline, a mono "NOW" label and one grey
  paragraph in her words on what she's thinking about. No heading, no
  motion. Change the words in `site.ts`.
- **Small talk** (`SmallTalk.astro`, `data/talk.ts`; on request, after
  andreas.vision's section of the same name, matched rule for rule off
  his stylesheet): "Small *talk*" and a one-line dek on the left, five
  questions as cards on the right (stacked under 1200px), one open at a
  time. The ground grows 3% under the pointer, + turns to ×, answers open
  on a spring. His 12px corners are kept on request, an exception to the
  square `--radius` rule for this list only. The questions are his five;
  answers come from `site.ts` and what the site says, with `[X]` where
  she still has to write it (how she got into design, what she wants
  next); a question whose answer still has an `[X]` is hidden until
  she writes it (`talkShown` in `talk.ts`, on request, 2026-11-16). Under the cards, his "Ask the cloud anything else" field as
  "Ask Moss anything else" (see Moss, above), with his behaviour: tiny
  Moss at its start, a send arrow faded until there's text, a rotating
  "thinking" line, the answer writing itself out under the field, then
  three suggestion pills; a pill fills the field and answers at once.
  Its placeholder is `--fg-dim`, not his 28% grey, which fails AA.
  Focus shows nothing but the caret, exactly his (chosen on request over
  an accent ring and over a deeper ground) — don't add a ring back.
  Values under SMALL TALK in `tokens.css`. Its reason: the first-call
  questions answered in a line each, without leaving the page.
- **The project cards are paper cards on the project's hue, one wide
  then two pairs** (`ProjectCard.astro`, grid in `index.astro`; on
  request, 2026-11-24, from `experiments/home-explore/inspired.html`,
  after andreas.vision's cards: "Project hue", "Words beside", "Border
  on hover", "Faint line", "Both", "Pill on hover"; it replaced the
  oxblood-ringed soft cards of 2026-11-19, whose mocks are in
  `experiments/home-outline-cards/`). Six cards (`homeCards` in
  `data/work.ts`), "A · Two wides" of `experiments/home-cards-six/` (on
  request, 2026-11-25): Okta IAM wide, then Privacy and Ads consent, then
  Scan & Go wide with its words on the right (`flip`), then Debit Card
  and Chase Pay. Scan & Go's card holds two phones, a little smaller
  than one alone so its sage ground shows above and below them: its scan
  looping (the first screen of its /work flow only) beside the cart
  (`pair` media). Each is a paper card, 28px corners, its work
  on its own hue (`ground` in `homeCards`: Okta sky, Privacy lilac, Ads
  consent apricot, Scan & Go sage, Debit Card mint, Chase Pay butter). The words sit left
  under the work; on the wide card they sit beside it on the left, its
  title in the serif heading. Since 2026-11-25, on request (picked in
  `experiments/home-card-border/`: "E · Like Andreas", "His chips",
  "3 · Arrow under text", "F · Ghost to ink"): no line, rise or shadow
  at rest or on hover; the card holds still and only the work inside
  grows to 1.05 on a 700ms ease-out. The labels are andreas.vision's
  small grey chips, the company first. Under the words, a round arrow
  in a thin grey ring; on hover it fills with ink and opens to "View"
  (ink fills the ring, then spreads by clip-path; leaving, it draws back
  and fades there, so the arrow is never white on white). Mocked and
  passed over: faint borders at rest, an arrow on the image, other
  fills. The 28px corners are a requested exception to the square
  `--radius` rule, these cards only. Values under HOME CARDS in `tokens.css`. After daneden.me, a phone runs each flow on its own:
  Privacy's, Ads consent's and Chase Pay's /work flows playing on their
  own (the same redrawn screens, touch marks and arrivals as their /work
  tiles), and the coded Debit Card sign-up prototype on autopilot
  (`autoplay` prop). The phone is daneden.me's device, an iPhone 17 Pro
  in silver, whole and centred (option C of `experiments/device-daneden/`):
  a CSS aluminium band, its buttons and the Dynamic Island round the
  black glass. Okta IAM shows its screenshot instead.
  Phones move only on screen and with motion allowed. There is no pause
  control (removed on request, knowing WCAG 2.2.2 asks for one on motion
  over five seconds). Its reason: a skimming recruiter sees the product
  working, not a thumbnail. Phone sizes and timing under PHONE CARDS in
  `tokens.css`.
- **The pill pair** (`PillPair.astro`, `.btn--pair` in `global.css`,
  PILL PAIR in `tokens.css`; on request, 2026-11-24: "I really like the
  button style of the inspiration"), measured off andreas.vision: an ink
  pill 42px tall beside a round 42px arrow, 8px apart; on hover the pill
  grows 1.5% and the arrow slides out as a fresh one slides in. Ink,
  never the accent. Now used only by the parked globe's "More about me";
  the home cards and "View all work" no longer use it
  (2026-11-25: "View all work" is the mono `.btn--link` again).
  Don't spread it to the hero's Resume/LinkedIn without asking.
- **The /work tiles play their flow on hover** (`WorkStage.astro`,
  `scripts/work-play.ts`, `data/workPlay.ts`, WORK PLAY in
  `tokens.css`; on request, 2026-11-16, design N of
  `experiments/work-phones/`): each phone case is one iPhone 15 Pro in
  white titanium on its project hue, at rest on the flow's first
  screen. Hover or focus the card and the flow plays: a grey touch mark
  lands where a person would press, the next screen arrives as iOS
  brings it (push, sheet, alert, scroll), then it holds and loops;
  leave and it fades back. Scan & Go's first screen plays its own scan
  (line, green catch, the item card rising). Okta IAM is a MacBook with
  the phone in front, still; the Integration Platform keeps its
  picture. Text under each tile stays title first. The screens are her
  own, redrawn on one iOS grid in the experiment (`redraw.js`, in each
  brand's type — PayPal Sans is licensed, installed only on her Mac) and
  rendered to 2x images by `scripts/work-play-render.mjs`; illustrations
  and photos in them are cut from her exports and boards, never drawn.
  Re-render after changing a screen. Nothing plays under reduced motion
  or on touch. Its reason: the grid stays calm for a skimming recruiter;
  whoever pauses on a case sees the product working.
  Under each device a ground, mixed across the grid so it has a rhythm
  (on request, 2026-11-16, "Mix" in the experiment): a photo under a
  dark wash (ID check, Ads consent, Chase Pay), the photo blurred to a
  soft texture (Privacy, Scan & Go) or the project hue as a lit colour
  block (Okta IAM, Debit Card); `ground` in `data/workPlay.ts`, WORK
  GROUND in `tokens.css`. The home page's project cards use plain
  project hues instead (since 2026-11-24, see the cards above). Since
  2026-11-26, on request, /work's card has the home card's shape and
  words (`CaseCard.astro`): the stage at the home stage's height with
  20px corners, then grey chips (company first), the title in the item
  role, the impact line in the copy role and the round "View" arrow.
  The chips and arrow are one definition, `.card-chips` / `.card-go` in
  `global.css`, for both pages; what's on the stage (these grounds,
  hover-play) stays /work's own. The photos are
  stand-ins from PayPal's and
  Walmart's sites until licensed or her own ones replace them.
- **On case studies, a phone sits in a device box** (`DeviceBox.astro`,
  `styles/device-box.css`, on request, measured off danield.design's
  phone tiles): a plain white box (no colour behind the phone), 1px
  hairline border, 48px corners, the phone centred with a thin dark
  bezel and soft layered shadow, a label pill under it. It's the one way
  to show a phone on a case study, reuse it; its corners are a requested
  exception to the square `--radius` rule. The PayPal prototypes get the
  same look in their case-study view; their home-page autoplay phones
  keep PHONE CARDS. Values under DEVICE BOX in `tokens.css`.
  Phones that play or can be tapped through (the PayPal prototypes,
  Privacy's working phones, the Chase recording) carry a round replay
  button beside their label pill, the pill's glass and height, that
  puts the phone back to its start (`DeviceFoot.astro`; "C · Beside the
  pill" of `experiments/device-replay/`, on request, 2026-11-25).
  Still screenshots don't get one. On the
  PayPal Debit Card case the work (prototypes, then screens) comes first,
  before the situation, on request. Section
  heads follow the reference: a centred serif line with an italic phrase,
  a label link under it.
- **Before and after on one phone** (`PrivacyCompare.astro`, the
  `compare` block; on request, after gauravi.design's last card, chosen
  from four mocks): in the Privacy case's craft section, the old screen
  sits left of a line and the redesign right of it, in a device box. The
  line sways slowly while on screen, and can be dragged or moved with the
  arrow keys. Numbered pins on what was wrong move to the fix as the line
  crosses them, and the notes beside the phone turn from Before to
  After. Notes are read off the screens, never invented. The static
  "Before" phones left the screens rows for it. Values under BEFORE /
  AFTER in `tokens.css`. Its reason: the difference between the two
  screens is the decision, and seeing it beats a paragraph about it.
- **Case studies tell one story** (on request, 2026-11-14, after
  andreas.vision/work/schneider; mocks in `experiments/case-storytelling/`,
  first applied to PayPal Privacy): the outcome goes in the title; a
  case's two sides (`thread`, e.g. People and GDPR and CCPA) are set out
  once in the situation as a `sides` block, and each section's opener
  names the side it answers (`answers`); the process shows as evidence
  (`funnel`, `bars` against the bar to clear, `fixes` beside each
  finding) rather than paragraphs; one gap is named mid-story (`aside`);
  and scope carries one teamwork moment as rows (the pull, my call, what
  it cost, what held). Ink, no hairlines, no accent; values under CASE
  STORY in `tokens.css`. The teamwork moment (now on Data rights) was
  written as a stand-in and confirmed by her, 2026-11-25.
- **The Privacy case's versions** (on request, 2026-11-18): Before (the
  old list) → First version (four tiles) → Second version (the
  illustrated screens with the blue reminder card, which never launched)
  → Shipped (minimal: values on the right, the yearly check answered in
  its card, explanations ending on their switch; drawn from
  `experiments/privacy-case-learnings/redesign.html`). "What shipped",
  after The hard call, says why the second version didn't ship; the
  reasons there were drafted from the screens and confirmed by her.
  The compares, the craft rows and the cover show Shipped (`it-*`
  screens in `PrivacyScreen.astro`); the illustrated screens appear only
  as the Second version (`v2-*` pairs and the evolution row). Shipped
  screens use PayPal Sans at regular weight (medium only on buttons and
  links) and one line icon set (`i-l-*` in `PrivacyIllo.astro`). The
  hub's values are example placeholders. The hub ends on her "Learn more
  about PayPal privacy" cards from her Figma (white cards, her art as a
  band, no "Read" link; on request 2026-11-18); what each opens is still
  to be written. A mixed version (her
  illustrations with the minimal screens' state and controls) is mocked
  in `experiments/privacy-case-learnings/mix.html`. The /work tile, the
  home card and `hero.webp` still show the second version.
- **Privacy is three cases** (split on request, 2026-11-18, proposal in
  `experiments/privacy-case-learnings/checkup.html`): `paypal-privacy`
  (the settings: hub, versions, craft, context, web sub-nav; 60% fewer
  calls), `paypal-data-rights` (new: get a copy, delete part and keep the
  account, the six steps, the delete screen's one call; 76% faster data
  access, its one number (timeline and team confirmed, 2026-11-25); cover
  `public/images/paypal-data-rights/hero.webp`, rendered from its coded
  screens) and `paypal-ads-consent`, whose Auto Privacy Advisor now shows
  the yearly checkup as live screens (`ck-*`, set `checkup`). The hub's
  yearly card is card A, "Anniversary" (her "celebrate it like an
  anniversary"; `anniv` in `PrivacyIllo.astro`); on the Ads consent case
  it opens the checkup. The Privacy case links to both with the `see`
  block (one line and a link). Don't fold them back into one.
  All three use the same composed cover (`PrivacyCover.astro`), each on
  its own ground so a recruiter doesn't read them as one (on request,
  2026-11-19): Privacy lilac, Data rights mint, Ads consent apricot
  (`--cover-ground-*` under PRIVACY COVER). Burst, full-bleed, Arch and
  a cut-down "lite" version were mocked
  (`experiments/privacy-case-learnings/cover-*.html`) and turned down;
  don't change the cover itself.
- **The Privacy case's process, illustrations and Learn more cards**
  (on request, 2026-11-26, "F" of `experiments/privacy-process/`: every
  part shown, nothing folded, each fact said once). "How the work got
  made" opens on her design process as one overlapping collage of six
  pencil sheets (`sketches`, `SketchCollage.astro`), each with a line under
  it. Pointing at a sheet or its line brings that sheet to the front. A
  section, "The illustrations" (after What shipped), comes next
  (`illos`, `PrivacyArt.astro`). It covers the door finding, then her four
  illustrations, each with what it means and where it's used, then their
  colours and her credit. She drew all four, her word; the door is a stock
  picture from testing and isn't credited to her. After it, "Why we moved
  the art" puts her first sketch beside two rows (`sketchrows`,
  `SketchRows.astro`); that's the one sketch-to-screen moment she kept, on
  request. "Learn more cards", after the craft, takes one card apart with
  five ink pins, then shows each card with the question it answers
  (`cardparts`, `LearnCardParts.astro`). Which card answers which question
  is still to be confirmed. The sheets are images rendered by
  `experiments/privacy-process/render.html` (headless Chrome, 2x, paper
  and handwriting baked in, so no fourth font reaches the site). They're
  new drawings of her boards' content, not her notebook pages. Values
  under PRIVACY PROCESS in `tokens.css`. Copy mixes "we" (the team),
  "I" (what she owned, made or judged) and "me" (team listings), after
  andreas.vision.
- **The Okta IAM case is redrawn, not screenshotted** (on request,
  2026-11-26, from `experiments/okta-case`, which follows the order of
  marygans.com/case-studies/ai-dashboard: problem, goals, role, plan, one
  pattern, craft, outcome). She has no screens of her own for it, so
  `OktaIam.astro` draws each picture in the Okta Admin Console's style
  (the `iam` block, and `hero.mockup: 'okta-iam'` for the cover: the
  dashboard on a laptop with a phone beside it). None of Mary Gans's
  files are used, and none may be: her work is Microsoft's, a competitor's.
  Motion plays only on screen; still under reduced motion. Captions say
  "Redrawn for this case study". Names and counts inside are made-up UI
  content; what's still hers to confirm is listed on the entry in
  `cases.ts`. Tools list only what existed while she was at Okta (Sep
  2024 – Mar 2025): Figma Make and Figma's MCP server came later. Values
  under OKTA IAM in `tokens.css`; colours are OKTA AI SCREENS'.
- `cases.ts` holds case-study content as structural prose with `[X]`
  placeholders for real numbers — written from what this file already
  records about each project, not confirmed by Anupama. It also currently
  under-uses visual evidence relative to rule 3 above; new work on case
  studies should shift the balance toward screens/diagrams over paragraphs.
- Images in `public/images/` are placeholder SVGs. Real imagery is pending an
  NDA check on the Okta IAM console work — real screenshots are a priority
  once available, since the new direction depends on visual evidence more
  than the old one did.
- The hero's location line (`LocalTime.astro`) runs off `location`,
  `timezone` and `coords` in `data/site.ts` (Bangalore, IST, confirmed).

Two Astro/CSS gotchas, learned the hard way. First: `body { overflow-x: hidden }`
forces `overflow-y` to `auto`, which makes `<body>` a scroll container and
silently breaks every `position: sticky` inside it. `global.css` uses
`overflow-x: clip` instead. Don't change it back.

Second: a `class` passed to `<Section>` does **not** carry the page's scope
hash, so a rule targeting the band itself must be wrapped in `:global()`.
Rules targeting elements written in the page file scope normally.

Third: the page has one content edge, `--gutter`, on both sides, and it
grows past `--shell-max` so content centres on very wide screens (see
CONTENT EDGE in `tokens.css`). The nav hides on scroll-down and returns
on a solid strip on scroll-up, so nothing scrolls under a fixed name and
there's no left rail any more. `--gutter-start` / `--bleed-start` still
exist because many components read them, but both equal `--gutter` now.
Don't reintroduce a per-component max-width or a separate left edge;
that's what put the hero, the name and the cards on three different lines.

Fourth: the production build minifies CSS and rewrites times to seconds
(`1000ms` → `1s`, `650ms` → `.65s`), so a script that `parseFloat`s a
time token gets seconds and runs 1000x too fast — fine in dev, static on
the live site. Read time tokens in scripts with `cssMs()` from
`src/scripts/css-time.ts`, never a bare `parseFloat`.
It also rewrites colours (`rgb(255 214 170)` → `#ffd6aa`), so never pull
a colour token apart with a regex: that read `--lamp-hue` as "6" on the
live site, the portrait's lamp light threw, and she froze in dark mode.
Let a canvas normalise it (`rgbTriplet()` in `HeroIllustration.astro`).

Fifth: everything that follows the pointer (`CursorTrail`, `CursorLamp`,
`HeroIllustration`) runs on one shared loop, `src/scripts/frame-loop.ts`:
one clock, time-based easing (`ease(k, dt)`, so 60Hz and 120Hz feel the
same), and each subscriber sleeps when it's settled or off screen. Put a
new pointer-follower on it rather than giving it its own
`requestAnimationFrame` loop, and don't ease by a fixed share per frame.

## Commands

```bash
npm run dev       # localhost:4321
npm run build     # → dist/
npm run preview   # serve the build
```

## Voice

Never mention a career break, a gap, time off or "returning" anywhere on
the site or in Moss's answers — her request.

Her own writing is direct and task-oriented. Site copy should be plain,
specific, and short — concrete numbers over adjectives, captions over
paragraphs. Avoid "passionate," "seamless," "leverage," "storyteller." No
emoji. If a sentence could appear on any designer's portfolio, cut it; if a
paragraph could be a caption instead, make it one.

### Staff, not senior (on request, 2026-11-26)

Every page, case study and Moss answer should read as a **Staff Product
Designer's** portfolio, not a senior designer's. A recruiter should place
her at staff level from the words alone. Still plain words (the rules
above hold): the level shows in *what* she says she did, not in bigger
adjectives.

What changes from senior to staff, and what the copy must show:

| Senior designer | Staff designer — write this |
|---|---|
| Owns a feature or a product area | Owns a problem that crosses teams, surfaces or products |
| Is handed a defined problem | Finds and frames the problem, and decides what not to do |
| Designs the screens | Sets the model, pattern or principle other designers build on |
| Partners with their PM and engineers | Aligns several teams and leadership |
| Ships a good feature | Changes how the org builds: a system, a ritual, a standard others adopt |
| Explains their process | Names the trade-off, the call she made, what it cost and what held |
| Outcome for the feature | Outcome for the business and for other teams (adoption, time, money, risk) |
| Quarter-long work | Multi-quarter bets, sequencing and the case for funding |

How to apply it:
- Open each case on the decision and its reach ("across four squads",
  "every access change in the console"), not on the deliverable.
- Verbs: *set, decided, defined, framed, made the case, aligned,
  sequenced, standardised, unblocked, changed how*. Not *helped, worked
  on, assisted, participated in, was responsible for, created
  wireframes*.
- Show influence through what happened, never by naming it: no
  "influence without authority", "cross-functional leadership" or
  "drove alignment" as phrases (on request, 2026-11-26).
- Show the multiplier: who used her pattern, model or system beyond her
  own screens, and what that saved them.
- One hard call per case, with what it cost. Judgement over process: no
  personas, empathy maps or "double diamond" walk-throughs.
- Her hands stay on the craft (rule 3): staff designers still design. The
  craft section shows what she drew herself.
- It's an IC pitch, not a management one: leading designers is evidence
  of influence, never the ask (`site.ask`).
- Write her role the way andreas.vision/work/schneider does (on request,
  2026-11-26): woven into the story, never labelled. "I" for what she
  decided, designed, argued for or would change; "we" for what the team
  did together; teammates by role, not name. No "My part", "My role" or
  "My contribution" labels or lists: tagging some lines as hers reads as
  if everything else was someone else's, and too many "I"s reads as a
  pitch. One Teamwork section, before Impact, says how the work was
  split, in a short paragraph (the Okta IAM case is the model).
- Never inflate a fact to sound senior. Scope, numbers and titles come
  only from what she has confirmed; anything else carries `[X]`.
