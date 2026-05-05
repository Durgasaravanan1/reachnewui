


// // BillingTab.jsx – Plan Usage & Invoices
// import React, { useState, useEffect } from 'react';

// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => num?.toLocaleString() || '0';

// // Icons
// const TrendingUpIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//   </svg>
// );

// const Button = ({ children, variant, leftIcon, onClick }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
//   const variants = { primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500", secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300" };
//   return <button onClick={onClick} className={cn(base, variants[variant] || variants.secondary)}>{leftIcon && leftIcon}{children}</button>;
// };

// const Skeleton = ({ className }) => <div className={`bg-slate-200 animate-pulse rounded ${className}`} />;

// const ProgressBar = ({ label, used, limit }) => {
//   const percentage = Math.min(100, (used / limit) * 100);
//   const variant = percentage >= 100 ? 'error' : percentage >= 90 ? 'warning' : 'default';
//   const barColor = variant === 'error' ? 'bg-red-500' : variant === 'warning' ? 'bg-amber-500' : 'bg-indigo-500';
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-1.5"><span className="text-sm font-semibold text-slate-700">{label}</span><span className="text-xs text-slate-400">{formatNumber(used)} / {formatNumber(limit)}</span></div>
//       <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${barColor} transition-all duration-300`} style={{ width: `${percentage}%` }} /></div>
//       {percentage >= 100 && <p className="text-xs font-semibold text-red-600 mt-1">⚠ Limit reached — upgrade to continue.</p>}
//       {percentage >= 90 && percentage < 100 && <p className="text-xs font-semibold text-amber-600 mt-1">Approaching limit — consider upgrading.</p>}
//     </div>
//   );
// };

// export default function BillingTab() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [billing, setBilling] = useState(null);

//   useEffect(() => {
//     console.log('[BillingTab] Loading billing data...');
//     setTimeout(() => {
//       const data = {
//         planName: 'GROWTH PLAN',
//         price: 4900,
//         currency: '₤',
//         renewsAt: '15 May 2026',
//         emailsSent: 38500,
//         emailsLimit: 50000,
//         whatsappSent: 7200,
//         whatsappLimit: 10000,
//         contactsStored: 41200,
//         contactsLimit: 50000,
//         teamMembers: 3,
//         teamLimit: 5,
//       };
//       console.log('[BillingTab] Loaded billing data:', data);
//       setBilling(data);
//       setIsLoading(false);
//     }, 500);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-xl border border-slate-200 p-5">
//         <Skeleton className="h-6 w-32 mb-4" />
//         <Skeleton className="h-24 w-full mb-4" />
//         <Skeleton className="h-16 w-full mb-3" />
//         <Skeleton className="h-16 w-full mb-3" />
//         <Skeleton className="h-8 w-full" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Plan Card */}
//       <div className="bg-white rounded-xl border border-slate-200 p-5">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
//           <div><h3 className="text-sm font-bold text-slate-900">Current Plan</h3><p className="text-xs text-slate-400 mt-0.5">Renews on {billing.renewsAt}</p></div>
//           <Button variant="primary" leftIcon={<TrendingUpIcon />}>Upgrade Plan</Button>
//         </div>

//         {/* Plan Banner */}
//         <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//           <div><p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">{billing.planName}</p><p className="text-2xl font-bold text-indigo-700">{billing.currency}{billing.price}/month<span className="text-sm font-medium text-indigo-400"></span></p></div>
//           <div className="text-left sm:text-right text-sm text-indigo-600 space-y-0.5"><p>{billing.emailsLimit.toLocaleString()} emails/month</p><p>{billing.whatsappLimit.toLocaleString()} WhatsApp/month</p><p>{billing.contactsLimit.toLocaleString()} contacts</p></div>
//         </div>

