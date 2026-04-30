

// // CampaignCalendarPage.jsx – Complete working model matching the screenshot
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   getDay,
//   isSameDay,
//   isToday,
//   addMonths,
//   subMonths,
//   startOfWeek,
//   endOfWeek,
//   eachWeekOfInterval,
//   isWithinInterval,
// } from 'date-fns';

// // ===================== Mock Data (based on screenshot) =====================
// const MOCK_CAMPAIGNS = [
//   {
//     id: '1',
//     campaignName: 'Q2 Product Launch',
//     description: 'Re-engagement + launch',
//     channel: 'email',
//     status: 'completed',
//     scheduledDate: '2026-04-15T10:00:00Z',
//     sentDate: '2026-04-15T10:00:00Z',
//     audienceSize: 12450,
//   },
//   {
//     id: '2',
//     campaignName: 'April Newsletter',
//     description: 'Monthly product update',
//     channel: 'email',
//     status: 'sent',
//     scheduledDate: '2026-04-22T09:00:00Z',
//     sentDate: '2026-04-22T09:00:00Z',
//     audienceSize: 8230,
//   },
//   {
//     id: '3',
//     campaignName: 'WhatsApp Flash Sale',
//     description: '24-hour limited offer',
//     channel: 'whatsapp',
//     status: 'completed',
//     scheduledDate: '2026-04-19T14:30:00Z',
//     sentDate: '2026-04-19T14:30:00Z',
//     audienceSize: 3180,
//   },
//   {
//     id: '4',
//     campaignName: 'Re-engagement Series',
//     description: '90-day inactive win-back',
//     channel: 'email',
//     status: 'scheduled',
//     scheduledDate: '2026-05-01T08:00:00Z',
//     sentDate: null,
//     audienceSize: 5400,
//   },
//   {
//     id: '5',
//     campaignName: 'Customer Onboarding',
//     description: 'First-touch welcome',
//     channel: 'email',
//     status: 'draft',
//     scheduledDate: null,
//     sentDate: null,
//     audienceSize: null,
//   },
//   {
//     id: '6',
//     campaignName: "Mother's Day Promo",
//     description: 'WhatsApp campaign with offer',
//     channel: 'whatsapp',
//     status: 'draft',
//     scheduledDate: null,
//     sentDate: null,
//     audienceSize: null,
//   },
//   {
//     id: '7',
//     campaignName: 'Tech Summit 2026',
//     description: 'Annual tech conference',
//     channel: 'email',
//     status: 'scheduled',
//     scheduledDate: '2026-06-10T09:00:00Z',
//     sentDate: null,
//     audienceSize: 15000,
//   },
// ];

// // ===================== Custom Hook =====================
// const useCampaignCalendar = (currentDate, viewMode) => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const isMountedRef = useRef(true);

//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => { isMountedRef.current = false; };
//   }, []);

//   const fetchCampaigns = useCallback(() => {
//     if (!isMountedRef.current) return;
//     setIsLoading(true);
    
//     let startDate, endDate;
    
//     if (viewMode === 'month') {
//       startDate = startOfMonth(currentDate);
//       endDate = endOfMonth(currentDate);
//     } else {
//       startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
//       endDate = endOfWeek(currentDate, { weekStartsOn: 0 });
//     }
    
//     console.log(`[Calendar] Fetching campaigns for ${format(currentDate, 'MMMM yyyy')} (${viewMode} view)`);
//     console.log(`[Calendar] Date range: ${format(startDate, 'yyyy-MM-dd')} to ${format(endDate, 'yyyy-MM-dd')}`);
    
//     // Simulate API delay
//     setTimeout(() => {
//       if (!isMountedRef.current) return;
      
//       const filtered = MOCK_CAMPAIGNS.filter(campaign => {
//         const campaignDate = campaign.scheduledDate || campaign.sentDate;
//         if (!campaignDate) return false;
//         const date = new Date(campaignDate);
//         return isWithinInterval(date, { start: startDate, end: endDate });
//       });
      
