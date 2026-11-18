// Single source of truth for the small stuff.
export const site = {
  name: 'Anupama Mishra',
  mark: 'A.',
  tagline: 'Staff product designer. Fintech first, then enterprise software and developer tools.',
  // Her one address — there is no @anupama.design mailbox. The footer
  // sign-off's "Let's connect and chat" opens a Gmail compose window to it.
  email: 'anupama.mishra113@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anupamamishra/',
  // Her old Wix portfolio, linked from the footer's page links as "Old
  // portfolio". anupama.design is this site, so this is the Wix one's free
  // address. Set it to '' and the footer leaves the link out.
  oldPortfolio: 'https://anupamamishra113.wixsite.com/my-site-1',

  // The role being sought, written down once. Every band that states the ask
  // reads it from here — the home page, /about and the footer each carried
  // their own wording and drifted apart into "Design Manager or Lead UX".
  // The site sells a senior IC: leading six designers at Okta is evidence of
  // scope, not the job she's asking for. Staff or Lead, not tied to remote:
  // don't add a location condition to the ask.
  seeking: 'Staff or Lead Product Designer',
  ask: 'Staff or Lead Product Designer role',

  // The footer's location line and its live clock. `timezone` is an IANA
  // zone — the clock reads in her time, not the visitor's, which is the
  // point of it. Confirmed: she's in Bangalore, IST.
  location: 'Bangalore',
  // The hero's location line (LocalTime.astro): BANGALORE,IN, and the
  // point its live weather is fetched for.
  countryCode: 'IN',
  coords: { lat: 12.9716, lon: 77.5946 },
  timezone: 'Asia/Kolkata',

  // Password protection (on request, 2026-11-18; picks from the mocks in
  // experiments/password-lock/). ONE passcode opens everything: typed once
  // — on the whole-site gate, a locked case's page, or a case's inline
  // gate — it unlocks the site and every locked case on that browser for
  // `rememberHours` (scripts/unlock.ts).
  //   site     — the whole site behind the frosted gate (SiteGate.astro).
  //              Off by default; turn it on only while it's needed. The
  //              page underneath still ships in the HTML.
  //   cases    — which case studies are locked (lockFor() in cases.ts):
  //              'none'   — nothing locked; the gates and frost stay in
  //                         the code, unmounted (on request, 2026-11-18:
  //                         "don't lock any case studies now")
  //              'marked' — only cases with `locked` in cases.ts (Okta)
  //              'all'    — every case study
  //              Locked cards frost on hover (LockFrost.astro).
  // A static site has nowhere to check a passcode but the browser, so
  // this deters casual visitors; it is not confidentiality. For real
  // privacy, password-protect the deployment at the host (Vercel/Netlify).
  // [Placeholder passcode — replace before sharing the link.]
  lock: {
    passcode: 'okta2026',
    site: false,
    cases: 'none' as 'none' | 'marked' | 'all',
    rememberHours: 12,
  },

  // "Now" on the home page (Now.astro), in her words.
  now: {
    text: "Right now I'm thinking about trust: specifically, how much of it AI tools have actually earned versus assumed. Watching how background agents and parallel workflows are reshaping what engineering work even needs to be real-time anymore.",
  },
};

/* Every "email me" on the site opens Gmail's compose window to
   site.email in a new tab (there is no mailbox app to assume), with an
   optional subject. One place, so the footer, About, the case pages and
   the passcode gates all go the same way. */
export const gmailCompose = (subject?: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}` +
  (subject ? `&su=${encodeURIComponent(subject)}` : '');
