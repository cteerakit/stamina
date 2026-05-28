import { ALARM_BADGE_TICK, ALARM_PHASE_END } from '@/lib/pomodoro/constants';
import {
  clearPomodoroAlarms,
  scheduleBadgeTickAlarm,
  schedulePhaseEndAlarm,
  updateBadge,
} from '@/lib/pomodoro/alarms';
import { playCompletionSound } from '@/lib/pomodoro/audio';
import type { PomodoroMessage, PomodoroResponse } from '@/lib/messaging';
import { showPhaseNotification } from '@/lib/pomodoro/notify';
import { phaseDurationMs } from '@/lib/pomodoro/settings';
import {
  createInitialState,
  getPomodoroState,
  getRemainingMs,
  setPomodoroState,
} from '@/lib/pomodoro/storage';
import {
  applyBreakComplete,
  applyFocusComplete,
  applySkip,
} from '@/lib/pomodoro/transitions';
import type { PomodoroState } from '@/lib/pomodoro/types';

async function persistRunning(state: PomodoroState, endTime: number): Promise<PomodoroState> {
  const next: PomodoroState = {
    ...state,
    status: 'running',
    endTime,
    remainingMs: Math.max(0, endTime - Date.now()),
  };
  await setPomodoroState(next);
  await schedulePhaseEndAlarm(endTime);
  await scheduleBadgeTickAlarm();
  await updateBadge();
  return next;
}

async function startTimer(state: PomodoroState): Promise<PomodoroState> {
  const duration =
    state.status === 'paused'
      ? state.remainingMs
      : phaseDurationMs(state.phase, state.settings);
  const endTime = Date.now() + duration;
  return persistRunning({ ...state, remainingMs: duration }, endTime);
}

async function pauseTimer(state: PomodoroState): Promise<PomodoroState> {
  const remainingMs = getRemainingMs(state);
  const next: PomodoroState = {
    ...state,
    status: 'paused',
    endTime: null,
    remainingMs,
  };
  await clearPomodoroAlarms();
  await setPomodoroState(next);
  await browser.action.setBadgeText({ text: '' });
  return next;
}

async function resetTimer(state: PomodoroState): Promise<PomodoroState> {
  await clearPomodoroAlarms();
  const next = createInitialState(state.settings);
  next.stats = state.stats;
  await setPomodoroState(next);
  await browser.action.setBadgeText({ text: '' });
  return next;
}

async function handlePhaseEnd(): Promise<void> {
  const state = await getPomodoroState();
  if (state.status !== 'running') return;

  const completedPhase = state.phase;
  await clearPomodoroAlarms();
  await showPhaseNotification(completedPhase);
  await playCompletionSound();

  let next: PomodoroState;
  if (completedPhase === 'focus') {
    next = applyFocusComplete(state);
  } else {
    next = applyBreakComplete(state);
  }

  await setPomodoroState(next);
  await browser.action.setBadgeText({ text: '' });
}

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
      await setPomodoroState(createInitialState());
    }
  });

  browser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARM_PHASE_END) {
      await handlePhaseEnd();
      return;
    }
    if (alarm.name === ALARM_BADGE_TICK) {
      await updateBadge();
    }
  });

  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (
      typeof message !== 'object' ||
      message === null ||
      !('type' in message) ||
      message.type === 'PLAY_SOUND'
    ) {
      return false;
    }

    (async () => {
      try {
        let state = await getPomodoroState();
        const pomodoroMessage = message as PomodoroMessage;

        switch (pomodoroMessage.type) {
          case 'GET_STATE':
            sendResponse({ ok: true, state } satisfies PomodoroResponse);
            return;

          case 'START':
            if (state.status === 'running') {
              state = await pauseTimer(state);
            } else {
              state = await startTimer(state);
            }
            break;

          case 'PAUSE':
            if (state.status === 'running') {
              state = await pauseTimer(state);
            }
            break;

          case 'RESET':
            state = await resetTimer(state);
            break;

          case 'SKIP': {
            await clearPomodoroAlarms();
            state = applySkip(state);
            await setPomodoroState(state);
            await browser.action.setBadgeText({ text: '' });
            break;
          }

          default:
            sendResponse({
              ok: false,
              error: 'Unknown message',
            } satisfies PomodoroResponse);
            return;
        }

        sendResponse({ ok: true, state } satisfies PomodoroResponse);
      } catch (error) {
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        } satisfies PomodoroResponse);
      }
    })();

    return true;
  });
});
