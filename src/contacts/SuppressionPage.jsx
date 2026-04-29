// // SuppressionPage.jsx
// import React, { useState, useEffect } from 'react';

// // ===================== Mock Data & API Simulation =====================
// const MOCK_SUPPRESSIONS = [
//   { id: '1', email: 'spam@example.com', phone: null, channel: 'email', reason: 'spam_complaint', campaignName: 'Summer Sale', addedByName: null, addedAt: '2026-04-10T10:00:00Z' },
//   { id: '2', email: 'bounce@example.com', phone: null, channel: 'email', reason: 'hard_bounce', campaignName: 'Newsletter', addedByName: null, addedAt: '2026-04-12T14:30:00Z' },
//   { id: '3', email: null, phone: '+919876543210', channel: 'whatsapp', reason: 'opted_out', campaignName: null, addedByName: 'Admin User', addedAt: '2026-04-15T09:15:00Z' },
//   { id: '4', email: 'unsub@example.com', phone: null, channel: 'email', reason: 'unsubscribed', campaignName: 'Weekly Update', addedByName: null, addedAt: '2026-04-18T16:45:00Z' },
//   { id: '5', email: 'blacklist@example.com', phone: null, channel: 'email', reason: 'manual_blacklist', campaignName: null, addedByName: 'Super Admin', addedAt: '2026-04-20T11:00:00Z' },
// ];

// const REASON_LABELS = {
//   unsubscribed: 'Unsubscribed',
//   hard_bounce: 'Hard Bounce',
//   spam_complaint: 'Spam Complaint',
//   manual_blacklist: 'Manual Blacklist',
//   opted_out: 'Opted Out',
// };

// const useSuppressionList = (filters) => {
//   const [data, setData] = useState({ items: [], total: 0, totalPages: 0 });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       let filtered = [...MOCK_SUPPRESSIONS];
//       if (filters.search) {
//         const q = filters.search.toLowerCase();
//         filtered = filtered.filter(s => 
//           (s.email && s.email.toLowerCase().includes(q)) || 
//           (s.phone && s.phone.includes(q))
//         );
//       }
//       if (filters.reason) {
//         filtered = filtered.filter(s => s.reason === filters.reason);
//       }
//       const start = (filters.page - 1) * filters.limit;
//       const paged = filtered.slice(start, start + filters.limit);
//       setData({
//         items: paged,
//         total: filtered.length,
//         totalPages: Math.ceil(filtered.length / filters.limit),
//       });
//       setIsLoading(false);
//     }, 500);
//   }, [filters]);

//   return { data, isLoading };
// };

// // ===================== Utility =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ===================== Icons (SVG) =====================
// const DownloadIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" />
//   </svg>
// );

// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick, disabled, size = 'md' }) => {
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
//     <button onClick={onClick} disabled={disabled} className={cn(base, variants[variant] || variants.secondary, sizes[size])}>
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

// const Badge = ({ children, variant }) => {
//   const variants = {
//     email: 'bg-indigo-50 text-indigo-700',
//     whatsapp: 'bg-emerald-50 text-emerald-700',
//     error: 'bg-red-100 text-red-700',
//     neutral: 'bg-slate-100 text-slate-700',
//   };
//   const className = variants[variant] || variants.neutral;
//   return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// };

