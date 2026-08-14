"use client";
import { useSite } from "@/components/SiteProvider";

export default function Events() {
  const { siteData, content } = useSite();

  return (
    <div className={`min-h-[calc(100vh-73px)] ${siteData.colors.bg} relative p-8 md:p-16 flex flex-col items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_0)] bg-[length:30px_30px] opacity-20 z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-white drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">
          {content.events.title}
        </h1>

        <div className="bg-white border-[3px] border-black p-8 md:p-16 shadow-[12px_12px_0_0_rgba(0,0,0,1)] flex flex-col items-center w-full">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-black mb-6">
            {content.events.subtitle}
          </h2>
          
          <p className="text-black/80 font-bold text-lg md:text-xl uppercase leading-relaxed mb-10 max-w-2xl border-t-4 border-black pt-6">
            {content.events.text}
          </p>
          
          <button className={`border-[3px] border-black px-8 py-4 font-black uppercase text-xl md:text-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:scale-95 transition-all ${siteData.colors.accent} ${siteData.colors.accentText}`}>
            {content.events.btn}
          </button>
        </div>
      </div>
    </div>
  );
}