// // WizardShell.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Step5Review from './Step5Review';
// // ===================== Simple Date Helpers =====================
// const formatDateTime = (isoString) => {
//   if (!isoString) return '—';
//   const date = new Date(isoString);
//   return date.toLocaleString();
// };

// const addDays = (date, days) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // ===================== Mock Router =====================
// const useNavigate = () => {
//   return (to) => {
//     console.log(`[Mock Router] Navigate to: ${to}`);
//     window.location.hash = to; // optional: update hash
//   };
// };

// const ROUTES = {
//   CAMPAIGNS: '/campaigns',
//   DASHBOARD: '/dashboard',
// };

// // ===================== Wizard Store (Context) =====================
// const WizardContext = createContext(null);

// export const useWizardStore = () => {
//   const context = useContext(WizardContext);
//   if (!context) throw new Error('useWizardStore must be used within WizardProvider');
//   return context;
// };

// const WizardProvider = ({ children }) => {
//   const [state, setState] = useState({
//     // Step 1
//     campaignName: '',
//     channel: 'email',
//     goalLabel: null,
//     // Step 2
//     audienceListIds: [],
//     excludeListIds: [],
//     estimatedRecipients: 0,
//     suppressedCount: 0,
//     // Step 3
//     subjectLine: '',
//     previewText: '',
//     templateId: '',
//     senderIdentityId: '',
//     // Step 4
//     sendMode: 'immediate',
//     scheduledAt: null,
//     timezone: 'Asia/Kolkata',
//     // Step 5 (additional)
//     createdCampaignId: null,
//   });
//   const [step, setStep] = useState(1);

//   const setStep1 = ({ campaignName, channel, goalLabel }) => {
//     setState((prev) => ({ ...prev, campaignName, channel, goalLabel }));
//   };
//   const setStep2 = ({ audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }) => {
//     setState((prev) => ({ ...prev, audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }));
//   };
//   const setStep3 = ({ subjectLine, previewText, templateId, senderIdentityId }) => {
//     setState((prev) => ({ ...prev, subjectLine, previewText, templateId, senderIdentityId }));
//   };
//   const setStep4 = ({ sendMode, scheduledAt, timezone }) => {
//     setState((prev) => ({ ...prev, sendMode, scheduledAt, timezone }));
//   };
//   const setCreatedCampaignId = (id) => {
//     setState((prev) => ({ ...prev, createdCampaignId: id }));
//   };
//   const reset = () => {
//     setState({
//       campaignName: '',
//       channel: 'email',
//       goalLabel: null,
//       audienceListIds: [],
//       excludeListIds: [],
//       estimatedRecipients: 0,
//       suppressedCount: 0,
//       subjectLine: '',
//       previewText: '',
//       templateId: '',
//       senderIdentityId: '',
//       sendMode: 'immediate',
//       scheduledAt: null,
//       timezone: 'Asia/Kolkata',
//       createdCampaignId: null,
//     });
//     setStep(1);
//   };
//   const nextStep = () => setStep((s) => Math.min(6, s + 1));
//   const prevStep = () => setStep((s) => Math.max(1, s - 1));

//   return (
//     <WizardContext.Provider
//       value={{
//         ...state,
//         step,
//         setStep1,
//         setStep2,
//         setStep3,
//         setStep4,
//         setCreatedCampaignId,
//         reset,
//         nextStep,
//         prevStep,
//       }}
//     >
//       {children}
//     </WizardContext.Provider>
//   );
// };

// // ===================== UI Components (Tailwind only) =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// const XIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );

// const CheckIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );

// const Button = ({ children, variant, onClick, disabled, loading, type = 'button', fullWidth }) => {
//   const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variantClass = variant === 'primary'
//     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
//     : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
//   const sizeClass = "px-4 py-2 text-sm";
//   const widthClass = fullWidth ? "w-full" : "";
//   return (
//     <button type={type} onClick={onClick} disabled={disabled || loading} className={`${base} ${variantClass} ${sizeClass} ${widthClass}`}>
//       {loading && <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
//       {children}
//     </button>
//   );
// };

