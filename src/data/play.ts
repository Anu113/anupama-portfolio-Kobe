// The playground tiles. Used by /playground (the endless stream) and by the
// preview marquee on the home page, so the two can't drift apart.
//
// This is Anupama's own work, lifted off the About page of the Wix site
// (anupama.design/about-anupama). Paintings, watercolours and digital
// illustration — the personal drawing practice, not product work.
//
// Every file has been through `scripts/prepare-play-images.mjs`, which trims
// the blank surround off the source and lifts the flat scans. That matters:
// five of these arrived carrying 12–62% dead margin while the others bled to
// their own edge, which read on the page as some pieces floating in a cream
// void beside others that didn't. Nothing here has a border now, so there is
// nothing left to be inconsistent — the varied SIZES are the collage and are
// meant to stay. If you replace a piece, run it through the script rather
// than dropping the raw file in, or it will bring its margin with it.
//
// `w`/`h` are the asset's own pixel dimensions, post-trim. Both consumers put
// them on the <img> so a tile holds its space before it loads — without them
// a lazy tile has zero height, which shifts the layout and stops the stream's
// sentinel from ever being pushed out of view. Re-run the script and it
// prints the new pairs.
//
// Order is not arbitrary. The home-page marquee takes the first six and crops
// them to 4:3, so the square and landscape pieces lead and the tall portraits
// sit past that slice where they won't lose their heads.
export interface Tile {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** The playground stream's print-label caption: name, then a short
   *  description, then a year. `title` and `year` are `[bracket]`
   *  placeholders — the same convention cases.ts uses for unconfirmed
   *  specifics — because there is no real title or date on file for any of
   *  these pieces. `description` restates `alt`'s own words (medium plus the
   *  descriptive clause) rather than inventing a fresh line, since that's the
   *  one fact that's actually real. Confirm or replace title/year before this
   *  ships. */
  title: string;
  description: string;
  year: string;
}

export const tiles: Tile[] = [
  {
    src: '/images/play-earrings.jpg',
    alt: 'Digital painting — a profile portrait, hair tied up, wearing large filigree hoop earrings.',
    w: 1200, h: 900,
    title: '[Untitled]',
    description: 'Digital painting. A profile portrait, hair tied up, wearing large filigree hoop earrings.',
    year: '[Year]',
  },
  {
    src: '/images/play-porch.jpg',
    alt: 'Digital painting — a figure reading on a sunlit porch, red steps and flowering vines either side.',
    w: 1200, h: 1199,
    title: '[Untitled]',
    description: 'Digital painting. A figure reading on a sunlit porch, red steps and flowering vines either side.',
    year: '[Year]',
  },
  {
    src: '/images/play-green-eyes.jpg',
    alt: 'Digital painting — portrait of a young girl with green eyes and loose brown hair.',
    w: 1200, h: 900,
    title: '[Untitled]',
    description: 'Digital painting. Portrait of a young girl with green eyes and loose brown hair.',
    year: '[Year]',
  },
  {
    src: '/images/play-care.jpg',
    alt: 'Watercolour — a carer kneeling beside a person seated in a wheelchair.',
    w: 1155, h: 1200,
    title: '[Untitled]',
    description: 'Watercolour. A carer kneeling beside a person seated in a wheelchair.',
    year: '[Year]',
  },
  {
    src: '/images/play-bob.jpg',
    alt: 'Digital painting — portrait of a woman with a brown bob, looking straight out.',
    w: 1200, h: 962,
    title: '[Untitled]',
    description: 'Digital painting. Portrait of a woman with a brown bob, looking straight out.',
    year: '[Year]',
  },
  {
    src: '/images/play-mermaid.jpg',
    alt: 'Watercolour — a mermaid with flowers in her hair, reaching toward a small bird.',
    w: 958, h: 1200,
    title: '[Untitled]',
    description: 'Watercolour. A mermaid with flowers in her hair, reaching toward a small bird.',
    year: '[Year]',
  },
  {
    src: '/images/play-reading.jpg',
    alt: 'Digital illustration — a woman in a yellow dress reading in an armchair by a window, tea beside her.',
    w: 1017, h: 1200,
    title: '[Untitled]',
    description: 'Digital illustration. A woman in a yellow dress reading in an armchair by a window, tea beside her.',
    year: '[Year]',
  },
  {
    src: '/images/play-hermione.jpg',
    alt: 'Ink and watercolour on paper — a girl in school uniform and a long cloak, holding a wand and a book.',
    w: 874, h: 1200,
    title: '[Untitled]',
    description: 'Ink and watercolour on paper. A girl in school uniform and a long cloak, holding a wand and a book.',
    year: '[Year]',
  },
  {
    src: '/images/play-crown.jpg',
    alt: 'Acrylic on board — a figure in red beneath a small gold crown, painted against a dark ground.',
    w: 809, h: 1080,
    title: '[Untitled]',
    description: 'Acrylic on board. A figure in red beneath a small gold crown, painted against a dark ground.',
    year: '[Year]',
  },
  {
    src: '/images/play-sage.jpg',
    alt: 'Digital illustration — portrait of a woman with long dark hair against a sage ground.',
    w: 761, h: 1200,
    title: '[Untitled]',
    description: 'Digital illustration. Portrait of a woman with long dark hair against a sage ground.',
    year: '[Year]',
  },
];
