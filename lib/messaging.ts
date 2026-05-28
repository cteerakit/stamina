import type { PomodoroState } from '@/lib/pomodoro/types';

export type PomodoroMessage =
  | { type: 'GET_STATE' }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'SKIP' };

export type PomodoroResponse =
  | { ok: true; state: PomodoroState }
  | { ok: false; error: string };

export async function sendPomodoroMessage(
  message: PomodoroMessage,
): Promise<PomodoroResponse> {
  return browser.runtime.sendMessage(message) as Promise<PomodoroResponse>;
}
