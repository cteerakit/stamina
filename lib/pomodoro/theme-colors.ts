import { getPhaseColorForSettings } from '@/lib/themes/registry';

import { isBreakPhase } from './phases';
import type { Phase, PomodoroSettings } from './types';

export function getPhasePrimaryHex(
  phase: Phase,
  settings?: Pick<PomodoroSettings, 'displayTheme' | 'themeConfig'>,
): string {
  if (!settings) return '#e11d48';
  return getPhaseColorForSettings(
    phase,
    settings.displayTheme,
    settings.themeConfig,
  );
}

export function getPhasePrimaryForegroundHex(
  phase: Phase,
  settings?: Pick<PomodoroSettings, 'displayTheme' | 'themeConfig'>,
): string {
  return getPhasePrimaryHex(phase, settings);
}
