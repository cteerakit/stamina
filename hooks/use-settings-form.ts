import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_SETTINGS, STORAGE_KEY } from '@/lib/pomodoro/constants';
import { mergeSettings, phaseDurationMs, validateSettings } from '@/lib/pomodoro/settings';
import { getPomodoroState, setPomodoroState } from '@/lib/pomodoro/storage';
import type { PomodoroSettings, PomodoroState, TimerStatus } from '@/lib/pomodoro/types';

export function useSettingsForm(timerStatus: TimerStatus) {
  const [form, setForm] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timerActive = timerStatus === 'running' || timerStatus === 'paused';

  const load = useCallback(async () => {
    const state = await getPomodoroState();
    setForm(state.settings);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onChanged = (
      changes: Record<string, { newValue?: unknown }>,
      area: string,
    ) => {
      if (area !== 'local' || !(STORAGE_KEY in changes)) return;
      const next = changes[STORAGE_KEY].newValue as PomodoroState | undefined;
      if (next) setForm(next.settings);
    };

    browser.storage.onChanged.addListener(onChanged);
    return () => browser.storage.onChanged.removeListener(onChanged);
  }, []);

  const persistSettings = useCallback(async (settings: PomodoroSettings) => {
    const state = await getPomodoroState();
    const remainingMs =
      state.status === 'idle'
        ? phaseDurationMs(state.phase, settings)
        : state.remainingMs;
    await setPomodoroState({ ...state, settings, remainingMs });
    setForm(settings);
  }, []);

  const updateField = (key: keyof PomodoroSettings, value: string) => {
    setForm((prev) => ({ ...prev, [key]: Number(value) }));
    setSaved(false);
    setError(null);
  };

  const saveTimerSettings = async () => {
    setError(null);
    setSaved(false);

    const validated = validateSettings(form);
    if (!validated) {
      setError('validation');
      return;
    }

    await persistSettings(validated);
    setSaved(true);
  };

  const resetAllSettings = async () => {
    setError(null);
    setSaved(false);
    const defaults = mergeSettings();
    setForm(defaults);

    if (!timerActive) {
      await persistSettings(defaults);
      setSaved(true);
    }
  };

  const applySettings = async (partial: Partial<PomodoroSettings>) => {
    setError(null);
    const settings = mergeSettings({ ...form, ...partial });
    await persistSettings(settings);
  };

  return {
    form,
    setForm,
    saved,
    error,
    timerActive,
    updateField,
    saveTimerSettings,
    resetAllSettings,
    applySettings,
  };
}
