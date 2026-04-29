// // // SettingsPage.jsx
// // import React, { useState } from 'react';
// // import SenderIdentityTab from './components/SenderIdentityTab';
// // import TeamMembersTab from './components/TeamMembersTab';
// // import NotificationsTab from './components/NotificationsTab';
// // import IntegrationsTab from './components/IntegrationsTab';
// // import BillingTab from './components/BillingTab';

// // // ===================== Simple Icons (SVG) =====================
// // const MailIcon = () => (
// //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //   </svg>
// // );

// // const UsersIcon = () => (
// //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
// //   </svg>
// // );

// // const BellIcon = () => (
// //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// //   </svg>
// // );

// // const LinkIcon = () => (
// //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
// //   </svg>
// // );

// // const CreditCardIcon = () => (
// //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H5a3 3 0 00-3 3v8a3 3 0 003 3z" />
// //   </svg>
// // );

// // // ===================== UI Components =====================
// // const cn = (...classes) => classes.filter(Boolean).join(' ');

// // const PageHeader = ({ title, description }) => (
// //   <div className="mb-6">
// //     <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
// //     {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
// //   </div>
// // );

// // // Simplified permission guard – always renders children (no actual RBAC)
// // const RequirePermission = ({ children }) => <>{children}</>;

// // // ===================== Tabs Configuration =====================
// // const TABS = [
// //   { id: 'sender', label: 'Sender Identity', icon: MailIcon, permission: 'settings:sender' },
// //   { id: 'team', label: 'Team Members', icon: UsersIcon, permission: 'settings:team' },
// //   { id: 'notifications', label: 'Notifications', icon: BellIcon, permission: null },
// //   { id: 'integrations', label: 'Integrations', icon: LinkIcon, permission: 'settings:integrations' },
// //   { id: 'billing', label: 'Billing & Usage', icon: CreditCardIcon, permission: 'settings:billing' },
// // ];

// // // ===================== Main SettingsPage Component =====================
// // export default function SettingsPage() {
// //   const [activeTab, setActiveTab] = useState('sender');

// //   const renderTab = () => {
// //     switch (activeTab) {
// //       case 'sender': return <SenderIdentityTab />;
// //       case 'team': return (
// //         <RequirePermission>
// //           <TeamMembersTab />
// //         </RequirePermission>
// //       );
// //       case 'notifications': return <NotificationsTab />;
// //       case 'integrations': return (
// //         <RequirePermission>
// //           <IntegrationsTab />
// //         </RequirePermission>
// //       );
// //       case 'billing': return (
// //         <RequirePermission>
// //           <BillingTab />
// //         </RequirePermission>
// //       );
// //       default: return <SenderIdentityTab />;
// //     }
// //   };

// //   return (
// //     <div className="p-4 md:p-6">
// //       <PageHeader title="Settings" description="Manage workspace configuration, team, and integrations" />

// //       <div className="flex flex-col lg:flex-row gap-6">
// //         {/* Tab navigation */}
// //         <div className="w-full lg:w-52 shrink-0">
// //           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
// //             {TABS.map((tab) => {
// //               const Icon = tab.icon;
// //               return (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => setActiveTab(tab.id)}
// //                   className={cn(
// //                     'w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors border-l-2',
// //                     'border-b border-slate-100 last:border-b-0',
// //                     activeTab === tab.id
// //                       ? 'border-l-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
// //                       : 'border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800'
// //                   )}
// //                 >
// //                   <Icon />
// //                   {tab.label}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* Tab content */}
// //         <div className="flex-1 min-w-0">
// //           {renderTab()}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // SettingsPage.jsx – Main Settings Container with Tab Navigation
// import React, { useState, useEffect } from 'react';
// import SenderIdentityTab from './components/SenderIdentityTab';
// import TeamMembersTab from './components/TeamMembersTab';
// import NotificationsTab from './components/NotificationsTab';
// import IntegrationsTab from './components/IntegrationsTab';
// import BillingTab from './components/BillingTab';

// // ===================== Icons =====================
// const MailIcon = () => (
//   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//   </svg>
// );

// const UsersIcon = () => (
//   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//   </svg>
// );

// const BellIcon = () => (
//   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//   </svg>
// );

