// // // // // Sidebar.jsx
// // // // import React, { useState } from 'react';

// // // // // ===================== Simple class name merger =====================
// // // // const cn = (...classes) => classes.filter(Boolean).join(' ');

// // // // // ===================== Icons (SVG replacements for lucide-react) =====================
// // // // const LayoutDashboardIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
// // // //   </svg>
// // // // );

// // // // const UsersIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
// // // //   </svg>
// // // // );

// // // // const MegaphoneIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
// // // //   </svg>
// // // // );

// // // // const FileTextIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // // //   </svg>
// // // // );

// // // // const BarChart2Icon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // // //   </svg>
// // // // );

// // // // const ZapIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
// // // //   </svg>
// // // // );

// // // // const SettingsIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // // //   </svg>
// // // // );

// // // // const PlusIcon = () => (
// // // //   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
// // // //   </svg>
// // // // );

// // // // const ChevronDownIcon = ({ className }) => (
// // // //   <svg className={cn('h-3.5 w-3.5', className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
// // // //   </svg>
// // // // );

// // // // const MailIcon = () => (
// // // //   <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// // // //   </svg>
// // // // );

// // // // // ===================== Simple Avatar Component =====================
// // // // const Avatar = ({ name, size = 'sm' }) => {
// // // //   const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
// // // //   const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
// // // //   return (
// // // //     <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}>
// // // //       {initials}
// // // //     </div>
// // // //   );
// // // // };

// // // // // ===================== Mock User & Workspace (replace with your store) =====================
// // // // const useCurrentUser = () => ({ fullName: 'Subramanian A.', role: 'owner' });
// // // // const useWorkspace = () => ({ name: 'WYNSync' });

// // // // // ===================== Mock Navigation (replace with react-router-dom) =====================
// // // // const useNavigate = () => {
// // // //   return (to) => {
// // // //     console.log(`Navigate to: ${to}`);
// // // //     // In a real app, you would use history.push or navigate from react-router-dom.
// // // //     // For demo, we also update window.location.hash to simulate SPA navigation (optional).
// // // //     window.location.hash = to;
// // // //   };
// // // // };

// // // // // ===================== Route constants =====================
// // // // const ROUTES = {
// // // //   DASHBOARD: '/',
// // // //   CONTACTS: '/contacts',
// // // //   LISTS: '/lists',
// // // //   SUPPRESSION: '/suppression',
// // // //   CAMPAIGNS: '/campaigns',
// // // //   CAMPAIGN_CALENDAR: '/calendar',
// // // //   TEMPLATES: '/templates',
// // // //   ANALYTICS: '/analytics',
// // // //   AUTOMATION: '/automation',
// // // //   SETTINGS: '/settings',
// // // //   CAMPAIGN_NEW: '/campaigns/new',
// // // // };

// // // // // ===================== Navigation Groups =====================
// // // // const NAV_GROUPS = [
// // // //   {
// // // //     items: [{ label: 'Dashboard', icon: LayoutDashboardIcon, to: ROUTES.DASHBOARD }],
// // // //   },
// // // //   {
// // // //     label: 'Audience',
// // // //     items: [
// // // //       {
// // // //         label: 'Contacts',
// // // //         icon: UsersIcon,
// // // //         to: ROUTES.CONTACTS,
// // // //         children: [
// // // //           { label: 'All Contacts', to: ROUTES.CONTACTS },
// // // //           { label: 'Lists', to: ROUTES.LISTS },
// // // //           { label: 'Suppression', to: ROUTES.SUPPRESSION },
// // // //         ],
// // // //       },
// // // //     ],
// // // //   },
// // // //   {
// // // //     label: 'Campaigns',
// // // //     items: [
// // // //       {
// // // //         label: 'Campaigns',
// // // //         icon: MegaphoneIcon,
// // // //         to: ROUTES.CAMPAIGNS,
// // // //         children: [
// // // //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// // // //           { label: 'Calendar', to: ROUTES.CAMPAIGN_CALENDAR },
// // // //         ],
// // // //       },
// // // //       { label: 'Templates', icon: FileTextIcon, to: ROUTES.TEMPLATES },
// // // //     ],
// // // //   },
// // // //   {
// // // //     label: 'Intelligence',
// // // //     items: [
// // // //       { label: 'Analytics', icon: BarChart2Icon, to: ROUTES.ANALYTICS },
// // // //       { label: 'Automation', icon: ZapIcon, to: ROUTES.AUTOMATION },
// // // //     ],
// // // //   },
// // // //   {
// // // //     items: [{ label: 'Settings', icon: SettingsIcon, to: ROUTES.SETTINGS }],
// // // //   },
// // // // ];

// // // // // ===================== Main Sidebar Component =====================
// // // // export default function Sidebar({ isOpen, onClose }) {
// // // //   const user = useCurrentUser();
// // // //   const workspace = useWorkspace();
// // // //   const navigate = useNavigate();
// // // //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// // // //   const toggle = (label) => {
// // // //     setExpanded((prev) =>
// // // //       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
// // // //     );
// // // //   };

// // // //   const handleNavigate = (to) => {
// // // //     navigate(to);
// // // //     if (onClose) onClose();
// // // //   };

// // // //   return (
// // // //     <aside
// // // //       className={cn(
// // // //         'fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[#0D1117]',
// // // //         'border-r border-white/[0.06] transition-transform duration-200',
// // // //         isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
// // // //       )}
// // // //     >
// // // //       {/* Logo */}
// // // //       <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
// // // //         <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
// // // //           <MailIcon />
// // // //         </div>
// // // //         <div className="min-w-0">
// // // //           <p className="text-sm font-bold text-white leading-tight truncate">WYNReach</p>
// // // //           <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
// // // //             WynSync Suite
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       {/* New Campaign CTA */}
// // // //       <div className="px-3 py-3">
// // // //         <button
// // // //           onClick={() => handleNavigate(ROUTES.CAMPAIGN_NEW)}
// // // //           className={cn(
// // // //             'w-full flex items-center justify-center gap-2 rounded-lg',
// // // //             'bg-gradient-to-r from-indigo-600 to-violet-600',
// // // //             'py-2 text-sm font-semibold text-white',
// // // //             'hover:opacity-90 transition-opacity'
// // // //           )}
// // // //         >
// // // //           <PlusIcon />
// // // //           New Campaign
// // // //         </button>
// // // //       </div>

// // // //       {/* Navigation */}
// // // //       <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4">
// // // //         {NAV_GROUPS.map((group, gi) => (
// // // //           <div key={gi} className="mb-1">
// // // //             {group.label && (
// // // //               <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
// // // //                 {group.label}
// // // //               </p>
// // // //             )}
// // // //             {group.items.map((item) => (
// // // //               <div key={item.label}>
// // // //                 {item.children ? (
// // // //                   <>
// // // //                     <button
// // // //                       onClick={() => toggle(item.label)}
// // // //                       className={cn(
// // // //                         'w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
// // // //                         'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors'
// // // //                       )}
// // // //                     >
// // // //                       <item.icon />
// // // //                       <span className="flex-1 text-left">{item.label}</span>
// // // //                       <ChevronDownIcon
// // // //                         className={cn(
// // // //                           'transition-transform',
// // // //                           expanded.includes(item.label) && 'rotate-180'
// // // //                         )}
// // // //                       />
// // // //                     </button>
// // // //                     {expanded.includes(item.label) && (
// // // //                       <div className="ml-9 mt-0.5 space-y-0.5">
// // // //                         {item.children.map((child) => (
// // // //                           <button
// // // //                             key={child.to}
// // // //                             onClick={() => handleNavigate(child.to)}
// // // //                             className={cn(
// // // //                               'block w-full text-left rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
// // // //                               window.location.hash === `#${child.to}` || window.location.pathname === child.to
// // // //                                 ? 'bg-indigo-500/20 text-indigo-300 border-l-2 border-indigo-400 -ml-px pl-[11px]'
// // // //                                 : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
// // // //                             )}
// // // //                           >
// // // //                             {child.label}
// // // //                           </button>
// // // //                         ))}
// // // //                       </div>
// // // //                     )}
// // // //                   </>
// // // //                 ) : (
// // // //                   <button
// // // //                     onClick={() => handleNavigate(item.to)}
// // // //                     className={cn(
// // // //                       'w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
// // // //                       (window.location.hash === `#${item.to}` || window.location.pathname === item.to)
// // // //                         ? 'bg-indigo-500/20 text-white border-l-2 border-indigo-400 -ml-px pl-[11px]'
// // // //                         : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
// // // //                     )}
// // // //                   >
// // // //                     <item.icon />
// // // //                     {item.label}
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         ))}
// // // //       </nav>

