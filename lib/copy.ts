import type { Phase } from '@/lib/pomodoro/types';

export const APP_NAME = 'Stamina';

export const COPY = {
  tagline: 'A pomodoro timer with styles.',
  loading: 'Loading…',
  tabs: {
    timer: 'Timer',
    themes: 'Themes',
    settings: 'Settings',
    about: 'About',
  },
  about: {
    blurb: 'A pomodoro timer with styles.',
    madeBy: 'Made by',
    authorBio: (name: string) =>
      `${name} built Stamina to stay focused without leaving the browser.`,
    feedbackHeading: 'Feedback',
    sendFeedback: 'Send feedback or report a bug',
    viewIssues: 'View discussions on GitHub',
    sourceCode: 'Source code on GitHub',
    version: (v: string) => `Version ${v}`,
  },
  phases: {
    focus: 'Focus',
    shortBreak: 'Short break',
    longBreak: 'Long break',
  } satisfies Record<Phase, string>,
  controls: {
    engage: 'Start',
    hold: 'Pause',
    resume: 'Resume',
    restart: 'Reset',
    skip: 'Skip',
  },
  timer: {
    staminaRemaining: 'Time remaining',
    staminaRecovering: 'Break time remaining',
  },
  loadout: {
    displayTheme: 'Display theme',
    displayThemeHint: 'How the timer appears on web pages. Changes apply immediately.',
    colorPalette: 'Color palette',
    colorPaletteHint: 'Colors for focus and break phases.',
    progressBarPosition: 'Bar position',
    progressBarPositionTop: 'Top',
    progressBarPositionBottom: 'Bottom',
    progressBarPositionHint: 'Place the progress bar at the top or bottom of the page.',
    skyrimBarColor: 'Bar type',
    skyrimBarColorHint: 'Mana, Health, or Stamina with a Skyrim-style gradient.',
    overwatchLabel: 'HUD label',
    overwatchLabelHint:
      'Text under the bar (e.g. a hero name). Shown in all caps on the overlay.',
    grindLength: 'Focus length (min)',
    shortCooldown: 'Short break (min)',
    fullRecovery: 'Long break (min)',
    roundsBeforeRecovery: 'Focus sessions before long break',
    activeBlocker: 'Stop or reset the timer before changing these settings.',
    validationError: 'Enter valid values (1–120 min, 1–10 sessions).',
    saved: 'Settings saved.',
    save: 'Save',
    resetDefaults: 'Reset to defaults',
    showOverlayWhenIdle: 'Show overlay when timer is stopped',
    showOverlayWhenIdleHint:
      'When off, the on-page timer is hidden until you start, pause, or resume.',
  },
  notifications: {
    focusComplete: {
      title: 'Focus session complete',
      message: 'Time for a break.',
    },
    breakComplete: {
      title: 'Break over',
      message: 'Ready for another focus session?',
    },
  },
} as const;
