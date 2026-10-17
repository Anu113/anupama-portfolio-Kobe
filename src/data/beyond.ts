// "Beyond work" on the home page (BeyondWork.astro): her life outside
// the work, on a ring of photos and paintings. No UI or product work
// here, on request.
//
// Files live in public/images/beyond/. Photos are cut from what she
// sent; paintings are the playground files (data/play.ts) cropped and
// lightly sharpened, colours untouched, on request. Every image is
// 480px wide (about twice the widest card) and has a small pre-blurred
// copy, `<name>-blur.webp`, that fades in on the far side of the ring:
// fading costs the browser almost nothing, a live CSS blur() doesn't.
// Regenerate both from the originals, never by editing the webp.
//
// `aspect` is width / height of the file, so a card holds its shape
// before the image loads. Alt text describes the image; confirm it.
// One talk poster and one photo with a mic, on request.

export interface BeyondPhoto {
  src: string;
  alt: string;
  aspect: number;
}

const dir = '/images/beyond/';

export const beyond = {
  title: ['Beyond', 'work'] as const,
  // Her words, as given.
  dek: 'I enjoy being around people who care about their craft, sharing what I’ve learned, and making things with my hands. I’m always up for exploring a new idea, a new trail, or a different way of seeing things :)',
  action: { label: 'More about me', href: '/about' },
  photos: [
    { src: 'talk-poster.webp', alt: 'Poster for her talk, The Saga of Accessibility, on Design Sundays', aspect: 1.78 },
    { src: 'art-porch.webp', alt: 'Her painting: a figure reading the paper on sunlit red steps', aspect: 1 },
    { src: 'blue-sculpture.webp', alt: 'At a design conference, in front of a blue sculpture', aspect: 0.75 },
    { src: 'baking-cookie.webp', alt: 'Holding a fresh cookie up to one eye at a baking class', aspect: 0.9 },
    { src: 'art-earrings.webp', alt: 'Her digital painting: a woman in profile with a hair bun and earrings', aspect: 1.33 },
    { src: 'event-selfie.webp', alt: 'A group selfie with designers at an event', aspect: 1.37 },
    { src: 'art-hermione.webp', alt: 'Her ink and watercolour drawing of Hermione with her wand', aspect: 0.73 },
    { src: 'office-garden.webp', alt: 'With a colleague in the office garden', aspect: 1.33 },
    { src: 'talk-smile.webp', alt: 'On stage with a mic, laughing at a question', aspect: 1 },
    { src: 'art-reading.webp', alt: 'Her illustration: reading on a sofa with a cup of tea', aspect: 0.85 },
    { src: 'sticky-wall.webp', alt: 'With friends at a conference wall of sticky notes', aspect: 0.56 },
    { src: 'art-green-eyes.webp', alt: 'Her digital painting: a girl with green eyes', aspect: 1.33 },
    { src: 'baking-icing.webp', alt: 'Piping chocolate onto cookies at a baking class', aspect: 0.59 },
    { src: 'meetup-group.webp', alt: 'A design meetup, everyone in one photo', aspect: 1.96 },
    { src: 'art-sage.webp', alt: 'Her digital painting: a woman with long black hair, eyes closed', aspect: 0.63 },
    { src: 'blue-sculpture-friend.webp', alt: 'With a friend in front of the blue sculpture', aspect: 0.75 },
    { src: 'office-garden-2.webp', alt: 'Arms crossed with a colleague in the office garden', aspect: 1.14 },
  ].map((p): BeyondPhoto & { soft: string } => ({
    ...p,
    src: dir + p.src,
    soft: dir + p.src.replace('.webp', '-blur.webp'),
  })),
};

// The ring, measured off andreas.vision (2026-10-17). Positions are
// fractions of the band's half-width / half-height; angles in radians.
//   angle  t = i/n·2π + turn       depth (cos t + 1)/2, 1 = nearest
//   x      sin t · spreadX          y     (0.3 + 0.7 cos t) · spreadY
//   scale  0.55 + 0.45 · depth
// Far cards fade to `fade` opacity and blur to `blur` (in CSS px).
export const ring = {
  drift: 0.16,      // rad/s at rest
  easeRate: 1.6,    // how fast speed settles back to the drift after a throw
  spreadX: 0.9,
  spreadY: 0.66,
  blur: 3,
  fade: 0.45,
  dragStart: 6,     // px of travel before a press becomes a drag
  keyKick: 1.4,     // rad/s an arrow key adds
};
