import {
  getPalettePhasePrimaryHex,
  normalizeColorPalette,
} from '@/lib/pomodoro/timer-themes';
import type { PomodoroSettings } from '@/lib/pomodoro/types';

import { normalizeOverwatchLabel } from './overwatch-config';
import { getSkyrimBarColorOption, normalizeSkyrimBarColor } from './skyrim-colors';
import type {
  DisplayTheme,
  ProgressBarPosition,
  ThemeConfig,
} from './types';
import { DISPLAY_THEMES } from './types';

const DEFAULT_DISPLAY_THEME: DisplayTheme = 'progressBar';

export function isDisplayTheme(value: unknown): value is DisplayTheme {
  return (
    typeof value === 'string' &&
    DISPLAY_THEMES.includes(value as DisplayTheme)
  );
}

/** Maps removed or renamed display themes. */
export function normalizeDisplayTheme(value: unknown): DisplayTheme {
  if (value === 'classic' || value === 'topBar') return 'progressBar';
  return isDisplayTheme(value) ? value : DEFAULT_DISPLAY_THEME;
}

export function getColorPaletteFromSettings(
  settings: PomodoroSettings,
): import('@/lib/pomodoro/timer-themes').ColorPalette {
  if (settings.themeConfig.kind === 'progressBar') {
    return settings.themeConfig.palette;
  }
  return 'classic';
}

export function normalizeProgressBarPosition(
  value: unknown,
): ProgressBarPosition {
  return value === 'bottom' ? 'bottom' : 'top';
}

export function defaultThemeConfig(displayTheme: DisplayTheme): ThemeConfig {
  switch (displayTheme) {
    case 'progressBar':
      return { kind: 'progressBar', palette: 'classic', position: 'top' };
    case 'skyrim':
      return { kind: 'skyrim', barColor: 'health' };
    case 'minecraft':
      return { kind: 'minecraft' };
    case 'valorant':
      return { kind: 'valorant' };
    case 'overwatch':
      return { kind: 'overwatch', label: normalizeOverwatchLabel(undefined) };
  }
}

export function normalizeThemeConfig(
  displayTheme: DisplayTheme,
  config: unknown,
  fallbackPalette?: import('@/lib/pomodoro/timer-themes').ColorPalette,
): ThemeConfig {
  const paletteSource =
    config &&
    typeof config === 'object' &&
    'kind' in config &&
    ((config as { kind: string }).kind === 'classic' ||
      (config as { kind: string }).kind === 'topBar' ||
      (config as { kind: string }).kind === 'progressBar')
      ? (config as { palette?: unknown }).palette
      : fallbackPalette;
  const palette = normalizeColorPalette(paletteSource);
  const position =
    config && typeof config === 'object' && 'position' in config
      ? normalizeProgressBarPosition(
          (config as { position?: unknown }).position,
        )
      : 'top';

  if (config && typeof config === 'object' && 'kind' in config) {
    const kind = (config as { kind: unknown }).kind;
    if (
      (kind === 'progressBar' ||
        kind === 'topBar' ||
        kind === 'classic') &&
      displayTheme === 'progressBar'
    ) {
      return { kind: 'progressBar', palette, position };
    }
    if (kind === 'skyrim' && displayTheme === 'skyrim') {
      const barColor = normalizeSkyrimBarColor(
        (config as { barColor?: unknown }).barColor,
      );
      return { kind: 'skyrim', barColor };
    }
    if (kind === 'minecraft' && displayTheme === 'minecraft') {
      return { kind: 'minecraft' };
    }
    if (kind === 'valorant' && displayTheme === 'valorant') {
      return { kind: 'valorant' };
    }
    if (kind === 'overwatch' && displayTheme === 'overwatch') {
      return {
        kind: 'overwatch',
        label: normalizeOverwatchLabel(
          (config as { label?: unknown }).label,
        ),
      };
    }
  }

  switch (displayTheme) {
    case 'progressBar':
      return { kind: 'progressBar', palette, position };
    case 'skyrim':
      return { kind: 'skyrim', barColor: 'health' };
    case 'minecraft':
      return { kind: 'minecraft' };
    case 'valorant':
      return { kind: 'valorant' };
    case 'overwatch':
      return { kind: 'overwatch', label: normalizeOverwatchLabel(undefined) };
  }
}

export function themeConfigForDisplay(
  displayTheme: DisplayTheme,
  previous?: ThemeConfig,
): ThemeConfig {
  const carriedPalette =
    previous?.kind === 'progressBar' ? previous.palette : 'classic';
  const carriedPosition =
    previous?.kind === 'progressBar' ? previous.position : 'top';
  const carriedSkyrimColor =
    previous?.kind === 'skyrim' ? previous.barColor : 'health';
  const carriedOverwatchLabel =
    previous?.kind === 'overwatch'
      ? previous.label
      : normalizeOverwatchLabel(undefined);

  switch (displayTheme) {
    case 'progressBar':
      return {
        kind: 'progressBar',
        palette: carriedPalette,
        position: carriedPosition,
      };
    case 'skyrim':
      return { kind: 'skyrim', barColor: carriedSkyrimColor };
    case 'minecraft':
      return { kind: 'minecraft' };
    case 'valorant':
      return { kind: 'valorant' };
    case 'overwatch':
      return { kind: 'overwatch', label: carriedOverwatchLabel };
  }
}

export function migrateLegacySettings(
  raw: Record<string, unknown> | undefined,
): Partial<PomodoroSettings> {
  if (!raw) return {};

  const legacyPalette = normalizeColorPalette(raw.timerTheme);

  if ('displayTheme' in raw || 'themeConfig' in raw) {
    const displayTheme = normalizeDisplayTheme(raw.displayTheme);
    const themeConfig = normalizeThemeConfig(
      displayTheme,
      raw.themeConfig,
      legacyPalette,
    );
    return { displayTheme, themeConfig };
  }

  return {
    displayTheme: 'progressBar',
    themeConfig: {
      kind: 'progressBar',
      palette: legacyPalette,
      position: 'top',
    },
  };
}

export function getPhaseColorFromConfig(
  phase: import('@/lib/pomodoro/types').Phase,
  config: ThemeConfig,
): string {
  const phaseKey =
    phase === 'shortBreak' || phase === 'longBreak' ? 'break' : 'focus';

  if (config.kind === 'skyrim') {
    return getSkyrimBarColorOption(config.barColor).badgeHex;
  }

  if (config.kind === 'minecraft') {
    return '#f80000';
  }

  if (config.kind === 'valorant') {
    return '#ffffff';
  }

  if (config.kind === 'overwatch') {
    return '#5eb3ff';
  }

  return getPalettePhasePrimaryHex(config.palette, phaseKey);
}
