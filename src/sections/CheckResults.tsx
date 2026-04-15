import { CheckCircle, XCircle, Info } from 'lucide-react';
import type { GreeneryCalc } from '../hooks/useGreeneryCalc';
import { cardCls } from '../styles';

type Props = Pick<GreeneryCalc, 'checks'>;

export function CheckResults({ checks }: Props) {
  return (
    <div className={cardCls}>
      <h2 className="text-2xl font-bold text-slate-800 mb-5">法規檢核結果總覽</h2>
      <div className="space-y-3">
        {checks.map((c, i) => (
          <div key={i} className={`p-4 rounded-lg border-l-4 ${
            c.pass === null ? 'bg-slate-50 border-slate-300'
            : c.pass ? 'bg-emerald-50 border-emerald-500'
            : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {c.pass === null
                  ? <Info className="w-5 h-5 text-slate-400 shrink-0" />
                  : c.pass
                    ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    : <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                <div>
                  <div className="font-bold text-slate-800">{c.name}</div>
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">{c.art}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ml-3 ${
                c.pass === null ? 'bg-slate-200 text-slate-700'
                : c.pass ? 'bg-emerald-200 text-emerald-800'
                : 'bg-red-200 text-red-800'
              }`}>
                {c.pass === null ? '待確認' : c.pass ? '✓ 通過' : '✗ 不通過'}
              </span>
            </div>
            <div className="mt-2 ml-7 grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-slate-500">應達：</span><span className="font-semibold text-blue-700">{c.req}</span></div>
              <div><span className="text-slate-500">實際：</span>
                <span className={`font-semibold ${c.pass === null ? 'text-slate-700' : c.pass ? 'text-emerald-700' : 'text-red-700'}`}>{c.act}</span>
              </div>
            </div>
            <div className="mt-1 ml-7 text-xs text-slate-500 bg-white rounded px-2 py-1 border border-slate-100 inline-block">
              📐 {c.formula}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
