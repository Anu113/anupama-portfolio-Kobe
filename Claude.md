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
- **Pixel, the "ask about my work" character (`AskBubble.astro`), approved
  on request.** A small hand-drawn creature that "lives in Anupama's laptop"
  and answers a visitor who's short on time. Its interaction model follows
  ozgur.design's Dobby chat (studied screen by screen) with an **original**
  character — never Dobby, Bongo Cat or any other existing character's art,
  name or voice; don't swap one in. What's fixed:
  - Launcher: a small translucent cream bubble resting on the books in the
    hero illustration, holding only Pixel's face; a light sweeps round its
    border (the one "click me" signal — the bubble itself doesn't move).
    Label on hover/focus only.
  - Panel: opens on click as a dialog with a scrim; dark (the site's `ink`
    values) and **monospace throughout** — deliberately unlike the rest of
    the site, so the conversation reads as a machine talking — with soft
    rounded corners. That's the one sanctioned exception to the square
    `--radius` rule; the site's own cards stay square. Colours, corners and
    timing live in the "Pixel" block of `tokens.css`.
  - Content: a conversation tree in `src/data/ask.ts` — buttons only, no
    free text, no model, no backend. Pixel's jokes are about Pixel (the
    laptop, tabs, meetings), never claims about her work; the facts stay
    plain and come only from `cases.ts`/`site.ts`, with `site.ask`,
    `site.location`, `site.email` read from `site.ts`. Every path ends in a
    case study or a way to reach her.
  - A11y, as built: focus moves in and stays in, Escape closes and returns
    focus, replies go to screen readers once through a live region (the
    typewriter is visual only), everything static under reduced motion.
  Keep it to one character with one voice; don't give it idle animation on
  the hero beyond the border shimmer, and don't add a second chat or
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

- The palette system (`tokens.css`) still carries ~10 named theme blocks with
  day/night variants. This is more than the new direction calls for and
  should shrink toward a neutral base + one accent as work proceeds — don't
  add to it.
- `OneWord.astro` (visitor-typed headline word), `CaseDoodle.astro`
  (hover-reveal creature doodles), `Testimonials.astro`, and `Marquee.astro`
  are examples of the scattered "demonstrate capability" pattern this file
  asks to avoid — each was its own one-off effect. They are being replaced,
  not just deleted: the home page's signature-moment budget moves to the
  named exceptions above (hero shader, first-paint loader, one reused hover
  system), approved via mockup before implementation. Don't extend these old
  components' usage; when touching pages that use them, replace with the new
  hover vocabulary rather than adding another pattern alongside it.
  `CursorTrail.astro` is the one exception — it's kept (see above), unchanged
  from its existing implementation and constraints. Pixel (`AskBubble.astro`)
  is a newer, separately approved addition, not one of these old one-offs.
- The home page itself is being rethought around this: hero (shader) → work
  grid with the reveal-on-hover treatment → a denser text-row list variant
  (underline-draw hover, no image movement, for long lists) → a stat-row
  "approach" section replacing a written paragraph → plain contact. Fewer,
  larger sections; each one doing more visual work than the section it
  replaces.
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

Third: at ≥1200px the name and, under it, the nav dock are fixed in the
top-left, in the bar grid's first two columns. Page
content must start at `--gutter-start`, not `--gutter`, on the left (see
CHROME RAIL in `tokens.css`); `.u-shell` and so every `<Section>` already
does. Anything that pads itself uses `padding-inline: var(--gutter-start)
var(--gutter)`, and anything that bleeds left uses `--bleed-start`, never a
negative `--gutter`. Otherwise it will run under the dock.

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
