/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, RefreshCcw, Info, ArrowRightLeft, TrendingUp, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** 
 * SNEAKER SIZE CONVERSION DATA
 * Easily edit brands and sizes here.
 */
export type Brand = 'Nike' | 'Adidas' | 'New Balance' | 'Jordan' | 'Yeezy' | 'Puma' | 'Asics' | 'Converse' | 'Reebok';
export type Gender = 'Men' | 'Women' | 'Kids';
export interface SizeData {
  cm: number;
  us_m: number | string;
  us_w: number | string;
  uk: number | string;
  eu: number | string;
}
export type SizeMap = Record<Brand, SizeData[]>;

export const SIZE_DATA: SizeMap = {
  Nike: [
    { cm: 24, us_m: 6, us_w: 7.5, uk: 5.5, eu: 38.5 },
    { cm: 24.5, us_m: 6.5, us_w: 8, uk: 6, eu: 39 },
    { cm: 25, us_m: 7, us_w: 8.5, uk: 6, eu: 40 },
    { cm: 25.5, us_m: 7.5, us_w: 9, uk: 6.5, eu: 40.5 },
    { cm: 26, us_m: 8, us_w: 9.5, uk: 7, eu: 41 },
    { cm: 26.5, us_m: 8.5, us_w: 10, uk: 7.5, eu: 42 },
    { cm: 27, us_m: 9, us_w: 10.5, uk: 8, eu: 42.5 },
    { cm: 27.5, us_m: 9.5, us_w: 11, uk: 8.5, eu: 43 },
    { cm: 28, us_m: 10, us_w: 11.5, uk: 9, eu: 44 },
    { cm: 28.5, us_m: 10.5, us_w: 12, uk: 9.5, eu: 44.5 },
    { cm: 29, us_m: 11, us_w: 12.5, uk: 10, eu: 45 },
    { cm: 29.5, us_m: 11.5, us_w: 13, uk: 10.5, eu: 45.5 },
    { cm: 30, us_m: 12, us_w: 13.5, uk: 11, eu: 46 },
    { cm: 30.5, us_m: 12.5, us_w: 14, uk: 11.5, eu: 47 },
    { cm: 31, us_m: 13, us_w: 14.5, uk: 12, eu: 47.5 },
  ],
  Jordan: [
    { cm: 24, us_m: 6, us_w: 7.5, uk: 5.5, eu: 38.5 },
    { cm: 24.5, us_m: 6.5, us_w: 8, uk: 6, eu: 39 },
    { cm: 25, us_m: 7, us_w: 8.5, uk: 6, eu: 40 },
    { cm: 25.5, us_m: 7.5, us_w: 9, uk: 6.5, eu: 40.5 },
    { cm: 26, us_m: 8, us_w: 9.5, uk: 7, eu: 41 },
    { cm: 26.5, us_m: 8.5, us_w: 10, uk: 7.5, eu: 42 },
    { cm: 27, us_m: 9, us_w: 10.5, uk: 8, eu: 42.5 },
    { cm: 27.5, us_m: 9.5, us_w: 11, uk: 8.5, eu: 43 },
    { cm: 28, us_m: 10, us_w: 11.5, uk: 9, eu: 44 },
    { cm: 28.5, us_m: 10.5, us_w: 12, uk: 9.5, eu: 44.5 },
    { cm: 29, us_m: 11, us_w: 12.5, uk: 10, eu: 45 },
    { cm: 29.5, us_m: 11.5, us_w: 13, uk: 10.5, eu: 45.5 },
    { cm: 30, us_m: 12, us_w: 13.5, uk: 11, eu: 46 },
    { cm: 30.5, us_m: 12.5, us_w: 14, uk: 11.5, eu: 47 },
    { cm: 31, us_m: 13, us_w: 14.5, uk: 12, eu: 47.5 },
  ],
  Adidas: [
    { cm: 23.8, us_m: 6, us_w: 7.5, uk: 5.5, eu: 38.7 },
    { cm: 24.2, us_m: 6.5, us_w: 8, uk: 6, eu: 39.3 },
    { cm: 24.6, us_m: 7, us_w: 8.5, uk: 6.5, eu: 40 },
    { cm: 25.1, us_m: 7.5, us_w: 9, uk: 7, eu: 40.7 },
    { cm: 25.5, us_m: 8, us_w: 9.5, uk: 7.5, eu: 41.3 },
    { cm: 26, us_m: 8.5, us_w: 10, uk: 8, eu: 42 },
    { cm: 26.5, us_m: 9, us_w: 10.5, uk: 8.5, eu: 42.7 },
    { cm: 27.3, us_m: 9.5, us_w: 11, uk: 9, eu: 43.3 },
    { cm: 27.6, us_m: 10, us_w: 11.5, uk: 9.5, eu: 44 },
    { cm: 28, us_m: 10.5, us_w: 12, uk: 10, eu: 44.7 },
    { cm: 28.5, us_m: 11, us_w: 12.5, uk: 10.5, eu: 45.3 },
    { cm: 29, us_m: 11.5, us_w: 13, uk: 11, eu: 46 },
    { cm: 29.5, us_m: 12, us_w: 13.5, uk: 11.5, eu: 46.7 },
  ],
  Yeezy: [
    { cm: 23.8, us_m: 6, us_w: 7.5, uk: 5.5, eu: 38.7 },
    { cm: 24.2, us_m: 6.5, us_w: 8, uk: 6, eu: 39.3 },
    { cm: 24.6, us_m: 7, us_w: 8.5, uk: 6.5, eu: 40 },
    { cm: 25.1, us_m: 7.5, us_w: 9, uk: 7, eu: 40.7 },
    { cm: 25.5, us_m: 8, us_w: 9.5, uk: 7.5, eu: 41.3 },
    { cm: 26, us_m: 8.5, us_w: 10, uk: 8, eu: 42 },
    { cm: 26.5, us_m: 9, us_w: 10.5, uk: 8.5, eu: 42.7 },
    { cm: 27.3, us_m: 9.5, us_w: 11, uk: 9, eu: 43.3 },
    { cm: 28, us_m: 10, us_w: 11.5, uk: 9.5, eu: 44 },
    { cm: 28.4, us_m: 10.5, us_w: 12, uk: 10, eu: 44.7 },
    { cm: 28.8, us_m: 11, us_w: 12.5, uk: 10.5, eu: 45.3 },
    { cm: 29.3, us_m: 11.5, us_w: 13.5, uk: 12, eu: 47.3 },
    { cm: 29.7, us_m: 12, us_w: 14, uk: 12.5, eu: 48 },
  ],
  'New Balance': [
    { cm: 24, us_m: 6, us_w: 7.5, uk: 5.5, eu: 38.5 },
    { cm: 24.5, us_m: 6.5, us_w: 8, uk: 6, eu: 39.5 },
    { cm: 25, us_m: 7, us_w: 8.5, uk: 6.5, eu: 40 },
    { cm: 25.5, us_m: 7.5, us_w: 9, uk: 7, eu: 40.5 },
    { cm: 26, us_m: 8, us_w: 9.5, uk: 7.5, eu: 41.5 },
    { cm: 26.5, us_m: 8.5, us_w: 10, uk: 8, eu: 42 },
    { cm: 27, us_m: 9, us_w: 10.5, uk: 8.5, eu: 42.5 },
    { cm: 28, us_m: 9.5, us_w: 11, uk: 9, eu: 43 },
    { cm: 28.5, us_m: 10, us_w: 11.5, uk: 9.5, eu: 44 },
    { cm: 29, us_m: 10.5, us_w: 12, uk: 10, eu: 44.5 },
    { cm: 29.5, us_m: 11, us_w: 12.5, uk: 10.5, eu: 45 },
    { cm: 30, us_m: 12, us_w: 13.5, uk: 11.5, eu: 46.5 },
    { cm: 31, us_m: 13, us_w: 14.5, uk: 12.5, eu: 47.5 },
  ],
  Puma: [
    { cm: 25, us_m: 7, us_w: 8.5, uk: 6, eu: 39 },
    { cm: 25.5, us_m: 7.5, us_w: 9, uk: 6.5, eu: 40 },
    { cm: 26, us_m: 8, us_w: 9.5, uk: 7, eu: 40.5 },
    { cm: 26.5, us_m: 8.5, us_w: 10, uk: 7.5, eu: 41 },
    { cm: 27, us_m: 9, us_w: 10.5, uk: 8, eu: 42 },
    { cm: 27.5, us_m: 9.5, us_w: 11, uk: 8.5, eu: 42.5 },
    { cm: 28, us_m: 10, us_w: 11.5, uk: 9, eu: 43 },
    { cm: 28.5, us_m: 10.5, us_w: 12, uk: 9.5, eu: 44 },
    { cm: 29, us_m: 11, us_w: 12.5, uk: 10, eu: 44.5 },
    { cm: 30, us_m: 12, us_w: 13.5, uk: 11, eu: 46 },
  ],
  Asics: [
    { cm: 25.25, us_m: 7, us_w: 8.5, uk: 6, eu: 40 },
    { cm: 25.5, us_m: 7.5, us_w: 9, uk: 6.5, eu: 40.5 },
    { cm: 26, us_m: 8, us_w: 9.5, uk: 7, eu: 41.5 },
    { cm: 26.5, us_m: 8.5, us_w: 10, uk: 7.5, eu: 42 },
    { cm: 27, us_m: 9, us_w: 10.5, uk: 8, eu: 42.5 },
    { cm: 27.5, us_m: 9.5, us_w: 11, uk: 8.5, eu: 43.5 },
    { cm: 27.8, us_m: 10, us_w: 11.5, uk: 9, eu: 44 },
    { cm: 28, us_m: 10.5, us_w: 12, uk: 9.5, eu: 44.5 },
    { cm: 28.5, us_m: 11, us_w: 12.5, uk: 10, eu: 45 },
    { cm: 30, us_m: 12, us_w: 13.5, uk: 11, eu: 46.5 },
  ],
  Converse: [
    { cm: 24.5, us_m: 6, us_w: 8, uk: 6, eu: 39 },
    { cm: 25, us_m: 6.5, us_w: 8.5, uk: 6.5, eu: 39.5 },
    { cm: 25.5, us_m: 7, us_w: 9, uk: 7, eu: 40 },
    { cm: 26, us_m: 7.5, us_w: 9.5, uk: 7.5, eu: 41 },
    { cm: 26.5, us_m: 8, us_w: 10, uk: 8, eu: 41.5 },
    { cm: 27, us_m: 8.5, us_w: 10.5, uk: 8.5, eu: 42 },
    { cm: 27.5, us_m: 9, us_w: 11, uk: 9, eu: 42.5 },
    { cm: 28, us_m: 9.5, us_w: 11.5, uk: 9.5, eu: 43 },
    { cm: 28.5, us_m: 10, us_w: 12, uk: 10, eu: 44 },
    { cm: 29, us_m: 10.5, us_w: 12.5, uk: 10.5, eu: 44.5 },
    { cm: 30, us_m: 11, us_w: 13, uk: 11, eu: 45 },
    { cm: 31, us_m: 12, us_w: 14, uk: 12, eu: 46.5 },
  ],
  Reebok: [
    { cm: 25, us_m: 7, us_w: 8.5, uk: 6, eu: 39 },
    { cm: 25.5, us_m: 7.5, us_w: 9, uk: 6.5, eu: 40 },
    { cm: 26, us_m: 8, us_w: 9.5, uk: 7, eu: 40.5 },
    { cm: 26.5, us_m: 8.5, us_w: 10, uk: 7.5, eu: 41 },
    { cm: 27, us_m: 9, us_w: 10.5, uk: 8, eu: 42 },
    { cm: 27.5, us_m: 9.5, us_w: 11, uk: 8.5, eu: 42.5 },
    { cm: 28, us_m: 10, us_w: 11.5, uk: 9, eu: 43 },
    { cm: 28.5, us_m: 10.5, us_w: 12, uk: 9.5, eu: 44 },
    { cm: 29, us_m: 11, us_w: 12.5, uk: 10, eu: 44.5 },
    { cm: 30, us_m: 12, us_w: 13.5, uk: 11, eu: 46 },
  ]
};

