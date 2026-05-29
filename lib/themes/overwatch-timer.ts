import { getGaugeFraction } from '@/lib/themes/gauge-math';
import {
  OVERWATCH_CAPACITY_MAX,
  OVERWATCH_SEGMENT_COUNT,
  OVERWATCH_TIMER_MAX,
} from '@/lib/themes/overwatch-config';
import type { PomodoroState } from '@/lib/pomodoro/types';

export interface OverwatchTimerState {
  current: number;
  capacity: number;
  filledSegments: number;
  partialSegment: number;
}

export function getOverwatchTimerState(
  state: PomodoroState,
  now = Date.now(),
): OverwatchTimerState {
  const fraction = getGaugeFraction(state, now);
  const scaled = fraction * OVERWATCH_SEGMENT_COUNT;
  const filledSegments = Math.min(
    OVERWATCH_SEGMENT_COUNT,
    Math.floor(scaled),
  );
  const partialSegment =
    filledSegments >= OVERWATCH_SEGMENT_COUNT
      ? 0
      : Math.min(1, scaled - filledSegments);

  return {
    current: Math.round(fraction * OVERWATCH_TIMER_MAX),
    capacity: OVERWATCH_CAPACITY_MAX,
    filledSegments,
    partialSegment,
  };
}
