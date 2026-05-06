// import { useState, useEffect } from 'react';
// import { Plus } from 'lucide-react';

// // ----------------------------- Mock Data -----------------------------
// const MOCK_WORKFLOWS = [
//   {
//     id: 'wf_1',
//     workflowName: 'Welcome New Subscriber',
//     status: 'active',
//     trigger: { type: 'contact_added_to_list' },
//     action: { type: 'send_email_campaign' },
//     lastRunAt: '2026-04-27T10:30:00Z',
//     totalTriggered: 342,
//   },
//   {
//     id: 'wf_2',
//     workflowName: 'Tag High-Value Customer',
//     status: 'paused',
//     trigger: { type: 'campaign_link_clicked' },
//     action: { type: 'add_tag' },
//     lastRunAt: '2026-04-26T14:15:00Z',
//     totalTriggered: 128,
//   },
//   {
//     id: 'wf_3',
//     workflowName: 'Birthday Greeting',
//     status: 'active',
//     trigger: { type: 'date_field' },
//     action: { type: 'send_whatsapp_campaign' },
//     lastRunAt: '2026-04-25T09:00:00Z',
//     totalTriggered: 87,
//   },
//   {
//     id: 'wf_4',
//     workflowName: 'Notify on Unsubscribe',
//     status: 'draft',
//     trigger: { type: 'campaign_opened' },
//     action: { type: 'notify_team_member' },
//     lastRunAt: null,
//     totalTriggered: 0,
//   },
// ];

// const TRIGGER_LABELS = {
//   contact_added_to_list: 'Contact added to list',
//   tag_applied: 'Tag applied',
//   campaign_opened: 'Campaign opened',
//   campaign_link_clicked: 'Link clicked in campaign',
//   date_field: 'Date field trigger',
// };

// const ACTION_LABELS = {
//   send_email_campaign: 'Send email campaign',
//   send_whatsapp_campaign: 'Send WhatsApp campaign',
//   add_tag: 'Add tag',
//   remove_tag: 'Remove tag',
//   add_to_list: 'Add to list',
//   notify_team_member: 'Notify team member',
// };

// const WORKFLOW_ICONS = {
//   contact_added_to_list: '🎉',
//   tag_applied: '🏷️',
//   campaign_opened: '📧',
//   campaign_link_clicked: '🔗',
//   date_field: '📅',
// };

// // Helper to simulate API delay
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // ----------------------------- Custom UI Components (Tailwind only) -----------------------------
// const PageHeader = ({ title, description, action }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//     <div>
//       <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
//       {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
//     </div>
//     {action && <div>{action}</div>}
//   </div>
// );

// const Button = ({ children, variant = 'primary', leftIcon, onClick, disabled }) => {
//   const baseClass = "inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variantClass = variant === 'primary'
//     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
//     : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
//   return (
//     <button className={`${baseClass} ${variantClass}`} onClick={onClick} disabled={disabled}>
//       {leftIcon && leftIcon}
//       {children}
//     </button>
//   );
// };

// const Badge = ({ children, variant }) => {
//   let variantClass = "bg-slate-100 text-slate-700";
//   if (variant === 'active') variantClass = "bg-emerald-100 text-emerald-700";
//   else if (variant === 'paused') variantClass = "bg-amber-100 text-amber-700";
//   else if (variant === 'draft') variantClass = "bg-slate-100 text-slate-500";
//   return (
//     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClass}`}>
//       {children}
//     </span>
//   );
// };

// const Toggle = ({ checked, onChange, disabled }) => {
//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       disabled={disabled}
//       onClick={() => onChange(!checked)}
//       className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
//         checked ? 'bg-indigo-600' : 'bg-slate-200'
//       } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//     >
//       <span
//         aria-hidden="true"
//         className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
//           checked ? 'translate-x-5' : 'translate-x-0'
//         }`}
//       />
//     </button>
//   );
// };

// const Alert = ({ children, variant = 'info', className = '' }) => {
//   const variantClass = variant === 'info'
//     ? "bg-blue-50 border-blue-200 text-blue-800"
//     : "bg-red-50 border-red-200 text-red-700";
//   return (
//     <div className={`rounded-xl border p-4 text-sm ${variantClass} ${className}`}>
//       {children}
//     </div>
//   );
// };

// const Spinner = () => (
//   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
// );

// const EmptyState = ({ title, description, children }) => (
//   <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
//     <p className="text-lg font-semibold text-slate-800">{title}</p>
//     <p className="text-sm text-slate-500 mt-1">{description}</p>
//     {children && <div className="mt-4">{children}</div>}
//   </div>
// );

// // Simplified permission guard – always shows content (customize as needed)
// const PermissionGuard = ({ children }) => <>{children}</>;

// // ----------------------------- Workflow Card Component -----------------------------
// const WorkflowCard = ({ workflow, onToggle }) => {
//   const [isToggling, setIsToggling] = useState(false);

//   const handleToggle = async (newChecked) => {
//     setIsToggling(true);
//     await onToggle(workflow.id, newChecked);
//     setIsToggling(false);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-md transition-all">
//       <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">
//         {WORKFLOW_ICONS[workflow.trigger.type] || '⚡'}
//       </div>

//       <div className="flex-1 min-w-0">
//         <p className="font-semibold text-sm text-slate-800 mb-1">{workflow.workflowName}</p>
//         <div className="flex flex-wrap gap-3 text-xs text-slate-500">
//           <span>Trigger: <strong>{TRIGGER_LABELS[workflow.trigger.type] || workflow.trigger.type}</strong></span>
//           <span>Action: <strong>{ACTION_LABELS[workflow.action.type] || workflow.action.type}</strong></span>
//         </div>
//       </div>

//       <div className="text-right text-xs text-slate-400 shrink-0 hidden sm:block">
//         {workflow.lastRunAt && <p>Last run: {new Date(workflow.lastRunAt).toLocaleDateString()}</p>}
//         {workflow.totalTriggered > 0 && (
//           <p className="text-emerald-600 font-semibold">{workflow.totalTriggered.toLocaleString()} triggered</p>
//         )}
//       </div>

//       <div className="flex items-center gap-2.5 shrink-0">
//         <Badge variant={workflow.status}>
//           {workflow.status}
//         </Badge>
//         <PermissionGuard>
//           <Toggle
//             checked={workflow.status === 'active'}
//             onChange={handleToggle}
//             disabled={isToggling}
//           />
//         </PermissionGuard>
//       </div>
//     </div>
//   );
// };

// // ----------------------------- Main Automation Page -----------------------------
// export default function AutomationPage() {
//   const [workflows, setWorkflows] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate fetching workflows
//   useEffect(() => {
//     const fetchWorkflows = async () => {
//       await delay(800);
//       setWorkflows(MOCK_WORKFLOWS);
//       setIsLoading(false);
//     };
//     fetchWorkflows();
//   }, []);

//   // Simulate activate/pause API call
//   const handleToggleWorkflow = async (workflowId, shouldActivate) => {
//     // Optimistic update
//     const originalWorkflows = [...workflows];
//     setWorkflows((prev) =>
//       prev.map((wf) =>
//         wf.id === workflowId
//           ? { ...wf, status: shouldActivate ? 'active' : 'paused' }
//           : wf
//       )
//     );
//     try {
//       await delay(500); // simulate network request
//       // In a real app, you would refetch or handle success
//     } catch (error) {
//       // Rollback on error
//       setWorkflows(originalWorkflows);
//       alert('Failed to update workflow status');
//     }
//   };

//   const handleCreateWorkflow = () => {
//     alert('Create new workflow – open a modal or navigate to creation page');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         <PageHeader
//           title="Automation Workflows"
//           description="Trigger-based message automation"
//           action={
//             <PermissionGuard>
//               <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />} onClick={handleCreateWorkflow}>
//                 New Workflow
//               </Button>
//             </PermissionGuard>
//           }
//         />

//         <Alert variant="info" className="mb-6">
//           <strong>V1 Scope:</strong> WYNReach V1 automation supports one trigger → one optional condition → one action.
//           Multi-step sequences and branching workflows are coming in V2.
//         </Alert>

