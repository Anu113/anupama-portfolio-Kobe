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
  | { kind: 'metrics'; label?: string; items: { value: string; label: string }[] };

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
      pattern already in the closing band below, never in `password`. */
  locked?: { password: string; preview: number };
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
    hero: { src: '/images/placeholder-1.svg', alt: 'The Okta IAM admin console' },
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
    locked: { password: 'okta2026', preview: 0 },
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
  {
    slug: 'paypal-privacy',
    company: 'PayPal',
    theme: 'lilac',
    eyebrow: 'PayPal · Data & privacy settings · 2021–2023',
    title: 'Privacy settings people can read',
    hero: { src: '/images/placeholder-2.svg', alt: 'PayPal privacy settings' },
    description:
      'PayPal privacy: rebuilding the Data & Privacy settings around the decision a person is making, not the policy structure. Shipped early 2023 to 80M+ users.',
    // Role, team and dates come from the live site's own privacy page —
    // the only numbers on this site that are confirmed rather than bracketed.
    meta: [
      { label: 'Team', value: '4 designers, 3 PMs, 15+ engineers' },
      { label: 'Partners', value: 'Legal, Privacy Engineering' },
      { label: 'Timeline', value: 'March 2021 – Jan 2023' },
    ],
    role: 'Lead product designer',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Every control was disclosed. Almost nobody could find the one they wanted.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'PayPal\'s data-sharing settings satisfied their regulatory obligations completely. The structure mirrored the privacy policy: categories of data, categories of purpose, categories of partner. Every toggle had a legally reviewed description next to it.',
              'In testing, people could not answer basic questions about their own account — whether a specific partner could see their transaction history, or what would actually stop if they turned something off. They were not confused by the language. They were confused because the page was organised around the document, and their question was organised around a decision.',
              'The cost was not only comprehension. Support handled a steady volume of privacy questions that the settings page existed to answer, and every one of those calls was a person who had already looked at the page and given up.',
              'And it had to hold at scale under two regulators. The settings ship to more than 80 million people, and the same surface has to satisfy GDPR and CCPA without either regime\'s vocabulary leaking onto the screen.',
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Design lead on a surface where Legal held a veto.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'The information model — what a setting is, what it is called, and how the set of them is organised — plus the research plan and the working relationship with Legal and Privacy Engineering.',
              },
              {
                term: 'What I delegated',
                detail:
                  'Flow-level design and specs for the individual settings surfaces, and the mobile adaptation, to the designers on the project. I held the model and the naming; they held the screens.',
              },
              {
                term: 'Who I worked with',
                detail:
                  'A researcher I briefed and ran studies with, Legal counsel with sign-off on every string, and the Privacy Engineering team who owned what the toggles actually did on the backend.',
              },
              {
                term: 'Where my authority ended',
                detail:
                  'Legal could veto any wording, and did. My job was to make the version that survived review still be the version a person could read — which meant bringing counsel in during the model work, not at the string review.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'We stopped mirroring the policy document, knowing it made Legal review harder.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The settings page mapped one-to-one onto the privacy policy. That mapping was doing real work: it made legal review tractable, because counsel could check the page against the document clause by clause.',
              'I proposed breaking it. The new model is organised around the decisions a person actually arrives wanting to make — who can see my activity, what gets used to personalise what I see, what leaves PayPal — with the policy categories underneath rather than on top.',
              'The objection was fair: no clean mapping means every review becomes a judgement call, and judgement calls are slow and contestable. I agreed to a structure that made that cost bearable — each decision surface carries an explicit, reviewable link to the clauses it covers, so counsel reviews the join rather than reconstructing it. It is more work per review. It is the only version that answers the user\'s question.',
            ],
          },
          {
            kind: 'quote',
            text: 'A control is only a control if you can predict what it will do. Everything else is a disclosure with a switch attached.',
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'The process change that mattered was moving Legal upstream.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'Counsel in the model work',
                body: 'Legal joined the working sessions where the information model was being built, not the review at the end. Their constraints shaped the structure while it was still cheap to change, and the eventual string review stopped being adversarial.',
              },
              {
                title: 'Comprehension as the gate',
                body: 'No wording shipped that had not been tested for whether people could predict what the setting did. We ran unmoderated comprehension studies on the copy itself, treating strings as a design surface with a pass mark rather than as a review artefact.',
              },
              {
                title: 'One writer, one model',
                body: 'I held naming centrally rather than distributing it with the screens. On a surface this small, inconsistent vocabulary is the failure mode — two words for the same concept undoes the whole model.',
              },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Three moves did most of the work.',
        blocks: [
          {
            kind: 'figure',
            src: '/images/placeholder-2.svg',
            alt: 'The rebuilt privacy settings, organised by decision',
            caption:
              'The page is organised by the question a person arrived with. Policy categories still exist — they moved underneath the decision, not in front of it.',
            wide: true,
          },
          {
            kind: 'points',
            items: [
              {
                title: 'State the consequence, not the category',
                body: 'Every setting says what changes if you turn it off, in the second line, in plain language. The category name is a heading, not an explanation.',
              },
              {
                title: 'Show the current answer',
                body: 'Each control displays what is true right now — which partners, which data — instead of describing what the setting governs in the abstract.',
              },
              {
                title: 'Let people undo',
                body: 'Changes are reversible and say so at the point of change. A large share of the hesitation in testing was fear of breaking something invisible.',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'Accessibility was load-bearing here, not additive. This is a page people read carefully under some anxiety, which is precisely when contrast, focus order, and screen-reader labelling stop being compliance and start being whether the page works at all. Every control announces its current state, and the consequence line is part of the accessible name rather than an adjacent visual detail.',
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'Comprehension moved. So did the support load.',
        blocks: [
          {
            kind: 'metrics',
            label: 'Business',
            items: [
              { value: '[X]%', label: 'Comprehension, unmoderated testing' },
              { value: '[X]%', label: 'Privacy-related support contacts' },
              { value: '[X]%', label: 'Settings completion rate' },
            ],
          },
          {
            kind: 'metrics',
            label: 'Team and craft',
            items: [
              { value: '[X]', label: 'Rounds of legal review, down from [X]' },
              { value: 'AA', label: 'WCAG 2.1 conformance, verified with assistive tech' },
              { value: '1', label: 'Shared vocabulary, adopted beyond this surface' },
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'What I underestimated.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'I treated naming as a design task',
                body: 'It was a cross-functional negotiation with Legal, Support, and Privacy Engineering, and I ran it as a design decision for too long. Naming the concepts jointly from the start would have saved the better part of a review cycle and produced the same words.',
              },
              {
                title: 'I did not instrument the old page first',
                body: 'We had strong qualitative evidence and thin behavioural evidence, which made the before/after comparison weaker than it needed to be. Instrumenting the page we were replacing is cheap, and I skipped it because the problem was already obvious in testing.',
              },
            ],
          },
        ],
      },
    ],
    next: 'walmart-scan-go',
  },

  // ==========================================================
  {
    slug: 'walmart-scan-go',
    company: 'Walmart Labs',
    theme: 'sage',
    eyebrow: 'Walmart Labs · Scan & Go · [20XX–20XX]',
    title: 'Scan & Go, in-store',
    hero: { src: '/images/placeholder-3.svg', alt: 'Scan & Go in a Walmart store' },
    description:
      'Walmart Scan & Go: six weeks of store-floor ethnography that reset the scope of a checkout-replacement bet, end to end to a shipped pilot.',
    meta: [
      { label: 'Scope', value: 'Research, product definition, shipped UI' },
      { label: 'Partners', value: 'Store operations, loss prevention' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: 'End-to-end designer',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'The bet was "replace the checkout lane." That was the wrong size.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Scan & Go arrived as a strategic bet with a shape already attached: customers scan items with their phone as they shop, and skip the checkout lane entirely. The framing was competitive, the deadline was real, and the scope was set before anyone had watched a person shop.',
              'The problem with replacing the lane is that the lane is not only a payment step. It is where loss prevention happens, where age-restricted items get checked, where produce gets weighed, and where a customer who has changed their mind puts something back. Delete it and every one of those jobs needs somewhere to go.',
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'The only designer on it, which meant owning the argument as well as the screens.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'The research programme, the product definition that came out of it, the end-to-end shopping and payment flow, and the case to executive review — three times.',
              },
              {
                term: 'Who I worked with',
                detail:
                  'Store operations leads at the pilot locations, loss prevention, and the engineering team building the scanning and payment stack. No design team to delegate to; the leverage was in who I brought into the research.',
              },
              {
                term: 'What I chose not to own',
                detail:
                  'Hardware and the in-store signage system. Both were live questions and both would have doubled the scope. I scoped them out explicitly and said so in review rather than leaving them ambiguous.',
              },
              {
                term: 'How the work was judged',
                detail:
                  'Whether it reached a store pilot, and whether store operations would agree to run it. The second one was the harder gate.',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'I argued for keeping a staffed exit point — the thing the bet existed to remove.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Six weeks on store floors made the answer plain and unwelcome. A fully unattended exit put the entire burden of loss prevention, age checks, and produce weighing onto either the customer or a technology stack that did not exist yet. Every store operations lead I shadowed told me the same thing in different words, and I had watched enough shopping trips to believe them.',
              'So I proposed the smaller product: Scan & Go removes the queue and the unloading, and keeps a light, staffed exit check. That is a narrower claim than the one the bet was funded on, and I had to make it to executive review three times.',
              'What carried it was not the recommendation. It was that the research was legible — the sessions, the store leads\' own words, and a clear account of which jobs the lane was doing and where each one would have to go. The argument was reviewable, so the scope change was a decision the room could make rather than a designer\'s preference.',
            ],
          },
          {
            kind: 'quote',
            text: 'The checkout lane was doing five jobs. The proposal deleted one of them and quietly reassigned the other four to the customer.',
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: 'The process I built was getting other people onto the store floor.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'Nobody reviewed who had not observed',
                body: 'Engineering leads, the PM, and eventually two executives each did a store visit. It changed the review conversations completely — arguments about what shoppers "would just do" ended once people had watched shoppers not do it.',
              },
              {
                title: 'Store operations as a design partner',
                body: 'I ran the concepts past store leads before engineering review, not after. They caught the operational failures early, and their buy-in was what made the pilot possible at all.',
              },
              {
                title: 'Findings in the open, weekly',
                body: 'Raw observations went out every week during fieldwork rather than as a report at the end. By the time the recommendation landed, the evidence behind it was already familiar to the people deciding.',
              },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Designing for one hand, a moving cart, and bad light.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The context sets the constraints. The customer is holding a phone in one hand and pushing a cart with the other, standing in an aisle under variable light, sometimes with a child. Nothing that requires two hands or a still moment survives contact with a real store.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/placeholder-3.svg',
            alt: 'The Scan & Go scanning screen, showing the running total and last item scanned',
            caption:
              'Scanning. The running total and the last item scanned are the only two things that hold their position — those are the two questions people asked out loud in the aisle.',
            wide: true,
          },
          {
            kind: 'points',
            items: [
              {
                title: 'Every action in the thumb arc',
                body: 'Scan, undo, and total all sit in reach of one thumb. Observed behaviour, not a heuristic — people simply did not put the cart down.',
              },
              {
                title: 'Undo before confirm',
                body: 'Mis-scans are constant and boring. Undo is a first-class action on the scanning screen rather than a correction buried in a review step.',
              },
              {
                title: 'The exit check, designed not bolted on',
                body: 'The staffed check is part of the flow with its own screen and its own explanation, so it reads as the last step of the product rather than as a failure of it.',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'Contrast targets were set for direct sunlight near the entrance rather than for a monitor, and every scanning action has a non-visual confirmation — the phone is often not being looked at when an item goes in the cart.',
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'From fieldwork to a store pilot.',
        blocks: [
          {
            kind: 'metrics',
            label: 'Business',
            items: [
              { value: '[X]', label: 'Stores in the pilot' },
              { value: '[X] min', label: 'Time saved per trip, observed' },
              { value: '[X]%', label: 'Repeat use among pilot participants' },
            ],
          },
          {
            kind: 'metrics',
            label: 'Craft and process',
            items: [
              { value: '6 wks', label: 'Store-floor ethnography, [X] shopping trips observed' },
              { value: '3', label: 'Executive reviews the scope survived' },
              { value: '[X]', label: 'Cross-functional colleagues taken into the field' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The outcome I would point at is that the scope held. A research-driven narrowing of a strategic bet normally gets widened back out somewhere between the recommendation and the ship. This one did not, and the reason was that the people who could have widened it had been in the stores.',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: 'Where I was slow.',
        blocks: [
          {
            kind: 'points',
            items: [
              {
                title: 'I took three reviews to say it plainly',
                body: 'The first two presentations led with the research and arrived at the recommendation. Executives needed the recommendation first and the evidence behind it. Same content, different order, and it would have cost one review instead of three.',
              },
              {
                title: 'I scoped out hardware without a plan for it',
                body: 'Cutting hardware and signage was right, but I left them as "not this project" rather than handing over what the fieldwork had already told us about both. Some of that had to be rediscovered later.',
              },
            ],
          },
        ],
      },
    ],
    next: 'paypal-data-access',
  },

  // ==========================================================
  // THE TWO BELOW ARE SKELETONS, NOT DRAFTS.
  //
  // The first three cases were written from what CLAUDE.md and work.ts
  // already record, so their prose is at least argued from something. These
  // two are not. On the live Wix site both exist only as links: the data
  // access tile points (wrongly) at the PayPal privacy page, and Chase Pay
  // points at a 25-slide Google Slides deck whose every slide is an image —
  // its text export is empty, so there was no prose to bring across.
  //
  // So: the sections that follow from known facts are written. The sections
  // that would have to be invented — the hard call, the reflection, most of
  // the craft — are bracketed prompts addressed to Anupama, in her own
  // structure, waiting for the answer. Do not "finish" them by writing
  // plausible prose. A fabricated tradeoff is the one thing on a case study
  // an interviewer will ask her to expand on.
  // ==========================================================
  {
    slug: 'paypal-data-access',
    company: 'PayPal',
    theme: 'clay',
    eyebrow: 'PayPal · Data classification & access · [20XX–20XX]',
    title: 'Automating data access requests',
    hero: { src: '/images/placeholder-4.svg', alt: 'The data access request flow' },
    description:
      'PayPal data access: turning an internal request thread and a spreadsheet into a system — who can ask for what, what is granted automatically, and where a human still has to look.',
    meta: [
      { label: 'Scope', value: 'Data classification, request and approval flow' },
      { label: 'Partners', value: '[Privacy, security, data platform]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: 'Product strategy, end-to-end design',
    sections: [
      {
        id: 'situation',
        nav: 'The situation',
        label: 'The situation',
        heading: 'Getting to internal data meant a request thread, a spreadsheet, and a wait.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'On the live site this work is filed as "untangling data messes" — data classification and organisation. The problem underneath it is the one every company with real privacy obligations reaches: people need access to data to do their jobs, every grant is a risk decision, and the process for making those decisions was a queue of requests handled by people who had to reconstruct the context each time.',
              '[Two sentences on the business stakes. What was the cost of the queue — analyst time, delayed work, or a compliance exposure? Was there a specific event or audit that made this fundable? The first three case studies all name the thing that made the work urgent; this one needs the same.]',
            ],
          },
          {
            kind: 'points',
            label: 'What was at stake',
            items: [
              { title: '[Speed]', body: '[What did the wait actually cost, and to whom?]' },
              { title: '[Risk]', body: '[What went wrong when a grant was made without the full picture?]' },
              { title: '[Scale]', body: '[How many requests, how often, across how many data sets?]' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: 'Product strategy through interaction design, on a system with no visible surface.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'Product strategy and the end-to-end visual and interaction design — that much the live site states. [Add the specifics: did you own the classification model itself, or design to one someone else defined? Which surfaces did you draw?]',
              },
              {
                term: 'Who I worked with',
                detail:
                  '[The privacy, security and data platform partners. Name the function you had to convince, and what they cared about that design did not initially account for.]',
              },
              {
                term: 'The team',
                detail:
                  '[Were you solo on this, as at Walmart, or leading it? If this ran alongside the privacy redesign, say how the two related — a reader will otherwise assume they are the same project.]',
              },
              {
                term: 'How the work was judged',
                detail:
                  '[Turnaround time, the share of requests handled without a human, audit outcomes — whichever was actually the measure.]',
              },
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
              '[This section carries the most weight on the page and it cannot be written for you. The shape it wants: the clean solution everyone assumed, why you argued against it, what it cost you to go the other way, and what you got in exchange.]',
              '[The likely candidate here is where the automatic/manual line got drawn. Automating every low-risk grant is the obvious win; the judgement is in deciding which requests a human must still see, and defending that list when it slows people down. If that was the call, say what you kept manual and who disagreed.]',
            ],
          },
          {
            kind: 'quote',
            text: '[One sentence you actually said in a room, or would stand behind saying. The other three cases each carry one.]',
          },
        ],
      },
      {
        id: 'team',
        nav: 'How the work got made',
        label: 'How the work got made',
        heading: '[What you built into the process, not just the product.]',
        blocks: [
          {
            kind: 'points',
            items: [
              { title: '[Practice one]', body: '[A working method you introduced — a review, a rota, a rule about what enters the system.]' },
              { title: '[Practice two]', body: '[How you got a non-design function — privacy or security — into the design work early rather than as an approval gate.]' },
              { title: '[Practice three]', body: '[How decisions got recorded so they held after you moved on.]' },
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'Making a risk decision legible to the person making it.',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[The design problem here is the same one as the PayPal privacy work, pointed inward: an approver is deciding something consequential from a screen that has to tell them what they are actually granting. Two or three sentences on what that demanded.]',
            ],
          },
          {
            kind: 'figure',
            src: '/images/placeholder-4.svg',
            alt: '[The request or approval screen]',
            caption:
              '[What this screen is, and the one decision it exists to support. Placeholder image — replace with real work once cleared.]',
            wide: true,
          },
          {
            kind: 'points',
            items: [
              { title: '[Principle one]', body: '[A specific call you made in the interface, and the observed behaviour behind it.]' },
              { title: '[Principle two]', body: '[Another.]' },
              { title: '[Principle three]', body: '[Another.]' },
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[The outcome, in one line.]',
        blocks: [
          {
            kind: 'metrics',
            label: 'Business',
            items: [
              { value: '[X]', label: 'Access request turnaround, before and after' },
              { value: '[X]%', label: 'Requests resolved without manual review' },
              { value: '[X]', label: 'Data sets classified' },
            ],
          },
          {
            kind: 'metrics',
            label: 'Craft and process',
            items: [
              { value: '[X]', label: 'Surfaces designed end to end' },
              { value: '[X]', label: 'Partner functions brought into the design work' },
              { value: '[X]', label: 'Patterns that outlived the project' },
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: "What I'd do differently",
        label: "What I'd do differently",
        heading: '[Where you were wrong or slow.]',
        blocks: [
          {
            kind: 'points',
            items: [
              { title: '[The first thing]', body: '[Specific and self-implicating. The other three cases each name a real miss — that is what makes them readable as judgement rather than as a pitch.]' },
              { title: '[The second thing]', body: '[Another.]' },
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
    next: 'okta-iam',
  },

  // ============================================================
  // THE ARCHIVE TIER — the nine projects that used to link off to
  // the Wix site. Same structure as the five above, because that is
  // the structure; but note two things before editing them.
  //
  // 1. THEY CHAIN AMONG THEMSELVES. `next` runs wal-e → … → mera-data
  //    → wal-e and never crosses into the five selected cases. The two
  //    tiers are a hierarchy and the closing band should not flatten it.
  // 2. THE SOURCE WAS THIN, AND IT VARIES A LOT. Agreement Management
  //    arrived with real numbers (NPS 67, launch date, user count);
  //    Lender's App arrived with three sentences. Every bracket below is
  //    a real gap in what the live site says, not a stylistic tic. The
  //    prose outside brackets is hers, restructured — not invented.
  // ============================================================

  // ==========================================================
  {
    slug: 'wal-e-design-system',
    company: 'Walmart Labs',
    theme: 'sand',
    eyebrow: 'Walmart Labs · Enterprise design system · [20XX–20XX]',
    title: 'Wal-E, a design system for enterprise',
    hero: { src: '/images/wal-e-design-system/01.jpg', alt: 'Wal-E design system components in the console' },
    description:
      'Wal-E: the Walmart enterprise design system — one source of truth for the components behind data-heavy internal products, built for form-dense screens and shared-floor touch devices.',
    meta: [
      { label: 'Scope', value: 'Research, component design, usage guidelines, integration' },
      { label: 'Partners', value: '[Front-end engineering, other product teams]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
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
              'The goal of Wal-E was to be the single source of truth for the library of UI components used to build Walmart product — usage and implementation guidelines included. That part is the same ambition every design system has.',
              'What made it a separate system was the surface. These were enterprise applications: data-heavy, dense with forms and fields, and used on a range of touch devices by associates working in very different environments. A component set tuned for a consumer storefront does not survive a screen that is mostly input fields.',
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
        heading: 'I researched the surface, drew the components, and tested them for accessibility.',
        blocks: [
          {
            kind: 'rows',
            items: [
              {
                term: 'What I owned',
                detail:
                  'Research into the existing products and the devices they ran on, to establish what the components actually had to survive. Then designing the elements themselves and testing their accessibility.',
              },
              {
                term: 'The contribution loop',
                detail:
                  'Create — identify the need for a component, add it to Wal-E, and write its usage guidelines. Style — build it to the design specs in Wal-E so it functions correctly and matches those guidelines. Integrate — get the documented component into the product.',
              },
              {
                term: 'Who else was on it',
                detail:
                  '[The live site describes the system but not the team. How many designers contributed, who owned the code side, and what was your call versus the group’s?]',
              },
            ],
          },
          {
            kind: 'prose',
            text: [
              'Accessibility was written into the system rather than bolted to it: Walmart’s position was that everyone should be able to contribute, which meant designing and coding adaptively regardless of ability. That is the same argument Anupama makes in her talk, applied to a component library.',
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Building a second system rather than bending the one that existed.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The defensible reading of the material is that the call was to treat enterprise as its own problem — a separate system with its own component set — instead of extending Walmart’s existing systems to cover it. That is a real cost: another library to maintain, another thing for teams to learn.',
              '[This is the section the live site does not cover, and it is the one a hiring manager will look for. What was the argument against a separate system, who made it, and what evidence settled it? If the call was actually a different one — a component you refused to ship, a guideline you overruled — replace this.]',
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
              { title: 'Usage', body: 'How you should use it — and when you should not.' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'Around the components sat the rest of the system: the design philosophy the team worked to, contribution guidelines so anyone could raise an issue or submit documentation, page layout and grid options, content guidelines covering voice and tone, accessibility guidelines, and resources on both sides of the handoff — live code snippets for engineers, a Sketch pattern library for designers.',
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
              'The input field got its own guideline, which is the right instinct for a system serving form-dense screens — applications here always require input, one-off or repeated, in a single session. The guidance drew on the Baymard Institute’s usability work, Material’s research, and current practice at Medium, Quora, Amazon, Airbnb and Atlassian.',
            ],
          },
          {
            kind: 'points',
            label: 'What an input field has to get right',
            items: [
              { title: 'Visibility', body: 'High visibility of both field and label — an accessibility question before an aesthetic one.' },
              { title: 'Structure', body: 'The appearance of the field itself.' },
              { title: 'Behaviour', body: 'How it responds as it is used.' },
              { title: 'The label', body: 'Meaningful text for the field it names — UX writing, not decoration.' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The second documented area was system status: indicators, validations, notifications and dialogue boxes. Keeping the state of the system visible is one of the ten usability heuristics, and the framing Anupama used for it was flow — people are at their happiest absorbed in the task at hand, so status has to inform without pulling them out of it. Which pattern to reach for came down to the priority of the message, the type of information, whether it was global or contextual, and whether a user action or a system event had triggered it.',
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
            caption: 'System status: which pattern to reach for, by priority of the message and whether a user or the system triggered it.',
            ratio: '1400 / 1284',
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'Adoption is the only number that matters for a design system.',
        blocks: [
          {
            kind: 'metrics',
            items: [
              { value: '9', label: 'Core colours in the palette' },
              { value: '[X]', label: 'Products that adopted Wal-E' },
              { value: '[X]', label: 'Components documented' },
            ],
          },
          {
            kind: 'prose',
            text: [
              '[The live site documents the system thoroughly and its reception not at all — which is the gap here. How many teams adopted it, how much design time did it save, and did the accessibility work change any measurable outcome? A design system with no adoption number reads as a side project rather than infrastructure.]',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[One honest paragraph. For a design system the usual candidates are governance — who gets to add a component — and the gap between documented and actually used. Which one bit?]',
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
      { label: 'Partners', value: '[Finance, legal, procurement, engineering]' },
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
              'The Agreement Management Application manages the lifecycle of agreements between Walmart and its suppliers: searching and onboarding existing suppliers, inviting new ones, retrieving supplier contracts, creating and renewing agreements, and holding the contextual conversations an agreement needs with everyone attached to it — finance and legal included.',
              'Anupama joined in January 2019 against a specific brief: identify the usability problems in the beta release, and determine which features were critical enough to prioritise for the next iteration. The work was triage before it was design.',
            ],
          },
          {
            kind: 'points',
            label: 'What made it hard',
            items: [
              { title: 'Ambiguity', body: 'Users could not tell what state an agreement was in, or what was expected of them next.' },
              { title: 'Slow processes', body: 'Steps that should have been minutes ran to days.' },
              { title: 'No traceability', body: 'No reliable way to see what had happened to an agreement, or who had touched it.' },
              { title: 'Complexity', body: 'Information arrived in volumes that overwhelmed rather than informed.' },
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
                  'User research, interaction design, visual design, prototyping and testing. The whole arc, on one product.',
              },
              {
                term: 'The surface area',
                detail:
                  'AMA serves 15 distinct user types and talks to 8 different applications. Every flow had to hold for a supplier onboarding themselves, a buyer chasing progress, and the finance and legal functions attached to the agreement.',
              },
              {
                term: 'Who else was on it',
                detail:
                  '[Engineering, product and the business stakeholders you interviewed. Name the counterpart who had to be convinced, and of what.]',
              },
            ],
          },
          {
            kind: 'figure',
            src: '/images/walmart-agreement-management/09.jpg',
            alt: 'System diagram of the applications AMA connects to',
            caption: 'The eight applications AMA talks to. The integration map is the scope statement — every one of these is a place a flow could break.',
            ratio: '1400 / 633',
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Four personas across two sides of the same transaction.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The research produced four primary personas, and they do not want the same things. Amanda, a supplier, needed faster onboarding, status tracking, and the ability to delegate to a proxy user. Carol, a buyer, wanted the process automated, visibility into how far a supplier had got, and clarity on the procedure itself. Michael, a buyer assistant, needed registration centralised, notifications, and clearer communication. John, another supplier, needed transparency and a documentation cycle that did not loop.',
              'Supplier-side and buyer-side pull in opposite directions: what a buyer experiences as useful automation, a supplier experiences as a form appearing without explanation.',
              '[Which way did you resolve it, and what did you give up? This is the strongest available candidate for the hard call, but the decision itself is not on the live site — confirm it, or replace it with the tradeoff you actually remember.]',
            ],
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
              { title: 'Product audits', body: 'An audit of what already existed and where it failed.' },
              { title: 'Interviews', body: 'Stakeholder interviews, then subject-matter expert interviews.' },
              { title: 'Observation', body: 'Watching users work — the phase that separates a persona from a guess.' },
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
              'From there the method was goal-directed design: sketching, wireframing and scenario development, with the personas carrying the goals through each scenario rather than sitting in a deck.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/walmart-agreement-management/05.jpg',
            alt: 'Supplier onboarding experience, current state',
            caption: 'The current-state map of supplier onboarding — where the ambiguity and the waiting actually sat before anything was redrawn.',
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
        heading: 'What the application actually lets people do.',
        blocks: [
          {
            kind: 'points',
            label: 'The shipped surfaces',
            items: [
              { title: 'Onboarding', body: 'Search and onboard existing suppliers; invite new suppliers to onboard.' },
              { title: 'Contracts', body: 'Retrieve supplier contracts; create and renew agreements.' },
              { title: 'Conversation', body: 'Contextual conversations with every party attached to an agreement, finance and legal included.' },
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
              'These are the only hard numbers to survive from the archive tier, and they came from usability testing on the work. [Worth confirming whether the scores are pre- or post-launch, and whether the beta was measured the same way — a before-and-after would be stronger than a single reading.]',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[One honest paragraph. Six research phases before design is a large investment — did it pay, or would you now cut it to reach a testable build sooner?]',
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
    company: '[Company]',
    theme: 'lilac',
    eyebrow: '[Company] · Chatbot operations · [20XX]',
    title: 'Bot Spark, a console for training chatbots',
    hero: { src: '/images/bot-spark/01.jpg', alt: 'Bot Spark' },
    description:
      'Bot Spark: the admin console behind a chatbot — finding the questions it failed to answer, getting answers out of the business, and training them back in.',
    meta: [
      { label: 'Scope', value: 'Three user types — admin, developer, business' },
      { label: 'Partners', value: '[Engineering, the business owners of the bot]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
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
              'Bot Spark is the tool used to manage chatbots — the surface where a chatbot’s administrators do their work. The interesting part is not the bot; it is that a deployed bot fails constantly in small ways, and someone has to notice, find the answer, and feed it back.',
              '[Two sentences on the business stakes. Whose bot, serving whom, and what did an unanswered question cost — a support ticket, an abandoned session, a call to a human?]',
            ],
          },
          {
            kind: 'points',
            label: 'The problems it had to solve',
            items: [
              { title: 'Find the gaps', body: 'Surface the questions the bot could not answer.' },
              { title: 'Source the answers', body: 'Collect answers from the business users who actually hold them.' },
              { title: 'Train', body: 'Train the bot on those unanswered questions, and on new ones.' },
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
                  'High-fidelity end-to-end flows for all three users — admin, developer and business — and testing the designs against the brand guideline.',
              },
              {
                term: 'Why three is the hard part',
                detail:
                  'An admin, an engineer and a business owner want different things from the same knowledge base. The business user has the answer but no interest in the tool; the developer has the tool but not the answer. The console had to make the handoff between them cheap.',
              },
              {
                term: 'Who else was on it',
                detail: '[Team, engineering counterpart, and who set the brand guideline you tested against.]',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[Not recorded on the live site. The likely candidate: how much of the training loop to expose to a non-technical business user versus keeping it behind the developer. Where did you draw that line, and what broke when you first drew it elsewhere?]',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Identity first, then wireframes, then the states that actually get hit.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The work ran from logo design and early exploration through wireframes to the final screens — and, unusually for a portfolio piece, the error screens were treated as part of the deliverable rather than an afterthought. For a tool whose entire job is handling the cases where something failed, that is the correct emphasis.',
              '[Add the process detail: how many rounds, who reviewed, and what changed between the wireframes and the final flows.]',
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
        heading: 'The console, and the states around it.',
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
          {
            kind: 'prose',
            text: [
              '[The exported assets are almost entirely identity work. The admin, developer and business flows — and the error screens — are the part that would make this a product case rather than a branding one, and they are the thing to dig out of the original files.]',
            ],
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'metrics',
            items: [
              { value: '3', label: 'User types served' },
              { value: '[X]', label: 'Unanswered questions resolved per week' },
              { value: '[X]', label: 'Change in bot answer rate' },
            ],
          },
          {
            kind: 'prose',
            text: [
              '[No outcome is recorded. The bot’s answer rate before and after the console existed would be the number that makes this case — if it was ever measured, it is worth chasing.]',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[One honest paragraph.]'] },
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
    eyebrow: 'Mint · Credit score experience · [20XX]',
    title: 'Making a credit score actionable',
    hero: { src: '/images/mint-credit-score/01.jpg', alt: 'The Mint credit score experience' },
    description:
      'Mint: turning a credit score from a number you are shown into a set of recommendations you can act on, built out of the tools Mint already had.',
    meta: [
      { label: 'Scope', value: 'Credit score experience and recommendations' },
      { label: 'Partners', value: '[Confirm]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: '[Product Designer — confirm whether client work or concept]',
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
              'Lack of financial knowledge, poor habits and life events combine to produce poor credit scores for tens of millions of Americans. Many turn to services like Mint to understand what their score is, why it is what it is, and what they should do to improve it.',
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
                  'Re-imagine the Mint credit score experience and use the information in the credit report to make actionable recommendations to a customer trying to improve their score.',
              },
              {
                term: 'The constraint',
                detail:
                  'Recommendations had to be built from Mint’s existing tools — bill tracking, budgets, credit card offers, goals — so that improving a score and increasing monthly engagement with Mint were the same motion rather than two competing goals.',
              },
              {
                term: 'What I owned',
                detail:
                  '[The live site does not say whether this was client work, a concept, or an exercise. That changes how a hiring manager reads it, so it is worth being explicit either way — a well-run concept piece is not a weakness, but an unlabelled one invites the wrong assumption.]',
              },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Recommendations that serve the score and the business at once.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The brief contains a genuine tension worth naming: the recommendations were to be assembled from Mint’s own tools, including credit card offers, and were also meant to increase monthly engagement. Advice that improves a score and advice that increases engagement are not automatically the same advice, and credit card offers sit precisely on that seam.',
              '[How did you handle it? A rule about when an offer could appear, an ordering principle, something you declined to recommend? This is the judgement the case turns on.]',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Moodboard, wireframes, then a deliberate flattening of the visual language.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The work ran through a moodboard and wireframing stage before the visual design. The visual direction was a clean, flat treatment chosen to reduce clutter and give a more streamlined experience — a reasonable call on a surface whose core problem is that people find it overwhelming.',
              '[Add what testing there was, if any, and what changed because of it.]',
            ],
          },
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
            label: 'What Mint offers, and what the work had to connect',
            items: [
              { title: 'Budgets', body: 'Budgets that make sense today and set you up for success tomorrow.' },
              { title: 'Bills and money together', body: 'What is due, when it is due, and what you can pay.' },
              { title: 'Alerts', body: 'Unusual account charges, plus tips for reducing fees and saving.' },
              { title: 'The score itself', body: 'A free credit score, and how to improve it to get the things you want later.' },
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
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[No outcome recorded. If this shipped, the numbers to find are score movement and repeat visits. If it did not ship, say so plainly and let the reasoning carry the case — an unshipped concept presented honestly reads better than one left ambiguous.]',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[One honest paragraph.]'] },
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
    eyebrow: 'RatanIndia · Consumer lending · [20XX]',
    title: 'A personal loan in three steps',
    hero: { src: '/images/ratanindia-lenders-app/01.jpg', alt: "RatanIndia's Lender's App" },
    description:
      "RatanIndia's Lender's App: a personal loan reduced to Aadhaar verification, an amount, and money in the account within minutes.",
    meta: [
      { label: 'Scope', value: 'Loan application flow' },
      { label: 'Partners', value: '[Confirm]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: '[Product Designer — confirm]',
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
              "RatanIndia's Lender's App is a personal loan product built to make financing simpler than it had been — getting a personal loan made simple and fast.",
              '[This is the thinnest source in the archive: three sentences and a step list. Two sentences on the business stakes would carry it — who was the borrower, what did the old process take, and why was speed the thing worth competing on?]',
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: '[Which surfaces, and end-to-end or a slice?]' },
              { term: 'Who I worked with', detail: '[Team, engineering, and the compliance function — identity verification always has one.]' },
              { term: 'What I influenced', detail: '[Anything beyond the screens: the step count itself, the eligibility rules, the copy?]' },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'Three steps is a claim, not a layout.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'Compressing a regulated lending flow into three steps means everything that did not make the three — disclosures, eligibility, repayment terms — went somewhere else. That placement is the design decision.',
              '[Where did it go, and who had to agree? If the step count was handed to you rather than chosen, say that; inheriting a constraint and making it work is its own kind of judgement.]',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[The live site shows a process section but no description of it. What were the stages, who reviewed, and what changed?]'] },
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
            caption: 'The entry point. An illustration doing the reassurance work that a lending product needs before it asks for an Aadhaar number.',
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
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[No outcome recorded — completion rate through the three steps would be the number.]'] },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[One honest paragraph.]'] },
        ],
      },
    ],
    next: 'qplum-qfolio',
  },

  // ==========================================================
  {
    slug: 'qplum-qfolio',
    company: 'qplum',
    theme: 'clay',
    eyebrow: 'qplum · Investment onboarding · [20XX]',
    title: 'Onboarding into an algorithmic portfolio',
    hero: { src: '/images/qplum-qfolio/01.jpg', alt: 'The qfolio investment app' },
    description:
      'qplum qfolio: onboarding into AI-driven investment portfolios — a chatbot that produces a financial plan, and the regulated account opening behind it.',
    meta: [
      { label: 'Scope', value: 'Onboarding, QBot, portfolio tracking' },
      { label: 'Partners', value: '[Confirm — compliance is certain to have been one]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: '[Product Designer — confirm]',
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
              'qplum is an online investment advisory firm offering portfolios driven by AI and machine learning — retirement planning, IRA accounts, 401k rollovers and personal investing accounts. Its positioning was investing as a utility.',
              'That positioning sets the design problem. A utility is something you set up once without thinking hard about it; a regulated brokerage account is the opposite, and the onboarding has to absorb that difference.',
            ],
          },
          {
            kind: 'points',
            label: 'What the app had to let someone do',
            items: [
              { title: 'Get a plan', body: 'Talk to an AI-powered chatbot and get a free financial plan.' },
              { title: 'Invest', body: 'Invest in a blend of qplum’s top portfolios.' },
              { title: 'Open accounts', body: 'Open Traditional, ROTH and SEP IRA accounts; roll over an existing IRA or 401k.' },
              { title: 'Track', body: 'Follow the performance of an ETF portfolio.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: '[The archive tile calls this "Investment Portfolio onboarding" — confirm whether you owned onboarding only, or QBot and tracking too.]' },
              { term: 'Who I worked with', detail: '[Engineering, and whoever owned the regulatory copy.]' },
              { term: 'What I influenced', detail: '[Confirm.]' },
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
              'qplum is registered with the SEC as an Investment Advisor and with the NFA as a Commodity Trading Advisor. Brokerage and clearing ran through Apex Clearing and Interactive Brokers, both FINRA/SIPC members, with accounts SIPC-protected up to $500,000 including $250,000 for cash.',
              'None of that is decoration — it dictates what a conversational interface is allowed to say. A chatbot that produces a "free financial plan" has to be helpful without straying into advice the firm cannot give in that format.',
              '[How did that constrain QBot, and what did you have to take out of it? If the harder call was elsewhere, replace this — but the compliance seam is the most likely place a real tradeoff lived.]',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'QBot, and the version of QBot that shipped.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The live site carries the process in stages — process, QBot, QBot final, outcome — which implies the conversational piece went through at least one substantial revision.',
              '[What was wrong with the first QBot, and what changed? A first-and-final pair with the reasoning between them is the most valuable thing this case could carry.]',
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
            caption: 'Verification. The point where "investing as a utility" meets what a regulated brokerage account actually requires.',
            ratio: '375 / 667',
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[No outcome recorded. Completion rate into a funded account is the number that matters for onboarding.]'] },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[One honest paragraph.]'] },
        ],
      },
    ],
    next: 'dialog-quick-loan',
  },

  // ==========================================================
  {
    slug: 'dialog-quick-loan',
    company: 'Dialog Axiata',
    theme: 'sand',
    eyebrow: 'Dialog Axiata · Sri Lanka · [20XX]',
    title: 'Credit for people who have run out of credit',
    hero: { src: '/images/dialog-quick-loan/01.jpg', alt: 'Dialog quick loan' },
    description:
      'Dialog Axiata quick loan: a reload loan for pre-paid mobile customers at the moment their balance hits zero, on a network carrying 12.8 million subscribers.',
    meta: [
      { label: 'Scope', value: 'Loan flow, brand guideline, mobile site' },
      { label: 'Partners', value: '[Confirm]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: '[Product Designer — confirm]',
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
              'Dialog Axiata PLC is one of Sri Lanka’s largest telecommunications providers and the country’s largest mobile network operator, with 12.8 million subscribers and roughly 50% of the Sri Lankan mobile market.',
              'The product is a reload loan: pre-paid customers can borrow from Dialog the moment they run out of credit. The design problem is the moment itself — the customer is mid-call or mid-session, has just lost service, and is not in a mood to read.',
            ],
          },
          {
            kind: 'points',
            label: 'How the loan works',
            items: [
              { title: 'Automatic', body: 'Register free of charge and the loan is granted automatically whenever the balance reaches zero — no manual request.' },
              { title: 'Mid-session', body: 'The loan value applies even during a call or data session, so service does not drop.' },
              { title: 'On request', body: 'Dial 356 or #356#, choose a language, and ask for a loan.' },
              { title: 'The charge', body: 'The standard Rs. 2.00 service charge is waived if the loan value is recharged within 24 hours.' },
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: '[The live site shows process, outcome, brand guideline and mobile site — confirm which of those were yours.]' },
              { term: 'Who I worked with', detail: '[Team and client-side counterparts.]' },
              { term: 'What I influenced', detail: '[Did the brand guideline come from you, or were you working to one?]' },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: 'A lending product that has to work over USSD as well as a screen.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The loan is reachable by dialling 356 or #356# — a menu on a feature phone — as well as through the mobile site. Two entry points with completely different capabilities, serving the same customers, for a product with a fee attached.',
              '[Which one led the design, and what had to be true in both? Designing for the lower-capability channel first is a defensible call and a demonstrable one — if that is what happened, it is the strongest thing in this case.]',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[The live site shows a process section without describing it. What were the stages and what changed between them?]'] },
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
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: 'The reach is documented. The result is not.',
        blocks: [
          {
            kind: 'metrics',
            items: [
              { value: '12.8M', label: 'Dialog subscribers' },
              { value: '~50%', label: 'Share of the Sri Lankan mobile market' },
              { value: '[X]', label: 'Loans taken after launch' },
            ],
          },
          {
            kind: 'prose',
            text: [
              'The first two numbers describe the network, not the work — worth being careful with them, because a metric that is really the client’s scale reads as borrowed if it is presented as an outcome. [Take-up of the loan product is the number that would belong to this case.]',
            ],
          },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[One honest paragraph.]'] },
        ],
      },
    ],
    next: 'dreamgains-finance',
  },

  // ==========================================================
  {
    slug: 'dreamgains-finance',
    company: 'DreamGains',
    theme: 'lilac',
    eyebrow: 'DreamGains · Financial advisory · [20XX]',
    title: 'Rebuilding a financial advisory website',
    hero: { src: '/images/archive/dream-gains.jpg', alt: 'DreamGains' },
    description:
      'DreamGains: an end-to-end website revamp for an Indian financial advisory firm, run alongside UX researchers.',
    meta: [
      { label: 'Scope', value: '[Confirm — full site or key templates?]' },
      { label: 'Partners', value: 'UX researchers' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: 'Designer · End-to-end website revamp',
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
              'DreamGains is a well-regarded business firm in India providing financial advisory services — share market tips, day trading tips, forex tips and more.',
              '[Two sentences on why the revamp happened. What was the site failing to do — convert, explain the products, hold up on mobile — and who decided it needed rebuilding?]',
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
                detail:
                  'The revamp end to end, in collaboration with UX researchers — one of the few archive projects where the live site names a research partnership.',
              },
              {
                term: 'What the researchers brought',
                detail:
                  '[What did they find, and what did you change because of it? A collaboration is only evidence if it changed something.]',
              },
              { term: 'Who else was on it', detail: '[Engineering, content, client-side stakeholders.]' },
            ],
          },
        ],
      },
      {
        id: 'hard-call',
        nav: 'The hard call',
        label: 'The hard call',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'prose',
            text: [
              '[Not recorded. For a financial advisory site the usual candidate is how much to promise on the marketing surface versus what compliance and honesty allow — "share market tips" is a category where that tension is real.]',
            ],
          },
        ],
      },
      {
        id: 'process',
        nav: 'How it got made',
        label: 'How the work got made',
        heading: 'Wireframes, then visuals.',
        blocks: [
          {
            kind: 'prose',
            text: [
              'The live site records two stages: wireframe, then visuals. [Add what sat between them — reviews, research input, iterations.]',
            ],
          },
        ],
      },
      {
        id: 'craft',
        nav: 'The craft',
        label: 'The craft',
        heading: 'The rebuilt site.',
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
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[No outcome recorded. For a site revamp: enquiries, sign-ups, or bounce rate before and after.]'] },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[One honest paragraph.]'] },
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
    eyebrow: 'Mera Data · Online tool, IT and services · [20XX]',
    title: 'Every cloud drive behind one login',
    hero: { src: '/images/archive/mera-data.jpg', alt: 'Mera Data' },
    description:
      'Mera Data: one interface across Google Drive, OneDrive, Box, Dropbox, Flickr and more — built to cut the toggling between them.',
    meta: [
      { label: 'Scope', value: 'Discover, define, design' },
      { label: 'Partners', value: '[Confirm]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
    role: '[Product Designer — confirm]',
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
              'The value proposition is straightforward; the design problem is that each of those services has its own model of what a file is and what you can do with it, and one interface has to sit over all of them without lying about any.',
            ],
          },
        ],
      },
      {
        id: 'scope',
        nav: 'My scope',
        label: 'My scope',
        heading: '[To be written.]',
        blocks: [
          {
            kind: 'rows',
            items: [
              { term: 'What I owned', detail: '[Confirm which of discover, define and design were yours, and whether you were the only designer.]' },
              { term: 'Who I worked with', detail: '[The live site says "the team" without naming it.]' },
              { term: 'What I influenced', detail: '[Confirm.]' },
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
              'The clearest decision recorded is in the define stage: rather than sending people between screens for each action, functions were built into the rows themselves and integrated so that screen toggling dropped. That is a real tradeoff — denser rows, fewer trips — and it is the kind of call worth stating outright.',
              '[What did the density cost, and did anything have to be dropped from a row to keep it usable?]',
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
              'The visual approach was restrained on purpose: limited colour, and depth built from minimal elements — thin lines and forms — so that panels stayed distinguishable without the interface becoming loud. On a tool aggregating six services, each with its own brand colour, holding colour back is the decision that keeps it readable.',
            ],
          },
          {
            kind: 'figure',
            src: '/images/mera-data/01.jpg',
            alt: 'The Mera Data interface, full page',
            caption: 'The interface end to end — rows carrying their own functions, and the restraint that keeps six services’ worth of branding from fighting.',
            ratio: '1400 / 5004',
          },
        ],
      },
      {
        id: 'impact',
        nav: 'Impact',
        label: 'Impact',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[No outcome recorded. Connected accounts per user, or time-to-file, would be the numbers.]'] },
        ],
      },
      {
        id: 'reflection',
        nav: 'What I’d do differently',
        label: 'What I’d do differently',
        heading: '[To be written.]',
        blocks: [
          { kind: 'prose', text: ['[One honest paragraph.]'] },
        ],
      },
    ],
    next: 'wal-e-design-system',
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
