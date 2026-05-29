import { ThemeOverlayShell } from '@/components/themes/theme-overlay-shell';
import { COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import { useGaugeTick } from '@/hooks/use-gauge-tick';
import {
  OVERWATCH_TIMER_MAX,
  normalizeOverwatchLabel,
} from '@/lib/themes/overwatch-config';
import { getOverwatchTimerState } from '@/lib/themes/overwatch-timer';
import type { ThemeOverlayProps } from '@/lib/themes/types';

import { OverwatchHud } from './overwatch-hud';

export function OverwatchOverlay({ state }: ThemeOverlayProps) {
  useGaugeTick(state.status === 'running');

  const timer = getOverwatchTimerState(state);
  const label =
    state.settings.themeConfig.kind === 'overwatch'
      ? normalizeOverwatchLabel(state.settings.themeConfig.label)
      : normalizeOverwatchLabel(undefined);

  const isBreak = isBreakPhase(state.phase);

  return (
    <ThemeOverlayShell state={state} usePalette={false}>
      <div
        role="progressbar"
        aria-valuenow={timer.current}
        aria-valuemin={0}
        aria-valuemax={OVERWATCH_TIMER_MAX}
        aria-label={
          isBreak ? COPY.timer.staminaRecovering : COPY.timer.staminaRemaining
        }
      >
        <OverwatchHud timer={timer} label={label} />
      </div>
    </ThemeOverlayShell>
  );
}
