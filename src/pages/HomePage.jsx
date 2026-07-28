import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
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
    name: "JBL Go 4 Wireless Ultra Portable Bluetooth Speaker",
    price: 3499,
    platform: "Flipkart",
    type: "Audio",
    searchQuery: "JBL Go 4 Wireless Ultra Portable Bluetooth Speaker",
    image: "/jbl_go4.png",
    imageFit: "object-contain p-2 bg-white"
  },
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
    name: "Carrier 1.5 Ton 5 Star Split AC",
    price: 45499,
    platform: "Flipkart",
    type: "Electronics",
    searchQuery: "Carrier 1.5 Ton 5 Star Split AC",
    image: "/carrier_ac.png",
    imageFit: "object-contain p-2 bg-white"
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

const STORY_SLIDES = [
  {
    title: "The Chaos of Ten Tabs",
    subtitle: "The Problem",
    description: "As online shoppers, we've all been there. You want to buy a phone or shoes, so you open ten tabs—Amazon, Flipkart, Myntra, Croma—trying to compare prices. Tabs crash, prices shift, and finding the best deal becomes exhausting.",
    badgeColor: "bg-red-50 text-red-650 border-red-100",
    themeColor: "text-red-500",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  {
    title: "Real-time Aggregator Engine",
    subtitle: "The Breakthrough",
    description: "We built a backend crawler that queries live search indexes across India's largest retail networks in under 2 seconds. No delayed caches, no stale values—you see the exact price active at this very second.",
    badgeColor: "bg-indigo-50 text-indigo-650 border-indigo-100",
    themeColor: "text-indigo-500",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Smart NLP Product Matcher",
    subtitle: "The Intelligence",
    description: "Retailers describe products differently. Amazon might say 'Galaxy S23 (Luxe Grey)', while Flipkart says 'GALAXY S23 5G'. Our NLP matching engine cleans, normalizes, and merges them so you compare identical items side-by-side.",
    badgeColor: "bg-emerald-50 text-emerald-650 border-emerald-100",
    themeColor: "text-emerald-500",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "100% Unbiased Transparency",
    subtitle: "Our Principle",
    description: "PriceHunt is 100% free to use. We don't mark up prices, charge commissions, or run sponsored search algorithms. We display the absolute lowest price on top, period. Our loyalty belongs to your wallet.",
    badgeColor: "bg-amber-50 text-amber-650 border-amber-100",
    themeColor: "text-amber-500",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

const HERO_PRODUCTS = [
  {
    name: "JBL Go 4 Wireless Speaker",
    image: "/jbl_go4.png",
    imageFit: "object-contain p-2 bg-white",
    rating: "4.8",
    badgeText: "5% lower than others",
    prices: [
      { platform: "Amazon", price: "₹3,999", domain: "amazon.in" },
      { platform: "Flipkart", price: "₹3,499", domain: "flipkart.com", isCheapest: true },
      { platform: "Myntra", price: "₹4,299", domain: "myntra.com" },
      { platform: "Ajio", price: "₹3,799", domain: "ajio.com" }
    ]
  },
  {
    name: "Samsung S26 Ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=200&auto=format&fit=crop",
    imageFit: "object-cover",
    rating: "4.7",
    badgeText: "3% lower than others",
    prices: [
      { platform: "Amazon", price: "₹1,19,999", domain: "amazon.in", isCheapest: true },
      { platform: "Flipkart", price: "₹1,24,999", domain: "flipkart.com" },
      { platform: "Myntra", price: "₹1,29,999", domain: "myntra.com" },
      { platform: "Ajio", price: "₹1,22,999", domain: "ajio.com" }
    ]
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=200&auto=format&fit=crop",
    imageFit: "object-cover",
    rating: "4.9",
    badgeText: "8% lower than others",
    prices: [
      { platform: "Amazon", price: "₹24,990", domain: "amazon.in" },
      { platform: "Flipkart", price: "₹23,990", domain: "flipkart.com", isCheapest: true },
      { platform: "Myntra", price: "₹26,990", domain: "myntra.com" },
      { platform: "Ajio", price: "₹25,490", domain: "ajio.com" }
    ]
  },
  {
    name: "MacBook Air with M3 chip",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&auto=format&fit=crop",
    imageFit: "object-cover",
    rating: "4.8",
    badgeText: "4% lower than others",
    prices: [
      { platform: "Amazon", price: "₹1,39,999", domain: "amazon.in" },
      { platform: "Flipkart", price: "₹1,34,999", domain: "flipkart.com", isCheapest: true },
      { platform: "Myntra", price: "₹1,44,999", domain: "myntra.com" },
      { platform: "Ajio", price: "₹1,37,999", domain: "ajio.com" }
    ]
  },
  {
    name: "Carrier 1.5 Ton Split AC",
    image: "/carrier_ac.png",
    imageFit: "object-contain p-2 bg-white",
    rating: "4.7",
    badgeText: "2% lower than others",
    prices: [
      { platform: "Amazon", price: "₹46,500", domain: "amazon.in" },
      { platform: "Flipkart", price: "₹45,499", domain: "flipkart.com" },
      { platform: "Myntra", price: "₹48,990", domain: "myntra.com" },
      { platform: "Ajio", price: "₹44,990", domain: "ajio.com", isCheapest: true }
    ]
  }
];

export function HomePage() {
  const navigate = useNavigate();
  const discoveriesRef = useRef(null);
  const [activeStorySlide, setActiveStorySlide] = useState(0);

  const heroTimeoutRef = useRef(null);
  const [isHeroAnimated, setIsHeroAnimated] = useState(false);
  const [heroProductIndex, setHeroProductIndex] = useState(0);

  const triggerHeroAnimation = () => {
    if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    
    setIsHeroAnimated(true);

    // Hold for 4.5 seconds (which includes card stagger + hold time), then collapse back
    heroTimeoutRef.current = setTimeout(() => {
      setIsHeroAnimated(false);

      // Wait 1.2 seconds for the collapse transition to fully complete, then shift product and re-expand
      heroTimeoutRef.current = setTimeout(() => {
        setHeroProductIndex((prev) => (prev + 1) % HERO_PRODUCTS.length);
        triggerHeroAnimation();
      }, 1200);
    }, 4500);
  };

  const handleReplayClick = () => {
    if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    setIsHeroAnimated(false);
    setTimeout(() => {
      setHeroProductIndex((prev) => (prev + 1) % HERO_PRODUCTS.length);
      triggerHeroAnimation();
    }, 300); // Wait 300ms for collapse to complete before re-triggering
  };

  const storyContainerRef = useRef(null);

  useEffect(() => {
    // Auto-run once on load
    const loadTimer = setTimeout(() => {
      triggerHeroAnimation();
    }, 800);
    return () => {
      clearTimeout(loadTimer);
      if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    };
  }, []);

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
  const currentProduct = HERO_PRODUCTS[heroProductIndex];

  return (
    <div 
      className="min-h-screen w-full bg-slate-50 flex flex-col transition-all duration-300 relative overflow-x-clip"
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
      <style>{`
        @keyframes fadeInUpSpring {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-fade-in-up-spring {
          opacity: 0;
          animation: fadeInUpSpring 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-draw-line {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
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
        className="w-full px-5 sm:px-6 min-h-[calc(100vh-62px)] flex items-center justify-center relative z-10 py-10 sm:py-12 lg:py-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, transparent 20%, rgba(248, 250, 252, 1) 85%),
            linear-gradient(to right, rgba(99, 102, 241, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(238, 242, 255, 0.4), rgba(248, 250, 252, 0.2))
          `,
          backgroundSize: '100% 100%, 36px 36px, 36px 36px, 100% 100%',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 48px), 0 100%)'
        }}
      >
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center px-0 md:px-8 py-4 lg:py-6">
          
          {/* Left Column: Heading, Subheading, Search Bar, CTA */}
          <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left gap-7 sm:gap-8 animate-fade-in-up">
            {/* Subtle Accent Badge */}
            <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-indigo-700 bg-indigo-50/80 border border-indigo-100/60 px-5 py-2 rounded-full shadow-sm backdrop-blur-sm">
              Live retail price comparator
            </span>

            {/* Title */}
            <h1 className="text-4xl min-[420px]:text-5xl sm:text-5xl md:text-5.5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] max-w-2xl">
              Your shortcut to finding a <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 bg-clip-text text-transparent">great deal.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-[14.5px] text-slate-500 max-w-xl font-semibold leading-relaxed mx-auto lg:mx-0">
              Instantly match product prices across e-commerce giants in India: Amazon, Flipkart, Myntra, and Ajio. Search once, compare everywhere.
            </p>

            {/* Glassmorphic Search Bar Container */}
            <div className="w-full max-w-xl p-3.5 sm:p-4 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-lg hover:shadow-xl hover:border-white transition-all duration-500 relative z-30 mx-auto lg:mx-0">
              <SearchBar onSearch={handleSearchSubmit} />
            </div>

            {/* CTA and Stats Shortcut */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4.5 mt-2 w-full">
              <button 
                onClick={() => {
                  const inputEl = document.querySelector('input[placeholder*="Search for products"]');
                  if (inputEl) inputEl.focus();
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Comparing Now
              </button>
              <a 
                href="#how-it-works"
                className="text-sm font-black tracking-wider uppercase text-slate-500 hover:text-indigo-650 transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
              >
                Learn Methodology &rarr;
              </a>
            </div>

            {/* Supported Merchant Badges with Original Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 w-full">
              {[
                { domain: 'amazon.in',   label: 'Amazon'   },
                { domain: 'flipkart.com', label: 'Flipkart' },
                { domain: 'myntra.com',  label: 'Myntra'   },
                { domain: 'ajio.com',    label: 'Ajio'     },
              ].map(({ domain, label }) => (
                <span
                  key={label}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-100/90 text-slate-650 hover:text-slate-800 py-3.5 px-3 rounded-xl text-[12px] sm:text-[11px] font-black tracking-widest uppercase shadow-xs transition-all duration-200 cursor-default hover:border-slate-200 hover:shadow-sm"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
                    alt={`${label} Logo`}
                    className="h-5 w-5 object-contain rounded-md flex-shrink-0"
                  />
                  {label}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Animated Visual (Phone + Floating Cards) */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full h-[390px] min-[360px]:h-[430px] min-[400px]:h-[460px] sm:h-[500px] lg:h-[540px] select-none">
            
            {/* Responsive scale wrapper for mobile sizing */}
            <div className="relative flex items-center justify-center scale-[0.65] min-[360px]:scale-[0.70] min-[400px]:scale-[0.78] sm:scale-90 md:scale-95 lg:scale-100 origin-center transition-transform duration-300">
              
              {/* Ambient Backlight Glow behind phone */}
              <div className={`absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px] transition-all duration-1000 ${
                isHeroAnimated ? 'scale-125 opacity-100' : 'scale-90 opacity-60'
              }`} />

              {/* ── REALISTIC SMARTPHONE FRAME ── */}
              <div className="relative z-10" style={{ width: '272px', height: '540px' }}>

                {/* Side Buttons — Volume Up */}
                <div className="absolute left-[-3px] top-[110px] w-[3px] h-[34px] bg-gradient-to-b from-slate-600 to-slate-700 rounded-l-sm z-20 shadow-inner" />
                {/* Volume Down */}
                <div className="absolute left-[-3px] top-[156px] w-[3px] h-[34px] bg-gradient-to-b from-slate-600 to-slate-700 rounded-l-sm z-20 shadow-inner" />
                {/* Mute Toggle */}
                <div className="absolute left-[-3px] top-[74px] w-[3px] h-[22px] bg-gradient-to-b from-slate-500 to-slate-600 rounded-l-sm z-20" />
                {/* Power Button */}
                <div className="absolute right-[-3px] top-[130px] w-[3px] h-[56px] bg-gradient-to-b from-slate-600 to-slate-700 rounded-r-sm z-20 shadow-inner" />

                {/* Outer Frame — titanium-finish bezel */}
                <div
                  className="absolute inset-0 rounded-[48px] z-10"
                  style={{
                    background: 'linear-gradient(145deg, #4a4a4f 0%, #1c1c1e 40%, #2c2c2e 70%, #3a3a3c 100%)',
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.12),
                      0 32px 80px rgba(0,0,0,0.55),
                      0 8px 24px rgba(0,0,0,0.4),
                      inset 0 1px 0 rgba(255,255,255,0.15),
                      inset 0 -1px 0 rgba(0,0,0,0.3)
                    `,
                    padding: '10px',
                  }}
                >
                  {/* Inner Glass Screen Surface */}
                  <div
                    className="relative w-full h-full rounded-[40px] overflow-hidden"
                    style={{
                      background: '#000',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Screen Content */}
                    <div
                      className={`w-full h-full bg-white flex flex-col transition-all duration-500 ${
                        isHeroAnimated ? 'opacity-100' : 'opacity-35 blur-[3.5px]'
                      }`}
                    >
                      {/* ── STATUS BAR ── */}
                      <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ minHeight: '36px' }}>
                        {/* Time */}
                        <span className="text-[11px] font-black text-slate-900 tracking-tight">9:41</span>
                        {/* Dynamic Island — pill notch */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 top-[6px] bg-black rounded-full z-30 flex items-center justify-center gap-[5px]"
                          style={{ width: '88px', height: '26px' }}
                        >
                          {/* Front camera dot */}
                          <div className="h-2 w-2 rounded-full bg-[#1a1a1a] border border-[#333] relative">
                            <div className="absolute inset-[2px] rounded-full bg-[#2a2a2e]" />
                          </div>
                          {/* Face ID sensor bar */}
                          <div className="h-[6px] w-[18px] rounded-full bg-[#1c1c1e]" />
                        </div>
                        {/* Right icons: Signal + WiFi + Battery */}
                        <div className="flex items-center gap-[5px]">
                          {/* Signal bars */}
                          <div className="flex items-end gap-[2px] h-[10px]">
                            {[3, 5, 7, 9].map((h, i) => (
                              <div key={i} className="w-[2.5px] bg-slate-800 rounded-[1px]" style={{ height: `${h}px` }} />
                            ))}
                          </div>
                          {/* WiFi icon */}
                          <svg className="h-[10px] w-[12px] text-slate-800 fill-current" viewBox="0 0 24 24">
                            <path d="M1.5 8.5C5.3 4.7 10.4 2.5 12 2.5s6.7 2.2 10.5 6M5 12.5c1.9-1.9 4.3-3 7-3s5.1 1.1 7 3M8.5 16c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5M12 20h.01" strokeWidth="0" />
                          </svg>
                          {/* Battery */}
                          <div className="flex items-center gap-[1px]">
                            <div className="h-[10px] w-[18px] border border-slate-800 rounded-[2px] p-[1.5px]">
                              <div className="h-full w-[75%] bg-slate-800 rounded-[1px]" />
                            </div>
                            <div className="h-[5px] w-[1.5px] bg-slate-800 rounded-r-sm" />
                          </div>
                        </div>
                      </div>

                      {/* ── SCREEN CONTENT ── */}
                      <div className="flex-grow flex flex-col px-4 py-3 gap-3">
                        {/* App Navbar */}
                        <div className="flex items-center justify-center gap-2 pb-2.5 border-b border-slate-100">
                          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div className="text-sm font-black tracking-tight flex items-center">
                            <span className="text-slate-900">Price</span>
                            <span className="text-indigo-600">Hunt</span>
                          </div>
                        </div>

                        {/* Product Image */}
                        <div className="h-[130px] w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                          <img
                            src={currentProduct.image}
                            alt={currentProduct.name}
                            className={`h-full w-full ${currentProduct.imageFit || 'object-cover'} transition-all duration-500`}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col items-center gap-0.5 px-1">
                          <h4 className="text-[10px] font-bold text-slate-800 text-center leading-tight line-clamp-1">
                            {currentProduct.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <div className="flex text-amber-400 text-[9px]">
                              {'★'.repeat(Math.round(parseFloat(currentProduct.rating)))}
                            </div>
                            <span className="text-[7.5px] font-bold text-slate-400">({currentProduct.rating})</span>
                          </div>
                        </div>

                        {/* ── IN-APP PRICE COMPARISON LIST ── */}
                        <div
                          className="flex flex-col gap-[5px] mt-0.5 transition-all duration-500"
                          style={{
                            opacity: isHeroAnimated ? 1 : 0,
                            transform: isHeroAnimated ? 'translateY(0)' : 'translateY(10px)',
                            transitionDelay: isHeroAnimated ? '400ms' : '0ms',
                          }}
                        >
                          <div className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest text-center">
                            Live Price Comparison
                          </div>
                          {currentProduct.prices.map((p, i) => (
                            <div
                              key={i}
                              className={`flex items-center justify-between px-2.5 py-[5px] rounded-lg transition-all duration-300 ${
                                p.isCheapest
                                  ? 'bg-emerald-50 border border-emerald-200'
                                  : 'bg-slate-50 border border-slate-100'
                              }`}
                              style={{
                                transitionDelay: `${500 + i * 80}ms`,
                                opacity: isHeroAnimated ? 1 : 0,
                                transform: isHeroAnimated ? 'translateX(0)' : 'translateX(-6px)',
                              }}
                            >
                              <div className="flex items-center gap-1.5">
                                <img
                                  src={`https://www.google.com/s2/favicons?sz=64&domain=${p.domain}`}
                                  className="h-3 w-3 rounded object-contain"
                                  alt={p.platform}
                                />
                                <span className="text-[8.5px] font-bold text-slate-700">{p.platform}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {p.isCheapest && (
                                  <span className="text-[6px] font-black uppercase bg-emerald-500 text-white px-1 py-[1px] rounded-sm tracking-wider">
                                    BEST
                                  </span>
                                )}
                                <span className={`text-[8.5px] font-black ${p.isCheapest ? 'text-emerald-700' : 'text-slate-600'}`}>
                                  {p.price}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── HOME INDICATOR BAR ── */}
                      <div className="flex justify-center pb-2 pt-1">
                        <div className="h-[4px] w-[96px] bg-slate-800/20 rounded-full" />
                      </div>
                    </div>

                    {/* Glass reflection sheen */}
                    <div
                      className="absolute inset-0 rounded-[40px] pointer-events-none z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                      }}
                    />
                  </div>
                </div>

                {/* Start searching overlay button */}
                {!isHeroAnimated && (
                  <button
                    onClick={triggerHeroAnimation}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black tracking-widest uppercase px-6 py-3.5 rounded-full shadow-xl border border-slate-700 z-30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                  >
                    Start searching
                  </button>
                )}
              </div>


              {/* 4 Floating Price Cards (Amazon, Flipkart, Myntra, Ajio) */}
              {currentProduct.prices.map((p, pIdx) => {
                const isCheapest = p.isCheapest;
                
                // Set positions for each of the 4 cards: Amazon, Flipkart, Myntra, Ajio
                let positionClass = '';
                if (pIdx === 0) positionClass = isHeroAnimated ? '-translate-x-[115px] -translate-y-[150px] opacity-100 scale-100' : 'opacity-0 scale-75 translate-x-0 translate-y-0 pointer-events-none';
                if (pIdx === 1) positionClass = isHeroAnimated ? 'translate-x-[115px] -translate-y-[80px] opacity-100 scale-100' : 'opacity-0 scale-75 translate-x-0 translate-y-0 pointer-events-none';
                if (pIdx === 2) positionClass = isHeroAnimated ? 'translate-x-[115px] translate-y-[100px] opacity-100 scale-100' : 'opacity-0 scale-75 translate-x-0 translate-y-0 pointer-events-none';
                if (pIdx === 3) positionClass = isHeroAnimated ? '-translate-x-[115px] translate-y-[60px] opacity-100 scale-100' : 'opacity-0 scale-75 translate-x-0 translate-y-0 pointer-events-none';

                const delay = 150 + pIdx * 200;

                return (
                  <div 
                    key={pIdx}
                    className={`absolute z-20 transition-all duration-500 border rounded-2xl p-2.5 px-3 shadow-lg flex items-center justify-between w-[185px] ${positionClass} ${
                      isCheapest && isHeroAnimated ? 'bg-emerald-50/90 border-emerald-300 shadow-emerald-100/50' : 'bg-white border-slate-100'
                    }`}
                    style={{ 
                      transitionDelay: isHeroAnimated ? `${delay}ms` : '0ms'
                    }}
                  >
                    {/* Highlight Badge (Only rendered on the cheapest card) */}
                    {isCheapest && (
                      <div className={`absolute -top-7 left-3 bg-slate-900 text-white text-[7.5px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm transition-all duration-500 ${
                        isHeroAnimated ? 'opacity-100 translate-y-0 delay-900' : 'opacity-0 -translate-y-2'
                      }`}>
                        {currentProduct.badgeText}
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-left">
                      <img src={`https://www.google.com/s2/favicons?sz=64&domain=${p.domain}`} className="h-3.5 w-3.5 rounded object-contain" />
                      <span className="text-[9.5px] font-black text-slate-700">{p.platform}</span>
                    </div>
                    <div className="text-right flex flex-col leading-tight">
                      <span className={`text-xs font-black ${isCheapest ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {p.price}
                      </span>
                      <span className="text-[7.5px] font-bold text-slate-400">per unit</span>
                    </div>
                  </div>
                );
              })}

              {/* Decorative stickers: solid colored square stickers containing a "%" symbol */}
              {/* Sticker 1: Indigo */}
              <div className={`absolute z-20 h-8 w-8 rounded-lg bg-indigo-650 text-white flex items-center justify-center text-xs font-black shadow-md transition-all duration-500 ${
                isHeroAnimated ? 'opacity-100 scale-100 rotate-12 -translate-x-[140px] -translate-y-[20px]' : 'opacity-0 scale-0 rotate-0'
              }`} style={{ transitionDelay: '900ms' }}>
                %
              </div>

              {/* Sticker 2: Rose */}
              <div className={`absolute z-20 h-7 w-7 rounded-lg bg-rose-500 text-white flex items-center justify-center text-[10px] font-black shadow-md transition-all duration-500 ${
                isHeroAnimated ? 'opacity-100 scale-100 -rotate-12 translate-x-[150px] -translate-y-[170px]' : 'opacity-0 scale-0 rotate-0'
              }`} style={{ transitionDelay: '950ms' }}>
                %
              </div>

              {/* Sticker 3: Amber */}
              <div className={`absolute z-20 h-7.5 w-7.5 rounded-lg bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shadow-md transition-all duration-500 ${
                isHeroAnimated ? 'opacity-100 scale-100 rotate-[24deg] -translate-x-[130px] translate-y-[170px]' : 'opacity-0 scale-0 rotate-0'
              }`} style={{ transitionDelay: '1000ms' }}>
                %
              </div>

              {/* Star Sparkle Accents */}
              {/* Sparkle 1: Top-Right */}
              <div className={`absolute z-20 text-indigo-500 transition-all duration-500 ${
                isHeroAnimated ? 'opacity-100 scale-100 rotate-[45deg] translate-x-[70px] -translate-y-[220px]' : 'opacity-0 scale-0'
              }`} style={{ transitionDelay: '1050ms' }}>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
                </svg>
              </div>

              {/* Sparkle 2: Bottom-Left */}
              <div className={`absolute z-20 text-teal-400 transition-all duration-500 ${
                isHeroAnimated ? 'opacity-100 scale-100 -rotate-[15deg] -translate-x-[80px] translate-y-[220px]' : 'opacity-0 scale-0'
              }`} style={{ transitionDelay: '1100ms' }}>
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
                </svg>
              </div>

            </div>
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
        
        {/* Curated Collections Section */}
        <section className="flex flex-col gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-widest uppercase text-indigo-600">Quick Searches</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Popular Categories</h2>
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
      </main>

      {/* Featured Discoveries (Trending) - Full Width Section */}
      <section
        className="flex flex-col gap-8 w-full overflow-hidden py-20 bg-[#080d18] border-y border-indigo-400/15 relative z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
        style={{
          backgroundImage: 'linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px), radial-gradient(circle at 18% 52%, rgba(79,70,229,.20), transparent 28%), radial-gradient(circle at 82% 58%, rgba(20,184,166,.13), transparent 30%)',
          backgroundSize: '48px 48px, 48px 48px, auto, auto',
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60" aria-hidden="true">
          <svg className="absolute -right-10 -top-20 h-[420px] w-[620px] text-indigo-200/20" viewBox="0 0 620 420" fill="none">
            <path d="M85 80 160 35l75 45v88l-75 44-75-44V80Zm150 88 75-44 75 44v88l-75 44-75-44v-88Zm150-88 75-45 75 45v88l-75 44-75-44V80Zm-75 176 75-44 75 44v88l-75 44-75-44v-88Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 280 85 230l75 50m75-112 75-44m0 220 75-44 75 44m0-176 75-44 85 50" stroke="currentColor" strokeWidth="1.5" />
            {[['85','80'],['235','168'],['385','80'],['460','300'],['535','124']].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="currentColor" />)}
          </svg>
          <div className="absolute left-[8%] top-[30%] h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_20px_rgba(94,234,212,.9)] animate-pulse" />
          <div className="absolute left-[26%] bottom-[18%] h-1.5 w-1.5 rounded-full bg-indigo-300 shadow-[0_0_18px_rgba(165,180,252,.9)] animate-pulse" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">Trending Finds</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Featured Discoveries</h2>
          <div className="h-1.5 w-12 bg-indigo-500 rounded-full mt-1.5"></div>
        </div>

          {/* Conveyor Belt Marquee wrapper */}
          <div className="relative z-10 w-full overflow-hidden py-6 mt-3">
            {/* Soft gradient fade overlays on left and right for seamless look */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#080d18] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#080d18] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee gap-7">
              {[...FEATURED_DISCOVERIES, ...FEATURED_DISCOVERIES].map((prod, i) => (
                <div
                  key={i}
                  onClick={() => handleTrendingClick(prod.searchQuery)}
                  className="group w-[300px] shrink-0 border border-white/80 bg-white rounded-[1.35rem] cursor-pointer hover:border-indigo-400 hover:-translate-y-2 hover:shadow-[0_20px_42px_rgba(99,102,241,0.32)] transition-all duration-500 flex flex-col overflow-hidden text-left"
                >
                  {/* Top: Large image area */}
                  <div className="h-[180px] w-full bg-slate-50 flex items-center justify-center overflow-hidden relative">
                    {prod.image ? (
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className={`h-full w-full ${prod.imageFit || 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
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
                  <div className="flex flex-col p-5 gap-3 flex-grow justify-between bg-white border-t border-slate-50">
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-[15px] font-bold text-slate-800 line-clamp-1 tracking-wide group-hover:text-indigo-650 transition-colors">{prod.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                        Lowest on {prod.platform}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-100/60 pt-3.5 mt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Compare From</span>
                      <span className="text-base font-black text-indigo-600">{formatINR(prod.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <main className="mx-auto w-full max-w-7xl px-4 py-10 flex flex-col gap-20 relative z-10">

          {/* ── WHY WE BUILT PRICEHUNT — Sticky Stacking Cards (reference-exact) ── */}
          <section className="scroll-mt-24" style={{ paddingBottom: 0 }}>

            {/* Inject the exact CSS from the reference, scoped to .ph-stack-* */}
            <style>{`
              .ph-stack-wrapper {
                width: 100%;
                max-width: none;
                margin: 0 auto;
                padding: 0;
                /* CRITICAL: no overflow:hidden on this or any ancestor */
              }
              .ph-stack-card {
                position: sticky;
                min-height: 580px;
                border-radius: 34px;
                padding: 36px 64px;
                margin-bottom: 0;
                color: #fff;
                overflow: hidden;
                box-sizing: border-box;
                box-shadow: 0 24px 50px rgba(72, 58, 150, 0.18);
              }
              /* Sticky stack: panels pin below the navigation and reveal the next card's header. */
              .ph-stack-card:nth-of-type(1) { top: 76px;  z-index: 1; }
              .ph-stack-card:nth-of-type(2) { top: 112px; z-index: 2; }
              .ph-stack-card:nth-of-type(3) { top: 148px; z-index: 3; }
              .ph-stack-card:nth-of-type(4) { top: 184px; z-index: 4; }

              .ph-stack-card::after {
                content: '';
                position: absolute;
                width: 250px;
                height: 250px;
                border-radius: 50%;
                right: -75px;
                top: -145px;
                background: rgba(255,255,255,0.09);
              }
              .ph-card-top { display: flex; justify-content: space-between; align-items: flex-start; position: relative; z-index: 1; }
              .ph-card-badge {
                display: inline-block;
                background: rgba(255,255,255,0.18);
                color: #fff;
                font-size: 15px;
                font-weight: 800;
                padding: 7px 18px;
                border-radius: 20px;
                letter-spacing: 0.04em;
              }
              .ph-card-icon {
                width: 60px;
                height: 60px;
                background: rgba(255,255,255,0.17);
                border-radius: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
              }
              .ph-card-icon svg { width: 32px; height: 32px; }
              .ph-card-layout { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr); align-items: center; gap: 64px; min-height: 420px; position: relative; z-index: 1; }
              .ph-card-title {
                font-size: clamp(32px, 3.2vw, 48px);
                font-weight: 900;
                margin: 0 0 18px;
                letter-spacing: -0.02em;
                line-height: 1.2;
                color: #fff;
              }
              .ph-card-subtitle {
                font-size: 15px;
                font-weight: 800;
                color: rgba(255,255,255,0.75);
                margin: 0 0 18px;
                letter-spacing: 0.06em;
                text-transform: uppercase;
              }
              .ph-card-description { max-width: 530px; font-size: 18px; font-weight: 500; line-height: 1.72; color: rgba(255,255,255,0.88); margin: 0 0 28px; }
              .ph-card-chips { display: flex; flex-wrap: wrap; gap: 12px; }
              .ph-card-chip { background: rgba(255,255,255,0.18); padding: 9px 17px; border-radius: 999px; color: #fff; font-size: 14px; font-weight: 800; }
              .ph-visual { min-height: 360px; padding: 28px; border: 1px solid rgba(255,255,255,0.34); border-radius: 26px; background: rgba(255,255,255,0.08); display: flex; flex-direction: column; justify-content: center; gap: 12px; box-shadow: inset 0 1px rgba(255,255,255,0.12); }
              .ph-browser { background: rgba(255,255,255,0.22); border-radius: 16px; overflow: hidden; padding: 12px; }
              .ph-browser-bar { height: 26px; border-radius: 10px 10px 0 0; background: rgba(255,255,255,.22); margin: -12px -12px 12px; }
              .ph-demo-row { padding: 10px 12px; margin-top: 8px; border-radius: 10px; background: rgba(255,255,255,.93); color: #f43f5e; font-size: 12px; font-weight: 800; display: flex; justify-content: space-between; }
              .ph-status { border-radius: 999px; padding: 3px 7px; background: #ff2d5e; color: #fff; font-size: 9px; }
              .ph-orbit { align-self: center; width: 100px; height: 100px; border: 2px solid rgba(255,255,255,.22); border-radius: 50%; display: grid; place-items: center; margin: 14px 0; }
              .ph-orbit-inner { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 50%; border: 2px solid rgba(255,255,255,.65); background: rgba(255,255,255,.16); color: #ff944d; font-size: 25px; }
              .ph-network { display: flex; justify-content: space-between; }
              .ph-network span, .ph-latency { padding: 7px 12px; border-radius: 999px; background: rgba(255,255,255,.92); color: #4f46b8; font-size: 12px; font-weight: 800; }
              .ph-latency { align-self: center; }
              .ph-raw, .ph-match { background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.28); padding: 12px; border-radius: 12px; color: #fff; font-size: 12px; font-weight: 700; }
              .ph-match { background: rgba(255,255,255,.94); color: #047857; display: flex; justify-content: space-between; }
              .ph-check { align-self: center; width: 38px; height: 38px; display: grid; place-items: center; border: 2px solid rgba(255,255,255,.55); border-radius: 50%; font-weight: 900; }
              .ph-compare-title { color: rgba(255,255,255,.82); font-size: 12px; font-weight: 900; }
              .ph-price { background: rgba(255,255,255,.94); color: #64748b; padding: 12px; border-radius: 12px; display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; }
              .ph-price:first-of-type { color: #059669; border: 1px solid #86efac; }
              /* Extra runway lets the final card settle before normal content continues. */
              .ph-stack-spacer { height: 420px; }

              /* ── Gradient themes matching the reference ── */
              .ph-theme-1 { background: linear-gradient(125deg, #fdb4bd 0%, #fb355b 100%); }
              .ph-theme-2 { background: linear-gradient(125deg, #bfc6ff 0%, #5953e8 100%); }
              .ph-theme-3 { background: linear-gradient(125deg, #93e8ca 0%, #05b982 100%); }
              .ph-theme-4 { background: linear-gradient(125deg, #cfbdff 0%, #7532e8 100%); }

              /* ── Responsive ── */
              @media (max-width: 640px) {
                .ph-stack-card {
                  min-height: 570px;
                  padding: 24px;
                  border-radius: 16px;
                }
                .ph-stack-card:nth-of-type(1) { top: 64px; }
                .ph-stack-card:nth-of-type(2) { top: 86px; }
                .ph-stack-card:nth-of-type(3) { top: 108px; }
                .ph-stack-card:nth-of-type(4) { top: 130px; }
                .ph-card-layout { grid-template-columns: 1fr; gap: 24px; min-height: auto; padding-top: 36px; }
                .ph-card-title { font-size: 29px; }
                .ph-card-description { font-size: 16px; }
                .ph-visual { min-height: 250px; padding: 20px; }
              }
            `}</style>

            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{
                fontSize: '11px', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#4f46e5',
              }}>
                The Journey
              </span>
              <h2 style={{
                fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 900,
                color: '#0f172a', margin: '8px 0 12px', letterSpacing: '-0.02em',
              }}>
                Why We Built PriceHunt
              </h2>
              <div style={{ height: '6px', width: '48px', background: '#4f46e5', borderRadius: '4px', margin: '0 auto' }} />
            </div>

            {/* ── STACK WRAPPER — no overflow:hidden here or in any parent ── */}
            <div className="ph-stack-wrapper" id="ph-stack-wrapper">

              {STORY_SLIDES.map((slide, idx) => {
                const themes = ['ph-theme-1', 'ph-theme-2', 'ph-theme-3', 'ph-theme-4'];
                const cardChips = [
                  ['10 Browser Tabs', 'Price Chaos', 'No More!'],
                  ['2s Query Time', 'Live Prices', 'Real-time'],
                  ['NLP Engine', 'Smart Match', 'Normalized'],
                  ['0% Markup', '0% Fees', 'Your Wallet First'],
                ];
                const tileData = [
                  /* Card 1 — The Problem */
                  [
                    { label: 'The Pain Point', body: 'You search "Sony WH-1000XM5" and open 6 tabs. Amazon, Flipkart, Myntra, Croma, Ajio, Tata CLiQ — each with a different price. Your browser crashes. The deal is gone.' },
                    { label: 'The Cost', body: 'On average, Indian shoppers spend 45 minutes comparing prices across platforms for a single product — often still missing the best deal.' },
                  ],
                  /* Card 2 — The Breakthrough */
                  [
                    { label: 'Under 2 Seconds', body: 'Our live aggregation engine hits each retailer\'s search index in parallel and returns all results before a page can fully load.' },
                    { label: 'Always Fresh', body: 'No caches. No stale prices. Every search triggers a new live request — so you always see the price that\'s active at this exact second.' },
                  ],
                  /* Card 3 — The Intelligence */
                  [
                    { label: 'The NLP Problem', body: '"Galaxy S23 Lavender 128GB" on Amazon vs "SAMSUNG Galaxy S23 (Lavender, 128 GB)" on Flipkart — same phone, different strings. Our model merges them.' },
                    { label: 'The Result', body: 'One clean product card. All stores. Sorted by price. No duplicates, no noise — just the information you need to make the right call.' },
                  ],
                  /* Card 4 — Our Principle */
                  [
                    { label: 'Zero Commission', body: 'We don\'t earn affiliate fees. We don\'t accept sponsored placements. The cheapest listing always appears first, full stop.' },
                    { label: 'Free Forever', body: 'PriceHunt is completely free to use. No account required, no premium tier — just open the site and search.' },
                  ],
                ];

                return (
                  <div
                    key={idx}
                  className={`ph-stack-card ${themes[idx % themes.length]}`}
                  data-ph-stack-index={idx}
                >
                  <div className="ph-card-top">
                      <span className="ph-card-badge">{idx + 1}/{STORY_SLIDES.length}</span>
                      <div className="ph-card-icon">{slide.icon}</div>
                    </div>

                    <div className="ph-card-layout">
                      <div>
                        <p className="ph-card-subtitle">{slide.subtitle}</p>
                        <h2 className="ph-card-title">{slide.title}</h2>
                        <p className="ph-card-description">{slide.description}</p>
                        <div className="ph-card-chips">
                          {cardChips[idx].map((chip) => <span key={chip} className="ph-card-chip">{chip}</span>)}
                        </div>
                      </div>

                      <div className="ph-visual">
                        {idx === 0 && <div className="ph-browser"><div className="ph-browser-bar" />{['Amazon.in — Crashed 502', 'Flipkart — Timed Out 408', 'Myntra — Stale Price'].map((label) => <div key={label} className="ph-demo-row"><span>{label}</span><span className="ph-status">ERR</span></div>)}</div>}
                        {idx === 1 && <><div className="ph-network"><span>Amazon</span><span>Flipkart</span></div><div className="ph-orbit"><div className="ph-orbit-inner">ϟ</div></div><div className="ph-network"><span>Myntra</span><span>Ajio</span></div><span className="ph-latency">Latency: 1.82s</span></>}
                        {idx === 2 && <><div className="ph-raw">Amazon: “Galaxy S23 Luxe Grey”</div><div className="ph-check">✓</div><div className="ph-match"><span>Samsung Galaxy S23 5G</span><span>Matched</span></div></>}
                        {idx === 3 && <><div className="ph-compare-title">LIVE PRICE COMPARISON</div><div className="ph-price"><span>1. Flipkart (Cheapest)</span><span>₹12,499</span></div><div className="ph-price"><span>2. Amazon</span><span>₹12,999</span></div><div className="ph-raw">🛡️ &nbsp; 0% Markups · 0% Fees</div></>}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* CRITICAL: 200px spacer — last card needs scroll runway */}
              <div className="ph-stack-spacer" aria-hidden="true" />
            </div>

          </section>

          {/* Live Status Statistics - Responsive mobile (1 col stacked) vs desktop (3 cols inline) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 border border-slate-100 rounded-2xl bg-white p-6 py-8 md:py-10 text-center shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
          <div className="flex flex-col gap-1 border-b border-slate-100/60 pb-5 md:pb-0 md:border-b-0 md:border-r border-slate-100 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-650 tracking-tight">4+</span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-0.5">Stores Integrated</span>
          </div>
          <div className="flex flex-col gap-1 border-b border-slate-100/60 pb-5 md:pb-0 md:border-b-0 md:border-r border-slate-100 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-650 tracking-tight">100%</span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-0.5">Real-Time Prices</span>
          </div>
          <div className="flex flex-col gap-1 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-650 tracking-tight flex items-center justify-center gap-1.5 md:gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
              Active
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-0.5">Server Status</span>
          </div>
        </section>

        {/* How it works — connected price journey */}
        <section id="how-it-works" className="scroll-mt-24 relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-white px-5 py-12 md:px-10 md:py-16 shadow-[0_18px_55px_rgba(79,70,229,0.10)]">
          <style>{`
            @keyframes priceTrail { to { stroke-dashoffset: -24; } }
            @keyframes softFloat { 50% { transform: translateY(-7px); } }
            .ph-process-trail { stroke-dasharray: 6 6; animation: priceTrail 1.5s linear infinite; }
            .ph-process-card { animation: softFloat 5s ease-in-out infinite; }
            .ph-process-card:nth-child(2) { animation-delay: .55s; }
            .ph-process-card:nth-child(3) { animation-delay: 1.1s; }
            @media (prefers-reduced-motion: reduce) { .ph-process-trail, .ph-process-card { animation: none; } }
          `}</style>

          <div className="absolute inset-0 opacity-[0.36] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(99,102,241,.16) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl pointer-events-none" />
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-teal-100/70 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-indigo-600"><span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />Simple process</span>
            <h2 className="mt-5 text-3xl md:text-4xl font-black tracking-tight text-slate-900">Find the best price in <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">three clear steps.</span></h2>
            <p className="mt-3 text-sm md:text-base font-medium leading-relaxed text-slate-500">Search once, see live offers together, then buy directly from the store with the best deal.</p>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <svg className="absolute hidden md:block left-[14%] top-12 h-10 w-[72%]" viewBox="0 0 720 40" fill="none" aria-hidden="true"><path className="ph-process-trail" d="M0 20 H720" stroke="#818cf8" strokeWidth="2" /></svg>
            {[
              { step: '01', title: 'Tell us what you need', text: 'Type a product, brand, or category. We understand everyday shopping searches.', label: 'Start searching', color: 'indigo', icon: <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" /> },
              { step: '02', title: 'Watch offers line up', text: 'PriceHunt collects and groups matching listings across your favorite stores.', label: 'Live comparison', color: 'violet', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v18M17 3v18M3 7h18M3 17h18" /> },
              { step: '03', title: 'Choose your best deal', text: 'Compare the lowest price and go straight to the official store to purchase.', label: 'Save with confidence', color: 'teal', icon: <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /> },
            ].map((item, index) => {
              const styles = {
                indigo: 'border-indigo-100 from-indigo-50 to-white text-indigo-600 ring-indigo-100',
                violet: 'border-violet-100 from-violet-50 to-white text-violet-600 ring-violet-100',
                teal: 'border-teal-100 from-teal-50 to-white text-teal-600 ring-teal-100',
              };
              return <article key={item.step} className={`ph-process-card group relative rounded-3xl border bg-gradient-to-b p-7 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_38px_rgba(79,70,229,0.16)] ${styles[item.color]}`} style={{ animationDelay: `${index * 140}ms` }}>
                <div className="absolute right-6 top-5 text-5xl font-black tracking-tighter text-slate-900/[0.05]">{item.step}</div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ${styles[item.color].split(' ').slice(-1)[0]} transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}><svg className={`h-6 w-6 ${styles[item.color].split(' ')[3]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>{item.icon}</svg></div>
                <div className="mt-8 text-[11px] font-black tracking-[0.18em] text-slate-400">STEP {item.step}</div>
                <h3 className="mt-2 text-xl font-black tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">{item.text}</p>
                <div className={`mt-7 inline-flex items-center gap-2 text-xs font-black ${styles[item.color].split(' ')[3]}`}><span className={`h-2 w-2 rounded-full ${item.color === 'teal' ? 'bg-teal-500' : item.color === 'violet' ? 'bg-violet-500' : 'bg-indigo-500'} animate-pulse`} />{item.label}</div>
              </article>;
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
