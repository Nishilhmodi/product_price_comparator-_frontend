import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { EmptyState } from '../components/EmptyState';
import { Footer } from '../components/Footer';
import bgWaves from '../assets/bg-waves.jpg';
import { BASE_URL } from '../utils/api';


const DEFAULT_FILTERS = {
  sort: 'Price: Low to High',
  platform: 'All Platforms',
  budget: 'Any Budget',
  rating: 'Any Rating'
};

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // 1. Filters State
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [limit, setLimit] = useState(12); // changed to 12 (multiple of 3 for 3-column grid)
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Reset filters and limit when a new search query is submitted
  useEffect(() => {
    setFilters(DEFAULT_FILTERS);
    setLimit(12);
    window.scrollTo(0, 0);
  }, [query]);

  // 2. Custom Search Hook Integration
  const { loading, error, results, totalResults, sourceInfo, intentChips } = useSearch(
    query,
    filters
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setLimit(12);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setLimit(12);
    setShowMobileFilters(false);
  };

  // Slice results based on pagination limit
  const visibleResults = results.slice(0, limit);

  // Determine source tag pill color
  const getSourceTagStyles = () => {
    if (sourceInfo.toLowerCase().includes('live')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
    }
    return 'bg-slate-50 text-slate-700 border-slate-200/50';
  };

  // Check if any filters are active (excluding default)
  const hasActiveFilters = 
    filters.platform !== 'All Platforms' || 
    filters.budget !== 'Any Budget' || 
    filters.rating !== 'Any Rating';

  // Render Star Icons for Rating Filter
  const renderStars = (count) => {
    return (
      <div className="flex items-center text-amber-500 gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-3.5 w-3.5 ${i < count ? 'fill-current' : 'text-[#d1d5db]'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Filter sidebar content (reusable for desktop and mobile drawer)
  const renderSidebarContent = () => (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort By Filter */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Sort By</span>
        <div className="flex flex-col gap-2">
          {['Relevance', 'Price: Low to High', 'Price: High to Low', 'Best Rating'].map((option) => {
            const isActive = filters.sort === option || (option === 'Relevance' && !['Price: Low to High', 'Price: High to Low', 'Best Rating'].includes(filters.sort));
            return (
              <label
                key={option}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={isActive}
                  onChange={() => handleFilterChange('sort', option)}
                  className="h-3 w-3 border-slate-200 text-indigo-600 focus:ring-0 accent-indigo-650 cursor-pointer"
                />
                <span className={isActive ? 'text-indigo-600 font-bold' : ''}>
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Platform Filter (Checklist Style) */}
      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Store / Platform</span>
        <div className="flex flex-col gap-2">
          {['All Platforms', 'Amazon', 'Flipkart', 'Myntra', 'Ajio'].map((plat) => (
            <label
              key={plat}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="platform"
                checked={filters.platform === plat}
                onChange={() => handleFilterChange('platform', plat)}
                className="h-3 w-3 border-slate-200 text-indigo-600 focus:ring-0 accent-indigo-650 cursor-pointer"
              />
              <span className={`flex items-center gap-1.5 ${filters.platform === plat ? 'text-indigo-600 font-bold' : ''}`}>
                {plat === 'Amazon' && <img src="https://www.google.com/s2/favicons?sz=64&domain=amazon.in" alt="Amazon" className="h-3.5 w-3.5 object-contain rounded" />}
                {plat === 'Flipkart' && <img src="https://www.google.com/s2/favicons?sz=64&domain=flipkart.com" alt="Flipkart" className="h-3.5 w-3.5 object-contain rounded animate-fade-in" />}
                {plat === 'Myntra' && <img src="https://www.google.com/s2/favicons?sz=64&domain=myntra.com" alt="Myntra" className="h-3.5 w-3.5 object-contain rounded animate-fade-in" />}
                {plat === 'Ajio' && <img src="https://www.google.com/s2/favicons?sz=64&domain=ajio.com" alt="Ajio" className="h-3.5 w-3.5 object-contain rounded animate-fade-in" />}
                {plat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Filter */}
      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Budget</span>
        <div className="flex flex-col gap-2">
          {['Any Budget', 'Under ₹1,000', '₹1,000–₹5,000', '₹5,000–₹15,000', 'Above ₹15,000'].map((budg) => (
            <label
              key={budg}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="budget"
                checked={filters.budget === budg}
                onChange={() => handleFilterChange('budget', budg)}
                className="h-3 w-3 border-slate-200 text-indigo-600 focus:ring-0 accent-indigo-650 cursor-pointer"
              />
              <span className={filters.budget === budg ? 'text-indigo-600 font-bold' : ''}>
                {budg}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Rating</span>
        <div className="flex flex-col gap-2">
          {['Any Rating', '4★ & above', '3★ & above'].map((rate) => (
            <label
              key={rate}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rate}
                onChange={() => handleFilterChange('rating', rate)}
                className="h-3 w-3 border-slate-200 text-indigo-600 focus:ring-0 accent-indigo-650 cursor-pointer"
              />
              <span className="flex items-center gap-1.5">
                <span className={filters.rating === rate ? 'text-indigo-600 font-bold' : ''}>
                  {rate.replace(' & above', '')}
                </span>
                {rate !== 'Any Rating' && renderStars(rate.startsWith('4') ? 4 : 3)}
                {rate !== 'Any Rating' && <span className="text-[9px] text-slate-400">&above</span>}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const isProd = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const isLocalApi = BASE_URL.includes('127.0.0.1') || BASE_URL.includes('localhost');

  return (
    <div 
      className="min-h-screen w-full bg-slate-50 flex flex-col transition-all duration-300 relative"
      style={{
        backgroundImage: `
          linear-gradient(rgba(238, 242, 255, 0.82), rgba(224, 231, 255, 0.82)),
          url(${bgWaves})
        `,
        backgroundSize: '100% 100%, cover',
        backgroundPosition: 'center, center',
        backgroundAttachment: 'fixed, fixed',
        backgroundRepeat: 'no-repeat, no-repeat'
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

      {/* Navbar */}
      <Navbar showSearch={true} searchQuery={query} />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 flex flex-col md:flex-row gap-8 text-left items-start">
        
        {/* LEFT COLUMN: Modern Sidebar (Desktop Only) */}
        <aside className="hidden md:block w-[280px] bg-white border border-slate-100 p-5 shrink-0 self-start sticky top-[80px] rounded-2xl shadow-sm min-h-[calc(100vh-160px)] flex flex-col justify-between">
          {renderSidebarContent()}
        </aside>

        {/* RIGHT COLUMN: Results, Sorting & Grid */}
        <section className="flex-grow w-full flex flex-col gap-4">
          
          {/* Back to Home Button */}
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-indigo-650 transition-colors group cursor-pointer"
            >
              <svg 
                className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform text-slate-400 group-hover:text-indigo-655" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          
          {/* Top Info Bar (Source Pill, AI Intents, Mobile Filter Trigger) */}
          <div className="flex flex-col gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
            
            {/* Header info */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {!loading && sourceInfo && (
                  <span className={`border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${getSourceTagStyles()}`}>
                    {sourceInfo}
                  </span>
                )}
                {!loading && (
                  <span className="text-xs font-semibold text-slate-500 tracking-wide">
                    Showing {results.length} results for <span className="font-sans font-bold text-indigo-600">"{query}"</span>
                  </span>
                )}
              </div>

              {/* Mobile Filter Button (Shows only on mobile) */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="block md:hidden border border-indigo-600 bg-white rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 cursor-pointer hover:bg-indigo-50 transition-colors duration-200 shadow-sm"
              >
                Filters &amp; Sort
              </button>
            </div>

            {/* AI Intent Chips */}
            {!loading && intentChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Intents:</span>
                {intentChips.map((chip, i) => (
                  <span
                    key={i}
                    className="bg-indigo-50/50 border border-indigo-100/50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-700 rounded-md"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>



          {/* Active Removable Chips Row */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2.5 my-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active:</span>
              {filters.platform !== 'All Platforms' && (
                <span className="flex items-center gap-1.5 bg-white border border-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 tracking-wide rounded-lg shadow-sm">
                  {filters.platform}
                  <button onClick={() => handleFilterChange('platform', 'All Platforms')} className="text-slate-400 hover:text-rose-500 font-bold text-[11px] ml-1.5 cursor-pointer">&times;</button>
                </span>
              )}
              {filters.budget !== 'Any Budget' && (
                <span className="flex items-center gap-1.5 bg-white border border-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 tracking-wide rounded-lg shadow-sm">
                  {filters.budget}
                  <button onClick={() => handleFilterChange('budget', 'Any Budget')} className="text-slate-400 hover:text-rose-500 font-bold text-[11px] ml-1.5 cursor-pointer">&times;</button>
                </span>
              )}
              {filters.rating !== 'Any Rating' && (
                <span className="flex items-center gap-1.5 bg-white border border-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 tracking-wide rounded-lg shadow-sm">
                  {filters.rating}
                  <button onClick={() => handleFilterChange('rating', 'Any Rating')} className="text-slate-400 hover:text-rose-500 font-bold text-[11px] ml-1.5 cursor-pointer">&times;</button>
                </span>
              )}
            </div>
          )}

          {/* Product Cards Grid / Loading / Empty States */}
          {loading ? (
            /* Pulsing skeleton cards in 3-column grid */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            /* Empty State */
            <EmptyState query={query} onClearFilters={handleClearFilters} />
          ) : (
            /* 3-Column Product Grid */
            <div className="flex flex-col gap-6 w-full">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {visibleResults.map((product, idx) => (
                  <div 
                    key={product.title + idx} 
                    className="animate-scale-in"
                    style={{ animationDelay: `${(idx % 12) * 50}ms`, animationFillMode: 'both' }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {results.length > limit && (
                <div className="flex flex-col items-center gap-2 mt-4 w-full">
                  <button
                    onClick={() => setLimit(prev => prev + 12)}
                    className="w-full sm:w-auto border border-indigo-600 bg-white rounded-xl px-10 py-3.5 text-xs font-bold tracking-widest uppercase text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    Load more results
                  </button>
                </div>
              )}
              
              {/* Footer text */}
              <div className="text-center text-[9px] font-bold tracking-wider uppercase text-slate-400 mt-4">
                Prices aggregated from Amazon &bull; Flipkart &bull; Myntra &bull; Ajio
              </div>
            </div>
          )}

        </section>
      </main>

      {/* MOBILE FILTERS SHEET OVERLAY */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
            <span className="text-xs font-bold tracking-widest text-slate-800 uppercase">Filters &amp; Sort</span>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-2xl text-slate-400 font-light cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* Content (Scrollable) */}
          <div className="flex-grow overflow-y-auto p-5 text-left bg-slate-50/50">
            


            {/* Standard Filters */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
              {renderSidebarContent()}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-slate-100 p-4 flex gap-3 bg-white">
            <button
              onClick={handleClearFilters}
              className="flex-1 border border-slate-200 bg-slate-50 rounded-xl py-3.5 text-xs font-bold tracking-widest uppercase text-slate-500 cursor-pointer"
            >
              Reset All
            </button>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="flex-1 bg-indigo-600 text-white rounded-xl py-3.5 text-xs font-bold tracking-widest uppercase cursor-pointer hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
