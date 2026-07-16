import { stats } from '../../data/content';

export default function Stats() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8 lg:py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
          {stats.map((s,i)=>(
            <div key={i} className="py-6 lg:py-8 px-4 lg:px-8 text-center lg:text-left">
              <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                <span className="text-[28px] lg:text-[36px] font-extrabold text-[#0B4DA2] tracking-tight font-display">{s.value}</span>
                <span className="hidden lg:inline w-1.5 h-1.5 rounded-full bg-[#0B4DA2]" />
              </div>
              <div className="font-semibold text-[13px] lg:text-[15px] mt-1">{s.label}</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest font-medium">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
