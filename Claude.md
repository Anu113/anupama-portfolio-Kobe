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
  chosen on request from rounds of mocks): a terracotta sheet (the
  light-mode accent, in both modes) with a faint grain, everything on it
  cream. A requested exception to rule 2 and to "one dark band": it's
  on screen for a few seconds, home page only. The cursor line, in
  cream, the same spring chain as `CursorTrail`, sits as a dot in the
  middle and follows only the visitor's pointer (a still dot until they
  move it; never moves on its own, on request). Under it, centred: a
  mouse icon and "A line is a dot that went for a walk" (Paul Klee) in
  16px mono caps, medium tracking, which starts as a row of dots, one
  per letter, and turns into its letters as the page loads. That is the
  progress: there is no number, on request. If it stalls (no new letter
  for 0.7s), the next letter flicks through characters until the load
  moves on, so a slow load reads as working, not frozen. At 100% the words fade and
  the terracotta shrinks, as a slowly lumping blob, into the orange dot
  beside "Moss" in his launcher card, ending at that dot's exact size
  and place, so the loader becomes a piece of the page. Where his dot
  isn't on screen, the sheet lifts instead. The words follow the page's
  images but never run ahead of a paced ~4s schedule
  (`--dur-preloader-min`), on request. Home page only, every time it's
  opened or refreshed (on request); not when arriving from another page
  of the site, nor on back/forward. It also waits for the hero
  portrait's sprite (`hero-scrub:ready`, capped at 6s), and the portrait
  shows its still frame until the sprite is in, so she appears with
  Moss. A deliberate key, click, tap or real scroll skips it with the
  same exit, faster (not in its first 1.2s, and never a shortcut such as
  Cmd+R, so a refresh always shows it); a CSS failsafe hides it at 10s; it removes itself from the
  DOM. Under reduced motion: no line, and a fade. Values under
  PRELOADER in `tokens.css`. The walking loader (`Loader.astro`,
  `data/loader.ts`, `scripts/walk-sprite.py`, LOADER tokens) is parked,
  not deleted.
  Its reason: the one screen with nothing else to show; it introduces
  the line the visitor has on the rest of the site and hands them over
  to the page, and to Moss.
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
  `CursorTrail`'s `/playground` opt-out. On request, text near it casts
  a short shadow away from the pointer, as if lit by it (`--lamp-cast-*`);
  the trail line itself casts none. In the hero (chosen from round 2 of
  the shadow mocks, on request) the row sits above the lamp's layer
  (`--z-lamp`), so the lamp lights the ground behind her instead of
  fogging her, and the headline's shadows fall on its light. She is lit
  in `HeroIllustration`'s canvas from the lamp's `cursor-lamp` event:
  colour × light (never a screen blend), a rim on the edge facing it,
  her far side dimmed, a faint glint on the laptop lid, and behind her
  a little extra floor light with her shadow cut out of it plus contact
  pools under the legs (all night). Moss gets the same light, rim and
  contact pool. Values under CURSOR LAMP in `tokens.css`.
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
    lifts and "Want the short version?" opens under "Psst…" in the accent,
    growing right (away from her face, never over him). Where the open card
    wouldn't fit to his right (two-column screens narrower than ~1280px) it
    sits under him on the table instead; above him was tried and covered her
    face. Touch devices show the offer always. Moss answers the pointer, never moves on his own: he
    scrubs through his clip in lockstep with the portrait —
    `HeroIllustration` dispatches `hero-scrub:frame` and Moss shows the same
    frame, one timeline for both, so keep the two clips at the same 48
    frames — and perks up when hovered. Fine pointers only; frame 0 and
    still under reduced motion.
  - Panel: opens on click as a dialog with a scrim; dark (the site's `ink`
    values) and **monospace throughout** — deliberately unlike the rest of
    the site, so the conversation reads as a machine talking — with soft
    rounded corners. That's one of two sanctioned exceptions to the square
    `--radius` rule (the other is the page's curved end over the black
    footer, below); the site's own cards stay square. Colours, corners and
    timing live in the "Pixel" block of `tokens.css`.
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
  Keep it to one character with one voice; don't give it idle animation on
  the hero beyond the breathing ellipsis, and don't add a second chat or
  mascot elsewhere. One second place for him is approved, on request:
  the "Ask Moss anything else" field under the home page's Small talk
  (below), with the same tree and voice. It's the one place a visitor
  types to him: the text is matched in the browser against `pixelKeys`
  in `ask.ts` (no model, nothing sent or kept), and when nothing
  matches he says so (`pixelUnknown`) rather than guess.

