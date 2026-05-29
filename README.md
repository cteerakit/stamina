# Stamina (Chrome Extension)

A pomodoro timer with styles. Built with [WXT](https://wxt.dev/), React, Tailwind CSS, and [shadcn/ui](https://ui.shadcn.com/).

## Features

- Focus, short break, and long break sessions
- Timer runs in the background via `chrome.alarms` (survives popup close)
- Desktop notifications and completion sound when a round ends
- Toolbar badge showing minutes remaining
- Themes and Settings tabs for display themes (Progress Bar, Skyrim), color palettes, and timer durations
- Page overlay shows your selected display theme while you browse

## Development

```bash
pnpm install
pnpm dev
```

Load the unpacked extension from `.output/chrome-mv3-dev` in `chrome://extensions` (Developer mode).

## Build

```bash
pnpm build
pnpm zip
```

Production output is in `.output/chrome-mv3`.

## Project structure

- `entrypoints/popup/` — compact control panel (time + buttons)
- `entrypoints/gauge.content/` — page overlay (display themes)
- `lib/themes/` — display theme registry and shared gauge math
- `components/themes/` — per-theme overlay and settings UI
- `components/theme-settings-panel.tsx` / `timer-settings-panel.tsx` — settings UI
- `entrypoints/background.ts` — timer logic, alarms, notifications
- `entrypoints/offscreen/` — audio playback
- `lib/pomodoro/` — state, transitions, storage
- `lib/copy.ts` — gamified UI strings
- `components/` — UI components (shadcn + timer widgets)
