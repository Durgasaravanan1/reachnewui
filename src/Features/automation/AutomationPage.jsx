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
import { Plus, X, Lightbulb, ChevronRight } from 'lucide-react';

// ----------------------------- Mock Data -----------------------------
const MOCK_WORKFLOWS = [
  {
    id: 'wf_1',
    workflowName: 'Welcome New Subscriber',
    status: 'active',
    trigger: { type: 'contact_added_to_list', config: { listName: 'All Subscribers' } },
    action: { type: 'send_email_campaign', config: { campaign: 'Onboarding Welcome' }, cooldownHours: 0 },
    lastRunAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    totalTriggered: 847,
  },
  {
    id: 'wf_2',
    workflowName: 'Re-engagement Trigger',
    status: 'active',
    trigger: { type: 'tag_applied', config: { tag: 'Inactive-90d' } },
    action: { type: 'add_to_list', config: { listName: 'Re-engagement campaign list' }, cooldownHours: 0 },
    lastRunAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    totalTriggered: 4220,
  },
  {
    id: 'wf_3',
    workflowName: 'Post-Demo WhatsApp Follow-up',
    status: 'active',
    trigger: { type: 'campaign_link_clicked', config: { link: 'Book a Demo' } },
    action: { type: 'send_whatsapp_campaign', config: { template: 'Demo Follow-up WhatsApp' }, cooldownHours: 0 },
    lastRunAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalTriggered: 182,
  },
  {
    id: 'wf_4',
    workflowName: 'Trial Expiry Reminder',
    status: 'paused',
    trigger: { type: 'date_field', config: { dateField: 'trial_expiry', offset: '3 days before' } },
    action: { type: 'send_email_campaign', config: { campaign: 'Trial Expiry' }, cooldownHours: 0 },
    lastRunAt: null,
    totalTriggered: 0,
  },
];

const TRIGGER_TYPES = [
  { id: 'contact_added_to_list', label: 'Contact added to list', description: 'When a contact is added to a specific list' },
  { id: 'tag_applied', label: 'Tag applied', description: 'When a specific tag is applied to a contact' },
  { id: 'campaign_link_clicked', label: 'Campaign link clicked', description: 'When a specific link in a campaign is clicked' },
  { id: 'date_field', label: 'Date field reaches value', description: 'When a date field matches a specific condition' },
];

const ACTION_TYPES = [
  { id: 'send_email_campaign', label: 'Send email campaign', description: 'Send an email campaign to the contact' },
  { id: 'send_whatsapp_campaign', label: 'Send WhatsApp message', description: 'Send a WhatsApp template message' },
  { id: 'add_to_list', label: 'Add to list', description: 'Add contact to a specific list' },
];

const CONDITION_TYPES = [
  { id: 'always', label: 'Always (no condition)', description: 'Execute action for every contact' },
  { id: 'field_equals', label: 'Field equals value', description: 'Check if a contact field equals a specific value' },
  { id: 'tag_exists', label: 'Has tag', description: 'Check if contact has a specific tag' },
];

const TRIGGER_LABELS = {
  contact_added_to_list: 'Contact added to "All Subscribers"',
  tag_applied: 'Tag "Inactive-90d" applied',
  campaign_link_clicked: '"Book a Demo" link clicked in campaign',
  date_field: 'Date field "trial_expiry" → 3 days before',
};

const ACTION_LABELS = {
  send_email_campaign: 'Send "Onboarding Welcome" email',
  send_whatsapp_campaign: 'Send "Demo Follow-up" WhatsApp template',
  add_to_list: 'Add to Re-engagement campaign list',
};

const WORKFLOW_ICONS = {
  contact_added_to_list: '🎉',
  tag_applied: '🔄',
  campaign_link_clicked: '💬',
  date_field: '⏸️',
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

// Modal Component (Popup)
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Trigger Configuration Component
const TriggerConfig = ({ trigger, onUpdate }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Trigger</label>
      <div className="space-y-2">
        {TRIGGER_TYPES.map(type => (
          <label key={type.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="radio"
              name="triggerType"
              value={type.id}
              checked={trigger.type === type.id}
              onChange={() => onUpdate({ type: type.id, config: {} })}
              className="mt-0.5"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">{type.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{type.description}</p>
            </div>
          </label>
        ))}
      </div>
      
      {trigger.type === 'contact_added_to_list' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">List Name</label>
          <input
            type="text"
            value={trigger.config.listName || ''}
            onChange={(e) => onUpdate({ ...trigger, config: { listName: e.target.value } })}
            placeholder="e.g., All Subscribers, Newsletter List"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      )}
      
      {trigger.type === 'tag_applied' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tag Name</label>
          <input
            type="text"
            value={trigger.config.tag || ''}
            onChange={(e) => onUpdate({ ...trigger, config: { tag: e.target.value } })}
            placeholder="e.g., VIP Customer, Inactive-90d"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      )}
      
      {trigger.type === 'campaign_link_clicked' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Link Text/URL</label>
          <input
            type="text"
            value={trigger.config.link || ''}
            onChange={(e) => onUpdate({ ...trigger, config: { link: e.target.value } })}
            placeholder="e.g., Book a Demo, Buy Now"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      )}
    </div>
  );
};

