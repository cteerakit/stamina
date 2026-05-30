import { useEffect, useRef, type ReactNode } from 'react';

import { isBreakPhase } from '@/lib/pomodoro/phases';
import { getColorPaletteFromSettings } from '@/lib/themes/theme-config';
import type { PomodoroState } from '@/lib/pomodoro/types';

interface ThemeOverlayShellProps {
  state: PomodoroState;
  /** When false, palette CSS tokens are omitted (e.g. Skyrim fixed art). */
  usePalette?: boolean;
  children: ReactNode;
}

function isPointerInsideRect(
  clientX: number,
  clientY: number,
  rect: DOMRect,
): boolean {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

export function ThemeOverlayShell({
  state,
  usePalette = true,
  children,
}: ThemeOverlayShellProps) {
  const phaseTheme = isBreakPhase(state.phase) ? 'break' : 'focus';
  const palette = getColorPaletteFromSettings(state.settings);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const setFaded = (faded: boolean) => {
      if (faded) {
        overlay.dataset.faded = '';
      } else {
        delete overlay.dataset.faded;
      }
    };

    const updateFromPointer = (clientX: number, clientY: number) => {
      const rect = overlay.getBoundingClientRect();
      setFaded(isPointerInsideRect(clientX, clientY, rect));
    };

    const onPointerMove = (event: PointerEvent) => {
      updateFromPointer(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      setFaded(false);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      setFaded(false);
    };
  }, []);

  const isPaused = state.status === 'paused';

  return (
    <div
      ref={overlayRef}
      data-gauge-overlay=""
      data-display-theme={state.settings.displayTheme}
      data-phase={phaseTheme}
      {...(isPaused ? { 'data-paused': '' } : {})}
      {...(usePalette ? { 'data-color-palette': palette } : {})}
    >
      {children}
    </div>
  );
}
