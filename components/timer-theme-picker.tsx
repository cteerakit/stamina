import { cn } from '@/lib/utils';
import {
  TIMER_THEME_OPTIONS,
  type TimerTheme,
} from '@/lib/pomodoro/timer-themes';

interface TimerThemePickerProps {
  value: TimerTheme;
  onChange: (theme: TimerTheme) => void;
}

export function TimerThemePicker({ value, onChange }: TimerThemePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TIMER_THEME_OPTIONS.map((theme) => {
        const selected = value === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(theme.id)}
            className={cn(
              'flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors',
              selected
                ? 'border-primary bg-primary/5 ring-2 ring-primary/25'
                : 'border-border bg-card hover:bg-accent/50',
            )}
          >
            <span className="flex items-center gap-1.5">
              <span
                className="size-4 shrink-0 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: theme.previewFocus }}
                aria-hidden
              />
              <span
                className="size-4 shrink-0 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: theme.previewBreak }}
                aria-hidden
              />
              <span className="text-sm font-medium">{theme.label}</span>
            </span>
            <span className="text-xs text-muted-foreground leading-snug">
              {theme.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
