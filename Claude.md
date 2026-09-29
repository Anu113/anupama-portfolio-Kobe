# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

The portfolio site for **Anupama Mishra**, a product designer with 10+
years' experience returning to work after a career break. Most recently Staff
Product Designer at Okta on Identity & Access Management, where she also led a
team of six. Earlier: PayPal, Walmart Labs, Deloitte Digital, Zomato.

**The site has one job: land a senior/staff/principal product design or
design-engineering role (remote).** Every decision serves that. When a change
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
- **A real loading sequence, once, on first paint.** A short (≈1–1.5s) branded
  loader — a drawn mark plus a wordmark treatment — is allowed at the top of
  the session, because it's the one moment where "nothing to look at yet" is
  true and filling it well is itself a design decision. It must never block
  or delay access to content beyond that first paint, must be skippable/instant
  on repeat navigation within a session, and must resolve instantly (no
  animation) under `prefers-reduced-motion`.
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
  `/playground` (see the dedicated section on it further down). Don't add a
  second cursor effect alongside it.
- **Moss, the "ask about my work" character (`AskBubble.astro`),
  approved on request.** Called Pixel in the code (`.pixel-*`, `pixelTree`,
  the "Pixel" block in `tokens.css`) — that's the internal name; the visitor
  sees "Moss", a tiny design critter who looks after the portfolio. Art is
  Anupama's own watercolour and her 8s clip of him looking around
  (`public/images/moss/`, regenerated by `scripts/moss-sprite.py`). He replaced earlier Grogu and Totoro passes; unlike those he's
  an original character, so no IP caveats. Its interaction model follows
  ozgur.design's Dobby chat (studied screen by screen). Don't swap in
  another character without her asking. What's fixed:
  - Launcher: Moss himself, sitting on the books in the hero illustration,
    with a small outlined cream speech bubble above his head. Moss and the
    bubble are one button. At rest the bubble's three typing dots pulse in
    turn (added on request) and a light sweeps round its border — those two
    are the only idle motion, both static under reduced motion; "Ask Moss"
    slides out leftward on hover/focus only. Moss answers the pointer, never moves on his own: he
    scrubs through his clip in lockstep with the portrait —
    `HeroIllustration` dispatches `hero-scrub:frame` and Moss shows the same
    frame, one timeline for both, so keep the two clips at the same 48
    frames — and perks up when hovered. Fine pointers only; frame 0 and
    still under reduced motion.
  - Panel: opens on click as a dialog with a scrim; dark (the site's `ink`
    values) and **monospace throughout** — deliberately unlike the rest of
    the site, so the conversation reads as a machine talking — with soft
    rounded corners. That's the one sanctioned exception to the square
    `--radius` rule; the site's own cards stay square. Colours, corners and
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
  the hero beyond the border shimmer and the typing dots, and don't add a second chat or
  mascot elsewhere.

Outside those five moments — hero shader, first-paint loader, the reused
hover system, `CursorTrail`, Pixel — the old rule still applies at full strength:
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
- A new themed colour band, or any component whose main purpose is
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
  Manrope 600 for everything else, Azeret Mono 400 for ticking numbers.
  Scale: display 34→50px, heading 32→44px, nav 14px, label 12px uppercase;
  plus two steps the reference lacks (title 20→26px, body 15px) because it
  has no long copy. Emphasis is the serif turning italic mid-line, nothing
  else. One palette: `#fcfcfc` ground, `#262626` ink, one terracotta accent
  (`#b4482a`, her own — the reference's purple was swapped out), square corners except pill buttons. Deliberate departures
  from the reference are commented in `tokens.css` (the reference's
  `#a8a8a8` grey fails AA and was darkened to `#707070`). Don't add a
  fourth family, a second weight, or a second palette.
- **Project hues** are the one place colour appears beyond the accent: one
  muted hue per company (Okta sky `#c9dcf2`, PayPal lilac `#e0d6ef`, Walmart
  butter `#f4dc9c`), only behind that company's screenshots — home card
  media, /work thumbnail, case study cover. Set via `data-hue` from
  `hueFor()` in `data/work.ts`; tokens in `tokens.css` (PROJECT HUES). Never
  on text, chrome or full-width bands.
- Night mode, the named theme palettes, tints/swatches, and the one-off
  effect components (`OneWord`, `CaseDoodle`, `Testimonials`, `Marquee`,
  `Mosaic`, the footer's variable-weight wordmark, the section watermark
  numerals) have been removed. `<Section theme="…">` still exists but every
  theme name resolves to the same colours.
- Pixel (`AskBubble.astro`) was left out of that pass on request: it keeps
  its own palette and pins its old type (Roboto Mono, still loaded only for
  it) via the block at the end of `tokens.css`.
- The home page is now: hero → "Selected *work*" head + project cards →
  one-line playground pointer → footer (which carries contact). Section
  heads follow the reference: a centred serif line with an italic phrase,
  a label link under it.
- `cases.ts` holds case-study content as structural prose with `[X]`
  placeholders for real numbers — written from what this file already
  records about each project, not confirmed by Anupama. It also currently
  under-uses visual evidence relative to rule 3 above; new work on case
  studies should shift the balance toward screens/diagrams over paragraphs.
- Images in `public/images/` are placeholder SVGs. Real imagery is pending an
  NDA check on the Okta IAM console work — real screenshots are a priority
  once available, since the new direction depends on visual evidence more
  than the old one did.
- The footer clock runs off `location` and `timezone` in `data/site.ts`. Both
  are placeholders — `location` reads `[City]` on purpose, same bracket
  convention as the unconfirmed numbers, so it stays visible until she says
  where she's based.

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

Her own writing is direct and task-oriented. Site copy should be plain,
specific, and short — concrete numbers over adjectives, captions over
paragraphs. Avoid "passionate," "seamless," "leverage," "storyteller." No
emoji. If a sentence could appear on any designer's portfolio, cut it; if a
paragraph could be a caption instead, make it one.
