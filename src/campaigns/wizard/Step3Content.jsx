// // Step3Content.jsx
// import React, { useContext, createContext, useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// // ----------------------------- Wizard Store (Context) -----------------------------
// // Extend the previous store to include content fields.
// const WizardContext = createContext(null);

// export const useWizardStore = () => {
//   const context = useContext(WizardContext);
//   if (!context) throw new Error('useWizardStore must be used within WizardProvider');
//   return context;
// };

// export const WizardProvider = ({ children }) => {
//   const [state, setState] = useState({
//     campaignName: '',
//     channel: null,
//     goalLabel: null,
//     audienceListIds: [],
//     excludeListIds: [],
//     estimatedRecipients: 0,
//     suppressedCount: 0,
//     subjectLine: '',
//     previewText: '',
//     templateId: '',
//     senderIdentityId: '',
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
//   const nextStep = () => setStep((s) => s + 1);
//   const prevStep = () => setStep((s) => Math.max(1, s - 1));

//   return (
//     <WizardContext.Provider
//       value={{
//         ...state,
//         step,
//         setStep1,
//         setStep2,
//         setStep3,
//         nextStep,
//         prevStep,
//       }}
//     >
//       {children}
//     </WizardContext.Provider>
//   );
// };

// // ----------------------------- Mock Template Data & API -----------------------------
// const MOCK_TEMPLATES = {
//   email: {
//     items: [
//       { id: 't1', templateName: 'Newsletter', channel: 'email' },
//       { id: 't2', templateName: 'Product Launch', channel: 'email' },
//       { id: 't3', templateName: 'Event Invite', channel: 'email' },
//       { id: 't4', templateName: 'Abandoned Cart', channel: 'email' },
//       { id: 't5', templateName: 'Weekly Roundup', channel: 'email' },
//     ],
//   },
//   whatsapp: {
//     items: [
//       { id: 'w1', templateName: 'Order Update', channel: 'whatsapp' },
//       { id: 'w2', templateName: 'Support Message', channel: 'whatsapp' },
//     ],
//   },
// };

// const useTemplateList = ({ channel }) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 400));
//       setData(MOCK_TEMPLATES[channel] || { items: [] });
//       setIsLoading(false);
//     };
//     fetchTemplates();
//   }, [channel]);

//   return { data, isLoading };
// };

// // ----------------------------- Custom UI Components (Tailwind only) -----------------------------
// const Input = ({ label, placeholder, optional, hint, error, ...props }) => (
//   <div className="space-y-1">
//     {label && (
//       <label className="block text-sm font-semibold text-slate-700">
//         {label} {optional && <span className="text-slate-400 text-xs font-normal">(optional)</span>}
//       </label>
//     )}
//     <input
//       {...props}
//       placeholder={placeholder}
//       className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
//         error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200'
//       }`}
//     />
//     {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Button = ({ children, variant, type, onClick, disabled }) => {
//   const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variantClass = variant === 'primary'
//     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
//     : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
//   return (
//     <button type={type} onClick={onClick} className={`${base} ${variantClass}`} disabled={disabled}>
//       {children}
//     </button>
//   );
// };

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // Helper for subject line strength
// const strengthLabel = (s) => {
//   if (!s) return null;
//   if (s.length < 20) return { label: 'Too short', color: 'text-red-500' };
//   if (s.length < 40) return { label: 'Good', color: 'text-amber-500' };
//   return { label: 'Strong', color: 'text-emerald-500' };
// };

// // ----------------------------- Main Step3Content Component -----------------------------
// export default function Step3Content() {
//   const { channel, subjectLine, previewText, templateId, senderIdentityId, setStep3, nextStep, prevStep } = useWizardStore();
//   const { data: templates, isLoading } = useTemplateList({ channel });

//   // Form schema
//   const schema = z.object({
//     subjectLine: z.string().min(1, 'Subject line is required').max(150, 'Max 150 characters'),
//     previewText: z.string().max(200).optional(),
//     templateId: z.string().min(1, 'Select a template'),
//     senderIdentityId: z.string().min(1, 'Sender required'),
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       subjectLine: subjectLine || '',
//       previewText: previewText || '',
//       templateId: templateId || '',
//       senderIdentityId: senderIdentityId || 'default',
//     },
//   });

//   const subject = watch('subjectLine') || '';
//   const currentTmpl = watch('templateId');
//   const strength = strengthLabel(subject);

