// // DashboardPage.jsx – grey text changed to black, no syntax errors
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// /* Mock Data */
// const ACTIVE_CAMPAIGNS = [
//   {
//     id: "1",
//     name: "April Newsletter",
//     sub: "8,230 recipients",
//     status: "sent",
//     openRate: "38.7%",
//     channel: "email",
//   },
//   {
//     id: "2",
//     name: "WhatsApp Flash Sale",
//     sub: "3,180 recipients · Scheduled May 1",
//     status: "completed",
//     openRate: "68.3%",
//     channel: "whatsapp",
//   },
//   {
//     id: "3",
//     name: "Re-engagement Series",
//     sub: "Scheduled May 1",
//     status: "scheduled",
//     openRate: null,
//     channel: "email",
//   },
// ];

// const UPCOMING_SENDS = [
//   {
//     name: "Re-engagement Series",
//     sub: "5,400 recipients · Email",
//     date: "May 1, 9 AM",
//     channel: "email",
//   },
//   {
//     name: "Mother's Day Promo",
//     sub: "2,100 recipients · WhatsApp",
//     date: "May 11, 10 AM",
//     channel: "whatsapp",
//   },
//   {
//     name: "May Product Update",
//     sub: "12,800 recipients · Email",
//     date: "May 15, 8 AM",
//     channel: "email",
//   },
//   {
//     name: "Q2 Launch Announcement",
//     sub: "18,200 recipients · Email",
//     date: "May 20, 9 AM",
//     channel: "email",
//   },
// ];

// const RECENT_ACTIVITY = [
//   {
//     icon: "✉️",
//     bg: "bg-violet-50",
//     content: (
//       <>
//         <span className="font-bold text-slate-800">April Newsletter</span>{" "}
//         sent to 8,230 contacts
//       </>
//     ),
//     time: "2h ago",
//   },
//   {
//     icon: "✅",
//     bg: "bg-emerald-50",
//     content: (
//       <>
//         <span className="font-bold text-slate-800">WhatsApp Flash Sale</span>{" "}
//         completed — 68.3% read rate
//       </>
//     ),
//     time: "5h ago",
//   },
//   {
//     icon: "👥",
//     bg: "bg-sky-50",
//     content: (
//       <>
//         Imported{" "}
//         <span className="font-bold text-slate-800">342 contacts</span> into
//         "Active Customers"
//       </>
//     ),
//     time: "1d ago",
//   },
//   {
//     icon: "⏰",
//     bg: "bg-amber-50",
//     content: (
//       <>
//         <span className="font-bold text-slate-800">Re-engagement Series</span>{" "}
//         scheduled for May 1
//       </>
//     ),
//     time: "1d ago",
//   },
//   {
//     icon: "🗂️",
//     bg: "bg-violet-50",
//     content: (
//       <>
//         New template{" "}
//         <span className="font-bold text-slate-800">"Product Update May"</span>{" "}
//         created
//       </>
//     ),
//     time: "2d ago",
//   },
// ];

// // Engagement chart data
// const X_LABELS = ["Mar 24", "Apr 2", "Apr 10", "Apr 18", "Apr 22"];
// const SENDS_DATA = [
//   420, 435, 428, 460, 470, 480, 495, 510, 505, 520, 515, 530, 540, 535, 550,
//   560, 555, 570, 580, 590, 600, 615, 610, 625, 630, 640, 650, 645, 655, 660,
// ];
// const OPENS_DATA = [
//   280, 290, 285, 300, 308, 315, 325, 338, 332, 345, 340, 352, 360, 355, 368,
//   375, 370, 382, 390, 400, 408, 420, 415, 428, 432, 440, 448, 445, 452, 458,
// ];

// const greeting = () => {
//   const h = new Date().getHours();
//   return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
// };

