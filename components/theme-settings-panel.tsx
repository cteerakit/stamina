import { DisplayThemePicker } from '@/components/themes/display-theme-picker';
import { COPY } from '@/lib/copy';
import { getDisplayThemeDefinition } from '@/lib/themes/registry';
import { themeConfigForDisplay } from '@/lib/themes/theme-config';
import type { DisplayTheme, ThemeConfig } from '@/lib/themes/types';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import type { PomodoroSettings } from '@/lib/pomodoro/types';

interface ThemeSettingsPanelProps {
  form: PomodoroSettings;
  onApply: (partial: Partial<PomodoroSettings>) => void | Promise<void>;
}

export function ThemeSettingsPanel({ form, onApply }: ThemeSettingsPanelProps) {
  const handleDisplayThemeChange = (displayTheme: DisplayTheme) => {
    const themeConfig = themeConfigForDisplay(displayTheme, form.themeConfig);
    void onApply({ displayTheme, themeConfig });
  };

  const handleThemeConfigChange = (themeConfig: ThemeConfig) => {
    void onApply({ themeConfig });
  };

  const ThemeSettings = getDisplayThemeDefinition(form.displayTheme).SettingsPanel;

  return (
    <div className="flex flex-col gap-4">
      <FieldDescription>{COPY.loadout.displayThemeHint}</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel>{COPY.loadout.displayTheme}</FieldLabel>
          <DisplayThemePicker
            value={form.displayTheme}
            onChange={handleDisplayThemeChange}
          />
        </Field>
      </FieldGroup>
      <FieldGroup>
        <ThemeSettings
          config={form.themeConfig}
          onChange={handleThemeConfigChange}
        />
      </FieldGroup>
    </div>
  );
}
