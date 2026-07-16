import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { services } from '../data/content';
import { CheckCircle2, ArrowLeft, Calendar, Phone } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(s=>s.id===id);

  if (!service) {
    return <div className="py-20 text-center">Service not found. <Link to="/services" className="text-[#0B4DA2]">Back to services</Link></div>;
  }

  return (
    <>
      <SEO title={`${service.title} in Andheri Mumbai - Ashu Laser Vision`} description={service.desc} url={`https://ashulaservision.com/services/${id}`} />
      <div className="bg-[#F8FAFF]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0B4DA2]"><ArrowLeft size={16}/> Back to Services</Link>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[28px] border border-slate-200 overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 lg:p-10">
                  <h1 className="text-[32px] md:text-[44px] font-bold leading-[0.9] tracking-tight">{service.title}</h1>
                  <p className="text-[15px] text-slate-600 mt-5 leading-relaxed">{service.desc}</p>
                  <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">At Ashu Laser Vision, we combine ultra-modern diagnostics, Advanced Laser Systems, and a patient-first approach to deliver accurate diagnosis, effective treatment, and the highest standard of visual care.</p>

                  <div className="grid sm:grid-cols-2 gap-3 mt-8">
                    {service.features.map(f=>(
                      <div key={f} className="flex items-center gap-2.5 bg-[#F8FAFF] border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium">
                        <CheckCircle2 size={16} className="text-emerald-500"/> {f}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <h3 className="font-bold text-lg">Why Choose Ashu Laser Vision for {service.title}?</h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      <li className="flex gap-2"><span className="text-[#0B4DA2]">•</span> 17+ years of surgical expertise by Dr. Shahnawaz Kazi (Gold Medalist)</li>
                      <li className="flex gap-2"><span className="text-[#0B4DA2]">•</span> US FDA approved technology, Pentacam, OCT, Biometry</li>
                      <li className="flex gap-2"><span className="text-[#0B4DA2]">•</span> Personalized care, same-day diagnosis & treatment planning</li>
                      <li className="flex gap-2"><span className="text-[#0B4DA2]">•</span> Rated 4.9/5 by 1,200+ happy patients in Mumbai</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0B4DA2] rounded-[24px] p-8 text-white">
                <h3 className="font-bold text-lg">Book Your Consultation</h3>
                <p className="text-blue-100 text-sm mt-2">Get expert opinion for {service.title} today. Same-day appointment available.</p>
                <div className="mt-6 space-y-3">
                  <Link to="/contact" className="w-full bg-white text-[#0B4DA2] py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2"><Calendar size={16}/> Book Appointment</Link>
                  <a href="tel:+919322364002" className="w-full bg-white/15 border border-white/20 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2"><Phone size={16}/> Call +91 93223 64002</a>
                </div>
                <div className="mt-6 text-xs text-blue-200 bg-white/10 rounded-xl p-3">
                  <strong className="text-white">Location:</strong> Andheri West, Mumbai<br/>Mon-Sat 10AM-8PM
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[24px] p-6">
                <h4 className="font-bold text-sm">Other Services</h4>
                <div className="mt-4 space-y-2">
                  {services.filter(s=>s.id!==id).map(s=>(
                    <Link key={s.id} to={`/services/${s.id}`} className="block px-4 py-3 rounded-xl hover:bg-slate-50 text-sm font-medium border border-transparent hover:border-slate-200">{s.title} →</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
