

// // TemplateEditorPage.jsx – Exact UI matching ContactsPage (Plus Jakarta Sans)
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// // ===================== Load Font (same as ContactsPage) =====================
// const loadFont = () => {
//   if (!document.querySelector("#tpl-editor-font")) {
//     const link = document.createElement("link");
//     link.id = "tpl-editor-font";
//     link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//   }
//   if (!document.querySelector("#tpl-editor-style")) {
//     const style = document.createElement("style");
//     style.id = "tpl-editor-style";
//     style.textContent = `
//       * { font-family: 'Plus Jakarta Sans', sans-serif; }
//       .editor-heading {
//         font-family: 'Plus Jakarta Sans', sans-serif !important;
//         font-weight: 800 !important;
//         font-size: 26px !important;
//         line-height: 1.2 !important;
//         color: rgb(15, 23, 42) !important;
//       }
//       .editor-panel-title {
//         font-weight: 700 !important;
//         font-size: 11px !important;
//         letter-spacing: 0.5px !important;
//         color: #94a3b8 !important;
//       }
//     `;
//     document.head.appendChild(style);
//   }
// };

// // ===================== Mock API =====================
// const MOCK_TEMPLATES = {
//   '1': { id: '1', templateName: 'Newsletter Template', category: 'promotional', content: {} },
//   '2': { id: '2', templateName: 'Abandoned Cart', category: 'transactional', content: {} },
// };

// const useTemplateDetail = (id) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     if (!id) { setIsLoading(false); return; }
//     setTimeout(() => {
//       setData(MOCK_TEMPLATES[id] || null);
//       setIsLoading(false);
//     }, 300);
//   }, [id]);
//   return { data, isLoading };
// };

// const useCreateTemplate = () => {
//   const [isPending, setIsPending] = useState(false);
//   const mutate = (data, { onSuccess }) => {
//     setIsPending(true);
//     setTimeout(() => {
//       console.log('Created template:', data);
//       setIsPending(false);
//       if (onSuccess) onSuccess();
//     }, 800);
//   };
//   return { mutate, isPending };
// };

// const useUpdateTemplate = () => {
//   const [isPending, setIsPending] = useState(false);
//   const mutate = (data, { onSuccess }) => {
//     setIsPending(true);
//     setTimeout(() => {
//       console.log('Updated template:', data);
//       setIsPending(false);
//       if (onSuccess) onSuccess();
//     }, 800);
//   };
//   return { mutate, isPending };
// };

// const useBreakpoint = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const query = window.matchMedia('(max-width: 767px)');
//     const handler = (e) => setIsMobile(e.matches);
//     setIsMobile(query.matches);
//     query.addEventListener('change', handler);
//     return () => query.removeEventListener('change', handler);
//   }, []);
//   return isMobile;
// };

