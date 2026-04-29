// CampaignDetailPage.jsx
import { useState, useEffect } from 'react';

// ===================== Mock Data & Hook =====================
const generateMockCampaign = (id) => ({
  id: id || 'camp_123',
  campaignName: 'Summer Newsletter 2026',
  channel: 'email',
  status: 'sent',
  audienceListIds: ['Newsletter Subscribers', 'Premium Customers'],
  senderEmail: 'marketing@example.com',
  sentAt: '2026-04-15T14:30:00Z',
  scheduledAt: null,
});

const generateMockAnalytics = () => ({
  sent: 12500,
  delivered: 12000,
  deliveryRate: 0.96,
  uniqueOpens: 5400,
  openRate: 0.45,
  uniqueClicks: 1420,
  ctr: 0.118,
  unsubscribes: 42,
  bounceRate: 0.032,
});

const generateMockLinks = () => [
  { linkLabel: 'Summer Sale', linkUrl: 'https://example.com/sale', totalClicks: 890, ctr: 7.12 },
  { linkLabel: 'New Collection', linkUrl: 'https://example.com/new', totalClicks: 430, ctr: 3.44 },
  { linkLabel: 'Unsubscribe', linkUrl: 'https://example.com/unsub', totalClicks: 28, ctr: 0.22 },
];

const generateMockRecipients = () => [
  { recipientId: '1', contactName: 'John Doe', lastEvent: 'clicked' },
  { recipientId: '2', contactName: 'Jane Smith', lastEvent: 'opened' },
  { recipientId: '3', contactName: 'Bob Johnson', lastEvent: 'bounced' },
  { recipientId: '4', contactName: 'Alice Lee', lastEvent: 'delivered' },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useCampaignDetailData = () => {
  const [state, setState] = useState({
    campaign: null,
    analytics: null,
    links: [],
    recipients: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      await delay(800);
      setState({
        campaign: generateMockCampaign(),
        analytics: generateMockAnalytics(),
        links: generateMockLinks(),
        recipients: generateMockRecipients(),
        isLoading: false,
      });
    };
    fetchData();
  }, []);

  return state;
};

// ===================== Formatting Utilities =====================
const formatDateTime = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleString();
};

const formatNumber = (num) => {
  if (num === undefined || num === null) return '—';
  return num.toLocaleString();
};

const formatPercent = (value) => {
  if (value === undefined || value === null) return '—';
  return `${(value * 100).toFixed(1)}%`;
};

// ===================== UI Components (Tailwind only) =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Skeleton = ({ className }) => (
  <div className={`bg-slate-100 animate-pulse rounded ${className}`} />
);

const ArrowLeftIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const CopyIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Button = ({ children, variant, leftIcon, onClick }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants = {
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  };
  return (
    <button onClick={onClick} className={cn(base, variants[variant] || variants.secondary)}>
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

const Alert = ({ children, variant, title, className }) => {
  const variantClass = variant === 'warning'
    ? "bg-amber-50 border-amber-200 text-amber-800"
    : "bg-blue-50 border-blue-200 text-blue-800";
  return (
    <div className={cn(`rounded-xl border p-4 ${variantClass}`, className)}>
      {title && <p className="font-semibold text-sm mb-1">{title}</p>}
      <p className="text-sm">{children}</p>
    </div>
  );
};

const CampaignChannelBadge = ({ channel }) => {
  const variants = {
    email: { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '✉️', label: 'Email' },
    whatsapp: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '💬', label: 'WhatsApp' },
  };
  const { bg, text, icon, label } = variants[channel] || variants.email;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
      <span className="text-sm">{icon}</span> {label}
    </span>
  );
};

const CampaignStatusBadge = ({ status }) => {
  const LABELS = {
    draft: 'Draft', pending_approval: 'Pending', scheduled: 'Scheduled',
    sending: 'Sending', sent: 'Sent', completed: 'Completed',
    paused: 'Paused', failed: 'Failed', cancelled: 'Cancelled',
  };
  const STYLES = {
    sent: 'bg-emerald-100 text-emerald-700',
    scheduled: 'bg-blue-100 text-blue-700',
    draft: 'bg-slate-100 text-slate-600',
    failed: 'bg-red-100 text-red-700',
  };
  const style = STYLES[status] || STYLES.draft;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}>
      {LABELS[status] || status}
    </span>
  );
};