//   const onSubmit = (values) => {
//     setStep3({
//       subjectLine: values.subjectLine,
//       previewText: values.previewText || '',
//       templateId: values.templateId,
//       senderIdentityId: values.senderIdentityId || 'default',
//     });
//     nextStep();
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//       <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
//         <h2 className="text-lg font-bold text-slate-900">Campaign Content</h2>
//         <p className="text-sm text-slate-500 mt-1">Choose a template and set your message content.</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="px-6 sm:px-8 py-6 space-y-5">
//           {/* Email-specific fields */}
//           {channel === 'email' && (
//             <>
//               <div>
//                 <Input
//                   label="Subject Line"
//                   placeholder="e.g. 🚀 Big news: WYNReach V2 is here"
//                   error={errors.subjectLine?.message}
//                   {...register('subjectLine')}
//                 />
//                 <div className="flex justify-between mt-1.5">
//                   <span className="text-xs text-slate-400">{subject.length} / 150 characters</span>
//                   {strength && (
//                     <span className={`text-xs font-semibold ${strength.color}`}>● {strength.label}</span>
//                   )}
//                 </div>
//               </div>
//               <Input
//                 label="Preview Text"
//                 placeholder="Short text shown in inbox before opening…"
//                 optional
//                 hint="Recommended: 80–100 characters"
//                 {...register('previewText')}
//               />
//             </>
//           )}

//           {/* Template selection */}
//           <div>
//             <p className="text-sm font-semibold text-slate-700 mb-3">Choose a Template</p>
//             {errors.templateId && (
//               <p className="text-xs text-red-600 mb-2">{errors.templateId.message}</p>
//             )}

//             {isLoading ? (
//               <div className="flex justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {(templates?.items || []).slice(0, 5).map((tmpl) => (
//                   <div
//                     key={tmpl.id}
//                     onClick={() => setValue('templateId', tmpl.id, { shouldValidate: true })}
//                     className={cn(
//                       'rounded-xl border-2 overflow-hidden cursor-pointer transition-all',
//                       currentTmpl === tmpl.id
//                         ? 'border-indigo-500 shadow-sm'
//                         : 'border-slate-200 hover:border-slate-300'
//                     )}
//                   >
//                     <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//                       <div className="w-14 bg-white rounded shadow-sm p-2">
//                         <div className="h-1.5 bg-indigo-500 rounded mb-1.5" />
//                         <div className="h-1 bg-slate-200 rounded mb-1" />
//                         <div className="h-1 bg-slate-200 rounded w-3/4 mb-1" />
//                         <div className="h-2 bg-indigo-500 rounded w-8" />
//                       </div>
//                     </div>
//                     <div className="px-3 py-2 border-t border-slate-100">
//                       <p className="text-xs font-semibold text-slate-700 truncate">{tmpl.templateName}</p>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Start from blank option */}
//                 <div
//                   onClick={() => setValue('templateId', 'blank', { shouldValidate: true })}
//                   className={cn(
//                     'rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-center h-[120px]',
//                     currentTmpl === 'blank'
//                       ? 'border-indigo-500 bg-indigo-50'
//                       : 'border-slate-300 hover:border-slate-400'
//                   )}
//                 >
//                   <div className="text-center">
//                     <div className="text-xl mb-1">✏️</div>
//                     <p className="text-xs font-semibold text-slate-500">Start Blank</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
//           <Button variant="secondary" type="button" onClick={prevStep}>
//             ← Back
//           </Button>
//           <div className="flex gap-2">
//             <Button variant="secondary" type="button">
//               ✨ AI Draft
//             </Button>
//             <Button variant="primary" type="submit">
//               Continue → Schedule
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }


// Step3Content.jsx – fixed validation, button enabled after auto‑selection
import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWizardStore } from './WizardShell';

// ---------- Mock Data ----------
const MOCK_TEMPLATES = {
  email: {
    items: [
      { id: 't1', templateName: 'Newsletter' },
      { id: 't2', templateName: 'Product Launch' },
      { id: 't3', templateName: 'Event Invite' },
    ],
  },
  whatsapp: {
    items: [
      { id: 'w1', templateName: 'Order Update' },
      { id: 'w2', templateName: 'Support Message' },
    ],
  },
};

const useTemplateList = ({ channel }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_TEMPLATES[channel] || { items: [] });
      setIsLoading(false);
    }, 300);
  }, [channel]);
  return { data, isLoading };
};

const useSenderIdentities = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: 'sender1', name: 'Subramanian A. (subramanian@wynreach.com)' },
        { id: 'sender2', name: 'Support Team (support@wynreach.com)' },
      ]);
      setIsLoading(false);
    }, 300);
  }, []);
  return { data, isLoading };
};

