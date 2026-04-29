// // Sidebar.jsx
// import React, { useState } from 'react';

// // ===================== Simple class name merger =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ===================== Icons (SVG replacements for lucide-react) =====================
// const LayoutDashboardIcon = () => (
//   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//   </svg>
// );

// const UsersIcon = () => (
//   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//   </svg>
// );

// const MegaphoneIcon = () => (
//   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//   </svg>
// );

// const FileTextIcon = () => (
//   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//   </svg>
// );

// const BarChart2Icon = () => (
//   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//   </svg>
// );

// const ZapIcon = () => (
//   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
//   </svg>
// );

// const SettingsIcon = () => (
//   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );

// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const ChevronDownIcon = ({ className }) => (
//   <svg className={cn('h-3.5 w-3.5', className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//   </svg>
// );

// const MailIcon = () => (
//   <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//   </svg>
// );

// // ===================== Simple Avatar Component =====================
// const Avatar = ({ name, size = 'sm' }) => {
//   const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//   const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
//   return (
//     <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}>
//       {initials}
//     </div>
//   );
// };

// // ===================== Mock User & Workspace (replace with your store) =====================
// const useCurrentUser = () => ({ fullName: 'Subramanian A.', role: 'owner' });
// const useWorkspace = () => ({ name: 'WYNSync' });

// // ===================== Mock Navigation (replace with react-router-dom) =====================
// const useNavigate = () => {
//   return (to) => {
//     console.log(`Navigate to: ${to}`);
//     // In a real app, you would use history.push or navigate from react-router-dom.
//     // For demo, we also update window.location.hash to simulate SPA navigation (optional).
//     window.location.hash = to;
//   };
// };

// // ===================== Route constants =====================
// const ROUTES = {
//   DASHBOARD: '/',
//   CONTACTS: '/contacts',
//   LISTS: '/lists',
//   SUPPRESSION: '/suppression',
//   CAMPAIGNS: '/campaigns',
//   CAMPAIGN_CALENDAR: '/calendar',
//   TEMPLATES: '/templates',
//   ANALYTICS: '/analytics',
//   AUTOMATION: '/automation',
//   SETTINGS: '/settings',
//   CAMPAIGN_NEW: '/campaigns/new',
// };

// // ===================== Navigation Groups =====================
// const NAV_GROUPS = [
//   {
//     items: [{ label: 'Dashboard', icon: LayoutDashboardIcon, to: ROUTES.DASHBOARD }],
//   },
//   {
//     label: 'Audience',
//     items: [
//       {
//         label: 'Contacts',
//         icon: UsersIcon,
//         to: ROUTES.CONTACTS,
//         children: [
//           { label: 'All Contacts', to: ROUTES.CONTACTS },
//           { label: 'Lists', to: ROUTES.LISTS },
//           { label: 'Suppression', to: ROUTES.SUPPRESSION },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Campaigns',
//     items: [
//       {
//         label: 'Campaigns',
//         icon: MegaphoneIcon,
//         to: ROUTES.CAMPAIGNS,
//         children: [
//           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
//           { label: 'Calendar', to: ROUTES.CAMPAIGN_CALENDAR },
//         ],
//       },
//       { label: 'Templates', icon: FileTextIcon, to: ROUTES.TEMPLATES },
//     ],
//   },
//   {
//     label: 'Intelligence',
//     items: [
//       { label: 'Analytics', icon: BarChart2Icon, to: ROUTES.ANALYTICS },
//       { label: 'Automation', icon: ZapIcon, to: ROUTES.AUTOMATION },
//     ],
//   },
//   {
//     items: [{ label: 'Settings', icon: SettingsIcon, to: ROUTES.SETTINGS }],
//   },
// ];

// // ===================== Main Sidebar Component =====================
// export default function Sidebar({ isOpen, onClose }) {
//   const user = useCurrentUser();
//   const workspace = useWorkspace();
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

