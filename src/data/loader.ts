// The first-paint loader (Loader.astro): her watercolour character walks
// across a cream screen, once per visit, on the home page.
//
// TO SWAP THE CHARACTER, change `sprite` below (and its grid, if the new
// sheet has a different one). Nothing else needs touching. Until the file
// exists the loader doesn't render at all (checked at build time), so the
// site never shows an empty cream screen.
//
// The sheet is cut from her 4s walking clip by scripts/walk-sprite.py:
// one full stride (two steps, 51 frames at the clip's 24fps) that loops
// seamlessly, matted to transparent with her ground shadow kept. A sprite rather than
// the video itself: transparency works in every browser (Safari can't
// show a transparent webm), and the page steps it from the same clock
// that moves her, so her legs and her travel can't drift apart. Re-run the script on a new clip
// rather than editing the webp.

export const loader = {
  sprite: '/images/loader/walk-sprite.webp',
  frames: 51,
  cols: 8,
  rows: 7,
  /** One cell, in sprite pixels, its 4px clear gutter included. Sets her aspect ratio. */
  cellW: 392,
  cellH: 568,
  /** The clip's frame rate: the stride's natural speed. */
  fps: 24,
  /** The frame she stands on under reduced motion: feet together. */
  still: 4,
  /** Paths where a first visit gets the loader. Home only: a recruiter
      deep-linked to a case study came for the case study. */
  pages: ['/'],
};