// ---------- UI Components ----------
const Button = ({ children, variant, type, onClick, disabled }) => {
  const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
  return (
    <button type={type} onClick={onClick} className={`${base} ${variantClass}`} disabled={disabled}>
      {children}
    </button>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Step3Content() {
  const { channel, subjectLine, previewText, templateId, senderIdentityId, setStep3, nextStep, prevStep } = useWizardStore();
  const { data: templates, isLoading: loadingTemplates } = useTemplateList({ channel });
  const { data: senders, isLoading: loadingSenders } = useSenderIdentities();

  // Schema – dependent on channel
  const schema = useMemo(
    () =>
      z.object({
        subjectLine: channel === 'email'
          ? z.string().min(1, 'Subject line required').max(150)
          : z.string().optional(),
        previewText: z.string().optional(),
        templateId: z.string().min(1, 'Please select a template'),
        senderIdentityId: z.string().min(1, 'Please select a sender'),
      }),
    [channel]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      subjectLine: subjectLine || '',
      previewText: previewText || '',
      templateId: templateId || '',
      senderIdentityId: senderIdentityId || '',
    },
  });

  const currentTemplate = watch('templateId');
  const currentSender = watch('senderIdentityId');
  const subject = watch('subjectLine');

  // Auto‑select first template when data loads
  useEffect(() => {
    if (templates?.items?.length && !currentTemplate) {
      setValue('templateId', templates.items[0].id, { shouldValidate: true });
      trigger('templateId'); // force validation
    }
  }, [templates, currentTemplate, setValue, trigger]);

  // Auto‑select first sender when data loads
  useEffect(() => {
    if (senders?.length && !currentSender) {
      setValue('senderIdentityId', senders[0].id, { shouldValidate: true });
      trigger('senderIdentityId');
    }
  }, [senders, currentSender, setValue, trigger]);

  // Re‑validate subject line when channel changes (if email)
  useEffect(() => {
    if (channel === 'email' && subject) {
      trigger('subjectLine');
    }
  }, [channel, subject, trigger]);

  const onSubmit = (values) => {
    console.log('Step3 submitted:', values);
    setStep3({
      subjectLine: values.subjectLine || '',
      previewText: values.previewText || '',
      templateId: values.templateId,
      senderIdentityId: values.senderIdentityId,
    });
    nextStep();
  };

  // Determine if form is ready to submit
  const isReady = currentTemplate && currentSender && (channel !== 'email' || subject);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Campaign Content</h2>
        <p className="text-sm text-slate-500 mt-1">Choose a template and set your message content.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="overflow-visible">
        <div className="px-6 sm:px-8 py-6 space-y-5 overflow-visible">
          {channel === 'email' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Subject Line</label>
              <input
                {...register('subjectLine')}
                placeholder="e.g. 🚀 Big news: WYNReach V2 is here"
                className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.subjectLine ? 'border-red-300' : 'border-slate-200'}`}
              />
              {errors.subjectLine && <p className="text-xs text-red-500 mt-1">{errors.subjectLine.message}</p>}
              <div className="flex justify-between mt-1.5">
                <span className="text-xs text-slate-400">{(subject || '').length} / 150 characters</span>
              </div>
            </div>
          )}

          {/* Template selection */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Choose a Template</p>
            {errors.templateId && <p className="text-xs text-red-600 mb-2">{errors.templateId.message}</p>}
            {loadingTemplates ? (
              <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(templates?.items || []).slice(0,5).map(tmpl => (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      setValue('templateId', tmpl.id, { shouldValidate: true });
                      trigger('templateId');
                    }}
                    className={cn(
                      'rounded-xl border-2 overflow-hidden cursor-pointer transition-all',
                      currentTemplate === tmpl.id ? 'border-indigo-500 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <div className="w-14 bg-white rounded shadow-sm p-2">
                        <div className="h-1.5 bg-indigo-500 rounded mb-1.5" />
                        <div className="h-1 bg-slate-200 rounded mb-1" />
                        <div className="h-1 bg-slate-200 rounded w-3/4 mb-1" />
                        <div className="h-2 bg-indigo-500 rounded w-8" />
                      </div>
                    </div>
                    <div className="px-3 py-2 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-700 truncate">{tmpl.templateName}</p>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => {
                    setValue('templateId', 'blank', { shouldValidate: true });
                    trigger('templateId');
                  }}
                  className={cn(
                    'rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-center h-[120px]',
                    currentTemplate === 'blank' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-slate-400'
                  )}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">✏️</div>
                    <p className="text-xs font-semibold text-slate-500">Start Blank</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sender identity dropdown */}
          <div className="relative z-20">
            <p className="text-sm font-semibold text-slate-700 mb-2">Sender Identity</p>
            {loadingSenders ? (
              <div className="flex justify-center py-4"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div></div>
            ) : (
              <select
                {...register('senderIdentityId')}
                onChange={(e) => {
                  setValue('senderIdentityId', e.target.value, { shouldValidate: true });
                  trigger('senderIdentityId');
                }}
                className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.senderIdentityId ? 'border-red-300' : 'border-slate-200'}`}
              >
                <option value="">Select a sender…</option>
                {senders?.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}
            {errors.senderIdentityId && <p className="text-xs text-red-500 mt-1">{errors.senderIdentityId.message}</p>}
          </div>
        </div>

        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
          <Button type="button" onClick={prevStep}>← Back</Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!isReady}
          >
            Continue → Schedule
          </Button>
        </div>
      </form>
    </div>
  );
}