import { DEFAULT_SETTINGS } from './constants';
import { normalizeTimerTheme } from './timer-themes';
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
  input: Partial<PomodoroSettings>,
): PomodoroSettings | null {
  const focusMinutes = Number(input.focusMinutes);
  const shortBreakMinutes = Number(input.shortBreakMinutes);
  const longBreakMinutes = Number(input.longBreakMinutes);
  const sessionsUntilLongBreak = Number(input.sessionsUntilLongBreak);

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

  return {
    focusMinutes: Math.round(focusMinutes),
    shortBreakMinutes: Math.round(shortBreakMinutes),
    longBreakMinutes: Math.round(longBreakMinutes),
    sessionsUntilLongBreak: Math.round(sessionsUntilLongBreak),
    timerTheme: normalizeTimerTheme(input.timerTheme),
  };
}

export function mergeSettings(
  partial?: Partial<PomodoroSettings>,
): PomodoroSettings {
  const validated = partial ? validateSettings(partial) : null;
  return validated ?? { ...DEFAULT_SETTINGS };
}