export const BRANDS: Brand[] = [
  'Nike', 'Jordan', 'Adidas', 'Yeezy', 'New Balance', 'Puma', 'Asics', 'Converse', 'Reebok'
];

/** Utility for merging tailwind classes safely */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>('Nike');
  const [selectedGender, setSelectedGender] = useState<Gender>('Men');
  const [selectedSystem, setSelectedSystem] = useState<'US' | 'UK' | 'EU' | 'CM'>('US');
  const [selectedSize, setSelectedSize] = useState<number | string>(9);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Derive the CM value based on current selection
  const currentCM = useMemo(() => {
    const brandData = SIZE_DATA[selectedBrand];
    const systemKey = selectedSystem === 'US' 
      ? (selectedGender === 'Men' ? 'us_m' : 'us_w') 
      : selectedSystem.toLowerCase();
    
    const entry = brandData.find(d => String(d[systemKey as keyof SizeData]) === String(selectedSize));
    return entry?.cm || 27; // Default to 27cm if not found
  }, [selectedBrand, selectedGender, selectedSystem, selectedSize]);

  // Find matching sizes across all brands based on CM
  const conversions = useMemo(() => {
    return BRANDS.map(brand => {
      const brandData = SIZE_DATA[brand];
      // Find the closest CM match
      const match = brandData.reduce((prev, curr) => 
        Math.abs(curr.cm - currentCM) < Math.abs(prev.cm - currentCM) ? curr : prev
      );
      
      return {
        brand,
        match
      };
    });
  }, [currentCM]);

  // Update selected size when system/gender changes to avoid invalid state
  useEffect(() => {
    const brandData = SIZE_DATA[selectedBrand];
    const systemKey = selectedSystem === 'US' 
      ? (selectedGender === 'Men' ? 'us_m' : 'us_w') 
      : selectedSystem.toLowerCase();
    
    // Find the closest size to current CM in new system
    const bestMatch = brandData.reduce((prev, curr) => 
      Math.abs(curr.cm - currentCM) < Math.abs(prev.cm - currentCM) ? curr : prev
    );
    
    setSelectedSize(bestMatch[systemKey as keyof SizeData] as string | number);
  }, [selectedSystem, selectedGender, selectedBrand]);

  const availableSizes = useMemo(() => {
    const brandData = SIZE_DATA[selectedBrand];
    const systemKey = selectedSystem === 'US' 
      ? (selectedGender === 'Men' ? 'us_m' : 'us_w') 
      : selectedSystem.toLowerCase();
    
    return Array.from(new Set(brandData.map(d => d[systemKey as keyof SizeData]))).sort((a, b) => Number(a) - Number(b));
  }, [selectedBrand, selectedGender, selectedSystem]);

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 font-sans selection:bg-neutral-700 selection:text-white relative overflow-hidden">
      {/* Background Image Accent */}
      <img 
        src="/sneaker.png"
        alt=""
        className="fixed -bottom-20 -right-20 w-[600px] h-auto pointer-events-none opacity-[0.05] z-0 grayscale rotate-[-15deg]"
        referrerPolicy="no-referrer"
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
                <img 
                  src="/sneaker.png" 
                  alt="Sneaker Size" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="text-xl font-bold tracking-tighter">sneakersize.me</h1>
            </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-neutral-400">
            <button 
              onClick={() => setIsHowItWorksOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How it works
            </button>
          </div>
        </div>
      </header>

      {/* How it Works Modal */}
      <AnimatePresence>
        {isHowItWorksOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHowItWorksOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-8 bg-neutral-900 border border-white/10 rounded-3xl z-[70] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight">How it works</h3>
                <button 
                  onClick={() => setIsHowItWorksOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-200 mb-1">Data-Driven Mapping</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Our database uses real-world measurements and aggregated user data from thousands of sneaker enthusiasts to ensure millimeter-level accuracy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                    <div className="w-5 h-5 flex items-center justify-center font-black text-xs text-neutral-400">N</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-200 mb-1">Nike Standard</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      We use official Nike length charts as our primary reference standard, syncing other brands based on their actual internal foot length (CM).
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-200 mb-1">Model Sensitivity</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      While our core mapping is highly accurate, sizing can still vary slightly by specific shoe model and construction.
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsHowItWorksOpen(false)}
                className="w-full mt-10 h-14 bg-neutral-100 text-black font-bold rounded-2xl hover:bg-neutral-200 transition-colors shadow-lg"
              >
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="space-y-12">
          
          {/* Main Converter Section */}
          <div className="space-y-12">
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Instant sneaker size converter.
                </h2>
                <p className="text-neutral-400 text-lg md:text-xl max-w-2xl">
                  Select your current brand and size to see matching fits across all major labels instantly.
                </p>
              </div>

              {/* Selector Controls */}
              <div className="p-6 md:p-8 bg-neutral-900/50 border border-white/5 rounded-3xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Brand Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Current Brand</label>
                    <div className="relative group">
                      <select 
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value as Brand)}
                        className="w-full h-14 bg-neutral-800 border-2 border-white/5 rounded-2xl px-4 appearance-none focus:border-neutral-100 transition-all outline-none cursor-pointer group-hover:bg-neutral-700/50"
                      >
                        {BRANDS.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Gender Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Gender</label>
                    <div className="flex bg-neutral-800 rounded-2xl p-1.5 h-14">
                      {(['Men', 'Women'] as Gender[]).map((g) => (
                        <button
                          key={g}
                          onClick={() => setSelectedGender(g)}
                          className={cn(
                            "flex-1 rounded-xl text-sm font-bold transition-all",
                            selectedGender === g ? "bg-neutral-100 text-black shadow-lg" : "text-neutral-400 hover:text-white"
                          )}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Size Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Pick Your Size</label>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={String(size)}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "h-12 flex items-center justify-center rounded-xl text-sm font-bold border-2 transition-all",
                          selectedSize === size 
                            ? "bg-neutral-100 border-neutral-100 text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                            : "bg-neutral-800 border-white/5 text-neutral-400 hover:border-neutral-600 hover:text-white"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-[11px] text-neutral-500 leading-relaxed text-center">
                      These conversions are approximate. Individual shoe models can vary in fit. Use as a general guide only.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Results Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                   <h3 className="text-2xl font-bold flex items-center gap-2">
                    <ArrowRightLeft className="w-6 h-6 text-neutral-400" />
                    Converted Sizes
                  </h3>
                  <p className="text-neutral-500 text-sm">Matching fits based on length ({currentCM} cm)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {conversions.filter(c => c.brand !== selectedBrand).map((conv) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={conv.brand}
                      className="group p-6 bg-neutral-900 border border-white/5 rounded-3xl hover:border-neutral-700 transition-all hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-lg font-bold">{conv.brand}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-[10px] text-neutral-500 font-bold uppercase">US {selectedGender === 'Men' ? 'M' : 'W'}</p>
                          <p className="text-2xl font-bold tabular-nums">
                            {selectedGender === 'Men' ? conv.match.us_m : conv.match.us_w}
                          </p>
                        </div>
                        <div className="space-y-1 pl-4 border-l border-white/10 text-right">
                          <p className="text-[10px] text-neutral-500 font-bold uppercase">EU Size</p>
                          <p className="text-2xl font-bold tabular-nums text-neutral-300">
                            {conv.match.eu}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-neutral-500">
                        <span>UK: {conv.match.uk}</span>
                        <span>{conv.match.cm} cm</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <img 
                src="/sneaker.png" 
                alt="" 
                className="w-5 h-5 object-contain grayscale opacity-50" 
                referrerPolicy="no-referrer"
              />
              <span className="text-neutral-500 font-medium">© 2026 sneakersize.me</span>
            </div>
            <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest ml-7">Last updated: April 2026</span>
          </div>
          <div className="flex gap-8 text-neutral-500 text-sm font-medium">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
}