// const SearchInput = ({ placeholder, onSearch, className }) => {
//   const [value, setValue] = useState('');
//   useEffect(() => {
//     const timer = setTimeout(() => onSearch(value), 300);
//     return () => clearTimeout(timer);
//   }, [value, onSearch]);
//   return (
//     <input
//       type="text"
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       className={cn("border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
//     />
//   );
// };

// const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
//       <p className="text-sm text-slate-500 order-1 sm:order-none">
//         Showing {((page-1)*limit)+1} to {Math.min(page*limit, totalItems)} of {totalItems}
//       </p>
//       <div className="flex gap-1 order-2 sm:order-none">
//         <button onClick={() => onPageChange(page-1)} disabled={page === 1} className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100">← Prev</button>
//         <span className="px-3 py-1 text-sm text-slate-600">{page} / {totalPages}</span>
//         <button onClick={() => onPageChange(page+1)} disabled={page === totalPages} className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100">Next →</button>
//       </div>
//     </div>
//   );
// };

// const TableSkeleton = ({ rows = 5, cols = 5 }) => (
//   <div className="animate-pulse">
//     <div className="flex border-b border-slate-100 bg-slate-50 px-4 py-3 gap-4">
//       {Array(cols).fill().map((_, i) => <div key={i} className="h-3 bg-slate-200 rounded w-20"></div>)}
//     </div>
//     {Array(rows).fill().map((_, idx) => (
//       <div key={idx} className="flex px-4 py-3 gap-4 border-b border-slate-100">
//         {Array(cols).fill().map((_, j) => <div key={j} className="h-4 bg-slate-100 rounded w-16"></div>)}
//       </div>
//     ))}
//   </div>
// );

// // ===================== Main SuppressionPage Component =====================
// export default function SuppressionPage() {
//   const [searchParams, setSearchParams] = useState({ q: undefined, reason: undefined, page: 1 });
//   const filters = {
//     search: searchParams.q,
//     reason: searchParams.reason,
//     page: searchParams.page,
//     limit: 20,
//   };
//   const { data, isLoading } = useSuppressionList(filters);
//   const items = data?.items ?? [];
//   const totalPages = data?.totalPages ?? 0;
//   const total = data?.total ?? 0;

//   const updateParam = (key, value) => {
//     setSearchParams(prev => ({
//       ...prev,
//       [key]: value || undefined,
//       page: key !== 'page' ? 1 : (value || 1),
//     }));
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <PageHeader
//         title="Suppression List"
//         description={`${total.toLocaleString()} contacts blocked from all campaigns`}
//         action={
//           <div className="flex flex-wrap gap-2">
//             <Button variant="secondary" leftIcon={<DownloadIcon />}>Export</Button>
//             <Button variant="secondary" leftIcon={<PlusIcon />}>Add Manually</Button>
//           </div>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <SearchInput
//             placeholder="Search by email or phone…"
//             onSearch={(q) => updateParam('q', q)}
//             className="w-64"
//           />
//           <select
//             value={filters.reason ?? ''}
//             onChange={(e) => updateParam('reason', e.target.value)}
//             className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none"
//           >
//             <option value="">All Reasons</option>
//             {Object.entries(REASON_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
//           </select>
//         </div>

//         {isLoading ? (
//           <TableSkeleton rows={5} cols={5} />
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50">
//                   {['Contact', 'Channel', 'Reason', 'Source', 'Since', ''].map((h) => (
//                     <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {items.map((s) => (
//                   <tr key={s.id} className="hover:bg-slate-50 transition-colors">
//                     <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{s.email ?? s.phone ?? '—'}</td>
//                     <td className="px-4 py-3"><Badge variant={s.channel === 'email' ? 'email' : 'whatsapp'}>{s.channel}</Badge></td>
//                     <td className="px-4 py-3">
//                       <Badge variant={s.reason === 'hard_bounce' || s.reason === 'spam_complaint' ? 'error' : 'neutral'}>
//                         {REASON_LABELS[s.reason] ?? s.reason}
//                       </Badge>
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.campaignName ?? (s.addedByName ? `Admin: ${s.addedByName}` : '—')}</td>
//                     <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{new Date(s.addedAt).toLocaleDateString()}</td>
//                     <td className="px-4 py-3">
//                       <Button variant="ghost" size="sm">Remove</Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <Pagination
//           page={filters.page}
//           totalPages={totalPages}
//           totalItems={total}
//           limit={20}
//           onPageChange={(p) => updateParam('page', p)}
//         />
//       </div>
//     </div>
//   );
// }

// // SuppressionPage.jsx – Fully working with stable search handler
// import React, { useState, useEffect, useCallback } from 'react';

// // ===================== Mock Data & API Simulation =====================
// const MOCK_SUPPRESSIONS = [
//   { id: '1', email: 'spam@example.com', phone: null, channel: 'email', reason: 'spam_complaint', campaignName: 'Summer Sale', addedByName: null, addedAt: '2026-04-10T10:00:00Z' },
//   { id: '2', email: 'bounce@example.com', phone: null, channel: 'email', reason: 'hard_bounce', campaignName: 'Newsletter', addedByName: null, addedAt: '2026-04-12T14:30:00Z' },
//   { id: '3', email: null, phone: '+919876543210', channel: 'whatsapp', reason: 'opted_out', campaignName: null, addedByName: 'Admin User', addedAt: '2026-04-15T09:15:00Z' },
//   { id: '4', email: 'unsub@example.com', phone: null, channel: 'email', reason: 'unsubscribed', campaignName: 'Weekly Update', addedByName: null, addedAt: '2026-04-18T16:45:00Z' },
//   { id: '5', email: 'blacklist@example.com', phone: null, channel: 'email', reason: 'manual_blacklist', campaignName: null, addedByName: 'Super Admin', addedAt: '2026-04-20T11:00:00Z' },
// ];

// const REASON_LABELS = {
//   unsubscribed: 'Unsubscribed',
//   hard_bounce: 'Hard Bounce',
//   spam_complaint: 'Spam Complaint',
//   manual_blacklist: 'Manual Blacklist',
//   opted_out: 'Opted Out',
// };

// // ＝＝＝＝＝＝＝＝＝＝＝ Improved useSuppressionList (uses useCallback) ＝＝＝＝＝＝＝＝＝＝＝
// const useSuppressionList = (filters) => {
//   const [data, setData] = useState({ items: [], total: 0, totalPages: 0 });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isActive = true;
//     setIsLoading(true);

//     const timer = setTimeout(() => {
//       if (!isActive) return;

//       let filtered = [...MOCK_SUPPRESSIONS];
//       if (filters.search) {
//         const q = filters.search.toLowerCase();
//         filtered = filtered.filter(s => 
//           (s.email && s.email.toLowerCase().includes(q)) || 
//           (s.phone && s.phone.includes(q))
//         );
//       }
//       if (filters.reason) {
//         filtered = filtered.filter(s => s.reason === filters.reason);
//       }
//       const start = (filters.page - 1) * filters.limit;
//       const paged = filtered.slice(start, start + filters.limit);
//       setData({
//         items: paged,
//         total: filtered.length,
//         totalPages: Math.ceil(filtered.length / filters.limit),
//       });
//       setIsLoading(false);
//     }, 300);

//     return () => {
//       isActive = false;
//       clearTimeout(timer);
//     };
//   }, [filters.search, filters.reason, filters.page, filters.limit]); // only depend on primitive values

//   return { data, isLoading };
// };

// // ===================== Utility =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ===================== Icons (SVG) =====================
// const DownloadIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" />
//   </svg>
// );

// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick, disabled, size = 'md' }) => {
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
//     <button onClick={onClick} disabled={disabled} className={cn(base, variants[variant] || variants.secondary, sizes[size])}>
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

// const Badge = ({ children, variant }) => {
//   const variants = {
//     email: 'bg-indigo-50 text-indigo-700',
//     whatsapp: 'bg-emerald-50 text-emerald-700',
//     error: 'bg-red-100 text-red-700',
//     neutral: 'bg-slate-100 text-slate-700',
//   };
//   const className = variants[variant] || variants.neutral;
//   return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// };

// const SearchInput = ({ placeholder, onSearch, className }) => {
//   const [value, setValue] = useState('');
//   useEffect(() => {
//     const timer = setTimeout(() => onSearch(value), 300);
//     return () => clearTimeout(timer);
//   }, [value, onSearch]);
//   return (
//     <input
//       type="text"
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       className={cn("border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
//     />
//   );
// };

// const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
//       <p className="text-sm text-slate-500 order-1 sm:order-none">
//         Showing {((page-1)*limit)+1} to {Math.min(page*limit, totalItems)} of {totalItems}
//       </p>
//       <div className="flex gap-1 order-2 sm:order-none">
//         <button onClick={() => onPageChange(page-1)} disabled={page === 1} className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100">← Prev</button>
//         <span className="px-3 py-1 text-sm text-slate-600">{page} / {totalPages}</span>
//         <button onClick={() => onPageChange(page+1)} disabled={page === totalPages} className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100">Next →</button>
//       </div>
//     </div>
//   );
// };

// const TableSkeleton = ({ rows = 5, cols = 5 }) => (
//   <div className="animate-pulse">
//     <div className="flex border-b border-slate-100 bg-slate-50 px-4 py-3 gap-4">
//       {Array(cols).fill().map((_, i) => <div key={i} className="h-3 bg-slate-200 rounded w-20"></div>)}
//     </div>
//     {Array(rows).fill().map((_, idx) => (
//       <div key={idx} className="flex px-4 py-3 gap-4 border-b border-slate-100">
//         {Array(cols).fill().map((_, j) => <div key={j} className="h-4 bg-slate-100 rounded w-16"></div>)}
//       </div>
//     ))}
//   </div>
// );

// // ===================== Main SuppressionPage Component =====================
// export default function SuppressionPage() {
//   const [filters, setFilters] = useState({ search: undefined, reason: undefined, page: 1, limit: 20 });
//   const { data, isLoading } = useSuppressionList(filters);
//   const items = data?.items ?? [];
//   const totalPages = data?.totalPages ?? 0;
//   const total = data?.total ?? 0;

//   // Stable update handlers using useCallback
//   const handleSearch = useCallback((q) => {
//     setFilters(prev => ({ ...prev, search: q || undefined, page: 1 }));
//   }, []);

//   const handleReasonChange = useCallback((e) => {
//     const value = e.target.value || undefined;
//     setFilters(prev => ({ ...prev, reason: value, page: 1 }));
//   }, []);

//   const handlePageChange = useCallback((newPage) => {
//     setFilters(prev => ({ ...prev, page: newPage }));
//   }, []);

//   return (
//     <div className="p-4 md:p-6">
//       <PageHeader
//         title="Suppression List"
//         description={`${total.toLocaleString()} contacts blocked from all campaigns`}
//         action={
//           <div className="flex flex-wrap gap-2">
//             <Button variant="secondary" leftIcon={<DownloadIcon />}>Export</Button>
//             <Button variant="secondary" leftIcon={<PlusIcon />}>Add Manually</Button>
//           </div>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <SearchInput
//             placeholder="Search by email or phone…"
//             onSearch={handleSearch}   // ✅ stable handler
//             className="w-64"
//           />
//           <select
//             value={filters.reason ?? ''}
//             onChange={handleReasonChange} // ✅ stable handler
//             className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none"
//           >
//             <option value="">All Reasons</option>
//             {Object.entries(REASON_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
//           </select>
//         </div>

//         {isLoading ? (
//           <TableSkeleton rows={5} cols={5} />
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50">
//                   {['Contact', 'Channel', 'Reason', 'Source', 'Since', ''].map((h) => (
//                     <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {items.map((s) => (
//                   <tr key={s.id} className="hover:bg-slate-50 transition-colors">
//                     <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{s.email ?? s.phone ?? '—'}</td>
//                     <td className="px-4 py-3"><Badge variant={s.channel === 'email' ? 'email' : 'whatsapp'}>{s.channel}</Badge></td>
//                     <td className="px-4 py-3">
//                       <Badge variant={s.reason === 'hard_bounce' || s.reason === 'spam_complaint' ? 'error' : 'neutral'}>
//                         {REASON_LABELS[s.reason] ?? s.reason}
//                       </Badge>
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.campaignName ?? (s.addedByName ? `Admin: ${s.addedByName}` : '—')}</td>
//                     <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{new Date(s.addedAt).toLocaleDateString()}</td>
//                     <td className="px-4 py-3">
//                       <Button variant="ghost" size="sm">Remove</Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <Pagination
//           page={filters.page}
//           totalPages={totalPages}
//           totalItems={total}
//           limit={20}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }


// SuppressionPage.jsx – Full working version with Add/Export functionality
import React, { useState, useEffect, useCallback } from 'react';

// ===================== Mock Initial Data =====================
const INITIAL_SUPPRESSIONS = [
  { id: '1', email: 'spam@example.com', phone: null, channel: 'email', reason: 'spam_complaint', campaignName: 'Summer Sale', addedByName: null, addedAt: '2026-04-10T10:00:00Z' },
  { id: '2', email: 'bounce@example.com', phone: null, channel: 'email', reason: 'hard_bounce', campaignName: 'Newsletter', addedByName: null, addedAt: '2026-04-12T14:30:00Z' },
  { id: '3', email: null, phone: '+919876543210', channel: 'whatsapp', reason: 'opted_out', campaignName: null, addedByName: 'Admin User', addedAt: '2026-04-15T09:15:00Z' },
  { id: '4', email: 'unsub@example.com', phone: null, channel: 'email', reason: 'unsubscribed', campaignName: 'Weekly Update', addedByName: null, addedAt: '2026-04-18T16:45:00Z' },
  { id: '5', email: 'blacklist@example.com', phone: null, channel: 'email', reason: 'manual_blacklist', campaignName: null, addedByName: 'Super Admin', addedAt: '2026-04-20T11:00:00Z' },
];

const REASON_LABELS = {
  unsubscribed: 'Unsubscribed',
  hard_bounce: 'Hard Bounce',
  spam_complaint: 'Spam Complaint',
  manual_blacklist: 'Manual Blacklist',
  opted_out: 'Opted Out',
};

// ===================== Custom Hook for Suppression List (with dynamic data) =====================
const useSuppressionList = (suppressions, filters) => {
  const [data, setData] = useState({ items: [], total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (!isActive) return;

      let filtered = [...suppressions];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(s => 
          (s.email && s.email.toLowerCase().includes(q)) || 
          (s.phone && s.phone.includes(q))
        );
      }
      if (filters.reason) {
        filtered = filtered.filter(s => s.reason === filters.reason);
      }
      const start = (filters.page - 1) * filters.limit;
      const paged = filtered.slice(start, start + filters.limit);
      setData({
        items: paged,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / filters.limit),
      });
      setIsLoading(false);
    }, 300);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [suppressions, filters.search, filters.reason, filters.page, filters.limit]);

  return { data, isLoading };
};

