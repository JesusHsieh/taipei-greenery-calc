import { n } from '../utils';
import { TREE_AREA } from '../constants';
import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { Tag } from '../components/Tag';
import { TreeSection } from '../components/TreeSection';
import { cardCls, hCls, inputCls, labelCls } from '../styles';

type Props = Pick<GreeneryCalc,
  // HS trees
  | 'hs150L'|'setHs150L'|'hs150M'|'setHs150M'|'hs150S'|'setHs150S'|'hs150P'|'setHs150P'
  | 'hs120L'|'setHs120L'|'hs120M'|'setHs120M'|'hs120S'|'setHs120S'|'hs120P'|'setHs120P'
  | 'hs100L'|'setHs100L'|'hs100M'|'setHs100M'|'hs100S'|'setHs100S'|'hs100P'|'setHs100P'
  // LS trees
  | 'ls150L'|'setLs150L'|'ls150M'|'setLs150M'|'ls150S'|'setLs150S'|'ls150P'|'setLs150P'
  | 'ls120L'|'setLs120L'|'ls120M'|'setLs120M'|'ls120S'|'setLs120S'|'ls120P'|'setLs120P'
  | 'ls100L'|'setLs100L'|'ls100M'|'setLs100M'|'ls100S'|'setLs100S'|'ls100P'|'setLs100P'
  // Eco-layer
  | 'ecoLayerArea' | 'setEcoLayerArea'
  // Ground other
  | 'groundShrub'|'setGroundShrub'|'groundGrass'|'setGroundGrass'
  | 'groundDitch'|'setGroundDitch'|'groundBrick'|'setGroundBrick'
  | 'groundPond'|'setGroundPond'|'groundWallW'|'setGroundWallW'|'groundWallF'|'setGroundWallF'
  // Roadside
  | 'roadsideSpace'|'setRoadsideSpace'|'rsL'|'setRsL'|'rsM'|'setRsM'|'rsS'|'setRsS'
  // Computed
  | 'hsArea'|'lsArea'|'groundShrubArea'|'groundOther'
  | 'grassArea'|'ditchExtra'|'brickArea'|'pondArea'|'wallArea'
  | 'roadsideTrees'|'roadsideCover'
>;

