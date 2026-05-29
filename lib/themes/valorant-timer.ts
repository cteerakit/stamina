import { getGaugePercent } from '@/lib/themes/gauge-math';
import type { PomodoroState } from '@/lib/pomodoro/types';

/** Valorant-style 0–100 value (remaining on focus, recovered on break). */
export function getValorantTimerValue(
  state: PomodoroState,
  now = Date.now(),
): number {
  return getGaugePercent(state, now);
}