const CampaignMetricCards = ({ analytics }) => {
  const metrics = [
    { label: 'Sent', value: formatNumber(analytics?.sent), accent: 'text-slate-700' },
    { label: 'Delivered', value: formatNumber(analytics?.delivered), sub: formatPercent(analytics?.deliveryRate), accent: 'text-sky-600' },
    { label: 'Opens', value: formatNumber(analytics?.uniqueOpens), sub: formatPercent(analytics?.openRate), accent: 'text-emerald-600' },
    { label: 'Clicks', value: formatNumber(analytics?.uniqueClicks), sub: `${formatPercent(analytics?.ctr)} CTR`, accent: 'text-indigo-600' },
    { label: 'Unsubscribes', value: formatNumber(analytics?.unsubscribes), accent: 'text-slate-400' },
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

const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    {action && <div className="flex flex-wrap gap-2 items-center">{action}</div>}
  </div>
);

// ===================== Main Page Component =====================
const ROUTES = { CAMPAIGNS: '/campaigns' }; // mock

export default function CampaignDetailPage() {
  const { campaign, analytics, links, recipients, isLoading } = useCampaignDetailData();

  // Mock navigation (replace with real router if needed)
  const navigateToCampaigns = () => {
    console.log('Navigate to campaigns list');
    alert('Navigate to: ' + ROUTES.CAMPAIGNS);
  };

  const handleDuplicate = () => {
    alert('Duplicate campaign (mock action)');
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-5 gap-3 mt-6">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  return (
    <div className="p-4 md:p-6">
      {/* Back button */}
      <button
        onClick={navigateToCampaigns}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
      >
        <ArrowLeftIcon /> All Campaigns
      </button>

      <PageHeader
        title={campaign.campaignName}
        description={`Sent to "${campaign.audienceListIds.join(', ')}" · From: ${campaign.senderEmail}`}
        action={
          <>
            <div className="flex items-center gap-2">
              <CampaignChannelBadge channel={campaign.channel} />
              <CampaignStatusBadge status={campaign.status} />
              {campaign.sentAt && (
                <span className="text-xs text-slate-400">{formatDateTime(campaign.sentAt)}</span>
              )}
            </div>
            <Button variant="secondary" leftIcon={<CopyIcon />} onClick={handleDuplicate}>
              Duplicate
            </Button>
          </>
        }
      />

      {/* Bounce alert (example) */}
      {campaign.status === 'sent' && (
        <Alert variant="warning" title="Elevated bounce rate detected" className="mb-6">
          Hard bounce rate is above your 5% threshold. Affected contacts have been automatically suppressed.
        </Alert>
      )}

      {/* Metric cards */}
      {analytics && (
        <div className="mb-6">
          <CampaignMetricCards analytics={analytics} />
        </div>
      )}

      {/* Two‑column layout: top links + recipient activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Link clicks table */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Top Link Clicks</h3>
          {links.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">No link data yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase">Link</th>
                    <th className="pb-2 text-right text-xs font-semibold text-slate-400 uppercase">Clicks</th>
                    <th className="pb-2 text-right text-xs font-semibold text-slate-400 uppercase">CTR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {links.map((l, i) => (
                    <tr key={i}>
                      <td className="py-2.5">
                        <p className="font-medium text-slate-800 truncate max-w-[180px]">{l.linkLabel || l.linkUrl}</p>
                        <p className="text-xs text-slate-400 truncate">{l.linkUrl}</p>
                      </td>
                      <td className="py-2.5 text-right font-semibold">{l.totalClicks}</td>
                      <td className="py-2.5 text-right text-slate-500">{l.ctr.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recipient activity table */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Recipient Activity</h3>
          {recipients.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">No activity yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase">Contact</th>
                    <th className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase">Event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recipients.map((r) => (
                    <tr key={r.recipientId}>
                      <td className="py-2.5 font-medium text-slate-800">{r.contactName}</td>
                      <td className="py-2.5">
                        {r.lastEvent && (
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                            r.lastEvent === 'clicked' && 'bg-emerald-50 text-emerald-700',
                            r.lastEvent === 'opened' && 'bg-sky-50 text-sky-700',
                            r.lastEvent === 'bounced' && 'bg-red-50 text-red-700',
                            r.lastEvent === 'delivered' && 'bg-slate-100 text-slate-600'
                          )}>
                            {r.lastEvent}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}