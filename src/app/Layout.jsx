// // Layout.jsx – self‑contained, no duplicate declarations
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../shared/components/layout/Sidebar'; // adjust path to your actual Sidebar component

// // Simple cn utility (inline)
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // Mobile breakpoint hook (inline)
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

// // ----------------------------------------------------------------------
// // Topbar component
// const Topbar = ({ onMenuClick, onNotificationClick }) => {
//   const [unreadCount] = useState(3);
//   return (
//     <header className="sticky top-0 z-40 flex h-14 items-center border-b border-slate-200 bg-white px-4 gap-3">
//       <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100">
//         <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>
//       <div className="hidden sm:flex items-center gap-2 flex-1 max-w-sm relative">
//         <input type="search" placeholder="Search campaigns, contacts…"
//           className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//         <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
//           <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//       </div>
//       <div className="flex items-center gap-1 ml-auto">
//         <button onClick={onNotificationClick} className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100">
//           <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//           </svg>
//           {unreadCount > 0 && (
//             <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white flex items-center justify-center">
//               {unreadCount}
//             </span>
//           )}
//         </button>
//         <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 cursor-pointer">
//           <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-semibold">SA</div>
//           <span className="hidden sm:block text-sm font-semibold text-slate-700">Subramanian</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// // NotificationPanel (simplified)
// const NotificationPanel = ({ open, onClose }) => {
//   if (!open) return null;
//   return (
//     <>
//       <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
//       <aside className="fixed top-0 right-0 z-50 h-full w-80 bg-white border-l border-slate-200 shadow-dropdown">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-sm font-bold">Notifications</h2>
//           <button onClick={onClose}>✕</button>
//         </div>
//         <div className="p-4">No notifications</div>
//       </aside>
//     </>
//   );
// };

// // Mobile overlay
// const MobileOverlay = ({ onClick }) => (
//   <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={onClick} aria-hidden="true" />
// );

// // ----------------------------------------------------------------------
// // MAIN LAYOUT
// export default function Layout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);
//   const isMobile = useBreakpoint();

//   // Desktop: always show sidebar; Mobile: controlled by state
//   const showSidebar = isMobile ? sidebarOpen : true;

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const closeSidebar = () => setSidebarOpen(false);

//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden">
//       <Sidebar isOpen={showSidebar} onClose={closeSidebar} />

//       {isMobile && sidebarOpen && <MobileOverlay onClick={closeSidebar} />}

//       <div className={cn('flex flex-col flex-1 min-w-0 transition-all duration-200', !isMobile && 'ml-[240px]')}>
//         <Topbar onMenuClick={toggleSidebar} onNotificationClick={() => setNotificationOpen(true)} />
//         <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
//           {children}
//         </main>
//       </div>

//       <NotificationPanel open={notificationOpen} onClose={() => setNotificationOpen(false)} />
//     </div>
//   );
// }


// Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // <-- MUST use Outlet for nested routes
import Sidebar from '../shared/components/layout/Sidebar';

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

// Topbar, NotificationPanel, MobileOverlay (same as before – keep them)
const Topbar = ({ onMenuClick, onNotificationClick }) => {
  const [unreadCount] = useState(3);
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-slate-200 bg-white px-4 gap-3">
      <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-sm relative">
        <input type="search" placeholder="Search campaigns, contacts…"
          className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-1 ml-auto">
        <button onClick={onNotificationClick} className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100">
          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 cursor-pointer">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-semibold">SA</div>
          <span className="hidden sm:block text-sm font-semibold text-slate-700">Subramanian</span>
        </div>
      </div>
    </header>
  );
};

const NotificationPanel = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
      <aside className="fixed top-0 right-0 z-50 h-full w-80 bg-white border-l border-slate-200 shadow-dropdown">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-sm font-bold">Notifications</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="p-4">No notifications</div>
      </aside>
    </>
  );
};

const MobileOverlay = ({ onClick }) => (
  <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden" onClick={onClick} aria-hidden="true" />
);

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const isMobile = useBreakpoint();

  const showSidebar = isMobile ? sidebarOpen : true;
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isOpen={showSidebar} onClose={closeSidebar} />
      {isMobile && sidebarOpen && <MobileOverlay onClick={closeSidebar} />}
      <div className={cn('flex flex-col flex-1 min-w-0 transition-all duration-200', !isMobile && 'ml-[240px]')}>
        <Topbar onMenuClick={toggleSidebar} onNotificationClick={() => setNotificationOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4">
          <Outlet /> {/* <-- Replaces {children} */}
        </main>
      </div>
      <NotificationPanel open={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </div>
  );
}