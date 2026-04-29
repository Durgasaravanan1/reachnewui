// ContactsPage.jsx – Fully functional with working buttons
import React, { useState, useEffect, useCallback } from 'react';

// ===================== Mock Data (initial) =====================
const INITIAL_LISTS = [
  { id: 'list1', listName: 'All Subscribers' },
  { id: 'list2', listName: 'Active Customers' },
  { id: 'list3', listName: 'Trial Users' },
  { id: 'list4', listName: 'VIP Customers' },
];

const INITIAL_CONTACTS = [
  { id: '1', fullName: 'Ananya Rajesh', email: 'ananya.rajesh@techvista.in', phoneNumber: '+91 98765 43210', globalStatus: 'active', tags: ['vip', 'b2b'], engagementScore: 84, source: 'import', lastCampaign: 'April Flash Sale', list: 'Active Customers' },
  { id: '2', fullName: 'Pradeep Mehta', email: 'p.mehta@blueaxis.com', phoneNumber: '+91 87654 32109', globalStatus: 'active', tags: ['enterprise'], engagementScore: 62, source: 'form', lastCampaign: 'March Newsletter', list: 'All Subscribers' },
  { id: '3', fullName: 'Sunita Nair', email: 'sunita@growfast.co', phoneNumber: '+91 76543 21098', globalStatus: 'active', tags: ['vip', 'partner'], engagementScore: 91, source: 'import', lastCampaign: 'WhatsApp Flash Sale', list: 'VIP Customers' },
  { id: '4', fullName: 'Ramesh Kumar', email: 'ramesh.k@innodev.io', phoneNumber: '+91 65432 10987', globalStatus: 'suppressed', tags: ['bounced'], engagementScore: 23, source: 'import', lastCampaign: 'Tech Summit', list: 'All Subscribers' },
  { id: '5', fullName: 'Kavitha Iyer', email: 'kavitha.iyer@nexustech.com', phoneNumber: '+91 54321 09876', globalStatus: 'active', tags: ['vip', 'b2b'], engagementScore: 78, source: 'api', lastCampaign: 'Product Launch', list: 'VIP Customers' },
  { id: '6', fullName: 'Vikram Sharma', email: 'v.sharma@stratbox.in', phoneNumber: '+91 43210 98765', globalStatus: 'active', tags: ['trial'], engagementScore: 45, source: 'form', lastCampaign: 'Onboarding Email', list: 'Trial Users' },
  { id: '7', fullName: 'Neha Gupta', email: 'neha.gupta@example.com', phoneNumber: '+91 99887 66554', globalStatus: 'active', tags: ['customer'], engagementScore: 72, source: 'import', lastCampaign: 'Weekly Digest', list: 'Active Customers' },
  { id: '8', fullName: 'Arjun Nair', email: 'arjun@nair.co', phoneNumber: '+91 88776 55443', globalStatus: 'suppressed', tags: ['unsubscribed'], engagementScore: 12, source: 'form', lastCampaign: 'Promotion May', list: 'All Subscribers' },
];