//         {isLoading ? (
//           <div className="flex justify-center py-12">
//             <Spinner />
//           </div>
//         ) : workflows.length === 0 ? (
//           <EmptyState
//             title="No workflows yet"
//             description="Create automation workflows to trigger messages based on contact actions."
//           >
//             <Button variant="primary" onClick={handleCreateWorkflow}>
//               Create First Workflow
//             </Button>
//           </EmptyState>
//         ) : (
//           <div className="space-y-3">
//             {workflows.map((workflow) => (
//               <WorkflowCard
//                 key={workflow.id}
//                 workflow={workflow}
//                 onToggle={handleToggleWorkflow}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { 
  X, Lightbulb, GitBranch, Clock, Zap, Edit, Trash2, 
  BarChart3
} from 'lucide-react';
import CreateSequenceModal from './CreateSequenceModal';

// ----------------------------- Mock Data -----------------------------
const MOCK_RULES = [
  {
    id: 'rule_1',
    name: 'No Reply Follow-up',
    status: 'active',
    trigger: 'no_reply',
    triggerDelay: '24',
    action: 'send_whatsapp',
    actionContent: 'Hey {{contact_name}}, we noticed you didn\'t reply. Can we help?',
    lastRunAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    totalTriggered: 847,
    analytics: {
      last7Days: [120, 135, 148, 156, 142, 138, 108],
      conversionRate: 32.5,
      avgResponseTime: '2.3 hours'
    }
  },
  {
    id: 'rule_2',
    name: 'Abandoned Cart Reminder',
    status: 'active',
    trigger: 'link_clicked',
    triggerDelay: '1',
    action: 'send_email',
    actionContent: 'You left items in your cart! Complete your purchase now.',
    lastRunAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    totalTriggered: 4220,
    analytics: {
      last7Days: [580, 620, 645, 670, 658, 690, 757],
      conversionRate: 18.2,
      avgResponseTime: '1.5 hours'
    }
  },
  {
    id: 'rule_3',
    name: 'VIP Tag Added',
    status: 'active',
    trigger: 'tag_added',
    triggerDelay: '0',
    action: 'add_tag',
    actionContent: 'VIP_Customer',
    lastRunAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    totalTriggered: 182,
    analytics: {
      last7Days: [22, 25, 28, 26, 30, 27, 24],
      conversionRate: null,
      avgResponseTime: '0 hours'
    }
  },
  {
    id: 'rule_4',
    name: 'Trial Expiry Notify',
    status: 'paused',
    trigger: 'form_submitted',
    triggerDelay: '72',
    action: 'notify_team',
    actionContent: 'Trial user needs follow-up',
    lastRunAt: null,
    totalTriggered: 0,
    analytics: {
      last7Days: [0, 0, 0, 0, 0, 0, 0],
      conversionRate: null,
      avgResponseTime: null
    }
  },
];

const MOCK_SEQUENCES = [
  {
    id: 'seq_1',
    name: 'Welcome Series',
    status: 'active',
    description: 'Welcome new subscribers with a 3-step nurturing flow',
    steps: [
      { id: 1, delay: 0, type: 'whatsapp', content: 'Welcome to our community! 🎉' },
      { id: 2, delay: 24, type: 'email', content: 'Here are our top features...' },
      { id: 3, delay: 48, type: 'whatsapp', content: 'Special offer just for you!' },
    ],
    totalTriggered: 234,
    analytics: {
      completionRate: 78.5,
      avgCompletionTime: '3.2 days',
      stepBreakdown: [
        { step: 1, opened: 234, converted: 210 },
        { step: 2, opened: 210, converted: 185 },
        { step: 3, opened: 185, converted: 178 }
      ]
    }
  },
  {
    id: 'seq_2',
    name: 'Abandoned Cart Recovery',
    status: 'paused',
    description: 'Recover lost sales with timely reminders',
    steps: [
      { id: 1, delay: 0, type: 'whatsapp', content: 'You left items in your cart! 🛒' },
      { id: 2, delay: 24, type: 'email', content: 'Complete your purchase with free shipping.' },
      { id: 3, delay: 48, type: 'whatsapp', content: 'Last chance! Your cart will expire soon.' },
    ],
    totalTriggered: 89,
    analytics: {
      completionRate: 45.2,
      avgCompletionTime: '2.1 days',
      stepBreakdown: [
        { step: 1, opened: 89, converted: 67 },
        { step: 2, opened: 67, converted: 48 },
        { step: 3, opened: 48, converted: 40 }
      ]
    }
  },
];

