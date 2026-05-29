export const OVERWATCH_TIMER_MAX = 150;
export const OVERWATCH_CAPACITY_MAX = 200;
export const OVERWATCH_SEGMENT_COUNT = 6;
export const OVERWATCH_LABEL_MAX_LENGTH = 16;
export const DEFAULT_OVERWATCH_LABEL = 'FOCUS';

export function normalizeOverwatchLabel(value: unknown): string {
  const raw =
    typeof value === 'string' ? value.trim() : DEFAULT_OVERWATCH_LABEL;
  const capped = raw.slice(0, OVERWATCH_LABEL_MAX_LENGTH);
  return capped || DEFAULT_OVERWATCH_LABEL;
}
