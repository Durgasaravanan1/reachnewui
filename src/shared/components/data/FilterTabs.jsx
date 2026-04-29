// FilterTabs.jsx
import React from 'react';

// Simple class name merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function FilterTabs({ tabs, active, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-0.5 rounded-lg bg-slate-100 p-1 border border-slate-200', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
            active === tab.value
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              'inline-flex items-center justify-center rounded-full h-4 min-w-[16px] px-1 text-[10px] font-bold',
              active === tab.value ? 'bg-slate-100 text-slate-600' : 'bg-slate-200 text-slate-500'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}