// Trigger display labels
const TRIGGER_DISPLAY = {
  no_reply: "Contact doesn't reply",
  email_opened: "Email is opened",
  link_clicked: "Link is clicked",
  tag_added: "Tag is added",
  form_submitted: "Form is submitted",
};

// Action display labels
const ACTION_DISPLAY = {
  send_whatsapp: "Send WhatsApp Message",
  send_email: "Send Email",
  add_tag: "Add Tag",
  remove_tag: "Remove Tag",
  notify_team: "Notify Team",
};

// Rule Icons
const RULE_ICONS = {
  no_reply: '💬',
  email_opened: '📧',
  link_clicked: '🔗',
  tag_added: '🏷️',
  form_submitted: '📝',
};

const formatLastRun = (lastRunAt) => {
  if (!lastRunAt) return null;
  const now = new Date();
  const then = new Date(lastRunAt);
  const diffMs = now - then;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ----------------------------- UI Components -----------------------------
const Button = ({ children, variant = 'primary', leftIcon, onClick, disabled, loading, size = 'md' }) => {
  const baseClass = "inline-flex items-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm focus:ring-indigo-500"
    : variant === 'secondary'
    ? "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300"
    : "text-slate-400 hover:text-slate-600 focus:ring-slate-300";
  const sizeClass = size === 'sm' ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass}`} onClick={onClick} disabled={disabled || loading}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {!loading && leftIcon && leftIcon}
      {children}
    </button>
  );
};

const Badge = ({ children, variant }) => {
  let variantClass = "bg-slate-100 text-slate-700";
  if (variant === 'active') variantClass = "bg-emerald-50 text-emerald-700 border border-emerald-200";
  else if (variant === 'paused') variantClass = "bg-amber-50 text-amber-700 border border-amber-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${variantClass}`}>
      {children}
    </span>
  );
};

const Toggle = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}
  >
    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