// const Input = ({ label, type = 'text', placeholder, error, optional, hint, min, ...props }) => (
//   <div className="space-y-1">
//     {label && <label className="block text-sm font-semibold text-slate-700">{label} {optional && <span className="text-slate-400 text-xs">(optional)</span>}</label>}
//     <input type={type} placeholder={placeholder} min={min} {...props} className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${error ? 'border-red-300' : 'border-slate-200'}`} />
//     {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Select = ({ label, options, error, ...props }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <select {...props} className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${error ? 'border-red-300' : 'border-slate-200'}`}>
//       <option value="">{props.placeholder || "Select..."}</option>
//       {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//     </select>
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Alert = ({ children, variant = 'info', title }) => {
//   const variantClass = variant === 'success' ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-blue-50 border-blue-200 text-blue-800";
//   return <div className={`rounded-xl border p-4 text-sm ${variantClass}`}>{title && <p className="font-semibold mb-1">{title}</p>}{children}</div>;
// };

// const Badge = ({ children, variant }) => {
//   const variantClass = variant === 'active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700";
//   return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClass}`}>{children}</span>;
// };

// // ===================== Progress Bar Component =====================
// const WizardProgressBar = ({ current }) => {
//   const steps = [
//     { num: 1, label: 'Setup' },
//     { num: 2, label: 'Audience' },
//     { num: 3, label: 'Content' },
//     { num: 4, label: 'Schedule' },
//     { num: 5, label: 'Review' },
//     { num: 6, label: 'Done' },
//   ];
//   return (
//     <div className="flex items-center justify-center gap-0">
//       {steps.map((step, i) => {
//         const done = step.num < current;
//         const active = step.num === current;
//         return (
//           <div key={step.num} className="flex items-center">
//             <div className="flex flex-col items-center gap-1.5">
//               <div className={cn('h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
//                 done && 'bg-emerald-500 border-emerald-500 text-white',
//                 active && 'bg-indigo-600 border-indigo-600 text-white',
//                 !done && !active && 'bg-white border-slate-200 text-slate-400')}>
//                 {done ? <CheckIcon /> : step.num}
//               </div>
//               <span className={cn('text-[10px] font-semibold hidden sm:block',
//                 active && 'text-indigo-600', done && 'text-emerald-600', !done && !active && 'text-slate-400')}>
//                 {step.label}
//               </span>
//             </div>
//             {i < steps.length - 1 && <div className={cn('w-12 h-0.5 mx-1 mb-4', done ? 'bg-emerald-400' : 'bg-slate-200')} />}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ===================== Step Components (inlined for completeness) =====================
// // Step1 – Setup
// const Step1Setup = () => {
//   const { campaignName, channel, goalLabel, setStep1, nextStep } = useWizardStore();
//   const [formData, setFormData] = useState({ name: campaignName || '', channel: channel || 'email', goal: goalLabel || '' });
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name.trim()) return setErrors({ name: 'Campaign name required' });
//     if (!formData.channel) return setErrors({ channel: 'Select a channel' });
//     setStep1({ campaignName: formData.name, channel: formData.channel, goalLabel: formData.goal || null });
//     nextStep();
//   };
//   const goalOptions = [
//     { label: 'Promotional', value: 'promotional' },
//     { label: 'Transactional', value: 'transactional' },
//     { label: 'Re-engagement', value: 're_engagement' },
//     { label: 'Event', value: 'event' },
//     { label: 'Announcement', value: 'announcement' },
//   ];
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//       <div className="px-6 py-4 border-b"><h2 className="text-lg font-bold">Campaign Setup</h2><p className="text-sm text-slate-500">Name and channel</p></div>
//       <form onSubmit={handleSubmit}>
//         <div className="px-6 py-6 space-y-5">
//           <Input label="Campaign Name" placeholder="e.g. Summer Sale" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} error={errors.name} />
//           <div><p className="text-sm font-semibold mb-2">Channel</p>
//             <div className="grid grid-cols-2 gap-3">
//               {['email','whatsapp'].map(ch => (
//                 <button type="button" key={ch} onClick={() => setFormData({...formData, channel: ch})} className={cn('relative rounded-xl border-2 p-4 text-center transition-all', formData.channel === ch ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200')}>
//                   <span className="text-2xl block mb-1">{ch === 'email' ? '✉️' : '💬'}</span>
//                   <p className="font-semibold text-sm capitalize">{ch}</p>
//                   {formData.channel === ch && <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">✓</span>}
//                 </button>
//               ))}
//             </div>
//             {errors.channel && <p className="text-xs text-red-500 mt-1">{errors.channel}</p>}
//           </div>
//           <Select label="Campaign Goal" options={goalOptions} value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} placeholder="Select goal (optional)" optional />
//         </div>
//         <div className="px-6 py-4 bg-slate-50 border-t flex justify-end"><Button type="submit" variant="primary">Continue → Audience</Button></div>
//       </form>
//     </div>
//   );
// };

