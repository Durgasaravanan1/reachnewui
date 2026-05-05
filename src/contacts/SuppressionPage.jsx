


// // SuppressionPage.jsx – Exact UI matching screenshots (Plus Jakarta Sans font)
// import React, { useState, useEffect, useCallback, useMemo } from "react";

// /* ================= LOAD PLUS JAKARTA SANS (same as ContactsPage) ================= */
// const loadFont = () => {
//   if (!document.querySelector("#suppression-jakarta-font")) {
//     const link = document.createElement("link");
//     link.id = "suppression-jakarta-font";
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//   }
//   if (!document.querySelector("#suppression-font-style")) {
//     const style = document.createElement("style");
//     style.id = "suppression-font-style";
//     style.textContent = `
//       * { font-family: 'Plus Jakarta Sans', sans-serif; }
//       .suppression-heading {
//         font-family: 'Plus Jakarta Sans', sans-serif !important;
//         font-weight: 800 !important;
//         font-size: 26px !important;
//         line-height: 1.2 !important;
//         color: rgb(15, 23, 42) !important;
//         letter-spacing: -0.01em;
//       }
//       .table-header {
//         font-weight: 600 !important;
//         font-size: 12px !important;
//         letter-spacing: 0.5px !important;
//         color: #94a3b8 !important;
//         text-transform: uppercase;
//       }
//       .contact-text {
//         font-weight: 500 !important;
//         font-size: 14px !important;
//         color: #0f172a !important;
//       }
//       .remove-button {
//         font-weight: 600 !important;
//         font-size: 13px !important;
//       }
//       .badge-text {
//         font-weight: 600 !important;
//         font-size: 12px !important;
//       }
//       .source-text, .since-text {
//         font-weight: 400 !important;
//         font-size: 12px !important;
//         color: #94a3b8 !important;
//       }
//     `;
//     document.head.appendChild(style);
//   }
// };

// /* ================= MOCK DATA (exact from screenshot) ================= */
// const INITIAL_SUPPRESSIONS = [
//   {
//     id: "1",
//     contact: "ramesh.k@innodev.io",
//     channel: "Email",
//     reason: "Hard Bounce",
//     source: "April Newsletter",
//     since: "2026-04-20T10:00:00Z",
//   },
//   {
//     id: "2",
//     contact: "user@olddomain.com",
//     channel: "Email",
//     reason: "Unsubscribed",
//     source: "Q2 Product Launch",
//     since: "2026-04-18T14:30:00Z",
//   },
//   {
//     id: "3",
//     contact: "+91 98765 00123",
//     channel: "WhatsApp",
//     reason: "Opted Out",
//     source: "WhatsApp Flash Sale",
//     since: "2026-04-17T09:15:00Z",
//   },
//   {
//     id: "4",
//     contact: "nospam@example.net",
//     channel: "Email",
//     reason: "Spam Complaint",
//     source: "April Newsletter",
//     since: "2026-04-16T16:45:00Z",
//   },
//   {
//     id: "5",
//     contact: "blocked@competitor.com",
//     channel: "Email",
//     reason: "Manual Blacklist",
//     source: "Admin: Subramanian",
//     since: "2026-04-10T11:00:00Z",
//   },
// ];

// // Generate remaining to reach 1,870 total
// const generateRemainingSuppressions = () => {
//   const TOTAL = 1870;
//   const EXISTING = INITIAL_SUPPRESSIONS.length;
//   const REMAINING = TOTAL - EXISTING;
//   const reasons = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
//   const channels = ["Email", "WhatsApp"];
//   const sources = ["Newsletter", "Flash Sale", "Webinar", "Admin", "System"];
//   const emails = [
//     "user1@example.com", "contact2@domain.com", "mail3@test.org", "hello4@company.co",
//     "random5@gmail.com", "spam6@spam.com", "bounce7@bounce.net", "no8@reply.com",
//   ];
//   const phones = ["+91 99887 66554", "+91 77665 44332", "+91 88776 55443", "+91 99000 11223"];
  
