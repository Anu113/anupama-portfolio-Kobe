// cases.ts — the long-form content behind /work/[slug].
//
// Why a typed data file and not a content collection: these pages aren't
// prose. Each section is a small composition — a statement heading, then a
// grid of points, a scope table, a figure, a metric strip. Markdown would
// mean either MDX (a new integration) or a wall of raw HTML in a .md file.
// A typed block list keeps the shape enforceable: TypeScript will complain
// if a case study is missing a section, which is exactly the guardrail
// CLAUDE.md rule 3 wants.
//
// THE SHAPE IS NOT OPTIONAL. Every case runs situation → scope → hard call →
// how the work got made → craft → impact → reflection, in that order. The
// standard portfolio narrative (persona, journey, wireframes, hi-fi) argues
// she is a mid-level designer who executes, which loses a staff role. Scope
// and judgement first, then the craft.
//
// Numbers in [brackets] are placeholders, same convention as work.ts.
// Do not invent figures to fill them — they come from Anupama.

export type CaseBlock =
  /** Body copy. One string per paragraph. */
  | { kind: 'prose'; text: string[] }
  /** 2–4 titled points, side by side. The reference's workhorse block. */
  | { kind: 'points'; label?: string; items: { title: string; body: string }[] }
  /** Term/detail rows. Used for the scope table — the one block a recruiter
      is most likely to stop on, so it reads as a table, not a paragraph. */
  | { kind: 'rows'; label?: string; items: { term: string; detail: string }[] }
  /** A screen or artefact. `wide` gives it a panoramic frame — it does not
      make it wider. Nothing may reach into the sticky rail's column.
      `ratio` sets the frame's aspect to the image's own (e.g. '1400 / 1820').
      The frame otherwise forces 16/10 and crops with object-fit: cover, which
      is right for a photo and destroys a portrait screen or a long page
      mockup — half the archive artefacts are one of those two. Give it the
      asset's real dimensions and nothing is cropped. */
  | { kind: 'figure'; src: string; alt: string; caption?: string; wide?: boolean; ratio?: string }
  /** The pull quote. One per section at most, or it stops being a pull. */
  | { kind: 'quote'; text: string; cite?: string }
  /** The numbers. Business, team, and craft — in that order. */
  | { kind: 'metrics'; label?: string; items: { value: string; label: string }[] }
  /** A working prototype, rebuilt in code from her screens. `name` picks
      the component in CaseBlocks.astro. Only for flows she designed. */
  | { kind: 'prototype'; name: 'paypal-enroll' | 'paypal-offers' | 'paypal-ads-consent'; caption?: string };

export interface CaseSection {
  /** Anchor id — also the rail's scroll-spy target. */
  id: string;
  /** Rail label. Keep it under ~24 characters or the rail wraps badly. */
  nav: string;
  /** The uppercase eyebrow above the heading. */
  label: string;
  /** A sentence, not a noun. "We shipped underneath live tenants" beats
      "Technical approach". */
  heading: string;
  blocks: CaseBlock[];
}

export interface CaseStudy {
  slug: string;
  company: string;
  /** The project's hue. Worn by the closing "next case study" band and by
      this project's tile on /work — not by the banner, which is bone on
      every case study so the page reads as one surface. */
  theme: 'ink' | 'sand' | 'bone' | 'clay' | 'sage' | 'lilac' | 'coral';
  eyebrow: string;
  title: string;
  hero: { src: string; alt: string };
  /** The hero meta row — everything EXCEPT role, which is lifted out and set
      beside the banner lede (see below). Scope and partners still live here
      on purpose: a recruiter skimming for 60 seconds should not have to
      scroll to find the level she worked at. */
  meta: { label: string; value: string }[];
  /** Set beside the lede at the top of the banner, opposite the intro —
      the reference (allierho.com/projects/pst2024) puts ROLE there rather
      than in a row under the image, and it is the first thing worth reading
      after the title. */
  role: string;
  /** Optional CTA pill in the banner, top right. ONLY for a URL that leads
      to the actual shipped thing — not a company homepage, not an archived
      portfolio page. A dead or off-target "Live site" is worse than none,
      so leave it unset unless the link has been checked. */
  live?: { href: string; label: string };
  /** Marks this case as gated. Two shapes, chosen by `preview`:
        preview: 0    — FULLY locked. [slug].astro renders LockedGate.astro
                        full-page instead of the case (see that file) —
                        nothing about the case is visible until the
                        password matches. Matches allierho.com's and
                        ozgur.design's own gate pages, which don't show a
                        preview at all.
        preview: N>0  — PARTIALLY gated. The first N sections render in
                        full; the rest sit behind CaseGate.astro, inline,
                        further down the same page.
      Okta uses preview: 0 — a demonstration of the full lock, since every
      section here is still bracket placeholders.

      READ THIS BEFORE SETTING IT ON A REAL CASE: this site is static output
      with no server (Astro, `output: 'static'`). There is nowhere to check a
      password except in the browser — whichever shape above is used, the
      real markup ships in the page's HTML regardless, only hidden with the
      `hidden` attribute until the password matches client-side. Anyone who
      opens dev tools or views source can read it without ever unlocking
      anything. That is the same limit both reference sites accept — a soft,
      deter-casual-browsing gate, not confidentiality. Genuinely NDA'd
      specifics belong in the "reach out, I'll walk you through it live"
      pattern already in the closing band below, never in `password`.

      `scope` and `outcome` are the public version a fully locked case
      shows on LockedGate, beside `role`: one line each, short enough for
      a recruiter to read at a glance. Only facts cleared to be public. */
  locked?: { password: string; preview: number; scope?: string; outcome?: string };
  sections: CaseSection[];
  /** Slug of the next case study, for the footer link. */
  next: string;
  description: string;
}