//         {/* Usage Meters */}
//         <div className="space-y-5">
//           <ProgressBar label="📧 Emails Sent" used={billing.emailsSent} limit={billing.emailsLimit} />
//           <ProgressBar label="💬 WhatsApp Sent" used={billing.whatsappSent} limit={billing.whatsappLimit} />
//           <ProgressBar label="👥 Contacts Stored" used={billing.contactsStored} limit={billing.contactsLimit} />
//           <ProgressBar label="🧑‍💼 Team Members" used={billing.teamMembers} limit={billing.teamLimit} />
//         </div>
//       </div>

//       {/* Invoice History */}
//       <div className="bg-white rounded-xl border border-slate-200 p-5">
//         <h3 className="text-sm font-bold text-slate-900 mb-3">Invoice History</h3>
//         <p className="text-sm text-slate-400 text-center py-6">Invoice history will appear here.</p>
//       </div>
//     </div>
//   );
// }


// BillingTab.jsx – Plan Usage & Invoices with working Upgrade button
import React, { useState, useEffect } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Icons
const TrendingUpIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = 'md' }) => {
  const base = "inline-flex items-center gap-2 rounded-lg font-bold transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = { 
    primary: "bg-[#4F46E5] text-white hover:bg-indigo-700", 
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" 
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm"
  };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size])}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const ProgressBar = ({ label, used, limit, icon }) => {
  const percentage = Math.min(100, (used / limit) * 100);
  const isOverLimit = used > limit;
  const barColor = isOverLimit ? 'bg-[#C2410C]' : 'bg-[#4F46E5]';
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-[14px] font-semibold text-slate-800">{label}</span>
        </div>
        <span className="text-[14px] text-slate-400 font-medium">
          {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className="h-[6px] bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${barColor} transition-all duration-500`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
      {isOverLimit && (
        <p className="text-[13px] font-bold text-[#C2410C] mt-2 flex items-center gap-1">
          ⚠ Limit reached — upgrade to continue.
        </p>
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
};

// API calls for invoices
const fetchInvoices = async (page = 1, limit = 10) => {
  console.log(`[API] Fetching invoices - Page: ${page}, Limit: ${limit}`);
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulated API response
  return {
    success: true,
    data: {
      invoices: [
        { 
          id: 'INV-2026-001', 
          date: '2026-05-15', 
          formattedDate: 'May 15, 2026', 
          amount: 4999, 
          currency: '₹',
          formattedAmount: '₹4,999',
          status: 'paid', 
          pdfUrl: '/invoices/inv-2026-001.pdf',
          description: 'Growth Plan - May 2026'
        },
        { 
          id: 'INV-2026-002', 
          date: '2026-04-15', 
          formattedDate: 'Apr 15, 2026', 
          amount: 4999, 
          currency: '₹',
          formattedAmount: '₹4,999',
          status: 'paid', 
          pdfUrl: '/invoices/inv-2026-002.pdf',
          description: 'Growth Plan - April 2026'
        },
        { 
          id: 'INV-2026-003', 
          date: '2026-03-15', 
          formattedDate: 'Mar 15, 2026', 
          amount: 4999, 
          currency: '₹',
          formattedAmount: '₹4,999',
          status: 'paid', 
          pdfUrl: '/invoices/inv-2026-003.pdf',
          description: 'Growth Plan - March 2026'
        },
        { 
          id: 'INV-2026-004', 
          date: '2026-02-15', 
          formattedDate: 'Feb 15, 2026', 
          amount: 4999, 
          currency: '₹',
          formattedAmount: '₹4,999',
          status: 'paid', 
          pdfUrl: '/invoices/inv-2026-004.pdf',
          description: 'Growth Plan - February 2026'
        },
        { 
          id: 'INV-2026-005', 
          date: '2026-01-15', 
          formattedDate: 'Jan 15, 2026', 
          amount: 4999, 
          currency: '₹',
          formattedAmount: '₹4,999',
          status: 'paid', 
          pdfUrl: '/invoices/inv-2026-005.pdf',
          description: 'Growth Plan - January 2026'
        }
      ],
      pagination: {
        currentPage: page,
        totalPages: 3,
        totalItems: 12,
        itemsPerPage: limit
      }
    }
  };
};

const downloadInvoice = async (invoiceId) => {
  console.log(`[API] Downloading invoice: ${invoiceId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would trigger a file download
  // window.open(`/api/invoices/${invoiceId}/download`, '_blank');
  
  alert(`Downloading invoice ${invoiceId}...`);
  return { success: true };
};

export default function BillingTab() {
  const [billing, setBilling] = useState({
    planName: 'GROWTH PLAN',
    price: '4,999',
    currency: '₹',
    renewsAt: 'May 22, 2026',
    emailsSent: 1060240,
    emailsLimit: 500000,
    whatsappSent: 180000,
    whatsappLimit: 100000,
    contactsStored: 28450,
    contactsLimit: 50000,
  });

  // Invoice state
  const [invoices, setInvoices] = useState([]);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(true);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [isDownloading, setIsDownloading] = useState(null);

  // Upgrade modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const plans = [
    { 
      id: 'growth', 
      name: 'Growth Plan', 
      price: '₹4,999/month', 
      emails: '500K', 
      whatsapp: '100K', 
      contacts: '50K',
      limits: { emails: 500000, whatsapp: 100000, contacts: 50000 },
      features: ['Up to 5 team members', 'Advanced analytics', 'API access', 'Email support']
    },
    { 
      id: 'pro', 
      name: 'Pro Plan', 
      price: '₹9,999/month', 
      emails: '1M', 
      whatsapp: '250K', 
      contacts: '200K',
      limits: { emails: 1000000, whatsapp: 250000, contacts: 200000 },
      features: ['Up to 15 team members', 'Advanced analytics + custom reports', 'Priority support', 'WhatsApp API access']
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise', 
      price: 'Custom', 
      emails: 'Unlimited', 
      whatsapp: 'Unlimited', 
      contacts: 'Unlimited',
      limits: { emails: Infinity, whatsapp: Infinity, contacts: Infinity },
      features: ['Unlimited team members', 'SLA & dedicated support', 'Custom integrations', 'Account manager']
    },
  ];

  // Load invoices on component mount and page change
  useEffect(() => {
    loadInvoices(pagination.currentPage);
  }, [pagination.currentPage]);

  const loadInvoices = async (page) => {
    setIsLoadingInvoices(true);
    try {
      const response = await fetchInvoices(page, 10);
      if (response.success) {
        setInvoices(response.data.invoices);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Failed to load invoices:', error);
    } finally {
      setIsLoadingInvoices(false);
    }
  };

  const handleDownloadInvoice = async (invoice) => {
    setIsDownloading(invoice.id);
    try {
      await downloadInvoice(invoice.id);
    } catch (error) {
      console.error('Failed to download invoice:', error);
      alert('Failed to download invoice. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleRefreshInvoices = () => {
    loadInvoices(pagination.currentPage);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
    setSelectedPlan(null);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleConfirmUpgrade = () => {
    if (!selectedPlan) return;
    
    setIsUpgrading(true);
    
    setTimeout(() => {
      setBilling({
        ...billing,
        planName: selectedPlan.name.toUpperCase(),
        price: selectedPlan.price.replace(/[^0-9]/g, ''),
        emailsLimit: selectedPlan.limits.emails,
        whatsappLimit: selectedPlan.limits.whatsapp,
        contactsLimit: selectedPlan.limits.contacts,
        renewsAt: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
      
      setIsUpgrading(false);
      setShowUpgradeModal(false);
      setSelectedPlan(null);
      alert(`Successfully upgraded to ${selectedPlan.name}! Your new limits will take effect immediately.`);
    }, 1500);
  };

  const handleCancelUpgrade = () => {
    setShowUpgradeModal(false);
    setSelectedPlan(null);
  };

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700">
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700">
        Pending
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Current Plan Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Current Plan</h3>
            <p className="text-[13px] text-slate-400 mt-1">Renews on {billing.renewsAt}</p>
          </div>
          <Button variant="primary" leftIcon={<TrendingUpIcon />} onClick={handleUpgradeClick}>
            Upgrade Plan
          </Button>
        </div>

        <div className="rounded-2xl bg-[#EEF2FF] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold text-[#4F46E5] uppercase tracking-wide mb-1">
              {billing.planName}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#4F46E5]">{billing.currency}{billing.price}</span>
              <span className="text-sm font-semibold text-[#4F46E5]/70">/month</span>
            </div>
          </div>
          <div className="text-left sm:text-right text-[13px] font-medium text-[#4F46E5]/80 space-y-0.5">
            <p>{billing.emailsLimit.toLocaleString()} emails/month</p>
            <p>{billing.whatsappLimit.toLocaleString()} WhatsApp/month</p>
            <p>{billing.contactsLimit.toLocaleString()} contacts</p>
          </div>
        </div>

        <div className="space-y-4">
          <ProgressBar 
            label="Emails Sent" 
            icon="📧" 
            used={billing.emailsSent} 
            limit={billing.emailsLimit} 
          />
          <ProgressBar 
            label="WhatsApp Sent" 
            icon="💬" 
            used={billing.whatsappSent} 
            limit={billing.whatsappLimit} 
          />
          <ProgressBar 
            label="Contacts Stored" 
            icon="👥" 
            used={billing.contactsStored} 
            limit={billing.contactsLimit} 
          />
        </div>
      </div>

      {/* Invoice History Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">Invoice History</h3>
            <p className="text-[13px] text-slate-400 mt-1">
              {pagination.totalItems} total invoices
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            leftIcon={<RefreshIcon />} 
            onClick={handleRefreshInvoices}
            disabled={isLoadingInvoices}
          >
            Refresh
          </Button>
        </div>

        {isLoadingInvoices ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
            <p className="text-sm text-slate-400">No invoices found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Invoice #
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="font-mono text-sm font-semibold text-slate-700">
                          {invoice.id}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">
                        {invoice.formattedDate}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">
                        {invoice.description}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-slate-700">
                        {invoice.formattedAmount}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          leftIcon={<DownloadIcon />}
                          onClick={() => handleDownloadInvoice(invoice)}
                          loading={isDownloading === invoice.id}
                          disabled={isDownloading === invoice.id}
                        >
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <div className="text-sm text-slate-500">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    <ChevronLeftIcon />
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    Next
                    <ChevronRightIcon />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Upgrade Plan Modal */}
      <Modal
        isOpen={showUpgradeModal}
        onClose={handleCancelUpgrade}
        title="Choose a Plan"
        footer={
          <>
            <Button variant="secondary" onClick={handleCancelUpgrade}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleConfirmUpgrade} 
              disabled={!selectedPlan}
              loading={isUpgrading}
            >
              {isUpgrading ? 'Upgrading...' : 'Confirm Upgrade'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Select the plan that best fits your needs. You can upgrade or downgrade at any time.
          </p>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {plans.map((plan) => {
              const isCurrentPlan = plan.name.toLowerCase().includes(billing.planName.toLowerCase());
              const isSelected = selectedPlan?.id === plan.id;
              
              return (
                <div
                  key={plan.id}
                  className={`rounded-xl border p-5 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-[#4F46E5] bg-indigo-50 ring-2 ring-indigo-500/20' 
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  } ${isCurrentPlan ? 'opacity-60' : ''}`}
                  onClick={() => !isCurrentPlan && handlePlanSelect(plan)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{plan.name}</h4>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{plan.price}</p>
                    </div>
                    {isCurrentPlan && (
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        Current Plan
                      </span>
                    )}
                    {isSelected && !isCurrentPlan && (
                      <span className="text-xs font-semibold text-[#4F46E5] bg-indigo-100 px-2 py-1 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-3 text-sm text-slate-500">
                    <span>📧 {plan.emails} emails</span>
                    <span>💬 {plan.whatsapp} WhatsApp</span>
                    <span>👥 {plan.contacts} contacts</span>
                  </div>
                  
                  <ul className="space-y-1.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">
              All plans include unlimited team members, API access, and 24/7 support. 
              Prices are in INR and billed monthly. No hidden fees.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}