//       console.log(`[Calendar] Found ${filtered.length} campaigns in date range`);
//       filtered.forEach(c => {
//         console.log(`  - ${c.campaignName} (${c.channel}) on ${format(new Date(c.scheduledDate || c.sentDate), 'MMM dd')}`);
//       });
      
//       setCampaigns(filtered);
//       setIsLoading(false);
//     }, 300);
//   }, [currentDate, viewMode]);

//   useEffect(() => {
//     fetchCampaigns();
//   }, [fetchCampaigns]);

//   return { campaigns, isLoading };
// };

// // ===================== Utility Functions =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatDate = (dateString) => {
//   if (!dateString) return null;
//   return new Date(dateString);
// };

// // ===================== Icons (SVG) =====================
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// const ChevronLeftIcon = () => (
//   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//   </svg>
// );

// const ListIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, size, leftIcon, rightIcon, onClick, disabled, active }) => {
//   const base = "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
//     active: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500",
//   };
//   const sizes = {
//     sm: "px-2.5 py-1.5 text-xs",
//     md: "px-4 py-2 text-sm",
//     lg: "px-5 py-2.5 text-base",
//   };
  
//   let variantKey = variant;
//   if (active && variant === 'ghost') {
//     variantKey = 'active';
//   }
  
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={cn(base, variants[variantKey] || variants.secondary, sizes[size] || sizes.md)}
//     >
//       {leftIcon && leftIcon}
//       {children}
//       {rightIcon && rightIcon}
//     </button>
//   );
// };

// const PageHeader = ({ title, description, action }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//     <div>
//       <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
//       {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
//     </div>
//     {action && <div className="flex flex-wrap gap-2">{action}</div>}
//   </div>
// );

// const CampaignCard = ({ campaign, onClick }) => {
//   const channelColors = {
//     email: 'bg-indigo-100 text-indigo-700 border-indigo-200',
//     whatsapp: 'bg-emerald-100 text-emerald-700 border-emerald-200',
//   };
  
//   return (
//     <div
//       onClick={onClick}
//       className={cn(
//         "text-[11px] font-medium rounded-md px-1.5 py-1 mb-1 truncate cursor-pointer hover:opacity-80 transition-all border-l-2",
//         channelColors[campaign.channel] || channelColors.email
//       )}
//       title={`${campaign.campaignName} - Click to view details`}
//     >
//       {campaign.campaignName}
//     </div>
//   );
// };

// // ===================== Main CampaignCalendarPage Component =====================
// export default function CampaignCalendarPage() {
//   const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 15)); // April 2026
//   const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
//   const { campaigns, isLoading } = useCampaignCalendar(currentDate, viewMode);

//   // Log state changes
//   useEffect(() => {
//     console.log(`[CalendarPage] View mode: ${viewMode}, Current date: ${format(currentDate, 'MMMM yyyy')}`);
//   }, [viewMode, currentDate]);

//   const handlePrev = () => {
//     const newDate = viewMode === 'month' 
//       ? subMonths(currentDate, 1)
//       : new Date(currentDate.setDate(currentDate.getDate() - 7));
//     console.log(`[CalendarPage] Navigate previous: ${format(newDate, 'MMMM yyyy')}`);
//     setCurrentDate(new Date(newDate));
//   };

//   const handleNext = () => {
//     const newDate = viewMode === 'month'
//       ? addMonths(currentDate, 1)
//       : new Date(currentDate.setDate(currentDate.getDate() + 7));
//     console.log(`[CalendarPage] Navigate next: ${format(newDate, 'MMMM yyyy')}`);
//     setCurrentDate(new Date(newDate));
//   };

//   const handleToday = () => {
//     console.log('[CalendarPage] Navigate to today');
//     setCurrentDate(new Date());
//   };

//   const handleNewCampaign = () => {
//     console.log('[CalendarPage] Create new campaign clicked');
//     // In production, use router navigation
//     alert('Navigate to create new campaign');
//   };

