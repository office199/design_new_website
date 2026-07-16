import SEO from '../components/SEO';
import { Check, Award, Heart, Users, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us - Ashu Laser Vision | Leading Eye Hospital Mumbai Since 2004" description="Learn about Ashu Laser Vision - Premium eye hospital in Andheri Mumbai. 20+ years, 50K+ surgeries, advanced technology." url="https://ashulaservision.com/about" />
      <div className="bg-[#F8FAFF] py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">Who We Are</div>
            <h1 className="text-[36px] md:text-[56px] font-bold leading-[0.9] mt-6 tracking-tight">Committed to the Eye Care Excellence <span className="text-[#0B4DA2]">Since 2004</span></h1>
            <p className="text-[15px] text-slate-600 leading-relaxed mt-6 max-w-3xl">Ashu Laser Vision is a premium center for all Eye Diseases, Eye Treatments & Eye Problems and has been providing all Advanced, innovative & modern eye care since 2004. Recognized as one of the leading Ophthalmologist, Eye Surgeon & Retina Specialist practices in Mumbai.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Our Vision & Values", desc: "Dedicated to enhancing patient care, exploring medical challenges, and advancing education of healthcare.", icon: Heart },
              { title: "Integrity & Innovations", desc: "Groundbreaking discoveries transformed patient outcomes and become standard practices.", icon: Lightbulb },
              { title: "Advancing Patient Care", desc: "At Ashu Laser Vision, we leverage medical innovations to significantly improve patient care.", icon: Users },
            ].map(c=>(
              <div key={c.title} className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] mb-4"><c.icon size={20}/></div>
                <div className="font-bold">{c.title}</div>
                <div className="text-sm text-slate-600 mt-2">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-16 items-center bg-white rounded-[32px] border border-slate-200 p-8 lg:p-12">
            <div>
              <h2 className="text-[28px] font-bold leading-tight">Life is beautiful,<br/>why not see it clearly?</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Ultra-modern diagnostics & Advanced Laser Systems",
                  "Patient-first approach with accurate diagnosis",
                  "Highest standard of visual care & safety protocols",
                  "NABH certified protocols & US FDA approved technology"
                ].map(t=>(
                  <div key={t} className="flex gap-3 text-sm"><Check size={18} className="text-emerald-500 shrink-0 mt-0.5"/>{t}</div>
                ))}
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" alt="Hospital" className="rounded-2xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}
