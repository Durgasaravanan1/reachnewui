


// // // TemplateLibraryPage.jsx – with delete confirmation
// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // // ── ConfirmDialog (reused) ──
// // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
// //       <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
// //         <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
// //         <p className="text-sm text-slate-600 mb-6">{message}</p>
// //         <div className="flex gap-3">
// //           <button onClick={onClose} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">Cancel</button>
// //           <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ── Mock Data (stateful) ──
// // const INITIAL_TEMPLATES = [
// //   { id: '1', templateName: 'Product Update',     channel: 'email',    category: 'Announcement', usageCount: 4, whatsappMetaStatus: null,      bg: '#EEF2FF', accent: '#4F46E5' },
// //   { id: '2', templateName: 'Monthly Newsletter', channel: 'email',    category: 'Promo',        usageCount: 6, whatsappMetaStatus: null,      bg: '#EDE9FE', accent: '#7C3AED' },
// //   { id: '3', templateName: 'Onboarding Welcome', channel: 'email',    category: 'Onboarding',   usageCount: 2, whatsappMetaStatus: null,      bg: '#ECFDF5', accent: '#10B981' },
// //   { id: '4', templateName: 'Re-engagement',      channel: 'email',    category: 'Re-engage',    usageCount: 1, whatsappMetaStatus: null,      bg: '#FFFBEB', accent: '#D97706' },
// //   { id: '5', templateName: 'Flash Sale WA',      channel: 'whatsapp', category: 'Promo',        usageCount: 3, whatsappMetaStatus: 'approved', bg: '#DCFCE7', accent: '#16A34A' },
// // ];

// // const CHANNEL_TABS = [
// //   { label: 'All (18)',     value: '' },
// //   { label: 'Email (14)',   value: 'email' },
// //   { label: 'WhatsApp (4)', value: 'whatsapp' },
// // ];

// // const CATEGORIES = ['All Categories', 'Promotional', 'Transactional', 'Re-engagement', 'Onboarding'];

// // // ── Template Thumbnail ──
// // const TemplateThumb = ({ tpl }) => (
// //   <div className="h-[170px] flex items-center justify-center border-b border-slate-100" style={{ background: tpl.bg }}>
// //     <div className="w-[90px] bg-white rounded-lg p-2.5 shadow-sm">
// //       {tpl.channel === 'whatsapp' ? (
// //         <>
// //           <div className="text-center text-white text-[10px] font-bold py-0.5 mb-1.5 rounded" style={{ background: tpl.accent }}>WhatsApp</div>
// //           <div className="h-1 bg-slate-200 rounded mb-1" />
// //           <div className="h-1 bg-slate-200 rounded w-4/5 mb-1" />
// //           <div className="h-1 bg-slate-200 rounded w-3/5" />
// //         </>
// //       ) : (
// //         <>
// //           <div className="h-1 rounded mb-1.5" style={{ background: tpl.accent }} />
// //           <div className="h-0.5 bg-slate-200 rounded mb-0.5" />
// //           <div className="h-0.5 bg-slate-200 rounded w-3/4 mb-0.5" />
// //           <div className="h-0.5 bg-slate-200 rounded w-1/2 mb-1.5" />
// //           <div className="h-1 w-10 rounded" style={{ background: tpl.accent }} />
// //         </>
// //       )}
// //     </div>
// //   </div>
// // );

// // // ── Badge ──
// // const Badge = ({ children, bg = '#EEF2FF', color = '#4338CA' }) => (
// //   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: bg, color }}>
// //     {children}
// //   </span>
// // );

// // // ── Template Card (with delete button) ──
// // const TemplateCard = ({ tpl, onEdit, onDelete }) => (
// //   <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
// //     <div onClick={onEdit} className="cursor-pointer">
// //       <TemplateThumb tpl={tpl} />
// //       <div className="p-3.5">
// //         <p className="font-bold text-sm text-slate-800 truncate mb-1.5">{tpl.templateName}</p>
// //         <div className="flex items-center gap-1.5 flex-wrap mb-1">
// //           {tpl.channel === 'email'
// //             ? <Badge bg="#EEF2FF" color="#4338CA">✉️ Email</Badge>
// //             : <Badge bg="#DCFCE7" color="#166534">💬 WhatsApp</Badge>}
// //           <span className="text-[11px] font-medium text-slate-400">{tpl.category}</span>
// //         </div>
// //         {tpl.whatsappMetaStatus === 'approved' && <p className="text-[11px] font-bold text-emerald-600 mt-0.5">Meta Approved ✓</p>}
// //         {tpl.whatsappMetaStatus === 'pending'  && <p className="text-[11px] font-bold text-amber-500 mt-0.5">Meta: pending</p>}
// //         <p className="text-[11px] text-slate-400 mt-1">Used in {tpl.usageCount} campaigns</p>
// //       </div>
// //     </div>
// //     <div className="px-3.5 pb-3 flex justify-end">
// //       <button
// //         onClick={(e) => { e.stopPropagation(); onDelete(); }}
// //         className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
// //       >
// //         🗑️ Delete
// //       </button>
// //     </div>
// //   </div>
// // );