//   const handleCampaignClick = (campaign) => {
//     console.log(`[CalendarPage] Campaign clicked: ${campaign.campaignName} (${campaign.id})`);
//     alert(`Navigate to campaign detail: ${campaign.campaignName}`);
//   };

//   // Generate calendar days based on view mode
//   let calendarDays = [];
//   let weekDays = [];
  
//   if (viewMode === 'month') {
//     const monthStart = startOfMonth(currentDate);
//     const monthEnd = endOfMonth(currentDate);
//     const startDate = monthStart;
//     const endDate = monthEnd;
    
//     const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
//     const startPadding = getDay(startDate);
    
//     // Add padding days from previous month
//     for (let i = 0; i < startPadding; i++) {
//       calendarDays.push(null);
//     }
//     // Add days of current month
//     calendarDays.push(...daysInMonth);
    
//     weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//   } else {
//     // Week view
//     const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
//     const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
//     calendarDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
//     weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//   }

//   const getCampaignsForDay = (day) => {
//     if (!day) return [];
//     return campaigns.filter(campaign => {
//       const campaignDate = campaign.scheduledDate || campaign.sentDate;
//       return campaignDate && isSameDay(new Date(campaignDate), day);
//     });
//   };

//   const getWeekNumber = (date) => {
//     const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
//     const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
//     return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
//   };

//   const weekNumber = getWeekNumber(currentDate);

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       <PageHeader
//         title="Campaign Calendar"
//         description={`${format(currentDate, 'MMMM yyyy')} — scheduled and sent campaigns`}
//         action={
//           <div className="flex flex-wrap gap-2">
//             <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 leftIcon={<CalendarIcon />}
//                 active={viewMode === 'month'}
//                 onClick={() => {
//                   console.log('[CalendarPage] Switch to month view');
//                   setViewMode('month');
//                 }}
//                 className="rounded-none"
//               >
//                 Month
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 leftIcon={<ListIcon />}
//                 active={viewMode === 'week'}
//                 onClick={() => {
//                   console.log('[CalendarPage] Switch to week view');
//                   setViewMode('week');
//                 }}
//                 className="rounded-none border-l border-slate-200"
//               >
//                 Week
//               </Button>
//             </div>
//             <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleNewCampaign}>
//               New Campaign
//             </Button>
//           </div>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         {/* Calendar Header with Navigation */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
//           <div className="flex gap-2">
//             <Button variant="secondary" size="sm" onClick={handleToday}>
//               Today
//             </Button>
//             <div className="flex gap-1">
//               <Button variant="ghost" size="sm" leftIcon={<ChevronLeftIcon />} onClick={handlePrev} />
//               <Button variant="ghost" size="sm" rightIcon={<ChevronRightIcon />} onClick={handleNext} />
//             </div>
//           </div>
//           <h2 className="text-xl font-bold text-slate-800">
//             {format(currentDate, viewMode === 'month' ? 'MMMM yyyy' : "'Week of' MMM d, yyyy")}
//             {viewMode === 'week' && (
//               <span className="text-sm font-normal text-slate-400 ml-2">
//                 (Week {weekNumber})
//               </span>
//             )}
//           </h2>
//           <div className="w-24" /> {/* Spacer for alignment */}
//         </div>

//         {/* Weekday Headers */}
//         <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
//           {weekDays.map((day, idx) => (
//             <div
//               key={idx}
//               className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0"
//             >
//               {day}
//             </div>
//           ))}
//         </div>

//         {/* Calendar Grid */}
//         {isLoading ? (
//           <div className="p-12 text-center">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//             <p className="text-sm text-slate-500 mt-3">Loading campaigns...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-7">
//             {calendarDays.map((day, idx) => {
//               if (!day) {
//                 return (
//                   <div
//                     key={`empty-${idx}`}
//                     className="min-h-[120px] bg-slate-50/30 border-b border-r border-slate-100 last:border-r-0"
//                   />
//                 );
//               }
              
//               const dayCampaigns = getCampaignsForDay(day);
//               const isCurrentMonth = day.getMonth() === currentDate.getMonth();
//               const isCurrentDay = isToday(day);
              
