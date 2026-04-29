// Step6Confirm.jsx
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
  });
};

// ----------------------------- Simple Router Mock (replaces useNavigate) -----------------------------
// In a real app you'd use react-router-dom, but here we mock navigation with state.
const useNavigate = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const navigate = (to) => {
    setCurrentPath(to);
    console.log(`[Mock Router] Navigated to: ${to}`);
    // You can also update window.location or show a message.
  };
  return navigate;
};

// ----------------------------- Mock Routes Constants -----------------------------
const ROUTES = {
  CAMPAIGNS: '/campaigns',
  DASHBOARD: '/dashboard',
};

// ----------------------------- Wizard Store (Context) -----------------------------
// Minimal store containing only the fields needed for Step6.
const WizardContext = createContext(null);

export const useWizardStore = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error('useWizardStore must be used within WizardProvider');
  return context;
};

export const WizardProvider = ({ children }) => {
  const [state, setState] = useState({
    campaignName: 'Summer Newsletter',
    estimatedRecipients: 12500,
    scheduledAt: '2026-05-15T10:00:00',
    sendMode: 'scheduled', // or 'immediate'
    createdCampaignId: 'camp_123456',
  });

  const reset = () => {
    console.log('[WizardStore] Reset called – clearing all campaign data');
    // In a real app, you would clear all wizard state.
    setState({
      campaignName: '',
      estimatedRecipients: 0,
      scheduledAt: null,
      sendMode: 'immediate',
      createdCampaignId: null,
    });
  };

  return (
    <WizardContext.Provider
      value={{
        ...state,
        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

// ----------------------------- Custom Button Component (Tailwind only) -----------------------------
const Button = ({ children, variant, onClick }) => {
  const base = "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variantClass = variant === 'primary'
    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  return (
    <button onClick={onClick} className={`${base} ${variantClass}`}>
      {children}
    </button>
  );
};

// ----------------------------- Main Step6Confirm Component -----------------------------
export default function Step6Confirm() {
  const navigate = useNavigate();
  const { campaignName, estimatedRecipients, scheduledAt, sendMode, createdCampaignId, reset } = useWizardStore();

  const handleViewCampaigns = () => {
    reset();
    navigate(ROUTES.CAMPAIGNS);
  };

  const handleNewCampaign = () => {
    reset();
    // In a real wizard, this would reset the step to 1 and stay on the same page.
    console.log('Reset wizard, start new campaign flow');
  };

  const handleDashboard = () => {
    reset();
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 sm:px-8 py-12 text-center">
        {/* Success icon with subtle animation */}
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl mb-6 animate-bounce">
          🎉
        </div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
          Campaign Scheduled!
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          <strong className="text-slate-700">{campaignName}</strong> has been scheduled to send to{' '}
          <strong className="text-slate-700">{estimatedRecipients?.toLocaleString()} recipients</strong>
          {sendMode === 'scheduled' && scheduledAt && (
            <> on <strong className="text-slate-700">{formatDateTime(scheduledAt)}</strong></>
          )}
          {sendMode === 'immediate' && ' immediately'}.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary" onClick={handleViewCampaigns}>
            View All Campaigns
          </Button>
          <Button variant="primary" onClick={handleNewCampaign}>
            + New Campaign
          </Button>
        </div>

        <button
          onClick={handleDashboard}
          className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}