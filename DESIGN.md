---
name: Anupama Mishra — Portfolio
description: Staff product designer portfolio, built to land a remote Staff Product Designer role.
colors:
  ink-bg: "#17120f"
  ink-fg: "#f4ece1"
  ink-fg-dim: "#a2968a"
  ink-accent: "#e8613c"
  sand-bg: "#e3caa5"
  sand-fg: "#2f7d45"
  sand-fg-dim: "#276237"
  bone-bg: "#f4ece1"
  bone-fg: "#17120f"
  bone-fg-dim: "#5d534a"
  bone-accent: "#e8613c"
  clay-bg: "#420d0c"
  clay-fg: "#fa4a3c"
  clay-fg-dim: "#c9a8a2"
  sage-bg: "#d7e3d7"
  sage-fg: "#0d0f0d"
  sage-accent: "#a83a19"
  lilac-bg: "#cba6fc"
  lilac-fg: "#100d18"
  coral-bg: "#f96f43"
  coral-fg: "#14100e"
  iris-bg: "#ece5d4"
  iris-fg: "#2e2860"
typography:
  display:
    fontFamily: "General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 13vw, 15rem)"
    fontWeight: 500
    lineHeight: 0.85
    letterSpacing: "-0.035em"
  accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
    letterSpacing: "-0.01em"
  h1:
    fontFamily: "General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 6rem)"
    lineHeight: 0.85
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 3rem)"
  body:
    fontFamily: "Crimson Pro, Georgia, serif"
    fontSize: "clamp(1rem, 1.15vw, 1.1875rem)"
    lineHeight: 1.6
  label:
    fontFamily: "General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.14em"
  mono:
    fontFamily: "Roboto Mono, ui-monospace, monospace"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  section: "clamp(5rem, 12vw, 11rem)"
  band-tight: "clamp(2rem, 4vw, 3.5rem)"
  case: "clamp(3.5rem, 7vw, 6rem)"
components:
  pill-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-fg}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.15rem"
  pill-button-hover:
    backgroundColor: "var(--screen)"
  card-media:
    rounded: "{rounded.none}"
    backgroundColor: "var(--rule)"
---

# Design System: Anupama Mishra — Portfolio

## Overview

**Creative North Star: "The Editorial Broadside"**

The site reads like a designer's own printed broadside, not a SaaS marketing page: hard-edged type blocks blown up to poster scale, saturated flat-colour grounds standing in for pages of a booklet, and a serif italic used the way a hand-annotation would be. Nothing here is soft — no shadows, no blur, no rounded cards — except the one control the visitor actually touches, the pill-shaped CTA, which is deliberately the single curved thing on the page.

Density is editorial, not app-like: generous section rhythm (`--space-section`, up to 11rem), a 62ch reading measure for body copy, and display type sized in `vw` so headlines are allowed to overflow toward the viewport edge the way a poster's type would. The palette is not a light/dark pair but a sequence of eight named grounds (`ink`, `sand`, `bone`, `clay`, `sage`, `lilac`, `coral`, `iris`), each a full "page" of the broadside with its own day and night restatement — the visitor moves through the site the way they'd turn pages in a printed piece, and the fixed nav recolours itself to always match the page currently behind it.

Confirmed rejection: no animation library, no glass/blur surfaces (the nav is explicitly solid for this reason — see its own comment in `Nav.astro`), no drop shadows anywhere in the system.

**Key Characteristics:**
- Hard-edged, flat-colour grounds — one full palette per section, not a single site-wide theme
- Poster-scale display type (`clamp(3.5rem, 13vw, 15rem)`) with tight, near-negative tracking
- A single curved element (the pill CTA) against an otherwise 0-radius system
- Editorial serif italic (Instrument Serif) as the one ornamental typographic gesture
- Every palette exists twice — a day and a night restatement — never a single fixed light/dark pair

## Colors

Eight named grounds, each a self-contained day/night pair. A section (`<Section theme="…">`) wears exactly one; the fixed nav reads which palette is behind it and recolours to match. Two of the eight (`sand`, `iris`) intentionally split display and body colour into two distinct tones because the display tone alone doesn't clear body-text contrast on that ground — never collapse those two into one.

