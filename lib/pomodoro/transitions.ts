import { phaseDurationMs } from './settings';
import { normalizeStats } from './storage';
import type { Phase, PomodoroState } from './types';

export function getBreakPhaseAfterFocus(state: PomodoroState): Phase {
  const nextCount = state.completedFocusInCycle + 1;
  if (nextCount >= state.settings.sessionsUntilLongBreak) {
    return 'longBreak';
  }
  return 'shortBreak';
}

/** After a focus session completes naturally. */
export function applyFocusComplete(state: PomodoroState): PomodoroState {
  const breakPhase = getBreakPhaseAfterFocus(state);
  const completedFocusInCycle =
    breakPhase === 'longBreak' ? 0 : state.completedFocusInCycle + 1;

  return {
    ...state,
    phase: breakPhase,
    status: 'idle',
    endTime: null,
    remainingMs: phaseDurationMs(breakPhase, state.settings),
    completedFocusInCycle,
    stats: normalizeStats({
      ...state.stats,
      completedToday: state.stats.completedToday + 1,
    }),
  };
}

/** After a break completes naturally — return to focus, idle. */
export function applyBreakComplete(state: PomodoroState): PomodoroState {
  return {
    ...state,
    phase: 'focus',
    status: 'idle',
    endTime: null,
    remainingMs: phaseDurationMs('focus', state.settings),
  };
}

/** Skip current phase without counting a completed pomodoro. */
export function applySkip(state: PomodoroState): PomodoroState {
  if (state.phase === 'focus') {
    const breakPhase = getBreakPhaseAfterFocus(state);
    const completedFocusInCycle =
      breakPhase === 'longBreak' ? 0 : state.completedFocusInCycle + 1;
    return {
      ...state,
      phase: breakPhase,
      status: 'idle',
      endTime: null,
      remainingMs: phaseDurationMs(breakPhase, state.settings),
      completedFocusInCycle,
    };
  }

  return {
    ...state,
    phase: 'focus',
    status: 'idle',
    endTime: null,
    remainingMs: phaseDurationMs('focus', state.settings),
  };
}
