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


// AutomationPage.jsx – with working new workflow modal
import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

// ----------------------------- Mock Data -----------------------------
const MOCK_WORKFLOWS = [
  {
    id: 'wf_1',
    workflowName: 'Welcome New Subscriber',
    status: 'active',
    trigger: { type: 'contact_added_to_list', config: {} },
    action: { type: 'send_email_campaign', config: {}, cooldownHours: 0 },
    lastRunAt: '2026-04-27T10:30:00Z',
    totalTriggered: 342,
  },
  {
    id: 'wf_2',
    workflowName: 'Tag High-Value Customer',
    status: 'paused',
    trigger: { type: 'campaign_link_clicked', config: {} },
    action: { type: 'add_tag', config: {}, cooldownHours: 0 },
    lastRunAt: '2026-04-26T14:15:00Z',
    totalTriggered: 128,
  },
  {
    id: 'wf_3',
    workflowName: 'Birthday Greeting',
    status: 'active',
    trigger: { type: 'date_field', config: {} },
    action: { type: 'send_whatsapp_campaign', config: {}, cooldownHours: 0 },
    lastRunAt: '2026-04-25T09:00:00Z',
    totalTriggered: 87,
  },
  {
    id: 'wf_4',
    workflowName: 'Notify on Unsubscribe',
    status: 'draft',
    trigger: { type: 'campaign_opened', config: {} },
    action: { type: 'notify_team_member', config: {}, cooldownHours: 0 },
    lastRunAt: null,
    totalTriggered: 0,
  },
];

const TRIGGER_LABELS = {
  contact_added_to_list: 'Contact added to list',
  tag_applied: 'Tag applied',
  campaign_opened: 'Campaign opened',
  campaign_link_clicked: 'Link clicked in campaign',
  date_field: 'Date field trigger',
};

const ACTION_LABELS = {
  send_email_campaign: 'Send email campaign',
  send_whatsapp_campaign: 'Send WhatsApp campaign',
  add_tag: 'Add tag',
  remove_tag: 'Remove tag',
  add_to_list: 'Add to list',
  notify_team_member: 'Notify team member',
};

const WORKFLOW_ICONS = {
  contact_added_to_list: '🎉',
  tag_applied: '🏷️',
  campaign_opened: '📧',
  campaign_link_clicked: '🔗',
  date_field: '📅',
};

// Helper to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ----------------------------- Custom UI Components (Tailwind only) -----------------------------
const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

