import { useState } from 'react';
import { Phone, Menu, X, ChevronUp } from 'lucide-react';

function WhatsAppIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l4.99-1.33C8.47 21.51 10.18 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.84 14.4c-.2.55-1.12 1.02-1.58 1.09-.43.06-1.12.28-3.75-.78-3.16-1.29-5.18-4.56-5.33-4.77-.16-.22-1.26-1.67-1.26-3.2 0-1.52.8-2.27 1.08-2.58.28-.3.61-.38.82-.38l.58.01c.19.01.45-.07.7.53.25.6.85 2.09.93 2.24.08.15.14.33.03.54-.1.2-.15.32-.3.5-.14.17-.3.37-.43.49-.13.13-.27.27-.12.53.15.26.67 1.1 1.43 1.79 1.02.9 1.95 1.18 2.25 1.31.28.12.45.1.6-.06.15-.16.67-.78.85-1.05.18-.27.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.31.06.11.06.64-.14 1.19z"/>
    </svg>
  );
}

export default function MobileToggleButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[50] lg:hidden">
      {/* Dev Box Container */}
      <div className="relative">
        {/* Expanded buttons */}
        <div
          className={`flex flex-col gap-3 mb-2 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
          }`}
        >
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919322364002"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.45)] flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group relative"
          >
            <WhatsAppIcon size={26} />
            {/* Label tooltip */}
            <span className="absolute right-[68px] top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">
              WhatsApp Chat
            </span>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
          </a>

          {/* Call Button */}
          <a
            href="tel:+919322364002"
            aria-label="Call Now"
            className="w-14 h-14 rounded-full bg-[#0B4DA2] shadow-[0_8px_24px_rgba(11,77,162,0.45)] flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group relative"
          >
            <Phone size={26} strokeWidth={2} />
            <span className="absolute right-[68px] top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">
              Call Now
            </span>
          </a>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle WhatsApp and Call"
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0F172A] to-[#1e293b] shadow-[0_8px_28px_rgba(15,23,42,0.35)] border border-slate-700/40 flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_12px_36px_rgba(15,23,42,0.55)] transition-all duration-300 active:scale-95 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0B4DA2]/20 to-transparent pointer-events-none"></div>
          {isOpen ? (
            <X size={22} strokeWidth={2.5} className="transition-transform duration-300" />
          ) : (
            <div className="flex flex-col items-center gap-[2px]">
              <ChevronUp size={16} strokeWidth={2.5} className="-mb-0.5" />
              <Menu size={16} strokeWidth={2.5} />
            </div>
          )}
          {/* Toggle label */}
          <span className="absolute right-[68px] top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 hover:opacity-100 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg">
            {isOpen ? 'Close' : 'Open'}
          </span>
        </button>
      </div>
    </div>
  );
}
