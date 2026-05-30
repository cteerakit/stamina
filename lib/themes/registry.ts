import { DISPLAY_THEMES } from './types';
import type { DisplayTheme, DisplayThemeDefinition, ThemeConfig } from './types';

import { ProgressBarOverlay } from '@/components/themes/progress-bar/progress-bar-overlay';
import { ProgressBarSettings } from '@/components/themes/progress-bar/progress-bar-settings';
import { MinecraftOverlay } from '@/components/themes/minecraft/minecraft-overlay';
import { MinecraftSettings } from '@/components/themes/minecraft/minecraft-settings';
import { OverwatchOverlay } from '@/components/themes/overwatch/overwatch-overlay';
import { OverwatchSettings } from '@/components/themes/overwatch/overwatch-settings';
import { ValorantOverlay } from '@/components/themes/valorant/valorant-overlay';
import { ValorantSettings } from '@/components/themes/valorant/valorant-settings';
import { SkyrimOverlay } from '@/components/themes/skyrim/skyrim-overlay';
import { SkyrimSettings } from '@/components/themes/skyrim/skyrim-settings';
import { StardewValleyOverlay } from '@/components/themes/stardew-valley/stardew-valley-overlay';
import { StardewValleySettings } from '@/components/themes/stardew-valley/stardew-valley-settings';
import type { Phase } from '@/lib/pomodoro/types';

import { getPhaseColorFromConfig } from './theme-config';
import {
  getProgressBarHostPin,
  getSkyrimHostPin,
  HOST_PIN_MINECRAFT,
  HOST_PIN_PROGRESS_BAR_TOP,
  HOST_PIN_SKYRIM,
  HOST_PIN_OVERWATCH,
  HOST_PIN_STARDEW_VALLEY,
  HOST_PIN_VALORANT,
} from './host-pin';

const REGISTRY: Record<DisplayTheme, DisplayThemeDefinition> = {
  progressBar: {
    id: 'progressBar',
    label: 'Progress Bar',
    Overlay: ProgressBarOverlay,
    SettingsPanel: ProgressBarSettings,
    hostPin: HOST_PIN_PROGRESS_BAR_TOP,
    getHostPin: (config) =>
      config.kind === 'progressBar'
        ? getProgressBarHostPin(config.position)
        : HOST_PIN_PROGRESS_BAR_TOP,
    getPhaseColor: (phase, config) =>
      getPhaseColorFromConfig(phase, config as ThemeConfig),
  },
  skyrim: {
    id: 'skyrim',
    label: 'Skyrim',
    Overlay: SkyrimOverlay,
    SettingsPanel: SkyrimSettings,
    hostPin: HOST_PIN_SKYRIM,
    getHostPin: (config) =>
      config.kind === 'skyrim'
        ? getSkyrimHostPin(config.position)
        : HOST_PIN_SKYRIM,
    getPhaseColor: (phase, config) =>
      getPhaseColorFromConfig(phase, config as ThemeConfig),
  },
  minecraft: {
    id: 'minecraft',
    label: 'Minecraft',
    Overlay: MinecraftOverlay,
    SettingsPanel: MinecraftSettings,
    hostPin: HOST_PIN_MINECRAFT,
    getPhaseColor: (phase, config) =>
      getPhaseColorFromConfig(phase, config as ThemeConfig),
  },
  valorant: {
    id: 'valorant',
    label: 'Valorant',
    Overlay: ValorantOverlay,
    SettingsPanel: ValorantSettings,
    hostPin: HOST_PIN_VALORANT,
    getPhaseColor: (phase, config) =>
      getPhaseColorFromConfig(phase, config as ThemeConfig),
  },
  overwatch: {
    id: 'overwatch',
    label: 'Overwatch',
    Overlay: OverwatchOverlay,
    SettingsPanel: OverwatchSettings,
    hostPin: HOST_PIN_OVERWATCH,
    getPhaseColor: (phase, config) =>
      getPhaseColorFromConfig(phase, config as ThemeConfig),
  },
  stardewValley: {
    id: 'stardewValley',
    label: 'Stardew Valley',
    Overlay: StardewValleyOverlay,
    SettingsPanel: StardewValleySettings,
    hostPin: HOST_PIN_STARDEW_VALLEY,
    getPhaseColor: (phase, config) =>
      getPhaseColorFromConfig(phase, config as ThemeConfig),
  },
};

export const DISPLAY_THEME_OPTIONS = DISPLAY_THEMES.map(
  (id) => REGISTRY[id],
).map(({ id, label }) => ({ id, label }));

export function getDisplayThemeDefinition(
  theme: DisplayTheme,
): DisplayThemeDefinition {
  return REGISTRY[theme];
}

export function getPhaseColorForSettings(
  phase: Phase,
  displayTheme: DisplayTheme,
  themeConfig: ThemeConfig,
): string {
  return REGISTRY[displayTheme].getPhaseColor(phase, themeConfig);
}
