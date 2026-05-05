

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


import React, { useState } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Icons
const PlusIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CopyIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="h-5 w-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.458 1.011 4.693 2.673 6.306L4 21l3.738-1.326A10.15 10.15 0 0012 20.5c5.523 0 10-4.14 10-9.25S17.523 2 12 2z" />
  </svg>
);

const ThreeDotsIcon = () => (
  <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const MetaIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" color="#1877F2">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879-.146-.69-.242-1.505-.242-2.131 0-1.318.416-2.77.743-3.932l.553-2.07c-.14-.353-.319-1.044-.319-1.674 0-.988.553-1.736 1.256-1.736.592 0 .88.446.88 1.008 0 .614-.39 1.557-.592 2.438-.168.682.343 1.242 1.017 1.242 1.22 0 2.068-1.576 2.068-3.446 0-1.573-1.056-2.747-2.972-2.747-2.167 0-3.52 1.62-3.52 3.432 0 .616.182 1.05.467 1.386.131.154.149.216.101.396l-.18.696c-.054.205-.223.278-.405.19-1.135-.477-1.658-1.753-1.658-3.19 0-2.37 1.999-5.228 6.032-5.228 3.225 0 5.348 2.336 5.348 4.843 0 3.324-1.849 5.802-4.575 5.802-.915 0-1.774-.494-2.069-1.056l-.564 2.224c-.489 1.79-1.454 3.227-2.43 4.241C17.143 20.538 21 16.735 21 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

// UI Components
const Button = ({ children, variant, onClick, className, disabled, loading }) => {
  const variants = {
    primary: "bg-[#4F46E5] text-white hover:bg-[#4338CA]",
    secondary: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
  };
  return (
    <button 
      onClick={onClick} 
      disabled={disabled || loading}
      className={cn("px-4 py-1.5 rounded-lg text-sm font-semibold font-['Plus_Jakarta_Sans'] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed", variants[variant], className)}
    >
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {children}
    </button>
  );
};

const StatusBadge = ({ label, status }) => {
  const styles = {
    verified: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    pending: "bg-orange-50 text-orange-600 border border-orange-100",
    active: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded text-[11px] font-bold font-['Plus_Jakarta_Sans'] flex items-center gap-1", styles[status])}>
      {label} {status === 'verified' && '✓'}
    </span>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className={cn("bg-white rounded-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto", sizes[size])} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-slate-900 font-['Plus_Jakarta_Sans']">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

// DNS Instructions Component
const DNSInstructions = ({ domain, onClose }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const dnsRecords = [
    {
      type: 'TXT',
      name: domain,
      value: `v=spf1 include:spf.wynsync.com ~all`,
      description: 'SPF record authenticates your email sending servers'
    },
    {
      type: 'TXT',
      name: `default._domainkey.${domain}`,
      value: `v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...`,
      description: 'DKIM record digitally signs your emails'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 text-xl">📋</div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-1">DNS Records to Add</h4>
            <p className="text-xs text-slate-600">
              To verify your domain, add the following DNS records to your domain provider. 
              Verification may take up to 48 hours to propagate.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {dnsRecords.map((record, idx) => (
          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-600">{record.type}</span>
                  <span className="text-xs text-slate-500">Record</span>
                </div>
                <button 
                  onClick={() => handleCopy(record.value)}
                  className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1"
                >
                  <CopyIcon /> Copy
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Name/Host</label>
                <code className="text-sm font-mono bg-slate-100 p-2 rounded block break-all">{record.name}</code>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Value/Data</label>
                <code className="text-sm font-mono bg-slate-100 p-2 rounded block break-all whitespace-pre-wrap">{record.value}</code>
              </div>
              <p className="text-xs text-slate-500 mt-2">{record.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
        <p className="text-xs text-amber-700">
          ⚠️ After adding these records, click "Verify Domain" to check if they're correctly configured.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

// Simulated API call
const createDomain = async (domain, senderName, emailAddress) => {
  console.log(`[API] Creating domain: ${domain}, Sender: ${senderName}, Email: ${emailAddress}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    domain: { domain, senderName, emailAddress, dkimStatus: 'pending', spfStatus: 'pending' }
  };
};

export default function SenderIdentityTab() {
  const [emailDomains, setEmailDomains] = useState([
    { 
      id: '1', 
      domain: 'wynsync.com', 
      dkimStatus: 'verified', 
      spfStatus: 'verified', 
      fromEmail: 'team@wynsync.com', 
      replyTo: 'support@wynsync.com',
      isDefault: true
    },
    { 
      id: '2', 
      domain: 'marketing.wynsync.com', 
      dkimStatus: 'pending', 
      spfStatus: 'verified', 
      fromEmail: 'offers@marketing.wynsync.com', 
      replyTo: null,
      isDefault: false
    },
  ]);

  const [whatsappNumbers, setWhatsappNumbers] = useState([
    { id: '1', phoneNumber: '+91 98400 12345', status: 'active', accountName: 'WYNSync Business', templates: 4 },
  ]);

  // Modal states
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [showDNSInstructions, setShowDNSInstructions] = useState(false);
  const [showLinkNumber, setShowLinkNumber] = useState(false);
  const [domainForm, setDomainForm] = useState({ domain: '', senderName: '', emailAddress: '' });
  const [domainFormError, setDomainFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newlyAddedDomain, setNewlyAddedDomain] = useState(null);
  const [waForm, setWaForm] = useState({ phoneNumber: '', accountName: '' });
  const [waFormError, setWaFormError] = useState('');

  // Handle Add Domain with API call
  const handleAddDomainSubmit = async () => {
    if (!domainForm.domain.trim()) {
      setDomainFormError('Domain name is required');
      return;
    }
    if (!domainForm.senderName.trim()) {
      setDomainFormError('Sender name is required');
      return;
    }
    if (!domainForm.emailAddress.trim() || !domainForm.emailAddress.includes('@')) {
      setDomainFormError('Valid email address is required');
      return;
    }
    
    setDomainFormError('');
    setIsSubmitting(true);
    
    try {
      const result = await createDomain(domainForm.domain, domainForm.senderName, domainForm.emailAddress);
      
      if (result.success) {
        const newDomain = {
          id: `domain_${Date.now()}`,
          domain: domainForm.domain,
          dkimStatus: 'pending',
          spfStatus: 'pending',
          fromEmail: domainForm.emailAddress,
          replyTo: null,
          senderName: domainForm.senderName,
          isDefault: false
        };
        
        setEmailDomains(prev => [...prev, newDomain]);
        setNewlyAddedDomain(newDomain);
        setShowAddDomain(false);
        setShowDNSInstructions(true);
        setDomainForm({ domain: '', senderName: '', emailAddress: '' });
      }
    } catch (error) {
      setDomainFormError('Failed to add domain. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Link WhatsApp Number
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
    
    setWhatsappNumbers(prev => [...prev, newWhatsApp]);
    setShowLinkNumber(false);
    setWaForm({ phoneNumber: '', accountName: '' });
    alert(`WhatsApp number "${waForm.phoneNumber}" linked successfully! Waiting for verification.`);
  };

  // Handle Verify Domain
  const handleVerifyDomain = (domainId, domainName) => {
    alert(`Verification initiated for ${domainName}. Please check your DNS records for DKIM/SPF settings.`);
    setEmailDomains(prev => prev.map(domain => 
      domain.id === domainId 
        ? { ...domain, dkimStatus: 'verified', spfStatus: 'verified' }
        : domain
    ));
  };

  // Handle Delete Domain
  const handleDeleteDomain = (domainId, domainName) => {
    if (confirm(`Are you sure you want to delete domain "${domainName}"?`)) {
      setEmailDomains(prev => prev.filter(domain => domain.id !== domainId));
      alert(`Domain "${domainName}" deleted successfully.`);
    }
  };

  // Handle Delete WhatsApp Number
  const handleDeleteWhatsApp = (waId, phoneNumber) => {
    if (confirm(`Are you sure you want to unlink "${phoneNumber}"?`)) {
      setWhatsappNumbers(prev => prev.filter(wa => wa.id !== waId));
      alert(`WhatsApp number "${phoneNumber}" unlinked successfully.`);
    }
  };

  // Handle Set Default Domain
  const handleSetDefaultDomain = (domainId) => {
    setEmailDomains(prev => prev.map(domain => ({
      ...domain,
      isDefault: domain.id === domainId
    })));
    alert('Default domain updated successfully.');
  };

  return (
    <>
      <div className="space-y-4">
        {/* Email Sending Domains Section */}
        <div className="bg-white rounded-3xl border border-slate-100 px-6 py-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Email Sending Domains
              </h3>
            </div>
            <Button variant="primary" onClick={() => setShowAddDomain(true)}>
              <PlusIcon /> Add Domain
            </Button>
          </div>

          <div className="space-y-4">
            {emailDomains.map(domain => (
              <div key={domain.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <GlobeIcon />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-[15px]">
                      {domain.domain}
                      {domain.isDefault && <span className="ml-2 text-xs font-normal text-slate-400">(Default)</span>}
                    </h4>
                    <p className="text-[13px] text-slate-400 mt-0.5">
                      {domain.fromEmail}
                      {domain.replyTo && <span> · Reply-to: {domain.replyTo}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge label="DKIM" status={domain.dkimStatus} />
                  <StatusBadge label="SPF" status={domain.spfStatus} />
                  
                  {(domain.dkimStatus !== 'verified' || domain.spfStatus !== 'verified') && (
                    <Button variant="secondary" onClick={() => handleVerifyDomain(domain.id, domain.domain)}>
                      Verify
                    </Button>
                  )}
                  
                  {!domain.isDefault && domain.dkimStatus === 'verified' && domain.spfStatus === 'verified' && (
                    <Button variant="secondary" onClick={() => handleSetDefaultDomain(domain.id)}>
                      Set as Default
                    </Button>
                  )}
                  
                  <div className="relative group">
                    <button className="p-1 ml-2" onClick={() => {
                      const menu = document.getElementById(`menu-${domain.id}`);
                      menu?.classList.toggle('hidden');
                    }}>
                      <ThreeDotsIcon />
                    </button>
                    <div id={`menu-${domain.id}`} className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-10">
                      <button 
                        onClick={() => handleDeleteDomain(domain.id, domain.domain)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete Domain
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Business Section */}
        <div className="bg-white rounded-3xl border border-slate-100 px-6 py-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 font-['Plus_Jakarta_Sans']">WhatsApp Business</h3>
            </div>
            <Button
              variant="secondary"
              className="text-slate-500 font-medium border-slate-100 font-['Plus_Jakarta_Sans']"
              onClick={() => setShowLinkNumber(true)}
            >
              Link Number
            </Button>
          </div>

          <div className="space-y-4">
            {whatsappNumbers.map(wa => (
              <div key={wa.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <ChatIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-[15px] tracking-tight font-['Plus_Jakarta_Sans']">
                      {wa.phoneNumber}
                    </h4>
                    <p className="text-[13px] text-slate-400 mt-0.5">
                      {wa.accountName} · {wa.templates} approved templates
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge label={wa.status === 'active' ? 'Active' : 'Pending'} status={wa.status} />
                  <div className="relative group">
                    <button className="p-1" onClick={() => {
                      const menu = document.getElementById(`wa-menu-${wa.id}`);
                      menu?.classList.toggle('hidden');
                    }}>
                      <ThreeDotsIcon />
                    </button>
                    <div id={`wa-menu-${wa.id}`} className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-10">
                      <button 
                        onClick={() => handleDeleteWhatsApp(wa.id, wa.phoneNumber)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Unlink Number
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Add Domain - Step 1: Form */}
      <Modal isOpen={showAddDomain} onClose={() => setShowAddDomain(false)} title="Add Email Sending Domain" size="md">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-['Plus_Jakarta_Sans']">
              Domain Name
            </label>
            <input
              type="text"
              value={domainForm.domain}
              onChange={(e) => setDomainForm(prev => ({ ...prev, domain: e.target.value }))}
              placeholder="example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <p className="text-xs text-slate-400 mt-1">Enter your domain name (e.g., yourcompany.com)</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-['Plus_Jakarta_Sans']">
              Sender Name
            </label>
            <input
              type="text"
              value={domainForm.senderName}
              onChange={(e) => setDomainForm(prev => ({ ...prev, senderName: e.target.value }))}
              placeholder="Your Company Name"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <p className="text-xs text-slate-400 mt-1">This will appear as the "From" name in emails</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-['Plus_Jakarta_Sans']">
              Email Address
            </label>
            <input
              type="email"
              value={domainForm.emailAddress}
              onChange={(e) => setDomainForm(prev => ({ ...prev, emailAddress: e.target.value }))}
              placeholder="hello@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <p className="text-xs text-slate-400 mt-1">The email address you'll send from</p>
          </div>
          
          {domainFormError && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-3">
              <p className="text-xs text-red-600">{domainFormError}</p>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowAddDomain(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddDomainSubmit} loading={isSubmitting}>
              {isSubmitting ? 'Adding Domain...' : 'Add Domain'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: DNS Instructions - Step 2 */}
      <Modal isOpen={showDNSInstructions} onClose={() => setShowDNSInstructions(false)} title="DNS Configuration Required" size="lg">
        <DNSInstructions 
          domain={newlyAddedDomain?.domain || 'yourdomain.com'} 
          onClose={() => setShowDNSInstructions(false)}
        />
      </Modal>

      {/* Modal: Link WhatsApp Number */}
      <Modal isOpen={showLinkNumber} onClose={() => setShowLinkNumber(false)} title="Link WhatsApp Business Number">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-['Plus_Jakarta_Sans']">
              Phone Number (with country code)
            </label>
            <input
              type="tel"
              value={waForm.phoneNumber}
              onChange={(e) => setWaForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="+91 98400 12345"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-['Plus_Jakarta_Sans']">
              Account Name
            </label>
            <input
              type="text"
              value={waForm.accountName}
              onChange={(e) => setWaForm(prev => ({ ...prev, accountName: e.target.value }))}
              placeholder="Your Business Name"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          {waFormError && <p className="text-xs text-red-500">{waFormError}</p>}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowLinkNumber(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleLinkNumberSubmit}>Link Number</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}