// // // //       {/* User footer */}
// // // //       <div className="border-t border-white/[0.06] px-3 py-3">
// // // //         <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-white/[0.04] cursor-pointer transition-colors">
// // // //           <Avatar name={user.fullName} size="sm" />
// // // //           <div className="min-w-0 flex-1">
// // // //             <p className="text-xs font-semibold text-slate-300 truncate">{user.fullName}</p>
// // // //             <p className="text-[10px] text-slate-600 capitalize">
// // // //               {user.role} · {workspace.name}
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </aside>
// // // //   );
// // // // }

// // // // // Sidebar.jsx – complete version with all icons, no missing definitions
// // // // import React, { useState } from 'react';
// // // // import { useNavigate, NavLink } from 'react-router-dom';

// // // // // ===================== Simple class name merger =====================
// // // // const cn = (...classes) => classes.filter(Boolean).join(' ');

// // // // // ===================== Icons (SVG) – ALL are defined here =====================
// // // // const LayoutDashboardIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
// // // //   </svg>
// // // // );

// // // // const UsersIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
// // // //   </svg>
// // // // );

// // // // const MegaphoneIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
// // // //   </svg>
// // // // );

// // // // const FileTextIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // // //   </svg>
// // // // );

// // // // const BarChart2Icon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // // //   </svg>
// // // // );

// // // // const ZapIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
// // // //   </svg>
// // // // );

// // // // const SettingsIcon = () => (
// // // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // // //   </svg>
// // // // );

// // // // const PlusIcon = () => (
// // // //   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
// // // //   </svg>
// // // // );

// // // // const ChevronDownIcon = ({ className }) => (
// // // //   <svg className={cn('h-3.5 w-3.5', className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
// // // //   </svg>
// // // // );

// // // // const MailIcon = () => (
// // // //   <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// // // //   </svg>
// // // // );

// // // // // ===================== Avatar Component =====================
// // // // const Avatar = ({ name, size = 'sm' }) => {
// // // //   const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
// // // //   const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
// // // //   return (
// // // //     <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}>
// // // //       {initials}
// // // //     </div>
// // // //   );
// // // // };

// // // // // ===================== Mock user & workspace (replace with your store later) =====================
// // // // const useCurrentUser = () => ({ fullName: 'Subramanian A.', role: 'owner' });
// // // // const useWorkspace = () => ({ name: 'WYNSync' });

// // // // // ===================== Route constants =====================
// // // // const ROUTES = {
// // // //   DASHBOARD: '/',
// // // //   CONTACTS: '/contacts',
// // // //   LISTS: '/lists',
// // // //   SUPPRESSION: '/suppression',
// // // //   CAMPAIGNS: '/campaigns',
// // // //   CAMPAIGN_CALENDAR: '/calendar',
// // // //   TEMPLATES: '/templates',
// // // //   ANALYTICS: '/analytics',
// // // //   AUTOMATION: '/automation',
// // // //   SETTINGS: '/settings',
// // // //   CAMPAIGN_NEW: '/campaigns/new',
// // // // };

// // // // // ===================== Navigation Groups =====================
// // // // const NAV_GROUPS = [
// // // //   {
// // // //     items: [{ label: 'Dashboard', icon: LayoutDashboardIcon, to: ROUTES.DASHBOARD }],
// // // //   },
// // // //   {
// // // //     label: 'Audience',
// // // //     items: [
// // // //       {
// // // //         label: 'Contacts',
// // // //         icon: UsersIcon,
// // // //         to: ROUTES.CONTACTS,
// // // //         children: [
// // // //           { label: 'All Contacts', to: ROUTES.CONTACTS },
// // // //           { label: 'Lists', to: ROUTES.LISTS },
// // // //           { label: 'Suppression', to: ROUTES.SUPPRESSION },
// // // //         ],
// // // //       },
// // // //     ],
// // // //   },
// // // //   {
// // // //     label: 'Campaigns',
// // // //     items: [
// // // //       {
// // // //         label: 'Campaigns',
// // // //         icon: MegaphoneIcon,
// // // //         to: ROUTES.CAMPAIGNS,
// // // //         children: [
// // // //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// // // //           { label: 'Calendar', to: ROUTES.CAMPAIGN_CALENDAR },
// // // //         ],
// // // //       },
// // // //       { label: 'Templates', icon: FileTextIcon, to: ROUTES.TEMPLATES },
// // // //     ],
// // // //   },
// // // //   {
// // // //     label: 'Intelligence',
// // // //     items: [
// // // //       { label: 'Analytics', icon: BarChart2Icon, to: ROUTES.ANALYTICS },
// // // //       { label: 'Automation', icon: ZapIcon, to: ROUTES.AUTOMATION },
// // // //     ],
// // // //   },
// // // //   {
// // // //     items: [{ label: 'Settings', icon: SettingsIcon, to: ROUTES.SETTINGS }],
// // // //   },
// // // // ];

// // // // // ===================== Main Sidebar Component =====================
// // // // export default function Sidebar({ isOpen, onClose }) {
// // // //   const user = useCurrentUser();
// // // //   const workspace = useWorkspace();
// // // //   const navigate = useNavigate();
// // // //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// // // //   const toggle = (label) => {
// // // //     setExpanded((prev) =>
// // // //       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
// // // //     );
// // // //   };

// // // //   const handleNavigate = (to) => {
// // // //     navigate(to);
// // // //     if (onClose) onClose();
// // // //   };

// // // //   return (
// // // //     <aside
// // // //       className={cn(
// // // //         'fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[#0D1117]',
// // // //         'border-r border-white/[0.06] transition-transform duration-200',
// // // //         isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
// // // //       )}
// // // //     >
// // // //       {/* Logo */}
// // // //       <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
// // // //         <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
// // // //           <MailIcon />
// // // //         </div>
// // // //         <div className="min-w-0">
// // // //           <p className="text-sm font-bold text-white leading-tight truncate">WYNReach</p>
// // // //           <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
// // // //             WynSync Suite
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       {/* New Campaign CTA */}
// // // //       <div className="px-3 py-3">
// // // //         <button
// // // //           onClick={() => handleNavigate(ROUTES.CAMPAIGN_NEW)}
// // // //           className={cn(
// // // //             'w-full flex items-center justify-center gap-2 rounded-lg',
// // // //             'bg-gradient-to-r from-indigo-600 to-violet-600',
// // // //             'py-2 text-sm font-semibold text-white',
// // // //             'hover:opacity-90 transition-opacity'
// // // //           )}
// // // //         >
// // // //           <PlusIcon />
// // // //           New Campaign
// // // //         </button>
// // // //       </div>

