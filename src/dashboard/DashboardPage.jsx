// // DashboardPage.jsx
// import React, { useState, useEffect } from 'react';

// // ===================== Mock Data & Hooks =====================
// const MOCK_CAMPAIGNS = [
//   { id: '1', campaignName: 'April Newsletter', channel: 'email', status: 'active', totalRecipients: 8230 },
//   { id: '2', campaignName: 'WhatsApp Flash Sale', channel: 'whatsapp', status: 'active', totalRecipients: 3400 },
//   { id: '3', campaignName: 'Re-engagement Series', channel: 'email', status: 'scheduled', totalRecipients: 5200 },
//   { id: '4', campaignName: 'Product Launch', channel: 'email', status: 'draft', totalRecipients: 0 },
//   { id: '5', campaignName: 'Customer Feedback', channel: 'whatsapp', status: 'sent', totalRecipients: 2100 },
// ];

// const MOCK_ANALYTICS = {
//   totalSent: 12500,
//   avgOpenRate: 0.428,
//   activeCampaigns: 3,
//   newContacts: 342,
// };

// const useDashboard = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [analytics, setAnalytics] = useState(null);
//   const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
//   const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setCampaigns(MOCK_CAMPAIGNS);
//       setIsLoadingCampaigns(false);
//     }, 600);
//     setTimeout(() => {
//       setAnalytics(MOCK_ANALYTICS);
//       setIsLoadingAnalytics(false);
//     }, 500);
//   }, []);

//   return { campaigns, analytics, isLoadingCampaigns, isLoadingAnalytics };
// };

// const useCurrentUser = () => {
//   const [user] = useState({ fullName: 'Subramanian A.' });
//   return user;
// };

// // Mock navigation (replace with real router when needed)
// const useNavigate = () => {
//   return (path) => {
//     console.log(`Navigate to: ${path}`);
//     // alert(`Navigate to: ${path}`); // uncomment for visual feedback
//   };
// };

// // Mock routes
// const ROUTES = {
//   ANALYTICS: '/analytics',
//   CAMPAIGNS: '/campaigns',
//   CAMPAIGN_NEW: '/campaigns/new',
// };

// // ===================== Utility Functions =====================
// const formatNumber = (num) => {
//   if (num === undefined || num === null) return '—';
//   return num.toLocaleString();
// };

// const formatPercent = (value) => {
//   if (value === undefined || value === null) return '—';
//   return `${(value * 100).toFixed(1)}%`;
// };

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ===================== Icons (SVG) =====================
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const BarChartIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//   };
//   return (
//     <button onClick={onClick} className={cn(base, variants[variant] || variants.secondary)}>
//       {leftIcon && leftIcon}
//       {children}
//     </button>
//   );
// };

// const PageHeader = ({ title, description, action }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//     <div>
//       <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
//       {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
//     </div>
//     {action && <div className="flex flex-wrap gap-2">{action}</div>}
//   </div>
// );

// const Alert = ({ children, variant, title, className, onDismiss }) => {
//   const variantClass = variant === 'warning'
//     ? "bg-amber-50 border-amber-200 text-amber-800"
//     : "bg-blue-50 border-blue-200 text-blue-800";
//   return (
//     <div className={cn(`rounded-xl border p-4 ${variantClass}`, className)}>
//       {title && <p className="font-semibold text-sm mb-1">{title}</p>}
//       <p className="text-sm">{children}</p>
//       {onDismiss && (
//         <button onClick={onDismiss} className="absolute top-4 right-4 text-amber-500 hover:text-amber-700">✕</button>
//       )}
//     </div>
//   );
// };

// const KpiCard = ({ label, value, delta, deltaLabel, accent = '#4F46E5', icon }) => {
//   const up = (delta ?? 0) >= 0;
//   return (
//     <div className="bg-white rounded-xl border border-slate-200 p-5 relative overflow-hidden">
//       <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: accent }} />
//       <div className="flex items-start justify-between mb-3">
//         <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
//         {icon && <div className="text-slate-300">{icon}</div>}
//       </div>
//       <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
//       {delta !== undefined && (
//         <div className="flex items-center gap-1.5 mt-2">
//           <span className={cn('text-xs font-semibold', up ? 'text-emerald-600' : 'text-red-500')}>
//             {up ? '↑' : '↓'} {Math.abs(delta)}%
//           </span>
//           {deltaLabel && <span className="text-xs text-slate-400">{deltaLabel}</span>}
//         </div>
//       )}
//     </div>
//   );
// };