// const ChannelIcon = ({ ch, size = "w-8 h-8" }) => (
//   <div
//     className={`${size} rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
//       ch === "whatsapp" ? "bg-emerald-100" : "bg-violet-100"
//     }`}
//   >
//     {ch === "whatsapp" ? "💬" : "✉️"}
//   </div>
// );

// const Badge = ({ status }) => {
//   const map = {
//     sent: "bg-violet-50 text-violet-700",
//     scheduled: "bg-blue-50 text-blue-700",
//     completed: "bg-emerald-50 text-emerald-700",
//   };
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}
//     >
//       <span className="w-1.5 h-1.5 rounded-full bg-current" />
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   );
// };

// const EngagementChart = ({ filter }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const dpr = window.devicePixelRatio || 1;
//     const W = canvas.offsetWidth;
//     const H = canvas.offsetHeight;
//     canvas.width = W * dpr;
//     canvas.height = H * dpr;
//     ctx.scale(dpr, dpr);

//     const PAD = { top: 16, right: 16, bottom: 40, left: 42 };
//     const cW = W - PAD.left - PAD.right;
//     const cH = H - PAD.top - PAD.bottom;

//     const sendsColor = "#4F46E5";
//     const opensColor = "#10B981";

//     const allVals = [...SENDS_DATA, ...OPENS_DATA];
//     const minV = Math.min(...allVals) * 0.92;
//     const maxV = Math.max(...allVals) * 1.05;
//     const n = SENDS_DATA.length;

//     const xOf = (i) => PAD.left + (i / (n - 1)) * cW;
//     const yOf = (v) => PAD.top + cH - ((v - minV) / (maxV - minV)) * cH;

//     ctx.strokeStyle = "#f1f5f9";
//     ctx.lineWidth = 1;
//     [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
//       const y = PAD.top + cH * t;
//       ctx.beginPath();
//       ctx.moveTo(PAD.left, y);
//       ctx.lineTo(PAD.left + cW, y);
//       ctx.stroke();
//     });

//     ctx.fillStyle = "#94a3b8";
//     ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
//     ctx.textAlign = "right";
//     [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
//       const v = Math.round(maxV - t * (maxV - minV));
//       ctx.fillText(v, PAD.left - 6, PAD.top + cH * t + 4);
//     });

//     ctx.textAlign = "center";
//     const labelIdxs = [0, 9, 17, 24, 29];
//     labelIdxs.forEach((i, li) => {
//       ctx.fillText(X_LABELS[li], xOf(i), H - PAD.bottom + 18);
//     });

//     const drawArea = (data, color) => {
//       const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + cH);
//       grad.addColorStop(0, color + "40");
//       grad.addColorStop(1, color + "00");

//       ctx.beginPath();
//       ctx.moveTo(xOf(0), yOf(data[0]));
//       for (let i = 1; i < n; i++) {
//         const x0 = xOf(i - 1),
//           y0 = yOf(data[i - 1]);
//         const x1 = xOf(i),
//           y1 = yOf(data[i]);
//         ctx.bezierCurveTo(
//           x0 + (x1 - x0) * 0.5,
//           y0,
//           x0 + (x1 - x0) * 0.5,
//           y1,
//           x1,
//           y1
//         );
//       }
//       ctx.lineTo(xOf(n - 1), PAD.top + cH);
//       ctx.lineTo(xOf(0), PAD.top + cH);
//       ctx.closePath();
//       ctx.fillStyle = grad;
//       ctx.fill();

//       ctx.beginPath();
//       ctx.moveTo(xOf(0), yOf(data[0]));
//       for (let i = 1; i < n; i++) {
//         const x0 = xOf(i - 1),
//           y0 = yOf(data[i - 1]);
//         const x1 = xOf(i),
//           y1 = yOf(data[i]);
//         ctx.bezierCurveTo(
//           x0 + (x1 - x0) * 0.5,
//           y0,
//           x0 + (x1 - x0) * 0.5,
//           y1,
//           x1,
//           y1
//         );
//       }
//       ctx.strokeStyle = color;
//       ctx.lineWidth = 2;
//       ctx.stroke();
//     };