// Condition Configuration Component
const ConditionConfig = ({ condition, onUpdate }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Add a condition (optional)</label>
      <div className="space-y-2">
        {CONDITION_TYPES.map(type => (
          <label key={type.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="radio"
              name="conditionType"
              value={type.id}
              checked={condition.type === type.id}
              onChange={() => onUpdate({ type: type.id, config: {} })}
              className="mt-0.5"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">{type.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{type.description}</p>
            </div>
          </label>
        ))}
      </div>
      
      {condition.type === 'field_equals' && (
        <div className="border-t border-slate-100 pt-4 mt-2 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Field Name</label>
            <input
              type="text"
              value={condition.config?.field || ''}
              onChange={(e) => onUpdate({ ...condition, config: { ...condition.config, field: e.target.value } })}
              placeholder="e.g., first_name, country"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Value</label>
            <input
              type="text"
              value={condition.config?.value || ''}
              onChange={(e) => onUpdate({ ...condition, config: { ...condition.config, value: e.target.value } })}
              placeholder="e.g., John, USA"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
            />
          </div>
        </div>
      )}
      
      {condition.type === 'tag_exists' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tag Name</label>
          <input
            type="text"
            value={condition.config?.tag || ''}
            onChange={(e) => onUpdate({ ...condition, config: { tag: e.target.value } })}
            placeholder="e.g., VIP, Premium"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
          />
        </div>
      )}
    </div>
  );
};

// Action Configuration Component
const ActionConfig = ({ action, onUpdate }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Action</label>
      <div className="space-y-2">
        {ACTION_TYPES.map(type => (
          <label key={type.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="radio"
              name="actionType"
              value={type.id}
              checked={action.type === type.id}
              onChange={() => onUpdate({ type: type.id, config: {} })}
              className="mt-0.5"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">{type.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{type.description}</p>
            </div>
          </label>
        ))}
      </div>
      
      {action.type === 'send_email_campaign' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Name</label>
          <input
            type="text"
            value={action.config.campaign || ''}
            onChange={(e) => onUpdate({ ...action, config: { campaign: e.target.value } })}
            placeholder="e.g., Onboarding Welcome, Abandoned Cart"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
          />
        </div>
      )}
      
      {action.type === 'send_whatsapp_campaign' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp Template</label>
          <input
            type="text"
            value={action.config.template || ''}
            onChange={(e) => onUpdate({ ...action, config: { template: e.target.value } })}
            placeholder="e.g., Demo Follow-up, Order Confirmation"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
          />
        </div>
      )}
      
      {action.type === 'add_to_list' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">List Name</label>
          <input
            type="text"
            value={action.config.listName || ''}
            onChange={(e) => onUpdate({ ...action, config: { listName: e.target.value } })}
            placeholder="e.g., VIP List, Newsletter"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
          />
        </div>
      )}
    </div>
  );
};

// Workflow Card Component
const WorkflowCard = ({ workflow, onToggle }) => {
  const [isToggling, setIsToggling] = useState(false);
  const isActive = workflow.status === 'active';
  const icon = WORKFLOW_ICONS[workflow.trigger.type] || '⚡';

  const handleToggle = async (checked) => {
    setIsToggling(true);
    await onToggle(workflow.id, checked);
    setIsToggling(false);
  };

  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <p className="text-[15px] font-bold text-slate-900">{workflow.workflowName}</p>
          <p className="text-sm text-slate-500 mt-1">
            <span className="font-medium">Trigger:</span> {TRIGGER_LABELS[workflow.trigger.type]}{" "}
            <span className="font-medium ml-3">Action:</span> {ACTION_LABELS[workflow.action.type]}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          {workflow.lastRunAt && (
            <p className="text-xs text-slate-400">Last run: {formatLastRun(workflow.lastRunAt)}</p>
          )}
          {workflow.totalTriggered > 0 && (
            <p className={`text-sm font-semibold ${workflow.totalTriggered > 1000 ? 'text-orange-500' : 'text-emerald-600'}`}>
              {workflow.totalTriggered.toLocaleString()} contacts
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isActive ? 'active' : 'paused'}>
            {isActive ? 'Active' : 'Paused'}
          </Badge>
          <Toggle checked={isActive} onChange={handleToggle} disabled={isToggling} />
        </div>
      </div>
    </div>
  );
};

