

// // CampaignsPage.jsx – Complete working model matching the screenshot
// import React, { useState, useEffect, useCallback, useRef } from 'react';

// // ===================== Mock Data (based on screenshot) =====================
// const MOCK_CAMPAIGNS = [
//   {
//     id: '1',
//     campaignName: 'Q2 Product Launch',
//     description: 'Re-engagement + launch',
//     channel: 'email',
//     status: 'completed',
//     audienceSize: 12450,
//     openRate: 41.2,
//     ctr: 8.4,
//     date: '2026-04-15T10:00:00Z',
//     scheduledDate: null,
//     sentDate: '2026-04-15T10:00:00Z',
//   },
//   {
//     id: '2',
//     campaignName: 'April Newsletter',
//     description: 'Monthly product update',
//     channel: 'email',
//     status: 'sent',
//     audienceSize: 8230,
//     openRate: 38.7,
//     ctr: 7.1,
//     date: '2026-04-22T09:00:00Z',
//     scheduledDate: null,
//     sentDate: '2026-04-22T09:00:00Z',
//   },
//   {
//     id: '3',
//     campaignName: 'WhatsApp Flash Sale',
//     description: '24-hour limited offer',
//     channel: 'whatsapp',
//     status: 'completed',
//     audienceSize: 3180,
//     openRate: 68.3,
//     ctr: 22.4,
//     date: '2026-04-19T14:30:00Z',
//     scheduledDate: null,
//     sentDate: '2026-04-19T14:30:00Z',
//   },
//   {
//     id: '4',
//     campaignName: 'Re-engagement Series',
//     description: '90-day inactive win-back',
//     channel: 'email',
//     status: 'scheduled',
//     audienceSize: 5400,
//     openRate: null,
//     ctr: null,
//     date: '2026-05-01T08:00:00Z',
//     scheduledDate: '2026-05-01T08:00:00Z',
//     sentDate: null,
//   },
//   {
//     id: '5',
//     campaignName: 'Customer Onboarding Welcome',
//     description: 'First-touch welcome',
//     channel: 'email',
//     status: 'draft',
//     audienceSize: null,
//     openRate: null,
//     ctr: null,
//     date: null,
//     scheduledDate: null,
//     sentDate: null,
//   },
//   {
//     id: '6',
//     campaignName: "Mother's Day Promo",
//     description: 'WhatsApp campaign with offer',
//     channel: 'whatsapp',
//     status: 'draft',
//     audienceSize: null,
//     openRate: null,
//     ctr: null,
//     date: null,
//     scheduledDate: null,
//     sentDate: null,
//   },
//   {
//     id: '7',
//     campaignName: 'Black Friday Early Access',
//     description: 'VIP exclusive preview',
//     channel: 'email',
//     status: 'scheduled',
//     audienceSize: 8900,
//     openRate: null,
//     ctr: null,
//     date: '2026-11-20T10:00:00Z',
//     scheduledDate: '2026-11-20T10:00:00Z',
//     sentDate: null,
//   },
//   {
//     id: '8',
//     campaignName: 'Summer Sale Kickoff',
//     description: 'Seasonal promotion',
//     channel: 'whatsapp',
//     status: 'sent',
//     audienceSize: 12500,
//     openRate: 72.1,
//     ctr: 18.5,
//     date: '2026-06-01T11:00:00Z',
//     scheduledDate: null,
//     sentDate: '2026-06-01T11:00:00Z',
//   },
// ];

// // ===================== Custom Hook with Stable Fetch Logic =====================
// const useCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: '',
//     channel: '',
//     search: '',
//     page: 1,
//     limit: 10,
//   });

