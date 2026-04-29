// CampaignMetricCards.jsx
import React from 'react';

// Simple formatting utilities
const formatNumber = (num) => {
  if (num === undefined || num === null) return '—';
  return num.toLocaleString();
};

const formatPercent = (value) => {
  if (value === undefined || value === null) return '—';
  return `${(value * 100).toFixed(1)}%`;
};

// Simple className merger (replaces cn)
const cn = (...classes) => classes.filter(Boolean).join(' ');

const CampaignMetricCards = ({ analytics }) => {
  const metrics = [
    { label: 'Sent', value: formatNumber(analytics.sent), accent: 'text-slate-700' },
    { label: 'Delivered', value: formatNumber(analytics.delivered), sub: formatPercent(analytics.deliveryRate), accent: 'text-sky-600' },
    { label: 'Opens', value: formatNumber(analytics.uniqueOpens), sub: formatPercent(analytics.openRate), accent: 'text-emerald-600' },
    { label: 'Clicks', value: formatNumber(analytics.uniqueClicks), sub: `${formatPercent(analytics.ctr)} CTR`, accent: 'text-primary-600' },
    { label: 'Unsubscribes', value: formatNumber(analytics.unsubscribes), accent: 'text-slate-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">{m.label}</p>
          <p className={cn('text-2xl font-bold tracking-tight', m.accent)}>{m.value}</p>
          {m.sub && <p className="text-xs text-slate-400 mt-1">{m.sub}</p>}
        </div>
      ))}
    </div>
  );
};

export default CampaignMetricCards;