- **`PixelBreak`, approved on request.** The word "pixel" at the end of
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

Outside those eight moments — hero shader, first-paint loader, the reused
hover system, `CursorTrail`, `CursorLamp`, Pixel, PixelBreak, BeyondWork — the old rule still applies at full strength:
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
  else. One palette: `#fcfcfc` ground, `#262626` ink, one terracotta accent
  (`#b4482a`, her own — the reference's purple was swapped out), square corners except pill buttons and the 4px case tags (and the two approved curves: Moss's
  panel and the page's end over the black footer). Deliberate departures
  from the reference are commented in `tokens.css` (the reference's
  `#a8a8a8` grey fails AA and was darkened to `#707070`). Don't add a
  fourth family, a second weight, or a second palette.
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
  ink); on the right, the four links (12px, grey, current page in ink),
  a hairline and the Light/Dark theme toggle. Links fold into Menu below
  900px. The old bottom dock (`Dock.astro`) and the page sounds
  (`scripts/sound.ts`) are gone.
- **The location line** (`LocalTime.astro`) sits above the hero
  headline, after abstract.systems: a green "available" light with a
  pinging ring, `BANGALORE,IN`, a live weather icon, and 24h time with
  seconds on rolling digits. Two deliberate, requested exceptions live
  here: `--status` green is the one colour besides the accent and the
  project hues (only on that dot), and the weather is fetched in the
  browser from Open-Meteo (no key, no cookies, but the visitor's IP
  reaches them). Don't extend either beyond this line.
- **Project hues** are the one place colour appears beyond the accent: one
  muted hue per company (Okta sky `#c9dcf2`, PayPal lilac `#e0d6ef`, Walmart
  butter `#f4dc9c`), only behind that company's screenshots — home card
  stage, /work thumbnail, case study cover. Set via `data-hue` from
  `hueFor()` in `data/work.ts`; tokens in `tokens.css` (PROJECT HUES). Never
  on text, chrome or full-width bands.
- **Case study type** (`work/[slug].astro`, `CaseBlocks.astro`), after
  carlthomasiv.com/work/ona-conversations, chosen on request from a mock:
  the title is the one large line (`--step-case-title`, 30→40px); section
  heads drop to `--step-title`; each section opens on a hairline with
  "01  THE SITUATION" in 11px mono caps; labels, row terms, captions and
  citations are mono too. "What was broken"-style points are a numbered
  13px list. The pull quote is roman serif on a 1px ink rule — no italic
  and no accent, on request. Body stays Manrope 600.
