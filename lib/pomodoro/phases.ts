import type { Phase } from './types';

export function isBreakPhase(phase: Phase): boolean {
  return phase === 'shortBreak' || phase === 'longBreak';
}
