import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services, categories } from '../../data/content';
import { ArrowUpRight, Eye, ScanEye, Focus, Activity, Layers, Baby, Droplet, AlertTriangle, ShieldAlert, Sparkles, Home, Map, Crosshair, Zap, Camera, Scan, HeartPulse, Syringe, Droplets, Ruler, Shield, Gamepad2, Contact, EyeOff } from 'lucide-react';

const gridV = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const cardV = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

const iconMap = {
  Eye, ScanEye, Focus, Activity, Layers, Baby, Droplet, AlertTriangle, ShieldAlert, Sparkles, Home, Map, Crosshair, Zap, Camera, Scan, HeartPulse, Syringe, Droplets, Ruler, Shield, Gamepad2, Contact, EyeOff
};

export default function Services({ limit, showCategoryFilter = false }) {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  let list = services;

  if (limit) {
    list = services.slice(0, limit);
  } else {
    if (activeCat !== 'all') {
      list = services.filter(s => s.category === activeCat || s.category?.includes(activeCat));
    }
    if (search) {
      list = list.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.short.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase()));
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0B4DA2] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">{limit ? 'Our Expertise' : `${services.length}+ Services`} • Since 2004</div>
            <h2 className="text-[28px] md:text-[40px] font-bold leading-[0.95] mt-4 tracking-tight">All Your Eye Care<br/>Needs at <span className="text-[#0B4DA2]">One Place</span></h2>
          </div>
          <div className="max-w-[520px]">
            <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
              From routine eye check-ups to complex retina surgeries - 28+ services including Cataract, LASIK Contoura SMILE, Retina, Glaucoma AGV GATT, Pediatric Squint, Oculoplasty Laser DCR, advanced diagnostics FFA OCT Pachymetry.
            </p>
            {!limit && showCategoryFilter && (
              <div className="mt-5 flex gap-2 flex-wrap">
                <div className="relative w-full mb-3">
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search services, e.g. cataract, retina, glaucoma..." className="w-full border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm bg-slate-50 focus:outline-none focus:border-[#0B4DA2] focus:bg-white" />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Eye size={18}/></span>
                </div>
                {categories.map(c=>(
                  <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold transition border ${activeCat===c.id ? 'bg-[#0B4DA2] text-white border-[#0B4DA2]' : 'bg-white text-slate-600 border-slate-200 hover:border-[#0B4DA2] hover:text-[#0B4DA2]'}`}>{c.name}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={gridV} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -60px 0px' }}>
          {list.map((s)=> {
            const Icon = iconMap[s.icon] || Eye;
            return (
              <motion.div key={s.id} variants={cardV}>
              <Link to={`/services/${s.id}`} className="group relative bg-white rounded-[24px] border border-slate-200 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="aspect-[16/10] overflow-hidden bg-slate-50 relative">
                  <img src={s.image} alt={`${s.title} - Ashu Laser Vision Andheri Mumbai`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 text-xs font-bold shadow-sm">
                    <span className="w-6 h-6 rounded-full bg-[#0B4DA2] text-white flex items-center justify-center"><Icon size={12}/></span>
                    {s.category || 'Premium Care'}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#0A1931] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">{s.features[0]}</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-[17px] font-bold leading-tight group-hover:text-[#0B4DA2] line-clamp-2 transition">{s.title}</h3>
                    <span className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#0B4DA2] group-hover:text-white flex items-center justify-center transition shrink-0"><ArrowUpRight size={16}/></span>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed mt-2.5 line-clamp-2">{s.short}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {s.features.slice(0,3).map(f=>(
                      <span key={f} className="text-[11px] bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full font-medium text-slate-700">{f}</span>
                    ))}
                    {s.features.length>3 && <span className="text-[11px] bg-blue-50 text-[#0B4DA2] px-2.5 py-1 rounded-full font-bold">+{s.features.length-3} More</span>}
                  </div>
                </div>
              </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {list.length===0 && (
          <div className="text-center py-12 text-slate-500">No services found for "{search}" in {activeCat}</div>
        )}

        {limit && (
          <div className="text-center mt-12 flex flex-col items-center gap-3">
            <Link to="/services" className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-black transition shadow-lg">View All {services.length} Services <ArrowUpRight size={16}/></Link>
            <span className="text-xs text-slate-500">Trusted for Cataract, LASIK, Retina, Glaucoma, Pediatric, Oculoplasty in Andheri Mumbai since 2004</span>
          </div>
        )}
      </div>
    </section>
  );
}
