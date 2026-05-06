import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

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

const Button = ({ children, variant = 'primary', onClick, disabled, loading }) => {
  const baseClass = "inline-flex items-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm focus:ring-indigo-500"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  return (
    <button className={`${baseClass} ${variantClass} px-4 py-2 text-sm`} onClick={onClick} disabled={disabled || loading}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {children}
    </button>
  );
};

const CreateRuleModal = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [ruleData, setRuleData] = useState({
    name: '',
    trigger: { type: 'contact_added_to_list', config: {} },
    condition: { type: 'always', config: {} },
    action: { type: 'send_email_campaign', config: {} },
  });

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!ruleData.name.trim()) {
      alert('Please enter a rule name');
      return;
    }
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    onSave(ruleData);
    setIsCreating(false);
    onClose();
    setRuleData({
      name: '',
      trigger: { type: 'contact_added_to_list', config: {} },
      condition: { type: 'always', config: {} },
      action: { type: 'send_email_campaign', config: {} },
    });
    setCurrentStep(1);
  };

  const TriggerConfig = ({ trigger, onUpdate }) => (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Trigger</label>
      <div className="space-y-2">
        {TRIGGER_TYPES.map(type => (
          <label key={type.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input type="radio" name="triggerType" value={type.id} checked={trigger.type === type.id} onChange={() => onUpdate({ type: type.id, config: {} })} className="mt-0.5" />
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
          <input type="text" value={trigger.config.listName || ''} onChange={(e) => onUpdate({ ...trigger, config: { listName: e.target.value } })} placeholder="e.g., All Subscribers" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        </div>
      )}
      {trigger.type === 'tag_applied' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tag Name</label>
          <input type="text" value={trigger.config.tag || ''} onChange={(e) => onUpdate({ ...trigger, config: { tag: e.target.value } })} placeholder="e.g., VIP Customer" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" />
        </div>
      )}
      {trigger.type === 'campaign_link_clicked' && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Link Text/URL</label>
          <input type="text" value={trigger.config.link || ''} onChange={(e) => onUpdate({ ...trigger, config: { link: e.target.value } })} placeholder="e.g., Book a Demo" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" />
        </div>
      )}
    </div>
  );

  const ConditionConfig = ({ condition, onUpdate }) => (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Add a condition (optional)</label>
      <div className="space-y-2">
        {CONDITION_TYPES.map(type => (
          <label key={type.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input type="radio" name="conditionType" value={type.id} checked={condition.type === type.id} onChange={() => onUpdate({ type: type.id, config: {} })} className="mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">{type.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{type.description}</p>
            </div>
          </label>
        ))}
      </div>
      {condition.type === 'field_equals' && (
        <div className="border-t border-slate-100 pt-4 mt-2 space-y-3">
          <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Field Name</label><input type="text" value={condition.config?.field || ''} onChange={(e) => onUpdate({ ...condition, config: { ...condition.config, field: e.target.value } })} placeholder="e.g., country" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" /></div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Value</label><input type="text" value={condition.config?.value || ''} onChange={(e) => onUpdate({ ...condition, config: { ...condition.config, value: e.target.value } })} placeholder="e.g., USA" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" /></div>
        </div>
      )}
      {condition.type === 'tag_exists' && (
        <div className="border-t border-slate-100 pt-4 mt-2"><label className="block text-sm font-semibold text-slate-700 mb-1.5">Tag Name</label><input type="text" value={condition.config?.tag || ''} onChange={(e) => onUpdate({ ...condition, config: { tag: e.target.value } })} placeholder="e.g., VIP" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" /></div>
      )}
    </div>
  );

  const ActionConfig = ({ action, onUpdate }) => (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Action</label>
      <div className="space-y-2">
        {ACTION_TYPES.map(type => (
          <label key={type.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input type="radio" name="actionType" value={type.id} checked={action.type === type.id} onChange={() => onUpdate({ type: type.id, config: {} })} className="mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">{type.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{type.description}</p>
            </div>
          </label>
        ))}
      </div>
      {action.type === 'send_email_campaign' && (
        <div className="border-t border-slate-100 pt-4 mt-2"><label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Name</label><input type="text" value={action.config.campaign || ''} onChange={(e) => onUpdate({ ...action, config: { campaign: e.target.value } })} placeholder="e.g., Welcome Email" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" /></div>
      )}
      {action.type === 'send_whatsapp_campaign' && (
        <div className="border-t border-slate-100 pt-4 mt-2"><label className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp Template</label><input type="text" value={action.config.template || ''} onChange={(e) => onUpdate({ ...action, config: { template: e.target.value } })} placeholder="e.g., Welcome Template" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" /></div>
      )}
      {action.type === 'add_to_list' && (
        <div className="border-t border-slate-100 pt-4 mt-2"><label className="block text-sm font-semibold text-slate-700 mb-1.5">List Name</label><input type="text" value={action.config.listName || ''} onChange={(e) => onUpdate({ ...action, config: { listName: e.target.value } })} placeholder="e.g., VIP List" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" /></div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Create Automation Rule</h3>
            <p className="text-xs text-slate-400 mt-0.5">Trigger → Condition → Action</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <div className="px-6 py-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rule Name <span className="text-red-500">*</span></label>
            <input type="text" value={ruleData.name} onChange={(e) => setRuleData({ ...ruleData, name: e.target.value })} placeholder="e.g., Welcome New Subscriber" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
              <span className={`text-sm ${currentStep >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>Trigger</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
              <span className={`text-sm ${currentStep >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>Condition</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
              <span className={`text-sm ${currentStep >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>Action</span>
            </div>
          </div>
          <div className="h-px bg-slate-100 my-4"></div>
          {currentStep === 1 && <TriggerConfig trigger={ruleData.trigger} onUpdate={(trigger) => setRuleData({ ...ruleData, trigger })} />}
          {currentStep === 2 && <ConditionConfig condition={ruleData.condition} onUpdate={(condition) => setRuleData({ ...ruleData, condition })} />}
          {currentStep === 3 && <ActionConfig action={ruleData.action} onUpdate={(action) => setRuleData({ ...ruleData, action })} />}
          <div className="flex justify-between pt-4 border-t border-slate-100">
            <div>{currentStep > 1 && <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>}</div>
            <div className="flex gap-3">
              {currentStep < 3 ? <Button variant="primary" onClick={() => setCurrentStep(currentStep + 1)}>Continue</Button> : <Button variant="primary" onClick={handleSave} loading={isCreating}>Create Rule</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRuleModal;