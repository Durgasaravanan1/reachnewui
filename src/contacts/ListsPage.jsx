


// // ListsPage.jsx – Exact UI from design (Audience Lists)
// import React, { useState, useEffect, useCallback, useRef } from 'react';

// /* ================= LOAD FONT (Plus Jakarta Sans) – same as ContactsPage ================= */
// const loadFont = () => {
//   if (!document.querySelector('#jakarta-font-lists')) {
//     const link = document.createElement('link');
//     link.id = 'jakarta-font-lists';
//     link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
//     link.rel = 'stylesheet';
//     document.head.appendChild(link);
//   }
//   if (!document.querySelector('#lists-font-style')) {
//     const style = document.createElement('style');
//     style.id = 'lists-font-style';
//     style.textContent = `
//       * { font-family: 'Plus Jakarta Sans', sans-serif; }
//       .lists-heading {
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
//       .list-name {
//         font-weight: 700 !important;
//         font-size: 14px !important;
//         color: #0f172a !important;
//       }
//       .list-description {
//         font-weight: 400 !important;
//         font-size: 12px !important;
//         color: #94a3b8 !important;
//       }
//       .stat-number {
//         font-weight: 600 !important;
//         font-size: 14px !important;
//         color: #334155 !important;
//       }
//       .campaign-badge {
//         font-weight: 600 !important;
//         font-size: 12px !important;
//       }
//       .date-text {
//         font-weight: 400 !important;
//         font-size: 12px !important;
//         color: #94a3b8 !important;
//       }
//       .button-text {
//         font-weight: 600 !important;
//         font-size: 14px !important;
//       }
//     `;
//     document.head.appendChild(style);
//   }
// };

// /* ================= MOCK DATA (based on screenshots) ================= */
// const MOCK_LISTS = [
//   {
//     id: '1',
//     listName: 'All Subscribers',
//     description: 'Main audience list',
//     contactCount: 26180,
//     emailEligible: 24840,
//     waEligible: 18920,
//     campaigns: 12,
//     lastUpdated: '2026-04-22T10:00:00Z',
//   },
//   {
//     id: '2',
//     listName: 'Active Customers',
//     description: 'Paid plan users',
//     contactCount: 8450,
//     emailEligible: 8200,
//     waEligible: 6100,
//     campaigns: 8,
//     lastUpdated: '2026-04-21T14:30:00Z',
//   },
//   {
//     id: '3',
//     listName: 'Trial Users',
//     description: 'Free trial, 14 days',
//     contactCount: 2310,
//     emailEligible: 2280,
//     waEligible: 1870,
//     campaigns: 4,
//     lastUpdated: '2026-04-22T09:15:00Z',
//   },
//   {
//     id: '4',
//     listName: 'Inactive (90+ days)',
//     description: 'Re-engagement candidates',
//     contactCount: 4220,
//     emailEligible: 4100,
//     waEligible: 3200,
//     campaigns: 2,
//     lastUpdated: '2026-04-18T16:45:00Z',
//   },
//   {
//     id: '5',
//     listName: 'VIP Customers',
//     description: 'High-value accounts',
//     contactCount: 890,
//     emailEligible: 890,
//     waEligible: 780,
//     campaigns: 6,
//     lastUpdated: '2026-04-19T11:20:00Z',
//   },
//   {
//     id: '6',
//     listName: 'Enterprise Accounts',
//     description: 'High-value accounts',
//     contactCount: 340,
//     emailEligible: 340,
//     waEligible: 290,
//     campaigns: 3,
//     lastUpdated: '2026-04-15T08:00:00Z',
//   },
// ];

// /* ================= UTILS ================= */
// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => num?.toLocaleString() || '0';
// const formatDate = (dateStr) => {
//   const d = new Date(dateStr);
//   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };

// /* ================= ICONS ================= */
// const PlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
//   </svg>
// );
// const SearchIcon = () => (
//   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
//   </svg>
// );
// const ArchiveIcon = () => (
//   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" strokeLinecap="round" />
//   </svg>
// );
// const TrashIcon = () => (
//   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
//   </svg>
// );

// /* ================= UI COMPONENTS ================= */
// const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = 'md' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
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

