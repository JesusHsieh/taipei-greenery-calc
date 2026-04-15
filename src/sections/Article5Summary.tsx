import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { CARBON } from '../constants';
import { cardCls, hCls } from '../styles';

type Props = Pick<GreeneryCalc,
  | 'allHs' | 'allLs' | 'allShrub' | 'allOther' | 'totalGreen' | 'effectiveGreen'
  | 'coverRate' | 'volumeRate' | 'std'
  | 'actualCarbon' | 'reqCarbon'
  | 'grassArea' | 'ditchExtra' | 'brickArea' | 'pondArea' | 'wallArea'
  | 'vertOtherArea' | 'roofOtherArea'
>;

export function Article5Summary({ allHs, allLs, allShrub, allOther, totalGreen, effectiveGreen,
  coverRate, volumeRate, std, actualCarbon, reqCarbon,
  grassArea, ditchExtra, brickArea, pondArea, wallArea, vertOtherArea, roofOtherArea }: Props) {

  const rows = [
    { label:'高遮蔭喬木（法定空地+立體+屋頂）', area:allHs,    coeff:3.0 },
    { label:'低遮蔭喬木+棕櫚（法定空地+立體+屋頂）', area:allLs, coeff:2.0 },
    { label:'灌木（法定空地+立體+屋頂）',           area:allShrub, coeff:1.2 },
    { label:'其他植栽（法定空地+立體+屋頂）',       area:allOther, coeff:1.0 },
  ];

  const carbonRows = [
    { label:`高遮蔭喬木 ${allHs.toFixed(2)}m² × ${CARBON.highShade}`,  val: allHs  * CARBON.highShade },
    { label:`低遮蔭+棕 ${allLs.toFixed(2)}m² × ${CARBON.lowShade}`,    val: allLs  * CARBON.lowShade  },
    { label:`灌木 ${allShrub.toFixed(2)}m² × ${CARBON.shrub}`,          val: allShrub * CARBON.shrub   },
    { label:`草花地被 ${grassArea.toFixed(2)}m² × ${CARBON.grass}`,     val: grassArea * CARBON.grass  },
    { label:`其他 × ${CARBON.other}`,
      val: (ditchExtra + brickArea + pondArea + wallArea + vertOtherArea + roofOtherArea) * CARBON.other },
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
              {rows.map(({ label, area, coeff }) => (
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

      {/* ── 固碳當量明細 ── */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="font-bold text-slate-700 mb-3 text-sm">第6條固碳當量明細（係數待技術規範確認）</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {carbonRows.map(({ label, val }) => (
            <div key={label} className="flex justify-between bg-slate-50 rounded p-2 border border-slate-200">
              <span className="text-slate-600">{label}</span>
              <span className="font-bold text-slate-800">{val.toFixed(2)} kg/yr</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between items-center bg-white rounded p-2 border-2 border-slate-300">
          <span className="font-bold">實際固碳合計</span>
          <span className={`font-bold text-lg ${actualCarbon >= reqCarbon ? 'text-emerald-700' : 'text-red-600'}`}>{actualCarbon.toFixed(2)} kg/yr</span>
          <span className="text-slate-500 text-xs">需 ≥ {reqCarbon.toFixed(2)} kg/yr</span>
        </div>
      </div>
    </>
  );
}