const Button = ({ children, variant = 'primary', leftIcon, onClick, disabled }) => {
  const baseClass = "inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  return (
    <button className={`${baseClass} ${variantClass}`} onClick={onClick} disabled={disabled}>
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

const Badge = ({ children, variant }) => {
  let variantClass = "bg-slate-100 text-slate-700";
  if (variant === 'active') variantClass = "bg-emerald-100 text-emerald-700";
  else if (variant === 'paused') variantClass = "bg-amber-100 text-amber-700";
  else if (variant === 'draft') variantClass = "bg-slate-100 text-slate-500";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClass}`}>
      {children}
    </span>
  );
};

const Toggle = ({ checked, onChange, disabled }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        checked ? 'bg-indigo-600' : 'bg-slate-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

const Alert = ({ children, variant = 'info', className = '' }) => {
  const variantClass = variant === 'info'
    ? "bg-blue-50 border-blue-200 text-blue-800"
    : "bg-red-50 border-red-200 text-red-700";
  return (
    <div className={`rounded-xl border p-4 text-sm ${variantClass} ${className}`}>
      {children}
    </div>
  );
};

const Spinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
);

const EmptyState = ({ title, description, children }) => (
  <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
    <p className="text-lg font-semibold text-slate-800">{title}</p>
    <p className="text-sm text-slate-500 mt-1">{description}</p>
    {children && <div className="mt-4">{children}</div>}
  </div>
);

// PermissionGuard – always shows content
const PermissionGuard = ({ children }) => <>{children}</>;

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// ----------------------------- Workflow Card Component -----------------------------
const WorkflowCard = ({ workflow, onToggle }) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async (newChecked) => {
    setIsToggling(true);
    await onToggle(workflow.id, newChecked);
    setIsToggling(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-md transition-all">
      <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">
        {WORKFLOW_ICONS[workflow.trigger.type] || '⚡'}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-slate-800 mb-1">{workflow.workflowName}</p>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span>Trigger: <strong>{TRIGGER_LABELS[workflow.trigger.type] || workflow.trigger.type}</strong></span>
          <span>Action: <strong>{ACTION_LABELS[workflow.action.type] || workflow.action.type}</strong></span>
        </div>
      </div>

      <div className="text-right text-xs text-slate-400 shrink-0 hidden sm:block">
        {workflow.lastRunAt && <p>Last run: {new Date(workflow.lastRunAt).toLocaleDateString()}</p>}
        {workflow.totalTriggered > 0 && (
          <p className="text-emerald-600 font-semibold">{workflow.totalTriggered.toLocaleString()} triggered</p>
        )}
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <Badge variant={workflow.status}>
          {workflow.status}
        </Badge>
        <PermissionGuard>
          <Toggle
            checked={workflow.status === 'active'}
            onChange={handleToggle}
            disabled={isToggling}
          />
        </PermissionGuard>
      </div>
    </div>
  );
};

// ----------------------------- Main Automation Page -----------------------------
export default function AutomationPage() {
  const [workflows, setWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    triggerType: 'contact_added_to_list',
    actionType: 'send_email_campaign',
  });
  const [formError, setFormError] = useState('');

  // Simulate fetching workflows
  useEffect(() => {
    const fetchWorkflows = async () => {
      await delay(800);
      setWorkflows(MOCK_WORKFLOWS);
      setIsLoading(false);
    };
    fetchWorkflows();
  }, []);

  // Simulate activate/pause API call
  const handleToggleWorkflow = async (workflowId, shouldActivate) => {
    const originalWorkflows = [...workflows];
    setWorkflows((prev) =>
      prev.map((wf) =>
        wf.id === workflowId
          ? { ...wf, status: shouldActivate ? 'active' : 'paused' }
          : wf
      )
    );
    try {
      await delay(500);
      // In a real app, you would refetch or handle success
    } catch (error) {
      setWorkflows(originalWorkflows);
      alert('Failed to update workflow status');
    }
  };

  // Create new workflow
  const handleCreateWorkflow = () => {
    if (!formData.name.trim()) {
      setFormError('Workflow name is required');
      return;
    }
    setFormError('');

    const newWorkflow = {
      id: `wf_${Date.now()}`,
      workflowName: formData.name.trim(),
      status: 'draft',
      trigger: { type: formData.triggerType, config: {} },
      action: { type: formData.actionType, config: {}, cooldownHours: 0 },
      lastRunAt: null,
      totalTriggered: 0,
    };

    console.log('New workflow created:', newWorkflow);
    // Add to the list (mock – in real app, call API)
    setWorkflows(prev => [newWorkflow, ...prev]);
    // Reset form and close modal
    setFormData({ name: '', triggerType: 'contact_added_to_list', actionType: 'send_email_campaign' });
    setIsModalOpen(false);
  };

  const openModal = () => {
    setFormData({ name: '', triggerType: 'contact_added_to_list', actionType: 'send_email_campaign' });
    setFormError('');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Automation Workflows"
          description="Trigger-based message automation"
          action={
            <PermissionGuard>
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />} onClick={openModal}>
                New Workflow
              </Button>
            </PermissionGuard>
          }
        />

        <Alert variant="info" className="mb-6">
          <strong>V1 Scope:</strong> WYNReach V1 automation supports one trigger → one optional condition → one action.
          Multi-step sequences and branching workflows are coming in V2.
        </Alert>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : workflows.length === 0 ? (
          <EmptyState
            title="No workflows yet"
            description="Create automation workflows to trigger messages based on contact actions."
          >
            <Button variant="primary" onClick={openModal}>
              Create First Workflow
            </Button>
          </EmptyState>
        ) : (
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                onToggle={handleToggleWorkflow}
              />
            ))}
          </div>
        )}
      </div>

      {/* New Workflow Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Workflow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Workflow Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Welcome Email, Abandoned Cart Reminder"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Trigger
            </label>
            <select
              value={formData.triggerType}
              onChange={(e) => setFormData(prev => ({ ...prev, triggerType: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {Object.entries(TRIGGER_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Action
            </label>
            <select
              value={formData.actionType}
              onChange={(e) => setFormData(prev => ({ ...prev, actionType: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {Object.entries(ACTION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateWorkflow}>
              Create Workflow
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}