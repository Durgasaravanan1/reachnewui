

// // AnalyticsPage.jsx – Complete working model matching the screenshot
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   subDays,
//   format,
//   eachDayOfInterval,
//   startOfDay,
//   endOfDay,
//   isWithinInterval,
// } from 'date-fns';

// // ===================== Mock Data (based on screenshot) =====================
// const generateMockOverview = (periodDays) => {
//   const is30Day = periodDays === 30;
  
//   return {
//     totalSent: is30Day ? 1240000 : 3580000,
//     totalSentDelta: is30Day ? 18.4 : 22.1,
//     avgDeliveryRate: is30Day ? 94.8 : 95.2,
//     avgDeliveryRateDelta: is30Day ? 0.9 : 1.2,
//     avgOpenRate: is30Day ? 39.4 : 41.2,
//     avgOpenRateDelta: is30Day ? 2.1 : 3.4,
//     avgClickRate: is30Day ? 8.2 : 9.1,
//     avgClickRateDelta: is30Day ? -0.4 : -0.2,
//     emailSent: is30Day ? 1060000 : 3050000,
//     whatsappSent: is30Day ? 180000 : 530000,
//     emailAvgOpenRate: is30Day ? 39.4 : 41.0,
//     whatsappAvgReadRate: is30Day ? 64.2 : 66.5,
//     whatsappAvgCtr: is30Day ? 21.3 : 22.8,
//   };
// };

// const generateMockTrendData = (periodDays) => {
//   const data = [];
//   const today = new Date();
//   const startDate = subDays(today, periodDays - 1);
  
//   for (let i = 0; i < periodDays; i++) {
//     const date = subDays(today, periodDays - 1 - i);
//     // Generate realistic looking data with some pattern
//     const dayOfWeek = date.getDay();
//     const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
//     const baseSent = periodDays === 30 ? 35000 : 32000;
//     const variation = Math.sin(i * 0.5) * 8000;
//     const weekendFactor = isWeekend ? 0.6 : 1;
//     const sent = Math.floor((baseSent + variation) * weekendFactor);
//     const opens = Math.floor(sent * (0.35 + Math.random() * 0.08));
//     const clicks = Math.floor(opens * (0.18 + Math.random() * 0.05));
    
//     data.push({
//       date: format(date, 'MMM dd'),
//       fullDate: date,
//       sent,
//       opens,
//       clicks,
//     });
//   }
//   return data;
// };

// const generateMockCampaigns = () => {
//   return [
//     {
//       id: '1',
//       campaignName: 'Q2 Product Launch',
//       channel: 'email',
//       sent: 12450,
//       delivered: 11840,
//       deliveryRate: 95.1,
//       openRate: 41.2,
//       ctr: 8.4,
//       bounce: 1.8,
//       unsubs: 0.4,
//       date: '2026-04-15',
//     },
//     {
//       id: '2',
//       campaignName: 'April Newsletter',
//       channel: 'email',
//       sent: 8230,
//       delivered: 7754,
//       deliveryRate: 94.2,
//       openRate: 38.7,
//       ctr: 7.1,
//       bounce: 5.8,
//       unsubs: 0.5,
//       date: '2026-04-22',
//     },
//     {
//       id: '3',
//       campaignName: 'WhatsApp Flash Sale',
//       channel: 'whatsapp',
//       sent: 3180,
//       delivered: 3092,
//       deliveryRate: 97.2,
//       openRate: 68.3,
//       ctr: 22.4,
//       bounce: 0.8,
//       unsubs: 0.1,
//       date: '2026-04-19',
//     },
//     {
//       id: '4',
//       campaignName: 'March Product Digest',
//       channel: 'email',
//       sent: 10820,
//       delivered: 10240,
//       deliveryRate: 94.6,
//       openRate: 36.4,
//       ctr: 6.8,
//       bounce: 2.1,
//       unsubs: 0.6,
//       date: '2026-03-25',
//     },
//     {
//       id: '5',
//       campaignName: 'VIP Exclusive Offer',
//       channel: 'email',
//       sent: 5670,
//       delivered: 5520,
//       deliveryRate: 97.4,
//       openRate: 52.3,
//       ctr: 12.7,
//       bounce: 1.2,
//       unsubs: 0.3,
//       date: '2026-04-10',
//     },
//     {
//       id: '6',
//       campaignName: 'Customer Feedback Survey',
//       channel: 'whatsapp',
//       sent: 2450,
//       delivered: 2410,
//       deliveryRate: 98.4,
//       openRate: 71.2,
//       ctr: 18.9,
//       bounce: 0.5,
//       unsubs: 0.2,
//       date: '2026-04-05',
//     },
//   ];
// };

