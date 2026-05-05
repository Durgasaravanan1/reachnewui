


// // IntegrationsTab.jsx – API Keys & Webhooks
// import React, { useState, useEffect } from 'react';

// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : '—';

// // Icons
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const PowerIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M12 2v4m0 0a8 8 0 110 16 8 8 0 010-16zM12 18v-4" />
//   </svg>
// );

// const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//   };
//   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm" };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const Badge = ({ children, variant }) => {
//   const variants = { active: 'bg-emerald-100 text-emerald-700', inactive: 'bg-slate-100 text-slate-500' };
//   return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${variants[variant] || variants.active}`}>{children}</span>;
// };

// const Modal = ({ open, onClose, title, description, children, footer }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
//           <div><h3 className="text-lg font-bold text-slate-900">{title}</h3>{description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}</div>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
//         </div>
//         <div className="px-6 py-4">{children}</div>
//         {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">{footer}</div>}
//       </div>
//     </div>
//   );
// };

// const Input = ({ label, placeholder, value, onChange }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <input type="text" placeholder={placeholder} value={value} onChange={onChange}
//       className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
//   </div>
// );

// const Skeleton = ({ className }) => <div className={`bg-slate-200 animate-pulse rounded ${className}`} />;

// export default function IntegrationsTab() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [apiKeys, setApiKeys] = useState([
//     { id: '1', name: 'WynCRM Sync', prefix: 'wyn_1a2b3c', scope: 'contacts.read', lastUsed: '2026-04-29', status: 'active' },
//     { id: '2', name: 'Analytics Export', prefix: 'wyn_4d5e6f', scope: 'analytics.read', lastUsed: null, status: 'active' },
//   ]);
//   const [webhooks, setWebhooks] = useState([
//     { id: '1', url: 'https://api.example.com/webhook', events: 'campaigns.send, contact.created', status: 'active' },
//     { id: '2', url: 'https://webhook.site/test', events: 'campaign.opened', status: 'inactive' },
//   ]);
//   const [showKeyModal, setShowKeyModal] = useState(false);
//   const [newKeyName, setNewKeyName] = useState('');
//   const [isCreating, setIsCreating] = useState(false);

//   useEffect(() => {
//     console.log('[IntegrationsTab] Loading integrations...');
//     setTimeout(() => {
//       console.log('[IntegrationsTab] Loaded:', { apiKeys: apiKeys.length, webhooks: webhooks.length });
//       setIsLoading(false);
//     }, 500);
//   }, []);

//   const handleCreateKey = () => {
//     if (!newKeyName.trim()) { alert('Key name is required'); return; }
//     console.log(`[IntegrationsTab] Creating API key: ${newKeyName}`);
//     setIsCreating(true);
//     setTimeout(() => {
//       console.log('[IntegrationsTab] API key created successfully');
//       setIsCreating(false);
//       setShowKeyModal(false);
//       setNewKeyName('');
//       alert(`API Key "${newKeyName}" created successfully!`);
//     }, 800);
//   };

//   const handleDeactivateKey = (keyName, keyId) => {
//     console.log(`[IntegrationsTab] Deactivating API key: ${keyName} (${keyId})`);
//     alert(`Deactivate ${keyName}? (Demo action)`);
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="bg-white rounded-xl border border-slate-200 p-5"><Skeleton className="h-6 w-40 mb-4" /><Skeleton className="h-20 w-full" /></div>
//         <div className="bg-white rounded-xl border border-slate-200 p-5"><div className="flex justify-between mb-4"><Skeleton className="h-6 w-24" /><Skeleton className="h-8 w-24" /></div><Skeleton className="h-16 w-full mb-3" /><Skeleton className="h-16 w-full" /></div>
//         <div className="bg-white rounded-xl border border-slate-200 p-5"><div className="flex justify-between mb-4"><Skeleton className="h-6 w-20" /><Skeleton className="h-8 w-24" /></div><Skeleton className="h-16 w-full mb-3" /><Skeleton className="h-16 w-full" /></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Connected Integrations */}
//       <div className="bg-white rounded-xl border border-slate-200 p-5">
//         <h3 className="text-sm font-bold text-slate-900 mb-4">Connected Integrations</h3>
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50/30">
//           <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-lg shrink-0">🔗</div>
//           <div className="flex-1"><p className="font-semibold text-sm text-slate-800">WynCRM</p><p className="text-xs text-slate-400 mt-0.5">Contact sync · Read-only · Last synced: just now</p></div>
//           <Badge variant="active">Connected ✓</Badge>
//           <Button variant="secondary" size="sm">Configure</Button>
//         </div>
//       </div>

