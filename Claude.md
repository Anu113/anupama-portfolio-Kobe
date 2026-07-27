# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

The portfolio site for **Anupama Mishra**, a design leader with 10+ years'
experience returning to work after a career break. Most recently Staff Product
Designer at Okta, where she led a team of six across Identity & Access
Management. Earlier: PayPal, Walmart Labs, Deloitte Digital, Zomato.

**The site has one job: land a Design Manager or Staff UX Designer role
(remote).** Every decision serves that. When a change would make the site
prettier but less effective at that job, say so.

Live site today: `anupama.design` (Wix). This repo replaces it.

## The two audiences, in tension

1. **A recruiter, 60–90 seconds, skimming.** Needs team scope and business
   impact fast. Will not scroll patiently or wait for animations.
2. **A hiring manager or design leader, reading properly.** Wants craft,
   judgement, and evidence she can run a team.

The visual language is deliberately expressive (see `REFERENCE-NOTES.md`), but
it sits on top of a fast scannable spine. If a change buries team scope or a
metric behind an interaction, flag it.

## Architecture

Astro 5, static output. Tailwind 4 present but **most styling is plain CSS using
custom properties**, scoped inside each `.astro` component. No animation
library — motion is IntersectionObserver, CSS transitions, and one hand-rolled
rAF loop (`CursorTrail`). Still no React: components ported from React sources
are rewritten as plain `.astro`.

```
src/
├─ styles/
│  ├─ tokens.css     ← every colour, type size, space value, easing. THE file.
│  └─ global.css     ← type roles (.u-display, .u-label), a11y baseline
├─ layouts/Base.astro
├─ components/       ← 8 components, each with a header comment
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
Hardcoded colours break the theme system — a section will stop recolouring.

**2. Themes are how palettes work.**
Palettes are declared as `[data-theme='name']` blocks in `tokens.css` and applied
via `<Section theme="sand">`. Available: `ink`, `sand`, `bone`, `clay` (the
editorial four) plus `sage`, `lilac`, `coral` (saturated grounds under near-black
type, from the chapter-card reference). The nav watches which themed band is
behind it and adopts that palette automatically (`Nav.astro`, bottom script). Add
a palette by copying a block — don't invent a parallel mechanism.

Every palette also has a `[data-mode='night']` variant. The nav's day/night
toggle sets `data-mode` on `<html>`; the mode is resolved by an inline script in
`Base.astro` before first paint. **A new palette needs a night block too**, or
that band will sit unchanged while everything around it turns.

**3. Case studies are leadership-first.**
This matters more than anything else in the repo. The standard portfolio
narrative — persona, user journey, wireframes, hi-fi screens — argues she is an
individual contributor, which loses the role. Every case study runs:

1. The situation (business stakes, two sentences)
2. **My scope** — team size, what she owned, what she delegated, who she reported to
3. The hard call — one real tradeoff and why she made it
4. How the team worked — process she built, not just output
5. The craft — screens, now that leadership is established
6. Impact — business, team, and craft numbers
7. What I'd do differently

If asked to write or restructure a case study and this shape is missing, rebuild
it to this shape and explain why. Pushing back here is correct.

**4. Accessibility is not optional.**
Anupama has a public talk titled *The Saga of Accessibility*. An inaccessible
portfolio is a specific credibility risk for her, not a generic lint failure.
Hold WCAG 2.1 AA: 4.5:1 for body text, 3:1 for large text and UI, visible focus
rings, keyboard-operable interactions, `prefers-reduced-motion` respected.

Note the `sand` theme carries **two greens** on purpose: `--fg` (`#2f7d45`) for
display type only, `--fg-dim` (`#276237`) for body copy. Don't "simplify" them
into one.

**5. Prefer editing tokens over editing components.**
Most requests ("make it warmer", "bigger headlines", "tighter spacing") are
`tokens.css` edits. Reach for component changes only when behaviour or structure
must change.

## Guardrails — don't undo these

- `<meta name="robots" content="index, follow">` in `Base.astro`. The Wix site
  was serving `noindex`, making it invisible to recruiters searching her name.
- The `prefers-reduced-motion` block at the bottom of `global.css`.
- The skip link in `Base.astro`.
- Keyboard support in `DragRail.astro` (arrow keys) — the rail must not be
  mouse-only.
- The header comment at the top of each component. They exist so a designer can
  read the file. Keep them updated when behaviour changes.

## Don't add without asking

- An animation library (GSAP, Framer Motion, Lenis). The no-library constraint
  is deliberate — it keeps the repo legible to a designer. If choreography
  genuinely needs one, make the case first.
- A CMS, React, or a component library. Markdown and `.astro` are enough.
- Analytics or tracking scripts.
- More palettes than there are bands to wear them. Seven exist and all seven
  are in use; an eighth needs a real eighth band.

## Components

| Component | What it does |
|---|---|
| `Section.astro` | Wraps a band of the page in a palette. `theme` prop. |
| `Nav.astro` | Fixed nav, recolours to match the band behind it. |
| `Reveal.astro` | Scroll fade-and-lift. `delay`, `y` props. |
| `DragRail.astro` | Horizontal drag-scroll rail with grab cursor. |
| `Mosaic.astro` | Edge-cropped asymmetric image grid + parallax. |
| `CaseCard.astro` | A work tile. Carries scope and metric — keep both. |
| `OneWord.astro` | Interactive headline; visitor types a word into it. |
| `CursorTrail.astro` | A 12-point spring chain following the pointer. Hover devices only. |

`CursorTrail` is a port of the reference site's `cursor-line.js` — a spring
chain, not a path history: the head eases toward the cursor, each point eases
toward the one ahead, and a speed-driven perpendicular curl makes the tail
hook. Constant 6.5px stroke; it retracts by collapsing onto the cursor, and
fades via an `is-visible` class (350ms opacity). It lives in `Base.astro`, takes
no pointer events, never replaces the native cursor, draws in the `--fg` of the
band under the pointer (the one change from the reference, which has a single
palette), and is `display: none` under `prefers-reduced-motion`. Its rAF loop
parks once the chain settles. **Don't "simplify" the curl or the chain into a
plain trailing line — that's the whole effect.**

## Current state

Built and working: token/theme system, all 7 components above, home page (five
acts), build passing.

Not built yet: case study layout + content collection (`src/content/work/`),
`/approach`, `/profile`, `/work` index. The home page links to `/work/...` and
`/approach` — **those routes 404 right now.** Building them is the next task.

Images in `public/images/` are placeholder SVGs. Real imagery is pending an NDA
check on the Okta IAM console work.

## Commands

```bash
npm run dev       # localhost:4321
npm run build     # → dist/
npm run preview   # serve the build
```

## Voice

Her own writing is direct and task-oriented. Site copy should be plain and
specific — concrete numbers over adjectives. Avoid "passionate", "seamless",
"leverage", "storyteller". No emoji. If a sentence could appear on any
designer's portfolio, it's not earning its place.