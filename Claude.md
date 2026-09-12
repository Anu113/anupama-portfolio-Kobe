# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

The portfolio site for **Anupama Mishra**, a staff product designer with 10+
years' experience returning to work after a career break. Most recently Staff
Product Designer at Okta on Identity & Access Management, where she also led a
team of six. Earlier: PayPal, Walmart Labs, Deloitte Digital, Zomato.

<<<<<<< HEAD
**The site has one job: land a Staff Product Designer role (remote).** Every
=======
**The site has one job: land a Staff Product Designer/Lead Product Designer role.** Every
>>>>>>> origin/work-bands-and-spacing
decision serves that. When a change would make the site prettier but less
effective at that job, say so.

The role she is asking for is a **senior IC one**. Leading six designers is
evidence of scope, influence and judgement — it is not the ask, and no band
should read as a management pitch. The ask is written once, in `site.ask`
(`data/site.ts`); every band that states it reads from there. It drifted into
"Design Manager or Lead UX" across three files once already.

Live site today: `anupama.design` (Wix). This repo replaces it.

## The two audiences, in tension

1. **A recruiter, 60–90 seconds, skimming.** Needs the level, the surface area
   and business impact fast. Will not scroll patiently or wait for animations.
2. **A hiring manager or design leader, reading properly.** Wants craft,
   judgement, and evidence she can carry a hard problem end to end and pull
   other people along with her.

The visual language is deliberately expressive (see `REFERENCE-NOTES.md`), but
it sits on top of a fast scannable spine. If a change buries her scope or a
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
<<<<<<< HEAD
├─ components/       ← 18 components, each with a header comment
=======
├─ components/       ← 11 components, each with a header comment
>>>>>>> origin/work-bands-and-spacing
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
editorial four), `sage`, `lilac`, `coral` (saturated grounds under near-black
type, from the chapter-card reference), and `ember` (a warmer, browner red —
sampled from reference photos, not the chapter set — added to give the Okta
OIN project card its own colour after it wore `ink`, the same theme as the
band it sat in, and had no visible boundary against it). The nav watches which themed band is
behind it and adopts that palette automatically (`Nav.astro`, bottom script). Add
a palette by copying a block — don't invent a parallel mechanism.

Every palette also has a `[data-mode='night']` variant. `ThemeRail.astro` — a
fixed Day / Night / Auto control, mounted only on the home page (not in
`Base.astro`, so it never appears on interior pages) but staying on screen
for that whole page's scroll, not just the hero — sets `data-mode` on
`<html>`; the mode is resolved by an inline script in `Base.astro` before
first paint, sitewide, regardless of which page set it. **A new palette
needs a night block too**, or that band will sit unchanged while
everything around it turns.

**3. Case studies lead with scope and judgement, then craft.**
This matters more than anything else in the repo. The standard portfolio
narrative — persona, user journey, wireframes, hi-fi screens — argues she is a
mid-level designer who executes, which loses a staff role. Staff is bought on
blast radius and judgement: the size of the problem she can hold, the calls she
made, and the quality of what shipped. Every case study runs:

1. The situation (business stakes, two sentences)
2. **My scope** — what she owned, what she influenced, who else was on it
3. The hard call — one real tradeoff and why she made it
4. How the work got made — the process and the partners, not just output
5. The craft — screens, now that the scope is established
6. Impact — business, craft, and team numbers
7. What I'd do differently

If asked to write or restructure a case study and this shape is missing, rebuild
it to this shape and explain why. Pushing back here is correct.

The case bodies in `cases.ts` still narrate several of these sections in a
manager's voice ("the team I ran", "I staffed it"). That reads as scope, which
is fine, but any rewrite should keep her hands visibly on the design work.

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

- A CMS, React, or a component library. Markdown and `.astro` are enough.
- Analytics or tracking scripts.
- More palettes than there are bands to wear them. Eight exist and all eight
  are in use; a ninth needs a real ninth band.

## Components