//     if (filter === "all" || filter === "opens") drawArea(OPENS_DATA, opensColor);
//     if (filter === "all" || filter === "email") drawArea(SENDS_DATA, sendsColor);
//   }, [filter]);

//   return <canvas ref={canvasRef} style={{ width: "100%", height: "220px", display: "block" }} />;
// };

// const KpiCard = ({ label, value, delta, sub, accent }) => (
//   <div className="bg-white rounded-xl border border-slate-200 p-5 relative overflow-hidden">
//     <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: accent }} />
//     <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">{label}</p>
//     <p className="text-3xl font-bold text-slate-900 leading-none">{value}</p>
//     {delta && (
//       <div className="flex items-center gap-1.5 mt-2">
//         <span className="text-xs font-semibold text-emerald-600">↑ {delta}</span>
//         <span className="text-xs text-slate-700">vs last month</span>
//       </div>
//     )}
//     {sub && !delta && <p className="text-xs text-slate-700 mt-2">{sub}</p>}
//   </div>
// );

// export default function DashboardPage() {
//   const navigate = useNavigate();
//   const [alertVisible, setAlertVisible] = useState(true);
//   const [chartFilter, setChartFilter] = useState("all");

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
//         <div>
//           <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight">
//             {greeting()}, Subramanian 👋
//           </h1>
//           <p className="text-sm text-slate-800 mt-1">
//             Here's what's happening with your campaigns — Wednesday, 22 April 2026
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => navigate("/analytics")}
//             className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
//           >
//             📊 Reports
//           </button>
//           <button
//             onClick={() => navigate("/campaigns/new")}
//             className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
//           >
//             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//               <path d="M12 4v16m8-8H4" strokeLinecap="round" />
//             </svg>
//             New Campaign
//           </button>
//         </div>
//       </div>

//       {/* Alert */}
//       {alertVisible && (
//         <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start justify-between gap-3">
//           <div className="flex items-start gap-3">
//             <span className="text-base mt-0.5">⚠️</span>
//             <div>
//               <p className="text-sm font-bold text-amber-900">Campaign bounce rate alert</p>
//               <p className="text-sm text-amber-800 mt-0.5">
//                 "April Newsletter" has a hard bounce rate of 5.8%, above your 5% threshold.{" "}
//                 <button
//                   onClick={() => navigate("/calendar")}
//                   className="font-bold underline text-amber-900 hover:text-amber-800"
//                 >
//                   Review campaign →
//                 </button>
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => setAlertVisible(false)}
//             className="text-amber-700 hover:text-amber-900 text-lg leading-none flex-shrink-0"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* KPI Grid */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//         <KpiCard label="TOTAL SENDS (APRIL)" value="1.24M" delta="18.4%" accent="#4f46e5" />
//         <KpiCard label="AVG OPEN RATE" value="39.4%" delta="2.1%" accent="#059669" />
//         <KpiCard label="ACTIVE CAMPAIGNS" value="3" sub="2 live · 1 scheduled" accent="#0284c7" />
//         <KpiCard label="NEW CONTACTS (APRIL)" value="847" delta="12.3%" accent="#7c3aed" />
//       </div>

