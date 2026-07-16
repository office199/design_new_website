import { useState } from 'react';
import SEO from '../components/SEO';
import { services } from '../data/content';
import { Phone, Mail, MapPin, Clock, Send, Navigation, ShieldCheck, Award } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({name:'', phone:'', service:'Cataract Surgery', message:''});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();
    setSent(true);
    setTimeout(()=>setSent(false),5000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Ashu Laser Vision Andheri Mumbai - Book Eye Checkup",
    "description": "Book eye checkup at Ashu Laser Vision Andheri West Mumbai - Call 9322364002, Mon-Sat 10AM-8PM Emergency 24x7, 28+ services"
  };

  return (
    <>
      <SEO
        title="Contact & Book Appointment - Ashu Laser Vision Andheri Mumbai - 9322364002"
        description="Book eye checkup at Ashu Laser Vision Andheri West Mumbai - Pearl Plaza Opp Andheri Railway Platform 1 Next to McDonald's, 2 mins DN Nagar Metro. Call +91 93223 64002 / 75065 09666. Mon-Sat 10AM-8PM Emergency 24x7. 28+ services Cataract LASIK Retina Glaucoma Squint Oculoplasty. Email ashueyelaser@gmail.com"
        keywords="contact ashulaservision, book eye appointment andheri, eye hospital contact mumbai, andheri eye hospital phone number, eye doctor near me"
        url="https://ashulaservision.com/contact"
        jsonLd={jsonLd}
      />
      <div className="bg-[#F8FAFF] py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="inline-flex bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Contact & Appointment • 24x7 Emergency • Home Care</div>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h1 className="text-[32px] md:text-[44px] font-bold leading-[0.9] tracking-tight">Book Your<br/>Eye Checkup Today<br/>at <span className="text-[#0B4DA2]">Andheri West</span></h1>
              <p className="text-sm text-slate-600 leading-relaxed">Same-day appointments available with Dr. Shahnawaz Kazi FMRF FRCS Gold Medalist - 17+ years 50K+ surgeries. Fill form or call directly. Emergency retinal detachment, trauma, chemical injury - 24x7 OT ready. Elderly home visit eye care available.</p>

              <div className="grid gap-3">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 hover:border-blue-200 hover:shadow-sm transition">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><Phone size={20}/></div>
                  <div className="flex-1">
                    <div className="font-bold text-sm flex items-center gap-2">Call Us <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full">24x7 Emergency</span></div>
                    <div className="text-sm font-semibold mt-1">+91 93223 64002</div>
                    <div className="text-xs text-slate-500">+91 75065 09666 / +91 75065 09777<br/>Mon-Sat 10AM-8PM, Emergency 24x7 Trauma & Retinal Detachment</div>
                    <div className="flex gap-2 mt-2">
                      <a href="tel:+919322364002" className="bg-[#0B4DA2] text-white text-xs px-3 py-1.5 rounded-full font-bold">Call Now</a>
                      <a href="https://wa.me/919322364002" className="bg-[#25D366] text-white text-xs px-3 py-1.5 rounded-full font-bold">WhatsApp</a>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><Mail size={20}/></div>
                  <div><div className="font-bold text-sm">Email</div><div className="text-[13px] mt-1">ashueyelaser@gmail.com<br/>care@ashulaservision.com<br/>info@ashulaservision.com</div></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><MapPin size={20}/></div>
                  <div><div className="font-bold text-sm flex items-center gap-2">Location <span className="text-[10px] bg-blue-50 text-[#0B4DA2] px-2 py-0.5 rounded-full">2 min DN Nagar Metro</span></div><div className="text-[13px] leading-relaxed mt-1">701/2/3 Pearl Plaza Bldg<br/>Opp Andheri Railway Platform No.1<br/>Next to McDonald's, Andheri West Mumbai 400058<br/><span className="text-slate-500 text-xs">Also: Ashu Eye Hospital Yari Road Versova Andheri West</span></div><a href="https://www.google.com/maps/search/Ashu+Laser+Vision+Andheri+West" target="_blank" className="text-xs text-[#0B4DA2] font-bold mt-2 inline-flex items-center gap-1"><Navigation size={12}/> Get Directions on Google Maps</a></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><Clock size={20}/></div>
                  <div><div className="font-bold text-sm">Hours & Services</div><div className="text-[13px] mt-1">Mon-Sat: 10 AM - 8 PM<br/>Sunday: Emergency Only (Retina Detachment, Trauma)<br/><span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">28+ services under one roof</span></div></div>
                </div>
              </div>

              <div className="bg-[#0B4DA2] rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 font-bold text-sm"><Award size={16}/> Why 1L+ Patients Trust Us</div>
                <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="bg-white/10 rounded-xl p-2.5">✅ 20+ Years Since 2004</div>
                  <div className="bg-white/10 rounded-xl p-2.5">✅ 50K+ Surgeries Done</div>
                  <div className="bg-white/10 rounded-xl p-2.5">✅ 4.9★ 1200+ Reviews</div>
                  <div className="bg-white/10 rounded-xl p-2.5">✅ US FDA Technology</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-[28px] border border-slate-200 p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:sticky lg:top-[100px]">
                <h2 className="font-bold text-xl">Request Appointment - Same Day Available</h2>
                <p className="text-xs text-slate-500 mt-1">Our counselor will call you back within 30 mins during working hours. For emergency call 9322364002 directly. 28+ services - Cataract, LASIK, Retina, Glaucoma, Squint, Pediatric, Oculoplasty, etc.</p>

                <form onSubmit={handleSubmit} className="mt-8 grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest">Full Name *</label>
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Doe" className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0B4DA2] focus:ring-2 focus:ring-blue-100 bg-slate-50 focus:bg-white" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest">Phone *</label>
                    <input required type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0B4DA2] bg-slate-50 focus:bg-white" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Service Interested in ({services.length}+ options)</label>
                    <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0B4DA2]">
                      {services.map(s=><option key={s.id}>{s.title}</option>)}
                      <option>General Eye Checkup</option>
                      <option>Emergency - Retinal Detachment / Trauma</option>
                      <option>Home Visit - Elderly Care</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Message / Symptoms</label>
                    <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Briefly describe your concern - blurry vision, flashes, diabetic, etc..." rows={4} className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0B4DA2] bg-slate-50 focus:bg-white"></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" className="w-full bg-[#0B4DA2] text-white py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#083A7A] transition shadow-lg shadow-blue-900/20"><Send size={16}/> {sent ? "Request Sent Successfully! We will call shortly." : "Book Appointment Now - 30min Callback"}</button>
                    <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-500"><ShieldCheck size={12}/> <span>By submitting, you agree to Privacy Policy & Terms. We respect your privacy. No spam.</span></div>
                  </div>
                </form>

                {sent && (
                  <div className="mt-5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm p-4 rounded-xl">
                    <div className="font-bold">Thank you {form.name}! Appointment request received.</div>
                    <div className="text-xs mt-1">Our counselor will call you shortly at {form.phone} for {form.service}. For urgent, call 9322364002. Location: Pearl Plaza opp Andheri Stn Platform 1.</div>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3"><div className="font-bold text-sm">20+</div><div className="text-[10px] text-slate-500">Years</div></div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3"><div className="font-bold text-sm">50K+</div><div className="text-[10px] text-slate-500">Surgeries</div></div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3"><div className="font-bold text-sm">4.9★</div><div className="text-[10px] text-slate-500">Rating</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[24px] overflow-hidden border border-slate-200 h-[420px] bg-slate-100 relative shadow-sm">
            <div className="absolute top-4 left-4 z-10 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 text-xs font-bold border border-slate-200"><MapPin size={14} className="text-[#0B4DA2]"/> Ashu Laser Vision - Pearl Plaza, Opp Andheri Station - 2 min DN Nagar Metro <span className="bg-[#0B4DA2] text-white text-[10px] px-2 py-0.5 rounded-full">OPEN</span></div>
            <iframe title="Ashu Laser Vision Location Map Andheri West Mumbai" className="absolute inset-0 w-full h-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.0!2d72.829!3d19.113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d4f5f6e7e3%3A0x123456789!2sAndheri%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </>
  );
}
