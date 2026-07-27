# Positioning

Derived from `ANUPAMA-STAFF PRODUCT DESIGNER.pdf` (single-page resume, read
2026-07-27). Everything below cites that document. Where the resume is silent,
this file says so rather than filling the gap.

---

## 0. What the resume actually says

The evidence base, because most of the current site is not built on it.

| Role | Dates | Length | What the resume credits her with |
|---|---|---|---|
| **Okta** — Staff Product Designer | Sept 2024 – Mar 2025 | **7 months** | Okta Integration Network onboarding (**ISV onboarding time −40%**); Entitlement Management workflows → enterprise adoption; roadmap influence with Product/Eng/GTM; **mentored** designers, contributed to hiring; design-system workflow improvements cutting design-to-dev handoff |
| **PayPal** — Lead Product Designer, Global Data & Privacy, Activity, RCM | May 2021 – Apr 2024 | **~3 years** | B2C privacy, data management and trust across **PayPal, Honey and Venmo**; simplified privacy workflows → task completion up; partnership with Legal/Compliance/Product/Eng; data access & deletion experiences (**processing effort −40%**); mentored designers |
| **Walmart Labs** — UX Designer | Jul 2019 – May 2021 | ~2 years | End-to-end consumer **and** enterprise products for merchant operations, employee workflows, internal platform; **built and evolved the Merchant Design System**; modernised legacy workflows with scalable patterns |
| **Deloitte Digital** — UX/UI Designer | Oct 2017 – Jan 2019 | ~15 months | Enterprise clients in **healthcare and technology**; Sun Pharma scientist workflow/task management (**task completion time −35%**); **Philips VR** experiences; reusable design systems across engagements |
| **Zomato** — UX/UI Designer | 2015 | — | Product, web, branding and marketing design |

Also on the resume: Bangalore, India. `anupama.design`. Skills line reads
Product Strategy · Enterprise SaaS · Identity & Access Management · Privacy ·
Design Systems · User Research · Accessibility · Team Leadership.

### Three numbers carry the whole resume

**−40%** ISV onboarding time (Okta) · **−40%** data-request processing effort
(PayPal) · **−35%** task completion time (Deloitte).

Three companies, three industries, one unit: **time removed**. Nothing else on
the resume repeats this cleanly. It is the brand.

---

## 0b. Where the site currently contradicts the resume

These have to be settled before any copy is worth writing. All three make the
site claim *more* than the resume, which is the dangerous direction.

1. **Okta tenure.** `about.astro:11` says `[2021]–[2025]`. The resume says
   **Sept 2024 – Mar 2025 — seven months.** As written, the site implies Okta
   was the four-year centrepiece of her career. It was the shortest role on the
   page.
2. **"Led six designers."** `work.ts:8`, `about.astro:12`, `about.astro:25`,
   `index.astro:36` and CLAUDE.md all state it. The resume says **"Mentored
   designers, contributed to hiring, and improved design quality through reviews
   and coaching."** That is mentorship and craft leadership, not line
   management of six people. A hiring manager who checks references on a
   seven-month role will find this.
3. **The Walmart case study.** `work.ts:17–22` and `cases.ts` describe *Scan &
   Go, in-store*, built on *six weeks of store-floor ethnography*. The resume
   describes **merchant operations, employee workflows, internal platform, and
   the Merchant Design System.** These are different projects. The resume's
   version is also the better one for this positioning.

**Recommendation:** the resume wins on all three. It is the document that gets
checked.

---

## 0c. On the AI pillar

The requested positioning includes "AI-powered products and intelligent
workflows (where applicable from my resume)."

**It is not applicable. There is no AI or ML anywhere on this resume** — not in
the summary, not in a bullet, not in the skills line. The nearest adjacents are
Philips VR (emerging technology, 2017–19) and Entitlement Management (policy
automation), and neither is an AI claim.

Three honest options, in order of preference:

1. **Leave it out.** The narrative below is strong and differentiated without
   it. An unsupported AI claim on a portfolio aimed at OpenAI or Figma is the
   fastest way to lose the room.
2. **Recover it if it exists.** Two specific questions worth answering: did the
   **Entitlement Management** work at Okta include access recommendations, risk
   scoring, or automated access reviews? Did **RCM** at PayPal involve model-driven
   risk or fraud surfacing? If either is yes, that is a legitimate
   intelligent-workflow case study — but it needs to go on the resume first.
3. **Frame it as direction, not history** — one line on About, clearly marked as
   what she wants next rather than what she has shipped. Weakest option; only
   use it if (2) comes back empty and the target list stays AI-heavy.

Everything below assumes option 1, with a hook where (2) would slot in.

---

## 1. The narrative

