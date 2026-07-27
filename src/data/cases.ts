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
      make it wider. Nothing may reach into the sticky rail's column. */
  | { kind: 'figure'; src: string; alt: string; caption?: string; wide?: boolean }
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
  /** The hero meta row. Role and scope sit here on purpose: it is the only
      thing in the banner besides the title, so a recruiter skimming for 60
      seconds should not have to scroll to find the level she worked at. */
  meta: { label: string; value: string }[];
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
      { label: 'Role', value: 'Staff Product Designer, IAM + Developer Tools' },
      { label: 'Team', value: '6 designers across 4 squads' },
      { label: 'Reported to', value: 'Director of Design' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
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
      { label: 'Role', value: 'Lead product designer' },
      { label: 'Team', value: '4 designers, 3 PMs, 15+ engineers' },
      { label: 'Partners', value: 'Legal, Privacy Engineering' },
      { label: 'Timeline', value: 'March 2021 – Jan 2023' },
    ],
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
      { label: 'Role', value: 'End-to-end designer' },
      { label: 'Scope', value: 'Research, product definition, shipped UI' },
      { label: 'Partners', value: 'Store operations, loss prevention' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
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
      { label: 'Role', value: 'Product strategy, end-to-end design' },
      { label: 'Scope', value: 'Data classification, request and approval flow' },
      { label: 'Partners', value: '[Privacy, security, data platform]' },
      { label: 'Timeline', value: '[Month 20XX – Month 20XX]' },
    ],
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
      { label: 'Role', value: 'Product designer, Walmart Pay' },
      { label: 'Team', value: '1 design manager, 1 researcher, 1 PM, 10+ engineers' },
      { label: 'Partners', value: '5 stakeholders, JPMorgan Chase' },
      { label: 'Timeline', value: 'June 2019 – April 2020' },
    ],
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
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