// // // //       {/* Navigation */}
// // // //       <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4">
// // // //         {NAV_GROUPS.map((group, gi) => (
// // // //           <div key={gi} className="mb-1">
// // // //             {group.label && (
// // // //               <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
// // // //                 {group.label}
// // // //               </p>
// // // //             )}
// // // //             {group.items.map((item) => (
// // // //               <div key={item.label}>
// // // //                 {item.children ? (
// // // //                   <>
// // // //                     <button
// // // //                       onClick={() => toggle(item.label)}
// // // //                       className={cn(
// // // //                         'w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium',
// // // //                         'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors'
// // // //                       )}
// // // //                     >
// // // //                       <item.icon />
// // // //                       <span className="flex-1 text-left">{item.label}</span>
// // // //                       <ChevronDownIcon
// // // //                         className={cn(
// // // //                           'transition-transform',
// // // //                           expanded.includes(item.label) && 'rotate-180'
// // // //                         )}
// // // //                       />
// // // //                     </button>
// // // //                     {expanded.includes(item.label) && (
// // // //                       <div className="ml-9 mt-0.5 space-y-0.5">
// // // //                         {item.children.map((child) => (
// // // //                           <NavLink
// // // //                             key={child.to}
// // // //                             to={child.to}
// // // //                             onClick={onClose}
// // // //                             className={({ isActive }) =>
// // // //                               cn(
// // // //                                 'block rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
// // // //                                 isActive
// // // //                                   ? 'bg-indigo-500/20 text-indigo-300 border-l-2 border-indigo-400 -ml-px pl-[11px]'
// // // //                                   : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
// // // //                               )
// // // //                             }
// // // //                           >
// // // //                             {child.label}
// // // //                           </NavLink>
// // // //                         ))}
// // // //                       </div>
// // // //                     )}
// // // //                   </>
// // // //                 ) : (
// // // //                   <NavLink
// // // //                     to={item.to}
// // // //                     onClick={onClose}
// // // //                     className={({ isActive }) =>
// // // //                       cn(
// // // //                         'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
// // // //                         isActive
// // // //                           ? 'bg-indigo-500/20 text-white border-l-2 border-indigo-400 -ml-px pl-[11px]'
// // // //                           : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
// // // //                       )
// // // //                     }
// // // //                   >
// // // //                     <item.icon />
// // // //                     {item.label}
// // // //                   </NavLink>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         ))}
// // // //       </nav>

// // // //       {/* User footer */}
// // // //       <div className="border-t border-white/[0.06] px-3 py-3">
// // // //         <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-white/[0.04] cursor-pointer transition-colors">
// // // //           <Avatar name={user.fullName} size="sm" />
// // // //           <div className="min-w-0 flex-1">
// // // //             <p className="text-xs font-semibold text-slate-300 truncate">{user.fullName}</p>
// // // //             <p className="text-[10px] text-slate-600 capitalize">
// // // //               {user.role} · {workspace.name}
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </aside>
// // // //   );
// // // // }


// // // // Sidebar.jsx – exact UI match from screenshots
// // // import React, { useState } from 'react';
// // // import { useNavigate, NavLink } from 'react-router-dom';

// // // // ── Utility ────────────────────────────────────────────────────────────────
// // // const cn = (...classes) => classes.filter(Boolean).join(' ');

// // // // ── SVG Icons ──────────────────────────────────────────────────────────────
// // // const DashboardIcon = () => (
// // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// // //     <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// // //     <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// // //     <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// // //   </svg>
// // // );

// // // const ChevronDownIcon = ({ open }) => (
// // //   <svg
// // //     className="h-3.5 w-3.5 shrink-0 transition-transform duration-200"
// // //     style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
// // //     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// // //   >
// // //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
// // //   </svg>
// // // );

// // // const PlusIcon = () => (
// // //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
// // //   </svg>
// // // );

// // // const MailIcon = () => (
// // //   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
// // //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// // //   </svg>
// // // );

// // // // ── Emoji Icon wrapper (matches screenshot icons) ──────────────────────────
// // // const EmojiIcon = ({ emoji }) => (
// // //   <span className="h-4 w-4 shrink-0 text-base leading-none flex items-center justify-center" style={{ fontSize: 15 }}>
// // //     {emoji}
// // //   </span>
// // // );

// // // // ── Routes ─────────────────────────────────────────────────────────────────
// // // const ROUTES = {
// // //   DASHBOARD:         '/',
// // //   CONTACTS:          '/contacts',
// // //   LISTS:             '/lists',
// // //   SUPPRESSION:       '/suppression',
// // //   CAMPAIGNS:         '/campaigns',
// // //   CAMPAIGN_CALENDAR: '/calendar',
// // //   TEMPLATES:         '/templates',
// // //   ANALYTICS:         '/analytics',
// // //   AUTOMATION:        '/automation',
// // //   SETTINGS:          '/settings',
// // //   CAMPAIGN_NEW:      '/campaigns/new',
// // // };

// // // // ── Nav structure ──────────────────────────────────────────────────────────
// // // // icon: either a React component or an emoji string
// // // const NAV_GROUPS = [
// // //   {
// // //     items: [
// // //       { label: 'Dashboard', emoji: null, Icon: DashboardIcon, to: ROUTES.DASHBOARD },
// // //     ],
// // //   },
// // //   {
// // //     label: 'Audience',
// // //     items: [
// // //       {
// // //         label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
// // //         children: [
// // //           { label: 'All Contacts', to: ROUTES.CONTACTS },
// // //           { label: 'Lists',        to: ROUTES.LISTS },
// // //           { label: 'Suppression',  to: ROUTES.SUPPRESSION },
// // //         ],
// // //       },
// // //     ],
// // //   },
// // //   {
// // //     label: 'Campaigns',
// // //     items: [
// // //       {
// // //         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
// // //         children: [
// // //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// // //           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
// // //         ],
// // //       },
// // //       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
// // //     ],
// // //   },
// // //   {
// // //     label: 'Intelligence',
// // //     items: [
// // //       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
// // //       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
// // //     ],
// // //   },
// // //   {
// // //     items: [
// // //       { label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS },
// // //     ],
// // //   },
// // // ];

// // // // ── Avatar ─────────────────────────────────────────────────────────────────
// // // const Avatar = ({ name }) => {
// // //   const initials = name
// // //     ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
// // //     : '?';
// // //   return (
// // //     <div
// // //       className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
// // //       style={{ background: 'linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)' }}
// // //     >
// // //       {initials}
// // //     </div>
// // //   );
// // // };

// // // // ── Mock hooks (replace with your real store) ──────────────────────────────
// // // const useCurrentUser = () => ({ fullName: 'Subramanian A.', role: 'owner' });
// // // const useWorkspace   = () => ({ name: 'WynSync' });

// // // // ── Sidebar ────────────────────────────────────────────────────────────────
// // // export default function Sidebar({ isOpen = true, onClose }) {
// // //   const user      = useCurrentUser();
// // //   const workspace = useWorkspace();
// // //   const navigate  = useNavigate();

// // //   // default: both expandable groups are open (matches screenshot)
// // //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// // //   const toggle = (label) =>
// // //     setExpanded((prev) =>
// // //       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
// // //     );

// // //   const go = (to) => { navigate(to); onClose?.(); };

// // //   return (
// // //     <>
// // //       {/* Mobile backdrop */}
// // //       {isOpen && (
// // //         <div
// // //           className="fixed inset-0 z-30 bg-black/50 md:hidden"
// // //           onClick={onClose}
// // //         />
// // //       )}

// // //       <aside
// // //         className={cn(
// // //           'fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col',
// // //           'transition-transform duration-200',
// // //           isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
// // //         )}
// // //         style={{ background: '#0D1117', borderRight: '1px solid rgba(255,255,255,0.06)' }}
// // //       >
// // //         {/* ── Logo ── */}
// // //         <div
// // //           className="flex items-center gap-3 px-4 py-[14px]"
// // //           style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
// // //         >
// // //           <div
// // //             className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
// // //             style={{ background: 'linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)' }}
// // //           >
// // //             <MailIcon />
// // //           </div>
// // //           <div className="min-w-0">
// // //             <p className="text-[15px] font-bold text-white leading-tight">WYNReach</p>
// // //             <p
// // //               className="text-[10px] font-semibold uppercase tracking-[0.12em]"
// // //               style={{ color: '#4B5563' }}
// // //             >
// // //               WynSync Suite
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* ── New Campaign CTA ── */}
// // //         <div className="px-3 pt-3 pb-2">
// // //           <button
// // //             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
// // //             className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
// // //             style={{ background: 'linear-gradient(135deg, #5B5BD6 0%, #6D28D9 100%)' }}
// // //           >
// // //             <PlusIcon />
// // //             New Campaign
// // //           </button>
// // //         </div>

