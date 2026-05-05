// // Step1Setup.jsx
// import React, { createContext, useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// // ----------------------------- Simple Wizard Store (Context) -----------------------------
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
//   });
//   const [step, setStep] = useState(1);

//   const setStep1 = ({ campaignName, channel, goalLabel }) => {
//     setState({ campaignName, channel, goalLabel });
//   };
//   const nextStep = () => setStep((s) => s + 1);
//   const prevStep = () => setStep((s) => Math.max(1, s - 1));

//   return (
//     <WizardContext.Provider
//       value={{
//         ...state,
//         step,
//         setStep1,
//         nextStep,
//         prevStep,
//       }}
//     >
//       {children}
//     </WizardContext.Provider>
//   );
// };

// // ----------------------------- Custom UI Components (Tailwind only) -----------------------------
// const Input = ({ label, placeholder, error, ...props }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <input
//       {...props}
//       placeholder={placeholder}
//       className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
//         error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200'
//       }`}
//     />
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Select = ({ label, placeholder, options, optional, error, ...props }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">
//       {label} {optional && <span className="text-slate-400 text-xs font-normal">(optional)</span>}
//     </label>
//     <select
//       {...props}
//       className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
//         error ? 'border-red-300' : 'border-slate-200'
//       }`}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((opt) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Button = ({ children, variant, type, onClick }) => {
//   const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1";
//   const variantClass = variant === 'primary'
//     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
//     : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
//   return (
//     <button type={type} onClick={onClick} className={`${base} ${variantClass}`}>
//       {children}
//     </button>
//   );
// };

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ----------------------------- Schema & Constants -----------------------------
// const schema = z.object({
//   campaignName: z.string().min(2, 'Campaign name must be at least 2 characters'),
//   channel: z.enum(['email', 'whatsapp'], { required_error: 'Select a channel' }),
//   goalLabel: z.enum(['promotional', 'transactional', 're_engagement', 'event', 'announcement']).optional(),
// });

// const GOAL_OPTIONS = [
//   { label: 'Promotional', value: 'promotional' },
//   { label: 'Transactional', value: 'transactional' },
//   { label: 'Re-engagement', value: 're_engagement' },
//   { label: 'Event', value: 'event' },
//   { label: 'Announcement', value: 'announcement' },
// ];

// // ----------------------------- Main Component -----------------------------
// export default function Step1Setup() {
//   const { campaignName, channel, goalLabel, setStep1, nextStep } = useWizardStore();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       campaignName: campaignName || '',
//       channel: channel || undefined,
//       goalLabel: goalLabel || undefined,
//     },
//   });

//   const selectedChannel = watch('channel');

//   const onSubmit = (values) => {
//     setStep1({
//       campaignName: values.campaignName,
//       channel: values.channel,
//       goalLabel: values.goalLabel || null,
//     });
//     nextStep();
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//       <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
//         <h2 className="text-lg font-bold text-slate-900">Campaign Setup</h2>
//         <p className="text-sm text-slate-500 mt-1">Name your campaign and choose the channel.</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="px-6 sm:px-8 py-6 space-y-6">
//           <Input
//             label="Campaign Name"
//             placeholder="e.g. May Product Update, Summer Sale…"
//             error={errors.campaignName?.message}
//             {...register('campaignName')}
//           />

//           <div>
//             <p className="text-sm font-semibold text-slate-700 mb-3">Select Channel</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {['email', 'whatsapp'].map((ch) => (
//                 <button
//                   key={ch}
//                   type="button"
//                   onClick={() => setValue('channel', ch, { shouldValidate: true })}
//                   className={cn(
//                     'relative rounded-xl border-2 p-5 text-center transition-all',
//                     selectedChannel === ch
//                       ? 'border-indigo-500 bg-indigo-50'
//                       : 'border-slate-200 hover:border-slate-300 bg-white'
//                   )}
//                 >
//                   <span className="text-2xl block mb-2">{ch === 'email' ? '✉️' : '💬'}</span>
//                   <p className="font-semibold text-sm text-slate-800 capitalize">
//                     {ch === 'whatsapp' ? 'WhatsApp' : 'Email'}
//                   </p>
//                   <p className="text-xs text-slate-400 mt-1">
//                     {ch === 'email' ? 'Bulk email with full analytics' : 'WhatsApp Business API'}
//                   </p>
//                   {selectedChannel === ch && (
//                     <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
//                       ✓
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             {errors.channel && <p className="mt-1.5 text-xs text-red-600">{errors.channel.message}</p>}
//           </div>

//           <Select
//             label="Campaign Goal"
//             placeholder="Select a goal… (optional)"
//             options={GOAL_OPTIONS}
//             optional
//             error={errors.goalLabel?.message}
//             {...register('goalLabel')}
//           />
//         </div>

//         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
//           <Button type="submit" variant="primary">
//             Continue → Audience
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }




