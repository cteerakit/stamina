import type {
  HostPinStyles,
  ProgressBarPosition,
  SkyrimFramePosition,
  ThemeConfig,
} from './types';

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

const SKYRIM_FRAME_PIN_BASE: HostPinStyles = [
  ...BASE_PIN,
  ['position', 'fixed'],
  ['top', 'auto'],
  ['bottom', '24px'],
  ['width', 'auto'],
  ['height', 'auto'],
  ['max-width', 'none'],
];

export const HOST_PIN_SKYRIM_LEFT: HostPinStyles = [
  ...SKYRIM_FRAME_PIN_BASE,
  ['left', '24px'],
  ['right', 'auto'],
  ['transform', 'none'],
];

export const HOST_PIN_SKYRIM_MIDDLE: HostPinStyles = [
  ...SKYRIM_FRAME_PIN_BASE,
  ['left', '50%'],
  ['right', 'auto'],
  ['transform', 'translateX(-50%)'],
];

export const HOST_PIN_SKYRIM_RIGHT: HostPinStyles = [
  ...SKYRIM_FRAME_PIN_BASE,
  ['left', 'auto'],
  ['right', '24px'],
  ['transform', 'none'],
];

/** Default Skyrim pin (centered). */
export const HOST_PIN_SKYRIM: HostPinStyles = HOST_PIN_SKYRIM_MIDDLE;

export function getSkyrimHostPin(position: SkyrimFramePosition): HostPinStyles {
  switch (position) {
    case 'left':
      return HOST_PIN_SKYRIM_LEFT;
    case 'right':
      return HOST_PIN_SKYRIM_RIGHT;
    default:
      return HOST_PIN_SKYRIM_MIDDLE;
  }
}

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

export const HOST_PIN_STARDEW_VALLEY: HostPinStyles = [
  ...BASE_PIN,
  ['position', 'fixed'],
  ['top', 'auto'],
  ['right', '24px'],
  ['bottom', '24px'],
  ['left', 'auto'],
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