Across five companies she has been handed the same kind of problem every time:
**the layer underneath the product** — the console, the settings, the platform,
the design system, the internal tool — in a context where **the rules belong to
someone else** (Legal, Compliance, entitlement policy, healthcare regulation,
merchant operations), and where **many teams depend on the outcome**.

- **Okta** — the Integration Network is the door partners walk through to build
  on Okta. Entitlements are the layer every application's permissions sit on.
- **PayPal** — privacy and data controls spanning PayPal, Honey **and** Venmo.
  One system, three consumer brands, Legal in the room.
- **Walmart Labs** — the Merchant Design System, plus internal platform and
  employee workflows. Infrastructure other Walmart teams shipped on.
- **Deloitte Digital** — reusable design systems across client engagements;
  scientist workflow tooling at Sun Pharma.
- **Zomato** — the consumer-craft origin: product, web, brand, marketing.

She does not design the shiny surface. She designs the thing the shiny surface
stands on — and then proves it got faster.

**The line:**

> **Complicated for real reasons. Fast anyway.**

Use this as the recurring brand line. It says: she doesn't oversimplify away the
regulation, the scale or the stakeholders — she keeps the complexity honest and
removes the cost of it. And it is backed by −40%, −40%, −35%.

### The five domains, in the order they should be read

**Fintech & payments** (PayPal, 3 yrs — the longest role) · **Platform &
developer experience** (Okta OIN, Walmart internal platform) · **Design systems
& product foundations** (Walmart Merchant DS, Okta handoff workflows, Deloitte
frameworks) · **Privacy, trust & identity** (PayPal Global Data & Privacy, Okta
entitlements) · **Commerce & consumer** (Walmart merchant ops, Honey, Venmo,
Zomato).

Identity is the fourth item, inside trust. Present, sourced, not the headline.

---

## 2. The rewritten positioning

**Current (`site.ts:5`):**
> Staff product designer. Identity, access, and the systems enterprises run on.

This is the meta description — it is what appears in search results and link
previews. It is the single most IAM-locked string on the site.

**Replace with:**
```ts
tagline: 'Staff product designer. Payments, platforms, and the systems products get built on.',
```

**Supporting one-liner** (for LinkedIn headline, email signature, `/work` intro):
> Ten years designing the layer underneath the product — privacy and data
> controls at PayPal, partner onboarding at Okta, the merchant design system at
> Walmart Labs.

**What this positioning claims, and its proof:**

| Claim | Evidence on the resume |
|---|---|
| Works at consumer scale in fintech | PayPal, Honey, Venmo — 3 years, B2C |
| Designs platform and developer surfaces | Okta Integration Network, ISV onboarding −40% |
| Builds scalable foundations | Merchant Design System (Walmart), reusable frameworks (Deloitte) |
| Handles regulated, multi-stakeholder problems | Legal + Compliance (PayPal), healthcare (Deloitte) |
| Ships measurable outcomes | −40%, −40%, −35% |
| Operates at staff altitude | Roadmap influence, GTM partnership, mentoring, hiring |

---

## 3. Homepage

### Headline — recommended

Keeps the existing `<em>` structure in `index.astro:28–30`, so it's a three-word
swap:

```astro
<h1 class="u-display hero__line">
  I design the <em>systems</em><br />other products depend on.
</h1>
```

**Alternates:**
- `Complicated for <em>real</em> reasons.<br />Fast anyway.` — the brand line as
  H1. More memorable, less immediately legible to a 60-second skim. Good if the
  eyebrow underneath does the explaining.
- `I work one layer <em>below</em><br />the product.` — most distinctive, most
  risk. Reads as craft to a design leader and as vague to a recruiter.

### Eyebrow — the de-IAM-ing move

Replace the single `{site.seeking}` label (`index.astro:25`) with the domain
line. This is the highest-leverage change on the page: it turns her from an
identity designer into a five-domain designer in one row of text.

> STAFF PRODUCT DESIGNER — FINTECH · PLATFORM · DESIGN SYSTEMS · TRUST & IDENTITY · COMMERCE

### Supporting copy

Replacing `index.astro:33–38`:

> Ten years on the parts of a product other things are built on. Privacy and
> data controls across PayPal, Honey and Venmo. Partner onboarding into Okta's
> integration network. The merchant design system at Walmart Labs. Different
> industries, one repeated result: **ISV onboarding down 40%, data-request
> effort down 40%, task completion down 35%.**

Every company name, every domain, and all three numbers, above the fold.

### Two other home-page strings

**The OneWord band** (`index.astro:62`) currently reads *"The best enterprise
software feels ___"*, which locks the interactive moment to enterprise:

```astro
before="The best complicated software feels"
```
Seeds `obvious / learnable / quiet / honest / fast` all still work, and
"complicated software feels obvious" is a sharper statement of her brand than
the enterprise version was.

