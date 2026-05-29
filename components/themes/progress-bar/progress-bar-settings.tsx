import { ColorPalettePicker } from '@/components/color-palette-picker';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { COPY } from '@/lib/copy';
import { cn } from '@/lib/utils';
import type { ColorPalette } from '@/lib/pomodoro/timer-themes';
import type {
  ProgressBarPosition,
  ProgressBarThemeConfig,
  ThemeSettingsPanelProps,
} from '@/lib/themes/types';

export function ProgressBarSettings({
  config,
  onChange,
}: ThemeSettingsPanelProps) {
  if (config.kind !== 'progressBar') return null;

  const update = (patch: Partial<ProgressBarThemeConfig>) => {
    onChange({ ...config, ...patch });
  };

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>{COPY.loadout.progressBarPosition}</FieldLabel>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: 'top', label: COPY.loadout.progressBarPositionTop },
              {
                value: 'bottom',
                label: COPY.loadout.progressBarPositionBottom,
              },
            ] as const
          ).map((option) => {
            const selected = config.position === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  update({ position: option.value as ProgressBarPosition })
                }
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                  selected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/25'
                    : 'border-border bg-card hover:bg-accent/50',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <FieldDescription>
          {COPY.loadout.progressBarPositionHint}
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>{COPY.loadout.colorPalette}</FieldLabel>
        <ColorPalettePicker
          value={config.palette}
          onChange={(palette: ColorPalette) => update({ palette })}
        />
        <FieldDescription>{COPY.loadout.colorPaletteHint}</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
