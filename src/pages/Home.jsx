import SEO from '../components/SEO';
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
    <>
      <SEO
        title="Ashu Laser Vision - Best Eye Hospital in Andheri Mumbai | Cataract, LASIK & Retina"
        description="Super Multi-Specialty Eye & Retina Hospital in Andheri Mumbai. Led by Dr. Shahnawaz Kazi - FMRF, FRCS, Gold Medalist. Advanced Cataract, LASIK, Retina, Glaucoma care since 2004."
        url="https://ashulaservision.com/"
      />
      <Hero />
      <Stats />
      <Services limit={6} />
      <About />
      <Doctor />
      <Technology />
      <Testimonials />
      <AppointmentCTA />
    </>
  );
}
