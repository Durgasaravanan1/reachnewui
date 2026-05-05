// // WizardProgressBar.jsx
// import React from 'react';

// // Simple class name merger (replaces cn)
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // Steps definition (plain JavaScript)
// const STEPS = [
//   { num: 1, label: 'Setup' },
//   { num: 2, label: 'Audience' },
//   { num: 3, label: 'Content' },
//   { num: 4, label: 'Schedule' },
//   { num: 5, label: 'Review' },
//   { num: 6, label: 'Done' },
// ];

// // Simple Checkmark icon (replaces lucide-react Check)
// const CheckIcon = () => (
//   <svg
//     className="h-3.5 w-3.5"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="3"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );

// const WizardProgressBar = ({ current }) => {
//   return (
//     <div className="flex items-center justify-center gap-0">
//       {STEPS.map((step, i) => {
//         const done = step.num < current;
//         const active = step.num === current;
//         return (
//           <div key={step.num} className="flex items-center">
//             <div className="flex flex-col items-center gap-1.5">
//               <div
//                 className={cn(
//                   'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
//                   done && 'bg-emerald-500 border-emerald-500 text-white',
//                   active && 'bg-indigo-600 border-indigo-600 text-white',
//                   !done && !active && 'bg-white border-slate-200 text-slate-400'
//                 )}
//               >
//                 {done ? <CheckIcon /> : step.num}
//               </div>
//               <span
//                 className={cn(
//                   'text-[10px] font-semibold hidden sm:block',
//                   active && 'text-indigo-600',
//                   done && 'text-emerald-600',
//                   !done && !active && 'text-slate-400'
//                 )}
//               >
//                 {step.label}
//               </span>
//             </div>
//             {i < STEPS.length - 1 && (
//               <div
//                 className={cn(
//                   'w-12 h-0.5 mx-1 mb-4',
//                   done ? 'bg-emerald-400' : 'bg-slate-200'
//                 )}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default WizardProgressBar;


// WizardProgressBar.jsx – responsive, no overflow
import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const STEPS = [
  { num: 1, label: 'Setup' },
  { num: 2, label: 'Audience' },
  { num: 3, label: 'Content' },
  { num: 4, label: 'Schedule' },
  { num: 5, label: 'Review' },
  { num: 6, label: 'Done' },
];

const CheckIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WizardProgressBar = ({ current }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center min-w-[500px] md:min-w-0">
        {STEPS.map((step, i) => {
          const done = step.num < current;
          const active = step.num === current;

          return (
            <React.Fragment key={step.num}>
              {/* Step */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                    done && 'bg-emerald-500 border-emerald-500 text-white',
                    active && 'bg-indigo-600 border-indigo-600 text-white',
                    !done && !active && 'bg-white border-slate-200 text-slate-400'
                  )}
                >
                  {done ? <CheckIcon /> : step.num}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-semibold mt-1 hidden sm:block',
                    active && 'text-indigo-600',
                    done && 'text-emerald-600',
                    !done && !active && 'text-slate-400'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mb-4 bg-slate-200 relative min-w-[20px]">
                  <div
                    className={cn(
                      'absolute left-0 top-0 h-full transition-all',
                      done ? 'bg-emerald-400 w-full' : 'w-0'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WizardProgressBar;