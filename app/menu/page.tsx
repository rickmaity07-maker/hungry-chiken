"use client";

import { useSite } from "@/components/SiteProvider";
import { useCommerce } from "@/components/CommerceEngine";

const MOCK_GRILL_MENU = [
  { id: 'g1', name: 'Spicy Fried Chicken', desc: 'Extra crispy, dipped in our signature hot oil.', price: 12.99, image: '/grill-1.jpg' },
  { id: 'g2', name: 'Classic Smashburger', desc: 'Double patty, american cheese, house sauce.', price: 14.50, image: '/grill-2.jpg' },
  { id: 'g3', name: 'Loaded Fries', desc: 'Smothered in cheese sauce and crispy bacon.', price: 8.99, image: '/grill-3.jpg' },
];

const MOCK_SWEETS_MENU = [
  { id: 's1', name: 'Fresh OJ', desc: 'Squeezed fresh daily. 100% organic.', price: 6.50, image: '/sweets-1.jpg' },
  { id: 's2', name: 'Strawberry Smoothie', desc: 'Thick, creamy, and dairy-free.', price: 7.99, image: '/sweets-2.jpg' },
  { id: 's3', name: 'Lemonade', desc: 'Tart, sweet, and perfectly iced.', price: 5.00, image: '/sweets-3.jpg' },
];

export default function MenuPage() {
  const { activeSite, siteData } = useSite();
  const { addToCart } = useCommerce();

  const isGrill = activeSite === 'grill';
  const currentMenu = isGrill ? MOCK_GRILL_MENU : MOCK_SWEETS_MENU;
  const pageTitle = isGrill ? "THE GRILL MENU" : "THE SWEETS MENU";

  return (
    <div className={`min-h-[calc(100vh-73px)] ${siteData.colors.bg} relative p-4 md:p-16 overflow-hidden`}>
      <div className={`absolute inset-0 bg-[radial-gradient(${isGrill ? '#FF5A1F' : '#000'}_2px,transparent_0)] bg-[length:20px_20px] md:bg-[length:30px_30px] opacity-20 z-0 pointer-events-none`}></div>

      <div className="relative z-20 max-w-6xl mx-auto pt-4 md:pt-8 text-center md:text-left">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 md:mb-16 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] md:drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">
          {pageTitle}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 pb-20">
          {currentMenu.map((item, idx) => (
            <div 
              key={item.id} 
              className={`bg-white border-[4px] border-black p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-all duration-300 flex flex-col ${idx % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'}`}
            >
              <div className="w-full aspect-square border-[3px] border-black overflow-hidden relative mb-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 font-black text-lg border-2 border-white">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col text-left">
                <h3 className="font-black uppercase text-xl md:text-2xl mb-2 leading-tight">{item.name}</h3>
                <p className="font-mono text-sm text-gray-600 mb-6 flex-1">{item.desc}</p>
                
                <button 
                  onClick={() => addToCart({ 
                    id: item.id, 
                    name: item.name, 
                    price: item.price, 
                    brand: activeSite as 'sweets' | 'grill', 
                    quantity: 1,
                    image: item.image,
                    instructions: ""
                  })}
                  className={`w-full py-3 border-[3px] border-black font-black uppercase text-lg hover:bg-black hover:text-white transition-colors ${siteData.colors.accent} ${siteData.colors.accentText}`}
                >
                  Eat Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}