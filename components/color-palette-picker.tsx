import { cn } from '@/lib/utils';
import {
  COLOR_PALETTE_OPTIONS,
  type ColorPalette,
} from '@/lib/pomodoro/timer-themes';

interface ColorPalettePickerProps {
  value: ColorPalette;
  onChange: (palette: ColorPalette) => void;
}

export function ColorPalettePicker({ value, onChange }: ColorPalettePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {COLOR_PALETTE_OPTIONS.map((palette) => {
        const selected = value === palette.id;
        return (
          <button
            key={palette.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(palette.id)}
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
                style={{ backgroundColor: palette.previewFocus }}
                aria-hidden
              />
              <span
                className="size-4 shrink-0 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: palette.previewBreak }}
                aria-hidden
              />
              <span className="text-sm font-medium">{palette.label}</span>
            </span>
            <span className="text-xs text-muted-foreground leading-snug">
              {palette.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
