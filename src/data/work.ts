// The case-study set, shared by the home page (ACT 2) and /work.
// Placeholder imagery — swap the image paths once real assets land in
// /public/images. Numbers in brackets are still to be filled in.
//
// All seven link to /work/<slug>. Nothing here sends a visitor off to a
// Google Slides deck — a recruiter who lands on a Drive login has left the
// site.
//
// Palette: the first three wear the saturated chapter hues (coral, lilac,
// sage), the next two the quieter editorial grounds (clay, bone). That was a
// hierarchy of how finished each write-up was. Chase Pay has since been
// written from its original deck and is now the best-sourced case here, so
// bone is doing less work than it was — worth revisiting once the data
// access case is filled in too. The OIN framework case used to wear ink, on
// the reasoning that it was the flagship and closed the grid on the darkest
// ground on the site — but on the home page, every project now sits inside
// its own ProjectCard on a shared ink band (see index.astro), so an
// ink-themed card had no visible edge against the page it was sitting on.
// It now wears `ember` (tokens.css) instead — a genuine eighth palette,
// added because this card needed a real fix, not claimed for its own sake.
//
// Same problem hit Chase Pay from the other direction: the home page's
// Selected Work band itself moved from ink to `bone` (too dark to read as
// "day mode"), which left this card — already wearing bone — with no edge
// against its own section. Rather than claim a ninth palette, it now wears
// `ink`, the one theme no other home-page card uses and the exact inverse
// of the section it sits in.
// The seventh, PayPal Debit Card, is appended after OIN and reuses clay
// rather than claiming a ninth palette.
//
// `showOnHome` is no longer read: the home page's cards are their own list,
// `homeCards` (below `work`), because they are picked and shaped for the
// phone-card grid rather than mirroring /work.
//
// `hoverState` drives the /work grid's card hover label (CaseCard.astro +
// HoverLabel.astro) — one of the five states in `data/hoverState.ts`. Every
// entry below is a finished case study, so all seven are 'case-study'; a
// future project that only has a deck-level overview, links out to a live
// site, is still being built, or isn't public yet should set the matching
// state instead rather than forcing 'case-study'.
//
// `tagline` is the one-line homepage version of `summary` — CasePreview.astro
// (the home page band) reads this, not `summary`. `summary` stays multi-
// sentence for /work and for whoever writes the case-study prose next; the
// home page's job is to make someone want to click, not to brief them, so it
// gets a single sentence instead of the full paragraph. `role` still feeds
// CaseCard.astro on /work — the home page band no longer shows it at all,
// per the "movie trailer, not the full movie" brief.
//
// Card labels, after carlthomasiv.com: one row above the title reading
// `COMPANY · [domain] [discipline]…`. The domain chips come from
// `categories` (the same ones /work filters by, fintech first), the
// discipline chips from `tags`; `labelsFor()` joins them and keeps the
// first three (on request); past that the row stops being skimmable. "Product Design" was dropped on request — on a product
// designer's portfolio it's implied, and it sat on five of seven cards.
// Growth is on Chase Pay only (its job was winning back Walmart Pay
// adoption); add it elsewhere only where the case is about adoption or
// conversion.
export const work = [
  { company: 'Okta', theme: 'coral', device: 'desktop',
    title: 'Rebuilding IAM for enterprise admins',
    tagline: 'A ground-up rebuild of the admin console, shipped under live tenants.',
    summary: 'Admins ran identity for thousands of employees through a console built for a smaller company. I owned the design of the core administrative surfaces — entitlements, role management, the OIN publishing flow and developer onboarding — through a rebuild that shipped underneath live tenants, with no migration freeze.',
    role: 'Staff Product Designer · IAM + Developer Tools · Led 6 designers',
    impact: 'Admin task time down [X]% across the four highest-volume flows',
    hoverState: 'case-study',
    tags: ['Product Strategy', 'Design Systems', '0→1'], categories: ['devtools', '0-1', 'design-systems'],
    href: '/work/okta-iam', image: '/images/okta/my-apps.webp', alt: "Okta's My Apps dashboard on desktop and mobile" },
  { company: 'PayPal', theme: 'lilac', device: 'phone',
    title: 'Privacy settings people can read',
    tagline: 'Data & Privacy settings rebuilt from card sorts and testing, launched to 80M+ people.',
    summary: 'PayPal\'s privacy settings had grown into a list of legal controls with no structure, and 75% of visitors stopped on the first page. I led the research and design of a new structure, tested it through card sorts and unmoderated prototypes, and it launched in early 2023 to more than 80 million people, under GDPR and CCPA.',
    role: 'Lead product designer · PayPal app and web · Research through delivery',
    impact: 'Privacy support calls down 60%',
    hoverState: 'case-study',
    tags: ['Design Systems'], categories: ['fintech'],
    href: '/work/paypal-privacy', image: '/images/paypal-privacy/hero.webp', alt: 'Redesigned PayPal Data and privacy screens' },
  { company: 'Walmart Labs', theme: 'sage', device: 'phone',
    title: 'Scan & Go, in-store',
    tagline: 'Scan as you shop, pay on your phone, skip the line. Research to store pilot in a year.',
    summary: 'Walmart had no answer to the checkout queue, and in 2020 the queue became a health question. I designed Scan & Go end to end inside the Walmart app — scanning, cart, payment and exit — tested it in stores, and took it to a pilot that grew basket size 25%.',
    role: 'Product designer · End-to-end flows · Team of 11',
    impact: 'Basket size up 25% in the first pilot',
    hoverState: 'case-study',
    tags: ['Product Strategy', '0→1'], categories: ['0-1'],
    href: '/work/walmart-scan-go', image: '/images/scan-go/hero.webp', alt: 'Scan & Go screens: scanning, cart and self-checkout' },

  // TODO: `company` here is an inference, not a fact. The live site's tile for
  // this work links at the PayPal privacy page, and that page lists a focus
  // area called "untangling data messes — data classification & organization",
  // which reads like the same project. If it is the same project, this may
  // belong inside the PayPal privacy case rather than beside it. Confirm.
  { company: 'PayPal', theme: 'clay', device: 'desktop',
    title: 'Automating data access requests',
    tagline: 'A request-and-wait process turned into a governed, self-serve system.',
    summary: 'Getting access to internal data meant a request thread, a spreadsheet and a wait. I designed the flow that turned it into a system — who can ask for what, what gets granted automatically, and where a human still has to look.',
    role: 'Product strategy · End-to-end visual and interaction design',
    impact: 'Access request turnaround down from [X] to [X]',
    hoverState: 'case-study',
    tags: ['Product Strategy'], categories: ['fintech'],
    href: '/work/paypal-data-access', image: '/images/placeholder-4.svg', alt: 'Data access automation' },
  { company: 'Walmart Labs', theme: 'ink', device: 'phone',
    title: 'Chase Pay inside Walmart Pay',
    tagline: 'Brought Chase Pay into Walmart Pay, validated with real customers in-store.',
    summary: 'Savings Catcher retired in May 2019 and Walmart Pay adoption fell with it. Chase came with the integration already solved — the same pattern they had shipped with PayPal and Samsung Pay. I took it to twelve customers in a store instead, and the two things that broke were invisible from a spec.',
    role: 'Product designer, Walmart Pay · Sole designer · 5 Chase stakeholders',
    impact: 'Shipped on iOS Feb 2020 and Android Jun 2020',
    hoverState: 'case-study',
    tags: [], categories: ['fintech', 'growth'],
    href: '/work/walmart-chase-pay',
    // `image` is the /work tile (a landscape crop). The home-page band puts
    // the actual prototype recording in the phone instead — the GIF from the
    // live Wix site, re-encoded. `mediaRatio` is the recording's own 600×1066
    // so the frame doesn't crop the UI. See CasePreview.astro.
    image: '/images/chase-pay/hero.png', alt: 'Chase Pay linking screen inside Walmart Pay',
    video: { mp4: '/images/chase-pay/prototype.mp4',
             webm: '/images/chase-pay/prototype.webm',
             poster: '/images/chase-pay/prototype-poster.jpg',
             alt: 'Screen recording of the Chase Pay prototype: setting up Walmart Pay, choosing Add Chase Pay from the payment types, and completing the handoff to Chase and back' },
    mediaRatio: '600 / 1066' },
  // The flagship. Appended rather than reordered to the front so the
  // hand-tuned five-slot `layout` array on /work.astro stays untouched —
  // this sixth tile falls back to /work.astro's documented full-width
  // 16/10 treatment, which reads as an intentional close to the grid
  // rather than a squeezed sixth card.
  { company: 'Okta', theme: 'ember', device: 'desktop',
    title: "Designing the future of Okta's Integration Platform",
    tagline: 'One extensible framework replaced four bespoke integration review flows.',
    summary: 'Every new OIN integration category meant a bespoke review flow built by hand. I designed one extensible framework instead — a shared manifest schema, validation engine and component kit — so a category Okta hasn\'t invented yet can launch on it without a new build.',
    role: 'Staff Product Designer · Integration Platform + Developer Ecosystem',
    impact: 'Submission cycle time down [X]%, on one framework instead of four',
    hoverState: 'case-study',
    tags: ['Design Systems', 'Design Engineering', '0→1'], categories: ['devtools', 'design-systems', '0-1'],
    href: '/work/okta-oin', image: '/images/okta/integrations.webp', alt: 'Auth0 onboarding screens: Applications, Organizations and Single Sign On Integrations' },

  // Written from her "PayPal Debit Card" deck — see the header comment on
  // `paypal-debit-card` in cases.ts. Replaced the old Unified Card System
  // skeleton. The abandonment result, the hard call and her exact hands-on
  // scope are still brackets. `showOnHome: false` until they're filled.
  { company: 'PayPal', theme: 'clay', device: 'phone', showOnHome: false,
    title: 'A debit card people finish signing up for',
    tagline: 'Card enrollment and cash back rebuilt inside the PayPal app.',
    summary: '68% of people who started applying for the PayPal debit card gave up. I led the redesign of enrollment around identity checks and fee disclosure, gave people a digital card to use the same day, and added cash back offers.',
    role: 'UX team lead · Enrollment, card home and rewards',
    impact: 'Applications 20% faster, same-day activation up 18%',
    hoverState: 'case-study',
    tags: ['Product Strategy'], categories: ['fintech'],
    href: '/work/paypal-debit-card', image: '/images/paypal-debit/hero.webp', alt: 'PayPal Debit Card screens in the PayPal app' },
] as const;

