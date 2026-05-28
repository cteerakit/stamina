# Stamina (Chrome Extension)

A gamified focus timer built with [WXT](https://wxt.dev/), React, Tailwind CSS, and [shadcn/ui](https://ui.shadcn.com/).

## Features

- Grind, cooldown, and full recovery sessions
- Timer runs in the background via `chrome.alarms` (survives popup close)
- Desktop notifications and completion sound when a round ends
- Toolbar badge showing minutes remaining
- Loadout tab for custom durations, arena skins, and cycle length

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

- `entrypoints/popup/` — main arena UI
- `components/settings-panel.tsx` — loadout tab content
- `entrypoints/background.ts` — timer logic, alarms, notifications
- `entrypoints/offscreen/` — audio playback
- `lib/pomodoro/` — state, transitions, storage
- `lib/copy.ts` — gamified UI strings
- `components/` — UI components (shadcn + timer widgets)
