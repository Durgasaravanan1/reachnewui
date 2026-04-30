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


import React, { useState } from 'react';
import SenderIdentityTab from './components/SenderIdentityTab';
import TeamMembersTab from './components/TeamMembersTab';
import NotificationsTab from './components/NotificationsTab';
import IntegrationsTab from './components/IntegrationsTab';
import BillingTab from './components/BillingTab';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Standardized Icons to match the reference look
const MailIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const UsersIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);
const BellIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);
const LinkIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);
const CreditCardIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('sender');

  const tabs = [
    { id: 'sender', label: 'Sender Identity', icon: MailIcon },
    { id: 'team', label: 'Team Members', icon: UsersIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'billing', label: 'Billing & Usage', icon: CreditCardIcon },
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
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-2">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-[28px] font-bold text-[#1e293b] font-['Plus_Jakarta_Sans']">
  Settings
</h1>
          <p className="text-[15px] text-slate-400 mt-1">
            Manage workspace configuration, sender identities, team, and integrations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-5 text-left transition-all duration-150 border-l-[3px]",
                      "border-b border-slate-50 last:border-b-0",
                      isActive
                        ? "border-l-indigo-600 bg-indigo-50/40 text-indigo-700"
                        : "border-l-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    )}
                  >
                    <div className={cn(
                      "transition-colors", 
                      isActive ? "text-indigo-600" : "text-slate-400"
                    )}>
                      <Icon />
                    </div>
                    <span className={cn(
                      "text-[15px] font-medium tracking-tight",
                      isActive ? "text-indigo-700" : "text-slate-600"
                    )}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}