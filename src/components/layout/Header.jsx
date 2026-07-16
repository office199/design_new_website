import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../data/content';

const mainMenu = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
];

const serviceGroups = [
  {
    cat: "Retina & Vitreous",
    items: ["age-related-macular-degeneration","diabetic-retinopathy","retinal-detachment","retinopathy-of-prematurity","retina","anti-vegf-treatment","fundus-fluorescein-angiography","hypertensive-retinopathy"]
  },
  {
    cat: "Cataract & Refractive",
    items: ["cataract","lasik","advanced-surface-laser-ablation","yag-laser"]
  },
  {
    cat: "Glaucoma & Cornea",
    items: ["glaucoma","selective-laser-trabeculoplasty","cornea","pachymetry","topography","laser"]
  },
  {
    cat: "Pediatric & Oculoplasty",
    items: ["pediatric","kids-eye-problem","squint","vision-therapy","orthokeratology","oculoplastics","laser-dcr","botox","eye-tumors","ocular-injuries"]
  },
  {
    cat: "Diagnostics & Others",
    items: ["optical-coherence-tomography","perimetry","care-at-home"]
  }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const getServiceById = (id) => services.find(s=>s.id===id);

  return (
    <header className={`sticky top-0 z-40 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg border-b border-slate-100' : 'shadow-sm'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] lg:h-[84px] gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Ashu Laser Vision home">
            <div className="w-11 h-12 lg:w-12 lg:h-14 flex items-center justify-center">
              <img
                src="/images/ashu-logo-mark.png"
                alt=""
                className="w-full h-full object-contain"
                width="146"
                height="211"
              />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[18px] lg:text-[20px] tracking-tight text-[#0B4DA2] font-display">Ashu Laser Vision</div>
              <div className="text-[11px] lg:text-[12px] text-slate-500 font-medium tracking-widest uppercase">Super Specialty Eye Hospital</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainMenu.map((item) => (
              <Link key={item.label} to={item.path} className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition ${location.pathname === item.path ? 'bg-[#0B4DA2] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                {item.label}
              </Link>
            ))}

            {/* Mega Services */}
            <div className="relative"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2.5 rounded-full text-[14px] font-medium transition ${location.pathname.startsWith('/services') ? 'bg-[#0B4DA2] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
              >
                Services <ChevronDown size={14} className={`transition ${serviceOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${serviceOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3'}`}>
                <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-slate-100 w-[900px] p-6 grid grid-cols-3 gap-6 max-h-[70vh] overflow-auto">
                  {serviceGroups.map(group => (
                    <div key={group.cat}>
                      <div className="text-[11px] font-bold tracking-widest uppercase text-[#0B4DA2] bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-3">{group.cat}</div>
                      <div className="space-y-1">
                        {group.items.map(id => {
                          const s = getServiceById(id);
                          if(!s) return null;
                          return (
                            <Link key={id} to={`/services/${id}`} className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#E6F0FF] text-[13px] font-medium text-slate-700 hover:text-[#0B4DA2] group/item transition">
                              <span className="truncate pr-2">{s.title}</span>
                              <ArrowRight size={12} className="opacity-0 group-hover/item:opacity-100 transition shrink-0"/>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="col-span-3 border-t border-slate-100 pt-4 mt-2 flex justify-between items-center">
                    <div className="text-xs text-slate-500">28+ specialized eye services under one roof since 2004</div>
                    <Link to="/services" className="bg-[#0B4DA2] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#083A7A] transition flex items-center gap-1">
                      View All Services <ArrowRight size={12}/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/doctor" className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition ${location.pathname === '/doctor' ? 'bg-[#0B4DA2] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>Doctor</Link>
            <Link to="/technology" className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition ${location.pathname === '/technology' ? 'bg-[#0B4DA2] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>Technology</Link>
            <Link to="/contact" className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition ${location.pathname === '/contact' ? 'bg-[#0B4DA2] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>Contact</Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a href="https://wa.me/919322364002" className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-105 transition shadow-sm" title="WhatsApp">
              <span className="font-bold text-[12px]">WA</span>
            </a>
            <Link to="/contact" className="flex items-center gap-2 bg-[#0B4DA2] text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-[#083A7A] transition shadow-lg shadow-blue-900/20">
              <Calendar size={16} /> Book Appointment
            </Link>
          </div>

          {/* Mobile */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-1">
              {mainMenu.map(item => (
                <Link key={item.label} to={item.path} className={`flex justify-between items-center px-4 py-3.5 rounded-xl font-medium ${location.pathname === item.path ? 'bg-[#0B4DA2] text-white' : 'bg-slate-50'}`}>
                  {item.label}
                </Link>
              ))}

              <div>
                <button onClick={()=>setMobileServiceOpen(!mobileServiceOpen)} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-xl font-medium ${location.pathname.startsWith('/services') ? 'bg-[#0B4DA2] text-white' : 'bg-slate-50'}`}>
                  Services (28+) <ChevronDown size={16} className={`transition ${mobileServiceOpen?'rotate-180':''}`}/>
                </button>
                <AnimatePresence>
                  {mobileServiceOpen && (
                    <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="overflow-hidden">
                      <div className="pl-2 mt-3 space-y-4">
                        {serviceGroups.map(g=>(
                          <div key={g.cat}>
                            <div className="text-[11px] font-bold tracking-widest uppercase text-[#0B4DA2] mb-2">{g.cat}</div>
                            <div className="grid gap-1">
                              {g.items.map(id=>{
                                const s=getServiceById(id);
                                if(!s) return null;
                                return <Link key={id} to={`/services/${id}`} className="block px-3 py-2.5 text-[13px] text-slate-600 hover:text-[#0B4DA2] bg-slate-50/50 rounded-xl">• {s.title}</Link>
                              })}
                            </div>
                          </div>
                        ))}
                        <Link to="/services" className="block mt-3 bg-[#0B4DA2] text-white px-4 py-3 rounded-xl text-sm font-semibold text-center">View All 28 Services</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/doctor" className={`flex justify-between items-center px-4 py-3.5 rounded-xl font-medium ${location.pathname === '/doctor' ? 'bg-[#0B4DA2] text-white' : 'bg-slate-50'}`}>Doctor</Link>
              <Link to="/technology" className={`flex justify-between items-center px-4 py-3.5 rounded-xl font-medium ${location.pathname === '/technology' ? 'bg-[#0B4DA2] text-white' : 'bg-slate-50'}`}>Technology</Link>
              <Link to="/contact" className={`flex justify-between items-center px-4 py-3.5 rounded-xl font-medium ${location.pathname === '/contact' ? 'bg-[#0B4DA2] text-white' : 'bg-slate-50'}`}>Contact</Link>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <a href="tel:+919322364002" className="flex items-center justify-center gap-2 border border-slate-200 py-3.5 rounded-xl font-semibold text-sm">
                  <Phone size={16} /> Call Now
                </a>
                <Link to="/contact" className="flex items-center justify-center gap-2 bg-[#0B4DA2] text-white py-3.5 rounded-xl font-semibold text-sm">
                  <Calendar size={16} /> Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
