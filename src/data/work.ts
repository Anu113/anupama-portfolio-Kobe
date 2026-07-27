// The case-study set, shared by the home page (ACT 2) and /work.
// Placeholder imagery — swap the image paths once real assets land in
// /public/images. Numbers in brackets are still to be filled in.
//
// All five link to /work/<slug>. Nothing here sends a visitor off to a Google
// Slides deck — a recruiter who lands on a Drive login has left the site.
//
// Palette: the first three wear the saturated chapter hues (coral, lilac,
// sage), the last two the quieter editorial grounds (clay, bone). That was a
// hierarchy of how finished each write-up was. Chase Pay has since been
// written from its original deck and is now the best-sourced case here, so
// bone is doing less work than it was — worth revisiting once the data
// access case is filled in too.
export const work = [
  { company: 'Okta', theme: 'coral', device: 'desktop',
    title: 'Rebuilding IAM for enterprise admins',
    summary: 'Admins ran identity for thousands of employees through a console built for a smaller company. I owned the design of the core administrative surfaces — entitlements, role management, the OIN publishing flow and developer onboarding — through a rebuild that shipped underneath live tenants, with no migration freeze.',
    role: 'Staff Product Designer · IAM + Developer Tools · Led 6 designers',
    impact: 'Admin task time down [X]% across the four highest-volume flows',
    href: '/work/okta-iam', image: '/images/placeholder-1.svg', alt: 'Okta IAM admin console' },
  { company: 'PayPal', theme: 'lilac', device: 'phone',
    title: 'Privacy settings people can read',
    summary: 'Data-sharing controls were legally complete and practically unreadable. We rebuilt the model around what a person is deciding, not what the policy document contains, and shipped it across iOS, Android and desktop.',
    role: 'Design lead · iOS, Android, desktop · Motion and illustration',
    impact: 'Comprehension up [X]% in unmoderated testing',
    href: '/work/paypal-privacy', image: '/images/placeholder-2.svg', alt: 'PayPal privacy settings' },
  { company: 'Walmart Labs', theme: 'sage', device: 'phone',
    title: 'Scan & Go, in-store',
    summary: 'Six weeks of store-floor ethnography — watching how people actually scan and manage a cart — turned a checkout-replacement bet into a shipped product. The research set the scope, and the scope survived three rounds of executive review.',
    role: 'End-to-end designer · Product strategy through interaction design',
    impact: 'Ethnographic research to shipped pilot in [X] stores',
    href: '/work/walmart-scan-go', image: '/images/placeholder-3.svg', alt: 'Scan & Go' },

  // TODO: `company` here is an inference, not a fact. The live site's tile for
  // this work links at the PayPal privacy page, and that page lists a focus
  // area called "untangling data messes — data classification & organization",
  // which reads like the same project. If it is the same project, this may
  // belong inside the PayPal privacy case rather than beside it. Confirm.
  { company: 'PayPal', theme: 'clay', device: 'desktop',
    title: 'Automating data access requests',
    summary: 'Getting access to internal data meant a request thread, a spreadsheet and a wait. I designed the flow that turned it into a system — who can ask for what, what gets granted automatically, and where a human still has to look.',
    role: 'Product strategy · End-to-end visual and interaction design',
    impact: 'Access request turnaround down from [X] to [X]',
    href: '/work/paypal-data-access', image: '/images/placeholder-4.svg', alt: 'Data access automation' },
  { company: 'Walmart Labs', theme: 'bone', device: 'phone',
    title: 'Chase Pay inside Walmart Pay',
    summary: 'Savings Catcher retired in May 2019 and Walmart Pay adoption fell with it. Chase came with the integration already solved — the same pattern they had shipped with PayPal and Samsung Pay. I took it to twelve customers in a store instead, and the two things that broke were invisible from a spec.',
    role: 'Product designer, Walmart Pay · Sole designer · 5 Chase stakeholders',
    impact: 'Shipped on iOS Feb 2020 and Android Jun 2020',
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
] as const;

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
// TWO THINGS STILL NEED HER:
//   1. `tag` and `year` are bracket placeholders. /allworks shows neither —
//      it is a bare image grid — so there was nothing to carry across. Same
//      convention as the [X] metrics: visible until she fills them in.
//   2. `href` points back at the Wix site, so these rows die when it is
//      retired. Fine while both are up; decide before the switch whether
//      each project earns a page here or the link simply goes.
// `href` is optional — a row without one renders as text, no link.
export const archive = [
  { name: 'Wal-E Design System', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/s-projects-side-by-side',
    image: '/images/archive/wal-e-design-system.jpg' },
  { name: 'Agreement Management Application', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-design-system',
    image: '/images/archive/agreement-management.jpg' },
  { name: 'Bot Spark Banner', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-ama',
    image: '/images/archive/bot-spark-banner.jpg' },
  { name: 'Mint app', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-sunpharama-dashboard',
    image: '/images/archive/mint-app.jpg' },
  { name: "Lender's app", tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-bot-spark',
    image: '/images/archive/lenders-app.jpg' },
  { name: 'Investment Portfolio onboarding', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-dreamgains',
    image: '/images/archive/investment-onboarding.jpg' },
  { name: 'Dialog quick loan', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-ratan-india-lender-s-app',
    image: '/images/archive/dialog-quick-loan.jpg' },
  { name: 'Dream gains finance', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-mera-data',
    image: '/images/archive/dream-gains.jpg' },
  { name: 'Mera Data', tag: '[Category]', year: '[20XX]',
    href: 'https://www.anupama.design/copy-of-dialog-app',
    image: '/images/archive/mera-data.jpg' },
] as const;
