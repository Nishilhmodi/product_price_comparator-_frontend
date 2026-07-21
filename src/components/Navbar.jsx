import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export function Navbar({ showSearch, searchQuery }) {
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0 transition-opacity hover:opacity-90">
          <svg className="h-5.5 w-5.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="flex items-center text-lg font-extrabold tracking-tight">
            <span className="text-slate-900">Price</span>
            <span className="text-indigo-600">Hunt</span>
          </div>
        </Link>

        {/* Center Search Bar (Only shown on results/subpages) */}
        {showSearch ? (
          <div className="hidden max-w-md flex-grow md:block">
            <SearchBar compact initialValue={searchQuery} onSearch={handleSearchSubmit} />
          </div>
        ) : (
          <div className="flex-grow"></div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-5 shrink-0">
          <Link to="/how-it-works" className="hidden text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors sm:inline-block">
            How it works
          </Link>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4.5 py-2 rounded-lg transition-colors cursor-pointer shadow-sm">
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Row (Under navbar on small viewports) */}
      {showSearch && (
        <div className="mt-2 block w-full md:hidden">
          <SearchBar compact initialValue={searchQuery} onSearch={handleSearchSubmit} />
        </div>
      )}
    </header>
  );
}
