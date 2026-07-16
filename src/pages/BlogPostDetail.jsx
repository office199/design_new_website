import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Award, CheckCircle2, Phone, Sparkles, HelpCircle, BookOpen, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/animations/PageTransition';
import { Reveal } from '../components/animations/Reveal';
import AppointmentCTA from '../components/sections/AppointmentCTA';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { blogs, doctor } from '../data/content';

export default function BlogPostDetail() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id) || blogs[0];

  const relatedBlogs = blogs.filter(b => b.id !== blog.id && (b.category === blog.category || b.tags.some(t => blog.tags.includes(t)))).slice(0, 3);
  const fallbackRelated = blogs.filter(b => b.id !== blog.id).slice(0, 3);
  const displayedRelated = relatedBlogs.length > 0 ? relatedBlogs : fallbackRelated;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.short,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.short,
    "image": `https://ashulaservision.com${blog.image}`,
    "author": {
      "@type": "Person",
      "name": blog.author,
      "jobTitle": blog.authorRole,
      "url": "https://ashulaservision.com/doctor"
    },
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Ashu Laser Vision - Super Specialty Eye Hospital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ashulaservision.com/images/ashu-logo-mark.png"
      }
    },
    "datePublished": blog.date,
    "dateModified": blog.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ashulaservision.com/blogs/${blog.id}`
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`${blog.title} | Dr. Shahnawaz Kazi - Ashu Laser Vision`}
        description={blog.metaDescription || blog.short}
        keywords={blog.tags.join(', ')}
        url={`https://ashulaservision.com/blogs/${blog.id}`}
        jsonLd={jsonLd}
      />

      {/* Top Breadcrumb & Header */}
      <Reveal>
        <div className="bg-[#F8FAFF] border-b border-slate-200 py-10 lg:py-14">
          <div className="max-w-[1000px] mx-auto px-4 md:px-6 lg:px-8">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B4DA2] hover:underline mb-6 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition" /> Back to All Articles
            </Link>

            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span className="bg-[#0B4DA2] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {blog.category}
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Calendar size={14} className="text-[#0B4DA2]" /> {blog.date}
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Clock size={14} className="text-[#0B4DA2]" /> {blog.readTime}
              </span>
            </div>

            <h1 className="text-[28px] sm:text-[38px] lg:text-[46px] font-bold text-slate-900 leading-[1.1] font-display tracking-tight">
              {blog.title}
            </h1>

            {/* Author bar */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0B4DA2] bg-blue-100 shrink-0 flex items-center justify-center">
                  <User size={24} className="text-[#0B4DA2]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {blog.author} <Award size={15} className="text-[#0B4DA2]" />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{blog.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-blue-300 transition shadow-sm"
                >
                  <Share2 size={14} className="text-[#0B4DA2]" /> Share Article
                </button>
                <a
                  href="https://wa.me/919322364002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#1ebe5d] transition shadow-sm"
                >
                  <WhatsAppIcon size={14} /> Ask Doctor
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Main Article Body */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 lg:px-8 py-10 lg:py-14">
        {/* Featured Banner Image */}
        <Reveal>
          <div className="rounded-[28px] lg:rounded-[36px] overflow-hidden aspect-[16/9] shadow-xl border border-slate-200 bg-slate-100 mb-10 relative">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
              Medically Reviewed by Ashu Laser Vision Clinical Board
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Short introduction box */}
            <Reveal>
              <div className="text-lg font-medium leading-relaxed text-slate-800 border-l-4 border-[#0B4DA2] pl-5 italic bg-blue-50/50 py-3 rounded-r-2xl">
                {blog.short}
              </div>
            </Reveal>

            {/* Key Takeaways Box */}
            {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
              <Reveal>
                <div className="bg-[#0A1931] text-white rounded-[24px] p-6 sm:p-8 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0B4DA2]/20 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="flex items-center gap-2.5 text-blue-300 font-bold text-sm uppercase tracking-wider mb-4 font-display">
                    <Sparkles size={18} className="text-amber-400 shrink-0" /> Key Clinical Takeaways
                  </div>

                  <ul className="space-y-3.5 relative z-10">
                    {blog.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-[14.5px] text-blue-50 leading-relaxed">
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* Sections */}
            {blog.sections && blog.sections.map((sec, idx) => (
              <Reveal key={idx}>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 font-display tracking-tight border-b pb-2 border-slate-100">
                    {sec.heading}
                  </h2>

                  {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-700 text-[15px] sm:text-[16px] leading-[1.8]">
                      {p}
                    </p>
                  ))}

                  {sec.list && (
                    <ul className="space-y-3 pt-2 pl-2">
                      {sec.list.map((item, lIdx) => {
                        const [title, desc] = item.includes(':') ? item.split(':') : [null, item];
                        return (
                          <li key={lIdx} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-slate-700 leading-[1.7]">
                            <span className="w-2 h-2 rounded-full bg-[#0B4DA2] shrink-0 mt-2.5" />
                            <div>
                              {title ? <strong className="font-bold text-slate-900">{title}:</strong> : null} {desc}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}

            {/* FAQ Section */}
            {blog.faq && blog.faq.length > 0 && (
              <Reveal>
                <div className="bg-[#F8FAFF] rounded-[24px] border border-slate-200 p-6 sm:p-8 mt-10">
                  <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2 mb-6">
                    <HelpCircle size={22} className="text-[#0B4DA2]" /> Frequently Asked Questions
                  </h3>

                  <div className="space-y-5">
                    {blog.faq.map((f, fIdx) => (
                      <div key={fIdx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                        <div className="font-bold text-slate-900 text-[15px] flex items-start gap-2">
                          <span className="text-[#0B4DA2] font-bold">Q:</span> {f.q}
                        </div>
                        <div className="text-slate-600 text-sm mt-2 leading-relaxed pl-5 border-l-2 border-blue-100">
                          {f.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Article Tags */}
            <Reveal>
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider">Topics:</span>
                {blog.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/blogs`}
                    className="bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold hover:bg-[#0B4DA2] hover:text-white transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Doctor Bio Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm sticky top-[100px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                  <User size={28} className="text-[#0B4DA2]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base leading-tight">{doctor.name}</h4>
                  <div className="text-xs font-semibold text-[#0B4DA2] mt-0.5">Gold Medalist • FRCS Glasgow</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">17+ Years Exp • 50,000+ Surgeries</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {doctor.bio.substring(0, 180)}...
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                <Link
                  to="/doctor"
                  className="w-full bg-slate-100 text-slate-800 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
                >
                  View Complete Credentials <ArrowRight size={13} />
                </Link>
                <Link
                  to="/contact"
                  className="w-full bg-[#0B4DA2] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#083A7A] transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/15"
                >
                  <Phone size={13} /> Book Consultation Now
                </Link>
              </div>

              {/* Clinic mini info */}
              <div className="mt-6 pt-4 border-t border-slate-100 bg-blue-50/60 rounded-xl p-3 text-[11px] text-slate-600">
                <div className="font-bold text-[#0B4DA2] uppercase tracking-wider mb-1">Ashu Laser Vision Center</div>
                <div>Pearl Plaza, Opp Andheri Rly Platform 1, Next to McDonald's, Andheri West Mumbai 400058</div>
                <div className="mt-1 font-bold text-slate-800">Direct Helpline: +91 93223 64002</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Box */}
        <Reveal>
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2 mb-8">
              <BookOpen size={24} className="text-[#0B4DA2]" /> Related Articles You May Like
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedRelated.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blogs/${rel.id}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition flex flex-col group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2 left-2 bg-white/90 text-[#0B4DA2] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {rel.category}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 mb-1.5">{rel.date} • {rel.readTime}</div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0B4DA2] transition line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B4DA2]">
                      <span>Read Article</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-16">
            <AppointmentCTA />
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}
