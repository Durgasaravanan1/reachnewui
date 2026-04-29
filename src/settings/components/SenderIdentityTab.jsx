

// // SenderIdentityTab.jsx – Email Domains & WhatsApp Business
// import React, { useState, useEffect } from 'react';

// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => num?.toLocaleString() || '0';

// // Icons
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const CheckCircleIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const AlertCircleIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const ClockIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

// const StatusBadge = ({ status }) => {
//   const config = {
//     verified: { variant: 'bg-emerald-100 text-emerald-700', icon: <CheckCircleIcon />, label: 'Verified' },
//     active: { variant: 'bg-emerald-100 text-emerald-700', icon: <CheckCircleIcon />, label: 'Active' },
//     pending: { variant: 'bg-amber-100 text-amber-700', icon: <ClockIcon />, label: 'Pending' },
//     unverified: { variant: 'bg-slate-100 text-slate-500', icon: <AlertCircleIcon />, label: 'Unverified' },
//   };
//   const { variant, icon, label } = config[status] || config.unverified;
//   return (
//     <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${variant}`}>
//       {icon}
//       {label}
//     </span>
//   );
// };

// const Skeleton = ({ className }) => (
//   <div className={`bg-slate-200 animate-pulse rounded ${className}`} />
// );

// export default function SenderIdentityTab() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [emailDomains, setEmailDomains] = useState([
//     { id: '1', domain: 'wynsync.com', dkimStatus: 'verified', spfStatus: 'verified', fromEmail: 'team@wynsync.com', replyTo: 'support@wynsync.com' },
//     { id: '2', domain: 'marketing.wynsync.com', dkimStatus: 'pending', spfStatus: 'verified', fromEmail: 'offers@marketing.wynsync.com', replyTo: null },
//   ]);
//   const [whatsappNumbers, setWhatsappNumbers] = useState([
//     { id: '1', phoneNumber: '+919840012345', status: 'active', accountName: 'WYNSync Business', templates: 4 },
//   ]);

//   useEffect(() => {
//     console.log('[SenderIdentityTab] Loading sender identities...');
//     setTimeout(() => {
//       console.log('[SenderIdentityTab] Loaded:', { emailDomains: emailDomains.length, whatsappNumbers: whatsappNumbers.length });
//       setIsLoading(false);
//     }, 500);
//   }, []);

//   const handleVerifyDomain = (domainId, domainName) => {
//     console.log(`[SenderIdentityTab] Verifying domain: ${domainName} (${domainId})`);
//     alert(`Verification initiated for ${domainName}. Check DNS records for DKIM/SPF.`);
//   };

//   const handleAddDomain = () => {
//     console.log('[SenderIdentityTab] Add domain clicked');
//     alert('Add domain: Enter your domain name to start verification');
//   };

//   const handleLinkNumber = () => {
//     console.log('[SenderIdentityTab] Link WhatsApp number clicked');
//     alert('Connect your WhatsApp Business account via Meta Business Suite');
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="bg-white rounded-xl border border-slate-200 p-5">
//           <div className="flex justify-between mb-4"><Skeleton className="h-6 w-32" /><Skeleton className="h-8 w-24" /></div>
//           <Skeleton className="h-24 w-full mb-3" />
//           <Skeleton className="h-24 w-full" />
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-5">
//           <div className="flex justify-between mb-4"><Skeleton className="h-6 w-40" /><Skeleton className="h-8 w-24" /></div>
//           <Skeleton className="h-20 w-full" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Email Sending Domains */}
//       <div className="bg-white rounded-xl border border-slate-200 p-5">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//           <div>
//             <h3 className="text-sm font-bold text-slate-900">Email Sending Domains</h3>
//             <p className="text-xs text-slate-400 mt-0.5">DKIM and SPF verification required for deliverability</p>
//           </div>
//           <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={handleAddDomain}>
//             Add Domain
//           </Button>
//         </div>

