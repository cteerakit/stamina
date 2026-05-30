import type {
  DisplayTheme,
  ThemeConfig,
  ThemeConfigByDisplay,
} from '@/lib/themes/types';

export type Phase = 'focus' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface PomodoroSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsUntilLongBreak: number;
  displayTheme: DisplayTheme;
  themeConfig: ThemeConfig;
  /** Last-used options per display theme (restored when switching back). */
  themeConfigs: ThemeConfigByDisplay;
  /** When true, page overlay stays visible while the timer is idle (stopped). */
  showOverlayWhenIdle: boolean;
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
