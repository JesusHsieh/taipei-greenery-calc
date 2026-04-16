import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useGreeneryCalc } from './hooks/useGreeneryCalc';
import { SiteBasics }      from './sections/SiteBasics';
import { Article7 }        from './sections/Article7';
import { Article8 }        from './sections/Article8';
import { Article9 }        from './sections/Article9';
import { Article12 }       from './sections/Article12';
import { Article5Summary } from './sections/Article5Summary';
import { CheckResults }    from './sections/CheckResults';

type City = 'taipei' | 'newtaipei';

const CITIES: { id: City; label: string; sub: string }[] = [
  { id: 'taipei',    label: '台北市', sub: '新建築物綠化實施規則' },
  { id: 'newtaipei', label: '新北市', sub: '建築基地綠化自治條例' },
];

export default function App() {
  const [city, setCity] = useState<City>('taipei');
  const c = useGreeneryCalc();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">

      {/* ══ 頂部導覽列 ══ */}
      <nav className="bg-slate-900/80 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center gap-1 px-4 h-14">
          <Calculator className="w-5 h-5 text-emerald-400 shrink-0 mr-3" />
          {CITIES.map(({ id, label, sub }) => (
            <button
              key={id}
              onClick={() => setCity(id)}
              className={`relative px-5 h-14 flex flex-col justify-center transition-colors ${
                city === id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <span className="text-sm font-bold leading-tight">{label}</span>
              <span className="text-[10px] font-normal leading-tight">{sub}</span>
              {city === id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-t" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ══ 台北市頁面 ══ */}
      {city === 'taipei' && (
        <div className="p-4 md:p-6">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-9 h-9 text-emerald-600 shrink-0" />
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                  台北市新建築物綠化實施規則檢核系統
                </h1>
              </div>
              <p className="text-slate-500 text-sm mb-6">民國115年1月1日施行｜依完整條文逐項檢核</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { count: c.passCount,    label: '✓ 通過',  bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', sub: 'text-emerald-800' },
                  { count: c.failCount,    label: '✗ 不通過', bg: 'bg-red-50 border-red-200',         text: 'text-red-700',     sub: 'text-red-800'     },
                  { count: c.pendingCount, label: '待確認',   bg: 'bg-amber-50 border-amber-200',      text: 'text-amber-700',   sub: 'text-amber-800'   },
                ].map(({ count, label, bg, text, sub }) => (
                  <div key={label} className={`${bg} border-2 rounded-xl p-5 text-center`}>
                    <div className={`text-4xl font-bold ${text}`}>{count}</div>
                    <div className={`text-sm font-semibold ${sub} mt-1`}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <SiteBasics
              buildingClass={c.buildingClass} setBuildingClass={c.setBuildingClass}
              baseArea={c.baseArea} setBaseArea={c.setBaseArea}
              bcr={c.bcr} setBcr={c.setBcr}
              nonGreenable={c.nonGreenable} setNonGreenable={c.setNonGreenable}
              alphaInput={c.alphaInput} setAlphaInput={c.setAlphaInput}
              std={c.std} legalSpace={c.legalSpace} calcFootprint={c.calcFootprint}
              A_prime={c.A_prime} totalGreen={c.totalGreen}
            />

            <Article7
              hs150L={c.hs150L} setHs150L={c.setHs150L} hs150M={c.hs150M} setHs150M={c.setHs150M}
              hs150S={c.hs150S} setHs150S={c.setHs150S} hs150P={c.hs150P} setHs150P={c.setHs150P}
              hs120L={c.hs120L} setHs120L={c.setHs120L} hs120M={c.hs120M} setHs120M={c.setHs120M}
              hs120S={c.hs120S} setHs120S={c.setHs120S} hs120P={c.hs120P} setHs120P={c.setHs120P}
              hs100L={c.hs100L} setHs100L={c.setHs100L} hs100M={c.hs100M} setHs100M={c.setHs100M}
              hs100S={c.hs100S} setHs100S={c.setHs100S} hs100P={c.hs100P} setHs100P={c.setHs100P}
              ls150L={c.ls150L} setLs150L={c.setLs150L} ls150M={c.ls150M} setLs150M={c.setLs150M}
              ls150S={c.ls150S} setLs150S={c.setLs150S} ls150P={c.ls150P} setLs150P={c.setLs150P}
              ls120L={c.ls120L} setLs120L={c.setLs120L} ls120M={c.ls120M} setLs120M={c.setLs120M}
              ls120S={c.ls120S} setLs120S={c.setLs120S} ls120P={c.ls120P} setLs120P={c.setLs120P}
              ls100L={c.ls100L} setLs100L={c.setLs100L} ls100M={c.ls100M} setLs100M={c.setLs100M}
              ls100S={c.ls100S} setLs100S={c.setLs100S} ls100P={c.ls100P} setLs100P={c.setLs100P}
              groundShrub={c.groundShrub} setGroundShrub={c.setGroundShrub}
              groundGrass={c.groundGrass} setGroundGrass={c.setGroundGrass}
              groundDitch={c.groundDitch} setGroundDitch={c.setGroundDitch}
              groundBrick={c.groundBrick} setGroundBrick={c.setGroundBrick}
              groundPond={c.groundPond}   setGroundPond={c.setGroundPond}
              groundWallW={c.groundWallW} setGroundWallW={c.setGroundWallW}
              groundWallF={c.groundWallF} setGroundWallF={c.setGroundWallF}
              ecoLayerArea={c.ecoLayerArea} setEcoLayerArea={c.setEcoLayerArea}
              roadsideSpace={c.roadsideSpace} setRoadsideSpace={c.setRoadsideSpace}
              rsL={c.rsL} setRsL={c.setRsL} rsM={c.rsM} setRsM={c.setRsM} rsS={c.rsS} setRsS={c.setRsS}
              hsArea={c.hsArea} lsArea={c.lsArea}
              groundShrubArea={c.groundShrubArea} groundOther={c.groundOther}
              grassArea={c.grassArea} ditchExtra={c.ditchExtra}
              brickArea={c.brickArea} pondArea={c.pondArea} wallArea={c.wallArea}
              roadsideTrees={c.roadsideTrees} roadsideCover={c.roadsideCover}
            />

            <Article8
              vertHsL={c.vertHsL} setVertHsL={c.setVertHsL} vertHsM={c.vertHsM} setVertHsM={c.setVertHsM}
              vertHsS={c.vertHsS} setVertHsS={c.setVertHsS} vertHsP={c.vertHsP} setVertHsP={c.setVertHsP}
              vertLsL={c.vertLsL} setVertLsL={c.setVertLsL} vertLsM={c.vertLsM} setVertLsM={c.setVertLsM}
              vertLsS={c.vertLsS} setVertLsS={c.setVertLsS} vertLsP={c.vertLsP} setVertLsP={c.setVertLsP}
              vertShrub={c.vertShrub} setVertShrub={c.setVertShrub}
              vertOther={c.vertOther} setVertOther={c.setVertOther}
              vertHsArea={c.vertHsArea} vertLsArea={c.vertLsArea}
              vertShrubArea={c.vertShrubArea} vertOtherArea={c.vertOtherArea}
            />

            <Article9
              roofTotal={c.roofTotal}       setRoofTotal={c.setRoofTotal}
              roofNonGreen={c.roofNonGreen} setRoofNonGreen={c.setRoofNonGreen}
              roofHsArea={c.roofHsArea}     setRoofHsArea={c.setRoofHsArea}
              roofLsArea={c.roofLsArea}     setRoofLsArea={c.setRoofLsArea}
              roofPalmArea={c.roofPalmArea} setRoofPalmArea={c.setRoofPalmArea}
              roofShrub={c.roofShrub}       setRoofShrub={c.setRoofShrub}
              roofOther={c.roofOther}       setRoofOther={c.setRoofOther}
              roofHs={c.roofHs} roofLs={c.roofLs} roofPalm={c.roofPalm}
              roofShrubArea={c.roofShrubArea} roofGreen={c.roofGreen}
              greenableRoof={c.greenableRoof} roofRate={c.roofRate} roofShrubPct={c.roofShrubPct}
            />

            <Article12
              pavTotal={c.pavTotal} setPavTotal={c.setPavTotal}
              pavPerm={c.pavPerm}   setPavPerm={c.setPavPerm}
              permeableRate={c.permeableRate}
            />

            <Article5Summary
              allHs={c.allHs} allLs={c.allLs} allShrub={c.allShrub} allOther={c.allOther}
              totalGreen={c.totalGreen} effectiveGreen={c.effectiveGreen}
              coverRate={c.coverRate} volumeRate={c.volumeRate} std={c.std}
              actualCarbon={c.actualCarbon} reqCarbon={c.reqCarbon}
              alpha={c.alpha} A_prime={c.A_prime}
              ecoLayerVal={c.ecoLayerVal}
              carbonLargeArea={c.carbonLargeArea}
              carbonSmallArea={c.carbonSmallArea}
              carbonPalmArea={c.carbonPalmArea}
            />

            <CheckResults checks={c.checks} />

          </div>
        </div>
      )}

      {/* ══ 新北市頁面 ══ */}
      {city === 'newtaipei' && (
        <div className="p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-16 text-center">
              <div className="text-6xl mb-6">🏗️</div>
              <h2 className="text-2xl font-bold text-slate-700 mb-3">新北市建築基地綠化自治條例</h2>
              <p className="text-slate-400">法規內容建置中，敬請期待</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
