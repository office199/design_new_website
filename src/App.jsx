import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar';
import TopBottomButton from './components/TopBottomButton';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import DoctorPage from './pages/DoctorPage';
import ContactPage from './pages/ContactPage';
import TechnologyPage from './pages/TechnologyPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white antialiased selection:bg-[#0B4DA2] selection:text-white">
        <TopBar />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />

        {/* Top to Bottom floating button */}
        <TopBottomButton />

        {/* floating whatsapp & call - right side */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
          <a href="https://wa.me/919322364002" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.4)] flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group relative">
            <span className="text-[10px] font-bold tracking-widest">WA</span>
            {/* tooltip */}
            <span className="absolute right-[68px] top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Chat on WhatsApp</span>
            {/* pulse */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
          </a>
          <a href="tel:+919322364002" aria-label="Call Now"
            className="w-14 h-14 rounded-full bg-[#0B4DA2] shadow-[0_8px_24px_rgba(11,77,162,0.4)] flex items-center justify-center text-white hover:scale-110 transition-all duration-300 lg:hidden relative">
            <span className="text-lg">📞</span>
          </a>
        </div>
      </div>
    </Router>
  );
}
