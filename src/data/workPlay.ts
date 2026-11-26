// workPlay.ts — what each /work tile shows (WorkStage.astro).
//
// Chosen on request (2026-11-16) from experiments/work-phones, design N
// "Hover play": one iPhone on the project hue, at rest on the flow's
// first screen; hover or focus the card and the flow plays itself — a
// tap mark lands where a person would press, the next screen arrives the
// way iOS brings it (push, sheet, alert, scroll), then it holds and loops.
// Okta IAM is desktop work, so it sits on a MacBook with the phone in
// front, still.
//
// Screens are her own, redrawn on one iOS grid in the experiment and
// rendered to 2x images by scripts/work-play-render.mjs (licensed brand
// type stays off the site). Illustrations and photos inside them are cut
// from her exports and boards, never redrawn. Positions (`tap`, `scan`,
// `spinner`) are shares of the 393 × 852 screen, measured off the
// experiment's render.html (window.measure()).
//
// Keyed by the case's href. A case without an entry keeps its picture.
//
// `ground` is what the device stands on (on request, 2026-11-16, the
// "Mix" of experiments/work-phones, round 17): not a photo on every
// tile, so the grid has a rhythm and the photos read as moments. Three
// kinds: a photo under a dark wash, the same kind of photo blurred to a
// soft texture, or a colour block (the project hue as a lit gradient).
// The photos are stand-ins taken from the companies' own sites, to be
// swapped for licensed or her own photos (live as stand-ins for now).

const I = (n: string) => `/images/work-play/${n}.webp`;
const G = (n: string) => `/images/work-play/ground/${n}.webp`;

export type Enter = 'push' | 'sheet' | 'alert' | 'scroll' | 'fade';
type Pt = { x: number; y: number };
type Box = Pt & { w: number; h: number };

export interface PlayStep {
  src: string;                 // the screen, or the layer under a sheet / alert
  over?: string;               // the sheet or alert itself (transparent)
  enter?: Enter;               // how this screen arrives (default push)
  tap?: Pt;                    // where the visitor taps to move on
  swipe?: Pt;                  // or where they swipe up from (tall screens)
  tall?: number;               // a tall screen's height in pt (it scrolls)
  bar?: string;                // the bar that stays put over a tall screen
  scrolled?: boolean;          // the tall screen, scrolled to its end
  dwell?: number;              // ms to stay before the next tap, if not --work-read
  spinner?: Box;               // a loading ring, turned in CSS
  scan?: { frame: Box; hit: Box; sheet: string; bar: string };   // Scan & Go's scan
}

export interface Ground {
  kind: 'photo' | 'blur' | 'colour';
  photo?: string;              // photo and blur (the blur is baked into the image)
  pos?: string;                // background-position
  size?: string;               // background-size, when the crop is tighter than cover
}

export interface Play {
  label: string;               // what the flow shows, for screen readers
  steps: PlayStep[];
  ground?: Ground;
}

export interface Desk {
  label: string;
  ground?: Ground;
  desk: string;                // 16:10 laptop screen
  phone: string;               // phone screen, 393 × 852
}

export const workPlay: Record<string, Play | Desk> = {
  '/work/okta-iam': {
    label: "Okta's My Apps dashboard on a laptop, and on a phone",
    desk: I('okta-desk'), phone: I('okta-phone'),
    ground: { kind: 'colour' },
  },

  // Okta AI agents (on request, 2026-11-26): its laptop and phone screens,
  // rendered from experiments/okta-perception (?shot=desk, ?shot=phone).
  '/work/okta-ai-agents': {
    label: 'Okta AI on a laptop and a phone: the Admin Console dashboard with a finding that needs the admin, and the same finding on mobile',
    desk: I('okta-ai-desk'), phone: I('okta-ai-phone'),
    ground: { kind: 'colour' },
  },

  '/work/paypal-privacy': {
    label: 'The flow: Shopping, a reminder to review privacy settings, then the redesigned Data and privacy hub',
    ground: { kind: 'blur', photo: G('privacy-blur') },
    steps: [
      { src: I('pv-shopping'), tap: { x: 40.08, y: 32.53 } },
      { src: I('pv-hub'), tall: 1224, bar: I('pv-hub-bar'), swipe: { x: 50, y: 74 }, dwell: 1100 },
      { src: I('pv-hub'), tall: 1224, bar: I('pv-hub-bar'), scrolled: true, enter: 'scroll', dwell: 1400 },
    ],
  },

  '/work/walmart-scan-go': {
    label: 'The flow: scanning a jar of mustard, the cart, then checking out at a self-checkout',
    ground: { kind: 'blur', photo: G('scan-blur') },
    steps: [
      { src: I('sg-scan-base'), tap: { x: 86.47, y: 93.78 }, dwell: 3300,
        scan: { frame: { x: 49.75, y: 40.08, w: 54.2, h: 30.63 }, hit: { x: 25.19, y: 46.6, w: 20.36, h: 6.34 },
                sheet: I('sg-scan-sheet'), bar: I('sg-scan-bar') } },
      { src: I('sg-cart'), tap: { x: 73.22, y: 92.02 } },
      { src: I('sg-finish') },
    ],
  },

  '/work/walmart-chase-pay': {
    label: 'The flow: choosing Chase Pay in Walmart Pay set-up, its benefits, then Walmart Pay settings',
    ground: { kind: 'photo', photo: G('chase'), pos: '74% 42%', size: '165% auto' },
    steps: [
      { src: I('ch-setup'), tap: { x: 50, y: 42.62 } },
      { src: I('ch-benefits'), tap: { x: 50, y: 85.45 } },
      { src: I('ch-settings') },
    ],
  },

  '/work/paypal-debit-card': {
    label: 'The flow: setting up a PayPal Balance account, confirming identity, then the card being set up',
    ground: { kind: 'colour' },
    steps: [
      { src: I('debit-intro'), tap: { x: 50, y: 92.02 } },
      { src: I('debit-confirm'), tap: { x: 50, y: 92.02 } },
      { src: I('debit-setup'), spinner: { x: 50, y: 69.88, w: 11.2, h: 5.16 } },
    ],
  },

  '/work/paypal-id-proofing': {
    label: 'The flow: verify your ID in two steps, scan your photo ID, then the camera permission',
    ground: { kind: 'photo', photo: G('id-card'), pos: '50% 40%' },
    steps: [
      { src: I('id-steps'), tap: { x: 50, y: 85.45 } },
      { src: I('id-scan'), tap: { x: 50, y: 85.45 } },
      { src: I('id-camera-under'), over: I('id-camera-alert'), enter: 'alert' },
    ],
  },

  '/work/paypal-ads-consent': {
    label: 'The flow: Data and Privacy, the privacy checkup asking about ads, then Online ad preferences',
    ground: { kind: 'photo', photo: G('ads'), pos: '60% 60%' },
    steps: [
      { src: I('ads-privacy'), tap: { x: 39.07, y: 30.01 } },
      { src: I('ads-checkup-under'), over: I('ads-checkup-sheet'), enter: 'sheet', tap: { x: 26.78, y: 92.02 } },
      { src: I('ads-prefs') },
    ],
  },
};

export const isPlay = (p: Play | Desk | undefined): p is Play => !!p && 'steps' in p;