// Analytics Modal Component
const AnalyticsModal = ({ isOpen, onClose, item, type }) => {
  if (!isOpen) return null;

  const getMaxValue = () => {
    if (type === 'rule') {
      return Math.max(...(item?.analytics?.last7Days || [1]));
    } else {
      return Math.max(...(item?.analytics?.stepBreakdown?.map(s => s.opened) || [1]));
    }
  };

  const getChartValues = () => {
    if (type === 'rule') {
      return item?.analytics?.last7Days || [0, 0, 0, 0, 0, 0, 0];
    } else {
      return item?.analytics?.stepBreakdown?.map(s => s.opened) || [0, 0, 0];
    }
  };

  const chartValues = getChartValues();
  const maxValue = getMaxValue();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Analytics: {item?.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{type === 'rule' ? 'Rule Performance' : 'Sequence Performance'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-slate-900">{item?.totalTriggered?.toLocaleString() || 0}</p>
              <p className="text-xs text-slate-500 mt-1">Total Triggered</p>
            </div>
            {type === 'sequence' ? (
              <>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{item?.analytics?.completionRate || 0}%</p>
                  <p className="text-xs text-slate-500 mt-1">Completion Rate</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-indigo-600">{item?.analytics?.avgCompletionTime || '—'}</p>
                  <p className="text-xs text-slate-500 mt-1">Avg Completion Time</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{item?.analytics?.conversionRate || 0}%</p>
                  <p className="text-xs text-slate-500 mt-1">Conversion Rate</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-indigo-600">{item?.analytics?.avgResponseTime || '—'}</p>
                  <p className="text-xs text-slate-500 mt-1">Avg Response Time</p>
                </div>
              </>
            )}
          </div>

          {/* Last 7 Days Chart */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-sm font-bold text-slate-900 mb-3">
              {type === 'rule' ? 'Last 7 Days Activity' : 'Step Performance'}
            </h4>
            <div className="flex items-end gap-2 h-32">
              {chartValues.map((value, idx) => {
                const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-indigo-500 rounded-t transition-all hover:bg-indigo-600"
                      style={{ height: `${heightPercent}%`, minHeight: value > 0 ? '4px' : '0px' }}
                    />
                    <span className="text-[10px] text-slate-400">
                      {type === 'rule' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx] : `Step ${idx + 1}`}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-500">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Breakdown (for sequences) */}
          {type === 'sequence' && item?.analytics?.stepBreakdown && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Step Conversion Details</h4>
              <div className="space-y-3">
                {item.analytics.stepBreakdown.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-semibold text-slate-600">Step {step.step}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Opened: {step.opened}</span>
                        <span>Converted: {step.converted}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(step.converted / step.opened) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold text-emerald-600">
                      {Math.round((step.converted / step.opened) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Edit Rule Modal
const EditRuleModal = ({ isOpen, onClose, rule, onSave }) => {
  const [ruleData, setRuleData] = useState(rule);

  useEffect(() => {
    if (rule) setRuleData(rule);
  }, [rule]);

  if (!isOpen || !rule) return null;

  const handleSubmit = () => {
    onSave(ruleData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Edit Rule: {rule?.name}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rule Name</label>
            <input
              type="text"
              value={ruleData?.name || ''}
              onChange={(e) => setRuleData({ ...ruleData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Trigger</label>
            <select
              value={ruleData?.trigger || 'no_reply'}
              onChange={(e) => setRuleData({ ...ruleData, trigger: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            >
              <option value="no_reply">Contact doesn't reply</option>
              <option value="email_opened">Email is opened</option>
              <option value="link_clicked">Link is clicked</option>
              <option value="tag_added">Tag is added</option>
              <option value="form_submitted">Form is submitted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Wait Time (hours)</label>
            <input
              type="number"
              value={ruleData?.triggerDelay || '24'}
              onChange={(e) => setRuleData({ ...ruleData, triggerDelay: e.target.value })}
              min="0"
              max="168"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Action Type</label>
            <select
              value={ruleData?.action || 'send_whatsapp'}
              onChange={(e) => setRuleData({ ...ruleData, action: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            >
              <option value="send_whatsapp">Send WhatsApp Message</option>
              <option value="send_email">Send Email</option>
              <option value="add_tag">Add Tag</option>
              <option value="remove_tag">Remove Tag</option>
              <option value="notify_team">Notify Team</option>
            </select>
          </div>
          {(ruleData?.action === 'send_whatsapp' || ruleData?.action === 'send_email') && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message Content</label>
              <textarea
                value={ruleData?.actionContent || ''}
                onChange={(e) => setRuleData({ ...ruleData, actionContent: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm resize-none"
              />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 text-center">
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Delete {type}?</h3>
          <p className="text-sm text-slate-500 mb-6">
            Are you sure you want to delete "{itemName}"? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
            <Button variant="primary" onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rule Card Component
const RuleCard = ({ rule, onToggle, onEdit, onDelete, onViewAnalytics }) => {
  const [isToggling, setIsToggling] = useState(false);
  const isActive = rule.status === 'active';
  const icon = RULE_ICONS[rule.trigger] || '⚡';

  const handleToggle = async (checked) => {
    setIsToggling(true);
    await onToggle(rule.id, checked);
    setIsToggling(false);
  };

  const getDelayText = () => {
    const delayHours = parseInt(rule.triggerDelay);
    if (delayHours === 0) return "immediately";
    if (delayHours === 1) return "after 1 hour";
    return `after ${delayHours} hours`;
  };

  return (
    <div className="relative flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-4 flex-1">
        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[15px] font-bold text-slate-900">{rule.name}</p>
            <Badge variant={isActive ? 'active' : 'paused'}>
              {isActive ? 'Active' : 'Paused'}
            </Badge>
          </div>
          <p className="text-sm text-slate-500">
            <span className="font-medium text-slate-600">Trigger:</span> {TRIGGER_DISPLAY[rule.trigger]}
            <span className="mx-2 text-slate-300">•</span>
            <span className="font-medium text-slate-600">Wait:</span> {getDelayText()}
            <span className="mx-2 text-slate-300">•</span>
            <span className="font-medium text-slate-600">Action:</span> {ACTION_DISPLAY[rule.action]}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          {rule.lastRunAt ? (
            <p className="text-xs text-slate-400">Last run: {formatLastRun(rule.lastRunAt)}</p>
          ) : (
            <p className="text-xs text-slate-400">Never run</p>
          )}
          {rule.totalTriggered > 0 ? (
            <p className={`text-sm font-semibold ${rule.totalTriggered > 1000 ? 'text-orange-500' : 'text-emerald-600'}`}>
              {rule.totalTriggered.toLocaleString()} contacts
            </p>
          ) : (
            <p className="text-xs text-slate-400">No contacts yet</p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewAnalytics(rule)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="View Analytics"
          >
            <BarChart3 className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={() => onEdit(rule)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Rule"
          >
            <Edit className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={() => onDelete(rule)}
            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete Rule"
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </button>
          <Toggle checked={isActive} onChange={handleToggle} disabled={isToggling} />
        </div>
      </div>
    </div>
  );
};

// Sequence Card Component
const SequenceCard = ({ sequence, onToggle, onEdit, onDelete, onViewAnalytics }) => {
  const [isToggling, setIsToggling] = useState(false);
  const isActive = sequence.status === 'active';

  const handleToggle = async (checked) => {
    setIsToggling(true);
    await onToggle(sequence.id, checked);
    setIsToggling(false);
  };

  const totalHours = sequence.steps.reduce((total, step, idx) => {
    if (idx > 0) total += parseInt(step.delay) || 0;
    return total;
  }, 0);

  return (
    <div className="relative flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-4 flex-1">
        <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
          <GitBranch className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[15px] font-bold text-slate-900">{sequence.name}</p>
            <Badge variant={isActive ? 'active' : 'paused'}>
              {isActive ? 'Active' : 'Paused'}
            </Badge>
          </div>
          <p className="text-sm text-slate-500">
            <span className="font-medium text-slate-600">Steps:</span> {sequence.steps.length} messages
            <span className="mx-2 text-slate-300">•</span>
            <span className="font-medium text-slate-600">Duration:</span> {totalHours} hours ({Math.floor(totalHours / 24)} days)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          {sequence.totalTriggered > 0 && (
            <p className="text-sm font-semibold text-emerald-600">
              {sequence.totalTriggered.toLocaleString()} contacts
            </p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewAnalytics(sequence)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="View Analytics"
          >
            <BarChart3 className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={() => onEdit(sequence)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Sequence"
          >
            <Edit className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={() => onDelete(sequence)}
            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete Sequence"
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </button>
          <Toggle checked={isActive} onChange={handleToggle} disabled={isToggling} />
        </div>
      </div>
    </div>
  );
};

// Edit Sequence Modal
const EditSequenceModal = ({ isOpen, onClose, sequence, onSave }) => {
  const [sequenceData, setSequenceData] = useState(sequence);

  useEffect(() => {
    if (sequence) setSequenceData(sequence);
  }, [sequence]);

  if (!isOpen || !sequence) return null;

  const handleSave = () => {
    onSave(sequenceData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Edit Sequence: {sequence?.name}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Sequence Name</label>
            <input
              type="text"
              value={sequenceData?.name || ''}
              onChange={(e) => setSequenceData({ ...sequenceData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={sequenceData?.description || ''}
              onChange={(e) => setSequenceData({ ...sequenceData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Rule Modal
const CreateRuleModal = ({ isOpen, onClose, onSave }) => {
  const [ruleData, setRuleData] = useState({
    name: '',
    trigger: 'no_reply',
    triggerDelay: '24',
    action: 'send_whatsapp',
    actionContent: '',
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!ruleData.name.trim()) {
      alert('Please enter a rule name');
      return;
    }
    if ((ruleData.action === 'send_whatsapp' || ruleData.action === 'send_email') && !ruleData.actionContent.trim()) {
      alert('Please enter message content');
      return;
    }
    onSave(ruleData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-bold text-slate-900">Create Automation Rule</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rule Name</label>
            <input
              type="text"
              value={ruleData.name}
              onChange={(e) => setRuleData({ ...ruleData, name: e.target.value })}
              placeholder="e.g., No Reply Follow-up"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Trigger</label>
            <select
              value={ruleData.trigger}
              onChange={(e) => setRuleData({ ...ruleData, trigger: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            >
              <option value="no_reply">Contact doesn't reply</option>
              <option value="email_opened">Email is opened</option>
              <option value="link_clicked">Link is clicked</option>
              <option value="tag_added">Tag is added</option>
              <option value="form_submitted">Form is submitted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Wait Time (hours)</label>
            <input
              type="number"
              value={ruleData.triggerDelay}
              onChange={(e) => setRuleData({ ...ruleData, triggerDelay: e.target.value })}
              min="0"
              max="168"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Action Type</label>
            <select
              value={ruleData.action}
              onChange={(e) => setRuleData({ ...ruleData, action: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm"
            >
              <option value="send_whatsapp">Send WhatsApp Message</option>
              <option value="send_email">Send Email</option>
              <option value="add_tag">Add Tag</option>
              <option value="remove_tag">Remove Tag</option>
              <option value="notify_team">Notify Team</option>
            </select>
          </div>
          {(ruleData.action === 'send_whatsapp' || ruleData.action === 'send_email') && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message Content</label>
              <textarea
                value={ruleData.actionContent}
                onChange={(e) => setRuleData({ ...ruleData, actionContent: e.target.value })}
                rows={4}
                placeholder="Enter your message here..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm resize-none"
              />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>Create Rule</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------- Main AutomationPage Component -----------------------------
export default function AutomationPage() {
  const [rules, setRules] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [showEditRuleModal, setShowEditRuleModal] = useState(false);
  const [showEditSequenceModal, setShowEditSequenceModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Selected item states
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await delay(600);
      setRules(MOCK_RULES);
      setSequences(MOCK_SEQUENCES);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleToggleRule = async (ruleId, shouldActivate) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, status: shouldActivate ? 'active' : 'paused' } : rule
      )
    );
    await delay(500);
  };

  const handleToggleSequence = async (sequenceId, shouldActivate) => {
    setSequences((prev) =>
      prev.map((seq) =>
        seq.id === sequenceId ? { ...seq, status: shouldActivate ? 'active' : 'paused' } : seq
      )
    );
    await delay(500);
  };

  const handleCreateRule = (ruleData) => {
    const newRule = {
      id: `rule_${Date.now()}`,
      name: ruleData.name,
      status: 'active',
      trigger: ruleData.trigger,
      triggerDelay: ruleData.triggerDelay,
      action: ruleData.action,
      actionContent: ruleData.actionContent,
      lastRunAt: null,
      totalTriggered: 0,
      analytics: { last7Days: [0, 0, 0, 0, 0, 0, 0], conversionRate: null, avgResponseTime: null }
    };
    setRules(prev => [newRule, ...prev]);
    alert(`Rule "${ruleData.name}" created successfully!`);
  };

  const handleCreateSequence = (sequenceData) => {
    const newSequence = {
      id: `seq_${Date.now()}`,
      name: sequenceData.name,
      description: sequenceData.description,
      status: 'active',
      steps: sequenceData.steps,
      totalTriggered: 0,
      analytics: { completionRate: 0, avgCompletionTime: null, stepBreakdown: [] }
    };
    setSequences(prev => [newSequence, ...prev]);
    alert(`Sequence "${sequenceData.name}" created successfully!`);
  };

  const handleUpdateRule = (updatedRule) => {
    setRules(prev => prev.map(rule => rule.id === updatedRule.id ? updatedRule : rule));
    alert(`Rule "${updatedRule.name}" updated successfully!`);
  };

  const handleUpdateSequence = (updatedSequence) => {
    setSequences(prev => prev.map(seq => seq.id === updatedSequence.id ? updatedSequence : seq));
    alert(`Sequence "${updatedSequence.name}" updated successfully!`);
  };

  const handleDeleteRule = () => {
    if (itemToDelete) {
      setRules(prev => prev.filter(rule => rule.id !== itemToDelete.id));
      setShowDeleteModal(false);
      setItemToDelete(null);
      alert(`Rule "${itemToDelete.name}" deleted successfully!`);
    }
  };

  const handleDeleteSequence = () => {
    if (itemToDelete) {
      setSequences(prev => prev.filter(seq => seq.id !== itemToDelete.id));
      setShowDeleteModal(false);
      setItemToDelete(null);
      alert(`Sequence "${itemToDelete.name}" deleted successfully!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-6">
      <div className="w-full">
        {/* Header with Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Automation</h1>
            <p className="text-sm text-slate-400 mt-1">Create rules and sequences to automate your marketing</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" leftIcon={<GitBranch className="h-4 w-4" />} onClick={() => setShowSequenceModal(true)}>
              New Sequence
            </Button>
            <Button variant="primary" leftIcon={<Zap className="h-4 w-4" />} onClick={() => setShowRuleModal(true)}>
              New Rule
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3 text-sm text-blue-700">
          <Lightbulb className="h-5 w-5 shrink-0" />
          <p><strong>Rules</strong> = One trigger → wait time → one action. <strong>Sequences</strong> = Multi-step messages with delays. Click the icons on any card to Edit, Delete, or View Analytics.</p>
        </div>

        {/* Rules Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-yellow-500" />
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Automation Rules</h2>
            <span className="text-xs text-slate-400">({rules.length})</span>
          </div>
          <div className="space-y-3">
            {rules.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">No rules yet. Click "New Rule" to create one.</p>
              </div>
            ) : (
              rules.map((rule) => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  onToggle={handleToggleRule}
                  onEdit={(rule) => {
                    setSelectedItem(rule);
                    setShowEditRuleModal(true);
                  }}
                  onDelete={(rule) => {
                    setItemToDelete(rule);
                    setSelectedType('rule');
                    setShowDeleteModal(true);
                  }}
                  onViewAnalytics={(rule) => {
                    setSelectedItem(rule);
                    setSelectedType('rule');
                    setShowAnalyticsModal(true);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Sequences Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-4 w-4 text-purple-600" />
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Follow-up Sequences</h2>
            <span className="text-xs text-slate-400">({sequences.length})</span>
          </div>
          <div className="space-y-3">
            {sequences.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">No sequences yet. Click "New Sequence" to create one.</p>
              </div>
            ) : (
              sequences.map((seq) => (
                <SequenceCard
                  key={seq.id}
                  sequence={seq}
                  onToggle={handleToggleSequence}
                  onEdit={(seq) => {
                    setSelectedItem(seq);
                    setShowEditSequenceModal(true);
                  }}
                  onDelete={(seq) => {
                    setItemToDelete(seq);
                    setSelectedType('sequence');
                    setShowDeleteModal(true);
                  }}
                  onViewAnalytics={(seq) => {
                    setSelectedItem(seq);
                    setSelectedType('sequence');
                    setShowAnalyticsModal(true);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateRuleModal
        isOpen={showRuleModal}
        onClose={() => setShowRuleModal(false)}
        onSave={handleCreateRule}
      />

      <CreateSequenceModal
        isOpen={showSequenceModal}
        onClose={() => setShowSequenceModal(false)}
        onSave={handleCreateSequence}
      />

      <EditRuleModal
        isOpen={showEditRuleModal}
        onClose={() => setShowEditRuleModal(false)}
        rule={selectedItem}
        onSave={handleUpdateRule}
      />

      <EditSequenceModal
        isOpen={showEditSequenceModal}
        onClose={() => setShowEditSequenceModal(false)}
        sequence={selectedItem}
        onSave={handleUpdateSequence}
      />

      <AnalyticsModal
        isOpen={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
        item={selectedItem}
        type={selectedType}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={selectedType === 'rule' ? handleDeleteRule : handleDeleteSequence}
        itemName={itemToDelete?.name}
        type={selectedType === 'rule' ? 'Rule' : 'Sequence'}
      />
    </div>
  );
}