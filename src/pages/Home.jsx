import SEO from '../components/SEO';
import PageTransition from '../components/animations/PageTransition';
import { Reveal } from '../components/animations/Reveal';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Doctor from '../components/sections/Doctor';
import Technology from '../components/sections/Technology';
import Testimonials from '../components/sections/Testimonials';
import AppointmentCTA from '../components/sections/AppointmentCTA';

export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="Ashu Laser Vision - Best Eye Hospital in Andheri Mumbai | Cataract, LASIK & Retina"
        description="Super Multi-Specialty Eye & Retina Hospital in Andheri Mumbai. Led by Dr. Shahnawaz Kazi - FMRF, FRCS, Gold Medalist. Advanced Cataract, LASIK, Retina, Glaucoma care since 2004."
        url="https://ashulaservision.com/"
      />
      <Hero />
      <Reveal><Stats /></Reveal>
      <Reveal><Services limit={6} /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Doctor /></Reveal>
      <Reveal><Technology /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><AppointmentCTA /></Reveal>
    </PageTransition>
  );
}
