// The About page (pages/about.astro). On request (2026-11-11), from
// rounds of mocks in experiments/about-grid/ ("Half and half", "Fan
// out"): her portrait on the left, held while her words and the tabs
// scroll beside it, then three tiles of fanned photos.
//
// The tabs and Moss's field keep andreas.vision/about's structure
// (2026-10-17). Facts come from site.ts, work.ts, books.ts and
// beyond.ts (her photos and paintings, alt text as there). Bracketed
// values are hers to confirm, same convention as cases.ts. His
// Testimonials and Tools tabs aren't here: she has no Okta-era quote yet
// and her tools aren't on the site.

import { work } from './work';
import { books } from './books';

const b = '/images/beyond/';

// ---- Tabs ----------------------------------------------------------
export interface Row {
  tile: { src?: string; letter?: string; hue?: string };
  name: string;
  tag?: string;
  year?: string;
  line: string;
  href?: string;
  site?: { label: string; href: string };   // a link after the line
}

// Also listed on /work, under the Archive (ExperienceList.astro).
// Titles (her last at each) and years from her LinkedIn (checked
// 2026-11-13). Lines after felixrieseberg.com's Work list: what the work
// was, in one or two plain sentences, then the company's site. Facts from
// her LinkedIn and cases.ts only. Logos from each company's own site or
// Wikimedia Commons, set on 128px squares in public/images/logos/.
const logo = '/images/logos/';
export const experience: Row[] = [
  { tile: { src: logo + 'okta.webp' }, name: 'Okta', tag: 'Staff Product Designer', year: '2024–now',
    line: 'Identity and access management for the admins who decide who gets in: entitlements, access reviews and policy, plus the integration flows developers build on. I lead a team of six.',
    site: { label: 'okta.com', href: 'https://www.okta.com' } },
  { tile: { src: logo + 'paypal.webp' }, name: 'PayPal', tag: 'Lead UX Designer', year: '2021–2024',
    line: 'Three years on privacy and trust across PayPal, Venmo and Honey: the privacy center, ads consent, ID verification and the Debit Card. I joined as a product designer and left leading UX for Global Data & Privacy.',
    site: { label: 'paypal.com', href: 'https://www.paypal.com' } },
  { tile: { src: logo + 'walmart.webp' }, name: 'Walmart Labs', tag: 'User Experience Designer', year: '2019–2021',
    line: 'Two years on tools for merchants, suppliers and Walmart’s own people, plus Walmart Pay with Chase Pay and Scan & Go. I led interaction design on the design system.',
    site: { label: 'walmart.com', href: 'https://www.walmart.com' } },
  { tile: { src: logo + 'deloitte.webp' }, name: 'Deloitte Digital', tag: 'User Experience Designer', year: '2017–2019',
    line: 'Client work from Bengaluru in finance, healthcare and the public sector, among it Mint’s credit score, personal loans for RatanIndia and quick loans for Dialog in Sri Lanka.',
    site: { label: 'deloittedigital.com', href: 'https://www.deloittedigital.com' } },
  { tile: { src: logo + 'zomato.webp' }, name: 'Zomato', tag: 'User Interface Designer', year: '2015–2016',
    line: 'A year on product, web, branding and marketing design across Zomato’s consumer products.',
    site: { label: 'zomato.com', href: 'https://www.zomato.com' } },
];

const cases: Row[] = work.slice(0, 6).map((w) => ({
  tile: { src: w.image },
  name: w.company,
  tag: w.title,
  line: w.tagline,
  href: w.href,
}));

const shelf: Row[] = books.map((bk) => ({
  tile: { src: bk.art },
  name: bk.title,
  line: bk.author,
}));

export const tabs = [
  { id: 'experience', label: 'Experience', rows: experience },
  { id: 'cases', label: 'Case studies', rows: cases },
  { id: 'books', label: 'Books', rows: shelf },
];

// ---- Portrait ------------------------------------------------------
// Her photo as given (camera looks and a cutout were tried in the mocks
// and turned down), with her porch painting as a stamp. No post-it.
export const portrait = {
  src: '/images/about/anupama-portrait.png', width: 1254, height: 1254,
  alt: 'Portrait of Anupama Mishra',
  stamp: b + 'art-porch.webp',
};

// ---- Tiles ---------------------------------------------------------
// Each a fanned stack of up to five photos: the first in front, the
// rest out to the sides. Captions in her words; no talk title, on
// request.
export interface Tile {
  title: string;      // for this file only; captions show without it, on request
  caption: string;
  shots: { src: string; alt: string }[];
}

