import SEO from '../components/SEO';
import PageTransition from '../components/animations/PageTransition';
import { Reveal } from '../components/animations/Reveal';
import { doctor } from '../data/content';
import { Award, GraduationCap, Briefcase, Heart } from 'lucide-react';

export default function DoctorPage() {
  return (
    <PageTransition>
      <SEO title="Dr. Shahnawaz Kazi - Best Retina Surgeon in Mumbai | Ashu Laser Vision" description="Meet Dr. Shahnawaz Kazi - FMRF, FRCS Glasgow, Gold Medalist, Retina & Cataract Surgeon with 17+ years experience. Founder of Ashu Laser Vision." url="https://ashulaservision.com/doctor" />
      <div className="bg-[#F8FAFF] py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <Reveal>
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[28px] border border-slate-200 p-8">
                <img
                  src="/images/clinic/hero-consultation.webp"
                  alt={`${doctor.name} examining a patient at Ashu Laser Vision`}
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                  width="700"
                  height="900"
                  fetchPriority="high"
                />
                <div className="mt-6">
                  <h1 className="text-[28px] font-bold leading-tight">{doctor.name}</h1>
                  <div className="text-[#0B4DA2] font-semibold text-sm mt-1">{doctor.role}</div>
                  <div className="text-xs text-slate-600 mt-3 leading-relaxed">{doctor.degrees}</div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">17+ Years Exp</span>
                    <span className="bg-blue-50 text-[#0B4DA2] px-3 py-1 rounded-full text-xs font-bold">Gold Medalist</span>
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">FICO (UK)</span>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>

            <Reveal>
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-[28px] border border-slate-200 p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl font-bold">About Doctor</h2>
                <p className="text-[15px] text-slate-600 leading-relaxed mt-4">Welcome to Ashu Laser Vision, our Ophthalmologist, Eye Surgeon & Retina Specialist Dr. Shahnawaz Kazi, specializes in surgically correcting disorders and diseases of the eye affecting vision like Lasik, Cataract, Glaucoma, Cornea, Age Related Macular Disease, Retinopathy of Prematurity, Diabetic Retinopathy, Squint, Retinal Detachment, Ocular Injuries, Oculoplastic, Kid’s Eye Problems etc.</p>
                <p className="text-[15px] text-slate-600 leading-relaxed mt-4">To advance in the field of vitreoretinal sciences with an institute with overall development in the different sub-specialities in ophthalmology in keeping with the latest technological advancements.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-[#F8FAFF] border border-slate-200 rounded-xl p-4">
                    <GraduationCap className="text-[#0B4DA2] mb-2" size={20} />
                    <div className="font-bold text-sm">Education</div>
                    <div className="text-xs text-slate-600 mt-1">MBBS, DOMS, DO, DNB (Gold Medal), FCPS (Gold Medalist), FRCS Glasgow, FMRF, FICO UK</div>
                  </div>
                  <div className="bg-[#F8FAFF] border border-slate-200 rounded-xl p-4">
                    <Award className="text-[#0B4DA2] mb-2" size={20} />
                    <div className="font-bold text-sm">Specialization</div>
                    <div className="text-xs text-slate-600 mt-1">Vitreo-Retina, Cataract, Refractive Surgery (LASIK), Glaucoma, Cornea, Pediatric Ophthalmology</div>
                  </div>
                  <div className="bg-[#F8FAFF] border border-slate-200 rounded-xl p-4">
                    <Briefcase className="text-[#0B4DA2] mb-2" size={20} />
                    <div className="font-bold text-sm">Hospital Attachments</div>
                    <div className="text-xs text-slate-600 mt-1">{doctor.associations.join(", ")}</div>
                  </div>
                  <div className="bg-[#F8FAFF] border border-slate-200 rounded-xl p-4">
                    <Heart className="text-[#0B4DA2] mb-2" size={20} />
                    <div className="font-bold text-sm">Philosophy</div>
                    <div className="text-xs text-slate-600 mt-1">Precision, technology, and trust come together for better vision. Patient-first compassionate care.</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B4DA2] rounded-[28px] p-8 text-white">
                <h3 className="font-bold text-xl">Why Patients Trust Dr. Kazi</h3>
                <ul className="mt-4 space-y-2 text-sm text-blue-100">
                  <li>• Gold Medalist & FRCS (Glasgow) with international training</li>
                  <li>• Expertise in complex retina detachment & diabetic retinopathy</li>
                  <li>• 50,000+ successful cataract & LASIK surgeries</li>
                  <li>• Known for humble nature & detailed counseling</li>
                </ul>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
