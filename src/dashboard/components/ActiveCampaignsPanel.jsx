// ActiveCampaignsPanel.jsx
import React from 'react';

// Simple Badge component (replaces @/shared/components/ui/Badge)
const Badge = ({ children, variant, dot }) => {
  const variantClasses = {
    active: 'bg-emerald-100 text-emerald-700',
    draft: 'bg-slate-100 text-slate-600',
    scheduled: 'bg-blue-100 text-blue-700',
    sent: 'bg-indigo-100 text-indigo-700',
    completed: 'bg-emerald-100 text-emerald-700',
    paused: 'bg-amber-100 text-amber-700',
    failed: 'bg-red-100 text-red-700',
  };
  const className = variantClasses[variant] || variantClasses.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

// Mock router – replace with useNavigate if you have react-router-dom
const useNavigateMock = () => {
  return (path) => {
    console.log(`Navigate to: ${path}`);
    // alert(`Navigate to: ${path}`); // uncomment for visual feedback
  };
};

// Format utility (though not used here, kept for reference)
const formatPercent = (value) => {
  if (value === undefined || value === null) return '—';
  return `${(value * 100).toFixed(1)}%`;
};

// Main component
export default function ActiveCampaignsPanel({ campaigns }) {
  const navigate = useNavigateMock();

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Campaign</th>
            <th className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
            <th className="pb-2 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">Open Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {campaigns.map((c) => (
            <tr
              key={c.id}
              className="cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => navigate(`/campaigns/${c.id}`)} // Replace with ROUTES.CAMPAIGN_DETAIL(c.id) if needed
            >
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">{c.channel === 'email' ? '✉️' : '💬'}</span>
                  <div>
                    <p className="font-semibold text-slate-800 leading-tight truncate max-w-[140px]">{c.campaignName}</p>
                    <p className="text-xs text-slate-400">{c.totalRecipients?.toLocaleString() || '0'} recipients</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4">
                <Badge variant={c.status} dot>
                  {c.status}
                </Badge>
              </td>
              <td className="py-3 text-right font-semibold text-emerald-600">
                — {/* Open rate would come from analytics; placeholder */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}