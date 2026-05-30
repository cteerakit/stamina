import { SkyrimBarFill } from '@/components/themes/skyrim/skyrim-bar';
import { SkyrimFrame } from '@/components/themes/skyrim/skyrim-frame';
import { ThemeOverlayShell } from '@/components/themes/theme-overlay-shell';
import { COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import { getGaugeFraction, getGaugePercent } from '@/lib/themes/gauge-math';
import type { SkyrimFramePosition, ThemeOverlayProps } from '@/lib/themes/types';

const BAR_WIDTH = 426;
const BAR_HEIGHT = 33;

/** Inner cavity of assets/skyrim-frame.svg (top/bottom rails and straight section). */
const FRAME_INNER = {
  left: 25.1183,
  right: 400.347,
  top: 5.33633,
  bottom: 26.778,
} as const;

const TRACK_WIDTH = 372;
const TRACK_HEIGHT = 18;

const FRAME_INNER_WIDTH = FRAME_INNER.right - FRAME_INNER.left;
const FRAME_INNER_HEIGHT = FRAME_INNER.bottom - FRAME_INNER.top;

/** Centered in the frame inner cavity (assets/skyrim-frame.svg). */
const TRACK_X = FRAME_INNER.left + (FRAME_INNER_WIDTH - TRACK_WIDTH) / 2;
const TRACK_Y = FRAME_INNER.top + (FRAME_INNER_HEIGHT - TRACK_HEIGHT) / 2;

function getSkyrimFillX(
  position: SkyrimFramePosition,
  fillWidth: number,
): number {
  switch (position) {
    case 'left':
      return TRACK_X;
    case 'right':
      return TRACK_X + TRACK_WIDTH - fillWidth;
    default:
      return TRACK_X + (TRACK_WIDTH - fillWidth) / 2;
  }
}

export function SkyrimOverlay({ state }: ThemeOverlayProps) {
  const gaugeFraction = getGaugeFraction(state);
  const gaugePercent = getGaugePercent(state);
  const isBreak = isBreakPhase(state.phase);
  const skyrimConfig =
    state.settings.themeConfig.kind === 'skyrim'
      ? state.settings.themeConfig
      : null;
  const barColor = skyrimConfig?.barColor ?? 'health';
  const framePosition = skyrimConfig?.position ?? 'middle';

  const fillWidth = TRACK_WIDTH * gaugeFraction;
  const fillX = getSkyrimFillX(framePosition, fillWidth);

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
        <svg
          width={BAR_WIDTH}
          height={BAR_HEIGHT}
          viewBox={`0 0 ${BAR_WIDTH} ${BAR_HEIGHT}`}
          aria-hidden
        >
          <SkyrimFrame />

          <SkyrimBarFill
            color={barColor}
            x={fillX}
            y={TRACK_Y}
            width={fillWidth}
            height={TRACK_HEIGHT}
          />
        </svg>
      </div>
    </ThemeOverlayShell>
  );
}
