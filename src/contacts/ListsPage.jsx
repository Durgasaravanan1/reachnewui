


// // ListsPage.jsx – Complete working model matching the screenshot
// import React, { useState, useEffect, useCallback, useRef } from 'react';

// // ===================== Mock Data (based on screenshot) =====================
// const MOCK_LISTS = [
//   {
//     id: 'list1',
//     listName: 'All Subscribers',
//     description: 'Main audience list',
//     contactCount: 26180,
//     emailEligibleCount: 24840,
//     whatsappEligibleCount: 18920,
//     linkedCampaignCount: 12,
//     updatedAt: '2026-04-22T10:00:00Z',
//   },
//   {
//     id: 'list2',
//     listName: 'Active Customers',
//     description: 'Paid plan users',
//     contactCount: 8450,
//     emailEligibleCount: 8200,
//     whatsappEligibleCount: 6100,
//     linkedCampaignCount: 8,
//     updatedAt: '2026-04-21T14:30:00Z',
//   },
//   {
//     id: 'list3',
//     listName: 'Trial Users',
//     description: 'Free trial, 14 days',
//     contactCount: 2310,
//     emailEligibleCount: 2280,
//     whatsappEligibleCount: 1870,
//     linkedCampaignCount: 4,
//     updatedAt: '2026-04-22T09:15:00Z',
//   },
//   {
//     id: 'list4',
//     listName: 'Inactive (90+ days)',
//     description: 'Re-engagement candidates',
//     contactCount: 4220,
//     emailEligibleCount: 4100,
//     whatsappEligibleCount: 3200,
//     linkedCampaignCount: 2,
//     updatedAt: '2026-04-18T16:45:00Z',
//   },
//   {
//     id: 'list5',
//     listName: 'VIP Customers',
//     description: 'High-value accounts',
//     contactCount: 890,
//     emailEligibleCount: 890,
//     whatsappEligibleCount: 780,
//     linkedCampaignCount: 6,
//     updatedAt: '2026-04-19T11:20:00Z',
//   },
//   {
//     id: 'list6',
//     listName: 'Enterprise Accounts',
//     description: 'High-value accounts',
//     contactCount: 340,
//     emailEligibleCount: 340,
//     whatsappEligibleCount: 290,
//     linkedCampaignCount: 3,
//     updatedAt: '2026-04-15T08:00:00Z',
//   },
// ];

// // ===================== Custom Hooks =====================
// const useLists = () => {
//   const [lists, setLists] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCreating, setIsCreating] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const isMountedRef = useRef(true);
//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => { isMountedRef.current = false; };
//   }, []);

//   const fetchLists = useCallback(() => {
//     if (!isMountedRef.current) return;
//     setIsLoading(true);
//     console.log('[Lists] Fetching lists...');
    
//     // Simulate API delay
//     setTimeout(() => {
//       if (!isMountedRef.current) return;
      
//       let filtered = [...MOCK_LISTS];
//       if (searchTerm) {
//         const term = searchTerm.toLowerCase();
//         filtered = filtered.filter(list => 
//           list.listName.toLowerCase().includes(term) ||
//           (list.description && list.description.toLowerCase().includes(term))
//         );
//         console.log(`[Lists] Search filter: "${searchTerm}" -> ${filtered.length} results`);
//       }
      
//       setLists(filtered);
//       console.log(`[Lists] Loaded ${filtered.length} lists`);
//       setIsLoading(false);
//     }, 500);
//   }, [searchTerm]);

//   useEffect(() => {
//     fetchLists();
//   }, [fetchLists]);

//   const createList = async (name, description) => {
//     console.log('[Lists] Creating new list:', { name, description });
//     setIsCreating(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     const newList = {
//       id: `list${Date.now()}`,
//       listName: name,
//       description: description || '',
//       contactCount: 0,
//       emailEligibleCount: 0,
//       whatsappEligibleCount: 0,
//       linkedCampaignCount: 0,
//       updatedAt: new Date().toISOString(),
//     };
    
//     setLists(prev => {
//       const updated = [newList, ...prev];
//       console.log('[Lists] Created new list:', newList.listName);
//       return updated;
//     });
//     setIsCreating(false);
//     return newList;
//   };

//   const deleteList = async (listId, listName) => {
//     console.log(`[Lists] Deleting list: ${listName} (${listId})`);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 500));
//     setLists(prev => {
//       const updated = prev.filter(list => list.id !== listId);
//       console.log(`[Lists] Removed list, ${updated.length} remaining`);
//       return updated;
//     });
//   };

