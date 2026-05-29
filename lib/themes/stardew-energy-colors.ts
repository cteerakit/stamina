export type StardewEnergyTier = 'green' | 'yellow' | 'orange' | 'red';

export interface StardewEnergyFillColors {
  tier: StardewEnergyTier;
  main: string;
  highlight: string;
  shadow: string;
}

const TIERS: Record<StardewEnergyTier, Omit<StardewEnergyFillColors, 'tier'>> = {
  green: {
    main: '#48e81a',
    highlight: '#7cff54',
    shadow: '#2eb810',
  },
  yellow: {
    main: '#ffe025',
    highlight: '#fff080',
    shadow: '#c9a800',
  },
  orange: {
    main: '#ff9010',
    highlight: '#ffb040',
    shadow: '#c86008',
  },
  red: {
    main: '#e83828',
    highlight: '#ff6050',
    shadow: '#a82018',
  },
};

/** Remaining fraction (0–1) → fill tier, matching in-game energy bar colors. */
export function getStardewEnergyFillColors(
  fillFraction: number,
): StardewEnergyFillColors {
  const fraction = Math.min(1, Math.max(0, fillFraction));

  let tier: StardewEnergyTier;
  if (fraction > 0.5) tier = 'green';
  else if (fraction > 0.35) tier = 'yellow';
  else if (fraction > 0.2) tier = 'orange';
  else tier = 'red';

  return { tier, ...TIERS[tier] };
}

export function stardewEnergyFillStyle(
  colors: StardewEnergyFillColors,
): Record<string, string> {
  return {
    '--sdv-fill': colors.main,
    '--sdv-fill-hi': colors.highlight,
    '--sdv-fill-lo': colors.shadow,
  };
}
