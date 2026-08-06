# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, in tension:

1. **A recruiter, 60–90 seconds, skimming.** Needs her level, surface area, and
   business impact fast. Will not scroll patiently or wait for animations.
2. **A hiring manager or design leader, reading properly.** Wants craft,
   judgement, and evidence she can carry a hard problem end to end and pull
   other people along with her.

## Product Purpose

The portfolio site for Anupama Mishra, a staff product designer with 10+
years' experience returning to work after a career break. The site has one
job: land a **Staff Product Designer role, remote** (`site.ask` in
`src/data/site.ts` — the single confirmed source; treat as authoritative over
any older wording elsewhere in the repo).

## Positioning

Her differentiator is applying staff-level product strategy, systems
thinking, interaction craft, and decision-making **across domains** — fintech,
platform, and enterprise at real scale — not being an enterprise-only or
IAM-only designer. The portfolio should read as a product leader who can carry
that judgement into AI, consumer, fintech, and platform work alike, using the
enterprise identity/access work (Okta) as her deepest evidence, not her
ceiling.

Leading six designers at Okta is evidence of scope and influence, not the ask
— no band should read as a management pitch. The ask is a senior IC role.

**Open tension to flag for future copy/case-study work (not resolved by this
file):** the site's current tagline and flagship case study lean heavily on
enterprise identity/access ("Identity, access, and the systems enterprises run
on"). That's real and load-bearing evidence, but narrower than the
cross-domain positioning above. Future work on the tagline, hero copy, or case
ordering should account for this without discarding the Okta evidence.

## Operating Context

- Home page (five acts), `/work` (case index with an archive tier),
  `/about`, `/playground`, and per-case pages at `/work/[slug]`.
- Three case studies are built: `okta-iam`, `paypal-privacy`,
  `walmart-scan-go`. A fourth (PayPal data-access requests) may be a
  duplicate of `paypal-privacy` rather than a distinct project — unconfirmed,
  see `src/data/work.ts` TODO.
- Case studies run a fixed shape: situation → my scope → the hard call → how
  the work got made → the craft → impact → what I'd do differently. This
  argues staff-level judgement, not mid-level execution — see CLAUDE.md rule 3.
- Some case-study content is NDA-sensitive. Two gating patterns exist:
  `CaseGate.astro` (partial — password panel appears mid-page, rest of the
  case stays visible) and `LockedGate.astro` (full — the whole case is
  replaced by a password page). Static site, no server: this is a soft
  deterrent, not real confidentiality.

## Capabilities and Constraints

- Astro 5 (`^7.1.3` per `package.json`), static output, Node `>=22.12.0`.
  Tailwind 4 is a dependency but most styling is plain CSS via custom
  properties scoped per component (`src/styles/tokens.css` is the single
  source for colour/type/space/easing).
- No animation library — motion is IntersectionObserver, CSS transitions, and
  one hand-rolled rAF spring chain (`CursorTrail`). No React; ported
  components are rewritten as plain `.astro`.
- No content collection / CMS / MDX — case-study bodies are typed data in
  `src/data/cases.ts`, enforced by a `CaseBlock` union so a missing section is
  a type error, not a silent gap.
- Palette system: seven themes (`ink`, `sand`, `bone`, `clay`, `sage`,
  `lilac`, `coral`), each with a `[data-mode='night']` variant. Nav recolours
  to match the band behind it automatically.
- 22 components currently exist in `src/components/` (component table in
  CLAUDE.md is stale — lists 11 or 18 depending on which side of an
  unresolved merge conflict you read; undocumented ones include `CaseGate`,
  `LockedGate`, `IndexRotator`, `LockIcon`).
- `CLAUDE.md` itself has unresolved git merge-conflict markers (from
  `origin/work-bands-and-spacing`) in at least four places — component count,
  the ask wording, and whether `CaseDoodle` is wired in. Confirmed by reading
  the actual code: `CaseDoodle.astro` exists but is **not** currently
  imported into `src/pages/work/[slug].astro`. This file should be cleaned up
  before it's trusted as documentation again.

## Brand Commitments

- Name: Anupama Mishra. Wordmark: "A."
- Voice: direct and task-oriented, concrete numbers over adjectives. Avoid
  "passionate", "seamless", "leverage", "storyteller". No emoji.
- `site.location` is confirmed as Bangalore, IST (`src/data/site.ts` — the
  `[City]` placeholder note in CLAUDE.md is stale).

## Evidence on Hand

- Career history: Staff Product Designer at Okta (Identity & Access
  Management, led a team of six); earlier PayPal, Walmart Labs, Deloitte
  Digital, Zomato.
- Three built case studies (Okta IAM, PayPal privacy, Walmart Scan & Go) with
  real narrative structure but **placeholder metrics** — every `[X]%` /
  `[X stores]` in `src/data/work.ts` and `src/data/cases.ts` is a placeholder
  pending real numbers from Anupama. Do not invent figures.
- All case imagery in `public/images/` is placeholder SVG, pending an NDA
  check on the Okta IAM console work specifically.
- `Testimonials.astro` content in `src/data/home.ts` is explicitly
  placeholder — not real quotes. Do not treat as evidence.
- Live site today: `anupama.design` (Wix), being replaced by this repo. The
  Wix site served `noindex`; this site must not repeat that (see
  `<meta name="robots">` guardrail in `Base.astro`).

## Product Principles

1. Staff is bought on blast radius and judgement, not output — every case
   leads with scope and the hard call before craft.
2. The ask is a senior IC role; six direct reports is evidence, never the
   pitch.
3. A 60–90 second skim and a full careful read are both first-class; nothing
   load-bearing (level, scope, a metric) may hide behind an interaction only
   the careful reader will trigger.
4. Depth in enterprise identity/access is real evidence, not the whole
   story — the site should support, not narrow, a cross-domain staff
   positioning.
5. Never state a number, quote, or claim that isn't confirmed. Placeholders
   stay visibly bracketed until Anupama supplies the real value.

## Accessibility & Inclusion

WCAG 2.1 AA is a hard requirement, not a lint nicety: Anupama has a public
talk titled *The Saga of Accessibility*, so an inaccessible portfolio is a
direct credibility risk for her. 4.5:1 body text, 3:1 large text/UI, visible
focus rings, full keyboard operability, `prefers-reduced-motion` respected
throughout (including the CursorTrail spring chain and the playground's pan
gestures). The `sand` theme intentionally carries two distinct greens
(`--fg` for display type, `--fg-dim` for body copy) to hit contrast at both
sizes — don't collapse them into one.
