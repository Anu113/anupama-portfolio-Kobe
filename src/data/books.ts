/* Books on the About page's shelf (Bookshelf.astro) — Anupama's own,
   read off photos of her bookcase. One shelf, one book out at a time.

   Fields:
   - tone      spine/cover colour, a key into BOOKSHELF in tokens.css,
               matched to the cover shown. Its text colour comes
               from TONE_INK below.
   - spineTitle  shorter text for the spine, when the full title won't
               fit on two lines (~30 characters)
   - spine     spine width in px (default SPINE_W) — thick or thin books
   - url       optional; when set, the caption under the shelf links to it
   - art       optional cover image in /public with its pixel size in
               coverWidth / coverHeight. Without it the cover is set in
               type on the spine colour. */

export type BookTone =
  | 'red' | 'coral' | 'orange' | 'mustard' | 'yellow' | 'cream' | 'white'
  | 'tan' | 'brown' | 'olive' | 'green' | 'sage' | 'teal' | 'sky' | 'blue'
  | 'navy' | 'purple' | 'plum' | 'magenta' | 'pink' | 'grey' | 'black';

export const TONE_INK: Record<BookTone, 'light' | 'dark'> = {
  red: 'light', coral: 'dark', orange: 'dark', mustard: 'dark', yellow: 'dark',
  cream: 'dark', white: 'dark', tan: 'dark', brown: 'light', olive: 'light',
  green: 'light', sage: 'dark', teal: 'light', sky: 'dark', blue: 'light',
  navy: 'light', purple: 'light', plum: 'light', magenta: 'light', pink: 'dark',
  grey: 'light', black: 'light',
};

export interface Book {
  title: string;
  author: string;
  tone: BookTone;
  spineTitle?: string;
  spine?: number;
  url?: string;
  art?: string;
  coverWidth?: number;
  coverHeight?: number;
}

/* Picked at random from her bookcase, plus four she added. The first
   one is the book shown open when the page loads. Covers are from Open
   Library (covers.openlibrary.org); Incorruptible and Inference
   Engineering had none there, so they're typeset until she adds one. */
export const books: Book[] = [
  { title: 'The Design of Everyday Things', author: 'Don Norman', tone: 'yellow',
    art: '/images/books/design-of-everyday-things.jpg', coverWidth: 322, coverHeight: 500 },
  { title: 'The Changing World Order', author: 'Ray Dalio', tone: 'black',
    art: '/images/books/changing-world-order.jpg', coverWidth: 263, coverHeight: 400 },
  { title: 'Wanderers, Kings, Merchants', author: 'Peggy Mohan', tone: 'coral', spine: 46,
    art: '/images/books/wanderers-kings-merchants.jpg', coverWidth: 314, coverHeight: 500 },
  { title: 'Whereabouts', author: 'Jhumpa Lahiri', tone: 'tan',
    art: '/images/books/whereabouts.jpg', coverWidth: 310, coverHeight: 500 },
  { title: 'Sapiens', author: 'Yuval Noah Harari', tone: 'white',
    art: '/images/books/sapiens.jpg', coverWidth: 326, coverHeight: 500 },
  { title: 'Eat That Frog!', author: 'Brian Tracy', tone: 'white',
    art: '/images/books/eat-that-frog.jpg', coverWidth: 345, coverHeight: 475 },
  { title: 'The Art of Travel', author: 'Alain de Botton', tone: 'sky',
    art: '/images/books/art-of-travel.jpg', coverWidth: 320, coverHeight: 500 },
  { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', tone: 'black',
    art: '/images/books/fellowship-of-the-ring.jpg', coverWidth: 314, coverHeight: 500 },
  { title: 'Incorruptible', author: 'Eric Ries', tone: 'navy' },
  { title: 'Accelerando', author: 'Charles Stross', tone: 'black',
    art: '/images/books/accelerando.jpg', coverWidth: 331, coverHeight: 500 },
  { title: 'Thinking in Bets', author: 'Annie Duke', tone: 'red',
    art: '/images/books/thinking-in-bets.jpg', coverWidth: 333, coverHeight: 500 },
  { title: 'Inference Engineering', author: 'Philip Kiely', tone: 'green' },
];

