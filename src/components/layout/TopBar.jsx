import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-[#0B4DA2] text-white text-[13px] relative z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-2.5 flex flex-wrap justify-between items-center gap-2">
        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:+919322364002" className="flex items-center gap-2 hover:text-blue-200 transition">
            <Phone size={14} /> +91 93223 64002
          </a>
          <span className="flex items-center gap-2">
            <Mail size={14} /> info@ashulaservision.com
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} /> Mon-Sat: 10AM - 8PM
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} /> Andheri West, Mumbai
          </span>
        </div>
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div className="flex items-center gap-3 lg:hidden text-xs">
            <a href="tel:+919322364002" className="flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full">
              <Phone size={12} /> Call Now
            </a>
            <a href="https://wa.me/919322364002" className="flex items-center gap-1.5 bg-green-500 px-2.5 py-1 rounded-full">
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="hidden md:inline opacity-80 text-xs">For Emergency:</span>
            <a href="tel:+919322364002" className="bg-white text-[#0B4DA2] px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-50 transition">
              Emergency: +91 93223 64002
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