// const SearchInput = ({ value, onChange, placeholder }) => (
//   <div className="relative">
//     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//     />
//   </div>
// );

// const Modal = ({ open, onClose, title, children, footer }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
//         </div>
//         <div className="px-6 py-4">{children}</div>
//         {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">{footer}</div>}
//       </div>
//     </div>
//   );
// };

// const ConfirmModal = ({ open, onClose, onConfirm, title, message, isLoading }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">{title}</h3></div>
//         <div className="px-6 py-4"><p className="text-sm text-slate-600">{message}</p></div>
//         <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
//           <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
//           <Button variant="danger" onClick={onConfirm} loading={isLoading}>Confirm</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= MAIN PAGE ================= */
// export default function ListsPage() {
//   useEffect(() => loadFont(), []);

//   const [lists, setLists] = useState(MOCK_LISTS);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
//   const [selectedList, setSelectedList] = useState(null);
//   const [newListName, setNewListName] = useState('');
//   const [newListDesc, setNewListDesc] = useState('');
//   const [isCreating, setIsCreating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isArchiving, setIsArchiving] = useState(false);
//   const [formError, setFormError] = useState('');

//   // Filter lists based on search term
//   const filteredLists = lists.filter(list =>
//     list.listName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleCreateList = () => {
//     setIsCreateModalOpen(true);
//     setNewListName('');
//     setNewListDesc('');
//     setFormError('');
//   };

//   const handleCreateSubmit = async () => {
//     if (!newListName.trim()) {
//       setFormError('List name is required');
//       return;
//     }
//     setFormError('');
//     setIsCreating(true);
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 600));
//     const newList = {
//       id: Date.now().toString(),
//       listName: newListName.trim(),
//       description: newListDesc.trim() || '',
//       contactCount: 0,
//       emailEligible: 0,
//       waEligible: 0,
//       campaigns: 0,
//       lastUpdated: new Date().toISOString(),
//     };
//     setLists(prev => [newList, ...prev]);
//     setIsCreating(false);
//     setIsCreateModalOpen(false);
//   };

//   const handleDeleteClick = (list) => {
//     setSelectedList(list);
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!selectedList) return;
//     setIsDeleting(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     setLists(prev => prev.filter(l => l.id !== selectedList.id));
//     setIsDeleting(false);
//     setIsDeleteModalOpen(false);
//     setSelectedList(null);
//   };

//   const handleArchiveClick = (list) => {
//     setSelectedList(list);
//     setIsArchiveModalOpen(true);
//   };

//   const handleArchiveConfirm = async () => {
//     if (!selectedList) return;
//     setIsArchiving(true);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     setLists(prev => prev.filter(l => l.id !== selectedList.id));
//     setIsArchiving(false);
//     setIsArchiveModalOpen(false);
//     setSelectedList(null);
//   };

//   const totalLists = filteredLists.length;

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="lists-heading">Audience Lists</h1>
//           <p className="text-sm text-slate-500 mt-1 font-normal">Manage your contact lists and audience segments</p>
//         </div>
//         <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>
//           Create List
//         </Button>
//       </div>