//   const generated = [];
//   for (let i = 0; i < REMAINING; i++) {
//     const isEmail = Math.random() > 0.3;
//     const contact = isEmail
//       ? emails[i % emails.length]
//       : phones[i % phones.length];
//     generated.push({
//       id: `gen_${Date.now()}_${i}`,
//       contact,
//       channel: isEmail ? "Email" : "WhatsApp",
//       reason: reasons[i % reasons.length],
//       source: sources[i % sources.length] + (i % 3 === 0 ? " Campaign" : ""),
//       since: new Date(Date.now() - (i * 86400000)).toISOString(),
//     });
//   }
//   return generated;
// };

// const ALL_SUPPRESSIONS = [...INITIAL_SUPPRESSIONS, ...generateRemainingSuppressions()];

// /* ================= UTILS ================= */
// const cn = (...classes) => classes.filter(Boolean).join(" ");
// const formatDate = (dateStr) => {
//   const d = new Date(dateStr);
//   return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// };

// /* ================= ICONS (same as ContactsPage style) ================= */
// const DownloadIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
//   </svg>
// );
// const XIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
//   </svg>
// );
// const SearchIcon = () => (
//   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
//   </svg>
// );

// /* ================= UI COMPONENTS ================= */
// const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = "md" }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
//   };
//   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const Badge = ({ children, variant }) => {
//   const variantsMap = {
//     Email: "bg-indigo-50 text-indigo-700",
//     WhatsApp: "bg-emerald-50 text-emerald-700",
//     "Hard Bounce": "bg-red-100 text-red-700",
//     Unsubscribed: "bg-orange-100 text-orange-700",
//     "Opted Out": "bg-amber-100 text-amber-700",
//     "Spam Complaint": "bg-rose-100 text-rose-700",
//     "Manual Blacklist": "bg-slate-100 text-slate-700",
//   };
//   const className = variantsMap[variant] || "bg-slate-100 text-slate-700";
//   return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold badge-text ${className}`}>{children}</span>;
// };

// const SearchInput = ({ placeholder, onSearch, className }) => {
//   const [value, setValue] = useState("");
//   useEffect(() => {
//     const timer = setTimeout(() => onSearch(value), 300);
//     return () => clearTimeout(timer);
//   }, [value, onSearch]);
//   return (
//     <div className="relative">
//       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
//       />
//     </div>
//   );
// };

// const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
//       <p className="text-sm text-slate-500 font-medium">
//         Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems.toLocaleString()} suppressed contacts
//       </p>
//       <div className="flex gap-1">
//         <button
//           onClick={() => onPageChange(page - 1)}
//           disabled={page === 1}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
//         >
//           ← Prev
//         </button>
//         <span className="px-3 py-1 text-sm text-slate-600 font-medium">{page} / {totalPages}</span>
//         <button
//           onClick={() => onPageChange(page + 1)}
//           disabled={page === totalPages}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
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

// /* ================= MAIN PAGE ================= */
// export default function SuppressionPage() {
//   useEffect(loadFont, []);

//   const [suppressions, setSuppressions] = useState(ALL_SUPPRESSIONS);
//   const [search, setSearch] = useState("");
//   const [reasonFilter, setReasonFilter] = useState("");
//   const [channelFilter, setChannelFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   // Filter suppressions
//   const filtered = useMemo(() => {
//     let result = suppressions;
//     if (search) {
//       const q = search.toLowerCase();
//       result = result.filter(s => s.contact.toLowerCase().includes(q));
//     }
//     if (reasonFilter) {
//       result = result.filter(s => s.reason === reasonFilter);
//     }
//     if (channelFilter) {
//       result = result.filter(s => s.channel === channelFilter);
//     }
//     return result;
//   }, [suppressions, search, reasonFilter, channelFilter]);

//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, currentPage]);

//   // Reset page on filter change
//   useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

//   const handleRemove = (id) => {
//     setSuppressions(prev => prev.filter(s => s.id !== id));
//   };

//   const handleExport = () => {
//     if (filtered.length === 0) {
//       alert("No data to export");
//       return;
//     }
//     const headers = ["Contact", "Channel", "Reason", "Source", "Since"];
//     const rows = filtered.map(s => [
//       s.contact,
//       s.channel,
//       s.reason,
//       s.source,
//       formatDate(s.since),
//     ]);
//     const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `suppression_list_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Add manually modal state
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newContact, setNewContact] = useState("");
//   const [newChannel, setNewChannel] = useState("Email");
//   const [newReason, setNewReason] = useState("Manual Blacklist");
//   const [newSource, setNewSource] = useState("");
//   const [formError, setFormError] = useState("");

