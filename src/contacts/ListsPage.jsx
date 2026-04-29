// // ListsPage.jsx
// import React, { useState, useEffect } from 'react';

// // ===================== Mock Data & API Simulation =====================
// const MOCK_LISTS = [
//   {
//     id: 'list1',
//     listName: 'Newsletter Subscribers',
//     description: 'Users who opted in for weekly newsletter',
//     contactCount: 12500,
//     emailEligibleCount: 11800,
//     whatsappEligibleCount: 3200,
//     linkedCampaignCount: 4,
//     updatedAt: '2026-04-20T10:00:00Z',
//   },
//   {
//     id: 'list2',
//     listName: 'Premium Customers',
//     description: 'High-value customers',
//     contactCount: 3400,
//     emailEligibleCount: 3400,
//     whatsappEligibleCount: 2100,
//     linkedCampaignCount: 2,
//     updatedAt: '2026-04-18T14:30:00Z',
//   },
//   {
//     id: 'list3',
//     listName: 'Abandoned Cart',
//     description: 'Users who left items in cart',
//     contactCount: 890,
//     emailEligibleCount: 890,
//     whatsappEligibleCount: 450,
//     linkedCampaignCount: 1,
//     updatedAt: '2026-04-15T09:15:00Z',
//   },
// ];

// const useLists = () => {
//   const [lists, setLists] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCreating, setIsCreating] = useState(false);

//   useEffect(() => {
//     // Simulate fetch delay
//     setTimeout(() => {
//       setLists(MOCK_LISTS);
//       setIsLoading(false);
//     }, 600);
//   }, []);

//   const createList = async (name, description) => {
//     setIsCreating(true);
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
//     setLists(prev => [newList, ...prev]);
//     setIsCreating(false);
//   };

//   return { lists, isLoading, createList, isCreating };
// };

// // ===================== Utility Functions =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => num?.toLocaleString() || '0';

// // ===================== Icons (SVG) =====================
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const ArchiveIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
//   </svg>
// );

// const TrashIcon = () => (
//   <svg className="h-3.5 w-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = 'md' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
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
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
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
//     {action && <div>{action}</div>}
//   </div>
// );

// const Input = ({ label, placeholder, error, ...props }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <input
//       {...props}
//       placeholder={placeholder}
//       className={cn(
//         "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
//         error ? "border-red-300" : "border-slate-200"
//       )}
//     />
//     {error && <p className="text-xs text-red-500">{error}</p>}
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
//         </div>
//         <div className="px-6 py-4">{children}</div>
//         {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100">{footer}</div>}
//       </div>
//     </div>
//   );
// };

// // ===================== Main ListsPage Component =====================
// export default function ListsPage() {
//   const { lists, isLoading, createList, isCreating } = useLists();
//   const [showCreate, setShowCreate] = useState(false);
//   const [formName, setFormName] = useState('');
//   const [formError, setFormError] = useState('');

//   const handleSubmit = async () => {
//     if (!formName.trim()) {
//       setFormError('List name is required');
//       return;
//     }
//     setFormError('');
//     await createList(formName.trim());
//     setShowCreate(false);
//     setFormName('');
//   };