//       {/* Two-Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//         {/* LEFT COLUMN */}
//         <div className="space-y-5">
//           {/* Active Campaigns */}
//           <div className="bg-white rounded-xl border border-slate-200 p-5">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-sm font-bold text-slate-900">Active Campaigns</h2>
//               <button
//                 onClick={() => navigate("/campaigns")}
//                 className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
//               >
//                 View all →
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-slate-100">
//                     <th className="pb-2 text-left text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Campaign</th>
//                     <th className="pb-2 text-left text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Status</th>
//                     <th className="pb-2 text-right text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Open Rate</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ACTIVE_CAMPAIGNS.map((c) => (
//                     <tr
//                       key={c.id}
//                       onClick={() => navigate(`/campaigns/${c.id}`)}
//                       className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
//                     >
//                       <td className="py-3 pr-3">
//                         <div className="flex items-center gap-2.5">
//                           <ChannelIcon ch={c.channel} />
//                           <div>
//                             <p className="font-semibold text-slate-800 text-[13px] leading-tight">{c.name}</p>
//                             <p className="text-[11px] text-slate-600 mt-0.5">{c.sub}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-3 pr-3">
//                         <Badge status={c.status} />
//                       </td>
//                       <td className="py-3 text-right font-semibold text-emerald-600 text-[13px]">{c.openRate ?? "—"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Upcoming Scheduled Sends */}
//           <div className="bg-white rounded-xl border border-slate-200 p-5">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-sm font-bold text-slate-900">Upcoming Scheduled Sends</h2>
//               <button
//                 onClick={() => navigate("/calendar")}
//                 className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
//               >
//                 Calendar →
//               </button>
//             </div>
//             <div className="divide-y divide-slate-100">
//               {UPCOMING_SENDS.map((s, i) => (
//                 <div key={i} className="flex items-center justify-between py-3">
//                   <div className="flex items-center gap-2.5">
//                     <ChannelIcon ch={s.channel} />
//                     <div>
//                       <p className="font-semibold text-slate-800 text-[13px]">{s.name}</p>
//                       <p className="text-[11px] text-slate-600 mt-0.5">{s.sub}</p>
//                     </div>
//                   </div>
//                   <span className="text-[12px] font-semibold text-indigo-600 whitespace-nowrap ml-3">{s.date}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="space-y-5">
//           {/* Engagement Trend Chart */}
//           <div className="bg-white rounded-xl border border-slate-200 p-5">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-sm font-bold text-slate-900">Engagement Trend — Last 30 Days</h2>
//               <div className="flex gap-0.5 bg-slate-100 rounded-lg p-0.5">
//                 {[
//                   { key: "email", label: "Email" },
//                   { key: "wa", label: "WA" },
//                   { key: "all", label: "All" },
//                 ].map(({ key, label }) => (
//                   <button
//                     key={key}
//                     onClick={() => setChartFilter(key === "wa" ? "opens" : key)}
//                     className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${
//                       (chartFilter === "email" && key === "email") ||
//                       (chartFilter === "opens" && key === "wa") ||
//                       (chartFilter === "all" && key === "all")
//                         ? "bg-white text-indigo-600 shadow-sm"
//                         : "text-slate-500 hover:bg-slate-50"
//                     }`}
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <EngagementChart filter={chartFilter} />
//             <div className="flex items-center gap-5 mt-3 pt-3 border-t border-slate-100">
//               {(chartFilter === "all" || chartFilter === "email") && (
//                 <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
//                   <span className="w-3 h-3 rounded-sm bg-indigo-600" />
//                   Sends
//                 </div>
//               )}
//               {(chartFilter === "all" || chartFilter === "opens") && (
//                 <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
//                   <span className="w-3 h-3 rounded-sm bg-emerald-500" />
//                   Opens
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Recent Activity – grey timestamps changed to dark */}
//           <div className="bg-white rounded-xl border border-slate-200 p-5">
//             <h2 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h2>
//             <div className="space-y-4">
//               {RECENT_ACTIVITY.map((item, i) => (
//                 <div key={i} className="flex items-start gap-3">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${item.bg}`}>
//                     {item.icon}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-[13px] text-slate-800 leading-snug">{item.content}</p>
//                     <p className="text-[11px] text-slate-600 mt-0.5">{item.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// DashboardPage.jsx – with Wallet button near Reports
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* Mock Data (unchanged) */
const ACTIVE_CAMPAIGNS = [
  {
    id: "1",
    name: "April Newsletter",
    sub: "8,230 recipients",
    status: "sent",
    openRate: "38.7%",
    channel: "email",
  },
  {
    id: "2",
    name: "WhatsApp Flash Sale",
    sub: "3,180 recipients · Scheduled May 1",
    status: "completed",
    openRate: "68.3%",
    channel: "whatsapp",
  },
  {
    id: "3",
    name: "Re-engagement Series",
    sub: "Scheduled May 1",
    status: "scheduled",
    openRate: null,
    channel: "email",
  },
];

