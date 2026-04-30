


// // SuppressionPage.jsx – Full working version with Add/Export functionality
// import React, { useState, useEffect, useCallback } from 'react';

// // ===================== Mock Initial Data =====================
// const INITIAL_SUPPRESSIONS = [
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

// // ===================== Custom Hook for Suppression List (with dynamic data) =====================
// const useSuppressionList = (suppressions, filters) => {
//   const [data, setData] = useState({ items: [], total: 0, totalPages: 0 });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isActive = true;
//     setIsLoading(true);

//     const timer = setTimeout(() => {
//       if (!isActive) return;

//       let filtered = [...suppressions];
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
//   }, [suppressions, filters.search, filters.reason, filters.page, filters.limit]);

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

// const XIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick, disabled, size = 'md', type = 'button' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//   };
//   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm" };
//   return (
//     <button type={type} onClick={onClick} disabled={disabled} className={cn(base, variants[variant] || variants.secondary, sizes[size])}>
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

// // Modal component for Add Manually
// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
//         <div className="flex justify-between items-center px-6 py-4 border-b">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
//             <XIcon />
//           </button>
//         </div>
//         <div className="px-6 py-4">{children}</div>
//       </div>
//     </div>
//   );
// };

// // ===================== Main SuppressionPage Component =====================
// export default function SuppressionPage() {
//   const [suppressions, setSuppressions] = useState(INITIAL_SUPPRESSIONS);
//   const [filters, setFilters] = useState({ search: undefined, reason: undefined, page: 1, limit: 20 });
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newEntry, setNewEntry] = useState({
//     contact: '',
//     channel: 'email',
//     reason: 'manual_blacklist',
//   });
//   const [formError, setFormError] = useState('');

//   const { data, isLoading } = useSuppressionList(suppressions, filters);
//   const items = data?.items ?? [];
//   const totalPages = data?.totalPages ?? 0;
//   const total = data?.total ?? 0;

//   // Stable update handlers
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

//   // Export as CSV
//   const handleExport = () => {
//     const filteredItems = items; // current page only? Or all filtered?
//     // Better to export all filtered items, not just current page.
//     // But for simplicity, we export current page. To export all, we'd need to fetch all filtered. Here we export the current displayed items.
//     if (items.length === 0) {
//       alert('No data to export');
//       return;
//     }
//     const headers = ['Contact', 'Channel', 'Reason', 'Source', 'Since'];
//     const rows = items.map(item => [
//       item.email || item.phone || '—',
//       item.channel,
//       REASON_LABELS[item.reason] || item.reason,
//       item.campaignName || (item.addedByName ? `Admin: ${item.addedByName}` : '—'),
//       new Date(item.addedAt).toLocaleDateString(),
//     ]);
//     const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `suppression_list_${new Date().toISOString().slice(0,19)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Add new suppression
//   const handleAddManual = () => {
//     setFormError('');
//     let contactValue = newEntry.contact.trim();
//     if (!contactValue) {
//       setFormError('Email or phone number is required');
//       return;
//     }
//     // Determine channel
//     let channel = newEntry.channel;
//     let email = null;
//     let phone = null;
//     if (channel === 'email') {
//       if (!contactValue.includes('@')) {
//         setFormError('Please enter a valid email address');
//         return;
//       }
//       email = contactValue;
//     } else {
//       // Simple phone validation (digits and +)
//       phone = contactValue;
//     }
//     const newId = String(Date.now());
//     const newSuppression = {
//       id: newId,
//       email,
//       phone,
//       channel,
//       reason: newEntry.reason,
//       campaignName: null,
//       addedByName: 'Current User',
//       addedAt: new Date().toISOString(),
//     };
//     setSuppressions(prev => [newSuppression, ...prev]);
//     setIsAddModalOpen(false);
//     setNewEntry({ contact: '', channel: 'email', reason: 'manual_blacklist' });
//     // Reset to page 1 to see new entry
//     setFilters(prev => ({ ...prev, page: 1 }));
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <PageHeader
//         title="Suppression List"
//         description={`${total.toLocaleString()} contacts blocked from all campaigns`}
//         action={
//           <div className="flex flex-wrap gap-2">
//             <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>Export</Button>
//             <Button variant="secondary" leftIcon={<PlusIcon />} onClick={() => setIsAddModalOpen(true)}>Add Manually</Button>
//           </div>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <SearchInput
//             placeholder="Search by email or phone…"
//             onSearch={handleSearch}
//             className="w-64"
//           />
//           <select
//             value={filters.reason ?? ''}
//             onChange={handleReasonChange}
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

//       {/* Add Manually Modal */}
//       <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add to Suppression List">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Contact (Email or Phone)</label>
//             <input
//               type="text"
//               value={newEntry.contact}
//               onChange={(e) => setNewEntry(prev => ({ ...prev, contact: e.target.value }))}
//               placeholder="e.g., user@example.com or +919876543210"
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Channel</label>
//             <select
//               value={newEntry.channel}
//               onChange={(e) => setNewEntry(prev => ({ ...prev, channel: e.target.value }))}
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             >
//               <option value="email">Email</option>
//               <option value="whatsapp">WhatsApp</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Reason</label>
//             <select
//               value={newEntry.reason}
//               onChange={(e) => setNewEntry(prev => ({ ...prev, reason: e.target.value }))}
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             >
//               {Object.entries(REASON_LABELS).map(([value, label]) => (
//                 <option key={value} value={value}>{label}</option>
//               ))}
//             </select>
//           </div>
//           {formError && <p className="text-sm text-red-600">{formError}</p>}
//           <div className="flex justify-end gap-2 pt-2">
//             <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
//             <Button variant="primary" onClick={handleAddManual}>Add</Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }


// SuppressionPage.jsx – Exact UI matching screenshots (Plus Jakarta Sans font)
import React, { useState, useEffect, useCallback, useMemo } from "react";

/* ================= LOAD PLUS JAKARTA SANS (same as ContactsPage) ================= */
const loadFont = () => {
  if (!document.querySelector("#suppression-jakarta-font")) {
    const link = document.createElement("link");
    link.id = "suppression-jakarta-font";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (!document.querySelector("#suppression-font-style")) {
    const style = document.createElement("style");
    style.id = "suppression-font-style";
    style.textContent = `
      * { font-family: 'Plus Jakarta Sans', sans-serif; }
      .suppression-heading {
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        font-weight: 800 !important;
        font-size: 26px !important;
        line-height: 1.2 !important;
        color: rgb(15, 23, 42) !important;
        letter-spacing: -0.01em;
      }
      .table-header {
        font-weight: 600 !important;
        font-size: 12px !important;
        letter-spacing: 0.5px !important;
        color: #94a3b8 !important;
        text-transform: uppercase;
      }
      .contact-text {
        font-weight: 500 !important;
        font-size: 14px !important;
        color: #0f172a !important;
      }
      .remove-button {
        font-weight: 600 !important;
        font-size: 13px !important;
      }
      .badge-text {
        font-weight: 600 !important;
        font-size: 12px !important;
      }
      .source-text, .since-text {
        font-weight: 400 !important;
        font-size: 12px !important;
        color: #94a3b8 !important;
      }
    `;
    document.head.appendChild(style);
  }
};

/* ================= MOCK DATA (exact from screenshot) ================= */
const INITIAL_SUPPRESSIONS = [
  {
    id: "1",
    contact: "ramesh.k@innodev.io",
    channel: "Email",
    reason: "Hard Bounce",
    source: "April Newsletter",
    since: "2026-04-20T10:00:00Z",
  },
  {
    id: "2",
    contact: "user@olddomain.com",
    channel: "Email",
    reason: "Unsubscribed",
    source: "Q2 Product Launch",
    since: "2026-04-18T14:30:00Z",
  },
  {
    id: "3",
    contact: "+91 98765 00123",
    channel: "WhatsApp",
    reason: "Opted Out",
    source: "WhatsApp Flash Sale",
    since: "2026-04-17T09:15:00Z",
  },
  {
    id: "4",
    contact: "nospam@example.net",
    channel: "Email",
    reason: "Spam Complaint",
    source: "April Newsletter",
    since: "2026-04-16T16:45:00Z",
  },
  {
    id: "5",
    contact: "blocked@competitor.com",
    channel: "Email",
    reason: "Manual Blacklist",
    source: "Admin: Subramanian",
    since: "2026-04-10T11:00:00Z",
  },
];

// Generate remaining to reach 1,870 total
const generateRemainingSuppressions = () => {
  const TOTAL = 1870;
  const EXISTING = INITIAL_SUPPRESSIONS.length;
  const REMAINING = TOTAL - EXISTING;
  const reasons = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
  const channels = ["Email", "WhatsApp"];
  const sources = ["Newsletter", "Flash Sale", "Webinar", "Admin", "System"];
  const emails = [
    "user1@example.com", "contact2@domain.com", "mail3@test.org", "hello4@company.co",
    "random5@gmail.com", "spam6@spam.com", "bounce7@bounce.net", "no8@reply.com",
  ];
  const phones = ["+91 99887 66554", "+91 77665 44332", "+91 88776 55443", "+91 99000 11223"];
  
  const generated = [];
  for (let i = 0; i < REMAINING; i++) {
    const isEmail = Math.random() > 0.3;
    const contact = isEmail
      ? emails[i % emails.length]
      : phones[i % phones.length];
    generated.push({
      id: `gen_${Date.now()}_${i}`,
      contact,
      channel: isEmail ? "Email" : "WhatsApp",
      reason: reasons[i % reasons.length],
      source: sources[i % sources.length] + (i % 3 === 0 ? " Campaign" : ""),
      since: new Date(Date.now() - (i * 86400000)).toISOString(),
    });
  }
  return generated;
};

const ALL_SUPPRESSIONS = [...INITIAL_SUPPRESSIONS, ...generateRemainingSuppressions()];

/* ================= UTILS ================= */
const cn = (...classes) => classes.filter(Boolean).join(" ");
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/* ================= ICONS (same as ContactsPage style) ================= */
const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4v16m8-8H4" strokeLinecap="round" />
  </svg>
);
const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
  </svg>
);

/* ================= UI COMPONENTS ================= */
const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = "md" }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };
  const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const Badge = ({ children, variant }) => {
  const variantsMap = {
    Email: "bg-indigo-50 text-indigo-700",
    WhatsApp: "bg-emerald-50 text-emerald-700",
    "Hard Bounce": "bg-red-100 text-red-700",
    Unsubscribed: "bg-orange-100 text-orange-700",
    "Opted Out": "bg-amber-100 text-amber-700",
    "Spam Complaint": "bg-rose-100 text-rose-700",
    "Manual Blacklist": "bg-slate-100 text-slate-700",
  };
  const className = variantsMap[variant] || "bg-slate-100 text-slate-700";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold badge-text ${className}`}>{children}</span>;
};

const SearchInput = ({ placeholder, onSearch, className }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
      />
    </div>
  );
};

const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
      <p className="text-sm text-slate-500 font-medium">
        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems.toLocaleString()} suppressed contacts
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
        >
          ← Prev
        </button>
        <span className="px-3 py-1 text-sm text-slate-600 font-medium">{page} / {totalPages}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
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

/* ================= MAIN PAGE ================= */
export default function SuppressionPage() {
  useEffect(loadFont, []);

  const [suppressions, setSuppressions] = useState(ALL_SUPPRESSIONS);
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter suppressions
  const filtered = useMemo(() => {
    let result = suppressions;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => s.contact.toLowerCase().includes(q));
    }
    if (reasonFilter) {
      result = result.filter(s => s.reason === reasonFilter);
    }
    if (channelFilter) {
      result = result.filter(s => s.channel === channelFilter);
    }
    return result;
  }, [suppressions, search, reasonFilter, channelFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  // Reset page on filter change
  useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

  const handleRemove = (id) => {
    setSuppressions(prev => prev.filter(s => s.id !== id));
  };

  const handleExport = () => {
    if (filtered.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ["Contact", "Channel", "Reason", "Source", "Since"];
    const rows = filtered.map(s => [
      s.contact,
      s.channel,
      s.reason,
      s.source,
      formatDate(s.since),
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `suppression_list_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add manually modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newContact, setNewContact] = useState("");
  const [newChannel, setNewChannel] = useState("Email");
  const [newReason, setNewReason] = useState("Manual Blacklist");
  const [newSource, setNewSource] = useState("");
  const [formError, setFormError] = useState("");

  const handleAddManual = () => {
    if (!newContact.trim()) {
      setFormError("Contact is required");
      return;
    }
    const newId = Date.now().toString();
    const newEntry = {
      id: newId,
      contact: newContact.trim(),
      channel: newChannel,
      reason: newReason,
      source: newSource.trim() || "Admin: Current User",
      since: new Date().toISOString(),
    };
    setSuppressions(prev => [newEntry, ...prev]);
    setIsAddModalOpen(false);
    setNewContact("");
    setNewChannel("Email");
    setNewReason("Manual Blacklist");
    setNewSource("");
    setFormError("");
    setCurrentPage(1);
  };

  const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
  const channelOptions = ["Email", "WhatsApp"];

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="suppression-heading">Suppression List</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {suppressions.length.toLocaleString()} contacts blocked from all campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
            Export
          </Button>
          <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => setIsAddModalOpen(true)}>
            Add Manually
          </Button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          <SearchInput
            placeholder="Search by email or phone..."
            onSearch={setSearch}
            className="w-64"
          />
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"
          >
            <option value="">All Reasons</option>
            {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"
          >
            <option value="">All Channels</option>
            {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left table-header">CONTACT</th>
                <th className="px-4 py-3 text-left table-header">CHANNEL</th>
                <th className="px-4 py-3 text-left table-header">REASON</th>
                <th className="px-4 py-3 text-left table-header">SOURCE</th>
                <th className="px-4 py-3 text-left table-header">SINCE</th>
                <th className="px-4 py-3 text-left table-header"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 contact-text">{s.contact}</td>
                  <td className="px-4 py-3"><Badge variant={s.channel}>{s.channel}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={s.reason}>{s.reason}</Badge></td>
                  <td className="px-4 py-3 source-text">{s.source}</td>
                  <td className="px-4 py-3 since-text">{formatDate(s.since)}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(s.id)}
                      className="remove-button text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-500">
                    No suppressed contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          limit={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ADD MANUALLY MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add to Suppression List">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contact (Email or Phone)</label>
            <input
              type="text"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              placeholder="e.g., user@example.com or +919876543210"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Channel</label>
            <select
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Reason</label>
            <select
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Source (optional)</label>
            <input
              type="text"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              placeholder="e.g., Admin: Name or Campaign name"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddManual}>Add to Suppression List</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}