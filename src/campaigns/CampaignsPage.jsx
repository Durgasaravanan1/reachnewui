

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
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ===================== Mock Data (based on screenshot) =====================
const MOCK_CAMPAIGNS = [
  {
    id: '1',
    campaignName: 'Q2 Product Launch',
    description: 'Re-engagement + launch',
    channel: 'email',
    status: 'completed',
    audienceSize: 12450,
    openRate: 41.2,
    ctr: 8.4,
    date: '2026-04-15T10:00:00Z',
    scheduledDate: null,
    sentDate: '2026-04-15T10:00:00Z',
  },
  {
    id: '2',
    campaignName: 'April Newsletter',
    description: 'Monthly product update',
    channel: 'email',
    status: 'sent',
    audienceSize: 8230,
    openRate: 38.7,
    ctr: 7.1,
    date: '2026-04-22T09:00:00Z',
    scheduledDate: null,
    sentDate: '2026-04-22T09:00:00Z',
  },
  {
    id: '3',
    campaignName: 'WhatsApp Flash Sale',
    description: '24-hour limited offer',
    channel: 'whatsapp',
    status: 'completed',
    audienceSize: 3180,
    openRate: 68.3,
    ctr: 22.4,
    date: '2026-04-19T14:30:00Z',
    scheduledDate: null,
    sentDate: '2026-04-19T14:30:00Z',
  },
  {
    id: '4',
    campaignName: 'Re-engagement Series',
    description: '90-day inactive win-back',
    channel: 'email',
    status: 'scheduled',
    audienceSize: 5400,
    openRate: null,
    ctr: null,
    date: '2026-05-01T08:00:00Z',
    scheduledDate: '2026-05-01T08:00:00Z',
    sentDate: null,
  },
  {
    id: '5',
    campaignName: 'Customer Onboarding Welcome',
    description: 'First-touch welcome',
    channel: 'email',
    status: 'draft',
    audienceSize: null,
    openRate: null,
    ctr: null,
    date: null,
    scheduledDate: null,
    sentDate: null,
  },
  {
    id: '6',
    campaignName: "Mother's Day Promo",
    description: 'WhatsApp campaign with offer',
    channel: 'whatsapp',
    status: 'draft',
    audienceSize: null,
    openRate: null,
    ctr: null,
    date: null,
    scheduledDate: null,
    sentDate: null,
  },
  {
    id: '7',
    campaignName: 'Black Friday Early Access',
    description: 'VIP exclusive preview',
    channel: 'email',
    status: 'scheduled',
    audienceSize: 8900,
    openRate: null,
    ctr: null,
    date: '2026-11-20T10:00:00Z',
    scheduledDate: '2026-11-20T10:00:00Z',
    sentDate: null,
  },
  {
    id: '8',
    campaignName: 'Summer Sale Kickoff',
    description: 'Seasonal promotion',
    channel: 'whatsapp',
    status: 'sent',
    audienceSize: 12500,
    openRate: 72.1,
    ctr: 18.5,
    date: '2026-06-01T11:00:00Z',
    scheduledDate: null,
    sentDate: '2026-06-01T11:00:00Z',
  },
];

// ===================== Custom Hook with Stable Fetch Logic =====================
const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    channel: '',
    search: '',
    page: 1,
    limit: 10,
  });

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const fetchCampaigns = useCallback(() => {
    if (!isMountedRef.current) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    console.log('[Campaigns] Fetching campaigns with filters:', {
      status: filters.status || 'All',
      channel: filters.channel || 'All Channels',
      search: filters.search || 'none',
      page: filters.page,
    });

    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current || controller.signal.aborted) return;

      let filtered = [...MOCK_CAMPAIGNS];

      if (filters.status && filters.status !== '') {
        filtered = filtered.filter(c => c.status === filters.status);
      }
      if (filters.channel && filters.channel !== '') {
        filtered = filtered.filter(c => c.channel === filters.channel);
      }
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(c =>
          c.campaignName.toLowerCase().includes(searchTerm) ||
          (c.description && c.description.toLowerCase().includes(searchTerm))
        );
      }

      const start = (filters.page - 1) * filters.limit;
      const paged = filtered.slice(start, start + filters.limit);

      setCampaigns(paged);
      setTotal(filtered.length);
      setTotalPages(Math.ceil(filtered.length / filters.limit));
      setIsLoading(false);
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [filters.status, filters.channel, filters.search, filters.page, filters.limit]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      status: '',
      channel: '',
      search: '',
      page: 1,
      limit: 10,
    });
  }, []);

  return { campaigns, total, totalPages, isLoading, filters, setFilter, clearFilters };
};