// const CardSkeleton = ({ count = 4 }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//     {Array(count).fill(0).map((_, i) => (
//       <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
//         <div className="h-3 bg-slate-200 rounded w-20 mb-3"></div>
//         <div className="h-7 bg-slate-200 rounded w-28 mb-2"></div>
//         <div className="h-3 bg-slate-200 rounded w-24"></div>
//       </div>
//     ))}
//   </div>
// );

// // Badge component used inside ActiveCampaignsPanel
// const Badge = ({ children, variant, dot }) => {
//   const variantClasses = {
//     active: 'bg-emerald-100 text-emerald-700',
//     draft: 'bg-slate-100 text-slate-600',
//     scheduled: 'bg-blue-100 text-blue-700',
//     sent: 'bg-indigo-100 text-indigo-700',
//   };
//   const className = variantClasses[variant] || variantClasses.draft;
//   return (
//     <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
//       {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
//       {children}
//     </span>
//   );
// };

// // ActiveCampaignsPanel component
// const ActiveCampaignsPanel = ({ campaigns }) => {
//   const navigate = useNavigate();
//   return (
//     <table className="w-full text-sm">
//       <thead>
//         <tr className="border-b border-slate-100">
//           <th className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Campaign</th>
//           <th className="pb-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
//           <th className="pb-2 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">Open Rate</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-slate-50">
//         {campaigns.map((c) => (
//           <tr
//             key={c.id}
//             className="cursor-pointer hover:bg-slate-50 transition-colors"
//             onClick={() => navigate(`/campaigns/${c.id}`)}
//           >
//             <td className="py-3 pr-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-base">{c.channel === 'email' ? '✉️' : '💬'}</span>
//                 <div>
//                   <p className="font-semibold text-slate-800 leading-tight truncate max-w-[140px]">{c.campaignName}</p>
//                   <p className="text-xs text-slate-400">{c.totalRecipients.toLocaleString()} recipients</p>
//                 </div>
//               </div>
//             </td>
//             <td className="py-3 pr-4">
//               <Badge variant={c.status} dot>{c.status}</Badge>
//             </td>
//             <td className="py-3 text-right font-semibold text-emerald-600">—</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// // ===================== Main Dashboard Page =====================
// export default function DashboardPage() {
//   const navigate = useNavigate();
//   const user = useCurrentUser();
//   const { campaigns, analytics, isLoadingCampaigns, isLoadingAnalytics } = useDashboard();

//   const greeting = () => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good morning';
//     if (h < 17) return 'Good afternoon';
//     return 'Good evening';
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <PageHeader
//         title={`${greeting()}, ${user?.fullName?.split(' ')[0] ?? 'there'} 👋`}
//         description="Here's what's happening with your campaigns today."
//         action={
//           <div className="flex flex-wrap gap-2">
//             <Button variant="secondary" leftIcon={<BarChartIcon />} onClick={() => navigate(ROUTES.ANALYTICS)}>
//               Reports
//             </Button>
//             <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => navigate(ROUTES.CAMPAIGN_NEW)}>
//               New Campaign
//             </Button>
//           </div>
//         }
//       />

//       {/* Bounce alert example */}
//       <Alert variant="warning" title="Campaign bounce rate alert" className="mb-6">
//         "April Newsletter" has a hard bounce rate above your 5% threshold.{' '}
//         <button className="font-semibold underline" onClick={() => navigate(ROUTES.CAMPAIGNS)}>
//           Review campaign →
//         </button>
//       </Alert>

//       {/* KPI Cards */}
//       {isLoadingAnalytics ? (
//         <CardSkeleton count={4} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//           <KpiCard
//             label="Total Sends (30d)"
//             value={analytics ? formatNumber(analytics.totalSent) : '—'}
//             delta={18.4}
//             deltaLabel="vs last month"
//             accent="#4F46E5"
//           />
//           <KpiCard
//             label="Avg Open Rate"
//             value={analytics ? formatPercent(analytics.avgOpenRate) : '—'}
//             delta={2.1}
//             deltaLabel="vs last month"
//             accent="#059669"
//           />
//           <KpiCard
//             label="Active Campaigns"
//             value={analytics ? analytics.activeCampaigns : '—'}
//             accent="#0284C7"
//           />
//           <KpiCard
//             label="New Contacts (30d)"
//             value={analytics ? formatNumber(analytics.newContacts) : '—'}
//             delta={12.3}
//             deltaLabel="vs last month"
//             accent="#7C3AED"
//           />
//         </div>
//       )}

