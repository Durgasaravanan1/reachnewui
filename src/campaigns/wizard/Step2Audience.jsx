// // Step2Audience.jsx
// import React, { useState, useContext, createContext, useEffect } from 'react';

// // ----------------------------- Simple Wizard Store (Context) -----------------------------
// // This mimics the store from Step1Setup – reuse or define separately.
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
//   });
//   const [step, setStep] = useState(1);

//   const setStep1 = ({ campaignName, channel, goalLabel }) => {
//     setState((prev) => ({ ...prev, campaignName, channel, goalLabel }));
//   };
//   const setStep2 = ({ audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }) => {
//     setState((prev) => ({ ...prev, audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }));
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
//         nextStep,
//         prevStep,
//       }}
//     >
//       {children}
//     </WizardContext.Provider>
//   );
// };

// // ----------------------------- Mock Data & API Simulation -----------------------------
// const MOCK_LISTS = [
//   { id: 'list1', listName: 'Newsletter Subscribers', contactCount: 12500, emailEligibleCount: 11800, whatsappEligibleCount: 3200 },
//   { id: 'list2', listName: 'Premium Customers', contactCount: 3400, emailEligibleCount: 3400, whatsappEligibleCount: 2100 },
//   { id: 'list3', listName: 'Abandoned Cart', contactCount: 890, emailEligibleCount: 890, whatsappEligibleCount: 450 },
//   { id: 'list4', listName: 'Event Attendees', contactCount: 2300, emailEligibleCount: 2200, whatsappEligibleCount: 1800 },
// ];

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Custom hook that replaces useListAll
// const useListAll = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchLists = async () => {
//       await delay(600);
//       setData(MOCK_LISTS);
//       setIsLoading(false);
//     };
//     fetchLists();
//   }, []);

//   return { data, isLoading };
// };

// // ----------------------------- Custom UI Components (Tailwind only) -----------------------------
// const Button = ({ children, variant, onClick, disabled }) => {
//   const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variantClass = variant === 'primary'
//     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
//     : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
//   return (
//     <button className={`${base} ${variantClass}`} onClick={onClick} disabled={disabled}>
//       {children}
//     </button>
//   );
// };

// const Spinner = () => (
//   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
// );

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ----------------------------- Main Step2Audience Component -----------------------------
// export default function Step2Audience() {
//   const { audienceListIds, setStep2, nextStep, prevStep } = useWizardStore();
//   const [selectedIds, setSelectedIds] = useState(audienceListIds || []);
//   const { data: lists = [], isLoading } = useListAll();

//   // Calculate totals based on selected lists
//   const total = lists
//     .filter((list) => selectedIds.includes(list.id))
//     .reduce((sum, list) => sum + list.emailEligibleCount, 0);

//   // Placeholder suppression (7% of total)
//   const suppressed = Math.round(total * 0.07);

//   const toggle = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleContinue = () => {
//     setStep2({
//       audienceListIds: selectedIds,
//       excludeListIds: [],
//       estimatedRecipients: total,
//       suppressedCount: suppressed,
//     });
//     nextStep();
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//       <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
//         <h2 className="text-lg font-bold text-slate-900">Select Audience</h2>
//         <p className="text-sm text-slate-500 mt-1">
//           Choose which lists receive this campaign. Duplicates are automatically removed.
//         </p>
//       </div>

//       <div className="px-6 sm:px-8 py-6">
//         {isLoading ? (
//           <div className="flex justify-center py-8">
//             <Spinner />
//           </div>
//         ) : (
//           <div className="space-y-2 mb-5">
//             {lists.map((list) => {
//               const selected = selectedIds.includes(list.id);
//               return (
//                 <div
//                   key={list.id}
//                   onClick={() => toggle(list.id)}
//                   className={cn(
//                     'relative rounded-xl border-2 p-4 cursor-pointer transition-all',
//                     selected
//                       ? 'border-indigo-500 bg-indigo-50'
//                       : 'border-slate-200 hover:border-slate-300'
//                   )}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={cn(
//                         'h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-all',
//                         selected
//                           ? 'border-indigo-600 bg-indigo-600 text-white'
//                           : 'border-slate-300'
//                       )}
//                     >
//                       {selected && <span className="text-[10px] font-bold">✓</span>}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-sm text-slate-800">{list.listName}</p>
//                       <p className="text-xs text-slate-400 mt-0.5">
//                         {list.emailEligibleCount.toLocaleString()} email eligible ·{' '}
//                         {list.whatsappEligibleCount.toLocaleString()} WA eligible
//                       </p>
//                     </div>
//                     <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
//                       {list.contactCount.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Estimated Recipients Counter */}
//         <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 flex items-center justify-between">
//           <div>
//             <p className="text-2xl font-bold text-indigo-700">{total.toLocaleString()}</p>
//             <p className="text-sm font-semibold text-indigo-600 mt-0.5">Estimated Recipients</p>
//             <p className="text-xs text-indigo-400 mt-0.5">
//               {suppressed.toLocaleString()} suppressed contacts will be excluded
//             </p>
//           </div>
//           <span className="text-3xl opacity-30">👥</span>
//         </div>
//       </div>

//       <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
//         <Button variant="secondary" onClick={prevStep}>
//           ← Back
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleContinue}
//           disabled={selectedIds.length === 0 || total === 0}
//         >
//           Continue → Content
//         </Button>
//       </div>
//     </div>
//   );
// }



// Step2Audience.jsx – fixed continue button logic, no estimation blocking
import React, { useState, useEffect } from 'react';
import { useWizardStore } from './WizardShell';