// The home page's "Selected work": four stacked cards (ProjectCard.astro),
// each with the work running on its right-hand stage. Four, on request:
// the Okta flagship, the two fintech cases with the strongest evidence
// (Privacy, 80M+ people; Chase Pay, the real recording), and the Debit
// Card's working sign-up prototype. The rest are on /work. Okta's work
// is desktop, so it shows a screenshot instead of a phone.
//
// Each entry points at a `work` case by `href` and borrows its company,
// title, tagline and labels; `title`/`tagline` here override them.
//
// Media:
//   video     — a screen recording (the case's own `video`)
//   screens   — single screens cut from her boards by
//               scripts/phone-screens.py, shown in sequence
//   prototype — a coded prototype on autopilot (EnrollPrototype /
//               OffersPrototype, `autoplay` mode)
//   desktop   — a desktop screenshot on its own (still placeholders
//               until the Okta NDA check)
// `alt` describes the whole stage, since the phone inside it is hidden
// from screen readers.
export type HomeMedia =
  | { type: 'video'; alt: string }
  | { type: 'screens'; screens: string[]; alt: string }
  | { type: 'prototype'; name: 'paypal-enroll' | 'paypal-offers'; alt: string }
  | { type: 'desktop'; image: string; alt: string };

export const homeCards: { href: string; title?: string; tagline?: string; media: HomeMedia }[] = [
  { href: '/work/okta-iam',
    media: { type: 'desktop', image: '/images/okta/my-apps.webp', alt: "Okta's My Apps dashboard on desktop and mobile" } },
  { href: '/work/paypal-privacy',
    media: { type: 'screens', alt: 'PayPal app screens, one after another: Data and privacy, Deals and ads, Personalized deals and offers, and How it works',
      screens: [1, 2, 3, 4].map((n) => `/images/paypal-privacy/phone-${n}.webp`) } },
  { href: '/work/walmart-chase-pay',
    media: { type: 'video', alt: 'Screen recording of the Chase Pay prototype: setting up Walmart Pay, choosing Add Chase Pay from the payment types, and completing the handoff to Chase and back' } },
  { href: '/work/paypal-debit-card',
    media: { type: 'prototype', name: 'paypal-enroll', alt: 'The PayPal Debit Card sign-up prototype running by itself: value prop, Balance account, confirming identity, shipping address, and the card marked Ordered' } },
];

