export const TIMER_THEMES = [
  'classic',
  'midnight',
  'ocean',
  'sunset',
  'forest',
  'lavender',
] as const;

export type TimerTheme = (typeof TIMER_THEMES)[number];

export interface TimerThemeOption {
  id: TimerTheme;
  label: string;
  description: string;
  /** Swatch for focus phase */
  previewFocus: string;
  /** Swatch for break phase */
  previewBreak: string;
}

export const TIMER_THEME_OPTIONS: TimerThemeOption[] = [
  {
    id: 'classic',
    label: 'Classic',
    description: 'OG arena—crimson grinds, green recovery',
    previewFocus: '#e11d48',
    previewBreak: '#008453',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    description: 'Night raid—rose grinds, mint cooldowns',
    previewFocus: '#fb7185',
    previewBreak: '#34d399',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    description: 'Deep dive—azure grinds, tidal recovery',
    previewFocus: '#2563eb',
    previewBreak: '#0891b2',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    description: 'Golden hour—ember grinds, amber rests',
    previewFocus: '#ea580c',
    previewBreak: '#ca8a04',
  },
  {
    id: 'forest',
    label: 'Forest',
    description: 'Wild path—moss grinds, leaf recovery',
    previewFocus: '#166534',
    previewBreak: '#65a30d',
  },
  {
    id: 'lavender',
    label: 'Lavender',
    description: 'Arcane hall—violet grinds, lilac cooldowns',
    previewFocus: '#7c3aed',
    previewBreak: '#a855f7',
  },
];

const THEME_HEX: Record<
  TimerTheme,
  { focus: string; break: string; focusFg: string; breakFg: string }
> = {
  classic: {
    focus: '#e11d48',
    break: '#008453',
    focusFg: '#fff1f2',
    breakFg: '#f0fdf4',
  },
  midnight: {
    focus: '#fb7185',
    break: '#34d399',
    focusFg: '#fff1f2',
    breakFg: '#ecfdf5',
  },
  ocean: {
    focus: '#2563eb',
    break: '#0891b2',
    focusFg: '#eff6ff',
    breakFg: '#ecfeff',
  },
  sunset: {
    focus: '#ea580c',
    break: '#ca8a04',
    focusFg: '#fff7ed',
    breakFg: '#fefce8',
  },
  forest: {
    focus: '#166534',
    break: '#65a30d',
    focusFg: '#f0fdf4',
    breakFg: '#f7fee7',
  },
  lavender: {
    focus: '#7c3aed',
    break: '#a855f7',
    focusFg: '#f5f3ff',
    breakFg: '#faf5ff',
  },
};

export function isTimerTheme(value: unknown): value is TimerTheme {
  return typeof value === 'string' && TIMER_THEMES.includes(value as TimerTheme);
}

export function normalizeTimerTheme(value: unknown): TimerTheme {
  return isTimerTheme(value) ? value : 'classic';
}

export function getThemePhasePrimaryHex(
  theme: TimerTheme,
  phase: 'focus' | 'break',
): string {
  const colors = THEME_HEX[theme];
  return phase === 'break' ? colors.break : colors.focus;
}

export function getThemePhasePrimaryForegroundHex(
  theme: TimerTheme,
  phase: 'focus' | 'break',
): string {
  const colors = THEME_HEX[theme];
  return phase === 'break' ? colors.breakFg : colors.focusFg;
}
