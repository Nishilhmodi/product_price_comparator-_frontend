export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden border border-slate-100 bg-white rounded-2xl shadow-sm h-full text-left">
      {/* TOP SECTION: Image Area (150px height) */}
      <div className="h-[150px] w-full bg-slate-200/50 border-b border-slate-100 animate-pulse"></div>

      {/* Clean vertical list comparison skeleton display */}
      <div className="flex flex-col gap-1 p-2 bg-slate-50/30 border-b border-slate-100">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-100 bg-white h-[26px] sm:h-[34px]"
          >
            {/* 1. Favicon skeleton */}
            <div className="h-3.5 w-3.5 rounded bg-slate-200/60 animate-pulse shrink-0"></div>
            
            {/* 2. Platform Name skeleton (Hidden on mobile) */}
            <div className="h-2 w-12 bg-slate-200/60 rounded animate-pulse hidden sm:inline-block ml-1"></div>
            
            {/* 3. Price skeleton */}
            <div className="h-2.5 w-10 bg-slate-200/60 rounded animate-pulse shrink-0 col-start-3 justify-self-end"></div>
          </div>
        ))}
      </div>

      {/* BODY SECTION */}
      <div className="flex flex-col p-4 flex-grow justify-between gap-3 bg-white">
        
        {/* Title & Rating */}
        <div className="flex flex-col gap-1.5 text-left">
          {/* Product Name (2 lines skeleton) */}
          <div className="flex flex-col gap-1.5 h-[38px]">
            <div className="h-3 w-11/12 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-3 w-8/12 bg-slate-200 rounded animate-pulse"></div>
          </div>

          {/* Rating Row */}
          <div className="h-[16px] mt-0.5 w-1/3 bg-slate-200 rounded animate-pulse"></div>
        </div>

        {/* Card Footer: Metadata, Timestamp, and Original link */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-2">
          <div className="h-2.5 w-12 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-2.5 w-16 bg-slate-200 rounded animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}
