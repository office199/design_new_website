import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Eye, ShieldCheck, BookOpen, Share2, Phone, Calendar, AlertTriangle, CheckCircle2, HelpCircle, Stethoscope, Loader2 } from 'lucide-react';
import SEO from '../../components/SEO';
import PageTransition from '../../components/animations/PageTransition';
import { getDiseaseBySlug as getMetaBySlug, eyeDiseases, eyeDiseaseGroups } from '../../data/eyeDiseasesMeta';
import { motion } from 'framer-motion';

// Heading detection
const KNOWN_HEADINGS = [
  'overview','symptoms','causes','diagnosis','management','treatment','types','prevention',
  'outlook','prognosis','living with','frequently','faq','common questions','how are','what are',
  'what causes','how common','how is','how can','when should','additional','complicated',
  'in adults','in children','pediatric','surgery','slit lamp','visual acuity','pupil dilation',
  'keratoconus','optical coherence','retinal imaging','eye health','preventable','regular eye',
  'optic nerve','eye pain','eye redness','eye strain','double vision','color blindness',
  'retinitis','eye infections','congenital','conjunctivitis','keratitis','uveitis','thyroid',
  'eye trauma','eye care specialist','maintain','laser eye','myopia','hyperopia','astigmatism',
  'presbyopia','cataracts','glaucoma','types of','types & surgery','recovery',
  'risk factors','clinical presentation','investigation','differential diagnosis'
];

function isHeadingLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.length > 120) return false;
  if (trimmed.endsWith('.') && trimmed.length > 80) return false;
  if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) return false;
  const lower = trimmed.toLowerCase();
  for (const h of KNOWN_HEADINGS) {
    if (lower.startsWith(h)) return true;
  }
  if (trimmed.length < 60 && !trimmed.includes('?') && trimmed.split(' ').length <= 8) {
    if (/^[A-Z][a-z]+(\s+[A-Z][a-z&()'-]*|\s+of|\s+and|\s+&|\s+\(|\s+for)+$/.test(trimmed)) {
      return true;
    }
  }
  if (/^\d+\.\s+[A-Z]/.test(trimmed) && trimmed.includes('?')) return true;
  if (/^Q\d+:/.test(trimmed)) return true;
  return false;
}

function ContentRenderer({ md }) {
  const sections = useMemo(() => {
    if (!md) return [];
    let text = md;
    text = text.replace(/^#\s+.+$/m, '');
    text = text.replace(/Source:\s+`[^`]+`[^\n]*\n+/g, '');
    text = text.replace(/## Images[\s\S]*?## Extracted text/, '## Extracted text');
    text = text.replace(/!\[.*?\]\(.*?\)\n*/g, '');
    text = text.replace(/<!-- Page \d+ -->\n*/g, '\n');
    const lines = text.split('\n');
    const blocks = [];
    let currentPara = [];
    let currentHeading = null;
    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        if (currentPara.length) {
          blocks.push({ type: currentHeading ? 'heading' : 'para', heading: currentHeading, text: currentPara.join(' ') });
          currentPara = [];
          currentHeading = null;
        }
        continue;
      }
      if (line.startsWith('## ')) {
        if (currentPara.length) {
          blocks.push({ type: 'para', text: currentPara.join(' ') });
          currentPara = [];
        }
        blocks.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
        continue;
      }
      if (isHeadingLine(line)) {
        if (currentPara.length) {
          blocks.push({ type: 'para', text: currentPara.join(' ') });
          currentPara = [];
        }
        blocks.push({ type: 'h3', text: line });
        continue;
      }
      if (line.startsWith('•') || line.startsWith('- ') || line.startsWith('* ') || /^\d+\.\s+/.test(line)) {
        if (currentPara.length) {
          blocks.push({ type: 'para', text: currentPara.join(' ') });
          currentPara = [];
        }
        blocks.push({ type: 'list-item', text: line.replace(/^[•\-\*]\s*/, '').replace(/^\d+\.\s+/, '') });
        continue;
      }
      currentPara.push(line);
    }
    if (currentPara.length) blocks.push({ type: 'para', text: currentPara.join(' ') });
    const merged = [];
    let listBuffer = [];
    for (const b of blocks) {
      if (b.type === 'list-item') listBuffer.push(b.text);
      else {
        if (listBuffer.length) {
          merged.push({ type: 'list', items: [...listBuffer] });
          listBuffer = [];
        }
        merged.push(b);
      }
    }
    if (listBuffer.length) merged.push({ type: 'list', items: [...listBuffer] });
    return merged;
  }, [md]);

  return (
    <div className="space-y-6">
      {sections.map((block, idx) => {
        if (block.type === 'h2') {
          return <h2 key={idx} className="text-2xl lg:text-3xl font-bold font-display mt-10 mb-4 text-slate-900">{block.text}</h2>;
        }
        if (block.type === 'h3') {
          const isFAQ = /^\d+\.|^Q\d+:|^\?|faq|questions/i.test(block.text);
          return (
            <h3 key={idx} className={`text-lg lg:text-xl font-bold font-display mt-8 mb-3 flex items-start gap-2 ${isFAQ ? 'text-[#0B4DA2] bg-blue-50 px-4 py-3 rounded-2xl border border-blue-100' : 'text-slate-900'}`}>
              {!isFAQ && <span className="w-1.5 h-6 bg-[#0B4DA2] rounded-full mt-1 shrink-0 hidden md:block" />}
              <span>{block.text}</span>
            </h3>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={idx} className="space-y-3 my-6">
              {block.items.map((it, i2)=>(
                <li key={i2} className="flex gap-3 text-[14.5px] leading-relaxed text-slate-700 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                  <CheckCircle2 size={18} className="text-[#0B4DA2] shrink-0 mt-0.5" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'para') {
          if (block.text.startsWith('A:') || block.text.startsWith('Ans:')) {
            return <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-[14px] leading-relaxed text-slate-700">{block.text}</div>;
          }
          return <p key={idx} className="text-[15px] leading-[1.8] text-slate-700">{block.text}</p>;
        }
        return null;
      })}
    </div>
  );
}

export default function EyeDiseaseDetailPage() {
  const { slug } = useParams();
  const meta = getMetaBySlug(slug);

  const [fullData, setFullData] = useState(null);
  const [contentMd, setContentMd] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!meta) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Try dynamic import of full data (contains contentMd)
        const mod = await import('../../data/eyeDiseasesData.js');
        const found = mod.eyeDiseases.find(d => d.slug === slug);
        if (!cancelled) {
          if (found) {
            setFullData(found);
            setContentMd(found.contentMd);
          } else {
            // fallback fetch from public folder
            const folder = meta.folder;
            const res = await fetch(`/eye-diseases/${folder}/content.md`);
            if (res.ok) {
              const txt = await res.text();
              setContentMd(txt);
              setFullData({
                title: meta.title,
                slug: meta.slug,
                folder: meta.folder,
                index: meta.index,
                images: [],
                shortDesc: meta.shortDesc,
                seoTitle: `${meta.title} - Causes, Symptoms, Diagnosis & Treatment | Ashu Laser Vision Mumbai`,
                seoDescription: `Learn about ${meta.title}: causes, symptoms, diagnosis, treatment, prevention & FAQs. Expert care by Dr. Shahnawaz Kazi at Ashu Laser Vision.`,
                keywords: `${meta.title}, eye diseases Mumbai, Ashu Laser Vision`
              });
            } else {
              throw new Error('Content not found');
            }
          }
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          // try fetch anyway
          try {
            const folder = meta.folder;
            const res = await fetch(`/eye-diseases/${folder}/content.md`);
            if (res.ok) {
              const txt = await res.text();
              setContentMd(txt);
              setFullData({
                title: meta.title,
                slug: meta.slug,
                folder: meta.folder,
                index: meta.index,
                images: [],
                shortDesc: meta.shortDesc,
                seoTitle: `${meta.title} - Causes, Symptoms, Diagnosis & Treatment | Ashu Laser Vision Mumbai`,
                seoDescription: `Learn about ${meta.title}: causes, symptoms, diagnosis, treatment, prevention & FAQs. Expert care by Dr. Shahnawaz Kazi at Ashu Laser Vision.`,
                keywords: `${meta.title}, eye diseases Mumbai, Ashu Laser Vision`
              });
            } else {
              setError('Failed to load content');
            }
          } catch {
            setError('Failed to load content');
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [slug, meta]);

  const related = useMemo(() => {
    if (!meta) return [];
    const group = eyeDiseaseGroups.find(g => g.slugs.includes(meta.slug));
    if (group) {
      return group.slugs.filter(s => s !== meta.slug).slice(0, 6).map(s => getMetaBySlug(s)).filter(Boolean);
    }
    const idx = eyeDiseases.findIndex(d => d.slug === meta.slug);
    return [...eyeDiseases.slice(Math.max(0, idx - 3), idx), ...eyeDiseases.slice(idx + 1, idx + 4)].slice(0, 6);
  }, [meta]);

  const group = useMemo(() => meta ? eyeDiseaseGroups.find(g=>g.slugs.includes(meta.slug)) : null, [meta]);

  if (!meta && !loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"><Eye size={32} className="text-slate-400" /></div>
          <h1 className="text-2xl font-bold font-display">Condition not found</h1>
          <p className="text-slate-500 mt-3">The eye condition "{slug}" does not exist. Browse all {eyeDiseases.length} conditions.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link to="/eye-diseases" className="bg-[#0B4DA2] text-white px-6 py-3 rounded-full font-semibold text-sm">Browse All Conditions</Link>
            <Link to="/" className="bg-slate-100 px-6 py-3 rounded-full font-semibold text-sm">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !fullData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-[#0B4DA2] mx-auto mb-4" />
          <div className="font-semibold text-slate-900">Loading {meta?.title || slug} guide...</div>
          <div className="text-xs text-slate-500 mt-1">Expert reviewed by Dr. Shahnawaz Kazi FMRF FRCS</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-500 font-semibold">Failed to load content</div>
          <Link to="/eye-diseases" className="mt-4 inline-block bg-[#0B4DA2] text-white px-6 py-2 rounded-full text-sm">Back to list</Link>
        </div>
      </div>
    );
  }

  const disease = fullData;
  const imageBase = `/eye-diseases/${disease.folder}/images`;
  const images = (disease.images || []).map(img => `${imageBase}/${img.file.split('/').pop()}`);
  const fallbackImages = disease.folder ? [] : [];

  // SEO
  const breadcrumbs = [
    { name: 'Home', url: 'https://ashulaservision.com/' },
    { name: 'Eye Diseases & Conditions', url: 'https://ashulaservision.com/eye-diseases' },
    { name: disease.title, url: `https://ashulaservision.com/eye-diseases/${disease.slug}` }
  ];

  // FAQs extraction
  const faqs = [];
  const faqRegex = /(?:Q\d+:\s*([^\n]+)\nA:\s*([^\n]+(?:\n[^\n]+)*))/g;
  let match;
  while ((match = faqRegex.exec(contentMd)) !== null) {
    faqs.push({ q: match[1].trim(), a: match[2].trim().slice(0, 500) });
  }
  if (faqs.length === 0) {
    const lines = contentMd.split('\n');
    for (let i=0;i<lines.length;i++) {
      const l = lines[i].trim();
      if (/^\d+\.\s+.*\?$/.test(l)) {
        const next = lines[i+1]?.trim() || '';
        if (next && !/^\d+\./.test(next)) {
          faqs.push({ q: l.replace(/^\d+\.\s+/, ''), a: next.slice(0, 400) });
        }
      }
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": disease.seoTitle,
    "description": disease.seoDescription,
    "url": `https://ashulaservision.com/eye-diseases/${disease.slug}`,
    "about": {
      "@type": "MedicalCondition",
      "name": disease.title,
      "description": disease.shortDesc,
      "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Eye" }
    },
    "author": { "@type": "Person", "name": "Dr. Shahnawaz Kazi", "jobTitle": "Founder & Medical Director" },
    "publisher": { "@type": "Organization", "name": "Ashu Laser Vision", "logo": { "@type": "ImageObject", "url": "https://ashulaservision.com/images/ashu-logo.png" } },
    "lastReviewed": new Date().toISOString().split('T')[0]
  };

  return (
    <PageTransition>
      <SEO
        title={disease.seoTitle}
        description={disease.seoDescription}
        keywords={disease.keywords}
        url={`https://ashulaservision.com/eye-diseases/${disease.slug}`}
        breadcrumbs={breadcrumbs}
        jsonLd={jsonLd}
        faqSchema={faqs.length ? faqs : null}
        image={images[0] || '/images/clinic/hero-og.jpg'}
        type="article"
      />

      <div className="bg-[#F8FAFC] border-b border-slate-100 sticky top-[72px] lg:top-[84px] z-20 backdrop-blur">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-[12px] text-slate-600 shrink-0">
            <Link to="/" className="hover:text-[#0B4DA2]">Home</Link>
            <span>/</span>
            <Link to="/eye-diseases" className="hover:text-[#0B4DA2]">Eye Diseases</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] md:max-w-none">{disease.title}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={()=>navigator.share ? navigator.share({ title: disease.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)} className="hidden md:flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-slate-50">
              <Share2 size={14} /> Share
            </button>
            <Link to="/eye-diseases" className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#0B4DA2] transition">
              <ArrowLeft size={14} /> All {eyeDiseases.length}
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-white pt-8 lg:pt-12 pb-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-12 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-[#E6F0FF] text-[#0B4DA2] text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">EXPERT REVIEWED • {disease.index}/151</span>
                {group && <span className="bg-slate-900 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">{group.label}</span>}
                <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1"><ShieldCheck size={12} /> DR. SHAHNAWAZ KAZI • FMRF, FRCS</span>
              </div>

              <h1 className="text-4xl lg:text-[48px] font-bold font-display leading-[0.95] tracking-tight text-slate-900">
                {disease.title}
              </h1>

              <p className="mt-5 text-[17px] leading-relaxed text-slate-600 max-w-2xl">
                {disease.shortDesc}
              </p>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { k: 'Pages', v: `${disease.pages?.[0] || ''}-${disease.pages?.[1] || ''}`, icon: BookOpen },
                  { k: 'Condition No', v: `#${String(disease.index).padStart(3,'0')}`, icon: Eye },
                  { k: 'Reviewed', v: 'Dr. Kazi', icon: Stethoscope },
                  { k: 'Hospital', v: 'Since 2004', icon: ShieldCheck }
                ].map(item=>(
                  <div key={item.k} className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-slate-500"><item.icon size={12} /> {item.k}</div>
                    <div className="text-[13px] font-semibold text-slate-900 mt-1">{item.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="bg-[#0B4DA2] text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#083A7A] transition flex items-center gap-2 shadow-lg shadow-blue-900/20">
                  <Calendar size={16} /> Book Eye Checkup
                </Link>
                <a href="tel:+919322364002" className="bg-white border border-slate-200 px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-50 transition flex items-center gap-2">
                  <Phone size={16} /> 93223 64002
                </a>
              </div>

              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[12.5px] leading-relaxed text-amber-900">
                  <span className="font-bold">Medical Disclaimer:</span> This guide is for educational purposes and does not replace professional medical advice. For diagnosis and treatment of {disease.title}, consult Dr. Shahnawaz Kazi at Ashu Laser Vision, Andheri West Mumbai. Emergency? Call 93223 64002 24x7.
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-[140px] space-y-6">
              {images.length>0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {images.map((src, i)=>(
                    <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} className="group relative rounded-[24px] overflow-hidden border border-slate-100 bg-slate-50 aspect-[4/3]">
                      <img src={src} alt={`${disease.title} - ${i+1}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" loading="lazy" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="text-white text-xs font-medium">{disease.title} • Clinical Image {i+1}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                  <Eye size={32} className="mx-auto text-slate-400 mb-3" />
                  <div className="text-sm font-medium text-slate-600">Clinical illustrations for {disease.title}</div>
                  <div className="text-xs text-slate-400 mt-1">Available during consultation at Ashu Laser Vision</div>
                </div>
              )}

              <div className="bg-slate-900 text-white rounded-[24px] p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B4DA2]/30 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <h4 className="font-bold font-display text-lg">Expert Care at Ashu Laser Vision</h4>
                  <p className="text-slate-300 text-[13px] mt-2 leading-relaxed">
                    Super Specialty Eye Hospital with 28+ services: Cataract, LASIK Contoura SMILE, Retina Vitrectomy, Glaucoma AGV GATT SLT, Pediatric Squint Ortho-K, Cornea DSEK, Oculoplasty Laser DCR, OCT, FFA, Pentacam.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white/10 border border-white/10 rounded-xl px-3 py-2">📍 Opp Andheri Rly Platform 1</div>
                    <div className="bg-white/10 border border-white/10 rounded-xl px-3 py-2">⏰ Mon-Sat 10AM-8PM • 24x7 Emergency</div>
                  </div>
                  <Link to="/contact" className="mt-5 w-full bg-white text-slate-900 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition">
                    Book at Andheri West <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {related.length>0 && (
                <div className="bg-white border border-slate-100 rounded-[24px] p-6">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><BookOpen size={16} /> Related Conditions</h4>
                  <div className="mt-4 space-y-2">
                    {related.map(r=>(
                      <Link key={r.slug} to={`/eye-diseases/${r.slug}`} className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#E6F0FF] border border-transparent hover:border-blue-100 transition">
                        <div>
                          <div className="text-[13px] font-semibold text-slate-900 group-hover:text-[#0B4DA2]">{r.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{r.shortDesc.slice(0,60)}...</div>
                        </div>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0B4DA2] group-hover:translate-x-0.5 transition" />
                      </Link>
                    ))}
                  </div>
                  <Link to="/eye-diseases" className="mt-4 block text-center bg-slate-50 hover:bg-slate-100 border border-slate-100 py-2.5 rounded-full text-xs font-semibold">View All 151 Guides</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-12 lg:py-16 border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
            <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-slate-100 p-6 lg:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#0B4DA2] text-white flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="font-bold font-display text-xl text-slate-900">Complete Guide: {disease.title}</h2>
                  <div className="text-xs text-slate-500 mt-1">Source: Eye Diseases & Conditions PDF Pages {disease.pages?.[0]}-{disease.pages?.[1]} • Expert Reviewed by Dr. Shahnawaz Kazi FMRF FRCS</div>
                </div>
              </div>

              <ContentRenderer md={contentMd} />

              <div className="mt-12 bg-gradient-to-br from-[#0B4DA2] to-[#083A7A] rounded-[24px] p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/3" />
                <div className="relative">
                  <h3 className="text-xl font-bold font-display">Concerned about {disease.title}?</h3>
                  <p className="text-blue-100 text-sm mt-2 leading-relaxed">Early diagnosis prevents vision loss. Book comprehensive eye exam with OCT, FFA, Pentacam at Ashu Laser Vision Andheri West—same-day appointments, 20+ years excellence, 50K+ surgeries.</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/contact" className="bg-white text-[#0B4DA2] px-6 py-3 rounded-full font-bold text-sm">Book Consultation</Link>
                    <Link to="/eye-diseases" className="bg-white/15 border border-white/20 px-6 py-3 rounded-full font-semibold text-sm">Explore 151 Conditions</Link>
                  </div>
                </div>
              </div>

              {faqs.length>0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold font-display flex items-center gap-2 mb-6"><HelpCircle size={20} className="text-[#0B4DA2]" /> Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {faqs.map((f,i)=>(
                      <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                        <div className="font-semibold text-slate-900 text-[14px]">Q: {f.q}</div>
                        <div className="text-[13.5px] text-slate-600 mt-2 leading-relaxed">A: {f.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6 lg:sticky lg:top-[140px] self-start">
              <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm">
                <h4 className="font-bold text-sm uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <Clock size={14} /> What you'll learn
                </h4>
                <ul className="mt-4 space-y-2.5 text-[13px] text-slate-600">
                  {[
                    `What is ${disease.title}? Overview & How Common`,
                    'Symptoms to watch for',
                    'Causes & Risk Factors',
                    'Diagnosis & Tests (OCT, FFA, etc)',
                    'Treatment & Management Options',
                    'Types & Surgery if needed',
                    'Prevention & Living with condition',
                    'Prognosis & FAQs'
                  ].map((t,i)=>(
                    <li key={i} className="flex gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#E6F0FF] text-[#0B4DA2] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-100 rounded-[24px] p-6">
                <h4 className="font-bold text-sm">Navigate 151 Conditions</h4>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(() => {
                    const currentIdx = eyeDiseases.findIndex(d=>d.slug===disease.slug);
                    const prev = eyeDiseases[currentIdx-1];
                    const next = eyeDiseases[currentIdx+1];
                    return (
                      <>
                        {prev && <Link to={`/eye-diseases/${prev.slug}`} className="group border border-slate-100 rounded-xl p-3 hover:border-[#0B4DA2]/20 hover:bg-blue-50/50 transition">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">Previous</div>
                          <div className="text-[12px] font-semibold text-slate-900 group-hover:text-[#0B4DA2] line-clamp-2 mt-1">{prev.title}</div>
                        </Link>}
                        {next && <Link to={`/eye-diseases/${next.slug}`} className="group border border-slate-100 rounded-xl p-3 hover:border-[#0B4DA2]/20 hover:bg-blue-50/50 transition">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">Next</div>
                          <div className="text-[12px] font-semibold text-slate-900 group-hover:text-[#0B4DA2] line-clamp-2 mt-1">{next.title}</div>
                        </Link>}
                      </>
                    );
                  })()}
                </div>
                <div className="mt-4">
                  <Link to="/eye-diseases" className="w-full bg-slate-900 text-white py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#0B4DA2] transition">
                    Browse All Conditions <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {group && (
                <div className="bg-white border border-slate-100 rounded-[24px] p-6">
                  <h4 className="font-bold text-sm">More in {group.label}</h4>
                  <p className="text-xs text-slate-500 mt-1">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.slugs.slice(0,12).map(s=>{
                      const dd = eyeDiseases.find(x=>x.slug===s);
                      if (!dd) return null;
                      return (
                        <Link key={s} to={`/eye-diseases/${s}`} className={`text-[11px] px-3 py-1.5 rounded-full border font-medium transition ${s===disease.slug ? 'bg-[#0B4DA2] text-white border-[#0B4DA2]' : 'bg-slate-50 border-slate-100 hover:bg-[#E6F0FF] hover:border-blue-100 hover:text-[#0B4DA2]'}`}>
                          {dd.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
