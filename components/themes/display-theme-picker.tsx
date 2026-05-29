import { cn } from '@/lib/utils';
import { DISPLAY_THEME_OPTIONS } from '@/lib/themes/registry';
import type { DisplayTheme } from '@/lib/themes/types';

interface DisplayThemePickerProps {
  value: DisplayTheme;
  onChange: (theme: DisplayTheme) => void;
}

export function DisplayThemePicker({ value, onChange }: DisplayThemePickerProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {DISPLAY_THEME_OPTIONS.map((theme) => {
        const selected = value === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(theme.id)}
            className={cn(
              'rounded-lg border p-3 text-left text-sm font-medium transition-colors',
              selected
                ? 'border-primary bg-primary/5 ring-2 ring-primary/25'
                : 'border-border bg-card hover:bg-accent/50',
            )}
          >
            {theme.label}
          </button>
        );
      })}
    </div>
  );
}
