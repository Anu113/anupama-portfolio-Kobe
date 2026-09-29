// ask.ts — what Pixel says (AskBubble.astro, the character on the hero).
//
// A conversation tree, not free chat: no model, no backend, no API cost.
// Each node is one reply — paragraphs Pixel types out, optional cards
// linking into the site, then chips: follow-up questions (other nodes) and
// exits (email, LinkedIn). Every path ends somewhere useful — a case study
// or a way to reach her — so Pixel routes people INTO the work rather than
// replacing it.
//
// Voice: Pixel's jokes are about Pixel (the laptop it lives in, tabs,
// meetings), never claims about Anupama's work. The facts stay plain and
// come only from what the site already states (cases.ts, site.ts). Same
// bracket convention as cases.ts if anything unconfirmed is added: [X].
//
// `say` strings may contain <strong> for emphasis — nothing else, and
// never visitor input.
import { site } from './site';

export interface PixelCard { label: string; title: string; sub: string; href: string }
export interface PixelExit { label: string; href: string; external?: boolean }
export interface PixelNode {
  /** The chip text that leads here (unused on `start`). */
  q: string;
  say: string[];
  cards?: PixelCard[];
  exits?: PixelExit[];
  /** Keys of follow-up nodes, shown as chips. `bye` closes the panel. */
  next?: string[];
}

const email: PixelExit = { label: 'Email her', href: `mailto:${site.email}` };
const linkedin: PixelExit = { label: 'LinkedIn', href: site.linkedin, external: true };

const oin: PixelCard = {
  label: 'Okta',
  title: 'Designing the future of Okta’s Integration Platform',
  sub: 'Staff Product Designer',
  href: '/work/okta-oin',
};

export const pixelTree: Record<string, PixelNode> = {
  start: {
    q: '',
    say: ['Oh! Hello. I’m Pixel — I live in Anupama’s laptop. I’ve sat through every design review she’s run, so I know where things are kept. Short on time? Ask away.'],
    next: ['site', 'who', 'work', 'available', 'how', 'contact'],
  },
  site: {
    q: 'What is this site?',
    say: ['Her portfolio. Selected work up top, how she works further down, and a playground for the side projects. I’m the shortcut.'],
    next: ['work', 'who'],
  },
  who: {
    q: 'Who is Anupama?',
    say: [
      'A staff product designer with 10+ years in. Most recently Okta — identity, access, and the integration platform — where she also led a team of six.',
      'Before that: PayPal, Walmart Labs, Deloitte Digital, Zomato. I came along to all of them.',
    ],
    next: ['work', 'available'],
  },
  work: {
    q: 'What has she worked on?',
    say: ['Enterprise systems, mostly. The kind with forty settings and one dangerous one. Here’s what’s open:'],
    cards: [
      oin,
      { label: 'PayPal', title: 'Privacy settings people can read', sub: 'Lead product designer', href: '/work/paypal-privacy' },
      { label: 'Walmart Labs', title: 'Scan & Go, in-store', sub: 'End-to-end designer', href: '/work/walmart-scan-go' },
    ],
    next: ['first', 'locked'],
  },
  first: {
    q: 'Which one should I read first?',
    say: ['The integration platform at Okta — it’s the most recent, and it’s open. If you like words people can actually understand, PayPal privacy next.'],
    cards: [{ ...oin, sub: 'Start here' }],
    next: ['locked', 'available'],
  },
  locked: {
    q: 'Is anything locked?',
    say: [
      'One. <strong>Rebuilding IAM at Okta</strong> is behind a password. I’m not allowed to open it. I tried.',
      'Send her a note saying who you are and she’ll share it.',
    ],
    exits: [email, linkedin],
    next: ['bye'],
  },
  available: {
    q: 'Is she available?',
    say: [
      `Yes. She’s looking for a <strong>${site.ask}</strong> — senior IC or design-engineering track. Based in ${site.location}.`,
      'Frankly I’d like her back at a desk too.',
    ],
    exits: [email, linkedin],
    next: ['how', 'bye'],
  },
  how: {
    q: 'How does she work?',
    say: [
      'Close to how things get built, and accessibility from the start rather than at QA. She gives a talk called <strong>The Saga of Accessibility</strong>.',
      'She runs a screen reader on this laptop more than most people do. I’ve learned a lot.',
    ],
    next: ['work', 'contact'],
  },
  contact: {
    q: 'How can I reach her?',
    say: ['Email is fastest. LinkedIn works too. I’ll stay here and keep the laptop warm.'],
    exits: [email, linkedin],
    next: ['bye'],
  },
  bye: { q: 'That’s all, thanks Pixel', say: [] },
};

/** Rotating "thinking" lines while a reply loads. */
export const pixelStatus = [
  'Pixel is thinking…',
  'Pixel is opening the file…',
  'Pixel is closing 40 tabs…',
  'Pixel is checking the Figma file…',
];
