import type { ReactNode } from 'react';

import './valorant-hud.css';

const STROKE = 'rgba(255, 255, 255, 0.92)';

function HealthFrame() {
  return (
    <svg
      className="valorant-hud__frame"
      viewBox="0 0 130 52"
      width={130}
      height={52}
      aria-hidden
    >
      <path
        d="M4 46 H88 L98 36 H118 L126 28 V8 L118 2 H12 L4 8 Z"
        fill="none"
        stroke={STROKE}
        strokeWidth="1"
      />
      <path d="M88 46 H98 L106 38" fill="none" stroke={STROKE} strokeWidth="1" />
    </svg>
  );
}

function AmmoFrame() {
  return (
    <svg
      className="valorant-hud__frame"
      viewBox="0 0 120 52"
      width={120}
      height={52}
      aria-hidden
    >
      <path
        d="M116 46 H32 L22 36 H4 L0 28 V8 L8 2 H108 L116 8 Z"
        fill="none"
        stroke={STROKE}
        strokeWidth="1"
      />
      <path d="M32 46 H22 L14 38" fill="none" stroke={STROKE} strokeWidth="1" />
    </svg>
  );
}

function ArmorHexagon() {
  return (
    <svg width={28} height={30} viewBox="0 0 28 30" aria-hidden>
      <polygon
        points="14,2 25,8 25,22 14,28 3,22 3,8"
        fill="rgba(74, 222, 128, 0.22)"
        stroke={STROKE}
        strokeWidth="1"
      />
    </svg>
  );
}

function AbilityIconC() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden>
      <circle
        cx="11"
        cy="11"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 8 A5 5 0 1 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AbilityIconQ() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden>
      <path
        d="M6 16 L11 6 L16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path
        d="M8 13 H14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function AbilityIconE() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden>
      <path
        d="M5 11 H14 M11 8 L15 11 L11 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9 H3 M3 13 H3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AbilityIconX() {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden>
      <rect x="5" y="4" width="3" height="14" rx="0.5" fill="currentColor" />
      <rect x="9.5" y="3" width="3" height="15" rx="0.5" fill="currentColor" />
      <rect x="14" y="5" width="3" height="13" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function BulletIcon() {
  return (
    <svg width={14} height={26} viewBox="0 0 14 26" aria-hidden>
      <rect x="1" y="2" width="4" height="22" rx="2" fill="currentColor" />
      <rect x="6" y="5" width="4" height="19" rx="2" fill="currentColor" />
      <rect x="11" y="8" width="3" height="16" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function AbilitySlot({
  icon,
  keyLabel,
  ultDots,
}: {
  icon: ReactNode;
  keyLabel: string;
  ultDots?: number;
}) {
  return (
    <div className="valorant-hud__ability">
      {ultDots != null && (
        <div className="valorant-hud__ult-dots" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={
                i < ultDots
                  ? 'valorant-hud__ult-dot valorant-hud__ult-dot--charged'
                  : 'valorant-hud__ult-dot'
              }
            />
          ))}
        </div>
      )}
      <div className="valorant-hud__ability-pedestal">{icon}</div>
      <span className="valorant-hud__ability-key">{keyLabel}</span>
    </div>
  );
}

function AbilityDivider() {
  return (
    <svg width={12} height={20} viewBox="0 0 12 20" aria-hidden>
      <line
        x1="6"
        y1="2"
        x2="6"
        y2="18"
        stroke={STROKE}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

interface ValorantHudProps {
  timerValue: number;
}

export function ValorantHud({ timerValue }: ValorantHudProps) {
  return (
    <div className="valorant-hud">
      <div className="valorant-hud__section-wrap">
        <HealthFrame />
        <div className="valorant-hud__health">
          <div className="valorant-hud__armor">
            <ArmorHexagon />
            <span className="valorant-hud__armor-value">25</span>
          </div>
          <span className="valorant-hud__timer">{timerValue}</span>
        </div>
      </div>

      <div className="valorant-hud__abilities">
        <AbilitySlot icon={<AbilityIconC />} keyLabel="C" />
        <AbilityDivider />
        <AbilitySlot icon={<AbilityIconQ />} keyLabel="Q" />
        <AbilityDivider />
        <AbilitySlot icon={<AbilityIconE />} keyLabel="E" />
        <AbilityDivider />
        <AbilitySlot icon={<AbilityIconX />} keyLabel="X" ultDots={4} />
      </div>

      <div className="valorant-hud__section-wrap">
        <AmmoFrame />
        <div className="valorant-hud__ammo">
          <span className="valorant-hud__ammo-mag">13</span>
          <BulletIcon />
          <span className="valorant-hud__ammo-reserve">21</span>
        </div>
      </div>
    </div>
  );
}
