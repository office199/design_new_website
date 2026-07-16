import { technologies } from '../../data/content';
import { Stagger, StaggerItem } from '../animations/Reveal';
import { Cpu, Eye, Zap } from 'lucide-react';

export default function Technology() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex bg-blue-50 text-[#0B4DA2] px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">Advanced Technology</div>
            <h2 className="text-[28px] md:text-[40px] font-bold leading-[0.9] tracking-tight">Precision, Technology & Trust Come Together for <span className="text-[#0B4DA2]">Better Vision</span></h2>
            <p className="text-[14px] text-slate-600 leading-relaxed">We invest in world-class diagnostic & surgical platforms to ensure accurate diagnosis, safe surgery & best visual outcomes.</p>
              <Stagger className="grid grid-cols-2 gap-3 pt-2">
                {technologies.map(t=>(
                  <StaggerItem key={t.name}>
                    <div className="border border-slate-200 rounded-xl p-3.5 hover:bg-blue-50/50 transition">
                      <div className="font-semibold text-[13px]">{t.name}</div>
                      <div className="text-[11px] text-slate-500">{t.desc}</div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-[20px] overflow-hidden h-[220px] bg-slate-100">
                  <img
                    src="/images/clinic/laser-surgery.webp"
                    alt="Advanced laser eye surgery equipment at Ashu Laser Vision"
                    className="w-full h-full object-cover"
                    width="1000"
                    height="570"
                    loading="lazy"
                  />
                </div>
                <div className="bg-[#0B4DA2] rounded-[20px] p-6 text-white">
                  <Zap size={28} className="mb-3" />
                  <div className="font-bold text-lg leading-tight">US FDA Approved Lasers</div>
                  <div className="text-xs text-blue-100 mt-2">Alcon, Zeiss, Johnson & Johnson platforms</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-slate-900 rounded-[20px] p-6 text-white">
                  <Eye size={28} className="mb-3" />
                  <div className="font-bold text-lg leading-tight">4K 3D Visualization</div>
                  <div className="text-xs text-slate-400 mt-2">For ultra-precise retina surgery</div>
                </div>
                <div className="rounded-[20px] overflow-hidden h-[220px] bg-slate-100">
                  <img
                    src="/images/clinic/laser-exam.webp"
                    alt="Laser eye treatment at Ashu Laser Vision"
                    className="w-full h-full object-cover"
                    width="1000"
                    height="570"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center border">
              <Cpu className="text-[#0B4DA2]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