// // // ── Main Component ──
// // export default function TemplateLibraryPage() {
// //   const navigate = useNavigate();
// //   const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
// //   const [channel, setChannel]   = useState('');
// //   const [category, setCategory] = useState('All Categories');
// //   const [search, setSearch]     = useState('');
// //   const [catOpen, setCatOpen]   = useState(false);
// //   const [deleteTarget, setDeleteTarget] = useState(null);
// //   const catRef = useRef();

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   const deleteTemplate = (id) => {
// //     setTemplates(templates.filter(t => t.id !== id));
// //     setDeleteTarget(null);
// //   };

// //   const filtered = templates.filter((t) => {
// //     if (channel && t.channel !== channel) return false;
// //     if (category !== 'All Categories' && t.category.toLowerCase() !== category.toLowerCase()) return false;
// //     if (search && !t.templateName.toLowerCase().includes(search.toLowerCase())) return false;
// //     return true;
// //   });

// //   return (
// //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
// //       <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7">
// //         <div>
// //           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Template Studio</h1>
// //           <p className="text-sm text-slate-500 mt-1.5 font-normal">Reusable email and WhatsApp templates with merge tag support</p>
// //         </div>
// //         <button
// //           onClick={() => navigate('/templates/new')}
// //           className="inline-flex items-center gap-1.5 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
// //         >
// //           + Create Template
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// //             {CHANNEL_TABS.map((tab) => (
// //               <button
// //                 key={tab.value}
// //                 onClick={() => setChannel(tab.value)}
// //                 className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
// //                   channel === tab.value
// //                     ? 'bg-white text-slate-900 shadow-sm'
// //                     : 'text-slate-500 hover:text-slate-700'
// //                 }`}
// //               >
// //                 {tab.label}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="relative" ref={catRef}>
// //             <button
// //               onClick={() => setCatOpen(!catOpen)}
// //               className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
// //             >
// //               {category} <span className="text-slate-400 text-xs">▾</span>
// //             </button>
// //             {catOpen && (
// //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-[180px] overflow-hidden">
// //                 {CATEGORIES.map((c) => (
// //                   <div
// //                     key={c}
// //                     onClick={() => { setCategory(c); setCatOpen(false); }}
// //                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
// //                       category === c
// //                         ? 'bg-indigo-600 text-white'
// //                         : 'text-slate-700 hover:bg-slate-50'
// //                     }`}
// //                   >
// //                     {c}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// //             <span className="text-indigo-500 text-sm">🔍</span>
// //             <input
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Search templates..."
// //               className="border-none bg-transparent outline-none text-sm text-slate-700 w-full placeholder:text-slate-400"
// //             />
// //           </div>
// //         </div>

// //         <div className="p-5">
// //           {filtered.length === 0 ? (
// //             <div className="text-center py-12">
// //               <p className="text-base font-semibold text-slate-700">No templates found</p>
// //               <p className="text-sm text-slate-400 mt-1.5">Try adjusting your filters or create a new template.</p>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
// //               {filtered.map((tpl) => (
// //                 <TemplateCard
// //                   key={tpl.id}
// //                   tpl={tpl}
// //                   onEdit={() => navigate(`/templates/${tpl.id}/edit`)}
// //                   onDelete={() => setDeleteTarget(tpl.id)}
// //                 />
// //               ))}
// //               <div
// //                 onClick={() => navigate('/templates/new')}
// //                 className="rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[262px] cursor-pointer transition-colors hover:border-slate-400"
// //               >
// //                 <div className="text-center">
// //                   <div className="text-3xl text-slate-400 mb-1">+</div>
// //                   <p className="text-sm font-semibold text-slate-400">New Template</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <ConfirmDialog
// //         isOpen={!!deleteTarget}
// //         onClose={() => setDeleteTarget(null)}
// //         onConfirm={() => deleteTemplate(deleteTarget)}
// //         title="Delete Template"
// //         message="Are you sure you want to delete this template? This action cannot be undone."
// //       />
// //     </div>
// //   );
// // }



// // // TemplateLibraryPage.jsx
// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // // ─── Initial Templates ───────────────────────────────────────────────────────
// // export const INITIAL_TEMPLATES = [
// //   {
// //     id: '1',
// //     name: 'Product Launch',
// //     channel: 'email',
// //     category: 'Announcement',
// //     usageCount: 4,
// //     waStatus: null,
// //     blocks: [
// //       { id: 1, type: 'header', props: { text: 'Introducing Our New Product', align: 'center', color: '#1e293b', fontSize: '22px' } },
// //       { id: 2, type: 'image',  props: { url: 'https://placehold.co/560x200/6366f1/ffffff?text=Product+Launch', alt: 'Product' } },
// //       { id: 3, type: 'text',   props: { text: "We're excited to announce the launch of our newest product. It's designed to help you work smarter and faster than ever before.", align: 'left', color: '#475569', fontSize: '14px' } },
// //       { id: 4, type: 'button', props: { label: 'Shop Now', url: '#', bgColor: '#4F46E5', textColor: '#ffffff' } },
// //       { id: 5, type: 'divider',props: { color: '#e2e8f0' } },
// //       { id: 6, type: 'footer', props: { text: '© 2025 Acme Inc. · Unsubscribe | Privacy Policy', color: '#94a3b8', fontSize: '12px' } },
// //     ],
// //   },
// //   {
// //     id: '2',
// //     name: 'Monthly Newsletter',
// //     channel: 'email',
// //     category: 'Promotional',
// //     usageCount: 6,
// //     waStatus: null,
// //     blocks: [
// //       { id: 1, type: 'header',  props: { text: 'Monthly Digest — May 2025', align: 'center', color: '#1e293b', fontSize: '20px' } },
// //       { id: 2, type: 'text',    props: { text: "Hello {{first_name}}, here's what happened this month at {{company}}. We've been busy building features you've asked for!", align: 'left', color: '#475569', fontSize: '14px' } },
// //       { id: 3, type: 'columns', props: { left: '📊 Revenue up 24% this quarter compared to last year.', right: '🚀 Launched 3 new integrations with top CRM tools.' } },
// //       { id: 4, type: 'button',  props: { label: 'Read Full Report', url: '#', bgColor: '#7C3AED', textColor: '#ffffff' } },
// //       { id: 5, type: 'footer',  props: { text: "You're receiving this because you subscribed. Unsubscribe anytime.", color: '#94a3b8', fontSize: '12px' } },
// //     ],
// //   },
// //   {
// //     id: '3',
// //     name: 'Onboarding Welcome',
// //     channel: 'email',
// //     category: 'Onboarding',
// //     usageCount: 2,
// //     waStatus: null,
// //     blocks: [
// //       { id: 1, type: 'header',  props: { text: 'Welcome to {{company}}, {{first_name}}! 👋', align: 'center', color: '#065f46', fontSize: '22px' } },
// //       { id: 2, type: 'image',   props: { url: 'https://placehold.co/560x180/10b981/ffffff?text=Welcome+Aboard', alt: 'Welcome' } },
// //       { id: 3, type: 'text',    props: { text: "We're thrilled to have you on board. Your account is ready. Here are things to get you started quickly.", align: 'left', color: '#475569', fontSize: '14px' } },
// //       { id: 4, type: 'columns', props: { left: '✅ Step 1: Complete your profile with your details.', right: '✅ Step 2: Connect your first integration today.' } },
// //       { id: 5, type: 'button',  props: { label: 'Get Started', url: '#', bgColor: '#10B981', textColor: '#ffffff' } },
// //       { id: 6, type: 'footer',  props: { text: 'Need help? Reply to this email or visit our Help Center.', color: '#94a3b8', fontSize: '12px' } },
// //     ],
// //   },
// //   {
// //     id: '4',
// //     name: 'Re-engagement',
// //     channel: 'email',
// //     category: 'Re-engagement',
// //     usageCount: 1,
// //     waStatus: null,
// //     blocks: [
// //       { id: 1, type: 'header', props: { text: 'We miss you, {{first_name}} 😢', align: 'center', color: '#92400e', fontSize: '20px' } },
// //       { id: 2, type: 'text',   props: { text: "It's been a while since your last visit. We've made a lot of improvements and we'd love to show you what's new.", align: 'center', color: '#475569', fontSize: '14px' } },
// //       { id: 3, type: 'button', props: { label: 'Come Back & Save 20%', url: '#', bgColor: '#D97706', textColor: '#ffffff' } },
// //       { id: 4, type: 'text',   props: { text: 'Use code COMEBACK20 at checkout. Valid for 7 days.', align: 'center', color: '#94a3b8', fontSize: '12px' } },
// //       { id: 5, type: 'footer', props: { text: 'If you no longer wish to receive emails, click Unsubscribe.', color: '#94a3b8', fontSize: '12px' } },
// //     ],
// //   },
// //   {
// //     id: '5',
// //     name: 'Flash Sale Alert',
// //     channel: 'whatsapp',
// //     category: 'Promotional',
// //     usageCount: 3,
// //     waStatus: 'approved',
// //     blocks: [
// //       { id: 1, type: 'wa_header', props: { text: '🔥 Flash Sale — 50% OFF Everything!' } },
// //       { id: 2, type: 'wa_body',   props: { text: "Hi {{first_name}}! Don't miss our biggest sale of the year.\n\n*Today only* — get 50% off on all products. Use code *FLASH50* at checkout.\n\n🛒 Shop now before stock runs out!" } },
// //       { id: 3, type: 'wa_footer', props: { text: 'Tap the button below to browse deals' } },
// //       { id: 4, type: 'wa_button', props: { label: 'Shop the Sale', url: '#' } },
// //     ],
// //   },
// //   {
// //     id: '6',
// //     name: 'Order Confirmation',
// //     channel: 'whatsapp',
// //     category: 'Transactional',
// //     usageCount: 9,
// //     waStatus: 'approved',
// //     blocks: [
// //       { id: 1, type: 'wa_header', props: { text: '✅ Order Confirmed!' } },
// //       { id: 2, type: 'wa_body',   props: { text: 'Hi {{first_name}}, your order *#{{order_id}}* has been confirmed!\n\n📦 Items: {{items}}\n💰 Total: ₹{{amount}}\n🚚 Estimated delivery: {{delivery_date}}\n\nThank you for shopping with {{company}}!' } },
// //       { id: 3, type: 'wa_footer', props: { text: 'For support, reply to this message' } },
// //       { id: 4, type: 'wa_button', props: { label: 'Track My Order', url: '#' } },
// //     ],
// //   },
// //   {
// //     id: '7',
// //     name: 'Appointment Reminder',
// //     channel: 'whatsapp',
// //     category: 'Transactional',
// //     usageCount: 5,
// //     waStatus: 'pending',
// //     blocks: [
// //       { id: 1, type: 'wa_header', props: { text: '📅 Appointment Reminder' } },
// //       { id: 2, type: 'wa_body',   props: { text: 'Hello {{first_name}},\n\nThis is a reminder for your appointment:\n\n🗓 Date: *{{date}}*\n⏰ Time: *{{time}}*\n📍 Location: {{location}}\n\nPlease arrive 10 minutes early. Reply *YES* to confirm or *NO* to cancel.' } },
// //       { id: 3, type: 'wa_footer', props: { text: '{{company}} — Your trusted partner' } },
// //     ],
// //   },
// // ];

// // const CHANNEL_TABS = [
// //   { label: 'All',       value: '' },
// //   { label: 'Email',     value: 'email' },
// //   { label: 'WhatsApp',  value: 'whatsapp' },
// // ];

// // const CATEGORIES = ['All Categories', 'Promotional', 'Transactional', 'Re-engagement', 'Onboarding', 'Announcement'];

// // // ─── Confirm Dialog ──────────────────────────────────────────────────────────
// // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
// //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// //         <div className="flex gap-3">
// //           <button onClick={onClose}   className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── Email Thumbnail ─────────────────────────────────────────────────────────
// // const EmailThumb = ({ blocks }) => {
// //   const accent = '#6366f1';
// //   return (
// //     <div className="w-[88px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5">
// //       <div className="h-[3px] rounded-full w-full" style={{ background: accent }} />
// //       {blocks.slice(0, 4).map((b, i) => {
// //         if (b.type === 'image')  return <div key={i} className="h-4 bg-slate-200 rounded" />;
// //         if (b.type === 'button') return <div key={i} className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />;
// //         if (b.type === 'header') return <div key={i} className="h-2 bg-indigo-200 rounded w-4/5" />;
// //         if (b.type === 'columns') return <div key={i} className="flex gap-1"><div className="flex-1 h-1.5 bg-slate-200 rounded"/><div className="flex-1 h-1.5 bg-slate-200 rounded"/></div>;
// //         return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded"/><div className="h-1 bg-slate-200 rounded w-3/4"/></div>;
// //       })}
// //     </div>
// //   );
// // };

// // // ─── WhatsApp Thumbnail ──────────────────────────────────────────────────────
// // const WAThumb = ({ blocks }) => (
// //   <div className="w-[88px] bg-white rounded-xl shadow-sm overflow-hidden">
// //     <div className="bg-[#075e54] px-2 py-1.5">
// //       <div className="text-[8px] font-bold text-white">WhatsApp</div>
// //     </div>
// //     <div className="bg-[#e5ddd5] p-1.5">
// //       <div className="bg-[#dcf8c6] rounded-[0_6px_6px_6px] p-1.5 space-y-0.5">
// //         {blocks.filter(b => b.type === 'wa_body').slice(0, 1).map((_, i) => (
// //           <React.Fragment key={i}>
// //             <div className="h-1 bg-green-300 rounded w-full" />
// //             <div className="h-1 bg-green-300 rounded w-4/5" />
// //             <div className="h-1 bg-green-300 rounded w-3/5" />
// //           </React.Fragment>
// //         ))}
// //       </div>
// //       {blocks.find(b => b.type === 'wa_button') && (
// //         <div className="h-2 bg-[#25d366] rounded mt-1.5" />
// //       )}
// //     </div>
// //   </div>
// // );

// // // ─── Template Card ───────────────────────────────────────────────────────────
// // const TemplateCard = ({ tpl, onEdit, onDelete }) => {
// //   const isWA = tpl.channel === 'whatsapp';
// //   const bg      = isWA ? 'bg-green-50'  : 'bg-indigo-50';
// //   const badgeBg = isWA ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700';

// //   return (
// //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 transition-all duration-150">
// //       {/* Thumbnail */}
// //       <div onClick={onEdit} className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer`}>
// //         {isWA ? <WAThumb blocks={tpl.blocks} /> : <EmailThumb blocks={tpl.blocks} />}
// //       </div>

// //       {/* Info */}
// //       <div onClick={onEdit} className="px-4 pt-3 pb-2 cursor-pointer">
// //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// //         <div className="flex items-center gap-1.5 flex-wrap mb-1">
// //           <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeBg}`}>
// //             {isWA ? '💬 WhatsApp' : '✉️ Email'}
// //           </span>
// //           <span className="text-[11px] text-slate-400">{tpl.category}</span>
// //         </div>
// //         {tpl.waStatus === 'approved' && <p className="text-[11px] font-bold text-emerald-600">Meta Approved ✓</p>}
// //         {tpl.waStatus === 'pending'  && <p className="text-[11px] font-bold text-amber-500">Meta: Pending</p>}
// //         <p className="text-[11px] text-slate-400 mt-1">Used in {tpl.usageCount} campaigns</p>
// //       </div>

// //       {/* Actions */}
// //       <div className="px-4 pb-3 flex gap-2 justify-end border-t border-slate-100 pt-2">
// //         <button onClick={onEdit}   className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Edit</button>
// //         <button onClick={onDelete} className="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
// //       </div>
// //     </div>
// //   );
// // };

// // // ─── Main Page ───────────────────────────────────────────────────────────────
// // export default function TemplateLibraryPage({ templates, setTemplates, onEdit }) {
// //   const [channel,      setChannel]      = useState('');
// //   const [category,     setCategory]     = useState('All Categories');
// //   const [search,       setSearch]       = useState('');
// //   const [catOpen,      setCatOpen]      = useState(false);
// //   const [deleteTarget, setDeleteTarget] = useState(null);
// //   const catRef = useRef();

// //   useEffect(() => {
// //     const handler = (e) => {
// //       if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
// //     };
// //     document.addEventListener('mousedown', handler);
// //     return () => document.removeEventListener('mousedown', handler);
// //   }, []);

// //   const emailCount    = templates.filter(t => t.channel === 'email').length;
// //   const waCount       = templates.filter(t => t.channel === 'whatsapp').length;

// //   const filtered = templates.filter(t => {
// //     if (channel && t.channel !== channel) return false;
// //     if (category !== 'All Categories' && t.category.toLowerCase() !== category.toLowerCase()) return false;
// //     if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
// //     return true;
// //   });

// //   const confirmDelete = () => {
// //     setTemplates(prev => prev.filter(t => t.id !== deleteTarget));
// //     setDeleteTarget(null);
// //   };

// //   return (
// //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
// //         <div>
// //           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// //           <p className="text-sm text-slate-500 mt-1">Reusable email & WhatsApp templates with merge tag support</p>
// //         </div>
// //         <button
// //           onClick={() => onEdit(null)}
// //           className="inline-flex items-center gap-1.5 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
// //         >
// //           + Create Template
// //         </button>
// //       </div>

// //       {/* Panel */}
// //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// //         {/* Toolbar */}
// //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// //           {/* Channel tabs */}
// //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// //             {CHANNEL_TABS.map(tab => {
// //               const count = tab.value === '' ? templates.length : tab.value === 'email' ? emailCount : waCount;
// //               return (
// //                 <button
// //                   key={tab.value}
// //                   onClick={() => setChannel(tab.value)}
// //                   className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
// //                     channel === tab.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
// //                   }`}
// //                 >
// //                   {tab.label} ({count})
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           {/* Category dropdown */}
// //           <div className="relative" ref={catRef}>
// //             <button
// //               onClick={() => setCatOpen(o => !o)}
// //               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50"
// //             >
// //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// //             </button>
// //             {catOpen && (
// //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[180px] overflow-hidden">
// //                 {CATEGORIES.map(c => (
// //                   <div
// //                     key={c}
// //                     onClick={() => { setCategory(c); setCatOpen(false); }}
// //                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
// //                       category === c ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'
// //                     }`}
// //                   >
// //                     {c}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Search */}
// //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-60">
// //             <span className="text-slate-400 text-sm">🔍</span>
// //             <input
// //               value={search}
// //               onChange={e => setSearch(e.target.value)}
// //               placeholder="Search templates..."
// //               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
// //             />
// //           </div>
// //         </div>

// //         {/* Grid */}
// //         <div className="p-5">
// //           {filtered.length === 0 ? (
// //             <div className="text-center py-14">
// //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// //               <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or create a new template.</p>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //               {filtered.map(tpl => (
// //                 <TemplateCard
// //                   key={tpl.id}
// //                   tpl={tpl}
// //                   onEdit={() => onEdit(tpl.id)}
// //                   onDelete={() => setDeleteTarget(tpl.id)}
// //                 />
// //               ))}
// //               {/* New template card */}
// //               <div
// //                 onClick={() => onEdit(null)}
// //                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
// //               >
// //                 <div className="text-2xl text-slate-300 group-hover:text-indigo-400 transition-colors mb-1">+</div>
// //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <ConfirmDialog
// //         isOpen={!!deleteTarget}
// //         onClose={() => setDeleteTarget(null)}
// //         onConfirm={confirmDelete}
// //         title="Delete Template"
// //         message="Are you sure you want to delete this template? This action cannot be undone."
// //       />
// //     </div>
// //   );
// // }



// // TemplateLibraryPage.jsx
// // Self-contained — no App.jsx needed.
// // Usage: <TemplateLibraryPage />
// // Internally manages templates state and navigates to the editor.

// import React, { useState, useEffect, useRef } from 'react';
// import TemplateEditorPage from './TemplateEditorPage';

// // ─── Realistic Initial Templates ─────────────────────────────────────────────
// export const INITIAL_TEMPLATES = [
//   // ── EMAIL TEMPLATES ──────────────────────────────────────────────────────
//   {
//     id: 'tpl-001',
//     name: 'Product Launch Announcement',
//     channel: 'email',
//     category: 'Announcement',
//     usageCount: 12,
//     waStatus: null,
//     blocks: [
//       {
//         id: 1, type: 'header',
//         props: { text: '🚀 Introducing SmartSend 2.0', align: 'center', color: '#0f172a', fontSize: '26px' },
//       },
//       {
//         id: 2, type: 'image',
//         props: { url: 'https://placehold.co/560x220/6366f1/ffffff?text=SmartSend+2.0+Launch', alt: 'Product Launch' },
//       },
//       {
//         id: 3, type: 'text',
//         props: { text: 'Hi {{first_name}},\n\nWe\'ve been working hard behind the scenes, and today we\'re thrilled to unveil SmartSend 2.0 — our biggest update yet. With AI-powered scheduling, real-time analytics, and a brand new campaign builder, your outreach will never be the same.', align: 'left', color: '#334155', fontSize: '14px' },
//       },
//       {
//         id: 4, type: 'columns',
//         props: {
//           left: '⚡ AI Scheduling\nSend at the perfect time for each contact automatically.',
//           right: '📊 Live Analytics\nTrack opens, clicks, and conversions in real time.',
//         },
//       },
//       {
//         id: 5, type: 'button',
//         props: { label: 'Explore What\'s New →', url: 'https://example.com/launch', bgColor: '#4f46e5', textColor: '#ffffff' },
//       },
//       {
//         id: 6, type: 'divider',
//         props: { color: '#e2e8f0' },
//       },
//       {
//         id: 7, type: 'footer',
//         props: { text: '© 2025 SmartSend, Inc. · 123 Tech Park, Bengaluru 560001\nUnsubscribe | Privacy Policy | Terms of Service', color: '#94a3b8', fontSize: '11px' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-002',
//     name: 'Monthly Newsletter — May',
//     channel: 'email',
//     category: 'Promotional',
//     usageCount: 28,
//     waStatus: null,
//     blocks: [
//       {
//         id: 1, type: 'header',
//         props: { text: 'The May Dispatch 📰', align: 'center', color: '#1e293b', fontSize: '24px' },
//       },
//       {
//         id: 2, type: 'text',
//         props: { text: 'Hello {{first_name}},\n\nMay has been an incredible month for {{company}}. Here\'s a quick roundup of everything that\'s been happening — from product updates to team milestones.', align: 'left', color: '#475569', fontSize: '14px' },
//       },
//       {
//         id: 3, type: 'image',
//         props: { url: 'https://placehold.co/560x180/0ea5e9/ffffff?text=May+2025+Highlights', alt: 'May Highlights' },
//       },
//       {
//         id: 4, type: 'columns',
//         props: {
//           left: '📈 Growth\nWe crossed 10,000 active users this month — a 34% jump from April. Thank you for being part of this journey!',
//           right: '🛠 New Features\nWe shipped 6 new features including bulk scheduling, CSV import, and the new contact segmentation engine.',
//         },
//       },
//       {
//         id: 5, type: 'text',
//         props: { text: 'Coming up in June: We\'re launching our mobile app and a revamped onboarding experience. Stay tuned!', align: 'left', color: '#475569', fontSize: '14px' },
//       },
//       {
//         id: 6, type: 'button',
//         props: { label: 'Read Full Newsletter', url: 'https://example.com/newsletter/may', bgColor: '#0ea5e9', textColor: '#ffffff' },
//       },
//       {
//         id: 7, type: 'footer',
//         props: { text: 'You\'re receiving this because you opted in at {{company}}.\nUnsubscribe | Manage Preferences', color: '#94a3b8', fontSize: '11px' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-003',
//     name: 'Welcome to the Platform',
//     channel: 'email',
//     category: 'Onboarding',
//     usageCount: 45,
//     waStatus: null,
//     blocks: [
//       {
//         id: 1, type: 'header',
//         props: { text: 'Welcome aboard, {{first_name}}! 🎉', align: 'center', color: '#065f46', fontSize: '24px' },
//       },
//       {
//         id: 2, type: 'image',
//         props: { url: 'https://placehold.co/560x200/10b981/ffffff?text=Welcome+to+{{company}}', alt: 'Welcome' },
//       },
//       {
//         id: 3, type: 'text',
//         props: { text: 'Your account is all set up and ready to go. We\'re excited to have you with us at {{company}}. Here\'s how to hit the ground running in the next 5 minutes:', align: 'left', color: '#334155', fontSize: '14px' },
//       },
//       {
//         id: 4, type: 'columns',
//         props: {
//           left: '✅ Step 1: Set Up Your Profile\nAdd your name, photo, and contact details so your team knows who you are.',
//           right: '✅ Step 2: Import Your Contacts\nUpload a CSV or connect your CRM to get your contact list ready.',
//         },
//       },
//       {
//         id: 5, type: 'columns',
//         props: {
//           left: '✅ Step 3: Create Your First Campaign\nUse our drag-and-drop builder to craft your first message in minutes.',
//           right: '✅ Step 4: Go Live!\nSchedule or send immediately — and watch the results roll in.',
//         },
//       },
//       {
//         id: 6, type: 'button',
//         props: { label: 'Go to My Dashboard →', url: 'https://app.example.com/dashboard', bgColor: '#10b981', textColor: '#ffffff' },
//       },
//       {
//         id: 7, type: 'text',
//         props: { text: 'Need help? Our support team is available Mon–Fri, 9am–6pm IST. Just reply to this email!', align: 'center', color: '#64748b', fontSize: '13px' },
//       },
//       {
//         id: 8, type: 'footer',
//         props: { text: '© 2025 {{company}} · Unsubscribe | Help Center', color: '#94a3b8', fontSize: '11px' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-004',
//     name: 'Win-Back Campaign',
//     channel: 'email',
//     category: 'Re-engagement',
//     usageCount: 7,
//     waStatus: null,
//     blocks: [
//       {
//         id: 1, type: 'header',
//         props: { text: 'We miss you, {{first_name}} 💙', align: 'center', color: '#7c3aed', fontSize: '24px' },
//       },
//       {
//         id: 2, type: 'text',
//         props: { text: 'It\'s been 30 days since your last visit, and a lot has changed at {{company}}. We\'d love to show you what\'s new — and we\'ve got a special offer just for you to come back.', align: 'center', color: '#475569', fontSize: '14px' },
//       },
//       {
//         id: 3, type: 'image',
//         props: { url: 'https://placehold.co/560x200/7c3aed/ffffff?text=Special+Offer+Just+For+You', alt: 'Special Offer' },
//       },
//       {
//         id: 4, type: 'text',
//         props: { text: '🎁 Use code COMEBACK30 at checkout for 30% off your next purchase. Valid for the next 72 hours only.', align: 'center', color: '#1e293b', fontSize: '16px' },
//       },
//       {
//         id: 5, type: 'button',
//         props: { label: 'Claim My 30% Discount', url: 'https://example.com/discount/COMEBACK30', bgColor: '#7c3aed', textColor: '#ffffff' },
//       },
//       {
//         id: 6, type: 'divider',
//         props: { color: '#ede9fe' },
//       },
//       {
//         id: 7, type: 'text',
//         props: { text: 'Here\'s what you\'ve been missing:\n• 5 new integrations including Salesforce and HubSpot\n• Mobile app (iOS & Android)\n• AI-powered campaign suggestions', align: 'left', color: '#475569', fontSize: '13px' },
//       },
//       {
//         id: 8, type: 'footer',
//         props: { text: 'If you no longer wish to hear from us, unsubscribe here.\n© 2025 {{company}}', color: '#94a3b8', fontSize: '11px' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-005',
//     name: 'Invoice / Payment Reminder',
//     channel: 'email',
//     category: 'Transactional',
//     usageCount: 33,
//     waStatus: null,
//     blocks: [
//       {
//         id: 1, type: 'header',
//         props: { text: '📄 Invoice #{{invoice_id}} from {{company}}', align: 'left', color: '#0f172a', fontSize: '20px' },
//       },
//       {
//         id: 2, type: 'divider',
//         props: { color: '#e2e8f0' },
//       },
//       {
//         id: 3, type: 'text',
//         props: { text: 'Hi {{first_name}},\n\nThis is a reminder that Invoice #{{invoice_id}} is due on {{date}}. Please review the details below and make your payment at your earliest convenience.', align: 'left', color: '#334155', fontSize: '14px' },
//       },
//       {
//         id: 4, type: 'columns',
//         props: {
//           left: '📋 Invoice Details\n\nInvoice No: #{{invoice_id}}\nIssue Date: {{issue_date}}\nDue Date: {{date}}\nStatus: Pending',
//           right: '💰 Amount Summary\n\nSubtotal: ₹{{subtotal}}\nGST (18%): ₹{{tax}}\n─────────────\nTotal Due: ₹{{amount}}',
//         },
//       },
//       {
//         id: 5, type: 'button',
//         props: { label: 'Pay Now — ₹{{amount}}', url: 'https://pay.example.com/{{invoice_id}}', bgColor: '#0f172a', textColor: '#ffffff' },
//       },
//       {
//         id: 6, type: 'text',
//         props: { text: 'You can also download your invoice PDF from the link above. If you\'ve already made the payment, please disregard this email.', align: 'left', color: '#64748b', fontSize: '13px' },
//       },
//       {
//         id: 7, type: 'footer',
//         props: { text: 'Questions? Email billing@{{company}}.com or call +91 98765 43210\n© 2025 {{company}} · GST No: 33AXXXX1234X1Z5', color: '#94a3b8', fontSize: '11px' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-006',
//     name: 'Weekly Sales Report',
//     channel: 'email',
//     category: 'Announcement',
//     usageCount: 19,
//     waStatus: null,
//     blocks: [
//       {
//         id: 1, type: 'header',
//         props: { text: '📊 Weekly Performance Report — Week {{week_no}}', align: 'left', color: '#0f172a', fontSize: '20px' },
//       },
//       {
//         id: 2, type: 'text',
//         props: { text: 'Hi {{first_name}},\n\nHere\'s your team\'s performance summary for the week ending {{date}}. This report covers all active campaigns across Email and WhatsApp channels.', align: 'left', color: '#475569', fontSize: '14px' },
//       },
//       {
//         id: 3, type: 'columns',
//         props: {
//           left: '📧 Email Stats\n\nSent: {{email_sent}}\nDelivered: {{email_delivered}}\nOpen Rate: {{open_rate}}%\nClick Rate: {{click_rate}}%',
//           right: '💬 WhatsApp Stats\n\nSent: {{wa_sent}}\nDelivered: {{wa_delivered}}\nRead Rate: {{read_rate}}%\nReplies: {{wa_replies}}',
//         },
//       },
//       {
//         id: 4, type: 'divider',
//         props: { color: '#e2e8f0' },
//       },
//       {
//         id: 5, type: 'text',
//         props: { text: '🏆 Top Campaign: "{{top_campaign}}" with a {{top_rate}}% conversion rate this week.', align: 'left', color: '#0f172a', fontSize: '14px' },
//       },
//       {
//         id: 6, type: 'button',
//         props: { label: 'View Full Analytics Dashboard', url: 'https://app.example.com/analytics', bgColor: '#1e40af', textColor: '#ffffff' },
//       },
//       {
//         id: 7, type: 'footer',
//         props: { text: 'This report is auto-generated every Monday at 9:00 AM IST.\n© 2025 {{company}} · Unsubscribe from reports', color: '#94a3b8', fontSize: '11px' },
//       },
//     ],
//   },

//   // ── WHATSAPP TEMPLATES ────────────────────────────────────────────────────
//   {
//     id: 'tpl-007',
//     name: 'Flash Sale Alert',
//     channel: 'whatsapp',
//     category: 'Promotional',
//     usageCount: 42,
//     waStatus: 'approved',
//     blocks: [
//       {
//         id: 1, type: 'wa_header',
//         props: { text: '🔥 Flash Sale — 50% OFF Sitewide!' },
//       },
//       {
//         id: 2, type: 'wa_body',
//         props: { text: 'Hi {{first_name}}! 👋\n\nBig news — our *biggest sale of the year* is LIVE right now!\n\n🛍️ *50% OFF* on everything\n⏰ Today only — ends midnight\n💳 No minimum order value\n\nUse code: *FLASH50* at checkout\n\n🔗 Tap the button below to shop now before stocks run out!' },
//       },
//       {
//         id: 3, type: 'wa_footer',
//         props: { text: 'Reply STOP to unsubscribe from promotional messages' },
//       },
//       {
//         id: 4, type: 'wa_button',
//         props: { label: '🛒 Shop the Sale Now', url: 'https://store.example.com/sale' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-008',
//     name: 'Order Confirmation',
//     channel: 'whatsapp',
//     category: 'Transactional',
//     usageCount: 87,
//     waStatus: 'approved',
//     blocks: [
//       {
//         id: 1, type: 'wa_header',
//         props: { text: '✅ Order Confirmed — #{{order_id}}' },
//       },
//       {
//         id: 2, type: 'wa_body',
//         props: { text: 'Hi {{first_name}}, your order has been placed successfully! 🎉\n\n*Order Summary:*\n📦 Items: {{items}}\n💰 Total: ₹{{amount}}\n📍 Delivering to: {{address}}\n🚚 Estimated Delivery: *{{delivery_date}}*\n\nYou\'ll receive another message once your order is shipped.\n\nThank you for shopping with *{{company}}*! 🙏' },
//       },
//       {
//         id: 3, type: 'wa_footer',
//         props: { text: '{{company}} Customer Support · support@example.com' },
//       },
//       {
//         id: 4, type: 'wa_button',
//         props: { label: '📦 Track My Order', url: 'https://track.example.com/{{order_id}}' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-009',
//     name: 'Appointment Reminder',
//     channel: 'whatsapp',
//     category: 'Transactional',
//     usageCount: 23,
//     waStatus: 'approved',
//     blocks: [
//       {
//         id: 1, type: 'wa_header',
//         props: { text: '📅 Appointment Reminder' },
//       },
//       {
//         id: 2, type: 'wa_body',
//         props: { text: 'Hello {{first_name}},\n\nThis is a friendly reminder about your upcoming appointment:\n\n🗓 *Date:* {{date}}\n⏰ *Time:* {{time}}\n📍 *Location:* {{location}}\n👨‍⚕️ *With:* {{doctor_name}}\n\nPlease arrive *10 minutes early* and carry a valid photo ID.\n\nReply *YES* to confirm or *NO* to reschedule.\n\n— {{company}} Team' },
//       },
//       {
//         id: 3, type: 'wa_footer',
//         props: { text: 'Need to reschedule? Call us at {{phone}}' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-010',
//     name: 'Lead Follow-Up',
//     channel: 'whatsapp',
//     category: 'Promotional',
//     usageCount: 14,
//     waStatus: 'pending',
//     blocks: [
//       {
//         id: 1, type: 'wa_header',
//         props: { text: '👋 Following Up on Your Inquiry' },
//       },
//       {
//         id: 2, type: 'wa_body',
//         props: { text: 'Hi {{first_name}}!\n\nThank you for your interest in *{{product_name}}* from {{company}}. I wanted to personally follow up and see if you have any questions.\n\nHere\'s a quick recap of what\'s included:\n✅ {{feature_1}}\n✅ {{feature_2}}\n✅ {{feature_3}}\n\n💬 I\'d love to schedule a quick 15-minute demo at your convenience. Would any of these slots work for you?\n\n📅 *Option 1:* {{slot_1}}\n📅 *Option 2:* {{slot_2}}' },
//       },
//       {
//         id: 3, type: 'wa_footer',
//         props: { text: '{{agent_name}} · {{company}} Sales Team' },
//       },
//       {
//         id: 4, type: 'wa_button',
//         props: { label: '📆 Book a Demo', url: 'https://cal.example.com/{{agent_name}}' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-011',
//     name: 'Payment Received',
//     channel: 'whatsapp',
//     category: 'Transactional',
//     usageCount: 56,
//     waStatus: 'approved',
//     blocks: [
//       {
//         id: 1, type: 'wa_header',
//         props: { text: '💳 Payment Received — Thank You!' },
//       },
//       {
//         id: 2, type: 'wa_body',
//         props: { text: 'Hi {{first_name}},\n\nWe\'ve successfully received your payment. Here are the details:\n\n🧾 *Invoice:* #{{invoice_id}}\n💰 *Amount Paid:* ₹{{amount}}\n📅 *Date:* {{date}}\n🏦 *Mode:* {{payment_mode}}\n\nYour transaction ID is: *{{txn_id}}*\n\nA detailed receipt has been emailed to *{{email}}*.\n\nThank you for choosing *{{company}}*! 🙏' },
//       },
//       {
//         id: 3, type: 'wa_footer',
//         props: { text: 'Questions? Email billing@{{company}}.com' },
//       },
//       {
//         id: 4, type: 'wa_button',
//         props: { label: '🧾 Download Receipt', url: 'https://billing.example.com/receipt/{{invoice_id}}' },
//       },
//     ],
//   },
//   {
//     id: 'tpl-012',
//     name: 'Festive Offer',
//     channel: 'whatsapp',
//     category: 'Promotional',
//     usageCount: 31,
//     waStatus: 'approved',
//     blocks: [
//       {
//         id: 1, type: 'wa_header',
//         props: { text: '🎊 Diwali Special Offer from {{company}}!' },
//       },
//       {
//         id: 2, type: 'wa_body',
//         props: { text: 'Dear {{first_name}},\n\nWishing you and your family a very Happy Diwali! 🪔✨\n\nCelebrate this festive season with our exclusive Diwali deals:\n\n🎁 *Flat 40% OFF* on all premium plans\n🎁 *Free setup* worth ₹5,000\n🎁 *3 months extra* on annual plans\n\nOffer valid till: *{{expiry_date}}*\n\nUse code: *DIWALI40*\n\nLight up your business this season! 🚀' },
//       },
//       {
//         id: 3, type: 'wa_footer',
//         props: { text: 'T&C apply · Reply STOP to opt out' },
//       },
//       {
//         id: 4, type: 'wa_button',
//         props: { label: '🛍️ Grab the Offer', url: 'https://example.com/diwali-offer' },
//       },
//     ],
//   },
// ];

// // ─── Channel + Category Filters ───────────────────────────────────────────────
// const CHANNEL_TABS = [
//   { label: 'All',      value: '' },
//   { label: 'Email',    value: 'email' },
//   { label: 'WhatsApp', value: 'whatsapp' },
// ];
// const CATEGORIES = ['All Categories', 'Promotional', 'Transactional', 'Re-engagement', 'Onboarding', 'Announcement'];

// // ─── Confirm Dialog ───────────────────────────────────────────────────────────
// const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
//         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
//         <p className="text-sm text-slate-500 mb-6">{message}</p>
//         <div className="flex gap-3">
//           <button onClick={onClose}   className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
//           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Toast ────────────────────────────────────────────────────────────────────
// const Toast = ({ message, type = 'success', onClose }) => (
//   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all
//     ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
//     <span>{type === 'success' ? '✓' : '✕'}</span>
//     {message}
//     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
//   </div>
// );

// // ─── Email Thumbnail ──────────────────────────────────────────────────────────
// const EmailThumb = ({ blocks }) => {
//   const accent = '#6366f1';
//   return (
//     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
//       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
//       {blocks.slice(0, 5).map((b, i) => {
//         if (b.type === 'image')   return <div key={i} className="h-5 bg-slate-200 rounded" />;
//         if (b.type === 'button')  return <div key={i} className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />;
//         if (b.type === 'header')  return <div key={i} className="h-2 bg-indigo-200 rounded w-4/5" />;
//         if (b.type === 'divider') return <div key={i} className="h-px bg-slate-200 w-full" />;
//         if (b.type === 'columns') return (
//           <div key={i} className="flex gap-1">
//             <div className="flex-1 h-1.5 bg-slate-200 rounded" />
//             <div className="flex-1 h-1.5 bg-slate-200 rounded" />
//           </div>
//         );
//         if (b.type === 'footer')  return <div key={i} className="h-1 bg-slate-100 rounded w-3/4 mx-auto" />;
//         return (
//           <div key={i} className="space-y-0.5">
//             <div className="h-1 bg-slate-200 rounded" />
//             <div className="h-1 bg-slate-200 rounded w-3/4" />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ─── WhatsApp Thumbnail ───────────────────────────────────────────────────────
// const WAThumb = ({ blocks }) => (
//   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
//     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
//       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
//       <div className="text-[7px] font-bold text-white">WhatsApp</div>
//     </div>
//     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
//       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
//         {blocks.filter(b => b.type === 'wa_header').slice(0, 1).map((b, i) => (
//           <div key={i} className="h-1 bg-green-400 rounded w-full" />
//         ))}
//         {blocks.filter(b => b.type === 'wa_body').slice(0, 1).map((_, i) => (
//           <React.Fragment key={i}>
//             <div className="h-1 bg-green-300 rounded w-full" />
//             <div className="h-1 bg-green-300 rounded w-4/5" />
//             <div className="h-1 bg-green-300 rounded w-3/5" />
//             <div className="h-1 bg-green-300 rounded w-2/3" />
//           </React.Fragment>
//         ))}
//       </div>
//       {blocks.find(b => b.type === 'wa_button') && (
//         <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
//       )}
//     </div>
//   </div>
// );

// // ─── WA Status Badge ──────────────────────────────────────────────────────────
// const WAStatusBadge = ({ status }) => {
//   if (!status) return null;
//   if (status === 'approved') return (
//     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
//       ✓ Meta Approved
//     </span>
//   );
//   if (status === 'pending') return (
//     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600">
//       ⏳ Pending Review
//     </span>
//   );
//   if (status === 'rejected') return (
//     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">
//       ✕ Rejected
//     </span>
//   );
//   return null;
// };

// // ─── Template Card ────────────────────────────────────────────────────────────
// const TemplateCard = ({ tpl, onEdit, onDuplicate, onDelete }) => {
//   const isWA    = tpl.channel === 'whatsapp';
//   const bg      = isWA ? 'bg-gradient-to-br from-green-50 to-emerald-100' : 'bg-gradient-to-br from-indigo-50 to-violet-100';
//   const badgeBg = isWA ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700';

//   return (
//     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
//       {/* Thumbnail area */}
//       <div
//         onClick={onEdit}
//         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
//       >
//         {/* Decorative circles */}
//         <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10" style={{ background: isWA ? '#25d366' : '#6366f1' }} />
//         <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full opacity-10" style={{ background: isWA ? '#25d366' : '#6366f1' }} />
//         {isWA ? <WAThumb blocks={tpl.blocks} /> : <EmailThumb blocks={tpl.blocks} />}
//       </div>

//       {/* Info */}
//       <div onClick={onEdit} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
//         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5" title={tpl.name}>{tpl.name}</p>
//         <div className="flex flex-wrap items-center gap-1.5 mb-2">
//           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
//             {isWA ? '💬 WhatsApp' : '✉️ Email'}
//           </span>
//           <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
//             {tpl.category}
//           </span>
//         </div>
//         <WAStatusBadge status={tpl.waStatus} />
//         <p className="text-[11px] text-slate-400 mt-1.5">
//           📊 Used in {tpl.usageCount} campaign{tpl.usageCount !== 1 ? 's' : ''}
//         </p>
//       </div>

//       {/* Actions */}
//       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
//         <button
//           onClick={onEdit}
//           className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
//         >
//           Edit
//         </button>
//         <button
//           onClick={onDuplicate}
//           className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
//           title="Duplicate"
//         >
//           ⧉
//         </button>
//         <button
//           onClick={onDelete}
//           className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//           title="Delete"
//         >
//           🗑
//         </button>
//       </div>
//     </div>
//   );
// };

// // ─── Stats Card ───────────────────────────────────────────────────────────────
// const StatCard = ({ label, value, icon, color }) => (
//   <div className={`rounded-2xl p-4 border ${color}`}>
//     <div className="flex items-center gap-2 mb-1">
//       <span className="text-lg">{icon}</span>
//       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
//     </div>
//     <p className="text-2xl font-bold text-slate-900">{value}</p>
//   </div>
// );

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function TemplateLibraryPage() {
//   const [templates,    setTemplates]    = useState(INITIAL_TEMPLATES);
//   const [editingId,    setEditingId]    = useState(undefined); // undefined = not editing; null = new; string = edit
//   const [channel,      setChannel]      = useState('');
//   const [category,     setCategory]     = useState('All Categories');
//   const [search,       setSearch]       = useState('');
//   const [catOpen,      setCatOpen]      = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [toast,        setToast]        = useState(null);
//   const catRef = useRef();

//   // Close category dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   // Auto-dismiss toast
//   useEffect(() => {
//     if (toast) {
//       const t = setTimeout(() => setToast(null), 3000);
//       return () => clearTimeout(t);
//     }
//   }, [toast]);

//   const showToast = (message, type = 'success') => setToast({ message, type });

//   // Stats
//   const emailCount    = templates.filter(t => t.channel === 'email').length;
//   const waCount       = templates.filter(t => t.channel === 'whatsapp').length;
//   const approvedCount = templates.filter(t => t.waStatus === 'approved').length;

//   // Filtered list
//   const filtered = templates.filter(t => {
//     if (channel && t.channel !== channel) return false;
//     if (category !== 'All Categories' && t.category.toLowerCase() !== category.toLowerCase()) return false;
//     if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
//     return true;
//   });

//   const handleDuplicate = (tpl) => {
//     const clone = {
//       ...JSON.parse(JSON.stringify(tpl)),
//       id: `tpl-${Date.now()}`,
//       name: `${tpl.name} (Copy)`,
//       usageCount: 0,
//     };
//     setTemplates(prev => [...prev, clone]);
//     showToast(`"${tpl.name}" duplicated`);
//   };

//   const confirmDelete = () => {
//     const tpl = templates.find(t => t.id === deleteTarget);
//     setTemplates(prev => prev.filter(t => t.id !== deleteTarget));
//     setDeleteTarget(null);
//     showToast(`"${tpl?.name}" deleted`, 'error');
//   };

//   // ── If editing, show editor ──
//   if (editingId !== undefined) {
//     return (
//       <TemplateEditorPage
//         templateId={editingId}
//         templates={templates}
//         setTemplates={setTemplates}
//         onBack={(savedName) => {
//           setEditingId(undefined);
//           if (savedName) showToast(`"${savedName}" saved successfully`);
//         }}
//       />
//     );
//   }

//   // ── Library view ──
//   return (
//     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Reusable Email & WhatsApp templates with merge tag support
//           </p>
//         </div>
//         <button
//           onClick={() => setEditingId(null)}
//           className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
//         >
//           + Create Template
//         </button>
//       </div>

//       {/* Stats row */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         <StatCard icon="📁" label="Total Templates" value={templates.length} color="bg-white border-slate-200" />
//         <StatCard icon="✉️" label="Email"            value={emailCount}      color="bg-indigo-50 border-indigo-200" />
//         <StatCard icon="💬" label="WhatsApp"         value={waCount}         color="bg-green-50 border-green-200" />
//         <StatCard icon="✅" label="WA Approved"      value={approvedCount}   color="bg-emerald-50 border-emerald-200" />
//       </div>

//       {/* Panel */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//         {/* Toolbar */}
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           {/* Channel tabs */}
//           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
//             {CHANNEL_TABS.map(tab => {
//               const count = tab.value === '' ? templates.length : tab.value === 'email' ? emailCount : waCount;
//               return (
//                 <button
//                   key={tab.value}
//                   onClick={() => setChannel(tab.value)}
//                   className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
//                     channel === tab.value
//                       ? 'bg-white text-slate-900 shadow-sm'
//                       : 'text-slate-500 hover:text-slate-700'
//                   }`}
//                 >
//                   {tab.label} ({count})
//                 </button>
//               );
//             })}
//           </div>

//           {/* Category dropdown */}
//           <div className="relative" ref={catRef}>
//             <button
//               onClick={() => setCatOpen(o => !o)}
//               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
//             >
//               {category}
//               <span className="text-slate-400 text-[10px]">▾</span>
//             </button>
//             {catOpen && (
//               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
//                 {CATEGORIES.map(c => (
//                   <div
//                     key={c}
//                     onClick={() => { setCategory(c); setCatOpen(false); }}
//                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
//                       category === c ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'
//                     }`}
//                   >
//                     {c}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Result count */}
//           <span className="text-xs text-slate-400 font-medium">
//             {filtered.length} template{filtered.length !== 1 ? 's' : ''}
//           </span>

//           {/* Search */}
//           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
//             <span className="text-slate-400 text-sm">🔍</span>
//             <input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search templates..."
//               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
//             />
//             {search && (
//               <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 text-xs">×</button>
//             )}
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="p-5">
//           {filtered.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="text-4xl mb-3">🗂</div>
//               <p className="text-sm font-semibold text-slate-700">No templates found</p>
//               <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or create a new template.</p>
//               <button
//                 onClick={() => { setChannel(''); setCategory('All Categories'); setSearch(''); }}
//                 className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
//               >
//                 Clear all filters
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {filtered.map(tpl => (
//                 <TemplateCard
//                   key={tpl.id}
//                   tpl={tpl}
//                   onEdit={() => setEditingId(tpl.id)}
//                   onDuplicate={() => handleDuplicate(tpl)}
//                   onDelete={() => setDeleteTarget(tpl.id)}
//                 />
//               ))}

//               {/* New template card */}
//               <div
//                 onClick={() => setEditingId(null)}
//                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
//               >
//                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
//                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
//                 </div>
//                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Confirm delete dialog */}
//       <ConfirmDialog
//         isOpen={!!deleteTarget}
//         onClose={() => setDeleteTarget(null)}
//         onConfirm={confirmDelete}
//         title="Delete Template"
//         message="Are you sure you want to delete this template? This action cannot be undone."
//       />

//       {/* Toast */}
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </div>
//   );
// }



// TemplateLibraryPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import TemplateEditorPage from './TemplateEditorPage';

// ─── Initial Templates (rich set of email and WhatsApp templates) ─────────────
export const INITIAL_TEMPLATES = [
  // EMAIL TEMPLATES
  {
    id: 'tpl-001',
    name: 'Product Launch Announcement',
    channel: 'email',
    category: 'Announcement',
    usageCount: 12,
    waStatus: null,
    blocks: [
      { id: 1, type: 'header', props: { text: '🚀 Introducing SmartSend 2.0', align: 'center', color: '#0f172a', fontSize: '26px' } },
      { id: 2, type: 'image', props: { url: 'https://placehold.co/560x220/6366f1/ffffff?text=SmartSend+2.0+Launch', alt: 'Product Launch' } },
      { id: 3, type: 'text', props: { text: 'Hi {{first_name}},\n\nWe\'ve been working hard behind the scenes, and today we\'re thrilled to unveil SmartSend 2.0 — our biggest update yet. With AI-powered scheduling, real-time analytics, and a brand new campaign builder, your outreach will never be the same.', align: 'left', color: '#334155', fontSize: '14px' } },
      { id: 4, type: 'columns', props: { left: '⚡ AI Scheduling\nSend at the perfect time for each contact automatically.', right: '📊 Live Analytics\nTrack opens, clicks, and conversions in real time.' } },
      { id: 5, type: 'button', props: { label: 'Explore What\'s New →', url: 'https://example.com/launch', bgColor: '#4f46e5', textColor: '#ffffff' } },
      { id: 6, type: 'divider', props: { color: '#e2e8f0' } },
      { id: 7, type: 'footer', props: { text: '© 2025 SmartSend, Inc. · 123 Tech Park, Bengaluru 560001\nUnsubscribe | Privacy Policy | Terms of Service', color: '#94a3b8', fontSize: '11px' } },
    ],
  },
  {
    id: 'tpl-002',
    name: 'Monthly Newsletter — May',
    channel: 'email',
    category: 'Promotional',
    usageCount: 28,
    waStatus: null,
    blocks: [
      { id: 1, type: 'header', props: { text: 'The May Dispatch 📰', align: 'center', color: '#1e293b', fontSize: '24px' } },
      { id: 2, type: 'text', props: { text: 'Hello {{first_name}},\n\nMay has been an incredible month for {{company}}. Here\'s a quick roundup of everything that\'s been happening — from product updates to team milestones.', align: 'left', color: '#475569', fontSize: '14px' } },
      { id: 3, type: 'image', props: { url: 'https://placehold.co/560x180/0ea5e9/ffffff?text=May+2025+Highlights', alt: 'May Highlights' } },
      { id: 4, type: 'columns', props: { left: '📈 Growth\nWe crossed 10,000 active users this month — a 34% jump from April. Thank you for being part of this journey!', right: '🛠 New Features\nWe shipped 6 new features including bulk scheduling, CSV import, and the new contact segmentation engine.' } },
      { id: 5, type: 'text', props: { text: 'Coming up in June: We\'re launching our mobile app and a revamped onboarding experience. Stay tuned!', align: 'left', color: '#475569', fontSize: '14px' } },
      { id: 6, type: 'button', props: { label: 'Read Full Newsletter', url: 'https://example.com/newsletter/may', bgColor: '#0ea5e9', textColor: '#ffffff' } },
      { id: 7, type: 'footer', props: { text: 'You\'re receiving this because you opted in at {{company}}.\nUnsubscribe | Manage Preferences', color: '#94a3b8', fontSize: '11px' } },
    ],
  },
  {
    id: 'tpl-003',
    name: 'Welcome to the Platform',
    channel: 'email',
    category: 'Onboarding',
    usageCount: 45,
    waStatus: null,
    blocks: [
      { id: 1, type: 'header', props: { text: 'Welcome aboard, {{first_name}}! 🎉', align: 'center', color: '#065f46', fontSize: '24px' } },
      { id: 2, type: 'image', props: { url: 'https://placehold.co/560x200/10b981/ffffff?text=Welcome+to+{{company}}', alt: 'Welcome' } },
      { id: 3, type: 'text', props: { text: 'Your account is all set up and ready to go. We\'re excited to have you with us at {{company}}. Here\'s how to hit the ground running in the next 5 minutes:', align: 'left', color: '#334155', fontSize: '14px' } },
      { id: 4, type: 'columns', props: { left: '✅ Step 1: Set Up Your Profile\nAdd your name, photo, and contact details so your team knows who you are.', right: '✅ Step 2: Import Your Contacts\nUpload a CSV or connect your CRM to get your contact list ready.' } },
      { id: 5, type: 'columns', props: { left: '✅ Step 3: Create Your First Campaign\nUse our drag-and-drop builder to craft your first message in minutes.', right: '✅ Step 4: Go Live!\nSchedule or send immediately — and watch the results roll in.' } },
      { id: 6, type: 'button', props: { label: 'Go to My Dashboard →', url: 'https://app.example.com/dashboard', bgColor: '#10b981', textColor: '#ffffff' } },
      { id: 7, type: 'text', props: { text: 'Need help? Our support team is available Mon–Fri, 9am–6pm IST. Just reply to this email!', align: 'center', color: '#64748b', fontSize: '13px' } },
      { id: 8, type: 'footer', props: { text: '© 2025 {{company}} · Unsubscribe | Help Center', color: '#94a3b8', fontSize: '11px' } },
    ],
  },
  {
    id: 'tpl-004',
    name: 'Win-Back Campaign',
    channel: 'email',
    category: 'Re-engagement',
    usageCount: 7,
    waStatus: null,
    blocks: [
      { id: 1, type: 'header', props: { text: 'We miss you, {{first_name}} 💙', align: 'center', color: '#7c3aed', fontSize: '24px' } },
      { id: 2, type: 'text', props: { text: 'It\'s been 30 days since your last visit, and a lot has changed at {{company}}. We\'d love to show you what\'s new — and we\'ve got a special offer just for you to come back.', align: 'center', color: '#475569', fontSize: '14px' } },
      { id: 3, type: 'image', props: { url: 'https://placehold.co/560x200/7c3aed/ffffff?text=Special+Offer+Just+For+You', alt: 'Special Offer' } },
      { id: 4, type: 'text', props: { text: '🎁 Use code COMEBACK30 at checkout for 30% off your next purchase. Valid for the next 72 hours only.', align: 'center', color: '#1e293b', fontSize: '16px' } },
      { id: 5, type: 'button', props: { label: 'Claim My 30% Discount', url: 'https://example.com/discount/COMEBACK30', bgColor: '#7c3aed', textColor: '#ffffff' } },
      { id: 6, type: 'divider', props: { color: '#ede9fe' } },
      { id: 7, type: 'text', props: { text: 'Here\'s what you\'ve been missing:\n• 5 new integrations including Salesforce and HubSpot\n• Mobile app (iOS & Android)\n• AI-powered campaign suggestions', align: 'left', color: '#475569', fontSize: '13px' } },
      { id: 8, type: 'footer', props: { text: 'If you no longer wish to hear from us, unsubscribe here.\n© 2025 {{company}}', color: '#94a3b8', fontSize: '11px' } },
    ],
  },
  {
    id: 'tpl-005',
    name: 'Invoice / Payment Reminder',
    channel: 'email',
    category: 'Transactional',
    usageCount: 33,
    waStatus: null,
    blocks: [
      { id: 1, type: 'header', props: { text: '📄 Invoice #{{invoice_id}} from {{company}}', align: 'left', color: '#0f172a', fontSize: '20px' } },
      { id: 2, type: 'divider', props: { color: '#e2e8f0' } },
      { id: 3, type: 'text', props: { text: 'Hi {{first_name}},\n\nThis is a reminder that Invoice #{{invoice_id}} is due on {{date}}. Please review the details below and make your payment at your earliest convenience.', align: 'left', color: '#334155', fontSize: '14px' } },
      { id: 4, type: 'columns', props: { left: '📋 Invoice Details\n\nInvoice No: #{{invoice_id}}\nIssue Date: {{issue_date}}\nDue Date: {{date}}\nStatus: Pending', right: '💰 Amount Summary\n\nSubtotal: ₹{{subtotal}}\nGST (18%): ₹{{tax}}\n─────────────\nTotal Due: ₹{{amount}}' } },
      { id: 5, type: 'button', props: { label: 'Pay Now — ₹{{amount}}', url: 'https://pay.example.com/{{invoice_id}}', bgColor: '#0f172a', textColor: '#ffffff' } },
      { id: 6, type: 'text', props: { text: 'You can also download your invoice PDF from the link above. If you\'ve already made the payment, please disregard this email.', align: 'left', color: '#64748b', fontSize: '13px' } },
      { id: 7, type: 'footer', props: { text: 'Questions? Email billing@{{company}}.com or call +91 98765 43210\n© 2025 {{company}} · GST No: 33AXXXX1234X1Z5', color: '#94a3b8', fontSize: '11px' } },
    ],
  },
  {
    id: 'tpl-006',
    name: 'Weekly Sales Report',
    channel: 'email',
    category: 'Announcement',
    usageCount: 19,
    waStatus: null,
    blocks: [
      { id: 1, type: 'header', props: { text: '📊 Weekly Performance Report — Week {{week_no}}', align: 'left', color: '#0f172a', fontSize: '20px' } },
      { id: 2, type: 'text', props: { text: 'Hi {{first_name}},\n\nHere\'s your team\'s performance summary for the week ending {{date}}. This report covers all active campaigns across Email and WhatsApp channels.', align: 'left', color: '#475569', fontSize: '14px' } },
      { id: 3, type: 'columns', props: { left: '📧 Email Stats\n\nSent: {{email_sent}}\nDelivered: {{email_delivered}}\nOpen Rate: {{open_rate}}%\nClick Rate: {{click_rate}}%', right: '💬 WhatsApp Stats\n\nSent: {{wa_sent}}\nDelivered: {{wa_delivered}}\nRead Rate: {{read_rate}}%\nReplies: {{wa_replies}}' } },
      { id: 4, type: 'divider', props: { color: '#e2e8f0' } },
      { id: 5, type: 'text', props: { text: '🏆 Top Campaign: "{{top_campaign}}" with a {{top_rate}}% conversion rate this week.', align: 'left', color: '#0f172a', fontSize: '14px' } },
      { id: 6, type: 'button', props: { label: 'View Full Analytics Dashboard', url: 'https://app.example.com/analytics', bgColor: '#1e40af', textColor: '#ffffff' } },
      { id: 7, type: 'footer', props: { text: 'This report is auto-generated every Monday at 9:00 AM IST.\n© 2025 {{company}} · Unsubscribe from reports', color: '#94a3b8', fontSize: '11px' } },
    ],
  },

  // WHATSAPP TEMPLATES
  {
    id: 'tpl-007',
    name: 'Flash Sale Alert',
    channel: 'whatsapp',
    category: 'Promotional',
    usageCount: 42,
    waStatus: 'approved',
    blocks: [
      { id: 1, type: 'wa_header', props: { text: '🔥 Flash Sale — 50% OFF Sitewide!' } },
      { id: 2, type: 'wa_body', props: { text: 'Hi {{first_name}}! 👋\n\nBig news — our *biggest sale of the year* is LIVE right now!\n\n🛍️ *50% OFF* on everything\n⏰ Today only — ends midnight\n💳 No minimum order value\n\nUse code: *FLASH50* at checkout\n\n🔗 Tap the button below to shop now before stocks run out!' } },
      { id: 3, type: 'wa_footer', props: { text: 'Reply STOP to unsubscribe from promotional messages' } },
      { id: 4, type: 'wa_button', props: { label: '🛒 Shop the Sale Now', url: 'https://store.example.com/sale' } },
    ],
  },
  {
    id: 'tpl-008',
    name: 'Order Confirmation',
    channel: 'whatsapp',
    category: 'Transactional',
    usageCount: 87,
    waStatus: 'approved',
    blocks: [
      { id: 1, type: 'wa_header', props: { text: '✅ Order Confirmed — #{{order_id}}' } },
      { id: 2, type: 'wa_body', props: { text: 'Hi {{first_name}}, your order has been placed successfully! 🎉\n\n*Order Summary:*\n📦 Items: {{items}}\n💰 Total: ₹{{amount}}\n📍 Delivering to: {{address}}\n🚚 Estimated Delivery: *{{delivery_date}}*\n\nYou\'ll receive another message once your order is shipped.\n\nThank you for shopping with *{{company}}*! 🙏' } },
      { id: 3, type: 'wa_footer', props: { text: '{{company}} Customer Support · support@example.com' } },
      { id: 4, type: 'wa_button', props: { label: '📦 Track My Order', url: 'https://track.example.com/{{order_id}}' } },
    ],
  },
  {
    id: 'tpl-009',
    name: 'Appointment Reminder',
    channel: 'whatsapp',
    category: 'Transactional',
    usageCount: 23,
    waStatus: 'approved',
    blocks: [
      { id: 1, type: 'wa_header', props: { text: '📅 Appointment Reminder' } },
      { id: 2, type: 'wa_body', props: { text: 'Hello {{first_name}},\n\nThis is a friendly reminder about your upcoming appointment:\n\n🗓 *Date:* {{date}}\n⏰ *Time:* {{time}}\n📍 *Location:* {{location}}\n👨‍⚕️ *With:* {{doctor_name}}\n\nPlease arrive *10 minutes early* and carry a valid photo ID.\n\nReply *YES* to confirm or *NO* to reschedule.\n\n— {{company}} Team' } },
      { id: 3, type: 'wa_footer', props: { text: 'Need to reschedule? Call us at {{phone}}' } },
    ],
  },
  {
    id: 'tpl-010',
    name: 'Lead Follow-Up',
    channel: 'whatsapp',
    category: 'Promotional',
    usageCount: 14,
    waStatus: 'pending',
    blocks: [
      { id: 1, type: 'wa_header', props: { text: '👋 Following Up on Your Inquiry' } },
      { id: 2, type: 'wa_body', props: { text: 'Hi {{first_name}}!\n\nThank you for your interest in *{{product_name}}* from {{company}}. I wanted to personally follow up and see if you have any questions.\n\nHere\'s a quick recap of what\'s included:\n✅ {{feature_1}}\n✅ {{feature_2}}\n✅ {{feature_3}}\n\n💬 I\'d love to schedule a quick 15-minute demo at your convenience. Would any of these slots work for you?\n\n📅 *Option 1:* {{slot_1}}\n📅 *Option 2:* {{slot_2}}' } },
      { id: 3, type: 'wa_footer', props: { text: '{{agent_name}} · {{company}} Sales Team' } },
      { id: 4, type: 'wa_button', props: { label: '📆 Book a Demo', url: 'https://cal.example.com/{{agent_name}}' } },
    ],
  },
  {
    id: 'tpl-011',
    name: 'Payment Received',
    channel: 'whatsapp',
    category: 'Transactional',
    usageCount: 56,
    waStatus: 'approved',
    blocks: [
      { id: 1, type: 'wa_header', props: { text: '💳 Payment Received — Thank You!' } },
      { id: 2, type: 'wa_body', props: { text: 'Hi {{first_name}},\n\nWe\'ve successfully received your payment. Here are the details:\n\n🧾 *Invoice:* #{{invoice_id}}\n💰 *Amount Paid:* ₹{{amount}}\n📅 *Date:* {{date}}\n🏦 *Mode:* {{payment_mode}}\n\nYour transaction ID is: *{{txn_id}}*\n\nA detailed receipt has been emailed to *{{email}}*.\n\nThank you for choosing *{{company}}*! 🙏' } },
      { id: 3, type: 'wa_footer', props: { text: 'Questions? Email billing@{{company}}.com' } },
      { id: 4, type: 'wa_button', props: { label: '🧾 Download Receipt', url: 'https://billing.example.com/receipt/{{invoice_id}}' } },
    ],
  },
  {
    id: 'tpl-012',
    name: 'Festive Offer',
    channel: 'whatsapp',
    category: 'Promotional',
    usageCount: 31,
    waStatus: 'approved',
    blocks: [
      { id: 1, type: 'wa_header', props: { text: '🎊 Diwali Special Offer from {{company}}!' } },
      { id: 2, type: 'wa_body', props: { text: 'Dear {{first_name}},\n\nWishing you and your family a very Happy Diwali! 🪔✨\n\nCelebrate this festive season with our exclusive Diwali deals:\n\n🎁 *Flat 40% OFF* on all premium plans\n🎁 *Free setup* worth ₹5,000\n🎁 *3 months extra* on annual plans\n\nOffer valid till: *{{expiry_date}}*\n\nUse code: *DIWALI40*\n\nLight up your business this season! 🚀' } },
      { id: 3, type: 'wa_footer', props: { text: 'T&C apply · Reply STOP to opt out' } },
      { id: 4, type: 'wa_button', props: { label: '🛍️ Grab the Offer', url: 'https://example.com/diwali-offer' } },
    ],
  },
];

// ─── Helper functions for localStorage ────────────────────────────────────────
const STORAGE_KEY = 'templates';

const loadTemplates = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && JSON.parse(saved).length > 0) {
    return JSON.parse(saved);
  }
  // First time: seed with INITIAL_TEMPLATES and save them
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TEMPLATES));
  return INITIAL_TEMPLATES;
};

const saveTemplates = (tpls) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tpls));
};

