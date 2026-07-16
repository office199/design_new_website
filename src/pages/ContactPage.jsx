import { useState } from 'react';
import SEO from '../components/SEO';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({name:'', phone:'', service:'Cataract', message:''});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();
    setSent(true);
    setTimeout(()=>setSent(false),4000);
  };

  return (
    <>
      <SEO title="Contact & Book Appointment - Ashu Laser Vision Andheri Mumbai" description="Book eye checkup at Ashu Laser Vision, Andheri West Mumbai. Call +91 93223 64002. Mon-Sat 10AM-8PM. Emergency 24x7." url="https://ashulaservision.com/contact" />
      <div className="bg-[#F8FAFF] py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h1 className="text-[32px] md:text-[44px] font-bold leading-[0.9] tracking-tight">Book Your<br/>Eye Checkup Today</h1>
              <p className="text-sm text-slate-600">Same-day appointments available. Expert consultation with Dr. Shahnawaz Kazi. Fill the form or call us directly.</p>

              <div className="space-y-3">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><Phone size={20}/></div>
                  <div><div className="font-bold text-sm">Call Us</div><div className="text-sm">+91 93223 64002</div><div className="text-xs text-slate-500">Mon-Sat 10AM-8PM, Emergency 24x7</div></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><Mail size={20}/></div>
                  <div><div className="font-bold text-sm">Email</div><div className="text-sm">info@ashulaservision.com</div></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><MapPin size={20}/></div>
                  <div><div className="font-bold text-sm">Location</div><div className="text-sm leading-relaxed">101, Hira Complex, Next to Omair Optics, Andheri West, Mumbai 400058</div></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><Clock size={20}/></div>
                  <div><div className="font-bold text-sm">Hours</div><div className="text-sm">Mon-Sat: 10 AM - 8 PM, Sunday: Emergency Only</div></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-[28px] border border-slate-200 p-8 lg:p-10 shadow-xl">
                <h2 className="font-bold text-xl">Request Appointment</h2>
                <p className="text-xs text-slate-500 mt-1">Our team will call you back within 30 minutes during working hours.</p>

                <form onSubmit={handleSubmit} className="mt-8 grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest">Full Name *</label>
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Doe" className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0B4DA2] focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest">Phone *</label>
                    <input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0B4DA2]" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Service Interested</label>
                    <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm bg-white">
                      <option>Cataract Surgery</option>
                      <option>LASIK / Contoura</option>
                      <option>Retina Treatment</option>
                      <option>Glaucoma</option>
                      <option>Kids Eye Checkup</option>
                      <option>General Eye Checkup</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Message</label>
                    <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Briefly describe your concern..." rows={4} className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#0B4DA2]"></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" className="w-full bg-[#0B4DA2] text-white py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#083A7A] transition"><Send size={16}/> {sent ? "Request Sent Successfully!" : "Book Appointment Now"}</button>
                    <p className="text-[11px] text-slate-500 text-center mt-3">By submitting, you agree to our Privacy Policy & Terms. We respect your privacy.</p>
                  </div>
                </form>

                {sent && (
                  <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm p-3 rounded-xl text-center">Thank you! Our counselor will call you shortly at {form.phone}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-[24px] overflow-hidden border border-slate-200 h-[400px] bg-slate-100 relative">
            <iframe title="map" className="absolute inset-0 w-full h-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.741099!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000" loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
}
