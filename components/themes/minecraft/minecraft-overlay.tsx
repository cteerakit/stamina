import { ThemeOverlayShell } from '@/components/themes/theme-overlay-shell';
import { COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import { getGaugeFraction, getGaugePercent } from '@/lib/themes/gauge-math';
import { getMinecraftHeartStates } from '@/lib/themes/minecraft-hearts';
import type { ThemeOverlayProps } from '@/lib/themes/types';

import { MinecraftHeartIcon } from './minecraft-heart-icon';

const HEART_GAP = 2;

export function MinecraftOverlay({ state }: ThemeOverlayProps) {
  const gaugeFraction = getGaugeFraction(state);
  const gaugePercent = getGaugePercent(state);
  const isBreak = isBreakPhase(state.phase);
  const heartStates = getMinecraftHeartStates(gaugeFraction);

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
        className="flex items-center"
        style={{
          gap: HEART_GAP,
          imageRendering: 'pixelated',
        }}
      >
        {heartStates.map((heartState, index) => (
          <MinecraftHeartIcon key={index} state={heartState} />
        ))}
      </div>
    </ThemeOverlayShell>
  );
}
