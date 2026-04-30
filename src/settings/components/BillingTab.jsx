


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

// Updated Icon to match the image (Arrow Up)
const TrendingUpIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
  </svg>
);

const Button = ({ children, variant, leftIcon, onClick, disabled }) => {
  const base = "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors focus:outline-none disabled:opacity-50";
  const variants = { 
    primary: "bg-[#4F46E5] text-white hover:bg-indigo-700", 
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" 
  };
  return <button onClick={onClick} disabled={disabled} className={cn(base, variants[variant] || variants.secondary)}>{leftIcon && leftIcon}{children}</button>;
};

const ProgressBar = ({ label, used, limit, icon }) => {
  const percentage = Math.min(100, (used / limit) * 100);
  // Color logic based on image: Over limit = Orange/Red, Under = Indigo
  const isOverLimit = used > limit;
  const barColor = isOverLimit ? 'bg-[#C2410C]' : 'bg-[#4F46E5]';
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-[15px] font-bold text-slate-800">{label}</span>
        </div>
        <span className="text-[15px] text-slate-400 font-medium">
          {formatNumber(used)} / {formatNumber(limit)}
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <h3 className="text-[17px] font-bold text-slate-900">Current Plan</h3>
            <p className="text-[15px] text-slate-400 mt-1">Renews on {billing.renewsAt}</p>
          </div>
          <Button variant="primary" leftIcon={<TrendingUpIcon />}>
            Upgrade Plan
          </Button>
        </div>

        {/* Plan Banner */}
        <div className="rounded-2xl bg-[#EEF2FF] px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-[13px] font-bold text-[#4F46E5] uppercase tracking-[0.1em] mb-2">
              {billing.planName}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#4F46E5]">{billing.currency}{billing.price}</span>
              <span className="text-lg font-bold text-[#4F46E5]/70">/month</span>
            </div>
          </div>
          <div className="text-left sm:text-right text-[15px] font-medium text-[#4F46E5]/80 space-y-1">
            <p>{formatNumber(500000)} emails/month</p>
            <p>{formatNumber(100000)} WhatsApp/month</p>
            <p>{formatNumber(50000)} contacts</p>
          </div>
        </div>

        {/* Usage Meters */}
        <div className="space-y-2">
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
    </div>
  );
}