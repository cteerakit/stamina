export const SKYRIM_BAR_COLORS = ['mana', 'health', 'stamina'] as const;

export type SkyrimBarColor = (typeof SKYRIM_BAR_COLORS)[number];

export interface SkyrimGradientStop {
  offset: string;
  color: string;
  opacity?: number;
}

export interface SkyrimBarColorOption {
  id: SkyrimBarColor;
  label: string;
  /** Mid-tone for settings swatch */
  preview: string;
  /** Toolbar badge color */
  badgeHex: string;
  /** Vertical cylindrical highlight */
  verticalStops: SkyrimGradientStop[];
  /** Horizontal center glow overlay */
  horizontalStops: SkyrimGradientStop[];
}

export const SKYRIM_BAR_COLOR_OPTIONS: SkyrimBarColorOption[] = [
  {
    id: 'mana',
    label: 'Mana',
    preview: '#4a9fd4',
    badgeHex: '#2a7ab8',
    verticalStops: [
      { offset: '0%', color: '#0f2840' },
      { offset: '28%', color: '#2a6a9a' },
      { offset: '50%', color: '#6eb8e8' },
      { offset: '72%', color: '#2a6a9a' },
      { offset: '100%', color: '#0f2840' },
    ],
    horizontalStops: [
      { offset: '0%', color: '#050f1a', opacity: 0.55 },
      { offset: '50%', color: '#ffffff', opacity: 0.22 },
      { offset: '100%', color: '#050f1a', opacity: 0.55 },
    ],
  },
  {
    id: 'health',
    label: 'Health',
    preview: '#d64545',
    badgeHex: '#c03030',
    verticalStops: [
      { offset: '0%', color: '#4a1212' },
      { offset: '28%', color: '#b83838' },
      { offset: '50%', color: '#f08080' },
      { offset: '72%', color: '#b83838' },
      { offset: '100%', color: '#4a1212' },
    ],
    horizontalStops: [
      { offset: '0%', color: '#1a0505', opacity: 0.55 },
      { offset: '50%', color: '#ffffff', opacity: 0.22 },
      { offset: '100%', color: '#1a0505', opacity: 0.55 },
    ],
  },
  {
    id: 'stamina',
    label: 'Stamina',
    preview: '#4db83a',
    badgeHex: '#3d9a2e',
    verticalStops: [
      { offset: '0%', color: '#1a3a12' },
      { offset: '28%', color: '#3d9a2e' },
      { offset: '50%', color: '#7ed66a' },
      { offset: '72%', color: '#3d9a2e' },
      { offset: '100%', color: '#1a3a12' },
    ],
    horizontalStops: [
      { offset: '0%', color: '#0a1a05', opacity: 0.55 },
      { offset: '50%', color: '#ffffff', opacity: 0.2 },
      { offset: '100%', color: '#0a1a05', opacity: 0.55 },
    ],
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
