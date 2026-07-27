// Content for the two new home-page bands.

// The logo strip under the hero. `src` is optional: with no file the strip
// sets the name as type, which is what it does today. Drop a mono SVG into
// /public/images/logos/ and add `src` and the strip masks it in --fg, so it
// recolours with the band and in night mode like everything else.
// NOTE: company logos are trademarks. Check what each brand's guidelines
// allow before shipping real marks on a personal site.
export const companies = [
  { label: 'Okta' },
  { label: 'PayPal' },
  { label: 'Walmart Labs' },
  { label: 'Deloitte Digital' },
  { label: 'Zomato' },
];

// PLACEHOLDER TESTIMONIALS. Every word here is a stand-in written to hold
// the layout — none of it was said by anyone. Replace with real quotes,
// cleared with the person who said them, before this site goes anywhere
// near a recruiter. A fabricated endorsement attributed to a named colleague
// is the one thing on this site that could actually cost her the role.
export const testimonials = [
  {
    quote:
      '[Two or three sentences from her manager at Okta, on a call she made that changed the product. Ask for something specific — a decision, not an adjective.]',
    name: '[Name]',
    role: '[Title], Okta',
  },
  {
    quote:
      '[A designer who worked alongside her, on how she handled a hard call or raised the bar on the work. The most useful quote on the page — hiring managers read this one closely.]',
    name: '[Name]',
    role: '[Title], Okta',
  },
  {
    quote:
      '[A partner from outside design — engineering or product — on what it was like to work with her team. Cross-functional voices carry more weight than design ones here.]',
    name: '[Name]',
    role: '[Title], [Company]',
  },
];
