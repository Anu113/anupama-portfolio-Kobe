// /playground (PlayBall.astro): every piece, in four categories. A copy of
// andreas.vision/play, measured off his page on 2026-10-19 (see the
// mocks in experiments/playground-views/exact.html): a slow ball of
// cards you can spin, and a Grid that pours them into one pile per
// category.
//
// `file` is under public/images/. The ball draws a 400px thumbnail of it
// from public/images/playground/ (made by scripts/playground-thumbs.py —
// re-run it after adding a piece); the viewer and an open pile load the
// full file. `aspect` is width / height of the file. `video`, if set,
// plays in the grid and the viewer; the ball shows the still.

export interface PlayPiece {
  file: string;
  aspect: number;
  caption: string;
  video?: string;
}
export interface PlayCategory {
  id: string;
  name: string;
  pieces: PlayPiece[];
}

export const playCategories: PlayCategory[] = [
  {
    id: 'animation',
    name: 'Animation',
    pieces: [
      { file: 'chase-pay/prototype-poster.jpg', aspect: 0.56, caption: 'Chase Pay, prototype', video: 'chase-pay/prototype.mp4' },
      { file: 'footer/smiley-loop.webp', aspect: 1, caption: 'Crayon smiley, 11-frame loop' },
      { file: 'moss/moss-idle.webp', aspect: 0.84, caption: 'Moss looking around' },
      { file: 'hero-idle.webp', aspect: 0.71, caption: 'Hero portrait scrub' },
      { file: 'paypal-debit/digital-card.webp', aspect: 1.71, caption: 'Debit card sign-up, coded prototype' },
    ],
  },
  {
    id: 'interfaces',
    name: 'Interfaces',
    pieces: [
      { file: 'paypal-debit/hub.webp', aspect: 1.29, caption: 'PayPal Debit, hub' },
      { file: 'paypal-debit/rewards.webp', aspect: 1.71, caption: 'PayPal Debit, rewards' },
      { file: 'paypal-debit/offers.webp', aspect: 1.71, caption: 'PayPal Debit, offers' },
      { file: 'paypal-privacy/hero.webp', aspect: 2.09, caption: 'PayPal Privacy' },
      { file: 'paypal-privacy/contextual.webp', aspect: 1.98, caption: 'Contextual privacy' },
      { file: 'paypal-privacy/data-delete.webp', aspect: 1.37, caption: 'Data deletion' },
      { file: 'okta/my-apps.webp', aspect: 1.86, caption: 'Okta, My Apps' },
      { file: 'okta/integrations.webp', aspect: 1.94, caption: 'Okta, integrations' },
      { file: 'chase-pay/hero.png', aspect: 2.23, caption: 'Chase Pay' },
      { file: 'chase-pay/settings.png', aspect: 1.8, caption: 'Chase Pay, settings' },
      { file: 'archive/mint-app.jpg', aspect: 1.65, caption: 'Mint credit score' },
      { file: 'archive/mera-data.jpg', aspect: 1.65, caption: 'Mera Data' },
      { file: 'archive/dream-gains.jpg', aspect: 1.65, caption: 'DreamGains' },
      { file: 'archive/lenders-app.jpg', aspect: 1.65, caption: 'Lenders app' },
      { file: 'archive/wal-e-design-system.jpg', aspect: 1.65, caption: 'WAL-E design system' },
    ],
  },
  {
    id: 'art',
    name: 'Art',
    pieces: [
      { file: 'play-porch.jpg', aspect: 1.0, caption: 'Reading on the porch, digital' },
      { file: 'play-earrings.jpg', aspect: 1.33, caption: 'Earrings, digital' },
      { file: 'play-hermione.jpg', aspect: 0.73, caption: 'Hermione, ink and watercolour' },
      { file: 'play-green-eyes.jpg', aspect: 1.33, caption: 'Green eyes, digital' },
      { file: 'play-reading.jpg', aspect: 0.85, caption: 'Tea and a book, digital' },
      { file: 'play-care.jpg', aspect: 0.96, caption: 'Care, watercolour' },
      { file: 'play-sage.jpg', aspect: 0.63, caption: 'Sage, digital' },
      { file: 'play-bob.jpg', aspect: 1.25, caption: 'Bob, digital' },
      { file: 'play-mermaid.jpg', aspect: 0.8, caption: 'Mermaid, watercolour' },
      { file: 'play-crown.jpg', aspect: 0.75, caption: 'Crown, acrylic' },
    ],
  },
  {
    id: 'photos',
    name: 'Photos',
    pieces: [
      { file: 'beyond/talk-smile.webp', aspect: 1.0, caption: 'On stage, The Saga of Accessibility' },
      { file: 'beyond/talk-poster.webp', aspect: 1.78, caption: 'Talk poster, Design Sundays' },
      { file: 'beyond/baking-cookie.webp', aspect: 0.9, caption: 'Baking class' },
      { file: 'beyond/blue-sculpture.webp', aspect: 0.75, caption: 'Design conference' },
      { file: 'beyond/event-selfie.webp', aspect: 1.37, caption: 'Designers, one selfie' },
      { file: 'beyond/sticky-wall.webp', aspect: 0.56, caption: 'Sticky-note wall' },
      { file: 'beyond/office-garden.webp', aspect: 1.33, caption: 'Office garden' },
      { file: 'beyond/meetup-group.webp', aspect: 1.96, caption: 'Design meetup' },
      { file: 'beyond/baking-icing.webp', aspect: 0.59, caption: 'Piping chocolate' },
      { file: 'beyond/blue-sculpture-friend.webp', aspect: 0.75, caption: 'With a friend' },
      { file: 'beyond/office-garden-2.webp', aspect: 1.14, caption: 'Office garden, again' },
    ],
  },
];

// The thumbnail the ball draws for a piece. Animated files keep their own
// (a thumbnail would freeze them).
export const playThumb = (file: string) =>
  file.includes('loop')
    ? `/images/${file}`
    : `/images/playground/${file.replace(/\//g, '__').replace(/\.\w+$/, '.webp')}`;

// The ball, his numbers: ~120 cards (his has 137), so the 41 pieces repeat
// to fill it; repeats are hidden from screen readers and gone in the grid.
export const ball = {
  cards: 120,
  shell: 100,       // cards spread evenly over the skin, so the outline is round; the rest fill the middle
  radius: 330,      // px at full size (his ~343)
  scale: 0.56,      // every card's scale in the ball
  perspective: 1000,
  drift: 0.12,      // rad/s about the vertical: one slow turn
  hoverSlow: 0.85,  // over a card, the drift slows by this much (a throw never does)
  settle: 0.55,     // how fast a throw eases back to the drift (per second)
  lean: [0.3, 0.22],  // how far it leans toward the pointer (rad, x / y)
  hoverLift: 0.22,  // a hovered card grows this much, with a shadow
  pixelTile: 'play-porch.jpg',   // her painting, at 12×12, on the Cloud / Grid switch
};