const UPCOMING_SENDS = [
  {
    name: "Re-engagement Series",
    sub: "5,400 recipients · Email",
    date: "May 1, 9 AM",
    channel: "email",
  },
  {
    name: "Mother's Day Promo",
    sub: "2,100 recipients · WhatsApp",
    date: "May 11, 10 AM",
    channel: "whatsapp",
  },
  {
    name: "May Product Update",
    sub: "12,800 recipients · Email",
    date: "May 15, 8 AM",
    channel: "email",
  },
  {
    name: "Q2 Launch Announcement",
    sub: "18,200 recipients · Email",
    date: "May 20, 9 AM",
    channel: "email",
  },
];

const RECENT_ACTIVITY = [
  {
    icon: "✉️",
    bg: "bg-violet-50",
    content: (
      <>
        <span className="font-bold text-slate-800">April Newsletter</span>{" "}
        sent to 8,230 contacts
      </>
    ),
    time: "2h ago",
  },
  {
    icon: "✅",
    bg: "bg-emerald-50",
    content: (
      <>
        <span className="font-bold text-slate-800">WhatsApp Flash Sale</span>{" "}
        completed — 68.3% read rate
      </>
    ),
    time: "5h ago",
  },
  {
    icon: "👥",
    bg: "bg-sky-50",
    content: (
      <>
        Imported{" "}
        <span className="font-bold text-slate-800">342 contacts</span> into
        "Active Customers"
      </>
    ),
    time: "1d ago",
  },
  {
    icon: "⏰",
    bg: "bg-amber-50",
    content: (
      <>
        <span className="font-bold text-slate-800">Re-engagement Series</span>{" "}
        scheduled for May 1
      </>
    ),
    time: "1d ago",
  },
  {
    icon: "🗂️",
    bg: "bg-violet-50",
    content: (
      <>
        New template{" "}
        <span className="font-bold text-slate-800">"Product Update May"</span>{" "}
        created
      </>
    ),
    time: "2d ago",
  },
];

// Engagement chart data
const X_LABELS = ["Mar 24", "Apr 2", "Apr 10", "Apr 18", "Apr 22"];
const SENDS_DATA = [
  420, 435, 428, 460, 470, 480, 495, 510, 505, 520, 515, 530, 540, 535, 550,
  560, 555, 570, 580, 590, 600, 615, 610, 625, 630, 640, 650, 645, 655, 660,
];
const OPENS_DATA = [
  280, 290, 285, 300, 308, 315, 325, 338, 332, 345, 340, 352, 360, 355, 368,
  375, 370, 382, 390, 400, 408, 420, 415, 428, 432, 440, 448, 445, 452, 458,
];

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

const ChannelIcon = ({ ch, size = "w-8 h-8" }) => (
  <div
    className={`${size} rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
      ch === "whatsapp" ? "bg-emerald-100" : "bg-violet-100"
    }`}
  >
    {ch === "whatsapp" ? "💬" : "✉️"}
  </div>
);

