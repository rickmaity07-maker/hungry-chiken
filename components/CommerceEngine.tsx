"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSite } from "./SiteProvider";

type CartItem = { 
  id: string; 
  name: string; 
  price: number; 
  brand: 'sweets' | 'grill'; 
  quantity: number;
  image: string;
  instructions: string;
};

type CommerceContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  updateInstructions: (id: string, text: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (val: boolean) => void;
};

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export function useCommerce() {
  const context = useContext(CommerceContext);
  // SAFETY FALLBACK: Instead of throwing an error that crashes the app, 
  // return a safe dummy state if context isn't ready yet during SSR.
  if (!context) {
    return {
      cart: [],
      addToCart: () => {},
      updateQuantity: () => {},
      removeItem: () => {},
      updateInstructions: () => {},
      isCartOpen: false,
      setIsCartOpen: () => {},
      isProfileOpen: false,
      setIsProfileOpen: () => {}
    };
  }
  return context;
}

export function CommerceEngine({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<'login' | 'orders' | 'wishlist' | 'inbox'>('login');
  const [isMounted, setIsMounted] = useState(false);
  const { siteData } = useSite();

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('hc_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('hc_cart', JSON.stringify(cart));
  }, [cart, isMounted]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateInstructions = (id: string, text: string) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, instructions: text } : item));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + tax;

  return (
    <CommerceContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, updateInstructions, isCartOpen, setIsCartOpen, isProfileOpen, setIsProfileOpen }}>
      {children}

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-3">
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="w-12 h-12 md:w-16 md:h-16 bg-white border-[3px] border-black rounded-full shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center text-xl md:text-2xl hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
        >
          👤
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className={`relative w-12 h-12 md:w-16 md:h-16 ${siteData.colors.bg} text-white border-[3px] border-black rounded-full shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center text-xl md:text-2xl hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all`}
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full border-l-[4px] border-black flex flex-col shadow-[-10px_0_0_0_rgba(0,0,0,0.2)] animate-in slide-in-from-right duration-300">
            <div className={`p-6 border-b-[4px] border-black flex justify-between items-center ${siteData.colors.bg}`}>
              <h2 className="text-3xl font-black uppercase text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white text-3xl font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">×</button>
            </div>
            
            <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-[radial-gradient(#d4d4d4_2px,transparent_0)] bg-[length:20px_20px]">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-6xl mb-4">🍗</span>
                  <p className="font-bold text-xl uppercase font-mono">Your cart is starving.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white border-[3px] border-black p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-3">
                      <div className="flex gap-3 items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border-[2px] border-black" />
                        <div className="flex-1">
                          <h4 className="font-black uppercase leading-tight text-sm md:text-base">{item.name}</h4>
                          <span className="font-black text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-2xl leading-none hover:text-red-600 transition-colors px-2 pb-1">×</button>
                      </div>

                      <div className="flex gap-2 h-10">
                        <div className="flex items-center border-[2px] border-black h-full bg-gray-100">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-3 h-full font-black hover:bg-black hover:text-white transition-colors">-</button>
                          <span className="px-2 font-black text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-3 h-full font-black hover:bg-black hover:text-white transition-colors">+</button>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Notes? (e.g. No mayo)" 
                          value={item.instructions}
                          onChange={(e) => updateInstructions(item.id, e.target.value)}
                          className="flex-1 border-[2px] border-black px-2 text-xs font-bold uppercase focus:outline-none focus:ring-2 ring-black placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t-[4px] border-black bg-white">
              <div className="flex justify-between items-center mb-1 font-mono font-bold text-sm text-gray-500 uppercase">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 font-mono font-bold text-sm text-gray-500 uppercase">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 font-black uppercase text-2xl border-t-2 border-dashed border-gray-300 pt-2">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <button disabled={cart.length === 0} className={`w-full py-4 border-[3px] border-black font-black uppercase text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${siteData.colors.accent} ${siteData.colors.accentText}`}>
                Checkout (Cash)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER PROFILE MODAL */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white border-[4px] border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b-[4px] border-black bg-gray-100">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <button onClick={() => setProfileTab('login')} className={`px-3 py-1 font-bold uppercase border-[2px] border-black text-xs ${profileTab === 'login' ? 'bg-black text-white' : 'bg-white'}`}>Login</button>
                <button onClick={() => setProfileTab('orders')} className={`px-3 py-1 font-bold uppercase border-[2px] border-black text-xs ${profileTab === 'orders' ? 'bg-black text-white' : 'bg-white'}`}>Orders</button>
                <button onClick={() => setProfileTab('wishlist')} className={`px-3 py-1 font-bold uppercase border-[2px] border-black text-xs ${profileTab === 'wishlist' ? 'bg-black text-white' : 'bg-white'}`}>Wishlist</button>
                <button onClick={() => setProfileTab('inbox')} className={`px-3 py-1 font-bold uppercase border-[2px] border-black text-xs ${profileTab === 'inbox' ? 'bg-black text-white' : 'bg-white'}`}>Inbox</button>
              </div>
              <button onClick={() => setIsProfileOpen(false)} className="text-2xl font-black ml-2 leading-none pb-1">×</button>
            </div>

            <div className="p-8 overflow-y-auto">
              {profileTab === 'login' && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase mb-6 text-center">Login</h2>
                  <button className="w-full bg-white border-[3px] border-black py-3 font-bold uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                    <span>G</span> Continue with Google
                  </button>
                  <button className="w-full bg-blue-600 text-white border-[3px] border-black py-3 font-bold uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                    <span>f</span> Continue with Facebook
                  </button>
                  <div className="text-center font-mono text-sm font-bold my-4">OR</div>
                  <input type="email" placeholder="EMAIL ADDRESS" className="w-full border-[3px] border-black p-3 font-bold uppercase focus:outline-none focus:ring-4 ring-[#FFC000]" />
                  <button className="w-full bg-black text-white border-[3px] border-black py-3 font-black uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-gray-800 transition-colors">
                    Send Magic Link
                  </button>
                </div>
              )}

              {profileTab === 'orders' && (
                <div className="text-center py-10">
                  <span className="text-4xl">🧾</span>
                  <h3 className="font-black uppercase mt-4 text-xl">No Past Orders</h3>
                  <p className="font-mono text-sm mt-2 text-gray-500">Log in to see your buying history.</p>
                </div>
              )}

              {profileTab === 'wishlist' && (
                <div className="text-center py-10">
                  <span className="text-4xl">❤️</span>
                  <h3 className="font-black uppercase mt-4 text-xl">Wishlist Empty</h3>
                  <p className="font-mono text-sm mt-2 text-gray-500">Save your favorite dishes here.</p>
                </div>
              )}

              {profileTab === 'inbox' && (
                <div className="text-center py-10">
                  <span className="text-4xl">🔔</span>
                  <h3 className="font-black uppercase mt-4 text-xl">Inbox Zero</h3>
                  <p className="font-mono text-sm mt-2 text-gray-500">Order updates will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CommerceContext.Provider>
  );
}