// ===================== Utility Functions =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => {
  if (num === null || num === undefined) return '—';
  return num.toLocaleString();
};
const formatPercentage = (value) => {
  if (value === null || value === undefined) return '—';
  return `${value.toFixed(1)}%`;
};
const formatDate = (dateString) => {
  if (!dateString) return 'Draft';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// ===================== Icons (SVG) =====================
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ===================== Badges =====================
const CampaignChannelBadge = ({ channel }) => {
  const variants = {
    email: { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: '✉️', label: 'Email' },
    whatsapp: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '💬', label: 'WhatsApp' },
  };
  const { bg, text, icon, label } = variants[channel] || variants.email;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
      <span>{icon}</span> {label}
    </span>
  );
};

const CampaignStatusBadge = ({ status }) => {
  const config = {
    draft: { label: 'Draft', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    scheduled: { label: 'Scheduled', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    sent: { label: 'Sent', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    completed: { label: 'Completed', bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  };
  const { label, bg, text, dot } = config[status] || config.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${bg} ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

// ===================== UI Components =====================
const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = 'md' }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
  };
  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(base, variants[variant] || variants.secondary, sizes[size])}
    >
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
      {rightIcon && !loading && rightIcon}
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

const FilterTabs = ({ tabs, active, onChange }) => (
  <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
    {tabs.map(tab => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
          active === tab.value
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const SearchInput = ({ value, onChange, placeholder, className }) => {
  const [localValue, setLocalValue] = useState(value || '');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timeoutRef.current);
  }, [localValue, onChange]);

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-3 py-1.5 w-56 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />
    </div>
  );
};

const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
      <p className="text-sm text-slate-500 order-1 sm:order-none">
        Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalItems)} of {totalItems}
      </p>
      <div className="flex gap-1 order-2 sm:order-none">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 transition-colors"
        >
          ← Prev
        </button>
        <span className="px-3 py-1 text-sm text-slate-600">{page} / {totalPages}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// ✅ Fixed DataTable component – all tags properly closed
