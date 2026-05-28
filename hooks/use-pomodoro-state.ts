import { useCallback, useEffect, useState } from 'react';

import { sendPomodoroMessage } from '@/lib/messaging';
import { STORAGE_KEY } from '@/lib/pomodoro/constants';
import { formatTime, getRemainingMs } from '@/lib/pomodoro/storage';
import type { PomodoroState } from '@/lib/pomodoro/types';

export function usePomodoroState() {
  const [state, setState] = useState<PomodoroState | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setTick] = useState(0);

  const refresh = useCallback(async () => {
    const response = await sendPomodoroMessage({ type: 'GET_STATE' });
    if (response.ok) {
      setState(response.state);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const onChanged = (
      changes: Record<string, { newValue?: unknown }>,
      area: string,
    ) => {
      if (area !== 'local' || !(STORAGE_KEY in changes)) return;
      const next = changes[STORAGE_KEY].newValue as PomodoroState | undefined;
      if (next) setState(next);
    };

    browser.storage.onChanged.addListener(onChanged);
    return () => browser.storage.onChanged.removeListener(onChanged);
  }, []);

  useEffect(() => {
    if (state?.status !== 'running') return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [state?.status]);

  const dispatch = useCallback(
    async (type: 'START' | 'PAUSE' | 'RESET' | 'SKIP') => {
      const response = await sendPomodoroMessage({ type });
      if (response.ok) {
        setState(response.state);
      }
    },
    [],
  );

  const now = Date.now();
  const remainingMs = state ? getRemainingMs(state, now) : 0;
  const timeLabel = formatTime(remainingMs);

  return {
    state,
    loading,
    remainingMs,
    timeLabel,
    refresh,
    dispatch,
  };
}
