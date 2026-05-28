import type { TimerTheme } from './timer-themes';

export type Phase = 'focus' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface PomodoroSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsUntilLongBreak: number;
  timerTheme: TimerTheme;
}

export interface PomodoroStats {
  date: string;
  completedToday: number;
}

export interface PomodoroState {
  phase: Phase;
  status: TimerStatus;
  endTime: number | null;
  remainingMs: number;
  completedFocusInCycle: number;
  settings: PomodoroSettings;
  stats: PomodoroStats;
}