//   const archiveList = async (listId, listName) => {
//     console.log(`[Lists] Archiving list: ${listName} (${listId})`);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 500));
//     // Archive just removes it from view in this demo
//     setLists(prev => {
//       const updated = prev.filter(list => list.id !== listId);
//       console.log(`[Lists] Archived list, ${updated.length} remaining`);
//       return updated;
//     });
//   };

//   return { lists, isLoading, isCreating, searchTerm, setSearchTerm, createList, deleteList, archiveList };
// };

// // ===================== Utility Functions =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => num?.toLocaleString() || '0';
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };

// // ===================== Icons (SVG) =====================
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//   </svg>
// );

// const ArchiveIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
//   </svg>
// );

// const TrashIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = 'md' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
//   };
//   const sizes = {
//     sm: "px-2.5 py-1 text-xs",
//     md: "px-3 py-1.5 text-sm",
//     icon: "p-1.5",
//   };
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled || loading}
//       className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}
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
//     {action && <div>{action}</div>}
//   </div>
// );

// const Input = ({ label, placeholder, error, value, onChange, ...props }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <input
//       {...props}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={cn(
//         "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
//         error ? "border-red-300" : "border-slate-200"
//       )}
//     />
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const SearchInput = ({ value, onChange, placeholder, className }) => (
//   <div className={cn("relative", className)}>
//     <SearchIcon />
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="pl-8 pr-3 py-1.5 w-64 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//     />
//   </div>
// );

// const Spinner = () => (
//   <div className="flex justify-center py-16">
//     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
//   </div>
// );

// const Modal = ({ open, onClose, title, children, footer }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
//             ✕
//           </button>
//         </div>
//         <div className="px-6 py-4">{children}</div>
//         {footer && (
//           <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
//             {footer}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ConfirmModal = ({ open, onClose, onConfirm, title, message, isLoading }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//         </div>
//         <div className="px-6 py-4">
//           <p className="text-sm text-slate-600">{message}</p>
//         </div>
//         <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
//           <Button variant="secondary" onClick={onClose} disabled={isLoading}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={onConfirm} loading={isLoading}>
//             Confirm
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===================== Main ListsPage Component =====================
// export default function ListsPage() {
//   const { 
//     lists, 
//     isLoading, 
//     isCreating, 
//     searchTerm, 
//     setSearchTerm, 
//     createList, 
//     deleteList, 
//     archiveList 
//   } = useLists();
  
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showArchiveModal, setShowArchiveModal] = useState(false);
//   const [selectedList, setSelectedList] = useState(null);
//   const [formName, setFormName] = useState('');
//   const [formDescription, setFormDescription] = useState('');
//   const [formError, setFormError] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isArchiving, setIsArchiving] = useState(false);

//   // Log state changes for debugging
//   useEffect(() => {
//     console.log(`[ListsPage] Rendered with ${lists.length} lists, isLoading: ${isLoading}, searchTerm: "${searchTerm}"`);
//   }, [lists, isLoading, searchTerm]);

//   const handleCreateClick = () => {
//     console.log('[ListsPage] Opening create list modal');
//     setShowCreateModal(true);
//     setFormName('');
//     setFormDescription('');
//     setFormError('');
//   };

//   const handleCreateSubmit = async () => {
//     if (!formName.trim()) {
//       console.log('[ListsPage] Create validation failed: missing name');
//       setFormError('List name is required');
//       return;
//     }
//     setFormError('');
//     console.log('[ListsPage] Submitting create list:', formName);
//     await createList(formName.trim(), formDescription.trim());
//     setShowCreateModal(false);
//     setFormName('');
//     setFormDescription('');
//   };

//   const handleCreateCancel = () => {
//     console.log('[ListsPage] Cancelling list creation');
//     setShowCreateModal(false);
//     setFormName('');
//     setFormDescription('');
//     setFormError('');
//   };

//   const handleDeleteClick = (list) => {
//     console.log(`[ListsPage] Delete requested for list: ${list.listName}`);
//     setSelectedList(list);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!selectedList) return;
//     console.log(`[ListsPage] Confirming delete for: ${selectedList.listName}`);
//     setIsDeleting(true);
//     await deleteList(selectedList.id, selectedList.listName);
//     setIsDeleting(false);
//     setShowDeleteModal(false);
//     setSelectedList(null);
//   };

//   const handleDeleteCancel = () => {
//     console.log('[ListsPage] Cancelling delete');
//     setShowDeleteModal(false);
//     setSelectedList(null);
//   };