//   const handleAddManual = () => {
//     if (!newContact.trim()) {
//       setFormError("Contact is required");
//       return;
//     }
//     const newId = Date.now().toString();
//     const newEntry = {
//       id: newId,
//       contact: newContact.trim(),
//       channel: newChannel,
//       reason: newReason,
//       source: newSource.trim() || "Admin: Current User",
//       since: new Date().toISOString(),
//     };
//     setSuppressions(prev => [newEntry, ...prev]);
//     setIsAddModalOpen(false);
//     setNewContact("");
//     setNewChannel("Email");
//     setNewReason("Manual Blacklist");
//     setNewSource("");
//     setFormError("");
//     setCurrentPage(1);
//   };

//   const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
//   const channelOptions = ["Email", "WhatsApp"];

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
//         <div>
//           <h1 className="suppression-heading">Suppression List</h1>
//           <p className="text-sm text-slate-500 mt-1 font-medium">
//             {suppressions.length.toLocaleString()} contacts blocked from all campaigns
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
//             Export
//           </Button>
//           <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => setIsAddModalOpen(true)}>
//             Add Manually
//           </Button>
//         </div>
//       </div>

//       {/* MAIN CARD */}
//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         {/* FILTERS */}
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <SearchInput
//             placeholder="Search by email or phone..."
//             onSearch={setSearch}
//             className="w-64"
//           />
//           <select
//             value={reasonFilter}
//             onChange={(e) => setReasonFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"
//           >
//             <option value="">All Reasons</option>
//             {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
//           </select>
//           <select
//             value={channelFilter}
//             onChange={(e) => setChannelFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"
//           >
//             <option value="">All Channels</option>
//             {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
//           </select>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50">
//                 <th className="px-4 py-3 text-left table-header">CONTACT</th>
//                 <th className="px-4 py-3 text-left table-header">CHANNEL</th>
//                 <th className="px-4 py-3 text-left table-header">REASON</th>
//                 <th className="px-4 py-3 text-left table-header">SOURCE</th>
//                 <th className="px-4 py-3 text-left table-header">SINCE</th>
//                 <th className="px-4 py-3 text-left table-header"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {paginated.map(s => (
//                 <tr key={s.id} className="hover:bg-slate-50 transition-colors">
//                   <td className="px-4 py-3 contact-text">{s.contact}</td>
//                   <td className="px-4 py-3"><Badge variant={s.channel}>{s.channel}</Badge></td>
//                   <td className="px-4 py-3"><Badge variant={s.reason}>{s.reason}</Badge></td>
//                   <td className="px-4 py-3 source-text">{s.source}</td>
//                   <td className="px-4 py-3 since-text">{formatDate(s.since)}</td>
//                   <td className="px-4 py-3">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleRemove(s.id)}
//                       className="remove-button text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {paginated.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-12 text-slate-500">
//                     No suppressed contacts found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <Pagination
//           page={currentPage}
//           totalPages={totalPages}
//           totalItems={filtered.length}
//           limit={pageSize}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* ADD MANUALLY MODAL */}
//       <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add to Suppression List">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Contact (Email or Phone)</label>
//             <input
//               type="text"
//               value={newContact}
//               onChange={(e) => setNewContact(e.target.value)}
//               placeholder="e.g., user@example.com or +919876543210"
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Channel</label>
//             <select
//               value={newChannel}
//               onChange={(e) => setNewChannel(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             >
//               {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Reason</label>
//             <select
//               value={newReason}
//               onChange={(e) => setNewReason(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             >
//               {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Source (optional)</label>
//             <input
//               type="text"
//               value={newSource}
//               onChange={(e) => setNewSource(e.target.value)}
//               placeholder="e.g., Admin: Name or Campaign name"
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             />
//           </div>
//           {formError && <p className="text-sm text-red-600">{formError}</p>}
//           <div className="flex justify-end gap-2 pt-2">
//             <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
//             <Button variant="primary" onClick={handleAddManual}>Add to Suppression List</Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }



// // SuppressionPage.jsx – Exact UI, Tailwind only (no custom font loader)
// import React, { useState, useEffect, useMemo } from "react";