// // Step2 – Audience (simplified mock)
// const Step2Audience = () => {
//   const { setStep2, nextStep, prevStep } = useWizardStore();
//   const [selected, setSelected] = useState([]);
//   const mockLists = [
//     { id: 'list1', name: 'Newsletter Subscribers', count: 12500 },
//     { id: 'list2', name: 'Premium Customers', count: 3400 },
//   ];
//   const total = mockLists.filter(l => selected.includes(l.id)).reduce((s, l) => s + l.count, 0);
//   const handleContinue = () => {
//     setStep2({ audienceListIds: selected, excludeListIds: [], estimatedRecipients: total, suppressedCount: Math.round(total * 0.07) });
//     nextStep();
//   };
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
//       <div className="px-6 py-4 border-b"><h2 className="text-lg font-bold">Select Audience</h2></div>
//       <div className="px-6 py-6 space-y-3">
//         {mockLists.map(list => (
//           <div key={list.id} onClick={() => setSelected(prev => prev.includes(list.id) ? prev.filter(id => id !== list.id) : [...prev, list.id])} className={cn('cursor-pointer rounded-xl border-2 p-4 transition-all', selected.includes(list.id) ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200')}>
//             <div className="flex justify-between"><span className="font-semibold">{list.name}</span><Badge>{list.count.toLocaleString()}</Badge></div>
//           </div>
//         ))}
//         <div className="mt-4 p-4 bg-indigo-50 rounded-xl"><p className="text-2xl font-bold text-indigo-700">{total.toLocaleString()}</p><p className="text-sm">Estimated recipients</p></div>
//       </div>
//       <div className="px-6 py-4 bg-slate-50 border-t flex justify-between"><Button variant="secondary" onClick={prevStep}>Back</Button><Button variant="primary" onClick={handleContinue} disabled={!selected.length}>Continue → Content</Button></div>
//     </div>
//   );
// };

// // Step3 – Content (simplified)
// const Step3Content = () => {
//   const { channel, setStep3, nextStep, prevStep } = useWizardStore();
//   const [subject, setSubject] = useState('');
//   const [template, setTemplate] = useState('');
//   const handleSubmit = (e) => { e.preventDefault(); setStep3({ subjectLine: subject, previewText: '', templateId: template, senderIdentityId: 'default' }); nextStep(); };
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
//       <div className="px-6 py-4 border-b"><h2 className="text-lg font-bold">Campaign Content</h2></div>
//       <form onSubmit={handleSubmit}>
//         <div className="px-6 py-6 space-y-4">
//           {channel === 'email' && <Input label="Subject Line" value={subject} onChange={e => setSubject(e.target.value)} required />}
//           <div><p className="text-sm font-semibold mb-2">Template</p><div className="grid grid-cols-2 gap-2">{['Modern','Simple','Blank'].map(t => (<div key={t} onClick={() => setTemplate(t)} className={cn('border-2 rounded-xl p-3 text-center cursor-pointer', template === t ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200')}>{t}</div>))}</div></div>
//         </div>
//         <div className="px-6 py-4 bg-slate-50 border-t flex justify-between"><Button variant="secondary" type="button" onClick={prevStep}>Back</Button><Button variant="primary" type="submit">Continue → Schedule</Button></div>
//       </form>
//     </div>
//   );
// };

// // Step4 – Schedule (simplified)
// const Step4Schedule = () => {
//   const { setStep4, nextStep, prevStep } = useWizardStore();
//   const [mode, setMode] = useState('immediate');
//   const [date, setDate] = useState(formatDate(addDays(new Date(), 1)));
//   const [time, setTime] = useState('09:00');
//   const handleSubmit = (e) => { e.preventDefault(); setStep4({ sendMode: mode, scheduledAt: mode === 'scheduled' ? `${date}T${time}:00` : null, timezone: 'Asia/Kolkata' }); nextStep(); };
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
//       <div className="px-6 py-4 border-b"><h2 className="text-lg font-bold">Schedule Campaign</h2></div>
//       <form onSubmit={handleSubmit}>
//         <div className="px-6 py-6 space-y-4">
//           <div className="space-y-2">
//             {['immediate','scheduled'].map(opt => (<label key={opt} className={cn('flex gap-3 rounded-xl border-2 p-4 cursor-pointer', mode === opt ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200')}><input type="radio" name="mode" value={opt} checked={mode === opt} onChange={() => setMode(opt)} className="accent-indigo-600" /><div><p className="font-semibold">{opt === 'immediate' ? 'Send immediately' : 'Schedule for later'}</p></div></label>))}
//           </div>
//           {mode === 'scheduled' && <div className="grid grid-cols-2 gap-4"><Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} /><Input label="Time" type="time" value={time} onChange={e => setTime(e.target.value)} /></div>}
//           <Alert>Best practice: Send on Tuesdays/Thursdays.</Alert>
//         </div>
//         <div className="px-6 py-4 bg-slate-50 border-t flex justify-between"><Button variant="secondary" type="button" onClick={prevStep}>Back</Button><Button variant="primary" type="submit">Continue → Review</Button></div>
//       </form>
//     </div>
//   );
// };