//               return (
//                 <div
//                   key={day.toISOString()}
//                   className={cn(
//                     "min-h-[120px] p-2 border-b border-r border-slate-100 transition-colors",
//                     !isCurrentMonth && viewMode === 'month' ? "bg-slate-50/30" : "bg-white",
//                     isCurrentDay && "bg-amber-50",
//                     "hover:bg-slate-50"
//                   )}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <span
//                       className={cn(
//                         "inline-flex items-center justify-center h-7 w-7 rounded-full text-sm font-semibold",
//                         isCurrentDay
//                           ? "bg-indigo-600 text-white shadow-sm"
//                           : isCurrentMonth || viewMode === 'week'
//                             ? "text-slate-700"
//                             : "text-slate-400"
//                       )}
//                     >
//                       {format(day, 'd')}
//                     </span>
//                     {dayCampaigns.length > 0 && (
//                       <span className="text-xs font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
//                         {dayCampaigns.length}
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="space-y-1 max-h-[80px] overflow-y-auto">
//                     {dayCampaigns.map((campaign) => (
//                       <CampaignCard
//                         key={campaign.id}
//                         campaign={campaign}
//                         onClick={() => handleCampaignClick(campaign)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Legend */}
//         <div className="flex items-center gap-6 px-6 py-3 border-t border-slate-100 bg-slate-50 text-xs">
//           <span className="text-slate-500 font-medium">Legend:</span>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded bg-indigo-100 border-l-2 border-indigo-300"></div>
//             <span className="text-slate-600">Email Campaign</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded bg-emerald-100 border-l-2 border-emerald-300"></div>
//             <span className="text-slate-600">WhatsApp Campaign</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300"></div>
//             <span className="text-slate-600">Today</span>
//           </div>
//         </div>
//       </div>

//       {/* Summary Section */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
//           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Campaigns</p>
//           <p className="text-2xl font-bold text-slate-800 mt-1">{campaigns.length}</p>
//           <p className="text-xs text-slate-500 mt-1">
//             in {format(currentDate, viewMode === 'month' ? 'MMMM' : 'this week')}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
//           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email Campaigns</p>
//           <p className="text-2xl font-bold text-indigo-600 mt-1">
//             {campaigns.filter(c => c.channel === 'email').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
//           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">WhatsApp Campaigns</p>
//           <p className="text-2xl font-bold text-emerald-600 mt-1">
//             {campaigns.filter(c => c.channel === 'whatsapp').length}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// CampaignCalendarPage.jsx – Complete working model with proper navigation
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

// ===================== Mock Data (based on screenshot) =====================
const MOCK_CAMPAIGNS = [
  {
    id: '1',
    campaignName: 'Q2 Product Launch',
    description: 'Re-engagement + launch',
    channel: 'email',
    status: 'completed',
    scheduledDate: '2026-04-15T10:00:00Z',
    sentDate: '2026-04-15T10:00:00Z',
    audienceSize: 12450,
  },
  {
    id: '2',
    campaignName: 'April Newsletter',
    description: 'Monthly product update',
    channel: 'email',
    status: 'sent',
    scheduledDate: '2026-04-22T09:00:00Z',
    sentDate: '2026-04-22T09:00:00Z',
    audienceSize: 8230,
  },
  {
    id: '3',
    campaignName: 'WhatsApp Flash Sale',
    description: '24-hour limited offer',
    channel: 'whatsapp',
    status: 'completed',
    scheduledDate: '2026-04-19T14:30:00Z',
    sentDate: '2026-04-19T14:30:00Z',
    audienceSize: 3180,
  },
  {
    id: '4',
    campaignName: 'Re-engagement Series',
    description: '90-day inactive win-back',
    channel: 'email',
    status: 'scheduled',
    scheduledDate: '2026-05-01T08:00:00Z',
    sentDate: null,
    audienceSize: 5400,
  },
  {
    id: '5',
    campaignName: 'Customer Onboarding',
    description: 'First-touch welcome',
    channel: 'email',
    status: 'draft',
    scheduledDate: null,
    sentDate: null,
    audienceSize: null,
  },
  {
    id: '6',
    campaignName: "Mother's Day Promo",
    description: 'WhatsApp campaign with offer',
    channel: 'whatsapp',
    status: 'draft',
    scheduledDate: null,
    sentDate: null,
    audienceSize: null,
  },
  {
    id: '7',
    campaignName: 'Tech Summit 2026',
    description: 'Annual tech conference',
    channel: 'email',
    status: 'scheduled',
    scheduledDate: '2026-06-10T09:00:00Z',
    sentDate: null,
    audienceSize: 15000,
  },
];

