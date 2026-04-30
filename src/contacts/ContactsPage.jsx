

// import React, { useState, useMemo, useEffect } from "react";

// /* ─────────────────────────────────────────────────────────────────
//    TAILWIND CONFIG – make sure 'Plus Jakarta Sans' is set as default font
// ───────────────────────────────────────────────────────────────── */

// /* ─── AVATAR COLORS ─────────────────────────────────────────────── */
// const AVATAR_COLORS = [
//   ["#4f46e5", "#7c3aed"],
//   ["#7c3aed", "#a855f7"],
//   ["#f59e0b", "#d97706"],
//   ["#ef4444", "#dc2626"],
//   ["#0ea5e9", "#06b6d4"],
//   ["#10b981", "#059669"],
// ];

// /* ─── SEED DATA (exact counts 28,450 total · 26,580 active · 1,870 suppressed) ─── */
// const PREDEFINED = [
//   { id: "1", fullName: "Ananya Rajesh",  email: "ananya.rajesh@techvista.in",    phone: "+91 98765 43210", status: "active", tags: ["vip", "b2b"],   score: 84, list: "Active Customers", campaign: "April Newsletter",    ci: 0 },
//   { id: "2", fullName: "Pradeep Mehta",  email: "p.mehta@blueaxis.com",          phone: "+91 87654 32109", status: "active", tags: ["enterprise"],   score: 62, list: "All Subscribers",  campaign: "Q2 Product Launch",  ci: 1 },
//   { id: "3", fullName: "Sunita Nair",    email: "sunita@growfast.co",            phone: "+91 76543 21098", status: "active", tags: ["trial"],        score: 38, list: "Trial Users",      campaign: "April Newsletter",   ci: 2 },
//   { id: "4", fullName: "Ramesh Kumar",   email: "ramesh.k@innodev.io",           phone: "+91 65432 10987", status: "suppressed", tags: ["bounced"],  score:  0, list: "All Subscribers",  campaign: "Hard bounce",        ci: 3 },
//   { id: "5", fullName: "Kavitha Iyer",   email: "kavitha.iyer@nexustech.com",    phone: "+91 54321 09876", status: "active", tags: ["vip","partner"], score: 91, list: "VIP Customers",    campaign: "WhatsApp Flash Sale", ci: 4 },
//   { id: "6", fullName: "Vikram Sharma",  email: "v.sharma@stratbox.in",          phone: "+91 43210 98765", status: "active", tags: ["b2b"],          score: 55, list: "Active Customers", campaign: "April Newsletter",   ci: 5 },
//   { id: "7", fullName: "Priya Sharma",   email: "priya.sharmal@yahoo.com",       phone: "+91 99887 66554", status: "active", tags: ["lead"],         score: 21, list: "All Subscribers",  campaign: "Weekly Digest",      ci: 0 },
//   { id: "8", fullName: "Neha Sharma",    email: "neha.sharma3@company.co",       phone: "+91 88776 55443", status: "active", tags: ["cold"],         score: 23, list: "VIP Customers",    campaign: "Flash Sale",         ci: 1 },
// ];

// function buildFullDataset() {
//   const fns  = ["Amit","Priya","Rahul","Neha","Vijay","Sneha","Kunal","Divya","Manish","Pooja","Raj","Anjali","Suresh","Kirti","Manoj","Riya","Arjun","Deepa","Vinod","Lata"];
//   const lns  = ["Sharma","Verma","Gupta","Nair","Reddy","Patel","Singh","Kumar","Joshi","Menon"];
//   const doms = ["gmail.com","yahoo.com","outlook.com","company.co","tech.in"];
//   const camps = ["Weekly Digest","Product Update","Flash Sale","Newsletter","Webinar Invite","Renewal Notice","Onboarding Series"];
//   const listOpts = ["Active Customers","All Subscribers","Trial Users","VIP Customers"];
//   const tagPool  = ["customer","lead","hot","cold","partner","loyal","new","repeat"];
//   const suppTags = ["bounced","unsubscribed","marked-spam"];

//   const TOTAL = 28450, ACTIVE = 26580, SUPP = 1870;
//   const remaining  = TOTAL - PREDEFINED.length;
//   const needActive = ACTIVE - PREDEFINED.filter(c => c.status === "active").length;
//   const needSupp   = SUPP  - PREDEFINED.filter(c => c.status === "suppressed").length;

