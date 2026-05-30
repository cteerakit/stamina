import { useId } from 'react';

/**
 * Vector frame from assets/skyrim-frame.svg — inlined so it stays sharp (no
 * rasterized `<image href="*.svg">`). Update both files when the art changes.
 */
const FILL_PATH =
  'M25.1183 26.778L21.5718 23.6748L18.2263 26.778L5.54865 16.0571L18.2263 5.33633L21.645 8.37548L25.1183 5.33633H400.347L404.051 8.47941L407.441 5.33557L420.119 16.0564L407.441 26.7772L403.977 23.698L400.347 26.778H25.1183Z';

const STROKE_PATH =
  'M12.8659 16.0571L25.1183 26.778H400.347L412.982 16.0571L400.347 5.33633H25.1183L12.8659 16.0571ZM18.2263 26.778L25.1183 20.3852V11.4633L18.2263 5.33633L5.54865 16.0571L18.2263 26.778ZM407.441 5.33557L400.549 11.7283V20.6503L407.441 26.7772L420.119 16.0564L407.441 5.33557Z';

export function SkyrimFrame() {
  const filterId = `skyrim-frame-shadow-${useId().replace(/:/g, '')}`;

  return (
    <>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="425.667"
          height="32.1135"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} shapeRendering="geometricPrecision">
        <path d={FILL_PATH} fill="black" fillOpacity={0.5} />
        <path
          d={STROKE_PATH}
          fill="none"
          stroke="white"
          strokeOpacity={0.75}
          strokeWidth={2}
          strokeLinejoin="miter"
        />
      </g>
    </>
  );
}