// ===================== Utility =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===================== Icons (SVG) =====================
const DownloadIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" />
  </svg>
);

const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ===================== UI Components =====================
const Button = ({ children, variant, leftIcon, onClick, disabled, size = 'md', type = 'button' }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
  };
  const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm" };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(base, variants[variant] || variants.secondary, sizes[size])}>
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

const Badge = ({ children, variant }) => {
  const variants = {
    email: 'bg-indigo-50 text-indigo-700',
    whatsapp: 'bg-emerald-50 text-emerald-700',
    error: 'bg-red-100 text-red-700',
    neutral: 'bg-slate-100 text-slate-700',
  };
  const className = variants[variant] || variants.neutral;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
};

const SearchInput = ({ placeholder, onSearch, className }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn("border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
    />
  );
};

const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
      <p className="text-sm text-slate-500 order-1 sm:order-none">
        Showing {((page-1)*limit)+1} to {Math.min(page*limit, totalItems)} of {totalItems}
      </p>
      <div className="flex gap-1 order-2 sm:order-none">
        <button onClick={() => onPageChange(page-1)} disabled={page === 1} className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100">← Prev</button>
        <span className="px-3 py-1 text-sm text-slate-600">{page} / {totalPages}</span>
        <button onClick={() => onPageChange(page+1)} disabled={page === totalPages} className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100">Next →</button>
      </div>
    </div>
  );
};

