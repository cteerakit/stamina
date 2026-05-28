import { isBreakPhase } from './phases';
import {
  getThemePhasePrimaryForegroundHex,
  getThemePhasePrimaryHex,
  normalizeTimerTheme,
} from './timer-themes';
import type { Phase, PomodoroSettings } from './types';

export function getPhasePrimaryHex(
  phase: Phase,
  settings?: Pick<PomodoroSettings, 'timerTheme'>,
): string {
  const theme = normalizeTimerTheme(settings?.timerTheme);
  const phaseKey = isBreakPhase(phase) ? 'break' : 'focus';
  return getThemePhasePrimaryHex(theme, phaseKey);
}

export function getPhasePrimaryForegroundHex(
  phase: Phase,
  settings?: Pick<PomodoroSettings, 'timerTheme'>,
): string {
  const theme = normalizeTimerTheme(settings?.timerTheme);
  const phaseKey = isBreakPhase(phase) ? 'break' : 'focus';
  return getThemePhasePrimaryForegroundHex(theme, phaseKey);
}