const Badge = ({ status }) => {
  const map = {
    sent: "bg-violet-50 text-violet-700",
    scheduled: "bg-blue-50 text-blue-700",
    completed: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const EngagementChart = ({ filter }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const PAD = { top: 16, right: 16, bottom: 40, left: 42 };
    const cW = W - PAD.left - PAD.right;
    const cH = H - PAD.top - PAD.bottom;

    const sendsColor = "#4F46E5";
    const opensColor = "#10B981";

    const allVals = [...SENDS_DATA, ...OPENS_DATA];
    const minV = Math.min(...allVals) * 0.92;
    const maxV = Math.max(...allVals) * 1.05;
    const n = SENDS_DATA.length;

    const xOf = (i) => PAD.left + (i / (n - 1)) * cW;
    const yOf = (v) => PAD.top + cH - ((v - minV) / (maxV - minV)) * cH;

    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;
    [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
      const y = PAD.top + cH * t;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + cW, y);
      ctx.stroke();
    });

    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "right";
    [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
      const v = Math.round(maxV - t * (maxV - minV));
      ctx.fillText(v, PAD.left - 6, PAD.top + cH * t + 4);
    });

    ctx.textAlign = "center";
    const labelIdxs = [0, 9, 17, 24, 29];
    labelIdxs.forEach((i, li) => {
      ctx.fillText(X_LABELS[li], xOf(i), H - PAD.bottom + 18);
    });

    const drawArea = (data, color) => {
      const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + cH);
      grad.addColorStop(0, color + "40");
      grad.addColorStop(1, color + "00");

      ctx.beginPath();
      ctx.moveTo(xOf(0), yOf(data[0]));
      for (let i = 1; i < n; i++) {
        const x0 = xOf(i - 1),
          y0 = yOf(data[i - 1]);
        const x1 = xOf(i),
          y1 = yOf(data[i]);
        ctx.bezierCurveTo(
          x0 + (x1 - x0) * 0.5,
          y0,
          x0 + (x1 - x0) * 0.5,
          y1,
          x1,
          y1
        );
      }
      ctx.lineTo(xOf(n - 1), PAD.top + cH);
      ctx.lineTo(xOf(0), PAD.top + cH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xOf(0), yOf(data[0]));
      for (let i = 1; i < n; i++) {
        const x0 = xOf(i - 1),
          y0 = yOf(data[i - 1]);
        const x1 = xOf(i),
          y1 = yOf(data[i]);
        ctx.bezierCurveTo(
          x0 + (x1 - x0) * 0.5,
          y0,
          x0 + (x1 - x0) * 0.5,
          y1,
          x1,
          y1
        );
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    if (filter === "all" || filter === "opens") drawArea(OPENS_DATA, opensColor);
    if (filter === "all" || filter === "email") drawArea(SENDS_DATA, sendsColor);
  }, [filter]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "220px", display: "block" }} />;
};

