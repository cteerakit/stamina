import { ThemeOverlayShell } from '@/components/themes/theme-overlay-shell';
import { COPY } from '@/lib/copy';
import { getGaugeFraction, getGaugePercent } from '@/lib/themes/gauge-math';
import type { ThemeOverlayProps } from '@/lib/themes/types';

const BAR_HEIGHT = 5;

export function ProgressBarOverlay({ state }: ThemeOverlayProps) {
  const gaugeFraction = getGaugeFraction(state);
  const gaugePercent = getGaugePercent(state);
  const isBreak = state.phase === 'shortBreak' || state.phase === 'longBreak';

  return (
    <ThemeOverlayShell state={state}>
      <div
        className="w-full"
        style={{ width: '100%', height: BAR_HEIGHT }}
        role="progressbar"
        aria-valuenow={gaugePercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={
          isBreak ? COPY.timer.staminaRecovering : COPY.timer.staminaRemaining
        }
      >
        <div className="h-full w-full bg-primary/20">
          <div
            className="h-full bg-primary transition-[width] duration-1000 ease-linear"
            style={{ width: `${gaugeFraction * 100}%` }}
          />
        </div>
      </div>
    </ThemeOverlayShell>
  );
}