const DataTable = ({ data, columns, isLoading, onRowClick, emptyTitle, emptyDescription, emptyAction }) => {
  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-slate-500 mt-3">Loading campaigns...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-300 mb-3">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-slate-800">{emptyTitle}</p>
        <p className="text-sm text-slate-500 mt-1">{emptyDescription}</p>
        {emptyAction && <div className="mt-4">{emptyAction}</div>}
      </div>
    );
  }

  const visibleCols = columns.filter(col => !col.hideOnMobile);
  const mobileHiddenCols = columns.filter(col => col.hideOnMobile);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {visibleCols.map(col => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide",
                  col.hideOnMobile && "hidden sm:table-cell"
                )}
              >
                {col.header}
              </th>
            ))}
            {mobileHiddenCols.length > 0 && (
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide hidden sm:table-cell">
                Details
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className="cursor-pointer hover:bg-slate-50 transition-colors group"
            >
              {visibleCols.map(col => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row, idx) : row[col.key]}
                </td>
              ))}
              {mobileHiddenCols.length > 0 && (
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="flex flex-col gap-1">
                    {mobileHiddenCols.map(col => (
                      <div key={col.key} className="text-xs">
                        <span className="font-semibold text-slate-400">{col.header}:</span>{' '}
                        {col.render ? col.render(row, idx) : row[col.key]}
                      </div>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ===================== Constants =====================
const STATUS_TABS = [
  { label: 'All', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Sent', value: 'sent' },
  { label: 'Completed', value: 'completed' },
];

const COLUMNS = [
  {
    key: 'campaignInfo',
    header: 'Campaign',
    render: (row) => (
      <div>
        <p className="font-semibold text-slate-800">{row.campaignName}</p>
        {row.description && (
          <p className="text-xs text-slate-400 mt-0.5">{row.description}</p>
        )}
      </div>
    ),
  },
  {
    key: 'channel',
    header: 'Channel',
    render: (row) => <CampaignChannelBadge channel={row.channel} />,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <CampaignStatusBadge status={row.status} />,
  },
  {
    key: 'audience',
    header: 'Audience',
    hideOnMobile: true,
    render: (row) => (
      <span className="font-medium text-slate-700">
        {formatNumber(row.audienceSize)}
      </span>
    ),
  },
  {
    key: 'openRate',
    header: 'Open Rate',
    hideOnMobile: true,
    render: (row) => (
      <span className={cn(
        "font-medium",
        row.openRate ? (row.openRate >= 50 ? "text-emerald-600" : row.openRate >= 30 ? "text-amber-600" : "text-slate-500") : "text-slate-400"
      )}>
        {formatPercentage(row.openRate)}
      </span>
    ),
  },
  {
    key: 'ctr',
    header: 'CTR',
    hideOnMobile: true,
    render: (row) => (
      <span className={cn(
        "font-medium",
        row.ctr ? (row.ctr >= 15 ? "text-emerald-600" : row.ctr >= 8 ? "text-amber-600" : "text-slate-500") : "text-slate-400"
      )}>
        {formatPercentage(row.ctr)}
      </span>
    ),
  },
  {
    key: 'date',
    header: 'Date',
    hideOnMobile: true,
    render: (row) => (
      <span className="text-slate-500 text-xs whitespace-nowrap">
        {row.status === 'draft' ? 'Draft' : formatDate(row.date)}
      </span>
    ),
  },
];

// ===================== Main CampaignsPage Component =====================
export default function CampaignsPage() {
  const navigate = useNavigate();
  const { campaigns, total, totalPages, isLoading, filters, setFilter, clearFilters } = useCampaigns();

  const handleRowClick = (campaign) => {
    navigate(`/campaigns/${campaign.id}`);
  };

  const handleStatusChange = (status) => {
    setFilter('status', status);
  };

  const handleChannelChange = (e) => {
    setFilter('channel', e.target.value);
  };

  const handleSearchChange = (search) => {
    setFilter('search', search);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const hasActiveFilters = filters.status !== '' || filters.channel !== '' || (filters.search && filters.search.trim() !== '');

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <PageHeader
        title="All Campaigns"
        description="Manage and track all your email and WhatsApp campaigns"
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              leftIcon={<CalendarIcon />}
              onClick={() => navigate('/calendar')}
            >
              Calendar
            </Button>
            <Button
              variant="primary"
              leftIcon={<PlusIcon />}
              onClick={() => navigate('/campaigns/new')}
            >
              New Campaign
            </Button>
          </div>
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          <FilterTabs
            tabs={STATUS_TABS}
            active={filters.status}
            onChange={handleStatusChange}
          />
          <select
            value={filters.channel}
            onChange={handleChannelChange}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Channels</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          <div className="flex-1" />
          <SearchInput
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search campaigns..."
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<XCircleIcon />}
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          )}
        </div>

        <DataTable
          data={campaigns}
          columns={COLUMNS}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          emptyTitle="No campaigns found"
          emptyDescription={
            hasActiveFilters
              ? "Try adjusting your filters or search term"
              : "Create your first campaign to start reaching your audience"
          }
          emptyAction={
            !hasActiveFilters && (
              <Button
                variant="primary"
                leftIcon={<PlusIcon />}
                onClick={() => navigate('/campaigns/new')}
              >
                Create Campaign
              </Button>
            )
          }
        />

        <Pagination
          page={filters.page}
          totalPages={totalPages}
          totalItems={total}
          limit={filters.limit}
          onPageChange={(page) => setFilter('page', page)}
        />
      </div>
    </div>
  );
}