| Component | What it does |
|---|---|
| `Section.astro` | Wraps a band of the page in a palette. `theme` prop. |
| `Nav.astro` | Fixed nav, recolours to match the band behind it. Wordmark + links only — the day/night toggle now lives in `ThemeRail.astro`. |
| `ThemeRail.astro` | The day/night control — a fixed glass capsule (Day / Night / Auto, no tooltips), mounted only on the home page (`index.astro`), not `Base.astro` — every other page has no visible control. Sets `data-mode` on `<html>`, same sitewide mechanism the old nav toggle used, so the mode still carries to interior pages even without a control there. Auto clears any pinned choice and follows `prefers-color-scheme` live. |
| `Reveal.astro` | Scroll fade-and-lift. `delay`, `y` props. |
| `DragRail.astro` | Horizontal drag-scroll rail with grab cursor. |
| `Mosaic.astro` | Edge-cropped asymmetric image grid + parallax. |
| `CaseCard.astro` | The one project-card component (`/work`'s grid). Carries scope and metric — keep both. Hover reveals a `HoverLabel`. |
| `HoverLabel.astro` | The shared hover label every project card uses — one of five `hoverState` values from `data/hoverState.ts` (`case-study`, `overview`, `website`, `building`, `coming-soon`). |
| `OneWord.astro` | Interactive headline; visitor types a word into it. |
| `CursorTrail.astro` | A 12-point spring chain following the pointer. Hover devices only. |
| `CasePreview.astro` | One project as a full-bleed band. Home page ACT 2 and `/work`. |
| `InfiniteStream.astro` | The playground's looping collage. Pans on both axes: the page scrolls down, the field wraps sideways. Drifting columns, tops itself up as you scroll. |
| `Marquee.astro` | A row that scrolls itself. `kind="logo"` for the company strip, `kind="card"` for the playground preview. |
| `Testimonials.astro` | Three quotes across. Content in `data/home.ts` is **placeholder — not real quotes**. |
| `PageHeader.astro` | The standing header for every interior page. Centred eyebrow + display title + optional intro. |
<<<<<<< HEAD
| `ArchiveList.astro` | The archive tier on `/work`. Text rows; each hides a preview that opens from zero width on hover. Hover-capable, wide screens only. |
| `CaseRail.astro` | The sticky section rail on a case study. Scroll-spy; becomes a horizontal strip under 1080px. |
| `CaseBlocks.astro` | Renders one case-study section's body from the `CaseBlock` union in `data/cases.ts`. |
| `CaseDoodle.astro` | Seven hand-drawn creatures, one per case-study section. **Built but not wired in** — see below. |
=======
| `CaseRail.astro` | The sticky section rail on a case study. Scroll-spy; becomes a horizontal strip under 1080px. |
| `CaseBlocks.astro` | Renders one case-study section's body from the `CaseBlock` union in `data/cases.ts`. |
| `CaseDoodle.astro` | Seven hand-drawn creatures, one per case-study section. Shared body/eyes/legs skeleton, keyed by section `id`. |
>>>>>>> origin/work-bands-and-spacing
| `Footer.astro` | Closes every page: bio / contact / "let's talk", then a meta line with a live clock, then the wordmark. Ink band, in `Base.astro` below `<main>`. |

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

It is on everywhere except `/playground`, which passes `trail={false}` to
`Base`. That page owns its cursor: the stream is a pannable field wearing the
grab/grabbing hand, and a line trailing off a hand you are dragging with reads
as two cursors. Any future page that takes over the cursor opts out the same
way — don't add a second suppression mechanism.

The playground's two axes come from the moodboard on
`meagandurlak.com/case-studies` (`case-studies/js/moodboard.js`), read the same
way `cursor-line.js` was. Vertical is the document's own scroll, so the closing
band and the footer stay reachable. Horizontal is a pan: every row renders its
column set twice — the twin is `aria-hidden` — and the pan wraps on the exact
distance between the two, measured at runtime. The seam is invisible because
the gap between the sets is the same clamp as the gap between columns inside
one; **if you change one, change the other.** The field must also stay
full-bleed (`.playstream__shell` in `playground.astro`) — inside a 1200px
column the wrap has less width than the viewport and the seam lands on screen.
**The two axes are separate gestures.** A wheel goes to whichever axis
dominates it: mostly sideways pans the field, anything else falls through to
the document untouched, because native vertical scrolling feels better than
anything hand-rolled and it is what keeps the closing band and the footer
reachable. Arrow keys pan left/right. Columns drift straight up and down, not
on a slant. A **diagonal was built and then taken back out** — it worked, but
owning both halves of a wheel gesture means owning the vertical scroll, and
that trade wasn't worth it on this page. Don't reintroduce it casually.

A drag is the one exception: direct manipulation has to follow the hand, so it
pans and scrolls at once. Two things keep it honest. **The vertical half is
queued (`pendingY`), never scrolled from the event handler** — the sideways
half is a transform and can only land in a frame, so scrolling at the event
puts the two a frame apart and the drag shears. **The frame reads every row
before it writes any** — a rect read after a transform write forces a style
recalc, and interleaving costs one per row.

Release inertia and the drift both switch off under `prefers-reduced-motion`;
drag, wheel and keys don't, because those are the visitor's own hand.

## Current state

Built and working: token/theme system, every component above, home page (five
acts), `/work`, `/about`, `/playground`, build passing.

The nav carries three links — Work, About me, Playground. `/approach` and
`/profile` were never built and are no longer linked; "How I work" on the home
page points at `/about#approach` instead.

Case studies are built. `/work/okta-iam`, `/work/paypal-privacy` and
`/work/walmart-scan-go` all render from `src/pages/work/[slug].astro`, and the
layout follows `rachelchen.tech/projects/openai` — banner (eyebrow, title,
full-width image, meta row), then a two-column body with a sticky section rail,
then the next project.

The banner is **`bone` on every case study**, not the project's palette. A
full-bleed saturated ground behind display type reads as a poster and fights
the reading page under it. The project's hue lives on its `/work` tile and on
<<<<<<< HEAD
the closing "next case study" band.

`CaseDoodle.astro` holds seven hand-drawn creatures, one per section, keyed by
section `id`. **It is not currently rendered** — it was taken back out of
`[slug].astro` and the file is kept only so the drawings aren't lost. To put
them back, import it and drop `<CaseDoodle name={s.id} />` above the section
eyebrow. If you extend the set: they are **characters, not icons** — every one
is a body, two ring eyes and two thin legs with kicked-out feet on a shared
skeleton, and only the body and one prop change. An abstract mark drawn to the
same brief reads as a stray icon next to the rest.
=======
the closing "next case study" band. Each body section opens with a small
hand-drawn creature from `CaseDoodle.astro`, keyed by section `id` — the same
seven across all three cases, so "the hard call" is the same character every
time. They are **characters, not icons**: every one is a body, two ring eyes
and two thin legs with kicked-out feet, on a shared skeleton, and only the
body and one prop change. Keep that skeleton if you add one — an abstract
mark drawn to the same brief will read as a stray icon next to the rest. They
are margin notes; don't scale them up or draw a set per case.
>>>>>>> origin/work-bands-and-spacing

Content lives in **`src/data/cases.ts`**, not in a content collection. These
pages aren't prose — each section is a composition of small typed blocks
(`prose`, `points`, `rows`, `figure`, `quote`, `metrics`), and Markdown would
have meant either adding MDX or writing raw HTML in `.md`. The typed union is
also the guardrail for rule 3: the section order (situation → my scope → the
hard call → how the team worked → the craft → impact → what I'd do differently)
is declared per case, and a missing section is visible in one file.
`src/content/work/` is now an empty leftover — delete it or leave it, but don't
build a second content path.

**The prose in `cases.ts` is a structural draft, not confirmed fact.** It is
written from what CLAUDE.md and `work.ts` already record about each project.
Every number is still a `[X]` placeholder, and the specifics — squad counts,
who Anupama reported to, the exact tradeoffs — need her to confirm or replace
them before this ships.

Two Astro/CSS gotchas, learned the hard way. First: `body { overflow-x: hidden }`
forces `overflow-y` to `auto`, which makes `<body>` a scroll container and
silently breaks every `position: sticky` inside it — the case-study rail just
stops sticking. `global.css` uses `overflow-x: clip` instead; it trims the
bleeding display type identically without creating a scroll container. Don't
change it back.

Second: a `class` passed to `<Section>` does
**not** carry this page's scope hash, so a rule targeting the band itself
(`.playhead`, `.abouthead`, …) must be wrapped in `:global()`. Rules targeting
elements written in the page file scope normally.

Images in `public/images/` are placeholder SVGs. Real imagery is pending an NDA
check on the Okta IAM console work.

The footer clock runs off `location` and `timezone` in `data/site.ts`. Both are
placeholders — `location` reads `[City]` on purpose, same bracket convention as
the unconfirmed numbers, so it stays visible until she says where she's based.

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