//   const extra = [];
//   for (let i = 0; i < remaining; i++) {
//     const fn  = fns[i % fns.length];
//     const ln  = lns[Math.floor(i / fns.length) % lns.length];
//     const stat = i < needActive ? "active" : i < needActive + needSupp ? "suppressed" : "active";
//     extra.push({
//       id: `g${i}`,
//       fullName: `${fn} ${ln}`,
//       email:    `${fn.toLowerCase()}.${ln.toLowerCase()}${i % 100}@${doms[i % doms.length]}`,
//       phone:    `+91 ${70000 + (i % 30000)} ${10000 + (i % 90000)}`,
//       status:   stat,
//       tags:     stat === "suppressed" ? [suppTags[i % suppTags.length]] : [tagPool[i % tagPool.length]],
//       score:    stat === "suppressed" ? i % 10 : 20 + (i % 80),
//       list:     listOpts[i % listOpts.length],
//       campaign: stat === "suppressed" ? "Hard bounce" : camps[i % camps.length],
//       ci:       i % AVATAR_COLORS.length,
//     });
//   }
//   return [...PREDEFINED, ...extra];
// }

// const ALL_CONTACTS = buildFullDataset();

// /* ─── ICONS ──────────────────────────────────────────────────────── */
// const SearchIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8" />
//     <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
//   </svg>
// );
// const UploadIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const ImportIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const ChevLeft = () => (
//   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const ChevRight = () => (
//   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const DotsIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
//     <circle cx="5" cy="12" r="2" />
//     <circle cx="12" cy="12" r="2" />
//     <circle cx="19" cy="12" r="2" />
//   </svg>
// );

// /* ─── SUB-COMPONENTS ─────────────────────────────────────────────── */
// const Avatar = ({ name, ci }) => {
//   const ini = (name || "?")
//     .split(" ")
//     .map(n => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
//   const [from, to] = AVATAR_COLORS[ci % AVATAR_COLORS.length];
//   return (
//     <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
//          style={{ background: `linear-gradient(135deg,${from},${to})` }}>
//       {ini}
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const active = status === "active";
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
//       ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
//       <span className="w-1.5 h-1.5 rounded-full bg-current" />
//       {active ? "Active" : "Suppressed"}
//     </span>
//   );
// };

// const TagChip = ({ label }) => (
//   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
//     {label}
//   </span>
// );

// const ListBadge = ({ list }) => (
//   <span className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white whitespace-nowrap">
//     {list}
//   </span>
// );

// const EngBar = ({ score }) => {
//   const cls = score >= 70 ? { bar: "bg-emerald-500", text: "text-emerald-600" }
//             : score >= 40 ? { bar: "bg-indigo-500",  text: "text-indigo-500"  }
//             : score > 0   ? { bar: "bg-amber-400",   text: "text-amber-500"   }
//             : { bar: "bg-slate-200",   text: "text-slate-400" };
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
//         <div className={`h-full rounded-full ${cls.bar}`} style={{ width: `${score}%` }} />
//       </div>
//       <span className={`text-xs font-black ${cls.text}`}>{score}</span>
//     </div>
//   );
// };

// /* ─── MAIN PAGE ──────────────────────────────────────────────────── */
// export default function ContactsPage() {
//   const [contacts, setContacts] = useState(ALL_CONTACTS);
//   const [search, setSearch] = useState("");
//   const [listFilter, setListFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [channelFilter, setChannelFilter] = useState("all");
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState(new Set());
//   const LIMIT = 10;

//   // Reset page when any filter changes
//   useEffect(() => setPage(1), [search, listFilter, statusFilter, channelFilter]);

