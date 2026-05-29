export const MINECRAFT_HEART_COUNT = 10;

const HALF_UNITS = MINECRAFT_HEART_COUNT * 2;

export type MinecraftHeartState = 'full' | 'half' | 'empty';

/** Map gauge fraction (0–1) to ten Minecraft-style heart states. */
export function getMinecraftHeartStates(
  fraction: number,
): MinecraftHeartState[] {
  const clamped = Math.min(1, Math.max(0, fraction));
  const filledHalfs = Math.round(clamped * HALF_UNITS);

  return Array.from({ length: MINECRAFT_HEART_COUNT }, (_, index) => {
    const heartHalves = Math.min(
      2,
      Math.max(0, filledHalfs - index * 2),
    );
    if (heartHalves >= 2) return 'full';
    if (heartHalves === 1) return 'half';
    return 'empty';
  });
}
