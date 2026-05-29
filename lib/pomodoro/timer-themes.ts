export const COLOR_PALETTES = [
  'classic',
  'midnight',
  'ocean',
  'sunset',
  'forest',
  'lavender',
] as const;

export type ColorPalette = (typeof COLOR_PALETTES)[number];

/** @deprecated Use ColorPalette */
export type TimerTheme = ColorPalette;

/** @deprecated Use COLOR_PALETTES */
export const TIMER_THEMES = COLOR_PALETTES;

export interface ColorPaletteOption {
  id: ColorPalette;
  label: string;
  description: string;
  previewFocus: string;
  previewBreak: string;
}

/** @deprecated Use ColorPaletteOption */
export type TimerThemeOption = ColorPaletteOption;

export const COLOR_PALETTE_OPTIONS: ColorPaletteOption[] = [
  {
    id: 'classic',
    label: 'Classic',
    description: 'Red focus, green break',
    previewFocus: '#e11d48',
    previewBreak: '#008453',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    description: 'Rose focus, mint break',
    previewFocus: '#fb7185',
    previewBreak: '#34d399',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    description: 'Blue focus, teal break',
    previewFocus: '#2563eb',
    previewBreak: '#0891b2',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    description: 'Orange focus, amber break',
    previewFocus: '#ea580c',
    previewBreak: '#ca8a04',
  },
  {
    id: 'forest',
    label: 'Forest',
    description: 'Green focus, lime break',
    previewFocus: '#166534',
    previewBreak: '#65a30d',
  },
  {
    id: 'lavender',
    label: 'Lavender',
    description: 'Violet focus, purple break',
    previewFocus: '#7c3aed',
    previewBreak: '#a855f7',
  },
];

/** @deprecated Use COLOR_PALETTE_OPTIONS */
export const TIMER_THEME_OPTIONS = COLOR_PALETTE_OPTIONS;

const PALETTE_HEX: Record<
  ColorPalette,
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

export function isColorPalette(value: unknown): value is ColorPalette {
  return (
    typeof value === 'string' && COLOR_PALETTES.includes(value as ColorPalette)
  );
}

/** @deprecated Use isColorPalette */
export const isTimerTheme = isColorPalette;

export function normalizeColorPalette(value: unknown): ColorPalette {
  return isColorPalette(value) ? value : 'classic';
}

/** @deprecated Use normalizeColorPalette */
export const normalizeTimerTheme = normalizeColorPalette;

export function getPalettePhasePrimaryHex(
  palette: ColorPalette,
  phase: 'focus' | 'break',
): string {
  const colors = PALETTE_HEX[palette];
  return phase === 'break' ? colors.break : colors.focus;
}

/** @deprecated Use getPalettePhasePrimaryHex */
export const getThemePhasePrimaryHex = getPalettePhasePrimaryHex;

export function getPalettePhasePrimaryForegroundHex(
  palette: ColorPalette,
  phase: 'focus' | 'break',
): string {
  const colors = PALETTE_HEX[palette];
  return phase === 'break' ? colors.breakFg : colors.focusFg;
}

/** @deprecated Use getPalettePhasePrimaryForegroundHex */
export const getThemePhasePrimaryForegroundHex =
  getPalettePhasePrimaryForegroundHex;