- **Case tags are lime** (CASE TAGS in `tokens.css`: `#d4ff3a` fill,
  `#2b3600` ink, 11:1), picked on request from a round of neutral, neon
  and red/brown mocks. The company in mono, then its tags as 10px mono
  chips with 4px corners — the same labels as its card (`labelsFor()`).
  A requested exception to rule 2: one hue, only on these tags; don't
  spread it to other chips, text or chrome.
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
  compose, new tab; underlined in ink, the accent on hover, no motion),
  over one line in grey at `--step-small` (13px), exactly as wide as the
  headline: "Open to `site.seeking` roles. Projects, questions and
  feedback are welcome too." — the role on a marker-pen wash of the
  accent (`--accent-wash`), and the line ends on her crayon smiley
  (`public/images/footer/smiley-loop.webp`, an 11-frame 10fps loop in
  bradleyziffer.com's rhythm — three frames of her drawing as given, two
  of it with a wider smile — built from her one
  drawing; their artwork is not used; `smiley.webp`, a still
  frame, under reduced motion). Approved on request
  as the footer's one looping animation — an exception to the no-idle-
  animation rule; don't add another. Her pencil signature
  (`public/images/footer/signature.webp`, her scribble re-inked in the
  footer's ink, decorative) sits in row 1's right-hand corner, its foot on
  the note's last line and its right edge on the icons' edge; under the
  words on phones. No link columns. Row 2 — the
  base line, after carlthomasiv.com's footer: a full-width hairline, then
  three equal parts (after ozgur.design): "© year name · Built with Claude
  Code & Astro" in 11px mono (`--step-fine`; "Built with…" in the fainter
  `--night-ink-faint`, the only faint text in the row — the rest is ink) on the left, Work / About me / Playground centred
  in the same mono, and LinkedIn + email line icons (Lucide, 20px) on the
  right, the email icon opening Gmail. "Astro" is accurate — don't swap
  in another framework name. No illustration, no coffee copy, no Copy button, no
  Contact link, no city or clock (the hero's location line has them).
  No footer text rests in the accent; links turn to it on hover. Every
  row is inset from the gutter by `--card-pad` (the project cards'
  padding), so the footer's text lines up with the text inside the
  cards — a deliberate, token-tied exception to the one-content-edge
  rule, not a free-floating max-width.
- **Her email is `anupama.mishra113@gmail.com`** (`site.email`). There is
  no `@anupama.design` mailbox — don't reintroduce one. Links to it say
  "Email" rather than printing the address; /contact is the one page
  that prints it in full.
- The home page is now: hero → "Selected *work*" head + project cards →
  "Beyond *work*" ring → one-line playground pointer → Small talk →
  footer (which carries contact).
- **Small talk** (`SmallTalk.astro`, `data/talk.ts`; on request, after
  andreas.vision's section of the same name, matched rule for rule off
  his stylesheet): "Small *talk*" and a one-line dek on the left, five
  questions as cards on the right (stacked under 1200px), one open at a
  time. The ground grows 3% under the pointer, + turns to ×, answers open
  on a spring. His 12px corners are kept on request, an exception to the
  square `--radius` rule for this list only. The questions are his five;
  answers come from `site.ts` and what the site says, with `[X]` where
  she still has to write it (how she got into design, what she wants
  next). Under the cards, his "Ask the cloud anything else" field as
  "Ask Moss anything else" (see Moss, above), with his behaviour: tiny
  Moss at its start, a send arrow faded until there's text, a rotating
  "thinking" line, the answer writing itself out under the field, then
  three suggestion pills; a pill fills the field and answers at once.
  Its placeholder is `--fg-dim`, not his 28% grey, which fails AA.
  Focus shows nothing but the caret, exactly his (chosen on request over
  an accent ring and over a deeper ground) — don't add a ring back.
  Values under SMALL TALK in `tokens.css`. Its reason: the first-call
  questions answered in a line each, without leaving the page.
- **The project cards are stacked phone cards** (`ProjectCard.astro`,
  on request): four full-width rows that pin and stack as you scroll
  (sticky rows and the settle effect in `index.astro`), text on the
  left, and on the right a stage on the project hue where, after
  daneden.me, a phone runs the flow on its own — the Chase Pay
  recording, Privacy screens in sequence (cut from her boards by
  `scripts/phone-screens.py`), and the coded Debit Card sign-up
  prototype on autopilot (`autoplay` prop). Okta IAM shows its
  screenshot instead. Four cards only, on request: the list is
  `homeCards` in `data/work.ts`; the rest live on /work. Phones move
  only on screen and with motion allowed. There is no pause control
  (removed on request, knowing WCAG 2.2.2 asks for one on motion over
  five seconds) and no Screens/Prototype label on the stage. Its reason: a skimming
  recruiter sees the product working, not a thumbnail. Sizes and
  timing under PHONE CARDS in `tokens.css`.
- **On case studies, a phone sits in a device box** (`DeviceBox.astro`,
  `styles/device-box.css`, on request, measured off danield.design's
  phone tiles): a plain white box (no colour behind the phone), 1px
  hairline border, 48px corners, the phone centred with a thin dark
  bezel and soft layered shadow, a label pill under it. It's the one way
  to show a phone on a case study, reuse it; its corners are a requested
  exception to the square `--radius` rule. The PayPal prototypes get the
  same look in their case-study view; their home-page autoplay phones
  keep PHONE CARDS. Values under DEVICE BOX in `tokens.css`. On the
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
