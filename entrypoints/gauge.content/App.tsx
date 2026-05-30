import { useEffect } from 'react';

import { usePomodoroState } from '@/hooks/use-pomodoro-state';
import { shouldShowPageOverlay } from '@/lib/pomodoro/overlay-visibility';
import { applyHostPin, resolveHostPin } from '@/lib/themes/host-pin';
import { getDisplayThemeDefinition } from '@/lib/themes/registry';

export default function GaugeApp() {
  const { state, loading } = usePomodoroState();

  const displayTheme = state?.settings.displayTheme ?? 'progressBar';
  const progressBarPosition =
    state?.settings.themeConfig.kind === 'progressBar'
      ? state.settings.themeConfig.position
      : null;
  const skyrimFramePosition =
    state?.settings.themeConfig.kind === 'skyrim'
      ? state.settings.themeConfig.position
      : null;

  const overlayVisible = state ? shouldShowPageOverlay(state) : false;

  useEffect(() => {
    const host = document.querySelector('stamina-gauge');
    if (!(host instanceof HTMLElement)) return;

    if (overlayVisible) {
      host.removeAttribute('data-overlay-hidden');
    } else {
      host.dataset.overlayHidden = '';
    }

    host.dataset.displayTheme = displayTheme;

    if (progressBarPosition) {
      host.dataset.progressBarPosition = progressBarPosition;
    } else {
      delete host.dataset.progressBarPosition;
    }

    if (skyrimFramePosition) {
      host.dataset.skyrimFramePosition = skyrimFramePosition;
    } else {
      delete host.dataset.skyrimFramePosition;
    }

    const def = getDisplayThemeDefinition(displayTheme);
    const themeConfig = state?.settings.themeConfig;
    const pin =
      themeConfig != null
        ? resolveHostPin(def.hostPin, def.getHostPin, themeConfig)
        : def.hostPin;
    applyHostPin(host, pin);
  }, [
    displayTheme,
    progressBarPosition,
    skyrimFramePosition,
    state?.settings.themeConfig,
    overlayVisible,
  ]);

  if (loading || !state || !overlayVisible) {
    return null;
  }

  const def = getDisplayThemeDefinition(state.settings.displayTheme);
  const Overlay = def.Overlay;

  return <Overlay state={state} />;
}