//       {/* Webhooks */}
//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
//           <h3 className="text-sm font-bold text-slate-900">Webhooks</h3>
//           <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={() => alert('Add webhook endpoint')}>Add Endpoint</Button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead><tr className="border-b border-slate-100 bg-slate-50">
//               <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">URL</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">EVENTS</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">STATUS</th><th className="px-4 py-3"></th>
//             </tr></thead>
//             <tbody className="divide-y divide-slate-100">
//               {webhooks.map(w => (
//                 <tr key={w.id} className="hover:bg-slate-50"><td className="px-4 py-3 font-mono text-xs text-slate-700 max-w-xs truncate">{w.url}</td>
//                   <td className="px-4 py-3 text-xs text-slate-500">{w.events}</td><td className="px-4 py-3"><Badge variant={w.status}>{w.status === 'active' ? 'Active' : 'Inactive'}</Badge></td>
//                   <td className="px-4 py-3"><Button variant="ghost" size="sm">⋯</Button></td></tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* API Keys */}
//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
//           <h3 className="text-sm font-bold text-slate-900">API Keys</h3>
//           <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={() => setShowKeyModal(true)}>Create Key</Button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead><tr className="border-b border-slate-100 bg-slate-50">
//               <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">NAME</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">PREFIX</th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">SCOPE</th><th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">LAST USED</th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">STATUS</th><th className="px-4 py-3"></th>
//             </tr></thead>
//             <tbody className="divide-y divide-slate-100">
//               {apiKeys.map(k => (
//                 <tr key={k.id} className="hover:bg-slate-50"><td className="px-4 py-3 font-semibold text-slate-800">{k.name}</td>
//                   <td className="px-4 py-3"><code className="bg-slate-100 text-slate-700 text-xs px-1.5 py-0.5 rounded">{k.prefix}…</code></td>
//                   <td className="px-4 py-3 text-xs text-slate-500">{k.scope}</td><td className="px-4 py-3 text-xs text-slate-400">{k.lastUsed || '—'}</td>
//                   <td className="px-4 py-3"><Badge variant="active">Active</Badge></td>
//                   <td className="px-4 py-3"><Button variant="ghost" size="sm" leftIcon={<PowerIcon />} onClick={() => handleDeactivateKey(k.name, k.id)}>Deactivate</Button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal open={showKeyModal} onClose={() => setShowKeyModal(false)} title="Create API Key" description="This key will have access to your workspace data."
//         footer={<><Button variant="secondary" onClick={() => setShowKeyModal(false)}>Cancel</Button><Button variant="primary" loading={isCreating} onClick={handleCreateKey}>Create Key</Button></>}>
//         <Input label="Key Name" placeholder="e.g. WynCRM Sync, Analytics Export" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
//       </Modal>
//     </div>
//   );
// }


// IntegrationsTab.jsx – Fully working with all buttons functional
import React, { useState, useEffect } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Updated Icons
const PlusIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PowerIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M12 2v4m0 0a8 8 0 110 16 8 8 0 010-16zM12 18v-4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// UI Components
const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-bold transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#4F46E5] text-white hover:bg-[#4338CA] focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-sm focus:ring-slate-300",
    ghost: "text-slate-400 hover:text-slate-600 px-1 focus:ring-slate-300",
  };
  const sizes = { sm: "px-3 py-1.5 text-[13px]", md: "px-4 py-2 text-sm" };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />}
      {!loading && leftIcon && leftIcon}
      {children}
    </button>
  );
};

