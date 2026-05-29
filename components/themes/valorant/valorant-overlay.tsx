import { ThemeOverlayShell } from '@/components/themes/theme-overlay-shell';
import { COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import { useGaugeTick } from '@/hooks/use-gauge-tick';
import { getValorantTimerValue } from '@/lib/themes/valorant-timer';
import type { ThemeOverlayProps } from '@/lib/themes/types';

import { ValorantHud } from './valorant-hud';

export function ValorantOverlay({ state }: ThemeOverlayProps) {
  useGaugeTick(state.status === 'running');

  const timerValue = getValorantTimerValue(state);

  const isBreak = isBreakPhase(state.phase);

  return (
    <ThemeOverlayShell state={state} usePalette={false}>
      <div
        role="progressbar"
        aria-valuenow={timerValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={
          isBreak ? COPY.timer.staminaRecovering : COPY.timer.staminaRemaining
        }
      >
        <ValorantHud timerValue={timerValue} />
      </div>
    </ThemeOverlayShell>
  );
}
