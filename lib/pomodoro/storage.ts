import { DEFAULT_SETTINGS, STORAGE_KEY } from './constants';
import { mergeSettings, phaseDurationMs } from './settings';
import type { PomodoroState, PomodoroStats } from './types';

function todayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function normalizeStats(stats: PomodoroStats): PomodoroStats {
  const today = todayDateString();
  if (stats.date === today) {
    return stats;
  }
  return { date: today, completedToday: 0 };
}

export function createInitialState(
  settings = DEFAULT_SETTINGS,
): PomodoroState {
  return {
    phase: 'focus',
    status: 'idle',
    endTime: null,
    remainingMs: phaseDurationMs('focus', settings),
    completedFocusInCycle: 0,
    settings,
    stats: { date: todayDateString(), completedToday: 0 },
  };
}

export async function getPomodoroState(): Promise<PomodoroState> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  const raw = result[STORAGE_KEY] as PomodoroState | undefined;

  if (!raw) {
    const initial = createInitialState();
    await browser.storage.local.set({ [STORAGE_KEY]: initial });
    return initial;
  }

  const settings = mergeSettings(
    raw.settings as Partial<import('./types').PomodoroSettings> &
      Record<string, unknown>,
  );
  const stats = normalizeStats(raw.stats ?? { date: todayDateString(), completedToday: 0 });

  const state: PomodoroState = {
    phase: raw.phase ?? 'focus',
    status: raw.status ?? 'idle',
    endTime: raw.endTime ?? null,
    remainingMs: raw.remainingMs ?? phaseDurationMs('focus', settings),
    completedFocusInCycle: raw.completedFocusInCycle ?? 0,
    settings,
    stats,
  };

  return state;
}

export async function setPomodoroState(state: PomodoroState): Promise<void> {
  await browser.storage.local.set({ [STORAGE_KEY]: state });
}

export function getRemainingMs(state: PomodoroState, now = Date.now()): number {
  if (state.status === 'running' && state.endTime !== null) {
    return Math.max(0, state.endTime - now);
  }
  return state.remainingMs;
}

export function getPhaseDurationMs(state: PomodoroState): number {
  return phaseDurationMs(state.phase, state.settings);
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
