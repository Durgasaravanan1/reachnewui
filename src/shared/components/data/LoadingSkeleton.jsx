// LoadingSkeleton.jsx
import React from 'react';

// Simple class name merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Single skeleton element
export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded bg-slate-200', className)} />;
}

// Table skeleton: rows x columns
export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className={cn('h-4', j === 0 ? 'w-1/4' : 'flex-1')} />
          ))}
        </div>
      ))}
    </div>
  );
}

// Card skeleton grid
export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-slate-200 p-5 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}