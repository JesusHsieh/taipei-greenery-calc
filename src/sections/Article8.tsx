import { TREE_AREA } from '../constants';
import { n } from '../utils';
import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { Tag } from '../components/Tag';
import { cardCls, hCls, inputCls, labelCls } from '../styles';

type Props = Pick<GreeneryCalc,
  | 'vertHsL' | 'setVertHsL' | 'vertHsM' | 'setVertHsM' | 'vertHsS' | 'setVertHsS' | 'vertHsP' | 'setVertHsP'
  | 'vertLsL' | 'setVertLsL' | 'vertLsM' | 'setVertLsM' | 'vertLsS' | 'setVertLsS' | 'vertLsP' | 'setVertLsP'
  | 'vertShrub' | 'setVertShrub' | 'vertOther' | 'setVertOther'
  | 'vertHsArea' | 'vertLsArea' | 'vertShrubArea' | 'vertOtherArea'
>;

const TREE_TYPES = ['大喬木', '中喬木', '小喬木', '棕櫚類'] as const;
const AREAS = [TREE_AREA.large, TREE_AREA.medium, TREE_AREA.small, TREE_AREA.palm];

export function Article8({ vertHsL, setVertHsL, vertHsM, setVertHsM, vertHsS, setVertHsS, vertHsP, setVertHsP,
  vertLsL, setVertLsL, vertLsM, setVertLsM, vertLsS, setVertLsS, vertLsP, setVertLsP,
  vertShrub, setVertShrub, vertOther, setVertOther,
  vertHsArea, vertLsArea, vertShrubArea, vertOtherArea }: Props) {

  const hsVals: [string,string,string,string] = [vertHsL, vertHsM, vertHsS, vertHsP];
  const hsSets = [setVertHsL, setVertHsM, setVertHsS, setVertHsP];
  const lsVals: [string,string,string,string] = [vertLsL, vertLsM, vertLsS, vertLsP];
  const lsSets = [setVertLsL, setVertLsM, setVertLsS, setVertLsP];

  return (
    <div className={cardCls}>
      <h2 className={hCls}>第8條：立體綠化設施</h2>
      <p className="text-xs text-slate-500 mb-4">覆土：喬木 ≥ 70 cm、灌木 ≥ 40 cm、其他 ≥ 10 cm（第8條第1款）</p>

      {/* 高遮蔭喬木 */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-green-900">高遮蔭喬木</h3>
          <Tag label="綠容率 ×3.0" color="green" />
          <Tag label="綠覆率" color="green" />
          <span className="text-xs text-slate-400">覆土 ≥ 70 cm，不分覆土深度折算</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {TREE_TYPES.map((type, ti) => (
            <div key={type}>
              <label className="block text-xs text-slate-500 mb-1">{type} (株)<br /><span className="text-slate-400">{AREAS[ti]} m²/株</span></label>
              <input type="number" value={hsVals[ti]} onChange={e => hsSets[ti](e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                placeholder="0" min="0" />
              <p className="text-xs text-emerald-600 font-semibold mt-0.5">= {(n(hsVals[ti])*AREAS[ti]).toFixed(2)} m²</p>
            </div>
          ))}
        </div>
        <div className="mt-2 p-2 bg-white rounded border border-green-400 flex justify-between">
          <span className="text-sm font-semibold text-green-900">小計</span>
          <div className="text-right">
            <span className="font-bold text-green-700">{vertHsArea.toFixed(2)} m²</span>
            <span className="text-xs text-slate-400 ml-2">等效 {(vertHsArea*3).toFixed(2)} m²</span>
          </div>
        </div>
      </div>

      {/* 低遮蔭喬木 */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-blue-900">低遮蔭喬木</h3>
          <Tag label="綠容率 ×2.0" color="blue" />
          <Tag label="綠覆率" color="green" />
          <span className="text-xs text-slate-400">覆土 ≥ 70 cm，不分覆土深度折算</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {TREE_TYPES.map((type, ti) => (
            <div key={type}>
              <label className="block text-xs text-slate-500 mb-1">{type} (株)<br /><span className="text-slate-400">{AREAS[ti]} m²/株</span></label>
              <input type="number" value={lsVals[ti]} onChange={e => lsSets[ti](e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
                placeholder="0" min="0" />
              <p className="text-xs text-blue-600 font-semibold mt-0.5">= {(n(lsVals[ti])*AREAS[ti]).toFixed(2)} m²</p>
            </div>
          ))}
        </div>
        <div className="mt-2 p-2 bg-white rounded border border-blue-400 flex justify-between">
          <span className="text-sm font-semibold text-blue-900">小計</span>
          <div className="text-right">
            <span className="font-bold text-blue-700">{vertLsArea.toFixed(2)} m²</span>
            <span className="text-xs text-slate-400 ml-2">等效 {(vertLsArea*2).toFixed(2)} m²</span>
          </div>
        </div>
      </div>

      {/* 灌木、其他 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className={labelCls + ' mb-0'}>灌木面積 (m²)</label>
            <Tag label="×1.2綠容" color="green" />
          </div>
          <input type="number" value={vertShrub} onChange={e => setVertShrub(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
          <p className="text-xs text-slate-400 mt-1">覆土 ≥ 40 cm</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className={labelCls + ' mb-0'}>其他植栽面積 (m²)</label>
            <Tag label="×1.0綠容" color="orange" />
          </div>
          <input type="number" value={vertOther} onChange={e => setVertOther(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
          <p className="text-xs text-slate-400 mt-1">覆土 ≥ 10 cm（藤蔓、草花、地被、草皮）</p>
        </div>
      </div>

      {/* 小計 */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
        <span className="font-semibold text-slate-700">立體綠化合計</span>
        <div className="text-right">
          <span className="font-bold text-slate-800">{(vertHsArea+vertLsArea+vertShrubArea+vertOtherArea).toFixed(2)} m²</span>
          <div className="text-xs text-slate-400">
            等效 {(vertHsArea*3 + vertLsArea*2 + vertShrubArea*1.2 + vertOtherArea).toFixed(2)} m²
          </div>
        </div>
      </div>
    </div>
  );
}