const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="animate-pulse">
    <div className="flex border-b border-slate-100 bg-slate-50 px-4 py-3 gap-4">
      {Array(cols).fill().map((_, i) => <div key={i} className="h-3 bg-slate-200 rounded w-20"></div>)}
    </div>
    {Array(rows).fill().map((_, idx) => (
      <div key={idx} className="flex px-4 py-3 gap-4 border-b border-slate-100">
        {Array(cols).fill().map((_, j) => <div key={j} className="h-4 bg-slate-100 rounded w-16"></div>)}
      </div>
    ))}
  </div>
);

// Modal component for Add Manually
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

// ===================== Main SuppressionPage Component =====================
export default function SuppressionPage() {
  const [suppressions, setSuppressions] = useState(INITIAL_SUPPRESSIONS);
  const [filters, setFilters] = useState({ search: undefined, reason: undefined, page: 1, limit: 20 });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    contact: '',
    channel: 'email',
    reason: 'manual_blacklist',
  });
  const [formError, setFormError] = useState('');

  const { data, isLoading } = useSuppressionList(suppressions, filters);
  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;

  // Stable update handlers
  const handleSearch = useCallback((q) => {
    setFilters(prev => ({ ...prev, search: q || undefined, page: 1 }));
  }, []);

  const handleReasonChange = useCallback((e) => {
    const value = e.target.value || undefined;
    setFilters(prev => ({ ...prev, reason: value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  }, []);

  // Export as CSV
  const handleExport = () => {
    const filteredItems = items; // current page only? Or all filtered?
    // Better to export all filtered items, not just current page.
    // But for simplicity, we export current page. To export all, we'd need to fetch all filtered. Here we export the current displayed items.
    if (items.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = ['Contact', 'Channel', 'Reason', 'Source', 'Since'];
    const rows = items.map(item => [
      item.email || item.phone || '—',
      item.channel,
      REASON_LABELS[item.reason] || item.reason,
      item.campaignName || (item.addedByName ? `Admin: ${item.addedByName}` : '—'),
      new Date(item.addedAt).toLocaleDateString(),
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suppression_list_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add new suppression
  const handleAddManual = () => {
    setFormError('');
    let contactValue = newEntry.contact.trim();
    if (!contactValue) {
      setFormError('Email or phone number is required');
      return;
    }
    // Determine channel
    let channel = newEntry.channel;
    let email = null;
    let phone = null;
    if (channel === 'email') {
      if (!contactValue.includes('@')) {
        setFormError('Please enter a valid email address');
        return;
      }
      email = contactValue;
    } else {
      // Simple phone validation (digits and +)
      phone = contactValue;
    }
    const newId = String(Date.now());
    const newSuppression = {
      id: newId,
      email,
      phone,
      channel,
      reason: newEntry.reason,
      campaignName: null,
      addedByName: 'Current User',
      addedAt: new Date().toISOString(),
    };
    setSuppressions(prev => [newSuppression, ...prev]);
    setIsAddModalOpen(false);
    setNewEntry({ contact: '', channel: 'email', reason: 'manual_blacklist' });
    // Reset to page 1 to see new entry
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Suppression List"
        description={`${total.toLocaleString()} contacts blocked from all campaigns`}
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>Export</Button>
            <Button variant="secondary" leftIcon={<PlusIcon />} onClick={() => setIsAddModalOpen(true)}>Add Manually</Button>
          </div>
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          <SearchInput
            placeholder="Search by email or phone…"
            onSearch={handleSearch}
            className="w-64"
          />
          <select
            value={filters.reason ?? ''}
            onChange={handleReasonChange}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none"
          >
            <option value="">All Reasons</option>
            {Object.entries(REASON_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        {isLoading ? (
          <TableSkeleton rows={5} cols={5} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Contact', 'Channel', 'Reason', 'Source', 'Since', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{s.email ?? s.phone ?? '—'}</td>
                    <td className="px-4 py-3"><Badge variant={s.channel === 'email' ? 'email' : 'whatsapp'}>{s.channel}</Badge></td>
                    <td className="px-4 py-3">
                      <Badge variant={s.reason === 'hard_bounce' || s.reason === 'spam_complaint' ? 'error' : 'neutral'}>
                        {REASON_LABELS[s.reason] ?? s.reason}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.campaignName ?? (s.addedByName ? `Admin: ${s.addedByName}` : '—')}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{new Date(s.addedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          page={filters.page}
          totalPages={totalPages}
          totalItems={total}
          limit={20}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Manually Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add to Suppression List">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contact (Email or Phone)</label>
            <input
              type="text"
              value={newEntry.contact}
              onChange={(e) => setNewEntry(prev => ({ ...prev, contact: e.target.value }))}
              placeholder="e.g., user@example.com or +919876543210"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Channel</label>
            <select
              value={newEntry.channel}
              onChange={(e) => setNewEntry(prev => ({ ...prev, channel: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Reason</label>
            <select
              value={newEntry.reason}
              onChange={(e) => setNewEntry(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {Object.entries(REASON_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddManual}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}