// talk.ts — the home page's "Small talk" (SmallTalk.astro): the short
// questions, answered in her voice, before the footer.
//
// The questions are andreas.vision's five, on request. Answers come only
// from site.ts and what the site already says; where the site doesn't
// know, the answer is an [X] bracket for her to write (same convention as
// cases.ts) — never invented. Strings may hold <a> and <em>, our own
// markup only.
//
// Under the cards sits Moss's field; it answers from his tree in ask.ts
// (pixelTree, matched on pixelKeys), so it says exactly what his panel
// says.
import { site } from './site';

export interface TalkItem { q: string; a: string[] }

const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}`;

export const talk: TalkItem[] = [
  {
    q: 'How did you get into design?',
    a: ['[X] Her story, in her words. Two short paragraphs.'],
  },
  {
    q: 'What’s your main thing?',
    a: [
      'Fintech first: payments, cards and privacy at PayPal. Then enterprise software and developer tools: identity, access and the integration platform at Okta.',
      'Complicated systems, made usable, down to the last pixel.',
    ],
  },
  {
    q: 'Where are you based?',
    a: [`${site.location}, India. The clock at the top of the page is mine.`],
  },
  {
    q: 'Where do you see yourself in the future?',
    a: [
      `In a ${site.ask}, with my hands on the work.`,
      '[X] The team, product or problem she wants next.',
    ],
  },
  {
    q: 'How can I get in touch?',
    a: [
      `<a href="${gmail}" target="_blank" rel="noopener">Email</a> is fastest. <a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn</a> works too.`,
      'And if your question isn’t up here, ask Moss. He knows the rest.',
    ],
  },
];

/** Moss's field, after his "Ask the cloud anything else". */
export const talkMoss = {
  placeholder: 'Ask Moss anything else',
};