// /* ================= MOCK DATA ================= */
// const INITIAL_SUPPRESSIONS = [
//   {
//     id: "1",
//     contact: "ramesh.k@innodev.io",
//     channel: "Email",
//     reason: "Hard Bounce",
//     source: "April Newsletter",
//     since: "2026-04-20T10:00:00Z",
//   },
//   {
//     id: "2",
//     contact: "user@olddomain.com",
//     channel: "Email",
//     reason: "Unsubscribed",
//     source: "Q2 Product Launch",
//     since: "2026-04-18T14:30:00Z",
//   },
//   {
//     id: "3",
//     contact: "+91 98765 00123",
//     channel: "WhatsApp",
//     reason: "Opted Out",
//     source: "WhatsApp Flash Sale",
//     since: "2026-04-17T09:15:00Z",
//   },
//   {
//     id: "4",
//     contact: "nospam@example.net",
//     channel: "Email",
//     reason: "Spam Complaint",
//     source: "April Newsletter",
//     since: "2026-04-16T16:45:00Z",
//   },
//   {
//     id: "5",
//     contact: "blocked@competitor.com",
//     channel: "Email",
//     reason: "Manual Blacklist",
//     source: "Admin: Subramanian",
//     since: "2026-04-10T11:00:00Z",
//   },
// ];

// const generateRemainingSuppressions = () => {
//   const TOTAL = 1870;
//   const EXISTING = INITIAL_SUPPRESSIONS.length;
//   const REMAINING = TOTAL - EXISTING;
//   const reasons = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
//   const channels = ["Email", "WhatsApp"];
//   const sources = ["Newsletter", "Flash Sale", "Webinar", "Admin", "System"];
//   const emails = [
//     "user1@example.com", "contact2@domain.com", "mail3@test.org", "hello4@company.co",
//     "random5@gmail.com", "spam6@spam.com", "bounce7@bounce.net", "no8@reply.com",
//   ];
//   const phones = ["+91 99887 66554", "+91 77665 44332", "+91 88776 55443", "+91 99000 11223"];
  
//   const generated = [];
//   for (let i = 0; i < REMAINING; i++) {
//     const isEmail = Math.random() > 0.3;
//     const contact = isEmail
//       ? emails[i % emails.length]
//       : phones[i % phones.length];
//     generated.push({
//       id: `gen_${Date.now()}_${i}`,
//       contact,
//       channel: isEmail ? "Email" : "WhatsApp",
//       reason: reasons[i % reasons.length],
//       source: sources[i % sources.length] + (i % 3 === 0 ? " Campaign" : ""),
//       since: new Date(Date.now() - (i * 86400000)).toISOString(),
//     });
//   }
//   return generated;
// };

// const ALL_SUPPRESSIONS = [...INITIAL_SUPPRESSIONS, ...generateRemainingSuppressions()];

// /* ================= UTILS ================= */
// const cn = (...classes) => classes.filter(Boolean).join(" ");
// const formatDate = (dateStr) => {
//   const d = new Date(dateStr);
//   return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// };

// /* ================= ICONS ================= */
// const DownloadIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
//   </svg>
// );
// const XIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
//   </svg>
// );
// const SearchIcon = () => (
//   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
//   </svg>
// );

// /* ================= UI COMPONENTS ================= */
// const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = "md" }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
//   };
//   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const Badge = ({ children, variant }) => {
//   const variantsMap = {
//     Email: "bg-indigo-50 text-indigo-700",
//     WhatsApp: "bg-emerald-50 text-emerald-700",
//     "Hard Bounce": "bg-red-100 text-red-700",
//     Unsubscribed: "bg-orange-100 text-orange-700",
//     "Opted Out": "bg-amber-100 text-amber-700",
//     "Spam Complaint": "bg-rose-100 text-rose-700",
//     "Manual Blacklist": "bg-slate-100 text-slate-700",
//   };
//   const className = variantsMap[variant] || "bg-slate-100 text-slate-700";
//   return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// };

// const SearchInput = ({ placeholder, onSearch, className }) => {
//   const [value, setValue] = useState("");
//   useEffect(() => {
//     const timer = setTimeout(() => onSearch(value), 300);
//     return () => clearTimeout(timer);
//   }, [value, onSearch]);
//   return (
//     <div className="relative">
//       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
//       />
//     </div>
//   );
// };