export function Article7({
  ecoLayerArea, setEcoLayerArea,
  hs150L,setHs150L,hs150M,setHs150M,hs150S,setHs150S,hs150P,setHs150P,
  hs120L,setHs120L,hs120M,setHs120M,hs120S,setHs120S,hs120P,setHs120P,
  hs100L,setHs100L,hs100M,setHs100M,hs100S,setHs100S,hs100P,setHs100P,
  ls150L,setLs150L,ls150M,setLs150M,ls150S,setLs150S,ls150P,setLs150P,
  ls120L,setLs120L,ls120M,setLs120M,ls120S,setLs120S,ls120P,setLs120P,
  ls100L,setLs100L,ls100M,setLs100M,ls100S,setLs100S,ls100P,setLs100P,
  groundShrub,setGroundShrub,groundGrass,setGroundGrass,
  groundDitch,setGroundDitch,groundBrick,setGroundBrick,
  groundPond,setGroundPond,groundWallW,setGroundWallW,groundWallF,setGroundWallF,
  roadsideSpace,setRoadsideSpace,rsL,setRsL,rsM,setRsM,rsS,setRsS,
  hsArea,lsArea,groundShrubArea,groundOther,
  grassArea,ditchExtra,brickArea,pondArea,wallArea,
  roadsideTrees,roadsideCover,
}: Props) {
  return (
    <div className={cardCls}>
      <h2 className={hCls}>第7條：法定空地植栽配置</h2>

      {/* 喬木規格說明 */}
      <div className="bg-amber-50 rounded-lg p-3 mb-5 border border-amber-200">
        <p className="text-xs font-bold text-amber-800 mb-2">第10條第1項第1款：喬木綠覆面積標準（依米高徑）</p>
        <div className="grid grid-cols-4 gap-2 text-xs text-center">
          {[
            { type:'大喬木', spec:'米高徑≥8cm', area:TREE_AREA.large },
            { type:'中喬木', spec:'米高徑≥6cm', area:TREE_AREA.medium },
            { type:'小喬木', spec:'米高徑≥4cm', area:TREE_AREA.small },
            { type:'棕櫚類', spec:'裸幹高≥1m',  area:TREE_AREA.palm },
          ].map(({ type, spec, area }) => (
            <div key={type} className="bg-white rounded p-2 border border-amber-100">
              <div className="font-semibold">{type}</div>
              <div className="text-slate-400">{spec}</div>
              <div className="text-base font-bold text-amber-700">{area} m²/株</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-700 mt-2">
          ⚠ 覆土深度折算：≥150cm → 100%｜120–150cm → 80%｜100–120cm → 60%（第7條第1款）
        </p>
      </div>

      {/* 高遮蔭喬木 */}
      <TreeSection
        title="高遮蔭喬木" shade="高遮蔭"
        bgCls="bg-green-50" borderCls="border-green-200"
        titleCls="text-green-900" totalCls="text-green-700" totalBorderCls="border-green-500"
        groups={[
          { label:'覆土 ≥ 150 cm（100%）', borderCls:'border-green-400',  factor:1.0, vars:[hs150L,hs150M,hs150S,hs150P], setters:[setHs150L,setHs150M,setHs150S,setHs150P] },
          { label:'覆土 120–150 cm（80%）', borderCls:'border-yellow-400', factor:0.8, vars:[hs120L,hs120M,hs120S,hs120P], setters:[setHs120L,setHs120M,setHs120S,setHs120P] },
          { label:'覆土 100–120 cm（60%）', borderCls:'border-orange-400', factor:0.6, vars:[hs100L,hs100M,hs100S,hs100P], setters:[setHs100L,setHs100M,setHs100S,setHs100P] },
        ]}
        total={hsArea}
      />

      {/* 低遮蔭喬木 */}
      <TreeSection
        title="低遮蔭喬木" shade="低遮蔭"
        bgCls="bg-blue-50" borderCls="border-blue-200"
        titleCls="text-blue-900" totalCls="text-blue-700" totalBorderCls="border-blue-500"
        groups={[
          { label:'覆土 ≥ 150 cm（100%）', borderCls:'border-blue-400',   factor:1.0, vars:[ls150L,ls150M,ls150S,ls150P], setters:[setLs150L,setLs150M,setLs150S,setLs150P] },
          { label:'覆土 120–150 cm（80%）', borderCls:'border-yellow-400', factor:0.8, vars:[ls120L,ls120M,ls120S,ls120P], setters:[setLs120L,setLs120M,setLs120S,setLs120P] },
          { label:'覆土 100–120 cm（60%）', borderCls:'border-orange-400', factor:0.6, vars:[ls100L,ls100M,ls100S,ls100P], setters:[setLs100L,setLs100M,setLs100S,setLs100P] },
        ]}
        total={lsArea}
      />

      {/* 生態複層 */}
      <div className="bg-teal-50 rounded-lg p-4 border border-teal-200 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <label className={labelCls + ' mb-0 text-teal-900'}>生態複層面積 (m²)</label>
          <Tag label="固碳 Gi=2.00" color="green" />
        </div>
        <input type="number" value={ecoLayerArea} onChange={e => setEcoLayerArea(e.target.value)}
          className={inputCls} placeholder="0" min="0" />
        <p className="text-xs text-teal-700 mt-1">
          大小喬木、灌木、花草<strong>密植混種區</strong>（喬木間距≤3.5m），以樹冠總投影面積計。
          使用此欄者，該區域的喬木<strong>請勿重複填入上方喬木欄</strong>。
        </p>
      </div>

      {/* 灌木 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <label className={labelCls + ' mb-0'}>灌木面積 (m²)</label>
          <Tag label="綠覆率 ×1.2綠容" color="green" />
        </div>
        <input type="number" value={groundShrub} onChange={e => setGroundShrub(e.target.value)}
          className={inputCls} placeholder="0" min="0" />
        <p className="text-xs text-slate-400 mt-1">覆土 ≥ 60 cm（第7條第1款），每 m² 應栽植 ≥ 4 株（第10條）</p>
      </div>

      {/* 其他植栽 */}
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-orange-900 text-sm">其他植栽（第10條第1項第3–6款）</h3>
          <Tag label="綠覆率 ×1.0綠容" color="orange" />
        </div>
        <div className="bg-blue-50 rounded p-2 mb-3 text-xs text-blue-800 border border-blue-200">
          ⚠ 地面植栽（第7條）覆土需 ≥ 30 cm（藤蔓、草花、地被、草皮類）
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>草花、地被、草皮類 (m²)</label>
            <input type="number" value={groundGrass} onChange={e => setGroundGrass(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-slate-400 mt-1">
              以實際被覆面積計算（第10條第3款）<br />
              ⚠ 草溝的實際被覆面積也填入此欄（草溝面積≈長度×0.4m）
            </p>
          </div>
          <div>
            <label className={labelCls}>草溝長度 (m)　<span className="font-normal text-slate-400">（僅加計 +10%）</span></label>
            <input type="number" value={groundDitch} onChange={e => setGroundDitch(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              +10% 加計 = {n(groundDitch).toFixed(1)}m × 0.4 × 10% = {ditchExtra.toFixed(2)} m²
            </p>
            <p className="text-xs text-slate-400">草溝實際面積請填入左側「草花地被」欄</p>
          </div>
          <div>
            <label className={labelCls}>透水性植草磚舖設面積 (m²)</label>
            <input type="number" value={groundBrick} onChange={e => setGroundBrick(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入面積 = {n(groundBrick).toFixed(2)} ÷ 3 = {brickArea.toFixed(2)} m²（第10條第4款）
            </p>
          </div>
          <div>
            <label className={labelCls}>生態水池／溪溝水面面積 (m²)</label>
            <input type="number" value={groundPond} onChange={e => setGroundPond(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入面積 = {n(groundPond).toFixed(2)} ÷ 3 = {pondArea.toFixed(2)} m²（第10條第5款）
            </p>
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>雙層植生遮陽牆（第10條第6款：寬度 × 3m × 樓層數）</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={groundWallW} onChange={e => setGroundWallW(e.target.value)}
                className={inputCls} placeholder="植栽槽寬度 (m)" min="0" />
              <input type="number" value={groundWallF} onChange={e => setGroundWallF(e.target.value)}
                className={inputCls} placeholder="設置樓層數" min="0" />
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              計入面積 = {n(groundWallW).toFixed(1)}m × 3m × {n(groundWallF)} 樓 = {wallArea.toFixed(2)} m²
            </p>
          </div>
        </div>
        <div className="mt-3 p-2 bg-white rounded border-2 border-orange-400 flex justify-between">
          <span className="font-semibold text-orange-900">其他植栽合計（計入綠覆面積）</span>
          <div className="text-right">
            <div className="text-xl font-bold text-orange-700">{groundOther.toFixed(2)} m²</div>
            <div className="text-xs text-slate-400">
              = 草花{grassArea.toFixed(2)} + 草溝加計{ditchExtra.toFixed(2)} + 植草磚{brickArea.toFixed(2)} + 水池{pondArea.toFixed(2)} + 遮陽牆{wallArea.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* 法定空地小計 */}
      <div className="grid grid-cols-4 gap-2 bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
        {[
          { label:'高遮蔭喬木', val:hsArea,         color:'text-green-700',  eff:hsArea*3 },
          { label:'低遮蔭喬木', val:lsArea,         color:'text-blue-700',   eff:lsArea*2 },
          { label:'灌木',       val:groundShrubArea, color:'text-amber-700',  eff:groundShrubArea*1.2 },
          { label:'其他植栽',   val:groundOther,     color:'text-orange-700', eff:groundOther },
        ].map(({ label, val, color, eff }) => (
          <div key={label}>
            <div className="text-xs text-slate-500">{label}</div>
            <div className={`font-bold ${color}`}>{val.toFixed(2)} m²</div>
            <div className="text-xs text-slate-400">等效 {eff.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* 臨道路 */}
      <div className="mt-5 pt-5 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-slate-700">第7條第2項：臨道路開放空間</h3>
          <Tag label="喬木綠覆率≥80%" color="green" />
        </div>
        <p className="text-xs text-slate-500 mb-3">退縮 ≥ 3.64 m 帶狀開放空間或無遮簷人行道，不含棕櫚類</p>
        <div className="mb-3">
          <label className={labelCls}>開放空間面積 (m²)　<span className="font-normal text-slate-400">作為分母</span></label>
          <input type="number" value={roadsideSpace} onChange={e => setRoadsideSpace(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { lbl:'大喬木 (株)', val:rsL, set:setRsL, area:TREE_AREA.large },
            { lbl:'中喬木 (株)', val:rsM, set:setRsM, area:TREE_AREA.medium },
            { lbl:'小喬木 (株)', val:rsS, set:setRsS, area:TREE_AREA.small },
          ].map(({ lbl, val, set, area }) => (
            <div key={lbl}>
              <label className={labelCls}>{lbl}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className={inputCls} placeholder="0" min="0" />
              <p className="text-xs text-emerald-600 font-semibold mt-1">= {(n(val)*area).toFixed(2)} m²</p>
            </div>
          ))}
        </div>
        {n(roadsideSpace) > 0 && (
          <div className={`p-3 rounded-lg flex justify-between items-center ${roadsideCover >= 80 ? 'bg-emerald-50 border border-emerald-300' : 'bg-red-50 border border-red-300'}`}>
            <span className="text-sm text-slate-600">喬木面積 {roadsideTrees.toFixed(2)} m² ÷ 開放空間 {n(roadsideSpace).toFixed(2)} m²</span>
            <div className="text-right">
              <span className={`text-xl font-bold ${roadsideCover >= 80 ? 'text-emerald-700' : 'text-red-700'}`}>{roadsideCover.toFixed(2)}%</span>
              <span className="text-slate-500 ml-1 text-xs">（需 ≥ 80%）</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
