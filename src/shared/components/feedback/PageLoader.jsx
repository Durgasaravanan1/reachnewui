// PageLoader.jsx
import React from 'react';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <span className="text-xs font-bold text-white">WR</span>
        </div>
        <span className="text-base font-bold text-slate-800">WYNReach</span>
      </div>
      {/* Inline spinner – replaces <Spinner /> */}
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-600 border-t-transparent" />
    </div>
  );
}