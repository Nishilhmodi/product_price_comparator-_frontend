import { Link, useNavigate } from 'react-router-dom';
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
      <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.3" />
        <path strokeLinecap="round" d="M10 5h4" />
        <circle cx="12" cy="18.5" r=".7" fill="currentColor" />
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
      <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <rect x="8" y="2" width="8" height="20" rx="2.5" />
        <rect x="6" y="6.5" width="12" height="11" rx="3" fill="currentColor" fillOpacity=".14" />
        <path strokeLinecap="round" d="M12 9.5v3l2 1.2" />
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
      <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 15v-3a8 8 0 0 1 16 0v3M4 15h4v4H5a1 1 0 0 1-1-1v-3Zm16 0h-4v4h3a1 1 0 0 0 1-1v-3Z" />
        <path strokeLinecap="round" d="M16 20c-.8 1.1-2.1 1.6-4 1.6" />
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
      <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15.5c2.4-.2 4.4-1.6 5.7-4.2l1.7 1.4c1.5 1.2 3.3 1.9 5.2 1.9H19l2 2.1v2.8H4.1A2.1 2.1 0 0 1 2 17.4c0-1 .4-1.8 1-1.9Z" />
        <path strokeLinecap="round" d="M8 17.5h.01M16.5 17.5h.01" />
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
      <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 4h4m-2 0v3m-3 0h6l1 3v9.5A1.5 1.5 0 0 1 14.5 21h-5A1.5 1.5 0 0 1 8 19.5V10l1-3Z" />
        <path strokeLinecap="round" d="M10.5 14.5c.6.8 1.4 1.2 2.5 1.2s1.9-.4 2.5-1.2" />
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
      <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 4 3.5 2 3.5-2 4.5 3.8-2.4 3.1-2.2-1.3V20H8.6V9.6l-2.2 1.3L4 7.8 8.5 4Z" />
        <path strokeLinecap="round" d="M10 6.8h4" />
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
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=90&w=1200&auto=format&fit=crop"
  },
  {
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: 23990,
    platform: "Flipkart",
    type: "Audio",
    searchQuery: "sony wh-1000xm5",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=90&w=1200&auto=format&fit=crop"
  },
  {
    name: "MacBook Air with M3 chip",
    price: 134999,
    platform: "Flipkart",
    type: "Laptop",
    searchQuery: "MacBook Air with M3 chip",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=90&w=1200&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=90&w=1200&auto=format&fit=crop"
  },
  {
    name: "Nike C1ty Sneakers",
    price: 3399,
    platform: "Amazon",
    type: "Footwear",
    searchQuery: "Nike C1ty Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=90&w=1200&auto=format&fit=crop"
  },
  {
    name: "Bellavita perfume",
    price: 199,
    platform: "Flipkart",
    type: "Fragrance",
    searchQuery: "Bellavita perfume",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=90&w=1200&auto=format&fit=crop"
  },
  {
    name: "SAFARI Suitcase",
    price: 1599,
    platform: "Myntra",
    type: "Travel Gear",
    searchQuery: "SAFARI Suitcase",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=90&w=1200&auto=format&fit=crop"
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
              <Link to="/how-it-works" className="text-sm font-black tracking-wider uppercase text-slate-500 hover:text-indigo-650 transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
              >
                Learn Methodology &rarr;
              </Link>
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
        <section className="hidden">
          <style>{`
            @keyframes categorySheen { 0%, 100% { transform: translateX(-125%) rotate(12deg); } 55% { transform: translateX(190%) rotate(12deg); } }
            .ph-category-card::after { content: ''; position: absolute; inset: -35% auto -35% -20%; width: 28%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.75), transparent); transform: translateX(-125%) rotate(12deg); pointer-events: none; }
            .ph-category-card:hover::after { animation: categorySheen .75s ease-out; }
            .ph-category-card > div:last-child { display: none; }
          `}</style>
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-indigo-100/70 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.5] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(99,102,241,.13) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

          <div className="relative flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-indigo-600">Quick searches</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Explore popular categories</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-relaxed text-slate-500 md:mx-0">Find your next deal through a collection made for everyday shopping, with live store prices ready to compare.</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tap a category to compare</span>
          </div>

          <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
            {COLLECTIONS.map((col, i) => {
              const cardThemes = [
                'from-blue-50 to-indigo-50 border-blue-100 hover:border-blue-300',
                'from-amber-50 to-orange-50 border-amber-100 hover:border-amber-300',
                'from-violet-50 to-purple-50 border-violet-100 hover:border-violet-300',
                'from-rose-50 to-pink-50 border-rose-100 hover:border-rose-300',
                'from-teal-50 to-cyan-50 border-teal-100 hover:border-teal-300',
                'from-emerald-50 to-green-50 border-emerald-100 hover:border-emerald-300',
              ];
              return (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => handleTrendingClick(col.query)}
                  className={`ph-category-card group relative min-h-[205px] overflow-hidden rounded-3xl border bg-gradient-to-br p-5 text-left shadow-[0_8px_22px_rgba(15,23,42,.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_38px_rgba(79,70,229,.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${cardThemes[i]}`}
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${col.colorClass}`}>
                      {col.icon}
                    </div>
                    <span className="text-[11px] font-black tracking-widest text-slate-300">0{i + 1}</span>
                    </div>
                  <div className="mt-7">
                    <h3 className="text-xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-indigo-700">{col.name}</h3>
                    <p className="mt-2 text-xs font-bold leading-relaxed text-slate-500">{col.desc}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.13em] text-indigo-600 transition-transform duration-300 group-hover:translate-x-1">Explore deals <span className="text-base leading-none">→</span></div>
                  <div className="mt-auto pt-3 text-[10px] font-black uppercase tracking-[0.13em] text-indigo-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Compare deals →</div>
                </button>
              );
            })}
          </div>
        </section>

        {false && <section className="relative overflow-hidden rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-white via-[#fbfaff] to-indigo-50/60 p-5 shadow-[0_20px_45px_rgba(79,70,229,0.10)] sm:p-8 md:p-12">
          <style>{`
            @keyframes interestPop { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
            .ph-interest-chip:hover { animation: interestPop .55s ease-in-out; }
          `}</style>
          <div className="absolute left-[4%] top-16 hidden -rotate-12 text-7xl drop-shadow-[0_18px_14px_rgba(109,40,217,.25)] md:block" aria-hidden="true">🛍️</div>
          <div className="absolute right-[4%] top-20 hidden rotate-12 text-7xl drop-shadow-[0_18px_14px_rgba(79,70,229,.22)] md:block" aria-hidden="true">🔎</div>
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600 shadow-sm"><span>ϟ</span> Quick searches</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">Explore popular <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-500 bg-clip-text text-transparent">categories</span></h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 md:text-base">Choose what you’re shopping for and we’ll make it easy to compare the best live prices.</p>
          </div>

          <div className="relative mt-10 space-y-4 md:mt-12">
            {CATEGORY_GROUPS.map((group, groupIndex) => (
              <div key={group.title} className={`rounded-3xl border bg-gradient-to-r p-4 shadow-[0_8px_20px_rgba(79,70,229,.04)] sm:p-5 ${['border-violet-200/70 from-violet-50/80 to-white', 'border-rose-200/70 from-rose-50/80 to-white', 'border-emerald-200/70 from-emerald-50/80 to-white'][groupIndex]}`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-900 sm:text-xl"><span className="text-2xl">{group.icon}</span>{group.title}</h3>
                  <span className="rounded-full border border-indigo-100 bg-white/70 px-3 py-1.5 text-xs font-black text-indigo-600">View all →</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleTrendingClick(item.query)}
                      className="ph-interest-chip group flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-2xl border border-white bg-white/90 p-3 text-center text-sm font-black text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-[0_12px_20px_rgba(79,70,229,.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-50 to-violet-100 text-3xl leading-none shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>}
      </main>

      {/* Featured Discoveries (Trending) - Full Width Section */}
      <section
        className="hidden"
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

        <section className="relative overflow-hidden border-y border-indigo-400/20 bg-[#070b18] px-4 py-16 text-white sm:px-6 md:py-20">
          <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 15%, rgba(139,92,246,.36), transparent 24%), radial-gradient(circle at 88% 40%, rgba(6,182,212,.22), transparent 27%), radial-gradient(rgba(148,163,184,.1) 1px, transparent 1px)', backgroundSize: 'auto, auto, 28px 28px' }} />
          <svg className="absolute right-0 top-0 h-full w-[45%] text-violet-300/15 pointer-events-none" viewBox="0 0 600 600" fill="none" aria-hidden="true"><path d="M80 120c160-140 230 110 350-25s95 225-40 295M130 520c95-90 180-20 305-145" stroke="currentColor" strokeWidth="2"/><circle cx="80" cy="120" r="6" fill="currentColor"/><circle cx="430" cy="95" r="6" fill="currentColor"/><circle cx="390" cy="390" r="6" fill="currentColor"/></svg>

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-fuchsia-300"><span>✦</span> Trending finds</span>
              <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Featured <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">Discoveries</span></h2>
              <p className="mt-3 text-sm font-medium text-slate-300 sm:text-base">Handpicked products, live prices, and top deals from trusted stores.</p>
              <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-fuchsia-400"><span className="h-px w-14 bg-gradient-to-r from-transparent to-fuchsia-400" /><span className="text-xl">✦</span><span className="h-px w-14 bg-gradient-to-l from-transparent to-fuchsia-400" /></div>
            </div>

            <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden py-4">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#070b18] to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#070b18] to-transparent sm:w-24" />
              <div className="flex animate-marquee gap-6 px-4 sm:px-6">
              {[...FEATURED_DISCOVERIES, ...FEATURED_DISCOVERIES].map((prod, index) => (
                <article key={`${prod.name}-${index}`} onClick={() => handleTrendingClick(prod.searchQuery)} className="group relative w-[320px] shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-b from-[#121a35] to-[#0b1024] p-3 shadow-[0_16px_34px_rgba(0,0,0,.28)] transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-400/65 hover:shadow-[0_20px_42px_rgba(124,58,237,.30)]">
                  <div className="relative h-56 overflow-hidden rounded-2xl bg-[#0d1730]">
                    <img src={prod.image} alt={prod.name} loading="eager" decoding="async" className={`h-full w-full ${prod.imageFit || 'object-cover'} transition-transform duration-700 group-hover:scale-110`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1024]/60 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-fuchsia-600/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">{prod.type}</span>
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-slate-950/45 text-lg text-white/80 backdrop-blur-sm transition-colors group-hover:text-fuchsia-300">♡</span>
                  </div>
                  <div className="px-2 pb-2 pt-5">
                    <h3 className="line-clamp-2 min-h-12 text-lg font-black leading-snug text-white">{prod.name}</h3>
                    <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-slate-400">Lowest on <span className="text-cyan-300">{prod.platform}</span></p>
                    <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                      <div><span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Compare from</span><span className="mt-1 block text-2xl font-black text-fuchsia-300">{formatINR(prod.price)}</span></div>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-xl font-bold shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </article>
              ))}
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-indigo-400/20 bg-white/[.04] text-center sm:grid-cols-4">
              {['Best price guaranteed', 'Top-rated products', 'Secure shopping', 'Trusted by shoppers'].map((item, index) => <div key={item} className={`flex items-center justify-center gap-2 px-3 py-4 text-xs font-bold text-slate-300 ${index ? 'border-l border-white/10' : ''}`}><span className="text-fuchsia-300">{['⌾','☆','⌑','✦'][index]}</span>{item}</div>)}
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

          {/* Shopper benefits - responsive mobile stack and desktop columns */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 border border-slate-100 rounded-2xl bg-white p-6 py-8 md:py-10 text-center shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
          <div className="flex flex-col gap-1 border-b border-slate-100/60 pb-5 sm:border-r sm:pr-4 lg:border-b-0 lg:pb-0 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-650 tracking-tight">4+</span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-0.5">Stores Integrated</span>
          </div>
          <div className="flex flex-col gap-1 border-b border-slate-100/60 pb-5 sm:pl-4 lg:border-b-0 lg:border-r lg:pb-0 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-650 tracking-tight">100%</span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-0.5">Real-Time Prices</span>
          </div>
          <div className="flex flex-col gap-1 border-b border-slate-100/60 pb-5 sm:border-b-0 sm:border-r sm:pr-4 lg:pb-0 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-650 tracking-tight">0%</span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-0.5">Hidden Fees or Markups</span>
          </div>
          <div className="flex flex-col gap-1 sm:pl-4 lg:pl-0 z-10">
            <span className="text-3xl md:text-4.5xl font-black text-indigo-650 tracking-tight">One Search</span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mt-0.5">Compare Everywhere</span>
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