// // ===================== UI Components (same as ContactsPage) =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading, type = 'button' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//   };
//   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm" };
//   return (
//     <button type={type} onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const Input = ({ label, placeholder, error, ...props }) => (
//   <div className="space-y-1">
//     {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
//     <input
//       {...props}
//       placeholder={placeholder}
//       className={cn(
//         "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
//         error ? "border-red-300" : "border-slate-200"
//       )}
//     />
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Select = ({ label, options, error, ...props }) => (
//   <div className="space-y-1">
//     {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
//     <select
//       {...props}
//       className={cn(
//         "w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
//         error ? "border-red-300" : "border-slate-200"
//       )}
//     >
//       {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
//     </select>
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Alert = ({ children, variant = 'warning', title }) => {
//   const variantClass = variant === 'warning'
//     ? "bg-amber-50 border-amber-200 text-amber-800"
//     : "bg-blue-50 border-blue-200 text-blue-800";
//   return (
//     <div className={`rounded-xl border p-4 text-sm ${variantClass}`}>
//       {title && <p className="font-semibold mb-1">{title}</p>}
//       {children}
//     </div>
//   );
// };

// // ===================== Icons =====================
// const SaveIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const EyeIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//   </svg>
// );
// const XIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const MonitorIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//   </svg>
// );
// const SmartphoneIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//   </svg>
// );

// // ===================== Constants =====================
// const BLOCK_TYPES = ['Header', 'Text Block', 'Image', 'Button', 'Divider', 'Two Columns', 'Footer'];
// const MERGE_TAGS = ['{{first_name}}', '{{company}}', '{{email}}', '{{unsubscribe_url}}'];
// const CATEGORY_OPTIONS = [
//   { label: 'Promotional', value: 'promotional' },
//   { label: 'Transactional', value: 'transactional' },
//   { label: 'Re-engagement', value: 're_engagement' },
//   { label: 'Onboarding', value: 'onboarding' },
// ];

// // ===================== Main Editor Component =====================
// export default function TemplateEditorPage() {
//   useEffect(loadFont, []);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = !!id;
//   const isMobile = useBreakpoint();

//   const { data: existing, isLoading: isLoadingTemplate } = useTemplateDetail(id);
//   const createMutation = useCreateTemplate();
//   const updateMutation = useUpdateTemplate();

//   const [formData, setFormData] = useState({ name: '', category: 'promotional' });

//   useEffect(() => {
//     if (existing) setFormData({ name: existing.templateName || '', category: existing.category || 'promotional' });
//   }, [existing]);

//   const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

//   const handleSave = () => {
//     if (isEdit) {
//       updateMutation.mutate({ id, ...formData }, { onSuccess: () => navigate('/templates') });
//     } else {
//       createMutation.mutate(formData, { onSuccess: () => navigate('/templates') });
//     }
//   };

//   if (isMobile) {
//     return (
//       <div className="p-6 bg-slate-50 min-h-screen">
//         <Alert variant="warning" title="Desktop only">
//           Template editing requires a desktop or tablet. You can view templates in read-only mode on mobile.
//         </Alert>
//         <Button variant="secondary" className="mt-4" onClick={() => navigate('/templates')}>
//           Back to Templates
//         </Button>
//       </div>
//     );
//   }

//   if (isEdit && isLoadingTemplate) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="h-[calc(100vh-56px)] flex flex-col bg-slate-50">
//       {/* Toolbar */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 bg-white shrink-0">
//         <h1 className="editor-heading text-lg font-bold text-slate-900">
//           {isEdit ? (existing?.templateName || 'Template Editor') : 'New Template'}
//         </h1>
//         <div className="flex flex-wrap items-center gap-2">
//           <Button variant="ghost" size="sm" leftIcon={<MonitorIcon />}>Desktop</Button>
//           <Button variant="ghost" size="sm" leftIcon={<SmartphoneIcon />}>Mobile</Button>
//           <Button variant="secondary" size="sm" leftIcon={<EyeIcon />}>Preview</Button>
//           <Button variant="secondary" size="sm" leftIcon={<XIcon />} onClick={() => navigate('/templates')}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             size="sm"
//             leftIcon={<SaveIcon />}
//             onClick={handleSave}
//             loading={createMutation.isPending || updateMutation.isPending}
//           >
//             Save
//           </Button>
//         </div>
//       </div>

//       {/* Three-pane editor */}
//       <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
//         {/* Block Palette */}
//         <aside className="w-full md:w-48 border-r border-slate-200 bg-white p-3 overflow-y-auto shrink-0">
//           <p className="editor-panel-title uppercase tracking-widest mb-2">Content Blocks</p>
//           <div className="space-y-1.5">
//             {BLOCK_TYPES.map((b) => (
//               <div
//                 key={b}
//                 className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 cursor-grab hover:border-slate-300 hover:shadow-sm transition-all"
//                 draggable
//                 onDragStart={(e) => e.dataTransfer.setData('text/plain', b)}
//               >
//                 {b}
//               </div>
//             ))}
//           </div>
//           <p className="editor-panel-title uppercase tracking-widest mt-4 mb-2">Merge Tags</p>
//           <div className="space-y-1.5">
//             {MERGE_TAGS.map((t) => (
//               <div
//                 key={t}
//                 className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-mono text-cyan-700 cursor-pointer hover:border-slate-300 transition-all"
//                 onClick={() => console.log('Insert merge tag:', t)}
//               >
//                 {t}
//               </div>
//             ))}
//           </div>
//         </aside>

//         {/* Canvas – email preview stub */}
//         <main className="flex-1 bg-slate-100 flex items-start justify-center p-6 overflow-y-auto">
//           <div className="w-full max-w-[560px] bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="bg-indigo-600 px-6 py-5 text-center">
//               <p className="text-xs text-indigo-200 mb-1">WYNSync</p>
//               <p className="text-lg font-bold text-white">Your email heading here</p>
//             </div>
//             <div className="px-8 py-6">
//               <p className="text-sm text-slate-600 mb-4 leading-relaxed">
//                 Hi <span className="font-semibold text-indigo-600">{'{{first_name}}'}</span>,
//               </p>
//               <p className="text-sm text-slate-600 mb-5 leading-relaxed">
//                 Add your email content here. Drag blocks from the left panel to build your layout.
//               </p>
//               <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-xs text-slate-400 mb-5">
//                 📸 Image block placeholder
//               </div>
//               <div className="text-center mb-6">
//                 <div className="inline-block bg-indigo-600 text-white text-sm font-bold rounded-lg px-6 py-2.5">
//                   Call to Action →
//                 </div>
//               </div>
//               <hr className="border-slate-100 mb-4" />
//               <p className="text-xs text-slate-400 text-center leading-loose">
//                 WYNSync Pvt. Ltd.<br />
//                 <a className="underline">Unsubscribe</a> · <a className="underline">Update Preferences</a>
//               </p>
//             </div>
//           </div>
//         </main>

//         {/* Properties Panel */}
//         <aside className="w-full md:w-56 border-l border-slate-200 bg-white p-4 overflow-y-auto shrink-0">
//           <p className="editor-panel-title uppercase tracking-widest mb-3">Template Settings</p>
//           <div className="space-y-4">
//             <Input
//               label="Template Name"
//               placeholder="e.g. Product Update"
//               value={formData.name}
//               onChange={(e) => handleChange('name', e.target.value)}
//             />
//             <Select
//               label="Category"
//               options={CATEGORY_OPTIONS}
//               value={formData.category}
//               onChange={(e) => handleChange('category', e.target.value)}
//             />
//           </div>
//           <hr className="my-4 border-slate-100" />
//           <p className="text-xs text-slate-400">Click a block in the canvas to edit its properties here.</p>
//         </aside>
//       </div>
//     </div>
//   );
// }


// TemplateEditorPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ── Font Loader ────────────────────────────────────────────────────────────
const loadFont = () => {
  if (!document.querySelector('#tpl-editor-font')) {
    const link = document.createElement('link');
    link.id = 'tpl-editor-font';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

// ── Mock API ───────────────────────────────────────────────────────────────
const MOCK_TEMPLATES = {
  '1': { id: '1', templateName: 'Product Update',     channel: 'email', category: 'Announcement' },
  '2': { id: '2', templateName: 'Monthly Newsletter', channel: 'email', category: 'Promotional'  },
  '3': { id: '3', templateName: 'Onboarding Welcome', channel: 'email', category: 'Onboarding'   },
  '4': { id: '4', templateName: 'Re-engagement',      channel: 'email', category: 'Re-engagement'},
  '5': { id: '5', templateName: 'Flash Sale WA',      channel: 'whatsapp', category: 'Promotional'},
};

const useTemplateDetail = (id) => {
  const [data, setData]         = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) { setLoading(false); return; }
    const t = setTimeout(() => { setData(MOCK_TEMPLATES[id] || null); setLoading(false); }, 300);
    return () => clearTimeout(t);
  }, [id]);
  return { data, isLoading };
};

// ── Constants ──────────────────────────────────────────────────────────────
const BLOCK_TYPES = [
  { label: 'Header',      icon: '⬆️' },
  { label: 'Text Block',  icon: '📝' },
  { label: 'Image',       icon: '🖼️' },
  { label: 'Button',      icon: '⚪' },
  { label: 'Divider',     icon: '➖' },
  { label: 'Two Columns', icon: '🔲' },
  { label: 'Footer',      icon: '🟡' },
];

const MERGE_TAGS = ['{{first_name}}', '{{company}}', '{{email}}', '{{unsubscribe_url}}'];

const CATEGORY_OPTIONS = ['Announcement', 'Promotional', 'Transactional', 'Re-engagement', 'Onboarding'];

// ── Shared Input & Select ──────────────────────────────────────────────────
const FieldInput = ({ label, value, onChange, placeholder }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'inherit' }}>{label}</label>}
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 10, padding: '9px 12px', fontSize: 13, color: '#0F172A', background: '#fff', outline: 'none', fontFamily: 'inherit' }}
    />
  </div>
);

