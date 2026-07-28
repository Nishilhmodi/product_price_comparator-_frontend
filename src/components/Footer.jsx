import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100/80 bg-white px-5 py-12 text-slate-500 relative overflow-hidden sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      {/* Background Gradient Decorative Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-gradient-to-tr from-indigo-500 to-purple-500 z-0"></div>

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col gap-10 sm:gap-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10 sm:text-left lg:grid-cols-[minmax(0,1.35fr)_minmax(180px,.7fr)_minmax(300px,1fr)] lg:gap-16">
          
          {/* Brand & Tagline - spans 5 columns */}
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <svg className="h-5.5 w-5.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex items-center text-xl font-extrabold tracking-tight">
                <span className="text-slate-900">Price</span>
                <span className="text-indigo-600">Hunt</span>
              </div>
            </Link>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
              India's smartest live price comparison engine. We parse and group real-time offers across top e-commerce platforms to help you find the absolute best deals.
            </p>
            {/* Social Icons */}
            <div className="mt-2 flex items-center gap-3">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`}
                  className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all duration-300 shadow-sm"
                >
                  <span className="sr-only">{social}</span>
                  {social === 'twitter' && (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {social === 'github' && (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                    </svg>
                  )}
                  {social === 'linkedin' && (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - spans 3 columns */}
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Navigation
            </h4>
            <div className="flex flex-col items-center gap-2.5 text-[15px] font-semibold text-slate-500 sm:items-start">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Home Page</Link>
              <Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">How it works</Link>
              <a href="#trending" className="hover:text-indigo-600 transition-colors">Trending Deals</a>
              <a href="#categories" className="hover:text-indigo-600 transition-colors">Supported Categories</a>
            </div>
          </div>

          {/* Supported Stores - spans 4 columns */}
          <div className="flex flex-col items-center gap-4 sm:col-span-2 sm:items-start lg:col-span-1">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Supported Merchants
            </h4>
            <div className="grid w-full max-w-md grid-cols-2 gap-3 px-1 sm:px-0 lg:max-w-none">
              {[
                { name: 'Amazon', domain: 'amazon.in' },
                { name: 'Flipkart', domain: 'flipkart.com' },
                { name: 'Myntra', domain: 'myntra.com' },
                { name: 'Ajio', domain: 'ajio.com' }
              ].map((store) => (
                <div 
                  key={store.name}
                  className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:border-indigo-100 hover:bg-indigo-50/30"
                >
                  <img 
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${store.domain}`} 
                    alt={store.name} 
                    className="h-4 w-4 object-contain rounded" 
                  />
                  {store.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Bottom Section */}
        <div className="flex flex-col gap-7 border-t border-slate-100/80 pt-8 sm:pt-10">
          {/* Price Variation Disclaimer */}
          <div className="text-left text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
            <span className="mb-2 block font-extrabold text-slate-600 uppercase tracking-widest">Live Pricing Disclaimer</span>
            <p>Product prices and availability are pulled in real time via live merchant search indexes and are accurate as of the timestamp shown. Any price and stock status displayed on the merchant's checkout page at the time of purchase will apply. PriceHunt is a search comparison utility and does not process transactions directly.</p>
          </div>

          {/* Copyright Row */}
          <div className="flex flex-col items-center justify-between gap-5 border-t border-slate-100/70 pt-6 lg:flex-row">
            <p className="text-center text-[12px] font-bold text-slate-700 tracking-wider uppercase sm:text-[13px] lg:text-left">
              &copy; {new Date().getFullYear()} PriceHunt. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider sm:text-[12px] lg:justify-end">
              <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Back to Top &uarr;
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
