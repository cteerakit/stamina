import { PhaseBadge } from '@/components/phase-badge';
import { COPY } from '@/lib/copy';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import {
  formatTime,
  getPhaseDurationMs,
  getRemainingMs,
} from '@/lib/pomodoro/storage';
import type { PomodoroState } from '@/lib/pomodoro/types';

interface TimerDisplayProps {
  state: PomodoroState;
}

const SIZE = 220;
const STROKE = 10;

export function TimerDisplay({ state }: TimerDisplayProps) {
  const remainingMs = getRemainingMs(state);
  const totalMs = getPhaseDurationMs(state);
  const remainingFraction =
    totalMs > 0 ? Math.min(1, Math.max(0, remainingMs / totalMs)) : 0;
  const isBreak = isBreakPhase(state.phase);

  // Grind: ring depletes as stamina runs out. Break: ring fills as stamina returns.
  const gaugeFraction = isBreak ? 1 - remainingFraction : remainingFraction;

  const radius = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - gaugeFraction);
  const gaugePercent = Math.round(gaugeFraction * 100);

  return (
    <div
      className="relative mx-auto"
      style={{ width: SIZE, height: SIZE }}
      role="progressbar"
      aria-valuenow={gaugePercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={
        isBreak ? COPY.timer.staminaRecovering : COPY.timer.staminaRemaining
      }
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-primary/15"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          className="text-primary transition-[stroke-dashoffset] duration-1000 ease-linear"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6">
        <p className="text-5xl font-semibold tracking-tight tabular-nums">
          {formatTime(remainingMs)}
        </p>
        <PhaseBadge phase={state.phase} className="max-w-full truncate" />
      </div>
    </div>
  );
}
