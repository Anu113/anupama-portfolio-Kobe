# Reference analysis — meagandurlak.com

Fetched all four routes. The screenshots told us the visual language; the full
site tells us something more useful, and it changes one recommendation.

## Actual structure

```
/landing         ← the interactive splash ("Dreaming of [magical] futures.")
/               ← Case Studies (the real entry point)
/profile
/approach
```

The interactive moment is a **separate splash route**, not part of the home page.
`/` is the case study index.

## New reference asset: `meagan-durlak-landing.gif`

Captures the `/landing` splash interaction in motion: visitor types a word,
it renders in italic serif ("curious") next to the label "Type Your One Word
Future", and a hand-drawn line/underline accent animates in under "futures."
on cursor movement. Confirms three build details for `OneWord.astro`:

- The typed word swaps into an **italic serif**, not the sans display face —
  matches the "sans + italic serif inline" mechanic already listed below.
- The hand-drawn accent is **cursor-driven**, not a fixed decoration — it
  redraws as the pointer moves, not just on load.
- Label copy ("Type Your One Word Future") sits at a small caption size next
  to the live word, giving the interaction an instruction without a modal or
  tooltip.

These are mechanics to reuse in `OneWord.astro` (see "What I'm taking" below) —
the cursor-driven line accent isn't yet in the built component and should be
added there, still with Anupama's own prompt/copy, not this wording.

## The thing worth knowing

**Meagan's site is a consultant selling engagements. Anupama's is a candidate
seeking a salaried role.** Same aesthetic, opposite job.

Her Approach page sells three engagement models — Embedded Design Leadership,
Advisory, Mentoring and Coaching — and her deliverables are consultant artifacts
("Vision Artifacts", "Sacrificial Prototypes", "Internal Operating Models"). Her
closing line is *"If that's the moment you're in — let's talk."* That is a
pitch to founders with budget.

A hiring manager for a Design Manager role is asking different questions:

| Meagan's Approach answers | Anupama's Approach must answer |
|---|---|
| What do I get if I hire you for 3 months? | How do you run a team day to day? |
| What's your point of view? | How do you give critique? |
| What engagement model? | How did you grow six designers? |
| — | How do you handle a designer who's underperforming? |
| — | How do you work with PM and Eng when you disagree? |
| — | How do you decide what the team *doesn't* do? |

So: **copy the aesthetic and the page slots, rewrite the content brief entirely.**
The Approach page is still the differentiator — it just answers management
questions instead of sales questions.

## One structural recommendation against the reference

**Don't gate the site behind a splash page.** Meagan can afford `/landing`
because founders arrive already interested, usually via referral. A recruiter
arrives from LinkedIn with 60–90 seconds and low patience for a click-through
before content.

The build folds the interactive moment into the home page as act three, after
the hero and the work rail. Same delight, no gate. If Anupama wants the splash
later it's a 20-minute change — but it shouldn't ship as the default.

## What I'm taking, and what I'm not

**Taking** (mechanics — not ownable, widely used):
section-scoped palettes · `vw`-sized overflowing display type · sans + italic
serif inline · drag-scroll with grab cursor · edge-cropped image mosaic · a
typed-word interactive · **cursor-driven hand-drawn line accent** ·
three-item nav

**Not taking** (her creative concept and voice):
"Dreaming of futures" · "Type Your One Word Future" · the from/to framing and
"State of the User" language · her Approach copy · her exact palette values

Worth being deliberate about this. The design community is small, Meagan's site
is well known, and a portfolio that reads as a reskin of another designer's
concept is a bad look in a craft interview — someone will recognise it. The
mechanics are fair game; the concept needs to be Anupama's own.

Which means the interactive headline needs a real idea behind it, not just a
mechanic. Current placeholder is *"The best design teams are ___"* — decent,
because it's about leadership and invites a hiring manager to project. Better
options are worth a conversation with Anupama; it should come from something
she actually believes about running teams.

## Palette check against the reference

Extracted values, and where they differ from what I built:

| | Reference (approx) | Built |
|---|---|---|
| Dark ground | `#17120f` warm near-black | same |
| Rust/clay ground (landing splash) | `#8a3d24` warm rust | new — see below |
| Sand | `#e3caa5` | same |
| Green | `#3faa5a` bright | `#2f7d45` — **darkened deliberately** |
| Gold accent (landing splash) | `#d9a441` | new — see below |

The reference green on sand measures ~2.5:1. That passes for 150px display type
(3:1 threshold for large text) and fails for body copy. The build uses the
brighter green for display and `#276237` for anything body-sized, which clears
4.5:1. Given Anupama's public talk *The Saga of Accessibility*, this is not a
detail to lose.

The landing gif surfaces a fourth palette pairing not in the original four
screenshots: warm rust ground with gold/mustard type. Not adding it as a fifth
`tokens.css` theme per the "don't add without asking" guardrail — flagging for
Anupama's call, since the existing `clay` theme may already cover this role.
