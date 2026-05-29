import type { HostPinStyles, ProgressBarPosition, ThemeConfig } from './types';

export function applyHostPin(
  shadowHost: HTMLElement,
  styles: HostPinStyles,
): void {
  for (const [name, value] of styles) {
    shadowHost.style.setProperty(name, value, 'important');
  }
}

const BASE_PIN: HostPinStyles = [
  ['z-index', '2147483646'],
  ['pointer-events', 'none'],
  ['display', 'block'],
  ['margin', '0'],
  ['padding', '0'],
  ['background', 'transparent'],
  ['border', 'none'],
  ['overflow', 'visible'],
];

const PROGRESS_BAR_EDGE_PIN: HostPinStyles = [
  ...BASE_PIN,
  ['position', 'fixed'],
  ['right', '0'],
  ['left', '0'],
  ['transform', 'none'],
  ['width', '100%'],
  ['height', 'auto'],
  ['max-width', 'none'],
];

export const HOST_PIN_PROGRESS_BAR_TOP: HostPinStyles = [
  ...PROGRESS_BAR_EDGE_PIN,
  ['top', '0'],
  ['bottom', 'auto'],
];

export const HOST_PIN_PROGRESS_BAR_BOTTOM: HostPinStyles = [
  ...PROGRESS_BAR_EDGE_PIN,
  ['top', 'auto'],
  ['bottom', '0'],
];

export function getProgressBarHostPin(
  position: ProgressBarPosition,
): HostPinStyles {
  return position === 'bottom'
    ? HOST_PIN_PROGRESS_BAR_BOTTOM
    : HOST_PIN_PROGRESS_BAR_TOP;
}

export const HOST_PIN_SKYRIM: HostPinStyles = [
  ...BASE_PIN,
  ['position', 'fixed'],
  ['top', 'auto'],
  ['right', 'auto'],
  ['bottom', '24px'],
  ['left', '50%'],
  ['transform', 'translateX(-50%)'],
  ['width', 'auto'],
  ['height', 'auto'],
  ['max-width', 'none'],
];

export const HOST_PIN_MINECRAFT: HostPinStyles = [...HOST_PIN_SKYRIM];

export const HOST_PIN_VALORANT: HostPinStyles = [...HOST_PIN_SKYRIM];

export const HOST_PIN_OVERWATCH: HostPinStyles = [
  ...BASE_PIN,
  ['position', 'fixed'],
  ['top', 'auto'],
  ['right', 'auto'],
  ['bottom', '24px'],
  ['left', '24px'],
  ['transform', 'none'],
  ['width', 'auto'],
  ['height', 'auto'],
  ['max-width', 'none'],
];

export function resolveHostPin(
  hostPin: HostPinStyles,
  getHostPin: ((config: ThemeConfig) => HostPinStyles) | undefined,
  themeConfig: ThemeConfig,
): HostPinStyles {
  return getHostPin?.(themeConfig) ?? hostPin;
}
