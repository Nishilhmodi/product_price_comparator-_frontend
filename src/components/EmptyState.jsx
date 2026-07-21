import React from 'react';

export function EmptyState({ query, onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 bg-white border-[0.5px] border-[#e5e5e5] rounded-[10px] my-6">
      {/* Large Search Icon */}
      <div className="text-[#9ca3af] mb-4">
        <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[#1f2937] mb-2">
        No results found for "{query || ''}"
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-[#6b7280] max-w-sm mb-6 leading-relaxed">
        Try searching with different keywords or remove active filters to find what you're looking for.
      </p>

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="rounded-[8px] bg-[#0770e3] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#065ebc] transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}