//       {/* MAIN CARD */}
//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         {/* SEARCH BAR & COUNT */}
//         <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
//           <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search lists..." />
//           <span className="text-xs text-slate-400 font-medium">
//             {totalLists} list{totalLists !== 1 ? 's' : ''} found
//           </span>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50">
//                 <th className="px-4 py-3 text-left table-header">LIST NAME</th>
//                 <th className="px-4 py-3 text-left table-header">CONTACTS</th>
//                 <th className="px-4 py-3 text-left table-header">EMAIL ELIGIBLE</th>
//                 <th className="px-4 py-3 text-left table-header">WA ELIGIBLE</th>
//                 <th className="px-4 py-3 text-left table-header">CAMPAIGNS</th>
//                 <th className="px-4 py-3 text-left table-header">LAST UPDATED</th>
//                 <th className="px-4 py-3 text-left table-header"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredLists.map((list) => (
//                 <tr key={list.id} className="hover:bg-slate-50 transition-colors group">
//                   <td className="px-4 py-3">
//                     <p className="list-name">{list.listName}</p>
//                     {list.description && <p className="list-description mt-0.5">{list.description}</p>}
//                   </td>
//                   <td className="px-4 py-3 stat-number">{formatNumber(list.contactCount)}</td>
//                   <td className="px-4 py-3 stat-number">{formatNumber(list.emailEligible)}</td>
//                   <td className="px-4 py-3 stat-number">{formatNumber(list.waEligible)}</td>
//                   <td className="px-4 py-3">
//                     <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600 campaign-badge">
//                       {list.campaigns}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 date-text">{formatDate(list.lastUpdated)}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Button variant="ghost" size="icon" onClick={() => handleArchiveClick(list)} title="Archive list">
//                         <ArchiveIcon />
//                       </Button>
//                       <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(list)} title="Delete list">
//                         <TrashIcon />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {filteredLists.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center py-12">
//                     <p className="text-lg font-semibold text-slate-800">No lists found</p>
//                     <p className="text-sm text-slate-500 mt-1">
//                       {searchTerm ? `No results for "${searchTerm}"` : 'Create your first audience list'}
//                     </p>
//                     {!searchTerm && (
//                       <div className="mt-4">
//                         <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>
//                           Create List
//                         </Button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* CREATE LIST MODAL */}
//       <Modal
//         open={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         title="Create New List"
//         footer={
//           <>
//             <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating}>Cancel</Button>
//             <Button variant="primary" onClick={handleCreateSubmit} loading={isCreating}>Create List</Button>
//           </>
//         }
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">List Name</label>
//             <input
//               type="text"
//               value={newListName}
//               onChange={(e) => setNewListName(e.target.value)}
//               placeholder="e.g. Active Customers, Trial Users..."
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//               autoFocus
//             />
//             {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Description (optional)</label>
//             <input
//               type="text"
//               value={newListDesc}
//               onChange={(e) => setNewListDesc(e.target.value)}
//               placeholder="Describe the purpose of this list..."
//               className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//             />
//           </div>
//         </div>
//       </Modal>

//       {/* DELETE CONFIRM MODAL */}
//       <ConfirmModal
//         open={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={handleDeleteConfirm}
//         title="Delete List"
//         message={`Are you sure you want to delete "${selectedList?.listName}"? This action cannot be undone and will remove all contacts from this list.`}
//         isLoading={isDeleting}
//       />

//       {/* ARCHIVE CONFIRM MODAL */}
//       <ConfirmModal
//         open={isArchiveModalOpen}
//         onClose={() => setIsArchiveModalOpen(false)}
//         onConfirm={handleArchiveConfirm}
//         title="Archive List"
//         message={`Are you sure you want to archive "${selectedList?.listName}"? You can restore it later from the archived lists section.`}
//         isLoading={isArchiving}
//       />
//     </div>
//   );
// }


// ListsPage.jsx – Exact UI from design (Audience Lists) – Tailwind only
// ListsPage.jsx – Complete with Archive functionality
import React, { useState } from 'react';

/* ================= UTILS ================= */
const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => num?.toLocaleString() || '0';
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/* ================= ICONS ================= */
const PlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4v16m8-8H4" strokeLinecap="round" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
  </svg>
);
const ArchiveIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
  </svg>
);
const RestoreIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
    <path d="M12 8v4l3 3M12 8v4l-3 3" strokeLinecap="round" />
  </svg>
);

