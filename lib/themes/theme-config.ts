import {
  getPalettePhasePrimaryHex,
  normalizeColorPalette,
} from '@/lib/pomodoro/timer-themes';
import type { PomodoroSettings } from '@/lib/pomodoro/types';

import { normalizeOverwatchLabel } from './overwatch-config';
import { getStardewEnergyFillColors } from './stardew-energy-colors';
import { getSkyrimBarColorOption, normalizeSkyrimBarColor } from './skyrim-colors';

import type {
  DisplayTheme,
  ProgressBarPosition,
  SkyrimFramePosition,
  ThemeConfig,
  ThemeConfigByDisplay,
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

export function normalizeSkyrimFramePosition(
  value: unknown,
): SkyrimFramePosition {
  if (value === 'left' || value === 'right') return value;
  return 'middle';
}

export function defaultThemeConfig(displayTheme: DisplayTheme): ThemeConfig {
  switch (displayTheme) {
    case 'progressBar':
      return { kind: 'progressBar', palette: 'classic', position: 'top' };
    case 'skyrim':
      return { kind: 'skyrim', barColor: 'health', position: 'middle' };
    case 'minecraft':
      return { kind: 'minecraft' };
    case 'valorant':
      return { kind: 'valorant' };
    case 'overwatch':
      return { kind: 'overwatch', label: normalizeOverwatchLabel(undefined) };
    case 'stardewValley':
      return { kind: 'stardewValley' };
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
      const position = normalizeSkyrimFramePosition(
        (config as { position?: unknown }).position,
      );
      return { kind: 'skyrim', barColor, position };
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
    if (kind === 'stardewValley' && displayTheme === 'stardewValley') {
      return { kind: 'stardewValley' };
    }
  }

  switch (displayTheme) {
    case 'progressBar':
      return { kind: 'progressBar', palette, position };
    case 'skyrim':
      return { kind: 'skyrim', barColor: 'health', position: 'middle' };
    case 'minecraft':
      return { kind: 'minecraft' };
    case 'valorant':
      return { kind: 'valorant' };
    case 'overwatch':
      return { kind: 'overwatch', label: normalizeOverwatchLabel(undefined) };
    case 'stardewValley':
      return { kind: 'stardewValley' };
  }
}

function configMatchesDisplayTheme(
  displayTheme: DisplayTheme,
  config: ThemeConfig,
): boolean {
  return config.kind === displayTheme;
}

export function normalizeThemeConfigs(
  displayTheme: DisplayTheme,
  activeConfig: ThemeConfig,
  raw?: ThemeConfigByDisplay,
): ThemeConfigByDisplay {
  const configs: ThemeConfigByDisplay = {};

  if (raw && typeof raw === 'object') {
    for (const theme of DISPLAY_THEMES) {
      const entry = raw[theme];
      if (entry) {
        const normalized = normalizeThemeConfig(theme, entry);
        if (configMatchesDisplayTheme(theme, normalized)) {
          configs[theme] = normalized;
        }
      }
    }
  }

  configs[displayTheme] = activeConfig;
  return configs;
}

/** Restore cached options for a display theme, or defaults if never configured. */
export function themeConfigForDisplay(
  displayTheme: DisplayTheme,
  themeConfigs?: ThemeConfigByDisplay,
): ThemeConfig {
  const cached = themeConfigs?.[displayTheme];
  if (cached && configMatchesDisplayTheme(displayTheme, cached)) {
    return normalizeThemeConfig(displayTheme, cached);
  }
  return defaultThemeConfig(displayTheme);
}

export function switchDisplayTheme(
  settings: PomodoroSettings,
  displayTheme: DisplayTheme,
): PomodoroSettings {
  const themeConfigs = normalizeThemeConfigs(
    settings.displayTheme,
    settings.themeConfig,
    settings.themeConfigs,
  );
  const themeConfig = themeConfigForDisplay(displayTheme, themeConfigs);

  return {
    ...settings,
    displayTheme,
    themeConfig,
    themeConfigs: normalizeThemeConfigs(displayTheme, themeConfig, {
      ...themeConfigs,
      [displayTheme]: themeConfig,
    }),
  };
}

export function updateThemeConfig(
  settings: PomodoroSettings,
  themeConfig: ThemeConfig,
): PomodoroSettings {
  const displayTheme = settings.displayTheme;
  const normalized = normalizeThemeConfig(displayTheme, themeConfig);

  return {
    ...settings,
    themeConfig: normalized,
    themeConfigs: normalizeThemeConfigs(displayTheme, normalized, {
      ...settings.themeConfigs,
      [displayTheme]: normalized,
    }),
  };
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
    const themeConfigs = normalizeThemeConfigs(
      displayTheme,
      themeConfig,
      raw.themeConfigs as ThemeConfigByDisplay | undefined,
    );
    return { displayTheme, themeConfig, themeConfigs };
  }

  const themeConfig = {
    kind: 'progressBar' as const,
    palette: legacyPalette,
    position: 'top' as const,
  };
  return {
    displayTheme: 'progressBar',
    themeConfig,
    themeConfigs: { progressBar: themeConfig },
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

  if (config.kind === 'stardewValley') {
    return getStardewEnergyFillColors(1).main;
  }

  return getPalettePhasePrimaryHex(config.palette, phaseKey);
}
