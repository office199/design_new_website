import SEO from '../components/SEO';
import Services from '../components/sections/Services';

export default function ServicesPage() {
  return (
    <>
      <SEO title="Our Services - Eye Treatments in Mumbai | Ashu Laser Vision" description="Complete eye care: Cataract, LASIK, Retina, Glaucoma, Cornea, Pediatric & Squint. Advanced laser treatments in Andheri Mumbai." url="https://ashulaservision.com/services" />
      <div className="bg-[#F8FAFF] py-10 border-b">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-[32px] md:text-[48px] font-bold leading-[0.9] tracking-tight">All Your Eye Care Needs at One Place</h1>
          <p className="text-sm text-slate-600 mt-3 max-w-2xl">World-class treatments with modern technology and compassionate expertise. From routine checkup to complex surgeries.</p>
        </div>
      </div>
      <Services />
    </>
  );
}
