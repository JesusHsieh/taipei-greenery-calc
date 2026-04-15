import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { n } from '../utils';
import { cardCls, hCls, inputCls, labelCls } from '../styles';

type Props = Pick<GreeneryCalc, 'pavTotal' | 'setPavTotal' | 'pavPerm' | 'setPavPerm' | 'permeableRate'>;

export function Article12({ pavTotal, setPavTotal, pavPerm, setPavPerm, permeableRate }: Props) {
  return (
    <div className={cardCls}>
      <h2 className={hCls}>第12條：透水鋪面</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>鋪面總面積 (m²)　<span className="font-normal text-slate-400">車道、人行步道或廣場</span></label>
          <input type="number" value={pavTotal} onChange={e => setPavTotal(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
        </div>
        <div>
          <label className={labelCls}>透水鋪面面積 (m²)</label>
          <input type="number" value={pavPerm} onChange={e => setPavPerm(e.target.value)}
            className={inputCls} placeholder="0" min="0" />
        </div>
      </div>
      {n(pavTotal) > 0 && (
        <div className={`mt-4 p-3 rounded-lg flex justify-between items-center ${permeableRate >= 50 ? 'bg-emerald-50 border border-emerald-300' : 'bg-red-50 border border-red-300'}`}>
          <span className="text-sm text-slate-600">{n(pavPerm).toFixed(2)} m² ÷ {n(pavTotal).toFixed(2)} m²</span>
          <div className="text-right">
            <span className={`text-xl font-bold ${permeableRate >= 50 ? 'text-emerald-700' : 'text-red-700'}`}>{permeableRate.toFixed(2)}%</span>
            <span className="text-slate-500 ml-1 text-xs">（需 ≥ 50%）</span>
          </div>
        </div>
      )}
    </div>
  );
}