//   // Filtered contacts – case-insensitive search on name, email, phone, tags
//   const filtered = useMemo(() => {
//     let result = contacts;
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter(c =>
//         c.fullName.toLowerCase().includes(q) ||
//         c.email.toLowerCase().includes(q) ||
//         c.phone.includes(q) ||
//         c.tags.some(tag => tag.toLowerCase().includes(q))
//       );
//     }
//     if (listFilter) result = result.filter(c => c.list === listFilter);
//     if (statusFilter) result = result.filter(c => c.status === statusFilter);
//     // Demo channel eligibility: "email" = all, "whatsapp" = engagement > 50
//     if (channelFilter === "whatsapp") result = result.filter(c => c.score > 50);
//     return result;
//   }, [contacts, search, listFilter, statusFilter, channelFilter]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
//   const currentPage = Math.min(page, totalPages);
//   const paginated = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

//   const activeCount = contacts.filter(c => c.status === "active").length;
//   const suppCount = contacts.filter(c => c.status === "suppressed").length;

//   // Selection handlers
//   const toggleRow = (id) => {
//     setSelected(prev => {
//       const newSet = new Set(prev);
//       newSet.has(id) ? newSet.delete(id) : newSet.add(id);
//       return newSet;
//     });
//   };
//   const toggleAll = (e) => {
//     if (e.target.checked) setSelected(new Set(paginated.map(c => c.id)));
//     else setSelected(new Set());
//   };
//   const clearSel = () => setSelected(new Set());
//   const allChecked = paginated.length > 0 && paginated.every(c => selected.has(c.id));

//   // Bulk actions (demo)
//   const handleExport = () => {
//     const headers = ["Full Name","Email","Phone","Status","Tags","Score","List","Campaign"];
//     const rows = filtered.map(c => [c.fullName, c.email, c.phone, c.status, c.tags.join(";"), c.score, c.list, c.campaign]);
//     const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
//     a.download = `contacts_${new Date().toISOString().slice(0,10)}.csv`;
//     a.click();
//   };
//   const handleImport = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = ".csv";
//     input.onchange = (e) => {
//       const file = e.target.files[0];
//       if (!file) return;
//       const reader = new FileReader();
//       reader.onload = (ev) => {
//         const lines = ev.target.result.split("\n").filter(l => l.trim());
//         if (lines.length < 2) { alert("Invalid CSV"); return; }
//         const hdrs = lines[0].split(",").map(h => h.replace(/"/g, "").trim());
//         const newC = [];
//         for (let i = 1; i < lines.length; i++) {
//           const vals = lines[i].split(",").map(v => v.replace(/"/g, "").trim());
//           const name = vals[hdrs.indexOf("Full Name")] || vals[0] || "Unknown";
//           const email = vals[hdrs.indexOf("Email")] || "";
//           if (name && email) newC.push({
//             id: `imp_${Date.now()}_${i}`,
//             fullName: name,
//             email,
//             phone: vals[hdrs.indexOf("Phone")] || "",
//             status: vals[hdrs.indexOf("Status")] || "active",
//             tags: (vals[hdrs.indexOf("Tags")] || "").split(";").filter(Boolean),
//             score: parseInt(vals[hdrs.indexOf("Score")]) || 50,
//             list: vals[hdrs.indexOf("List")] || "All Subscribers",
//             campaign: vals[hdrs.indexOf("Campaign")] || "—",
//             ci: 0,
//           });
//         }
//         if (newC.length) {
//           setContacts(prev => [...newC, ...prev]);
//           alert(`Imported ${newC.length} contacts`);
//         } else alert("No valid contacts found");
//       };
//       reader.readAsText(file);
//     };
//     input.click();
//   };
//   const handleAddToList = () => {
//     if (!selected.size) return alert("No contacts selected");
//     alert(`Add ${selected.size} contacts to list (demo)`);
//   };
//   const handleApplyTag = () => {
//     if (!selected.size) return alert("No contacts selected");
//     const tag = prompt("Enter tag name:");
//     if (tag?.trim()) {
//       setContacts(prev => prev.map(c => selected.has(c.id) ? { ...c, tags: [...c.tags, tag.trim()] } : c));
//       alert(`Tag "${tag.trim()}" applied to ${selected.size} contacts`);
//       clearSel();
//     }
//   };
//   const handleDelete = () => {
//     if (!selected.size) return alert("No contacts selected");
//     if (window.confirm(`Delete ${selected.size} contacts permanently?`)) {
//       setContacts(prev => prev.filter(c => !selected.has(c.id)));
//       clearSel();
//     }
//   };

//   // Pagination buttons
//   const pageButtons = useMemo(() => {
//     const btns = [];
//     if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) btns.push(i);
//     else {
//       btns.push(1);
//       if (currentPage > 3) btns.push("...");
//       for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
//       if (currentPage < totalPages - 2) btns.push("...");
//       btns.push(totalPages);
//     }
//     return btns;
//   }, [currentPage, totalPages]);

//   const startItem = (currentPage - 1) * LIMIT + 1;
//   const endItem = Math.min(currentPage * LIMIT, filtered.length);

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen font-[Plus_Jakarta_Sans]">
//       {/* HEADER */}
//       <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
//         <div>
//           <h1 className="text-[26px] font-extrabold text-slate-900 leading-[1.2] tracking-[-0.02em]">
//             All Contacts
//           </h1>
//           <p className="text-sm text-slate-400 mt-1 font-medium">
//             {contacts.length.toLocaleString()} total · {activeCount.toLocaleString()} active · {suppCount.toLocaleString()} suppressed
//           </p>
//         </div>
//         <div className="flex gap-2.5">
//           <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition">
//             <UploadIcon /> Export
//           </button>
//           <button onClick={handleImport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
//             <ImportIcon /> Import Contacts
//           </button>
//         </div>
//       </div>

//       {/* BULK ACTION BAR */}
//       {selected.size > 0 && (
//         <div className="flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-4">
//           <span className="text-sm font-bold text-indigo-700">{selected.size} selected</span>
//           <button onClick={handleAddToList} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Add to List</button>
//           <button onClick={handleApplyTag} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Apply Tag</button>
//           <button onClick={handleDelete} className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
//           <button onClick={clearSel} className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium">Clear</button>
//         </div>
//       )}

//       {/* CARD */}
//       <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//         {/* FILTERS */}
//         <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
//           {/* Search */}
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
//             <input
//               type="text"
//               placeholder="Search by name, email, phone or tag"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//             />
//           </div>
//           {/* List filter */}
//           <select value={listFilter} onChange={(e) => setListFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
//             <option value="">All Lists</option>
//             {["Active Customers","All Subscribers","Trial Users","VIP Customers"].map(l => <option key={l} value={l}>{l}</option>)}
//           </select>
//           {/* Status filter */}
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
//             <option value="">All Status</option>
//             <option value="active">Active</option>
//             <option value="suppressed">Suppressed</option>
//           </select>
//           {/* Channel filter */}
//           <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
//             <option value="all">All Channels</option>
//             <option value="email">Email eligible</option>
//             <option value="whatsapp">WhatsApp eligible</option>
//           </select>
//           <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50">
//                 <th className="px-4 py-3 w-10"><input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-indigo-600" /></th>
//                 {["CONTACT","LISTS","STATUS","TAGS","ENGAGEMENT","LAST CAMPAIGN",""].map(h => (
//                   <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {paginated.length === 0 ? (
//                 <tr><td colSpan={8} className="text-center py-16 text-slate-400 text-sm font-medium">No contacts found. Try adjusting your search or filters.</td></tr>
//               ) : (
//                 paginated.map(c => (
//                   <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
//                     <td className="px-4 py-3.5"><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} className="accent-indigo-600" /></td>
//                     <td className="px-4 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <Avatar name={c.fullName} ci={c.ci} />
//                         <div>
//                           <p className="font-bold text-slate-800 text-sm leading-tight">{c.fullName}</p>
//                           <p className="text-xs text-slate-400 font-medium mt-0.5">{c.email || c.phone || "—"}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3.5"><ListBadge list={c.list} /></td>
//                     <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
//                     <td className="px-4 py-3.5"><div className="flex gap-1.5 flex-wrap">{c.tags.slice(0,2).map(t => <TagChip key={t} label={t} />)}{c.tags.length > 2 && <TagChip label={`+${c.tags.length-2}`} />}</div></td>
//                     <td className="px-4 py-3.5"><EngBar score={c.score} /></td>
//                     <td className="px-4 py-3.5 text-sm text-slate-400 font-medium">{c.campaign || "—"}</td>
//                     <td className="px-3 py-3.5"><button className="text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg p-1.5"><DotsIcon /></button></td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
//           <p className="text-sm text-slate-400 font-medium">
//             Showing {filtered.length === 0 ? "0" : `${startItem}–${endItem}`} of {filtered.length.toLocaleString()} contacts
//           </p>
//           <div className="flex items-center gap-1">
//             <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={currentPage === 1}
//               className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
//               <ChevLeft />
//             </button>
//             {pageButtons.map((b, i) => b === "..." ? (
//               <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span>
//             ) : (
//               <button key={b} onClick={() => setPage(b)}
//                 className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all
//                   ${currentPage === b ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
//                 {b}
//               </button>
//             ))}
//             <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}
//               className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
//               <ChevRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useMemo, useEffect } from "react";

/* ─── AVATAR COLORS ─────────────────────────────────────────────── */
const AVATAR_COLORS = [
  ["#4f46e5", "#7c3aed"],
  ["#7c3aed", "#a855f7"],
  ["#f59e0b", "#d97706"],
  ["#ef4444", "#dc2626"],
  ["#0ea5e9", "#06b6d4"],
  ["#10b981", "#059669"],
];

/* ─── SEED DATA (exact counts 28,450 total · 26,580 active · 1,870 suppressed) ─── */
const PREDEFINED = [
  { id: "1", fullName: "Ananya Rajesh",  email: "ananya.rajesh@techvista.in",    phone: "+91 98765 43210", status: "active", tags: ["vip", "b2b"],   score: 84, list: "Active Customers", campaign: "April Newsletter",    ci: 0 },
  { id: "2", fullName: "Pradeep Mehta",  email: "p.mehta@blueaxis.com",          phone: "+91 87654 32109", status: "active", tags: ["enterprise"],   score: 62, list: "All Subscribers",  campaign: "Q2 Product Launch",  ci: 1 },
  { id: "3", fullName: "Sunita Nair",    email: "sunita@growfast.co",            phone: "+91 76543 21098", status: "active", tags: ["trial"],        score: 38, list: "Trial Users",      campaign: "April Newsletter",   ci: 2 },
  { id: "4", fullName: "Ramesh Kumar",   email: "ramesh.k@innodev.io",           phone: "+91 65432 10987", status: "suppressed", tags: ["bounced"],  score:  0, list: "All Subscribers",  campaign: "Hard bounce",        ci: 3 },
  { id: "5", fullName: "Kavitha Iyer",   email: "kavitha.iyer@nexustech.com",    phone: "+91 54321 09876", status: "active", tags: ["vip","partner"], score: 91, list: "VIP Customers",    campaign: "WhatsApp Flash Sale", ci: 4 },
  { id: "6", fullName: "Vikram Sharma",  email: "v.sharma@stratbox.in",          phone: "+91 43210 98765", status: "active", tags: ["b2b"],          score: 55, list: "Active Customers", campaign: "April Newsletter",   ci: 5 },
  { id: "7", fullName: "Priya Sharma",   email: "priya.sharmal@yahoo.com",       phone: "+91 99887 66554", status: "active", tags: ["lead"],         score: 21, list: "All Subscribers",  campaign: "Weekly Digest",      ci: 0 },
  { id: "8", fullName: "Neha Sharma",    email: "neha.sharma3@company.co",       phone: "+91 88776 55443", status: "active", tags: ["cold"],         score: 23, list: "VIP Customers",    campaign: "Flash Sale",         ci: 1 },
];

function buildFullDataset() {
  const fns  = ["Amit","Priya","Rahul","Neha","Vijay","Sneha","Kunal","Divya","Manish","Pooja","Raj","Anjali","Suresh","Kirti","Manoj","Riya","Arjun","Deepa","Vinod","Lata"];
  const lns  = ["Sharma","Verma","Gupta","Nair","Reddy","Patel","Singh","Kumar","Joshi","Menon"];
  const doms = ["gmail.com","yahoo.com","outlook.com","company.co","tech.in"];
  const camps = ["Weekly Digest","Product Update","Flash Sale","Newsletter","Webinar Invite","Renewal Notice","Onboarding Series"];
  const listOpts = ["Active Customers","All Subscribers","Trial Users","VIP Customers"];
  const tagPool  = ["customer","lead","hot","cold","partner","loyal","new","repeat"];
  const suppTags = ["bounced","unsubscribed","marked-spam"];

  const TOTAL = 28450, ACTIVE = 26580, SUPP = 1870;
  const remaining  = TOTAL - PREDEFINED.length;
  const needActive = ACTIVE - PREDEFINED.filter(c => c.status === "active").length;
  const needSupp   = SUPP  - PREDEFINED.filter(c => c.status === "suppressed").length;

  const extra = [];
  for (let i = 0; i < remaining; i++) {
    const fn  = fns[i % fns.length];
    const ln  = lns[Math.floor(i / fns.length) % lns.length];
    const stat = i < needActive ? "active" : i < needActive + needSupp ? "suppressed" : "active";
    extra.push({
      id: `g${i}`,
      fullName: `${fn} ${ln}`,
      email:    `${fn.toLowerCase()}.${ln.toLowerCase()}${i % 100}@${doms[i % doms.length]}`,
      phone:    `+91 ${70000 + (i % 30000)} ${10000 + (i % 90000)}`,
      status:   stat,
      tags:     stat === "suppressed" ? [suppTags[i % suppTags.length]] : [tagPool[i % tagPool.length]],
      score:    stat === "suppressed" ? i % 10 : 20 + (i % 80),
      list:     listOpts[i % listOpts.length],
      campaign: stat === "suppressed" ? "Hard bounce" : camps[i % camps.length],
      ci:       i % AVATAR_COLORS.length,
    });
  }
  return [...PREDEFINED, ...extra];
}

const ALL_CONTACTS = buildFullDataset();

/* ─── ICONS ──────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const UploadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ImportIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevLeft = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevRight = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DotsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

/* ─── SUB-COMPONENTS ─────────────────────────────────────────────── */
const Avatar = ({ name, ci }) => {
  const ini = (name || "?")
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const [from, to] = AVATAR_COLORS[ci % AVATAR_COLORS.length];
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ background: `linear-gradient(135deg,${from},${to})` }}
    >
      {ini}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const active = status === "active";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
      ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {active ? "Active" : "Suppressed"}
    </span>
  );
};