// // ===================== Custom Hook =====================
// const useAnalyticsData = (period) => {
//   const [overview, setOverview] = useState(null);
//   const [trendData, setTrendData] = useState([]);
//   const [campaigns, setCampaigns] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const isMountedRef = useRef(true);

//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => { isMountedRef.current = false; };
//   }, []);

//   const fetchData = useCallback(() => {
//     if (!isMountedRef.current) return;
//     setIsLoading(true);
    
//     const periodDays = parseInt(period, 10);
//     console.log(`[Analytics] Fetching data for period: ${periodDays} days`);
    
//     // Simulate API delay
//     setTimeout(() => {
//       if (!isMountedRef.current) return;
      
//       const overviewData = generateMockOverview(periodDays);
//       const trendData = generateMockTrendData(periodDays);
//       const campaignsData = generateMockCampaigns();
      
//       console.log(`[Analytics] Data loaded:`, {
//         totalSent: overviewData.totalSent,
//         campaignsCount: campaignsData.length,
//         trendPoints: trendData.length,
//       });
      
//       setOverview(overviewData);
//       setTrendData(trendData);
//       setCampaigns(campaignsData);
//       setIsLoading(false);
//     }, 600);
//   }, [period]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { overview, trendData, campaigns, isLoading };
// };

// // ===================== Utility Functions =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => {
//   if (num === undefined || num === null) return '—';
//   if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//   if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
//   return num.toLocaleString();
// };
// const formatPercent = (value) => {
//   if (value === undefined || value === null) return '—';
//   return `${value.toFixed(1)}%`;
// };

// // ===================== Icons (SVG) =====================
// const DownloadIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" />
//   </svg>
// );

// const ChevronUpIcon = () => (
//   <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
//   </svg>
// );

// const ChevronDownIcon = () => (
//   <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick, disabled, loading }) => {
//   const base = "inline-flex items-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//   };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, "px-3 py-2 text-sm")}>
//       {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const PeriodTabs = ({ period, setPeriod }) => {
//   const tabs = [
//     { label: 'Last 30 days', value: '30' },
//     { label: 'Last 90 days', value: '90' },
//   ];
  
//   return (
//     <div className="flex bg-slate-100 p-1 rounded-lg">
//       {tabs.map((tab) => (
//         <button
//           key={tab.value}
//           onClick={() => {
//             console.log(`[Analytics] Period changed to: ${tab.label}`);
//             setPeriod(tab.value);
//           }}
//           className={cn(
//             "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
//             period === tab.value
//               ? "bg-white text-slate-900 shadow-sm"
//               : "text-slate-500 hover:text-slate-700"
//           )}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// const KpiCard = ({ label, value, delta, subtitle }) => {
//   const isPositive = delta >= 0;
  
//   return (
//     <div className="bg-white rounded-xl border border-slate-200 p-5 transition-all hover:shadow-md">
//       <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">{label}</p>
//       <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
//       {delta !== undefined && delta !== null && (
//         <div className={cn(
//           "flex items-center gap-1 mt-2 text-xs font-semibold",
//           isPositive ? "text-emerald-600" : "text-red-500"
//         )}>
//           {isPositive ? <ChevronUpIcon /> : <ChevronDownIcon />}
//           <span>{Math.abs(delta)}% vs prev period</span>
//         </div>
//       )}
//       {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
//     </div>
//   );
// };

// const TrendChart = ({ data, isLoading }) => {
//   const [tooltip, setTooltip] = useState(null);
//   const chartRef = useRef(null);
  
//   if (isLoading) {
//     return (
//       <div className="h-64 flex items-center justify-center">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-48 w-full bg-slate-100 rounded-lg mb-2"></div>
//           <div className="h-4 w-32 bg-slate-100 rounded"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (!data.length) {
//     return <div className="h-64 flex items-center justify-center text-slate-400">No data available</div>;
//   }
  
//   const maxSent = Math.max(...data.map(d => d.sent), 1);
//   const maxOpens = Math.max(...data.map(d => d.opens), 1);
//   const maxValue = Math.max(maxSent, maxOpens);
//   const height = 200;
//   const width = 700;
  
