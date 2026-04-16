import { n } from '../utils';
import { NT_TREE_COVER } from '../hooks/useNewTaipeiCalc';
import type { NewTaipeiCalc } from '../hooks/useNewTaipeiCalc';
import { cardCls, hCls, inputCls, labelCls } from '../styles';

type Props = Pick<NewTaipeiCalc,
  | 'openSpace' | 'setOpenSpace' | 'greenArea' | 'setGreenArea'
  | 'treeSmall' | 'setTreeSmall' | 'treeMedium' | 'setTreeMedium' | 'treeLarge' | 'setTreeLarge'
  | 'shrubArea' | 'setShrubArea'
  | 'groundCoverArea' | 'setGroundCoverArea'
  | 'grassBrickArea' | 'setGrassBrickArea'
  | 'pondArea' | 'setPondArea'
  | 'vineArea' | 'setVineArea'
  | 'roofGreenArea' | 'setRoofGreenArea'
  | 'os' | 'ga'
  | 'treeSmallCount' | 'treeMediumCount' | 'treeLargeCount' | 'totalTreeCount' | 'requiredTrees'
  | 'treeCover' | 'shrubCover' | 'groundCover' | 'grassBrickCover' | 'pondCover' | 'vineCover' | 'roofCover'
  | 'totalCover' | 'coverRate'
>;

