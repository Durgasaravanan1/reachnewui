// Step5Review.jsx
import React, { useContext, createContext, useState } from 'react';

// ----------------------------- Simple Date Formatter (replaces formatDateTime) -----------------------------
const formatDateTime = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

// ----------------------------- Wizard Store (Context) -----------------------------
// This is a minimal version that holds all needed data for Step5.
const WizardContext = createContext(null);

export const useWizardStore = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error('useWizardStore must be used within WizardProvider');
  return context;
};

export const WizardProvider = ({ children }) => {
  const [state, setState] = useState({
    // Step 1
    campaignName: 'Summer Newsletter',
    channel: 'email',
    goalLabel: 'promotional',
    // Step 2
    audienceListIds: ['list1', 'list2'],
    excludeListIds: [],
    estimatedRecipients: 12500,
    suppressedCount: 875,
    // Step 3
    subjectLine: '🚀 Big news: WYNReach V2 is here',
    previewText: 'Check out what we built for you',
    templateId: 't1',
    senderIdentityId: 'sender1',
    // Step 4
    sendMode: 'scheduled',
    scheduledAt: '2026-05-15T10:00:00',
    timezone: 'Asia/Kolkata',
    // Additional
    createdCampaignId: null,
  });
  const [step, setStep] = useState(5);

  const setStep4 = ({ sendMode, scheduledAt, timezone }) => {
    setState((prev) => ({ ...prev, sendMode, scheduledAt, timezone }));
  };
  const setCreatedCampaignId = (id) => {
    setState((prev) => ({ ...prev, createdCampaignId: id }));
  };
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <WizardContext.Provider
      value={{
        ...state,
        step,
        setStep4,
        setCreatedCampaignId,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

// ----------------------------- Simple Toast Store (Context) -----------------------------
const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context.addToast;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = (toast) => {
    setToasts((prev) => [...prev, { id: Date.now(), ...toast }]);
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3000);
  };
  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
      {/* Simple toast renderer */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl p-4 text-sm shadow-lg ${
              toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            <p className="font-semibold">{toast.title}</p>
            {toast.description && <p className="text-xs opacity-90">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ----------------------------- Mock API for creating campaign -----------------------------
const useCreateCampaign = () => {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (campaignData, { onSuccess, onError }) => {
    setIsPending(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsPending(false);
    // Simulate success (always succeed for demo)
    const mockCampaign = { id: 'camp_' + Date.now(), ...campaignData };
    onSuccess(mockCampaign);
  };
  return { mutate, isPending };
};

// ----------------------------- Custom UI Components (Tailwind only) -----------------------------
const Button = ({ children, variant, size, onClick, disabled, loading, fullWidth, type = 'button' }) => {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  const sizeClass = size === 'lg' ? "px-6 py-3 text-sm" : "px-4 py-2 text-sm";
  const widthClass = fullWidth ? "w-full" : "";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variantClass} ${sizeClass} ${widthClass}`}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
};

const Alert = ({ children, variant = 'success', title }) => {
  const variantClass = variant === 'success'
    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
    : "bg-red-50 border-red-200 text-red-800";
  return (
    <div className={`rounded-xl border p-4 ${variantClass}`}>
      {title && <p className="font-semibold text-sm mb-1">{title}</p>}
      <p className="text-sm">{children}</p>
    </div>
  );
};

const Badge = ({ children, variant }) => {
  const variantClass = variant === 'success'
    ? "bg-emerald-100 text-emerald-700"
    : "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClass}`}>
      {children}
    </span>
  );
};

// ----------------------------- ReviewBlock Component -----------------------------
const ReviewBlock = ({ label, value, sub }) => (
  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</p>
    <p className="font-semibold text-sm text-slate-800 leading-snug">{value || '—'}</p>
    {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
  </div>
);

// ----------------------------- Main Step5Review Component -----------------------------
export default function Step5Review() {
  const store = useWizardStore();
  const addToast = useToast();
  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const handleConfirm = () => {
    const campaignData = {
      campaignName: store.campaignName,
      channel: store.channel,
      goalLabel: store.goalLabel ?? undefined,
      audienceListIds: store.audienceListIds,
      excludeListIds: store.excludeListIds,
      templateId: store.templateId ?? undefined,
      subjectLine: store.subjectLine || undefined,
      previewText: store.previewText || undefined,
      senderIdentityId: store.senderIdentityId,
      scheduledAt: store.scheduledAt ?? undefined,
      timezone: store.timezone,
    };

    createCampaign(campaignData, {
      onSuccess: (campaign) => {
        store.setCreatedCampaignId(campaign.id);
        store.nextStep();
        addToast({ type: 'success', title: 'Campaign created!', description: 'It has been scheduled.' });
      },
      onError: () => {
        addToast({ type: 'error', title: 'Failed to create campaign', description: 'Please try again.' });
      },
    });
  };

  const handleTestEmail = () => {
    addToast({ type: 'success', title: 'Test email sent', description: 'Check your inbox.' });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Review & Confirm</h2>
        <p className="text-sm text-slate-500 mt-1">Check everything before scheduling.</p>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <ReviewBlock
            label="Campaign"
            value={store.campaignName}
            sub={store.goalLabel?.replace(/_/g, '-')}
          />
          <ReviewBlock
            label="Audience"
            value={`${store.estimatedRecipients?.toLocaleString()} recipients`}
            sub={`${store.suppressedCount?.toLocaleString()} suppressed contacts excluded`}
          />
          {store.channel === 'email' && (
            <ReviewBlock
              label="Subject Line"
              value={store.subjectLine || '—'}
              sub={store.previewText || undefined}
            />
          )}
          <ReviewBlock
            label="Channel"
            value={store.channel === 'email' ? 'Email' : 'WhatsApp'}
          />
          <ReviewBlock
            label="Scheduled"
            value={
              store.sendMode === 'immediate'
                ? 'Send immediately'
                : store.scheduledAt
                  ? formatDateTime(store.scheduledAt)
                  : '—'
            }
            sub={store.timezone}
          />
          <ReviewBlock
            label="Template"
            value={store.templateId ? 'Template selected' : 'No template'}
            sub="Unsubscribe link present ✓"
          />
        </div>

        <Alert variant="success" title="Campaign is ready to schedule.">
          All validation checks passed. Sender domain verified. Unsubscribe link present.
        </Alert>

        <div className="mt-4">
          <Button variant="secondary" fullWidth onClick={handleTestEmail}>
            📧 Send Test Email
          </Button>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
        <Button variant="secondary" onClick={store.prevStep}>
          ← Back
        </Button>
        <Button variant="primary" size="lg" onClick={handleConfirm} loading={isPending}>
          ✅ Confirm & Schedule
        </Button>
      </div>
    </div>
  );
}