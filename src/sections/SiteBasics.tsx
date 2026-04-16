import { STANDARDS } from '../constants';
import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { cardCls, hCls, inputCls, labelCls } from '../styles';

type Props = Pick<GreeneryCalc,
  | 'buildingClass' | 'setBuildingClass'
  | 'baseArea' | 'setBaseArea'
  | 'bcr' | 'setBcr'
  | 'nonGreenable' | 'setNonGreenable'
  | 'alphaInput' | 'setAlphaInput'
  | 'std' | 'legalSpace' | 'calcFootprint' | 'A_prime' | 'totalGreen'
>;

export function SiteBasics({ buildingClass, setBuildingClass, baseArea, setBaseArea, bcr, setBcr,
  nonGreenable, setNonGreenable, alphaInput, setAlphaInput,
  std, legalSpace, calcFootprint, A_prime, totalGreen }: Props) {
  return (
    <>
      {/* ── 第4條：建築基地分類 ── */}
      <div className={cardCls}>
        <h2 className={hCls}>第4條：建築基地分類</h2>
        <select value={buildingClass} onChange={e => setBuildingClass(e.target.value as keyof typeof STANDARDS)}
          className={inputCls}>
          <option value="1">第一類 — 新開闢 ≥ 1ha 公園用地</option>
          <option value="2">第二類 — 完整街廓 / 公有建築 / ≥1000m²且增加容積</option>
          <option value="3">第三類 — 基地面積 ≥ 1,000 m²（或500–1000m²增加容積）</option>
          <option value="4">第四類 — 基地面積 500–1,000 m²（或住宅區 ≥ 300 m²）</option>
          <option value="5">第五類 — 其他建築基地</option>
        </select>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: '綠覆率要求', value: `≥ ${std.cover}%` },
            { label: '綠容率要求', value: `≥ ${std.volume}` },
            { label: '固碳當量基準', value: `${std.carbon} kg/m²·yr` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
              <div className="text-slate-500 text-xs mb-1">{label}</div>
              <div className="text-xl font-bold text-emerald-700">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 基地環境基礎數值 ── */}
      <div className={cardCls}>
        <h2 className={hCls}>基地環境基礎數值</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelCls}>建築基地面積 (m²) *</label>
            <input type="number" value={baseArea} onChange={e => setBaseArea(e.target.value)}
              className={inputCls} placeholder="請輸入基地面積" min="0" />
          </div>
          <div>
            <label className={labelCls}>建蔽率 (%) *</label>
            <input type="number" value={bcr} onChange={e => setBcr(e.target.value)}
              className={inputCls} placeholder="請輸入建蔽率" min="0" max="100" />
            <p className="text-sm mt-1 text-slate-500">
              → 建築面積：<span className="font-bold text-emerald-600">{calcFootprint.toFixed(2)} m²</span>
            </p>
          </div>
          <div>
            <label className={labelCls}>無法綠化面積 Ap (m²)</label>
            <input type="number" value={nonGreenable} onChange={e => setNonGreenable(e.target.value)}
              className={inputCls} placeholder="0" min="0" />
            <p className="text-xs text-slate-400 mt-1">消防救災空間、騎樓、基地內通路、戶外運動設施等</p>
          </div>
          <div>
            <label className={labelCls}>生態綠化修正係數 α</label>
            <input type="number" value={alphaInput} onChange={e => setAlphaInput(e.target.value)}
              className={inputCls} placeholder="0.80" min="0.8" max="1.3" step="0.01" />
            <p className="text-xs text-slate-400 mt-1">
              0.80（無計畫）～ 1.30（全面原生/誘鳥誘蝶植物）；無計畫書填 0.80
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          {[
            { label: '法定空地面積', val: legalSpace, sub: '= A₀ × (1 − r)' },
            { label: "最小綠化面積 A'", val: A_prime, sub: '= max((A₀−Ap)×(1−r), 0.15×A₀)' },
            { label: '目前總綠覆面積', val: totalGreen, sub: '= 所有植栽合計',
              highlight: legalSpace > 0 ? totalGreen / legalSpace * 100 >= std.cover : undefined },
          ].map(({ label, val, sub, highlight }) => (
            <div key={label} className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-xs text-slate-500">{label}</div>
              <div className={`text-2xl font-bold ${highlight === false ? 'text-red-600' : 'text-emerald-700'}`}>
                {val.toFixed(2)} m²
              </div>
              <div className="text-xs text-slate-400">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
