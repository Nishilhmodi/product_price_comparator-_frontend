import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchBar } from '../components/SearchBar';
import { formatINR } from '../utils/format';
import { Footer } from '../components/Footer';
import { BASE_URL } from '../utils/api';


const COLLECTIONS = [
  { 
    name: 'Smart phones',
    query: 'Smart phones',
    desc: 'Compare phones & configurations',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50 group-hover:bg-blue-600 group-hover:text-white',
    icon: (
      <svg className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="6" y="2" width="10" height="20" rx="2" />
        <circle cx="11" cy="18" r="1.25" fill="currentColor" />
      </svg>
    )
  },
  { 
    name: 'Smart watches', 
    query: 'Smart watch', 
    desc: 'Compare fitness & smart wearables',
    colorClass: 'text-amber-600',
    bgClass: 'bg-amber-50 group-hover:bg-amber-600 group-hover:text-white',
    icon: (
      <svg className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2V6M12 18V22M9 6h6M9 18h6" />
      </svg>
    )
  },
  { 
    name: 'Headphones', 
    query: 'Headphones', 
    desc: 'Compare top-tier audio systems',
    colorClass: 'text-purple-650',
    bgClass: 'bg-purple-50 group-hover:bg-purple-600 group-hover:text-white',
    icon: (
      <svg className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 14C4 9.58 7.58 6 12 6c4.42 0 8 3.58 8 8v4h-4v-4h4v0c0-3.31-2.69-6-6-6s-6 2.69-6 6v0h4v4H4v-4z" />
      </svg>
    )
  },
  {
    name: 'Running Shoes', 
    query: 'Sport shoes',
    desc: 'Compare athletic sneakers',
    colorClass: 'text-rose-600',
    bgClass: 'bg-rose-50 group-hover:bg-rose-600 group-hover:text-white',
    icon: (
      <svg className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10V5a2 2 0 00-2-2H4a2 2 0 00-2 2v9a3 3 0 003 3h14a3 3 0 003-3v-4H14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 14h20" />
      </svg>
    )
  },
  { 
    name: 'Face Care', 
    query: 'serum', 
    desc: 'Compare skincare formulas',
    colorClass: 'text-teal-600',
    bgClass: 'bg-teal-50 group-hover:bg-teal-600 group-hover:text-white',
    icon: (
      <svg className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="8" y="8" width="8" height="12" rx="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6M10 5h4" />
      </svg>
    )
  },
  { 
    name: 'Casual T-Shirts', 
    query: 't-shirt', 
    desc: 'Compare apparel & apparel brands',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white',
    icon: (
      <svg className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L18 8l-2 3-2-1v10h-4V10L8 11L6 8l6-4z" />
      </svg>
    )
  }
];

const FEATURED_DISCOVERIES = [
  {
    name: "samsung s26 ultra",
    price: 119999,
    platform: "Amazon",
    type: "Smartphone",
    searchQuery: "samsung s26 ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: 23990,
    platform: "Flipkart",
    type: "Audio",
    searchQuery: "sony wh-1000xm5",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "MacBook Air with M3 chip",
    price: 134999,
    platform: "Flipkart",
    type: "Laptop",
    searchQuery: "MacBook Air with M3 chip",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Samsung 256 L frost Free Double Door Refrigerator",
    price: 29999,
    platform: "Flipkart",
    type: "Electronics",
    searchQuery: "Samsung 256 L frost Free Double Door Refrigerator",
    image: "https://rukminim2.flixcart.com/image/960/1280/xif0q/refrigerator-new/6/v/m/-original-imahfpfxjwfadu9x.jpeg?q=60"
  },
  {
    name: "Minimalist Face Serum Essentials",
    price: 699,
    platform: "Amazon",
    type: "Beauty",
    searchQuery: "minimalist face serum",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Nike C1ty Sneakers",
    price: 3399,
    platform: "Amazon",
    type: "Footwear",
    searchQuery: "Nike C1ty Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Bellavita perfume",
    price: 199,
    platform: "Flipkart",
    type: "Fragrance",
    searchQuery: "Bellavita perfume",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "SAFARI Suitcase",
    price: 1599,
    platform: "Myntra",
    type: "Travel Gear",
    searchQuery: "SAFARI Suitcase",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=200&auto=format&fit=crop"
  }
];

