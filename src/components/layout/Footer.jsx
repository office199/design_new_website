import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { services } from '../../data/content';

function FacebookIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function Footer() {
  const retinaServices = services.filter(s=>s.category==="Retina").slice(0,5);
  const pediatric = services.filter(s=>s.category==="Pediatric").slice(0,5);

  return (
    <footer className="bg-[#0A1931] text-white pt-12 lg:pt-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0B4DA2]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        {/* top cta */}
        <div className="bg-gradient-to-br from-[#0B4DA2] to-[#083A7A] rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 lg:mb-16 shadow-[0_20px_60px_rgba(11,77,162,0.3)] border border-white/10">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold font-display leading-tight">Ready to See Life Clearly?</h3>
            <p className="text-blue-100 mt-2 text-sm lg:text-[15px] max-w-2xl">Book your comprehensive eye checkup today at Ashu Laser Vision Andheri West - 28+ services, same-day appointments, 20+ years excellence, 50K+ surgeries by Dr. Shahnawaz Kazi Gold Medalist.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-white/15 border border-white/20 text-xs px-3 py-1 rounded-full">Cataract • LASIK • Retina • Glaucoma</span>
              <span className="bg-white/15 border border-white/20 text-xs px-3 py-1 rounded-full">Pediatric • Squint • Oculoplasty • DCR</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 shrink-0 w-full lg:w-auto">
            <Link to="/contact" className="bg-white text-[#0B4DA2] px-6 py-3.5 rounded-full font-bold text-sm hover:bg-blue-50 transition flex items-center justify-center gap-2 w-full sm:w-auto">Book Appointment <ArrowUpRight size={16}/></Link>
            <a href="tel:+919322364002" className="bg-white/15 border border-white/20 px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 transition flex items-center justify-center gap-2 w-full sm:w-auto"><Phone size={16}/> +91 93223 64002</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-14 rounded-xl bg-white p-1 flex items-center justify-center">
                <img src="/images/ashu-logo-mark.png" alt="" className="w-full h-full object-contain" width="146" height="211" loading="lazy" />
              </div>
              <div>
                <div className="font-bold text-lg leading-none font-display">Ashu Laser Vision</div>
                <div className="text-[10px] uppercase tracking-widest text-blue-200 mt-1">Super Specialty Eye Hospital • Since 2004</div>
              </div>
            </div>
            <p className="text-slate-300 text-[13.5px] leading-relaxed">
              Trusted center for advanced eye and retina care since 2004 at Pearl Plaza, Opp Andheri Railway Platform No.1, Next to McDonald's, Andheri West Mumbai 400058. Led by Dr. Shahnawaz Kazi FMRF FRCS Gold Medalist. 28+ services: Cataract Lasik Retina Glaucoma Pediatric Cornea Oculoplasty OCT FFA Pentacam Pachymetry Perimetry Laser DCR Ortho-K Vision Therapy Botox Care at Home. 50,000+ successful surgeries, 1L+ happy patients, 4.9★ rating.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs font-semibold text-slate-300">Connect with us:</span>
              <a href="https://www.facebook.com/AshuLaserVision/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:scale-110 transition"><FacebookIcon size={16}/></a>
              <a href="https://www.instagram.com/ashueyehospital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:scale-110 transition"><InstagramIcon size={16}/></a>
              <a href="https://www.linkedin.com/in/shahnawaz-kazi-971a067b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:scale-110 transition"><LinkedinIcon size={16}/></a>
            </div>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-xs font-bold tracking-widest uppercase text-blue-200">Hospitals & Associations</div>
              <div className="text-[12px] text-slate-300 mt-2 leading-relaxed">Bhabha Hospital HOD Professor, Saifee Hospital, Wockhardt, Shushrusha, GSBS Medical Trust, Central Railway, Saifee Polyclinic, Kalsekar, Jashem Eye Institute Retina Clinic, Sadhu Kamal, Vardhamaan</div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold mb-5 text-white text-sm">Retina Services</h4>
            <ul className="space-y-2.5 text-[13px] text-slate-300">
              {retinaServices.map(s=><li key={s.id}><Link to={`/services/${s.id}`} className="hover:text-white hover:translate-x-0.5 transition inline-block">{s.title}</Link></li>)}
              <li><Link to="/services/anti-vegf-treatment" className="hover:text-white">Anti-VEGF Injections</Link></li>
              <li><Link to="/services/fundus-fluorescein-angiography" className="hover:text-white">FFA Angiography</Link></li>
              <li><Link to="/services/hypertensive-retinopathy" className="hover:text-white">Hypertensive Retinopathy</Link></li>
            </ul>

            <h4 className="font-bold mt-8 mb-3 text-white text-sm">Laser</h4>
            <ul className="space-y-2 text-[13px] text-slate-300">
              <li><Link to="/services/laser" className="hover:text-white">Green & Diode Laser</Link></li>
              <li><Link to="/services/yag-laser" className="hover:text-white">YAG Laser</Link></li>
              <li><Link to="/services/selective-laser-trabeculoplasty" className="hover:text-white">SLT Laser</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold mb-5 text-white text-sm">Cataract & Refractive</h4>
            <ul className="space-y-2.5 text-[13px] text-slate-300">
              <li><Link to="/services/cataract" className="hover:text-white">Cataract Surgery</Link></li>
              <li><Link to="/services/lasik" className="hover:text-white">LASIK Contoura SMILE</Link></li>
              <li><Link to="/services/advanced-surface-laser-ablation" className="hover:text-white">ASA PRK</Link></li>
              <li><Link to="/services/cornea" className="hover:text-white">Cornea DSEK Crosslink</Link></li>
              <li><Link to="/services/pachymetry" className="hover:text-white">Pachymetry</Link></li>
              <li><Link to="/services/topography" className="hover:text-white">Topography Pentacam</Link></li>
              <li><Link to="/services/optical-coherence-tomography" className="hover:text-white">OCT Macula RNFL</Link></li>
              <li><Link to="/services/perimetry" className="hover:text-white">Perimetry Visual Field</Link></li>
            </ul>

            <h4 className="font-bold mt-8 mb-3 text-white text-sm">Glaucoma</h4>
            <ul className="space-y-2 text-[13px] text-slate-300">
              <li><Link to="/services/glaucoma" className="hover:text-white">Glaucoma Management</Link></li>
              <li><Link to="/services/selective-laser-trabeculoplasty" className="hover:text-white">SLT & AGV GATT</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold mb-5 text-white text-sm">Pediatric & Oculoplasty</h4>
            <ul className="space-y-2.5 text-[13px] text-slate-300">
              {pediatric.map(s=><li key={s.id}><Link to={`/services/${s.id}`} className="hover:text-white">{s.title}</Link></li>)}
              <li><Link to="/services/kids-eye-problem" className="hover:text-white">Kids Eye Problem</Link></li>
              <li><Link to="/services/orthokeratology" className="hover:text-white">Ortho-K Myopia Control</Link></li>
              <li><Link to="/services/oculoplastics" className="hover:text-white">Oculoplastics</Link></li>
              <li><Link to="/services/laser-dcr" className="hover:text-white">Laser DCR</Link></li>
              <li><Link to="/services/botox" className="hover:text-white">Botox</Link></li>
              <li><Link to="/services/eye-tumors" className="hover:text-white">Eye Tumors Retinoblastoma</Link></li>
              <li><Link to="/services/ocular-injuries" className="hover:text-white">Ocular Trauma 24x7</Link></li>
              <li><Link to="/services/care-at-home" className="hover:text-white">Care at Home Elderly</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold mb-5 text-sm">Contact & Location</h4>
            <ul className="space-y-4 text-[13px] text-slate-300">
              <li className="flex gap-3"><MapPin size={18} className="shrink-0 text-blue-400" /> 701/2/3 Pearl Plaza, Opp Andheri Rly Platform 1, Next to McDonald's, Andheri West Mumbai 400058. Yari Road Versova.</li>
              <li className="flex gap-3"><Phone size={18} className="shrink-0 text-blue-400" /> +91 93223 64002 / 75065 09666 / 75065 09777</li>
              <li className="flex gap-3"><Mail size={18} className="shrink-0 text-blue-400" /> ashueyelaser@gmail.com / care@ashulaservision.com / info@ashulaservision.com</li>
              <li className="flex gap-3"><Clock size={18} className="shrink-0 text-blue-400" /> Mon-Sat 10AM-8PM Emergency 24x7</li>
            </ul>

            <h4 className="font-bold mt-8 mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-[13px] text-slate-300">
              <li><Link to="/about" className="hover:text-white">About Hospital Since 2004</Link></li>
              <li><Link to="/doctor" className="hover:text-white">Dr. Shahnawaz Kazi - Gold Medalist</Link></li>
              <li><Link to="/technology" className="hover:text-white">Our Technology - Pentacam OCT Femto</Link></li>
              <li><Link to="/blogs" className="hover:text-white">Patient Education Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-white">Book Appointment</Link></li>
              <li><Link to="/services" className="hover:text-white">All {services.length} Services</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-slate-400 border-t border-white/5 mt-0">
          <p>© {new Date().getFullYear()} Ashu Laser Vision - Super Multi Specialty Eye & Retina Hospital. All rights reserved. | Eye Hospital Near DN Nagar Metro Andheri Mumbai 400058 | 28+ Services • 20+ Years • 50K+ Surgeries • 4.9★ 1200+ Reviews</p>
          <div className="flex gap-4 shrink-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