//   const toggle = (label) => {
//     setExpanded((prev) =>
//       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
//     );
//   };

//   const handleNavigate = (to) => {
//     navigate(to);
//     if (onClose) onClose();
//   };

//   return (
//     <aside
//       className={cn(
//         'fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[#0D1117]',
//         'border-r border-white/[0.06] transition-transform duration-200',
//         isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//       )}
//     >
//       {/* Logo */}
//       <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
//         <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
//           <MailIcon />
//         </div>
//         <div className="min-w-0">
//           <p className="text-sm font-bold text-white leading-tight truncate">WYNReach</p>
//           <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
//             WynSync Suite
//           </p>
//         </div>
//       </div>

//       {/* New Campaign CTA */}
//       <div className="px-3 py-3">
//         <button
//           onClick={() => handleNavigate(ROUTES.CAMPAIGN_NEW)}
//           className={cn(
//             'w-full flex items-center justify-center gap-2 rounded-lg',
//             'bg-gradient-to-r from-indigo-600 to-violet-600',
//             'py-2 text-sm font-semibold text-white',
//             'hover:opacity-90 transition-opacity'
//           )}
//         >
//           <PlusIcon />
//           New Campaign
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4">
//         {NAV_GROUPS.map((group, gi) => (
//           <div key={gi} className="mb-1">
//             {group.label && (
//               <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
//                 {group.label}
//               </p>
//             )}
//             {group.items.map((item) => (
//               <div key={item.label}>
//                 {item.children ? (
//                   <>
//                     <button
//                       onClick={() => toggle(item.label)}
//                       className={cn(
//                         'w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
//                         'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors'
//                       )}
//                     >
//                       <item.icon />
//                       <span className="flex-1 text-left">{item.label}</span>
//                       <ChevronDownIcon
//                         className={cn(
//                           'transition-transform',
//                           expanded.includes(item.label) && 'rotate-180'
//                         )}
//                       />
//                     </button>
//                     {expanded.includes(item.label) && (
//                       <div className="ml-9 mt-0.5 space-y-0.5">
//                         {item.children.map((child) => (
//                           <button
//                             key={child.to}
//                             onClick={() => handleNavigate(child.to)}
//                             className={cn(
//                               'block w-full text-left rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
//                               window.location.hash === `#${child.to}` || window.location.pathname === child.to
//                                 ? 'bg-indigo-500/20 text-indigo-300 border-l-2 border-indigo-400 -ml-px pl-[11px]'
//                                 : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
//                             )}
//                           >
//                             {child.label}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => handleNavigate(item.to)}
//                     className={cn(
//                       'w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
//                       (window.location.hash === `#${item.to}` || window.location.pathname === item.to)
//                         ? 'bg-indigo-500/20 text-white border-l-2 border-indigo-400 -ml-px pl-[11px]'
//                         : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
//                     )}
//                   >
//                     <item.icon />
//                     {item.label}
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </nav>

//       {/* User footer */}
//       <div className="border-t border-white/[0.06] px-3 py-3">
//         <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-white/[0.04] cursor-pointer transition-colors">
//           <Avatar name={user.fullName} size="sm" />
//           <div className="min-w-0 flex-1">
//             <p className="text-xs font-semibold text-slate-300 truncate">{user.fullName}</p>
//             <p className="text-[10px] text-slate-600 capitalize">
//               {user.role} · {workspace.name}
//             </p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// Sidebar.jsx – complete version with all icons, no missing definitions
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