const TagChip = ({ label }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
    {label}
  </span>
);

const ListBadge = ({ list }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white whitespace-nowrap">
    {list}
  </span>
);

const EngBar = ({ score }) => {
  const cls = score >= 70 ? { bar: "bg-emerald-500", text: "text-emerald-600" }
            : score >= 40 ? { bar: "bg-indigo-500",  text: "text-indigo-500"  }
            : score > 0   ? { bar: "bg-amber-400",   text: "text-amber-500"   }
            : { bar: "bg-slate-200",   text: "text-slate-400" };
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full rounded-full ${cls.bar}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-black ${cls.text}`}>{score}</span>
    </div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────── */
export default function ContactsPage() {
  const [contacts, setContacts] = useState(ALL_CONTACTS);
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const LIMIT = 10;

  useEffect(() => setPage(1), [search, listFilter, statusFilter, channelFilter]);

  const filtered = useMemo(() => {
    let result = contacts;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    if (listFilter) result = result.filter(c => c.list === listFilter);
    if (statusFilter) result = result.filter(c => c.status === statusFilter);
    if (channelFilter === "whatsapp") result = result.filter(c => c.score > 50);
    return result;
  }, [contacts, search, listFilter, statusFilter, channelFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

  const activeCount = contacts.filter(c => c.status === "active").length;
  const suppCount = contacts.filter(c => c.status === "suppressed").length;

  const toggleRow = (id) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };
  const toggleAll = (e) => {
    if (e.target.checked) setSelected(new Set(paginated.map(c => c.id)));
    else setSelected(new Set());
  };
  const clearSel = () => setSelected(new Set());
  const allChecked = paginated.length > 0 && paginated.every(c => selected.has(c.id));

  const handleExport = () => {
    const headers = ["Full Name","Email","Phone","Status","Tags","Score","List","Campaign"];
    const rows = filtered.map(c => [c.fullName, c.email, c.phone, c.status, c.tags.join(";"), c.score, c.list, c.campaign]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `contacts_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const lines = ev.target.result.split("\n").filter(l => l.trim());
        if (lines.length < 2) { alert("Invalid CSV"); return; }
        const hdrs = lines[0].split(",").map(h => h.replace(/"/g, "").trim());
        const newC = [];
        for (let i = 1; i < lines.length; i++) {
          const vals = lines[i].split(",").map(v => v.replace(/"/g, "").trim());
          const name = vals[hdrs.indexOf("Full Name")] || vals[0] || "Unknown";
          const email = vals[hdrs.indexOf("Email")] || "";
          if (name && email) newC.push({
            id: `imp_${Date.now()}_${i}`,
            fullName: name,
            email,
            phone: vals[hdrs.indexOf("Phone")] || "",
            status: vals[hdrs.indexOf("Status")] || "active",
            tags: (vals[hdrs.indexOf("Tags")] || "").split(";").filter(Boolean),
            score: parseInt(vals[hdrs.indexOf("Score")]) || 50,
            list: vals[hdrs.indexOf("List")] || "All Subscribers",
            campaign: vals[hdrs.indexOf("Campaign")] || "—",
            ci: 0,
          });
        }
        if (newC.length) {
          setContacts(prev => [...newC, ...prev]);
          alert(`Imported ${newC.length} contacts`);
        } else alert("No valid contacts found");
      };
      reader.readAsText(file);
    };
    input.click();
  };
  const handleAddToList = () => {
    if (!selected.size) return alert("No contacts selected");
    alert(`Add ${selected.size} contacts to list (demo)`);
  };
  const handleApplyTag = () => {
    if (!selected.size) return alert("No contacts selected");
    const tag = prompt("Enter tag name:");
    if (tag?.trim()) {
      setContacts(prev => prev.map(c => selected.has(c.id) ? { ...c, tags: [...c.tags, tag.trim()] } : c));
      alert(`Tag "${tag.trim()}" applied to ${selected.size} contacts`);
      clearSel();
    }
  };
  const handleDelete = () => {
    if (!selected.size) return alert("No contacts selected");
    if (window.confirm(`Delete ${selected.size} contacts permanently?`)) {
      setContacts(prev => prev.filter(c => !selected.has(c.id)));
      clearSel();
    }
  };

  const pageButtons = useMemo(() => {
    const btns = [];
    if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) btns.push(i);
    else {
      btns.push(1);
      if (currentPage > 3) btns.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
      if (currentPage < totalPages - 2) btns.push("...");
      btns.push(totalPages);
    }
    return btns;
  }, [currentPage, totalPages]);

  const startItem = (currentPage - 1) * LIMIT + 1;
  const endItem = Math.min(currentPage * LIMIT, filtered.length);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-slate-900 leading-[1.2] tracking-[-0.02em]">
            All Contacts
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            {contacts.length.toLocaleString()} total · {activeCount.toLocaleString()} active · {suppCount.toLocaleString()} suppressed
          </p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition">
            <UploadIcon /> Export
          </button>
          <button onClick={handleImport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
            <ImportIcon /> Import Contacts
          </button>
        </div>
      </div>

      {/* BULK ACTION BAR */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-4">
          <span className="text-sm font-bold text-indigo-700">{selected.size} selected</span>
          <button onClick={handleAddToList} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Add to List</button>
          <button onClick={handleApplyTag} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Apply Tag</button>
          <button onClick={handleDelete} className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
          <button onClick={clearSel} className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium">Clear</button>
        </div>
      )}

      {/* CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search by name, email, phone or tag"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <select value={listFilter} onChange={(e) => setListFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
            <option value="">All Lists</option>
            {["Active Customers","All Subscribers","Trial Users","VIP Customers"].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suppressed">Suppressed</option>
          </select>
          <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
            <option value="all">All Channels</option>
            <option value="email">Email eligible</option>
            <option value="whatsapp">WhatsApp eligible</option>
          </select>
          <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 w-10"><input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-indigo-600" /></th>
                {["CONTACT","LISTS","STATUS","TAGS","ENGAGEMENT","LAST CAMPAIGN",""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-16 text-slate-400 text-sm font-medium">No contacts found. Try adjusting your search or filters.</td></tr>
              ) : (
                paginated.map(c => (
                  <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5"><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} className="accent-indigo-600" /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.fullName} ci={c.ci} />
                        <div>
                          <p className="font-bold text-slate-800 text-sm leading-tight">{c.fullName}</p>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{c.email || c.phone || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><ListBadge list={c.list} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3.5"><div className="flex gap-1.5 flex-wrap">{c.tags.slice(0,2).map(t => <TagChip key={t} label={t} />)}{c.tags.length > 2 && <TagChip label={`+${c.tags.length-2}`} />}</div></td>
                    <td className="px-4 py-3.5"><EngBar score={c.score} /></td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 font-medium">{c.campaign || "—"}</td>
                    <td className="px-3 py-3.5"><button className="text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg p-1.5"><DotsIcon /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-sm text-slate-400 font-medium">
            Showing {filtered.length === 0 ? "0" : `${startItem}–${endItem}`} of {filtered.length.toLocaleString()} contacts
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
              <ChevLeft />
            </button>
            {pageButtons.map((b, i) => b === "..." ? (
              <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span>
            ) : (
              <button key={b} onClick={() => setPage(b)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all
                  ${currentPage === b ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
                {b}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
              <ChevRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}