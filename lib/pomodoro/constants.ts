import type { PomodoroSettings } from './types';

export const STORAGE_KEY = 'pomodoroState';

export const ALARM_PHASE_END = 'pomodoro-phase-end';
export const ALARM_BADGE_TICK = 'pomodoro-badge-tick';

export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsUntilLongBreak: 4,
  displayTheme: 'progressBar',
  themeConfig: { kind: 'progressBar', palette: 'classic', position: 'top' },
  showOverlayWhenIdle: false,
};
