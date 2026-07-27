import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function HowItWorksPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const steps = [
    {
      num: "01",
      title: "Enter Your Search",
      description: "Type any product, brand, or category (like \"sony headphones\" or \"iphone 15 pro\") into the search bar. Our search engine processes the text instantly.",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Live Retail Aggregation",
      description: "Our system queries the live search indexes across India's top retail platforms—Amazon, Flipkart, Myntra, and Ajio—pulling live prices and stock availability.",
      icon: (
        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      num: "03",
      title: "NLP Product Grouping",
      description: "Using advanced bag-of-words grouping, we merge identical item listings into a single product card. Different product models stay separate so you don't see wrong results.",
      icon: (
        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Compare and Save",
      description: "Compare available store deals directly on the product card, filter by platform, budget, or rating, and click to go straight to the official product page to check out!",
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: "Are the prices updated in real time?",
      answer: "Yes, PriceHunt queries the live search listings of all merchant platforms in real time when you search. You will always see the most fresh price available without delay."
    },
    {
      question: "Is there any charge to use PriceHunt?",
      answer: "PriceHunt is 100% free to use. We do not charge users any service fees. Our mission is simply to help you find the absolute lowest price across top Indian retailers."
    },
    {
      question: "Which platforms are currently supported?",
      answer: "We support live price comparison across Amazon.in, Flipkart, Myntra, and Ajio. We are constantly expanding our integrations to include more merchant stores."
    },
    {
      question: "How does the brand filtering work?",
      answer: "To keep results highly accurate, we run strict brand alias mapping. For example, if you search for an iPhone, our scraper screens out non-Apple accessories or third-party listings so you only see genuine iPhone devices."
    }
  ];

  return (
    <div 
      className="min-h-screen w-full bg-slate-50 flex flex-col transition-all duration-300 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 10% 90%, rgba(20, 184, 166, 0.08) 0%, transparent 45%),
          radial-gradient(circle at 90% 95%, rgba(139, 92, 246, 0.08) 0%, transparent 45%),
          linear-gradient(to bottom, #f8fafc, #eef2ff)
        `,
        backgroundAttachment: 'fixed, fixed, fixed, fixed'
      }}
    >
      {/* Navbar */}
      <Navbar showSearch={false} />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 md:py-12 text-left">
        {/* Back to Home Button */}
        <div className="mb-6 animate-fade-in-up">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-indigo-650 transition-colors group cursor-pointer"
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

        {/* Page Header Hero */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full shadow-sm">
            How it works
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mt-4 leading-tight">
            Smart Comparison.<br />
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
              Zero Effort.
            </span>
          </h1>
          <p className="text-slate-500 mt-4 font-semibold text-sm md:text-base leading-relaxed">
            PriceHunt aggregates live retail listings and parses store offers to help you find the absolute best deal in seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white/80 backdrop-blur-md border border-slate-100/60 p-6 rounded-2.5xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-indigo-500/20 transition-all duration-300 flex gap-4 animate-scale-in"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-base">{step.title}</h3>
                  <span className="text-sm font-black text-indigo-200 tracking-wider uppercase">{step.num}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur-md border border-slate-150/40 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] hover:border-indigo-500/25 transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left p-5 md:p-6 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-50/50 transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <svg 
                      className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 md:pb-6 px-5 md:px-6' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-4 mt-1">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
