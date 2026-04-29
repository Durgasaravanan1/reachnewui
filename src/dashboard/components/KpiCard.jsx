// KpiCard.jsx
import React from 'react';

// Simple class name merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function KpiCard({ label, value, delta, deltaLabel, accent = '#4F46E5', icon }) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 relative overflow-hidden">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: accent }} />
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        {icon && <div className="text-slate-300">{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      {delta !== undefined && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className={cn('text-xs font-semibold', up ? 'text-emerald-600' : 'text-red-500')}>
            {up ? '↑' : '↓'} {Math.abs(delta)}%
          </span>
          {deltaLabel && <span className="text-xs text-slate-400">{deltaLabel}</span>}
        </div>
      )}
    </div>
  );
}