// const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
//       <p className="text-sm text-slate-500 font-medium">
//         Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems.toLocaleString()} suppressed contacts
//       </p>
//       <div className="flex gap-1">
//         <button
//           onClick={() => onPageChange(page - 1)}
//           disabled={page === 1}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
//         >
//           ← Prev
//         </button>
//         <span className="px-3 py-1 text-sm text-slate-600 font-medium">{page} / {totalPages}</span>
//         <button
//           onClick={() => onPageChange(page + 1)}
//           disabled={page === totalPages}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
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

// /* ================= MAIN PAGE ================= */
// export default function SuppressionPage() {
//   const [suppressions, setSuppressions] = useState(ALL_SUPPRESSIONS);
//   const [search, setSearch] = useState("");
//   const [reasonFilter, setReasonFilter] = useState("");
//   const [channelFilter, setChannelFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   const filtered = useMemo(() => {
//     let result = suppressions;
//     if (search) {
//       const q = search.toLowerCase();
//       result = result.filter(s => s.contact.toLowerCase().includes(q));
//     }
//     if (reasonFilter) result = result.filter(s => s.reason === reasonFilter);
//     if (channelFilter) result = result.filter(s => s.channel === channelFilter);
//     return result;
//   }, [suppressions, search, reasonFilter, channelFilter]);

//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, currentPage]);

//   useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

//   const handleRemove = (id) => {
//     setSuppressions(prev => prev.filter(s => s.id !== id));
//   };

//   const handleExport = () => {
//     if (filtered.length === 0) {
//       alert("No data to export");
//       return;
//     }
//     const headers = ["Contact", "Channel", "Reason", "Source", "Since"];
//     const rows = filtered.map(s => [
//       s.contact,
//       s.channel,
//       s.reason,
//       s.source,
//       formatDate(s.since),
//     ]);
//     const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `suppression_list_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [newContact, setNewContact] = useState("");
//   const [newChannel, setNewChannel] = useState("Email");
//   const [newReason, setNewReason] = useState("Manual Blacklist");
//   const [newSource, setNewSource] = useState("");
//   const [formError, setFormError] = useState("");

//   const handleAddManual = () => {
//     if (!newContact.trim()) {
//       setFormError("Contact is required");
//       return;
//     }
//     const newId = Date.now().toString();
//     const newEntry = {
//       id: newId,
//       contact: newContact.trim(),
//       channel: newChannel,
//       reason: newReason,
//       source: newSource.trim() || "Admin: Current User",
//       since: new Date().toISOString(),
//     };
//     setSuppressions(prev => [newEntry, ...prev]);
//     setIsAddModalOpen(false);
//     setNewContact("");
//     setNewChannel("Email");
//     setNewReason("Manual Blacklist");
//     setNewSource("");
//     setFormError("");
//     setCurrentPage(1);
//   };

//   const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
//   const channelOptions = ["Email", "WhatsApp"];

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
//         <div>
//           <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.01em]">
//             Suppression List
//           </h1>
//           <p className="text-sm text-slate-500 mt-1 font-medium">
//             {suppressions.length.toLocaleString()} contacts blocked from all campaigns
//           </p>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
//             Export
//           </Button>
//           <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => setIsAddModalOpen(true)}>
//             Add Manually
//           </Button>
//         </div>
//       </div>

