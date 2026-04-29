// NotificationPanel.jsx
import React from 'react';

// Simple class name merger
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Icons (SVG replacements for lucide-react)
const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const icons = {
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  error: AlertTriangleIcon,
  info: ClockIcon,
};

const iconColors = {
  success: 'text-emerald-500 bg-emerald-50',
  warning: 'text-amber-500 bg-amber-50',
  error: 'text-red-500 bg-red-50',
  info: 'text-sky-500 bg-sky-50',
};

// Mock notification data (replace with real data later)
const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'warning', title: 'High bounce rate', body: '"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time: '2h ago', unread: true },
  { id: '2', type: 'success', title: 'Campaign sent', body: '"April Newsletter" sent successfully to 8,230 recipients.', time: '2h ago', unread: true },
  { id: '3', type: 'success', title: 'Campaign completed', body: '"WhatsApp Flash Sale" completed. 68.3% read rate, 22.4% CTR.', time: '5h ago', unread: true },
  { id: '4', type: 'info', title: 'Contact import done', body: '342 new contacts added to "Active Customers". 8 rows had errors.', time: '1d ago', unread: false },
  { id: '5', type: 'info', title: 'Campaign scheduled', body: '"Re-engagement Series" scheduled for May 1, 2026 at 9:00 AM IST.', time: '1d ago', unread: false },
];

export default function NotificationPanel({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 flex h-full w-80 flex-col bg-white shadow-dropdown',
          'border-l border-slate-200 transition-transform duration-300',
          'translate-x-0'
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
          <div className="flex items-center gap-2">
            <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {MOCK_NOTIFICATIONS.map((notif) => {
            const Icon = icons[notif.type];
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex gap-3 px-5 py-4 border-b border-slate-100 cursor-pointer transition-colors',
                  notif.unread ? 'bg-indigo-50/40 hover:bg-indigo-50/60' : 'hover:bg-slate-50'
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
          })}
        </div>
      </aside>
    </>
  );
}