// ─── UI Components (filters, cards, stats, toast, confirm dialog) ────────────
const CHANNEL_TABS = [
  { label: 'All',      value: '' },
  { label: 'Email',    value: 'email' },
  { label: 'WhatsApp', value: 'whatsapp' },
];
const CATEGORIES = ['All Categories', 'Promotional', 'Transactional', 'Re-engagement', 'Onboarding', 'Announcement'];

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
        <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose}   className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message, type = 'success', onClose }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all
    ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
    <span>{type === 'success' ? '✓' : '✕'}</span>
    {message}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
  </div>
);

const EmailThumb = ({ blocks }) => {
  const accent = '#6366f1';
  return (
    <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
      <div className="h-2 rounded-full w-full" style={{ background: accent }} />
      {blocks.slice(0, 5).map((b, i) => {
        if (b.type === 'image')   return <div key={i} className="h-5 bg-slate-200 rounded" />;
        if (b.type === 'button')  return <div key={i} className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />;
        if (b.type === 'header')  return <div key={i} className="h-2 bg-indigo-200 rounded w-4/5" />;
        if (b.type === 'divider') return <div key={i} className="h-px bg-slate-200 w-full" />;
        if (b.type === 'columns') return (
          <div key={i} className="flex gap-1">
            <div className="flex-1 h-1.5 bg-slate-200 rounded" />
            <div className="flex-1 h-1.5 bg-slate-200 rounded" />
          </div>
        );
        if (b.type === 'footer')  return <div key={i} className="h-1 bg-slate-100 rounded w-3/4 mx-auto" />;
        return (
          <div key={i} className="space-y-0.5">
            <div className="h-1 bg-slate-200 rounded" />
            <div className="h-1 bg-slate-200 rounded w-3/4" />
          </div>
        );
      })}
    </div>
  );
};

