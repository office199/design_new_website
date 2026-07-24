import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, Eye, ShieldCheck, BookOpen, Share2, Phone, Calendar, AlertTriangle, CheckCircle2, HelpCircle, Stethoscope, Loader2, ScrollText, MapPin, Clock, Plus, Sparkles, FileText } from 'lucide-react';
import SEO from '../../components/SEO';
import PageTransition from '../../components/animations/PageTransition';
import { getDiseaseBySlug as getMetaBySlug, eyeDiseases, eyeDiseaseGroups } from '../../data/eyeDiseasesMeta';
import WhatsAppIcon from '../../components/icons/WhatsAppIcon';
import { motion, useScroll } from 'framer-motion';

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

function parseContent(md) {
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
      blocks.push({ type: 'list-item', text: line.replace(/^[•\-*]\s*/, '').replace(/^\d+\.\s+/, '') });
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
}

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function ContentRenderer({ blocks }) {
  let h2Count = 0;
  return (
    <div>
      {blocks.map((block, idx) => {
        if (block.type === 'h2') {
          h2Count += 1;
          return (
            <div key={idx} id={`sec-${idx}`} data-toc="h2" className="scroll-mt-[100px] lg:scroll-mt-[124px] mt-14 first:mt-0 mb-6 flex items-start gap-4">
              <span className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] text-white flex items-center justify-center font-bold font-display text-[15px] shadow-lg shadow-blue-900/25">
                {String(h2Count).padStart(2, '0')}
              </span>
              <div className="min-w-0 pt-0.5">
                <h2 className="text-[22px] lg:text-[26px] font-bold font-display tracking-tight text-slate-900 leading-tight">{block.text}</h2>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#00A6CB] to-[#00D4AA] mt-2.5" />
              </div>
            </div>
          );
        }
        if (block.type === 'h3') {
          const isFAQ = /^\d+\.|^Q\d+:|^\?|faq|questions/i.test(block.text);
          if (isFAQ) {
            return (
              <h3 key={idx} id={`sec-${idx}`} data-toc="h3" className="scroll-mt-[100px] lg:scroll-mt-[124px] mt-8 mb-4 flex items-center gap-3 text-[15px] lg:text-base font-bold font-display text-[#0B4DA2] bg-gradient-to-r from-[#F0FAFF] to-[#E6F0FF] px-5 py-3.5 rounded-2xl border border-cyan-100">
                <HelpCircle size={17} className="text-[#00A6CB] shrink-0" />
                <span>{block.text}</span>
              </h3>
            );
          }
          return (
            <h3 key={idx} id={`sec-${idx}`} data-toc="h3" className="scroll-mt-[100px] lg:scroll-mt-[124px] text-[17px] lg:text-lg font-bold font-display mt-9 mb-4 flex items-center gap-3 text-slate-900">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#0B4DA2] to-[#00D4AA] shrink-0" />
              <span>{block.text}</span>
            </h3>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={idx} className="space-y-2.5 my-7">
              {block.items.map((it, i2) => (
                <li key={i2} className="group flex gap-3.5 text-[14.5px] leading-relaxed text-slate-700 bg-white border border-slate-200/80 rounded-2xl px-4.5 py-4 hover:border-[#0B4DA2]/30 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300">
                  <span className="w-7 h-7 rounded-lg bg-[#E6F0FF] text-[#0B4DA2] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0B4DA2] group-hover:text-white transition-colors duration-300">
                    <CheckCircle2 size={15} />
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'para') {
          if (block.text.startsWith('A:') || block.text.startsWith('Ans:')) {
            return (
              <div key={idx} className="my-6 relative overflow-hidden rounded-2xl border border-cyan-100 bg-[#F0FAFF] p-5 pl-6 text-[14px] leading-relaxed text-slate-700">
                <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#00A6CB] to-[#0B4DA2]" />
                {block.text}
              </div>
            );
          }
          return <p key={idx} className="text-[15.5px] leading-[1.85] text-slate-600 my-5">{block.text}</p>;
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
  const [activeId, setActiveId] = useState(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!meta) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      setActiveId(null);
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
      return group.slugs.filter(s => s !== meta.slug).slice(0, 8).map(s => getMetaBySlug(s)).filter(Boolean);
    }
    const idx = eyeDiseases.findIndex(d => d.slug === meta.slug);
    return [...eyeDiseases.slice(Math.max(0, idx - 4), idx), ...eyeDiseases.slice(idx + 1, idx + 5)].slice(0, 8);
  }, [meta]);

  const group = useMemo(() => meta ? eyeDiseaseGroups.find(g => g.slugs.includes(meta.slug)) : null, [meta]);

  // Parsed article blocks + table of contents
  const blocks = useMemo(() => parseContent(contentMd), [contentMd]);
  const tocItems = useMemo(() => blocks
    .map((b, idx) => (b.type === 'h2' || b.type === 'h3') ? { id: `sec-${idx}`, text: b.text, level: b.type } : null)
    .filter(t => t && t.text.toLowerCase() !== 'extracted text' && !t.text.endsWith('.')), [blocks]);

  // Scroll-spy for the TOC
  useEffect(() => {
    if (!tocItems.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: '-110px 0px -62% 0px', threshold: 0 });
    tocItems.forEach(t => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  if (!meta && !loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="text-center max-w-md bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl shadow-blue-900/5">
          <div className="w-20 h-20 bg-gradient-to-br from-[#E6F0FF] to-[#F0FAFF] rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100"><Eye size={32} className="text-[#0B4DA2]" /></div>
          <h1 className="text-2xl font-bold font-display tracking-tight">Condition not found</h1>
          <p className="text-slate-500 mt-3 text-sm leading-relaxed">The eye condition "{slug}" does not exist. Browse all {eyeDiseases.length} expert-reviewed conditions.</p>
          <div className="mt-7 flex gap-3 justify-center">
            <Link to="/eye-diseases" className="bg-[#0B4DA2] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#083A7A] transition shadow-lg shadow-blue-900/20">Browse All Conditions</Link>
            <Link to="/" className="bg-slate-100 px-6 py-3 rounded-full font-semibold text-sm hover:bg-slate-200 transition">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !fullData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full border-4 border-[#E6F0FF]" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0B4DA2] animate-spin" />
            <Loader2 size={22} className="absolute inset-0 m-auto text-[#0B4DA2]" />
          </div>
          <div className="font-bold font-display text-slate-900">Loading {meta?.title || slug} guide...</div>
          <div className="text-xs text-slate-500 mt-1.5">Expert reviewed by Dr. Shahnawaz Kazi FMRF FRCS</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="text-center bg-white border border-slate-200 rounded-[32px] p-10">
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4"><AlertTriangle size={22} className="text-red-500" /></div>
          <div className="text-red-500 font-bold font-display">Failed to load content</div>
          <Link to="/eye-diseases" className="mt-5 inline-block bg-[#0B4DA2] text-white px-6 py-2.5 rounded-full text-sm font-semibold">Back to list</Link>
        </div>
      </div>
    );
  }

  const disease = fullData;
  const imageBase = `/eye-diseases/${disease.folder}/images`;
  const images = (disease.images || []).map(img => `${imageBase}/${img.file.split('/').pop()}`);
  const relatedThumb = (r) => r.images?.[0] ? `/eye-diseases/${r.folder}/images/${r.images[0].file.split('/').pop()}` : null;
  const readMinutes = Math.max(3, Math.round((contentMd || '').split(/\s+/).length / 180));

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
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (/^\d+\.\s+.*\?$/.test(l)) {
        const next = lines[i + 1]?.trim() || '';
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

  const currentIdx = eyeDiseases.findIndex(d => d.slug === disease.slug);
  const prevDisease = eyeDiseases[currentIdx - 1];
  const nextDisease = eyeDiseases[currentIdx + 1];

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

      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 right-0 top-[72px] lg:top-[84px] h-[3px] z-40 origin-left bg-gradient-to-r from-[#00A6CB] via-[#0B4DA2] to-[#00D4AA]"
      />

      {/* ---------- DARK HERO ---------- */}
      <section className="relative overflow-hidden bg-[#07152E] text-white">
        {/* glows + grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full bg-[#0B4DA2]/40 blur-[130px]" />
          <div className="absolute bottom-[-180px] left-[-120px] w-[520px] h-[520px] rounded-full bg-[#00A6CB]/20 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_90%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07152E] to-transparent" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 pt-6 lg:pt-9 pb-12 lg:pb-16">
          {/* breadcrumb + actions */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <nav className="flex items-center gap-1.5 text-[12px] text-slate-400 min-w-0">
              <Link to="/" className="hover:text-white transition shrink-0">Home</Link>
              <ChevronRight size={12} className="text-slate-600 shrink-0" />
              <Link to="/eye-diseases" className="hover:text-white transition shrink-0">Eye Diseases</Link>
              <ChevronRight size={12} className="text-slate-600 shrink-0" />
              <span className="text-white font-semibold truncate max-w-[180px] md:max-w-md">{disease.title}</span>
            </nav>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigator.share ? navigator.share({ title: disease.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}
                className="hidden md:flex items-center gap-1.5 bg-white/[0.07] backdrop-blur border border-white/10 px-3.5 py-2 rounded-full text-xs font-medium hover:bg-white/[0.14] transition"
              >
                <Share2 size={13} /> Share Guide
              </button>
              <Link to="/eye-diseases" className="flex items-center gap-1.5 bg-white text-slate-900 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-[#00D4AA] hover:text-slate-950 transition">
                <ArrowLeft size={13} /> All {eyeDiseases.length}
              </Link>
            </div>
          </div>

          <div className="mt-9 lg:mt-12 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-14 items-center">
            {/* Left: copy */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30 text-[10.5px] font-bold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full">
                  <Sparkles size={11} /> Expert Reviewed • {disease.index}/151
                </span>
                {group && <span className="inline-flex items-center bg-white/[0.08] border border-white/15 text-slate-200 text-[10.5px] font-bold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full">{group.label}</span>}
                <span className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/15 text-slate-200 text-[10.5px] font-bold px-3.5 py-1.5 rounded-full">
                  <ShieldCheck size={12} className="text-[#00A6CB]" /> Dr. Shahnawaz Kazi • FMRF, FRCS
                </span>
              </div>

              <h1 className="mt-6 text-[40px] md:text-[54px] lg:text-[62px] font-bold font-display leading-[0.98] tracking-tight">
                {disease.title}
              </h1>
              <div className="mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#00A6CB] via-[#00D4AA] to-transparent" />

              <p className="mt-6 text-[16px] lg:text-[17px] leading-relaxed text-slate-300 max-w-2xl">
                {disease.shortDesc}
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[12.5px] text-slate-400">
                <span className="flex items-center gap-1.5"><Clock size={13} className="text-[#00A6CB]" /> {readMinutes} min read</span>
                <span className="flex items-center gap-1.5"><FileText size={13} className="text-[#00A6CB]" /> PDF Pages {disease.pages?.[0]}–{disease.pages?.[1]}</span>
                <span className="flex items-center gap-1.5"><Eye size={13} className="text-[#00A6CB]" /> Condition #{String(disease.index).padStart(3, '0')}</span>
                <span className="flex items-center gap-1.5"><Stethoscope size={13} className="text-[#00A6CB]" /> Medically reviewed</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="bg-white text-slate-950 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#00D4AA] transition flex items-center gap-2 shadow-[0_10px_40px_rgba(0,212,170,0.25)]">
                  <Calendar size={16} /> Book Eye Checkup
                </Link>
                <a href="tel:+919322364002" className="bg-white/[0.07] backdrop-blur border border-white/15 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/[0.14] transition flex items-center gap-2">
                  <Phone size={16} /> 93223 64002
                </a>
              </div>
            </div>

            {/* Right: image collage */}
            <div className="relative">
              <div className="absolute -inset-10 bg-[#00A6CB]/10 blur-[80px] rounded-full pointer-events-none" />
              {images.length > 0 ? (
                <div className="relative max-w-[520px] mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 24, rotate: 4 }}
                    animate={{ opacity: 1, y: 0, rotate: 2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-[28px] overflow-hidden ring-1 ring-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)] aspect-[4/3] bg-slate-800"
                  >
                    <img src={images[0]} alt={`${disease.title} - clinical overview`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07152E]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <span className="text-[12px] font-semibold text-white/90">{disease.title} • Clinical Reference</span>
                      <span className="shrink-0 bg-white/15 backdrop-blur border border-white/20 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">Image 1/{images.length}</span>
                    </div>
                  </motion.div>

                  {images[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, rotate: -10 }}
                      animate={{ opacity: 1, y: 0, rotate: -6 }}
                      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-8 -left-6 lg:-left-12 w-36 md:w-44 aspect-square rounded-3xl overflow-hidden border-[6px] border-[#0B1F42] shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-slate-800"
                    >
                      <img src={images[1]} alt={`${disease.title} - detail view`} className="w-full h-full object-cover" loading="lazy" />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="absolute -top-4 -right-3 lg:-right-6 flex items-center gap-2 bg-white text-slate-900 rounded-2xl px-4 py-2.5 shadow-[0_15px_50px_rgba(0,0,0,0.4)]"
                  >
                    <span className="w-8 h-8 rounded-xl bg-[#E6F0FF] text-[#0B4DA2] flex items-center justify-center"><ShieldCheck size={15} /></span>
                    <div>
                      <div className="text-[11px] font-bold leading-tight">Expert Reviewed</div>
                      <div className="text-[10px] text-slate-500 leading-tight">Dr. Kazi FMRF FRCS</div>
                    </div>
                  </motion.div>

                  {images.length > 2 && (
                    <div className="mt-12 ml-4 grid grid-cols-3 gap-3 max-w-[320px]">
                      {images.slice(2, 5).map((src, i) => (
                        <div key={i} className="rounded-xl overflow-hidden ring-1 ring-white/15 aspect-[4/3] bg-slate-800">
                          <img src={src} alt={`${disease.title} - ${i + 3}`} className="w-full h-full object-cover hover:scale-105 transition duration-500" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative max-w-[520px] mx-auto rounded-[28px] border border-dashed border-white/20 bg-white/[0.04] backdrop-blur p-10 text-center aspect-[4/3] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/10 flex items-center justify-center mb-4"><Eye size={28} className="text-[#00A6CB]" /></div>
                  <div className="text-sm font-semibold text-slate-200">Clinical illustrations for {disease.title}</div>
                  <div className="text-xs text-slate-400 mt-1.5">Available during consultation at Ashu Laser Vision</div>
                </div>
              )}
            </div>
          </div>

          {/* glass stats strip */}
          <div className="mt-14 lg:mt-16 grid grid-cols-2 md:grid-cols-4 rounded-[22px] overflow-hidden bg-white/[0.05] backdrop-blur border border-white/10 divide-x divide-y md:divide-y-0 divide-white/10">
            {[
              { k: 'Guide Pages', v: `${disease.pages?.[0] || ''}–${disease.pages?.[1] || ''}`, icon: BookOpen },
              { k: 'Guide Index', v: `#${String(disease.index).padStart(3, '0')} of 151`, icon: Eye },
              { k: 'Reviewed By', v: 'Dr. Shahnawaz Kazi', icon: Stethoscope },
              { k: 'Hospital Trust', v: 'Since 2004 • Mumbai', icon: ShieldCheck }
            ].map(item => (
              <div key={item.k} className="flex items-center gap-3.5 px-5 lg:px-6 py-4.5 hover:bg-white/[0.06] transition">
                <span className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 text-[#00D4AA] flex items-center justify-center shrink-0"><item.icon size={16} /></span>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-400">{item.k}</div>
                  <div className="text-[13px] font-bold text-white mt-0.5 truncate">{item.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ARTICLE ---------- */}
      <section className="bg-[#F8FAFC] py-10 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[248px_minmax(0,1fr)_320px] gap-8 xl:gap-10 items-start">

            {/* TOC (desktop) */}
            <aside className="hidden xl:block sticky top-[108px] self-start">
              {tocItems.length > 0 && (
                <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 shadow-sm">
                  <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] text-slate-900 flex items-center gap-2">
                    <ScrollText size={14} className="text-[#0B4DA2]" /> On this page
                  </h4>
                  <nav className="mt-4 max-h-[58vh] overflow-y-auto pr-2 border-l border-slate-200">
                    {tocItems.map(t => (
                      <button
                        key={t.id}
                        onClick={() => scrollToId(t.id)}
                        className={`block w-full text-left -ml-px border-l-2 transition leading-snug ${t.level === 'h3' ? 'pl-6 py-1.5 text-[11.5px]' : 'pl-3.5 py-1.5 text-[12.5px] font-semibold'} ${activeId === t.id ? 'border-[#0B4DA2] text-[#0B4DA2]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                      >
                        {t.text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
              <div className="mt-5 bg-white border border-slate-200/80 rounded-[22px] p-5">
                <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] text-slate-900 flex items-center gap-2"><Sparkles size={13} className="text-[#00A6CB]" /> What you'll learn</h4>
                <ul className="mt-3.5 space-y-2 text-[12px] text-slate-600">
                  {['Overview & how common it is', 'Symptoms & early warning signs', 'Causes & risk factors', 'Diagnosis: OCT, FFA & more', 'Treatment & surgery options', 'Prevention & outlook'].map((t, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00A6CB] to-[#00D4AA] shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main article column */}
            <div className="min-w-0">
              {/* Mobile / tablet TOC pills */}
              {tocItems.length > 0 && (
                <div className="xl:hidden mb-6 -mx-4 px-4 md:mx-0 md:px-0">
                  <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {tocItems.filter(t => t.level === 'h2').map(t => (
                      <button key={t.id} onClick={() => scrollToId(t.id)} className={`shrink-0 text-[11.5px] font-semibold px-4 py-2 rounded-full border transition ${activeId === t.id ? 'bg-[#0B4DA2] text-white border-[#0B4DA2]' : 'bg-white border-slate-200 text-slate-600 hover:border-[#0B4DA2]/40 hover:text-[#0B4DA2]'}`}>
                        {t.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <article className="bg-white rounded-[28px] lg:rounded-[36px] border border-slate-200/80 p-6 md:p-9 lg:p-12 shadow-[0_10px_50px_rgba(8,58,122,0.06)]">
                <header className="flex items-center gap-4 pb-8 border-b border-slate-100">
                  <div className="w-13 h-13 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] text-white flex items-center justify-center shadow-lg shadow-blue-900/25 shrink-0 p-3.5">
                    <BookOpen size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#00A6CB]">The Complete Guide</div>
                    <h2 className="font-bold font-display text-lg lg:text-xl text-slate-900 tracking-tight truncate">{disease.title}: Causes, Symptoms & Treatment</h2>
                    <div className="text-[11px] text-slate-500 mt-0.5">Pages {disease.pages?.[0]}–{disease.pages?.[1]} • Reviewed by Dr. Shahnawaz Kazi FMRF FRCS</div>
                  </div>
                </header>

                <ContentRenderer blocks={blocks} />

                {/* FAQ accordion */}
                {faqs.length > 0 && (
                  <div className="mt-14">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00A6CB] to-[#00D4AA] text-white flex items-center justify-center shadow-lg shadow-cyan-700/20">
                        <HelpCircle size={19} />
                      </span>
                      <div>
                        <h3 className="text-[22px] lg:text-[26px] font-bold font-display tracking-tight text-slate-900">Frequently Asked Questions</h3>
                        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#00A6CB] to-[#00D4AA] mt-2" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {faqs.map((f, i) => (
                        <details key={i} className="group bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-5 py-4 open:bg-white open:border-[#0B4DA2]/25 open:shadow-lg open:shadow-blue-900/5 transition-all duration-300">
                          <summary className="font-semibold text-[14px] text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                            <span className="flex items-start gap-3">
                              <span className="shrink-0 w-6 h-6 rounded-lg bg-[#E6F0FF] text-[#0B4DA2] text-[11px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                              {f.q}
                            </span>
                            <span className="shrink-0 w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center group-open:rotate-45 group-open:bg-[#0B4DA2] group-open:text-white group-open:border-[#0B4DA2] transition-all duration-300">
                              <Plus size={14} />
                            </span>
                          </summary>
                          <p className="text-[13.5px] text-slate-600 leading-relaxed mt-3.5 pl-9">{f.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline consult CTA */}
                <div className="mt-14 relative overflow-hidden rounded-[26px] bg-[#07152E] text-white p-7 lg:p-10">
                  <div className="absolute -top-20 -right-16 w-72 h-72 bg-[#0B4DA2]/50 rounded-full blur-[70px]" />
                  <div className="absolute -bottom-24 -left-10 w-64 h-64 bg-[#00D4AA]/20 rounded-full blur-[70px]" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full">Same-Day Appointments</div>
                    <h3 className="mt-4 text-[24px] lg:text-[30px] font-bold font-display tracking-tight leading-tight">Concerned about {disease.title}?</h3>
                    <p className="text-slate-300 text-[14px] mt-3 leading-relaxed max-w-2xl">Early diagnosis prevents vision loss. Book a comprehensive eye exam with OCT, FFA & Pentacam at Ashu Laser Vision, Andheri West — 20+ years of excellence and 50,000+ successful surgeries.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link to="/contact" className="bg-white text-slate-950 px-6 py-3 rounded-full font-bold text-sm hover:bg-[#00D4AA] transition flex items-center gap-2">
                        <Calendar size={15} /> Book Consultation
                      </Link>
                      <a href="tel:+919322364002" className="bg-white/[0.08] border border-white/15 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/[0.16] transition flex items-center gap-2">
                        <Phone size={15} /> +91 93223 64002
                      </a>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 flex gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><AlertTriangle size={17} /></span>
                  <div className="text-[12.5px] leading-relaxed text-amber-900">
                    <span className="font-bold">Medical Disclaimer:</span> This guide is for educational purposes only and does not replace professional medical advice. For diagnosis and treatment of {disease.title}, consult Dr. Shahnawaz Kazi at Ashu Laser Vision, Andheri West, Mumbai. Emergency? Call 93223 64002 — 24x7.
                  </div>
                </div>
              </article>
            </div>

            {/* Right sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-[108px] self-start">
              {/* Booking card */}
              <div className="relative overflow-hidden bg-gradient-to-b from-[#0B4DA2] to-[#083A7A] text-white rounded-[24px] p-6 shadow-[0_20px_60px_rgba(8,58,122,0.35)]">
                <div className="absolute -top-14 -right-14 w-48 h-48 bg-[#00A6CB]/30 rounded-full blur-[50px]" />
                <div className="relative">
                  <h4 className="font-bold font-display text-lg flex items-center gap-2"><Calendar size={17} /> Book Expert Consultation</h4>
                  <p className="text-blue-100 text-[12.5px] mt-2 leading-relaxed">Get {disease.title} evaluated by Dr. Shahnawaz Kazi — Gold Medalist FCPS, FRCS Glasgow.</p>
                  <div className="mt-5 space-y-2.5">
                    <Link to="/contact" className="w-full bg-white text-[#0B4DA2] py-3 rounded-full font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#00D4AA] hover:text-slate-950 transition"><Calendar size={15} /> Book Appointment</Link>
                    <a href="tel:+919322364002" className="w-full bg-white/10 border border-white/20 py-3 rounded-full font-semibold text-[13px] flex items-center justify-center gap-2 hover:bg-white/20 transition"><Phone size={15} /> +91 93223 64002</a>
                    <a href="https://wa.me/919322364002" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] py-3 rounded-full font-semibold text-[13px] flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition"><WhatsAppIcon size={15} /> WhatsApp Us</a>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/15 space-y-2 text-[11.5px] text-blue-100">
                    <div className="flex gap-2 items-center"><MapPin size={13} className="shrink-0 text-[#00D4AA]" /> Opp Andheri Rly Platform 1, Andheri West</div>
                    <div className="flex gap-2 items-center"><Clock size={13} className="shrink-0 text-[#00D4AA]" /> Mon–Sat 10AM–8PM • 24x7 Emergency</div>
                  </div>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="bg-white border border-slate-200/80 rounded-[24px] p-5 shadow-sm">
                <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] text-slate-900">Navigate Guides</h4>
                <div className="mt-4 space-y-2.5">
                  {prevDisease && (
                    <Link to={`/eye-diseases/${prevDisease.slug}`} className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 p-3.5 hover:border-[#0B4DA2]/30 hover:bg-[#F0F7FF] transition">
                      <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-[#0B4DA2] group-hover:text-white transition"><ArrowLeft size={14} /></span>
                      <div className="min-w-0">
                        <div className="text-[9.5px] uppercase tracking-[0.18em] font-bold text-slate-400">Previous • #{String(prevDisease.index).padStart(3, '0')}</div>
                        <div className="text-[13px] font-semibold text-slate-900 group-hover:text-[#0B4DA2] truncate mt-0.5">{prevDisease.title}</div>
                      </div>
                    </Link>
                  )}
                  {nextDisease && (
                    <Link to={`/eye-diseases/${nextDisease.slug}`} className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 p-3.5 hover:border-[#0B4DA2]/30 hover:bg-[#F0F7FF] transition">
                      <div className="min-w-0 flex-1 text-right">
                        <div className="text-[9.5px] uppercase tracking-[0.18em] font-bold text-slate-400">Next • #{String(nextDisease.index).padStart(3, '0')}</div>
                        <div className="text-[13px] font-semibold text-slate-900 group-hover:text-[#0B4DA2] truncate mt-0.5">{nextDisease.title}</div>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-[#0B4DA2] group-hover:text-white transition"><ArrowRight size={14} /></span>
                    </Link>
                  )}
                </div>
                <Link to="/eye-diseases" className="mt-4 w-full bg-slate-950 text-white py-3 rounded-full text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#0B4DA2] transition">
                  Browse All {eyeDiseases.length} Guides <ArrowRight size={13} />
                </Link>
              </div>

              {/* Group chips */}
              {group && (
                <div className="bg-white border border-slate-200/80 rounded-[24px] p-5 shadow-sm">
                  <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] text-slate-900">More in {group.label}</h4>
                  <p className="text-[11.5px] text-slate-500 mt-1.5 leading-relaxed">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.slugs.slice(0, 12).map(s => {
                      const dd = eyeDiseases.find(x => x.slug === s);
                      if (!dd) return null;
                      return (
                        <Link key={s} to={`/eye-diseases/${s}`} className={`text-[11px] px-3 py-1.5 rounded-full border font-medium transition ${s === disease.slug ? 'bg-[#0B4DA2] text-white border-[#0B4DA2] shadow-md shadow-blue-900/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-[#E6F0FF] hover:border-[#0B4DA2]/30 hover:text-[#0B4DA2]'}`}>
                          {dd.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Emergency */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/70 rounded-[24px] p-5">
                <div className="flex items-center gap-2.5 font-bold text-sm text-red-700">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                  </span>
                  Eye Emergency? 24x7 Help
                </div>
                <p className="text-[12px] text-slate-600 mt-2.5 leading-relaxed">Flashes, sudden vision loss, eye injury or chemical splash — do not wait. Our trauma OT is ready round the clock.</p>
                <a href="tel:+919322364002" className="mt-3.5 block bg-red-600 text-white text-center py-3 rounded-full text-[13px] font-bold hover:bg-red-700 transition shadow-lg shadow-red-600/25">Emergency Call Now</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- RELATED CONDITIONS ---------- */}
      {related.length > 0 && (
        <section className="bg-white border-t border-slate-100 py-12 lg:py-16">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-7">
              <div>
                <div className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#00A6CB]">Keep Exploring</div>
                <h3 className="text-[26px] lg:text-[32px] font-bold font-display tracking-tight text-slate-900 mt-2">Related Eye Conditions</h3>
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#0B4DA2] to-[#00D4AA] mt-3" />
              </div>
              <Link to="/eye-diseases" className="hidden md:flex shrink-0 items-center gap-2 border border-slate-200 px-5 py-2.5 rounded-full text-[12.5px] font-bold text-slate-700 hover:border-[#0B4DA2] hover:text-[#0B4DA2] transition">
                View all 151 <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory [scrollbar-width:thin]">
              {related.map(r => {
                const thumb = relatedThumb(r);
                return (
                  <Link key={r.slug} to={`/eye-diseases/${r.slug}`} className="group snap-start shrink-0 w-[250px] bg-white border border-slate-200/80 rounded-[20px] overflow-hidden hover:border-[#0B4DA2]/30 hover:shadow-[0_18px_50px_rgba(8,58,122,0.12)] hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-[16/10] bg-[#F0F7FF] overflow-hidden relative">
                      {thumb ? (
                        <img src={thumb} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#0B4DA2]/30"><Eye size={34} /></div>
                      )}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#0B4DA2] text-[9.5px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">Guide #{String(r.index).padStart(3, '0')}</span>
                    </div>
                    <div className="p-4">
                      <div className="text-[13.5px] font-bold text-slate-900 group-hover:text-[#0B4DA2] transition line-clamp-1">{r.title}</div>
                      <div className="text-[11.5px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{r.shortDesc}</div>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#0B4DA2]">
                        Read guide <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Link to="/eye-diseases" className="snap-start shrink-0 w-[160px] rounded-[20px] bg-slate-950 text-white flex flex-col items-center justify-center gap-3 hover:bg-[#0B4DA2] transition p-6 text-center">
                <span className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"><ArrowRight size={18} /></span>
                <span className="text-[12px] font-bold leading-snug">View all {eyeDiseases.length} conditions</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