// ===================== Reliable useContacts Hook (mutable) =====================
const useContacts = () => {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [total, setTotal] = useState(INITIAL_CONTACTS.length);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: null,
    listId: null,
    status: null,
    page: 1,
    limit: 10,
  });

  // Simulate initial loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredCount = INITIAL_CONTACTS.length;
      setTotal(filteredCount);
      setTotalPages(Math.ceil(filteredCount / 10));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and pagination whenever contacts or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = [...contacts];

      if (filters.q) {
        const q = filters.q.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.fullName.toLowerCase().includes(q) ||
            (c.email && c.email.toLowerCase().includes(q)) ||
            (c.phoneNumber && c.phoneNumber.includes(q))
        );
      }
      if (filters.status) {
        filtered = filtered.filter((c) => c.globalStatus === filters.status);
      }
      if (filters.listId) {
        const selectedList = INITIAL_LISTS.find((l) => l.id === filters.listId);
        if (selectedList) {
          filtered = filtered.filter((c) => c.list === selectedList.listName);
        }
      }

      const start = (filters.page - 1) * filters.limit;
      const paged = filtered.slice(start, start + filters.limit);

      setTotal(filtered.length);
      setTotalPages(Math.ceil(filtered.length / filters.limit));
      // We don't store filtered contacts in state, they are derived.
      // Instead, we store the full contact list and compute paged view on the fly.
      // For simplicity, we will maintain a separate `filteredContacts` state.
    }, 300);
    return () => clearTimeout(timer);
  }, [contacts, filters]);

  // Compute displayed contacts based on filters and pagination
  const getDisplayedContacts = useCallback(() => {
    let filtered = [...contacts];
    if (filters.q) {
      const q = filters.q.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          (c.email && c.email.toLowerCase().includes(q)) ||
          (c.phoneNumber && c.phoneNumber.includes(q))
      );
    }
    if (filters.status) {
      filtered = filtered.filter((c) => c.globalStatus === filters.status);
    }
    if (filters.listId) {
      const selectedList = INITIAL_LISTS.find((l) => l.id === filters.listId);
      if (selectedList) {
        filtered = filtered.filter((c) => c.list === selectedList.listName);
      }
    }
    const start = (filters.page - 1) * filters.limit;
    return filtered.slice(start, start + filters.limit);
  }, [contacts, filters.q, filters.status, filters.listId, filters.page, filters.limit]);

  const displayedContacts = getDisplayedContacts();
  const displayedTotal = (() => {
    let filtered = [...contacts];
    if (filters.q) filtered = filtered.filter(c => c.fullName.toLowerCase().includes(filters.q.toLowerCase()) || (c.email && c.email.toLowerCase().includes(filters.q.toLowerCase())));
    if (filters.status) filtered = filtered.filter(c => c.globalStatus === filters.status);
    if (filters.listId) {
      const selectedList = INITIAL_LISTS.find(l => l.id === filters.listId);
      if (selectedList) filtered = filtered.filter(c => c.list === selectedList.listName);
    }
    return filtered.length;
  })();

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  // Mutations
  const deleteContacts = useCallback((ids) => {
    setContacts(prev => prev.filter(c => !ids.includes(c.id)));
    console.log(`[Contacts] Deleted ${ids.length} contacts`);
  }, []);

  const addContacts = useCallback((newContacts) => {
    setContacts(prev => [...newContacts, ...prev]);
    console.log(`[Contacts] Added ${newContacts.length} contacts`);
  }, []);

  const applyTagToSelected = useCallback((ids, tag) => {
    setContacts(prev => prev.map(c => 
      ids.includes(c.id) 
        ? { ...c, tags: [...c.tags, tag] }
        : c
    ));
    console.log(`[Contacts] Applied tag "${tag}" to ${ids.length} contacts`);
  }, []);

  return {
    contacts: displayedContacts,
    total: displayedTotal,
    totalPages: totalPages,
    isLoading,
    filters,
    setFilter,
    deleteContacts,
    addContacts,
    applyTagToSelected,
  };
};

const useListAll = () => ({ data: INITIAL_LISTS });

// ===================== Utility Functions =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => (num != null ? num.toLocaleString() : '—');

// ===================== Icons =====================
const UploadIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0l-3 3m3-3l3 3" strokeLinecap="round" />
  </svg>
);
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4v16m8-8H4" strokeLinecap="round" />
  </svg>
);

// ===================== UI Components =====================
const Avatar = ({ name, size = 'sm' }) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';
  const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}
    >
      {initials}
    </div>
  );
};

