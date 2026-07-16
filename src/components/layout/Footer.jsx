import { Link } from 'react-router-dom';
import { Eye, Phone, Mail, MapPin, Clock, Share2, Camera, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A1931] text-white pt-16 lg:pt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        {/* top cta */}
        <div className="bg-[#0B4DA2] rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-16">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold font-display leading-tight">Ready to See Life Clearly?</h3>
            <p className="text-blue-100 mt-2 text-sm lg:text-base">Book your comprehensive eye checkup today. Same-day appointments available.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="bg-white text-[#0B4DA2] px-6 py-3.5 rounded-full font-bold text-sm hover:bg-blue-50 transition">Book Appointment</Link>
            <a href="tel:+919322364002" className="bg-white/15 border border-white/20 px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 transition flex items-center gap-2"><Phone size={16}/> +91 93223 64002</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#0B4DA2]">
                <Eye size={24} />
              </div>
              <div>
                <div className="font-bold text-lg leading-none font-display">Ashu Laser Vision</div>
                <div className="text-[10px] uppercase tracking-widest text-blue-200 mt-1">Super Specialty Eye Hospital</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Trusted center for advanced eye and retina care since 2004. World-class treatments with modern technology and compassionate expertise led by Dr. Shahnawaz Kazi.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Share2 size={16}/></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Camera size={16}/></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><Video size={16}/></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white">Our Services</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/services/cataract" className="hover:text-white transition">Cataract Surgery</Link></li>
              <li><Link to="/services/lasik" className="hover:text-white">LASIK & Refractive</Link></li>
              <li><Link to="/services/retina" className="hover:text-white">Retina Treatment</Link></li>
              <li><Link to="/services/glaucoma" className="hover:text-white">Glaucoma Care</Link></li>
              <li><Link to="/services/cornea" className="hover:text-white">Cornea Services</Link></li>
              <li><Link to="/services/pediatric" className="hover:text-white">Pediatric & Squint</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-white">About Hospital</Link></li>
              <li><Link to="/doctor" className="hover:text-white">Dr. Shahnawaz Kazi</Link></li>
              <li><Link to="/technology" className="hover:text-white">Our Technology</Link></li>
              <li><Link to="/contact" className="hover:text-white">Book Appointment</Link></li>
              <li><a href="#" className="hover:text-white">Patient Reviews</a></li>
              <li><a href="#" className="hover:text-white">Health Articles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Contact & Location</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3"><MapPin size={18} className="shrink-0 text-blue-400" /> Andheri West, Mumbai, Maharashtra 400058, Near DN Nagar Metro</li>
              <li className="flex gap-3"><Phone size={18} className="shrink-0 text-blue-400" /> +91 93223 64002</li>
              <li className="flex gap-3"><Mail size={18} className="shrink-0 text-blue-400" /> info@ashulaservision.com</li>
              <li className="flex gap-3"><Clock size={18} className="shrink-0 text-blue-400" /> Mon - Sat: 10:00 AM - 8:00 PM<br/>Emergency: 24x7</li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Ashu Laser Vision. All rights reserved. | Eye Hospital in Andheri Mumbai</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