export const cases: CaseStudy[] = [
  // ==========================================================
  {
    slug: 'okta-iam',
    company: 'Okta',
    theme: 'coral',
    eyebrow: 'Okta · Identity & Access Management + Developer Tools · [20XX–20XX]',
    title: 'Rebuilding IAM for enterprise admins',
    hero: { src: '/images/okta/my-apps.webp', alt: "Okta's My Apps dashboard on desktop and mobile" },
    description:
      'Okta IAM and developer tools: rebuilding the enterprise admin console underneath live tenants — entitlements, role management, OIN publishing and developer onboarding, and the six-designer team working to it.',
    meta: [
      { label: 'Team', value: '6 designers across 4 squads' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: 'Staff Product Designer, IAM + Developer Tools',
    /* Demonstration case for the FULL gate — see the `locked` field's own
       comment on CaseStudy above before adding this to a case with real
       specifics. preview: 0 renders LockedGate.astro in place of the whole
       page; nothing about this case is visible until the password matches.
       [Placeholder password — replace before sharing this link with
       anyone.] */
    locked: {
      password: 'okta2026',
      preview: 0,
      scope: 'Entitlements, role management, OIN publishing and developer onboarding',
      /* Okta's public scale, not a claim of her impact (chosen on request
         until she has a real number of her own): ~19,650 customers at the
         end of FY2025 (Barchart) and 8,000+ OIN integrations
         (okta.com/integrations). Swap for her own result once confirmed. */
      outcome: 'Shipped to an admin console used by about 20,000 companies and an 8,000-app integration network',
    },
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Okta was closing enterprise deals on a console built for smaller companies.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The administrative surfaces had been designed for an admin managing a few hundred users. The accounts Okta was now winning had tens of thousands, nested org structures, and compliance teams auditing every permission change. The same screens were being asked to do a job an order of magnitude larger.',
              'It showed in the places that cost money: onboarding time in enterprise implementations, support volume on the four highest-traffic admin flows, and — the one that reached the executive staff — deals where a competitor demoed better against the same requirements.',
              'There was a second audience on the same platform. ISVs publishing to the Okta Integration Network, and the developers wiring Okta into their own products, hit the same surfaces from the other side. Their onboarding was a separate problem with the same root: a set of screens that assumed you already knew the model.',
            ],
          },
          {
            kind: 'points',
            label: 'What was at stake',
            items: [
              {
                title: 'Renewal risk',
                body: 'Admin experience was surfacing in [X] renewal conversations as a stated concern.',
              },
              {
                title: 'Implementation cost',
                body: 'Enterprise onboarding ran [X] weeks, most of it spent teaching admins around the console rather than through it.',
              },
              {
                title: 'A frozen roadmap',
                body: 'Four squads were each patching the same surfaces independently, so every fix made the next one harder.',
              },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Six designers, four squads, and a console that had to keep working the whole time.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'The design strategy for the admin surface end to end — entitlements, role management, the OIN publishing flow ISVs use to ship an integration, and developer onboarding — plus the sequencing of what got rebuilt in what order, hiring and levelling for the design team, and the case to the executive staff for the funding. I designed the entitlements and role-management flows myself; they were the model everything else had to agree with.',
              },
              {
                term: 'What I delegated',
                detail:
                  'Each of the four squads had a designer owning their surface outright — flows, specs, and the working relationship with their PM and engineering lead. I reviewed at the seams, not inside them.',
              },
              {
                term: 'The team',
                detail:
                  'Six designers: four embedded in squads, one on the design system, one on research. Two I hired into the team; one I levelled from mid to senior over the course of the project.',
              },
              {
                term: 'Who I reported to',
                detail:
                  'The Director of Design, with a dotted line into the IAM product leadership group I sat in weekly.',
              },
              {
                term: 'How I was measured',
                detail:
                  'Task completion time on the four highest-volume admin flows, enterprise implementation time, and — informally but persistently — whether the four squads stopped diverging.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'We rebuilt underneath live tenants instead of behind a migration.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The clean version of this project is a new console behind a flag, a migration window, and a cutover. Engineering wanted it. It is easier to build, easier to test, and easier to demo.',
              'I argued against it. Our largest customers could not take a cutover on our schedule — an identity console is the thing you touch when something has gone wrong, and asking a security team to relearn it on a date we picked was a request they would refuse. A migration would also have meant a long period where the old console kept receiving fixes, which was the exact problem we were trying to end.',
              'So we rebuilt surface by surface, in place, on the live product. It cost us: every change had to be safe next to screens that had not been rebuilt yet, and the design system had to absorb both vocabularies at once. The design system designer spent most of two quarters on that seam alone. That was the trade — a slower, uglier build, in exchange for never asking a customer to stop working.',
            ],
          },
          {
            kind: 'quote',
            text: 'An identity console is what you open when something has already gone wrong. That is not a screen you get to move on your own schedule.',
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'Four squads had been drifting apart. I built the three things that held them together.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'A critique with a decision at the end',
                body: 'Weekly, 60 minutes, two pieces of work maximum. Every critique ended with a named decision and an owner. Before this, the team had a review meeting that generated opinions and no record of what had been settled.',
              },
              {
                title: 'The system as a contract, not a library',
                body: 'A component entered the system when two squads needed it, not when one designer built it. That rule cut the amount of near-duplicate work the design-system designer was arbitrating, and it made "is this in the system?" a question with an answer.',
              },
              {
                title: 'Research on a rota',
                body: 'One researcher, six designers, so I put the sessions on a rota — every designer sat in on admin research once a month, whether or not it was their surface. The point was shared evidence: arguments about what admins do got shorter when everyone had watched the same sessions.',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The part I would not compromise on was that squad designers made their own calls. My review was at the seams — where one squad\'s surface met another\'s — because that was where the divergence had happened, and it was the only place where a lead\'s view was genuinely better than the owner\'s.',
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'What the rebuilt surfaces actually do.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The through-line across all four surfaces: an admin at enterprise scale is almost never looking at one object. They are looking at a set — every user matching a condition, every policy touching a group — and deciding what to do to the whole set. The old console was built around the single-object page. The rebuild is built around the set.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/placeholder-1.svg',
            alt: 'The rebuilt user directory, showing bulk selection and an inline policy preview',
            caption:
              'Directory. Filtering builds a set; the set is the thing you act on. The preview panel shows what a change will do before it is applied — the single most requested behaviour in research.',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/placeholder-2.svg',
            alt: 'The policy builder with its evaluation trace open',
            caption:
              'Policy builder. Every policy shows its evaluation trace: which rule matched, in what order, and who it affects right now. Admins were previously reconstructing this by hand in spreadsheets.',
          },
          {
            kind: 'figure',
            src: '/images/placeholder-3.svg',
            alt: 'The audit view, showing a filterable change history',
            caption:
              'Audit. Built for the compliance reviewer rather than the admin — a different reader, on the same data, which is why it is a separate surface and not a tab.',
          },
          {
            kind: 'prose',
            text: [
              'Accessibility was a hard gate rather than a review step. Every surface is keyboard-operable end to end, every state carries a text equivalent, and the bulk-action patterns were tested with screen-reader users before they shipped — a console that an admin cannot operate without a mouse is a console some admins cannot do their job in.',
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'What changed, for the business and for the team.',
        blocks: [
          {
            kind: 'metrics',
            label: 'Business',
            items: [
              { value: '[X]%', label: 'Admin task time, across the four highest-volume flows' },
              { value: '[X]%', label: 'Support volume on rebuilt surfaces' },
              { value: '[X] wks', label: 'Enterprise implementation time, down from [X]' },
            ],
          },
          {
            kind: 'metrics',
            label: 'Team and craft',
            items: [
              { value: '2', label: 'Designers hired; one levelled mid → senior' },
              { value: '[X]', label: 'Components consolidated into the shared system' },
              { value: '0', label: 'Migration windows asked of customers' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The number I care about most is the last one. We shipped a rebuild of the core administrative surface of an identity product without once asking a security team to stop what they were doing.',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'Two things I got wrong.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'I under-resourced the seam',
                body: 'One designer held the design system across two vocabularies for two quarters. That was a structural cost of the in-place rebuild, and I should have staffed it as such from the start instead of treating it as a system role that happened to get busy. It was the closest anyone on the team came to burning out, and that was my sequencing, not their capacity.',
              },
              {
                title: 'I built the executive case too late',
                body: 'I made the argument for funding after we had evidence, which felt rigorous and cost us a quarter. The evidence was not going to change the decision — the console was visibly failing enterprise deals. I would now make the case early on the strength of the business risk and use the research to shape the plan rather than to justify it.',
              },
            ],
          },
        ],
      },
    ],
    next: 'paypal-privacy',
  },

  // ==========================================================
  // Written from her Figma case-study deck ("PayPal's Privacy Settings
  // Redesign", 37 frames) and the live site's privacy page. Nothing here
  // goes beyond those two sources. Screens in public/images/paypal-privacy/
  // come from the live page's full-size images, except data-request,
  // data-delete, contextual and subnav: those are crops of a half-scale
  // render of the deck and look soft. Re-export those four frames from
  // Figma at 2x and drop them in under the same names.
  //
  // Still to confirm with Anupama:
  //  - Which modules were hers end to end. The deck's ownership map puts
  //    her name on the Data & Privacy rows (download, correct and delete
  //    your data among them).
  //  - Which prototype shipped. Only prototype 3 cleared the 70% bar.
  //  - How the impact numbers were measured: the 60% (period, baseline),
  //    the 76% (lab or production), the 4.7/5 (where it was asked).
  //  - Whether the yearly privacy reminder shipped. The deck labels the
  //    Shopping version "Proposed card prompt".
  // The deck's "↑ Trust Levels" has no number and is left off.
  {
    slug: 'paypal-privacy',
    company: 'PayPal',
    theme: 'lilac',
    eyebrow: 'PayPal · Data & Privacy settings · 2021–2023',
    title: 'Privacy settings people can read',
    hero: {
      src: '/images/paypal-privacy/hero.webp',
      alt: 'Four redesigned screens: the Data and privacy page, Deals & ads, Personalized deals and offers, and How it works',
    },
    description:
      'PayPal Data & Privacy settings: a new structure built from card sorts and tested in unmoderated prototypes, launched in early 2023 to more than 80 million people.',
    meta: [
      { label: 'Team', value: '4 designers, content strategist, lead researcher, 3 PMs, 2 privacy officers, 15+ engineers' },
      { label: 'Platforms', value: 'PayPal app, mobile first, and web' },
      { label: 'Timeline', value: 'March 2021 – January 2023' },
    ],
    role: 'Lead product designer · Research through delivery',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'The settings had grown one control at a time, and most people never got past the first page.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'PayPal\'s Data & Privacy settings were a list of controls in legal language, with no structure underneath. New features and new GDPR and CCPA requirements had nowhere to go. Customer service heard the same privacy questions again and again.',
              'The goal was to make managing your data easy, build trust, and meet the legal requirements, all on the same screens.',
            ],
          },
          {
            kind: 'metrics',
            label: 'What the baseline showed',
            items: [
              { value: '75%', label: 'Of settings traffic stopped on the first settings page' },
            ],
          },
          {
            kind: 'points',
            label: 'What was broken',
            items: [
              { title: 'No structure', body: 'Controls added one at a time, in jargon, with no information architecture.' },
              { title: 'No transparency', body: 'People couldn\'t tell how their data was used or which controls they had.' },
              { title: 'No room to grow', body: 'New features and new GDPR and CCPA requirements had nowhere to go.' },
              { title: 'Nothing explained', body: 'Nothing told people what their data rights were, or how to use them.' },
            ],
          },
          {
            kind: 'quote',
            text: 'It\'s not explained clearly. I have to fill in the holes with my own prior knowledge.',
            cite: 'A participant in customer research',
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Lead product designer, from the first research to delivery.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'Research, concept, design, user testing and delivery for key modules: [name the modules that were yours end to end].',
              },
              {
                term: 'Research',
                detail:
                  'I ran four closed card sorts and the unmoderated prototype tests, and design tests every two weeks with product managers and engineers asking the questions. I built prototypes for the researchers and helped take notes and synthesise.',
              },
              {
                term: 'The design team',
                detail:
                  'One of four designers. I set up how we worked: one file system, a log of changes, a sprint planning site. I mentored two other designers on mobile patterns.',
              },
              {
                term: 'Who I worked with',
                detail:
                  'A content strategist on every string, a lead UX researcher, three product managers, two data and privacy officers, more than 15 engineers, customer service, and the product teams whose features needed a setting here.',
              },
              {
                term: 'The constraint',
                detail:
                  'GDPR and CCPA decide what has to be disclosed and what PayPal has to keep. Deleting your data can\'t remove what regulation requires PayPal to retain, and the delete screen says so.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'The first structure tested well and cost a tap. I kept the groups and dropped the extra layer.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The first version, built from the card sorts, had three layers. Four tiles: Profile privacy, Feature preferences, Notifications, and Ads and data. Each tile opened a sheet listing its settings, and each setting answered five questions: what data we collect, where it comes from, why, whether it\'s shared, and what you can control.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/layers.webp',
            alt: 'The first layered version: the Data and Privacy page with four tiles, and the sheets for Profile Privacy, Service Notifications and Feature Preferences',
            caption: 'The first version. Four tiles, and a sheet of settings behind each one.',
            ratio: '1800 / 946',
            wide: true,
          },
          {
            kind: 'prose',
            text: [
              'In rapid research the groups worked: people found the categories clear and the page easier to scan. The sheets didn\'t. They added a click before any real setting, so every task took more steps. And some labels failed:',
            ],
          },
          {
            kind: 'rows',
            label: 'What rapid research found',
            items: [
              { term: 'Critical', detail: 'People couldn\'t tell deals from ads.' },
              { term: 'Medium', detail: 'To change marketing email, people looked under Notifications, not Data and Privacy.' },
              { term: 'Medium', detail: 'People didn\'t understand the "Your data rights" section, and read "Correct your data" as something other than updating their details.' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The revised version keeps the groups and removes the sheets. Every setting sits on one page under three headings: Profile privacy, Permissions and shared data, and Your data rights. Each setting is one tap away, with a line under it saying what it does. "Correct your data" became "Update your data", and emails and notifications got their own link at the bottom of the page.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/evolution.webp',
            alt: 'Three versions side by side: the old list of privacy settings, the first layered version with four tiles, and the revised single page with settings grouped under headings',
            caption:
              'Before, the first version, and the revised page. The blue card at the top of the revised page is the yearly privacy reminder, a later proposal.',
            ratio: '1800 / 1696',
            wide: true,
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'The structure came from card sorts, and every version went in front of people.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'Start from what people do',
                body: 'A review of the current settings with the product triad, a year of settings traffic, and sessions with customer service and with the product teams whose features needed a setting. The tasks people did most set the order on each page, balanced against stakeholder needs and GDPR.',
              },
              {
                title: 'Card sorts, then prototypes',
                body: 'Four closed card sorts compared the current structure with three alternatives: 20 tasks, and participants picked the tab each one belonged in. Three workable options came out, and each became a high-fidelity prototype.',
              },
              {
                title: 'Privacy where the question comes up',
                body: 'Most privacy questions start somewhere else: a first visit, a shopping integration, the middle of a payment. We mapped each of those moments to a short explanation in place, with a link to the setting.',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/context-map.webp',
            alt: 'Map: four moments where privacy comes up (learning about a product, a first visit, a privacy concern during a task, a third-party context), each leading to an explanation and a contextual setting',
            caption: 'Where privacy questions come up, and what the product does at each one.',
            ratio: '1800 / 657',
            wide: true,
          },
          {
            kind: 'metrics',
            label: 'Unmoderated test of the three prototypes · 70% success was the bar',
            items: [
              { value: '74%', label: 'Task success, prototype 3, with no one abandoning' },
              { value: '68%', label: 'Task success, prototype 1' },
              { value: '67%', label: 'Task success, prototype 2' },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Each setting says what it does, what it\'s set to, and what changes if you switch it.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/paypal-privacy/shopping.webp',
            alt: 'PayPal Shopping before and after: a screen with one "Turn off PayPal Shopping" button, then a Personalized deals and offers screen with a toggle, and a How it works explainer',
            caption:
              'PayPal Shopping. The old screen had one button: Turn off PayPal Shopping. The new one is a toggle that says what\'s on and what you get, explains how it works with an example, and ends on "We never sell your personal information."',
            ratio: '1800 / 1230',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/data-request.webp',
            alt: 'Get a copy of your data, before and after: a long checklist, then data types grouped with what each is for, connected apps, and a file format',
            caption:
              'Get a copy of your data. Data types are grouped, each says what it\'s for and what\'s included, connected apps (Xoom, Venmo, Honey) are listed, and the request ends on a note that your info is encrypted.',
            ratio: '1800 / 1060',
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/data-delete.webp',
            alt: 'Delete your data, before and after: one page about closing the account, then a sheet offering Clean up your data or Delete your data and close this account, and the clean-up list',
            caption:
              'Delete, split in two. The old flow had one path: delete your data and close the account. The new one offers "Clean up your data" first: face scan, marketing, package tracking and third-party profile data, each saying what you lose.',
            ratio: '1620 / 1180',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/contextual.webp',
            alt: 'Shopping screens with a Personalize your experience link under offers, and a Shopping and Privacy card that opens a sheet explaining deals and notifications',
            caption:
              'Privacy where the question comes up. Offers carry a "Personalize your experience" link, and a Shopping and Privacy card explains why you see these deals: "We never sell it, and won\'t share it without your permission."',
            ratio: '1800 / 908',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/subnav.webp',
            alt: 'Web account settings before and after: a blue sub-navigation under a blue global nav, then a white sub-navigation with larger type and a current-page marker',
            caption:
              'Web settings. The old sub-navigation was blue on blue, and in baseline testing many people never saw it. The new one sits on white, with larger type and a clear current-page marker: up to 85% better on some tasks in unmoderated tests.',
            ratio: '1800 / 498',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-privacy/reminder.webp',
            alt: 'A proposed privacy reminder card, "You haven\'t accessed privacy settings in the past year", on the Data and privacy page and in Shopping',
            caption:
              'A proposal: once a year, a card on the privacy page and in Shopping asks whether your settings still suit you.',
            ratio: '1800 / 1060',
          },
        ],
      },
      // Folded in from the old `paypal-data-access` case, on request. That
      // case guessed the project was internal data access and was all
      // brackets; her files show it was customer data rights (GDPR data
      // access requests, and erasing part of your data). Sources: the
      // "Partial data delete" file's user story, entry points and edge
      // cases, and her APA-file screenshots (storyboard, the DSR process,
      // the erasure journey). Its persona and touch-point frames read as
      // pasted chat output and aren't used.
      {
        id: 'data-rights',
        nav: 'Your data rights',
        label: 'Your data rights',
        heading: 'Get a copy of your data, or delete part of it, without closing your account.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/paypal-privacy/data-rights-storyboard.webp',
            alt: 'A three-panel storyboard: Samantha worries about her online privacy, decides to request a copy of her data from PayPal, then chooses the type of data from a clear list',
            caption: 'The storyboard the data request flow was built around: someone worried about her privacy, who wants to see what PayPal holds and pick what to ask for.',
            ratio: '1635 / 480',
            wide: true,
          },
          {
            kind: 'rows',
            label: 'Every request passes through six steps',
            items: [
              { term: 'Intake', detail: 'The request comes in through the intake portal.' },
              { term: 'Verification', detail: 'PayPal confirms it\'s really the customer asking.' },
              { term: 'Validation', detail: 'The requester is a PayPal customer, or a guest account holder.' },
              { term: 'Eligibility', detail: 'The request meets the criteria.' },
              { term: 'Fulfilment', detail: 'The data is gathered, or erased.' },
              { term: 'Communication', detail: 'The customer hears the outcome.' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The customer gets status updates along the way, and a confirmation when it\'s done.',
              'Deletion had to work in parts. People asked to erase specific kinds of data, like face scan, marketing, package tracking and third-party profile data, and keep using their account. Regulation decides what PayPal must keep, so the flow says what will be deleted and what can\'t be.',
            ],
          },
          {
            kind: 'points',
            label: 'Cases the flow had to handle',
            items: [
              { title: 'Erasing only part', body: 'Delete marketing data, keep transaction history and the account.' },
              { title: 'A request left halfway', body: 'Someone starts and doesn\'t finish, and gets a reminder to complete it.' },
              { title: 'A second request', body: 'A new request arrives while the first is still processing.' },
              { title: 'What the law keeps', body: 'Data PayPal must retain is named, not silently left behind.' },
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'Launched in early 2023, now used by more than 80 million people.',
        blocks: [
          {
            kind: 'metrics',
            label: 'After launch',
            items: [
              { value: '60%', label: 'Fewer support calls about privacy settings' },
              { value: '76%', label: 'Faster data access time' },
              { value: '4.7/5', label: 'Average rating of the new settings, from 150 users' },
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'What I\'d keep, and what I\'d change.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'Bring engineering and the privacy officers in early',
                body: 'What a setting can promise depends on what the backend does and what regulation requires. Both are cheaper to learn before the design is set.',
              },
              {
                title: '[What I\'d do differently]',
                body: '[One honest point about the process or the release.]',
              },
            ],
          },
        ],
      },
    ],
    next: 'walmart-scan-go',
  },

  // ==========================================================
  // Written from the original 51-slide deck (Google Slides, "Scan & Go"),
  // read slide by slide, the same way as Chase Pay below. Every date, team
  // size, research figure, finding and pilot metric here is stated on a
  // slide; the screens are cropped from it (public/images/scan-go/). What
  // the deck does NOT say is who the other ten people on the team were, so
  // that row is bracketed. Two pilot metrics on the KPI slide are left off
  // the page because their labels are ambiguous ("6.9 member feedback",
  // "10% overall revenue") — confirm what they measure before adding them.
  // The deck's reviewer notes are feedback on the deck, not content, and
  // are not used.
  {
    slug: 'walmart-scan-go',
    company: 'Walmart Labs',
    theme: 'sage',
    eyebrow: 'Walmart Labs · Scan & Go · 2020–2021',
    title: 'Scan & Go, in-store',
    hero: {
      src: '/images/scan-go/hero.webp',
      alt: 'Six Scan & Go screens in sequence: scanning an item, scanning produce, the cart, pairing with self-checkout, weighing produce, and the price review',
    },
    description:
      'Walmart Scan & Go: scan items with the Walmart app as you shop, pay on your phone, and skip the checkout line. From research to the first store pilot in a year.',
    meta: [
      { label: 'Team', value: 'Team of 11' },
      { label: 'Research', value: 'Remote research, in-store prototype testing' },
      { label: 'Timeline', value: 'Feb 2020 – Feb 2021, first pilot launch' },
    ],
    role: 'Product designer · End-to-end flows',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Checkout was the slowest part of a Walmart trip, and in 2020 the queue became a health question.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'In February 2020 Walmart set out to make in-store shopping fast and contactless. The plan was a feature inside the Walmart app people already had, not a new app: scan barcodes as you shop, pay in the app with one touch, and show the receipt on your way out.',
              'Other retailers were already using the phone to make store trips easier, and Walmart had nothing competitive. COVID raised the stakes. Standing in a queue and handing over a card became something people actively wanted to avoid.',
            ],
          },
          {
            kind: 'metrics',
            label: 'What the research found',
            items: [
              { value: '80%', label: 'Of customers pay for in-store purchases by debit or credit card' },
              { value: '90%', label: 'Of shoppers actively avoid stores with long queues' },
              { value: '54%', label: 'Of members who come in to pick up an online order spend $100 more in store' },
            ],
          },
          {
            kind: 'points',
            label: 'The bet',
            items: [
              {
                title: 'Faster checkout, bigger baskets',
                body: 'A faster checkout would raise purchase frequency and basket size, and with them retention, measured before and after launch.',
              },
              {
                title: 'Card payers will pay by phone',
                body: 'With 80% of in-store purchases already on a card, paying on the phone while scanning is a small step.',
              },
              {
                title: 'Small baskets go first',
                body: 'Shoppers with a few items prefer an express exit to a long queue. That was already the lesson from Sam\'s Club.',
              },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Product designer on a team of eleven, from research to the pilot build.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'The end-to-end experience: entering Scan & Go from the Walmart app, scanning, the cart, paying, the exit pass, and every error state in between.',
              },
              {
                term: 'Research',
                detail:
                  'Two to three months of research with the research team, done remotely, then in-store prototype testing with new and returning shoppers.',
              },
              {
                term: 'Illustration and motion',
                detail:
                  'I drew the feature\'s illustrations and micro-interactions in the Walmart design system\'s palette and style, and added them to the design library.',
              },
              {
                term: 'The team',
                detail: '[Who the other ten were: PM, engineering, research. Confirm the roles.]',
              },
              {
                term: 'What the first launch could not do',
                detail:
                  'It ran in a small set of stores (about 15% leakage possible), on a crunched timeline. Shoppers couldn\'t build a basket before the trip or compare prices, and offers and deals were out of scope. The first launch was a launch-and-learn: its job was to show how people actually adopt it.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Testing showed the always-on scanner double-scanned. I kept it on and gave people a switch.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The prototype we tested scanned continuously: point the phone at a barcode and the item went into the cart. People found scanning intuitive and liked that a barcode read from any angle. They also scanned items twice by accident and didn\'t notice. The viewfinder felt slow, and they wanted clearer feedback that an item had been added.',
              'Turning continuous scanning off fixes the double scans and slows everyone down, the first-time shopper and the regular with a full cart alike. Speed was the reason the product existed, so I kept the scanner on and fixed the two things that made a double scan easy to miss.',
              'First, the scanner state became a visible toggle with an On/Off label, so people can stop it. Second, the screen split. The viewfinder sits on top, and the last item added, with its quantity stepper, sits under it beside the running total. A double scan shows up where it happened, as a quantity of 2, and one tap fixes it. Both changes were cheap to build.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/scan-go/scanner-before-after.webp',
            alt: 'Before and after: the tested scanner, a full-screen viewfinder, beside the revised scanner with a continuous-scanner toggle, the last item added and the subtotal',
            caption:
              'Left: the scanner in the study. Right: after it. A labelled toggle for continuous scanning, and the last item and total held on screen while you keep scanning.',
            ratio: '1340 / 750',
            wide: true,
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'Research set the guidelines, sketches set the journey, and the store tested both.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'Research on how people scan and manage a cart',
                body: 'Before any screen: pain points in the store, what shoppers are trying to get done, what they buy, and how they felt about self-checkout during COVID. The user goals were to save time, keep their distance, and stay on budget.',
              },
              {
                title: 'The journey, on the wall',
                body: 'The journey was sketched in three stages: getting in, finding and scanning items, and cart and checkout. Then I listed the edge cases each stage had to survive: an out-of-stock shelf tag, a dead battery, the network dropping, a mis-scan that triggers an audit.',
              },
              {
                title: 'Six guidelines before hi-fi',
                body: 'Fewer clicks. Clear affordances. Consistent with the rest of the Walmart app. Visual aids for quick recall. Accessible. Exceptions that help people recognise, diagnose and recover.',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/scan-go/journey.webp',
            alt: 'Sketched wireframes and sticky notes for three stages: entry experience, locating and scanning items, and cart and checkout',
            caption: 'The journey in three stages, sketched before anything went into a design tool.',
            ratio: '1800 / 739',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/scan-go/flow.webp',
            alt: 'Flow: scan items, Finish and Pay, scan the QR code at self-checkout, then either exit, or wait for a host to verify age or run an audit before exiting',
            caption:
              'The exit flow. Most trips pay and leave. Age-restricted items or an audit route through a self-checkout host, who is notified in advance.',
            ratio: '1800 / 754',
            wide: true,
          },
          {
            kind: 'prose',
            text: [
              'The in-store test ran on UserTesting.com with an InVision prototype. Tasks were written for real shopping: get into Scan & Go from the Walmart app, add bananas that need weighing, and find a 12-pack of Topo Chico. Then a prompt: your budget is $X, do you have enough left for another? That prompt tested whether the running total was doing its job.',
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Designed for one hand, a moving cart, and a store full of awkward items.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/scan-go/scan.webp',
            alt: 'The scanning screen, annotated: flash, help, "No barcode? Search here", the item-added card with a quantity stepper, and the running subtotal',
            caption:
              'The scanning screen. Flash for bad light, help one tap away, a typed fallback when a barcode won\'t read, and the cart under the viewfinder instead of on another screen.',
            ratio: '1320 / 1080',
          },
          {
            kind: 'points',
            items: [
              {
                title: 'Age-restricted items',
                body: 'Flagged on the item as it\'s scanned, "ID check required at checkout", and grouped with everything else. The check happens at the exit, and the shopper knows before they get there.',
              },
              {
                title: 'Produce sold by weight',
                body: 'Sits in its own "Pending items" group: final cost calculated by weight at checkout. The shopper weighs it at self-checkout and reviews the updated price before paying.',
              },
              {
                title: 'Protection plans and serial numbers',
                body: 'A protection plan is attached to its item: remove one and the other goes too. Serialised items get Remove instead of a quantity stepper, because two of the same serial number can\'t exist.',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/scan-go/mixed-scan.webp',
            alt: 'Four scanning screens for different item types: beer with an ID check, a serialised speaker, mustard with a quantity stepper, and bananas priced by weight',
            caption: 'One scanner, four kinds of item. Each card says what will happen at checkout.',
            ratio: '1390 / 730',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/scan-go/mixed-cart.webp',
            alt: 'The cart for a mixed basket, annotated: age-checked items, a protection plan, quantity steppers and a separate group for weighable produce',
            caption: 'The cart for a mixed basket. Weighable produce is separate so the estimated total stays honest.',
            ratio: '1440 / 1070',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/scan-go/errors.webp',
            alt: 'Error states: QR code not read, bags could not be added, items could not be verified, and produce that must be bought at the register',
            caption:
              'When the technology or the network fails, degrade gracefully. Every error says what happened and what to do next, and the worst case hands the trip to an associate at a register.',
            ratio: '1510 / 770',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/scan-go/illustrations.webp',
            alt: 'Illustrations drawn for Scan & Go: a shopper scanning, a cart, a self-checkout scale with bananas, and a phone showing a QR code at the register',
            caption: 'The illustrations I drew for the feature, in the design system\'s palette, added to the Walmart design library.',
            ratio: '1800 / 846',
            wide: true,
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'A pilot in stores within a year, with bigger baskets.',
        blocks: [
          {
            kind: 'metrics',
            label: 'Pilot, recorded 17 March 2021',
            items: [
              { value: '25%', label: 'Increase in basket size' },
              { value: '15 min', label: 'Average checkout time, reduced by 30 minutes' },
              { value: '757', label: 'New customers' },
            ],
          },
          {
            kind: 'quote',
            text: 'I shopped at Walmart using the Scan & Go feature on its mobile app, and I didn\'t have to interact with a single person in the store.',
            cite: 'A shopper, 25 February 2021',
          },
          {
            kind: 'points',
            label: 'What came next',
            items: [
              {
                title: 'Every store',
                body: 'Scan-and-go purchasing at every physical store, which brings theft prevention and fraud into the design rather than the policy.',
              },
              {
                title: 'Edge cases as features',
                body: 'Low battery and lost or poor connection, designed for directly instead of caught by a generic error.',
              },
              {
                title: 'No barcode needed',
                body: 'Computer vision to recognise a product without its barcode, and to cut the time the app takes to identify it.',
              },
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'What the pilot taught me.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'The rollout is part of the design',
                body: 'Communication was the most overlooked part of the launch: to customers, and to the associates on the floor. An associate who sees a queue forming and points people to Scan & Go does more for adoption than any screen.',
              },
              {
                title: 'The associate is a user',
                body: 'Hosts verify ages, run audits and rescue failed trips. Their experience belongs among the key metrics, not just the shopper\'s.',
              },
              {
                title: 'Edge cases are the product',
                body: 'In a store, a mis-scan, a weighable item or a dropped connection is normal. Designing those paths early is what made the happy path trustworthy.',
              },
            ],
          },
        ],
      },
    ],
    next: 'walmart-chase-pay',
  },

  // ==========================================================
  // Written from the original 25-slide deck (Google Slides, "Walmart pay
  // Integration"), read slide by slide. Every date, headcount and finding
  // below is stated on a slide — this is the one case on the site whose
  // research and process are fully sourced. What the deck does NOT contain
  // is post-launch performance, so the business metrics are still bracketed.
  {
    slug: 'walmart-chase-pay',
    company: 'Walmart Labs',
    theme: 'bone',
    eyebrow: 'Walmart Labs · Walmart Pay × Chase Pay · 2019–2020',
    title: 'Chase Pay inside Walmart Pay',
    hero: {
      src: '/images/chase-pay/hero.png',
      alt: 'The Chase Pay linking screen inside Walmart Pay, beside a Chase card',
    },
    description:
      'Walmart Pay: adding Chase Pay to the wallet after Savings Catcher retired. A partner integration that arrived as a finished formula, taken to a store test that broke it.',
    meta: [
      { label: 'Team', value: '1 design manager, 1 researcher, 1 PM, 10+ engineers' },
      { label: 'Partners', value: '5 stakeholders, JPMorgan Chase' },
      { label: 'Timeline', value: 'June 2019 – April 2020' },
    ],
    role: 'Product designer, Walmart Pay',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Savings Catcher retired on 14 May 2019, and Walmart Pay went with it.',
        blocks: [
          {
            kind: 'prose',
            text: [
              '"Save Money. Live Better." is Walmart\'s slogan, and Savings Catcher was the literal version of it: scan a receipt, and if a competitor advertised the item cheaper, get the difference back. It was also the reason a lot of people opened the Walmart app at the register at all. It was discontinued on 14 May 2019.',
              'Walmart Pay lost the habit that had been carrying it. Without the price-matching payoff, paying in-app was slower than pulling out a card and offered nothing in return — so people stopped. Chase Pay was the answer on the table: a card issuer\'s own rewards, redeemable inside a wallet the customer had already set up, with no second app to learn.',
            ],
          },
          {
            kind: 'quote',
            text: 'The discontinuation of Savings Catcher caused a major decline in Walmart Pay\'s adoption and continued use.',
          },
          {
            kind: 'points',
            label: 'What the work had to do',
            items: [
              {
                title: 'Give people more ways to save',
                body: 'Chase Ultimate Rewards points, redeemable as a statement credit at a Walmart register — a reason to reach for the app instead of the card.',
              },
              {
                title: 'Keep it convenient',
                body: 'The saving had to arrive without adding a second wallet to set up or a second thing to think about at the till.',
              },
              {
                title: 'Move adoption and retention',
                body: 'Not just first-time linking. The measure was whether people kept paying with Walmart Pay after the novelty.',
              },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'The product designer on Walmart Pay, negotiating across two companies.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'The Chase Pay integration end to end, from June 2019 to April 2020 — the entry points, the value proposition wherever it appeared, the linking flow and its redirect out to Chase, the settings surface, and pay-with-points at the register. I was the only designer on it.',
              },
              {
                term: 'The team',
                detail:
                  'Inside Walmart Pay: 1 design manager, 1 user researcher, 1 product manager and 10+ engineers. The researcher ran recruiting and the study script; the design manager ran critique. The design work was mine.',
              },
              {
                term: 'Across the table',
                detail:
                  '5 stakeholders at JPMorgan Chase. Every screen carrying Chase brand, Chase card data or Chase rewards language went through them, and I worked with them on legal review during the design, not after it.',
              },
              {
                term: 'How the work was judged',
                detail:
                  'Walmart Pay adoption and retention, and whether it shipped on both platforms. It launched in the Walmart iOS app on 27 February 2020 and on Android on 4 June 2020.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'The integration arrived as a finished formula. I took it to a store floor anyway.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'By the June 2019 kickoff, Chase had already shipped this integration several times over — with PayPal, with Samsung Pay, with merchants including Starbucks. There was a pattern, it worked, and it came with a partner who had every reason to want it applied as-is.',
              'That is genuinely good news and genuinely bad news. I did not have to start from a blank page. But the design was nearly a ready-to-go formula, which left very little room for exploration — and a formula proven inside other companies\' apps is not the same as a formula proven inside ours, next to a Walmart register, for a customer who has never heard of Chase Pay.',
              'So instead of applying it, I spent seven weeks on iterations, critiques and prototyping, and we put it in front of twelve real Walmart-and-Chase customers in a store in Dallas. The study broke the formula in two places, both of which would have shipped invisibly.',
            ],
          },
          {
            kind: 'points',
            label: 'What the store test found',
            items: [
              {
                title: 'The benefit was invisible',
                body: 'It was not evident that Chase Pay would save anyone time. Every participant had a Chase login, but most had never used Chase Pay — so they assumed linking it meant extra work somewhere outside the Walmart Pay setup they were already doing.',
              },
              {
                title: 'Linking all cards read as a risk',
                body: 'Participants could not tell the difference between adding a regular credit or debit card and linking Chase Pay. Pulling in every card at once felt convenient and alarming at the same time: they worried about spending a card, or rewards, they had not intended to.',
              },
            ],
          },
          {
            kind: 'quote',
            text: 'In a household with shared account access, one wrong charge could be disastrous — and they would never use Walmart Pay again.',
          },
          {
            kind: 'prose',
            text: [
              'That second finding is the one that justified the whole detour. A convenience feature was reading as a way to lose control of your money, and the fix was cheap once we knew — but nothing in a ready-to-go formula was going to surface it.',
            ],
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'Seven weeks of iteration in two offices, then a week on a store floor in a third.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'Design and recruiting ran in parallel',
                body: 'Six weeks of design sprints and mockups in Sketch, then a week prototyping in Adobe XD. While that ran, the researcher spent two weeks recruiting participants and a week on pilot testing and the study script — so the prototype and the study were ready in the same fortnight rather than in sequence.',
              },
              {
                title: 'Legal review inside the design, not after it',
                body: 'I worked with the Chase partners on legal review during the seven weeks. On a two-company integration the rewards language and the data-handling claims are design material — finding out in month three which sentences are allowed means redrawing the screens they sit on.',
              },
              {
                title: 'Tested where the product actually lives',
                body: 'A week of in-store testing in Dallas: twelve Walmart and Chase customers, 60-minute one-on-one interviews, six on iOS and six on Android. The script deliberately went wider than the feature — their history of shopping at Walmart, and how they already used credit cards and digital payments — before touching the prototype.',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/chase-pay/study.png',
            alt: 'Study methodology: a researcher in Seattle, a design manager in San Bruno, a product designer, and in-store testing in Dallas with 12 participants',
            caption:
              'The study, laid out. Three cities, four roles, and twelve customers — the whole reason the ready-made pattern did not ship unexamined.',
            wide: true,
          },
          {
            kind: 'prose',
            text: [
              'The study asked two questions and nothing else: can customers actually link Chase Pay to Walmart Pay and pay with points, and do they understand what linking it gets them. The second one is where it fell down.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/chase-pay/flow.png',
            alt: 'The Chase Pay integration user flow for new Walmart Pay customers, with Walmart screens in white and new Chase screens in blue',
            caption:
              'The integration flow for a new Walmart Pay customer. White is Walmart, blue is Chase — including the fallback path for when the Chase Pay app is not on the phone and authentication has to happen in a mobile browser.',
            wide: true,
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Three moves, all of them cheap to build.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The constraint on the fixes was the same one that had shaped the project: this was a partner integration late in its life, not a rebuild. So I worked in three registers that cost engineering almost nothing — adding visuals, changing the content layout, and choosing the words deliberately. Low technical effort, faster to scan, and they moved the things the study said were broken.',
              'The other constant was that Chase Pay had to weave in and stand out at the same time. It belongs in the pack of payment options, or it reads as a separate product to learn. It also has to be distinguishable from a normal card during setup and every time you use it, or you get the security problem the study surfaced.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/chase-pay/entry.png',
            alt: 'Before and after designs of the Chase Pay entry point and its value proposition in the Walmart Pay setup flow',
            caption:
              'The entry point and value proposition. Left is what went into the study; right is after it — the benefits restated around security and effort, with "just sign in once with Chase" answering the assumption that linking meant extra work elsewhere.',
            wide: true,
          },
          {
            kind: 'points',
            items: [
              {
                title: 'Chase Pay gets its own group',
                body: 'In settings, linked Chase cards sit in a separate group from credit and debit cards, under a line explaining that a secure token authorises payment and the sensitive data never leaves Chase. Participants had not been able to tell the two apart; separating them is what makes "I linked an account" different from "I added a card."',
              },
              {
                title: 'Say where the data actually lives',
                body: 'The security claim is specific rather than reassuring in general — your sensitive data never leaves Chase, your linked cards stay up to date. The study was clear that perceived security problems kill a payment feature just as dead as real ones.',
              },
              {
                title: 'Points off by default, in both currencies',
                body: 'The rewards toggle ships Off. Participants had accrued those points carefully and wanted to choose the moment to spend them, and the On/Off label next to the toggle makes the current state readable at a glance. The balance shows as both points and dollars — 1,232 points ($10.56) — because the conversion is not one-to-one and nobody should be doing that arithmetic at a register.',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/chase-pay/settings.png',
            alt: 'Before and after designs of Chase Pay inside Walmart Pay settings, showing the separate Chase Pay group added after the study',
            caption:
              'Settings, before and after the study. The right-hand version pulls the Chase cards out into their own group with the security explanation attached.',
            wide: true,
          },
          {
            kind: 'prose',
            text: [
              'The last one is the smallest and my favourite. Participants liked being warned before the app redirected them out to Chase — it made linking two systems feel deliberate rather than like something slipping out of their hands. But the alert only said they were leaving Walmart. It never said they were coming back.',
              'So after a lot of iterations the copy gained "briefly" and "shortly", and the passive voice went active: not "you will be redirected", but we will direct you to Chase and return you here. Same alert, same engineering, and it now reads as Walmart taking care of you rather than Walmart handing you off.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/chase-pay/points.png',
            alt: 'Pay-with-points designs across Walmart Pay settings and the register QR scanner, with the rewards toggle off and on',
            caption:
              'Pay with points, from settings through to the scanner at the register. The state of the toggle is repeated on the paying screen, so the answer to "am I about to spend my points" is visible at the moment it matters.',
            wide: true,
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'Shipped on both platforms, three months apart.',
        blocks: [
          {
            kind: 'metrics',
            label: 'Shipped',
            items: [
              { value: '27 Feb 2020', label: 'Launched in the Walmart iOS app' },
              { value: '4 Jun 2020', label: 'Launched in the Walmart Android app' },
              { value: '[X]%', label: 'Change in Walmart Pay adoption after launch' },
            ],
          },
          {
            kind: 'metrics',
            label: 'Research and process',
            items: [
              { value: '12', label: 'Walmart and Chase customers, 60-minute sessions in-store' },
              { value: '7 wks', label: 'Iteration, critique and prototyping before the study' },
              { value: '5', label: 'JPMorgan Chase stakeholders worked with directly' },
            ],
          },
          {
            kind: 'points',
            label: 'What the study settled, beyond this feature',
            items: [
              {
                title: 'Security, security, security',
                body: 'People want their money safely spent, and they read safety off the interface. Real and perceived security problems are a deal-killer at any stage of a payment flow — which means the reassurance is product work, not copy applied at the end.',
              },
              {
                title: 'Another way to pay is not a benefit',
                body: 'Merely adding a payment option does not move adoption. Customers need a benefit big enough to be worth changing a habit at a register, and saving time and effort is where that starts.',
              },
              {
                title: 'Money, time, effort, security',
                body: 'Everything the study surfaced, good or bad, came back to one of those four. Monetary incentive is what triggers action; the other three are what stop it.',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The deck this case is drawn from ends at launch, so the post-launch adoption numbers are still to be filled in.',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'Two things I found late that were findable early.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'I let the value proposition assume familiarity',
                body: 'Every participant had a Chase login and almost none had used Chase Pay. That was knowable before the study — it is a fact about the customer base, not a finding — and the first design still leaned on the Chase brand carrying its own meaning. Naming the actual benefit at every entry point should have been the starting position, not the correction.',
              },
              {
                title: 'I fixed the reassurance, then had to go back for the timing',
                body: 'The redirect alert made people feel safer, and I took the positive signal at face value for too long. It was only after many iterations that I noticed it never promised the trip to Chase was momentary. Reading the alert against the anxiety it was supposed to answer, rather than against whether people liked it, would have caught that in one pass.',
              },
              {
                title: '[The third thing]',
                body: '[The two above are drawn from the deck. If there is something you would change about the shape of the project itself — taking the ready-made pattern to research earlier, or pushing harder on what Chase would allow — that is the one an interviewer will find most interesting.]',
              },
            ],
          },
        ],
      },
    ],
    next: 'okta-oin',
  },

  // ==========================================================
  // The flagship case. Not a UI redesign — a platform/framework story:
  // one extensible submission framework behind the Okta Integration
  // Network instead of one bespoke review flow per integration category.
  // Distinct from 'okta-iam' above (the enterprise admin-console rebuild);
  // both are Okta, different scope, different team. Numbers are bracketed
  // for the same reason as every other case here — they come from
  // Anupama, not invented. Diagrams live in /public/images/okta-oin/,
  // hand-authored SVGs in the site's own palette rather than a Mermaid
  // dependency — see the comment on CaseBlock above for why the block
  // set stays at six kinds.
  // ==========================================================
  {
    slug: 'okta-oin',
    company: 'Okta',
    theme: 'ink',
    eyebrow: 'Okta · Integration Platform + Developer Ecosystem · [20XX–20XX]',
    title: "Designing the future of Okta's Integration Platform",
    hero: {
      // From her old portfolio's Okta page — Auth0 onboarding, the closest
      // image she has published to integrations; not the OIN framework itself.
      src: '/images/okta/integrations.webp',
      alt: 'Auth0 onboarding screens: Applications, Organizations and Single Sign On Integrations',
    },
    description:
      'Okta Integration Network: replacing a bespoke, one-off review process with a single extensible framework for how ISVs build, submit and publish integrations — one manifest schema, one shared UI kit and one validation engine behind every category.',
    meta: [
      { label: 'Team', value: '[X] designers, [X] engineers, 1 PM' },
      { label: 'Partners', value: 'Partner engineering, developer relations, security review' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: 'Staff Product Designer, Integration Platform + Developer Ecosystem',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Every new integration category meant building the submission flow again, by hand.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The Okta Integration Network is the catalog of third-party apps and services that plug into Okta — single sign-on, provisioning, workflow automation — and OIN submission is how an ISV gets an integration listed as supported. Getting into that catalog ran through a handful of engineers reading each submission by hand: checking a manifest against a spec that lived in three different documents, testing the integration in a sandbox, then emailing the ISV back with what to fix.',
              'That worked when submissions were rare and reviewed by someone who had written the spec themselves. It stopped working as the catalog grew and the categories multiplied — SSO looked nothing like SCIM provisioning, which looked nothing like a workflow connector, and every category had picked up its own ad hoc review process, its own inconsistent error messages, and its own tribal knowledge about what actually passed.',
              'The cost showed up on both sides of the review. ISVs were resubmitting the same integration [X] times on average before something passed, most of it for problems a machine could have caught in seconds. The review team was the bottleneck for every category at once, which meant a growing catalog was making the thing meant to scale it slower, not faster.',
            ],
          },
          {
            kind: 'points',
            label: 'What was at stake',
            items: [
              {
                title: 'A stalled catalog',
                body: 'Every quarter the submission backlog grew faster than review capacity, and a thinner catalog is a weaker story against every other identity platform courting the same partners.',
              },
              {
                title: 'ISV goodwill',
                body: 'A partner with real engineering resources elsewhere would try Okta once, hit an opaque rejection, and quietly deprioritize the integration.',
              },
              {
                title: 'A team stretched flat',
                body: 'Four categories were each maintaining their own submission tooling, so every improvement had to be built four times or not at all.',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The problem statement I carried into the work: OIN needed one framework that could take on a new integration category without a new team building its own submission flow from scratch — not a better version of the existing review queue.',
            ],
          },
          {
            kind: 'points',
            label: 'Goals',
            items: [
              {
                title: 'Cut the round trips',
                body: 'Most resubmissions were for mechanically checkable problems. Catch those before a human ever opens the submission.',
              },
              {
                title: 'Make it self-service',
                body: 'An ISV should be able to tell, without asking anyone, whether their manifest is valid and where their submission stands.',
              },
              {
                title: 'Build it once, extend it forever',
                body: 'The framework had to onboard a category Okta hadn’t invented yet without a new design or engineering build.',
              },
              {
                title: 'Keep the judgment calls human',
                body: 'Security and trust review is not a rule engine. Automating the mechanical checks had to free that time, not remove it.',
              },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: "I owned the framework's model; four category teams owned what they built on it.",
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'The framework’s information model — what a manifest is, how a submission moves through states, what "valid" means before a human ever looks at it — plus the shared component set every category’s submission flow is built from, and the case for funding it as a platform investment rather than a queue-management fix.',
              },
              {
                term: 'What I delegated',
                detail:
                  'Each integration category (SSO, provisioning, workflow, and the newest, event hooks) had its own category-specific fields and validation rules, owned by that category’s design and engineering pair. I reviewed only where a category’s needs would have forced a change to the shared model.',
              },
              {
                term: 'The team',
                detail:
                  '[X] designers — one on the framework and shared components, one embedded with partner engineering on the manifest schema, one on the developer portal’s documentation and onboarding — plus [X] engineers and one PM.',
              },
              {
                term: 'Who I reported to',
                detail:
                  'The Director of Design for Developer Experience, with a standing weekly alongside the partner engineering lead who owned the review pipeline’s backend.',
              },
              {
                term: 'How I was measured',
                detail:
                  'Submissions resolved without a human touching them, time from first submission to published, and whether a new integration category could launch on the framework without a design or engineering rebuild.',
              },
            ],
          },
          {
            kind: 'points',
            label: 'Stakeholders',
            items: [
              {
                title: 'Partner engineering',
                body: 'Owned the validation engine and the review pipeline’s backend. The manifest schema was a joint document — neither of us could change it unilaterally once ISVs were building against it.',
              },
              {
                title: 'Developer relations',
                body: 'Owned the public docs and the direct relationship with ISVs — my clearest signal for what was actually confusing developers, ahead of any usability session.',
              },
              {
                title: 'Security & trust review',
                body: 'The team whose judgment the automated checks existed to protect, not replace. I brought them into the model work early so "what can safely be automated" was their call, not mine.',
              },
              {
                title: 'ISV partners',
                body: 'Not in the building, but in every round of validation — real manifests from partner ISVs across all four categories tested the framework before it shipped.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'I argued for one extensible framework over four faster category fixes.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The fast option was in front of us: each category team fixes its own worst friction points independently. SSO ships better error messages, provisioning ships a status tracker, and everyone ships something in a quarter instead of nothing for two.',
              'I argued against it, because that path was the one that had produced the problem in the first place — four teams solving the same underlying issue four different ways, with four different vocabularies for the same concepts. A faster version of that is still four things to maintain, and the fifth category still starts from zero.',
              'The alternative was slower and riskier: one manifest schema, one validation engine, and one shared UI kit that every category’s submission flow is built from, with category-specific rules layered on top rather than the whole flow rebuilt underneath. That meant no category team shipped anything in the first quarter — the framework had to exist before anyone’s friction actually improved, which is a hard thing to defend in a review with four impatient teams watching each other wait.',
            ],
          },
          {
            kind: 'points',
            label: 'Technical constraints',
            items: [
              {
                title: 'No enforced schema to start from',
                body: 'The "manifest spec" that existed was three overlapping documents, none machine-readable. The framework couldn’t validate anything until partner engineering and I agreed on one schema that was actually a contract, not a description.',
              },
              {
                title: 'Live ISVs mid-submission',
                body: 'Submissions already in flight when a category cut over couldn’t be silently invalidated — the framework had to accept both the old and new manifest shapes for a transition window.',
              },
              {
                title: 'Review capacity, not headcount',
                body: 'We couldn’t add reviewers. Whatever the framework didn’t catch automatically stayed exactly as slow as it already was.',
              },
            ],
          },
          {
            kind: 'points',
            label: 'Trade-offs',
            items: [
              {
                title: 'Generality over a perfect first category',
                body: 'SSO’s flow is less tailored to SSO specifically than it could be if built for SSO alone — the cost of keeping the model honest for provisioning and workflow, which came later.',
              },
              {
                title: 'A schema strict enough to validate, loose enough to extend',
                body: 'A stricter schema catches more automatically; a looser one lets a category we haven’t invented yet fit without a schema change. We erred toward extensible and left some checks a category team wanted as manual for the first release.',
              },
            ],
          },
          {
            kind: 'quote',
            text: 'A framework that only works for the category you designed it against is a rebuild waiting for the next one, wearing a different name.',
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'An audit, a journey map, and a blueprint before a single shared component got drawn.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'We started by mapping what already existed rather than what should exist. The existing-experience audit walked every category’s submission flow, every review-team runbook, and every rejection-email template we could find, and it surfaced the same finding from three directions: nothing about the process was visible to the person waiting on it. An ISV who submitted a manifest had no way to know if it was in a queue, being reviewed, or stuck on a question nobody had asked them yet.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/okta-oin/developer-journey.svg',
            alt: 'Developer journey map from discovering OIN through submission, review and publishing, with friction points marked at the manifest spec and the fix-and-resubmit stage',
            caption:
              'The journey, mapped end to end. The two friction points — reading the spec, and the fix-and-resubmit loop — accounted for most of the time between an ISV’s first interest and a published listing.',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/okta-oin/service-blueprint.svg',
            alt: 'Service blueprint of the OIN submission journey across developer actions, the portal frontstage, backstage review systems and Okta support teams',
            caption:
              'The same journey as a service blueprint. Laying frontstage against backstage is what made the case for the framework legible to engineering — the highlighted backstage cells had never had a system behind them, only a person.',
            wide: true,
          },
          {
            kind: 'points',
            label: 'Design principles',
            items: [
              {
                title: 'State is not optional',
                body: 'Every submission has a visible status, everywhere it appears — console, manifest editor, docs. If an ISV has to ask what’s happening, that’s a defect in the surface, not a support ticket.',
              },
              {
                title: 'Fail at the field, not at the end',
                body: 'Validation runs against the manifest as it’s written, not as a rejection after a full review cycle. An error names the field and the fix, not just the rule that broke.',
              },
              {
                title: 'One schema, no synonyms',
                body: 'A concept has one name across every category’s docs, error copy and UI. The old system had three names for a redirect URI depending on which category’s docs you read.',
              },
            ],
          },
          {
            kind: 'points',
            label: 'Engineering collaboration',
            items: [
              {
                title: 'The schema was reviewed like code',
                body: 'Manifest schema changes went through the same pull-request review as the validation engine, with partner engineering and me as required reviewers on both sides — reviewing a schema change as only an engineering decision was how the old spec drifted into three documents in the first place.',
              },
              {
                title: 'Error copy was written with the rule, not after it',
                body: 'I sat with the engineers writing validation rules so the message a rule produced was drafted alongside the rule itself, not bolted on once a category team complained the existing one was unreadable.',
              },
              {
                title: 'Every category tested against real ISV manifests before launch',
                body: 'We ran actual submissions from partner ISVs through the framework in staging before any category cut over, rather than testing against manifests we’d written ourselves to pass.',
              },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The framework, the components it’s built from, and the portal an ISV actually uses.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The craft here is mostly structural — an information architecture and a component set an ISV moves through, not a single hero screen. What follows is what an ISV actually touches, from the manifest to the published listing.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/okta-oin/framework-architecture.svg',
            alt: 'Framework architecture diagram: a central submission framework connecting a manifest schema, validation engine, shared UI kit, review console, publishing pipeline and partner portal, between ISV codebases and Okta platform services',
            caption:
              'The framework sits between an ISV’s codebase and Okta’s platform services. One manifest schema and one validation engine behind every category, rather than a schema and an engine per category.',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/okta-oin/ia-map.svg',
            alt: 'Information architecture of the OIN developer portal: the portal root branching into documentation, submission console, manifest editor, review status, component library and partner directory',
            caption:
              'The developer portal’s information architecture. Manifest Editor and Review Status didn’t exist as their own surfaces before this — they were email threads and a spreadsheet.',
            ratio: '1450 / 900',
          },
          {
            kind: 'points',
            label: 'Reusable components',
            items: [
              {
                title: 'Manifest editor',
                body: 'Validates against the schema as the ISV types, with inline errors at the field. It replaced a text upload that failed silently until a human read it.',
              },
              {
                title: 'Status timeline',
                body: 'One component, shared across the console and the docs, rendering wherever a submission’s state needs to show — the same component the review team’s internal tools use, so what the ISV sees and what’s actually true can’t drift apart.',
              },
              {
                title: 'Category field sets',
                body: 'The piece that lets a new integration category plug in its own fields and validation rules without touching the shared schema or the editor itself — what made "extensible" a real property rather than a claim.',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/placeholder-6.svg',
            alt: 'The submission console showing manifest validation status and a review timeline',
            caption: 'The submission console. Placeholder — real screens pending clearance.',
          },
          {
            kind: 'prose',
            text: [
              'Every shared component meets WCAG 2.1 AA on its own — keyboard-operable end to end, validation errors announced to assistive tech at the field rather than only summarized at the top of the form, and focus management that survives an inline error appearing without a page reload. An ISV’s own engineering team includes people who rely on this, and a submission tool that fails for them is a partner Okta loses before the first review.',
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'What changed, and how we knew.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'We validated in two passes: structured usability sessions with ISV engineers working through real manifests before launch, then instrumentation on the shipped framework once the first two categories had cut over, so the before/after wasn’t only what the audit had found.',
            ],
          },
          {
            kind: 'metrics',
            label: 'Business',
            items: [
              { value: '[X]%', label: 'Submissions resolved without a human review, first pass' },
              { value: '[X]%', label: 'Time from first submission to published, down from [X]' },
              { value: '2 of 4', label: 'Integration categories on the framework at launch; the rest followed without a rebuild' },
            ],
          },
          {
            kind: 'metrics',
            label: 'Team and craft',
            items: [
              { value: '[X]', label: 'Shared components adopted across every category' },
              { value: '[X]', label: 'ISVs whose real manifests validated the framework before launch' },
              { value: 'AA', label: 'WCAG 2.1 conformance across the shared component set' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The number I’d point to first is "2 of 4, and the rest followed without a rebuild." That was the actual bet — not that the first category would be smoother, but that the third and fourth would cost nothing extra to onboard.',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'Two places I moved slower than the work needed.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'I under-invested in the schema’s documentation',
                body: 'The schema was reviewed as carefully as code, but I treated explaining it to ISVs as a developer-relations problem instead of a design one. The manifest editor’s inline validation covered for that gap more than it should have had to — a developer reading the docs cold still hit the same confusion the audit had already found once.',
              },
              {
                title: 'I let "extensible" stay abstract for too long',
                body: 'The argument for a general framework is easiest to make with a second category already running on it, and I made the case before we had one — on the strength of the audit and the architecture alone. It was the right call in the end, but I spent more of the review cycle defending an abstraction than I would have if I’d pushed to stand up a rough second category earlier, even an ugly one, just to make the claim concrete.',
              },
            ],
          },
        ],
      },
    ],
    next: 'paypal-debit-card',
  },

  // ==========================================================
  // Written from her Figma Slides deck "PayPal Debit Card" (read slide by
  // slide, Oct 2026). It replaces the old `paypal-unified-card-system`
  // skeleton, which held only bracket placeholders. Everything stated here
  // is on a slide or visible in a screen: the problem, the 68% → 40%
  // abandonment goal, the user challenges, PayPal's five-pillar strategy,
  // the compliance constraints (they're printed in the flow files and on
  // the screens), and the four impact numbers.
  //
  // Still bracketed, waiting on her: the end date, who else designed what,
  // the hard call, and whether abandonment actually reached 40%. The deck
  // never reports that number, and it's the first thing a reviewer will ask.
  // Keep the four impact figures only if each has a source and a period.
  //
  // The work comes first, on request: the two prototypes and the screens
  // lead, and the situation, scope and constraints follow. It's the one
  // case that breaks the situation-first order in the header above.
  //
  // Screens are cropped from a half-resolution render of the deck
  // (public/images/paypal-debit/). Re-export each at 2× from Figma under
  // the same file names. A colleague published a case study on the card
  // servicing work (lock card, copy card number, settings), so keep every
  // screen here to what she designed herself.
  // ==========================================================
  {
    slug: 'paypal-debit-card',
    company: 'PayPal',
    theme: 'clay',
    eyebrow: 'PayPal · Debit Card enrollment & rewards · 2022–[20XX]',
    title: 'A debit card people finish signing up for',
    hero: {
      src: '/images/paypal-debit/hero.webp',
      alt: 'PayPal Debit Card screens in the PayPal app: the Finances hub, the card details page, and the cash back offers hub',
    },
    description:
      'PayPal Debit Card: rebuilding card enrollment inside the PayPal app around identity checks and fee disclosure, and adding cash back offers, so more people finish signing up and start using the card the same day.',
    meta: [
      { label: 'Surface', value: 'PayPal mobile app: enrollment, card home, rewards, notifications' },
      { label: 'Partners', value: '[Product, engineering, compliance / legal, research]' },
      { label: 'Timeline', value: 'Flows dated Apr–Jun 2022 · shipped [date]' },
    ],
    role: 'UX team lead · Strategy, design direction and the core flows',
    sections: [
      {
        id: 'craft',
        nav: 'The work',
        label: 'The work',
        heading: 'Sign up, use it today, then a reason to keep using it.',
        blocks: [
          {
            kind: 'prototype',
            name: 'paypal-enroll',
            caption: 'Enrollment, rebuilt from the flow files so you can go through it. Tick “Identity already verified” to see the branch for people PayPal has already checked.',
          },
          {
            kind: 'figure',
            src: '/images/paypal-debit/enroll.webp',
            alt: 'Five enrollment screens: account setup with the fee list, identity confirmation, identity confirmed, choose a shipping address, and setting up the new card',
            caption: 'The same flow at a glance. Saved addresses are offered as choices instead of a blank form, and identity confirmation shows its result before moving on.',
            wide: true,
            ratio: '720 / 347',
          },
          {
            kind: 'figure',
            src: '/images/paypal-debit/pin.webp',
            alt: 'Three screens: a prompt asking “Want to shop with your debit card today?”, a create-PIN screen, and the card page with the digital card number shown in a sheet',
            caption: 'The physical card takes days to arrive. Setting a PIN gives you a digital card to use in Google Pay straight away, the day you sign up.',
            ratio: '600 / 350',
          },
          {
            kind: 'figure',
            src: '/images/paypal-debit/card-details.webp',
            alt: 'The card details page, annotated: available balance on the card, card details behind an eye icon, a carousel of card features, and Activity and Manage tabs',
            caption: 'The card’s home. The balance is on the card itself, and a carousel suggests the next useful step: cash back, Google Pay, direct deposit, adding money.',
            ratio: '720 / 480',
          },
          {
            kind: 'prototype',
            name: 'paypal-offers',
            caption: 'Cash back offers, rebuilt from the flow files. Activate or deactivate an offer, then use the buttons beside the phone to make a purchase or let an offer run out, and see the notifications that follow.',
          },          {
            kind: 'figure',
            src: '/images/paypal-debit/rewards.webp',
            alt: 'Three screens: the card page, the Cash Back Offers hub with Target, Walmart, Starbucks and Sephora offers, and an offer’s details in a half sheet with an Activate button',
            caption: 'Rewards. Each offer opens in a half sheet with its terms (minimum spend, cap, days left) before you activate it.',
            ratio: '600 / 350',
          },
          {
            kind: 'figure',
            src: '/images/paypal-debit/offers.webp',
            alt: 'Three screens: activated offers on the card page, an “Expiring soon” section in the offers hub, and a cash back earned total',
            caption: 'After you activate: active offers move to the card page, offers close to their end date go under “Expiring soon”, and money earned shows as a running total.',
            ratio: '600 / 350',
          },
          {
            kind: 'figure',
            src: '/images/paypal-debit/notifications.webp',
            alt: 'An email confirming an activated cash back offer, a lock-screen push when an offer expires, and a push when cash back is earned',
            caption: 'Outside the app: an email when you activate an offer, and a push when it expires or pays out.',
            ratio: '610 / 415',
          },
          {
            kind: 'prose',
            text: ['[Error and edge states: identity check fails, the ITIN path, an address that can’t be verified, PINs that don’t match, no offers yet, an expired offer. Add the screens you designed from the full flow files.]'],
          },
        ],
      },
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: '68% of people who started applying for the card gave up.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The PayPal Cash Card is a debit card that spends your PayPal balance. Signing up for it was slow and complicated, and the card had no rewards at a time when competing debit cards were selling on cash back.',
            ],
          },
          {
            kind: 'points',
            label: 'What people were asking',
            items: [
              { title: '“Do I have to load cash onto it?”', body: 'The name “Cash Card” suggested a prepaid card you top up, not a card that spends the balance you already have.' },
              { title: '“What does it pull money from?”', body: 'People couldn’t tell whether it was tied to their PayPal balance, their bank or another card.' },
              { title: '“Why this card and not another?”', body: 'Competing cards offered cash back and savings. This one offered neither.' },
              { title: '“Can I use it before it arrives?”', body: 'For people who wanted a virtual card, there was no clear way to add it to a digital wallet.' },
            ],
          },
          {
            kind: 'metrics',
            label: 'The goal',
            items: [
              { value: '68% → 40%', label: 'Target cut in enrollment abandonment' },
              { value: '1 flow', label: 'Enroll in several cash back offers without leaving the card' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'I led the design team and set the direction for enrollment and rewards.',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: 'Product strategy, ideation and design direction for the new card experience, and the stakeholder reviews that got it built. [Name the flows you designed hands-on.]' },
              { term: 'The surface', detail: 'Enrollment, the card’s home in the Finances hub, card details, adding money, the cash back offers hub, and the emails and push notifications that follow an offer.' },
              { term: 'Who I worked with', detail: '[Product, engineering, compliance / legal, the issuing bank, research, and who on the design team owned what.]' },
              { term: 'How it was measured', detail: 'Enrollment abandonment first, then application time, same-day activation, support calls and NPS.' },
            ],
          },
          {
            kind: 'points',
            label: 'The strategy we worked to (PayPal’s five pillars)',
            items: [
              { title: 'Lead with cash back', body: 'Wherever possible. It was the clearest difference from other debit cards.' },
              { title: 'Say what funds it', body: 'Make it obvious the card spends your PayPal balance, in stores and online.' },
              { title: 'Simple and in context', body: 'Show each step, offer and prompt where the person already is in the app.' },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: '[The tradeoff, stated as a sentence.]',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[The option that looked easiest, who wanted it, what you argued for instead, and what it cost. Candidates already visible in the work: renaming Cash Card to Debit Card; leading with cash back on a screen that also has to carry fee and issuer copy; giving people a digital card before the physical one ships; or “I designed less for conversion and more for confidence” against an abandonment goal.]',
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-debit/before-after.webp',
            alt: 'Before and after. Left: the Wallet tab, where the card was one row among many. Middle: the old value prop, “Get a PayPal debit card to access your money quickly”, under the Cash Card name. Right: the new value prop, “Use PayPal at all your favorite places”, with new card art.',
            caption: 'Cash Card became Debit Card. The old value prop (middle) explained access to money. The new one (right) leads with where you can use it, and the new card art carries the name.',
            ratio: '570 / 450',
          },
          {
            kind: 'quote',
            text: 'I designed less for conversion and more for confidence.',
          },
        ],
      },
      {
        id: 'team',
        nav: 'Working with constraints',
        label: 'Working with constraints',
        heading: 'Every screen had to carry a regulation, and still read in one glance.',
        blocks: [
          {
            kind: 'points',
            items: [
              { title: 'Identity verification', body: 'US banking rules require legal name, a residential address (no PO box), date of birth and the last four digits of an SSN. The flow offers an ITIN instead, and explains why it asks, next to the fields.' },
              { title: 'Fee disclosure', body: 'The full fee list for the PayPal Balance account has to appear before anyone signs up. It sits on the first screen, behind collapsible rows rather than a wall of text.' },
              { title: 'Issuer copy', body: 'The Bancorp Bank issues the card under a Mastercard licence, and that language has to sit beside the call to action. The value prop puts the promise above it and the legal text below.' },
              { title: 'An existing native flow', body: 'Enrollment was built on PayPal’s existing native enrollment framework rather than from scratch, so the new steps had to fit its screens and its identity branch.' },
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-debit/flow-enroll.webp',
            alt: 'The native enrollment flow file: dashboard entry card, value prop with legal copy, a decision point for whether identity was already verified, then account setup and identity confirmation',
            caption: 'The enrollment flow. If PayPal has already verified someone’s identity, they skip that step.',
            wide: true,
            ratio: '760 / 437',
          },
          {
            kind: 'prose',
            text: ['[What each constraint changed in the design, and anything that was pushed back on or negotiated.]'],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'Faster to apply, faster to use, fewer calls about where the card is.',
        blocks: [
          {
            kind: 'metrics',
            label: 'Business',
            items: [
              { value: '[X]%', label: 'Enrollment abandonment, down from 68% (goal: 40%)' },
              { value: '20%', label: 'Faster card applications' },
              { value: '18%', label: 'More cards activated the same day' },
              { value: '25%', label: 'Fewer support calls about shipping' },
            ],
          },
          {
            kind: 'metrics',
            label: 'Customers',
            items: [
              { value: '+9 pts', label: 'NPS among debit card users' },
            ],
          },
          {
            kind: 'prose',
            text: ['[For each number: the baseline, the time period and how it was measured.]'],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: '[Where I was wrong or slow.]',
        blocks: [
          {
            kind: 'points',
            items: [
              { title: '[The first thing]', body: '[Specific and self-implicating, the same standard every other case on the site holds to.]' },
              { title: '[The second thing]', body: '[Another.]' },
            ],
          },
        ],
      },
    ],
    next: 'paypal-id-proofing',
  },

  // ==========================================================
  // Written from her Figma Slides deck "ID Proofing" (89 slides, read
  // slide by slide, Oct 2026), plus the "Profile TID" design file for the
  // error copy and the per-step wait times. "TID" (Tethered ID) is
  // PayPal's internal name for this; the page says ID verification.
  //
  // Every figure here is on a slide: the old flow's 42% drop-off, 68%
  // first-try success, 30% manual review and 2.1% suspected fraud; the
  // team; the research volume (11 rounds, 30 design + 20 native
  // prototypes, 70+ interviews, 100+ survey responses); and the results
  // of the 40-person UX survey run before launch (82.5% / 90% / 92.5%).
  // Those results are pre-launch, and the page says so. The deck has no
  // production numbers after launch: drop-off and first-try success after
  // release are the two brackets she needs to fill.
  //
  // Not used: the "80% drop out at the permission page" line in the
  // TID Design Roadmap file. It doesn't match the deck's 42%, and that
  // roadmap deck may be a colleague's. Confirm both before adding it.
  //
  // Screens are cut from 1920px slide renders, the deck's cream ground
  // keyed out to transparent (public/images/paypal-id-proofing/).
  // ==========================================================
  {
    slug: 'paypal-id-proofing',
    company: 'PayPal',
    theme: 'sand',
    eyebrow: 'PayPal · ID verification with a face scan · 2021–2022',
    title: 'An ID check people get through the first time',
    hero: {
      src: '/images/paypal-id-proofing/hero.webp',
      alt: 'Three screens from the start of ID verification: Verify your ID easily in just 2 steps, Scan your photo ID, and the camera permission prompt',
    },
    description:
      'PayPal ID verification: a document scan and a face scan with a liveness check, designed and tested over 11 rounds of research, for iOS, Android and mobile web.',
    meta: [
      { label: 'Team', value: 'Content strategist, lead researcher, 3 PMs, 2 privacy officers, 15+ engineers, with Risk, Legal, Fraud Ops and ML' },
      { label: 'Platforms', value: 'iOS, Android and mobile web' },
      { label: 'Timeline', value: 'September 2021 – May 2022 · launched in the US, UK and Canada (beta), then globally' },
    ],
    role: 'Lead product designer · Research through delivery',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Fraudsters were getting through, and real customers were waiting hours to prove who they were.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'PayPal asks people to verify their identity before sensitive actions: high-risk transfers, crypto, account recovery. The old flow asked for a photo of an ID through a web upload form. It took 3 to 6 minutes, and if it was flagged, 6 to 24 hours of manual review.',
              'At the same time, fake documents and synthetic identities were getting past it. In 2021 PayPal reported 4.5 million illegitimately created accounts.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-id-proofing/old-flow.webp',
            alt: 'The old flow: a crypto purchase screen, a prompt to add info before transferring, a web form titled Upload a photo ID, and a Verification complete screen',
            caption: 'The old flow. Verification interrupted a task like buying crypto, then sent people to a web upload form.',
            ratio: '1201 / 623',
            wide: true,
          },
          {
            kind: 'metrics',
            label: 'The old flow',
            items: [
              { value: '42%', label: 'Dropped off before finishing' },
              { value: '68%', label: 'Succeeded on the first try' },
              { value: '2.1%', label: 'Suspected fraud rate' },
            ],
          },
          {
            kind: 'points',
            label: 'What was broken',
            items: [
              { title: 'People gave up', body: 'Friction, unclear instructions and poor camera support lost 42% of people mid-task, at a moment when they were trying to move money.' },
              { title: 'Failures went to people', body: '30% of failed checks went to manual review, which took days.' },
              { title: 'Fraud got through', body: 'Fake documents and synthetic identities were getting past a check built on an uploaded photo.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Lead product designer, from the first research to delivery.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail: 'Research, concept, design, user testing and delivery of the verification flow: document scan, face scan, the error and fallback paths, and the permission and wait screens.',
              },
              {
                term: 'Prototypes',
                detail: 'I designed 30 prototypes of the capture interactions, then built 20 native ones with an iOS engineer so we could test with live camera movement.',
              },
              {
                term: 'Who I worked with',
                detail: 'A content strategist, a lead UX researcher, three product managers, two data and privacy officers and more than 15 engineers, plus Risk, Legal, Accessibility, Fraud Ops and the ML team.',
              },
              {
                term: 'The design team',
                detail: 'I mentored the associate and intern designers working on the project.',
              },
              {
                term: 'The constraint',
                detail: 'The app could barely grow, so augmented reality and heavy on-device models were out. Every screen also had to work in a mobile browser.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'The fastest scan tested worst. I slowed it down.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The brief read as "make it smoother": fewer steps, a faster capture. My first prototypes did that, and the feedback in testing wasn\'t encouraging. People wanted a balanced speed of capture, and a check that didn\'t feel like a game.',
              'So the design added time where it bought confidence. Each step says what it\'s for before the camera opens. Each capture pauses briefly so people can see what happened. The face scan asks for a slow head turn of about five seconds, and people choose which side to turn to first.',
            ],
          },
          {
            kind: 'quote',
            text: 'More friction didn\'t mean more drop-off. More time on the task didn\'t either.',
            cite: 'From rapid research on the capture prototypes',
          },
          {
            kind: 'prose',
            text: [
              'Friction was also kept out of places that didn\'t need it. Whether to ask for verification at all depends on the risk score, the type of transaction, how trusted the device is and whether the location matches.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-id-proofing/face-guide.webp',
            alt: 'Three face scan screens: Scan your face with an I\'m ready button, Position your face in the frame, and Turn your head slowly to both sides',
            caption: 'The face scan says what it will do before the camera opens, then guides one slow head turn.',
            ratio: '1423 / 843',
            wide: true,
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'Static prototypes couldn\'t test a face scan, so we built native ones.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'Start where verification interrupts',
                body: 'We mapped every flow where identity blocked access, like crypto onboarding, account recovery and high-risk payments. Then we interviewed customers, support agents and fraud analysts.',
              },
              {
                title: 'Prototypes that move',
                body: 'Design prototypes couldn\'t respond to a moving face, so the feedback was thin. With an iOS engineer I built 20 native prototypes to compare device movement with head movement. Capturing faces in motion also gave the fraud models better signals.',
              },
              {
                title: 'Test with people who struggle',
                body: 'We tested with participants from different backgrounds. Simulation glasses stood in for sight loss, and taped finger joints for arthritis. We worked with RNIB and the Digital Accessibility Centre.',
              },
            ],
          },
          {
            kind: 'metrics',
            label: 'Research over the project',
            items: [
              { value: '11', label: 'Rounds of research and design iteration' },
              { value: '50', label: 'Prototypes tested: 30 design, 20 native' },
              { value: '70+', label: 'Face-to-face interviews, plus 100+ survey responses' },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Every failure tells people what to change, and every wait says how long.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/paypal-id-proofing/face-capture.webp',
            alt: 'Face capture: a ring that fills as the head turns, Scan complete, then Reviewing scans and Comparing info',
            caption: 'The ring fills as the head turns, a light vibration confirms each capture, and the wait screens say what\'s being checked. I tested several vibration patterns with users.',
            ratio: '1708 / 918',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-id-proofing/doc-errors.webp',
            alt: 'Four document scan errors: image too dark, the front of the ID shown when the back was asked for, glare, and out of focus, each with its own instruction',
            caption: 'Document errors name the fix, not the fault: "Add more lighting or use a darker background", "Flip your ID over to scan the back".',
            ratio: '1427 / 834',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-id-proofing/face-errors.webp',
            alt: 'Three capture errors: a face mask, a face too far from the camera, and glare on the ID, each with a short instruction',
            caption: 'Face errors adjust gradually, one instruction at a time: "Remove eyeglasses, masks, or other items covering your face", "Move your device a little closer".',
            ratio: '1448 / 891',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-id-proofing/glare.webp',
            alt: 'Four iterations of glare detection on a passport scan: a pop-up after the photo, a marked glare spot, live zones, and a live banner',
            caption: 'Glare took four iterations. The research team\'s glare detection first reported after the photo was taken. By the fourth, it warned live, before people pressed the shutter.',
            ratio: '1442 / 593',
            wide: true,
          },
          {
            kind: 'figure',
            src: '/images/paypal-id-proofing/manual-capture.webp',
            alt: 'Manual capture: the auto-capture camera, then the mobile web fallback asking for a photo of the front of a driver\'s license, and a review screen with Submit photo and Retake photo',
            caption: 'The fallback. If no document is detected for 20 seconds, the flow switches to taking a photo manually, and a failed check goes to manual review, not a dead end.',
            ratio: '1454 / 894',
            wide: true,
          },
          {
            kind: 'rows',
            label: 'Wait screens, timed to the backend',
            items: [
              { term: 'Document quality', detail: 'Average 3 seconds, at most 4.5.' },
              { term: 'Document check', detail: 'Average 13 seconds, up to 25, or 50 with the second vendor. Past 10 seconds the screen changes: "Don\'t go yet. We\'re still working on it."' },
              { term: 'Face and liveness', detail: 'Average 3 seconds, up to 10, or 50 with the second vendor.' },
              { term: 'Screen readers', detail: 'Every success and error is announced, and each capture has alt text, such as "Front of ID scan successful".' },
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'In a survey of 40 people before launch, nine in ten captured their face on the first try.',
        blocks: [
          {
            kind: 'metrics',
            label: 'UX survey of 40 people, before launch',
            items: [
              { value: '90%', label: 'Captured their face on the first try' },
              { value: '82.5%', label: 'Found the steps easy to complete' },
              { value: '92.5%', label: 'Reported a positive experience' },
            ],
          },
          {
            kind: 'metrics',
            label: 'After launch',
            items: [
              { value: '[X]%', label: 'Drop-off, down from 42%' },
              { value: '[X]%', label: 'First-try success, up from 68%' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The same survey will run before every major update. An audit by the Digital Accessibility Centre found screen reader support still short of AA, and that went into the next round.',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'What didn\'t work, and what I\'d keep.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'False rejections came from data, not the camera',
                body: 'A name or date of birth that didn\'t match the profile failed real people. I explored letting them update the profile from the scanned ID instead.',
              },
              {
                title: 'Adoption started slowly',
                body: 'Early adoption was low, and device-specific OCR problems hurt some phones. Asking at the right moment mattered as much as the scan itself.',
              },
              {
                title: 'Fewer clicks isn\'t always better',
                body: 'The lesson I\'d keep: a little friction, explained, builds more trust than speed people can\'t follow.',
              },
            ],
          },
        ],
      },
    ],
    next: 'paypal-ads-consent',
  },

  // ==========================================================
  // Two of her PayPal files in one case, on request: "Interest-based ads"
  // (the ad-sharing consent work) and "Auto Privacy Advisor (APA)", which
  // is told here as one feature of it, a proposal.
  //
  // What's sourced: from the IB Ads file's project summary — partners,
  // opted in by default, about 1% opted out, compliance moving the default
  // to opted out — plus its page list (new marketing and ads IA, consent
  // collection V2 and V3, a rapid research prototype on 19–20 April 2023,
  // past privacy research, competitor analysis, legal review, CXR) and the
  // toggle copy on its Online Ad Preferences frames. From the APA file (her
  // screenshots, Oct 2026): the project overview, the storyboard, the
  // competitor review (Google's Privacy Checkup), and the data-erasure
  // journey.
  //
  // Not used: the APA file's persona scenario, touch points, UX KPI list
  // and "generic evaluation" frames. One ends in "Regenerate", so at
  // least some of that text was pasted from a chat tool. It's generic
  // enough that a design lead would spot it, so it isn't evidence here.
  //
  // Still bracketed, waiting on her: her role and team on this project,
  // the hard call itself, what shipped and where, the research findings,
  // and every outcome. The Figma reads hit the plan's limit, so the IB Ads
  // screens are a coded rebuild (AdsConsentPrototype.astro, in the hard
  // call) from her Online Ad Preferences and consent V3 frames, to check
  // against her finals; its header lists which words are hers.
  // ==========================================================
  {
    slug: 'paypal-ads-consent',
    company: 'PayPal',
    theme: 'sage',
    eyebrow: 'PayPal · Ad consent and a privacy checkup · 2023',
    title: 'Privacy-first ad personalization',
    hero: {
      src: '/images/paypal-ads-consent/hero.webp',
      alt: 'Three screens from the rebuilt ad consent flow: Data & Privacy with a privacy checkup card, the ask with equal Allow and Not now buttons, and Online ad preferences with its switch',
    },
    description:
      'PayPal interest-based ads: moving ad data sharing from opted in by default to asking first, plus the Auto Privacy Advisor, a proposed checkup that brings privacy settings to people.',
    meta: [
      { label: 'Team', value: '[Content designer, researcher, PM, legal, engineering]' },
      { label: 'Platforms', value: '[PayPal app and web]' },
      { label: 'Timeline', value: '2023 · rapid research April 2023' },
    ],
    role: '[Lead product designer] · Ads consent and privacy settings',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Everyone was opted in to ad data sharing, and almost no one knew it.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'PayPal advertises on platforms like Facebook, Google and LinkedIn, and shares some customer information with those partners so its ads match people\'s interests. Customers were opted in by default. The setting that turned it off was hard to find.',
              'Compliance changed the rule: the default had to become opted out. PayPal could no longer share this data until a customer agreed to it.',
            ],
          },
          {
            kind: 'metrics',
            label: 'Before the change',
            items: [
              { value: '~1%', label: 'Of customers found the setting and opted out' },
              { value: '[X]', label: '[What the business stood to lose: ad reach, cost per customer]' },
            ],
          },
          {
            kind: 'points',
            label: 'What had to be solved',
            items: [
              { title: 'Consent people mean', body: 'With the default off, sharing depends on people saying yes, so the ask has to be clear and fair, not a trick.' },
              { title: 'A setting people can find', body: 'Ads and marketing settings needed a new structure that could take more options later without another redesign.' },
              { title: 'Honest about what changes', body: 'Turning sharing off doesn\'t stop PayPal ads. The setting had to say exactly what it does and doesn\'t do.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: '[Lead product designer], from research to the consent flow.',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: '[The new marketing and ads settings structure, the Online Ad Preferences screens, the consent collection flow, and the APA proposal. Confirm which were yours end to end.]' },
              { term: 'Research', detail: '[Your part in the rapid research on 19–20 April 2023, the competitor analysis and the synthesis of past privacy research.]' },
              { term: 'Who I worked with', detail: '[A content designer, research, product, legal and engineering. Name the roles.]' },
              { term: 'The constraint', detail: 'Compliance set the default, and the consent design went through legal review.' },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: '[The ask had to be worth saying yes to, without pushing anyone into it.]',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[One paragraph: the option that looked easiest — for example a pre-selected box or a vague "personalise your experience" — what you chose instead, and who disagreed.]',
              'Part of the answer is in the setting\'s own words. On: "we may tell you during the checkout…". Off: "you may still get a PayPal ad on other sites." Neither side oversells.',
            ],
          },
          {
            kind: 'prototype',
            name: 'paypal-ads-consent',
            caption:
              'Rebuilt in code from her Interest-based ads file (Figma "Interest-based ads": the Online Ad Preferences frames and consent V3). The setting is off until someone turns it on; the ask gives Allow and Not now the same weight, with nothing pre-ticked. [Check these screens against your final designs, especially the end of the "On" line and the ask\'s wording.]',
          },
          {
            kind: 'prose',
            text: ['[The evidence that settled it: what the April rapid research showed.]'],
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'Past research first, then two days of rapid research on a prototype.',
        blocks: [
          {
            kind: 'points',
            items: [
              { title: 'Start from what PayPal already knew', body: 'A synthesis of PayPal\'s earlier privacy research and a competitor analysis set the starting point.' },
              { title: 'A new structure for ads settings', body: 'Marketing and ads settings got a new information architecture, checked for how it would hold as more options are added.' },
              { title: 'Test, then revise the consent flow', body: 'A prototype went to rapid research on 19–20 April 2023. The consent flow was revised after it, and a third version followed.' },
              { title: 'Legal and CXR review', body: 'The consent design went through legal review and PayPal\'s CXR review.' },
            ],
          },
        ],
      },
      // Stills of the same screens as the prototype above, captured from it
      // (headless Chrome, 2x, reduced motion) so a skimmer sees every state
      // without clicking. Re-capture if the prototype's copy changes.
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Two equal answers, and a setting that says what each one does.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/paypal-ads-consent/ask.webp',
            alt: 'The ask: a sheet titled Want PayPal ads that match your interests?, with Allow and Not now as equal buttons, and the same sheet with How it works open, listing what is shared, who gets it, what you get and your choice',
            caption: 'The ask. Allow and Not now look the same, nothing is pre-ticked, and "How it works" says what\'s shared, who gets it, and that it stays off unless you turn it on.',
            ratio: '1800 / 1797',
          },
          {
            kind: 'figure',
            src: '/images/paypal-ads-consent/after.webp',
            alt: 'After Allow: Ad sharing is on, with Done and a link to Online ad preferences; and the Online ad preferences screen with its switch on and the On line under it',
            caption: 'After the answer. The confirmation says what changed and where to undo it, and the setting\'s line switches between the On and Off wording.',
            ratio: '1800 / 1797',
          },
        ],
      },
      {
        id: 'apa',
        nav: 'Auto Privacy Advisor',
        label: 'A feature: Auto Privacy Advisor',
        heading: 'A privacy checkup that comes to people, instead of waiting to be found.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Settings only help people who go looking for them, and about 1% did. The Auto Privacy Advisor (APA) is a proposal that turns this around. Every so often it compares a customer\'s settings with recommended practice, then offers a short, guided checkup: one step at a time, a progress bar, and a clear line on what each change does.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/paypal-ads-consent/privacy-checkup.webp',
            alt: 'Google Account Privacy Checkup: Review your privacy suggestions, with cards for auto-deleting Web & App Activity and YouTube history, one card at a time',
            caption: 'From the competitor review: Google\'s Privacy Checkup offers one suggestion at a time, each with a single action and a "Not now".',
            ratio: '860 / 315',
            wide: true,
          },
          {
            kind: 'rows',
            label: 'How a checkup runs',
            items: [
              { term: 'Trigger', detail: 'Periodically, APA reviews a customer\'s settings against recommended practice.' },
              { term: 'Ask', detail: 'A notification suggests a checkup. Customers opt in to APA, and can opt out.' },
              { term: 'Guide', detail: 'Short steps, a progress bar, and feedback on what each change does.' },
              { term: 'Act', detail: '[Confirm what a step can open: ad sharing, a copy of your data, or erasing one kind of data, like face scan or marketing data, without closing the account.]' },
            ],
          },
          {
            kind: 'points',
            label: 'What it has to get right',
            items: [
              { title: 'Not too often', body: 'Set how often checkups appear so they don\'t become notification fatigue.' },
              { title: 'Not intrusive', body: 'A checkup that nags undoes the trust it is meant to build. This needs testing to get right.' },
              { title: 'Tailored', body: 'Different steps for people who know privacy settings well and people who don\'t.' },
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[What changed after launch.]',
        blocks: [
          {
            kind: 'metrics',
            label: '[After launch]',
            items: [
              { value: '[X]%', label: '[Consent rate under the new opted-out default]' },
              { value: '[X]', label: '[Markets where it shipped]' },
              { value: '[X]', label: '[Research or business result, with its source]' },
            ],
          },
          {
            kind: 'prose',
            text: ['[Where APA stands: shipped, piloted, or still a proposal. Say which.]'],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'What I\'d keep, and what I\'d change.',
        blocks: [
          {
            kind: 'points',
            items: [
              { title: '[The first thing]', body: '[Specific and self-implicating, the same standard every other case on the site holds to.]' },
              { title: '[The second thing]', body: '[Another.]' },
            ],
          },
        ],
      },
    ],
    next: 'okta-iam',
  },

  // ==========================================================
  // THE ARCHIVE TIER — the nine projects that used to link off to
  // the Wix site. Same structure as the cases above, with two notes.
  //
  // 1. THEY CHAIN AMONG THEMSELVES. `next` runs wal-e → … → mera-data
  //    → wal-e and never crosses into the seven selected cases (the
  //    original six, plus `paypal-debit-card` — promoted out
  //    of this archive tier into that loop; see its own header comment
  //    above okta-oin's `next` for why). The two tiers are a hierarchy
  //    and the closing band should not flatten it.
  // 2. FINISHED, NOT BRACKETED. On her request these carry no
  //    placeholders. The copy is hers — her old site's case pages, lightly
  //    corrected — plus dates and roles from her resumes. A section with
  //    nothing behind it in those sources (an outcome nobody measured, a
  //    reflection she never wrote) is left out rather than invented, so
  //    some cases here run short of the full seven-section shape. Years:
  //    Walmart Labs 2019–2021, Deloitte Digital 2018 (Mint, Lender's App,
  //    Dialog — confirmed by her), qplum 2016–2017, DreamGains 2015–2016,
  //    Mera Data 2014.
  // ============================================================

  // ==========================================================
  {
    slug: 'wal-e-design-system',
    company: 'Walmart Labs',
    theme: 'sand',
    eyebrow: 'Walmart Labs · Enterprise design system · 2019–2021',
    title: 'Wal-E, a design system for enterprise',
    hero: { src: '/images/wal-e-design-system/01.jpg', alt: 'Wal-E design system components in the console' },
    description:
      'Wal-E: the Walmart enterprise design system — one source of truth for the components behind data-heavy internal products, built for form-dense screens and shared-floor touch devices.',
    meta: [
      { label: 'Scope', value: 'Research, component design, usage guidelines, integration' },
      { label: 'Built for', value: 'Enterprise applications used by Walmart associates' },
      { label: 'Timeline', value: '2019–2021' },
    ],
    role: 'Product Designer · Components and accessibility',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Walmart already had design systems. None of them were built for this kind of screen.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The goal of Wal-E was to be the single source of truth for the library of UI components used to build Walmart product, usage and implementation guidelines included.',
              'What made it a separate system was the surface. These were enterprise applications: data-heavy, dense with forms and fields, and used on many kinds of touch device by associates working in very different environments. A component set tuned for a consumer storefront does not survive a screen that is mostly input fields.',
            ],
          },
          {
            kind: 'points',
            label: 'Why a system at all',
            items: [
              { title: 'Consistency', body: 'One answer to a component question instead of one per team.' },
              { title: 'Higher quality', body: 'The accessible, tested version is the default version.' },
              { title: 'Faster handoff', body: 'Better communication with engineering, and a faster design process.' },
              { title: 'Focus', body: 'More attention on UX, less spent re-deciding visuals.' },
            ],
          },
          {
            kind: 'figure',
            src: '/images/wal-e-design-system/02.jpg',
            alt: 'The device classes Wal-E components had to work on',
            caption: 'The devices the components had to survive — the reason this could not be the consumer system.',
            ratio: '1400 / 483',
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'I researched the surface, designed the components, and tested them for accessibility.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'Research into the existing products and the devices they ran on, to establish what the components had to survive. Then designing the elements themselves and testing their accessibility.',
              },
              {
                term: 'The contribution loop',
                detail:
                  'Create — identify the need for a component, add it to Wal-E, and write its usage guidelines. Style — build it to the design specs in Wal-E so it functions correctly and matches those guidelines. Integrate — get the documented component into the product.',
              },
              {
                term: 'Starting point',
                detail: 'Built from scratch for Walmart’s enterprise applications, not adapted from an existing library.',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'Accessibility was written into the system rather than bolted on. Walmart’s position was that everyone should be able to contribute, which meant designing and coding adaptively, whatever a person’s abilities.',
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Building a separate system rather than bending the one that existed.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The call was to treat enterprise as its own problem — a system with its own component set, designed for data-heavy, form-dense screens and the touch devices associates use — instead of stretching Walmart’s existing systems to cover it.',
              'That has a real cost: another library to maintain and another thing for teams to learn. The contribution guidelines were the answer to it — anyone could raise an issue, document a component or submit code, so the system did not depend on one team to keep up.',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Every component shipped with three documents, not one drawing.',
        blocks: [
          {
            kind: 'points',
            label: 'What a finished component included',
            items: [
              { title: 'Interaction', body: 'How it works.' },
              { title: 'Visual', body: 'How it looks.' },
              { title: 'Usage', body: 'How you should use it.' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'Around the components sat the rest of the system: the design philosophy the team worked to, contribution guidelines, page layouts and the grid, content guidelines for voice and tone, accessibility guidelines, and resources on both sides of the handoff — live code snippets for engineers, a Sketch pattern library for designers.',
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The decisions that show: colour, a 4px baseline, and the input field.',
        blocks: [
          {
            kind: 'points',
            label: 'Foundations',
            items: [
              {
                title: 'Colour',
                body: 'A palette of nine core colours, built on the system’s principles, for the digital products associates use.',
              },
              {
                title: 'Typography',
                body: 'Bogle, Walmart’s official typeface. A 16px base produces an 8px x-height, halved to a 4px baseline; all text flows along it, so line height and margins share one rhythm across every screen.',
              },
              {
                title: 'Grids and spacing',
                body: 'Type scales crafted against the same 4px baseline grid.',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The input field got its own guideline, because the applications always need input from the user, one-off or repeated, in a single session. The guidance drew on the Baymard Institute’s usability studies, Material Design’s research, and current practice at Medium, Quora, Amazon, Airbnb and Atlassian.',
            ],
          },
          {
            kind: 'points',
            label: 'What an input field has to get right',
            items: [
              { title: 'Visibility', body: 'High visibility of both field and label — an accessibility question before an aesthetic one.' },
              { title: 'Structure', body: 'The appearance of the field itself.' },
              { title: 'Behaviour', body: 'How it responds as it is used.' },
              { title: 'The label', body: 'Meaningful text for the field it names.' },
              { title: 'Assistive elements', body: 'Helper text, feedback and trailing icons.' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The second documented area was system status: indicators, validations, notifications and dialogue boxes. Keeping the state of the system visible is one of the ten usability heuristics, and the framing was flow — people are happiest absorbed in the task at hand, so status has to inform without pulling them out of it. Which pattern to use came down to the priority of the message, the type of information, whether it was global or contextual, and whether a user action or a system event triggered it.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/wal-e-design-system/04.jpg',
            alt: 'The Wal-E primary colour palette with usage notes',
            caption: 'Primary colours, documented with the rules for using them. Secondary, tertiary and grey ramps follow the same sheet.',
            ratio: '1400 / 552',
          },
          {
            kind: 'figure',
            src: '/images/wal-e-design-system/13.jpg',
            alt: 'Bogle type specimen',
            caption: 'Bogle, Walmart’s official typeface — the specimen the type scale was cut from.',
            ratio: '1119 / 632',
          },
          {
            kind: 'figure',
            src: '/images/wal-e-design-system/15.jpg',
            alt: 'The Wal-E type scale, sizes and line heights',
            caption: 'The type scale against the 4px baseline: every size, its line height, and where it is used.',
            ratio: '1400 / 1214',
          },
          {
            kind: 'figure',
            src: '/images/wal-e-design-system/21.jpg',
            alt: 'Input field specification — anatomy, states and spacing',
            caption: 'The input field guideline. On screens that are mostly fields, this is the component that decides whether the product is usable.',
            ratio: '1400 / 1408',
          },
          {
            kind: 'figure',
            src: '/images/wal-e-design-system/23.jpg',
            alt: 'System status components — alerts, validations and notifications',
            caption: 'System status: which pattern to use, by priority of the message and whether a user or the system triggered it.',
            ratio: '1400 / 1284',
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'One system the enterprise products could build on.',
        blocks: [
          {
            kind: 'metrics',
            items: [
              { value: '9', label: 'Core colours in the palette' },
              { value: '4px', label: 'Baseline every screen shares' },
              { value: '3', label: 'Guidelines per component: interaction, visual, usage' },
            ],
          },
        ],
      },
    ],
    next: 'walmart-agreement-management',
  },

  // ==========================================================
  {
    slug: 'walmart-agreement-management',
    company: 'Walmart Labs',
    theme: 'sage',
    eyebrow: 'Walmart Labs · Supplier agreements · 2019–2020',
    title: 'Agreement Management, end to end',
    hero: { src: '/images/walmart-agreement-management/02.jpg', alt: 'The Agreement Management Application' },
    description:
      'Walmart Agreement Management: the lifecycle of supplier agreements — onboarding, contracts, renewals — rebuilt from beta after six phases of research, and launched to 5,000 users at NPS 67.',
    meta: [
      { label: 'Scope', value: '15 user types, 8 connected applications' },
      { label: 'Parties', value: 'Buyers, suppliers, finance and legal' },
      { label: 'Timeline', value: 'January 2019 – launch 8 October 2020' },
    ],
    role: 'Product Designer · Research through testing',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'A beta was live, and nobody knew which of its problems were the expensive ones.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Walmart’s legal agreement process with its suppliers was conceived and built for a world that predated omnichannel retail. Walmart Enterprise set out to redesign it as modular agreements that address the key pains and support omnichannel retail — and the new contract model needed a new application to power it.',
              'The Agreement Management Application manages that lifecycle: searching and onboarding existing suppliers, inviting new ones, retrieving supplier contracts, creating and renewing agreements, and holding contextual conversations with everyone involved in an agreement, finance and legal included.',
              'This project’s brief: identify the usability issues in the beta release, and decide which features were critical to prioritise for the next iteration.',
            ],
          },
          {
            kind: 'points',
            label: 'What made it hard',
            items: [
              { title: 'Ambiguity', body: 'Users could not tell what state an agreement was in, or what was expected of them next.' },
              { title: 'Slow processes', body: 'A long, manual process with too many cycles between buyers, suppliers and support.' },
              { title: 'No traceability', body: 'Tracking was limited where it existed at all — hard to know where the ball was.' },
              { title: 'Too much information', body: 'Suppliers were overwhelmed by the amount of information and Walmart-specific jargon.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Research, interaction, visual, prototyping and testing — on a system wired to eight others.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'User research, interaction design, visual design, prototyping and testing — user interviews, personas, site maps, competitive research, wireframes, high-fidelity design and prototype, and design specifications.',
              },
              {
                term: 'The surface area',
                detail:
                  'AMA serves 15 distinct user types and talks to 8 different applications. Every flow had to hold for a supplier onboarding themselves, a buyer chasing progress, and the finance and legal functions attached to the agreement.',
              },
              {
                term: 'Who I worked with',
                detail:
                  'Stakeholders, subject-matter experts and the users themselves — buyers, buyer assistants, suppliers and master-data associates — through interviews and observation.',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/walmart-agreement-management/09.jpg',
            alt: 'System diagram of the applications AMA connects to',
            caption: 'The eight applications AMA talks to. Every one of these is a place a flow could break.',
            ratio: '1400 / 633',
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Two sides of the same transaction, wanting different things.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The research produced four personas. Carol, a buyer, needed supplier onboarding to be faster, status tracking throughout, and a way to delegate work to a proxy. Michael, her assistant, wanted the manual process automated and one place to see where every supplier stood. John, a supplier, needed a single place to register with Walmart, notifications on approvals and requests, and less jargon. Amy, a master-data associate, needed to stop incomplete or inaccurate supplier information before it was submitted.',
              'I made Carol the primary persona and John the secondary. The buyer is the one who starts every agreement, so her goals set the structure; the supplier’s needs — clear status, plain language, fewer document cycles — became the requirements every buyer-side flow had to meet.',
            ],
          },
          {
            kind: 'quote',
            text: 'Suppliers need to be able to onboard themselves as smoothly as possible.',
            cite: 'From the vision statement',
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Six phases of research before a single screen.',
        blocks: [
          {
            kind: 'points',
            label: 'The research',
            items: [
              { title: 'Kickoff and literature', body: 'Kickoff meetings, then a literature review of the domain.' },
              { title: 'Audits', body: 'Product, prototype and competitive audits.' },
              { title: 'Interviews', body: 'Stakeholder interviews, then subject-matter expert interviews.' },
              { title: 'Observation', body: 'User and customer interviews, and watching them work.' },
            ],
          },
          {
            kind: 'figure',
            src: '/images/walmart-agreement-management/03.jpg',
            alt: 'The six research phases',
            caption: 'The six phases, in order: kickoff, literature review, product audits, stakeholder interviews, SME interviews, user observation.',
            ratio: '1400 / 617',
          },
          {
            kind: 'prose',
            text: [
              'From there the method was goal-directed design: problem and vision statements, context scenarios built around the personas, design requirements, then the interaction framework — sketches, wireframes, key path scenarios and validation scenarios for the edge cases — before refining to full-resolution screens and testing them with users.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/walmart-agreement-management/05.jpg',
            alt: 'Supplier onboarding experience, current state',
            caption: 'The current-state map of supplier onboarding — where the ambiguity and the waiting sat before anything was redrawn.',
            ratio: '1400 / 853',
          },
          {
            kind: 'figure',
            src: '/images/walmart-agreement-management/10.jpg',
            alt: 'Task flow worked out on sticky notes',
            caption: 'The flow before the wireframes.',
            ratio: '1112 / 2404',
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'What the application lets people do.',
        blocks: [
          {
            kind: 'points',
            label: 'The shipped surfaces',
            items: [
              { title: 'Onboarding', body: 'Search and onboard existing suppliers; invite new suppliers to onboard.' },
              { title: 'Contracts', body: 'Retrieve supplier contracts; create and renew agreements.' },
              { title: 'Conversation', body: 'Contextual messaging throughout onboarding, with every party involved in an agreement.' },
              { title: 'Status', body: 'Supplier onboarding status, especially through the contract phase.' },
            ],
          },
          {
            kind: 'figure',
            src: '/images/walmart-agreement-management/16.jpg',
            alt: 'Annotated wireframe of the supplier management screen',
            caption: 'The supplier screen, annotated. Fifteen user types meet on surfaces like this one.',
            ratio: '1400 / 1469',
          },
          {
            kind: 'figure',
            src: '/images/archive/agreement-management.jpg',
            alt: 'Supplier information and invitation steps in the shipped product',
            caption: 'Supplier information and invitation steps from the shipped application.',
            ratio: '760 / 460',
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'It launched on 8 October 2020 and was measured.',
        blocks: [
          {
            kind: 'metrics',
            items: [
              { value: '67', label: 'NPS' },
              { value: '6.2/7', label: 'Ease of use' },
              { value: '6.3/7', label: 'Average satisfaction' },
              { value: '5,000', label: 'Users at launch' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'Scores from moderated UserZoom sessions with users.',
            ],
          },
        ],
      },
    ],
    next: 'bot-spark',
  },

  // ==========================================================
  {
    slug: 'bot-spark',
    company: 'Walmart Labs',
    theme: 'lilac',
    eyebrow: 'Walmart Labs · People Systems chatbot · 2019–2021',
    title: 'Bot Spark, a console for training chatbots',
    hero: { src: '/images/bot-spark/01.jpg', alt: 'Bot Spark' },
    description:
      'Bot Spark: the admin console behind Walmart’s HR chatbot — finding the questions it failed to answer, getting answers from the business, and training them back in.',
    meta: [
      { label: 'Scope', value: 'Three user types — admin, developer, business' },
      { label: 'Team', value: 'People Systems, Walmart Labs' },
      { label: 'Timeline', value: '2019–2021' },
    ],
    role: 'Product Designer · End-to-end flows',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'A chatbot is only as good as the loop that fixes it.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Bot Spark is the tool for managing chatbots: the place where a chatbot’s admins do their work. A deployed bot fails all the time in small ways, and someone has to notice, find the answer, and feed it back.',
            ],
          },
          {
            kind: 'points',
            label: 'The problems it had to solve',
            items: [
              { title: 'Find the gaps', body: 'Get the questions the bot could not answer.' },
              { title: 'Source the answers', body: 'Collect answers from the business users who hold them.' },
              { title: 'Train', body: 'Train the bot on unanswered questions and new ones, and feed knowledge into it.' },
              { title: 'Do not regress', body: 'Regression testing for the bot’s existing knowledge.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Three user types, one console, end to end.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'High-fidelity end-to-end flows for all three users — admin, developer and business — from research to deployment, and testing the designs against the brand guideline. The logo and identity too.',
              },
              {
                term: 'Why three is the hard part',
                detail:
                  'An admin, an engineer and a business owner want different things from the same knowledge base. The business user has the answer but no interest in the tool; the developer has the tool but not the answer. The console had to make the handoff between them cheap.',
              },
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Identity first, then wireframes, then the states that get hit.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The work ran from logo design and early exploration through wireframes to the final screens, and the error screens were part of the deliverable rather than an afterthought. For a tool whose whole job is handling the cases where something failed, that is where the emphasis belongs.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/bot-spark/04.jpg',
            alt: 'Early logo exploration for Bot Spark',
            caption: 'Early exploration — the mark worked out in grey before any colour was committed.',
            ratio: '1400 / 869',
          },
          {
            kind: 'figure',
            src: '/images/bot-spark/05.jpg',
            alt: 'Bot character variants',
            caption: 'Character variants. A tool for training a bot gets a bot for a mascot.',
            ratio: '1400 / 869',
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The identity, resolved and documented.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/bot-spark/06.jpg',
            alt: 'The final Bot Spark identity',
            caption: 'The resolved mark and wordmark.',
            ratio: '1400 / 869',
          },
          {
            kind: 'figure',
            src: '/images/bot-spark/03.jpg',
            alt: 'Bot Spark logo design documentation',
            caption: 'The identity documented for handoff.',
            ratio: '1400 / 869',
          },
        ],
      },
    ],
    next: 'mint-credit-score',
  },

  // ==========================================================
  {
    slug: 'mint-credit-score',
    company: 'Mint',
    theme: 'bone',
    eyebrow: 'Deloitte Digital · Mint credit score · 2018',
    title: 'Making a credit score actionable',
    hero: { src: '/images/mint-credit-score/01.jpg', alt: 'The Mint credit score experience' },
    description:
      'Mint: turning a credit score from a number you are shown into recommendations you can act on, built from the tools Mint already had.',
    meta: [
      { label: 'Scope', value: 'Credit score experience and recommendations' },
      { label: 'Built from', value: 'Bills, budgets, card offers, goals' },
      { label: 'Timeline', value: '2018' },
    ],
    role: 'UX/UI Designer · Deloitte Digital',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Tens of millions of people have a bad score and no idea what to do about it.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'A lack of financial knowledge, poor habits and life events contribute to poor credit scores for tens of millions of Americans. Many turn to services like Mint to understand what their score is, why it is what it is, and what they should do to improve it.',
              'The first two of those Mint already answered. The third — what should I do — is the one that turns a dashboard into a product someone comes back to.',
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Re-imagine the credit score experience, and make the report produce recommendations.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'The brief',
                detail:
                  'Re-imagine the Mint credit score experience, and use the information in the credit report to make actionable recommendations to a customer trying to improve their score.',
              },
              {
                term: 'The constraint',
                detail:
                  'Recommendations had to use Mint’s existing tools — bill tracking, budgets, credit card offers, goals — so that improving a score and increasing monthly engagement with Mint were the same motion rather than two competing goals.',
              },
              {
                term: 'What I owned',
                detail: 'The experience end to end: moodboard, wireframes and the visual design.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'A clean, flat look on a surface people find overwhelming.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Credit is already confusing, and a credit report is dense. I updated the design with a clean, flat look and feel to reduce clutter and give a more streamlined experience, so the score, the reasons behind it and the next step could each be read at a glance.',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Moodboard, wireframes, then the visual language.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/mint-credit-score/02.jpg',
            alt: 'The design process and wireframes',
            caption: 'Wireframes for the score, the reasons behind it, and the recommendations.',
            ratio: '1400 / 1081',
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The score, the reasons, and what to do next.',
        blocks: [
          {
            kind: 'points',
            label: 'What the experience connects',
            items: [
              { title: 'Budgets', body: 'Budgets that make sense today and set you up for success tomorrow.' },
              { title: 'Bills and money together', body: 'What is due, when it is due, and what you can pay.' },
              { title: 'Alerts', body: 'Unusual account charges, plus custom tips for reducing fees and saving money.' },
              { title: 'The score itself', body: 'A free credit score, and how to improve it now to get the things you want later.' },
            ],
          },
          {
            kind: 'figure',
            src: '/images/mint-credit-score/03.jpg',
            alt: 'Mint credit score screens and wireframe grid',
            caption: 'The screens against the wireframes they came from.',
            ratio: '1400 / 1081',
          },
        ],
      },
    ],
    next: 'ratanindia-lenders-app',
  },

  // ==========================================================
  {
    slug: 'ratanindia-lenders-app',
    company: 'RatanIndia',
    theme: 'coral',
    eyebrow: 'Deloitte Digital · RatanIndia personal loans · 2018',
    title: 'A personal loan in three steps',
    hero: { src: '/images/ratanindia-lenders-app/01.jpg', alt: "RatanIndia's Lender's App" },
    description:
      "RatanIndia's Lender's App: a personal loan reduced to Aadhaar verification, an amount, and money in the account within minutes.",
    meta: [
      { label: 'Scope', value: 'Loan application flow, mobile app' },
      { label: 'Client', value: 'RatanIndia' },
      { label: 'Timeline', value: '2018' },
    ],
    role: 'UX/UI Designer · Deloitte Digital',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Personal lending, compressed into minutes.',
        blocks: [
          {
            kind: 'prose',
            text: [
              "RatanIndia's Lender's App is a personal loan app that makes financing easier than ever before. Getting a personal loan is now simple and fast.",
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The whole product, in three screens.',
        blocks: [
          {
            kind: 'points',
            label: 'The flow',
            items: [
              { title: 'Step I', body: 'Enter your Aadhaar card number and verify yourself.' },
              { title: 'Step II', body: 'Enter your desired loan amount.' },
              { title: 'Step III', body: 'Receive the loan in your bank account within minutes.' },
            ],
          },
          {
            kind: 'figure',
            src: '/images/ratanindia-lenders-app/02.jpg',
            alt: "The Lender's App onboarding screen",
            caption: 'The entry point. An illustration doing the reassurance work a lending product needs before it asks for an Aadhaar number.',
            ratio: '750 / 1334',
          },
          {
            kind: 'figure',
            src: '/images/ratanindia-lenders-app/04.jpg',
            alt: 'Loan application form',
            caption: 'The form behind the three steps.',
            ratio: '750 / 1616',
          },
        ],
      },
    ],
    next: 'dialog-quick-loan',
  },

  // ==========================================================
  {
    slug: 'qplum-qfolio',
    company: 'qplum',
    theme: 'clay',
    eyebrow: 'qplum · Investment onboarding · 2016–2017',
    title: 'Onboarding into an algorithmic portfolio',
    hero: { src: '/images/qplum-qfolio/01.jpg', alt: 'The qfolio investment app' },
    description:
      'qplum qfolio: onboarding into AI-driven investment portfolios — a chatbot that produces a financial plan, and the regulated account opening behind it.',
    meta: [
      { label: 'Scope', value: 'Onboarding, funding, QBot, iOS and Android apps' },
      { label: 'Team', value: 'Sole designer' },
      { label: 'Timeline', value: 'October 2016 – 2017' },
    ],
    role: 'UX/UI Designer · Sole designer',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Investing as a utility, sold to people who have never opened a brokerage account.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'qplum is a US online investment advisory firm offering portfolios driven by AI and machine learning — retirement planning, IRA accounts, 401k rollovers and personal investing accounts. Its positioning was investing as a utility.',
              'That positioning sets the design problem. A utility is something you set up once without thinking hard about it; a regulated brokerage account is the opposite, and the onboarding has to absorb that difference.',
            ],
          },
          {
            kind: 'points',
            label: 'What the app had to let someone do',
            items: [
              { title: 'Get a plan', body: 'Talk to an AI-powered chatbot and get a free financial plan.' },
              { title: 'Invest', body: 'Invest in a blend of qplum’s top portfolios.' },
              { title: 'Open accounts', body: 'Open Traditional, Roth and SEP IRA accounts; roll over an existing IRA or 401k.' },
              { title: 'Track', body: 'Follow the performance of an ETF portfolio.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'The only designer, across onboarding, funding and the apps.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'User research and a dashboard for users already invested with qplum; the funding steps, including linking different types of bank account; QBot, the chatbot that gives personalised suggestions and reminders; and a redesign of the iOS and Android apps.',
              },
              {
                term: 'Beyond the screens',
                detail:
                  'The main landing page, and a product design process and design system that the design team grew around.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'A chatbot giving financial advice sits inside a regulated perimeter.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'qplum is registered with the SEC as an Investment Advisor and with the NFA as a Commodity Trading Advisor. Brokerage and clearing ran through Apex Clearing and Interactive Brokers, both FINRA/SIPC members, with accounts SIPC-protected up to $500,000, including $250,000 for cash.',
              'That dictates what a conversational interface is allowed to say. A chatbot that produces a free financial plan has to be friendly and helpful without straying into advice the firm cannot give in that format.',
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The conversation, and the account behind it.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/qplum-qfolio/03.jpg',
            alt: 'The QBot conversation',
            caption: 'QBot. The conversation that produces a financial plan — and the surface the regulatory perimeter constrains hardest.',
            ratio: '375 / 667',
          },
          {
            kind: 'figure',
            src: '/images/qplum-qfolio/08.jpg',
            alt: 'Account verification step',
            caption: 'Verification. The point where "investing as a utility" meets what a regulated brokerage account requires.',
            ratio: '375 / 667',
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'More people made it through onboarding.',
        blocks: [
          {
            kind: 'metrics',
            items: [
              { value: '+2%', label: 'Onboarding conversion after the app redesign' },
              { value: '2', label: 'Platforms redesigned, iOS and Android' },
            ],
          },
        ],
      },
    ],
    next: 'dreamgains-finance',
  },

  // ==========================================================
  {
    slug: 'dialog-quick-loan',
    company: 'Dialog Axiata',
    theme: 'sand',
    eyebrow: 'Deloitte Digital · Dialog Axiata, Sri Lanka · 2018',
    title: 'Credit for people who have run out of credit',
    hero: { src: '/images/dialog-quick-loan/01.jpg', alt: 'Dialog quick loan' },
    description:
      'Dialog Axiata quick loan: a reload loan for pre-paid mobile customers at the moment their balance hits zero, on a network of 12.8 million subscribers.',
    meta: [
      { label: 'Scope', value: 'Loan flow, brand guideline, mobile site' },
      { label: 'Client', value: 'Dialog Axiata' },
      { label: 'Timeline', value: '2018' },
    ],
    role: 'UX/UI Designer · Deloitte Digital',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Half of Sri Lanka’s mobile market, and a customer whose balance just hit zero.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Dialog Axiata PLC is one of Sri Lanka’s largest telecommunications providers and the country’s largest mobile network operator, with 12.8 million subscribers and about 50% of the Sri Lankan mobile market.',
              'The product is the Dialog Reload Loan: pre-paid customers can borrow from Dialog whenever they run out of credit. The design problem is that moment — the customer is mid-call or mid-session, has just lost service, and is in no mood to read.',
            ],
          },
          {
            kind: 'points',
            label: 'How the loan works',
            items: [
              { title: 'Automatic', body: 'Register free of charge and a loan is granted automatically whenever the balance reaches zero — no manual request.' },
              { title: 'Mid-session', body: 'The loan applies even during a call or data session, so service does not drop.' },
              { title: 'On request', body: 'Dial 356 or #356#, choose a language, and ask for a loan.' },
              { title: 'The charge', body: 'The standard Rs. 2.00 service charge is not deducted if the loan is repaid with a recharge within 24 hours.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'The loan flow, the brand guideline and the mobile site.',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: 'The quick loan flow from process to outcome, a brand guideline for it, and the mobile site.' },
              { term: 'Two channels', detail: 'The same loan reached by dialling 356 on any phone and through the mobile site, so both had to tell the same story.' },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The flow, the brand guideline, and the mobile site.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/dialog-quick-loan/04.jpg',
            alt: 'The Dialog quick loan request screen',
            caption: 'Asking for the loan. The whole interaction happens at the moment service has just stopped.',
            ratio: '720 / 2056',
          },
          {
            kind: 'figure',
            src: '/images/dialog-quick-loan/02.jpg',
            alt: 'The full quick loan flow',
            caption: 'The flow end to end, with the mobile site it had to match.',
            ratio: '1400 / 3031',
          },
        ],
      },
    ],
    next: 'qplum-qfolio',
  },

  // ==========================================================
  {
    slug: 'dreamgains-finance',
    company: 'DreamGains',
    theme: 'lilac',
    eyebrow: 'DreamGains · Financial advisory · 2015–2016',
    title: 'Rebuilding a financial advisory website',
    hero: { src: '/images/archive/dream-gains.jpg', alt: 'DreamGains' },
    description:
      'DreamGains: an end-to-end website revamp for an Indian financial advisory firm, run alongside UX researchers.',
    meta: [
      { label: 'Scope', value: 'Website revamp, branding, marketing and print' },
      { label: 'Partners', value: 'UX researchers' },
      { label: 'Timeline', value: 'October 2015 – October 2016' },
    ],
    role: 'UI/UX Designer · Contract',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'A well-known advisory firm with a site that was not carrying it.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'DreamGains is a well-regarded firm in India providing financial advisory services — share market tips, day trading tips, forex tips and more.',
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'End to end, with researchers alongside.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail: 'The website revamp end to end, in collaboration with UX researchers.',
              },
              {
                term: 'Around it',
                detail:
                  'UI and UX for DreamGains’ suite of web and desktop products, plus branding, marketing, print and website development.',
              },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Wireframe, then visuals.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/dreamgains-finance/01.jpg',
            alt: 'DreamGains site wireframe, full page',
            caption: 'The wireframe for the full page.',
            ratio: '1400 / 3919',
          },
          {
            kind: 'figure',
            src: '/images/dreamgains-finance/03.jpg',
            alt: 'DreamGains site visual design, full page',
            caption: 'The same page resolved.',
            ratio: '1400 / 2898',
          },
        ],
      },
    ],
    next: 'mera-data',
  },

  // ==========================================================
  {
    slug: 'mera-data',
    company: 'Mera Data',
    theme: 'sage',
    eyebrow: 'Mera Data · Online tool, IT and services · 2014',
    title: 'Every cloud drive behind one login',
    hero: { src: '/images/archive/mera-data.jpg', alt: 'Mera Data' },
    description:
      'Mera Data: one interface across Google Drive, OneDrive, Box, Dropbox, Flickr and more — built to cut the toggling between them.',
    meta: [
      { label: 'Scope', value: 'Discover, define, design' },
      { label: 'Also built', value: 'Landing pages, blog pages, icons' },
      { label: 'Timeline', value: 'May – December 2014' },
    ],
    role: 'Design intern and developer',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'People’s files live in six places and none of them talk.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Mera Data lets someone reach Google Drive, OneDrive, Box, Dropbox, Flickr and other cloud and social platforms through a single login.',
              'The value proposition is simple; the design problem is that each of those services has its own idea of what a file is and what you can do with it, and one interface has to sit over all of them.',
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Designed it, and built some of it.',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: 'Discover, define and design for the product, working with the team.' },
              { term: 'What I built', detail: 'Interfaces and skins, landing pages, blog pages and icons — designed and developed.' },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Rows with functions built in, to stop the toggling.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Rather than sending people between screens for each action, functions were built into the rows themselves, so screen toggling dropped. Denser rows, fewer trips.',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Discover, define, design.',
        blocks: [
          {
            kind: 'points',
            label: 'The three stages',
            items: [
              { title: '01 Discover', body: 'Researching user workflows and identifying the product’s unique value proposition.' },
              { title: '02 Define', body: 'A sitemap, and the design considerations — rows with built-in functions, integrated to reduce screen toggling.' },
              { title: '03 Design', body: 'Simplicity first, with clear differentiation between panels.' },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Depth from thin lines rather than colour.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The visual approach was restrained on purpose: limited colour, and depth built from minimal elements — thin lines and forms — so panels stayed distinct without the interface getting loud. On a tool that gathers six services, each with its own brand colour, holding colour back is what keeps it readable.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/mera-data/01.jpg',
            alt: 'The Mera Data interface, full page',
            caption: 'The interface end to end — rows carrying their own functions, and the restraint that keeps six services’ branding from fighting.',
            ratio: '1400 / 5004',
          },
        ],
      },
    ],
    next: 'wal-e-design-system',
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
