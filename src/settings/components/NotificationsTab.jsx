// // NotificationsTab.jsx
// import React, { useState } from 'react';

// // ===================== Custom Toggle Component (Tailwind) =====================
// const Toggle = ({ checked, onChange, disabled }) => {
//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       disabled={disabled}
//       onClick={() => onChange(!checked)}
//       className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
//         checked ? 'bg-indigo-600' : 'bg-slate-200'
//       } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//     >
//       <span
//         aria-hidden="true"
//         className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
//           checked ? 'translate-x-4' : 'translate-x-0'
//         }`}
//       />
//     </button>
//   );
// };

// // ===================== Notification Types Data =====================
// const NOTIFICATION_TYPES = [
//   { id: 'campaignSent',      label: 'Campaign Sent',       desc: 'When a campaign is dispatched to recipients' },
//   { id: 'approvalRequested', label: 'Approval Requested',  desc: 'When an Editor submits a campaign for review' },
//   { id: 'campaignFailed',    label: 'Campaign Failed',     desc: 'When a campaign encounters a send error' },
//   { id: 'highBounceAlert',   label: 'High Bounce Alert',   desc: 'When bounce rate exceeds workspace threshold' },
//   { id: 'automationError',   label: 'Automation Error',    desc: 'When a workflow step fails' },
//   { id: 'contactImportDone', label: 'Contact Import Done', desc: 'When an import job completes or partially fails' },
// ];

// // ===================== Main NotificationsTab Component =====================
// export default function NotificationsTab() {
//   // State for in-app and email toggles (mock – replace with real data later)
//   const [preferences, setPreferences] = useState(() => {
//     const initial = {};
//     NOTIFICATION_TYPES.forEach(n => {
//       initial[n.id] = {
//         inApp: true,
//         email: n.id !== 'automationError' && n.id !== 'contactImportDone',
//       };
//     });
//     return initial;
//   });

//   const handleToggle = (id, type) => {
//     setPreferences(prev => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [type]: !prev[id][type],
//       },
//     }));
//   };

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//       <div className="px-5 py-4 border-b border-slate-100">
//         <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
//         <p className="text-xs text-slate-400 mt-0.5">Control which notifications you receive</p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-slate-100 bg-slate-50">
//               <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                 Type
//               </th>
//               <th className="px-5 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                 In-App
//               </th>
//               <th className="px-5 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                 Email
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {NOTIFICATION_TYPES.map((n) => (
//               <tr key={n.id} className="hover:bg-slate-50 transition-colors">
//                 <td className="px-5 py-3.5">
//                   <p className="font-semibold text-slate-800 text-sm">{n.label}</p>
//                   <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
//                 </td>
//                 <td className="px-5 py-3.5 text-center">
//                   <Toggle
//                     checked={preferences[n.id]?.inApp ?? true}
//                     onChange={() => handleToggle(n.id, 'inApp')}
//                   />
//                 </td>
//                 <td className="px-5 py-3.5 text-center">
//                   <Toggle
//                     checked={preferences[n.id]?.email ?? false}
//                     onChange={() => handleToggle(n.id, 'email')}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// NotificationsTab.jsx – Notification Preferences
import React, { useState } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Toggle = ({ checked, onChange }) => {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
      className={cn("relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        checked ? "bg-indigo-600" : "bg-slate-200")}>
      <span aria-hidden="true" className={cn("pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        checked ? "translate-x-4" : "translate-x-0")} />
    </button>
  );
};

export default function NotificationsTab() {
  const [preferences, setPreferences] = useState({
    campaignSent: { inApp: true, email: true },
    approvalRequested: { inApp: true, email: true },
    campaignFailed: { inApp: true, email: true },
    highBounceAlert: { inApp: true, email: false },
    automationError: { inApp: true, email: true },
    contactImportDone: { inApp: true, email: false },
  });

  const notificationTypes = [
    { id: 'campaignSent', label: 'Campaign Sent', description: 'When a campaign is dispatched to recipients' },
    { id: 'approvalRequested', label: 'Approval Requested', description: 'When an Editor submits a campaign for review' },
    { id: 'campaignFailed', label: 'Campaign Failed', description: 'When a campaign encounters a send error' },
    { id: 'highBounceAlert', label: 'High Bounce Alert', description: 'When bounce rate exceeds workspace threshold' },
    { id: 'automationError', label: 'Automation Error', description: 'When a workflow step fails' },
    { id: 'contactImportDone', label: 'Contact Import Done', description: 'When an import job completes or partially fails' },
  ];

  const handleToggle = (id, type) => {
    console.log(`[NotificationsTab] Toggling ${id} - ${type}: ${!preferences[id][type]}`);
    setPreferences(prev => ({ ...prev, [id]: { ...prev[id], [type]: !prev[id][type] } }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
        <p className="text-xs text-slate-400 mt-0.5">Control which notifications you receive</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">NOTIFICATION TYPE</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">IN-APP</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">EMAIL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {notificationTypes.map(notif => (
              <tr key={notif.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-slate-800 text-sm">{notif.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{notif.description}</p>
                </td>
                <td className="px-5 py-3.5 text-center"><Toggle checked={preferences[notif.id]?.inApp} onChange={() => handleToggle(notif.id, 'inApp')} /></td>
                <td className="px-5 py-3.5 text-center"><Toggle checked={preferences[notif.id]?.email} onChange={() => handleToggle(notif.id, 'email')} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}