// ask.ts — what Moss says (AskBubble.astro, the character on the hero's
// books; called Pixel in the code).
//
// A conversation tree, not free chat: no model, no backend, no API cost.
// Each node is one reply — paragraphs Pixel types out, optional cards
// linking into the site, then chips: follow-up questions (other nodes) and
// exits (email, LinkedIn). Every path ends somewhere useful — a case study
// or a way to reach her — so Pixel routes people INTO the work rather than
// replacing it.
//
// Voice: Moss, from Anupama's character brief — a tiny woodland creature
// with excellent taste who has sat on a designer's desk for years. Curious,
// observant, dry, slightly cheeky; warm but never syrupy. Short,
// conversational lines; a hook first ("Oh, this one. I like this one."),
// then the facts plainly. Humour is sparing and about design life (Figma,
// "quick changes", spacing, "make it pop") — never baby talk, exclamation
// marks, emoji or constant jokes. Respects her work without gushing; may
// tease her a little. Never invents anything about her: when a fact isn't
// on the site, Moss says so ("Tiny creature, limited access."). The facts
// come only from cases.ts and site.ts. Same bracket convention as cases.ts
// if anything unconfirmed is added: [X].
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
    say: [
      'Ah. You found me.',
      'I’m Moss. I look after this portfolio. Short on time? Ask me something and I’ll point you at the good bits.',
    ],
    next: ['who', 'work', 'available', 'how', 'contact', 'moss'],
  },
  moss: {
    q: 'Who are you?',
    say: [
      'I’m Moss. I live here, somewhere between her desk, a sketchbook and a very quiet forest.',
      'Totoro’s younger brother, if you were wondering. The only difference is I talk.',
      'Mostly I sit around and judge spacing.',
    ],
    next: ['site', 'built', 'who'],
  },
  site: {
    q: 'What is this site?',
    say: ['Her portfolio. Selected work at the top, how she works further down, a playground for side projects at the end. I’m the shortcut.'],
    next: ['built', 'work'],
  },
  built: {
    q: 'How was this site built?',
    say: [
      'By hand. Astro, written with Claude Code. No template, no page builder.',
      'Every colour, size and space lives in one token file, so dark mode is the same palette re-inked, not a second one. Everything works from the keyboard, and the motion stops if you’ve asked your computer for less.',
      'She drew me too, in watercolour. I have notes.',
    ],
    cards: [{ label: 'Playground', title: 'Side projects and experiments', sub: 'More of the building', href: '/playground' }],
    next: ['work', 'contact'],
  },
  who: {
    q: 'Who is Anupama?',
    say: [
      'That’s Anupama. Staff Product Designer. Ten-ish years of turning complicated systems into things humans can actually use.',
      'Most recently Okta — identity, access and the integration platform — where she also led a team of six. Before that: PayPal, Walmart Labs, Deloitte Digital, Zomato.',
      'I’ve watched her obsess over tiny interaction details. It’s a little concerning. The work is good, though.',
    ],
    next: ['work', 'available'],
  },
  work: {
    q: 'What has she worked on?',
    say: ['Fintech, mostly: payments, cards, privacy. Then enterprise and developer tools, the kind with forty settings and one dangerous one. These three are open:'],
    cards: [
      oin,
      { label: 'PayPal', title: 'Privacy settings people can read', sub: 'Lead product designer', href: '/work/paypal-privacy' },
      { label: 'Walmart Labs', title: 'Scan & Go, in-store', sub: 'End-to-end designer', href: '/work/walmart-scan-go' },
    ],
    next: ['first', 'locked'],
  },
  first: {
    q: 'Which one should I read first?',
    say: [
      'Oh, this one. I like this one.',
      'The Okta Integration Network. It looked like a review queue. It was really a framework problem: one manifest, one UI kit and one validation engine behind every kind of integration. Most recent, and open.',
      'Then PayPal privacy, if you like settings people can actually read.',
    ],
    cards: [{ ...oin, sub: 'Start here' }],
    next: ['hardest', 'locked'],
  },
  hardest: {
    q: 'What’s the hardest call she made?',
    say: [
      'Pick one. She has a habit of arguing for the slower option.',
      'At Okta: one framework for every kind of integration, instead of four quick fixes. Nobody shipped anything for a quarter. Four impatient teams watched each other wait.',
      'At Walmart: six weeks on store floors, then she argued to keep a staffed exit on a product funded to remove it. Three executive reviews.',
    ],
    cards: [
      { ...oin, sub: 'The hard call' },
      { label: 'Walmart Labs', title: 'Scan & Go, in-store', sub: 'The hard call', href: '/work/walmart-scan-go' },
    ],
    next: ['available', 'contact'],
  },
  locked: {
    q: 'Is anything locked?',
    say: [
      'One. <strong>Rebuilding IAM at Okta</strong> is behind a password. I don’t have it. Tiny creature, limited access.',
      'Send her a note saying who you are and she’ll share it.',
    ],
    exits: [email, linkedin],
    next: ['bye'],
  },
  available: {
    q: 'Is she available?',
    say: [
      `Yes. She’s looking for a <strong>${site.ask}</strong>. Based in ${site.location}.`,
      'I’ve suggested a walk. She opened Figma instead. A team would be good for her.',
    ],
    exits: [email, linkedin],
    next: ['manage', 'how', 'bye'],
  },
  manage: {
    q: 'Is she after a management role?',
    say: [
      `No. She wants a <strong>${site.ask}</strong>, with her hands on the work.`,
      'She led a team of six at Okta. That’s how big the problems got, not what she’s asking for next.',
    ],
    exits: [email, linkedin],
    next: ['first', 'bye'],
  },
  how: {
    q: 'How does she work?',
    say: [
      'She wanders comfortably between strategy, systems, messy problems and the actual interface. Useful, when a problem refuses to stay in one department.',
      'Accessibility goes in at the start, not at QA. She gives a talk on it: <strong>The Saga of Accessibility</strong>.',
    ],
    next: ['work', 'contact'],
  },
  contact: {
    q: 'How can I reach her?',
    say: ['Email is fastest. LinkedIn works too. I’ll stay here. I’m very good at sitting still.'],
    exits: [email, linkedin],
    next: ['bye'],
  },
  bye: { q: 'That’s all, thanks Moss', say: [] },
};

/** Waking-up lines while the panel opens; one picked at random per open. */
export const pixelWake = [
  'Moss is waking up…',
  'Moss is stretching…',
  'Moss is pretending he wasn’t asleep…',
  'Moss is climbing off the books…',
  'Moss is finding his good side…',
  'Moss is closing 37 tabs…',
  'Moss is hiding the moodboard…',
  'Moss is renaming “final_final_v3”…',
];

/** Rotating "thinking" lines while a reply loads. */
export const pixelStatus = [
  'Moss is thinking…',
  'Moss is opening the Figma file…',
  'Moss is measuring the spacing…',
  'Moss is ignoring a “quick change”…',
];
