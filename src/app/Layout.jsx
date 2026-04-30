

// // // Layout.jsx – with dynamic page title + notification navigation
// // import React, { useState, useEffect } from 'react';
// // import { Outlet, useLocation, useNavigate } from 'react-router-dom'; // <-- added useLocation, useNavigate
// // import Sidebar from '../shared/components/layout/Sidebar';

// // const cn = (...classes) => classes.filter(Boolean).join(' ');

// // const useBreakpoint = () => {
// //   const [isMobile, setIsMobile] = useState(false);
// //   useEffect(() => {
// //     const query = window.matchMedia('(max-width: 767px)');
// //     const handler = (e) => setIsMobile(e.matches);
// //     setIsMobile(query.matches);
// //     query.addEventListener('change', handler);
// //     return () => query.removeEventListener('change', handler);
// //   }, []);
// //   return isMobile;
// // };

// // // Map routes to display titles
// // const getPageTitle = (pathname) => {
// //   const routes = {
// //     '/': 'Dashboard',
// //     '/contacts': 'All Contacts',
// //     '/lists': 'Audience Lists',
// //     '/suppression': 'Suppression List',
// //     '/campaigns': 'Campaigns',
// //     '/campaigns/new': 'New Campaign',
// //     '/calendar': 'Campaign Calendar',
// //     '/templates': 'Template Studio',
// //     '/templates/new': 'New Template',
// //     '/analytics': 'Analytics',
// //     '/automation': 'Automation',
// //     '/settings': 'Settings',
// //     '/notifications': 'Notifications',
// //   };
// //   // Exact match first
// //   if (routes[pathname]) return routes[pathname];
// //   // Fallback for dynamic routes like /campaigns/123
// //   if (pathname.startsWith('/campaigns/')) return 'Campaign Details';
// //   if (pathname.startsWith('/templates/') && pathname.endsWith('/edit')) return 'Edit Template';
// //   return 'WYNSync';
// // };

// // const Topbar = ({ onMenuClick, pageTitle }) => {
// //   const navigate = useNavigate();
// //   const [unreadCount] = useState(3); // mock – you can later fetch real count

// //   return (
// //     <header className="sticky top-0 z-40 flex h-14 items-center border-b border-slate-200 bg-white px-4 gap-3">
// //       <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100">
// //         <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
// //         </svg>
// //       </button>

// //       {/* Page Title – shown on all screens */}
// //       <div className="text-lg font-bold text-slate-900 truncate">{pageTitle}</div>

// //       {/* Search – hidden on mobile, visible on sm+ */}
// //       <div className="hidden sm:flex items-center gap-2 flex-1 max-w-sm relative ml-4">
// //         <input
// //           type="search"
// //           placeholder="Search campaigns, contacts…"
// //           className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //         />
// //         <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
// //           <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //           </svg>
// //         </div>
// //       </div>

// //       <div className="flex items-center gap-1 ml-auto">
// //         {/* Notification bell – navigates to NotificationsPage */}
// //         <button
// //           onClick={() => navigate('/notifications')}
// //           className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100"
// //         >
// //           <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //             <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// //           </svg>
// //           {unreadCount > 0 && (
// //             <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white flex items-center justify-center">
// //               {unreadCount}
// //             </span>
// //           )}
// //         </button>

// //         {/* User avatar and name */}
// //         <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 cursor-pointer">
// //           <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-semibold">
// //             SA
// //           </div>
// //           <span className="hidden sm:block text-sm font-semibold text-slate-700">Subramanian</span>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // // Mobile sidebar overlay
// // const MobileOverlay = ({ onClick }) => (
// //   <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={onClick} aria-hidden="true" />
// // );

// // export default function Layout() {
// //   const location = useLocation();
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const isMobile = useBreakpoint();

// //   const showSidebar = isMobile ? sidebarOpen : true;
// //   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
// //   const closeSidebar = () => setSidebarOpen(false);

// //   const pageTitle = getPageTitle(location.pathname);

// //   return (
// //     <div className="flex h-screen bg-slate-50 overflow-hidden">
// //       <Sidebar isOpen={showSidebar} onClose={closeSidebar} />
// //       {isMobile && sidebarOpen && <MobileOverlay onClick={closeSidebar} />}
// //       <div className={cn('flex flex-col flex-1 min-w-0 transition-all duration-200', !isMobile && 'ml-[240px]')}>
// //         <Topbar onMenuClick={toggleSidebar} pageTitle={pageTitle} />
// //         <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }



