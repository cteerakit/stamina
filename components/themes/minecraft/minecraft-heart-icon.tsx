import type { ReactNode } from 'react';

import type { MinecraftHeartState } from '@/lib/themes/minecraft-hearts';

const PIXEL = 2;
const GRID_W = 11;
const GRID_H = 10;

/**
 * o=outline, i=interior, w=highlight, .=transparent
 * Interior fills the top lobes (rows 0–1), not a flat bar below the outline.
 */
const HEART_TEMPLATE = [
  '..oi..io...',
  '.oiiiiiio..',
  'oiiiiiiiiio',
  'oiiiiiiiiio',
  'oiwiiiiiiio',
  'oiiiiiiiiio',
  '.oiiiiiio..',
  '..ooooo....',
  '...ooo.....',
  '....o......',
] as const;

const SPLIT_X = 5;

const COLORS = {
  outline: '#000000',
  full: '#f80000',
  highlight: '#ffffff',
  empty: '#303030',
} as const;

function pixelFill(
  state: MinecraftHeartState,
  x: number,
  y: number,
  cell: string,
): string | null {
  if (cell === '.') return null;
  if (cell === 'o') return COLORS.outline;

  const isLeftHalf = x < SPLIT_X;

  if (state === 'full') {
    if (cell === 'w') return COLORS.highlight;
    if (cell === 'i') return COLORS.full;
  }

  if (state === 'empty') {
    if (cell === 'w' || cell === 'i') return COLORS.empty;
  }

  if (state === 'half') {
    if (cell === 'w' || cell === 'i') {
      return isLeftHalf
        ? cell === 'w'
          ? COLORS.highlight
          : COLORS.full
        : COLORS.empty;
    }
  }

  return COLORS.outline;
}

interface MinecraftHeartIconProps {
  state: MinecraftHeartState;
}

export function MinecraftHeartIcon({ state }: MinecraftHeartIconProps) {
  const width = GRID_W * PIXEL;
  const height = GRID_H * PIXEL;
  const rects: ReactNode[] = [];

  for (let y = 0; y < GRID_H; y++) {
    const row = HEART_TEMPLATE[y] ?? '';
    for (let x = 0; x < GRID_W; x++) {
      const cell = row[x] ?? '.';
      const fill = pixelFill(state, x, y, cell);
      if (!fill) continue;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x * PIXEL}
          y={y * PIXEL}
          width={PIXEL}
          height={PIXEL}
          fill={fill}
        />,
      );
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rects}
    </svg>
  );
}
