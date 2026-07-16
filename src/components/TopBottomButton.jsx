import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBottomButton() {
  const [scrolled, setScrolled] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
      setScrolled(y);
      setProgress(pct);
      setVisible(y > 100);
      setShowGoTop(y > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // circumference for progress ring
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col gap-3">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex flex-col gap-3"
          >
            {/* Progress + Top Button */}
            <div className="relative group">
              {/* progress ring */}
              <svg width="56" height="56" className="absolute -inset-1 rotate-[-90deg] pointer-events-none">
                <circle cx="28" cy="28" r={radius} fill="transparent" stroke="rgba(11,77,162,0.15)" strokeWidth="3" />
                <circle
                  cx="28" cy="28" r={radius}
                  fill="transparent"
                  stroke="#0B4DA2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-150"
                />
              </svg>

              <button
                onClick={showGoTop ? scrollToTop : scrollToBottom}
                aria-label={showGoTop ? "Scroll to top" : "Scroll to bottom"}
                className="relative w-14 h-14 rounded-full bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#0B4DA2] hover:bg-[#0B4DA2] hover:text-white hover:border-[#0B4DA2] hover:shadow-[0_12px_32px_rgba(11,77,162,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {showGoTop ? <ArrowUp size={20} strokeWidth={2.5} /> : <ArrowDown size={20} strokeWidth={2.5} />}
              </button>

              {/* Tooltip */}
              <div className="absolute left-[68px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <div className="bg-[#0A1931] text-white text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap shadow-lg flex items-center gap-2">
                  {showGoTop ? 'Back to Top' : 'Go to Bottom'}
                  <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>

            {/* Dual buttons when scrolled mid page - show both top and bottom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex flex-col gap-2 ${scrolled > 300 && scrolled < document.documentElement.scrollHeight - 800 ? 'flex' : 'hidden lg:flex'}`}
            >
              {!showGoTop ? null : (
                <button
                  onClick={scrollToBottom}
                  aria-label="Scroll to bottom"
                  className="w-10 h-10 rounded-full bg-[#0A1931] text-white/80 shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 ml-2"
                  title="Go to Bottom"
                >
                  <ArrowDown size={16} />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always visible small indicator for accessibility - Top to Bottom label on mobile */}
      <div className="lg:hidden">
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#0A1931]/90 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-center"
            >
              {Math.round(progress)}% READ
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
