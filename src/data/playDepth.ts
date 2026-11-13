// /playground (PlayDepth.astro): her pieces hung as a gallery wall.
// Chosen on request (2026-11-11) from the mocks in
// experiments/playground-stream/ (wall.html is the one built).
//
// Paintings, photos and the hero portrait only: no app screens, and not the
// Bob painting, Moss or the smiley (on request). Photos are of her alone:
// none with colleagues (removed on request, 2026-11-13). `file` is under
// public/images/; `aspect` is width / height. `cut` marks a cut-out with no
// box of its own (the portrait), which fades by opacity rather than a veil.
// Each piece's caption is one small line under it, shown on hover (in the
// mono of /playground/canvas). Titles are written the way
// andreas.vision/play writes his — one short, plain, slightly personal
// line, not a label ("A hike in Korea", "Berlin, day two", "I'm 24") — and
// say only what the picture and the site already show. Her paintings get
// evocative titles instead, like a gallery wall's (on request, 2026-11-11:
// "Heavy is the head", "The tea went cold"), and add
// their medium, worded as a gallery label (no "by me": it's her page, on
// request): "Salt and petals · watercolour on paper". Photos and the
// portrait don't.

export interface DepthPiece {
  file: string;
  aspect: number;
  title: string;
  /** Paintings only: the medium. The caption adds it as "· watercolour on paper". */
  medium?: string;
  cut?: boolean;
}

export const depthPieces: DepthPiece[] = [
  { file: 'play-porch.jpg', aspect: 1.0, title: 'Before anyone else wakes', medium: 'painted on a digital canvas' },
  { file: 'play-earrings.jpg', aspect: 1.33, title: 'Half a thought', medium: 'painted on a digital canvas' },
  { file: 'play-hermione.jpg', aspect: 0.73, title: 'The brightest witch of her age', medium: 'ink and watercolour on paper' },
  { file: 'play-green-eyes.jpg', aspect: 1.33, title: 'Someone I almost knew', medium: 'painted on a digital canvas' },
  { file: 'play-reading.jpg', aspect: 0.85, title: 'The tea went cold', medium: 'painted on a digital canvas' },
  { file: 'play-care.jpg', aspect: 0.96, title: 'Who holds whom', medium: 'watercolour on paper' },
  { file: 'play-sage.jpg', aspect: 0.63, title: 'Quiet, for now', medium: 'painted on a digital canvas' },
  { file: 'play-mermaid.jpg', aspect: 0.8, title: 'Salt and petals', medium: 'watercolour on paper' },
  { file: 'play-crown.jpg', aspect: 0.75, title: 'Heavy is the head', medium: 'acrylic on canvas' },
  // From the old Wix site's gallery (added 2026-11-13).
  { file: 'play-three.jpg', aspect: 1.0, title: 'In order of height', medium: 'painted on a digital canvas' },
  { file: 'play-blue-sari.jpg', aspect: 0.75, title: 'Blue, and in no hurry', medium: 'ink and watercolour on paper' },
  { file: 'play-cup.jpg', aspect: 1.0, title: 'Both hands on the cup', medium: 'ink and watercolour on paper' },
  { file: 'play-cup-desk.jpg', aspect: 1.33, title: 'Still drying', medium: 'ink and watercolour on paper' },
  { file: 'play-hermione-desk.jpg', aspect: 0.75, title: 'Before the last wash', medium: 'ink and watercolour on paper' },
  { file: 'play-late-desk.jpg', aspect: 1.33, title: 'One lamp left on', medium: 'painted on a digital canvas' },
  { file: 'play-one-table.jpg', aspect: 1.33, title: 'Four people, one table', medium: 'painted on a digital canvas' },
  { file: 'play-bears.jpg', aspect: 1.04, title: 'Company for a slow Sunday', medium: 'painted on a digital canvas' },
  { file: 'beyond/talk-smile.webp', aspect: 1.0, title: 'On stage, talking accessibility' },
  { file: 'beyond/talk-poster.webp', aspect: 1.78, title: 'The Saga of Accessibility, live' },
  { file: 'beyond/baking-cookie.webp', aspect: 0.9, title: 'Baking class, cookie in hand' },
  { file: 'beyond/blue-sculpture.webp', aspect: 0.75, title: 'A blue wall at a design conference' },
  { file: 'beyond/baking-icing.webp', aspect: 0.59, title: 'Piping chocolate' },
  { file: 'hero-idle.webp', aspect: 0.71, title: 'Me, at my laptop', cut: true },
];

// The gallery wall (on request, 2026-11-11, from
// experiments/playground-stream/wall.html): pieces hang in columns with even
// gutters, nothing overlapping. Columns repeat sideways for endless panning.
//   col / colSm   column width (px; `Sm` under 810px wide). A piece is 74–100%
//                 of it, set left, centre or right, so its caption stays in it.
//   gutter        between columns
//   vgap          between pieces in a column: room for a three-line caption (8 + 3 × 13px) and air
//   speeds        per column, how far it moves for each px the wall moves: the
//                 wall shifts gently against itself, but columns never share space
//   speed         the wall moves at this share of the page scroll, eased, so a
//                 wheel notch carries it less far and it glides to a stop
//   ease          share of the remaining distance it covers each frame
//   endGap        each column stops hanging pieces so its last one sits this far
//                 above the screen's bottom when the page lets go to the footer
//   stagger       columns start up to this far below the heading's line
export const wall = {
  seed: 11,         // the layout is the same on every visit
  col: 290, colSm: 190,
  gutter: 76, gutterSm: 40,
  vgap: 64, vgapSm: 56,
  speeds: [0.94, 1.08, 0.88, 1.12, 0.98, 1.04, 0.9, 1.1],
  speed: 0.8,
  ease: 0.1,
  endGap: 96,
  stagger: 140, staggerSm: 60,
  gap: 72,          // px between the heading and the first pieces
  hold: 0.6,        // screens of scroll the heading drifts slowly before it leaves
  drift: 0.3,       // its speed during that stretch, against the work's
  length: 4,        // screens of scroll through the wall, then the page goes on to the footer
  friction: 0.935,  // a sideways throw's glide, per frame
};
