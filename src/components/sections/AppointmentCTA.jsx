import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function AppointmentCTA() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="rounded-[28px] bg-[#F8FAFF] border border-slate-200 overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 lg:p-12 space-y-6">
            <h2 className="text-[28px] lg:text-[36px] font-bold leading-[0.9] tracking-tight">Make An Appointment & You're Done!</h2>
            <p className="text-sm text-slate-600">We strive to give you a healthy vision in a friendly and comfortable environment.</p>
            
            <div className="space-y-3">
              <div className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><MapPin size={18}/></div>
                <div className="text-xs"><span className="font-bold block text-[13px]">Our Location</span>101, Hira Complex, Next to Omair Optics, Andheri West, Mumbai 400058</div>
              </div>
              <div className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0B4DA2] shrink-0"><Clock size={18}/></div>
                <div className="text-xs"><span className="font-bold block text-[13px]">Working Hours</span>Mon-Sat: 10 AM - 8 PM • Sunday: Emergency Only</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link to="/contact" className="bg-[#0B4DA2] text-white px-6 py-3.5 rounded-full font-bold text-sm text-center w-full sm:w-auto">Book Appointment</Link>
              <a href="tel:+919322364002" className="bg-white border border-slate-200 px-6 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 w-full sm:w-auto"><Phone size={16}/> Call Now</a>
            </div>
          </div>

          <div className="bg-slate-100 min-h-[360px] relative">
            <iframe
              title="map"
              className="absolute inset-0 w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5!2d72.826!3d19.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7!2sAndheri%20West%20Mumbai!5e0!3m2!1sen!2sin!4v123"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">Ashu Laser Vision</div>
                <div className="text-xs text-slate-500">Rated 4.9 ⭐ by 1,200+ patients</div>
              </div>
              <a href="https://maps.google.com" target="_blank" className="bg-[#0F172A] text-white px-4 py-2 rounded-full text-xs font-bold">Get Directions</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
