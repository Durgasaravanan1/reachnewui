


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
const formatNumber = (num) => num?.toLocaleString() || '0';

// Icons
const TrendingUpIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Button = ({ children, variant, leftIcon, onClick, disabled }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = { primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500", secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300" };
  return <button onClick={onClick} disabled={disabled} className={cn(base, variants[variant] || variants.secondary)}>{leftIcon && leftIcon}{children}</button>;
};

const Skeleton = ({ className }) => <div className={`bg-slate-200 animate-pulse rounded ${className}`} />;

const ProgressBar = ({ label, used, limit }) => {
  const percentage = Math.min(100, (used / limit) * 100);
  const variant = percentage >= 100 ? 'error' : percentage >= 90 ? 'warning' : 'default';
  const barColor = variant === 'error' ? 'bg-red-500' : variant === 'warning' ? 'bg-amber-500' : 'bg-indigo-500';
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5"><span className="text-sm font-semibold text-slate-700">{label}</span><span className="text-xs text-slate-400">{formatNumber(used)} / {formatNumber(limit)}</span></div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${barColor} transition-all duration-300`} style={{ width: `${percentage}%` }} /></div>
      {percentage >= 100 && <p className="text-xs font-semibold text-red-600 mt-1">⚠ Limit reached — upgrade to continue.</p>}
      {percentage >= 90 && percentage < 100 && <p className="text-xs font-semibold text-amber-600 mt-1">Approaching limit — consider upgrading.</p>}
    </div>
  );
};

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default function BillingTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [billing, setBilling] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Mock invoices
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', date: '15 Apr 2026', amount: '£49.00', status: 'paid', pdfUrl: '#' },
    { id: 'INV-002', date: '15 Mar 2026', amount: '£49.00', status: 'paid', pdfUrl: '#' },
    { id: 'INV-003', date: '15 Feb 2026', amount: '£49.00', status: 'paid', pdfUrl: '#' },
  ]);

  useEffect(() => {
    console.log('[BillingTab] Loading billing data...');
    setTimeout(() => {
      const data = {
        planName: 'GROWTH PLAN',
        price: 4900,
        currency: '£',
        renewsAt: '15 May 2026',
        emailsSent: 38500,
        emailsLimit: 50000,
        whatsappSent: 7200,
        whatsappLimit: 10000,
        contactsStored: 41200,
        contactsLimit: 50000,
        teamMembers: 3,
        teamLimit: 5,
      };
      console.log('[BillingTab] Loaded billing data:', data);
      setBilling(data);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = () => {
    console.log(`[BillingTab] Upgrading to plan: ${selectedPlan.name}`);
    setIsUpgrading(true);
    setTimeout(() => {
      console.log(`[BillingTab] Upgrade successful to ${selectedPlan.name}`);
      setIsUpgrading(false);
      setShowUpgradeModal(false);
      setSelectedPlan(null);
      alert(`Successfully upgraded to ${selectedPlan.name} plan!`);
      // In a real app, we would refresh billing data here.
    }, 1500);
  };

  const handleDownloadInvoice = (invoice) => {
    console.log(`[BillingTab] Downloading invoice ${invoice.id}`);
    alert(`Download invoice ${invoice.id} (PDF download would start)`);
  };

  const plans = [
    { id: 'growth', name: 'Growth Plan', price: '£49/month', emails: '50K', whatsapp: '10K', contacts: '50K', features: ['Up to 5 team members', 'Advanced analytics', 'API access'] },
    { id: 'pro', name: 'Pro Plan', price: '£99/month', emails: '200K', whatsapp: '40K', contacts: '200K', features: ['Up to 15 team members', 'Advanced analytics + custom reports', 'Priority support'] },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', emails: 'Unlimited', whatsapp: 'Unlimited', contacts: 'Unlimited', features: ['Unlimited team members', 'SLA & dedicated support', 'Custom integrations'] },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-16 w-full mb-3" />
        <Skeleton className="h-16 w-full mb-3" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Plan Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div><h3 className="text-sm font-bold text-slate-900">Current Plan</h3><p className="text-xs text-slate-400 mt-0.5">Renews on {billing.renewsAt}</p></div>
          <Button variant="primary" leftIcon={<TrendingUpIcon />} onClick={() => handleUpgrade(billing)}>Upgrade Plan</Button>
        </div>

        {/* Plan Banner */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div><p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">{billing.planName}</p><p className="text-2xl font-bold text-indigo-700">{billing.currency}{billing.price}/month</p></div>
          <div className="text-left sm:text-right text-sm text-indigo-600 space-y-0.5">
            <p>{billing.emailsLimit.toLocaleString()} emails/month</p>
            <p>{billing.whatsappLimit.toLocaleString()} WhatsApp/month</p>
            <p>{billing.contactsLimit.toLocaleString()} contacts</p>
          </div>
        </div>

        {/* Usage Meters */}
        <div className="space-y-5">
          <ProgressBar label="📧 Emails Sent" used={billing.emailsSent} limit={billing.emailsLimit} />
          <ProgressBar label="💬 WhatsApp Sent" used={billing.whatsappSent} limit={billing.whatsappLimit} />
          <ProgressBar label="👥 Contacts Stored" used={billing.contactsStored} limit={billing.contactsLimit} />
          <ProgressBar label="🧑‍💼 Team Members" used={billing.teamMembers} limit={billing.teamLimit} />
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Invoice History</h3>
        {invoices.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">No invoices found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-400 uppercase">Invoice #</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-400 uppercase">Date</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-slate-400 uppercase">Amount</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-slate-400 uppercase">Status</th>
                <th className="px-4 py-2"></th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-800">{inv.id}</td>
                    <td className="px-4 py-2 text-slate-500">{inv.date}</td>
                    <td className="px-4 py-2 text-right font-medium">{inv.amount}</td>
                    <td className="px-4 py-2 text-center"><span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700">Paid</span></td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="secondary" size="sm" onClick={() => handleDownloadInvoice(inv)}>Download PDF</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upgrade Plan Modal */}
      <Modal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} title="Choose a Plan">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Select the plan that best fits your needs. You can upgrade or downgrade at any time.</p>
          <div className="space-y-3">
            {plans.map(plan => (
              <div key={plan.id} className={`rounded-xl border p-4 cursor-pointer transition-all ${selectedPlan?.id === plan.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`} onClick={() => setSelectedPlan(plan)}>
                <div className="flex justify-between items-start">
                  <div><h4 className="font-bold text-slate-900">{plan.name}</h4><p className="text-sm text-slate-500">{plan.price}</p></div>
                  {selectedPlan?.id === plan.id && <span className="text-indigo-600 text-sm font-semibold">Selected</span>}
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>📧 {plan.emails}</span>
                  <span>💬 {plan.whatsapp}</span>
                  <span>👥 {plan.contacts}</span>
                </div>
                <ul className="mt-2 text-xs text-slate-500 space-y-0.5">
                  {plan.features.map((f, idx) => <li key={idx} className="flex items-center gap-1">✓ {f}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setShowUpgradeModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={confirmUpgrade} disabled={!selectedPlan} loading={isUpgrading}>Confirm Upgrade</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}