//       {/* MAIN CARD */}
//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         {/* FILTERS */}
//         <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4 border-b border-slate-100">
//           <SearchInput
//             placeholder="Search by email or phone..."
//             onSearch={setSearch}
//             className="w-full sm:w-64"
//           />
//           <select
//             value={reasonFilter}
//             onChange={(e) => setReasonFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
//           >
//             <option value="">All Reasons</option>
//             {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
//           </select>
//           <select
//             value={channelFilter}
//             onChange={(e) => setChannelFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
//           >
//             <option value="">All Channels</option>
//             {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
//           </select>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm min-w-[600px]">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50">
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CONTACT</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CHANNEL</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">REASON</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SOURCE</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SINCE</th>
//                 <th className="px-4 py-3 text-left"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {paginated.map(s => (
//                 <tr key={s.id} className="hover:bg-slate-50 transition-colors">
//                   <td className="px-4 py-3 font-medium text-sm text-slate-800 whitespace-nowrap">{s.contact}</td>
//                   <td className="px-4 py-3"><Badge variant={s.channel}>{s.channel}</Badge></td>
//                   <td className="px-4 py-3"><Badge variant={s.reason}>{s.reason}</Badge></td>
//                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.source}</td>
//                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{formatDate(s.since)}</td>
//                   <td className="px-4 py-3">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleRemove(s.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {paginated.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-12 text-slate-500">
//                     No suppressed contacts found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <Pagination
//           page={currentPage}
//           totalPages={totalPages}
//           totalItems={filtered.length}
//           limit={pageSize}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* ADD MANUALLY MODAL */}
//       <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add to Suppression List">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Contact (Email or Phone)</label>
//             <input
//               type="text"
//               value={newContact}
//               onChange={(e) => setNewContact(e.target.value)}
//               placeholder="e.g., user@example.com or +919876543210"
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Channel</label>
//             <select
//               value={newChannel}
//               onChange={(e) => setNewChannel(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             >
//               {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Reason</label>
//             <select
//               value={newReason}
//               onChange={(e) => setNewReason(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             >
//               {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Source (optional)</label>
//             <input
//               type="text"
//               value={newSource}
//               onChange={(e) => setNewSource(e.target.value)}
//               placeholder="e.g., Admin: Name or Campaign name"
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             />
//           </div>
//           {formError && <p className="text-sm text-red-600">{formError}</p>}
//           <div className="flex justify-end gap-2 pt-2">
//             <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
//             <Button variant="primary" onClick={handleAddManual}>Add to Suppression List</Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }



// SuppressionPage.jsx – with detail modal (click on row)
import React, { useState, useEffect, useMemo } from "react";

/* ================= MOCK DATA ================= */
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
const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

/* ================= ICONS ================= */
const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
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
const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const InfoIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const SourceIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4v16h16" />
    <path d="m4 20 8-8 4 4 8-8" />
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
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
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
        className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
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

// ── Contact Detail Modal Component ──
const SuppressionDetailModal = ({ entry, isOpen, onClose }) => {
  if (!isOpen || !entry) return null;

  const isEmail = entry.channel === "Email";
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <XIcon />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Suppressed Contact</h2>
            <p className="text-sm text-slate-500 mt-1">Blocked from all campaigns</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3">
              {isEmail ? <MailIcon /> : <PhoneIcon />}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</p>
                <p className="text-sm font-medium text-slate-800">{entry.contact}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <InfoIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Channel</p>
                <Badge variant={entry.channel}>{entry.channel}</Badge>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <InfoIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Reason</p>
                <Badge variant={entry.reason}>{entry.reason}</Badge>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <SourceIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Source</p>
                <p className="text-sm text-slate-700">{entry.source || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Since</p>
                <p className="text-sm text-slate-700">{formatDate(entry.since)} at {formatTime(entry.since)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
export default function SuppressionPage() {
  const [suppressions, setSuppressions] = useState(ALL_SUPPRESSIONS);
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Detail modal state
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = suppressions;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => s.contact.toLowerCase().includes(q));
    }
    if (reasonFilter) result = result.filter(s => s.reason === reasonFilter);
    if (channelFilter) result = result.filter(s => s.channel === channelFilter);
    return result;
  }, [suppressions, search, reasonFilter, channelFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

  const handleRemove = (id, e) => {
    e.stopPropagation();
    setSuppressions(prev => prev.filter(s => s.id !== id));
  };

  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setIsDetailModalOpen(true);
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.01em]">
            Suppression List
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {suppressions.length.toLocaleString()} contacts blocked from all campaigns
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4 border-b border-slate-100">
          <SearchInput
            placeholder="Search by email or phone..."
            onSearch={setSearch}
            className="w-full sm:w-64"
          />
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Reasons</option>
            {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Channels</option>
            {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CONTACT</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CHANNEL</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">REASON</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SOURCE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SINCE</th>
                <th className="px-4 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map(s => (
                <tr
                  key={s.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(s)}
                >
                  <td className="px-4 py-3 font-medium text-sm text-slate-800 whitespace-nowrap">{s.contact}</td>
                  <td className="px-4 py-3"><Badge variant={s.channel}>{s.channel}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={s.reason}>{s.reason}</Badge></td>
                  <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.source}</td>
                  <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{formatDate(s.since)}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleRemove(s.id, e)}
                      className="text-red-500 hover:text-red-700"
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

      {/* DETAIL MODAL */}
      <SuppressionDetailModal
        entry={selectedEntry}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}