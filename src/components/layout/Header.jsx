import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Calendar, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menu = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { 
    label: "Services", 
    path: "/services",
    children: [
      { label: "Cataract Surgery", path: "/services/cataract" },
      { label: "LASIK & Refractive", path: "/services/lasik" },
      { label: "Retina Treatment", path: "/services/retina" },
      { label: "Glaucoma", path: "/services/glaucoma" },
      { label: "Cornea Services", path: "/services/cornea" },
      { label: "Pediatric & Squint", path: "/services/pediatric" },
    ]
  },
  { label: "Doctor", path: "/doctor" },
  { label: "Technology", path: "/technology" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header className={`sticky top-0 z-40 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg border-b border-slate-100' : 'shadow-sm'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] lg:h-[84px] gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-[#0B4DA2] flex items-center justify-center text-white">
              <Eye size={26} />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[18px] lg:text-[20px] tracking-tight text-[#0B4DA2] font-display">Ashu Laser Vision</div>
              <div className="text-[11px] lg:text-[12px] text-slate-500 font-medium tracking-widest uppercase">Super Specialty Eye Hospital</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {menu.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      onMouseEnter={() => setServiceOpen(true)}
                      onMouseLeave={() => setServiceOpen(false)}
                      className={`flex items-center gap-1 px-4 py-2.5 rounded-full text-[14px] font-medium transition ${location.pathname.startsWith('/services') ? 'bg-[#0B4DA2] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                    >
                      {item.label} <ChevronDown size={14} className={`transition ${serviceOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div 
                      onMouseEnter={() => setServiceOpen(true)}
                      onMouseLeave={() => setServiceOpen(false)}
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all ${serviceOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 w-[320px] grid gap-1">
                        {item.children.map(ch => (
                          <Link key={ch.path} to={ch.path} className="px-4 py-3 rounded-xl hover:bg-[#E6F0FF] text-sm font-medium text-slate-700 hover:text-[#0B4DA2] flex justify-between items-center group/item">
                            {ch.label}
                            <span className="opacity-0 group-hover/item:opacity-100 translate-x-0 transition">→</span>
                          </Link>
                        ))}
                        <Link to="/services" className="mt-1 bg-[#0B4DA2] text-white px-4 py-3 rounded-xl text-sm font-semibold text-center">View All Services</Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={item.path} className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition ${location.pathname === item.path ? 'bg-[#0B4DA2] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href="https://wa.me/919322364002" className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-105 transition">
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
            className="lg:hidden border-t bg-white overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {menu.map(item => (
                <div key={item.label}>
                  <Link to={item.path} className={`flex justify-between items-center px-4 py-3.5 rounded-xl font-medium ${location.pathname === item.path ? 'bg-[#0B4DA2] text-white' : 'bg-slate-50'}`}>
                    {item.label}
                    {item.children && <ChevronDown size={16} />}
                  </Link>
                  {item.children && (
                    <div className="pl-4 mt-2 space-y-1">
                      {item.children.map(c => (
                        <Link key={c.path} to={c.path} className="block px-4 py-2.5 text-sm text-slate-600 hover:text-[#0B4DA2]">• {c.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
