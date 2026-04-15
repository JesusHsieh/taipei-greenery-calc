// ── Types ──────────────────────────────────────────────────────────────────
export type BuildingClass = '1' | '2' | '3' | '4' | '5';

// ── 第4條 各類建築基地標準 ─────────────────────────────────────────────────
export const STANDARDS: Record<BuildingClass, { name: string; cover: number; volume: number; carbon: number }> = {
  '1': { name: '第一類', cover: 90, volume: 2.0, carbon: 0.99 },
  '2': { name: '第二類', cover: 80, volume: 1.9, carbon: 0.83 },
  '3': { name: '第三類', cover: 70, volume: 1.8, carbon: 0.83 },
  '4': { name: '第四類', cover: 60, volume: 1.6, carbon: 0.66 },
  '5': { name: '第五類', cover: 50, volume: 1.4, carbon: 0.66 },
};

/** 第10條第1項第1款 喬木綠覆面積（m²/株） */
export const TREE_AREA = { large: 25, medium: 16, small: 9, palm: 9 } as const;

/** 第5條第3項 降溫係數 */
export const COOL = { highShade: 3.0, lowShade: 2.0, shrub: 1.2, other: 1.0 } as const;

/** 固碳當量係數 kg CO₂/m²·yr（估算值，待技術規範確認） */
export const CARBON = { highShade: 1.56, lowShade: 0.98, shrub: 0.66, grass: 0.50, other: 0.30 } as const;