const StatusBadge = ({ children, variant = 'active' }) => {
  const variants = {
    active: "bg-[#F0FDF4] text-[#16A34A]",
    inactive: "bg-[#F1F5F9] text-[#64748B]"
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] font-bold ${variants[variant]}`}>
      {children}
    </span>
  );
};

const IntegrationBadge = ({ children }) => (
  <span className="inline-flex items-center text-[13px] font-bold text-[#16A34A]">
    {children}
  </span>
);

const ScopeBadge = ({ children }) => (
  <span className="bg-slate-50 border border-slate-200 text-slate-600 text-[11px] px-2 py-0.5 rounded font-medium">
    {children}
  </span>
);

const Input = ({ label, placeholder, value, onChange, type = 'text', error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn(
        "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
        error ? "border-red-300" : "border-slate-200"
      )}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Checkbox = ({ label, description, checked, onChange }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
    />
    <div className="flex-1">
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
      {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
    </div>
  </label>
);

const Modal = ({ open, onClose, title, description, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <XIcon />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="sticky bottom-0 bg-white flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Available webhook events
const WEBHOOK_EVENTS = [
  { id: 'campaign.sent', label: 'Campaign Sent', description: 'When a campaign is dispatched' },
  { id: 'campaign.opened', label: 'Campaign Opened', description: 'When a recipient opens an email' },
  { id: 'campaign.clicked', label: 'Campaign Clicked', description: 'When a link is clicked in a campaign' },
  { id: 'campaign.bounced', label: 'Campaign Bounced', description: 'When an email bounces' },
  { id: 'campaign.completed', label: 'Campaign Completed', description: 'When a campaign finishes sending' },
  { id: 'contact.created', label: 'Contact Created', description: 'When a new contact is added' },
  { id: 'contact.updated', label: 'Contact Updated', description: 'When contact details change' },
  { id: 'contact.unsubscribed', label: 'Contact Unsubscribed', description: 'When a contact unsubscribes' },
  { id: 'list.created', label: 'List Created', description: 'When a new list is created' },
  { id: 'workflow.started', label: 'Workflow Started', description: 'When an automation workflow starts' },
  { id: 'workflow.completed', label: 'Workflow Completed', description: 'When a workflow finishes' },
  { id: 'workflow.failed', label: 'Workflow Failed', description: 'When a workflow step fails' },
];

// Available API Key Scopes
const API_SCOPES = [
  { id: 'contacts:read', label: 'contacts:read', description: 'View contacts and contact lists' },
  { id: 'contacts:write', label: 'contacts:write', description: 'Create, update, and delete contacts' },
  { id: 'campaigns:read', label: 'campaigns:read', description: 'View campaigns and their analytics' },
  { id: 'campaigns:write', label: 'campaigns:write', description: 'Create and send campaigns' },
  { id: 'analytics:read', label: 'analytics:read', description: 'Access analytics and reporting data' },
  { id: 'webhooks:manage', label: 'webhooks:manage', description: 'Create and manage webhook endpoints' },
];

// Simulated API calls
const createWebhook = async (url, events) => {
  console.log(`[API] Creating webhook: ${url}, Events: ${events.join(', ')}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    webhook: { url, events: events.join(', '), status: 'active' }
  };
};

