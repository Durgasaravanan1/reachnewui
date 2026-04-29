// CampaignStatusBadge.jsx
import React from 'react';

const LABELS = {
  draft: 'Draft',
  pending_approval: 'Pending Approval',
  scheduled: 'Scheduled',
  sending: 'Sending',
  sent: 'Sent',
  completed: 'Completed',
  paused: 'Paused',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

// Status to tailwind color mapping
const STATUS_STYLES = {
  draft: 'bg-slate-100 text-slate-600',
  pending_approval: 'bg-amber-100 text-amber-700',
  scheduled: 'bg-blue-100 text-blue-700',
  sending: 'bg-indigo-100 text-indigo-700',
  sent: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-red-100 text-red-700',
};

// Dot color variants (tailwind ring colors)
const DOT_STYLES = {
  draft: 'bg-slate-400',
  pending_approval: 'bg-amber-500',
  scheduled: 'bg-blue-500',
  sending: 'bg-indigo-500',
  sent: 'bg-emerald-500',
  completed: 'bg-emerald-500',
  paused: 'bg-yellow-500',
  failed: 'bg-red-500',
  cancelled: 'bg-red-500',
};

const CampaignStatusBadge = ({ status }) => {
  const label = LABELS[status] || status;
  const bgTextClass = STATUS_STYLES[status] || STATUS_STYLES.draft;
  const dotClass = DOT_STYLES[status] || DOT_STYLES.draft;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bgTextClass}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
};

export default CampaignStatusBadge;