/* ---- Shelf geometry --------------------------------------------------
   Shared by the server render (the first frame, book 0 open) and the
   client script (every frame after). Each book is a 3D box: a spine
   `spine` px wide and a cover `cover` px wide, BOOK_H tall. A closed
   book is turned 90° so only its spine faces out, and leans a little
   away from the open one; the open book faces front, upright. `bookBox`
   projects the box's corners to find how much shelf a book takes at any
   point between the two, so neighbours slide along as it turns. */

export const BOOK_H = 210;
export const SPINE_W = 40;
const COVER_W = 148;

/* The minimum the geometry needs per book — also what the server hands
   the client script, as JSON on each shelf. */
export interface ShelfBook {
  title: string;
  spine: number;
  cover: number;
}

export const toShelfBooks = (books: Book[]): ShelfBook[] =>
  books.map((b) => ({
    title: b.title,
    spine: b.spine ?? SPINE_W,
    cover: b.coverWidth && b.coverHeight ? (BOOK_H * b.coverWidth) / b.coverHeight : COVER_W,
  }));

/* How far book i leans when book `open` is out: more beside the gap,
   settling with distance, with a small fixed wobble per title so the row
   doesn't look machined. Degrees, negative = leaning left. */
function leanFor(books: ShelfBook[], i: number, open: number): number {
  if (i === open) return 0;
  const d = Math.abs(i - open);
  let h = 0;
  for (const ch of books[i].title) h = (31 * h + ch.charCodeAt(0)) | 0;
  const wobble = 0.65 + (Math.abs(h) % 90) / 100;
  const lean = wobble * Math.max(0.7, 1 - 0.04 * d) + Math.max(0, 1.85 - 0.26 * d);
  return Math.max(-3.4, Math.min(3.4, (i < open ? -1 : 1) * lean));
}

function bookBox(spine: number, cover: number, turnDeg: number, leanDeg: number) {
  const a = (Math.PI / 180) * turnDeg;
  const t = (Math.PI / 180) * leanDeg;
  const xs: number[] = [];
  for (const face of [{ depth: 0, edges: [0, spine] }, { depth: spine, edges: [0, cover] }])
    for (const x of face.edges)
      for (const y of [0, BOOK_H]) {
        const dy = y - BOOK_H / 2;
        xs.push((x * Math.cos(a) + face.depth * Math.sin(a)) * Math.cos(t) - dy * Math.sin(t));
      }
  const min = Math.min(...xs);
  return { width: Math.max(...xs) - min, offsetX: -min };
}

export interface BookPose {
  width: number;
  offsetX: number;
  turn: number;
  lean: number;
  frameX: number;
}

/* open[i] runs 0 (spine out) → 1 (cover out); lean[i] is the lean it
   would have closed. Returns each book's pose and how far its frame moves
   from its flex slot. */
export function layoutShelf(books: ShelfBook[], open: number[], lean: number[]): BookPose[] {
  let slot = 0;
  let x = 0;
  return books.map((b, i) => {
    const closed = 1 - Math.max(0, Math.min(1, open[i]));
    const turn = 90 * closed;
    const tilt = lean[i] * closed;
    const box = bookBox(b.spine, b.cover, turn, tilt);
    const pose = { ...box, turn, lean: tilt, frameX: x - slot };
    slot += b.spine + 1;
    x += box.width + 1;
    return pose;
  });
}

export const openState = (books: ShelfBook[], n: number) => books.map((_, i) => +(i === n));
export const leanState = (books: ShelfBook[], n: number) => books.map((_, i) => leanFor(books, i, n));

/* The widest the row ever gets (whichever book is open), so the shelf
   can scale to fit its column without jumping as books change. */
export const shelfWidth = (books: ShelfBook[]) =>
  Math.max(
    ...books.map((_, n) =>
      layoutShelf(books, openState(books, n), leanState(books, n)).reduce(
        (sum, p, i) => sum + p.width + (i === books.length - 1 ? 0 : 1),
        0
      )
    )
  );