//       {/* Two-column grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Active campaigns */}
//         <div className="bg-white rounded-xl border border-slate-200 p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-bold text-slate-900">Active Campaigns</h2>
//             <button
//               className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
//               onClick={() => navigate(ROUTES.CAMPAIGNS)}
//             >
//               View all →
//             </button>
//           </div>
//           {isLoadingCampaigns ? (
//             <div className="space-y-3">
//               {[1, 2, 3].map(i => <div key={i} className="h-10 rounded bg-slate-100 animate-pulse" />)}
//             </div>
//           ) : (
//             <ActiveCampaignsPanel campaigns={campaigns.slice(0, 5)} />
//           )}
//         </div>

//         {/* Recent activity */}
//         <div className="bg-white rounded-xl border border-slate-200 p-5">
//           <h2 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h2>
//           <div className="space-y-3">
//             {[
//               { icon: '✉️', bg: 'bg-indigo-50', text: <><b>April Newsletter</b> sent to 8,230 contacts</>, time: '2h ago' },
//               { icon: '✅', bg: 'bg-emerald-50', text: <><b>WhatsApp Flash Sale</b> completed — 68.3% read rate</>, time: '5h ago' },
//               { icon: '👥', bg: 'bg-sky-50', text: <>Imported <b>342 contacts</b> into "Active Customers"</>, time: '1d ago' },
//               { icon: '⏰', bg: 'bg-amber-50', text: <><b>Re-engagement Series</b> scheduled for May 1</>, time: '1d ago' },
//               { icon: '🗂️', bg: 'bg-indigo-50', text: <>New template <b>"Product Update May"</b> created</>, time: '2d ago' },
//             ].map((item, i) => (
//               <div key={i} className="flex items-start gap-3">
//                 <div className={`h-8 w-8 rounded-full ${item.bg} flex items-center justify-center text-sm shrink-0`}>
//                   {item.icon}
//                 </div>
//                 <p className="text-sm text-slate-600 flex-1 leading-snug pt-1">{item.text}</p>
//                 <span className="text-xs text-slate-400 shrink-0 pt-1">{item.time}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// DashboardPage.jsx – Fully working with correct JSX tags
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ===================== Mock Data & Hooks =====================
const MOCK_CAMPAIGNS = [
  { id: '1', campaignName: 'April Newsletter', channel: 'email', status: 'active', totalRecipients: 8230 },
  { id: '2', campaignName: 'WhatsApp Flash Sale', channel: 'whatsapp', status: 'active', totalRecipients: 3400 },
  { id: '3', campaignName: 'Re-engagement Series', channel: 'email', status: 'scheduled', totalRecipients: 5200 },
  { id: '4', campaignName: 'Product Launch', channel: 'email', status: 'draft', totalRecipients: 0 },
  { id: '5', campaignName: 'Customer Feedback', channel: 'whatsapp', status: 'sent', totalRecipients: 2100 },
];

const MOCK_ANALYTICS = {
  totalSent: 12500,
  avgOpenRate: 0.428,
  activeCampaigns: 3,
  newContacts: 342,
};

const useDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCampaigns(MOCK_CAMPAIGNS);
      setIsLoadingCampaigns(false);
    }, 600);
    setTimeout(() => {
      setAnalytics(MOCK_ANALYTICS);
      setIsLoadingAnalytics(false);
    }, 500);
  }, []);

  return { campaigns, analytics, isLoadingCampaigns, isLoadingAnalytics };
};

const useCurrentUser = () => {
  const [user] = useState({ fullName: 'Subramanian A.' });
  return user;
};

// ===================== Utility Functions =====================
const formatNumber = (num) => {
  if (num === undefined || num === null) return '—';
  return num.toLocaleString();
};

const formatPercent = (value) => {
  if (value === undefined || value === null) return '—';
  return `${(value * 100).toFixed(1)}%`;
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===================== Icons (SVG) =====================
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const BarChartIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// ===================== UI Components =====================
const Button = ({ children, variant, leftIcon, onClick }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
  };
  return (
    <button onClick={onClick} className={cn(base, variants[variant] || variants.secondary)}>
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    {action && <div className="flex flex-wrap gap-2">{action}</div>}
  </div>
);

const Alert = ({ children, variant, title, className, onDismiss }) => {
  const variantClass = variant === 'warning'
    ? "bg-amber-50 border-amber-200 text-amber-800"
    : "bg-blue-50 border-blue-200 text-blue-800";
  return (
    <div className={cn(`relative rounded-xl border p-4 ${variantClass}`, className)}>
      {title && <p className="font-semibold text-sm mb-1">{title}</p>}
      <p className="text-sm">{children}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="absolute top-4 right-4 text-amber-500 hover:text-amber-700">✕</button>
      )}
    </div>
  );
};

