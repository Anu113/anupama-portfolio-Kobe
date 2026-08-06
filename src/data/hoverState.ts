// The single source of truth for what a project card's hover label can say.
// A card is one of exactly five states — no ad hoc label text anywhere else.
// Add a sixth only by adding it here first, so every card stays in sync.
export type HoverState = 'case-study' | 'overview' | 'website' | 'building' | 'coming-soon';

export const HOVER_LABELS: Record<HoverState, string> = {
  'case-study': 'View Case Study',
  overview: 'View Overview',
  website: 'View Website',
  building: 'Currently Building!',
  'coming-soon': 'Coming Soon',
};
