import React from 'react';

export function FilterBar({ filters, onChange, onClear }) {
  const sortOptions = ["Price: Low to High", "Price: High to Low", "Best Rating"];
  const platformOptions = ["All Platforms", "Amazon", "Flipkart", "Myntra", "Ajio"];
  const budgetOptions = ["Any Budget", "Under ₹1,000", "₹1,000-₹5,000", "₹5,000-₹15,000", "Above ₹15,000"];
  const ratingOptions = ["Any Rating", "4★ & above", "3★ & above"];

  // Helper to check if a filter is active
  const hasActiveFilters = 
    filters.platform !== 'All Platforms' || 
    filters.budget !== 'Any Budget' || 
    filters.rating !== 'Any Rating';

  // Get list of active chips
  const activeChips = [];
  if (filters.platform !== 'All Platforms') {
    activeChips.push({ key: 'platform', label: `Platform: ${filters.platform}`, default: 'All Platforms' });
  }
  if (filters.budget !== 'Any Budget') {
    activeChips.push({ key: 'budget', label: `Budget: ${filters.budget}`, default: 'Any Budget' });
  }
  if (filters.rating !== 'Any Rating') {
    activeChips.push({ key: 'rating', label: `Rating: ${filters.rating}`, default: 'Any Rating' });
  }

  return (
    <div className="w-full bg-white border-[0.5px] border-[#e5e5e5] rounded-[10px] p-4 flex flex-col gap-3">
      {/* Dropdowns row */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        {/* Sort Dropdown */}
        <div className="flex flex-col gap-1 text-left flex-grow sm:flex-grow-0">
          <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Sort by</label>
          <select
            value={filters.sort}
            onChange={(e) => onChange('sort', e.target.value)}
            className="w-full bg-white border-[0.5px] border-[#e5e5e5] rounded-[8px] px-3 py-2 text-sm text-[#1f2937] outline-none focus:border-[#0770e3]"
          >
            {sortOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Platform Dropdown */}
        <div className="flex flex-col gap-1 text-left flex-grow sm:flex-grow-0">
          <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Platform</label>
          <select
            value={filters.platform}
            onChange={(e) => onChange('platform', e.target.value)}
            className="w-full bg-white border-[0.5px] border-[#e5e5e5] rounded-[8px] px-3 py-2 text-sm text-[#1f2937] outline-none focus:border-[#0770e3]"
          >
            {platformOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Budget Dropdown */}
        <div className="flex flex-col gap-1 text-left flex-grow sm:flex-grow-0">
          <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Budget</label>
          <select
            value={filters.budget}
            onChange={(e) => onChange('budget', e.target.value)}
            className="w-full bg-white border-[0.5px] border-[#e5e5e5] rounded-[8px] px-3 py-2 text-sm text-[#1f2937] outline-none focus:border-[#0770e3]"
          >
            {budgetOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Rating Dropdown */}
        <div className="flex flex-col gap-1 text-left flex-grow sm:flex-grow-0">
          <label className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">Rating</label>
          <select
            value={filters.rating}
            onChange={(e) => onChange('rating', e.target.value)}
            className="w-full bg-white border-[0.5px] border-[#e5e5e5] rounded-[8px] px-3 py-2 text-sm text-[#1f2937] outline-none focus:border-[#0770e3]"
          >
            {ratingOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t-[0.5px] border-[#e5e5e5]">
          <span className="text-xs font-semibold text-[#6b7280]">Active Filters:</span>
          {activeChips.map((chip, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-full bg-[#f3f4f6] border-[0.5px] border-[#e5e5e5] pl-3 pr-2 py-1 text-xs font-medium text-[#4b5563]"
            >
              <span>{chip.label}</span>
              <button
                onClick={() => onChange(chip.key, chip.default)}
                className="rounded-full p-0.5 hover:bg-[#e5e7eb] hover:text-[#1f2937] transition-colors"
                title="Remove filter"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          <button
            onClick={onClear}
            className="text-xs font-medium text-[#e24b4a] hover:text-[#b91c1c] hover:underline transition-colors ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