//   const handleCancel = () => {
//     setShowCreate(false);
//     setFormName('');
//     setFormError('');
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <PageHeader
//         title="Audience Lists"
//         description="Manage your contact lists and audience segments"
//         action={
//           <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => setShowCreate(true)}>
//             Create List
//           </Button>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         {isLoading ? (
//           <Spinner />
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50">
//                   {['List Name', 'Contacts', 'Email Eligible', 'WA Eligible', 'Campaigns', 'Last Updated', ''].map((h) => (
//                     <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {lists.map((list) => (
//                   <tr key={list.id} className="hover:bg-slate-50 transition-colors">
//                     <td className="px-4 py-3">
//                       <p className="font-semibold text-slate-800">{list.listName}</p>
//                       {list.description && <p className="text-xs text-slate-400 mt-0.5">{list.description}</p>}
//                     </td>
//                     <td className="px-4 py-3 font-semibold">{formatNumber(list.contactCount)}</td>
//                     <td className="px-4 py-3 text-slate-500">{formatNumber(list.emailEligibleCount)}</td>
//                     <td className="px-4 py-3 text-slate-500">{formatNumber(list.whatsappEligibleCount)}</td>
//                     <td className="px-4 py-3">
//                       <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-sky-50 text-sky-700">
//                         {list.linkedCampaignCount}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-400">
//                       {new Date(list.updatedAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-1">
//                         <Button variant="ghost" size="icon" aria-label="Archive">
//                           <ArchiveIcon />
//                         </Button>
//                         <Button variant="ghost" size="icon" aria-label="Delete">
//                           <TrashIcon />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <Modal
//         open={showCreate}
//         onClose={handleCancel}
//         title="Create New List"
//         footer={
//           <>
//             <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
//             <Button variant="primary" loading={isCreating} onClick={handleSubmit}>Create</Button>
//           </>
//         }
//       >
//         <Input
//           label="List Name"
//           placeholder="e.g. Active Customers, Trial Users…"
//           value={formName}
//           onChange={(e) => setFormName(e.target.value)}
//           error={formError}
//         />
//       </Modal>
//     </div>
//   );
// }


// ListsPage.jsx – Complete working model matching the screenshot
import React, { useState, useEffect, useCallback, useRef } from 'react';

// ===================== Mock Data (based on screenshot) =====================
const MOCK_LISTS = [
  {
    id: 'list1',
    listName: 'All Subscribers',
    description: 'Main audience list',
    contactCount: 26180,
    emailEligibleCount: 24840,
    whatsappEligibleCount: 18920,
    linkedCampaignCount: 12,
    updatedAt: '2026-04-22T10:00:00Z',
  },
  {
    id: 'list2',
    listName: 'Active Customers',
    description: 'Paid plan users',
    contactCount: 8450,
    emailEligibleCount: 8200,
    whatsappEligibleCount: 6100,
    linkedCampaignCount: 8,
    updatedAt: '2026-04-21T14:30:00Z',
  },
  {
    id: 'list3',
    listName: 'Trial Users',
    description: 'Free trial, 14 days',
    contactCount: 2310,
    emailEligibleCount: 2280,
    whatsappEligibleCount: 1870,
    linkedCampaignCount: 4,
    updatedAt: '2026-04-22T09:15:00Z',
  },
  {
    id: 'list4',
    listName: 'Inactive (90+ days)',
    description: 'Re-engagement candidates',
    contactCount: 4220,
    emailEligibleCount: 4100,
    whatsappEligibleCount: 3200,
    linkedCampaignCount: 2,
    updatedAt: '2026-04-18T16:45:00Z',
  },
  {
    id: 'list5',
    listName: 'VIP Customers',
    description: 'High-value accounts',
    contactCount: 890,
    emailEligibleCount: 890,
    whatsappEligibleCount: 780,
    linkedCampaignCount: 6,
    updatedAt: '2026-04-19T11:20:00Z',
  },
  {
    id: 'list6',
    listName: 'Enterprise Accounts',
    description: 'High-value accounts',
    contactCount: 340,
    emailEligibleCount: 340,
    whatsappEligibleCount: 290,
    linkedCampaignCount: 3,
    updatedAt: '2026-04-15T08:00:00Z',
  },
];