// // //         {/* ── Navigation ── */}
// // //         <nav className="flex-1 overflow-y-auto px-2 pb-3" style={{ scrollbarWidth: 'none' }}>
// // //           {NAV_GROUPS.map((group, gi) => (
// // //             <div key={gi} className={gi > 0 ? 'mt-1' : ''}>
// // //               {/* Section label */}
// // //               {group.label && (
// // //                 <p
// // //                   className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
// // //                   style={{ color: '#374151' }}
// // //                 >
// // //                   {group.label}
// // //                 </p>
// // //               )}

// // //               {group.items.map((item) => (
// // //                 <div key={item.label}>
// // //                   {item.children ? (
// // //                     /* Expandable parent */
// // //                     <>
// // //                       <button
// // //                         onClick={() => toggle(item.label)}
// // //                         className="w-full flex items-center gap-2.5 rounded-lg px-3 py-[9px] text-sm font-medium transition-colors hover:bg-white/[0.04]"
// // //                         style={{ color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8' }}
// // //                       >
// // //                         <EmojiIcon emoji={item.emoji} />
// // //                         <span className="flex-1 text-left">{item.label}</span>
// // //                         <ChevronDownIcon open={expanded.includes(item.label)} />
// // //                       </button>

// // //                       {expanded.includes(item.label) && (
// // //                         <div className="mt-0.5 mb-1" style={{ paddingLeft: 38 }}>
// // //                           {item.children.map((child) => (
// // //                             <NavLink
// // //                               key={child.to}
// // //                               to={child.to}
// // //                               onClick={onClose}
// // //                               className={({ isActive }) =>
// // //                                 cn(
// // //                                   'flex items-center gap-2 rounded-md py-[7px] px-3 text-[13px] font-medium transition-colors',
// // //                                   isActive
// // //                                     ? 'text-[#A78BFA]'
// // //                                     : 'text-[#4B5563] hover:text-[#94A3B8] hover:bg-white/[0.03]'
// // //                                 )
// // //                               }
// // //                             >
// // //                               {({ isActive }) => (
// // //                                 <>
// // //                                   <span
// // //                                     className="h-1.5 w-1.5 rounded-full shrink-0"
// // //                                     style={{ background: isActive ? '#7C3AED' : '#374151' }}
// // //                                   />
// // //                                   {child.label}
// // //                                 </>
// // //                               )}
// // //                             </NavLink>
// // //                           ))}
// // //                         </div>
// // //                       )}
// // //                     </>
// // //                   ) : (
// // //                     /* Leaf nav item */
// // //                     <NavLink
// // //                       to={item.to}
// // //                       onClick={onClose}
// // //                       className={({ isActive }) =>
// // //                         cn(
// // //                           'flex items-center gap-2.5 rounded-lg px-3 py-[9px] text-sm font-medium transition-colors relative',
// // //                           isActive
// // //                             ? 'text-white'
// // //                             : 'text-[#94A3B8] hover:text-[#CBD5E1] hover:bg-white/[0.04]'
// // //                         )
// // //                       }
// // //                       style={({ isActive }) =>
// // //                         isActive
// // //                           ? { background: 'rgba(99,102,241,0.18)' }
// // //                           : {}
// // //                       }
// // //                     >
// // //                       {({ isActive }) => (
// // //                         <>
// // //                           {/* Left active bar */}
// // //                           {isActive && (
// // //                             <span
// // //                               className="absolute left-0 inset-y-1.5 w-[3px] rounded-r-full"
// // //                               style={{ background: '#818CF8' }}
// // //                             />
// // //                           )}
// // //                           {item.Icon
// // //                             ? <item.Icon />
// // //                             : <EmojiIcon emoji={item.emoji} />
// // //                           }
// // //                           {item.label}
// // //                         </>
// // //                       )}
// // //                     </NavLink>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ))}
// // //         </nav>

// // //         {/* ── User Footer ── */}
// // //         <div
// // //           className="px-3 py-3"
// // //           style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
// // //         >
// // //           <button
// // //             className="w-full flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.05]"
// // //             onClick={() => go(ROUTES.SETTINGS)}
// // //           >
// // //             <Avatar name={user.fullName} />
// // //             <div className="min-w-0 flex-1 text-left">
// // //               <p className="text-[13px] font-semibold text-[#E2E8F0] truncate leading-tight">
// // //                 {user.fullName}
// // //               </p>
// // //               <p className="text-[11px] capitalize leading-tight mt-0.5" style={{ color: '#4B5563' }}>
// // //                 {user.role} · {workspace.name}
// // //               </p>
// // //             </div>
// // //           </button>
// // //         </div>
// // //       </aside>
// // //     </>
// // //   );
// // // }




// // // Sidebar.jsx – width reduced to 260px
// // import React, { useState } from 'react';
// // import { useNavigate, NavLink } from 'react-router-dom';

// // // ── Utility ────────────────────────────────────────────────────────────────
// // const cn = (...classes) => classes.filter(Boolean).join(' ');

// // // ── SVG Icons ──────────────────────────────────────────────────────────────
// // const DashboardIcon = () => (
// //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// //     <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// //     <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// //     <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );

// // const ChevronDownIcon = ({ open }) => (
// //   <svg
// //     className="h-3.5 w-3.5 shrink-0 transition-transform duration-200"
// //     style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
// //     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //   >
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
// //   </svg>
// // );

// // const PlusIcon = () => (
// //   <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
// //   </svg>
// // );

// // const MailIcon = () => (
// //   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //   </svg>
// // );

// // // ── Emoji Icon wrapper ─────────────────────────────────────────────────────
// // const EmojiIcon = ({ emoji }) => (
// //   <span className="h-4 w-4 shrink-0 text-base leading-none flex items-center justify-center" style={{ fontSize: 15 }}>
// //     {emoji}
// //   </span>
// // );

// // // ── Routes (consistent with app) ──────────────────────────────────────────
// // const ROUTES = {
// //   DASHBOARD:         '/',
// //   CONTACTS:          '/contacts',
// //   LISTS:             '/lists',
// //   SUPPRESSION:       '/suppression',
// //   CAMPAIGNS:         '/campaigns',
// //   CAMPAIGN_CALENDAR: '/calendar',
// //   TEMPLATES:         '/templates',
// //   ANALYTICS:         '/analytics',
// //   AUTOMATION:        '/automation',
// //   SETTINGS:          '/settings',
// //   CAMPAIGN_NEW:      '/campaigns/new',
// // };

// // // ── Navigation structure ───────────────────────────────────────────────────
// // const NAV_GROUPS = [
// //   { items: [{ label: 'Dashboard', emoji: null, Icon: DashboardIcon, to: ROUTES.DASHBOARD }] },
// //   {
// //     label: 'Audience',
// //     items: [{
// //       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
// //       children: [
// //         { label: 'All Contacts', to: ROUTES.CONTACTS },
// //         { label: 'Lists',        to: ROUTES.LISTS },
// //         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
// //       ],
// //     }],
// //   },
// //   {
// //     label: 'Campaigns',
// //     items: [
// //       {
// //         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
// //         children: [
// //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// //           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
// //         ],
// //       },
// //       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
// //     ],
// //   },
// //   {
// //     label: 'Intelligence',
// //     items: [
// //       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
// //       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
// //     ],
// //   },
// //   { items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }] },
// // ];

// // // ── Avatar ─────────────────────────────────────────────────────────────────
// // const Avatar = ({ name }) => {
// //   const initials = name
// //     ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
// //     : '?';
// //   return (
// //     <div
// //       className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
// //       style={{ background: 'linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)' }}
// //     >
// //       {initials}
// //     </div>
// //   );
// // };

// // // ── Mock hooks (replace with your real store) ──────────────────────────────
// // const useCurrentUser = () => ({ fullName: 'Subramanian A.', role: 'owner' });
// // const useWorkspace   = () => ({ name: 'WynSync' });

