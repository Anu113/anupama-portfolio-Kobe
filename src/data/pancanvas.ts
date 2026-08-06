// Tiles for /playground/canvas — a second, experimental playground page.
// Unlike src/data/play.ts (real drawings, used by the InfiniteStream on
// /playground), these are placeholder "studies": flat colour blocks standing
// in for the kind of side-sketch a designer accumulates — palette tests,
// spacing scales, icon sets. Swap the tint/caption pairs for real crops
// whenever there's actual scrap work to show; the layout doesn't change.
//
// `left`/`top`/`width` are percentages of one canvas cell (see PanCanvas.astro)
// and `aspect` is a CSS aspect-ratio. Positions are hand-placed, not
// generated, so the scatter reads as loose rather than a jittered grid.
export interface CanvasTile {
  label: string;
  description: string;
  tint: string;   // a --tint-*/--swatch-* token from tokens.css
  left: number;
  top: number;
  width: number;
  aspect: string;
}

export const canvasTiles: CanvasTile[] = [
  { label: 'Color study', description: 'Palette options tested against the sand theme’s two greens.', tint: 'var(--swatch-sand)', left: 4, top: 8, width: 20, aspect: '4/3' },
  { label: 'Type study', description: 'A condensed display face, checked at caption size.', tint: 'var(--tint-oat)', left: 30, top: 4, width: 16, aspect: '1/1' },
  { label: 'Grid study', description: 'An 8-point spacing scale, stress-tested.', tint: 'var(--swatch-sage)', left: 52, top: 10, width: 22, aspect: '5/4' },
  { label: 'Pattern study', description: 'A tile pattern built from CSS custom properties.', tint: 'var(--tint-mauve)', left: 80, top: 6, width: 16, aspect: '3/4' },
  { label: 'Motion study', description: 'Easing curves lined up side by side.', tint: 'var(--tint-sage)', left: 10, top: 38, width: 18, aspect: '16/10' },
  { label: 'Component study', description: 'Button states, spelled out one by one.', tint: 'var(--swatch-lilac)', left: 34, top: 42, width: 20, aspect: '1/1' },
  { label: 'Icon study', description: 'A rounded glyph set for a finance dashboard.', tint: 'var(--tint-shell)', left: 60, top: 36, width: 14, aspect: '4/5' },
  { label: 'Layout study', description: 'Card grids tried at three breakpoints.', tint: 'var(--swatch-coral)', left: 80, top: 40, width: 18, aspect: '4/3' },
  { label: 'Contrast study', description: 'AA pairs checked at body text size.', tint: 'var(--tint-clay)', left: 4, top: 68, width: 16, aspect: '3/4' },
  { label: 'Texture study', description: 'Noise and grain, for empty states.', tint: 'var(--tint-stone)', left: 26, top: 72, width: 20, aspect: '5/4' },
  { label: 'Spacing study', description: 'Line height and measure, tuned together.', tint: 'var(--swatch-clay)', left: 54, top: 70, width: 22, aspect: '4/3' },
  { label: 'Palette study', description: 'A warm-to-cool ramp for a dark theme.', tint: 'var(--tint-oat)', left: 82, top: 74, width: 15, aspect: '1/1' },
];
