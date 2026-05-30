import type { PomodoroState } from './types';

/** Page overlay is visible when the timer is running/paused, or if idle display is enabled. */
export function shouldShowPageOverlay(state: PomodoroState): boolean {
  if (state.status !== 'idle') return true;
  return state.settings.showOverlayWhenIdle;
}
