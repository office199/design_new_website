import { doctor } from '../../data/content';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Stethoscope, Calendar } from 'lucide-react';

export default function Doctor() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-[#0F172A] rounded-[28px] lg:rounded-[40px] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B4DA2]/40 to-transparent pointer-events-none" />
          <div className="grid lg:grid-cols-12 relative">
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex bg-white/10 border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full w-fit">Founder & Medical Director</div>
              <h2 className="text-[30px] md:text-[40px] font-bold text-white leading-[0.95] mt-5 font-display">{doctor.name}</h2>
              <div className="text-blue-200 text-xs mt-3 leading-relaxed font-medium">{doctor.degrees}</div>
              
              <p className="text-slate-300 text-[14px] leading-relaxed mt-6">
                {doctor.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0"><GraduationCap size={16} className="text-white"/></div>
                  <div className="text-xs text-white leading-tight"><span className="font-semibold">Gold Medalist</span><br/><span className="text-slate-400">Ophthalmology & Retina</span></div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Award size={16} className="text-white"/></div>
                  <div className="text-xs text-white leading-tight"><span className="font-semibold">17+ Years Exp</span><br/><span className="text-slate-400">Overall Experience</span></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/doctor" className="bg-white text-[#0F172A] px-6 py-3 rounded-full font-bold text-sm">View Full Profile</Link>
                <Link to="/contact" className="bg-[#0B4DA2] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2"><Calendar size={16}/> Book Consultation</Link>
              </div>
            </div>

            <div className="lg:col-span-4 relative lg:h-auto h-[380px]">
              <div className="absolute inset-0 lg:inset-6 bg-gradient-to-t from-[#0F172A] to-transparent z-10 lg:hidden" />
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80" alt={doctor.name} className="w-full h-full object-cover lg:rounded-[24px]" />
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-2xl p-4 shadow-xl lg:hidden">
                <div className="text-xs font-bold">Available Today</div>
                <div className="text-[11px] text-slate-500">10:00 AM - 8:00 PM at Andheri Clinic</div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white/5 backdrop-blur border-t lg:border-t-0 lg:border-l border-white/10 p-8 lg:p-8">
              <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2"><Stethoscope size={16}/> Hospital Associations</h4>
              <ul className="space-y-3">
                {doctor.associations.map(a=>(
                  <li key={a} className="text-xs text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-2">{a}</li>
                ))}
              </ul>
              <div className="mt-8 bg-[#0B4DA2] rounded-2xl p-5">
                <div className="text-white font-bold text-sm">Need Emergency Eye Care?</div>
                <div className="text-blue-100 text-xs mt-1">24x7 emergency support available for trauma & sudden vision loss.</div>
                <a href="tel:+919322364002" className="mt-3 inline-block bg-white text-[#0B4DA2] text-xs font-bold px-4 py-2 rounded-full">Call +91 93223 64002</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
