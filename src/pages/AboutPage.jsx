import SEO from '../components/SEO';
import { Check, Award, Heart, Users, Lightbulb, MapPin, Phone, GraduationCap, Briefcase } from 'lucide-react';
import { doctor, stats } from '../data/content';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Ashu Laser Vision - Best Eye Hospital in Andheri Mumbai Since 2004 - 28+ Services"
        description="Learn about Ashu Laser Vision - Premium eye hospital in Andheri West Mumbai since 2004. 20+ years, 50K+ surgeries, 28+ services Cataract LASIK Retina Glaucoma Squint Oculoplasty, US FDA tech Pentacam OCT Femto Micron M7 800Hz, Dr Shahnawaz Kazi FMRF FRCS Gold Medalist. 4.9★ 1200+ reviews. Pearl Plaza Opp Andheri Railway Platform 1."
        url="https://ashulaservision.com/about"
      />
      <div className="bg-[#F8FAFF] py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">Who We Are • Since 2004 • Andheri West</div>
            <h1 className="text-[36px] md:text-[56px] font-bold leading-[0.9] mt-6 tracking-tight">
              Committed to the Eye Care Excellence <span className="text-[#0B4DA2]">Since 2004</span> - 28+ Services
            </h1>
            <p className="text-[15px] text-slate-600 leading-relaxed mt-6 max-w-3xl">
              Ashu Laser Vision is a premium center for all Eye Diseases, Eye Treatments & Eye Problems and has been providing all Advanced, innovative & modern eye care since 2004. Our practice has been recognized as one of the leading Ophthalmologist, Eye Surgeon & Retina Specialist practices in Mumbai, offering a complete range of eye & retina services: Cataract, LASIK Contoura SMILE ASA, Retina Detachment Vitrectomy, Diabetic Retinopathy, Glaucoma AGV GATT SLT, Pediatric Squint Myopia Control Ortho-K Vision Therapy, Cornea C3R DSEK, Oculoplasty Laser DCR Botox, Eye Tumors Retinoblastoma, Ocular Injuries 24x7, Diagnostics OCT Angio FFA Pentacam Pachymetry Perimetry Biometry, Lasers Green YAG Diode.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              {stats.map(s=>(
                <div key={s.label} className="bg-white border border-slate-200 rounded-2xl px-6 py-4 min-w-[140px]">
                  <div className="text-2xl font-bold text-[#0B4DA2]">{s.value}</div>
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className="text-[11px] text-slate-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Our Vision & Values", desc: "Dedicated to enhancing patient care, exploring medical challenges, and advancing education of healthcare. Life is beautiful, why not see it clearly.", icon: Heart },
              { title: "Integrity & Innovations", desc: "Groundbreaking discoveries transformed patient outcomes and become standard practices. Micron M7 800Hz fastest LASIK, 25G vitrectomy, AGV, GATT, DSEK, Laser DCR.", icon: Lightbulb },
              { title: "Advancing Patient Care", desc: "At Ashu Laser Vision, we leverage medical innovations to significantly improve patient care with patient-first approach, 24x7 emergency, home care for elderly.", icon: Users },
            ].map(c=>(
              <div key={c.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-blue-200 transition">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] mb-4"><c.icon size={20}/></div>
                <div className="font-bold">{c.title}</div>
                <div className="text-sm text-slate-600 mt-2 leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-12 items-start">
            <div className="bg-white rounded-[32px] border border-slate-200 p-8 lg:p-10">
              <h2 className="text-[28px] font-bold leading-tight">Life is beautiful,<br/>why not see it clearly?</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Ultra-modern diagnostics & Advanced Laser Systems - Pentacam HR, OCT Angio RNFL, Micron M7 800Hz, Femto, Green Diode YAG SLT, Humphrey Fields, IOL Master 700, FFA, 23/25/27G vitrectomy BIOM",
                  "Patient-first approach with accurate diagnosis - FFA before DR treatment planning, Pentacam before LASIK, OCT RNFL before glaucoma",
                  "Highest standard of visual care & safety protocols - FDA approved, day-care stitchless, same-day diagnosis treatment",
                  "NABH certified protocols & US FDA approved technology - 20 years excellence, 50K+ surgeries, 4.9★ 1200+ reviews",
                  "24x7 Emergency trauma - corneal tear repair, foreign body removal, hyphema drainage, endophthalmitis vitrectomy, retinal detachment",
                  "Elderly & Bedridden Care at Home - portable slit lamp, refraction, post-op followup at home Mumbai"
                ].map(t=>(
                  <div key={t} className="flex gap-3 text-[13px] leading-relaxed"><Check size={18} className="text-emerald-500 shrink-0 mt-0.5"/>{t}</div>
                ))}
              </div>

              <div className="mt-8 bg-[#F8FAFF] border border-slate-200 rounded-2xl p-5">
                <div className="font-bold text-sm flex items-center gap-2"><MapPin size={16} className="text-[#0B4DA2]"/> Our Location - 2 mins from DN Nagar Metro</div>
                <div className="text-xs text-slate-600 mt-2 leading-relaxed">701/2/3 Pearl Plaza Bldg, Opp Andheri Railway Platform No.1, Next to McDonald's, Andheri West Mumbai 400058<br/>Ashu Eye Hospital, Yari Road Versova Andheri West<br/>Call: +91 93223 64002 / 75065 09666 / 75065 09777<br/>Email: ashueyelaser@gmail.com care@ashulaservision.com</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0A1931] rounded-[32px] p-8 text-white relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#0B4DA2]/40 rounded-full blur-2xl" />
                <h3 className="font-bold text-xl relative z-10 flex items-center gap-2"><Award size={20}/> Dr. Shahnawaz Kazi - Education & Gold Medal</h3>
                <div className="mt-4 space-y-2 text-sm text-blue-100 relative z-10 leading-relaxed">
                  {doctor.education.map(e=><div key={e} className="flex gap-2"><span className="text-white">•</span> {e}</div>)}
                </div>
                <div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-4 relative z-10">
                  <div className="text-xs font-bold tracking-widest uppercase text-blue-200">Surgeries Performed</div>
                  <div className="text-xs text-blue-100 mt-2 leading-relaxed">{doctor.surgeries.join(", ")} - 50K+ surgeries performed</div>
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" alt="Ashu Laser Vision Hospital Andheri Mumbai" className="w-full aspect-[16/10] object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2]"><GraduationCap size={18}/></div>
                    <div>
                      <div className="font-bold text-sm">Teaching Experience</div>
                      <div className="text-xs text-slate-600">Post Graduate Teacher CPS, Ophthalmology, HOD Bhabha Hospital, UG lectures, PG clinical & surgical training LTMGH & Saifee, Nursing & Optometrist teaching</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2]"><Briefcase size={18}/></div>
                    <div>
                      <div className="font-bold text-sm">Work Experience - 9 Hospitals</div>
                      <div className="text-xs text-slate-600">{doctor.associations.join(", ")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
