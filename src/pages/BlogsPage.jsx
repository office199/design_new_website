import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, BookOpen, Search, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/animations/PageTransition';
import { Reveal } from '../components/animations/Reveal';
import AppointmentCTA from '../components/sections/AppointmentCTA';
import { blogs } from '../data/content';

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Cataract", "LASIK & Refractive", "Retina & Vitreous", "Glaucoma", "Pediatric", "Diagnostics"];

  const filteredBlogs = blogs.filter(b => {
    const matchesCat = activeCategory === "All" || b.category.toLowerCase().includes(activeCategory.split(" ")[0].toLowerCase());
    const matchesSearch = searchQuery.trim() === "" || 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredBlog = filteredBlogs[0] || blogs[0];
  const remainingBlogs = filteredBlogs.filter(b => b.id !== featuredBlog?.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Eye Care & Health Blog - Ashu Laser Vision",
    "description": "Expert eye care articles, patient education guides, and clinical insights by Dr. Shahnawaz Kazi at Ashu Laser Vision, Andheri West Mumbai.",
    "url": "https://ashulaservision.com/blogs",
    "blogPost": blogs.map(b => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "description": b.short,
      "datePublished": b.date,
      "author": {
        "@type": "Person",
        "name": b.author
      },
      "url": `https://ashulaservision.com/blogs/${b.id}`
    }))
  };

  return (
    <PageTransition>
      <SEO
        title="Eye Health & Medical Blog | Dr. Shahnawaz Kazi - Ashu Laser Vision Mumbai"
        description="Read expert eye health articles on Cataract recovery, Contoura LASIK, Diabetic Retinopathy, Myopia control with Ortho-K, and Glaucoma early screening by Dr. Shahnawaz Kazi Gold Medalist."
        keywords="eye care blog mumbai, cataract recovery tips, contoura vision vs lasik, diabetic retinopathy symptoms, myopia control kids, glaucoma screening, eye specialist blog andheri"
        url="https://ashulaservision.com/blogs"
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <Reveal>
        <div className="bg-[#0A1931] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B4DA2]/50 to-transparent pointer-events-none" />
          <div className="absolute -right-20 top-0 w-[500px] h-[500px] bg-[#0B4DA2]/30 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-14 lg:py-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-blue-200">
              <BookOpen size={14} /> Patient Education & Clinical Insights
            </div>
            <h1 className="text-[34px] md:text-[56px] font-bold leading-[0.95] tracking-tight mt-6 max-w-4xl font-display">
              Eye Care Articles & <span className="text-blue-300">Medical Knowledge Hub</span>
            </h1>
            <p className="text-sm md:text-[16px] text-blue-100 mt-4 max-w-3xl leading-relaxed">
              Empowering you with clinically accurate, evidence-based guides on modern laser eye surgeries, cataract recovery protocols, retina protection, and pediatric eye health authored by Dr. Shahnawaz Kazi (FMRF, FRCS, Gold Medalist).
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl relative">
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles (e.g., Cataract, LASIK, Retina, Dry Eye)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-slate-800 pl-11 pr-4 py-3.5 rounded-full text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-xs font-semibold text-[#0B4DA2] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Category Filter Pills */}
      <Reveal>
        <div className="bg-slate-50 border-b border-slate-200 sticky top-[72px] lg:top-[84px] z-30 shadow-sm">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mr-2 flex items-center gap-1">
                <Tag size={13} /> Filter:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#0B4DA2] text-white shadow-md shadow-blue-900/10'
                      : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Main Blog Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-[28px] border border-slate-200 max-w-2xl mx-auto">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 font-display">No Articles Found</h3>
            <p className="text-slate-500 text-sm mt-2">No articles matched "{searchQuery}" in the selected category. Try clearing filters or searching for another term.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-6 bg-[#0B4DA2] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#083A7A] transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Blog Card */}
            {featuredBlog && (
              <Reveal>
                <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(11,77,162,0.12)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[260px] sm:min-h-[340px] overflow-hidden bg-slate-100 group">
                    <img
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#0B4DA2] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Sparkles size={13} /> FEATURED ARTICLE
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3 flex-wrap">
                        <span className="bg-blue-50 text-[#0B4DA2] px-3 py-1 rounded-full font-bold">
                          {featuredBlog.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-[#0B4DA2]" /> {featuredBlog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-[#0B4DA2]" /> {featuredBlog.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight font-display hover:text-[#0B4DA2] transition">
                        <Link to={`/blogs/${featuredBlog.id}`}>{featuredBlog.title}</Link>
                      </h2>

                      <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mt-4 line-clamp-3">
                        {featuredBlog.short}
                      </p>

                      {/* Key takeaways bullet */}
                      {featuredBlog.keyTakeaways && (
                        <div className="mt-5 bg-slate-50 border-l-4 border-[#0B4DA2] p-3.5 rounded-r-xl">
                          <div className="text-xs font-bold text-[#0B4DA2] uppercase tracking-wider mb-1">Key Insight:</div>
                          <p className="text-xs text-slate-700 font-medium leading-normal italic">
                            "{featuredBlog.keyTakeaways[0]}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-blue-100 shrink-0 flex items-center justify-center">
                          <User size={18} className="text-[#0B4DA2]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{featuredBlog.author}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[160px] sm:max-w-none">Gold Medalist • 50K+ Surgeries</div>
                        </div>
                      </div>

                      <Link
                        to={`/blogs/${featuredBlog.id}`}
                        className="bg-[#0B4DA2] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#083A7A] transition flex items-center gap-1.5 shrink-0 shadow-md shadow-blue-900/15"
                      >
                        Read Full Article <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Grid of Remaining Blogs */}
            {remainingBlogs.length > 0 && (
              <Reveal>
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display flex items-center gap-2 border-l-4 border-[#0B4DA2] pl-3">
                    More Clinical Guides & Articles
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {remainingBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        className="bg-white rounded-[24px] border border-slate-200 overflow-hidden hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-blue-200 transition-all duration-300 flex flex-col group h-full"
                      >
                        <Link to={`/blogs/${blog.id}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#0B4DA2] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                            {blog.category}
                          </div>
                        </Link>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} className="text-[#0B4DA2]" /> {blog.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-[#0B4DA2]" /> {blog.readTime}
                              </span>
                            </div>

                            <h4 className="text-lg font-bold text-slate-900 leading-snug font-display group-hover:text-[#0B4DA2] transition line-clamp-2">
                              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </h4>

                            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mt-2.5 line-clamp-3">
                              {blog.short}
                            </p>
                          </div>

                          <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                              <CheckCircle2 size={13} className="text-emerald-500" /> By {blog.author}
                            </span>
                            <Link
                              to={`/blogs/${blog.id}`}
                              className="text-xs font-bold text-[#0B4DA2] group-hover:translate-x-1 transition inline-flex items-center gap-1"
                            >
                              Read <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </>
        )}

        {/* Appointment CTA Block */}
        <Reveal>
          <div className="mt-12">
            <AppointmentCTA />
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}
