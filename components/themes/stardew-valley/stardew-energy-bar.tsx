import {
  getStardewEnergyFillColors,
  stardewEnergyFillStyle,
} from '@/lib/themes/stardew-energy-colors';

import './stardew-energy-bar.css';

interface StardewEnergyBarProps {
  /** Remaining fraction 0–1 (depletes from top as time runs out). */
  fillFraction: number;
}

export function StardewEnergyBar({ fillFraction }: StardewEnergyBarProps) {
  const clamped = Math.min(1, Math.max(0, fillFraction));
  const fillPercent = clamped * 100;
  const fillColors = getStardewEnergyFillColors(clamped);

  return (
    <div className="sdv-energy" aria-hidden>
      <div className="sdv-energy__header">E</div>
      <div className="sdv-energy__frame">
        <div className="sdv-energy__track">
          <div
            className="sdv-energy__fill"
            data-tier={fillColors.tier}
            style={{
              height: `${fillPercent}%`,
              ...stardewEnergyFillStyle(fillColors),
            }}
          />
        </div>
      </div>
    </div>
  );
}
