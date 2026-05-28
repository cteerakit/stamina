import { Badge } from '@/components/ui/badge';
import { COPY } from '@/lib/copy';
import { cn } from '@/lib/utils';
import { isBreakPhase } from '@/lib/pomodoro/phases';
import type { Phase } from '@/lib/pomodoro/types';

interface PhaseBadgeProps {
  phase: Phase;
  className?: string;
}

export function PhaseBadge({ phase, className }: PhaseBadgeProps) {
  return (
    <Badge
      variant={isBreakPhase(phase) ? 'default' : 'secondary'}
      className={cn(className)}
    >
      {COPY.phases[phase]}
    </Badge>
  );
}