export function HomePage() {
  const navigate = useNavigate();
  const discoveriesRef = useRef(null);

  const scrollDiscoveries = (direction) => {
    if (discoveriesRef.current) {
      const cardWidth = 295; // card width
      const gap = 16; // space gap
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      discoveriesRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSearchSubmit = (query) => {
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  const handleTrendingClick = (searchQuery) => {
    navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
  };

  const isProd = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const isLocalApi = BASE_URL.includes('127.0.0.1') || BASE_URL.includes('localhost');

  return (
    <div 
      className="min-h-screen w-full bg-slate-50 flex flex-col transition-all duration-300 relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 180px, rgba(99, 102, 241, 0.12) 0%, transparent 380px),
          radial-gradient(circle at 85% 550px, rgba(20, 184, 166, 0.1) 0%, transparent 380px),
          radial-gradient(#cbd5e1 1.2px, transparent 1.2px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 20px 20px',
        backgroundAttachment: 'fixed, fixed, fixed'
      }}
    >
      {isProd && isLocalApi && (
        <div className="bg-amber-500 text-white py-3 px-4 text-center text-xs font-bold shadow-sm relative z-50 flex items-center justify-center gap-2 animate-fade-in">
          <svg className="h-5 w-5 shrink-0 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>
            <strong>Action Required:</strong> This site is live, but your API base URL is still pointing to the local address (127.0.0.1). Please configure the <code className="bg-amber-600 px-1.5 py-0.5 rounded text-[10px]">VITE_API_BASE_URL</code> environment variable in your Vercel/hosting dashboard to point to your live Render backend URL!
          </span>
        </div>
      )}

      <Navbar showSearch={false} />

      {/* Hero Banner Section */}
      <section 
        className="w-full px-4 min-h-[calc(100vh-60px)] flex flex-col justify-center items-center text-center relative z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, transparent 20%, rgba(248, 250, 252, 1) 85%),
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(238, 242, 255, 0.4), rgba(248, 250, 252, 0.2))
          `,
          backgroundSize: '100% 100%, 36px 36px, 36px 36px, 100% 100%',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 48px), 0 100%)'
        }}
      >
        <div className="mx-auto max-w-6xl w-full flex flex-col items-center gap-6 pt-16 pb-28 md:pt-20 md:pb-36 animate-fade-in-up">
          {/* Subtle Accent Badge */}
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-700 bg-indigo-50/80 border border-indigo-100/60 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm animate-float">
            Live retail price comparator
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6.5xl font-black tracking-tight text-slate-900 leading-[1.12] mt-2 max-w-3xl">
            Search Once. Compare Everywhere.<br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 bg-clip-text text-transparent">
              Find the Absolute Best Deal.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-slate-500 max-w-xl mt-1 font-semibold leading-relaxed">
            Instantly match product prices across e-commerce giants in India: Amazon, Flipkart, Myntra, and Ajio.
          </p>

          {/* Glassmorphic Search Bar Container */}
          <div className="w-full max-w-3xl mt-6 p-4.5 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl hover:shadow-2xl hover:border-white transition-all duration-500 relative z-30">
            <SearchBar onSearch={handleSearchSubmit} />
          </div>

          {/* Supported Merchant Badges with Original Logos */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <span 
              className="w-36 bg-white border border-slate-100/80 text-slate-600 hover:text-slate-850 hover:border-amber-250 hover:shadow-sm py-2.5 rounded-xl text-[10.5px] font-bold tracking-wider uppercase transition-all duration-200 cursor-default shadow-sm animate-scale-in flex items-center justify-center gap-2.5"
              style={{ animationDelay: '100ms', animationFillMode: 'both' }}
            >
              <img src="https://www.google.com/s2/favicons?sz=64&domain=amazon.in" alt="Amazon Logo" className="h-4.5 w-4.5 object-contain rounded-md" />
              Amazon
            </span>
            <span 
              className="w-36 bg-white border border-slate-100/80 text-slate-600 hover:text-slate-850 hover:border-blue-250 hover:shadow-sm py-2.5 rounded-xl text-[10.5px] font-bold tracking-wider uppercase transition-all duration-200 cursor-default shadow-sm animate-scale-in flex items-center justify-center gap-2.5"
              style={{ animationDelay: '200ms', animationFillMode: 'both' }}
            >
              <img src="https://www.google.com/s2/favicons?sz=64&domain=flipkart.com" alt="Flipkart Logo" className="h-4.5 w-4.5 object-contain rounded-md" />
              Flipkart
            </span>
            <span 
              className="w-36 bg-white border border-slate-100/80 text-slate-600 hover:text-slate-850 hover:border-pink-250 hover:shadow-sm py-2.5 rounded-xl text-[10.5px] font-bold tracking-wider uppercase transition-all duration-200 cursor-default shadow-sm animate-scale-in flex items-center justify-center gap-2.5"
              style={{ animationDelay: '300ms', animationFillMode: 'both' }}
            >
              <img src="https://www.google.com/s2/favicons?sz=64&domain=myntra.com" alt="Myntra Logo" className="h-4.5 w-4.5 object-contain rounded-md" />
              Myntra
            </span>
            <span 
              className="w-36 bg-white border border-slate-100/80 text-slate-600 hover:text-slate-850 hover:border-indigo-250 hover:shadow-sm py-2.5 rounded-xl text-[10.5px] font-bold tracking-wider uppercase transition-all duration-200 cursor-default shadow-sm animate-scale-in flex items-center justify-center gap-2.5"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              <img src="https://www.google.com/s2/favicons?sz=64&domain=ajio.com" alt="Ajio Logo" className="h-4.5 w-4.5 object-contain rounded-md" />
              Ajio
            </span>
          </div>
        </div>
      </section>

      {/* Dynamic Scrolling Promotion Banner (End of Season Sale) */}
      <div className="relative z-20 w-full overflow-hidden py-8 -mt-16 md:-mt-20">
        <div className="w-[106%] -ml-[3%] -rotate-[1.2deg] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 border-y border-orange-650 py-5.5 relative shadow-md">
          
          <div className="flex whitespace-nowrap overflow-hidden select-none relative z-10">
            <div className="animate-marquee flex items-center gap-16 text-white text-xs md:text-sm font-black tracking-[0.2em] uppercase">
              <span className="flex items-center gap-16">
                <span>★ COMPARE LIVE PRICES INSTANTLY ★</span>
                <span>★ SHOP FROM AMAZON • FLIPKART • MYNTRA • AJIO ★</span>
                <span>★ GO DIRECT ON PRODUCT PAGE ★</span>
                <span>★ READY YOUR CART NOW ★</span>
              </span>
              <span className="flex items-center gap-16" aria-hidden="true">
                <span>★ COMPARE LIVE PRICES INSTANTLY ★</span>
                <span>★ SHOP FROM AMAZON • FLIPKART • MYNTRA • AJIO ★</span>
                <span>★ GO DIRECT ON PRODUCT PAGE ★</span>
                <span>★ READY YOUR CART NOW ★</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl px-4 py-10 flex flex-col gap-20 relative z-10">
        
        {/* Onboarding Steps */}
        <section className="flex flex-col gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Quick Guide</span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight">How it Works</h2>
            <div className="h-1.5 w-12 bg-indigo-600 rounded-full mt-1.5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full text-left">
            <div 
              className="flex flex-col gap-3 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500/40 transition-all duration-300 group animate-scale-in"
              style={{ animationDelay: '100ms', animationFillMode: 'both' }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 text-2xl font-black group-hover:scale-105 transition-all duration-300 shadow-sm border border-indigo-100">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm md:text-[14.5px] uppercase tracking-wider mt-2.5">Search Products</h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mt-0.5">
                Enter any brand, model, or category you wish to compare.
              </p>
            </div>
            <div 
              className="flex flex-col gap-3 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/40 transition-all duration-300 group animate-scale-in"
              style={{ animationDelay: '250ms', animationFillMode: 'both' }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-2xl font-black group-hover:scale-105 transition-all duration-300 shadow-sm border border-blue-100">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm md:text-[14.5px] uppercase tracking-wider mt-2.5">Compare Live Stores</h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mt-0.5">
                We aggregate and group identical items across India's largest retail stores side by side.
              </p>
            </div>
            <div 
              className="flex flex-col gap-3 bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-teal-500/40 transition-all duration-300 group animate-scale-in"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-655 text-2xl font-black group-hover:scale-105 transition-all duration-300 shadow-sm border border-teal-100">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm md:text-[14.5px] uppercase tracking-wider mt-2.5">Acquire Best Deal</h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mt-0.5">
                Compare prices, select the lowest merchant offering, and navigate directly to their official store.
              </p>
            </div>
          </div>

          {/* Quick Legal Disclaimers Banner */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 md:p-6 text-left flex flex-col gap-2.5 text-xs md:text-[13px] text-slate-500 leading-relaxed shadow-sm mt-4 animate-scale-in" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
            <p>
              <span className="font-extrabold text-slate-750 tracking-wider uppercase pr-1.5">Prices May Vary Disclaimer:</span> Prices and availability of products are subject to change. Any price and availability information displayed on the merchant site at the time of purchase will apply.
            </p>
          </div>
        </section>
        
        {/* Curated Collections Section */}
        <section className="flex flex-col gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Quick Searches</span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight">Popular Categories</h2>
            <div className="h-1.5 w-12 bg-indigo-600 rounded-full mt-1.5"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {COLLECTIONS.map((col, i) => (
              <div
                key={i}
                onClick={() => handleTrendingClick(col.query)}
                className="group relative border border-slate-100 bg-white p-6 rounded-2xl text-left cursor-pointer hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-start gap-4.5 animate-scale-in"
                style={{ animationDelay: `${i * 75}ms`, animationFillMode: 'both' }}
              >
                <div className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-transparent transition-all duration-300 text-lg ${col.colorClass} ${col.bgClass}`}>
                  {col.icon}
                </div>
                <div className="flex flex-col overflow-hidden justify-center min-h-[52px]">
                  <h3 className="text-[15.5px] font-extrabold text-slate-850 group-hover:text-indigo-600 transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-[11.5px] text-slate-400 font-bold tracking-wider mt-0.5 uppercase">
                    {col.desc}
                  </p>
                  <div className="mt-2 flex items-center text-[10.5px] font-extrabold tracking-widest uppercase text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0">
                    Compare Now &rarr;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Discoveries (Trending) */}
        <section className="flex flex-col gap-6 w-full overflow-hidden">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Trending Finds</span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight">Featured Discoveries</h2>
            <div className="h-1.5 w-12 bg-indigo-600 rounded-full mt-1.5"></div>
          </div>

          {/* Conveyor Belt Marquee wrapper */}
          <div className="w-full overflow-hidden py-4 relative mt-2">
            {/* Soft gradient fade overlays on left and right for seamless look */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee gap-5">
              {[...FEATURED_DISCOVERIES, ...FEATURED_DISCOVERIES].map((prod, i) => (
                <div
                  key={i}
                  onClick={() => handleTrendingClick(prod.searchQuery)}
                  className="group w-[240px] shrink-0 border border-slate-100 bg-white rounded-2xl cursor-pointer hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden text-left"
                >
                  {/* Top: Large image area */}
                  <div className="h-[140px] w-full bg-slate-50 flex items-center justify-center overflow-hidden relative">
                    {prod.image ? (
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                    {/* Category Tag overlay on top left */}
                    <span className="absolute left-3.5 top-3.5 text-[8px] font-black tracking-widest uppercase bg-indigo-600 text-white px-2 py-0.5 rounded shadow-sm z-10">
                      {prod.type}
                    </span>
                  </div>
                  
                  {/* Bottom: Details block */}
                  <div className="flex flex-col p-4.5 gap-2.5 flex-grow justify-between bg-white border-t border-slate-50">
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-[13px] font-bold text-slate-800 line-clamp-1 tracking-wide group-hover:text-indigo-650 transition-colors">{prod.name}</h4>
                      <p className="text-[9.5px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                        Lowest on {prod.platform}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-100/60 pt-3 mt-1">
                      <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">Compare From</span>
                      <span className="text-sm font-black text-indigo-600">{formatINR(prod.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Status Statistics */}
        <section className="grid grid-cols-3 border border-slate-100 rounded-2xl bg-white py-10 text-center shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
          <div className="flex flex-col gap-1 border-r border-slate-100 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-600 tracking-tight">4+</span>
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 mt-0.5">Stores Integrated</span>
          </div>
          <div className="flex flex-col gap-1 border-r border-slate-100 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-600 tracking-tight">100%</span>
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 mt-0.5">Real-Time Prices</span>
          </div>
          <div className="flex flex-col gap-1 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-600 tracking-tight flex items-center justify-center gap-1.5 md:gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
              Active
            </span>
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400 mt-0.5">Server Status</span>
          </div>
        </section>

        {/* Our Methodology */}
        <section id="how-it-works" className="flex flex-col gap-10 scroll-mt-24">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Methodology</span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight">How PriceHunt Works</h2>
            <div className="h-1.5 w-12 bg-indigo-600 rounded-full mt-1.5"></div>
            <p className="text-xs text-slate-500 mt-2 max-w-md">Our backend systems and transparency rules ensure clean, complete, and unbiased deals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="border border-slate-100 rounded-2xl bg-white p-6 text-left flex flex-col gap-3 shadow-sm hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-black text-slate-100">01</div>
              <h3 className="text-xs font-bold text-slate-800 tracking-widest uppercase">Live Matching</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                When you enter a search, we pull pricing from popular online stores in real-time.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border border-slate-100 rounded-2xl bg-white p-6 text-left flex flex-col gap-3 shadow-sm hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-black text-indigo-100">02</div>
              <h3 className="text-xs font-bold text-slate-800 tracking-widest uppercase">Smart Matcher</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our backend groups identical products so you can view all stores in a single card. Differences in storage or specifications are separated cleanly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border border-slate-100 rounded-2xl bg-white p-6 text-left flex flex-col gap-3 shadow-sm hover:border-teal-550/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-black text-teal-100">03</div>
              <h3 className="text-xs font-bold text-slate-800 tracking-widest uppercase">Direct Store Links</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                PriceHunt is completely free to use. We provide direct storefront links to ensure transparency and ease of shopping.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
