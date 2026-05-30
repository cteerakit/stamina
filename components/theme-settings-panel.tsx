import { DisplayThemePicker } from '@/components/themes/display-theme-picker';
import { COPY } from '@/lib/copy';
import { getDisplayThemeDefinition } from '@/lib/themes/registry';
import {
  switchDisplayTheme,
  updateThemeConfig,
} from '@/lib/themes/theme-config';
import type { DisplayTheme, ThemeConfig } from '@/lib/themes/types';
import { FieldGroup, FieldSection } from '@/components/ui/field';
import type { PomodoroSettings } from '@/lib/pomodoro/types';

interface ThemeSettingsPanelProps {
  form: PomodoroSettings;
  onApply: (partial: Partial<PomodoroSettings>) => void | Promise<void>;
}

export function ThemeSettingsPanel({ form, onApply }: ThemeSettingsPanelProps) {
  const handleDisplayThemeChange = (displayTheme: DisplayTheme) => {
    void onApply(switchDisplayTheme(form, displayTheme));
  };

  const handleThemeConfigChange = (themeConfig: ThemeConfig) => {
    void onApply(updateThemeConfig(form, themeConfig));
  };

  const ThemeSettings = getDisplayThemeDefinition(form.displayTheme).SettingsPanel;

  return (
    <div className="flex flex-col gap-4">
      <FieldGroup>
        <FieldSection
          label={COPY.loadout.displayTheme}
          description={COPY.loadout.displayThemeHint}
        >
          <DisplayThemePicker
            value={form.displayTheme}
            onChange={handleDisplayThemeChange}
          />
        </FieldSection>
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