// // // ── Main Sidebar component ─────────────────────────────────────────────────
// // export default function Sidebar({ isOpen = true, onClose }) {
// //   const user      = useCurrentUser();
// //   const workspace = useWorkspace();
// //   const navigate  = useNavigate();

// //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// //   const toggle = (label) =>
// //     setExpanded((prev) =>
// //       prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
// //     );

// //   const go = (to) => { navigate(to); onClose?.(); };

// //   return (
// //     <>
// //       {/* Mobile backdrop */}
// //       {isOpen && (
// //         <div
// //           className="fixed inset-0 z-30 bg-black/50 md:hidden"
// //           onClick={onClose}
// //         />
// //       )}

// //       <aside
// //         className={cn(
// //           // === WIDTH: 260px (reduced from 280) ===
// //           'fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col',
// //           'transition-transform duration-200',
// //           isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
// //         )}
// //         style={{ background: '#0D1117', borderRight: '1px solid rgba(255,255,255,0.06)' }}
// //       >
// //         {/* Logo */}
// //         <div
// //           className="flex items-center gap-3 px-4 py-[14px]"
// //           style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
// //         >
// //           <div
// //             className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
// //             style={{ background: 'linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)' }}
// //           >
// //             <MailIcon />
// //           </div>
// //           <div className="min-w-0">
// //             <p className="text-[15px] font-bold text-white leading-tight">WYNReach</p>
// //             <p
// //               className="text-[10px] font-semibold uppercase tracking-[0.12em]"
// //               style={{ color: '#4B5563' }}
// //             >
// //               WynSync Suite
// //             </p>
// //           </div>
// //         </div>

// //         {/* New Campaign CTA */}
// //         <div className="px-3 pt-3 pb-2">
// //           <button
// //             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
// //             className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
// //             style={{ background: 'linear-gradient(135deg, #5B5BD6 0%, #6D28D9 100%)' }}
// //           >
// //             <PlusIcon />
// //             New Campaign
// //           </button>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex-1 overflow-y-auto px-2 pb-3" style={{ scrollbarWidth: 'none' }}>
// //           {NAV_GROUPS.map((group, gi) => (
// //             <div key={gi} className={gi > 0 ? 'mt-1' : ''}>
// //               {group.label && (
// //                 <p
// //                   className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
// //                   style={{ color: '#374151' }}
// //                 >
// //                   {group.label}
// //                 </p>
// //               )}

// //               {group.items.map((item) => (
// //                 <div key={item.label}>
// //                   {item.children ? (
// //                     <>
// //                       <button
// //                         onClick={() => toggle(item.label)}
// //                         className="w-full flex items-center gap-2.5 rounded-lg px-3 py-[9px] text-sm font-medium transition-colors hover:bg-white/[0.04]"
// //                         style={{ color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8' }}
// //                       >
// //                         <EmojiIcon emoji={item.emoji} />
// //                         <span className="flex-1 text-left">{item.label}</span>
// //                         <ChevronDownIcon open={expanded.includes(item.label)} />
// //                       </button>

// //                       {expanded.includes(item.label) && (
// //                         <div className="mt-0.5 mb-1" style={{ paddingLeft: 38 }}>
// //                           {item.children.map((child) => (
// //                             <NavLink
// //                               key={child.to}
// //                               to={child.to}
// //                               onClick={onClose}
// //                               className={({ isActive }) =>
// //                                 cn(
// //                                   'flex items-center gap-2 rounded-md py-[7px] px-3 text-[13px] font-medium transition-colors',
// //                                   isActive
// //                                     ? 'text-[#A78BFA]'
// //                                     : 'text-[#4B5563] hover:text-[#94A3B8] hover:bg-white/[0.03]'
// //                                 )
// //                               }
// //                             >
// //                               {({ isActive }) => (
// //                                 <>
// //                                   <span
// //                                     className="h-1.5 w-1.5 rounded-full shrink-0"
// //                                     style={{ background: isActive ? '#7C3AED' : '#374151' }}
// //                                   />
// //                                   {child.label}
// //                                 </>
// //                               )}
// //                             </NavLink>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </>
// //                   ) : (
// //                     <NavLink
// //                       to={item.to}
// //                       onClick={onClose}
// //                       className={({ isActive }) =>
// //                         cn(
// //                           'flex items-center gap-2.5 rounded-lg px-3 py-[9px] text-sm font-medium transition-colors relative',
// //                           isActive
// //                             ? 'text-white'
// //                             : 'text-[#94A3B8] hover:text-[#CBD5E1] hover:bg-white/[0.04]'
// //                         )
// //                       }
// //                       style={({ isActive }) =>
// //                         isActive ? { background: 'rgba(99,102,241,0.18)' } : {}
// //                       }
// //                     >
// //                       {({ isActive }) => (
// //                         <>
// //                           {isActive && (
// //                             <span
// //                               className="absolute left-0 inset-y-1.5 w-[3px] rounded-r-full"
// //                               style={{ background: '#818CF8' }}
// //                             />
// //                           )}
// //                           {item.Icon ? <item.Icon /> : <EmojiIcon emoji={item.emoji} />}
// //                           {item.label}
// //                         </>
// //                       )}
// //                     </NavLink>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           ))}
// //         </nav>

// //         {/* User footer */}
// //         <div
// //           className="px-3 py-3"
// //           style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
// //         >
// //           <button
// //             className="w-full flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.05]"
// //             onClick={() => go(ROUTES.SETTINGS)}
// //           >
// //             <Avatar name={user.fullName} />
// //             <div className="min-w-0 flex-1 text-left">
// //               <p className="text-[13px] font-semibold text-[#E2E8F0] truncate leading-tight">
// //                 {user.fullName}
// //               </p>
// //               <p className="text-[11px] capitalize leading-tight mt-0.5" style={{ color: '#4B5563' }}>
// //                 {user.role} · {workspace.name}
// //               </p>
// //             </div>
// //           </button>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // }


// // Sidebar.jsx — no scroll, all items visible, font forced with !important
// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// /* ── Force font everywhere in sidebar ── */
// const SidebarFont = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//     .sidebar-root,
//     .sidebar-root *,
//     .sidebar-root *::before,
//     .sidebar-root *::after {
//       font-family: 'Plus Jakarta Sans', sans-serif !important;
//       box-sizing: border-box;
//     }
//     .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
//     .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
//     .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
//     .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
//   `}</style>
// );

// const ROUTES = {
//   DASHBOARD:         '/',
//   CONTACTS:          '/contacts',
//   LISTS:             '/lists',
//   SUPPRESSION:       '/suppression',
//   CAMPAIGNS:         '/campaigns',
//   CAMPAIGN_CALENDAR: '/calendar',
//   TEMPLATES:         '/templates',
//   ANALYTICS:         '/analytics',
//   AUTOMATION:        '/automation',
//   SETTINGS:          '/settings',
//   CAMPAIGN_NEW:      '/campaigns/new',
// };

// /* exact emojis from screenshot */
// const NAV_GROUPS = [
//   {
//     items: [{
//       label: 'Dashboard',
//       svgIcon: true,
//       to: ROUTES.DASHBOARD,
//     }],
//   },
//   {
//     label: 'AUDIENCE',
//     items: [{
//       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
//       children: [
//         { label: 'All Contacts', to: ROUTES.CONTACTS },
//         { label: 'Lists',        to: ROUTES.LISTS },
//         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
//       ],
//     }],
//   },
//   {
//     label: 'CAMPAIGNS',
//     items: [
//       {
//         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
//         children: [
//           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
//           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
//         ],
//       },
//       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
//     ],
//   },
//   {
//     label: 'INTELLIGENCE',
//     items: [
//       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
//       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
//     ],
//   },
//   {
//     items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
//   },
// ];

// /* ── Icons ── */
// const DashIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0}}>
//     <rect x="3" y="3" width="7" height="7" rx="1"/>
//     <rect x="14" y="3" width="7" height="7" rx="1"/>
//     <rect x="3" y="14" width="7" height="7" rx="1"/>
//     <rect x="14" y="14" width="7" height="7" rx="1"/>
//   </svg>
// );

