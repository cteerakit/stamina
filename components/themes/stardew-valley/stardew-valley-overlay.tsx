import { ThemeOverlayShell } from '@/components/themes/theme-overlay-shell';
import { COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import { useGaugeTick } from '@/hooks/use-gauge-tick';
import { getGaugeFraction, getGaugePercent } from '@/lib/themes/gauge-math';
import type { ThemeOverlayProps } from '@/lib/themes/types';

import { StardewEnergyBar } from './stardew-energy-bar';

export function StardewValleyOverlay({ state }: ThemeOverlayProps) {
  useGaugeTick(state.status === 'running');

  const fillFraction = getGaugeFraction(state);
  const gaugePercent = getGaugePercent(state);
  const isBreak = isBreakPhase(state.phase);

  return (
    <ThemeOverlayShell state={state} usePalette={false}>
      <div
        role="progressbar"
        aria-valuenow={gaugePercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={
          isBreak ? COPY.timer.staminaRecovering : COPY.timer.staminaRemaining
        }
      >
        <StardewEnergyBar fillFraction={fillFraction} />
      </div>
    </ThemeOverlayShell>
  );
}
