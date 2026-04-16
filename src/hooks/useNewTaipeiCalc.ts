import { useState } from 'react';
import { n } from '../utils';

/** 附表一：喬木綠覆面積（m²/株） */
export const NT_TREE_COVER = { small: 10, medium: 15, large: 20 } as const;

export function useNewTaipeiCalc() {
  // ── 基地基本資料 ──────────────────────────────────────────────────────────
  const [openSpace, setOpenSpace] = useState('');  // 實設空地面積
  const [greenArea, setGreenArea] = useState('');  // 應綠化範圍面積（喬木需求計算用）

  // ── 喬木（附表一三分級）─────────────────────────────────────────────────
  const [treeSmall,  setTreeSmall]  = useState('');  // 米高徑 5–7 cm  → 10 m²/株
  const [treeMedium, setTreeMedium] = useState('');  // 米高徑 8–10 cm → 15 m²/株
  const [treeLarge,  setTreeLarge]  = useState('');  // 米高徑 > 10 cm → 20 m²/株

  // ── 其他植栽 ──────────────────────────────────────────────────────────────
  const [shrubArea,        setShrubArea]        = useState('');  // 灌木（× 1.5）
  const [groundCoverArea,  setGroundCoverArea]  = useState('');  // 地被植物（× 1）
  const [grassBrickArea,   setGrassBrickArea]   = useState('');  // 植草磚（× 0.5）
  const [pondArea,         setPondArea]         = useState('');  // 景觀生態池（× 1/3）
  const [vineArea,         setVineArea]         = useState('');  // 藤蔓立面（× 1）

  // ── 立體綠化補償（第8條三：屋頂、陽台等水平人工地盤）────────────────────
  const [roofGreenArea, setRoofGreenArea] = useState('');

  // ── 計算 ──────────────────────────────────────────────────────────────────
  const os = n(openSpace);
  const ga = n(greenArea);

  // 喬木
  const treeSmallCount  = Math.floor(n(treeSmall));
  const treeMediumCount = Math.floor(n(treeMedium));
  const treeLargeCount  = Math.floor(n(treeLarge));
  const totalTreeCount  = treeSmallCount + treeMediumCount + treeLargeCount;
  // 每滿 36m² 應種植1棵（第8條(一)-3）
  const requiredTrees   = ga > 0 ? Math.floor(ga / 36) : 0;

  // 各類綠覆面積（第8條(四)）
  const treeCover       = treeSmallCount * NT_TREE_COVER.small
                        + treeMediumCount * NT_TREE_COVER.medium
                        + treeLargeCount  * NT_TREE_COVER.large;
  const shrubCover      = n(shrubArea) * 1.5;
  const groundCover     = n(groundCoverArea);
  const grassBrickCover = n(grassBrickArea) * 0.5;
  const pondCover       = n(pondArea) / 3;
  const vineCover       = n(vineArea);
  const roofCover       = n(roofGreenArea);

  const totalCover = treeCover + shrubCover + groundCover + grassBrickCover + pondCover + vineCover + roofCover;

  // 綠覆率 = 總綠覆面積 / 實設空地（第8條(三)(四)）
  const coverRate = os > 0 ? (totalCover / os) * 100 : 0;

  // ── 檢核清單 ──────────────────────────────────────────────────────────────
  const checks = [
    {
      art: '第8條(一)第3款', name: '喬木配置需求數量',
      req: `≥ ${requiredTrees} 棵`,
      act: `${totalTreeCount} 棵`,
      pass: ga > 0 ? totalTreeCount >= requiredTrees : null,
      formula: `綠化範圍 ${ga.toFixed(2)} m² ÷ 36 m²/棵 = ${requiredTrees} 棵（取整）`,
    },
    {
      art: '第8條(三)', name: '綠覆率',
      req: '≥ 100%',
      act: `${coverRate.toFixed(2)}%`,
      pass: os > 0 ? coverRate >= 100 : null,
      formula: `總綠覆 ${totalCover.toFixed(2)} m² ÷ 實設空地 ${os.toFixed(2)} m²`,
    },
  ];

  const passCount    = checks.filter(c => c.pass === true).length;
  const failCount    = checks.filter(c => c.pass === false).length;
  const pendingCount = checks.filter(c => c.pass === null).length;

  return {
    openSpace, setOpenSpace, greenArea, setGreenArea,
    treeSmall, setTreeSmall, treeMedium, setTreeMedium, treeLarge, setTreeLarge,
    shrubArea, setShrubArea,
    groundCoverArea, setGroundCoverArea,
    grassBrickArea, setGrassBrickArea,
    pondArea, setPondArea,
    vineArea, setVineArea,
    roofGreenArea, setRoofGreenArea,
    os, ga,
    treeSmallCount, treeMediumCount, treeLargeCount, totalTreeCount, requiredTrees,
    treeCover, shrubCover, groundCover, grassBrickCover, pondCover, vineCover, roofCover,
    totalCover, coverRate,
    checks, passCount, failCount, pendingCount,
  };
}

export type NewTaipeiCalc = ReturnType<typeof useNewTaipeiCalc>;