// ===================== Custom Hooks =====================
const useLists = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const fetchLists = useCallback(() => {
    if (!isMountedRef.current) return;
    setIsLoading(true);
    console.log('[Lists] Fetching lists...');
    
    // Simulate API delay
    setTimeout(() => {
      if (!isMountedRef.current) return;
      
      let filtered = [...MOCK_LISTS];
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(list => 
          list.listName.toLowerCase().includes(term) ||
          (list.description && list.description.toLowerCase().includes(term))
        );
        console.log(`[Lists] Search filter: "${searchTerm}" -> ${filtered.length} results`);
      }
      
      setLists(filtered);
      console.log(`[Lists] Loaded ${filtered.length} lists`);
      setIsLoading(false);
    }, 500);
  }, [searchTerm]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const createList = async (name, description) => {
    console.log('[Lists] Creating new list:', { name, description });
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newList = {
      id: `list${Date.now()}`,
      listName: name,
      description: description || '',
      contactCount: 0,
      emailEligibleCount: 0,
      whatsappEligibleCount: 0,
      linkedCampaignCount: 0,
      updatedAt: new Date().toISOString(),
    };
    
    setLists(prev => {
      const updated = [newList, ...prev];
      console.log('[Lists] Created new list:', newList.listName);
      return updated;
    });
    setIsCreating(false);
    return newList;
  };

  const deleteList = async (listId, listName) => {
    console.log(`[Lists] Deleting list: ${listName} (${listId})`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setLists(prev => {
      const updated = prev.filter(list => list.id !== listId);
      console.log(`[Lists] Removed list, ${updated.length} remaining`);
      return updated;
    });
  };

  const archiveList = async (listId, listName) => {
    console.log(`[Lists] Archiving list: ${listName} (${listId})`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Archive just removes it from view in this demo
    setLists(prev => {
      const updated = prev.filter(list => list.id !== listId);
      console.log(`[Lists] Archived list, ${updated.length} remaining`);
      return updated;
    });
  };

  return { lists, isLoading, isCreating, searchTerm, setSearchTerm, createList, deleteList, archiveList };
};

// ===================== Utility Functions =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => num?.toLocaleString() || '0';
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// ===================== Icons (SVG) =====================
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ArchiveIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// ===================== UI Components =====================
const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = 'md' }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };
  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    icon: "p-1.5",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}
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
    {action && <div>{action}</div>}
  </div>
);

const Input = ({ label, placeholder, error, value, onChange, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label}</label>
    <input
      {...props}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all",
        error ? "border-red-300" : "border-slate-200"
      )}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const SearchInput = ({ value, onChange, placeholder, className }) => (
  <div className={cn("relative", className)}>
    <SearchIcon />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-8 pr-3 py-1.5 w-64 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    />
  </div>
);

const Spinner = () => (
  <div className="flex justify-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
  </div>
);

