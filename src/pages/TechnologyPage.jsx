import SEO from '../components/SEO';
import Technology from '../components/sections/Technology';
import { technologies } from '../data/content';
import { CheckCircle2, Cpu } from 'lucide-react';

export default function TechnologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Advanced Eye Technology at Ashu Laser Vision Andheri Mumbai",
    "itemListElement": technologies.map((t,i)=>({
      "@type": "ListItem",
      "position": i+1,
      "name": t.name,
      "description": t.desc
    }))
  };

  return (
    <>
      <SEO
        title="Advanced Eye Technology in Mumbai - Pentacam OCT Femto Micron M7 - Ashu Laser Vision"
        description="World-class eye technology at Ashu Laser Vision Andheri Mumbai - Pentacam HR tomography, OCT Angio RNFL, Micron M7 800Hz fastest excimer LASIK, Femto laser, Green/Diode/YAG/SLT laser, Humphrey perimetry, IOL Master 700 Biometry, FFA, 23/25/27G vitrectomy BIOM. US FDA approved since 2004."
        keywords="pentacam mumbai, OCT test mumbai, femto laser mumbai, micron M7 excimer laser, iol master 700, FFA test, vitrectomy system, eye technology mumbai, best eye hospital technology"
        url="https://ashulaservision.com/technology"
        jsonLd={jsonLd}
      />
      <div className="bg-[#F8FAFF] py-10 border-b">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="inline-flex bg-blue-50 text-[#0B4DA2] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">US FDA Approved • Since 2004</div>
          <h1 className="text-[32px] md:text-[48px] font-bold leading-[0.9] tracking-tight mt-4">Precision Technology for <span className="text-[#0B4DA2]">Better Vision</span> & Safer Surgery</h1>
          <p className="text-sm text-slate-600 mt-3 max-w-3xl leading-relaxed">We invest in advanced US FDA approved platforms for accurate diagnostics & safe surgeries - Pentacam HR, OCT Angio, Micron M7 800Hz fastest LASIK laser in Mumbai, Femto, Green Diode, YAG SLT, Humphrey Visual Field, IOL Master 700, FFA, 25G vitrectomy with BIOM wide-angle. 50K+ surgeries backed by tech + trust.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.slice(0,5).map(t=><span key={t.name} className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium">{t.name}</span>)}
          </div>
        </div>
      </div>
      <Technology />

      {/* Detailed Table */}
      <div className="bg-white py-12 border-t">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Cpu className="text-[#0B4DA2]"/> Technology Comparison - Why Ashu Laser Vision Leads</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map(t=>(
              <div key={t.name} className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><CheckCircle2 size={18}/></div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{t.desc}</div>
                    <div className="text-[11px] text-[#0B4DA2] bg-blue-50 inline-block px-2 py-0.5 rounded-full mt-2 font-bold">{t.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#0A1931] rounded-[24px] p-8 lg:p-10 text-white grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold">Micron M7 - Fastest LASIK Laser Machine in Mumbai 800Hz</h3>
              <p className="text-sm text-blue-100 mt-3 leading-relaxed">Precise Safe Compact & Patient Comfort. Factors: Presbyopia PTK with Topography Guided, Fractional Ablation Flying Spot Scanning. Correction range: Myopia -0.25 to -12.0 D, Hyperopia +0.25 to +6.0 D, Astigmatism -6 to +6 D. Robotic application, safe fractional ablation with dynamic matrix pulse ~0.02mm for smooth precise ablation, thermal impact minimized, less haze risk.</p>
              <ul className="mt-4 space-y-2 text-sm text-blue-100">
                <li>• Designed for precision & predictability</li>
                <li>• Safe fractional ablation, less thermal impact</li>
                <li>• FDA approved excimer + femto combo</li>
              </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80" alt="Micron M7 Laser" className="rounded-2xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}
