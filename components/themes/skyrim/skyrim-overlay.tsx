import { ThemeOverlayShell } from '@/components/themes/theme-overlay-shell';
import { COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import { getGaugeFraction, getGaugePercent } from '@/lib/themes/gauge-math';
import {
  getSkyrimBarColorOption,
  type SkyrimBarColor,
} from '@/lib/themes/skyrim-colors';
import type { ThemeOverlayProps } from '@/lib/themes/types';

const BAR_WIDTH = 360;
const BAR_HEIGHT = 26;
const TRACK_X = 14;
const TRACK_Y = 8;
const TRACK_WIDTH = BAR_WIDTH - TRACK_X * 2;
const TRACK_HEIGHT = 10;
const BAR_CENTER_Y = BAR_HEIGHT / 2;
const FRAME_RAIL_Y_TOP = TRACK_Y - 2;
const FRAME_RAIL_Y_BOTTOM = TRACK_Y + TRACK_HEIGHT + 2;
const CHEVRON_WING_OFFSET = 7;
const FRAME_STROKE = '#c5c5c5';

function gradientId(color: SkyrimBarColor, layer: 'v' | 'h'): string {
  return `skyrim-${color}-${layer}`;
}

export function SkyrimOverlay({ state }: ThemeOverlayProps) {
  const gaugeFraction = getGaugeFraction(state);
  const gaugePercent = getGaugePercent(state);
  const isBreak = isBreakPhase(state.phase);
  const barColor =
    state.settings.themeConfig.kind === 'skyrim'
      ? state.settings.themeConfig.barColor
      : 'health';
  const colorOption = getSkyrimBarColorOption(barColor);

  const fillWidth = TRACK_WIDTH * gaugeFraction;
  const fillX = TRACK_X + (TRACK_WIDTH - fillWidth) / 2;
  const verticalId = gradientId(barColor, 'v');
  const horizontalId = gradientId(barColor, 'h');

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
          <defs>
            <linearGradient id={verticalId} x1="0" y1="0" x2="0" y2="1">
              {colorOption.verticalStops.map((stop) => (
                <stop
                  key={stop.offset}
                  offset={stop.offset}
                  stopColor={stop.color}
                />
              ))}
            </linearGradient>
            <linearGradient id={horizontalId} x1="0" y1="0" x2="1" y2="0">
              {colorOption.horizontalStops.map((stop) => (
                <stop
                  key={stop.offset}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity={stop.opacity ?? 1}
                />
              ))}
            </linearGradient>
          </defs>

          <polygon
            points={`0,${BAR_CENTER_Y} 11,${BAR_CENTER_Y - CHEVRON_WING_OFFSET} 11,${TRACK_Y} 14,${TRACK_Y} 14,${TRACK_Y + TRACK_HEIGHT} 11,${TRACK_Y + TRACK_HEIGHT} 11,${BAR_CENTER_Y + CHEVRON_WING_OFFSET}`}
            fill="none"
            stroke={FRAME_STROKE}
            strokeWidth="1"
            strokeLinejoin="miter"
          />
          <polygon
            points={`${BAR_WIDTH},${BAR_CENTER_Y} ${BAR_WIDTH - 11},${BAR_CENTER_Y - CHEVRON_WING_OFFSET} ${BAR_WIDTH - 11},${TRACK_Y} ${BAR_WIDTH - 14},${TRACK_Y} ${BAR_WIDTH - 14},${TRACK_Y + TRACK_HEIGHT} ${BAR_WIDTH - 11},${TRACK_Y + TRACK_HEIGHT} ${BAR_WIDTH - 11},${BAR_CENTER_Y + CHEVRON_WING_OFFSET}`}
            fill="none"
            stroke={FRAME_STROKE}
            strokeWidth="1"
            strokeLinejoin="miter"
          />
          <line
            x1={14}
            y1={FRAME_RAIL_Y_TOP}
            x2={BAR_WIDTH - 14}
            y2={FRAME_RAIL_Y_TOP}
            stroke={FRAME_STROKE}
            strokeWidth="1"
          />
          <line
            x1={14}
            y1={FRAME_RAIL_Y_BOTTOM}
            x2={BAR_WIDTH - 14}
            y2={FRAME_RAIL_Y_BOTTOM}
            stroke={FRAME_STROKE}
            strokeWidth="1"
          />

          <rect
            x={TRACK_X}
            y={TRACK_Y}
            width={TRACK_WIDTH}
            height={TRACK_HEIGHT}
            fill="#121212"
          />

          {fillWidth > 0 && (
            <>
              <rect
                x={fillX}
                y={TRACK_Y}
                width={fillWidth}
                height={TRACK_HEIGHT}
                fill={`url(#${verticalId})`}
                style={{ transition: 'x 1s linear, width 1s linear' }}
              />
              <rect
                x={fillX}
                y={TRACK_Y}
                width={fillWidth}
                height={TRACK_HEIGHT}
                fill={`url(#${horizontalId})`}
                style={{
                  transition: 'x 1s linear, width 1s linear',
                  mixBlendMode: 'screen',
                }}
              />
            </>
          )}
        </svg>
      </div>
    </ThemeOverlayShell>
  );
}