/* ================= MOCK DATA ================= */
const MOCK_LISTS = [
  {
    id: '1',
    listName: 'All Subscribers',
    description: 'Main audience list',
    contactCount: 26180,
    emailEligible: 24840,
    waEligible: 18920,
    campaigns: 12,
    lastUpdated: '2026-04-22T10:00:00Z',
  },
  {
    id: '2',
    listName: 'Active Customers',
    description: 'Paid plan users',
    contactCount: 8450,
    emailEligible: 8200,
    waEligible: 6100,
    campaigns: 8,
    lastUpdated: '2026-04-21T14:30:00Z',
  },
  {
    id: '3',
    listName: 'Trial Users',
    description: 'Free trial, 14 days',
    contactCount: 2310,
    emailEligible: 2280,
    waEligible: 1870,
    campaigns: 4,
    lastUpdated: '2026-04-22T09:15:00Z',
  },
  {
    id: '4',
    listName: 'Inactive (90+ days)',
    description: 'Re-engagement candidates',
    contactCount: 4220,
    emailEligible: 4100,
    waEligible: 3200,
    campaigns: 2,
    lastUpdated: '2026-04-18T16:45:00Z',
  },
  {
    id: '5',
    listName: 'VIP Customers',
    description: 'High-value accounts',
    contactCount: 890,
    emailEligible: 890,
    waEligible: 780,
    campaigns: 6,
    lastUpdated: '2026-04-19T11:20:00Z',
  },
  {
    id: '6',
    listName: 'Enterprise Accounts',
    description: 'Enterprise clients',
    contactCount: 340,
    emailEligible: 340,
    waEligible: 290,
    campaigns: 3,
    lastUpdated: '2026-04-15T08:00:00Z',
  },
];

/* ================= UI COMPONENTS ================= */
const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = 'md' }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
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

const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    />
  </div>
);

const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
};

