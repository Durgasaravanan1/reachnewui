
// // // Layout.jsx – with margin adjusted for 260px sidebar
// // import React, { useState, useEffect } from 'react';
// // import { Outlet, useLocation } from 'react-router-dom';
// // import Sidebar from '../shared/components/layout/Sidebar';
// // import Topbar from '../shared/components/layout/Topbar';
// // import NotificationPanel from '../shared/components/layout/NotificationPanel';

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
// //   if (routes[pathname]) return routes[pathname];
// //   if (pathname.startsWith('/campaigns/')) return 'Campaign Details';
// //   return 'WYNSync';
// // };

// // const MobileOverlay = ({ onClick }) => (
// //   <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={onClick} aria-hidden="true" />
// // );

// // export default function Layout() {
// //   const location = useLocation();
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [notificationOpen, setNotificationOpen] = useState(false);
// //   const isMobile = useBreakpoint();

// //   const showSidebar = isMobile ? sidebarOpen : true;
// //   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
// //   const closeSidebar = () => setSidebarOpen(false);
// //   const pageTitle = getPageTitle(location.pathname);

// //   return (
// //     <div className="flex h-screen bg-slate-50 overflow-hidden">
// //       <Sidebar isOpen={showSidebar} onClose={closeSidebar} />
// //       {isMobile && sidebarOpen && <MobileOverlay onClick={closeSidebar} />}
// //       <div className={cn(
// //         'flex flex-col flex-1 min-w-0 transition-all duration-200',
// //         // === UPDATED MARGIN: 260px to match sidebar width ===
// //         !isMobile && 'ml-[260px]'
// //       )}>
// //         <Topbar
// //           onMenuClick={toggleSidebar}
// //           onNotificationClick={() => setNotificationOpen(true)}
// //           pageTitle={pageTitle}
// //         />
// //         <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
// //           <Outlet />
// //         </main>
// //       </div>
// //       <NotificationPanel open={notificationOpen} onClose={() => setNotificationOpen(false)} />
// //     </div>
// //   );
// // }


// // // Layout.jsx – with dynamic page title
// // import React, { useState, useEffect } from 'react';
// // import { Outlet, useLocation } from 'react-router-dom';
// // import Sidebar from '../shared/components/layout/Sidebar';
// // import Topbar from '../shared/components/layout/Topbar';

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

// // // Map route paths to display titles
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
// //     '/templates/:id/edit': 'Edit Template',
// //     '/analytics': 'Analytics',
// //     '/automation': 'Automation',
// //     '/settings': 'Settings',
// //     '/notifications': 'Notifications',
// //   };
// //   if (routes[pathname]) return routes[pathname];
// //   if (pathname.startsWith('/campaigns/')) return 'Campaign Details';
// //   if (pathname.startsWith('/templates/') && pathname.endsWith('/edit')) return 'Edit Template';
// //   return 'WYNSync';
// // };

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
// //       <div className={cn('flex flex-col flex-1 min-w-0 transition-all duration-200', !isMobile && 'ml-[260px]')}>
// //         {/* Pass the dynamic pageTitle to Topbar */}
// //         <Topbar onMenuClick={toggleSidebar} title={pageTitle} />
// //         <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }


// // Layout.jsx – dynamic page title with improved matching
// import React, { useState, useEffect } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import Sidebar from '../shared/components/layout/Sidebar';
// import Topbar from '../shared/components/layout/Topbar';

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

// // Map route paths to display titles (exact matches first)
// const getPageTitle = (pathname) => {
//   // Remove trailing slash for consistency
//   const path = pathname.replace(/\/$/, '');
  
//   const exactRoutes = {
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
  
//   if (exactRoutes[path]) return exactRoutes[path];
  
//   // Handle dynamic routes
//   if (path.startsWith('/campaigns/') && path !== '/campaigns/new') return 'Campaign Details';
//   if (path.startsWith('/templates/') && path.endsWith('/edit')) return 'Edit Template';
  
//   return 'WYNSync';
// };

// const MobileOverlay = ({ onClick }) => (
//   <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={onClick} aria-hidden="true" />
// );

// export default function Layout() {
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const isMobile = useBreakpoint();

//   const showSidebar = isMobile ? sidebarOpen : true;
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const closeSidebar = () => setSidebarOpen(false);

//   const pageTitle = getPageTitle(location.pathname);

//   // Optional: log to verify (remove in production)
//   useEffect(() => {
//     console.log('Current path:', location.pathname, '→ Title:', pageTitle);
//   }, [location.pathname, pageTitle]);

//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden">
//       <Sidebar isOpen={showSidebar} onClose={closeSidebar} />
//       {isMobile && sidebarOpen && <MobileOverlay onClick={closeSidebar} />}
//       <div className={cn('flex flex-col flex-1 min-w-0 transition-all duration-200', !isMobile && 'ml-[260px]')}>
//         <Topbar onMenuClick={toggleSidebar} title={pageTitle} />
//         <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../shared/components/layout/Sidebar';
import Topbar  from '../shared/components/layout/Topbar';

const SIDEBAR_W = 260; // must match Sidebar width

const PAGE_TITLES = {
  '/':              'Dashboard',
  '/contacts':      'All Contacts',
  '/lists':         'Audience Lists',
  '/suppression':   'Suppression List',
  '/campaigns':     'Campaigns',
  '/campaigns/new': 'New Campaign',
  '/calendar':      'Campaign Calendar',
  '/templates':     'Template Studio',
  '/templates/new': 'New Template',
  '/analytics':     'Analytics',
  '/automation':    'Automation',
  '/settings':      'Settings',
};

const getTitle = (path) => {
  const clean = path.replace(/\/$/, '') || '/';
  if (PAGE_TITLES[clean]) return PAGE_TITLES[clean];
  if (clean.startsWith('/campaigns/')) return 'Campaign Details';
  if (clean.startsWith('/templates/') && clean.endsWith('/edit')) return 'Edit Template';
  return 'WYNReach';
};

export default function Layout() {
  const location  = useLocation();
  const [isMobile, setIsMobile]     = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const title = getTitle(location.pathname);

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#F8FAFC' }}>

      {/* Sidebar */}
      <Sidebar
        isOpen={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content — offset by sidebar width on desktop */}
      <div style={{
        marginLeft: isMobile ? 0 : SIDEBAR_W,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        transition: 'margin-left 0.2s',
        overflow: 'hidden',
      }}>

        <Topbar
          title={title}
          onMenuClick={() => setSidebarOpen(s => !s)}
        />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: 24,
        }}>
          <Outlet/>
        </main>

      </div>
    </div>
  );
}