// ===================== Custom Hook =====================
const useCampaignCalendar = (currentDate, viewMode) => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const fetchCampaigns = useCallback(() => {
    if (!isMountedRef.current) return;
    setIsLoading(true);
    
    let startDate, endDate;
    
    if (viewMode === 'month') {
      startDate = startOfMonth(currentDate);
      endDate = endOfMonth(currentDate);
    } else {
      startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
      endDate = endOfWeek(currentDate, { weekStartsOn: 0 });
    }
    
    // Simulate API delay
    setTimeout(() => {
      if (!isMountedRef.current) return;
      
      const filtered = MOCK_CAMPAIGNS.filter(campaign => {
        const campaignDate = campaign.scheduledDate || campaign.sentDate;
        if (!campaignDate) return false;
        const date = new Date(campaignDate);
        return date >= startDate && date <= endDate;
      });
      
      setCampaigns(filtered);
      setIsLoading(false);
    }, 300);
  }, [currentDate, viewMode]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return { campaigns, isLoading };
};

// ===================== Utility Functions =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString);
};

// ===================== Icons (SVG) =====================
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// ===================== UI Components =====================
const Button = ({ children, variant, size, leftIcon, rightIcon, onClick, disabled, active }) => {
  const base = "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
    active: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500",
  };
  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  
  let variantKey = variant;
  if (active && variant === 'ghost') {
    variantKey = 'active';
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variantKey] || variants.secondary, sizes[size] || sizes.md)}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
};

const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
    <div>
      <h1 className="text-xl font-semibold text-slate-900 leading-tight">{title}</h1>
      {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
    </div>
    {action && <div className="flex flex-wrap gap-2">{action}</div>}
  </div>
);

const CampaignCard = ({ campaign, onClick }) => {
  const channelColors = {
    email: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    whatsapp: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "text-[11px] font-medium rounded-md px-1.5 py-1 mb-1 truncate cursor-pointer hover:opacity-80 transition-all border-l-2",
        channelColors[campaign.channel] || channelColors.email
      )}
      title={`${campaign.campaignName} - Click to view details`}
    >
      {campaign.campaignName}
    </div>
  );
};