// The archive tier on /work — the earlier projects, listed as text rows
// rather than tiles (the reference does the same: a grid of selected work,
// then a plain list beneath it). Each row hides a preview image that opens
// on hover; see ArchiveList.astro.
//
// Content lifted from the live Wix site's /allworks page. Images were pulled
// from the same place and now live in /public/images/archive — hotlinking
// static.wixstatic.com would break the day that site is switched off, which
// is the whole point of this repo.
//
// Every row now links to a case study on this site — `/work/<slug>`, built
// from the same cases.ts the six selected projects use. Nothing here points
// at the Wix site any more, so the archive survives that site being retired.
//
// `tag` is read off what each project actually is (a design system is a
// design system) — not invented. `year` is bracketed everywhere except
// Agreement Management, which is the one project whose dates the live site
// states: started January 2019, launched 8 October 2020.
//
// STILL NEEDS HER: the years, and the gaps inside each case study. The
// source pages varied enormously — Agreement Management came with NPS and a
// launch date, Lender's App with three sentences — so the thin ones carry a
// lot of brackets. See the header note above the archive tier in cases.ts.
// `href` is optional — a row without one renders as text, no link.
export const archive = [
  { name: 'Wal-E Design System', tag: 'Design system', year: '[20XX]',
    href: '/work/wal-e-design-system',
    image: '/images/archive/wal-e-design-system.jpg' },
  { name: 'Agreement Management Application', tag: 'Enterprise application', year: '2020',
    href: '/work/walmart-agreement-management',
    image: '/images/archive/agreement-management.jpg' },
  { name: 'Bot Spark', tag: 'Internal tool', year: '[20XX]',
    href: '/work/bot-spark',
    image: '/images/archive/bot-spark-banner.jpg' },
  { name: 'Mint app', tag: 'Product concept', year: '[20XX]',
    href: '/work/mint-credit-score',
    image: '/images/archive/mint-app.jpg' },
  { name: "Lender's app", tag: 'Mobile app', year: '[20XX]',
    href: '/work/ratanindia-lenders-app',
    image: '/images/archive/lenders-app.jpg' },
  { name: 'Investment Portfolio onboarding', tag: 'Mobile app', year: '[20XX]',
    href: '/work/qplum-qfolio',
    image: '/images/archive/investment-onboarding.jpg' },
  { name: 'Dialog quick loan', tag: 'Mobile app', year: '[20XX]',
    href: '/work/dialog-quick-loan',
    image: '/images/archive/dialog-quick-loan.jpg' },
  { name: 'Dream gains finance', tag: 'Website design', year: '[20XX]',
    href: '/work/dreamgains-finance',
    image: '/images/archive/dream-gains.jpg' },
  { name: 'Mera Data', tag: 'Web app', year: '[20XX]',
    href: '/work/mera-data',
    image: '/images/archive/mera-data.jpg' },
] as const;