//   const getSentPoints = () => {
//     return data.map((d, i) => {
//       const x = (i / (data.length - 1)) * width;
//       const y = height - (d.sent / maxValue) * height;
//       return `${x},${y}`;
//     }).join(' ');
//   };
  
//   const getOpensPoints = () => {
//     return data.map((d, i) => {
//       const x = (i / (data.length - 1)) * width;
//       const y = height - (d.opens / maxValue) * height;
//       return `${x},${y}`;
//     }).join(' ');
//   };
  
//   const getSentArea = () => {
//     const points = data.map((d, i) => {
//       const x = (i / (data.length - 1)) * width;
//       const y = height - (d.sent / maxValue) * height;
//       return `${x},${y}`;
//     }).join(' ');
//     return `${points} ${width},${height} 0,${height}`;
//   };
  
//   return (
//     <div className="relative" ref={chartRef}>
//       <svg viewBox={`0 0 ${width} ${height + 40}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
//         {/* Y-axis grid lines */}
//         {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
//           const y = height - (ratio * height);
//           const value = Math.round(maxValue * ratio);
//           return (
//             <g key={idx}>
//               <line x1="0" y1={y} x2={width} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
//               <text x={-5} y={y + 3} textAnchor="end" fontSize="10" fill="#94a3b8">{formatNumber(value)}</text>
//             </g>
//           );
//         })}
        
//         {/* Sent Area Fill */}
//         <polygon
//           fill="url(#sentGradient)"
//           points={getSentArea()}
//           opacity="0.3"
//         />
        
//         {/* Sent Line */}
//         <polyline
//           fill="none"
//           stroke="#4F46E5"
//           strokeWidth="2.5"
//           points={getSentPoints()}
//           className="transition-all"
//         />
        
//         {/* Opens Line */}
//         <polyline
//           fill="none"
//           stroke="#059669"
//           strokeWidth="2.5"
//           points={getOpensPoints()}
//           className="transition-all"
//         />
        
//         {/* Data points - Sent */}
//         {data.map((d, i) => {
//           const x = (i / (data.length - 1)) * width;
//           const y = height - (d.sent / maxValue) * height;
//           return (
//             <circle
//               key={`sent-${i}`}
//               cx={x}
//               cy={y}
//               r="3"
//               fill="#4F46E5"
//               stroke="white"
//               strokeWidth="1.5"
//               className="cursor-pointer hover:r-4 transition-all"
//               onMouseEnter={() => setTooltip({ x, y, data: d, type: 'sent' })}
//               onMouseLeave={() => setTooltip(null)}
//             />
//           );
//         })}
        
//         {/* Data points - Opens */}
//         {data.map((d, i) => {
//           const x = (i / (data.length - 1)) * width;
//           const y = height - (d.opens / maxValue) * height;
//           return (
//             <circle
//               key={`opens-${i}`}
//               cx={x}
//               cy={y}
//               r="3"
//               fill="#059669"
//               stroke="white"
//               strokeWidth="1.5"
//               className="cursor-pointer hover:r-4 transition-all"
//               onMouseEnter={() => setTooltip({ x, y, data: d, type: 'opens' })}
//               onMouseLeave={() => setTooltip(null)}
//             />
//           );
//         })}
        
//         {/* X-axis labels */}
//         {data.map((d, i) => {
//           const x = (i / (data.length - 1)) * width;
//           if (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) {
//             return (
//               <text key={i} x={x} y={height + 15} textAnchor="middle" fontSize="10" fill="#94a3b8">
//                 {d.date}
//               </text>
//             );
//           }
//           return null;
//         })}
        
//         <defs>
//           <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
//             <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
//           </linearGradient>
//         </defs>
//       </svg>
      
//       {/* Tooltip */}
//       {tooltip && (
//         <div
//           className="absolute bg-white border border-slate-200 rounded-lg shadow-lg p-2 text-xs z-10 pointer-events-none"
//           style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}
//         >
//           <p className="font-semibold text-slate-800">{tooltip.data.date}</p>
//           <p className="text-indigo-600">Sends: {formatNumber(tooltip.data.sent)}</p>
//           <p className="text-emerald-600">Opens: {formatNumber(tooltip.data.opens)}</p>
//         </div>
//       )}
      
