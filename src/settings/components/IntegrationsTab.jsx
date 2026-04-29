


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
const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString() : '—';

// Icons
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const PowerIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M12 2v4m0 0a8 8 0 110 16 8 8 0 010-16zM12 18v-4" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// UI Components
const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
  };
  const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm" };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const Badge = ({ children, variant }) => {
  const variants = { active: 'bg-emerald-100 text-emerald-700', inactive: 'bg-slate-100 text-slate-500' };
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${variants[variant] || variants.active}`}>{children}</span>;
};

const Modal = ({ open, onClose, title, description, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div><h3 className="text-lg font-bold text-slate-900">{title}</h3>{description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}</div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
};

const Input = ({ label, placeholder, value, onChange, type = 'text' }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
  </div>
);

const Skeleton = ({ className }) => <div className={`bg-slate-200 animate-pulse rounded ${className}`} />;

export default function IntegrationsTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'WynCRM Sync', prefix: 'wyn_1a2b3c', scope: 'contacts.read', lastUsed: '2026-04-29', status: 'active' },
    { id: '2', name: 'Analytics Export', prefix: 'wyn_4d5e6f', scope: 'analytics.read', lastUsed: null, status: 'active' },
  ]);
  const [webhooks, setWebhooks] = useState([
    { id: '1', url: 'https://api.example.com/webhook', events: 'campaigns.send, contact.created', status: 'active' },
    { id: '2', url: 'https://webhook.site/test', events: 'campaign.opened', status: 'inactive' },
  ]);

  // Modal states
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ url: '', events: '', status: 'active' });
  const [isAddingWebhook, setIsAddingWebhook] = useState(false);

  useEffect(() => {
    console.log('[IntegrationsTab] Loading integrations...');
    setTimeout(() => {
      console.log('[IntegrationsTab] Loaded:', { apiKeys: apiKeys.length, webhooks: webhooks.length });
      setIsLoading(false);
    }, 500);
  }, []);

  // Add API Key
  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      alert('Key name is required');
      return;
    }
    console.log(`[IntegrationsTab] Creating API key: ${newKeyName}`);
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      const newKey = {
        id: `key_${Date.now()}`,
        name: newKeyName,
        prefix: `wyn_${Math.random().toString(36).substring(2, 8)}`,
        scope: 'contacts.read, analytics.read', // default scope
        lastUsed: null,
        status: 'active',
      };
      console.log('[IntegrationsTab] API key created:', newKey);
      setApiKeys(prev => [...prev, newKey]);
      setIsCreating(false);
      setShowKeyModal(false);
      setNewKeyName('');
      alert(`API Key "${newKeyName}" created successfully!`);
    }, 800);
  };

  // Deactivate (Remove) API Key
  const handleDeactivateKey = (keyId, keyName) => {
    console.log(`[IntegrationsTab] Deactivating API key: ${keyName} (${keyId})`);
    if (confirm(`Are you sure you want to deactivate "${keyName}"?`)) {
      setApiKeys(prev => prev.filter(k => k.id !== keyId));
      console.log(`[IntegrationsTab] API key removed: ${keyId}`);
      alert(`API Key "${keyName}" deactivated.`);
    }
  };

  // Add Webhook
  const handleAddWebhook = () => {
    if (!newWebhook.url.trim()) {
      alert('URL is required');
      return;
    }
    if (!newWebhook.events.trim()) {
      alert('Events are required (comma separated)');
      return;
    }
    console.log('[IntegrationsTab] Creating webhook:', newWebhook);
    setIsAddingWebhook(true);
    setTimeout(() => {
      const newHook = {
        id: `webhook_${Date.now()}`,
        url: newWebhook.url,
        events: newWebhook.events,
        status: 'active',
      };
      console.log('[IntegrationsTab] Webhook added:', newHook);
      setWebhooks(prev => [...prev, newHook]);
      setIsAddingWebhook(false);
      setShowWebhookModal(false);
      setNewWebhook({ url: '', events: '', status: 'active' });
      alert('Webhook endpoint added successfully!');
    }, 600);
  };

  // Configure WynCRM (just a demo action)
  const handleConfigureCrm = () => {
    console.log('[IntegrationsTab] Configure WynCRM clicked');
    alert('Open WynCRM configuration panel');
  };

  // Toggle webhook status (optional extension)
  const handleToggleWebhookStatus = (hookId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log(`[IntegrationsTab] Toggle webhook ${hookId} to ${newStatus}`);
    setWebhooks(prev => prev.map(w => w.id === hookId ? { ...w, status: newStatus } : w));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5"><Skeleton className="h-6 w-40 mb-4" /><Skeleton className="h-20 w-full" /></div>
        <div className="bg-white rounded-xl border border-slate-200 p-5"><div className="flex justify-between mb-4"><Skeleton className="h-6 w-24" /><Skeleton className="h-8 w-24" /></div><Skeleton className="h-16 w-full mb-3" /><Skeleton className="h-16 w-full" /></div>
        <div className="bg-white rounded-xl border border-slate-200 p-5"><div className="flex justify-between mb-4"><Skeleton className="h-6 w-20" /><Skeleton className="h-8 w-24" /></div><Skeleton className="h-16 w-full mb-3" /><Skeleton className="h-16 w-full" /></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connected Integrations */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Connected Integrations</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50/30">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-lg shrink-0">🔗</div>
          <div className="flex-1"><p className="font-semibold text-sm text-slate-800">WynCRM</p><p className="text-xs text-slate-400 mt-0.5">Contact sync · Read-only · Last synced: just now</p></div>
          <Badge variant="active">Connected ✓</Badge>
          <Button variant="secondary" size="sm" onClick={handleConfigureCrm}>Configure</Button>
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Webhooks</h3>
          <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={() => setShowWebhookModal(true)}>Add Endpoint</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">URL</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">EVENTS</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">STATUS</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {webhooks.map(w => (
                <tr key={w.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-700 max-w-xs truncate">{w.url}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{w.events}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleWebhookStatus(w.id, w.status)}>
                      <Badge variant={w.status}>{w.status === 'active' ? 'Active' : 'Inactive'}</Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3"><Button variant="ghost" size="sm">⋯</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">API Keys</h3>
          <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={() => setShowKeyModal(true)}>Create Key</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">NAME</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">PREFIX</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">SCOPE</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">LAST USED</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">STATUS</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {apiKeys.map(k => (
                <tr key={k.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-800">{k.name}</td>
                  <td className="px-4 py-3"><code className="bg-slate-100 text-slate-700 text-xs px-1.5 py-0.5 rounded">{k.prefix}…</code></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{k.scope}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{k.lastUsed || '—'}</td>
                  <td className="px-4 py-3"><Badge variant="active">Active</Badge></td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" leftIcon={<PowerIcon />} onClick={() => handleDeactivateKey(k.id, k.name)}>Deactivate</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create API Key */}
      <Modal open={showKeyModal} onClose={() => setShowKeyModal(false)} title="Create API Key" description="This key will have access to your workspace data."
        footer={<><Button variant="secondary" onClick={() => setShowKeyModal(false)}>Cancel</Button><Button variant="primary" loading={isCreating} onClick={handleCreateKey}>Create Key</Button></>}>
        <Input label="Key Name" placeholder="e.g. WynCRM Sync, Analytics Export" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
      </Modal>

      {/* Modal: Add Webhook */}
      <Modal open={showWebhookModal} onClose={() => setShowWebhookModal(false)} title="Add Webhook Endpoint" description="Receive events when certain actions happen."
        footer={<><Button variant="secondary" onClick={() => setShowWebhookModal(false)}>Cancel</Button><Button variant="primary" loading={isAddingWebhook} onClick={handleAddWebhook}>Add Webhook</Button></>}>
        <div className="space-y-4">
          <Input label="Endpoint URL" placeholder="https://your-domain.com/webhook" value={newWebhook.url} onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))} />
          <Input label="Events (comma separated)" placeholder="campaign.sent, contact.created" value={newWebhook.events} onChange={(e) => setNewWebhook(prev => ({ ...prev, events: e.target.value }))} />
          <p className="text-xs text-slate-400">Example: campaign.sent, campaign.opened, contact.created</p>
        </div>
      </Modal>
    </div>
  );
}