const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const ConfirmModal = ({ open, onClose, onConfirm, title, message, isLoading }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-slate-600">{message}</p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={isLoading}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

// ===================== Main ListsPage Component =====================
export default function ListsPage() {
  const { 
    lists, 
    isLoading, 
    isCreating, 
    searchTerm, 
    setSearchTerm, 
    createList, 
    deleteList, 
    archiveList 
  } = useLists();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  // Log state changes for debugging
  useEffect(() => {
    console.log(`[ListsPage] Rendered with ${lists.length} lists, isLoading: ${isLoading}, searchTerm: "${searchTerm}"`);
  }, [lists, isLoading, searchTerm]);

  const handleCreateClick = () => {
    console.log('[ListsPage] Opening create list modal');
    setShowCreateModal(true);
    setFormName('');
    setFormDescription('');
    setFormError('');
  };

  const handleCreateSubmit = async () => {
    if (!formName.trim()) {
      console.log('[ListsPage] Create validation failed: missing name');
      setFormError('List name is required');
      return;
    }
    setFormError('');
    console.log('[ListsPage] Submitting create list:', formName);
    await createList(formName.trim(), formDescription.trim());
    setShowCreateModal(false);
    setFormName('');
    setFormDescription('');
  };

  const handleCreateCancel = () => {
    console.log('[ListsPage] Cancelling list creation');
    setShowCreateModal(false);
    setFormName('');
    setFormDescription('');
    setFormError('');
  };

  const handleDeleteClick = (list) => {
    console.log(`[ListsPage] Delete requested for list: ${list.listName}`);
    setSelectedList(list);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedList) return;
    console.log(`[ListsPage] Confirming delete for: ${selectedList.listName}`);
    setIsDeleting(true);
    await deleteList(selectedList.id, selectedList.listName);
    setIsDeleting(false);
    setShowDeleteModal(false);
    setSelectedList(null);
  };

  const handleDeleteCancel = () => {
    console.log('[ListsPage] Cancelling delete');
    setShowDeleteModal(false);
    setSelectedList(null);
  };

  const handleArchiveClick = (list) => {
    console.log(`[ListsPage] Archive requested for list: ${list.listName}`);
    setSelectedList(list);
    setShowArchiveModal(true);
  };

  const handleArchiveConfirm = async () => {
    if (!selectedList) return;
    console.log(`[ListsPage] Confirming archive for: ${selectedList.listName}`);
    setIsArchiving(true);
    await archiveList(selectedList.id, selectedList.listName);
    setIsArchiving(false);
    setShowArchiveModal(false);
    setSelectedList(null);
  };

  const handleArchiveCancel = () => {
    console.log('[ListsPage] Cancelling archive');
    setShowArchiveModal(false);
    setSelectedList(null);
  };

  const totalContacts = lists.reduce((sum, list) => sum + list.contactCount, 0);
  const totalEmailEligible = lists.reduce((sum, list) => sum + list.emailEligibleCount, 0);
  const totalWhatsAppEligible = lists.reduce((sum, list) => sum + list.whatsappEligibleCount, 0);

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <PageHeader
        title="Audience Lists"
        description="Manage your contact lists and audience segments"
        action={
          <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateClick}>
            Create List
          </Button>
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <SearchInput
            value={searchTerm}
            onChange={(val) => {
              console.log(`[ListsPage] Search term changed: "${val}"`);
              setSearchTerm(val);
            }}
            placeholder="Search lists..."
            className="w-64"
          />
          <div className="text-xs text-slate-400">
            {!isLoading && `${lists.length} list${lists.length !== 1 ? 's' : ''} found`}
          </div>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    LIST NAME
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    CONTACTS
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    EMAIL ELIGIBLE
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    WA ELIGIBLE
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    CAMPAIGNS
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    LAST UPDATED
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lists.map((list) => (
                  <tr key={list.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{list.listName}</p>
                      {list.description && (
                        <p className="text-xs text-slate-400 mt-0.5">{list.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {formatNumber(list.contactCount)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatNumber(list.emailEligibleCount)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatNumber(list.whatsappEligibleCount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600">
                        {list.linkedCampaignCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {formatDate(list.updatedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleArchiveClick(list)}
                          aria-label="Archive"
                          title="Archive list"
                        >
                          <ArchiveIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(list)}
                          aria-label="Delete"
                          title="Delete list"
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {lists.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-lg font-semibold text-slate-800">No lists found</p>
                <p className="text-sm text-slate-500 mt-1">
                  {searchTerm ? `No results for "${searchTerm}"` : 'Create your first audience list'}
                </p>
                {!searchTerm && (
                  <div className="mt-4">
                    <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateClick}>
                      Create List
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create List Modal */}
      <Modal
        open={showCreateModal}
        onClose={handleCreateCancel}
        title="Create New List"
        footer={
          <>
            <Button variant="secondary" onClick={handleCreateCancel} disabled={isCreating}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateSubmit} loading={isCreating}>
              Create List
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="List Name"
            placeholder="e.g. Active Customers, Trial Users..."
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            error={formError}
            autoFocus
          />
          <Input
            label="Description (optional)"
            placeholder="Describe the purpose of this list..."
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete List"
        message={`Are you sure you want to delete "${selectedList?.listName}"? This action cannot be undone and will remove all contacts from this list.`}
        isLoading={isDeleting}
      />

      {/* Archive Confirmation Modal */}
      <ConfirmModal
        open={showArchiveModal}
        onClose={handleArchiveCancel}
        onConfirm={handleArchiveConfirm}
        title="Archive List"
        message={`Are you sure you want to archive "${selectedList?.listName}"? You can restore it later from the archived lists section.`}
        isLoading={isArchiving}
      />
    </div>
  );
}