//       {/* Legend */}
//       <div className="flex justify-center gap-6 mt-4">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
//           <span className="text-xs text-slate-600">Sends</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
//           <span className="text-xs text-slate-600">Opens</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CampaignTable = ({ campaigns, isLoading, onExport }) => {
//   if (isLoading) {
//     return (
//       <div className="animate-pulse">
//         <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
//           <div className="h-4 bg-slate-200 rounded w-32"></div>
//         </div>
//         {[1, 2, 3, 4].map(i => (
//           <div key={i} className="flex px-4 py-3 border-b border-slate-100 gap-4">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map(j => (
//               <div key={j} className="h-4 bg-slate-100 rounded w-20"></div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }
  
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-slate-100 bg-slate-50">
//             {['CAMPAIGN', 'CHANNEL', 'SENT', 'DELIVERED', 'OPEN RATE', 'CTR', 'BOUNCE', 'UNSUBS'].map((header) => (
//               <th key={header} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-100">
//           {campaigns.map((campaign) => (
//             <tr key={campaign.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
//               <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
//                 {campaign.campaignName}
//               </td>
//               <td className="px-4 py-3">
//                 <span className={cn(
//                   "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
//                   campaign.channel === 'email' 
//                     ? "bg-indigo-50 text-indigo-700" 
//                     : "bg-emerald-50 text-emerald-700"
//                 )}>
//                   {campaign.channel === 'email' ? 'Email' : 'WhatsApp'}
//                 </span>
//               </td>
//               <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
//                 {formatNumber(campaign.sent)}
//               </td>
//               <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
//                 {formatNumber(campaign.delivered)} ({campaign.deliveryRate}%)
//               </td>
//               <td className="px-4 py-3 font-semibold text-emerald-600 whitespace-nowrap">
//                 {campaign.openRate}%
//               </td>
//               <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
//                 {campaign.ctr}%
//               </td>
//               <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
//                 {campaign.bounce}%
//               </td>
//               <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
//                 {campaign.unsubs}%
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // ===================== Main AnalyticsPage Component =====================
// export default function AnalyticsPage() {
//   const [period, setPeriod] = useState('30');
//   const { overview, trendData, campaigns, isLoading } = useAnalyticsData(period);

//   // Log component state
//   useEffect(() => {
//     console.log(`[AnalyticsPage] Rendering with period: ${period} days, isLoading: ${isLoading}`);
//     if (overview) {
//       console.log(`[AnalyticsPage] Overview data:`, overview);
//     }
//   }, [period, isLoading, overview]);

//   const handleExport = () => {
//     console.log('[AnalyticsPage] Export clicked - would export analytics data');
//     alert('Export analytics data (Demo action)');
//   };

//   const hardBounces = 1340;
//   const unsubscribes = 892;

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="max-w-[1400px] mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
//             <p className="text-sm text-slate-500 mt-1">Workspace-level performance across all campaigns</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <PeriodTabs period={period} setPeriod={setPeriod} />
//             <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
//               Export
//             </Button>
//           </div>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <KpiCard
//             label="TOTAL SENT"
//             value={formatNumber(overview?.totalSent)}
//             delta={overview?.totalSentDelta}
//           />
//           <KpiCard
//             label="AVG DELIVERY RATE"
//             value={formatPercent(overview?.avgDeliveryRate)}
//             delta={overview?.avgDeliveryRateDelta}
//           />
//           <KpiCard
//             label="AVG OPEN RATE"
//             value={formatPercent(overview?.avgOpenRate)}
//             delta={overview?.avgOpenRateDelta}
//           />
//           <KpiCard
//             label="AVG CLICK RATE"
//             value={formatPercent(overview?.avgClickRate)}
//             delta={overview?.avgClickRateDelta}
//           />
//         </div>

//         {/* Trend Chart and Channel Breakdown */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//           {/* Trend Chart */}
//           <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
//             <h3 className="text-sm font-bold text-slate-900 mb-4">
//               Sends & Opens — Last {period} Days
//             </h3>
//             <TrendChart data={trendData} isLoading={isLoading} />
//           </div>

//           {/* Channel Breakdown */}
//           <div className="bg-white rounded-xl border border-slate-200 p-5">
//             <h3 className="text-sm font-bold text-slate-900 mb-4">Channel Breakdown</h3>
            