export function NtArticle8({
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
  shrubCover, groundCover, grassBrickCover, pondCover, vineCover, roofCover,
  totalCover, coverRate,
}: Props) {

  const treeEnough = ga > 0 ? totalTreeCount >= requiredTrees : null;

  return (
    <>
      {/* ── 基地基本資料 ── */}
      <div className={cardCls}>
        <h2 className={hCls}>基地基本資料</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>實設空地面積 (m²) *</label>
            <input type="number" value={openSpace} onChange={e => setOpenSpace(e.target.value)}
              className={inputCls} placeholder="請輸入實設空地面積" min="0" />
            <p className="text-xs text-slate-400 mt-1">綠覆率分母</p>
          </div>
          <div>
            <label className={labelCls}>應綠化範圍面積 (m²) *</label>
            <input type="number" value={greenArea} onChange={e => setGreenArea(e.target.value)}
              className={inputCls} placeholder="請輸入應綠化範圍面積" min="0" />
            <p className="text-xs text-slate-400 mt-1">用於計算所需喬木棵數（每 36m² 一棵）</p>
          </div>
        </div>
      </div>

      {/* ── 第8條(一)-3：喬木配置 ── */}
      <div className={cardCls}>
        <h2 className={hCls}>第8條(一)-3：喬木配置需求</h2>

        {/* 附表一說明 */}
        <div className="bg-amber-50 rounded-lg p-3 mb-5 border border-amber-200">
          <p className="text-xs font-bold text-amber-800 mb-2">附表一：喬木綠覆面積計算標準（米高徑≥5cm）</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            {[
              { range: '米高徑 5–7 cm', crown: '1.5 m', cover: NT_TREE_COVER.small },
              { range: '米高徑 8–10 cm', crown: '1.5 m', cover: NT_TREE_COVER.medium },
              { range: '米高徑 > 10 cm', crown: '2 m', cover: NT_TREE_COVER.large },
            ].map(({ range, crown, cover }) => (
              <div key={range} className="bg-white rounded p-2 border border-amber-100">
                <div className="font-semibold text-amber-900">{range}</div>
                <div className="text-slate-400">樹冠直徑 {crown}</div>
                <div className="text-lg font-bold text-amber-700">{cover} m²/株</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-700 mt-2">
            覆土深度：喬木 &gt; 1.5m｜樹冠底離地 ≥ 2.5m｜樹穴覆土處淨寬 ≥ 1.5m
          </p>
        </div>

        {/* 喬木輸入 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: '小喬木（5–7 cm）', val: treeSmall, set: setTreeSmall, cover: NT_TREE_COVER.small, count: treeSmallCount },
            { label: '中喬木（8–10 cm）', val: treeMedium, set: setTreeMedium, cover: NT_TREE_COVER.medium, count: treeMediumCount },
            { label: '大喬木（> 10 cm）', val: treeLarge, set: setTreeLarge, cover: NT_TREE_COVER.large, count: treeLargeCount },
          ].map(({ label, val, set, cover, count }) => (
            <div key={label}>
              <label className={labelCls}>{label}（株）</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className={inputCls} placeholder="0" min="0" />
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                綠覆 = {count} × {cover} = {(count * cover).toFixed(0)} m²
              </p>
            </div>
          ))}
        </div>

        {/* 喬木需求判斷 */}
        <div className={`rounded-lg p-4 border-2 ${treeEnough === true ? 'bg-emerald-50 border-emerald-400' : treeEnough === false ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-300'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">所需喬木數量（每36m²一棵）</div>
              <div className="text-2xl font-bold text-slate-700">
                {ga > 0 ? `≥ ${requiredTrees} 棵` : '請填入綠化範圍面積'}
              </div>
              {ga > 0 && <div className="text-xs text-slate-400">{ga.toFixed(2)} m² ÷ 36 = {requiredTrees} 棵</div>}
            </div>
            <div className="text-slate-300 font-bold text-xl">vs</div>
            <div className="text-right">
              <div className="text-xs text-slate-500">實際種植喬木</div>
              <div className={`text-2xl font-bold ${treeEnough === true ? 'text-emerald-700' : treeEnough === false ? 'text-red-600' : 'text-slate-700'}`}>
                {totalTreeCount} 棵
              </div>
              <div className="text-xs text-slate-400">
                小{treeSmallCount} + 中{treeMediumCount} + 大{treeLargeCount}
              </div>
            </div>
            {treeEnough !== null && (
              <div className={`text-lg font-bold px-3 py-1 rounded ${treeEnough ? 'text-emerald-700 bg-emerald-100' : 'text-red-700 bg-red-100'}`}>
                {treeEnough ? '符合' : '不足'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 第8條(四)：綠覆面積計算 ── */}
      <div className={cardCls}>
        <h2 className={hCls}>第8條(四)：綠覆面積計算</h2>
        <p className="text-xs text-slate-500 mb-4">
          綠覆率 = 綠覆面積 ÷ 實設空地 × 100%，應達 <strong>100%</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* 灌木 */}
          <div>
            <label className={labelCls}>灌木面積 (m²)　<span className="text-slate-400 font-normal">× 1.5</span></label>
            <input type="number" value={shrubArea} onChange={e => setShrubArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入 = {n(shrubArea).toFixed(2)} × 1.5 = {shrubCover.toFixed(2)} m²
            </p>
          </div>

          {/* 地被植物 */}
          <div>
            <label className={labelCls}>地被植物面積 (m²)　<span className="text-slate-400 font-normal">× 1</span></label>
            <input type="number" value={groundCoverArea} onChange={e => setGroundCoverArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入 = {groundCover.toFixed(2)} m²
            </p>
          </div>

          {/* 植草磚 */}
          <div>
            <label className={labelCls}>植草磚舖設面積 (m²)　<span className="text-slate-400 font-normal">× 0.5</span></label>
            <input type="number" value={grassBrickArea} onChange={e => setGrassBrickArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入 = {n(grassBrickArea).toFixed(2)} ÷ 2 = {grassBrickCover.toFixed(2)} m²
            </p>
          </div>

          {/* 景觀生態池 */}
          <div>
            <label className={labelCls}>景觀生態池面積 (m²)　<span className="text-slate-400 font-normal">× 1/3</span></label>
            <input type="number" value={pondArea} onChange={e => setPondArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入 = {n(pondArea).toFixed(2)} ÷ 3 = {pondCover.toFixed(2)} m²
            </p>
          </div>

          {/* 藤蔓立面 */}
          <div>
            <label className={labelCls}>藤蔓立面攀附面積 (m²)　<span className="text-slate-400 font-normal">× 1</span></label>
            <input type="number" value={vineArea} onChange={e => setVineArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入 = {vineCover.toFixed(2)} m²
            </p>
          </div>

          {/* 立體綠化補償 */}
          <div>
            <label className={labelCls}>立體綠化面積 (m²)　<span className="text-slate-400 font-normal">屋頂、陽台（補償用）</span></label>
            <input type="number" value={roofGreenArea} onChange={e => setRoofGreenArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-slate-400 mt-1">第8條(三)：地面層不足時以屋頂、陽台等人工地盤補足</p>
          </div>
        </div>

        {/* 綠覆面積彙整表 */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-2 border border-slate-200">植栽種類</th>
                <th className="text-right p-2 border border-slate-200">輸入值</th>
                <th className="text-right p-2 border border-slate-200">計算係數</th>
                <th className="text-right p-2 border border-slate-200">計入綠覆 (m²)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label:`小喬木（5–7cm）× ${treeSmallCount}株`,  input:`${treeSmallCount}株`, coeff:`× ${NT_TREE_COVER.small} m²/株`, val: treeSmallCount * NT_TREE_COVER.small },
                { label:`中喬木（8–10cm）× ${treeMediumCount}株`, input:`${treeMediumCount}株`, coeff:`× ${NT_TREE_COVER.medium} m²/株`, val: treeMediumCount * NT_TREE_COVER.medium },
                { label:`大喬木（>10cm）× ${treeLargeCount}株`,  input:`${treeLargeCount}株`, coeff:`× ${NT_TREE_COVER.large} m²/株`, val: treeLargeCount * NT_TREE_COVER.large },
                { label:'灌木',           input:`${n(shrubArea).toFixed(2)} m²`,        coeff:'× 1.5',  val: shrubCover      },
                { label:'地被植物',       input:`${n(groundCoverArea).toFixed(2)} m²`,  coeff:'× 1',    val: groundCover     },
                { label:'植草磚',         input:`${n(grassBrickArea).toFixed(2)} m²`,   coeff:'× 0.5',  val: grassBrickCover },
                { label:'景觀生態池',     input:`${n(pondArea).toFixed(2)} m²`,          coeff:'× 1/3',  val: pondCover       },
                { label:'藤蔓立面',       input:`${n(vineArea).toFixed(2)} m²`,          coeff:'× 1',    val: vineCover       },
                { label:'立體綠化（補償）', input:`${n(roofGreenArea).toFixed(2)} m²`,   coeff:'× 1',    val: roofCover       },
              ].map(({ label, input, coeff, val }) => (
                <tr key={label} className={`border-b border-slate-100 ${val <= 0 ? 'opacity-40' : ''}`}>
                  <td className="p-2 border border-slate-200 text-slate-700">{label}</td>
                  <td className="p-2 border border-slate-200 text-right">{input}</td>
                  <td className="p-2 border border-slate-200 text-right text-blue-600">{coeff}</td>
                  <td className="p-2 border border-slate-200 text-right font-bold text-emerald-700">{val.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold text-sm">
                <td className="p-2 border border-slate-200" colSpan={3}>總綠覆面積</td>
                <td className="p-2 border border-slate-200 text-right text-emerald-700">{totalCover.toFixed(2)} m²</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 綠覆率判斷 */}
        <div className={`flex flex-wrap justify-between items-center rounded-lg p-4 border-2 gap-3 ${coverRate >= 100 ? 'bg-emerald-50 border-emerald-400' : os > 0 ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-300'}`}>
          <div>
            <div className="text-xs text-slate-500">總綠覆面積 ÷ 實設空地</div>
            <div className={`text-3xl font-bold ${coverRate >= 100 ? 'text-emerald-700' : os > 0 ? 'text-red-600' : 'text-slate-400'}`}>
              {os > 0 ? `${coverRate.toFixed(2)}%` : '—'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">需達</div>
            <div className="text-3xl font-bold text-slate-700">100%</div>
            {os > 0 && coverRate < 100 && (
              <div className="text-xs text-red-500 mt-1">
                尚缺 {(os - totalCover).toFixed(2)} m² 綠覆面積
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