// // Layout.jsx – imports Topbar and NotificationPanel
// import React, { useState, useEffect } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import Sidebar from '../shared/components/layout/Sidebar';
// import Topbar from '../shared/components/layout/Topbar';          // ← imported
// import NotificationPanel from '../shared/components/layout/NotificationPanel'; // ← imported

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// const useBreakpoint = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const query = window.matchMedia('(max-width: 767px)');
//     const handler = (e) => setIsMobile(e.matches);
//     setIsMobile(query.matches);
//     query.addEventListener('change', handler);
//     return () => query.removeEventListener('change', handler);
//   }, []);
//   return isMobile;
// };

// // Map routes to display titles
// const getPageTitle = (pathname) => {
//   const routes = {
//     '/': 'Dashboard',
//     '/contacts': 'All Contacts',
//     '/lists': 'Audience Lists',
//     '/suppression': 'Suppression List',
//     '/campaigns': 'Campaigns',
//     '/campaigns/new': 'New Campaign',
//     '/calendar': 'Campaign Calendar',
//     '/templates': 'Template Studio',
//     '/templates/new': 'New Template',
//     '/analytics': 'Analytics',
//     '/automation': 'Automation',
//     '/settings': 'Settings',
//     '/notifications': 'Notifications',
//   };
//   if (routes[pathname]) return routes[pathname];
//   if (pathname.startsWith('/campaigns/')) return 'Campaign Details';
//   if (pathname.startsWith('/templates/') && pathname.endsWith('/edit')) return 'Edit Template';
//   return 'WYNSync';
// };

// const MobileOverlay = ({ onClick }) => (
//   <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={onClick} aria-hidden="true" />
// );

// export default function Layout() {
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);
//   const isMobile = useBreakpoint();

//   const showSidebar = isMobile ? sidebarOpen : true;
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const closeSidebar = () => setSidebarOpen(false);
//   const pageTitle = getPageTitle(location.pathname);

//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden">
//       <Sidebar isOpen={showSidebar} onClose={closeSidebar} />
//       {isMobile && sidebarOpen && <MobileOverlay onClick={closeSidebar} />}
//       <div className={cn('flex flex-col flex-1 min-w-0 transition-all duration-200', !isMobile && 'ml-[240px]')}>
//         {/* Use imported Topbar with pageTitle and notification handler */}
//         <Topbar
//           onMenuClick={toggleSidebar}
//           onNotificationClick={() => setNotificationOpen(true)}
//           pageTitle={pageTitle}
//         />
//         <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
//           <Outlet />
//         </main>
//       </div>

//       {/* NotificationPanel side drawer */}
//       <NotificationPanel open={notificationOpen} onClose={() => setNotificationOpen(false)} />
//     </div>
//   );
// }



// Layout.jsx – with margin adjusted for 260px sidebar
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../shared/components/layout/Sidebar';
import Topbar from '../shared/components/layout/Topbar';
import NotificationPanel from '../shared/components/layout/NotificationPanel';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const useBreakpoint = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(query.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

const getPageTitle = (pathname) => {
  const routes = {
    '/': 'Dashboard',
    '/contacts': 'All Contacts',
    '/lists': 'Audience Lists',
    '/suppression': 'Suppression List',
    '/campaigns': 'Campaigns',
    '/campaigns/new': 'New Campaign',
    '/calendar': 'Campaign Calendar',
    '/templates': 'Template Studio',
    '/templates/new': 'New Template',
    '/analytics': 'Analytics',
    '/automation': 'Automation',
    '/settings': 'Settings',
    '/notifications': 'Notifications',
  };
  if (routes[pathname]) return routes[pathname];
  if (pathname.startsWith('/campaigns/')) return 'Campaign Details';
  return 'WYNSync';
};

const MobileOverlay = ({ onClick }) => (
  <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={onClick} aria-hidden="true" />
);

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const isMobile = useBreakpoint();

  const showSidebar = isMobile ? sidebarOpen : true;
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isOpen={showSidebar} onClose={closeSidebar} />
      {isMobile && sidebarOpen && <MobileOverlay onClick={closeSidebar} />}
      <div className={cn(
        'flex flex-col flex-1 min-w-0 transition-all duration-200',
        // === UPDATED MARGIN: 260px to match sidebar width ===
        !isMobile && 'ml-[260px]'
      )}>
        <Topbar
          onMenuClick={toggleSidebar}
          onNotificationClick={() => setNotificationOpen(true)}
          pageTitle={pageTitle}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
          <Outlet />
        </main>
      </div>
      <NotificationPanel open={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </div>
  );
}