### Primary
- **Ember** (`#e8613c` / clay's `#fa4a3c`): the site's one warm accent, used for focus rings, links, and the `ink`/`bone` accent role. Appears as a controlled ember-red across most grounds; `clay` and `coral` restate it as their own dominant hue rather than an accent.

### Neutral / Ground palettes
- **Ink** (`#17120f` bg / `#f4ece1` fg): warm near-black. The hero band, the work-page head, and the mosaic — these three share the theme and turn together.
- **Sand** (`#e3caa5` bg / `#2f7d45` display fg / `#276237` body fg): warm sand with two greens — display green is decorative-strength only, body green is the AA-safe one. **The Two Greens Rule.** Never simplify sand's display and body green into a single value; the display tone fails body-text contrast on its own.
- **Bone** (`#f4ece1` bg / `#17120f` fg): the read-it-properly editorial ground. Used for every case-study banner regardless of that case's own palette — see the Named Rule below.
- **Clay** (`#420d0c` bg / `#fa4a3c` fg): oxblood ground under the reference's coral-red type, deliberately darker than the original reference poster so the same coral clears AA at the small meta-row sizes this system reuses it at.

### Chapter-card palettes (saturated grounds, near-black type)
- **Sage** (`#d7e3d7` bg / `#0d0f0d` fg)
- **Lilac** (`#cba6fc` bg / `#100d18` fg)
- **Coral** (`#f96f43` bg / `#14100e` fg)

These three carry no display/body colour split — the reference sets everything flat black and lets the saturated ground do the work. Each needs its own `--accent-text`, a deeper tint of the same ground, because the flat accent fails 4.5:1 on some of them.

### Iris (hero-only)
- **Iris** (`#ece5d4` cream bg / `#2e2860` navy-violet fg, display-only / `#4d4690` body fg): reserved for one hero band only — not a general-purpose palette. Cream by day, indigo-and-periwinkle by night.

### Named Rules
**The Bone Banner Rule.** Every case-study banner is `bone`, never the project's own palette — a full-bleed saturated ground behind display type reads as a poster and fights the reading page beneath it. The project's hue lives on its `/work` tile and the closing "next case study" band instead.

**The Radius Exception Rule.** `--radius` is `0px` site-wide; the pill CTA (`border-radius: 999px`) is the one deliberate exception, and it stays a border-only control (never a filled ground) so it reads as a control, not a badge.

## Typography

**Display Font:** General Sans (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Crimson Pro (with Georgia, serif)
**Accent Font:** Instrument Serif (with Georgia, serif) — the one italic word per composition
**Label/Mono Font:** Roboto Mono — reserved for the playground's print-label captions only, nowhere else on the site

**Character:** A sans display face set at poster scale and near-negative tracking, paired with a warm serif body for actually-reading text, with one italic serif word dropped in as a hand-annotation. The pairing reads as "a designer's own type specimen," not a corporate sans/serif system pair.

### Hierarchy
- **Display** (500, `clamp(3.5rem, 13vw, 15rem)`, line-height 0.85): hero headline only; sized to bleed off-viewport at the low end of the clamp, the way the print reference does.
- **H1** (500, `clamp(2.5rem, 7vw, 6rem)`, line-height 0.85): section/page titles.
- **H2** (500, `clamp(1.75rem, 3.6vw, 3rem)`): sub-section headings.
- **H3** (500, `clamp(1.25rem, 2vw, 1.75rem)`, tracking `-0.02em`): case tiles, points, timeline entries — one shared token (`--tracking-tight`) so this never drifts back into per-component hardcoded kerning.
- **Body** (400, `clamp(1rem, 1.15vw, 1.1875rem)`, line-height 1.6, measure 62ch): reading copy.
- **Label** (500, `0.72rem`, tracking `0.14em`, uppercase): eyebrows, metric labels, nav links — General Sans even where body type is Crimson Pro, because an uppercase caption is a different register from reading copy.

### Named Rules
**The One Italic Rule.** Instrument Serif appears as `.u-accent`/`em` inside display type only — one italic word per composition, functioning like a hand annotation, never a body-copy typeface.

## Layout

Editorial column rhythm, not an app grid. `--gutter` (`clamp(1.25rem, 4vw, 4rem)`) is the shared inline padding; `--space-section` (`clamp(5rem, 12vw, 11rem)`) separates full bands, with a tighter `--space-band-tight` (`clamp(2rem, 4vw, 3.5rem)`) for a band that sits directly under its own heading. Body copy is capped at a 62ch measure (`--measure`).

Case-study pages add their own rhythm on top: a fixed nav height (`--nav-h: 5.5rem`) that every sticky/scroll-margin value on the page is measured against, a sticky section rail (`--rail-width`, `clamp(9rem, 13vw, 12rem)`) that collapses to a horizontal strip under 1080px, and `--space-case` (`clamp(3.5rem, 7vw, 6rem)`) between case sections.

`body` uses `overflow-x: clip`, not `hidden` — `hidden` forces `overflow-y: auto` and silently breaks every `position: sticky` on the page (the case-study rail specifically). **The Clip Not Hidden Rule.** Any future horizontal-overflow fix on `<body>` must use `clip`.

## Elevation & Depth

Flat by construction. **The No-Shadow Rule.** No `box-shadow` exists anywhere in the token system or components; depth is conveyed entirely through flat colour-ground changes between sections (a new `[data-theme]` band reads as "you moved to a new surface," not a card lifting off a page) and through the `--screen` token, a slightly-shifted fill used for image mounts and CTA hover states within a band.

## Shapes

`--radius: 0px` — the whole system is hard-edged by default (see the token's own comment: "reference is hard-edged"). Card media, image frames, and containers all take square corners. The one exception is interactive pill controls (`border-radius: 999px`): the CTA button, `OneWord`'s inline chip, and the archive/lede/gate buttons all use the full pill, and it's always a 1px border against `--fg-dim`, never a filled shape — filling it would need a colour proven to clear AA against every ground it appears on, and the border sidesteps that entirely.

## Components

### Buttons (pill CTA)
- **Shape:** full pill (`border-radius: 999px`)
- **Primary/only variant:** border-only, `border: 1px solid var(--fg-dim)`, transparent background, `color: var(--fg)`, padding `0.65rem 1.15rem`, label-scale uppercase type (`.u-label`)
- **Hover:** background fills to `var(--screen)`, border-color holds at `var(--fg-dim)`; both transition over `--dur-hover` (320ms) on `--ease-out`
- There is no filled/solid button variant anywhere in the system — every CTA (`.lede__cta`, `.arch__cta`, `CaseGate`'s submit, `LockedGate`'s submit) follows this same border-pill shape

### Cards (work tiles)
- **Corner Style:** square (`--radius: 0`) on the media frame
- **Background:** media frame sits on `var(--rule)` until the image loads
- **Media treatment:** image scales to `1.03` on hover (`--dur-hover`/`--ease-out`), the one hover motion a card gets
- **Meta:** title at h3 scale with `--tracking-tight`, metric line in `--fg-dim` at a slightly reduced size — scope label above the title in `.u-label`

### Navigation
- **Style:** fixed, full-width, solid background (never translucent/blurred — a glass nav would be the one soft surface against an otherwise hard-edged system, and without an opaque background tall display type would scroll straight through the nav band)
- **Recolouring:** the nav's own colours are driven by whichever `[data-theme]` band currently sits behind it, cross-fading on `--dur-hover`
- **Mark:** wordmark set at label scale/tracking to match the link row, distinguished by weight (600) rather than size

### Gates (locked/NDA content)
- **CaseGate** (partial): an inline panel between the last visible section and the withheld remainder, using the same border-pill submit button and left-aligned layout as the rest of the page — reads as the next section, not a modal
- **LockedGate** (full): replaces the entire page while locked, wears `ink` (the hero/dark palette) rather than the case's own editorial ground, since it's the whole page's content rather than a panel inside a reading column
- Both are a soft deterrent only (static site, no server) — never described or styled as real security

## Do's and Don'ts

### Do:
- **Do** keep every colour, size, and spacing value as a `var(--token)` reference — the whole point of `tokens.css` is that a value changed once updates everywhere.
- **Do** give every new palette a `[data-mode='night']` restatement in the same pass it's added, or that band will sit unchanged while the rest of the site turns after dark.
- **Do** use the border-pill shape for any new interactive control that needs to read as a "button," never introduce a filled/solid button variant.
- **Do** route case-study banners through `bone` regardless of the case's own palette.
- **Do** respect `prefers-reduced-motion` on any new motion (the token system's `--dur-*`/`--ease-out` values already collapse under it in `global.css`; don't bypass that with a hardcoded duration).

### Don't:
- **Don't** introduce a shadow, blur, or glass surface anywhere — the system's depth model is flat colour-ground changes only.
- **Don't** collapse `sand`'s or `iris`'s two-tone (display/body) colour pairs into one value; the display tone alone fails body-text contrast on those grounds.
- **Don't** hardcode a hex, px, or `ms` value in a component — add a token to `tokens.css` first, even for a one-off, so the theme system doesn't silently stop recolouring that spot.
- **Don't** treat the CaseGate/LockedGate password panels as real security in copy or implementation — they are a soft deterrent on a static site with no server.
