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
}

const experience: Row[] = [
  { tile: { letter: 'O' }, name: 'Okta', tag: 'Staff Product Designer', year: '[2021]–[2025]',
    line: 'Identity & Access Management. Led a team of six.' },
  { tile: { letter: 'P' }, name: 'PayPal', tag: 'Product designer', year: '[2019]–[2021]',
    line: 'Privacy settings, ads consent, the Debit Card.' },
  { tile: { letter: 'W' }, name: 'Walmart Labs', tag: 'Product designer', year: '2019–2021',
    line: 'Walmart Pay, Chase Pay and Scan & Go.' },
  { tile: { letter: 'D' }, name: 'Deloitte Digital', tag: 'Experience designer', year: '[2014]–[2017]',
    line: 'Enterprise clients, mostly financial services.' },
  { tile: { letter: 'Z' }, name: 'Zomato', tag: 'Designer', year: '[2013]–[2014]',
    line: 'Consumer product, early team.' },
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
    { src: b + 'office-garden.webp', alt: 'With a colleague in the office garden' },
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
// Playlist #2026" on Spotify (given 2026-11-11). While it plays, the
// player steps through the first tracks, read off the playlist that day:
// the display scrolls one track and the record's label shows that
// track's cover. Covers were saved from Spotify's image server into
// /public/images/about/covers/ so visitors' browsers never contact
// Spotify to show them; refresh them if the playlist changes. The
// Spotify key opens the playlist in a new tab (no embed: Spotify's
// player sets third-party cookies). If she adds a short clip she has
// the rights to in /public (`audio`), the play key plays it; until then
// a tune made in the browser stands in.
const cv = '/images/about/covers/';
export interface Track { title: string; artist: string; cover: string }
export const song: { title: string; url: string; tracks: Track[]; audio?: string } = {
  title: 'My Playlist #2026',
  url: 'https://open.spotify.com/playlist/17iWY4vCkVxZGIbwsTYNUO',
  tracks: [
    { title: 'I Luv U', artist: 'Fred again..', cover: cv + 'i-luv-u.jpg' },
    { title: 'Candy', artist: 'Lifafa', cover: cv + 'candy.jpg' },
    { title: 'Ishq', artist: 'Donn Bhat', cover: cv + 'ishq.jpg' },
    { title: 'Another Man', artist: 'Donn Bhat', cover: cv + 'another-man.jpg' },
    { title: 'Rani', artist: 'MALFNKTION', cover: cv + 'rani.jpg' },
  ],
};
