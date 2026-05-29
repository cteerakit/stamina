import { OVERWATCH_SEGMENT_COUNT } from '@/lib/themes/overwatch-config';
import type { OverwatchTimerState } from '@/lib/themes/overwatch-timer';

import './overwatch-hud.css';

interface OverwatchHudProps {
  timer: OverwatchTimerState;
  label: string;
}

export function OverwatchHud({ timer, label }: OverwatchHudProps) {
  const displayLabel = label.trim().toUpperCase() || 'FOCUS';

  return (
    <div className="overwatch-hud">
      <div className="overwatch-hud__portrait-wrap">
        <div className="overwatch-hud__portrait" aria-hidden />
      </div>

      <div className="overwatch-hud__panel">
        <div className="overwatch-hud__values">
          <span className="overwatch-hud__current">{timer.current}</span>
          <span className="overwatch-hud__divider" aria-hidden />
          <span className="overwatch-hud__capacity">{timer.capacity}</span>
        </div>

        <div className="overwatch-hud__bar-wrap">
          <div
            className="overwatch-hud__bar"
            aria-hidden
          >
            {Array.from({ length: OVERWATCH_SEGMENT_COUNT }, (_, index) => {
              if (index < timer.filledSegments) {
                return (
                  <span
                    key={index}
                    className="overwatch-hud__segment overwatch-hud__segment--filled"
                  />
                );
              }
              if (
                index === timer.filledSegments &&
                timer.partialSegment > 0
              ) {
                return (
                  <span
                    key={index}
                    className="overwatch-hud__segment overwatch-hud__segment--partial"
                  >
                    <span
                      className="overwatch-hud__segment-partial-fill"
                      style={{ width: `${timer.partialSegment * 100}%` }}
                    />
                  </span>
                );
              }
              return <span key={index} className="overwatch-hud__segment" />;
            })}
          </div>
          <div className="overwatch-hud__bar-glow" aria-hidden />
        </div>

        <span className="overwatch-hud__label">{displayLabel}</span>
      </div>
    </div>
  );
}