const KpiCard = ({ label, value, delta, deltaLabel, accent = '#4F46E5', icon }) => {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 relative overflow-hidden">
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
};

const CardSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
    {Array(count).fill(0).map((_, i) => (
      <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
        <div className="h-3 bg-slate-200 rounded w-20 mb-3"></div>
        <div className="h-7 bg-slate-200 rounded w-28 mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-24"></div>
      </div>
    ))}
  </div>
);

const Badge = ({ children, variant, dot }) => {
  const variantClasses = {
    active: 'bg-emerald-100 text-emerald-700',
    draft: 'bg-slate-100 text-slate-600',
    scheduled: 'bg-blue-100 text-blue-700',
    sent: 'bg-indigo-100 text-indigo-700',
  };
  const className = variantClasses[variant] || variantClasses.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

// ✅ CORRECTED ActiveCampaignsPanel – all tags properly closed
const ActiveCampaignsPanel = ({ campaigns }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
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
              onClick={() => navigate(`/campaigns/${c.id}`)}
            >
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">{c.channel === 'email' ? '✉️' : '💬'}</span>
                  <div>
                    <p className="font-semibold text-slate-800 leading-tight truncate max-w-[140px]">{c.campaignName}</p>
                    <p className="text-xs text-slate-400">{c.totalRecipients.toLocaleString()} recipients</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4">
                <Badge variant={c.status} dot>{c.status}</Badge>
              </td>
              <td className="py-3 text-right font-semibold text-emerald-600">—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ===================== Main Dashboard Page =====================
export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const { campaigns, analytics, isLoadingCampaigns, isLoadingAnalytics } = useDashboard();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title={`${greeting()}, ${user?.fullName?.split(' ')[0] ?? 'there'} 👋`}
        description="Here's what's happening with your campaigns today."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" leftIcon={<BarChartIcon />} onClick={() => navigate('/analytics')}>
              Reports
            </Button>
            <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => navigate('/campaigns/new')}>
              New Campaign
            </Button>
          </div>
        }
      />

      <Alert variant="warning" title="Campaign bounce rate alert" className="mb-6">
        "April Newsletter" has a hard bounce rate above your 5% threshold.{' '}
        <button className="font-semibold underline" onClick={() => navigate('/campaigns/1')}>
          Review campaign →
        </button>
      </Alert>

      {isLoadingAnalytics ? (
        <CardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <KpiCard
            label="Total Sends (30d)"
            value={analytics ? formatNumber(analytics.totalSent) : '—'}
            delta={18.4}
            deltaLabel="vs last month"
            accent="#4F46E5"
          />
          <KpiCard
            label="Avg Open Rate"
            value={analytics ? formatPercent(analytics.avgOpenRate) : '—'}
            delta={2.1}
            deltaLabel="vs last month"
            accent="#059669"
          />
          <KpiCard
            label="Active Campaigns"
            value={analytics ? analytics.activeCampaigns : '—'}
            accent="#0284C7"
          />
          <KpiCard
            label="New Contacts (30d)"
            value={analytics ? formatNumber(analytics.newContacts) : '—'}
            delta={12.3}
            deltaLabel="vs last month"
            accent="#7C3AED"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Active Campaigns</h2>
            <button
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              onClick={() => navigate('/campaigns')}
            >
              View all →
            </button>
          </div>
          {isLoadingCampaigns ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-10 rounded bg-slate-100 animate-pulse" />)}
            </div>
          ) : (
            <ActiveCampaignsPanel campaigns={campaigns.slice(0, 5)} />
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { icon: '✉️', bg: 'bg-indigo-50', text: <><b>April Newsletter</b> sent to 8,230 contacts</>, time: '2h ago' },
              { icon: '✅', bg: 'bg-emerald-50', text: <><b>WhatsApp Flash Sale</b> completed — 68.3% read rate</>, time: '5h ago' },
              { icon: '👥', bg: 'bg-sky-50', text: <>Imported <b>342 contacts</b> into "Active Customers"</>, time: '1d ago' },
              { icon: '⏰', bg: 'bg-amber-50', text: <><b>Re-engagement Series</b> scheduled for May 1</>, time: '1d ago' },
              { icon: '🗂️', bg: 'bg-indigo-50', text: <>New template <b>"Product Update May"</b> created</>, time: '2d ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full ${item.bg} flex items-center justify-center text-sm shrink-0`}>
                  {item.icon}
                </div>
                <p className="text-sm text-slate-600 flex-1 leading-snug pt-1">{item.text}</p>
                <span className="text-xs text-slate-400 shrink-0 pt-1">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}