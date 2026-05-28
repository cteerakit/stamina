import type { Phase } from '@/lib/pomodoro/types';

export const APP_NAME = 'Stamina';

export const COPY = {
  tagline: 'Grind. Recover. Level up.',
  loading: 'Summoning stamina…',
  tabs: {
    arena: 'Arena',
    loadout: 'Loadout',
  },
  phases: {
    focus: 'Grind',
    shortBreak: 'Cooldown',
    longBreak: 'Full Recovery',
  } satisfies Record<Phase, string>,
  controls: {
    engage: 'Engage',
    hold: 'Hold',
    resume: 'Resume',
    restart: 'Restart',
    skip: 'Skip Stage',
  },
  timer: {
    staminaRemaining: 'Stamina remaining this round',
    staminaRecovering: 'Stamina recovering this round',
  },
  loadout: {
    arenaSkin: 'Arena skin',
    arenaSkinHint: 'Pick your arena look. Equips instantly.',
    grindLength: 'Grind length (min)',
    shortCooldown: 'Short cooldown (min)',
    fullRecovery: 'Full recovery (min)',
    roundsBeforeRecovery: 'Grinds before full recovery',
    activeBlocker: 'Finish or restart your run before tweaking the loadout.',
    validationError: 'Enter valid stats (1–120 min, 1–10 rounds).',
    saved: 'Loadout saved!',
    save: 'Save loadout',
    resetDefaults: 'Reset loadout',
  },
  notifications: {
    grindComplete: {
      title: 'Grind cleared!',
      message: 'Nice run—cool down and recover.',
    },
    recoveryComplete: {
      title: 'Stamina restored!',
      message: 'Recovery complete. Ready for another grind?',
    },
  },
} as const;
