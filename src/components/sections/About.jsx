import { Check, Award, Users, Lightbulb, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-1 relative">
            <div className="relative">
              <div className="rounded-[32px] overflow-hidden aspect-[4/3] bg-white shadow-2xl">
                <img
                  src="/images/clinic/about-exam.webp"
                  alt="Advanced retina examination at Ashu Laser Vision in Andheri"
                  className="w-full h-full object-cover"
                  width="800"
                  height="720"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 sm:-bottom-8 right-2 sm:-right-4 md:-right-8 bg-white rounded-[20px] p-4 sm:p-5 shadow-2xl border border-slate-100 w-[230px] sm:w-[260px] max-w-[calc(100%-1.5rem)] z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2]"><Award size={20}/></div>
                  <div className="text-sm font-bold">NABH & ISO Certified<br/><span className="text-xs font-medium text-slate-500">Super Specialty</span></div>
                </div>
                <div className="space-y-2">
                  {["Advanced Diagnostics","US FDA Approved Lasers","Expert Retina Care"].map(t=>(
                    <div key={t} className="flex items-center gap-2 text-xs font-medium"><Check size={14} className="text-emerald-500"/> {t}</div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -left-6 hidden md:flex bg-[#0B4DA2] text-white rounded-2xl px-5 py-4 shadow-xl items-center gap-3">
                <div className="text-3xl font-extrabold">20+</div>
                <div className="text-xs leading-tight font-medium">Years of<br/>Excellence</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="inline-flex bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">About Ashu Laser Vision</div>
            <h2 className="text-[28px] md:text-[40px] font-bold leading-[0.9] tracking-tight">Committed to the Eye Care <span className="text-[#0B4DA2]">Excellence</span> Since 2004</h2>
            <p className="text-[15px] text-slate-600 leading-relaxed">
              Ashu Laser Vision is a premium center for all Eye Diseases, Eye Treatments & Eye Problems and it has been providing all Advanced, innovative & modern eye care since 2004. Our practice has been recognized as one of the leading Ophthalmologist, Eye Surgeon & Retina Specialist practices in Mumbai.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              {[
                { icon: Heart, title: "Patient First", desc: "Compassionate care with accurate diagnosis & effective treatment" },
                { icon: Lightbulb, title: "Integrity & Innovation", desc: "Groundbreaking discoveries transformed outcomes" },
                { icon: Users, title: "Vision & Values", desc: "Enhancing patient care & advancing education" },
                { icon: Award, title: "Model Healthcare", desc: "Integration of new tech & medications revolutionized care" },
              ].map(card=>(
                <div key={card.title} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] mb-3"><card.icon size={18}/></div>
                  <div className="font-semibold text-sm">{card.title}</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{card.desc}</div>
                </div>
              ))}
            </div>

            <Link to="/about" className="inline-flex mt-2 bg-[#0F172A] text-white px-6 py-3.5 rounded-full font-bold text-sm">Learn More About Us →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
