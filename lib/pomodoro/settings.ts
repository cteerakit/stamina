import {
  migrateLegacySettings,
  normalizeDisplayTheme,
  normalizeThemeConfig,
} from '@/lib/themes/theme-config';

import { DEFAULT_SETTINGS } from './constants';
import type { Phase, PomodoroSettings } from './types';

const MIN_MINUTES = 1;
const MAX_MINUTES = 120;
const MIN_SESSIONS = 1;
const MAX_SESSIONS = 10;

export function phaseDurationMs(
  phase: Phase,
  settings: PomodoroSettings,
): number {
  switch (phase) {
    case 'focus':
      return settings.focusMinutes * 60_000;
    case 'shortBreak':
      return settings.shortBreakMinutes * 60_000;
    case 'longBreak':
      return settings.longBreakMinutes * 60_000;
  }
}

export function validateSettings(
  input: Partial<PomodoroSettings> | Record<string, unknown>,
): PomodoroSettings | null {
  const raw = input as Record<string, unknown>;
  const migrated = { ...migrateLegacySettings(raw), ...raw };
  const focusMinutes = Number(migrated.focusMinutes);
  const shortBreakMinutes = Number(migrated.shortBreakMinutes);
  const longBreakMinutes = Number(migrated.longBreakMinutes);
  const sessionsUntilLongBreak = Number(migrated.sessionsUntilLongBreak);

  if (
    !Number.isFinite(focusMinutes) ||
    !Number.isFinite(shortBreakMinutes) ||
    !Number.isFinite(longBreakMinutes) ||
    !Number.isFinite(sessionsUntilLongBreak)
  ) {
    return null;
  }

  if (
    focusMinutes < MIN_MINUTES ||
    focusMinutes > MAX_MINUTES ||
    shortBreakMinutes < MIN_MINUTES ||
    shortBreakMinutes > MAX_MINUTES ||
    longBreakMinutes < MIN_MINUTES ||
    longBreakMinutes > MAX_MINUTES ||
    sessionsUntilLongBreak < MIN_SESSIONS ||
    sessionsUntilLongBreak > MAX_SESSIONS
  ) {
    return null;
  }

  const displayTheme = normalizeDisplayTheme(migrated.displayTheme);
  const themeConfig = normalizeThemeConfig(
    displayTheme,
    migrated.themeConfig,
  );
  const showOverlayWhenIdle = migrated.showOverlayWhenIdle === true;

  return {
    focusMinutes: Math.round(focusMinutes),
    shortBreakMinutes: Math.round(shortBreakMinutes),
    longBreakMinutes: Math.round(longBreakMinutes),
    sessionsUntilLongBreak: Math.round(sessionsUntilLongBreak),
    displayTheme,
    themeConfig,
    showOverlayWhenIdle,
  };
}

export function mergeSettings(
  partial?: Partial<PomodoroSettings> | Record<string, unknown>,
): PomodoroSettings {
  const base = partial
    ? {
        ...DEFAULT_SETTINGS,
        ...migrateLegacySettings(partial as Record<string, unknown>),
        ...partial,
      }
    : DEFAULT_SETTINGS;
  const validated = validateSettings(base);
  return validated ?? { ...DEFAULT_SETTINGS };
}
