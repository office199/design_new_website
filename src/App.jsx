import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import DoctorPage from './pages/DoctorPage';
import ContactPage from './pages/ContactPage';
import TechnologyPage from './pages/TechnologyPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0,0), [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
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

        {/* floating whatsapp - like Dr Agarwal & ASG */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
          <a href="https://wa.me/919322364002" target="_blank" className="w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center text-white hover:scale-110 transition">
            <span className="text-xs font-bold">WA</span>
          </a>
          <a href="tel:+919322364002" className="w-14 h-14 rounded-full bg-[#0B4DA2] shadow-xl flex items-center justify-center text-white hover:scale-110 transition lg:hidden">
            📞
          </a>
        </div>
      </div>
    </Router>
  );
}
