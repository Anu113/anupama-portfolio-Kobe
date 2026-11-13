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
  // portfolio". Empty for now: anupama.design is this site, so the Wix one
  // has no address of its own yet. Paste its free Wix address here (Wix
  // dashboard → Settings → Domains, e.g. https://<name>.wixsite.com/<site>)
  // and the link appears; while empty, the footer leaves it out.
  oldPortfolio: '',

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
};