// ===================== Main CampaignCalendarPage Component =====================
export default function CampaignCalendarPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 15)); // April 2026
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const { campaigns, isLoading } = useCampaignCalendar(currentDate, viewMode);

  const handlePrev = () => {
    const newDate = viewMode === 'month' 
      ? subMonths(currentDate, 1)
      : new Date(currentDate.setDate(currentDate.getDate() - 7));
    setCurrentDate(new Date(newDate));
  };

  const handleNext = () => {
    const newDate = viewMode === 'month'
      ? addMonths(currentDate, 1)
      : new Date(currentDate.setDate(currentDate.getDate() + 7));
    setCurrentDate(new Date(newDate));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleNewCampaign = () => {
    navigate('/campaigns/new');
  };

  const handleCampaignClick = (campaign) => {
    navigate(`/campaigns/${campaign.id}`);
  };

  // Generate calendar days based on view mode
  let calendarDays = [];
  let weekDays = [];
  
  if (viewMode === 'month') {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = monthStart;
    const endDate = monthEnd;
    
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
    const startPadding = getDay(startDate);
    
    // Add padding days from previous month
    for (let i = 0; i < startPadding; i++) {
      calendarDays.push(null);
    }
    // Add days of current month
    calendarDays.push(...daysInMonth);
    
    weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  } else {
    // Week view
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    calendarDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  }

  const getCampaignsForDay = (day) => {
    if (!day) return [];
    return campaigns.filter(campaign => {
      const campaignDate = campaign.scheduledDate || campaign.sentDate;
      return campaignDate && isSameDay(new Date(campaignDate), day);
    });
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const weekNumber = getWeekNumber(currentDate);

  return (
    <div className="pt-3 px-4 md:px-6 pb-4 bg-slate-50 min-h-screen scale-[1] origin-top">
      <PageHeader
        title="Campaign Calendar"
        description={`${format(currentDate, 'MMMM yyyy')} — scheduled and sent campaigns`}
        action={
          <div className="flex flex-wrap gap-2">
            <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<CalendarIcon />}
                active={viewMode === 'month'}
                onClick={() => setViewMode('month')}
                className="rounded-none"
              >
                Month
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ListIcon />}
                active={viewMode === 'week'}
                onClick={() => setViewMode('week')}
                className="rounded-none border-l border-slate-200"
              >
                Week
              </Button>
            </div>
            <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleNewCampaign}>
              New Campaign
            </Button>
          </div>
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Calendar Header with Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <button
  onClick={handlePrev}
  className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
>
  &lt; {format(subMonths(currentDate, 1), "MMMM")}
</button>
          <h2 className="text-lg font-semibold text-slate-800">
            {format(currentDate, viewMode === 'month' ? 'MMMM yyyy' : "'Week of' MMM d, yyyy")}
            {viewMode === 'week' && (
              <span className="text-sm font-normal text-slate-400 ml-2">
                (Week {weekNumber})
              </span>
            )}
          </h2>
          {/* RIGHT - Next Month */}
<button
  onClick={handleNext}
  className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
>
  {format(addMonths(currentDate, 1), "MMMM")} &gt;
</button> {/* Spacer for alignment */}
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
          {weekDays.map((day, idx) => (
            <div
              key={idx}
              className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-sm text-slate-500 mt-3">Loading campaigns...</p>
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-[95px] bg-slate-50/30 border-b border-r border-slate-100 last:border-r-0"
                  />
                );
              }
              
              const dayCampaigns = getCampaignsForDay(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isCurrentDay = isToday(day);
              
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "min-h-[95px] p-2 border-b border-r border-slate-100 transition-colors",
                    !isCurrentMonth && viewMode === 'month' ? "bg-slate-50/30" : "bg-white",
                    isCurrentDay && "bg-amber-50",
                    "hover:bg-slate-50"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center h-7 w-7 rounded-full text-sm font-semibold",
                        isCurrentDay
                          ? "bg-amber-100 text-amber-600 ring-1 ring-amber-300"
                          : isCurrentMonth || viewMode === 'week'
                            ? "text-slate-700"
                            : "text-slate-400"
                      )}
                    >
                      {format(day, 'd')}
                    </span>
                    {dayCampaigns.length > 0 && (
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                        {dayCampaigns.length}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1 max-h-[80px] overflow-y-auto">
                    {dayCampaigns.map((campaign) => (
                      <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onClick={() => handleCampaignClick(campaign)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-6 px-6 py-3 border-t border-slate-100 bg-slate-50 text-xs">
          <span className="text-slate-500 font-medium">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-indigo-100 border-l-2 border-indigo-300"></div>
            <span className="text-slate-600">Email Campaign</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-100 border-l-2 border-emerald-300"></div>
            <span className="text-slate-600">WhatsApp Campaign</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300"></div>
            <span className="text-slate-600">Today</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Campaigns</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{campaigns.length}</p>
          <p className="text-xs text-slate-500 mt-1">
            in {format(currentDate, viewMode === 'month' ? 'MMMM' : 'this week')}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email Campaigns</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            {campaigns.filter(c => c.channel === 'email').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">WhatsApp Campaigns</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {campaigns.filter(c => c.channel === 'whatsapp').length}
          </p>
        </div>
      </div>
    </div>
  );
}