import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar';
import TopBottomButton from './components/TopBottomButton';
import AIChatToggle from './components/AIChatToggle';
import MobileToggleButtons from './components/MobileToggleButtons';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import DoctorPage from './pages/DoctorPage';
import ContactPage from './pages/ContactPage';
import TechnologyPage from './pages/TechnologyPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostDetail from './pages/BlogPostDetail';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogPostDetail />} />
        <Route path="/blog/:id" element={<BlogPostDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white antialiased selection:bg-[#0B4DA2] selection:text-white w-full relative">
        <TopBar />
        <Header />
        <main className="flex-1 overflow-x-hidden">
          <AnimatedRoutes />
        </main>
        <Footer />

        {/* Top to Bottom floating button */}
        <TopBottomButton />

        {/* AI Chat Toggle */}
        <AIChatToggle />

        {/* Social links & quick contact - right side */}
        <MobileToggleButtons />
      </div>
    </Router>
  );
}