// const ChevronIcon = ({ open }) => (
//   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//     style={{ flexShrink:0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.2s' }}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
//   </svg>
// );

// const MailIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round"
//       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//   </svg>
// );

// const PlusIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
//   </svg>
// );

// /* ── S = compact style values ── */
// const S = {
//   /* nav item row height — tight so everything fits */
//   rowPy:        7,
//   rowPx:        10,
//   groupLabelPt: 12,
//   groupLabelPb: 4,
//   childPy:      5,
//   childPx:      10,
//   fontSize:     13,
//   labelFontSize:9.5,
//   emojiSize:    15,
// };

// export default function Sidebar({ isOpen = true, onClose }) {
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

//   const toggle = lbl =>
//     setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

//   const go = to => { navigate(to); onClose?.(); };

//   return (
//     <>
//       <SidebarFont />

//       {/* Mobile backdrop */}
//       {isOpen && (
//         <div
//           className="md:hidden"
//           style={{ position:'fixed', inset:0, zIndex:30, background:'rgba(0,0,0,0.5)' }}
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className="sidebar-root"
//         style={{
//           position:   'fixed',
//           top: 0, left: 0, bottom: 0,
//           width:      260,
//           zIndex:     40,
//           background: '#0D1117',
//           borderRight:'1px solid rgba(255,255,255,0.06)',
//           display:    'flex',
//           flexDirection: 'column',
//           transform:  isOpen ? 'translateX(0)' : 'translateX(-100%)',
//           transition: 'transform 0.2s',
//           /* NO overflow on the aside itself */
//           overflow:   'hidden',
//         }}
//       >

//         {/* ── LOGO ── */}
//         <div style={{
//           display:'flex', alignItems:'center', gap:10,
//           padding:'13px 14px',
//           borderBottom:'1px solid rgba(255,255,255,0.06)',
//           flexShrink: 0,
//         }}>
//           <div style={{
//             width:34, height:34, borderRadius:10, flexShrink:0,
//             background:'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
//             display:'flex', alignItems:'center', justifyContent:'center',
//           }}>
//             <MailIcon/>
//           </div>
//           <div>
//             <p style={{ fontSize:14, fontWeight:700, color:'#fff', lineHeight:1.25, margin:0 }}>
//               WYNReach
//             </p>
//             <p style={{
//               fontSize:9.5, fontWeight:600, color:'#4B5563', margin:0,
//               textTransform:'uppercase', letterSpacing:'0.12em', marginTop:1,
//             }}>
//               WynSync Suite
//             </p>
//           </div>
//         </div>

//         {/* ── NEW CAMPAIGN ── */}
//         <div style={{ padding:'10px 10px 6px', flexShrink:0 }}>
//           <button
//             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
//             style={{
//               width:'100%', display:'flex', alignItems:'center',
//               justifyContent:'center', gap:7,
//               background:'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
//               border:'none', borderRadius:8, padding:'9px 0',
//               color:'#fff', fontSize:13, fontWeight:600,
//               cursor:'pointer',
//             }}
//           >
//             <PlusIcon/> New Campaign
//           </button>
//         </div>

//         {/* ── NAV — flex:1, NO overflow-y ── */}
//         <nav style={{
//           flex: 1,
//           padding: '2px 7px 8px',
//           /* No scrollbar, no overflow */
//           overflow: 'hidden',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'flex-start',
//         }}>
//           {NAV_GROUPS.map((group, gi) => (
//             <div key={gi}>

//               {/* Section label */}
//               {group.label && (
//                 <p style={{
//                   padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
//                   fontSize: S.labelFontSize, fontWeight:700, color:'#374151',
//                   textTransform:'uppercase', letterSpacing:'0.14em', margin:0,
//                 }}>
//                   {group.label}
//                 </p>
//               )}

//               {group.items.map(item => (
//                 <div key={item.label}>

//                   {item.children ? (
//                     <>
//                       {/* Parent expandable */}
//                       <button
//                         className="sb-nav-btn"
//                         onClick={() => toggle(item.label)}
//                         style={{
//                           width:'100%', display:'flex', alignItems:'center',
//                           gap:8, padding:`${S.rowPy}px ${S.rowPx}px`,
//                           borderRadius:7, background:'none', border:'none',
//                           cursor:'pointer',
//                           color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
//                           fontSize: S.fontSize, fontWeight:500,
//                           transition:'background 0.15s, color 0.15s',
//                         }}
//                       >
//                         <span style={{ fontSize:S.emojiSize, lineHeight:1, flexShrink:0 }}>
//                           {item.emoji}
//                         </span>
//                         <span style={{ flex:1, textAlign:'left' }}>{item.label}</span>
//                         <ChevronIcon open={expanded.includes(item.label)}/>
//                       </button>

//                       {/* Children */}
//                       {expanded.includes(item.label) && (
//                         <div style={{ paddingLeft:33, marginBottom:2 }}>
//                           {item.children.map(child => (
//                             <NavLink
//                               key={child.to}
//                               to={child.to}
//                               end={child.to === ROUTES.CONTACTS || child.to === ROUTES.CAMPAIGNS}
//                               onClick={onClose}
//                               className="sb-child-link"
//                               style={({ isActive }) => ({
//                                 display:'flex', alignItems:'center', gap:8,
//                                 padding:`${S.childPy}px ${S.childPx}px`,
//                                 borderRadius:6,
//                                 fontSize:12.5, fontWeight: isActive ? 600 : 500,
//                                 color: isActive ? '#A78BFA' : '#4B5563',
//                                 textDecoration:'none',
//                                 transition:'color 0.15s, background 0.15s',
//                                 /* active: left purple bar */
//                                 borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
//                                 paddingLeft: isActive ? 8 : 8,
//                               })}
//                             >
//                               {({ isActive }) => (
//                                 <>
//                                   <span style={{
//                                     width:5, height:5, borderRadius:'50%', flexShrink:0,
//                                     background: isActive ? '#7C3AED' : '#374151',
//                                   }}/>
//                                   {child.label}
//                                 </>
//                               )}
//                             </NavLink>
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* Single nav item */
//                     <NavLink
//                       to={item.to}
//                       end={item.to === '/'}
//                       onClick={onClose}
//                       className="sb-item-link"
//                       style={({ isActive }) => ({
//                         display:'flex', alignItems:'center', gap:8,
//                         padding:`${S.rowPy}px ${S.rowPx}px`,
//                         borderRadius:7,
//                         fontSize: S.fontSize, fontWeight:500,
//                         color: isActive ? '#fff' : '#94A3B8',
//                         textDecoration:'none',
//                         background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
//                         position:'relative',
//                         transition:'background 0.15s, color 0.15s',
//                       })}
//                     >
//                       {({ isActive }) => (
//                         <>
//                           {/* Active left bar */}
//                           {isActive && (
//                             <span style={{
//                               position:'absolute', left:0, top:5, bottom:5,
//                               width:3, borderRadius:'0 3px 3px 0',
//                               background:'#818CF8',
//                             }}/>
//                           )}
//                           {item.svgIcon
//                             ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon/></span>
//                             : <span style={{ fontSize:S.emojiSize, lineHeight:1, flexShrink:0 }}>{item.emoji}</span>
//                           }
//                           {item.label}
//                         </>
//                       )}
//                     </NavLink>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </nav>

//         {/* ── USER FOOTER ── */}
//         <div style={{
//           padding:'8px 10px',
//           borderTop:'1px solid rgba(255,255,255,0.06)',
//           flexShrink:0,
//         }}>
//           <button
//             className="sb-footer-btn"
//             onClick={() => go(ROUTES.SETTINGS)}
//             style={{
//               width:'100%', display:'flex', alignItems:'center', gap:9,
//               padding:'7px 8px', borderRadius:8,
//               background:'none', border:'none', cursor:'pointer',
//               transition:'background 0.15s',
//             }}
//           >
//             <div style={{
//               width:32, height:32, borderRadius:'50%', flexShrink:0,
//               background:'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
//               display:'flex', alignItems:'center', justifyContent:'center',
//               color:'#fff', fontSize:11.5, fontWeight:700,
//             }}>SA</div>
//             <div style={{ textAlign:'left', minWidth:0 }}>
//               <p style={{
//                 fontSize:12.5, fontWeight:600, color:'#E2E8F0',
//                 lineHeight:1.3, margin:0,
//                 whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
//               }}>Subramanian A.</p>
//               <p style={{ fontSize:10.5, color:'#4B5563', margin:0, marginTop:1, lineHeight:1.3 }}>
//                 Owner · WynSync
//               </p>
//             </div>
//           </button>
//         </div>

