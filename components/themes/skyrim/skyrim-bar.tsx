import { useId } from 'react';

import {
  getSkyrimBarColorOption,
  SKYRIM_BAR_HIGHLIGHT_STOPS,
  type SkyrimBarColor,
} from '@/lib/themes/skyrim-colors';

type SkyrimBarFillProps = {
  color: SkyrimBarColor;
  x: number;
  y: number;
  width: number;
  height: number;
};

const FILL_TRANSITION = { transition: 'x 1s linear, width 1s linear' } as const;

/**
 * Bar fill (372×18): radial base + vertical gloss per color asset:
 * assets/skyrim-bar-health.svg, skyrim-bar-magicka.svg, skyrim-bar-stamina.svg
 * Keep skyrim-colors.ts in sync when those files change.
 */
export function SkyrimBarFill({ color, x, y, width, height }: SkyrimBarFillProps) {
  const id = useId().replace(/:/g, '');
  const radialId = `skyrim-bar-radial-${id}`;
  const linearId = `skyrim-bar-linear-${id}`;
  const option = getSkyrimBarColorOption(color);
  const { radialCenter, radialEdge } = option;
  const highlightStops = option.highlightStops ?? SKYRIM_BAR_HIGHLIGHT_STOPS;
  const glossOpacity = option.glossOpacity ?? 0.5;

  if (width <= 0) return null;

  const cx = x + width / 2;
  const cy = y + height / 2;
  const rx = width / 2;
  const ry = height / 2;

  return (
    <>
      <defs>
        <radialGradient
          id={radialId}
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${cx} ${cy}) scale(${rx} ${ry})`}
        >
          <stop stopColor={radialCenter} />
          <stop offset="0.9999" stopColor={radialEdge} />
        </radialGradient>
        <linearGradient
          id={linearId}
          x1={0}
          y1={0}
          x2={0}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          {highlightStops.map((stop) => (
            <stop
              key={stop.offset}
              offset={stop.offset}
              stopColor="white"
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#${radialId})`}
        style={FILL_TRANSITION}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#${linearId})`}
        fillOpacity={glossOpacity}
        style={FILL_TRANSITION}
      />
    </>
  );
}