//             {isLoading ? (
//               <div className="space-y-4">
//                 <div className="animate-pulse">
//                   <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
//                   <div className="h-2 bg-slate-200 rounded w-full"></div>
//                 </div>
//                 <div className="animate-pulse">
//                   <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
//                   <div className="h-2 bg-slate-200 rounded w-full"></div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {/* Email Campaigns */}
//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-sm font-semibold text-slate-700">✉️ Email Campaigns</span>
//                     <span className="text-sm font-bold text-slate-800">{formatNumber(overview?.emailSent)}</span>
//                   </div>
//                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-indigo-500 rounded-full transition-all"
//                       style={{ width: `${(overview?.emailSent / overview?.totalSent) * 100}%` }}
//                     />
//                   </div>
//                   <div className="flex justify-between mt-2 text-xs text-slate-500">
//                     <span>Avg Open: {formatPercent(overview?.emailAvgOpenRate)}</span>
//                     <span>CTR: {formatPercent(overview?.avgClickRate)}</span>
//                   </div>
//                 </div>

//                 {/* WhatsApp Campaigns */}
//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-sm font-semibold text-slate-700">💬 WhatsApp</span>
//                     <span className="text-sm font-bold text-slate-800">{formatNumber(overview?.whatsappSent)}</span>
//                   </div>
//                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-emerald-500 rounded-full transition-all"
//                       style={{ width: `${(overview?.whatsappSent / overview?.totalSent) * 100}%` }}
//                     />
//                   </div>
//                   <div className="flex justify-between mt-2 text-xs text-slate-500">
//                     <span>Avg Read: {formatPercent(overview?.whatsappAvgReadRate)}</span>
//                     <span>CTR: {formatPercent(overview?.whatsappAvgCtr)}</span>
//                   </div>
//                 </div>

//                 {/* Additional Metrics */}
//                 <div className="pt-4 border-t border-slate-100">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-600">Hard Bounces</span>
//                     <span className="font-semibold text-red-600">{hardBounces.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-sm mt-2">
//                     <span className="text-slate-600">Unsubscribes</span>
//                     <span className="font-semibold text-amber-600">{unsubscribes.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Campaign Performance Table */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
//           <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
//             <h3 className="text-sm font-bold text-slate-900">Campaign Performance</h3>
//             <Button variant="secondary" size="sm" leftIcon={<DownloadIcon />} onClick={handleExport}>
//               Export
//             </Button>
//           </div>
//           <CampaignTable campaigns={campaigns} isLoading={isLoading} onExport={handleExport} />
//         </div>
//       </div>
//     </div>
//   );
// }



// AnalyticsPage.jsx – Complete working model with working Export
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  subDays,
  format,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from 'date-fns';

// ===================== Mock Data (based on screenshot) =====================
const generateMockOverview = (periodDays) => {
  const is30Day = periodDays === 30;
  
  return {
    totalSent: is30Day ? 1240000 : 3580000,
    totalSentDelta: is30Day ? 18.4 : 22.1,
    avgDeliveryRate: is30Day ? 94.8 : 95.2,
    avgDeliveryRateDelta: is30Day ? 0.9 : 1.2,
    avgOpenRate: is30Day ? 39.4 : 41.2,
    avgOpenRateDelta: is30Day ? 2.1 : 3.4,
    avgClickRate: is30Day ? 8.2 : 9.1,
    avgClickRateDelta: is30Day ? -0.4 : -0.2,
    emailSent: is30Day ? 1060000 : 3050000,
    whatsappSent: is30Day ? 180000 : 530000,
    emailAvgOpenRate: is30Day ? 39.4 : 41.0,
    whatsappAvgReadRate: is30Day ? 64.2 : 66.5,
    whatsappAvgCtr: is30Day ? 21.3 : 22.8,
  };
};