// ===================== Simple class name merger =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===================== Icons (SVG) – ALL are defined here =====================
const LayoutDashboardIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UsersIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const BarChart2Icon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={cn('h-3.5 w-3.5', className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// ===================== Avatar Component =====================
const Avatar = ({ name, size = 'sm' }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
  return (
    <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}>
      {initials}
    </div>
  );
};

// ===================== Mock user & workspace (replace with your store later) =====================
const useCurrentUser = () => ({ fullName: 'Subramanian A.', role: 'owner' });
const useWorkspace = () => ({ name: 'WYNSync' });

// ===================== Route constants =====================
const ROUTES = {
  DASHBOARD: '/',
  CONTACTS: '/contacts',
  LISTS: '/lists',
  SUPPRESSION: '/suppression',
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_CALENDAR: '/calendar',
  TEMPLATES: '/templates',
  ANALYTICS: '/analytics',
  AUTOMATION: '/automation',
  SETTINGS: '/settings',
  CAMPAIGN_NEW: '/campaigns/new',
};

// ===================== Navigation Groups =====================
const NAV_GROUPS = [
  {
    items: [{ label: 'Dashboard', icon: LayoutDashboardIcon, to: ROUTES.DASHBOARD }],
  },
  {
    label: 'Audience',
    items: [
      {
        label: 'Contacts',
        icon: UsersIcon,
        to: ROUTES.CONTACTS,
        children: [
          { label: 'All Contacts', to: ROUTES.CONTACTS },
          { label: 'Lists', to: ROUTES.LISTS },
          { label: 'Suppression', to: ROUTES.SUPPRESSION },
        ],
      },
    ],
  },
  {
    label: 'Campaigns',
    items: [
      {
        label: 'Campaigns',
        icon: MegaphoneIcon,
        to: ROUTES.CAMPAIGNS,
        children: [
          { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
          { label: 'Calendar', to: ROUTES.CAMPAIGN_CALENDAR },
        ],
      },
      { label: 'Templates', icon: FileTextIcon, to: ROUTES.TEMPLATES },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Analytics', icon: BarChart2Icon, to: ROUTES.ANALYTICS },
      { label: 'Automation', icon: ZapIcon, to: ROUTES.AUTOMATION },
    ],
  },
  {
    items: [{ label: 'Settings', icon: SettingsIcon, to: ROUTES.SETTINGS }],
  },
];

// ===================== Main Sidebar Component =====================
export default function Sidebar({ isOpen, onClose }) {
  const user = useCurrentUser();
  const workspace = useWorkspace();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

  const toggle = (label) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleNavigate = (to) => {
    navigate(to);
    if (onClose) onClose();
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[#0D1117]',
        'border-r border-white/[0.06] transition-transform duration-200',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
          <MailIcon />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white leading-tight truncate">WYNReach</p>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            WynSync Suite
          </p>
        </div>
      </div>

      {/* New Campaign CTA */}
      <div className="px-3 py-3">
        <button
          onClick={() => handleNavigate(ROUTES.CAMPAIGN_NEW)}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-lg',
            'bg-gradient-to-r from-indigo-600 to-violet-600',
            'py-2 text-sm font-semibold text-white',
            'hover:opacity-90 transition-opacity'
          )}
        >
          <PlusIcon />
          New Campaign
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.label && (
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggle(item.label)}
                      className={cn(
                        'w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
                        'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors'
                      )}
                    >
                      <item.icon />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDownIcon
                        className={cn(
                          'transition-transform',
                          expanded.includes(item.label) && 'rotate-180'
                        )}
                      />
                    </button>
                    {expanded.includes(item.label) && (
                      <div className="ml-9 mt-0.5 space-y-0.5">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                              cn(
                                'block rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                                isActive
                                  ? 'bg-indigo-500/20 text-indigo-300 border-l-2 border-indigo-400 -ml-px pl-[11px]'
                                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-indigo-500/20 text-white border-l-2 border-indigo-400 -ml-px pl-[11px]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                      )
                    }
                  >
                    <item.icon />
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/[0.06] px-3 py-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-white/[0.04] cursor-pointer transition-colors">
          <Avatar name={user.fullName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-300 truncate">{user.fullName}</p>
            <p className="text-[10px] text-slate-600 capitalize">
              {user.role} · {workspace.name}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}