// const LinkIcon = () => (
//   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//   </svg>
// );

// const CreditCardIcon = () => (
//   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H5a3 3 0 00-3 3v8a3 3 0 003 3z" />
//   </svg>
// );

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState('sender');

//   useEffect(() => {
//     console.log(`[SettingsPage] Active tab changed to: ${activeTab}`);
//   }, [activeTab]);

//   const tabs = [
//     { id: 'sender', label: 'Sender Identity', icon: MailIcon, description: 'Email & WhatsApp setup' },
//     { id: 'team', label: 'Team Members', icon: UsersIcon, description: 'Manage your team' },
//     { id: 'notifications', label: 'Notifications', icon: BellIcon, description: 'Alert preferences' },
//     { id: 'integrations', label: 'Integrations', icon: LinkIcon, description: 'API & Webhooks' },
//     { id: 'billing', label: 'Billing & Usage', icon: CreditCardIcon, description: 'Plan & invoices' },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'sender': return <SenderIdentityTab />;
//       case 'team': return <TeamMembersTab />;
//       case 'notifications': return <NotificationsTab />;
//       case 'integrations': return <IntegrationsTab />;
//       case 'billing': return <BillingTab />;
//       default: return <SenderIdentityTab />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="max-w-[1400px] mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage workspace configuration, team, and integrations
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Sidebar */}
//           <div className="w-full lg:w-64 shrink-0">
//             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden sticky top-6">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => {
//                       console.log(`[SettingsPage] Navigating to: ${tab.label}`);
//                       setActiveTab(tab.id);
//                     }}
//                     className={cn(
//                       "w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 border-l-2",
//                       "border-b border-slate-100 last:border-b-0",
//                       isActive
//                         ? "border-l-indigo-500 bg-indigo-50/50 text-indigo-700"
//                         : "border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800"
//                     )}
//                   >
//                     <div className={cn(
//                       "p-1.5 rounded-lg transition-colors",
//                       isActive ? "bg-indigo-100 text-indigo-600" : "text-slate-400"
//                     )}>
//                       <Icon />
//                     </div>
//                     <div className="flex-1">
//                       <p className={cn("text-sm font-medium", isActive ? "text-indigo-700" : "text-slate-700")}>
//                         {tab.label}
//                       </p>
//                       <p className="text-xs text-slate-400 mt-0.5">{tab.description}</p>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Content */}
//           <div className="flex-1 min-w-0">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// SettingsPage.jsx – unchanged, works with the updated tab
import React, { useState } from 'react';
import SenderIdentityTab from './components/SenderIdentityTab';
import TeamMembersTab from './components/TeamMembersTab';
import NotificationsTab from './components/NotificationsTab';
import IntegrationsTab from './components/IntegrationsTab';
import BillingTab from './components/BillingTab';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const MailIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const UsersIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const BellIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const LinkIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);
const CreditCardIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H5a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('sender');

  const tabs = [
    { id: 'sender', label: 'Sender Identity', icon: MailIcon, description: 'Email & WhatsApp setup' },
    { id: 'team', label: 'Team Members', icon: UsersIcon, description: 'Manage your team' },
    { id: 'notifications', label: 'Notifications', icon: BellIcon, description: 'Alert preferences' },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon, description: 'API & Webhooks' },
    { id: 'billing', label: 'Billing & Usage', icon: CreditCardIcon, description: 'Plan & invoices' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'sender': return <SenderIdentityTab />;
      case 'team': return <TeamMembersTab />;
      case 'notifications': return <NotificationsTab />;
      case 'integrations': return <IntegrationsTab />;
      case 'billing': return <BillingTab />;
      default: return <SenderIdentityTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage workspace configuration, team, and integrations</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden sticky top-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 border-l-2",
                      "border-b border-slate-100 last:border-b-0",
                      isActive
                        ? "border-l-indigo-500 bg-indigo-50/50 text-indigo-700"
                        : "border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    )}
                  >
                    <div className={cn("p-1.5 rounded-lg transition-colors", isActive ? "bg-indigo-100 text-indigo-600" : "text-slate-400")}>
                      <Icon />
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-medium", isActive ? "text-indigo-700" : "text-slate-700")}>{tab.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{tab.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}