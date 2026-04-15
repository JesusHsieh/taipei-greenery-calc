import { n } from '../utils';
import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { Tag } from '../components/Tag';
import { cardCls, hCls, inputCls, labelCls } from '../styles';

type Props = Pick<GreeneryCalc,
  | 'roofTotal' | 'setRoofTotal' | 'roofNonGreen' | 'setRoofNonGreen'
  | 'roofHsArea' | 'setRoofHsArea' | 'roofLsArea' | 'setRoofLsArea'
  | 'roofPalmArea' | 'setRoofPalmArea' | 'roofShrub' | 'setRoofShrub'
  | 'roofOther' | 'setRoofOther'
  | 'roofHs' | 'roofLs' | 'roofPalm' | 'roofShrubArea' | 'roofGreen'
  | 'greenableRoof' | 'roofRate' | 'roofShrubPct'
>;

export function Article9({ roofTotal, setRoofTotal, roofNonGreen, setRoofNonGreen,
  roofHsArea, setRoofHsArea, roofLsArea, setRoofLsArea,
  roofPalmArea, setRoofPalmArea, roofShrub, setRoofShrub, roofOther, setRoofOther,
  roofHs, roofLs, roofPalm, roofShrubArea, roofGreen,
  greenableRoof, roofRate, roofShrubPct }: Props) {
  return (
    <div className={cardCls}>
      <h2 className={hCls}>第9條：屋頂平臺綠化</h2>
      <p className="text-xs text-slate-500 mb-4">覆土：喬木 ≥ 70 cm、灌木 ≥ 40 cm、其他 ≥ 10 cm（第9條第1款）</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelCls}>屋頂平臺總面積 (m²)　<span className="font-normal text-slate-400">作為分母</span></label>
          <input type="number" value={roofTotal} onChange={e => setRoofTotal(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
        </div>
        <div>
          <label className={labelCls}>無法綠化面積 (m²)</label>
          <input type="number" value={roofNonGreen} onChange={e => setRoofNonGreen(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
          <p className="text-xs text-slate-400 mt-1">太陽能光電設備、洗窗機軌道、通氣墩座、雨水回收設施（第9條）</p>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5">→ 可綠化面積 = {greenableRoof.toFixed(2)} m²</p>
        </div>
      </div>

      {/* 喬木（高/低遮蔭分開） */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mb-4">
        <h3 className="font-bold text-purple-900 mb-3">屋頂喬木及棕櫚類（輸入實際種植面積）</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <label className={labelCls + ' mb-0'}>高遮蔭喬木面積 (m²)</label>
              <Tag label="×3.0綠容" color="green" />
            </div>
            <input type="number" value={roofHsArea} onChange={e => setRoofHsArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-emerald-600 font-semibold mt-1">等效 {(roofHs*3).toFixed(2)} m²</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <label className={labelCls + ' mb-0'}>低遮蔭喬木面積 (m²)</label>
              <Tag label="×2.0綠容" color="blue" />
            </div>
            <input type="number" value={roofLsArea} onChange={e => setRoofLsArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-blue-600 font-semibold mt-1">等效 {(roofLs*2).toFixed(2)} m²</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <label className={labelCls + ' mb-0'}>棕櫚類面積 (m²)</label>
              <Tag label="×2.0綠容" color="blue" />
            </div>
            <input type="number" value={roofPalmArea} onChange={e => setRoofPalmArea(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-blue-600 font-semibold mt-1">等效 {(roofPalm*2).toFixed(2)} m²</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className={labelCls + ' mb-0'}>灌木面積 (m²)</label>
            <Tag label="應≥屋頂綠覆30%" color="purple" />
            <Tag label="×1.2綠容" color="green" />
          </div>
          <input type="number" value={roofShrub} onChange={e => setRoofShrub(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
          <p className="text-xs text-slate-400 mt-1">覆土 ≥ 40 cm</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className={labelCls + ' mb-0'}>草花、地被、草皮 (m²)</label>
            <Tag label="×1.0綠容" color="orange" />
          </div>
          <input type="number" value={roofOther} onChange={e => setRoofOther(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
          <p className="text-xs text-slate-400 mt-1">覆土 ≥ 10 cm</p>
        </div>
      </div>

      {/* 即時檢核 */}
      {n(roofTotal) > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg ${roofRate >= 50 ? 'bg-emerald-50 border border-emerald-300' : 'bg-red-50 border border-red-300'}`}>
            <div className="text-xs text-slate-500 mb-1">屋頂平臺綠覆率（第9條第2項）</div>
            <div className={`text-xl font-bold ${roofRate >= 50 ? 'text-emerald-700' : 'text-red-700'}`}>{roofRate.toFixed(2)}%</div>
            <div className="text-xs text-slate-400">{roofGreen.toFixed(2)} m² ÷ {greenableRoof.toFixed(2)} m²　需 ≥ 50%</div>
          </div>
          <div className={`p-3 rounded-lg ${roofShrubPct >= 30 ? 'bg-emerald-50 border border-emerald-300' : 'bg-red-50 border border-red-300'}`}>
            <div className="text-xs text-slate-500 mb-1">屋頂灌木面積比例（第9條第1項）</div>
            <div className={`text-xl font-bold ${roofShrubPct >= 30 ? 'text-emerald-700' : 'text-red-700'}`}>{roofShrubPct.toFixed(2)}%</div>
            <div className="text-xs text-slate-400">{roofShrubArea.toFixed(2)} m² ÷ {roofGreen.toFixed(2)} m²　需 ≥ 30%</div>
          </div>
        </div>
      )}
    </div>
  );
}
