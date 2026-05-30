export const SKYRIM_BAR_COLORS = ['mana', 'health', 'stamina'] as const;

export type SkyrimBarColor = (typeof SKYRIM_BAR_COLORS)[number];

export interface SkyrimHighlightStop {
  offset: string;
  opacity: number;
}

export interface SkyrimBarColorOption {
  id: SkyrimBarColor;
  label: string;
  /** Mid-tone for settings swatch */
  preview: string;
  /** Toolbar badge color */
  badgeHex: string;
  /** Source asset (radial + linear gloss) */
  asset: string;
  /** Horizontal center glow */
  radialCenter: string;
  radialEdge: string;
  /** Vertical gloss strength; defaults to shared stops + 0.5 opacity */
  glossOpacity?: number;
  highlightStops?: SkyrimHighlightStop[];
}

/** Vertical gloss — shared by assets/skyrim-bar-*.svg linear layers */
export const SKYRIM_BAR_HIGHLIGHT_STOPS: SkyrimHighlightStop[] = [
  { offset: '0', opacity: 0 },
  { offset: '0.15', opacity: 0.1 },
  { offset: '0.4', opacity: 0.5 },
  { offset: '0.5', opacity: 1 },
  { offset: '0.6', opacity: 0 },
];

export const SKYRIM_BAR_COLOR_OPTIONS: SkyrimBarColorOption[] = [
  {
    id: 'mana',
    label: 'Magicka',
    preview: '#2547ab',
    badgeHex: '#2547ab',
    asset: 'assets/skyrim-bar-magicka.svg',
    radialCenter: '#2547AB',
    radialEdge: '#130E82',
  },
  {
    id: 'health',
    label: 'Health',
    preview: '#ff000e',
    badgeHex: '#b60613',
    asset: 'assets/skyrim-bar-health.svg',
    radialCenter: '#FF000E',
    radialEdge: '#741514',
  },
  {
    id: 'stamina',
    label: 'Stamina',
    preview: '#3a7a57',
    badgeHex: '#3a7a57',
    asset: 'assets/skyrim-bar-stamina.svg',
    radialCenter: '#3A7A57',
    radialEdge: '#113D1C',
  },
];

const LEGACY_BAR_COLOR: Record<string, SkyrimBarColor> = {
  blue: 'mana',
  red: 'health',
  green: 'stamina',
};

export function isSkyrimBarColor(value: unknown): value is SkyrimBarColor {
  return (
    typeof value === 'string' &&
    SKYRIM_BAR_COLORS.includes(value as SkyrimBarColor)
  );
}

export function normalizeSkyrimBarColor(value: unknown): SkyrimBarColor {
  if (isSkyrimBarColor(value)) return value;
  if (typeof value === 'string' && value in LEGACY_BAR_COLOR) {
    return LEGACY_BAR_COLOR[value];
  }
  return 'health';
}

export function getSkyrimBarColorOption(
  color: SkyrimBarColor,
): SkyrimBarColorOption {
  return (
    SKYRIM_BAR_COLOR_OPTIONS.find((o) => o.id === color) ??
    SKYRIM_BAR_COLOR_OPTIONS[1]
  );
}

export function skyrimBarPreviewCss(option: SkyrimBarColorOption): string {
  return `radial-gradient(ellipse 100% 100% at 50% 50%, ${option.radialCenter}, ${option.radialEdge})`;
}
