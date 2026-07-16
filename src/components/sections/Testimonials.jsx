import { testimonials } from '../../data/content';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFF]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">Patient Reviews</div>
          <h2 className="text-[28px] md:text-[42px] font-bold leading-[0.95] mt-4 tracking-tight">Real Stories, <span className="text-[#0B4DA2]">Clear Vision</span></h2>
          <p className="text-sm text-slate-600 mt-3">What our patients say about their experience at Ashu Laser Vision. Rated 4.9/5 across Google & Practo.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t,i)=>(
            <div key={i} className="bg-white rounded-[20px] border border-slate-200 p-6 relative hover:shadow-xl transition">
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0B4DA2]"><Quote size={14}/></div>
              <div className="flex gap-1 mb-4">
                {Array.from({length:5}).map((_,j)=><Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-[13px] leading-relaxed text-slate-700">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={`https://i.pravatar.cc/100?img=${20+i}`} alt={t.name} className="w-9 h-9 rounded-full" />
                <div>
                  <div className="font-semibold text-sm leading-none">{t.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{t.location} • {t.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mt-10 bg-white rounded-[20px] border border-slate-200 p-6 lg:p-8 items-center">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="google" className="w-8 h-8" />
              <div>
                <div className="font-bold flex items-center gap-1">Google <Star size={14} className="fill-amber-400 text-amber-400"/> 4.9</div>
                <div className="text-xs text-slate-500">1,247 Reviews</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 text-center">
            <div className="text-sm font-semibold">Trusted by families across Mumbai for 20 years</div>
            <div className="text-xs text-slate-500">Verified patient reviews • No fake testimonials</div>
          </div>
          <div className="lg:col-span-1 text-right">
            <a href="#" className="inline-flex bg-[#0F172A] text-white px-5 py-2.5 rounded-full text-xs font-bold">Read All Reviews on Google</a>
          </div>
        </div>
      </div>
    </section>
  );
}
