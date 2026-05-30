import { FieldGroup, FieldSection } from '@/components/ui/field';
import { COPY } from '@/lib/copy';
import { cn } from '@/lib/utils';
import {
  SKYRIM_BAR_COLOR_OPTIONS,
  skyrimBarPreviewCss,
  type SkyrimBarColor,
} from '@/lib/themes/skyrim-colors';
import type {
  SkyrimFramePosition,
  SkyrimThemeConfig,
  ThemeSettingsPanelProps,
} from '@/lib/themes/types';

export function SkyrimSettings({
  config,
  onChange,
}: ThemeSettingsPanelProps) {
  if (config.kind !== 'skyrim') return null;

  const update = (patch: Partial<SkyrimThemeConfig>) => {
    onChange({ ...config, ...patch });
  };

  return (
    <FieldGroup>
      <FieldSection
        label={COPY.loadout.skyrimFramePosition}
        description={COPY.loadout.skyrimFramePositionHint}
      >
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { value: 'left', label: COPY.loadout.skyrimFramePositionLeft },
              {
                value: 'middle',
                label: COPY.loadout.skyrimFramePositionMiddle,
              },
              { value: 'right', label: COPY.loadout.skyrimFramePositionRight },
            ] as const
          ).map((option) => {
            const selected = config.position === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  update({ position: option.value as SkyrimFramePosition })
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
      </FieldSection>
      <FieldSection
        label={COPY.loadout.skyrimBarColor}
        description={COPY.loadout.skyrimBarColorHint}
      >
        <div className="grid grid-cols-3 gap-2">
          {SKYRIM_BAR_COLOR_OPTIONS.map((option) => {
            const selected = config.barColor === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => update({ barColor: option.id as SkyrimBarColor })}
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
                    background: skyrimBarPreviewCss(option),
                  }}
                  aria-hidden
                />
                <span className="text-xs font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </FieldSection>
    </FieldGroup>
  );
}