const FieldSelect = ({ label, value, onChange, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', fontFamily: 'inherit' }}>{label}</label>}
    <select
      value={value}
      onChange={onChange}
      style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 10, padding: '9px 12px', fontSize: 13, color: '#0F172A', background: '#fff', outline: 'none', fontFamily: 'inherit', appearance: 'auto' }}
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// ── Email Canvas Preview ───────────────────────────────────────────────────
const EmailCanvas = ({ maxWidth }) => (
  <div style={{ width: '100%', maxWidth, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
    {/* Header */}
    <div style={{ background: '#4F46E5', padding: '20px 24px', textAlign: 'center' }}>
      <p style={{ fontSize: 11, color: '#A5B4FC', marginBottom: 4, fontWeight: 500 }}>WYNSync</p>
      <p style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>What's new in WYNReach</p>
    </div>
    {/* Body */}
    <div style={{ padding: '24px 32px' }}>
      <p style={{ fontSize: 14, color: '#374151', marginBottom: 12, lineHeight: 1.6 }}>
        Hi <span style={{ color: '#4F46E5', fontWeight: 600 }}>{'{{first_name}}'}</span>,
      </p>
      <p style={{ fontSize: 14, color: '#374151', marginBottom: 16, lineHeight: 1.7 }}>
        We've been working hard to bring you powerful new features in WYNReach. Here's everything that's new this month — and what's coming next.
      </p>
      {/* Image placeholder */}
      <div style={{ background: '#EEF2FF', borderRadius: 8, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#94A3B8', fontSize: 13 }}>
        📷 Product screenshot placeholder
      </div>
      <p style={{ fontSize: 14, color: '#374151', marginBottom: 16, lineHeight: 1.7 }}>
        The new <strong>AI Copy Assistant</strong> generates subject lines, preview text, and full email body copy in seconds — tailored to your audience and campaign goal.
      </p>
      {/* CTA */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ display: 'inline-block', background: '#4F46E5', color: '#fff', fontWeight: 700, fontSize: 14, borderRadius: 10, padding: '12px 28px' }}>
          🚀 See What's New →
        </div>
      </div>
      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', marginBottom: 16 }} />
      <p style={{ fontSize: 13, color: '#374151', marginBottom: 20, lineHeight: 1.6 }}>
        Have questions? Just reply to this email — our team reads every message.
      </p>
      {/* Footer */}
      <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 16, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.9 }}>
          WYNSync Pvt. Ltd. · Kista, Stockholm<br />
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Unsubscribe</span>
          {' · '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Update Preferences</span><br />
          © 2026 WYNSync. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

// ── Main Editor Component ──────────────────────────────────────────────────
export default function TemplateEditorPage() {
  useEffect(loadFont, []);
  const navigate = useNavigate();
  const { id }   = useParams();
  const isEdit   = !!id;

  const { data: existing, isLoading } = useTemplateDetail(id);

  const [formData, setFormData] = useState({ name: '', category: 'Announcement' });
  const [viewMode, setViewMode] = useState('desktop');
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    if (existing) setFormData({ name: existing.templateName || '', category: existing.category || 'Announcement' });
  }, [existing]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); navigate('/templates'); }, 900);
  };

  const canvasMaxW = viewMode === 'mobile' ? 380 : 560;

  if (isEdit && isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #E2E8F0', borderTopColor: '#4F46E5', animation: 'spin .7s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', background: '#F8FAFC', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #E2E8F0', background: '#fff', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            {isEdit ? (existing?.templateName || 'Template Editor') + ' Template' : 'New Template'}
          </h1>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 3, fontWeight: 400 }}>
            {isEdit ? `${existing?.channel === 'email' ? 'Email' : 'WhatsApp'} Template · Last edited 2 days ago` : 'New template'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Desktop / Mobile toggle */}
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 8, padding: 3 }}>
            {['Desktop', 'Mobile'].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m.toLowerCase())}
                style={{
                  padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: viewMode === m.toLowerCase() ? '#fff' : 'transparent',
                  color: viewMode === m.toLowerCase() ? '#0F172A' : '#64748B',
                  boxShadow: viewMode === m.toLowerCase() ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                  transition: 'all .12s', fontFamily: 'inherit',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            👁 Preview
          </button>
          <button
            onClick={() => navigate('/templates')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', border: 'none', borderRadius: 8, background: '#4F46E5', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}
          >
            {saving
              ? <span style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', animation: 'spin .6s linear infinite', display: 'inline-block' }} />
              : '💾'}
            Save
          </button>
        </div>
      </div>

      {/* ── Three Panes ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left: Block Palette */}
        <aside style={{ width: 200, borderRight: '1px solid #E2E8F0', background: '#fff', padding: 12, overflowY: 'auto', flexShrink: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8 }}>Content Blocks</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {BLOCK_TYPES.map((b) => (
              <div
                key={b.label}
                draggable
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, fontWeight: 500, color: '#475569', cursor: 'grab', background: '#fff', transition: 'all .12s' }}
              >
                <span style={{ fontSize: 14 }}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#94A3B8', textTransform: 'uppercase', marginTop: 16, marginBottom: 8 }}>Merge Tags</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {MERGE_TAGS.map((t) => (
              <div
                key={t}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 7, fontSize: 11, fontFamily: 'monospace', color: '#0891B2', cursor: 'pointer', background: '#fff', transition: 'border-color .12s' }}
                onClick={() => console.log('Insert:', t)}
              >
                {t}
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Canvas */}
        <main style={{ flex: 1, background: '#EEF2FF', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '28px 24px', overflowY: 'auto' }}>
          {/* Scroll up indicator */}
          <div style={{ position: 'relative', width: '100%', maxWidth: canvasMaxW + 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ color: '#94A3B8', fontSize: 18 }}>▲</div>
            <EmailCanvas maxWidth={canvasMaxW} />
            <div style={{ color: '#94A3B8', fontSize: 18 }}>▼</div>
          </div>
        </main>

        {/* Right: Properties Panel */}
        <aside style={{ width: 220, borderLeft: '1px solid #E2E8F0', background: '#fff', padding: 16, overflowY: 'auto', flexShrink: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12 }}>Template Settings</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <FieldInput
              label="Template Name"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Product Update"
            />
            <FieldSelect
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
              options={CATEGORY_OPTIONS}
            />
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '16px 0' }} />
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8 }}>Selected Block</p>
          <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>Click a block in the canvas to edit its properties here.</p>
        </aside>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
