import { COPY } from '@/lib/copy';
import type { Phase } from './types';

const NOTIFICATION_ID = 'pomodoro-phase-end';
const NOTIFICATION_ICON_URL = browser.runtime.getURL('/icon/128.png');

function notificationCopy(phase: Phase): { title: string; message: string } {
  switch (phase) {
    case 'focus':
      return COPY.notifications.grindComplete;
    case 'shortBreak':
    case 'longBreak':
      return COPY.notifications.recoveryComplete;
  }
}

export async function showPhaseNotification(completedPhase: Phase): Promise<void> {
  const { title, message } = notificationCopy(completedPhase);

  await browser.notifications.create(NOTIFICATION_ID, {
    type: 'basic',
    iconUrl: NOTIFICATION_ICON_URL,
    title,
    message,
  });
}
