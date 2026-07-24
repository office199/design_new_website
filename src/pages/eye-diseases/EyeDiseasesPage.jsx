import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, ArrowRight, BookOpen, Activity, Grid3X3, Filter, Stethoscope, Sparkles } from 'lucide-react';
import SEO from '../../components/SEO';
import PageTransition from '../../components/animations/PageTransition';
import { eyeDiseases, eyeDiseaseGroups, eyeDiseasesCount } from '../../data/eyeDiseasesMeta';
import { motion } from 'framer-motion';

const groupIcons = {
  basics: Eye,
  common: Activity,
  symptoms: Search,
  retina: Eye,
  'cornea-lens': Eye,
  infections: Activity,
  pediatric: Stethoscope,
  'eyelid-oculoplasty': Eye,
  systemic: Activity,
  diagnostics: Search,
  treatments: Sparkles
};

export default function EyeDiseasesPage() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');

  const filtered = useMemo(() => {
    let list = eyeDiseases;
    if (activeGroup !== 'all') {
      const group = eyeDiseaseGroups.find(g => g.id === activeGroup);
      if (group) {
        list = list.filter(d => group.slugs.includes(d.slug));
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.slug.toLowerCase().includes(q) ||
        d.shortDesc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeGroup]);

  const breadcrumbs = [
    { name: 'Home', url: 'https://ashulaservision.com/' },
    { name: 'Eye Diseases & Conditions', url: 'https://ashulaservision.com/eye-diseases' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Eye Diseases & Conditions - 151 Conditions | Ashu Laser Vision Mumbai",
    "description": `Comprehensive guide to ${eyeDiseasesCount} eye diseases and conditions: causes, symptoms, diagnosis, treatment, prevention. Expert care by Dr. Shahnawaz Kazi at Ashu Laser Vision, Andheri Mumbai.`,
    "url": "https://ashulaservision.com/eye-diseases",
    "isPartOf": { "@type": "WebSite", "name": "Ashu Laser Vision", "url": "https://ashulaservision.com" },
    "about": eyeDiseases.slice(0,10).map(d => ({ "@type": "MedicalCondition", "name": d.title }))
  };

  return (
    <PageTransition>
      <SEO
        title={`Eye Diseases & Conditions - ${eyeDiseasesCount} Expert Guides | Ashu Laser Vision Mumbai`}
        description={`Explore ${eyeDiseasesCount} eye diseases & conditions: cataracts, glaucoma, diabetic retinopathy, AMD, dry eyes, conjunctivitis, keratoconus & more. Symptoms, causes, diagnosis, treatment by Dr. Shahnawaz Kazi - Best Eye Hospital Andheri Mumbai since 2004.`}
        keywords={`eye diseases, eye conditions, cataracts, glaucoma, diabetic retinopathy, AMD, dry eyes, keratoconus, conjunctivitis, best eye hospital Mumbai, Ashu Laser Vision, Dr Shahnawaz Kazi`}
        url="https://ashulaservision.com/eye-diseases"
        breadcrumbs={breadcrumbs}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0B4DA2] via-[#0B4DA2] to-[#083A7A] pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                <BookOpen size={14} /> 151 MEDICAL GUIDES • EXPERT REVIEWED
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white font-display leading-[0.9] tracking-tight">
                Eye Diseases<br />
                <span className="text-blue-200">& Conditions</span>
              </h1>
              <p className="text-blue-100 mt-6 text-[15px] lg:text-lg leading-relaxed max-w-2xl">
                Comprehensive, patient-friendly guides to 151 eye conditions — from common refractive errors and cataracts to rare retinal diseases. Causes, symptoms, diagnosis, treatment, prevention and FAQs, curated by <span className="text-white font-semibold">Dr. Shahnawaz Kazi (FMRF, FRCS Glasgow Gold Medalist)</span> at Ashu Laser Vision, Andheri West Mumbai since 2004.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="bg-white text-[#0B4DA2] px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Grid3X3 size={16} /> {eyeDiseasesCount} Conditions Covered
                </div>
                <div className="bg-white/15 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur">
                  28+ Treatments • 50K+ Surgeries • 4.9★
                </div>
              </div>
            </div>
            <div className="lg:w-[360px] shrink-0">
              <div className="bg-white rounded-[24px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100">
                <h3 className="font-bold text-slate-900 font-display text-lg">Quick Search</h3>
                <p className="text-xs text-slate-500 mt-1">Find by name, symptom or treatment</p>
                <div className="relative mt-4">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    value={search}
                    onChange={e=>setSearch(e.target.value)}
                    placeholder="Search e.g. glaucoma, cataract, dry eyes..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-3.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0B4DA2]/20 focus:border-[#0B4DA2] transition"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['cataract','glaucoma','retina','dry eyes','LASIK'].map(k=>(
                    <button key={k} onClick={()=>setSearch(k)} className="text-[11px] bg-slate-100 hover:bg-[#E6F0FF] hover:text-[#0B4DA2] px-3 py-1.5 rounded-full font-medium transition">{k}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Groups filter */}
      <section className="sticky top-[72px] lg:top-[84px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest shrink-0">
              <Filter size={14} /> Filter:
            </div>
            <button
              onClick={()=>setActiveGroup('all')}
              className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border transition ${activeGroup==='all' ? 'bg-[#0B4DA2] text-white border-[#0B4DA2]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              All ({eyeDiseasesCount})
            </button>
            {eyeDiseaseGroups.map(g=>{
              const Icon = groupIcons[g.id] || Eye;
              const count = g.slugs.length;
              return (
                <button
                  key={g.id}
                  onClick={()=>setActiveGroup(g.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium border transition ${activeGroup===g.id ? 'bg-[#0B4DA2] text-white border-[#0B4DA2]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon size={14} /> {g.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="py-10 lg:py-16 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold font-display text-slate-900">
              {activeGroup==='all' ? 'All Conditions' : eyeDiseaseGroups.find(g=>g.id===activeGroup)?.label} 
              <span className="text-slate-400 font-normal ml-3 text-lg">({filtered.length})</span>
            </h2>
            <div className="text-xs text-slate-500 hidden md:block">
              Showing {filtered.length} of {eyeDiseasesCount} • Sorted A-Z by expert priority
            </div>
          </div>

          {filtered.length===0 ? (
            <div className="bg-white rounded-[24px] border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-900">No results for "{search}"</h3>
              <p className="text-sm text-slate-500 mt-2">Try different keywords like cataract, retina, glaucoma</p>
              <button onClick={()=>setSearch('')} className="mt-4 bg-[#0B4DA2] text-white px-5 py-2.5 rounded-full text-sm font-semibold">Clear Search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filtered.map((d, i)=>(
                <motion.div
                  key={d.slug}
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: i*0.02 }}
                  className="group bg-white rounded-[20px] lg:rounded-[24px] border border-slate-100 p-5 lg:p-6 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-[#0B4DA2]/20 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#E6F0FF] text-[#0B4DA2] flex items-center justify-center font-bold text-xs">
                      {String(d.index).padStart(3,'0')}
                    </div>
                    <div className="flex gap-1">
                      {d.images && d.images.length > 0 && (
                        <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-full font-medium">{d.images.length} img</span>
                      )}
                      <span className="bg-blue-50 text-[#0B4DA2] text-[10px] px-2 py-1 rounded-full font-medium">Guide</span>
                    </div>
                  </div>

                  <Link to={`/eye-diseases/${d.slug}`} className="block group-hover:text-[#0B4DA2] transition">
                    <h3 className="font-bold text-[17px] leading-tight font-display text-slate-900 group-hover:text-[#0B4DA2] line-clamp-2">{d.title}</h3>
                  </Link>
                  <p className="text-[13px] text-slate-500 leading-relaxed mt-2.5 line-clamp-3 flex-1">{d.shortDesc}</p>

                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="text-[11px] text-slate-400">
                      {d.pages && d.pages[0] && d.pages[1] ? `Pages ${d.pages[0]}–${d.pages[1]} • ` : ''}Ashu Laser Vision
                    </div>
                    <Link to={`/eye-diseases/${d.slug}`} className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold group-hover:bg-[#0B4DA2] transition">
                      Read Guide <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Group overview */}
          {activeGroup==='all' && !search && (
            <div className="mt-16">
              <h3 className="text-xl font-bold font-display mb-6">Browse by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eyeDiseaseGroups.map(g=>{
                  const Icon = groupIcons[g.id] || Eye;
                  return (
                    <button key={g.id} onClick={()=>{ setActiveGroup(g.id); window.scrollTo({ top: 600, behavior:'smooth' })}} className="text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-[#0B4DA2]/20 hover:shadow-lg transition group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#E6F0FF] text-[#0B4DA2] flex items-center justify-center group-hover:bg-[#0B4DA2] group-hover:text-white transition">
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 text-[15px]">{g.label}</div>
                          <div className="text-xs text-slate-500 mt-1 leading-relaxed">{g.description} • {g.slugs.length} guides</div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {g.slugs.slice(0,4).map(s=>{
                              const dd = eyeDiseases.find(x=>x.slug===s);
                              return <span key={s} className="text-[10px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-full">{dd?.title || s}</span>
                            })}
                            {g.slugs.length>4 && <span className="text-[10px] text-slate-400">+{g.slugs.length-4} more</span>}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B4DA2] to-[#083A7A] rounded-[32px] p-8 lg:p-12 flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            <div className="relative">
              <h3 className="text-2xl lg:text-3xl font-bold font-display leading-tight">Need expert consultation?</h3>
              <p className="text-blue-100 mt-3 max-w-2xl text-sm lg:text-[15px]">Dr. Shahnawaz Kazi - FMRF Sankara Nethralaya, FRCS Glasgow Gold Medalist, with 20+ years, 50K+ surgeries. Comprehensive eye exam with Pentacam, OCT, FFA, Pachymetry, Perimetry at Andheri West & Versova. Same-day appointments.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-white/15 border border-white/20 text-xs px-3 py-1.5 rounded-full">Emergencies 24x7</span>
                <span className="bg-white/15 border border-white/20 text-xs px-3 py-1.5 rounded-full">Near DN Nagar Metro</span>
                <span className="bg-white/15 border border-white/20 text-xs px-3 py-1.5 rounded-full">Pearl Plaza Opp Andheri Station</span>
              </div>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
              <Link to="/contact" className="bg-white text-[#0B4DA2] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-blue-50 transition flex items-center justify-center gap-2">
                Book Appointment <ArrowRight size={16} />
              </Link>
              <a href="tel:+919322364002" className="bg-white/15 border border-white/20 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 transition flex items-center justify-center gap-2">
                Call 93223 64002
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