const KpiCard = ({ label, value, delta, sub, accent }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: accent }} />
    <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">{label}</p>
    <p className="text-3xl font-bold text-slate-900 leading-none">{value}</p>
    {delta && (
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-xs font-semibold text-emerald-600">↑ {delta}</span>
        <span className="text-xs text-slate-700">vs last month</span>
      </div>
    )}
    {sub && !delta && <p className="text-xs text-slate-700 mt-2">{sub}</p>}
  </div>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(true);
  const [chartFilter, setChartFilter] = useState("all");
  const [messageCredits, setMessageCredits] = useState(0);

  // Read wallet message credits from localStorage
  useEffect(() => {
    const credits = localStorage.getItem("wallet_message_credits");
    if (credits) setMessageCredits(parseInt(credits));
    else setMessageCredits(0);

    // Listen for wallet updates (e.g., after buying credits)
    const handleWalletUpdate = (event) => {
      if (event.detail && event.detail.messageCredits !== undefined) {
        setMessageCredits(event.detail.messageCredits);
      }
    };
    window.addEventListener("walletUpdate", handleWalletUpdate);
    return () => window.removeEventListener("walletUpdate", handleWalletUpdate);
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight">
            {greeting()}, Subramanian 👋
          </h1>
          <p className="text-sm text-slate-800 mt-1">
            Here's what's happening with your campaigns — Wednesday, 22 April 2026
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/analytics")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            📊 Reports
          </button>

          {/* ✅ New Wallet Button (near Reports) */}
          <button
            onClick={() => navigate("/billing")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            💰 Wallet
            {messageCredits > 0 && (
              <span className="ml-1 text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">
                {messageCredits.toLocaleString()} credits
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/campaigns/new")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 4v16m8-8H4" strokeLinecap="round" />
            </svg>
            New Campaign
          </button>
        </div>
      </div>

      {/* Alert (unchanged) */}
      {alertVisible && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-base mt-0.5">⚠️</span>
            <div>
              <p className="text-sm font-bold text-amber-900">Campaign bounce rate alert</p>
              <p className="text-sm text-amber-800 mt-0.5">
                "April Newsletter" has a hard bounce rate of 5.8%, above your 5% threshold.{" "}
                <button
                  onClick={() => navigate("/calendar")}
                  className="font-bold underline text-amber-900 hover:text-amber-800"
                >
                  Review campaign →
                </button>
              </p>
            </div>
          </div>
          <button
            onClick={() => setAlertVisible(false)}
            className="text-amber-700 hover:text-amber-900 text-lg leading-none flex-shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Grid (unchanged) */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard label="TOTAL SENDS (APRIL)" value="1.24M" delta="18.4%" accent="#4f46e5" />
        <KpiCard label="AVG OPEN RATE" value="39.4%" delta="2.1%" accent="#059669" />
        <KpiCard label="ACTIVE CAMPAIGNS" value="3" sub="2 live · 1 scheduled" accent="#0284c7" />
        <KpiCard label="NEW CONTACTS (APRIL)" value="847" delta="12.3%" accent="#7c3aed" />
      </div>

      {/* Two-Column Layout (unchanged) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Active Campaigns */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Active Campaigns</h2>
              <button
                onClick={() => navigate("/campaigns")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-left text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Campaign</th>
                    <th className="pb-2 text-left text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Status</th>
                    <th className="pb-2 text-right text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Open Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {ACTIVE_CAMPAIGNS.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => navigate(`/campaigns/${c.id}`)}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2.5">
                          <ChannelIcon ch={c.channel} />
                          <div>
                            <p className="font-semibold text-slate-800 text-[13px] leading-tight">{c.name}</p>
                            <p className="text-[11px] text-slate-600 mt-0.5">{c.sub}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3">
                        <Badge status={c.status} />
                      </td>
                      <td className="py-3 text-right font-semibold text-emerald-600 text-[13px]">{c.openRate ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Scheduled Sends */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Upcoming Scheduled Sends</h2>
              <button
                onClick={() => navigate("/calendar")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Calendar →
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {UPCOMING_SENDS.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5">
                    <ChannelIcon ch={s.channel} />
                    <div>
                      <p className="font-semibold text-slate-800 text-[13px]">{s.name}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{s.sub}</p>
                    </div>
                  </div>
                  <span className="text-[12px] font-semibold text-indigo-600 whitespace-nowrap ml-3">{s.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* Engagement Trend Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Engagement Trend — Last 30 Days</h2>
              <div className="flex gap-0.5 bg-slate-100 rounded-lg p-0.5">
                {[
                  { key: "email", label: "Email" },
                  { key: "wa", label: "WA" },
                  { key: "all", label: "All" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setChartFilter(key === "wa" ? "opens" : key)}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                      (chartFilter === "email" && key === "email") ||
                      (chartFilter === "opens" && key === "wa") ||
                      (chartFilter === "all" && key === "all")
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <EngagementChart filter={chartFilter} />
            <div className="flex items-center gap-5 mt-3 pt-3 border-t border-slate-100">
              {(chartFilter === "all" || chartFilter === "email") && (
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <span className="w-3 h-3 rounded-sm bg-indigo-600" />
                  Sends
                </div>
              )}
              {(chartFilter === "all" || chartFilter === "opens") && (
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                  Opens
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${item.bg}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-slate-800 leading-snug">{item.content}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}