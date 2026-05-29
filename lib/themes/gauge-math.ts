import { isBreakPhase } from '@/lib/pomodoro/phases';
import { getPhaseDurationMs, getRemainingMs } from '@/lib/pomodoro/storage';
import type { PomodoroState } from '@/lib/pomodoro/types';

/** Grind: fraction remaining. Break: fraction recovered. */
export function getGaugeFraction(state: PomodoroState, now = Date.now()): number {
  const remainingMs = getRemainingMs(state, now);
  const totalMs = getPhaseDurationMs(state);
  const remainingFraction =
    totalMs > 0 ? Math.min(1, Math.max(0, remainingMs / totalMs)) : 0;
  const isBreak = isBreakPhase(state.phase);
  return isBreak ? 1 - remainingFraction : remainingFraction;
}

export function getGaugePercent(state: PomodoroState, now = Date.now()): number {
  return Math.round(getGaugeFraction(state, now) * 100);
}