// Step1Setup.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWizardStore } from './WizardShell';

// ---------- UI Components ----------
const Input = ({ label, placeholder, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label}</label>
    <input {...props} placeholder={placeholder} className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${error ? 'border-red-300' : 'border-slate-200'}`} />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, placeholder, options, optional, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label} {optional && <span className="text-slate-400 text-xs font-normal">(optional)</span>}</label>
    <select {...props} className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${error ? 'border-red-300' : 'border-slate-200'}`}>
      <option value="">{placeholder}</option>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Button = ({ children, variant, type, onClick, disabled }) => {
  const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary' ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  return <button type={type} onClick={onClick} className={`${base} ${variantClass}`} disabled={disabled}>{children}</button>;
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

// ---------- Schema ----------
const schema = z.object({
  campaignName: z.string().min(2, 'Campaign name must be at least 2 characters'),
  channel: z.enum(['email', 'whatsapp'], { required_error: 'Select a channel' }),
  goalLabel: z.enum(['promotional', 'transactional', 're_engagement', 'event', 'announcement']).optional(),
});

const GOAL_OPTIONS = [
  { label: 'Promotional', value: 'promotional' },
  { label: 'Transactional', value: 'transactional' },
  { label: 'Re-engagement', value: 're_engagement' },
  { label: 'Event', value: 'event' },
  { label: 'Announcement', value: 'announcement' },
];

export default function Step1Setup() {
  const { campaignName, channel, goalLabel, setStep1, nextStep } = useWizardStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', // validates on every change
    defaultValues: {
      campaignName: campaignName || '',
      channel: channel || undefined,
      goalLabel: goalLabel || undefined,
    },
  });

  const selectedChannel = watch('channel');

  const onSubmit = (values) => {
    console.log('Submitting step1:', values);
    setStep1({
      campaignName: values.campaignName,
      channel: values.channel,
      goalLabel: values.goalLabel || null,
    });
    nextStep();
  };

  // Show validation errors if any
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Campaign Setup</h2>
        <p className="text-sm text-slate-500 mt-1">Name your campaign and choose the channel.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="px-6 sm:px-8 py-6 space-y-6">
          <Input
            label="Campaign Name"
            placeholder="e.g. May Product Update, Summer Sale…"
            error={errors.campaignName?.message}
            {...register('campaignName')}
          />

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Select Channel</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['email', 'whatsapp'].map(ch => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => {
                    setValue('channel', ch, { shouldValidate: true });
                    trigger('channel');
                  }}
                  className={cn(
                    'relative rounded-xl border-2 p-5 text-center transition-all',
                    selectedChannel === ch ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300 bg-white'
                  )}
                >
                  <span className="text-2xl block mb-2">{ch === 'email' ? '✉️' : '💬'}</span>
                  <p className="font-semibold text-sm text-slate-800 capitalize">{ch === 'whatsapp' ? 'WhatsApp' : 'Email'}</p>
                  <p className="text-xs text-slate-400 mt-1">{ch === 'email' ? 'Bulk email with full analytics' : 'WhatsApp Business API'}</p>
                  {selectedChannel === ch && (
                    <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">✓</span>
                  )}
                </button>
              ))}
            </div>
            {errors.channel && <p className="mt-1.5 text-xs text-red-600">{errors.channel.message}</p>}
          </div>

          <Select
            label="Campaign Goal"
            placeholder="Select a goal… (optional)"
            options={GOAL_OPTIONS}
            optional
            error={errors.goalLabel?.message}
            {...register('goalLabel')}
          />
        </div>

        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" disabled={!isValid && !selectedChannel && !watch('campaignName')}>
            Continue → Audience
          </Button>
        </div>
      </form>

      {/* Debug panel (remove after fixing) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="px-6 py-2 text-xs text-slate-400 border-t">
          isValid: {String(isValid)} | errors: {JSON.stringify(Object.keys(errors))}
        </div>
      )}
    </div>
  );
}