//   const handleArchiveClick = (list) => {
//     console.log(`[ListsPage] Archive requested for list: ${list.listName}`);
//     setSelectedList(list);
//     setShowArchiveModal(true);
//   };

//   const handleArchiveConfirm = async () => {
//     if (!selectedList) return;
//     console.log(`[ListsPage] Confirming archive for: ${selectedList.listName}`);
//     setIsArchiving(true);
//     await archiveList(selectedList.id, selectedList.listName);
//     setIsArchiving(false);
//     setShowArchiveModal(false);
//     setSelectedList(null);
//   };

//   const handleArchiveCancel = () => {
//     console.log('[ListsPage] Cancelling archive');
//     setShowArchiveModal(false);
//     setSelectedList(null);
//   };

//   const totalContacts = lists.reduce((sum, list) => sum + list.contactCount, 0);
//   const totalEmailEligible = lists.reduce((sum, list) => sum + list.emailEligibleCount, 0);
//   const totalWhatsAppEligible = lists.reduce((sum, list) => sum + list.whatsappEligibleCount, 0);

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       <PageHeader
//         title="Audience Lists"
//         description="Manage your contact lists and audience segments"
//         action={
//           <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateClick}>
//             Create List
//           </Button>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="p-4 border-b border-slate-100 flex items-center justify-between">
//           <SearchInput
//             value={searchTerm}
//             onChange={(val) => {
//               console.log(`[ListsPage] Search term changed: "${val}"`);
//               setSearchTerm(val);
//             }}
//             placeholder="Search lists..."
//             className="w-64"
//           />
//           <div className="text-xs text-slate-400">
//             {!isLoading && `${lists.length} list${lists.length !== 1 ? 's' : ''} found`}
//           </div>
//         </div>

