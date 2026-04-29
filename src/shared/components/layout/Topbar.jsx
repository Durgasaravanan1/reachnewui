// Topbar.jsx
import React, { useState } from 'react';

// Simple class name merger
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===================== Icons (SVG) =====================
const MenuIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const HelpCircleIcon = () => (
  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Simple Avatar component (inline)
const Avatar = ({ name, size }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
  const sizeClass = size === 'xs' ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm';
  return (
    <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}>
      {initials}
    </div>
  );
};

// Mock current user (replace with your store later)
const useCurrentUser = () => ({ fullName: 'Subramanian A.' });

export default function Topbar({ onMenuClick, onNotificationClick }) {
  const user = useCurrentUser();
  const [unreadCount] = useState(3); // mock unread count

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-slate-200 bg-white px-4 gap-3">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
        aria-label="Toggle menu"
      >
        <MenuIcon />
      </button>

      {/* Search */}
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-sm">
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            placeholder="Search campaigns, contacts…"
            className={cn(
              'h-8 w-full rounded-md border border-slate-200 bg-slate-50',
              'pl-8 pr-3 text-sm placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white'
            )}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto">
        <button
          className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
          onClick={onNotificationClick}
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          className="p-2 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Help"
        >
          <HelpCircleIcon />
        </button>
        <div className="ml-1 flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 cursor-pointer transition-colors">
          <Avatar name={user?.fullName ?? 'User'} size="xs" />
          <span className="hidden sm:block text-sm font-semibold text-slate-700 max-w-[120px] truncate">
            {user?.fullName ?? 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}