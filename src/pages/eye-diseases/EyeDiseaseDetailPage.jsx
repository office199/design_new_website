import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Eye, ShieldCheck, Share2, Phone, Calendar, AlertTriangle, CheckCircle2, HelpCircle, Stethoscope, Loader2, BookOpen, MapPin, Clock, Plus, Sparkles, ClipboardCheck, X, ScrollText } from 'lucide-react';
import SEO from '../../components/SEO';
import PageTransition from '../../components/animations/PageTransition';
import { getDiseaseBySlug as getMetaBySlug, eyeDiseases, eyeDiseaseGroups } from '../../data/eyeDiseasesMeta';
import WhatsAppIcon from '../../components/icons/WhatsAppIcon';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
 * Design language: "The Condition Dossier" — an editorial medical-journal
 * aesthetic. Warm paper, ink hairlines, sharp corners, hard offset shadows,
 * figure-captioned plates and an index-style related list.
 */
const PAPER = '#FAF8F4';
const NOISE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.045'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
};
const HAIRLINE = 'border-slate-950/15';
const pad = (n) => String(n ?? 0).padStart(3, '0');

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

// Turn the raw multi-line short description into a clean one-paragraph lede.
function cleanLede(title, shortDesc) {
  if (!shortDesc) return '';
  const lines = shortDesc.split('\n').map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const meaningful = lines.filter(l => l !== title && l.length > 60 && !l.endsWith(':'));
  const text = meaningful.slice(0, 2).join(' ');
  return text.length > 340 ? `${text.slice(0, 340).replace(/\s+\S*$/, '')}…` : text;
}

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function ContentRenderer({ blocks }) {
  let h2Count = 0;
  let firstParaDone = false;
  return (
    <div>
      {blocks.map((block, idx) => {
        if (block.type === 'h2') {
          h2Count += 1;
          const num = String(h2Count).padStart(2, '0');
          return (
            <div key={idx} id={`sec-${idx}`} data-toc="h2" className="scroll-mt-[150px] lg:scroll-mt-[170px] mt-14 first:mt-0">
              <div className="flex items-center gap-4">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#0B4DA2]">Chapter {num}</span>
                <span className="h-px flex-1 bg-slate-950/10" />
                <span className="font-display text-[32px] font-extrabold leading-none text-slate-950/10 select-none">{num}</span>
              </div>
              <h2 className="mt-4 font-display text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-[1.08] tracking-tight text-slate-950">{block.text}</h2>
            </div>
          );
        }
        if (block.type === 'h3') {
          const isFAQ = /^\d+\.|^Q\d+:|^\?|faq|questions/i.test(block.text);
          if (isFAQ) {
            return (
              <h3 key={idx} id={`sec-${idx}`} data-toc="h3" className="scroll-mt-[150px] lg:scroll-mt-[170px] mt-8 mb-4 flex items-center gap-3 border border-slate-950/15 bg-[#F1EDE6] px-4 py-3 font-display text-[14px] lg:text-[15px] font-bold text-[#0B4DA2]">
                <HelpCircle size={15} className="shrink-0" />
                <span>{block.text}</span>
              </h3>
            );
          }
          return (
            <h3 key={idx} id={`sec-${idx}`} data-toc="h3" className="scroll-mt-[150px] lg:scroll-mt-[170px] mt-10 mb-3.5 border-l-[3px] border-[#0B4DA2] pl-4 font-display text-[17px] lg:text-[19px] font-bold tracking-tight text-slate-950">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={idx} className="my-7 border-t border-slate-950/15">
              {block.items.map((it, i2) => (
                <li key={i2} className="group flex gap-4 border-b border-slate-950/15 py-4">
                  <span className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center border border-slate-950/20 text-[#0B4DA2] transition-colors duration-300 group-hover:border-[#0B4DA2] group-hover:bg-[#0B4DA2] group-hover:text-white">
                    <CheckCircle2 size={13} />
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-slate-700">{it}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'para') {
          if (block.text.startsWith('A:') || block.text.startsWith('Ans:')) {
            const note = block.text.replace(/^A(?:ns)?:\s*/, '');
            return (
              <div key={idx} className="my-8 border border-slate-950/15 border-l-[3px] border-l-[#0B4DA2] bg-[#F4F7FB] px-6 py-5">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0B4DA2]">
                  <Stethoscope size={12} /> Doctor&rsquo;s note
                </div>
                <p className="mt-2.5 text-[14px] leading-[1.8] text-slate-700">{note}</p>
              </div>
            );
          }
          if (!firstParaDone) {
            firstParaDone = true;
            return (
              <p key={idx} className="my-6 text-[16.5px] leading-[1.9] text-slate-700 first-letter:float-left first-letter:mr-3 first-letter:mt-[6px] first-letter:font-display first-letter:text-[54px] first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-[#0B4DA2]">
                {block.text}
              </p>
            );
          }
          return <p key={idx} className="my-5 text-[15.5px] leading-[1.9] text-slate-700">{block.text}</p>;
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
  const [shareStatus, setShareStatus] = useState('');
  const [showMobileCta, setShowMobileCta] = useState(true);
  const { scrollYProgress } = useScroll();

  const RING_C = 2 * Math.PI * 24;
  const ringOffset = useTransform(scrollYProgress, [0, 1], [RING_C, 0]);
  const progressPct = useTransform(scrollYProgress, v => `${Math.round(v * 100)}%`);

  const shareGuide = async () => {
    const shareData = { title: fullData?.title || 'Eye health guide', url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('Link copied');
        window.setTimeout(() => setShareStatus(''), 2200);
      }
    } catch (err) {
      // A dismissed native share sheet is not an error the visitor needs to see.
      if (err?.name !== 'AbortError') setShareStatus('Unable to share');
    }
  };

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
                pages: meta.pages,
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
                pages: meta.pages,
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
  const tocH2 = useMemo(() => tocItems.filter(t => t.level === 'h2'), [tocItems]);

  // "At a glance" — first bullet list of the article, reduced to three key points.
  const glance = useMemo(() => {
    const firstList = blocks.find(b => b.type === 'list');
    if (!firstList) return [];
    return firstList.items.slice(0, 3).map(s => s.replace(/\s+/g, ' ').trim());
  }, [blocks]);

  // Scroll-spy for the TOC
  useEffect(() => {
    if (!tocItems.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: '-150px 0px -62% 0px', threshold: 0 });
    tocItems.forEach(t => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  /* ---------- States: not found / loading / error ---------- */

  if (!meta && !loading) {
    return (
      <div className="min-h-[70vh]" style={{ backgroundColor: PAPER, ...NOISE }}>
        <div className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center px-6 py-20">
          <div className={`w-full max-w-lg border ${HAIRLINE} bg-white p-10 text-center shadow-[12px_12px_0_rgba(16,20,24,0.06)]`}>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#0B4DA2]">Dossier unavailable</div>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center border border-slate-950/15 text-[#0B4DA2]"><Eye size={26} /></div>
            <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-950">Condition not found</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">The eye condition &ldquo;{slug}&rdquo; does not exist in the index. Browse all {eyeDiseases.length} expert-reviewed guides instead.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/eye-diseases" className="flex items-center gap-2 bg-[#101418] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0B4DA2]">Browse the index <ArrowRight size={13} /></Link>
              <Link to="/" className="border border-slate-950/20 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-950 transition-colors hover:border-slate-950">Go home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !fullData) {
    return (
      <div className="min-h-[70vh]" style={{ backgroundColor: PAPER, ...NOISE }}>
        <div className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-slate-500">Preparing dossier — Nº {meta ? pad(meta.index) : '···'}</div>
          <div className="mt-8 flex h-16 w-16 items-center justify-center border border-slate-950/15 bg-white shadow-[8px_8px_0_rgba(16,20,24,0.06)]">
            <Loader2 size={22} className="animate-spin text-[#0B4DA2]" />
          </div>
          <div className="mt-8 font-display text-xl font-bold tracking-tight text-slate-950">{meta?.title || slug}</div>
          <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">Reviewed by Dr. Shahnawaz Kazi — FMRF · FRCS</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh]" style={{ backgroundColor: PAPER, ...NOISE }}>
        <div className="mx-auto flex min-h-[60vh] max-w-[1440px] items-center justify-center px-6 py-20">
          <div className={`border ${HAIRLINE} bg-white p-10 text-center shadow-[12px_12px_0_rgba(16,20,24,0.06)]`}>
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-red-600/30 text-red-600"><AlertTriangle size={22} /></div>
            <div className="mt-5 font-display text-lg font-bold text-slate-950">Failed to load content</div>
            <p className="mt-2 text-sm text-slate-500">Please try again, or pick another guide from the index.</p>
            <Link to="/eye-diseases" className="mt-6 inline-flex items-center gap-2 bg-[#101418] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0B4DA2]">Back to index <ArrowRight size={13} /></Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Derived content ---------- */

  const disease = fullData;
  const pages = disease.pages || meta.pages || [null, null];
  const imageBase = `/eye-diseases/${disease.folder}/images`;
  const images = (disease.images || []).map(img => `${imageBase}/${img.file.split('/').pop()}`);
  const relatedThumb = (r) => r.images?.[0] ? `/eye-diseases/${r.folder}/images/${r.images[0].file.split('/').pop()}` : null;
  const readMinutes = Math.max(3, Math.round((contentMd || '').split(/\s+/).length / 180));
  const lede = cleanLede(disease.title, disease.shortDesc);

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
  const activeChapterIdx = Math.max(0, tocItems.findIndex(t => t.id === activeId));

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

      {/* ================= HERO — THE DOSSIER COVER ================= */}
      <section className="relative overflow-hidden" style={{ backgroundColor: PAPER, ...NOISE }}>
        {/* giant outlined index watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-4 select-none font-display text-[clamp(170px,23vw,340px)] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_rgba(16,20,24,0.07)]"
        >
          {pad(disease.index)}
        </div>

        <div className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-6 md:px-6 lg:px-8 lg:pt-9 lg:pb-20">
          {/* breadcrumb + actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex min-w-0 items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Link to="/" className="shrink-0 transition-colors hover:text-[#0B4DA2]">Home</Link>
              <ChevronRight size={11} className="shrink-0 text-slate-400" />
              <Link to="/eye-diseases" className="shrink-0 transition-colors hover:text-[#0B4DA2]">Eye Diseases</Link>
              <ChevronRight size={11} className="shrink-0 text-slate-400" />
              <span className="max-w-[160px] truncate text-slate-950 md:max-w-md">{disease.title}</span>
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={shareGuide}
                aria-live="polite"
                className="flex items-center gap-2 border border-slate-950/20 bg-white/60 px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-950 transition-colors hover:border-slate-950 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4DA2]"
              >
                {shareStatus === 'Link copied' ? <ClipboardCheck size={13} className="text-[#0B4DA2]" /> : <Share2 size={13} />}
                <span className="hidden sm:inline">{shareStatus || 'Share this guide'}</span>
                <span className="sm:hidden">{shareStatus || 'Share'}</span>
              </button>
              <Link to="/eye-diseases" className="flex items-center gap-2 bg-[#101418] px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#0B4DA2]">
                <ArrowLeft size={13} /> <span className="hidden sm:inline">All {eyeDiseases.length} guides</span><span className="sm:hidden">Index</span>
              </Link>
            </div>
          </div>

          {/* eyebrow strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[10.5px] font-bold uppercase tracking-[0.28em] lg:mt-12">
            <span className="bg-[#101418] px-3 py-1.5 text-[#FAF8F4]">Condition guide</span>
            <span className="text-slate-500">Nº {pad(disease.index)} / {eyeDiseases.length}</span>
            {group && (
              <span className="flex items-center gap-3 text-slate-500">
                <span className="h-3.5 w-px bg-slate-950/20" /> {group.label}
              </span>
            )}
            <span className="flex items-center gap-2 text-slate-500">
              <span className="h-3.5 w-px bg-slate-950/20" />
              <ShieldCheck size={12} className="text-[#0B4DA2]" /> Expert reviewed
            </span>
          </div>

          {/* headline + lede */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-5xl font-display text-[clamp(2.6rem,6.2vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-slate-950"
          >
            {disease.title}
          </motion.h1>
          <div className="mt-7 h-[3px] w-24 bg-[#0B4DA2]" />
          {lede && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-slate-600 lg:text-[17px]"
            >
              {lede}
            </motion.p>
          )}

          {/* spec sheet */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-10 grid grid-cols-2 divide-x divide-y divide-slate-950/15 border ${HAIRLINE} bg-white/70 shadow-[10px_10px_0_rgba(16,20,24,0.05)] backdrop-blur-[2px] md:grid-cols-4 md:divide-y-0`}
          >
            {[
              { k: 'Read time', v: `${readMinutes} min` },
              { k: 'Source pages', v: pages[0] ? `p. ${pages[0]}–${pages[1]}` : 'p. —' },
              { k: 'Reviewed by', v: 'Dr. S. Kazi, FRCS' },
              { k: 'Guide Nº', v: `${pad(disease.index)} / ${eyeDiseases.length}` }
            ].map(item => (
              <div key={item.k} className="px-5 py-4 lg:px-6 lg:py-5">
                <div className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-slate-500">{item.k}</div>
                <div className="mt-1.5 truncate font-display text-[15px] font-bold text-slate-950 lg:text-[16px]">{item.v}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="flex items-center gap-3 bg-[#101418] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0B4DA2]">
              <Calendar size={15} /> Book an eye exam
            </Link>
            <a href="tel:+919322364002" className="flex items-center gap-3 border border-slate-950/20 bg-white/60 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-950 transition-colors hover:border-slate-950 hover:bg-white">
              <Phone size={15} className="text-[#0B4DA2]" /> +91 93223 64002
            </a>
          </div>

          {/* image plate + figure captions */}
          <div className="relative mt-14 lg:mt-16">
            <div className={`relative border ${HAIRLINE} bg-[#101418] shadow-[14px_14px_0_rgba(16,20,24,0.07)]`}>
              {images.length > 0 ? (
                <div className="aspect-[16/10] overflow-hidden md:aspect-[21/9]">
                  <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    src={images[0]}
                    alt={`${disease.title} — clinical overview`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden p-6 text-[#FAF8F4] md:aspect-[21/9] md:p-10">
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-6 select-none font-display text-[220px] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(250,248,244,0.16)] md:text-[300px]">
                    {disease.title.charAt(0)}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">
                    <span>Ashu Laser Vision</span>
                    <span>Visual atlas</span>
                  </div>
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center border border-white/25 text-[#9BE7D1]"><Eye size={26} strokeWidth={1.5} /></div>
                    <p className="mt-5 max-w-md font-display text-[20px] font-bold leading-snug md:text-[24px]">Clear, specialist-led answers for your eye health.</p>
                    <p className="mt-2 max-w-sm text-[12px] leading-relaxed text-slate-400">Personalised assessment available at our Andheri West clinic.</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between gap-4 border-t border-white/15 px-4 py-3 text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/60 md:px-6">
                <span className="truncate">Fig. 01 — {disease.title}, clinical reference</span>
                <span className="hidden shrink-0 sm:block">Ashu Laser Vision · {images.length > 1 ? `${images.length} plates` : 'Visual atlas'}</span>
              </div>

              {images[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 18, rotate: 6 }}
                  animate={{ opacity: 1, y: 0, rotate: 3 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-7 right-5 hidden w-36 rotate-3 border-[5px] border-[#FAF8F4] bg-slate-800 shadow-[8px_8px_0_rgba(16,20,24,0.18)] sm:block md:w-44 lg:w-52"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={images[1]} alt={`${disease.title} — detail view`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="bg-[#101418] px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-[0.22em] text-white/60">Fig. 02</div>
                </motion.div>
              )}
            </div>

            {/* At a glance — overlapping card */}
            {glance.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-10 mx-3 -mt-10 border ${HAIRLINE} bg-white shadow-[12px_12px_0_rgba(11,77,162,0.10)] md:mx-8 md:-mt-12`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-950/15 px-5 py-3">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0B4DA2]"><Sparkles size={12} /> At a glance</span>
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-400">Key points from this guide</span>
                </div>
                <div className="grid divide-y divide-slate-950/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                  {glance.map((g, i) => (
                    <div key={i} className="flex gap-4 px-5 py-4">
                      <span className="font-display text-[22px] font-extrabold leading-none text-slate-950/15">0{i + 1}</span>
                      <p className="line-clamp-3 text-[12.5px] leading-relaxed text-slate-600">{g}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ================= STICKY CHAPTER BAR ================= */}
      <div className="sticky top-[71px] z-30 border-b border-slate-950/15 bg-[#FAF8F4]/92 backdrop-blur-md lg:top-[83px]">
        <div className="relative mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-2.5 md:px-6 lg:px-8">
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <span className="bg-[#101418] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF8F4]">Nº {pad(disease.index)}</span>
            <span className="max-w-[220px] truncate font-display text-[13px] font-bold text-slate-950">{disease.title}</span>
          </div>
          <nav className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="mr-1 hidden shrink-0 items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.24em] text-slate-400 lg:flex"><ScrollText size={12} /> Chapters</span>
            {tocH2.map((t) => (
              <button
                key={t.id}
                onClick={() => scrollToId(t.id)}
                className={`shrink-0 border px-3 py-1.5 text-[11px] font-semibold transition-colors ${activeId === t.id ? 'border-[#101418] bg-[#101418] text-[#FAF8F4]' : 'border-slate-950/15 bg-white/50 text-slate-600 hover:border-slate-950/40 hover:text-slate-950'}`}
              >
                {t.text}
              </button>
            ))}
            {tocH2.length === 0 && <span className="text-[11px] text-slate-400">Reading guide…</span>}
          </nav>
          <Link to="/contact" className="hidden shrink-0 items-center gap-2 bg-[#0B4DA2] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#101418] md:flex">
            <Calendar size={12} /> Book
          </Link>
          <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[#0B4DA2]" />
        </div>
      </div>

      {/* ================= BODY ================= */}
      <section className="relative py-12 lg:py-16" style={{ backgroundColor: PAPER, ...NOISE }}>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[216px_minmax(0,1fr)_300px]">

            {/* Chapter rail (desktop) */}
            <aside className="sticky top-[160px] hidden self-start xl:block">
              {tocItems.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-950">
                    <ScrollText size={13} className="text-[#0B4DA2]" /> Chapters
                  </h4>
                  <div className="relative mt-5">
                    <span className="absolute bottom-1 left-[3.5px] top-1 w-px bg-slate-950/10" />
                    <span
                      className="absolute left-[3.5px] top-1 w-px bg-[#0B4DA2] transition-all duration-500"
                      style={{ height: `${((activeChapterIdx + 1) / Math.max(1, tocItems.length)) * 100}%` }}
                    />
                    <nav className="max-h-[62vh] space-y-1 overflow-y-auto pr-2">
                      {tocItems.map(t => (
                        <button
                          key={t.id}
                          onClick={() => scrollToId(t.id)}
                          className={`group relative flex w-full items-start gap-3 py-1.5 text-left leading-snug transition-colors ${t.level === 'h3' ? 'pl-9 text-[11px]' : 'pl-6 text-[12px] font-semibold'} ${activeId === t.id ? 'text-[#0B4DA2]' : 'text-slate-500 hover:text-slate-950'}`}
                        >
                          <span className={`absolute left-0 top-[9px] h-[7px] w-[7px] rotate-45 border transition-colors ${activeId === t.id ? 'border-[#0B4DA2] bg-[#0B4DA2]' : 'border-slate-950/25 bg-[#FAF8F4] group-hover:border-slate-950'}`} />
                          {t.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-6 border-t border-slate-950/15 pt-4 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    {tocItems.length} sections · {readMinutes} min read
                  </div>
                </div>
              )}
            </aside>

            {/* Article sheet */}
            <div className="min-w-0">
              <article className={`border ${HAIRLINE} bg-white p-6 shadow-[16px_16px_0_rgba(16,20,24,0.05)] md:p-10 lg:p-14`}>
                <header className="border-b-2 border-slate-950 pb-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.3em]">
                    <span className="text-[#0B4DA2]">The complete guide</span>
                    <span className="text-slate-400">{pages[0] ? `Source p. ${pages[0]}–${pages[1]}` : 'Ashu visual atlas'}</span>
                  </div>
                  <h2 className="mt-5 font-display text-[22px] font-bold leading-tight tracking-tight text-slate-950 lg:text-[28px]">
                    {disease.title}: Causes, Symptoms, Diagnosis &amp; Treatment
                  </h2>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-slate-500">
                    <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#0B4DA2]" /> Reviewed by Dr. Shahnawaz Kazi — FMRF, FRCS Glasgow</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} /> {readMinutes} min read</span>
                  </div>
                </header>

                <ContentRenderer blocks={blocks} />

                {/* FAQ accordion */}
                {faqs.length > 0 && (
                  <div className="mt-16">
                    <div className="flex items-center gap-4">
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#0B4DA2]">Answers</span>
                      <span className="h-px flex-1 bg-slate-950/10" />
                      <HelpCircle size={16} className="text-[#0B4DA2]" />
                    </div>
                    <h3 className="mt-4 font-display text-[24px] font-bold tracking-tight text-slate-950 lg:text-[30px]">Frequently asked questions</h3>
                    <div className="mt-7 border-t border-slate-950/15">
                      {faqs.map((f, i) => (
                        <details key={i} className="group border-b border-slate-950/15 transition-colors open:bg-[#FAF8F4]">
                          <summary className="flex cursor-pointer list-none items-center gap-4 px-2 py-5 [&::-webkit-details-marker]:hidden md:gap-6">
                            <span className="w-8 shrink-0 font-display text-[14px] font-extrabold text-slate-300 transition-colors group-open:text-[#0B4DA2]">{String(i + 1).padStart(2, '0')}</span>
                            <span className="flex-1 font-display text-[14.5px] font-bold leading-snug text-slate-950 md:text-[16px]">{f.q}</span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-950/20 text-slate-950 transition-all duration-300 group-open:rotate-45 group-open:border-[#101418] group-open:bg-[#101418] group-open:text-white">
                              <Plus size={14} />
                            </span>
                          </summary>
                          <p className="pb-6 pl-12 pr-8 text-[13.5px] leading-[1.85] text-slate-600 md:pl-[72px]">{f.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consultation CTA — ink block */}
                <div className="mt-16 border border-slate-950 bg-[#101418] text-[#FAF8F4] shadow-[12px_12px_0_rgba(11,77,162,0.18)]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-3 text-[9.5px] font-bold uppercase tracking-[0.28em] text-white/50 lg:px-10">
                    <span>Ashu Laser Vision — Andheri West</span>
                    <span className="hidden sm:block">Same-day appointments</span>
                  </div>
                  <div className="px-6 py-10 lg:px-10 lg:py-12">
                    <h3 className="max-w-2xl font-display text-[26px] font-extrabold leading-[1.04] tracking-tight lg:text-[36px]">
                      Worried it might be {disease.title}? Get a definitive answer.
                    </h3>
                    <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-slate-300">
                      Early diagnosis prevents vision loss. Book a comprehensive eye exam with OCT, FFA &amp; Pentacam — 20+ years of excellence and 50,000+ successful surgeries.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link to="/contact" className="flex items-center gap-2.5 bg-[#FAF8F4] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#101418] transition-colors hover:bg-[#00D4AA]">
                        <Calendar size={14} /> Book consultation
                      </Link>
                      <a href="tel:+919322364002" className="flex items-center gap-2.5 border border-white/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white/10">
                        <Phone size={14} /> +91 93223 64002
                      </a>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 flex gap-4 border border-amber-600/30 bg-amber-50/70 p-5">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                  <p className="text-[12.5px] leading-relaxed text-amber-900">
                    <span className="font-bold">Medical disclaimer.</span> This guide is for education only and does not replace professional medical advice. For diagnosis and treatment of {disease.title}, consult Dr. Shahnawaz Kazi at Ashu Laser Vision, Andheri West, Mumbai. Eye emergency? Call +91 93223 64002 — 24×7.
                  </p>
                </div>
              </article>
            </div>

            {/* Right rail */}
            <aside className="hidden self-start lg:block">
              <div className="sticky top-[160px] space-y-5">

                {/* Reading progress */}
                <div className={`flex items-center gap-4 border ${HAIRLINE} bg-white p-5 shadow-[8px_8px_0_rgba(16,20,24,0.05)]`}>
                  <div className="relative h-14 w-14 shrink-0">
                    <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
                      <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(16,20,24,0.1)" strokeWidth="3" />
                      <motion.circle
                        cx="28" cy="28" r="24" fill="none"
                        stroke="#0B4DA2" strokeWidth="3" strokeLinecap="butt"
                        strokeDasharray={RING_C}
                        style={{ strokeDashoffset: ringOffset }}
                      />
                    </svg>
                    <BookOpen size={15} className="absolute inset-0 m-auto text-[#0B4DA2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-slate-500">Reading progress</div>
                    <motion.div className="mt-1 font-display text-[22px] font-extrabold leading-none text-slate-950">{progressPct}</motion.div>
                    <div className="mt-1 text-[10.5px] text-slate-400">{tocH2.length} chapters</div>
                  </div>
                </div>

                {/* Specialist card */}
                <div className="border border-slate-950 bg-[#101418] text-[#FAF8F4] shadow-[8px_8px_0_rgba(16,20,24,0.15)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.28em] text-white/50">
                    <span>Your specialist</span>
                    <Stethoscope size={13} />
                  </div>
                  <div className="p-5">
                    <div className="font-display text-[19px] font-bold leading-tight">Dr. Shahnawaz Kazi</div>
                    <div className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#8FD8CB]">FMRF · FRCS Glasgow · Gold Medalist</div>
                    <p className="mt-3 text-[12.5px] leading-relaxed text-slate-300">
                      Get {disease.title} evaluated with OCT, FFA &amp; Pentacam diagnostics by the Founder &amp; Medical Director.
                    </p>
                    <div className="mt-5 space-y-2">
                      <Link to="/contact" className="flex w-full items-center justify-center gap-2 bg-[#FAF8F4] py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#101418] transition-colors hover:bg-[#00D4AA]"><Calendar size={13} /> Book appointment</Link>
                      <a href="tel:+919322364002" className="flex w-full items-center justify-center gap-2 border border-white/25 py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white/10"><Phone size={13} /> +91 93223 64002</a>
                      <a href="https://wa.me/919322364002" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 bg-[#25D366] py-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1EBE5D]"><WhatsAppIcon size={14} /> WhatsApp</a>
                    </div>
                    <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-slate-300">
                      <div className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 shrink-0 text-[#8FD8CB]" /> Opp. Andheri Railway Platform 1, Andheri West, Mumbai</div>
                      <div className="flex items-start gap-2"><Clock size={13} className="mt-0.5 shrink-0 text-[#8FD8CB]" /> Mon–Sat 10 AM–8 PM · 24×7 emergency</div>
                    </div>
                  </div>
                </div>

                {/* Group chips */}
                {group && (
                  <div className={`border ${HAIRLINE} bg-white p-5 shadow-[8px_8px_0_rgba(16,20,24,0.05)]`}>
                    <h4 className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-slate-500">More in — {group.label}</h4>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {group.slugs.slice(0, 10).map(s => {
                        const dd = eyeDiseases.find(x => x.slug === s);
                        if (!dd) return null;
                        return (
                          <Link
                            key={s}
                            to={`/eye-diseases/${s}`}
                            className={`border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${s === disease.slug ? 'border-[#0B4DA2] bg-[#0B4DA2] text-white' : 'border-slate-950/15 text-slate-600 hover:border-[#101418] hover:bg-[#101418] hover:text-white'}`}
                          >
                            {dd.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Emergency */}
                <div className="border border-red-600/40 bg-white p-5 shadow-[8px_8px_0_rgba(220,38,38,0.12)]">
                  <div className="flex items-center justify-between text-[9.5px] font-bold uppercase tracking-[0.26em] text-red-600">
                    <span>Eye emergency — 24×7</span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-slate-600">Sudden vision loss, flashes, injury or chemical splash — do not wait for an appointment.</p>
                  <a href="tel:+919322364002" className="mt-4 flex items-center justify-center gap-2 bg-red-600 py-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-700"><Phone size={13} /> Call now</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= RELATED — THE INDEX ================= */}
      {related.length > 0 && (
        <section className="border-t border-slate-950/15" style={{ backgroundColor: PAPER, ...NOISE }}>
          <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#0B4DA2]">Keep exploring</span>
                  <span className="h-px w-16 bg-slate-950/20" />
                </div>
                <h3 className="mt-4 font-display text-[28px] font-extrabold tracking-tight text-slate-950 lg:text-[40px]">Related conditions</h3>
              </div>
              <Link to="/eye-diseases" className="flex items-center gap-2.5 border border-slate-950/20 bg-white/60 px-5 py-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-slate-950 transition-colors hover:border-slate-950 hover:bg-white">
                The complete index <ArrowRight size={13} />
              </Link>
            </div>

            <div className="mt-10 border-t-2 border-slate-950">
              {related.slice(0, 6).map((r, i) => {
                const thumb = relatedThumb(r);
                return (
                  <Link
                    key={r.slug}
                    to={`/eye-diseases/${r.slug}`}
                    className="group grid grid-cols-[42px_minmax(0,1fr)_44px] items-center gap-4 border-b border-slate-950/15 px-2 py-5 transition-colors hover:bg-white md:grid-cols-[60px_minmax(0,1fr)_minmax(0,380px)_96px_48px] md:gap-6 md:px-4 lg:grid-cols-[60px_minmax(0,380px)_minmax(0,1fr)_96px_48px]"
                  >
                    <span className="font-display text-[22px] font-extrabold leading-none text-slate-950/15 transition-colors group-hover:text-[#0B4DA2] md:text-[26px]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-[16px] font-bold leading-snug text-slate-950 md:text-[19px]">{r.title}</span>
                      <span className="mt-1 hidden text-[11px] uppercase tracking-[0.18em] text-slate-400 md:block">Guide Nº {pad(r.index)}</span>
                    </span>
                    <span className="hidden min-w-0 md:block">
                      <span className="line-clamp-2 text-[12.5px] leading-relaxed text-slate-500">{cleanLede(r.title, r.shortDesc)}</span>
                    </span>
                    <span className="hidden h-16 w-24 overflow-hidden border border-slate-950/15 bg-[#101418] md:block">
                      {thumb
                        ? <img src={thumb} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        : <span className="flex h-full w-full items-center justify-center text-white/40"><Eye size={18} /></span>}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center justify-self-end border border-slate-950/20 text-slate-950 transition-all duration-300 group-hover:border-[#101418] group-hover:bg-[#101418] group-hover:text-[#FAF8F4]">
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-9 text-center md:text-left">
              <Link to="/eye-diseases" className="inline-flex items-center gap-3 bg-[#101418] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0B4DA2]">
                Browse all {eyeDiseases.length} guides <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= PREV / NEXT ================= */}
      {(prevDisease || nextDisease) && (
        <section className="border-t border-slate-950/15 bg-white">
          <div className="grid divide-y divide-slate-950/15 md:grid-cols-2 md:divide-x md:divide-y-0">
            {prevDisease ? (
              <Link to={`/eye-diseases/${prevDisease.slug}`} className="group flex flex-col gap-4 px-6 py-12 transition-colors hover:bg-[#101418] lg:px-14 lg:py-16">
                <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500 transition-colors group-hover:text-white/60">
                  <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1.5" /> Previous — Nº {pad(prevDisease.index)}
                </span>
                <span className="font-display text-[24px] font-extrabold leading-tight tracking-tight text-slate-950 transition-colors group-hover:text-[#FAF8F4] lg:text-[34px]">{prevDisease.title}</span>
              </Link>
            ) : <div className="hidden md:block" />}
            {nextDisease ? (
              <Link to={`/eye-diseases/${nextDisease.slug}`} className="group flex flex-col items-start gap-4 px-6 py-12 transition-colors hover:bg-[#101418] md:items-end md:text-right lg:px-14 lg:py-16">
                <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500 transition-colors group-hover:text-white/60">
                  Next — Nº {pad(nextDisease.index)} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <span className="font-display text-[24px] font-extrabold leading-tight tracking-tight text-slate-950 transition-colors group-hover:text-[#FAF8F4] lg:text-[34px]">{nextDisease.title}</span>
              </Link>
            ) : <div className="hidden md:block" />}
          </div>
        </section>
      )}

      {/* Persistent thumb-friendly action for mobile visitors */}
      {showMobileCta && (
        <div className="fixed inset-x-3 bottom-3 z-50 md:hidden">
          <div className="flex items-stretch gap-2 border border-white/15 bg-[#101418]/95 p-2 shadow-[0_18px_55px_rgba(16,20,24,0.45)] backdrop-blur-xl">
            <Link to="/contact" className="flex min-w-0 flex-1 items-center justify-center gap-2 bg-[#00D4AA] px-3 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#101418] transition active:scale-[0.98]">
              <Calendar size={15} /> Book an eye exam
            </Link>
            <a href="tel:+919322364002" aria-label="Call Ashu Laser Vision" className="flex w-12 shrink-0 items-center justify-center border border-white/15 bg-white/10 text-white">
              <Phone size={17} />
            </a>
            <button type="button" onClick={() => setShowMobileCta(false)} aria-label="Close appointment options" className="flex w-9 shrink-0 items-center justify-center text-slate-400">
              <X size={15} />
            </button>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
