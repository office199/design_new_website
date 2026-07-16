import SEO from '../components/SEO';
import Technology from '../components/sections/Technology';

export default function TechnologyPage() {
  return (
    <>
      <SEO title="Advanced Technology at Ashu Laser Vision | Eye Hospital Andheri Mumbai" description="World-class diagnostics: Pentacam, OCT Angio, Femto Laser, Green Laser, IOL Master, Visual Field. US FDA approved." url="https://ashulaservision.com/technology" />
      <div className="bg-[#F8FAFF] py-10 border-b">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-[32px] md:text-[48px] font-bold leading-[0.9] tracking-tight">Precision Technology for Better Vision</h1>
          <p className="text-sm text-slate-600 mt-3 max-w-2xl">We invest in advanced US FDA approved platforms for accurate diagnostics & safe surgeries.</p>
        </div>
      </div>
      <Technology />
    </>
  );
}