const createAPIKey = async (name, scopes) => {
  console.log(`[API] Creating API Key: ${name}, Scopes: ${scopes.join(', ')}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    apiKey: {
      id: `key_${Date.now()}`,
      name,
      prefix: `wyr_${Math.random().toString(36).substring(2, 8)}...`,
      scopes,
      lastUsed: 'never',
      status: 'active'
    }
  };
};

export default function IntegrationsTab() {
  const [isLoading, setIsLoading] = useState(true);
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'WynCRM Sync', prefix: 'wyr_k8x2...', scopes: ['contacts:read', 'contacts:write'], lastUsed: '6h ago', status: 'active' },
    { id: '2', name: 'Analytics Export', prefix: 'wyr_m4p9...', scopes: ['analytics:read'], lastUsed: '2d ago', status: 'active' },
  ]);
  
  // Webhooks state
  const [webhooks, setWebhooks] = useState([
    { id: '1', url: 'https://api.growfast.co/webhooks/reach', events: 'campaign_sent, campaign_completed, contact_unsubscribed', status: 'active' },
  ]);
  
  // Modal states
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedScopes, setSelectedScopes] = useState(['contacts:read']);
  const [keyNameError, setKeyNameError] = useState('');
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ url: '', events: [] });
  const [webhookUrlError, setWebhookUrlError] = useState('');
  const [isAddingWebhook, setIsAddingWebhook] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // Toggle scope selection
  const toggleScope = (scopeId) => {
    setSelectedScopes(prev => 
      prev.includes(scopeId)
        ? prev.filter(s => s !== scopeId)
        : [...prev, scopeId]
    );
  };

  // Select/Deselect all scopes
  const selectAllScopes = () => {
    if (selectedScopes.length === API_SCOPES.length) {
      setSelectedScopes([]);
    } else {
      setSelectedScopes(API_SCOPES.map(s => s.id));
    }
  };

  // Create API Key with scopes
  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      setKeyNameError('Key name is required');
      return;
    }
    
    if (selectedScopes.length === 0) {
      alert('Please select at least one scope');
      return;
    }
    
    setKeyNameError('');
    setIsCreatingKey(true);
    
    try {
      const result = await createAPIKey(newKeyName, selectedScopes);
      
      if (result.success) {
        setApiKeys(prev => [...prev, result.apiKey]);
        setIsCreatingKey(false);
        setShowKeyModal(false);
        setNewKeyName('');
        setSelectedScopes(['contacts:read']);
        alert(`API Key "${newKeyName}" created successfully!`);
      }
    } catch (error) {
      alert('Failed to create API key. Please try again.');
      setIsCreatingKey(false);
    }
  };

  // Deactivate API Key
  const handleDeactivateKey = (keyId, keyName) => {
    if (confirm(`Are you sure you want to deactivate "${keyName}"?`)) {
      setApiKeys(prev => prev.filter(k => k.id !== keyId));
      alert(`API Key "${keyName}" deactivated.`);
    }
  };

  // Create Webhook with API
  const handleAddWebhook = async () => {
    // Validate URL
    if (!newWebhook.url.trim()) {
      setWebhookUrlError('URL is required');
      return;
    }
    
    // Validate URL format
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(newWebhook.url)) {
      setWebhookUrlError('Please enter a valid URL (e.g., https://example.com/webhook)');
      return;
    }
    
    // Validate events selection
    if (newWebhook.events.length === 0) {
      alert('Please select at least one event');
      return;
    }
    
    setWebhookUrlError('');
    setIsAddingWebhook(true);
    
    try {
      const result = await createWebhook(newWebhook.url, newWebhook.events);
      
      if (result.success) {
        const newHook = {
          id: `webhook_${Date.now()}`,
          url: newWebhook.url,
          events: newWebhook.events.join(', '),
          status: 'active',
        };
        setWebhooks(prev => [...prev, newHook]);
        setIsAddingWebhook(false);
        setShowWebhookModal(false);
        setNewWebhook({ url: '', events: [] });
        alert('Webhook endpoint added successfully!');
      }
    } catch (error) {
      alert('Failed to create webhook. Please try again.');
      setIsAddingWebhook(false);
    }
  };

  // Toggle event selection
  const toggleEvent = (eventId) => {
    setNewWebhook(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(e => e !== eventId)
        : [...prev.events, eventId]
    }));
  };

  // Select/Deselect all events
  const selectAllEvents = () => {
    if (newWebhook.events.length === WEBHOOK_EVENTS.length) {
      setNewWebhook(prev => ({ ...prev, events: [] }));
    } else {
      setNewWebhook(prev => ({ ...prev, events: WEBHOOK_EVENTS.map(e => e.id) }));
    }
  };

  // Delete Webhook
  const handleDeleteWebhook = (hookId, hookUrl) => {
    if (confirm(`Are you sure you want to delete webhook "${hookUrl}"?`)) {
      setWebhooks(prev => prev.filter(w => w.id !== hookId));
      alert('Webhook deleted.');
    }
  };

  // Toggle Webhook Status
  const handleToggleWebhookStatus = (hookId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setWebhooks(prev => prev.map(w => w.id === hookId ? { ...w, status: newStatus } : w));
  };

  // Configure WynCRM
  const handleConfigureCrm = () => {
    alert('Open WynCRM configuration panel');
  };

  if (isLoading) return <div className="p-10 text-slate-400">Loading integrations...</div>;

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Connected Integrations */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-[15px] font-bold text-slate-900 mb-5">Connected Integrations</h3>
        <div className="rounded-xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-xl shrink-0">🔗</div>
          <div className="flex-1">
            <p className="font-bold text-[15px] text-slate-900">WynCRM</p>
            <p className="text-[13px] text-slate-400 mt-0.5">Contact sync • Read-only • Last synced: Apr 22, 2026 at 6:00 AM</p>
          </div>
          <div className="flex items-center gap-4">
            <IntegrationBadge>Connected ✓</IntegrationBadge>
            <Button variant="secondary" size="sm" onClick={handleConfigureCrm}>Configure</Button>
          </div>
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">Webhooks</h3>
            <p className="text-xs text-slate-400 mt-0.5">Receive real-time events via HTTP endpoints</p>
          </div>
          <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={() => setShowWebhookModal(true)}>
            Add Endpoint
          </Button>
        </div>
        <div className="space-y-3">
          {webhooks.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-sm text-slate-400">No webhook endpoints configured</p>
              <Button variant="secondary" size="sm" onClick={() => setShowWebhookModal(true)} className="mt-3">
                Add your first webhook
              </Button>
            </div>
          ) : (
            webhooks.map((webhook) => (
              <div key={webhook.id} className="rounded-xl border border-slate-200 p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-xl shrink-0">⚡</div>
                <div className="flex-1">
                  <p className="font-bold text-[15px] text-slate-900">{webhook.url}</p>
                  <p className="text-[13px] text-slate-400 mt-0.5">Events: {webhook.events}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleToggleWebhookStatus(webhook.id, webhook.status)}>
                    <StatusBadge variant={webhook.status}>{webhook.status === 'active' ? 'Active' : 'Inactive'}</StatusBadge>
                  </button>
                  <Button variant="ghost" onClick={() => handleDeleteWebhook(webhook.id, webhook.url)}>
                    <PowerIcon />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-bold text-slate-900">API Keys</h3>
          <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={() => {
            setSelectedScopes(['contacts:read']);
            setShowKeyModal(true);
          }}>
            Create Key
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 border-y border-slate-200">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prefix</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scopes</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Used</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-200">
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-5 text-[14px] font-bold text-slate-700">{key.name}</td>
                  <td className="px-4 py-5 font-mono text-[13px] text-slate-500">{key.prefix}</td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2 flex-wrap">
                      {key.scopes.map(s => <ScopeBadge key={s}>{s}</ScopeBadge>)}
                    </div>
                  </td>
                  <td className="px-4 py-5 text-[13px] text-slate-400 font-medium">{key.lastUsed}</td>
                  <td className="px-4 py-5"><StatusBadge>Active</StatusBadge></td>
                  <td className="px-4 py-5 text-right">
                    <Button variant="ghost" onClick={() => handleDeactivateKey(key.id, key.name)}>
                      <PowerIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create API Key with Scope Selection */}
      <Modal
        open={showKeyModal}
        onClose={() => {
          setShowKeyModal(false);
          setNewKeyName('');
          setSelectedScopes(['contacts:read']);
          setKeyNameError('');
        }}
        title="Create API Key"
        description="Define permissions for this API key. Only grant necessary access."
        footer={
          <>
            <Button variant="secondary" onClick={() => {
              setShowKeyModal(false);
              setNewKeyName('');
              setSelectedScopes(['contacts:read']);
              setKeyNameError('');
            }}>
              Cancel
            </Button>
            <Button variant="primary" loading={isCreatingKey} onClick={handleCreateKey}>
              {isCreatingKey ? 'Creating...' : 'Create Key'}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          {/* Key Name Input */}
          <Input
            label="Key Name"
            placeholder="e.g., WynCRM Sync, Analytics Export"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            error={keyNameError}
          />

          {/* Scopes Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-700">Permissions (Scopes)</label>
              <button 
                onClick={selectAllScopes}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {selectedScopes.length === API_SCOPES.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500">
                  {selectedScopes.length} of {API_SCOPES.length} selected
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {API_SCOPES.map((scope) => (
                  <div key={scope.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                    <Checkbox
                      label={scope.label}
                      description={scope.description}
                      checked={selectedScopes.includes(scope.id)}
                      onChange={() => toggleScope(scope.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
            <p className="text-xs text-amber-700">
              ⚠️ <span className="font-semibold">Security Note:</span> API keys have the same permissions as your account. 
              Keep them secure and rotate them regularly.
            </p>
          </div>
        </div>
      </Modal>

      {/* Modal: Add Webhook */}
      <Modal
        open={showWebhookModal}
        onClose={() => {
          setShowWebhookModal(false);
          setNewWebhook({ url: '', events: [] });
          setWebhookUrlError('');
        }}
        title="Add Webhook Endpoint"
        description="Receive real-time events when certain actions happen in your workspace."
        footer={
          <>
            <Button variant="secondary" onClick={() => {
              setShowWebhookModal(false);
              setNewWebhook({ url: '', events: [] });
              setWebhookUrlError('');
            }}>
              Cancel
            </Button>
            <Button variant="primary" loading={isAddingWebhook} onClick={handleAddWebhook}>
              {isAddingWebhook ? 'Adding...' : 'Add Webhook'}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          {/* URL Input */}
          <Input
            label="Endpoint URL"
            placeholder="https://your-domain.com/webhook/receive"
            value={newWebhook.url}
            onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
            error={webhookUrlError}
          />
          <p className="text-xs text-slate-400 -mt-2">
            We'll send POST requests to this URL when selected events occur.
          </p>

          {/* Events Multi-Checkbox */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-700">Events to Subscribe</label>
              <button 
                onClick={selectAllEvents}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {newWebhook.events.length === WEBHOOK_EVENTS.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500">
                  {newWebhook.events.length} of {WEBHOOK_EVENTS.length} selected
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {/* Campaign Events Section */}
                <div className="bg-slate-50/50 px-4 py-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Campaign Events</span>
                </div>
                {WEBHOOK_EVENTS.filter(e => e.id.startsWith('campaign.')).map((event) => (
                  <div key={event.id} className="px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <Checkbox
                      label={event.label}
                      description={event.description}
                      checked={newWebhook.events.includes(event.id)}
                      onChange={() => toggleEvent(event.id)}
                    />
                  </div>
                ))}

                {/* Contact Events Section */}
                <div className="bg-slate-50/50 px-4 py-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Contact Events</span>
                </div>
                {WEBHOOK_EVENTS.filter(e => e.id.startsWith('contact.')).map((event) => (
                  <div key={event.id} className="px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <Checkbox
                      label={event.label}
                      description={event.description}
                      checked={newWebhook.events.includes(event.id)}
                      onChange={() => toggleEvent(event.id)}
                    />
                  </div>
                ))}

                {/* List Events Section */}
                <div className="bg-slate-50/50 px-4 py-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">List Events</span>
                </div>
                {WEBHOOK_EVENTS.filter(e => e.id.startsWith('list.')).map((event) => (
                  <div key={event.id} className="px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <Checkbox
                      label={event.label}
                      description={event.description}
                      checked={newWebhook.events.includes(event.id)}
                      onChange={() => toggleEvent(event.id)}
                    />
                  </div>
                ))}

                {/* Workflow Events Section */}
                <div className="bg-slate-50/50 px-4 py-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Workflow Events</span>
                </div>
                {WEBHOOK_EVENTS.filter(e => e.id.startsWith('workflow.')).map((event) => (
                  <div key={event.id} className="px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <Checkbox
                      label={event.label}
                      description={event.description}
                      checked={newWebhook.events.includes(event.id)}
                      onChange={() => toggleEvent(event.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <p className="text-xs text-slate-500">
              💡 <span className="font-semibold">Tip:</span> Webhook URLs must be publicly accessible over HTTPS. 
              We'll send a test event when you save.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}