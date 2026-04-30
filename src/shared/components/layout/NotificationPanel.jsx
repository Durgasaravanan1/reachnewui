

// NotificationPanel.jsx – Exact UI from screenshot (side drawer)
import React, { useState } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===================== Icons =====================
const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
  </svg>
);

// Map icons and colours
const getIcon = (type) => {
  switch (type) {
    case 'warning': return AlertTriangleIcon;
    case 'success': return CheckCircleIcon;
    default: return InfoIcon;
  }
};

const iconColors = {
  warning: 'bg-amber-100 text-amber-600',
  success: 'bg-emerald-100 text-emerald-600',
  info: 'bg-indigo-100 text-indigo-600',
};

// Exact notifications from the screenshot
const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    type: 'warning',
    title: 'High bounce rate detected',
    body: '"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    type: 'success',
    title: 'April Newsletter sent successfully',
    body: 'to 8,230 recipients.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: '3',
    type: 'success',
    title: 'WhatsApp Flash Sale completed',
    body: '68.3% read rate, 22.4% CTR.',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Contact import completed',
    body: '342 new contacts added to "Active Customers".',
    time: '1 day ago',
    unread: false,
  },
  {
    id: '5',
    type: 'info',
    title: 'Re-engagement Series scheduled',
    body: 'for May 1, 2026 at 9:00 AM IST.',
    time: '1 day ago',
    unread: false,
  },
];

export default function NotificationPanel({ open, onClose }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-slate-900/20" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <aside className="fixed top-0 right-0 z-50 h-full w-80 bg-white border-l border-slate-200 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <CheckIcon /> Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-5 text-center text-sm text-slate-500">No notifications</div>
          ) : (
            notifications.map((notif) => {
              const Icon = getIcon(notif.type);
              return (
                <div
                  key={notif.id}
                  onClick={() => handleMarkRead(notif.id)}
                  className={cn(
                    'flex gap-3 px-5 py-4 border-b border-slate-100 cursor-pointer transition-colors',
                    notif.unread ? 'bg-indigo-50/30 hover:bg-indigo-50/50' : 'hover:bg-slate-50'
                  )}
                >
                  <div className={cn('h-8 w-8 rounded-full flex items-center justify-center shrink-0', iconColors[notif.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      {notif.title}
                      {notif.unread && (
                        <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 align-middle" />
                      )}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.body}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}