//         <div className="space-y-3">
//           {emailDomains.map(domain => (
//             <div key={domain.id} className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
//               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                 <div className="flex-1">
//                   <p className="font-semibold text-slate-800">{domain.domain}</p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <StatusBadge status={domain.dkimStatus} />
//                     <StatusBadge status={domain.spfStatus} />
//                   </div>
//                   <p className="text-xs text-slate-400 mt-2">
//                     From: {domain.fromEmail}
//                     {domain.replyTo && <span className="ml-2">Reply-to: {domain.replyTo}</span>}
//                   </p>
//                 </div>
//                 {(domain.dkimStatus !== 'verified' || domain.spfStatus !== 'verified') && (
//                   <Button variant="secondary" size="sm" onClick={() => handleVerifyDomain(domain.id, domain.domain)}>
//                     Verify
//                   </Button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* WhatsApp Business */}
//       <div className="bg-white rounded-xl border border-slate-200 p-5">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//           <div>
//             <h3 className="text-sm font-bold text-slate-900">WhatsApp Business</h3>
//             <p className="text-xs text-slate-400 mt-0.5">Connect your Meta WhatsApp Business account</p>
//           </div>
//           <Button variant="secondary" size="sm" leftIcon={<PlusIcon />} onClick={handleLinkNumber}>
//             Link Number
//           </Button>
//         </div>

//         <div className="space-y-3">
//           {whatsappNumbers.map(wa => (
//             <div key={wa.id} className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                   <p className="font-semibold text-slate-800">{wa.phoneNumber}</p>
//                   <p className="text-xs text-slate-400 mt-0.5">{wa.accountName} · {wa.templates} approved templates</p>
//                 </div>
//                 <StatusBadge status={wa.status} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// SenderIdentityTab.jsx – With working add domain & link number modals
import React, { useState, useEffect } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => num?.toLocaleString() || '0';

