import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageTransition from '../components/animations/PageTransition';
import { Reveal } from '../components/animations/Reveal';
import { services } from '../data/content';
import { CheckCircle2, ArrowLeft, Calendar, Phone, ShieldCheck, Clock, Award, Eye, AlertCircle, HeartPulse } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(s=>s.id===id);

  if (!service) {
    return (
      <PageTransition>
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="text-slate-400" /></div>
        <h2 className="text-xl font-bold">Service not found</h2>
        <p className="text-sm text-slate-600 mt-2">The service "{id}" doesn't exist. We have {services.length} eye services - check our complete list.</p>
        <Link to="/services" className="inline-block mt-6 bg-[#0B4DA2] text-white px-6 py-3 rounded-full font-bold text-sm">View All {services.length} Services</Link>
      </div>
      </PageTransition>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "https://ashulaservision.com/" },
    { name: "Services", url: "https://ashulaservision.com/services" },
    { name: service.title, url: `https://ashulaservision.com/services/${service.id}` }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": service.title,
    "alternateName": service.title + " in Andheri Mumbai",
    "description": service.metaDescription || service.desc,
    "procedureType": "Surgical & Diagnostic",
    "bodyLocation": "Eye",
    "preparation": service.overview,
    "followup": "Regular follow-up at Andheri West clinic",
    "howPerformed": service.procedure || service.overview,
    "status": "Active",
    "provider": {
      "@type": "MedicalClinic",
      "name": "Ashu Laser Vision",
      "url": "https://ashulaservision.com"
    },
    "availableIn": {
      "@type": "MedicalClinic",
      "name": "Ashu Laser Vision - Andheri West Mumbai"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`${service.title} in Andheri Mumbai - Best Treatment | Ashu Laser Vision`}
        description={service.metaDescription || service.desc}
        keywords={service.keywords || `${service.title}, ${service.title} mumbai, best ${service.title.toLowerCase()} andheri, Ashu Laser Vision`}
        url={`https://ashulaservision.com/services/${service.id}`}
        image={service.image}
        type="article"
        jsonLd={jsonLd}
        breadcrumbs={breadcrumbs}
        faqSchema={service.faqs}
      />

      {/* Hero Breadcrumb */}
      <div className="bg-[#F8FAFF] border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2 text-xs">
          <Link to="/" className="text-slate-500 hover:text-[#0B4DA2]">Home</Link>
          <span className="text-slate-300">/</span>
          <Link to="/services" className="text-slate-500 hover:text-[#0B4DA2]">Services</Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#0B4DA2] font-bold">{service.title}</span>
        </div>
      </div>

      <div className="bg-[#F8FAFF]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0B4DA2] bg-white border border-slate-200 px-4 py-2 rounded-full hover:border-[#0B4DA2] transition">
            <ArrowLeft size={16}/> Back to {services.length} Services
          </Link>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <Reveal>
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 relative">
                  <img src={service.banner || service.image} alt={`${service.title} treatment at Ashu Laser Vision Andheri Mumbai`} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 lg:p-8">
                    <div className="inline-flex bg-white text-[#0B4DA2] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">{service.category} • Ashu Laser Vision • Since 2004</div>
                    <h1 className="text-[28px] md:text-[40px] font-bold leading-[0.9] tracking-tight text-white drop-shadow-lg">{service.title} <span className="font-normal text-white/90">in Andheri Mumbai</span></h1>
                  </div>
                </div>
                <div className="p-6 lg:p-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map(f=>(
                      <span key={f} className="inline-flex items-center gap-1.5 bg-[#F8FAFF] border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold">
                        <CheckCircle2 size={12} className="text-emerald-500"/> {f}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold tracking-tight">What is {service.title}?</h2>
                  <p className="text-[15px] text-slate-700 mt-4 leading-relaxed">{service.overview || service.desc}</p>
                  <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">{service.desc} At Ashu Laser Vision, we combine ultra-modern diagnostics (Pentacam, OCT Angio, FFA, Pachymetry, Perimetry, IOL Master), Advanced Laser Systems (Micron M7 800Hz, Femto, Green, YAG, SLT), and a patient-first approach to deliver accurate diagnosis, effective treatment, and highest standard visual care.</p>

                  {service.symptoms && (
                    <div className="mt-10">
                      <h3 className="font-bold text-lg flex items-center gap-2"><AlertCircle size={18} className="text-amber-500"/> Symptoms of {service.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {service.symptoms.map(s=>(
                          <div key={s} className="bg-amber-50/50 border border-amber-100 rounded-xl px-4 py-3 text-sm flex gap-2"><span className="text-amber-500 shrink-0">•</span> <span>{s}</span></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.treatments && (
                    <div className="mt-10">
                      <h3 className="font-bold text-lg flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-600"/> Treatment Options at Ashu Laser Vision</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {service.treatments.map(t=>(
                          <div key={t} className="flex items-start gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 text-sm">
                            <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0"/> <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.benefits && (
                    <div className="mt-10 bg-[#0B4DA2] rounded-[20px] p-6 lg:p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      <h3 className="font-bold text-lg flex items-center gap-2 relative z-10"><Award size={18}/> Why Ashu Laser Vision for {service.title}?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 relative z-10">
                        {service.benefits.map(b=>(
                          <div key={b} className="flex gap-2 text-sm text-blue-100"><span className="text-white shrink-0">✓</span> <span>{b}</span></div>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2 text-xs relative z-10">
                        <span className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">17+ Years Experience</span>
                        <span className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">50K+ Surgeries</span>
                        <span className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">US FDA Tech</span>
                        <span className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">4.9★ 1200+ Reviews</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-10">
                    <h3 className="font-bold text-lg">Why Choose Ashu Laser Vision for {service.title}?</h3>
                    <ul className="mt-4 space-y-3 text-[14px] text-slate-700">
                      <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-blue-50 text-[#0B4DA2] flex items-center justify-center shrink-0 text-xs font-bold">1</span> 17+ years of surgical expertise by Dr. Shahnawaz Kazi (Gold Medalist FCPS, FRCS Glasgow, FMRF Sankara Nethralaya)</li>
                      <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-blue-50 text-[#0B4DA2] flex items-center justify-center shrink-0 text-xs font-bold">2</span> US FDA approved technology - Pentacam HR, OCT Angio, Micron M7 800Hz, Femto, Green/YAG/SLT laser, IOL Master 700</li>
                      <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-blue-50 text-[#0B4DA2] flex items-center justify-center shrink-0 text-xs font-bold">3</span> Personalized care, same-day diagnosis, treatment planning, home care for elderly, 24x7 emergency trauma OT</li>
                      <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-blue-50 text-[#0B4DA2] flex items-center justify-center shrink-0 text-xs font-bold">4</span> Rated 4.9/5 by 1,200+ happy patients in Mumbai, located opp Andheri Railway Platform 1, Next to McDonald's</li>
                    </ul>
                  </div>

                  {service.faqs && (
                    <div className="mt-10">
                      <h3 className="font-bold text-lg">Frequently Asked Questions - {service.title}</h3>
                      <div className="mt-4 space-y-3">
                        {service.faqs.map((faq,i)=>(
                          <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl p-5 open:bg-white open:shadow-sm transition">
                            <summary className="font-semibold text-sm cursor-pointer list-none flex justify-between items-center gap-4">
                              {faq.q}
                              <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center group-open:rotate-180 transition">⌄</span>
                            </summary>
                            <p className="text-sm text-slate-600 leading-relaxed mt-3">{faq.a}</p>
                          </details>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location & SEO Keywords block */}
                  <div className="mt-10 border border-dashed border-slate-200 rounded-2xl p-5 bg-slate-50/50">
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Serving Mumbai</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Looking for {service.title.toLowerCase()} in Andheri West, Andheri East, Jogeshwari, Versova, Yari Road, Lokhandwala, Bandra, Juhu, Goregaon, Malad, Borivali, Dadar, South Mumbai? Ashu Laser Vision at Pearl Plaza, Opp Andheri Railway Station Platform 1, Next to McDonald's, Andheri West 400058 - 2 mins from DN Nagar Metro. Call +91 93223 64002. Keywords: {service.keywords}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            </Reveal>

            <Reveal>
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-[100px] h-fit">
              <div className="bg-[#0B4DA2] rounded-[24px] p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
                <h3 className="font-bold text-lg relative z-10 flex items-center gap-2"><Calendar size={18}/> Book Your {service.title} Consultation</h3>
                <p className="text-blue-100 text-sm mt-2 relative z-10">Get expert opinion for {service.title} today by Dr. Shahnawaz Kazi - FMRF, FRCS, Gold Medalist. Same-day appointment available.</p>
                <div className="mt-6 space-y-3 relative z-10">
                  <Link to="/contact" className="w-full bg-white text-[#0B4DA2] py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition"><Calendar size={16}/> Book Appointment Now</Link>
                  <a href="tel:+919322364002" className="w-full bg-white/15 border border-white/20 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition"><Phone size={16}/> Call +91 93223 64002</a>
                  <a href="https://wa.me/919322364002" className="w-full bg-[#25D366] py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition">💬 WhatsApp Us</a>
                </div>
                <div className="mt-6 text-xs text-blue-200 bg-white/10 rounded-xl p-4 space-y-1.5 relative z-10">
                  <div className="flex gap-2"><ShieldCheck size={14} className="shrink-0 mt-0.5"/> FDA approved tech & protocols</div>
                  <div className="flex gap-2"><Clock size={14} className="shrink-0 mt-0.5"/> Mon-Sat 10AM-8PM | Emergency 24x7</div>
                  <div className="flex gap-2"><Eye size={14} className="shrink-0 mt-0.5"/> Opp Andheri Station Platform 1, 2 min DN Nagar Metro</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
                <h4 className="font-bold text-sm flex items-center gap-2">Other Eye Services <span className="bg-blue-50 text-[#0B4DA2] text-[10px] px-2 py-0.5 rounded-full">{services.length - 1} more</span></h4>
                <div className="mt-4 space-y-1.5 max-h-[420px] overflow-auto pr-1">
                  {services.filter(s=>s.id!==id).slice(0,12).map(s=>(
                    <Link key={s.id} to={`/services/${s.id}`} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 text-[13px] font-medium border border-transparent hover:border-slate-200 group transition">
                      <span className="truncate">{s.title}</span> <span className="text-slate-400 group-hover:text-[#0B4DA2] group-hover:translate-x-0.5 transition">→</span>
                    </Link>
                  ))}
                </div>
                <Link to="/services" className="mt-4 block text-center bg-slate-900 text-white py-3 rounded-full text-xs font-bold hover:bg-black transition">View All {services.length} Services</Link>
              </div>

              <div className="bg-[#F0F9FF] border border-blue-100 rounded-[24px] p-6">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0B4DA2]"><HeartPulse size={16}/> Emergency? 24x7 Help</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">Retinal detachment flashes, eye injury, chemical splash, sudden vision loss - call immediately.</p>
                <a href="tel:+919322364002" className="mt-3 block bg-[#0B4DA2] text-white text-center py-3 rounded-full text-sm font-bold">Emergency Call +91 93223 64002</a>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
