// ContactEngagementBar.jsx
import React from 'react';

// Simple class name merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

function getColor(score) {
  if (score >= 70) return { bar: 'bg-emerald-500', text: 'text-emerald-600' };
  if (score >= 40) return { bar: 'bg-indigo-500', text: 'text-indigo-600' };
  return { bar: 'bg-amber-400', text: 'text-amber-600' };
}

export default function ContactEngagementBar({ score }) {
  const { bar, text } = getColor(score);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={cn('h-full rounded-full', bar)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn('text-xs font-bold', text)}>{score}</span>
    </div>
  );
}