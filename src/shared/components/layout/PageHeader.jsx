// PageHeader.jsx
import React from 'react';

// Simple class name merger (replaces @/shared/utils/cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function PageHeader({ title, description, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-6', className)}>
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight truncate">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500 leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
}