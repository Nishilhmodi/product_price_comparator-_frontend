import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100/80 bg-white py-16 px-6 md:px-12 text-left text-slate-500 relative overflow-hidden">
      {/* Background Gradient Decorative Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-gradient-to-tr from-indigo-500 to-purple-500 z-0"></div>

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col gap-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Tagline - spans 5 columns */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90 self-start">
              <svg className="h-5.5 w-5.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex items-center text-xl font-extrabold tracking-tight">
                <span className="text-slate-900">Price</span>
                <span className="text-indigo-600">Hunt</span>
              </div>
            </Link>
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-sm mt-1">
              India's smartest live price comparison engine. We parse and group real-time offers across top e-commerce platforms to help you find the absolute best deals.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
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
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-[15px] font-semibold text-slate-500">
              <Link to="/" className="hover:text-indigo-600 transition-colors">Home Page</Link>
              <Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">How it works</Link>
              <a href="#trending" className="hover:text-indigo-600 transition-colors">Trending Deals</a>
              <a href="#categories" className="hover:text-indigo-600 transition-colors">Supported Categories</a>
            </div>
          </div>

          {/* Supported Stores - spans 4 columns */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Supported Merchants
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Amazon', domain: 'amazon.in' },
                { name: 'Flipkart', domain: 'flipkart.com' },
                { name: 'Myntra', domain: 'myntra.com' },
                { name: 'Ajio', domain: 'ajio.com' }
              ].map((store) => (
                <div 
                  key={store.name}
                  className="flex items-center gap-2 border border-slate-50 bg-slate-50/30 px-3 py-2 rounded-xl text-sm font-bold text-slate-600"
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
        <div className="border-t border-slate-100/80 pt-10 flex flex-col gap-6">
          {/* Price Variation Disclaimer */}
          <div className="text-sm md:text-base leading-relaxed text-slate-400 font-medium">
            <span className="font-extrabold text-slate-600 uppercase tracking-widest">Live Pricing Disclaimer: </span>
            Product prices and availability are pulled in real time via live merchant search indexes and are accurate as of the timestamp shown. Any price and stock status displayed on the merchant's checkout page at the time of purchase will apply. PriceHunt is a search comparison utility and does not process transactions directly.
          </div>

          {/* Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[13px] font-bold text-slate-700 tracking-wider uppercase">
              &copy; {new Date().getFullYear()} PriceHunt. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
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
