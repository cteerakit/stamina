import { Button } from '@/components/ui/button';
import { COPY } from '@/lib/copy';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { PomodoroSettings } from '@/lib/pomodoro/types';

interface TimerSettingsPanelProps {
  form: PomodoroSettings;
  timerActive: boolean;
  saved: boolean;
  hasError: boolean;
  onUpdateField: (key: keyof PomodoroSettings, value: string) => void;
  onShowOverlayWhenIdleChange: (value: boolean) => void;
  onSave: () => void | Promise<void>;
  onReset: () => void | Promise<void>;
}

export function TimerSettingsPanel({
  form,
  timerActive,
  saved,
  hasError,
  onUpdateField,
  onShowOverlayWhenIdleChange,
  onSave,
  onReset,
}: TimerSettingsPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      {timerActive && (
        <FieldDescription>{COPY.loadout.activeBlocker}</FieldDescription>
      )}
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
            onChange={(e) => onUpdateField('focusMinutes', e.target.value)}
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
            onChange={(e) => onUpdateField('shortBreakMinutes', e.target.value)}
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
            onChange={(e) => onUpdateField('longBreakMinutes', e.target.value)}
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
              onUpdateField('sessionsUntilLongBreak', e.target.value)
            }
          />
        </Field>
        <Field orientation="horizontal">
          <input
            id="show-overlay-idle"
            type="checkbox"
            className="size-4 shrink-0 rounded border border-input accent-primary"
            checked={form.showOverlayWhenIdle}
            onChange={(e) => onShowOverlayWhenIdleChange(e.target.checked)}
          />
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor="show-overlay-idle" className="font-normal">
              {COPY.loadout.showOverlayWhenIdle}
            </FieldLabel>
            <FieldDescription>
              {COPY.loadout.showOverlayWhenIdleHint}
            </FieldDescription>
          </div>
        </Field>
        {hasError && (
          <FieldDescription className="text-destructive">
            {COPY.loadout.validationError}
          </FieldDescription>
        )}
        {saved && !hasError && (
          <FieldDescription>{COPY.loadout.saved}</FieldDescription>
        )}
      </FieldGroup>
      <div className="flex gap-2">
        <Button onClick={() => void onSave()} disabled={timerActive}>
          {COPY.loadout.save}
        </Button>
        <Button variant="outline" onClick={() => void onReset()}>
          {COPY.loadout.resetDefaults}
        </Button>
      </div>
    </div>
  );
}