**The contact band** (`index.astro:115–117`):
> Looking for a {site.ask}. The hard, systemic parts of a product — payments,
> platforms, or whatever's slowest.

---

## 4. About page

### Header (`about.astro:29`)

**Current:** "Staff product designer in *enterprise* software."
**Replace with:** "Complicated for *real* reasons. Fast anyway."

### Intro (`about.astro:31–41`)

> I've spent ten years one layer below the thing people think they're using —
> the privacy and data controls behind PayPal, Honey and Venmo; the path
> partners take to integrate with Okta; the design system Walmart's merchant
> teams built on. Different industries, same job: the system is complicated for
> reasons that are usually legitimate, and my job is to make it fast anyway.
>
> The constraints are rarely mine alone. At PayPal I designed data access and
> deletion with Legal and Compliance in the room, and cut the effort per request
> by 40%. At Okta I worked with product, engineering and go-to-market on partner
> onboarding, and cut ISV onboarding time by 40%. At Deloitte I designed for
> pharmaceutical scientists and a Philips VR pilot in the same year.
>
> I'm in Bangalore, working remote, and looking for a {site.ask}. What I want
> next is a hard problem with real constraints and my hands on the work.

Note this fixes `location: '[City]'` in `site.ts:22` — the resume says
**Bangalore, India**, and `Asia/Kolkata` in `site.ts:23` is already correct.

### The career break

The resume ends at Mar 2025; it is now Jul 2026. That gap is visible on any
timeline and reads worse unexplained than explained. One sentence, placed after
the timeline rather than in the intro — it should not be the first thing a
recruiter meets.

### The timeline (`about.astro:10–21`) — corrected

| Years | Org | Role | Note |
|---|---|---|---|
| 2024–2025 | Okta | Staff Product Designer | Partner onboarding into the Okta Integration Network and entitlement workflows. Mentored designers and helped hire. |
| 2021–2024 | PayPal | Lead Product Designer | Global Data & Privacy, Activity, RCM — across PayPal, Honey and Venmo. Legal and Compliance in every review. |
| 2019–2021 | Walmart Labs | UX Designer | Merchant operations, employee workflows, internal platform. Built the Merchant Design System. |
| 2017–2019 | Deloitte Digital | UX/UI Designer | Healthcare and technology clients. Sun Pharma scientist workflows; a Philips VR pilot. |
| 2015 | Zomato | UX/UI Designer | Consumer product, web and brand. |

Real dates replace every `[20XX]`. Note that "Enterprise clients, mostly
financial services" on `about.astro:18` is wrong — the resume says **healthcare
and technology**.

### "How I work"

