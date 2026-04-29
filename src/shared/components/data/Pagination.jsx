// Pagination.jsx
import React from 'react';

// Simple class name merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Custom Button component (replaces @/shared/components/ui/Button)
const Button = ({ children, variant, size, leftIcon, rightIcon, onClick, disabled }) => {
  const base = "inline-flex items-center gap-1 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
  };
  const sizes = {
    sm: "px-2 py-1 text-xs",
  };
  const className = cn(base, variants[variant] || variants.ghost, sizes[size] || sizes.sm);
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
};

// ChevronLeft icon (SVG)
const ChevronLeftIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

// ChevronRight icon (SVG)
const ChevronRightIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function Pagination({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  className,
}) {
  if (totalPages <= 1) return null;

  const start = totalItems && limit ? (page - 1) * limit + 1 : null;
  const end = totalItems && limit ? Math.min(page * limit, totalItems) : null;

  // Generate page numbers to display (max 5)
  const getPageNumbers = () => {
    const maxVisible = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100', className)}>
      {totalItems ? (
        <p className="text-xs text-slate-500 order-1 sm:order-none">
          {start}–{end} of {totalItems.toLocaleString()}
        </p>
      ) : (
        <p className="text-xs text-slate-500 order-1 sm:order-none">Page {page} of {totalPages}</p>
      )}
      <div className="flex items-center gap-1 order-2 sm:order-none">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          leftIcon={<ChevronLeftIcon />}
        >
          Prev
        </Button>
        {pageNumbers.map((p) => (
          <Button
            key={p}
            variant={p === page ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(p)}
            className={cn('min-w-[32px]', p === page && 'pointer-events-none')}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          rightIcon={<ChevronRightIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}