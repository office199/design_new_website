import SEO from '../components/SEO';
import PageTransition from '../components/animations/PageTransition';
import { Reveal } from '../components/animations/Reveal';
import Services from '../components/sections/Services';
import { services } from '../data/content';

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Eye Care Services at Ashu Laser Vision Andheri Mumbai",
    "itemListElement": services.map((s,i)=>({
      "@type": "ListItem",
      "position": i+1,
      "name": s.title,
      "url": `https://ashulaservision.com/services/${s.id}`,
      "description": s.short
    }))
  };

  return (
    <PageTransition>
      <SEO
        title={`Eye Care Services in Mumbai - ${services.length}+ Treatments | Ashu Laser Vision`}
        description={`Complete eye care at Ashu Laser Vision Andheri Mumbai - ${services.length}+ services: Cataract phaco femto, LASIK Contoura SMILE ASA ICL, Retina detachment vitrectomy, Diabetic retinopathy anti-VEGF, Glaucoma AGV GATT SLT, Pediatric squint myopia control Ortho-K, Cornea OCT FFA topography pachymetry perimetry. Since 2004, 50K+ surgeries by Dr Shahnawaz Kazi.`}
        keywords={`eye services mumbai, cataract surgery mumbai, lasik mumbai, retina treatment mumbai, glaucoma treatment, diabetic retinopathy, squint surgery, eye tumor, oculoplasty, ${services.map(s=>s.title.toLowerCase()).join(', ')}`}
        url="https://ashulaservision.com/services"
        jsonLd={jsonLd}
      />

      <Reveal>
      <div className="bg-[#0A1931] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B4DA2]/50 to-transparent" />
        <div className="absolute -right-20 top-0 w-[500px] h-[500px] bg-[#0B4DA2]/30 rounded-full blur-[100px]" />
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-20">
          <div className="inline-flex bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">28+ Specialized Eye Services • Since 2004 • 50K+ Surgeries</div>
          <h1 className="text-[34px] md:text-[56px] font-bold leading-[0.9] tracking-tight mt-6 max-w-4xl">
            All Your Eye Care Needs at <span className="text-blue-300">One Place</span>
          </h1>
          <p className="text-sm md:text-[16px] text-blue-100 mt-4 max-w-3xl leading-relaxed">
            World-class treatments with modern technology and compassionate expertise led by Dr. Shahnawaz Kazi (FMRF Sankara Nethralaya, FRCS Glasgow Gold Medalist). From routine checkup to complex vitrectomy, scleral buckle, AGV valve, GATT MIGS, DSEK keratoplasty, laser DCR, orthokeratology - everything under one roof in Andheri West, 2 mins from DN Nagar Metro.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-white text-[#0A1931] px-4 py-2 rounded-full text-xs font-bold">Cataract & IOL</span>
            <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold">LASIK Contoura SMILE</span>
            <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold">Retina Vitrectomy</span>
            <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold">Glaucoma AGV GATT</span>
            <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold">Pediatric Squint</span>
            <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold">Oculoplasty DCR</span>
          </div>
        </div>
      </div>
      </Reveal>

      <Reveal><Services showCategoryFilter={true} /></Reveal>

      {/* SEO content block */}
      <Reveal>
      <div className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 text-sm leading-relaxed text-slate-600">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Why Ashu Laser Vision is Best Eye Hospital for All Eye Services in Andheri Mumbai?</h2>
              <p className="mt-4">Ashu Laser Vision is a premium center for all eye diseases, eye treatments & eye problems providing advanced innovative modern eye care since 2004. Recognized as leading Ophthalmologist, Eye Surgeon & Retina Specialist practice in Mumbai offering complete range of eye & retina services: <strong>Cataract (normal, immature, mature, hypermature, cortical, nuclear, posterior subcapsular, morgagnian) with premium IOL</strong>, <strong>LASIK Micron M7 800Hz fastest in Mumbai</strong> - Contoura, Femto, SMILE Pro, ASA PRK Trans-PRK, PTK, ICL, <strong>Retina - ARMD, Diabetic Retinopathy, Retinal Detachment RRD TRD ERD, ROP, Hypertensive Retinopathy, Anti-VEGF Avastin Eylea, FFA, OCT, Green Laser, Vitrectomy 23/25/27G, Scleral Buckle, Macular Buckle</strong>, <strong>Glaucoma - Open Angle, Angle Closure, Normal Tension, Congenital, Secondary, Pigmentary, Traumatic with Tonometry, Pachymetry, Gonioscopy, OCT RNFL, Perimetry Visual Field, SLT, YAG Iridotomy, GATT MIGS, Ahmed Valve AGV, Trabeculectomy</strong>, <strong>Pediatric - Kids eye problem, Myopia progression control Ortho-K Atropine multifocal, Lazy eye amblyopia Vision Therapy gaming therapy, Strabismus squint prism Botox surgery, Pediatric Cataract, ROP screening</strong>, <strong>Cornea - Keratoconus C3R crosslinking, DSEK DSAEK keratoplasty, Pterygium, Dry eye, Topography Pentacam, Pachymetry</strong>, <strong>Oculoplasty - Ptosis blepharoplasty, lid tumors, orbital, Laser DCR no cut scar, Botox blepharospasm hemifacial</strong>, <strong>Diagnostics - FFA, OCT Angio, Perimetry, Topography, Pachymetry, Biometry IOL Master</strong>, <strong>Laser - Green Diode SLT YAG</strong> and <strong>Home care for elderly</strong>. Emergency 24x7 eye injury corneal tear foreign body hyphema.</p>
              <p className="mt-4">Led by <strong>Dr Shahnawaz Kazi - FMRF Sankara Nethralaya, FRCS Glasgow, FCPS Gold Medalist 1st Rank, FICO UK, DNB, DOMS DO MBBS MA Arabic - 17+ years, 50K+ surgeries</strong> - Cornea transplant, squint, DCR, scleral buckle, vitrectomy TRD VH ERM macular hole gas silicone oil BIOM wide angle lens, nucleus drop subluxated scleral fixation glued IOL trauma hyphema endophthalmitis medical retina laser IVTA anti-VEGF FFA LASIK crosslinking ocular tumors. Teaching experience HOD Professor Bhabha Hospital, PG teacher CPS, Saifee, Wockhardt, Shushrusha, GSBS Trust, Central Railway, etc.</p>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="font-bold">Location & Appointment</div>
                <div className="mt-3 text-xs leading-relaxed">701/2/3, Pearl Plaza Bldg, Opp Andheri Railway Platform No.1, Next to McDonald's, Andheri West Mumbai 400058 - 2 mins DN Nagar Metro. Also at Yari Road Versova. Call 9322364002 / 7506509666 / 7506509777<br/>Email: ashueyelaser@gmail.com care@ashulaservision.com<br/>Hours: Mon-Sat 10AM-8PM Emergency 24x7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Reveal>
    </PageTransition>
  );
}