// Main AutomationPage Component
export default function AutomationPage() {
  const [workflows, setWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    name: '',
    trigger: { type: 'contact_added_to_list', config: {} },
    condition: { type: 'always', config: {} },
    action: { type: 'send_email_campaign', config: {} },
  });

  useEffect(() => {
    const fetchWorkflows = async () => {
      await delay(600);
      setWorkflows(MOCK_WORKFLOWS);
      setIsLoading(false);
    };
    fetchWorkflows();
  }, []);

  const handleToggleWorkflow = async (workflowId, shouldActivate) => {
    setWorkflows((prev) =>
      prev.map((wf) =>
        wf.id === workflowId ? { ...wf, status: shouldActivate ? 'active' : 'paused' } : wf
      )
    );
    await delay(500);
  };

  const handleCreateWorkflow = async () => {
    if (!workflowData.name.trim()) {
      alert('Please enter a workflow name');
      return;
    }

    setIsCreating(true);
    await delay(800);

    const newWorkflow = {
      id: `wf_${Date.now()}`,
      workflowName: workflowData.name.trim(),
      status: 'draft',
      trigger: workflowData.trigger,
      action: workflowData.action,
      lastRunAt: null,
      totalTriggered: 0,
    };

    setWorkflows(prev => [newWorkflow, ...prev]);
    setIsCreating(false);
    setIsModalOpen(false);
    setWorkflowData({
      name: '',
      trigger: { type: 'contact_added_to_list', config: {} },
      condition: { type: 'always', config: {} },
      action: { type: 'send_email_campaign', config: {} },
    });
    setCurrentStep(1);
    alert('Workflow created successfully!');
  };

  const openCreateModal = () => {
    setWorkflowData({
      name: '',
      trigger: { type: 'contact_added_to_list', config: {} },
      condition: { type: 'always', config: {} },
      action: { type: 'send_email_campaign', config: {} },
    });
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setWorkflowData({
      name: '',
      trigger: { type: 'contact_added_to_list', config: {} },
      condition: { type: 'always', config: {} },
      action: { type: 'send_email_campaign', config: {} },
    });
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Automation Workflows</h1>
            <p className="text-sm text-slate-400 mt-1">V1: trigger → optional condition → single action</p>
          </div>
          <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />} onClick={openCreateModal}>
            New Workflow
          </Button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3 text-sm text-blue-700">
          <Lightbulb className="h-5 w-5 shrink-0" />
          <p>V1 automation supports one trigger → one optional condition → one action. Multi-step sequences and branching workflows are coming in V2.</p>
        </div>

        {/* Workflows List */}
        <div className="space-y-3">
          {workflows.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-sm text-slate-400">No workflows yet. Create your first automation!</p>
            </div>
          ) : (
            workflows.map((wf) => (
              <WorkflowCard key={wf.id} workflow={wf} onToggle={handleToggleWorkflow} />
            ))
          )}
        </div>
      </div>

      {/* Create Workflow Modal (Popup) */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create New Workflow">
        <div className="space-y-6">
          {/* Workflow Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Workflow Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={workflowData.name}
              onChange={(e) => setWorkflowData({ ...workflowData, name: e.target.value })}
              placeholder="e.g., Welcome New Subscriber, Abandoned Cart Reminder"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                1
              </div>
              <span className={`text-sm ${currentStep >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>Trigger</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                2
              </div>
              <span className={`text-sm ${currentStep >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>Condition</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                3
              </div>
              <span className={`text-sm ${currentStep >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>Action</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 my-4"></div>

          {/* Step 1: Trigger */}
          {currentStep === 1 && (
            <TriggerConfig
              trigger={workflowData.trigger}
              onUpdate={(trigger) => setWorkflowData({ ...workflowData, trigger })}
            />
          )}

          {/* Step 2: Condition */}
          {currentStep === 2 && (
            <ConditionConfig
              condition={workflowData.condition}
              onUpdate={(condition) => setWorkflowData({ ...workflowData, condition })}
            />
          )}

          {/* Step 3: Action */}
          {currentStep === 3 && (
            <ActionConfig
              action={workflowData.action}
              onUpdate={(action) => setWorkflowData({ ...workflowData, action })}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-slate-100">
            <div>
              {currentStep > 1 && (
                <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              {currentStep < 3 ? (
                <Button variant="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                  Continue
                </Button>
              ) : (
                <Button variant="primary" onClick={handleCreateWorkflow} loading={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Workflow'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}