// Which project hue (tokens.css, PROJECT HUES) a company's screenshots sit
// on. Keyed off the company name so work.ts, cases.ts and the archive all
// agree without a per-entry field to keep in sync. Unknown companies get
// no hue and fall back to the neutral --screen.
export type Hue = 'okta' | 'paypal' | 'walmart';
export function hueFor(company?: string): Hue | undefined {
  const c = (company ?? '').toLowerCase();
  if (c.startsWith('okta')) return 'okta';
  if (c.startsWith('paypal')) return 'paypal';
  if (c.startsWith('walmart')) return 'walmart';
  return undefined;
}

// The domain half of a card's label row. 0-1 and design-systems are
// categories too, but they're disciplines, so they come through `tags`.
// Enterprise and Consumer were dropped on request (labels and filters).
export const DOMAIN_LABEL: Record<string, string> = {
  fintech: 'Fintech', devtools: 'Developer Tools', growth: 'Growth',
};
const DOMAIN_ORDER = ['fintech', 'devtools', 'growth'];
// Three labels at most, everywhere a case is labelled (home cards, /work,
// the case study page) — on request. Domain first, then disciplines in
// the order written, so trim a case's `tags` order to choose what shows.
const MAX_LABELS = 3;
export function labelsFor(w: { categories?: readonly string[]; tags?: readonly string[] }): string[] {
  const domains = DOMAIN_ORDER.filter((d) => w.categories?.includes(d)).map((d) => DOMAIN_LABEL[d]);
  return [...domains, ...(w.tags ?? [])].slice(0, MAX_LABELS);
}
