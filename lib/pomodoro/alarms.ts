import { ALARM_BADGE_TICK, ALARM_PHASE_END } from './constants';
import { getPhasePrimaryHex } from './theme-colors';
import { getRemainingMs, getPomodoroState } from './storage';

export async function clearPomodoroAlarms(): Promise<void> {
  await browser.alarms.clear(ALARM_PHASE_END);
  await browser.alarms.clear(ALARM_BADGE_TICK);
}

export async function schedulePhaseEndAlarm(endTime: number): Promise<void> {
  await browser.alarms.clear(ALARM_PHASE_END);
  await browser.alarms.create(ALARM_PHASE_END, { when: endTime });
}

export async function scheduleBadgeTickAlarm(): Promise<void> {
  const existing = await browser.alarms.get(ALARM_BADGE_TICK);
  if (!existing) {
    await browser.alarms.create(ALARM_BADGE_TICK, { periodInMinutes: 1 });
  }
}

export async function updateBadge(now = Date.now()): Promise<void> {
  const state = await getPomodoroState();

  if (state.status !== 'running') {
    await browser.action.setBadgeText({ text: '' });
    return;
  }

  const remainingMs = getRemainingMs(state, now);
  const minutes = Math.max(1, Math.ceil(remainingMs / 60_000));
  await browser.action.setBadgeText({ text: String(minutes) });
  await browser.action.setBadgeBackgroundColor({
    color: getPhasePrimaryHex(state.phase, state.settings),
  });
}