//   const isMountedRef = useRef(true);
//   const abortControllerRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => {
//       isMountedRef.current = false;
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const fetchCampaigns = useCallback(() => {
//     if (!isMountedRef.current) return;

//     // Cancel previous request
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     const controller = new AbortController();
//     abortControllerRef.current = controller;

//     setIsLoading(true);
//     console.log('[Campaigns] Fetching campaigns with filters:', {
//       status: filters.status || 'All',
//       channel: filters.channel || 'All Channels',
//       search: filters.search || 'none',
//       page: filters.page,
//     });

//     // Simulate API delay
//     timeoutRef.current = setTimeout(() => {
//       if (!isMountedRef.current || controller.signal.aborted) return;

//       let filtered = [...MOCK_CAMPAIGNS];
//       const originalCount = filtered.length;

//       // Status filter
//       if (filters.status && filters.status !== '') {
//         filtered = filtered.filter(c => c.status === filters.status);
//         console.log(`[Campaigns] Status filter: ${filters.status} -> ${filtered.length} matches`);
//       }

//       // Channel filter
//       if (filters.channel && filters.channel !== '') {
//         filtered = filtered.filter(c => c.channel === filters.channel);
//         console.log(`[Campaigns] Channel filter: ${filters.channel} -> ${filtered.length} matches`);
//       }

//       // Search filter
//       if (filters.search && filters.search.trim() !== '') {
//         const searchTerm = filters.search.toLowerCase();
//         filtered = filtered.filter(c =>
//           c.campaignName.toLowerCase().includes(searchTerm) ||
//           (c.description && c.description.toLowerCase().includes(searchTerm))
//         );
//         console.log(`[Campaigns] Search filter: "${filters.search}" -> ${filtered.length} matches`);
//       }

//       // Pagination
//       const start = (filters.page - 1) * filters.limit;
//       const paged = filtered.slice(start, start + filters.limit);

//       setCampaigns(paged);
//       setTotal(filtered.length);
//       setTotalPages(Math.ceil(filtered.length / filters.limit));
//       setIsLoading(false);

//       console.log(`[Campaigns] Loaded ${paged.length} campaigns (page ${filters.page}/${Math.ceil(filtered.length / filters.limit)}), total: ${filtered.length}`);
//     }, 500);

//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [filters.status, filters.channel, filters.search, filters.page, filters.limit]);

//   useEffect(() => {
//     fetchCampaigns();
//   }, [fetchCampaigns]);

//   const setFilter = useCallback((key, value) => {
//     console.log(`[Campaigns] Setting filter: ${key} = ${value === '' ? 'All' : value || 'null'}`);
//     setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
//   }, []);

//   const clearFilters = useCallback(() => {
//     console.log('[Campaigns] Clearing all filters');
//     setFilters({
//       status: '',
//       channel: '',
//       search: '',
//       page: 1,
//       limit: 10,
//     });
//   }, []);

//   return { campaigns, total, totalPages, isLoading, filters, setFilter, clearFilters };
// };

// // ===================== Utility Functions =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => {
//   if (num === null || num === undefined) return '—';
//   return num.toLocaleString();
// };
// const formatPercentage = (value) => {
//   if (value === null || value === undefined) return '—';
//   return `${value.toFixed(1)}%`;
// };
// const formatDate = (dateString) => {
//   if (!dateString) return 'Draft';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// };

// // ===================== Icons (SVG) =====================
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// const XCircleIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// // ===================== Badges =====================
// const CampaignChannelBadge = ({ channel }) => {
//   const variants = {
//     email: { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '✉️', label: 'Email' },
//     whatsapp: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '💬', label: 'WhatsApp' },
//   };
//   const { bg, text, icon, label } = variants[channel] || variants.email;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//       <span>{icon}</span> {label}
//     </span>
//   );
// };

// const CampaignStatusBadge = ({ status }) => {
//   const config = {
//     draft: { label: 'Draft', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
//     scheduled: { label: 'Scheduled', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
//     sent: { label: 'Sent', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
//     completed: { label: 'Completed', bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
//   };
//   const { label, bg, text, dot } = config[status] || config.draft;
//   return (
//     <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${bg} ${text}`}>
//       <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
//       {label}
//     </span>
//   );
// };

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = 'md' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//   };
//   const sizes = {
//     sm: "px-2.5 py-1 text-xs",
//     md: "px-3 py-1.5 text-sm",
//   };
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled || loading}
//       className={cn(base, variants[variant] || variants.secondary, sizes[size])}
//     >
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//       {rightIcon && !loading && rightIcon}
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

// const FilterTabs = ({ tabs, active, onChange }) => (
//   <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
//     {tabs.map(tab => (
//       <button
//         key={tab.value}
//         onClick={() => onChange(tab.value)}
//         className={cn(
//           "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
//           active === tab.value
//             ? "bg-white text-slate-900 shadow-sm"
//             : "text-slate-500 hover:text-slate-700"
//         )}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// );

// const SearchInput = ({ value, onChange, placeholder, className }) => {
//   const [localValue, setLocalValue] = useState(value || '');
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       console.log(`[SearchInput] Debounced search: "${localValue}"`);
//       onChange(localValue);
//     }, 300);
//     return () => clearTimeout(timeoutRef.current);
//   }, [localValue, onChange]);

//   return (
//     <div className={cn("relative", className)}>
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <SearchIcon />
//       </div>
//       <input
//         type="text"
//         value={localValue}
//         onChange={(e) => setLocalValue(e.target.value)}
//         placeholder={placeholder}
//         className="pl-9 pr-3 py-1.5 w-56 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//       />
//     </div>
//   );
// };

// const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
//       <p className="text-sm text-slate-500 order-1 sm:order-none">
//         Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalItems)} of {totalItems}
//       </p>
//       <div className="flex gap-1 order-2 sm:order-none">
//         <button
//           onClick={() => {
//             console.log(`[Pagination] Previous page: ${page - 1}`);
//             onPageChange(page - 1);
//           }}
//           disabled={page === 1}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 transition-colors"
//         >
//           ← Prev
//         </button>
//         <span className="px-3 py-1 text-sm text-slate-600">{page} / {totalPages}</span>
//         <button
//           onClick={() => {
//             console.log(`[Pagination] Next page: ${page + 1}`);
//             onPageChange(page + 1);
//           }}
//           disabled={page === totalPages}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 transition-colors"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// const DataTable = ({ data, columns, isLoading, onRowClick, emptyTitle, emptyDescription, emptyAction }) => {
//   if (isLoading) {
//     return (
//       <div className="p-12 text-center">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//         <p className="text-sm text-slate-500 mt-3">Loading campaigns...</p>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-slate-300 mb-3">
//           <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         </div>
//         <p className="text-lg font-semibold text-slate-800">{emptyTitle}</p>
//         <p className="text-sm text-slate-500 mt-1">{emptyDescription}</p>
//         {emptyAction && <div className="mt-4">{emptyAction}</div>}
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-slate-100 bg-slate-50">
//             {columns.map(col => (
//               <th
//                 key={col.key}
//                 className={cn(
//                   "px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide",
//                   col.hideOnMobile && "hidden sm:table-cell"
//                 )}
//               >
//                 {col.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-100">
//           {data.map((row, idx) => (
//             <tr
//               key={row.id}
//               onClick={() => onRowClick?.(row)}
//               className="cursor-pointer hover:bg-slate-50 transition-colors group"
//             >
//               {columns.map(col => (
//                 <td
//                   key={col.key}
//                   className={cn(
//                     "px-4 py-3",
//                     col.hideOnMobile && "hidden sm:table-cell"
//                   )}
//                 >
//                   {col.render ? col.render(row, idx) : row[col.key]}
//                 </td>
//               ))}
//              </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // ===================== Constants =====================
// const STATUS_TABS = [
//   { label: 'All', value: '' },
//   { label: 'Draft', value: 'draft' },
//   { label: 'Scheduled', value: 'scheduled' },
//   { label: 'Sent', value: 'sent' },
//   { label: 'Completed', value: 'completed' },
// ];

// const COLUMNS = [
//   {
//     key: 'campaignInfo',
//     header: 'Campaign',
//     render: (row) => (
//       <div>
//         <p className="font-semibold text-slate-800">{row.campaignName}</p>
//         {row.description && (
//           <p className="text-xs text-slate-400 mt-0.5">{row.description}</p>
//         )}
//       </div>
//     ),
//   },
//   {
//     key: 'channel',
//     header: 'Channel',
//     render: (row) => <CampaignChannelBadge channel={row.channel} />,
//   },
//   {
//     key: 'status',
//     header: 'Status',
//     render: (row) => <CampaignStatusBadge status={row.status} />,
//   },
//   {
//     key: 'audience',
//     header: 'Audience',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className="font-medium text-slate-700">
//         {formatNumber(row.audienceSize)}
//       </span>
//     ),
//   },
//   {
//     key: 'openRate',
//     header: 'Open Rate',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className={cn(
//         "font-medium",
//         row.openRate ? (row.openRate >= 50 ? "text-emerald-600" : row.openRate >= 30 ? "text-amber-600" : "text-slate-500") : "text-slate-400"
//       )}>
//         {formatPercentage(row.openRate)}
//       </span>
//     ),
//   },
//   {
//     key: 'ctr',
//     header: 'CTR',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className={cn(
//         "font-medium",
//         row.ctr ? (row.ctr >= 15 ? "text-emerald-600" : row.ctr >= 8 ? "text-amber-600" : "text-slate-500") : "text-slate-400"
//       )}>
//         {formatPercentage(row.ctr)}
//       </span>
//     ),
//   },
//   {
//     key: 'date',
//     header: 'Date',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className="text-slate-500 text-xs whitespace-nowrap">
//         {row.status === 'draft' ? 'Draft' : formatDate(row.date)}
//       </span>
//     ),
//   },
// ];

// // ===================== Main CampaignsPage Component =====================
// export default function CampaignsPage() {
//   const { campaigns, total, totalPages, isLoading, filters, setFilter, clearFilters } = useCampaigns();

//   // Log state changes for debugging
//   useEffect(() => {
//     console.log(`[CampaignsPage] Rendered with ${campaigns.length} campaigns, total: ${total}, isLoading: ${isLoading}, page: ${filters.page}`);
//   }, [campaigns, total, isLoading, filters.page]);

//   const handleNavigate = (to, data = null) => {
//     console.log(`[Navigation] Navigating to: ${to}`, data ? data : '');
//     // Replace with actual router navigation
//     // alert(`Navigate to: ${to}`);
//   };

//   const handleRowClick = (campaign) => {
//     console.log(`[CampaignsPage] Clicked campaign: ${campaign.campaignName} (${campaign.id})`);
//     handleNavigate(`/campaigns/${campaign.id}`, campaign);
//   };

//   const handleStatusChange = (status) => {
//     console.log(`[CampaignsPage] Status filter changed to: ${status || 'All'}`);
//     setFilter('status', status);
//   };

//   const handleChannelChange = (e) => {
//     const channel = e.target.value;
//     console.log(`[CampaignsPage] Channel filter changed to: ${channel || 'All Channels'}`);
//     setFilter('channel', channel);
//   };

//   const handleSearchChange = (search) => {
//     console.log(`[CampaignsPage] Search filter changed to: "${search}"`);
//     setFilter('search', search);
//   };

//   const handleClearFilters = () => {
//     console.log('[CampaignsPage] Clear filters clicked');
//     clearFilters();
//   };

//   const hasActiveFilters = filters.status !== '' || filters.channel !== '' || (filters.search && filters.search.trim() !== '');

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       <PageHeader
//         title="All Campaigns"
//         description="Manage and track all your email and WhatsApp campaigns"
//         action={
//           <div className="flex flex-wrap gap-2">
//             <Button
//               variant="secondary"
//               leftIcon={<CalendarIcon />}
//               onClick={() => handleNavigate('/campaigns/calendar')}
//             >
//               Calendar
//             </Button>
//             <Button
//               variant="primary"
//               leftIcon={<PlusIcon />}
//               onClick={() => handleNavigate('/campaigns/new')}
//             >
//               New Campaign
//             </Button>
//           </div>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <FilterTabs
//             tabs={STATUS_TABS}
//             active={filters.status}
//             onChange={handleStatusChange}
//           />
//           <select
//             value={filters.channel}
//             onChange={handleChannelChange}
//             className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">All Channels</option>
//             <option value="email">Email</option>
//             <option value="whatsapp">WhatsApp</option>
//           </select>
//           <div className="flex-1" />
//           <SearchInput
//             value={filters.search}
//             onChange={handleSearchChange}
//             placeholder="Search campaigns..."
//           />
//           {hasActiveFilters && (
//             <Button
//               variant="ghost"
//               size="sm"
//               leftIcon={<XCircleIcon />}
//               onClick={handleClearFilters}
//             >
//               Clear
//             </Button>
//           )}
//         </div>

//         <DataTable
//           data={campaigns}
//           columns={COLUMNS}
//           isLoading={isLoading}
//           onRowClick={handleRowClick}
//           emptyTitle="No campaigns found"
//           emptyDescription={
//             hasActiveFilters
//               ? "Try adjusting your filters or search term"
//               : "Create your first campaign to start reaching your audience"
//           }
//           emptyAction={
//             !hasActiveFilters && (
//               <Button
//                 variant="primary"
//                 leftIcon={<PlusIcon />}
//                 onClick={() => handleNavigate('/campaigns/new')}
//               >
//                 Create Campaign
//               </Button>
//             )
//           }
//         />

//         <Pagination
//           page={filters.page}
//           totalPages={totalPages}
//           totalItems={total}
//           limit={filters.limit}
//           onPageChange={(page) => setFilter('page', page)}
//         />
//       </div>
//     </div>
//   );
// }


// CampaignsPage.jsx – Complete working model with proper navigation
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ===================== Mock Data (based on screenshot) =====================
// const MOCK_CAMPAIGNS = [
//   {
//     id: '1',
//     campaignName: 'Q2 Product Launch',
//     description: 'Re-engagement + launch',
//     channel: 'email',
//     status: 'completed',
//     audienceSize: 12450,
//     openRate: 41.2,
//     ctr: 8.4,
//     date: '2026-04-15T10:00:00Z',
//     scheduledDate: null,
//     sentDate: '2026-04-15T10:00:00Z',
//   },
//   {
//     id: '2',
//     campaignName: 'April Newsletter',
//     description: 'Monthly product update',
//     channel: 'email',
//     status: 'sent',
//     audienceSize: 8230,
//     openRate: 38.7,
//     ctr: 7.1,
//     date: '2026-04-22T09:00:00Z',
//     scheduledDate: null,
//     sentDate: '2026-04-22T09:00:00Z',
//   },
//   {
//     id: '3',
//     campaignName: 'WhatsApp Flash Sale',
//     description: '24-hour limited offer',
//     channel: 'whatsapp',
//     status: 'completed',
//     audienceSize: 3180,
//     openRate: 68.3,
//     ctr: 22.4,
//     date: '2026-04-19T14:30:00Z',
//     scheduledDate: null,
//     sentDate: '2026-04-19T14:30:00Z',
//   },
//   {
//     id: '4',
//     campaignName: 'Re-engagement Series',
//     description: '90-day inactive win-back',
//     channel: 'email',
//     status: 'scheduled',
//     audienceSize: 5400,
//     openRate: null,
//     ctr: null,
//     date: '2026-05-01T08:00:00Z',
//     scheduledDate: '2026-05-01T08:00:00Z',
//     sentDate: null,
//   },
//   {
//     id: '5',
//     campaignName: 'Customer Onboarding Welcome',
//     description: 'First-touch welcome',
//     channel: 'email',
//     status: 'draft',
//     audienceSize: null,
//     openRate: null,
//     ctr: null,
//     date: null,
//     scheduledDate: null,
//     sentDate: null,
//   },
//   {
//     id: '6',
//     campaignName: "Mother's Day Promo",
//     description: 'WhatsApp campaign with offer',
//     channel: 'whatsapp',
//     status: 'draft',
//     audienceSize: null,
//     openRate: null,
//     ctr: null,
//     date: null,
//     scheduledDate: null,
//     sentDate: null,
//   },
//   {
//     id: '7',
//     campaignName: 'Black Friday Early Access',
//     description: 'VIP exclusive preview',
//     channel: 'email',
//     status: 'scheduled',
//     audienceSize: 8900,
//     openRate: null,
//     ctr: null,
//     date: '2026-11-20T10:00:00Z',
//     scheduledDate: '2026-11-20T10:00:00Z',
//     sentDate: null,
//   },
//   {
//     id: '8',
//     campaignName: 'Summer Sale Kickoff',
//     description: 'Seasonal promotion',
//     channel: 'whatsapp',
//     status: 'sent',
//     audienceSize: 12500,
//     openRate: 72.1,
//     ctr: 18.5,
//     date: '2026-06-01T11:00:00Z',
//     scheduledDate: null,
//     sentDate: '2026-06-01T11:00:00Z',
//   },
// ];

// // ===================== Custom Hook with Stable Fetch Logic =====================
// const useCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: '',
//     channel: '',
//     search: '',
//     page: 1,
//     limit: 10,
//   });

//   const isMountedRef = useRef(true);
//   const abortControllerRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => {
//       isMountedRef.current = false;
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const fetchCampaigns = useCallback(() => {
//     if (!isMountedRef.current) return;

//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     const controller = new AbortController();
//     abortControllerRef.current = controller;

//     setIsLoading(true);
//     console.log('[Campaigns] Fetching campaigns with filters:', {
//       status: filters.status || 'All',
//       channel: filters.channel || 'All Channels',
//       search: filters.search || 'none',
//       page: filters.page,
//     });

//     timeoutRef.current = setTimeout(() => {
//       if (!isMountedRef.current || controller.signal.aborted) return;

//       let filtered = [...MOCK_CAMPAIGNS];

//       if (filters.status && filters.status !== '') {
//         filtered = filtered.filter(c => c.status === filters.status);
//       }
//       if (filters.channel && filters.channel !== '') {
//         filtered = filtered.filter(c => c.channel === filters.channel);
//       }
//       if (filters.search && filters.search.trim() !== '') {
//         const searchTerm = filters.search.toLowerCase();
//         filtered = filtered.filter(c =>
//           c.campaignName.toLowerCase().includes(searchTerm) ||
//           (c.description && c.description.toLowerCase().includes(searchTerm))
//         );
//       }

//       const start = (filters.page - 1) * filters.limit;
//       const paged = filtered.slice(start, start + filters.limit);

//       setCampaigns(paged);
//       setTotal(filtered.length);
//       setTotalPages(Math.ceil(filtered.length / filters.limit));
//       setIsLoading(false);
//     }, 500);

//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [filters.status, filters.channel, filters.search, filters.page, filters.limit]);

//   useEffect(() => {
//     fetchCampaigns();
//   }, [fetchCampaigns]);

//   const setFilter = useCallback((key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
//   }, []);

//   const clearFilters = useCallback(() => {
//     setFilters({
//       status: '',
//       channel: '',
//       search: '',
//       page: 1,
//       limit: 10,
//     });
//   }, []);

//   return { campaigns, total, totalPages, isLoading, filters, setFilter, clearFilters };
// };

// // ===================== Utility Functions =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => {
//   if (num === null || num === undefined) return '—';
//   return num.toLocaleString();
// };
// const formatPercentage = (value) => {
//   if (value === null || value === undefined) return '—';
//   return `${value.toFixed(1)}%`;
// };
// const formatDate = (dateString) => {
//   if (!dateString) return 'Draft';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// };

// // ===================== Icons (SVG) =====================
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// const XCircleIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// // ===================== Badges =====================
// const CampaignChannelBadge = ({ channel }) => {
//   const variants = {
//     email: { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '✉️', label: 'Email' },
//     whatsapp: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '💬', label: 'WhatsApp' },
//   };
//   const { bg, text, icon, label } = variants[channel] || variants.email;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
//       <span>{icon}</span> {label}
//     </span>
//   );
// };

// const CampaignStatusBadge = ({ status }) => {
//   const config = {
//     draft: { label: 'Draft', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
//     scheduled: { label: 'Scheduled', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
//     sent: { label: 'Sent', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
//     completed: { label: 'Completed', bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
//   };
//   const { label, bg, text, dot } = config[status] || config.draft;
//   return (
//     <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${bg} ${text}`}>
//       <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
//       {label}
//     </span>
//   );
// };

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = 'md' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//   };
//   const sizes = {
//     sm: "px-2.5 py-1 text-xs",
//     md: "px-3 py-1.5 text-sm",
//   };
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled || loading}
//       className={cn(base, variants[variant] || variants.secondary, sizes[size])}
//     >
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//       {rightIcon && !loading && rightIcon}
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

// const FilterTabs = ({ tabs, active, onChange }) => (
//   <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
//     {tabs.map(tab => (
//       <button
//         key={tab.value}
//         onClick={() => onChange(tab.value)}
//         className={cn(
//           "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
//           active === tab.value
//             ? "bg-white text-slate-900 shadow-sm"
//             : "text-slate-500 hover:text-slate-700"
//         )}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// );

// const SearchInput = ({ value, onChange, placeholder, className }) => {
//   const [localValue, setLocalValue] = useState(value || '');
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       onChange(localValue);
//     }, 300);
//     return () => clearTimeout(timeoutRef.current);
//   }, [localValue, onChange]);

//   return (
//     <div className={cn("relative", className)}>
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <SearchIcon />
//       </div>
//       <input
//         type="text"
//         value={localValue}
//         onChange={(e) => setLocalValue(e.target.value)}
//         placeholder={placeholder}
//         className="pl-9 pr-3 py-1.5 w-56 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//       />
//     </div>
//   );
// };

// const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
//       <p className="text-sm text-slate-500 order-1 sm:order-none">
//         Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalItems)} of {totalItems}
//       </p>
//       <div className="flex gap-1 order-2 sm:order-none">
//         <button
//           onClick={() => onPageChange(page - 1)}
//           disabled={page === 1}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 transition-colors"
//         >
//           ← Prev
//         </button>
//         <span className="px-3 py-1 text-sm text-slate-600">{page} / {totalPages}</span>
//         <button
//           onClick={() => onPageChange(page + 1)}
//           disabled={page === totalPages}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 transition-colors"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// // ✅ Fixed DataTable component – all tags properly closed
// const DataTable = ({ data, columns, isLoading, onRowClick, emptyTitle, emptyDescription, emptyAction }) => {
//   if (isLoading) {
//     return (
//       <div className="p-12 text-center">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//         <p className="text-sm text-slate-500 mt-3">Loading campaigns...</p>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-slate-300 mb-3">
//           <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         </div>
//         <p className="text-lg font-semibold text-slate-800">{emptyTitle}</p>
//         <p className="text-sm text-slate-500 mt-1">{emptyDescription}</p>
//         {emptyAction && <div className="mt-4">{emptyAction}</div>}
//       </div>
//     );
//   }

//   const visibleCols = columns.filter(col => !col.hideOnMobile);
//   const mobileHiddenCols = columns.filter(col => col.hideOnMobile);

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-slate-100 bg-slate-50">
//             {visibleCols.map(col => (
//               <th
//                 key={col.key}
//                 className={cn(
//                   "px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide",
//                   col.hideOnMobile && "hidden sm:table-cell"
//                 )}
//               >
//                 {col.header}
//               </th>
//             ))}
//             {mobileHiddenCols.length > 0 && (
//               <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide hidden sm:table-cell">
//                 Details
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-100">
//           {data.map((row, idx) => (
//             <tr
//               key={row.id}
//               onClick={() => onRowClick?.(row)}
//               className="cursor-pointer hover:bg-slate-50 transition-colors group"
//             >
//               {visibleCols.map(col => (
//                 <td key={col.key} className="px-4 py-3">
//                   {col.render ? col.render(row, idx) : row[col.key]}
//                 </td>
//               ))}
//               {mobileHiddenCols.length > 0 && (
//                 <td className="px-4 py-3 hidden sm:table-cell">
//                   <div className="flex flex-col gap-1">
//                     {mobileHiddenCols.map(col => (
//                       <div key={col.key} className="text-xs">
//                         <span className="font-semibold text-slate-400">{col.header}:</span>{' '}
//                         {col.render ? col.render(row, idx) : row[col.key]}
//                       </div>
//                     ))}
//                   </div>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // ===================== Constants =====================
// const STATUS_TABS = [
//   { label: 'All', value: '' },
//   { label: 'Draft', value: 'draft' },
//   { label: 'Scheduled', value: 'scheduled' },
//   { label: 'Sent', value: 'sent' },
//   { label: 'Completed', value: 'completed' },
// ];

// const COLUMNS = [
//   {
//     key: 'campaignInfo',
//     header: 'Campaign',
//     render: (row) => (
//       <div>
//         <p className="font-semibold text-slate-800">{row.campaignName}</p>
//         {row.description && (
//           <p className="text-xs text-slate-400 mt-0.5">{row.description}</p>
//         )}
//       </div>
//     ),
//   },
//   {
//     key: 'channel',
//     header: 'Channel',
//     render: (row) => <CampaignChannelBadge channel={row.channel} />,
//   },
//   {
//     key: 'status',
//     header: 'Status',
//     render: (row) => <CampaignStatusBadge status={row.status} />,
//   },
//   {
//     key: 'audience',
//     header: 'Audience',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className="font-medium text-slate-700">
//         {formatNumber(row.audienceSize)}
//       </span>
//     ),
//   },
//   {
//     key: 'openRate',
//     header: 'Open Rate',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className={cn(
//         "font-medium",
//         row.openRate ? (row.openRate >= 50 ? "text-emerald-600" : row.openRate >= 30 ? "text-amber-600" : "text-slate-500") : "text-slate-400"
//       )}>
//         {formatPercentage(row.openRate)}
//       </span>
//     ),
//   },
//   {
//     key: 'ctr',
//     header: 'CTR',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className={cn(
//         "font-medium",
//         row.ctr ? (row.ctr >= 15 ? "text-emerald-600" : row.ctr >= 8 ? "text-amber-600" : "text-slate-500") : "text-slate-400"
//       )}>
//         {formatPercentage(row.ctr)}
//       </span>
//     ),
//   },
//   {
//     key: 'date',
//     header: 'Date',
//     hideOnMobile: true,
//     render: (row) => (
//       <span className="text-slate-500 text-xs whitespace-nowrap">
//         {row.status === 'draft' ? 'Draft' : formatDate(row.date)}
//       </span>
//     ),
//   },
// ];

// // ===================== Main CampaignsPage Component =====================
// export default function CampaignsPage() {
//   const navigate = useNavigate();
//   const { campaigns, total, totalPages, isLoading, filters, setFilter, clearFilters } = useCampaigns();

//   const handleRowClick = (campaign) => {
//     navigate(`/campaigns/${campaign.id}`);
//   };

//   const handleStatusChange = (status) => {
//     setFilter('status', status);
//   };

//   const handleChannelChange = (e) => {
//     setFilter('channel', e.target.value);
//   };

//   const handleSearchChange = (search) => {
//     setFilter('search', search);
//   };

//   const handleClearFilters = () => {
//     clearFilters();
//   };

//   const hasActiveFilters = filters.status !== '' || filters.channel !== '' || (filters.search && filters.search.trim() !== '');

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       <PageHeader
//         title="All Campaigns"
//         description="Manage and track all your email and WhatsApp campaigns"
//         action={
//           <div className="flex flex-wrap gap-2">
//             <Button
//               variant="secondary"
//               leftIcon={<CalendarIcon />}
//               onClick={() => navigate('/calendar')}
//             >
//               Calendar
//             </Button>
//             <Button
//               variant="primary"
//               leftIcon={<PlusIcon />}
//               onClick={() => navigate('/campaigns/new')}
//             >
//               New Campaign
//             </Button>
//           </div>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <FilterTabs
//             tabs={STATUS_TABS}
//             active={filters.status}
//             onChange={handleStatusChange}
//           />
//           <select
//             value={filters.channel}
//             onChange={handleChannelChange}
//             className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">All Channels</option>
//             <option value="email">Email</option>
//             <option value="whatsapp">WhatsApp</option>
//           </select>
//           <div className="flex-1" />
//           <SearchInput
//             value={filters.search}
//             onChange={handleSearchChange}
//             placeholder="Search campaigns..."
//           />
//           {hasActiveFilters && (
//             <Button
//               variant="ghost"
//               size="sm"
//               leftIcon={<XCircleIcon />}
//               onClick={handleClearFilters}
//             >
//               Clear
//             </Button>
//           )}
//         </div>

//         <DataTable
//           data={campaigns}
//           columns={COLUMNS}
//           isLoading={isLoading}
//           onRowClick={handleRowClick}
//           emptyTitle="No campaigns found"
//           emptyDescription={
//             hasActiveFilters
//               ? "Try adjusting your filters or search term"
//               : "Create your first campaign to start reaching your audience"
//           }
//           emptyAction={
//             !hasActiveFilters && (
//               <Button
//                 variant="primary"
//                 leftIcon={<PlusIcon />}
//                 onClick={() => navigate('/campaigns/new')}
//               >
//                 Create Campaign
//               </Button>
//             )
//           }
//         />

//         <Pagination
//           page={filters.page}
//           totalPages={totalPages}
//           totalItems={total}
//           limit={filters.limit}
//           onPageChange={(page) => setFilter('page', page)}
//         />
//       </div>
//     </div>
//   );
// }





// import { useCampaigns } from "./hooks/useCampaign";
// import CampaignChannelBadge from "./components/CampaignChannelBadge";
// import CampaignStatusBadge from "./components/CampaignStatusBadge";

// export default function CampaignsPage() {
//   const { campaigns, totalPages, filters, setFilter, isLoading } = useCampaigns();

//   const tabs = ["all", "draft", "scheduled", "sent", "completed"];

//   return (
//     <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      
//       {/* HEADER SECTION */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">All Campaigns</h1>
//           <p className="text-sm text-gray-400 mt-1">
//             Manage and track all your email and WhatsApp campaigns
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
//             <span className="text-gray-400">📅</span> Calendar
//           </button>
//           <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition">
//             + New Campaign
//           </button>
//         </div>
//       </div>

//       {/* FILTER & SEARCH BAR */}
//       <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">
//         <div className="flex flex-wrap items-center justify-between gap-4">
          
//           <div className="flex items-center gap-4">
//             {/* Tabs */}
//             <div className="flex gap-1 bg-white border border-gray-100 p-1 rounded-xl">
//               {tabs.map((tab) => {
//                 const active = filters.status === tab || (!filters.status && tab === "all");
//                 return (
//                   <button
//                     key={tab}
//                     onClick={() => setFilter("status", tab === "all" ? null : tab)}
//                     className={`px-4 py-1.5 rounded-lg text-sm capitalize font-medium transition ${
//                       active
//                         ? "bg-gray-50 text-[#4F46E5] border border-gray-100"
//                         : "text-gray-400 hover:text-gray-600"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Dropdowns */}
//             <div className="flex gap-2">
//               <select
//                 onChange={(e) => setFilter("channel", e.target.value)}
//                 className="border border-gray-200 px-3 py-2 rounded-xl text-sm bg-gray-50/50 text-gray-600 focus:outline-none"
//               >
//                 <option value="">All Channels</option>
//                 <option value="email">Email</option>
//                 <option value="whatsapp">WhatsApp</option>
//               </select>

//               <select className="border border-gray-200 px-3 py-2 rounded-xl text-sm bg-gray-50/50 text-gray-600 focus:outline-none">
//                 <option>Last 30 days</option>
//                 <option>Last 90 days</option>
//               </select>
//             </div>
//           </div>

//           {/* Search */}
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
//             <input
//               type="text"
//               placeholder="Search campaigns..."
//               defaultValue={filters.search || ""}
//               onChange={(e) => setFilter("q", e.target.value)}
//               className="border border-gray-200 pl-9 pr-4 py-2 rounded-xl text-sm w-72 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
//             />
//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-white border-b border-gray-50 text-[#94A3B8] text-[11px] uppercase tracking-wider font-semibold">
//             <tr>
//               <th className="text-left px-8 py-4">Campaign</th>
//               <th className="text-left px-6 py-4">Channel</th>
//               <th className="text-left px-6 py-4">Status</th>
//               <th className="text-left px-6 py-4">Audience</th>
//               <th className="text-left px-6 py-4">Open Rate</th>
//               <th className="text-left px-6 py-4">CTR</th>
//               <th className="text-left px-6 py-4">Date</th>
//               <th className="px-6 py-4"></th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-50">
//             {isLoading ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-12 text-gray-400">Loading campaigns...</td>
//               </tr>
//             ) : campaigns.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-12 text-gray-400">No campaigns found</td>
//               </tr>
//             ) : (
//               campaigns.map((c) => (
//                 <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-8 py-5">
//                     <div className="font-semibold text-gray-800">{c.name}</div>
//                     <div className="text-[12px] text-gray-400 mt-0.5">{c.subtitle}</div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <CampaignChannelBadge channel={c.channel} />
//                   </td>
//                   <td className="px-6 py-5">
//                     <CampaignStatusBadge status={c.status} />
//                   </td>
//                   <td className="px-6 py-5 text-gray-600 font-medium">{c.audience}</td>
//                   <td className="px-6 py-5 text-[#10B981] font-bold">
//                     {c.openRate ? `${c.openRate}%` : "—"}
//                   </td>
//                   <td className="px-6 py-5 text-gray-600 font-medium">
//                     {c.ctr ? `${c.ctr}%` : "—"}
//                   </td>
//                   <td className="px-6 py-5 text-gray-400">{c.date || "—"}</td>
//                   <td className="px-6 py-5 text-right text-gray-300 font-bold cursor-pointer hover:text-gray-600">
//                     ...
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
        
//         {/* FOOTER / PAGINATION INFO */}
//         <div className="px-8 py-4 border-t border-gray-50 flex items-center justify-between bg-white">
//           <p className="text-xs text-gray-400">
//             Showing 1-6 of {totalPages * 6} campaigns
//           </p>
//           <div className="flex gap-1">
//             <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50">{"<"}</button>
//             {Array.from({ length: totalPages }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setFilter("page", i + 1)}
//                 className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
//                   filters.page === i + 1
//                     ? "bg-[#4F46E5] text-white"
//                     : "text-gray-500 hover:bg-gray-50"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50">{">"}</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import React from "react";
import { useNavigate } from "react-router-dom";
const mockCampaigns = [
  { 
    id: 1, 
    name: "Q2 Product Launch", 
    subtitle: "Re-engagement + launch", 
    channel: "Email", 
    status: "Completed", 
    audience: "12,450", 
    openRate: "41.2", 
    ctr: "8.4", 
    date: "Apr 15",
    dateObj: new Date("2026-04-15")
  },
  { 
    id: 2, 
    name: "April Newsletter", 
    subtitle: "Monthly product update", 
    channel: "Email", 
    status: "Sent", 
    audience: "8,230", 
    openRate: "38.7", 
    ctr: "7.1", 
    date: "Apr 22",
    dateObj: new Date("2026-04-22")
  },
  { 
    id: 3, 
    name: "WhatsApp Flash Sale", 
    subtitle: "24-hour limited offer", 
    channel: "WhatsApp", 
    status: "Completed", 
    audience: "3,180", 
    openRate: "68.3", 
    ctr: "22.4", 
    date: "Apr 19",
    dateObj: new Date("2026-04-19")
  },
  { 
    id: 4, 
    name: "Re-engagement Series", 
    subtitle: "90-day inactive win-back", 
    channel: "Email", 
    status: "Scheduled", 
    audience: "5,400", 
    openRate: null, 
    ctr: null, 
    date: "May 1",
    dateObj: new Date("2026-05-01")
  },
  { 
    id: 5, 
    name: "Customer Onboarding Welcome", 
    subtitle: "First-touch welcome", 
    channel: "Email", 
    status: "Draft", 
    audience: "-", 
    openRate: null, 
    ctr: null, 
    date: "Draft",
    dateObj: null
  },
  { 
    id: 6, 
    name: "Mother's Day Promo", 
    subtitle: "WhatsApp campaign with offer", 
    channel: "WhatsApp", 
    status: "Draft", 
    audience: "-", 
    openRate: null, 
    ctr: null, 
    date: "Draft",
    dateObj: null
  },
];

export default function CampaignsPage() {
  const tabs = ["All", "Draft", "Scheduled", "Sent", "Completed"];
const navigate = useNavigate();
// STATE
const [activeTab, setActiveTab] = React.useState("All");
const [channel, setChannel] = React.useState("All Channels");
const [search, setSearch] = React.useState("");
const [dateRange, setDateRange] = React.useState("This year");  
const [selectedCampaign, setSelectedCampaign] = React.useState(null);
const [currentPage, setCurrentPage] = React.useState(1);
const itemsPerPage = 6;
// FILTERED DATA
const filteredCampaigns = mockCampaigns.filter((c) => {
  const matchTab =
    activeTab === "All" || c.status === activeTab;

  const matchChannel =
    channel === "All Channels" || c.channel === channel;

  const matchSearch =
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(search.toLowerCase());

  const now = new Date();
  let matchDate = true;

  if (!c.dateObj) {
    matchDate = true;
  } else if (dateRange === "Last 30 days") {
    const past = new Date();
    past.setDate(now.getDate() - 30);
    matchDate = c.dateObj >= past;
  } else if (dateRange === "Last 90 days") {
    const past = new Date();
    past.setDate(now.getDate() - 90);
    matchDate = c.dateObj >= past;
  } else if (dateRange === "This year") {
    matchDate = c.dateObj.getFullYear() === now.getFullYear();
  }

  return matchTab && matchChannel && matchSearch && matchDate;
});

// PAGINATION
const paginatedData = filteredCampaigns.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1e293b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
     

      <div className="px-8 pt-2 pb-8 max-w-[1200px]">
        
        {/* HEADER */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-[20px] font-semibold text-[#0f172a]">
  All Campaigns
</h1>

<p className="text-[#94a3b8] text-[12px] mt-0.5">
  Manage and track all your email and WhatsApp campaigns
</p>
          </div>
          <div className="flex items-center gap-3">

  {/* Calendar */}
  <button
    onClick={() => navigate("/calendar")}
    className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[12px] font-semibold text-[#334155] shadow-sm hover:bg-gray-50 transition"
    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  >
    <span className="text-indigo-500 text-[14px] leading-none">📅</span>
    Calendar
  </button>

  {/* New Campaign */}
  <button
    onClick={() => navigate('/campaigns/new')}
    className="bg-[#4F46E5] text-white px-5 py-2 rounded-lg text-[12px] font-semibold shadow-md hover:opacity-90 transition"
    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  >
    + New Campaign
  </button>

</div>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between shadow-sm">
  {/* LEFT SIDE */}
  <div className="flex items-center gap-3">

    {/* TABS */}
    <div className="bg-[#EEF2FF] border border-[#E2E8F0] p-1 rounded-xl flex gap-1">
      {tabs.map((tab, i) => (
       <button
  key={tab}
  onClick={() => setActiveTab(tab)}
  className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition ${
    activeTab === tab
      ? "bg-white text-[#0f172a] shadow-sm"
      : "text-[#334155] hover:bg-white/60"
  }`}
>
  {tab}
</button>
      ))}
    </div>

    {/* CHANNEL */}
    <select
  value={channel}
  onChange={(e) => setChannel(e.target.value)}
  className="bg-[#EEF2FF] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#334155] outline-none"
>
  <option>All Channels</option>
  <option>Email</option>
  <option>WhatsApp</option>
</select>

    {/* DATE */}
    <select
  value={dateRange}
  onChange={(e) => setDateRange(e.target.value)}
  className="bg-[#EEF2FF] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#334155] outline-none"
>
  <option>Last 30 days</option>
  <option>Last 90 days</option>
  <option>This year</option>
</select>

  </div>

  {/* RIGHT SIDE - SEARCH */}
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs">
      🔍
    </span>
    <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search campaigns..."
  className="bg-white border border-[#E2E8F0] rounded-lg py-1.5 pl-9 pr-3 text-[12px] w-[240px] outline-none focus:ring-2 focus:ring-indigo-200 transition"
/>
  </div>

</div>

        {/* TABLE - Tightened row height and font sizes */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <table className="w-full text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <thead className="bg-[#F8FAFC]">
  {/* <tr className="border-b border-[#E2E8F0]"> */}
<tr className="hover:bg-[#F8FAFC] transition">
    <th className="pl-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Campaign
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Channel
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Status
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Audience
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Open Rate
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      CTR
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Date
    </th>

    <th className="pr-6 py-4"></th>

  </tr>
</thead>
            <tbody className="divide-y divide-gray-50">
  {paginatedData.map((c) => (
    <tr key={c.id} className="hover:bg-gray-50/50">
      
      {/* Campaign */}
      <td className="pl-8 py-4">
        <div className="font-semibold text-[12px] text-[#0f172a]">{c.name}</div>
        <div className="text-[11px] text-[#94A3B8]">{c.subtitle}</div>
      </td>

      {/* Channel */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium ${
            c.channel === "Email"
              ? "bg-[#EEF2FF] text-[#4F46E5]"
              : "bg-[#ECFDF5] text-[#16A34A]"
          }`}
        >
          <span className="text-[11px]">
            {c.channel === "Email" ? "📩" : "💬"}
          </span>
          {c.channel}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[12px] font-medium ${
            c.status === "Completed"
              ? "bg-[#ECFDF5] text-[#16A34A]"
              : c.status === "Sent"
              ? "bg-[#EFF6FF] text-[#2563EB]"
              : c.status === "Scheduled"
              ? "bg-[#EEF2FF] text-[#4F46E5]"
              : "bg-[#F1F5F9] text-[#64748B]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              c.status === "Completed"
                ? "bg-[#16A34A]"
                : c.status === "Sent"
                ? "bg-[#2563EB]"
                : c.status === "Scheduled"
                ? "bg-[#4F46E5]"
                : "bg-[#64748B]"
            }`}
          ></span>
          {c.status}
        </span>
      </td>

      {/* Audience */}
      <td className="px-6 py-4 text-[12px] font-medium text-[#334155]">
        {c.audience}
      </td>

      {/* Open Rate */}
      <td className={`px-6 py-4 font-semibold text-[12px] ${
        c.openRate ? "text-green-500" : "text-gray-300"
      }`}>
        {c.openRate ? `${c.openRate}%` : "—"}
      </td>

      {/* CTR */}
      <td className={`px-6 py-4 font-medium text-[12px] ${
        c.ctr ? "text-gray-700" : "text-gray-300"
      }`}>
        {c.ctr ? `${c.ctr}%` : "—"}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-[#94A3B8] font-medium text-[12px]">
        {c.date}
      </td>

      {/* Actions */}
      <td className="pr-8 py-4 text-right">
        <button
          onClick={() => setSelectedCampaign(c)}
          className="text-gray-400 hover:text-gray-700 text-lg font-bold"
        >
          ⋯
        </button>
      </td>

    </tr>
  ))}
</tbody>
          </table>
          {selectedCampaign && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
      
      <h2 className="text-[16px] font-semibold mb-4">
        {selectedCampaign.name}
      </h2>

      <div className="text-[13px] text-gray-600 space-y-2">
        <p><strong>Channel:</strong> {selectedCampaign.channel}</p>
        <p><strong>Status:</strong> {selectedCampaign.status}</p>
        <p><strong>Audience:</strong> {selectedCampaign.audience}</p>
        <p><strong>Open Rate:</strong> {selectedCampaign.openRate || "-"}</p>
        <p><strong>CTR:</strong> {selectedCampaign.ctr || "-"}</p>
        <p><strong>Date:</strong> {selectedCampaign.date}</p>
      </div>

      <button
        onClick={() => setSelectedCampaign(null)}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
      >
        Close
      </button>

    </div>
  </div>
)}

          {/* FOOTER */}
         <div className="flex items-center justify-between px-6 py-4">

  {/* LEFT TEXT */}
  <p className="text-[12px] text-[#94A3B8] font-medium">
    Showing 1–6 of 28 campaigns
  </p>

  {/* PAGINATION */}
  <div className="flex items-center gap-2">

   <button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E2E8F0] text-[11px] text-[#64748B]"
  >
    &lt;
  </button>

  {[1, 2, 3].map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`w-7 h-7 flex items-center justify-center rounded-md text-[11px] ${
        currentPage === page
          ? "bg-[#4F46E5] text-white"
          : "border border-[#E2E8F0] text-[#64748B]"
      }`}
    >
      {page}
    </button>
  ))}

  {/* Next */}
  <button
    onClick={() =>
      setCurrentPage((p) =>
        Math.min(p + 1, Math.ceil(filteredCampaigns.length / itemsPerPage))
      )
    }
    className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E2E8F0] text-[11px] text-[#64748B]"
  >
    &gt;
  </button>

  </div>

</div>
        </div>
      </div>
    </div>
  );
}