// Icons
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const StatusBadge = ({ status }) => {
  const config = {
    verified: { variant: 'bg-emerald-100 text-emerald-700', icon: <CheckCircleIcon />, label: 'Verified' },
    active: { variant: 'bg-emerald-100 text-emerald-700', icon: <CheckCircleIcon />, label: 'Active' },
    pending: { variant: 'bg-amber-100 text-amber-700', icon: <ClockIcon />, label: 'Pending' },
    unverified: { variant: 'bg-slate-100 text-slate-500', icon: <AlertCircleIcon />, label: 'Unverified' },
  };
  const { variant, icon, label } = config[status] || config.unverified;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${variant}`}>
      {icon}
      {label}
    </span>
  );
};

const Skeleton = ({ className }) => (
  <div className={`bg-slate-200 animate-pulse rounded ${className}`} />
);

// Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
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

// Main Component
export default function SenderIdentityTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [emailDomains, setEmailDomains] = useState([
    { id: '1', domain: 'wynsync.com', dkimStatus: 'verified', spfStatus: 'verified', fromEmail: 'team@wynsync.com', replyTo: 'support@wynsync.com' },
    { id: '2', domain: 'marketing.wynsync.com', dkimStatus: 'pending', spfStatus: 'verified', fromEmail: 'offers@marketing.wynsync.com', replyTo: null },
  ]);
  const [whatsappNumbers, setWhatsappNumbers] = useState([
    { id: '1', phoneNumber: '+919840012345', status: 'active', accountName: 'WYNSync Business', templates: 4 },
  ]);

  // Modal states and forms
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [showLinkNumber, setShowLinkNumber] = useState(false);
  const [domainForm, setDomainForm] = useState({ domain: '', fromEmail: '', replyTo: '' });
  const [domainFormError, setDomainFormError] = useState('');
  const [waForm, setWaForm] = useState({ phoneNumber: '', accountName: '' });
  const [waFormError, setWaFormError] = useState('');

  useEffect(() => {
    console.log('[SenderIdentityTab] Loading sender identities...');
    setTimeout(() => {
      console.log('[SenderIdentityTab] Loaded:', { emailDomains: emailDomains.length, whatsappNumbers: whatsappNumbers.length });
      setIsLoading(false);
    }, 500);
  }, []);

  const handleVerifyDomain = (domainId, domainName) => {
    console.log(`[SenderIdentityTab] Verifying domain: ${domainName} (${domainId})`);
    alert(`Verification initiated for ${domainName}. Check DNS records for DKIM/SPF.`);
  };

  const handleAddDomainSubmit = () => {
    if (!domainForm.domain.trim()) {
      setDomainFormError('Domain name is required');
      return;
    }
    if (!domainForm.fromEmail.trim() || !domainForm.fromEmail.includes('@')) {
      setDomainFormError('Valid From email is required');
      return;
    }
    setDomainFormError('');
    const newDomain = {
      id: `domain_${Date.now()}`,
      domain: domainForm.domain,
      dkimStatus: 'pending',
      spfStatus: 'pending',
      fromEmail: domainForm.fromEmail,
      replyTo: domainForm.replyTo || null,
    };
    console.log('[SenderIdentityTab] New email domain added:', newDomain);
    setEmailDomains(prev => [...prev, newDomain]);
    setShowAddDomain(false);
    setDomainForm({ domain: '', fromEmail: '', replyTo: '' });
  };

  const handleLinkNumberSubmit = () => {
    if (!waForm.phoneNumber.trim()) {
      setWaFormError('Phone number is required');
      return;
    }
    if (!waForm.accountName.trim()) {
      setWaFormError('Account name is required');
      return;
    }
    setWaFormError('');
    const newWhatsApp = {
      id: `wa_${Date.now()}`,
      phoneNumber: waForm.phoneNumber,
      status: 'pending',
      accountName: waForm.accountName,
      templates: 0,
    };
    console.log('[SenderIdentityTab] New WhatsApp number linked:', newWhatsApp);
    setWhatsappNumbers(prev => [...prev, newWhatsApp]);
    setShowLinkNumber(false);
    setWaForm({ phoneNumber: '', accountName: '' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex justify-between mb-4"><Skeleton className="h-6 w-32" /><Skeleton className="h-8 w-24" /></div>
          <Skeleton className="h-24 w-full mb-3" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex justify-between mb-4"><Skeleton className="h-6 w-40" /><Skeleton className="h-8 w-24" /></div>
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Email Sending Domains */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Email Sending Domains</h3>
              <p className="text-xs text-slate-400 mt-0.5">DKIM and SPF verification required for deliverability</p>
            </div>
            <Button variant="primary" size="sm" leftIcon={<PlusIcon />} onClick={() => setShowAddDomain(true)}>
              Add Domain
            </Button>
          </div>

          <div className="space-y-3">
            {emailDomains.map(domain => (
              <div key={domain.id} className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{domain.domain}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <StatusBadge status={domain.dkimStatus} />
                      <StatusBadge status={domain.spfStatus} />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      From: {domain.fromEmail}
                      {domain.replyTo && <span className="ml-2">Reply-to: {domain.replyTo}</span>}
                    </p>
                  </div>
                  {(domain.dkimStatus !== 'verified' || domain.spfStatus !== 'verified') && (
                    <Button variant="secondary" size="sm" onClick={() => handleVerifyDomain(domain.id, domain.domain)}>
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Business */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">WhatsApp Business</h3>
              <p className="text-xs text-slate-400 mt-0.5">Connect your Meta WhatsApp Business account</p>
            </div>
            <Button variant="secondary" size="sm" leftIcon={<PlusIcon />} onClick={() => setShowLinkNumber(true)}>
              Link Number
            </Button>
          </div>

          <div className="space-y-3">
            {whatsappNumbers.map(wa => (
              <div key={wa.id} className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-800">{wa.phoneNumber}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{wa.accountName} · {wa.templates} approved templates</p>
                  </div>
                  <StatusBadge status={wa.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Add Domain */}
      <Modal isOpen={showAddDomain} onClose={() => setShowAddDomain(false)} title="Add Email Sending Domain">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Domain</label>
            <input
              type="text"
              value={domainForm.domain}
              onChange={(e) => setDomainForm(prev => ({ ...prev, domain: e.target.value }))}
              placeholder="example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">From Email</label>
            <input
              type="email"
              value={domainForm.fromEmail}
              onChange={(e) => setDomainForm(prev => ({ ...prev, fromEmail: e.target.value }))}
              placeholder="team@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Reply-to Email (optional)</label>
            <input
              type="email"
              value={domainForm.replyTo}
              onChange={(e) => setDomainForm(prev => ({ ...prev, replyTo: e.target.value }))}
              placeholder="support@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          {domainFormError && <p className="text-xs text-red-500">{domainFormError}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddDomain(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddDomainSubmit}>Add Domain</Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Link WhatsApp Number */}
      <Modal isOpen={showLinkNumber} onClose={() => setShowLinkNumber(false)} title="Link WhatsApp Business Number">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number (with country code)</label>
            <input
              type="tel"
              value={waForm.phoneNumber}
              onChange={(e) => setWaForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="+919840012345"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Account Name</label>
            <input
              type="text"
              value={waForm.accountName}
              onChange={(e) => setWaForm(prev => ({ ...prev, accountName: e.target.value }))}
              placeholder="WYNSync Business"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          {waFormError && <p className="text-xs text-red-500">{waFormError}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowLinkNumber(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleLinkNumberSubmit}>Link Number</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}