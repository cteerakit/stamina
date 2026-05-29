import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { COPY } from '@/lib/copy';
import {
  DEFAULT_OVERWATCH_LABEL,
  OVERWATCH_LABEL_MAX_LENGTH,
} from '@/lib/themes/overwatch-config';
import type {
  OverwatchThemeConfig,
  ThemeSettingsPanelProps,
} from '@/lib/themes/types';

export function OverwatchSettings({
  config,
  onChange,
}: ThemeSettingsPanelProps) {
  if (config.kind !== 'overwatch') return null;

  const setLabel = (label: string) => {
    onChange({
      kind: 'overwatch',
      label: label.slice(0, OVERWATCH_LABEL_MAX_LENGTH),
    } satisfies OverwatchThemeConfig);
  };

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="overwatch-label">
          {COPY.loadout.overwatchLabel}
        </FieldLabel>
        <Input
          id="overwatch-label"
          type="text"
          maxLength={OVERWATCH_LABEL_MAX_LENGTH}
          value={config.label}
          placeholder={DEFAULT_OVERWATCH_LABEL}
          onChange={(e) => setLabel(e.target.value)}
        />
        <FieldDescription>{COPY.loadout.overwatchLabelHint}</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
