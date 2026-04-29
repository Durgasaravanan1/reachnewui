// EmptyState.jsx
import React from 'react';

// Simple class name merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function EmptyState({ title, description, icon, children, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {icon && <div className="mb-4 text-slate-300 text-5xl">{icon}</div>}
      {!icon && <div className="mb-4 text-4xl opacity-30">📭</div>}
      <h3 className="text-base font-semibold text-slate-700 mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-5">{description}</p>
      )}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}