const WAThumb = ({ blocks }) => (
  <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
    <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
      <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
      <div className="text-[7px] font-bold text-white">WhatsApp</div>
    </div>
    <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
      <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
        {blocks.filter(b => b.type === 'wa_header').slice(0, 1).map((_, i) => (
          <div key={i} className="h-1 bg-green-400 rounded w-full" />
        ))}
        {blocks.filter(b => b.type === 'wa_body').slice(0, 1).map((_, i) => (
          <React.Fragment key={i}>
            <div className="h-1 bg-green-300 rounded w-full" />
            <div className="h-1 bg-green-300 rounded w-4/5" />
            <div className="h-1 bg-green-300 rounded w-3/5" />
            <div className="h-1 bg-green-300 rounded w-2/3" />
          </React.Fragment>
        ))}
      </div>
      {blocks.find(b => b.type === 'wa_button') && (
        <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
      )}
    </div>
  </div>
);

const WAStatusBadge = ({ status }) => {
  if (!status) return null;
  if (status === 'approved') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
      ✓ Meta Approved
    </span>
  );
  if (status === 'pending') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600">
      ⏳ Pending Review
    </span>
  );
  if (status === 'rejected') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">
      ✕ Rejected
    </span>
  );
  return null;
};

const TemplateCard = ({ tpl, onEdit, onDuplicate, onDelete }) => {
  const isWA    = tpl.channel === 'whatsapp';
  const bg      = isWA ? 'bg-gradient-to-br from-green-50 to-emerald-100' : 'bg-gradient-to-br from-indigo-50 to-violet-100';
  const badgeBg = isWA ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
      <div onClick={onEdit} className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}>
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10" style={{ background: isWA ? '#25d366' : '#6366f1' }} />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full opacity-10" style={{ background: isWA ? '#25d366' : '#6366f1' }} />
        {isWA ? <WAThumb blocks={tpl.blocks} /> : <EmailThumb blocks={tpl.blocks} />}
      </div>
      <div onClick={onEdit} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
        <p className="font-semibold text-sm text-slate-800 truncate mb-1.5" title={tpl.name}>{tpl.name}</p>
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
            {isWA ? '💬 WhatsApp' : '✉️ Email'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
            {tpl.category}
          </span>
        </div>
        <WAStatusBadge status={tpl.waStatus} />
        <p className="text-[11px] text-slate-400 mt-1.5">
          📊 Used in {tpl.usageCount} campaign{tpl.usageCount !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
        <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
        <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
        <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className={`rounded-2xl p-4 border ${color}`}>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

// ─── Main Library Page ────────────────────────────────────────────────────────
export default function TemplateLibraryPage() {
  const [templates, setTemplates] = useState(loadTemplates);
  const [editingId, setEditingId] = useState(undefined); // undefined = not editing; null = new; string = edit
  const [channel, setChannel] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [search, setSearch] = useState('');
  const [catOpen, setCatOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const catRef = useRef();

  // Sync to localStorage whenever templates change
  useEffect(() => {
    saveTemplates(templates);
  }, [templates]);

  // Close category dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const emailCount    = templates.filter(t => t.channel === 'email').length;
  const waCount       = templates.filter(t => t.channel === 'whatsapp').length;
  const approvedCount = templates.filter(t => t.waStatus === 'approved').length;

  const filtered = templates.filter(t => {
    if (channel && t.channel !== channel) return false;
    if (category !== 'All Categories' && t.category.toLowerCase() !== category.toLowerCase()) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDuplicate = (tpl) => {
    const clone = {
      ...JSON.parse(JSON.stringify(tpl)),
      id: `tpl-${Date.now()}`,
      name: `${tpl.name} (Copy)`,
      usageCount: 0,
    };
    setTemplates(prev => [...prev, clone]);
    showToast(`"${tpl.name}" duplicated`);
  };

  const confirmDelete = () => {
    const tpl = templates.find(t => t.id === deleteTarget);
    setTemplates(prev => prev.filter(t => t.id !== deleteTarget));
    setDeleteTarget(null);
    showToast(`"${tpl?.name}" deleted`, 'error');
  };

  // If editing, show the editor
  if (editingId !== undefined) {
    return (
      <TemplateEditorPage
        templateId={editingId}
        onBack={(savedName) => {
          // Reload templates from localStorage after editor saves
          setTemplates(loadTemplates());
          setEditingId(undefined);
          if (savedName) showToast(`"${savedName}" saved successfully`);
        }}
      />
    );
  }

  // Library view
  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
          <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
        </div>
        <button onClick={() => setEditingId(null)} className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0">+ Create Template</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon="📁" label="Total Templates" value={templates.length} color="bg-white border-slate-200" />
        <StatCard icon="✉️" label="Email" value={emailCount} color="bg-indigo-50 border-indigo-200" />
        <StatCard icon="💬" label="WhatsApp" value={waCount} color="bg-green-50 border-green-200" />
        <StatCard icon="✅" label="WA Approved" value={approvedCount} color="bg-emerald-50 border-emerald-200" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
            {CHANNEL_TABS.map(tab => {
              const count = tab.value === '' ? templates.length : tab.value === 'email' ? emailCount : waCount;
              return (
                <button key={tab.value} onClick={() => setChannel(tab.value)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative" ref={catRef}>
            <button onClick={() => setCatOpen(o => !o)} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              {category} <span className="text-slate-400 text-[10px]">▾</span>
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
                {CATEGORIES.map(c => (
                  <div key={c} onClick={() => { setCategory(c); setCatOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'}`}>{c}</div>
                ))}
              </div>
            )}
          </div>

          <span className="text-xs text-slate-400 font-medium">{filtered.length} template{filtered.length !== 1 ? 's' : ''}</span>

          <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
            <span className="text-slate-400 text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400" />
            {search && <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 text-xs">×</button>}
          </div>
        </div>

        <div className="p-5">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🗂</div>
              <p className="text-sm font-semibold text-slate-700">No templates found</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or create a new template.</p>
              <button onClick={() => { setChannel(''); setCategory('All Categories'); setSearch(''); }} className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map(tpl => (
                <TemplateCard key={tpl.id} tpl={tpl} onEdit={() => setEditingId(tpl.id)} onDuplicate={() => handleDuplicate(tpl)} onDelete={() => setDeleteTarget(tpl.id)} />
              ))}
              <div onClick={() => setEditingId(null)} className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
                  <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Delete Template" message="Are you sure you want to delete this template? This action cannot be undone." />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}