export const tiles: Tile[] = [
  { title: 'Talks and people', caption: 'On stage, at design meetups, and with my design community', shots: [
    { src: b + 'talk-smile.webp', alt: 'On stage with a mic, laughing at a question' },
    { src: b + 'talk-poster.webp', alt: 'Poster for her talk, The Saga of Accessibility, on Design Sundays' },
    { src: b + 'sticky-wall.webp', alt: 'With friends at a conference wall of sticky notes' },
    { src: b + 'event-selfie.webp', alt: 'A group selfie with designers at an event' },
  ] },
  { title: 'Making', caption: 'Painting, baking, and writing poems and books', shots: [
    { src: b + 'art-sage.webp', alt: 'Her digital painting: a woman with long black hair, eyes closed' },
    { src: b + 'baking-icing.webp', alt: 'Piping chocolate onto cookies at a baking class' },
    { src: b + 'art-hermione.webp', alt: 'Her ink and watercolour drawing of Hermione with her wand' },
    { src: b + 'baking-cookie.webp', alt: 'Holding a fresh cookie up to one eye at a baking class' },
    { src: b + 'art-green-eyes.webp', alt: 'Her digital painting: a girl with green eyes' },
  ] },
  // Travel and Food: her photos (2026-11-11), captions in the reference's
  // casual voice, on request ("broadening my horizons", "foodie ofc").
  { title: 'Travel', caption: 'Broadening my horizons, one trip at a time <3', shots: [
    { src: b + 'travel-pagoda.webp', alt: 'A red pagoda against a clear blue sky' },
    { src: b + 'travel-fuji.webp', alt: 'Mount Fuji’s snowy peak above the road, between green hills' },
    { src: b + 'travel-otagi.webp', alt: 'Holding up a temple ticket in front of the wooden hall at Otagi Nenbutsu-ji, Kyoto' },
    { src: b + 'travel-lake.webp', alt: 'A still lake under forested hills on a grey day, an egret at the water’s edge' },
    { src: b + 'travel-octopus.webp', alt: 'A street with a giant red octopus sign over a restaurant' },
  ] },
  { title: 'Food', caption: 'Also a big foodie, ofc ;)', shots: [
    { src: b + 'food-noodles.webp', alt: 'A spread of noodles, curry and small bowls of toppings on a wooden tray' },
    { src: b + 'food-burger.webp', alt: 'A burger and a stuffed garlic bread at a café table' },
    { src: b + 'food-sandwich.webp', alt: 'A tall stack of club sandwich halves' },
    { src: b + 'food-fruit.webp', alt: 'Banana on toast and a bowl of cut fruit on a blue table' },
    { src: b + 'food-drink.webp', alt: 'A drink with a dried orange slice, seen from above' },
  ] },
  { title: 'Books', caption: 'Some of the ten on my shelf', shots: books.slice(0, 5).map((bk) => ({
    src: bk.art!, alt: `${bk.title}, ${bk.author}`,
  })) },
];

// ---- Song ----------------------------------------------------------
// The record player tile (RecordPlayer.astro): her playlist, "My
// Playlist #2026" on Spotify (given 2026-11-11). Pressing play plays the
// real tracks, one after another, through Spotify's own embedded player
// (on request, 2026-11-11: it used to play a made-up stand-in tune). The
// player is only loaded after that press, so a visitor who never presses
// play never contacts Spotify; once loaded it sets Spotify's cookies.
// Visitors signed in to Spotify hear whole tracks, everyone else Spotify's
// 30-second previews. `tracks` are the playlist's songs as listed on
// 2026-11-11 (it had two then; it once had Ishq, Another Man and Rani,
// whose covers are still in /public/images/about/covers/): `uri` is the
// track's Spotify id, from its share link. Add a track here when she adds
// one to the playlist, with its cover saved into covers/ so the label
// never fetches from Spotify. The Spotify key opens the playlist itself.
const cv = '/images/about/covers/';
export interface Track { title: string; artist: string; cover: string; uri: string }
export const song: { title: string; url: string; tracks: Track[] } = {
  title: 'My Playlist #2026',
  url: 'https://open.spotify.com/playlist/17iWY4vCkVxZGIbwsTYNUO',
  tracks: [
    { title: 'I Luv U', artist: 'Fred again..', cover: cv + 'i-luv-u.jpg', uri: 'spotify:track:7MRKWuWtDTOz76kDiqkKZh' },
    { title: 'Candy', artist: 'Lifafa', cover: cv + 'candy.jpg', uri: 'spotify:track:3eNVm12Ns8BOk4NqgWcGI4' },
  ],
};