const generateMockTrendData = (periodDays) => {
  const data = [];
  const today = new Date();
  const startDate = subDays(today, periodDays - 1);
  
  for (let i = 0; i < periodDays; i++) {
    const date = subDays(today, periodDays - 1 - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseSent = periodDays === 30 ? 35000 : 32000;
    const variation = Math.sin(i * 0.5) * 8000;
    const weekendFactor = isWeekend ? 0.6 : 1;
    const sent = Math.floor((baseSent + variation) * weekendFactor);
    const opens = Math.floor(sent * (0.35 + Math.random() * 0.08));
    const clicks = Math.floor(opens * (0.18 + Math.random() * 0.05));
    
    data.push({
      date: format(date, 'MMM dd'),
      fullDate: date,
      sent,
      opens,
      clicks,
    });
  }
  return data;
};

const generateMockCampaigns = () => {
  return [
    {
      id: '1',
      campaignName: 'Q2 Product Launch',
      channel: 'email',
      sent: 12450,
      delivered: 11840,
      deliveryRate: 95.1,
      openRate: 41.2,
      ctr: 8.4,
      bounce: 1.8,
      unsubs: 0.4,
      date: '2026-04-15',
    },
    {
      id: '2',
      campaignName: 'April Newsletter',
      channel: 'email',
      sent: 8230,
      delivered: 7754,
      deliveryRate: 94.2,
      openRate: 38.7,
      ctr: 7.1,
      bounce: 5.8,
      unsubs: 0.5,
      date: '2026-04-22',
    },
    {
      id: '3',
      campaignName: 'WhatsApp Flash Sale',
      channel: 'whatsapp',
      sent: 3180,
      delivered: 3092,
      deliveryRate: 97.2,
      openRate: 68.3,
      ctr: 22.4,
      bounce: 0.8,
      unsubs: 0.1,
      date: '2026-04-19',
    },
    {
      id: '4',
      campaignName: 'March Product Digest',
      channel: 'email',
      sent: 10820,
      delivered: 10240,
      deliveryRate: 94.6,
      openRate: 36.4,
      ctr: 6.8,
      bounce: 2.1,
      unsubs: 0.6,
      date: '2026-03-25',
    },
    {
      id: '5',
      campaignName: 'VIP Exclusive Offer',
      channel: 'email',
      sent: 5670,
      delivered: 5520,
      deliveryRate: 97.4,
      openRate: 52.3,
      ctr: 12.7,
      bounce: 1.2,
      unsubs: 0.3,
      date: '2026-04-10',
    },
    {
      id: '6',
      campaignName: 'Customer Feedback Survey',
      channel: 'whatsapp',
      sent: 2450,
      delivered: 2410,
      deliveryRate: 98.4,
      openRate: 71.2,
      ctr: 18.9,
      bounce: 0.5,
      unsubs: 0.2,
      date: '2026-04-05',
    },
  ];
};

// ===================== Custom Hook =====================
const useAnalyticsData = (period) => {
  const [overview, setOverview] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const fetchData = useCallback(() => {
    if (!isMountedRef.current) return;
    setIsLoading(true);
    
    const periodDays = parseInt(period, 10);
    console.log(`[Analytics] Fetching data for period: ${periodDays} days`);
    
    // Simulate API delay
    setTimeout(() => {
      if (!isMountedRef.current) return;
      
      const overviewData = generateMockOverview(periodDays);
      const trendData = generateMockTrendData(periodDays);
      const campaignsData = generateMockCampaigns();
      
      setOverview(overviewData);
      setTrendData(trendData);
      setCampaigns(campaignsData);
      setIsLoading(false);
    }, 600);
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { overview, trendData, campaigns, isLoading };
};

// ===================== Utility Functions =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => {
  if (num === undefined || num === null) return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toLocaleString();
};
const formatPercent = (value) => {
  if (value === undefined || value === null) return '—';
  return `${value.toFixed(1)}%`;
};

// ===================== Icons (SVG) =====================
const DownloadIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-3-3m3 3l3-3" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ===================== UI Components =====================
const Button = ({ children, variant, leftIcon, onClick, disabled, loading }) => {
  const base = "inline-flex items-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
  };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, "px-3 py-2 text-sm")}>
      {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const PeriodTabs = ({ period, setPeriod }) => {
  const tabs = [
    { label: 'Last 30 days', value: '30' },
    { label: 'Last 90 days', value: '90' },
  ];
  
  return (
    <div className="flex bg-slate-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => {
            console.log(`[Analytics] Period changed to: ${tab.label}`);
            setPeriod(tab.value);
          }}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            period === tab.value
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const KpiCard = ({ label, value, delta, subtitle }) => {
  const isPositive = delta >= 0;
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 transition-all hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">{label}</p>
      <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      {delta !== undefined && delta !== null && (
        <div className={cn(
          "flex items-center gap-1 mt-2 text-xs font-semibold",
          isPositive ? "text-emerald-600" : "text-red-500"
        )}>
          {isPositive ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <span>{Math.abs(delta)}% vs prev period</span>
        </div>
      )}
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
};

const TrendChart = ({ data, isLoading }) => {
  const [tooltip, setTooltip] = useState(null);
  const chartRef = useRef(null);
  
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-48 w-full bg-slate-100 rounded-lg mb-2"></div>
          <div className="h-4 w-32 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!data.length) {
    return <div className="h-64 flex items-center justify-center text-slate-400">No data available</div>;
  }
  
  const maxSent = Math.max(...data.map(d => d.sent), 1);
  const maxOpens = Math.max(...data.map(d => d.opens), 1);
  const maxValue = Math.max(maxSent, maxOpens);
  const height = 200;
  const width = 700;
  
  const getSentPoints = () => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d.sent / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
  };
  
  const getOpensPoints = () => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d.opens / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
  };
  
  const getSentArea = () => {
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d.sent / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    return `${points} ${width},${height} 0,${height}`;
  };
  
  return (
    <div className="relative" ref={chartRef}>
      <svg viewBox={`0 0 ${width} ${height + 40}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Y-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = height - (ratio * height);
          const value = Math.round(maxValue * ratio);
          return (
            <g key={idx}>
              <line x1="0" y1={y} x2={width} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
              <text x={-5} y={y + 3} textAnchor="end" fontSize="10" fill="#94a3b8">{formatNumber(value)}</text>
            </g>
          );
        })}
        
        {/* Sent Area Fill */}
        <polygon
          fill="url(#sentGradient)"
          points={getSentArea()}
          opacity="0.3"
        />
        
        {/* Sent Line */}
        <polyline
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2.5"
          points={getSentPoints()}
          className="transition-all"
        />
        
        {/* Opens Line */}
        <polyline
          fill="none"
          stroke="#059669"
          strokeWidth="2.5"
          points={getOpensPoints()}
          className="transition-all"
        />
        
        {/* Data points - Sent */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - (d.sent / maxValue) * height;
          return (
            <circle
              key={`sent-${i}`}
              cx={x}
              cy={y}
              r="3"
              fill="#4F46E5"
              stroke="white"
              strokeWidth="1.5"
              className="cursor-pointer hover:r-4 transition-all"
              onMouseEnter={() => setTooltip({ x, y, data: d, type: 'sent' })}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
        
        {/* Data points - Opens */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - (d.opens / maxValue) * height;
          return (
            <circle
              key={`opens-${i}`}
              cx={x}
              cy={y}
              r="3"
              fill="#059669"
              stroke="white"
              strokeWidth="1.5"
              className="cursor-pointer hover:r-4 transition-all"
              onMouseEnter={() => setTooltip({ x, y, data: d, type: 'opens' })}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
        
        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          if (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) {
            return (
              <text key={i} x={x} y={height + 15} textAnchor="middle" fontSize="10" fill="#94a3b8">
                {d.date}
              </text>
            );
          }
          return null;
        })}
        
        <defs>
          <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-white border border-slate-200 rounded-lg shadow-lg p-2 text-xs z-10 pointer-events-none"
          style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}
        >
          <p className="font-semibold text-slate-800">{tooltip.data.date}</p>
          <p className="text-indigo-600">Sends: {formatNumber(tooltip.data.sent)}</p>
          <p className="text-emerald-600">Opens: {formatNumber(tooltip.data.opens)}</p>
        </div>
      )}
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <span className="text-xs text-slate-600">Sends</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-xs text-slate-600">Opens</span>
        </div>
      </div>
    </div>
  );
};

const CampaignTable = ({ campaigns, isLoading, onExport }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex px-4 py-3 border-b border-slate-100 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(j => (
              <div key={j} className="h-4 bg-slate-100 rounded w-20"></div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {['CAMPAIGN', 'CHANNEL', 'SENT', 'DELIVERED', 'OPEN RATE', 'CTR', 'BOUNCE', 'UNSUBS'].map((header) => (
              <th key={header} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
              <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                {campaign.campaignName}
              </td>
              <td className="px-4 py-3">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                  campaign.channel === 'email' 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "bg-emerald-50 text-emerald-700"
                )}>
                  {campaign.channel === 'email' ? 'Email' : 'WhatsApp'}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {formatNumber(campaign.sent)}
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {formatNumber(campaign.delivered)} ({campaign.deliveryRate}%)
              </td>
              <td className="px-4 py-3 font-semibold text-emerald-600 whitespace-nowrap">
                {campaign.openRate}%
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {campaign.ctr}%
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {campaign.bounce}%
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                {campaign.unsubs}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ===================== Main AnalyticsPage Component =====================
export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30');
  const { overview, trendData, campaigns, isLoading } = useAnalyticsData(period);

  // Log component state
  useEffect(() => {
    console.log(`[AnalyticsPage] Rendering with period: ${period} days, isLoading: ${isLoading}`);
    if (overview) {
      console.log(`[AnalyticsPage] Overview data:`, overview);
    }
  }, [period, isLoading, overview]);

  // ✅ Working Export Handler – exports campaign performance table as CSV
  const handleExport = () => {
    if (isLoading) {
      alert('Data is still loading, please wait...');
      return;
    }
    
    if (!campaigns.length) {
      alert('No data to export');
      return;
    }
    
    console.log('[AnalyticsPage] Exporting campaign data to CSV...');
    
    // Define CSV headers (matching the table)
    const headers = [
      'Campaign Name',
      'Channel',
      'Sent',
      'Delivered',
      'Delivery Rate (%)',
      'Open Rate (%)',
      'CTR (%)',
      'Bounce Rate (%)',
      'Unsubscribes (%)',
    ];
    
    // Transform campaign data into rows
    const rows = campaigns.map(campaign => [
      campaign.campaignName,
      campaign.channel === 'email' ? 'Email' : 'WhatsApp',
      campaign.sent,
      campaign.delivered,
      campaign.deliveryRate,
      campaign.openRate,
      campaign.ctr,
      campaign.bounce,
      campaign.unsubs,
    ]);
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `campaign_analytics_${period}_days.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('[AnalyticsPage] CSV export completed');
  };

  const hardBounces = 1340;
  const unsubscribes = 892;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
            <p className="text-sm text-slate-500 mt-1">Workspace-level performance across all campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <PeriodTabs period={period} setPeriod={setPeriod} />
            <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            label="TOTAL SENT"
            value={formatNumber(overview?.totalSent)}
            delta={overview?.totalSentDelta}
          />
          <KpiCard
            label="AVG DELIVERY RATE"
            value={formatPercent(overview?.avgDeliveryRate)}
            delta={overview?.avgDeliveryRateDelta}
          />
          <KpiCard
            label="AVG OPEN RATE"
            value={formatPercent(overview?.avgOpenRate)}
            delta={overview?.avgOpenRateDelta}
          />
          <KpiCard
            label="AVG CLICK RATE"
            value={formatPercent(overview?.avgClickRate)}
            delta={overview?.avgClickRateDelta}
          />
        </div>

        {/* Trend Chart and Channel Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">
              Sends & Opens — Last {period} Days
            </h3>
            <TrendChart data={trendData} isLoading={isLoading} />
          </div>

          {/* Channel Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Channel Breakdown</h3>
            
            {isLoading ? (
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                </div>
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Email Campaigns */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">✉️ Email Campaigns</span>
                    <span className="text-sm font-bold text-slate-800">{formatNumber(overview?.emailSent)}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${(overview?.emailSent / overview?.totalSent) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Avg Open: {formatPercent(overview?.emailAvgOpenRate)}</span>
                    <span>CTR: {formatPercent(overview?.avgClickRate)}</span>
                  </div>
                </div>

                {/* WhatsApp Campaigns */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">💬 WhatsApp</span>
                    <span className="text-sm font-bold text-slate-800">{formatNumber(overview?.whatsappSent)}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${(overview?.whatsappSent / overview?.totalSent) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Avg Read: {formatPercent(overview?.whatsappAvgReadRate)}</span>
                    <span>CTR: {formatPercent(overview?.whatsappAvgCtr)}</span>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Hard Bounces</span>
                    <span className="font-semibold text-red-600">{hardBounces.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-600">Unsubscribes</span>
                    <span className="font-semibold text-amber-600">{unsubscribes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Performance Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Campaign Performance</h3>
            <Button variant="secondary" size="sm" leftIcon={<DownloadIcon />} onClick={handleExport}>
              Export
            </Button>
          </div>
          <CampaignTable campaigns={campaigns} isLoading={isLoading} onExport={handleExport} />
        </div>
      </div>
    </div>
  );
}