import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { CARBON } from '../constants';
import { cardCls, hCls } from '../styles';

type Props = Pick<GreeneryCalc,
  | 'allHs' | 'allLs' | 'allShrub' | 'allOther' | 'totalGreen' | 'effectiveGreen'
  | 'coverRate' | 'volumeRate' | 'std'
  | 'actualCarbon' | 'reqCarbon' | 'alpha' | 'A_prime'
  | 'ecoLayerVal' | 'carbonLargeArea' | 'carbonSmallArea' | 'carbonPalmArea'
>;

export function Article5Summary({
  allHs, allLs, allShrub, allOther, totalGreen, effectiveGreen,
  coverRate, volumeRate, std,
  actualCarbon, reqCarbon, alpha, A_prime,
  ecoLayerVal, carbonLargeArea, carbonSmallArea, carbonPalmArea,
}: Props) {

  const coolRows = [
    { label:'高遮蔭喬木（法定空地+立體+屋頂）', area:allHs,    coeff:3.0 },
    { label:'低遮蔭喬木+棕櫚（法定空地+立體+屋頂）', area:allLs, coeff:2.0 },
    { label:'灌木（法定空地+立體+屋頂）',           area:allShrub, coeff:1.2 },
    { label:'其他植栽（法定空地+立體+屋頂）',       area:allOther, coeff:1.0 },
  ];

  // 各植栽類別固碳貢獻（乘 α 之前）
  const sumGiAi =
    ecoLayerVal     * CARBON.ecoLayer   +
    carbonLargeArea * CARBON.largeBroad +
    carbonSmallArea * CARBON.smallTree  +
    carbonPalmArea  * CARBON.palm       +
    allShrub        * CARBON.shrub      +
    allOther        * CARBON.grass;

  const carbonRows = [
    { label: '生態複層（喬木間距≤3.5m密植）', gi: CARBON.ecoLayer,   area: ecoLayerVal,     },
    { label: '闊葉大喬木（高遮蔭，成樹≥10m）', gi: CARBON.largeBroad, area: carbonLargeArea, },
    { label: '闊葉小喬木/針葉/疏葉（低遮蔭）', gi: CARBON.smallTree,  area: carbonSmallArea, },
    { label: '棕櫚類',                         gi: CARBON.palm,       area: carbonPalmArea,  },
    { label: '灌木（每㎡栽植2株以上）',         gi: CARBON.shrub,      area: allShrub,        },
    { label: '草花/地被/草皮/薄層/壁掛/其他',  gi: CARBON.grass,      area: allOther,        },
  ];

  return (
    <>
      {/* ── 第5條：等效綠覆面積彙整 ── */}
      <div className={cardCls}>
        <h2 className={hCls}>第5條：等效綠覆面積彙整（自動計算）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-2 border border-slate-200">植栽種類</th>
                <th className="text-right p-2 border border-slate-200">面積 (m²)</th>
                <th className="text-right p-2 border border-slate-200">降溫係數</th>
                <th className="text-right p-2 border border-slate-200">等效面積 (m²)</th>
              </tr>
            </thead>
            <tbody>
              {coolRows.map(({ label, area, coeff }) => (
                <tr key={label} className="border-b border-slate-100">
                  <td className="p-2 border border-slate-200 text-slate-700">{label}</td>
                  <td className="p-2 border border-slate-200 text-right font-semibold">{area.toFixed(2)}</td>
                  <td className="p-2 border border-slate-200 text-right text-blue-600 font-bold">× {coeff}</td>
                  <td className="p-2 border border-slate-200 text-right font-bold text-emerald-700">{(area*coeff).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold">
                <td className="p-2 border border-slate-200">合計</td>
                <td className="p-2 border border-slate-200 text-right">{totalGreen.toFixed(2)}</td>
                <td className="p-2 border border-slate-200"></td>
                <td className="p-2 border border-slate-200 text-right text-emerald-700">{effectiveGreen.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg text-center ${coverRate >= std.cover ? 'bg-emerald-50 border border-emerald-300' : 'bg-red-50 border border-red-300'}`}>
            <div className="text-xs text-slate-500">綠覆率 = 總綠覆 ÷ 法定空地</div>
            <div className={`text-2xl font-bold ${coverRate >= std.cover ? 'text-emerald-700' : 'text-red-600'}`}>{coverRate.toFixed(2)}%</div>
            <div className="text-xs text-slate-400">需 ≥ {std.cover}%</div>
          </div>
          <div className={`p-3 rounded-lg text-center ${volumeRate >= std.volume ? 'bg-emerald-50 border border-emerald-300' : 'bg-red-50 border border-red-300'}`}>
            <div className="text-xs text-slate-500">綠容率 = 等效綠覆 ÷ 基地面積</div>
            <div className={`text-2xl font-bold ${volumeRate >= std.volume ? 'text-emerald-700' : 'text-red-600'}`}>{volumeRate.toFixed(3)}</div>
            <div className="text-xs text-slate-400">需 ≥ {std.volume}</div>
          </div>
        </div>
      </div>

      {/* ── 第6條：固碳當量明細 ── */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="font-bold text-slate-700 mb-1 text-sm">
          第6條：固碳當量明細（依建築基地綠化設計技術規範 表1）
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          TCO₂ = (ΣGi × Ai) × α &nbsp;|&nbsp; TCO₂c = 0.5 × A'({A_prime.toFixed(2)} m²) × β({std.carbon})
        </p>

        {/* 各類別明細 */}
        <table className="w-full text-xs border-collapse mb-3">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left p-2 border border-slate-200">植栽類型</th>
              <th className="text-right p-2 border border-slate-200">Gi (kgCO₂e/m²·yr)</th>
              <th className="text-right p-2 border border-slate-200">面積 Ai (m²)</th>
              <th className="text-right p-2 border border-slate-200">Gi × Ai</th>
            </tr>
          </thead>
          <tbody>
            {carbonRows.map(({ label, gi, area }) => (
              <tr key={label} className={`border-b border-slate-100 ${area <= 0 ? 'opacity-40' : ''}`}>
                <td className="p-2 border border-slate-200 text-slate-700">{label}</td>
                <td className="p-2 border border-slate-200 text-right font-bold text-teal-700">{gi.toFixed(2)}</td>
                <td className="p-2 border border-slate-200 text-right">{area.toFixed(2)}</td>
                <td className="p-2 border border-slate-200 text-right font-semibold text-slate-800">{(gi * area).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold text-sm">
              <td className="p-2 border border-slate-200" colSpan={3}>ΣGi × Ai（× α 之前）</td>
              <td className="p-2 border border-slate-200 text-right text-slate-800">{sumGiAi.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* α 係數說明 */}
        <div className="flex items-center gap-2 mb-3 bg-blue-50 rounded-lg p-2 border border-blue-200">
          <span className="text-xs text-blue-700 font-semibold">× 生態綠化修正係數 α =</span>
          <span className="text-lg font-bold text-blue-800">{alpha.toFixed(2)}</span>
          <span className="text-xs text-blue-500 ml-1">（0.80 無計畫 ～ 1.30 全面原生植物）</span>
        </div>

        {/* 合格判斷 */}
        <div className={`flex flex-wrap justify-between items-center rounded-lg p-3 border-2 gap-2 ${actualCarbon >= reqCarbon ? 'bg-emerald-50 border-emerald-400' : 'bg-red-50 border-red-400'}`}>
          <div>
            <div className="text-xs text-slate-500">綠化總固碳當量 TCO₂</div>
            <div className={`text-2xl font-bold ${actualCarbon >= reqCarbon ? 'text-emerald-700' : 'text-red-600'}`}>
              {actualCarbon.toFixed(2)} <span className="text-sm font-normal">kgCO₂e/yr</span>
            </div>
          </div>
          <div className="text-slate-400 font-bold text-xl">{actualCarbon >= reqCarbon ? '≥' : '<'}</div>
          <div className="text-right">
            <div className="text-xs text-slate-500">固碳當量基準值 TCO₂c</div>
            <div className="text-2xl font-bold text-slate-700">
              {reqCarbon.toFixed(2)} <span className="text-sm font-normal">kgCO₂e/yr</span>
            </div>
            <div className="text-xs text-slate-400">= 0.5 × {A_prime.toFixed(2)} × {std.carbon}</div>
          </div>
        </div>
      </div>
    </>
  );
}
