// Toasts.jsx
import React, { useState, useEffect } from 'react';

// Simple class name merger
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Icons (SVG replacements for lucide-react)
const CheckCircleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: AlertTriangleIcon,
  info: InfoIcon,
};

const styles = {
  success: 'border-emerald-200 bg-white text-emerald-700',
  error: 'border-red-200 bg-white text-red-700',
  warning: 'border-amber-200 bg-white text-amber-700',
  info: 'border-sky-200 bg-white text-sky-700',
};

// Individual toast component
function Toast({ toast, onDismiss }) {
  const Icon = icons[toast.type];
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border px-4 py-3 shadow-dropdown',
        'min-w-[300px] max-w-sm animate-in slide-in-from-right-full duration-200',
        styles[toast.type]
      )}
      role="alert"
    >
      <Icon className="h-4 w-4 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-tight">{toast.title}</p>
        {toast.description && (
          <p className="text-xs mt-0.5 opacity-80">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 opacity-50 hover:opacity-100"
        aria-label="Dismiss"
      >
        <XIcon />
      </button>
    </div>
  );
}

// Toast container that manages its own state (or you can connect to a global store)
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  // Optional: auto-remove toasts after 5 seconds
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Expose a method to add toasts (for demo; integrate with context/store)
  const addToast = (toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  // For demonstration, we add a few sample toasts on mount
  useEffect(() => {
    addToast({ type: 'success', title: 'Campaign sent', description: '12,000 emails delivered' });
    addToast({ type: 'warning', title: 'Low credits', description: 'You have 500 credits left' });
    addToast({ type: 'error', title: 'Failed to send', description: 'Invalid API key' });
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast toast={t} onDismiss={() => removeToast(t.id)} />
        </div>
      ))}
    </div>
  );
}