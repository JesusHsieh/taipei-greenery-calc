import type { NewTaipeiCalc } from '../hooks/useNewTaipeiCalc';
import { cardCls, hCls } from '../styles';

type Props = Pick<NewTaipeiCalc, 'checks'>;

export function NtCheckResults({ checks }: Props) {
  return (
    <div className={cardCls}>
      <h2 className={hCls}>法規檢核總覽</h2>
      <div className="space-y-3">
        {checks.map(({ art, name, req, act, pass, formula }) => (
          <div key={art} className={`rounded-lg p-4 border ${
            pass === true  ? 'bg-emerald-50 border-emerald-300' :
            pass === false ? 'bg-red-50 border-red-300' :
                             'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500">{art}</span>
                  <span className="font-bold text-slate-800">{name}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{formula}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-slate-400">需求</div>
                  <div className="font-semibold text-slate-700">{req}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">實際</div>
                  <div className={`font-bold text-lg ${pass === true ? 'text-emerald-700' : pass === false ? 'text-red-600' : 'text-slate-500'}`}>{act}</div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                  pass === true  ? 'bg-emerald-500' :
                  pass === false ? 'bg-red-500' :
                                   'bg-slate-300'
                }`}>
                  {pass === true ? '✓' : pass === false ? '✗' : '?'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