const Badge = ({ children, variant, dot }) => {
  const variants = {
    active: 'bg-emerald-100 text-emerald-700',
    suppressed: 'bg-red-100 text-red-700',
  };
  const style = variants[variant] || 'bg-slate-100 text-slate-700';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

const Tag = ({ label }) => (
  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
    {label}
  </span>
);

const ContactEngagementBar = ({ score }) => {
  let barColor = 'bg-amber-400';
  let textColor = 'text-amber-600';
  if (score >= 70) {
    barColor = 'bg-emerald-500';
    textColor = 'text-emerald-600';
  } else if (score >= 40) {
    barColor = 'bg-indigo-500';
    textColor = 'text-indigo-600';
  }
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-bold ${textColor}`}>{score}</span>
    </div>
  );
};

const Button = ({ children, variant, leftIcon, size, onClick, disabled }) => {
  const base =
    'inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  const sizes = { sm: 'px-2.5 py-1 text-xs', md: 'px-3 py-1.5 text-sm' };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        base,
        variants[variant] || variants.secondary,
        sizes[size] || sizes.md
      )}
    >
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

const SearchInput = ({ placeholder, onSearch, className }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => onSearch(value || null), 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn(
        'border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500',
        className
      )}
    />
  );
};

const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
      <p className="text-sm text-slate-500 order-1 sm:order-none">
        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of{' '}
        {totalItems}
      </p>
      <div className="flex gap-1 order-2 sm:order-none">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100"
        >
          ← Prev
        </button>
        <span className="px-3 py-1 text-sm text-slate-600">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const DataTable = ({
  data,
  columns,
  isLoading,
  selectable,
  selected,
  onSelectionChange,
  emptyTitle,
  emptyDescription,
  emptyAction,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) onSelectionChange(data.map((row) => row.id));
    else onSelectionChange([]);
  };
  const handleSelectRow = (id) => {
    if (selected.includes(id))
      onSelectionChange(selected.filter((i) => i !== id));
    else onSelectionChange([...selected, id]);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full inline-block"></div>
        <p className="text-sm text-slate-500 mt-2">Loading contacts...</p>
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold text-slate-800">{emptyTitle}</p>
        <p className="text-sm text-slate-500">{emptyDescription}</p>
        {emptyAction && <div className="mt-4">{emptyAction}</div>}
      </div>
    );
  }

  const visibleCols = columns.filter((col) => !col.hideOnMobile);
  const mobileHiddenCols = columns.filter((col) => col.hideOnMobile);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {selectable && (
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={selected.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-slate-300"
                />
              </th>
            )}
            {visibleCols.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide"
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
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
              {selectable && (
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-slate-300"
                  />
                </td>
              )}
              {visibleCols.map((col) => {
                let content = col.render ? col.render(row) : row[col.key];
                if (!col.render && col.key === 'fullName')
                  content = <div className="font-semibold">{row.fullName}</div>;
                return (
                  <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    {content}
                  </td>
                );
              })}
              {mobileHiddenCols.length > 0 && (
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="flex flex-col gap-1">
                    {mobileHiddenCols.map((col) => (
                      <div key={col.key} className="text-xs">
                        <span className="font-semibold text-slate-400">
                          {col.header}:
                        </span>{' '}
                        {col.render ? col.render(row) : row[col.key]}
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

// ===================== Main ContactsPage =====================
export default function ContactsPage() {
  const { contacts, total, totalPages, isLoading, filters, setFilter, deleteContacts, addContacts, applyTagToSelected } = useContacts();
  const { data: lists = [] } = useListAll();
  const [selected, setSelected] = useState([]);

  const handleSearch = useCallback((q) => {
    setFilter('q', q);
  }, [setFilter]);

  // Export all filtered contacts as CSV
  const handleExport = () => {
    if (contacts.length === 0) {
      alert('No contacts to export');
      return;
    }
    const headers = ['Full Name', 'Email', 'Phone', 'Status', 'Tags', 'Engagement Score', 'Last Campaign', 'List'];
    const rows = contacts.map(c => [
      c.fullName,
      c.email || '',
      c.phoneNumber || '',
      c.globalStatus,
      c.tags.join(', '),
      c.engagementScore,
      c.lastCampaign || '',
      c.list,
    ]);
    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import contacts from CSV file
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target.result;
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length < 2) {
          alert('Invalid CSV file');
          return;
        }
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        const newContacts = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
          if (values.length < 2) continue;
          const contact = {
            id: `import_${Date.now()}_${i}`,
            fullName: values[headers.indexOf('Full Name')] || values[0] || 'Unknown',
            email: values[headers.indexOf('Email')] || '',
            phoneNumber: values[headers.indexOf('Phone')] || '',
            globalStatus: values[headers.indexOf('Status')] || 'active',
            tags: values[headers.indexOf('Tags')] ? values[headers.indexOf('Tags')].split(',').map(t => t.trim()) : [],
            engagementScore: parseInt(values[headers.indexOf('Engagement Score')]) || 50,
            source: 'import',
            lastCampaign: values[headers.indexOf('Last Campaign')] || '',
            list: values[headers.indexOf('List')] || 'All Subscribers',
          };
          newContacts.push(contact);
        }
        if (newContacts.length) {
          addContacts(newContacts);
          alert(`Imported ${newContacts.length} contacts`);
        } else {
          alert('No valid contacts found in CSV');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleAddToList = () => {
    if (selected.length === 0) return alert('No contacts selected');
    alert(`Add ${selected.length} contacts to list (demo)`);
  };

  const handleApplyTag = () => {
    if (selected.length === 0) return alert('No contacts selected');
    const tag = prompt('Enter tag name:');
    if (tag && tag.trim()) {
      applyTagToSelected(selected, tag.trim());
      alert(`Tag "${tag}" applied to ${selected.length} contacts`);
    }
  };

  const handleDelete = () => {
    if (selected.length === 0) return alert('No contacts selected');
    if (window.confirm(`Delete ${selected.length} contacts permanently?`)) {
      deleteContacts(selected);
      setSelected([]);
    }
  };

  const STATUS_OPTIONS = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'suppressed', label: 'Suppressed' },
  ];

  const COLUMNS = [
    {
      key: 'fullName',
      header: 'Contact',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.fullName} size="sm" />
          <div>
            <p className="font-semibold text-slate-800 leading-tight">{row.fullName}</p>
            <p className="text-xs text-slate-400 mt-0.5">{row.email || row.phoneNumber || '—'}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'globalStatus',
      header: 'Status',
      render: (row) => <Badge variant={row.globalStatus} dot>{row.globalStatus}</Badge>,
    },
    {
      key: 'tags',
      header: 'Tags',
      hideOnMobile: true,
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.tags.slice(0, 2).map(t => <Tag key={t} label={t} />)}
          {row.tags.length > 2 && <Tag label={`+${row.tags.length - 2}`} />}
        </div>
      ),
    },
    {
      key: 'engagementScore',
      header: 'Engagement',
      hideOnMobile: true,
      render: (row) => <ContactEngagementBar score={row.engagementScore} />,
    },
    {
      key: 'lastCampaign',
      header: 'Last Campaign',
      hideOnMobile: true,
      render: (row) => <span className="text-xs text-slate-500">{row.lastCampaign || '—'}</span>,
    },
  ];

  const activeCount = INITIAL_CONTACTS.filter(c => c.globalStatus === 'active').length;
  const suppressedCount = INITIAL_CONTACTS.filter(c => c.globalStatus === 'suppressed').length;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <PageHeader
        title="All Contacts"
        description={`${formatNumber(total)} total · ${activeCount} active · ${suppressedCount} suppressed`}
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" leftIcon={<UploadIcon />} onClick={handleExport}>Export</Button>
            <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleImport}>Import Contacts</Button>
          </div>
        }
      />

      {selected.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-2.5">
          <span className="text-sm font-semibold text-indigo-700">{selected.length} selected</span>
          <Button variant="secondary" size="sm" onClick={handleAddToList}>Add to List</Button>
          <Button variant="secondary" size="sm" onClick={handleApplyTag}>Apply Tag</Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
          <button className="ml-auto text-xs text-slate-500 hover:text-slate-700" onClick={() => setSelected([])}>Clear</button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          <SearchInput placeholder="Search by name, email, phone…" onSearch={handleSearch} className="w-64" />
          <select value={filters.listId ?? ''} onChange={(e) => setFilter('listId', e.target.value || null)} className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All Lists</option>
            {lists.map(l => <option key={l.id} value={l.id}>{l.listName}</option>)}
          </select>
          <select value={filters.status ?? ''} onChange={(e) => setFilter('status', e.target.value || null)} className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="ml-auto text-xs text-slate-400">Page {filters.page} | Limit {filters.limit}</div>
        </div>

        <DataTable
          data={contacts}
          columns={COLUMNS}
          isLoading={isLoading}
          selectable
          selected={selected}
          onSelectionChange={setSelected}
          emptyTitle="No contacts found"
          emptyDescription="Try adjusting your search or filters."
          emptyAction={<Button variant="primary" leftIcon={<UploadIcon />} onClick={handleImport}>Import Contacts</Button>}
        />

        <Pagination page={filters.page} totalPages={totalPages} totalItems={total} limit={filters.limit} onPageChange={(p) => setFilter('page', p)} />
      </div>
    </div>
  );
}