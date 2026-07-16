import { Phone } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';

function FacebookIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function MobileToggleButtons() {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[50]">
      <div className="flex flex-col items-center gap-2.5">
        {/* Facebook Button */}
        <a
          href="https://www.facebook.com/AshuLaserVision/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="w-11 h-11 rounded-full bg-[#1877F2] shadow-[0_6px_20px_rgba(24,119,242,0.4)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 group relative shrink-0"
        >
          <FacebookIcon size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-[11px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg z-10">
            Facebook
          </span>
        </a>

        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/ashueyehospital/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[0_6px_20px_rgba(220,39,67,0.4)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 group relative shrink-0"
        >
          <InstagramIcon size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-[11px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg z-10">
            Instagram
          </span>
        </a>

        {/* LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/shahnawaz-kazi-971a067b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-11 h-11 rounded-full bg-[#0A66C2] shadow-[0_6px_20px_rgba(10,102,194,0.4)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 group relative shrink-0"
        >
          <LinkedinIcon size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-[11px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg z-10">
            LinkedIn
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919322364002"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-11 h-11 rounded-full bg-[#25D366] shadow-[0_6px_20px_rgba(37,211,102,0.4)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 group relative shrink-0"
        >
          <WhatsAppIcon size={22} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-[11px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg z-10">
            WhatsApp
          </span>
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
        </a>

        {/* Call Button */}
        <a
          href="tel:+919322364002"
          aria-label="Call Now"
          className="w-11 h-11 rounded-full bg-[#0B4DA2] shadow-[0_6px_20px_rgba(11,77,162,0.4)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 group relative shrink-0"
        >
          <Phone size={20} strokeWidth={2} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-[11px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-lg z-10">
            Call Now
          </span>
        </a>
      </div>
    </div>
  );
}
