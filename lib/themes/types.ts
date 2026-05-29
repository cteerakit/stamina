import type { ComponentType } from 'react';

import type { ColorPalette } from '@/lib/pomodoro/timer-themes';
import type { Phase, PomodoroSettings, PomodoroState } from '@/lib/pomodoro/types';

export const DISPLAY_THEMES = [
  'progressBar',
  'skyrim',
  'minecraft',
  'valorant',
  'overwatch',
  'stardewValley',
] as const;

export type DisplayTheme = (typeof DISPLAY_THEMES)[number];

export const PROGRESS_BAR_POSITIONS = ['top', 'bottom'] as const;

export type ProgressBarPosition = (typeof PROGRESS_BAR_POSITIONS)[number];

export type ProgressBarThemeConfig = {
  kind: 'progressBar';
  palette: ColorPalette;
  position: ProgressBarPosition;
};
export type { SkyrimBarColor } from './skyrim-colors';
export { SKYRIM_BAR_COLORS } from './skyrim-colors';

export type SkyrimThemeConfig = {
  kind: 'skyrim';
  barColor: import('./skyrim-colors').SkyrimBarColor;
};

export type MinecraftThemeConfig = {
  kind: 'minecraft';
};

export type ValorantThemeConfig = {
  kind: 'valorant';
};

export type OverwatchThemeConfig = {
  kind: 'overwatch';
  label: string;
};

export type StardewValleyThemeConfig = {
  kind: 'stardewValley';
};

export type ThemeConfig =
  | ProgressBarThemeConfig
  | SkyrimThemeConfig
  | MinecraftThemeConfig
  | ValorantThemeConfig
  | OverwatchThemeConfig
  | StardewValleyThemeConfig;

export interface ThemeOverlayProps {
  state: PomodoroState;
}

export interface ThemeSettingsPanelProps {
  config: ThemeConfig;
  onChange: (config: ThemeConfig) => void;
}

export type HostPinStyles = [property: string, value: string][];

export interface DisplayThemeDefinition {
  id: DisplayTheme;
  label: string;
  Overlay: ComponentType<ThemeOverlayProps>;
  SettingsPanel: ComponentType<ThemeSettingsPanelProps>;
  hostPin: HostPinStyles;
  getHostPin?: (config: ThemeConfig) => HostPinStyles;
  getPhaseColor: (phase: Phase, config: ThemeConfig) => string;
}

export type { PomodoroSettings };