//         {isLoading ? (
//           <Spinner />
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50">
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                     LIST NAME
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                     CONTACTS
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                     EMAIL ELIGIBLE
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                     WA ELIGIBLE
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                     CAMPAIGNS
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                     LAST UPDATED
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {lists.map((list) => (
//                   <tr key={list.id} className="hover:bg-slate-50 transition-colors group">
//                     <td className="px-4 py-3">
//                       <p className="font-semibold text-slate-800">{list.listName}</p>
//                       {list.description && (
//                         <p className="text-xs text-slate-400 mt-0.5">{list.description}</p>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 font-semibold text-slate-700">
//                       {formatNumber(list.contactCount)}
//                     </td>
//                     <td className="px-4 py-3 text-slate-600">
//                       {formatNumber(list.emailEligibleCount)}
//                     </td>
//                     <td className="px-4 py-3 text-slate-600">
//                       {formatNumber(list.whatsappEligibleCount)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600">
//                         {list.linkedCampaignCount}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-400">
//                       {formatDate(list.updatedAt)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleArchiveClick(list)}
//                           aria-label="Archive"
//                           title="Archive list"
//                         >
//                           <ArchiveIcon />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDeleteClick(list)}
//                           aria-label="Delete"
//                           title="Delete list"
//                         >
//                           <TrashIcon />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//             {lists.length === 0 && !isLoading && (
//               <div className="text-center py-12">
//                 <p className="text-lg font-semibold text-slate-800">No lists found</p>
//                 <p className="text-sm text-slate-500 mt-1">
//                   {searchTerm ? `No results for "${searchTerm}"` : 'Create your first audience list'}
//                 </p>
//                 {!searchTerm && (
//                   <div className="mt-4">
//                     <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateClick}>
//                       Create List
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Create List Modal */}
//       <Modal
//         open={showCreateModal}
//         onClose={handleCreateCancel}
//         title="Create New List"
//         footer={
//           <>
//             <Button variant="secondary" onClick={handleCreateCancel} disabled={isCreating}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handleCreateSubmit} loading={isCreating}>
//               Create List
//             </Button>
//           </>
//         }
//       >
//         <div className="space-y-4">
//           <Input
//             label="List Name"
//             placeholder="e.g. Active Customers, Trial Users..."
//             value={formName}
//             onChange={(e) => setFormName(e.target.value)}
//             error={formError}
//             autoFocus
//           />
//           <Input
//             label="Description (optional)"
//             placeholder="Describe the purpose of this list..."
//             value={formDescription}
//             onChange={(e) => setFormDescription(e.target.value)}
//           />
//         </div>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <ConfirmModal
//         open={showDeleteModal}
//         onClose={handleDeleteCancel}
//         onConfirm={handleDeleteConfirm}
//         title="Delete List"
//         message={`Are you sure you want to delete "${selectedList?.listName}"? This action cannot be undone and will remove all contacts from this list.`}
//         isLoading={isDeleting}
//       />

//       {/* Archive Confirmation Modal */}
//       <ConfirmModal
//         open={showArchiveModal}
//         onClose={handleArchiveCancel}
//         onConfirm={handleArchiveConfirm}
//         title="Archive List"
//         message={`Are you sure you want to archive "${selectedList?.listName}"? You can restore it later from the archived lists section.`}
//         isLoading={isArchiving}
//       />
//     </div>
//   );
// }


// ListsPage.jsx – Exact UI from design (Audience Lists)
import React, { useState, useEffect, useCallback, useRef } from 'react';

/* ================= LOAD FONT (Plus Jakarta Sans) – same as ContactsPage ================= */
const loadFont = () => {
  if (!document.querySelector('#jakarta-font-lists')) {
    const link = document.createElement('link');
    link.id = 'jakarta-font-lists';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (!document.querySelector('#lists-font-style')) {
    const style = document.createElement('style');
    style.id = 'lists-font-style';
    style.textContent = `
      * { font-family: 'Plus Jakarta Sans', sans-serif; }
      .lists-heading {
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
      .list-name {
        font-weight: 700 !important;
        font-size: 14px !important;
        color: #0f172a !important;
      }
      .list-description {
        font-weight: 400 !important;
        font-size: 12px !important;
        color: #94a3b8 !important;
      }
      .stat-number {
        font-weight: 600 !important;
        font-size: 14px !important;
        color: #334155 !important;
      }
      .campaign-badge {
        font-weight: 600 !important;
        font-size: 12px !important;
      }
      .date-text {
        font-weight: 400 !important;
        font-size: 12px !important;
        color: #94a3b8 !important;
      }
      .button-text {
        font-weight: 600 !important;
        font-size: 14px !important;
      }
    `;
    document.head.appendChild(style);
  }
};

/* ================= MOCK DATA (based on screenshots) ================= */
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
    description: 'High-value accounts',
    contactCount: 340,
    emailEligible: 340,
    waEligible: 290,
    campaigns: 3,
    lastUpdated: '2026-04-15T08:00:00Z',
  },
];

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
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
  </svg>
);

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
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">{title}</h3></div>
        <div className="px-6 py-4"><p className="text-sm text-slate-600">{message}</p></div>
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
  useEffect(() => loadFont(), []);

  const [lists, setLists] = useState(MOCK_LISTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [formError, setFormError] = useState('');

  // Filter lists based on search term
  const filteredLists = lists.filter(list =>
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
    // Simulate API delay
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
    setLists(prev => prev.filter(l => l.id !== selectedList.id));
    setIsArchiving(false);
    setIsArchiveModalOpen(false);
    setSelectedList(null);
  };

  const totalLists = filteredLists.length;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="lists-heading">Audience Lists</h1>
          <p className="text-sm text-slate-500 mt-1 font-normal">Manage your contact lists and audience segments</p>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>
          Create List
        </Button>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
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
                <th className="px-4 py-3 text-left table-header">LIST NAME</th>
                <th className="px-4 py-3 text-left table-header">CONTACTS</th>
                <th className="px-4 py-3 text-left table-header">EMAIL ELIGIBLE</th>
                <th className="px-4 py-3 text-left table-header">WA ELIGIBLE</th>
                <th className="px-4 py-3 text-left table-header">CAMPAIGNS</th>
                <th className="px-4 py-3 text-left table-header">LAST UPDATED</th>
                <th className="px-4 py-3 text-left table-header"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLists.map((list) => (
                <tr key={list.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3">
                    <p className="list-name">{list.listName}</p>
                    {list.description && <p className="list-description mt-0.5">{list.description}</p>}
                  </td>
                  <td className="px-4 py-3 stat-number">{formatNumber(list.contactCount)}</td>
                  <td className="px-4 py-3 stat-number">{formatNumber(list.emailEligible)}</td>
                  <td className="px-4 py-3 stat-number">{formatNumber(list.waEligible)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600 campaign-badge">
                      {list.campaigns}
                    </span>
                  </td>
                  <td className="px-4 py-3 date-text">{formatDate(list.lastUpdated)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleArchiveClick(list)} title="Archive list">
                        <ArchiveIcon />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(list)} title="Delete list">
                        <TrashIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLists.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <p className="text-lg font-semibold text-slate-800">No lists found</p>
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

      {/* DELETE CONFIRM MODAL */}
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
        message={`Are you sure you want to archive "${selectedList?.listName}"? You can restore it later from the archived lists section.`}
        isLoading={isArchiving}
      />
    </div>
  );
}