import { PauseIcon, PlayIcon, RotateCcwIcon, SkipForwardIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { COPY } from '@/lib/copy';
import type { PomodoroState } from '@/lib/pomodoro/types';

interface TimerControlsProps {
  state: PomodoroState;
  onStartPause: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function TimerControls({
  state,
  onStartPause,
  onPause,
  onReset,
  onSkip,
}: TimerControlsProps) {
  const isRunning = state.status === 'running';

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {isRunning ? (
        <Button onClick={onPause} className="min-w-28">
          <PauseIcon data-icon="inline-start" />
          {COPY.controls.hold}
        </Button>
      ) : (
        <Button onClick={onStartPause} className="min-w-28">
          <PlayIcon data-icon="inline-start" />
          {state.status === 'paused' ? COPY.controls.resume : COPY.controls.engage}
        </Button>
      )}
      <Button variant="outline" onClick={onReset}>
        <RotateCcwIcon data-icon="inline-start" />
        {COPY.controls.restart}
      </Button>
      <Button variant="secondary" onClick={onSkip}>
        <SkipForwardIcon data-icon="inline-start" />
        {COPY.controls.skip}
      </Button>
    </div>
  );
}
