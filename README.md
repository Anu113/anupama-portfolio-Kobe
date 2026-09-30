# anupama.design — portfolio

Anupama Mishra's portfolio. Astro 5, static output, deployed on Vercel.
Styling is plain CSS on custom properties; GSAP and anime.js are there for
the few motions CSS can't express. No React, no CMS.

## Run it locally

You need **Node 22.12+**. Check with `node -v` (`nvm use 22` if it's older).

```bash
npm install
npm run dev
```

Open **http://localhost:4321**. Saves reload instantly.

```bash
npm run build     # static site → dist/
npm run preview   # serve the built site
```

## Where things live

| I want to… | Edit |
|---|---|
| Change any colour, type size, spacing or easing | `src/styles/tokens.css` |
| Change email, links, location or the role she's seeking | `src/data/site.ts` |
| Change the project list (home page and /work) | `src/data/work.ts` |
| Edit a case study | `src/data/cases.ts` |
| Edit what Moss says | `src/data/ask.ts` |
| Change the playground tiles | `src/data/play.ts` |
| Edit a page | `src/pages/*.astro` |
| Change how a piece behaves | `src/components/*.astro` (each has a header comment) |
| Drop in images | `public/images/` |

## Colour and dark mode

One palette: an off-white ground, near-black ink, warm greys and one
terracotta accent. Dark mode re-inks the same palette rather than adding a
second one, from the theme button in the nav (System / Light / Dark). Any
new colour has to go through the role tokens in `tokens.css`, or it won't
follow dark mode.

## Deploy

Vercel builds from `main`. Every pull request gets a preview URL; merging to
`main` deploys to production. `*.vercel.app` URLs are served with `noindex`
(`vercel.json`) so only the real domain shows up in search.

## Don't break

1. `<meta name="robots" content="index, follow">` in `src/layouts/Base.astro`.
   The old Wix site served `noindex`, which hid it from recruiters searching
   her name.
2. The `prefers-reduced-motion` block at the bottom of `src/styles/global.css`.
3. The skip link in `src/layouts/Base.astro`, and keyboard support on every
   interaction.
4. `overflow-x: clip` (not `hidden`) on `body` in `global.css` — `hidden`
   silently breaks every `position: sticky` on the site.

For the positioning and design rules behind all this, read `CLAUDE.md`.
