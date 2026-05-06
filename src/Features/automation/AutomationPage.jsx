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
import { X, Lightbulb, GitBranch, Clock, Zap } from 'lucide-react';
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

// Rule Card Component (displays trigger, delay, action properly)
const RuleCard = ({ rule, onToggle }) => {
  const [isToggling, setIsToggling] = useState(false);
  const isActive = rule.status === 'active';
  const icon = RULE_ICONS[rule.trigger] || '⚡';

  const handleToggle = async (checked) => {
    setIsToggling(true);
    await onToggle(rule.id, checked);
    setIsToggling(false);
  };

  // Format the action display text
  const getActionDisplayText = () => {
    const actionText = ACTION_DISPLAY[rule.action] || rule.action;
    if (rule.action === 'add_tag' || rule.action === 'remove_tag') {
      return `${actionText}: "${rule.actionContent}"`;
    }
    if (rule.action === 'send_whatsapp' || rule.action === 'send_email') {
      return `${actionText}: "${rule.actionContent.substring(0, 50)}${rule.actionContent.length > 50 ? '...' : ''}"`;
    }
    return actionText;
  };

  // Format delay text
  const getDelayText = () => {
    const delayHours = parseInt(rule.triggerDelay);
    if (delayHours === 0) return "immediately";
    if (delayHours === 1) return "after 1 hour";
    return `after ${delayHours} hours`;
  };

  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all">
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
            <span className="font-medium text-slate-600">Trigger:</span> {TRIGGER_DISPLAY[rule.trigger] || rule.trigger}
            <span className="mx-2 text-slate-300">•</span>
            <span className="font-medium text-slate-600">Wait:</span> {getDelayText()}
            <span className="mx-2 text-slate-300">•</span>
            <span className="font-medium text-slate-600">Action:</span> {getActionDisplayText()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          {rule.lastRunAt && (
            <p className="text-xs text-slate-400">Last run: {formatLastRun(rule.lastRunAt)}</p>
          )}
          {rule.totalTriggered > 0 && (
            <p className={`text-sm font-semibold ${rule.totalTriggered > 1000 ? 'text-orange-500' : 'text-emerald-600'}`}>
              {rule.totalTriggered.toLocaleString()} contacts
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Toggle checked={isActive} onChange={handleToggle} disabled={isToggling} />
        </div>
      </div>
    </div>
  );
};

// Sequence Card Component
const SequenceCard = ({ sequence, onToggle }) => {
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
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all">
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
        <div className="flex items-center gap-2">
          <Toggle checked={isActive} onChange={handleToggle} disabled={isToggling} />
        </div>
      </div>
    </div>
  );
};

// ----------------------------- Create Rule Modal -----------------------------
const CreateRuleModal = ({ isOpen, onClose, onSave }) => {
  const [ruleData, setRuleData] = useState({
    name: '',
    trigger: 'no_reply',
    triggerDelay: '24',
    action: 'send_whatsapp',
    actionContent: '',
    tags: [],
    enabled: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ruleData.name.trim()) {
      alert('Please enter a rule name');
      return;
    }
    if ((ruleData.action === 'send_whatsapp' || ruleData.action === 'send_email') && !ruleData.actionContent.trim()) {
      alert('Please enter message content');
      return;
    }
    if ((ruleData.action === 'add_tag' || ruleData.action === 'remove_tag') && !ruleData.actionContent.trim()) {
      alert('Please enter tag name');
      return;
    }
    onSave(ruleData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setRuleData({ ...ruleData, [field]: value });
  };

  const getTriggerText = (trigger) => {
    const triggerMap = {
      no_reply: "doesn't reply",
      email_opened: "opens email",
      link_clicked: "clicks a link",
      tag_added: "gets a tag added",
      form_submitted: "submits a form"
    };
    return triggerMap[trigger] || trigger.replace(/_/g, ' ');
  };

  const getActionText = (action) => {
    const actionMap = {
      send_whatsapp: "send WhatsApp message",
      send_email: "send email",
      add_tag: "add tag",
      remove_tag: "remove tag",
      notify_team: "notify team"
    };
    return actionMap[action] || action.replace(/_/g, ' ');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-bold text-slate-900">Create Automation Rule</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Rule Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ruleData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., No Reply Follow-up"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            />
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              Trigger Conditions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  When <span className="text-red-500">*</span>
                </label>
                <select
                  value={ruleData.trigger}
                  onChange={(e) => handleInputChange('trigger', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="no_reply">Contact doesn't reply</option>
                  <option value="email_opened">Email is opened</option>
                  <option value="link_clicked">Link is clicked</option>
                  <option value="tag_added">Tag is added</option>
                  <option value="form_submitted">Form is submitted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Wait Time (hours)
                </label>
                <input
                  type="number"
                  value={ruleData.triggerDelay}
                  onChange={(e) => handleInputChange('triggerDelay', e.target.value)}
                  min="0"
                  max="168"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Range: 0-168 hours (7 days). 0 = immediate
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500" />
              Actions to Perform
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Action Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={ruleData.action}
                  onChange={(e) => handleInputChange('action', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={ruleData.actionContent}
                    onChange={(e) => handleInputChange('actionContent', e.target.value)}
                    placeholder="Enter your message here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                    required
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Tip: Use {'{{contact_name}}'} to personalize the message
                  </p>
                </div>
              )}
              {(ruleData.action === 'add_tag' || ruleData.action === 'remove_tag') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tag Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={ruleData.actionContent}
                    onChange={(e) => handleInputChange('actionContent', e.target.value)}
                    placeholder="e.g., VIP_Customer, Follow-up_Needed"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-2">Rule Summary</h4>
            <p className="text-sm text-slate-600">
              When a contact <strong className="text-slate-900">{getTriggerText(ruleData.trigger)}</strong>{' '}
              {parseInt(ruleData.triggerDelay) === 0 ? (
                <strong className="text-slate-900">immediately</strong>
              ) : (
                <>for <strong className="text-slate-900">{ruleData.triggerDelay} hours</strong></>
              )},
              then <strong className="text-slate-900">{getActionText(ruleData.action)}</strong>.
            </p>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium text-sm shadow-sm"
          >
            Create Rule
          </button>
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
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showSequenceModal, setShowSequenceModal] = useState(false);

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
    };
    setSequences(prev => [newSequence, ...prev]);
    alert(`Sequence "${sequenceData.name}" created successfully!`);
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
        {/* Header with Two Buttons */}
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
          <p><strong>Rules</strong> = One trigger → wait time → one action. <strong>Sequences</strong> = Multi-step messages with different delays. V2 will include branching workflows.</p>
        </div>

        {/* Rules Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-yellow-500" />
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Automation Rules</h2>
            <span className="text-xs text-slate-400">Trigger → Wait → Action</span>
          </div>
          <div className="space-y-3">
            {rules.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">No rules yet. Click "New Rule" to create one.</p>
              </div>
            ) : (
              rules.map((rule) => (
                <RuleCard key={rule.id} rule={rule} onToggle={handleToggleRule} />
              ))
            )}
          </div>
        </div>

        {/* Sequences Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-4 w-4 text-purple-600" />
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Follow-up Sequences</h2>
            <span className="text-xs text-slate-400">Multi-step with delays</span>
          </div>
          <div className="space-y-3">
            {sequences.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">No sequences yet. Click "New Sequence" to create one.</p>
              </div>
            ) : (
              sequences.map((seq) => (
                <SequenceCard key={seq.id} sequence={seq} onToggle={handleToggleSequence} />
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
    </div>
  );
}