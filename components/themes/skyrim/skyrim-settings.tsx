import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { COPY } from '@/lib/copy';
import { cn } from '@/lib/utils';
import {
  SKYRIM_BAR_COLOR_OPTIONS,
  type SkyrimBarColor,
} from '@/lib/themes/skyrim-colors';
import type { SkyrimThemeConfig, ThemeSettingsPanelProps } from '@/lib/themes/types';

export function SkyrimSettings({
  config,
  onChange,
}: ThemeSettingsPanelProps) {
  if (config.kind !== 'skyrim') return null;

  const setBarColor = (barColor: SkyrimBarColor) => {
    onChange({ kind: 'skyrim', barColor } satisfies SkyrimThemeConfig);
  };

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>{COPY.loadout.skyrimBarColor}</FieldLabel>
        <div className="grid grid-cols-3 gap-2">
          {SKYRIM_BAR_COLOR_OPTIONS.map((option) => {
            const selected = config.barColor === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setBarColor(option.id)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-colors',
                  selected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/25'
                    : 'border-border bg-card hover:bg-accent/50',
                )}
              >
                <span
                  className="h-4 w-full rounded-sm ring-1 ring-black/20"
                  style={{
                    background: `linear-gradient(180deg, ${option.verticalStops[1]?.color ?? option.preview} 0%, ${option.verticalStops[3]?.color ?? option.preview} 50%, ${option.verticalStops[1]?.color ?? option.preview} 100%)`,
                  }}
                  aria-hidden
                />
                <span className="text-xs font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
        <FieldDescription>{COPY.loadout.skyrimBarColorHint}</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