//       </aside>
//     </>
//   );
// }


// // Sidebar.jsx — no visible scrollbar, touch/wheel scroll works, font forced
// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const SidebarFont = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//     .sidebar-root,
//     .sidebar-root *,
//     .sidebar-root *::before,
//     .sidebar-root *::after {
//       font-family: 'Plus Jakarta Sans', sans-serif !important;
//       box-sizing: border-box;
//     }
//     .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
//     .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
//     .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
//     .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
//     .sidebar-root nav::-webkit-scrollbar { display: none; }
//   `}</style>
// );

// const ROUTES = {
//   DASHBOARD:         '/',
//   CONTACTS:          '/contacts',
//   LISTS:             '/lists',
//   SUPPRESSION:       '/suppression',
//   CAMPAIGNS:         '/campaigns',
//   CAMPAIGN_CALENDAR: '/calendar',
//   TEMPLATES:         '/templates',
//   ANALYTICS:         '/analytics',
//   AUTOMATION:        '/automation',
//   SETTINGS:          '/settings',
//   CAMPAIGN_NEW:      '/campaigns/new',
// };

// const NAV_GROUPS = [
//   {
//     items: [{
//       label: 'Dashboard',
//       svgIcon: true,
//       to: ROUTES.DASHBOARD,
//     }],
//   },
//   {
//     label: 'AUDIENCE',
//     items: [{
//       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
//       children: [
//         { label: 'All Contacts', to: ROUTES.CONTACTS },
//         { label: 'Lists',        to: ROUTES.LISTS },
//         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
//       ],
//     }],
//   },
//   {
//     label: 'CAMPAIGNS',
//     items: [
//       {
//         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
//         children: [
//           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
//           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
//         ],
//       },
//       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
//     ],
//   },
//   {
//     label: 'INTELLIGENCE',
//     items: [
//       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
//       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
//     ],
//   },
//   {
//     items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
//   },
// ];

// const DashIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
//     <rect x="3" y="3" width="7" height="7" rx="1"/>
//     <rect x="14" y="3" width="7" height="7" rx="1"/>
//     <rect x="3" y="14" width="7" height="7" rx="1"/>
//     <rect x="14" y="14" width="7" height="7" rx="1"/>
//   </svg>
// );

// const ChevronIcon = ({ open }) => (
//   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//     style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
//   </svg>
// );

// const MailIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round"
//       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//   </svg>
// );

// const PlusIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
//   </svg>
// );

// const S = {
//   rowPy:        7,
//   rowPx:        10,
//   groupLabelPt: 12,
//   groupLabelPb: 4,
//   childPy:      5,
//   childPx:      10,
//   fontSize:     13,
//   labelFontSize: 9.5,
//   emojiSize:    15,
// };

// export default function Sidebar({ isOpen = true, onClose }) {
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

//   const toggle = lbl =>
//     setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

//   const go = to => { navigate(to); onClose?.(); };

//   return (
//     <>
//       <SidebarFont />

//       {isOpen && (
//         <div
//           className="md:hidden"
//           style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className="sidebar-root"
//         style={{
//           position:      'fixed',
//           top: 0, left: 0, bottom: 0,
//           width:         260,
//           zIndex:        40,
//           background:    '#0D1117',
//           borderRight:   '1px solid rgba(255,255,255,0.06)',
//           display:       'flex',
//           flexDirection: 'column',
//           transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
//           transition:    'transform 0.2s',
//           overflow:      'hidden',
//         }}
//       >

//         {/* ── LOGO ── */}
//         <div style={{
//           display: 'flex', alignItems: 'center', gap: 10,
//           padding: '13px 14px',
//           borderBottom: '1px solid rgba(255,255,255,0.06)',
//           flexShrink: 0,
//         }}>
//           <div style={{
//             width: 34, height: 34, borderRadius: 10, flexShrink: 0,
//             background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <MailIcon />
//           </div>
//           <div>
//             <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
//               WYNReach
//             </p>
//             <p style={{
//               fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
//               textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
//             }}>
//               WynSync Suite
//             </p>
//           </div>
//         </div>

//         {/* ── NEW CAMPAIGN ── */}
//         <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
//           <button
//             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
//             style={{
//               width: '100%', display: 'flex', alignItems: 'center',
//               justifyContent: 'center', gap: 7,
//               background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
//               border: 'none', borderRadius: 8, padding: '9px 0',
//               color: '#fff', fontSize: 13, fontWeight: 600,
//               cursor: 'pointer',
//             }}
//           >
//             <PlusIcon /> New Campaign
//           </button>
//         </div>

//         {/* ── NAV — scrollable but no visible scrollbar ── */}
//         <nav style={{
//           flex: 1,
//           padding: '2px 7px 8px',
//           overflowY:          'auto',
//           overflowX:          'hidden',
//           scrollbarWidth:     'none',      /* Firefox */
//           msOverflowStyle:    'none',      /* IE/Edge */
//           display: 'flex',
//           flexDirection: 'column',
//         }}>
//           {NAV_GROUPS.map((group, gi) => (
//             <div key={gi}>

//               {group.label && (
//                 <p style={{
//                   padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
//                   fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
//                   textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
//                 }}>
//                   {group.label}
//                 </p>
//               )}

//               {group.items.map(item => (
//                 <div key={item.label}>

//                   {item.children ? (
//                     <>
//                       <button
//                         className="sb-nav-btn"
//                         onClick={() => toggle(item.label)}
//                         style={{
//                           width: '100%', display: 'flex', alignItems: 'center',
//                           gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
//                           borderRadius: 7, background: 'none', border: 'none',
//                           cursor: 'pointer',
//                           color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
//                           fontSize: S.fontSize, fontWeight: 500,
//                           transition: 'background 0.15s, color 0.15s',
//                         }}
//                       >
//                         <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
//                           {item.emoji}
//                         </span>
//                         <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
//                         <ChevronIcon open={expanded.includes(item.label)} />
//                       </button>

//                       {expanded.includes(item.label) && (
//                         <div style={{ paddingLeft: 33, marginBottom: 2 }}>
//                           {item.children.map(child => (
//                             <NavLink
//                               key={child.to}
//                               to={child.to}
//                               end
//                               onClick={onClose}
//                               className="sb-child-link"
//                               style={({ isActive }) => ({
//                                 display: 'flex', alignItems: 'center', gap: 8,
//                                 padding: `${S.childPy}px ${S.childPx}px`,
//                                 borderRadius: 6,
//                                 fontSize: 12.5, fontWeight: isActive ? 600 : 500,
//                                 color: isActive ? '#A78BFA' : '#4B5563',
//                                 textDecoration: 'none',
//                                 transition: 'color 0.15s, background 0.15s',
//                                 borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
//                               })}
//                             >
//                               {({ isActive }) => (
//                                 <>
//                                   <span style={{
//                                     width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
//                                     background: isActive ? '#7C3AED' : '#374151',
//                                   }} />
//                                   {child.label}
//                                 </>
//                               )}
//                             </NavLink>
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <NavLink
//                       to={item.to}
//                       end={item.to === '/'}
//                       onClick={onClose}
//                       className="sb-item-link"
//                       style={({ isActive }) => ({
//                         display: 'flex', alignItems: 'center', gap: 8,
//                         padding: `${S.rowPy}px ${S.rowPx}px`,
//                         borderRadius: 7,
//                         fontSize: S.fontSize, fontWeight: 500,
//                         color: isActive ? '#fff' : '#94A3B8',
//                         textDecoration: 'none',
//                         background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
//                         position: 'relative',
//                         transition: 'background 0.15s, color 0.15s',
//                       })}
//                     >
//                       {({ isActive }) => (
//                         <>
//                           {isActive && (
//                             <span style={{
//                               position: 'absolute', left: 0, top: 5, bottom: 5,
//                               width: 3, borderRadius: '0 3px 3px 0',
//                               background: '#818CF8',
//                             }} />
//                           )}
//                           {item.svgIcon
//                             ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
//                             : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
//                           }
//                           {item.label}
//                         </>
//                       )}
//                     </NavLink>
//                   )}

