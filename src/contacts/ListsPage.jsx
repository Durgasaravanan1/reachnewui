// ListsPage.jsx – Complete with Archive functionality + List Detail Modal + Add Contact + Export
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
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
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
const UsersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
const CampaignIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
    <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UserPlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <path d="M19 10v4m-2-2h4" strokeLinecap="round" />
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
    contacts: [
      { id: 'c1', name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 'c2', name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
    ]
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
    contacts: []
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
    contacts: []
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
    contacts: []
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
    contacts: []
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
    contacts: []
  },
];

/* ================= UI COMPONENTS ================= */
const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = 'md' }) => {
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
      {rightIcon && !loading && rightIcon}
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

// ── Add Contact to List Modal ──
const AddContactModal = ({ isOpen, onClose, onAdd, listName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onAdd(formData);
    setIsSubmitting(false);
    onClose();
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Add Contact to {listName}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.name ? 'border-red-300' : 'border-slate-200'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.email ? 'border-red-300' : 'border-slate-200'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number (optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
              {isSubmitting ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── List Detail Modal Component ──
const ListDetailModal = ({ list, isOpen, onClose, onAddContact, onExport }) => {
  const [showAddContact, setShowAddContact] = useState(false);
  
  if (!isOpen || !list) return null;

  const handleAddContact = (contactData) => {
    onAddContact(list.id, contactData);
    setShowAddContact(false);
  };

  const handleExportList = () => {
    onExport(list);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <XIcon />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{list.listName}</h2>
              {list.description && <p className="text-sm text-slate-500 mt-1">{list.description}</p>}
            </div>
          </div>

          {/* Details grid */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <UsersIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Contacts</p>
                  <p className="text-lg font-bold text-slate-900">{formatNumber(list.contactCount)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MailIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email Eligible</p>
                  <p className="text-lg font-bold text-emerald-600">{formatNumber(list.emailEligible)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <WhatsAppIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">WhatsApp Eligible</p>
                  <p className="text-lg font-bold text-green-600">{formatNumber(list.waEligible)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CampaignIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Campaigns Sent</p>
                  <p className="text-lg font-bold text-indigo-600">{list.campaigns}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 col-span-2">
                <CalendarIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Last Updated</p>
                  <p className="text-sm text-slate-700">{formatDate(list.lastUpdated)}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${list.archivedAt ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {list.archivedAt ? 'Archived' : 'Active'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddContact(true)}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition flex items-center gap-1"
                  >
                    <UserPlusIcon /> Add Contact
                  </button>
                  <button
                    onClick={handleExportList}
                    className="px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition flex items-center gap-1"
                  >
                    <DownloadIcon /> Export
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      // Navigate to contacts filtered by this list
                    }}
                    className="px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Contacts Preview */}
            {list.contacts && list.contacts.length > 0 && (
              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Recent Contacts</h4>
                <div className="space-y-2">
                  {list.contacts.slice(0, 3).map(contact => (
                    <div key={contact.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{contact.name}</p>
                        <p className="text-xs text-slate-400">{contact.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${contact.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {contact.status}
                      </span>
                    </div>
                  ))}
                  {list.contacts.length > 3 && (
                    <p className="text-xs text-indigo-600 text-center mt-2 cursor-pointer hover:underline">
                      +{list.contacts.length - 3} more contacts
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={showAddContact}
        onClose={() => setShowAddContact(false)}
        onAdd={handleAddContact}
        listName={list.listName}
      />
    </>
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

  // List detail modal state
  const [detailList, setDetailList] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
      contacts: [],
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
    setLists(prev => [...prev, { ...selectedList, archivedAt: undefined }]);
    setArchivedLists(prev => prev.filter(l => l.id !== selectedList.id));
    setIsRestoring(false);
    setIsRestoreModalOpen(false);
    setSelectedList(null);
  };

  const handlePermanentDelete = (list) => {
    if (window.confirm(`Permanently delete "${list.listName}"? This action cannot be undone.`)) {
      setArchivedLists(prev => prev.filter(l => l.id !== list.id));
    }
  };

  const openListDetail = (list) => {
    setDetailList(list);
    setIsDetailModalOpen(true);
  };

  const handleAddContactToList = (listId, contactData) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        const newContact = {
          id: `contact_${Date.now()}`,
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          status: 'active',
        };
        const newContactCount = list.contactCount + 1;
        const newEmailEligible = list.emailEligible + 1;
        return {
          ...list,
          contacts: [...(list.contacts || []), newContact],
          contactCount: newContactCount,
          emailEligible: newEmailEligible,
          lastUpdated: new Date().toISOString(),
        };
      }
      return list;
    }));
    alert(`Contact "${contactData.name}" added to list!`);
  };

  const handleExportList = (list) => {
    const headers = ['Name', 'Email', 'Phone', 'Status'];
    const rows = (list.contacts || []).map(c => [c.name, c.email, c.phone || '', c.status]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.listName.replace(/\s+/g, '_')}_contacts.csv`;
    a.click();
    URL.revokeObjectURL(url);
    alert(`Exporting ${list.listName} contacts...`);
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
                      <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
                        <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600 transition-colors">{list.listName}</p>
                        {list.description && <p className="text-xs text-slate-400 mt-0.5">{list.description}</p>}
                      </td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contactCount)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.emailEligible)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.waEligible)}</td>
                      <td className="px-4 py-3" onClick={() => openListDetail(list)}>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600">
                          {list.campaigns}
                        </span>
                       </td>
                      <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.lastUpdated)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => { e.stopPropagation(); handleArchiveClick(list); }}
                            title="Archive list"
                          >
                            <ArchiveIcon />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(list); }}
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
                      <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
                        <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600 transition-colors">{list.listName}</p>
                        {list.description && <p className="text-xs text-slate-400 mt-0.5">{list.description}</p>}
                        {list.archivedAt && (
                          <p className="text-xs text-amber-600 mt-1">Archived: {formatDate(list.archivedAt)}</p>
                        )}
                       </td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contactCount)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.emailEligible)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.waEligible)}</td>
                      <td className="px-4 py-3" onClick={() => openListDetail(list)}>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500">
                          {list.campaigns}
                        </span>
                       </td>
                      <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.lastUpdated)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={(e) => { e.stopPropagation(); handleRestoreClick(list); }}
                            title="Restore list"
                          >
                            Restore
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={(e) => { e.stopPropagation(); handlePermanentDelete(list); }}
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

      {/* LIST DETAIL MODAL */}
      <ListDetailModal
        list={detailList}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddContact={handleAddContactToList}
        onExport={handleExportList}
      />
    </div>
  );
}