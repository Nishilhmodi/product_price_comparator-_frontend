import { useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';
import { useDebounce } from '../hooks/useDebounce';

// High-fidelity local suggestions for mock mode
const MOCK_SUGGESTIONS = [
  { text: 'timex watch', info: '2.4k+ products' },
  { text: 'timex watch men', info: '1.2k+ products' },
  { text: 'timex classics', info: '500+ products' },
  { text: 'timex chronograph', info: 'Trending' },
  { text: 'timex weekender', info: 'Trending' },
  { text: 'timex automatic', info: '120+ products' },
  { text: 'iphone 15', info: '10k+ products' },
  { text: 'iphone 15 pro', info: 'Trending' },
  { text: 'nike shoes', info: '8k+ products' },
  { text: 'nike running shoes', info: 'Trending' },
  { text: 'sony headphones', info: 'Trending' },
  { text: 'face serum', info: '1.5k+ products' }
];

export function SearchBar({ compact, initialValue = '', onSearch }) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const debouncedInput = useDebounce(inputValue, 200);

  // Synchronize with initialValue changes (e.g., when routing pre-fills query)
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = debouncedInput.trim().toLowerCase();
      if (!trimmed) {
        setSuggestions([
          { text: 'timex watch', info: 'Trending' },
          { text: 'iphone 15 pro', info: 'Popular' },
          { text: 'nike running shoes', info: 'Trending' },
          { text: 'sony headphones', info: 'Trending' },
          { text: 'face serum', info: 'Popular' }
        ]);
        return;
      }

      try {
        const data = await api.suggest(trimmed);
        // Backend returns SuggestResponse: { query: string, suggestions: string[] }
        const suggestionsList = data && data.suggestions ? data.suggestions : data;
        if (Array.isArray(suggestionsList)) {
          const formatted = suggestionsList.map(item => 
            typeof item === 'string' 
              ? { text: item, info: item.toLowerCase().includes('timex') || item.toLowerCase().includes('iphone') ? 'Trending' : 'Products' } 
              : { text: item.text || item.title || item, info: item.info || 'Products' }
          );
          setSuggestions(formatted.slice(0, 5));
        } else {
          fallbackLocalSuggestions(trimmed);
        }
      } catch (err) {
        console.warn("Suggestions API failed, falling back to local matches.", err);
        fallbackLocalSuggestions(trimmed);
      }
    };
 
     fetchSuggestions();
   }, [debouncedInput]);

  const fallbackLocalSuggestions = (query) => {
    // 1. Filter our high-fidelity keyword database
    const matches = MOCK_SUGGESTIONS.filter(item => 
      item.text.toLowerCase().includes(query)
    );

    // 2. Pad with dynamic query suggestions if matches are few, so autocomplete always works
    if (matches.length < 5) {
      const padList = [
        { text: query, info: 'Search' },
        { text: `${query} price`, info: 'Compare' },
        { text: `${query} on amazon`, info: 'Trending' },
        { text: `${query} on flipkart`, info: 'Trending' },
        { text: `${query} online`, info: 'Compare' }
      ];
      
      const combined = [...matches];
      padList.forEach(item => {
        if (combined.length < 5 && !combined.some(m => m.text.toLowerCase() === item.text.toLowerCase())) {
          combined.push(item);
        }
      });
      setSuggestions(combined);
    } else {
      setSuggestions(matches.slice(0, 5));
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (query) {
      onSearch(query);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setInputValue(text);
    onSearch(text);
    setIsOpen(false);
  };

  // Highlight query match in indigo
  const renderHighlightedText = (text, query) => {
    if (!query) return <span>{text}</span>;
    
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return <span>{text}</span>;

    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return (
      <span>
        {before}
        <span className="text-indigo-600 font-semibold">{match}</span>
        {after}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full text-left">
      <form onSubmit={handleSubmit} className="flex w-full items-center bg-[#ffffff] border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-50/50 p-1 gap-1 transition-all duration-300 rounded-xl shadow-sm">
        {/* Left Magnifier Icon */}
        <div className="pl-3 pr-1 text-slate-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          className="w-full bg-transparent py-2.5 px-1 text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400"
          placeholder="Search for products, brands, or categories..."
          value={inputValue}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
        />

        {/* Search Button */}
        <button
          type="submit"
          className={`shrink-0 bg-indigo-600 hover:bg-indigo-700 rounded-lg px-6 py-2.5 text-xs font-bold tracking-widest uppercase text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
            compact ? 'px-4 py-2.5' : ''
          }`}
        >
          {compact ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      {/* Autocomplete Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1.5 border border-slate-100 bg-[#ffffff] p-1.5 rounded-xl shadow-lg transition-all duration-300 animate-scale-in">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(item.text)}
              className="flex items-center justify-between px-3.5 py-2.5 hover:bg-indigo-50/40 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600 group-hover:text-indigo-650 transition-colors">
                {/* Search Icon */}
                <svg className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {renderHighlightedText(item.text, inputValue)}
              </div>
              <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md transition-all duration-250 ${
                item.info === 'Trending'
                  ? 'bg-rose-50 text-rose-500 border border-rose-100 group-hover:bg-rose-500 group-hover:text-white group-hover:border-transparent shadow-sm'
                  : 'bg-slate-50 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white shadow-sm'
              }`}>
                {item.info}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