//                 </div>
//               ))}
//             </div>
//           ))}
//         </nav>

//         {/* ── USER FOOTER ── */}
//         <div style={{
//           padding: '8px 10px',
//           borderTop: '1px solid rgba(255,255,255,0.06)',
//           flexShrink: 0,
//         }}>
//           <button
//             className="sb-footer-btn"
//             onClick={() => go(ROUTES.SETTINGS)}
//             style={{
//               width: '100%', display: 'flex', alignItems: 'center', gap: 9,
//               padding: '7px 8px', borderRadius: 8,
//               background: 'none', border: 'none', cursor: 'pointer',
//               transition: 'background 0.15s',
//             }}
//           >
//             <div style={{
//               width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
//               background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: '#fff', fontSize: 11.5, fontWeight: 700,
//             }}>SA</div>
//             <div style={{ textAlign: 'left', minWidth: 0 }}>
//               <p style={{
//                 fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
//                 lineHeight: 1.3, margin: 0,
//                 whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//               }}>Subramanian A.</p>
//               <p style={{ fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3 }}>
//                 Owner · WynSync
//               </p>
//             </div>
//           </button>
//         </div>

//       </aside>
//     </>
//   );
// }



// Sidebar.jsx — no visible scrollbar, touch/wheel scroll works, font forced
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SidebarFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .sidebar-root,
    .sidebar-root *,
    .sidebar-root *::before,
    .sidebar-root *::after {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
    .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
    .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
    .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
    .sidebar-root nav::-webkit-scrollbar { display: none; }
  `}</style>
);

const ROUTES = {
  DASHBOARD:         '/',
  CONTACTS:          '/contacts',
  LISTS:             '/lists',
  SUPPRESSION:       '/suppression',
  CAMPAIGNS:         '/campaigns',
  CAMPAIGN_CALENDAR: '/calendar',
  TEMPLATES:         '/templates',
  ANALYTICS:         '/analytics',
  AUTOMATION:        '/automation',
  SETTINGS:          '/settings',
  CAMPAIGN_NEW:      '/campaigns/new',
  CHATBOT:           '/chatbot',      // ✅
};

const NAV_GROUPS = [
  {
    items: [{
      label: 'Dashboard',
      svgIcon: true,
      to: ROUTES.DASHBOARD,
    }],
  },
  {
    label: 'AUDIENCE',
    items: [{
      label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
      children: [
        { label: 'All Contacts', to: ROUTES.CONTACTS },
        { label: 'Lists',        to: ROUTES.LISTS },
        { label: 'Suppression',  to: ROUTES.SUPPRESSION },
      ],
    }],
  },
  {
    label: 'CAMPAIGNS',
    items: [
      {
        label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
        children: [
          { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
          { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
        ],
      },
      { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
      { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
      { label: 'Chatbot',    emoji: '🤖', to: ROUTES.CHATBOT },   // ✅ new chatbot item
    ],
  },
  {
    items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
  },
];

const DashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
);

const S = {
  rowPy:        7,
  rowPx:        10,
  groupLabelPt: 12,
  groupLabelPb: 4,
  childPy:      5,
  childPx:      10,
  fontSize:     13,
  labelFontSize: 9.5,
  emojiSize:    15,
};

export default function Sidebar({ isOpen = true, onClose }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

  const toggle = lbl =>
    setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

  const go = to => { navigate(to); onClose?.(); };

  return (
    <>
      <SidebarFont />

      {isOpen && (
        <div
          className="md:hidden"
          style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        />
      )}

      <aside
        className="sidebar-root"
        style={{
          position:      'fixed',
          top: 0, left: 0, bottom: 0,
          width:         260,
          zIndex:        40,
          background:    '#0D1117',
          borderRight:   '1px solid rgba(255,255,255,0.06)',
          display:       'flex',
          flexDirection: 'column',
          transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition:    'transform 0.2s',
          overflow:      'hidden',
        }}
      >

        {/* ── LOGO ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '13px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MailIcon />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
              WYNReach
            </p>
            <p style={{
              fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
              textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
            }}>
              WynSync Suite
            </p>
          </div>
        </div>

        {/* ── NEW CAMPAIGN ── */}
        <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
          <button
            onClick={() => go(ROUTES.CAMPAIGN_NEW)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 7,
              background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
              border: 'none', borderRadius: 8, padding: '9px 0',
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <PlusIcon /> New Campaign
          </button>
        </div>

        {/* ── NAV — scrollable but no visible scrollbar ── */}
        <nav style={{
          flex: 1,
          padding: '2px 7px 8px',
          overflowY:          'auto',
          overflowX:          'hidden',
          scrollbarWidth:     'none',
          msOverflowStyle:    'none',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>

              {group.label && (
                <p style={{
                  padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
                  fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
                  textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
                }}>
                  {group.label}
                </p>
              )}

              {group.items.map(item => (
                <div key={item.label}>

                  {item.children ? (
                    <>
                      <button
                        className="sb-nav-btn"
                        onClick={() => toggle(item.label)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center',
                          gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
                          borderRadius: 7, background: 'none', border: 'none',
                          cursor: 'pointer',
                          color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
                          fontSize: S.fontSize, fontWeight: 500,
                          transition: 'background 0.15s, color 0.15s',
                        }}
                      >
                        <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
                          {item.emoji}
                        </span>
                        <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                        <ChevronIcon open={expanded.includes(item.label)} />
                      </button>

                      {expanded.includes(item.label) && (
                        <div style={{ paddingLeft: 33, marginBottom: 2 }}>
                          {item.children.map(child => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              end
                              onClick={onClose}
                              className="sb-child-link"
                              style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: `${S.childPy}px ${S.childPx}px`,
                                borderRadius: 6,
                                fontSize: 12.5, fontWeight: isActive ? 600 : 500,
                                color: isActive ? '#A78BFA' : '#4B5563',
                                textDecoration: 'none',
                                transition: 'color 0.15s, background 0.15s',
                                borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
                              })}
                            >
                              {({ isActive }) => (
                                <>
                                  <span style={{
                                    width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                                    background: isActive ? '#7C3AED' : '#374151',
                                  }} />
                                  {child.label}
                                </>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className="sb-item-link"
                      style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: `${S.rowPy}px ${S.rowPx}px`,
                        borderRadius: 7,
                        fontSize: S.fontSize, fontWeight: 500,
                        color: isActive ? '#fff' : '#94A3B8',
                        textDecoration: 'none',
                        background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
                        position: 'relative',
                        transition: 'background 0.15s, color 0.15s',
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span style={{
                              position: 'absolute', left: 0, top: 5, bottom: 5,
                              width: 3, borderRadius: '0 3px 3px 0',
                              background: '#818CF8',
                            }} />
                          )}
                          {item.svgIcon
                            ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
                            : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
                          }
                          {item.label}
                        </>
                      )}
                    </NavLink>
                  )}

                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* ── USER FOOTER ── */}
        <div style={{
          padding: '8px 10px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <button
            className="sb-footer-btn"
            onClick={() => go(ROUTES.SETTINGS)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 8px', borderRadius: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 11.5, fontWeight: 700,
            }}>SA</div>
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <p style={{
                fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
                lineHeight: 1.3, margin: 0,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>Subramanian A.</p>
              <p style={{ fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3 }}>
                Owner · WynSync
              </p>
            </div>
          </button>
        </div>

      </aside>
    </>
  );
}