The four principles (`about.astro:52–86`) hold up and are worth keeping. Only
#2 needs a source note: the design-system claim is now backed by the Walmart
Merchant Design System rather than asserted. Accessibility (#4) stays as-is —
it's on the resume's skills line and she has the talk.

---

## 5. Case study order

**Current:** Okta IAM → PayPal privacy → Walmart Scan & Go.
That order opens on identity, and the first thing a Stripe or Nubank recruiter
sees is enterprise security.

**Recommended:**

**1 — PayPal · Privacy and data controls across PayPal, Honey and Venmo**
Opens on fintech at consumer scale, her longest role, a hard number, and Legal
in the room. A payments company sees itself in the first band. Keeps its
existing `lilac` theme.

**2 — Okta · Onboarding partners onto a platform**
Not "Rebuilding IAM for enterprise admins." Reframed as the Integration Network
work, this is a developer-experience and ecosystem-growth story with a 40%
number — the same shape as problems at Stripe, Twilio or Figma. Entitlement
Management becomes a second section inside it, which is where identity gets its
proper due without owning the headline. Rename the slug from
`/work/okta-iam` → `/work/okta-integration-network`.

**3 — Walmart Labs · The Merchant Design System**
Replaces the Scan & Go case entirely. Claims the design-systems and
product-foundations pillar at Walmart scale, and covers commerce. This is the
case study a Figma or Airbnb design leader reads most closely.

**4 — Deloitte · Sun Pharma scientist workflows** *(optional fourth, or a
promoted archive row)*
−35% task completion in pharmaceutical research. Its job is to prove the pattern
is portable to a domain nobody expects, which is the whole "not a one-vertical
designer" argument. The Philips VR pilot is a one-line coda here.

**Why this order:** the first three bands land on three different industries —
payments, platform, commerce — and three different pillars. A recruiter who
scrolls once and leaves has seen breadth. The current order shows identity,
privacy, retail and reads as "enterprise designer who once did a consumer app."

Archive rows (`work.ts:30–34`): retag Deloitte from "Enterprise design" to
"Healthcare & enterprise", Zomato from "Consumer product" to "Consumer product,
2015", and keep *The Saga of Accessibility*.

---

## 6. What over-emphasises IAM, and how to rebalance

### On the resume

| # | What it is | Why it over-weights IAM | Fix |
|---|---|---|---|
| 1 | The line under her name: **"Staff Product Designer, Okta"** | The strongest anchor on the page. It makes a **7-month** role her entire identity, above a 3-year fintech role. | `Staff Product Designer · Fintech · Platform · Design Systems` — or just `Staff Product Designer`. |
| 2 | Summary: "across **Identity**, Fintech, Privacy, Commerce, Healthcare, and SaaS" | Identity is listed first, so it reads as the primary domain. | Reorder: "across **Fintech, Platform, Privacy, Commerce, Identity, and Healthcare**." One-word move, large effect. |
| 3 | Summary: "at **Okta**, PayPal, Walmart Labs, and Deloitte Digital" | Okta-first again, in the same sentence. | "at **PayPal, Okta, Walmart Labs, and Deloitte Digital**" — weight by contribution, not recency. |
| 4 | Skills line: "Product Strategy • **Enterprise SaaS** • **Identity & Access Management** • Privacy…" | Positions 2 and 3, before design systems and research. Reads as an identity specialist's skill line. | `Product Strategy • Design Systems • Platform & Developer Experience • Privacy & Trust • Fintech • User Research • Accessibility • Identity & Access Management • Team Leadership` — IAM retained, demoted. |
| 5 | Okta bullet 1 leads with "**identity and administration** experiences" | The first bullet of the top role is the most-read line in the block, and it's the IAM one. | Lead with the OIN bullet — it has the 40% number and the broadest read. Move "identity and administration" to second. |
| 6 | Walmart's **Merchant Design System** is bullet 3 of 4 | The strongest design-systems evidence on the resume, buried mid-block. | Promote to bullet 1. |
| 7 | Reverse-chronological order puts the 7-month role on top | Unavoidable structurally — but a reader may assume Okta was the long chapter. | Can't reorder, so let the summary and skills carry the weight, and keep the date ranges visually prominent. |

### On the site

| Location | Current | Change |
|---|---|---|
| `site.ts:5` | tagline: "Identity, access, and the systems enterprises run on" | §2 — highest priority, it's the meta description |
| `index.astro:29` | "systems **enterprises run on**" | §3 headline |
| `index.astro:34–37` | Hero body opens on Okta + "identity for thousands of employees" | §3 supporting copy |
| `index.astro:62` | "The best **enterprise** software feels" | "The best complicated software feels" |
| `index.astro:115` | "the hard, systemic parts of **enterprise software**" | §3 contact band |
| `about.astro:29` | "Staff product designer in **enterprise** software" | §4 header |
| `about.astro:33–34` | Intro leads with IAM console | §4 intro |
| `work.ts:6` | "Rebuilding **IAM** for enterprise admins" | "Onboarding partners onto a platform" |
| `work.ts:10` | `/work/okta-iam`, alt "Okta IAM admin console" | `/work/okta-integration-network` |
| `cases.ts:75–76` | eyebrow "Okta · **Identity & Access Management**" | "Okta · Platform & partner experience" |
| `work.astro:25` | meta description "Okta IAM, PayPal privacy, Walmart Scan & Go" | Reorder to PayPal, Okta, Walmart |
| `CLAUDE.md` | "on Identity & Access Management, where she also led a team of six" | Rewrite to match resume — it's the brief every future change is written against |

**The principle:** describe the Okta work by its **problem shape** (partner
onboarding, ecosystem growth, permissions at scale) rather than its **category**
(IAM, enterprise security). Identity stays fully visible — in the fourth domain
chip, in the Okta case study's second section, on the timeline, in the skills
line. It stops being the first thing anyone reads.

---

## Open questions for Anupama

1. **The team of six.** Direct reports, dotted-line, or mentorship? The resume
   says mentoring; the site says line management. Which is true?
2. **Scan & Go.** Did she work on it? It isn't on the resume. If yes, it needs a
   resume bullet; if no, the case study should be rebuilt as the Merchant Design
   System.
3. **AI.** Did Entitlement Management (Okta) or RCM (PayPal) involve
   recommendations, risk scoring, or automated review? See §0c.
4. **The `[X]` numbers in `cases.ts`.** Three real numbers now exist (−40%,
   −40%, −35%). The rest still need her.
5. **The break since Mar 2025** — how does she want it stated?
6. **Zomato.** The resume's Zomato bullet reads "across a portfolio of
   **financial products**." Zomato is food delivery — this looks like a
   paste error from another draft and should be corrected.
7. **"10+ years."** The listed roles total roughly 8.5 years (2015, then
   2017–2025). If there's unlisted experience it should appear; if not, "10+"
   invites a question she'd rather not be asked.
