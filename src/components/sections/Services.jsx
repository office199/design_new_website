import { Link } from 'react-router-dom';
import { services } from '../../data/content';
import { ArrowUpRight, Eye, ScanEye, Focus, Activity, Layers, Baby } from 'lucide-react';

const iconMap = { Eye, ScanEye, Focus, Activity, Layers, Baby };

export default function Services({ limit }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0B4DA2] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">Our Expertise</div>
            <h2 className="text-[28px] md:text-[40px] font-bold leading-[0.95] mt-4 tracking-tight">All Your Eye Care<br/>Needs at <span className="text-[#0B4DA2]">One Place</span></h2>
          </div>
          <p className="max-w-[420px] text-sm md:text-[15px] text-slate-600 leading-relaxed">
            From routine eye check-ups to complex retina surgeries, we deliver comprehensive eye care backed by ultra-modern diagnostics and advanced laser systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s)=> {
            const Icon = iconMap[s.icon] || Eye;
            return (
              <Link key={s.id} to={`/services/${s.id}`} className="group relative bg-white rounded-[24px] border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden bg-slate-50 relative">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1.5 flex items-center gap-2 text-xs font-bold shadow">
                    <span className="w-7 h-7 rounded-full bg-[#0B4DA2] text-white flex items-center justify-center"><Icon size={14}/></span>
                    Premium Care
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-[18px] font-bold leading-tight group-hover:text-[#0B4DA2]">{s.title}</h3>
                    <span className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#0B4DA2] group-hover:text-white flex items-center justify-center transition shrink-0"><ArrowUpRight size={16}/></span>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed mt-2.5 line-clamp-2">{s.short}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.features.slice(0,3).map(f=>(
                      <span key={f} className="text-[11px] bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full font-medium">{f}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {limit && (
          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-black transition">View All Services <ArrowUpRight size={16}/></Link>
          </div>
        )}
      </div>
    </section>
  );
}
