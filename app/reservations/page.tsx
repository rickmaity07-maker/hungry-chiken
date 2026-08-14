"use client";

import { useSite } from "@/components/SiteProvider";
import { useState } from "react";

const t = {
  de: {
    sweetsTitle: "PLATZ BUCHEN.",
    visitUs: "Besuche Uns",
    name: "VOLLSTÄNDIGER NAME",
    guests: "ANZAHL GÄSTE",
    reserve: "JETZT RESERVIEREN",
    grillTitle: "RESERVIERUNGEN",
    tableBooking: "TISCHRESERVIERUNG",
    cateringReq: "CATERING-ANFRAGE",
    grabTable: "Schnapp dir einen Tisch",
    feedBlock: "Füttere den Block",
    companyName: "FIRMA ODER VOLLSTÄNDIGER NAME",
    estGuests: "GESCHÄTZTE GÄSTE",
    eventType: "ART DER VERANSTALTUNG WÄHLEN",
    eventCorp: "Firmenfeier",
    eventBirth: "Geburtstagsparty",
    eventWed: "Hochzeit / Empfang",
    eventOther: "Sonstiges",
    reqs: "BESONDERE WÜNSCHE? (Z.B. ALLERGIEN, EXTRAS)",
    confirm: "BUCHUNG BESTÄTIGEN",
    quote: "ANGEBOT ANFORDERN"
  },
  en: {
    sweetsTitle: "BOOK A SPOT.",
    visitUs: "Visit Us",
    name: "FULL NAME",
    guests: "NUMBER OF GUESTS",
    reserve: "RESERVE NOW",
    grillTitle: "RESERVATIONS",
    tableBooking: "TABLE BOOKING",
    cateringReq: "CATERING REQUEST",
    grabTable: "Grab A Table",
    feedBlock: "Feed The Block",
    companyName: "COMPANY OR FULL NAME",
    estGuests: "ESTIMATED GUESTS",
    eventType: "SELECT EVENT TYPE",
    eventCorp: "Corporate Event",
    eventBirth: "Birthday Party",
    eventWed: "Wedding / Reception",
    eventOther: "Other",
    reqs: "ANY SPECIFIC MENU REQUIREMENTS? (E.G. ALLERGIES)",
    confirm: "CONFIRM BOOKING",
    quote: "REQUEST A QUOTE"
  }
};

function SweetsReservations({ colors, lang }: { colors: any, lang: 'de' | 'en' }) {
  const text = t[lang];

  return (
    <div className={`min-h-[calc(100vh-73px)] ${colors.bg} relative p-4 md:p-16 flex flex-col items-center justify-center`}>
      {/* INCREASED OPACITY HERE (was opacity-10, now opacity-40) */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_0)] bg-[length:20px_20px] md:bg-[length:30px_30px] opacity-40 z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center py-10">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-12 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-center">
          {text.sweetsTitle}
        </h1>

        <div className="bg-white border-[3px] border-black p-6 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] md:shadow-[12px_12px_0_0_rgba(0,0,0,1)] w-full">
          <form className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase border-b-4 border-black pb-3 md:pb-4 mb-2 text-black">{text.visitUs}</h2>
            
            <input type="text" placeholder={text.name} className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FFC000] text-black placeholder:text-black/50" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <input type="date" className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FFC000] text-black" />
              <input type="number" placeholder={text.guests} className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FFC000] text-black placeholder:text-black/50" />
            </div>

            <button type="button" className={`mt-4 md:mt-6 border-[3px] border-black py-3 md:py-4 font-black uppercase text-xl md:text-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:scale-95 transition-all ${colors.accent} ${colors.accentText}`}>
              {text.reserve}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function GrillReservations({ colors, lang }: { colors: any, lang: 'de' | 'en' }) {
  const [formType, setFormType] = useState<'table' | 'catering'>('table');
  const text = t[lang];

  return (
    <div className={`min-h-[calc(100vh-73px)] ${colors.bg} relative p-4 md:p-16 flex flex-col items-center justify-center`}>
      {/* INCREASED OPACITY HERE (was opacity-20, now opacity-50) */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_0)] bg-[length:20px_20px] md:bg-[length:30px_30px] opacity-50 z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center py-10">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-12 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-center">
          {text.grillTitle}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 w-full justify-center">
          <button
            onClick={() => setFormType('table')}
            className={`border-[3px] border-black px-6 py-3 md:px-8 md:py-4 font-black uppercase text-sm md:text-xl transition-all ${
              formType === 'table' 
                ? `${colors.accent} ${colors.accentText} shadow-none translate-y-1 translate-x-1` 
                : 'bg-white text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]'
            }`}
          >
            {text.tableBooking}
          </button>
          <button
            onClick={() => setFormType('catering')}
            className={`border-[3px] border-black px-6 py-3 md:px-8 md:py-4 font-black uppercase text-sm md:text-xl transition-all ${
              formType === 'catering' 
                ? `${colors.accent} ${colors.accentText} shadow-none translate-y-1 translate-x-1` 
                : 'bg-white text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]'
            }`}
          >
            {text.cateringReq}
          </button>
        </div>

        <div className="bg-white border-[3px] border-black p-6 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] md:shadow-[12px_12px_0_0_rgba(0,0,0,1)] w-full">
          
          {formType === 'table' && (
            <form className="flex flex-col gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl md:text-3xl font-black uppercase border-b-4 border-black pb-3 md:pb-4 mb-2 text-black">{text.grabTable}</h2>
              
              <input type="text" placeholder={text.name} className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black placeholder:text-black/50" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <input type="date" className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black" />
                <input type="time" className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black" />
              </div>
              
              <input type="number" placeholder={text.guests} className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black placeholder:text-black/50" />
              
              <button type="button" className={`mt-2 md:mt-4 border-[3px] border-black py-3 md:py-4 font-black uppercase text-xl md:text-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:scale-95 transition-all ${colors.accent} ${colors.accentText}`}>
                {text.confirm}
              </button>
            </form>
          )}

          {formType === 'catering' && (
            <form className="flex flex-col gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl md:text-3xl font-black uppercase border-b-4 border-black pb-3 md:pb-4 mb-2 text-black">{text.feedBlock}</h2>
              
              <input type="text" placeholder={text.companyName} className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black placeholder:text-black/50" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <input type="date" className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black" />
                <input type="number" placeholder={text.estGuests} className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black placeholder:text-black/50" />
              </div>
              
              <select defaultValue="" className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black bg-white">
                <option value="" disabled>{text.eventType}</option>
                <option value="corporate">{text.eventCorp}</option>
                <option value="birthday">{text.eventBirth}</option>
                <option value="wedding">{text.eventWed}</option>
                <option value="other">{text.eventOther}</option>
              </select>

              <textarea 
                placeholder={text.reqs} 
                rows={3}
                className="border-[2px] md:border-[3px] border-black p-3 md:p-4 text-sm md:text-base font-bold uppercase focus:outline-none focus:ring-4 ring-[#FF5A1F] text-black placeholder:text-black/50 resize-none"
              ></textarea>
              
              <button type="button" className={`mt-2 md:mt-4 border-[3px] border-black py-3 md:py-4 font-black uppercase text-xl md:text-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:scale-95 transition-all ${colors.accent} ${colors.accentText}`}>
                {text.quote}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

export default function Reservations() {
  const { activeSite, siteData, language } = useSite();

  if (activeSite === 'sweets') {
    return <SweetsReservations colors={siteData.colors} lang={language} />;
  }

  return <GrillReservations colors={siteData.colors} lang={language} />;
}