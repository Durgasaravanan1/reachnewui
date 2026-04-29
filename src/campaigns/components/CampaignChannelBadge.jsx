// CampaignChannelBadge.jsx
import React from 'react';

const CampaignChannelBadge = ({ channel }) => {
  // Define styles for each channel variant
  const variants = {
    email: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      icon: '✉️',
      label: 'Email',
    },
    whatsapp: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      icon: '💬',
      label: 'WhatsApp',
    },
  };

  const { bg, text, icon, label } = variants[channel] || variants.email;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
    >
      <span className="text-sm">{icon}</span>
      {label}
    </span>
  );
};

export default CampaignChannelBadge;