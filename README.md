# anupama.design — portfolio

Astro + Tailwind. Case studies in Markdown. No animation library.

## Run it locally

You need **Node 18+**. Check with `node -v`.

```bash
cd anupama-portfolio
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
| Change any colour, type size, or spacing | `src/styles/tokens.css` |
| Change email / links / one-liners | `src/data/site.ts` |
| Edit the home page | `src/pages/index.astro` |
| Write a case study | `src/content/work/*.md` |
| Change how a piece behaves | `src/components/*.astro` |
| Drop in images | `public/images/` |
| Store inspiration screenshots | `public/reference/` |

## Themes

Each band of the page picks a palette. The nav recolours to match whatever
is behind it.

```astro
<Section theme="ink">…</Section>    <!-- warm near-black -->
<Section theme="sand">…</Section>   <!-- sand + green -->
<Section theme="bone">…</Section>   <!-- cream + near-black -->
<Section theme="clay">…</Section>   <!-- deep brown -->
```

Add a palette by copying a `[data-theme='…']` block in `tokens.css`.

## Deploy

Push to GitHub, then import the repo at vercel.com. Framework preset:
**Astro**. No configuration needed. Point the domain at it when ready.

## Two things not to break

1. `<meta name="robots" content="index, follow">` in `src/layouts/Base.astro`.
   The old Wix site was serving `noindex`, which made it invisible to
   recruiters searching her name.
2. The `prefers-reduced-motion` block at the bottom of `src/styles/global.css`.
   It's what keeps the motion accessible.
