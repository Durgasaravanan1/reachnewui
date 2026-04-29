// SearchInput.jsx
import React, { useState, useEffect } from 'react';

// Simple class name merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

// Search icon (SVG)
const SearchIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// X icon (clear)
const XIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function SearchInput({
  placeholder = 'Search…',
  onSearch,
  defaultValue = '',
  className,
  delay = 300,
}) {
  const [value, setValue] = useState(defaultValue);
  const debounced = useDebounce(value, delay);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className={cn('relative flex items-center', className)}>
      <div className="absolute left-3 text-slate-400 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-9 w-full rounded-md border border-slate-200 bg-white',
          'pl-8 pr-8 text-sm text-slate-900 placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
          'transition-colors'
        )}
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}