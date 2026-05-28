import { useCallback, useEffect, useState } from 'react';

import { TimerThemePicker } from '@/components/timer-theme-picker';
import { Button } from '@/components/ui/button';
import { COPY } from '@/lib/copy';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_SETTINGS, STORAGE_KEY } from '@/lib/pomodoro/constants';
import { mergeSettings, phaseDurationMs, validateSettings } from '@/lib/pomodoro/settings';
import { getPomodoroState, setPomodoroState } from '@/lib/pomodoro/storage';
import type { TimerTheme } from '@/lib/pomodoro/timer-themes';
import type { PomodoroSettings, PomodoroState, TimerStatus } from '@/lib/pomodoro/types';

interface SettingsPanelProps {
  timerStatus: TimerStatus;
}

export function SettingsPanel({ timerStatus }: SettingsPanelProps) {
  const [form, setForm] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const timerActive = timerStatus === 'running' || timerStatus === 'paused';

  const handleSave = async () => {
    setError(null);
    setSaved(false);

    const validated = validateSettings(form);
    if (!validated) {
      setError(COPY.loadout.validationError);
      return;
    }

    const state = await getPomodoroState();
    const remainingMs =
      state.status === 'idle'
        ? phaseDurationMs(state.phase, validated)
        : state.remainingMs;
    await setPomodoroState({ ...state, settings: validated, remainingMs });
    setForm(validated);
    setSaved(true);
  };

  const handleReset = async () => {
    setError(null);
    setSaved(false);
    const defaults = mergeSettings();
    setForm(defaults);

    if (!timerActive) {
      const state = await getPomodoroState();
      const remainingMs = phaseDurationMs(state.phase, defaults);
      await setPomodoroState({ ...state, settings: defaults, remainingMs });
      setSaved(true);
    }
  };

  const updateField = (key: keyof PomodoroSettings, value: string) => {
    setForm((prev) => ({ ...prev, [key]: Number(value) }));
    setSaved(false);
  };

  const handleThemeChange = async (timerTheme: TimerTheme) => {
    setError(null);
    const state = await getPomodoroState();
    const settings = mergeSettings({ ...state.settings, timerTheme });
    await setPomodoroState({ ...state, settings });
    setForm(settings);
  };

  return (
    <div className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>{COPY.loadout.arenaSkin}</FieldLabel>
          <TimerThemePicker
            value={form.timerTheme}
            onChange={(theme) => void handleThemeChange(theme)}
          />
          <FieldDescription>{COPY.loadout.arenaSkinHint}</FieldDescription>
        </Field>
      </FieldGroup>
      <Separator />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="focus">{COPY.loadout.grindLength}</FieldLabel>
          <Input
            id="focus"
            type="number"
            min={1}
            max={120}
            value={form.focusMinutes}
            disabled={timerActive}
            onChange={(e) => updateField('focusMinutes', e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="short-break">{COPY.loadout.shortCooldown}</FieldLabel>
          <Input
            id="short-break"
            type="number"
            min={1}
            max={120}
            value={form.shortBreakMinutes}
            disabled={timerActive}
            onChange={(e) => updateField('shortBreakMinutes', e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="long-break">{COPY.loadout.fullRecovery}</FieldLabel>
          <Input
            id="long-break"
            type="number"
            min={1}
            max={120}
            value={form.longBreakMinutes}
            disabled={timerActive}
            onChange={(e) => updateField('longBreakMinutes', e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="sessions">{COPY.loadout.roundsBeforeRecovery}</FieldLabel>
          <Input
            id="sessions"
            type="number"
            min={1}
            max={10}
            value={form.sessionsUntilLongBreak}
            disabled={timerActive}
            onChange={(e) =>
              updateField('sessionsUntilLongBreak', e.target.value)
            }
          />
        </Field>
        {timerActive && (
          <FieldDescription>
            {COPY.loadout.activeBlocker}
          </FieldDescription>
        )}
        {error && (
          <FieldDescription className="text-destructive">{error}</FieldDescription>
        )}
        {saved && !error && (
          <FieldDescription>{COPY.loadout.saved}</FieldDescription>
        )}
      </FieldGroup>
      <div className="flex gap-2">
        <Button onClick={() => void handleSave()} disabled={timerActive}>
          {COPY.loadout.save}
        </Button>
        <Button variant="outline" onClick={() => void handleReset()}>
          {COPY.loadout.resetDefaults}
        </Button>
      </div>
    </div>
  );
}
