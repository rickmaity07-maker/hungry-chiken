"use client";

import { useSite } from "@/components/SiteProvider";

export default function Menu() {
  const { siteData, content } = useSite();

  return (
    <div className={`min-h-[100dvh] ${siteData.colors.bg} relative p-4 md:p-16 overflow-hidden`}>
      
      {/* Heavy Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_0)] bg-[length:20px_20px] md:bg-[length:30px_30px] opacity-20 z-0 pointer-events-none"></div>

      <div className="relative z-20 max-w-6xl mx-auto pt-4 md:pt-4">
        
        {/* Dynamic Translated Title */}
        <h1 className={`text-5xl md:text-9xl font-black uppercase tracking-tighter mb-10 md:mb-20 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-center md:text-left`}>
          {content.menuTitle}
        </h1>

        <div className="space-y-16 md:space-y-24">
          {siteData.menu?.map((categoryObj: any, catIdx: number) => (
            <div key={catIdx} className="relative">
              
              {/* Category Sticker Label */}
              <div className="inline-block bg-white border-[2px] md:border-[3px] border-black px-4 md:px-6 py-1.5 md:py-2 mb-6 md:mb-10 shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transform -rotate-2">
                <h2 className="text-xl md:text-3xl font-black text-black uppercase tracking-tighter">
                  {categoryObj.category}
                </h2>
              </div>

              {/* Grid of Menu Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {categoryObj.items.map((item: any, itemIdx: number) => (
                  <div
                    key={itemIdx}
                    className="bg-white border-[2px] md:border-[3px] border-black p-4 md:p-6 flex flex-col justify-between shadow-[6px_6px_0_0_rgba(0,0,0,1)] md:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_rgba(0,0,0,1)] md:hover:-translate-y-2 md:hover:shadow-[16px_16px_0_0_rgba(0,0,0,1)] transition-all duration-200 cursor-default group"
                  >
                    <div className="flex flex-row justify-between items-start mb-3 md:mb-4 gap-4">
                      <h3 className="text-xl md:text-2xl font-black uppercase text-black flex-1 leading-tight">{item.name}</h3>
                      <span className={`border-[2px] md:border-[3px] border-black font-black px-2 md:px-4 py-1 text-sm md:text-lg shadow-[3px_3px_0_0_rgba(0,0,0,1)] md:shadow-[4px_4px_0_0_rgba(0,0,0,1)] whitespace-nowrap ${siteData.colors.accent} ${siteData.colors.accentText}`}>
                        {item.price}
                      </span>
                    </div>
                    <p className="text-black/80 font-bold leading-snug uppercase text-xs md:text-sm border-t-2 border-dashed border-black/20 pt-3 md:pt-4">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}