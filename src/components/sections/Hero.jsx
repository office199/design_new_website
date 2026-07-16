import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Star, CheckCircle2 } from 'lucide-react';

const patientInitials = ['AM', 'DV', 'NT'];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFF]">
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 py-10 lg:py-20 items-center">

          {/* left */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 bg-white border border-blue-100 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              <span className="bg-[#0B4DA2] text-white px-2.5 py-0.5 rounded-full text-[10px]">NEW</span>
              <span className="text-slate-700">Advanced Femto Cataract & Contoura LASIK Now Available</span>
              <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center"><ArrowRight size={12} /></span>
            </motion.div>

            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-[32px] md:text-[44px] lg:text-[56px] font-extrabold leading-[0.95] tracking-tight text-[#0F172A]">
              A Super Multi Specialty <span className="text-[#0B4DA2]">Eye & Retina</span> Clinic / Hospital
            </motion.h1>

            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-[15px] md:text-[17px] leading-relaxed text-slate-600 max-w-[600px]">
              Trusted center for advanced eye and retina care offering world-class treatments with modern technology and compassionate expertise. Comprehensive services including <span className="font-semibold text-slate-800">Advanced Cataract, Retina, Diabetic Retinopathy, Glaucoma & LASIK.</span>
            </motion.p>

            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="flex flex-wrap items-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0B4DA2] text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#083A7A] transition shadow-lg shadow-blue-900/25">
                Book an Appointment <ArrowRight size={16} />
              </Link>
              <a href="https://www.youtube.com" target="_blank" className="inline-flex items-center gap-2.5 bg-white border border-slate-200 px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-50 transition">
                <span className="w-8 h-8 rounded-full bg-[#0B4DA2]/10 flex items-center justify-center"><Play size={14} className="fill-[#0B4DA2] text-[#0B4DA2] ml-0.5" /></span> Watch Our Story
              </a>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2" aria-label="Verified patient reviews">
                  {patientInitials.map((initials, i) => (
                    <span key={initials} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-extrabold text-white ${i === 0 ? 'bg-[#0B4DA2]' : i === 1 ? 'bg-[#00A6CB]' : 'bg-[#00A67E]'}`} aria-hidden="true">
                      {initials}
                    </span>
                  ))}
                </div>
                <div className="text-xs leading-tight">
                  <div className="flex items-center gap-1 font-bold"><Star size={12} className="fill-amber-400 text-amber-400"/> 4.9/5 Rated</div>
                  <div className="text-slate-500">1L+ happy patients</div>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="font-medium">NABH Certified • Trusted Since 2004 • Andheri Mumbai</span>
              </div>
            </motion.div>

            {/* check list inspired by Dr Agarwal */}
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.5}} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {["Bladeless Cataract Surgery", "US FDA Approved LASIK", "Advanced Retina Care"].map(t=>(
                <div key={t} className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-100 shadow-sm text-xs font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* right visual */}
          <div className="lg:col-span-5 relative lg:h-[640px]">
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.2}} className="relative h-[420px] md:h-[520px] lg:h-full">
              {/* main image card */}
              <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-2xl">
                <img
                  src="/images/clinic/hero-consultation.webp"
                  alt="Dr. Shahnawaz Kazi examining a patient at Ashu Laser Vision"
                  className="w-full h-full object-cover object-center"
                  width="700"
                  height="900"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B4DA2]/60 via-transparent to-transparent" />
              </div>

              {/* floating stats - like ASG & Dr Agarwal */}
              <motion.div animate={{y:[0,-8,0]}} transition={{repeat:Infinity,duration:4}} className="absolute top-6 left-4 md:-left-8 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 w-[190px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">✓</div>
                  <div>
                    <div className="font-bold text-sm">98% Success</div>
                    <div className="text-[11px] text-slate-500">Cataract Surgery Rate</div>
                  </div>
                </div>
              </motion.div>

              <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:5}} className="absolute bottom-24 right-4 md:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 w-[220px]">
                <div className="text-xs text-slate-500 mb-1">Next Available Slot</div>
                <div className="font-bold text-sm">Today, 4:30 PM</div>
                <div className="mt-2 flex gap-2">
                  <span className="text-[10px] bg-blue-50 text-[#0B4DA2] px-2 py-1 rounded-full font-semibold">Dr. Kazi Available</span>
                </div>
              </motion.div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-white flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0">
                  <img src="/images/ashu-logo-mark.png" alt="Ashu Laser Vision" className="w-full h-full object-contain" width="146" height="211" />
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-sm">Dr. Shahnawaz Kazi</div>
                  <div className="text-[11px] text-slate-600">Retina, Cataract & LASIK Surgeon<br/>17+ Years Experience</div>
                </div>
                <div className="ml-auto bg-[#0B4DA2] text-white text-[10px] px-2.5 py-1 rounded-full font-bold">GOLD MEDALIST</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