const ConfirmModal = ({ open, onClose, onConfirm, title, message, isLoading }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-slate-600">{message}</p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} loading={isLoading}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
export default function ListsPage() {
  const [lists, setLists] = useState(MOCK_LISTS);
  const [archivedLists, setArchivedLists] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [formError, setFormError] = useState('');

  // Filter lists based on search term
  const filteredLists = lists.filter(list =>
    list.listName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredArchived = archivedLists.filter(list =>
    list.listName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateList = () => {
    setIsCreateModalOpen(true);
    setNewListName('');
    setNewListDesc('');
    setFormError('');
  };

  const handleCreateSubmit = async () => {
    if (!newListName.trim()) {
      setFormError('List name is required');
      return;
    }
    setFormError('');
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    const newList = {
      id: Date.now().toString(),
      listName: newListName.trim(),
      description: newListDesc.trim() || '',
      contactCount: 0,
      emailEligible: 0,
      waEligible: 0,
      campaigns: 0,
      lastUpdated: new Date().toISOString(),
    };
    setLists(prev => [newList, ...prev]);
    setIsCreating(false);
    setIsCreateModalOpen(false);
  };

  const handleDeleteClick = (list) => {
    setSelectedList(list);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedList) return;
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLists(prev => prev.filter(l => l.id !== selectedList.id));
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setSelectedList(null);
  };

  const handleArchiveClick = (list) => {
    setSelectedList(list);
    setIsArchiveModalOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (!selectedList) return;
    setIsArchiving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Move to archived lists
    setArchivedLists(prev => [...prev, { ...selectedList, archivedAt: new Date().toISOString() }]);
    setLists(prev => prev.filter(l => l.id !== selectedList.id));
    
    setIsArchiving(false);
    setIsArchiveModalOpen(false);
    setSelectedList(null);
  };

  const handleRestoreClick = (list) => {
    setSelectedList(list);
    setIsRestoreModalOpen(true);
  };

  const handleRestoreConfirm = async () => {
    if (!selectedList) return;
    setIsRestoring(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Move back to active lists
    setLists(prev => [...prev, { ...selectedList, archivedAt: undefined }]);
    setArchivedLists(prev => prev.filter(l => l.id !== selectedList.id));
    
    setIsRestoring(false);
    setIsRestoreModalOpen(false);
    setSelectedList(null);
  };

  const handlePermanentDelete = (list) => {
    if (confirm(`Permanently delete "${list.listName}"? This action cannot be undone.`)) {
      setArchivedLists(prev => prev.filter(l => l.id !== list.id));
    }
  };

  const totalLists = activeTab === 'active' ? filteredLists.length : filteredArchived.length;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.01em]">
            Audience Lists
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">Manage your contact lists and audience segments</p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>
          Create List
        </Button>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* TAB SWITCHER - Active / Archived */}
        <div className="border-b border-slate-100 px-6 pt-2">
          <div className="flex gap-6">
            <button
              onClick={() => {
                setActiveTab('active');
                setSearchTerm('');
              }}
              className={`px-1 py-2.5 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'active'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Active Lists ({lists.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('archived');
                setSearchTerm('');
              }}
              className={`px-1 py-2.5 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'archived'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Archived Lists ({archivedLists.length})
            </button>
          </div>
        </div>

        {/* SEARCH BAR & COUNT */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search lists..." />
          <span className="text-xs text-slate-400 font-medium">
            {totalLists} list{totalLists !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">LIST NAME</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CONTACTS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">EMAIL ELIGIBLE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">WA ELIGIBLE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CAMPAIGNS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">LAST UPDATED</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'active' ? (
                // ACTIVE LISTS - Show Archive and Delete buttons
                filteredLists.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <p className="text-base font-semibold text-slate-800">No active lists found</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {searchTerm ? `No results for "${searchTerm}"` : 'Create your first audience list'}
                      </p>
                      {!searchTerm && (
                        <div className="mt-4">
                          <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>
                            Create List
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredLists.map((list) => (
                    <tr key={list.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-sm text-slate-800">{list.listName}</p>
                        {list.description && <p className="text-xs text-slate-400 mt-0.5">{list.description}</p>}
                       </td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600">{formatNumber(list.contactCount)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600">{formatNumber(list.emailEligible)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600">{formatNumber(list.waEligible)}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600">
                          {list.campaigns}
                        </span>
                       </td>
                      <td className="px-4 py-3 text-xs text-slate-400">{formatDate(list.lastUpdated)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleArchiveClick(list)}
                            title="Archive list"
                          >
                            <ArchiveIcon />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteClick(list)}
                            title="Delete list"
                          >
                            <TrashIcon />
                          </Button>
                        </div>
                       </td>
                    </tr>
                  ))
                )
              ) : (
                // ARCHIVED LISTS - Show Restore and Permanent Delete buttons
                filteredArchived.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <p className="text-base font-semibold text-slate-800">No archived lists found</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {searchTerm ? `No results for "${searchTerm}"` : 'Archived lists will appear here'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredArchived.map((list) => (
                    <tr key={list.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-sm text-slate-800">{list.listName}</p>
                        {list.description && <p className="text-xs text-slate-400 mt-0.5">{list.description}</p>}
                        {list.archivedAt && (
                          <p className="text-xs text-amber-600 mt-1">Archived: {formatDate(list.archivedAt)}</p>
                        )}
                       </td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600">{formatNumber(list.contactCount)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600">{formatNumber(list.emailEligible)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600">{formatNumber(list.waEligible)}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500">
                          {list.campaigns}
                        </span>
                       </td>
                      <td className="px-4 py-3 text-xs text-slate-400">{formatDate(list.lastUpdated)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => handleRestoreClick(list)}
                            title="Restore list"
                          >
                            Restore
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handlePermanentDelete(list)}
                            title="Permanently delete"
                          >
                            Delete
                          </Button>
                        </div>
                       </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE LIST MODAL */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New List"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateSubmit} loading={isCreating}>Create List</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">List Name</label>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="e.g. Active Customers, Trial Users..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              autoFocus
            />
            {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description (optional)</label>
            <input
              type="text"
              value={newListDesc}
              onChange={(e) => setNewListDesc(e.target.value)}
              placeholder="Describe the purpose of this list..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>
      </Modal>

      {/* DELETE CONFIRM MODAL (for active lists) */}
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete List"
        message={`Are you sure you want to delete "${selectedList?.listName}"? This action cannot be undone and will remove all contacts from this list.`}
        isLoading={isDeleting}
      />

      {/* ARCHIVE CONFIRM MODAL */}
      <ConfirmModal
        open={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={handleArchiveConfirm}
        title="Archive List"
        message={`Archive "${selectedList?.listName}"? You can restore it later from the archived lists section.`}
        isLoading={isArchiving}
      />

      {/* RESTORE CONFIRM MODAL */}
      <ConfirmModal
        open={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
        onConfirm={handleRestoreConfirm}
        title="Restore List"
        message={`Restore "${selectedList?.listName}" to active lists?`}
        isLoading={isRestoring}
      />
    </div>
  );
}