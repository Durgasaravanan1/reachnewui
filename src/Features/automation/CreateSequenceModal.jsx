import { useState } from 'react';
import { X, GitBranch, Plus, Trash2, Clock, MessageSquare, Mail, ChevronRight } from 'lucide-react';

const Button = ({ children, variant = 'primary', leftIcon, onClick, size = 'sm' }) => {
  const baseClass = "inline-flex items-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
  const sizeClass = size === 'sm' ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass}`} onClick={onClick}>
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

const CreateSequenceModal = ({ isOpen, onClose, onSave }) => {
  const [sequenceData, setSequenceData] = useState({
    name: '',
    description: '',
    steps: [{ id: Date.now(), delay: '0', type: 'whatsapp', content: '' }],
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!sequenceData.name.trim()) {
      alert('Please enter a sequence name');
      return;
    }
    if (sequenceData.steps.some(step => !step.content.trim())) {
      alert('Please fill in all step messages');
      return;
    }
    onSave(sequenceData);
    onClose();
  };

  const addStep = () => {
    setSequenceData({
      ...sequenceData,
      steps: [...sequenceData.steps, { id: Date.now(), delay: '24', type: 'whatsapp', content: '' }],
    });
  };

  const removeStep = (id) => {
    if (sequenceData.steps.length > 1) {
      setSequenceData({
        ...sequenceData,
        steps: sequenceData.steps.filter(step => step.id !== id),
      });
    }
  };

  const updateStep = (id, field, value) => {
    setSequenceData({
      ...sequenceData,
      steps: sequenceData.steps.map(step => step.id === id ? { ...step, [field]: value } : step),
    });
  };

  const getTotalDuration = () => {
    let total = 0;
    sequenceData.steps.forEach((step, idx) => {
      if (idx > 0) total += parseInt(step.delay) || 0;
    });
    return total;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <GitBranch className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Create Follow-up Sequence</h3>
              <p className="text-xs text-slate-400">Multi-step automated message sequences</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sequence Name <span className="text-red-500">*</span></label>
            <input type="text" value={sequenceData.name} onChange={(e) => setSequenceData({ ...sequenceData, name: e.target.value })} placeholder="e.g., Welcome Series" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea value={sequenceData.description} onChange={(e) => setSequenceData({ ...sequenceData, description: e.target.value })} placeholder="Brief description of this sequence..." rows={2} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm resize-none" />
          </div>
          
          <div className="border-t border-slate-100 pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sequence Steps</h3>
                <p className="text-xs text-slate-400 mt-0.5">Define the order and timing of your messages</p>
              </div>
              <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={addStep}>
                Add Step
              </Button>
            </div>
            
            <div className="space-y-4">
              {sequenceData.steps.map((step, index) => (
                <div key={step.id} className="bg-slate-50 rounded-xl p-5 space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Step {index + 1}</h4>
                    </div>
                    {sequenceData.steps.length > 1 && (
                      <button onClick={() => removeStep(step.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Wait Time (hours)
                      </label>
                      <input type="number" value={step.delay} onChange={(e) => updateStep(step.id, 'delay', e.target.value)} min="0" max="720" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" disabled={index === 0} />
                      {index === 0 && <p className="text-xs text-slate-400 mt-1">First step sends immediately</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Channel</label>
                      <select value={step.type} onChange={(e) => updateStep(step.id, 'type', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {step.type === 'whatsapp' ? <><MessageSquare className="h-3 w-3 inline mr-1" />Message Content</> : <><Mail className="h-3 w-3 inline mr-1" />Email Content</>}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea value={step.content} onChange={(e) => updateStep(step.id, 'content', e.target.value)} placeholder={`Enter your ${step.type === 'whatsapp' ? 'WhatsApp' : 'email'} message here...`} rows={3} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
                    <p className="mt-1 text-xs text-slate-400">Tip: Use {'{{contact_name}}'} to personalize the message</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-5">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-indigo-600" />
              Sequence Overview
            </h4>
            <div className="space-y-2">
              {sequenceData.steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>
                    {index === 0 ? 'Immediately' : `After ${step.delay} hour${parseInt(step.delay) !== 1 ? 's' : ''}`}
                  </span>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                  <span>Send {step.type === 'whatsapp' ? 'WhatsApp' : 'Email'}</span>
                </div>
              ))}
            </div>
            {sequenceData.steps.length > 1 && (
              <div className="mt-3 pt-3 border-t border-indigo-100 text-xs text-slate-500">
                Total duration: {getTotalDuration()} hours ({Math.floor(getTotalDuration() / 24)} days)
              </div>
            )}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white flex flex-col sm:flex-row items-center justify-end gap-3 px-6 py-5 border-t border-slate-100">
          <button onClick={onClose} className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium text-sm">
            Cancel
          </button>
          <button onClick={handleSave} className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium text-sm shadow-sm">
            Create Sequence
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSequenceModal;