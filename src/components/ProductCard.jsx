import { useState, useEffect } from 'react';
import { formatINR } from '../utils/format';

export function ProductCard({ product }) {
  const prices = product.prices;
  
  // Find the lowest price offer
  const lowestOffer = prices.find(p => p.is_lowest) || [...prices].sort((a, b) => a.price - b.price)[0];
  
  // Find the max discount among all offers
  const maxDiscount = prices.reduce((max, p) => (p.discount && p.discount > max ? p.discount : max), 0);

  // Platform offer finder
  const getPlatformOffer = (platformName) => {
    return prices.find(p => p.platform.toLowerCase() === platformName.toLowerCase());
  };

  const getPlatformDomain = (platformName) => {
    switch (platformName.toLowerCase()) {
      case 'amazon': return 'amazon.in';
      case 'flipkart': return 'flipkart.com';
      case 'myntra': return 'myntra.com';
      case 'ajio': return 'ajio.com';
      default: return '';
    }
  };

  // Helper to render watch/mobile/box SVG fallback
  const renderFallbackIcon = () => {
    const title = product.title.toLowerCase();
    const category = (product.category || '').toLowerCase();

    if (category.includes('watch') || title.includes('watch')) {
      return (
        <svg className="h-12 w-12 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      );
    }

    if (category.includes('mobile') || title.includes('phone') || title.includes('iphone') || title.includes('galaxy')) {
      return (
        <svg className="h-12 w-12 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" strokeWidth={2.5} />
        </svg>
      );
    }

    return (
      <svg className="h-12 w-12 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  };

  return (
    <div className="group flex flex-col overflow-hidden border border-slate-100/80 bg-white transition-all duration-350 hover:-translate-y-1.5 hover:border-indigo-500/50 rounded-2.5xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_-5px_rgba(99,102,241,0.12),0_8px_15px_-6px_rgba(99,102,241,0.08)] h-full text-left">
      
      {/* TOP SECTION: Image Area (Premium 160px height) */}
      <div className="relative flex h-[160px] w-full items-center justify-center bg-gradient-to-b from-slate-50/50 to-slate-100/20 border-b border-slate-100/50 transition-all duration-300 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-3 group-hover:scale-[1.04] transition-all duration-500 ease-out"
            onError={(e) => {
              e.target.style.display = 'none'; // hide broken image and let fallback render
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback container (hidden if image successfully loads) */}
        <div
          className="items-center justify-center"
          style={{ display: product.image ? 'none' : 'flex' }}
        >
          {renderFallbackIcon()}
        </div>

        {/* X% Off Badge (Top-Right) */}
        {maxDiscount > 0 && (
          <div className="absolute right-3 top-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-extrabold px-2.5 py-0.5 text-[8.5px] uppercase tracking-wider rounded-md shadow-sm">
            {maxDiscount}% OFF
          </div>
        )}
      </div>

      {/* Clean vertical list comparison display */}
      <div className="flex flex-col gap-1 p-2 bg-slate-50/30 border-b border-slate-100/60">
        {['Amazon', 'Flipkart', 'Myntra', 'Ajio'].map((platform) => {
          const offer = getPlatformOffer(platform);
          const hasPrice = !!offer;
          
          if (hasPrice) {
            const isLowest = offer.is_lowest;
            return (
              <a
                key={platform}
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`grid grid-cols-[auto_1fr_auto] items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl transition-all duration-200 border cursor-pointer text-left ${
                  isLowest 
                    ? "bg-emerald-50/50 border-emerald-500/20 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-[0_1px_2px_rgba(16,185,129,0.03)]" 
                    : "bg-white border-slate-100 text-slate-700 hover:border-indigo-500/30 hover:bg-indigo-50/10 hover:text-indigo-700 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                }`}
              >
                {/* 1. Favicon */}
                <img 
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${getPlatformDomain(platform)}`} 
                  alt={platform} 
                  className="h-3.5 w-3.5 object-contain rounded shrink-0" 
                />
                
                {/* 2. Platform Name (Hidden on mobile to prevent overflow) */}
                <span className="text-[9.5px] font-bold uppercase tracking-wider truncate mr-1 hidden sm:inline">{platform}</span>
                
                {/* 3. Badge & Price */}
                <div className="flex items-center gap-1.5 justify-end shrink-0 col-start-3">
                  {isLowest && (
                    <>
                      <span className="text-[7.5px] font-black uppercase tracking-wide bg-emerald-500 text-white px-1.5 py-0.5 rounded shrink-0 hidden sm:inline-block">Lowest</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 sm:hidden shrink-0" title="Lowest Price"></span>
                    </>
                  )}
                  <span className="text-[10px] sm:text-[10.5px] font-black shrink-0">{formatINR(offer.price)}</span>
                </div>
              </a>
            );
          } else {
            return (
              <div
                key={platform}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-dashed border-slate-100 bg-white/40 text-slate-400 select-none opacity-70 text-left"
              >
                {/* 1. Favicon */}
                <img 
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${getPlatformDomain(platform)}`} 
                  alt={platform} 
                  className="h-3.5 w-3.5 object-contain rounded grayscale opacity-45 shrink-0" 
                />
                
                {/* 2. Platform Name (Hidden on mobile) */}
                <span className="text-[9.5px] font-semibold uppercase tracking-wider truncate mr-1 hidden sm:inline">{platform}</span>
                
                {/* 3. Status */}
                <span className="text-[9.5px] font-bold text-slate-350 tracking-wide shrink-0 justify-self-end col-start-3">N/A</span>
              </div>
            );
          }
        })}
      </div>

      {/* BODY SECTION (padding 16px) */}
      <div className="flex flex-col p-4 flex-grow justify-between gap-3 bg-white">
        
        {/* Title & Rating */}
        <div className="flex flex-col gap-1.5 text-left">
          {/* Product Name (font-sans, 2 line clamp) */}
          <h3 className="font-sans line-clamp-2 h-[38px] text-[13px] font-bold text-slate-700 leading-[19px] tracking-wide group-hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating Row */}
          <div className="flex items-center gap-1.5 h-[20px] mt-0.5">
            {product.rating === 0 ? (
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100/60">No reviews</span>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-md flex items-center gap-0.5 shadow-[0_1px_1px_rgba(245,158,11,0.02)]">
                  {product.rating} <span className="text-[9.5px] text-amber-500">★</span>
                </span>
                <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer: Metadata, Live Pulse, and Original link */}
        <div className="text-[9px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2.5 mt-2">
          <span className="flex items-center gap-1 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Updated: Today
          </span>
          {product.google_shopping_url && (
            <a
              href={product.google_shopping_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold uppercase tracking-wider text-[8px] text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 transition-colors"
            >
              Compare Offers
              <svg className="h-2.5 w-2.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
