import { useEffect, useState } from 'react';

/** Re-render gauge overlays every second while the timer is running. */
export function useGaugeTick(running: boolean): void {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
}