// ---------- Mock Data ----------
const MOCK_LISTS = [
  { id: 'list1', listName: 'Newsletter Subscribers', contactCount: 12500, emailEligibleCount: 11800, whatsappEligibleCount: 3200 },
  { id: 'list2', listName: 'Premium Customers', contactCount: 3400, emailEligibleCount: 3400, whatsappEligibleCount: 2100 },
  { id: 'list3', listName: 'Abandoned Cart', contactCount: 890, emailEligibleCount: 890, whatsappEligibleCount: 450 },
  { id: 'list4', listName: 'Event Attendees', contactCount: 2300, emailEligibleCount: 2200, whatsappEligibleCount: 1800 },
];

const useListAll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { setTimeout(() => { setData(MOCK_LISTS); setIsLoading(false); }, 600); }, []);
  return { data, isLoading };
};

// Mock suppression estimation – no longer blocks button
const useEstimateSuppression = () => {
  const [data, setData] = useState({ suppressed: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const estimate = async (listIds, channel) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const total = listIds.reduce((sum, id) => sum + (MOCK_LISTS.find(l => l.id === id)?.contactCount || 0), 0);
    const suppressed = Math.round(total * 0.07); // fixed 7% for demo
    setData({ total, suppressed });
    setIsLoading(false);
  };
  return { estimate, data, isLoading };
};

// ---------- UI Components ----------
const Button = ({ children, variant, onClick, disabled }) => {
  const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
  return <button className={`${base} ${variantClass}`} onClick={onClick} disabled={disabled}>{children}</button>;
};

const Spinner = () => <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>;
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Step2Audience() {
  const { channel, audienceListIds, excludeListIds, setStep2, nextStep, prevStep } = useWizardStore();
  const [selectedInclude, setSelectedInclude] = useState(audienceListIds || []);
  const [selectedExclude, setSelectedExclude] = useState(excludeListIds || []);
  const { data: lists = [], isLoading } = useListAll();
  const { estimate, data: estimateData, isLoading: estimating } = useEstimateSuppression();

  // Recalculate total and suppressed when include/exclude changes
  const includedLists = lists.filter(l => selectedInclude.includes(l.id));
  const totalRecipientsRaw = includedLists.reduce((sum, l) => sum + l.contactCount, 0);
  const excludedLists = lists.filter(l => selectedExclude.includes(l.id));
  const excludedTotal = excludedLists.reduce((sum, l) => sum + l.contactCount, 0);
  const finalRecipients = Math.max(0, totalRecipientsRaw - excludedTotal);

  // Estimate suppression when include lists change
  useEffect(() => {
    if (selectedInclude.length === 0) return;
    estimate(selectedInclude, channel);
  }, [selectedInclude, channel, estimate]);

  const toggleInclude = (id) => {
    setSelectedInclude(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleExclude = (id) => {
    setSelectedExclude(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setStep2({
      audienceListIds: selectedInclude,
      excludeListIds: selectedExclude,
      estimatedRecipients: finalRecipients,
      suppressedCount: estimateData?.suppressed || 0,
    });
    nextStep();
  };

  // ✅ Button enabled as soon as at least one "Include" list is selected
  const isContinueDisabled = selectedInclude.length === 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Select Audience</h2>
        <p className="text-sm text-slate-500 mt-1">Choose which lists receive this campaign.</p>
      </div>

      <div className="px-6 sm:px-8 py-6 space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : (
          <>
            {/* Include Lists */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">Include from these lists</p>
              <div className="space-y-2">
                {lists.map(list => {
                  const selected = selectedInclude.includes(list.id);
                  return (
                    <div
                      key={list.id}
                      onClick={() => toggleInclude(list.id)}
                      className={cn('rounded-xl border-2 p-4 cursor-pointer transition-all', selected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300')}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn('h-5 w-5 rounded border-2 flex items-center justify-center', selected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300')}>
                          {selected && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{list.listName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {list.emailEligibleCount} email · {list.whatsappEligibleCount} WA
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{list.contactCount}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exclude Lists (optional) */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">Exclude from these lists (optional)</p>
              <div className="space-y-2">
                {lists.map(list => {
                  const excluded = selectedExclude.includes(list.id);
                  return (
                    <div
                      key={list.id}
                      onClick={() => toggleExclude(list.id)}
                      className={cn('rounded-xl border-2 p-4 cursor-pointer transition-all', excluded ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300')}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn('h-5 w-5 rounded border-2 flex items-center justify-center', excluded ? 'border-red-500 bg-red-500 text-white' : 'border-slate-300')}>
                          {excluded && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{list.listName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{list.contactCount} contacts</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Stats Panel */}
        <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-indigo-700">{finalRecipients.toLocaleString()}</p>
              <p className="text-sm font-semibold text-indigo-600">Estimated Recipients</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-indigo-600">
                Suppressed: {estimating ? '…' : estimateData?.suppressed?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-indigo-400">(bounces, unsubscribes)</p>
            </div>
          </div>
          {selectedExclude.length > 0 && (
            <p className="text-xs text-slate-500">Excluded {excludedTotal.toLocaleString()} contacts from {selectedExclude.length} lists</p>
          )}
        </div>
      </div>

      <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
        <Button variant="secondary" onClick={prevStep}>← Back</Button>
        <Button variant="primary" onClick={handleContinue} disabled={isContinueDisabled}>
          Continue → Content
        </Button>
      </div>
    </div>
  );
}