// // Step5 – Review (simplified)
// // const Step5Review = () => {
// //   const store = useWizardStore();
// //   const [loading, setLoading] = useState(false);
// //   const handleConfirm = () => { setLoading(true); setTimeout(() => { store.setCreatedCampaignId('camp_123'); store.nextStep(); setLoading(false); }, 1000); };
// //   const ReviewBlock = ({ label, value }) => (<div className="rounded-xl bg-slate-50 border p-4"><p className="text-[10px] uppercase font-bold text-slate-400">{label}</p><p className="text-sm font-semibold">{value || '—'}</p></div>);
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
//       <div className="px-6 py-4 border-b"><h2 className="text-lg font-bold">Review & Confirm</h2></div>
//       <div className="px-6 py-6"><div className="grid grid-cols-2 gap-3 mb-5"><ReviewBlock label="Campaign" value={store.campaignName} /><ReviewBlock label="Channel" value={store.channel} /><ReviewBlock label="Audience" value={`${store.estimatedRecipients} recipients`} /><ReviewBlock label="Schedule" value={store.sendMode === 'immediate' ? 'Immediate' : formatDateTime(store.scheduledAt)} /></div><Alert variant="success">All checks passed.</Alert></div>
//       <div className="px-6 py-4 bg-slate-50 border-t flex justify-between"><Button variant="secondary" onClick={store.prevStep}>Back</Button><Button variant="primary" onClick={handleConfirm} loading={loading}>Confirm & Schedule</Button></div>
//     </div>
//   );
// };

// // Step6 – Confirm (simplified)
// const Step6Confirm = () => {
//   const navigate = useNavigate();
//   const { campaignName, estimatedRecipients, scheduledAt, sendMode, reset } = useWizardStore();
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 text-center p-8">
//       <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">🎉</div>
//       <h2 className="text-2xl font-bold">Campaign Scheduled!</h2>
//       <p className="text-slate-500 my-4"><strong>{campaignName}</strong> to {estimatedRecipients?.toLocaleString()} recipients{sendMode === 'scheduled' && scheduledAt && <> on {formatDateTime(scheduledAt)}</>}.</p>
//       <div className="flex flex-col sm:flex-row gap-3 justify-center"><Button variant="secondary" onClick={() => { reset(); navigate(ROUTES.CAMPAIGNS); }}>View Campaigns</Button><Button variant="primary" onClick={() => reset()}>+ New Campaign</Button></div>
//       <button onClick={() => { reset(); navigate(ROUTES.DASHBOARD); }} className="mt-4 text-sm text-indigo-600 hover:underline">← Dashboard</button>
//     </div>
//   );
// };

// // ===================== Main Wizard Shell =====================
// const WizardShell = () => {
//   const navigate = useNavigate();
//   const { step, reset } = useWizardStore();

//   const handleDiscard = () => {
//     reset();
//     navigate(ROUTES.CAMPAIGNS);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       {/* Header */}
//       <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
//         <div className="flex items-center gap-3">
//           <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
//             <span className="text-[10px] font-bold text-white">WR</span>
//           </div>
//           <h1 className="text-sm font-bold text-slate-900">New Campaign</h1>
//         </div>
//         {step < 6 && (
//           <button onClick={handleDiscard} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
//             <XIcon /> Discard
//           </button>
//         )}
//       </div>

//       {/* Progress */}
//       <div className="bg-white border-b border-slate-100 px-6 py-4">
//         <WizardProgressBar current={step} />
//       </div>

//       {/* Step content */}
//       <div className="flex-1 flex items-start justify-center p-6">
//         <div className="w-full max-w-2xl">
//           {step === 1 && <Step1Setup />}
//           {step === 2 && <Step2Audience />}
//           {step === 3 && <Step3Content />}
//           {step === 4 && <Step4Schedule />}
//           {step === 5 && <Step5Review />}
//           {step === 6 && <Step6Confirm />}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===================== Export the fully wrapped component =====================
// export default function WizardShellApp() {
//   return (
//     <WizardProvider>
//       <WizardShell />
//     </WizardProvider>
//   );
// }


// WizardShell.jsx – adapted for embedding inside dashboard content (no full-screen)
import React, { createContext, useContext, useState } from 'react';
import Step1Setup from './Step1Setup';
import Step2Audience from './Step2Audience';
import Step3Content from './Step3Content';
import Step4Schedule from './Step4Schedule';
import Step5Review from './Step5Review';
import Step6Confirm from './Step6Confirm';
import WizardProgressBar from './WizardProgressBar';
import { ToastProvider } from './Step5Review';

// ---------- Shared Wizard Context ----------
const WizardContext = createContext(null);

export const useWizardStore = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error('useWizardStore must be used within WizardProvider');
  return context;
};

const WizardProvider = ({ children }) => {
  const [state, setState] = useState({
    campaignName: '',
    channel: null,
    goalLabel: null,
    audienceListIds: [],
    excludeListIds: [],
    estimatedRecipients: 0,
    suppressedCount: 0,
    subjectLine: '',
    previewText: '',
    templateId: '',
    senderIdentityId: '',
    sendMode: 'immediate',
    scheduledAt: null,
    timezone: 'Asia/Kolkata',
    createdCampaignId: null,
  });
  const [step, setStep] = useState(1);

  const setStep1 = ({ campaignName, channel, goalLabel }) =>
    setState(prev => ({ ...prev, campaignName, channel, goalLabel }));
  const setStep2 = ({ audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }) =>
    setState(prev => ({ ...prev, audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }));
  const setStep3 = ({ subjectLine, previewText, templateId, senderIdentityId }) =>
    setState(prev => ({ ...prev, subjectLine, previewText, templateId, senderIdentityId }));
  const setStep4 = ({ sendMode, scheduledAt, timezone }) =>
    setState(prev => ({ ...prev, sendMode, scheduledAt, timezone }));
  const setCreatedCampaignId = (id) => setState(prev => ({ ...prev, createdCampaignId: id }));
  const reset = () => {
    setState({
      campaignName: '', channel: null, goalLabel: null,
      audienceListIds: [], excludeListIds: [], estimatedRecipients: 0, suppressedCount: 0,
      subjectLine: '', previewText: '', templateId: '', senderIdentityId: '',
      sendMode: 'immediate', scheduledAt: null, timezone: 'Asia/Kolkata',
      createdCampaignId: null,
    });
    setStep(1);
  };
  const nextStep = () => setStep(s => Math.min(6, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <WizardContext.Provider value={{ ...state, step, setStep1, setStep2, setStep3, setStep4, setCreatedCampaignId, reset, nextStep, prevStep }}>
      {children}
    </WizardContext.Provider>
  );
};

// ---------- Wizard Shell (no min-h-screen, no positioning) ----------
const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DiscardButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
    <XIcon /> Discard
  </button>
);

const navigate = (to) => {
  console.log(`Navigate to ${to}`);
  // Use React Router navigate if available, otherwise fallback
  if (typeof window !== 'undefined' && window.location) {
    window.location.hash = to;
  }
};

const ROUTES = { CAMPAIGNS: '/campaigns' };

const WizardShell = () => {
  const { step, reset } = useWizardStore();
  const handleDiscard = () => { reset(); navigate(ROUTES.CAMPAIGNS); };
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Header inside wizard (optional – you can remove if your outer layout already has a title) */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">New Campaign</h1>
          <p className="text-sm text-slate-500">Create a new email or WhatsApp campaign</p>
        </div>
        {step < 6 && <DiscardButton onClick={handleDiscard} />}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <WizardProgressBar current={step} />
      </div>

      {/* Step content – overflow visible to allow dropdowns */}
      <div className="overflow-visible">
        <div className="overflow-visible">
          {step === 1 && <Step1Setup />}
          {step === 2 && <Step2Audience />}
          {step === 3 && <Step3Content />}
          {step === 4 && <Step4Schedule />}
          {step === 5 && <Step5Review />}
          {step === 6 && <Step6Confirm />}
        </div>
      </div>
    </div>
  );
};

// Wrap with providers
export default function WizardShellApp() {
  return (
    <ToastProvider>
      <WizardProvider>
        <WizardShell />
      </WizardProvider>
    </ToastProvider>
  );
}