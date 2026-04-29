// // TemplateEditorPage.jsx
// import React, { useState, useEffect } from 'react';
// // Note: No external UI imports – everything is Tailwind + local state.

// // ===================== Mock API & Hooks =====================
// const MOCK_TEMPLATES = {
//   '1': { id: '1', templateName: 'Newsletter Template', category: 'promotional', content: {} },
//   '2': { id: '2', templateName: 'Abandoned Cart', category: 'transactional', content: {} },
// };

// const useTemplateDetail = (id) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     if (!id) {
//       setIsLoading(false);
//       return;
//     }
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

// // Simple breakpoint hook (replaces useBreakpoint)
// const useBreakpoint = (breakpoint = 'md') => {
//   const [matches, setMatches] = useState(false);
//   useEffect(() => {
//     const query = window.matchMedia('(min-width: 768px)');
//     const handler = (e) => setMatches(e.matches);
//     setMatches(query.matches);
//     query.addEventListener('change', handler);
//     return () => query.removeEventListener('change', handler);
//   }, []);
//   return !matches; // true on mobile (since original used "md" as desktop)
// };

// // Mock router navigation
// const useNavigate = () => {
//   return (to) => {
//     console.log(`Navigate to: ${to}`);
//     alert(`Navigate to: ${to}`); // visual feedback for demo
//   };
// };

// // Mock route constants
// const ROUTES = {
//   TEMPLATES: '/templates',
//   TEMPLATE_EDIT: (id) => `/templates/${id}/edit`,
// };

// // ===================== UI Components (Tailwind only) =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading, type = 'button' }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//   };
//   const sizes = {
//     sm: "px-2.5 py-1 text-xs",
//     md: "px-3 py-1.5 text-sm",
//   };
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

// // ===================== Icons (SVG) =====================
// const SaveIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//   </svg>
// );
// const EyeIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//   </svg>
// );
// const XIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );
// const MonitorIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//   </svg>
// );
// const SmartphoneIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
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

// // ===================== Main Component =====================
// export default function TemplateEditorPage() {
//   const navigate = useNavigate();
//   const { id } = { id: null }; // Simulate URL param – you can extract from window.location if needed
//   const isEdit = !!id;
//   const isMobile = useBreakpoint('md'); // true on mobile

//   const { data: existing } = useTemplateDetail(id || '');
//   const createMutation = useCreateTemplate();
//   const updateMutation = useUpdateTemplate();

//   const [formData, setFormData] = useState({
//     name: existing?.templateName || '',
//     category: existing?.category || 'promotional',
//   });

//   const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

//   const handleSave = () => {
//     if (isEdit) {
//       updateMutation.mutate({ id, ...formData }, { onSuccess: () => navigate(ROUTES.TEMPLATES) });
//     } else {
//       createMutation.mutate(formData, { onSuccess: () => navigate(ROUTES.TEMPLATES) });
//     }
//   };

//   if (isMobile) {
//     return (
//       <div className="p-6">
//         <Alert variant="warning" title="Desktop only">
//           Template editing requires a desktop or tablet. You can view templates in read-only mode on mobile.
//         </Alert>
//         <Button variant="secondary" className="mt-4" onClick={() => navigate(ROUTES.TEMPLATES)}>
//           Back to Templates
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[calc(100vh-56px)] flex flex-col">
//       {/* Toolbar */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 bg-white shrink-0">
//         <h1 className="text-sm font-bold text-slate-900">
//           {isEdit ? (existing?.templateName || 'Template Editor') : 'New Template'}
//         </h1>
//         <div className="flex flex-wrap items-center gap-2">
//           <Button variant="ghost" size="sm" leftIcon={<MonitorIcon />}>Desktop</Button>
//           <Button variant="ghost" size="sm" leftIcon={<SmartphoneIcon />}>Mobile</Button>
//           <Button variant="secondary" size="sm" leftIcon={<EyeIcon />}>Preview</Button>
//           <Button variant="secondary" size="sm" leftIcon={<XIcon />} onClick={() => navigate(ROUTES.TEMPLATES)}>
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
//         <aside className="w-full md:w-48 border-r border-slate-200 bg-slate-50 p-3 overflow-y-auto shrink-0">
//           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Content Blocks</p>
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
//           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4 mb-2">Merge Tags</p>
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

//         {/* Canvas — PLACEHOLDER (email preview stub) */}
//         <main className="flex-1 bg-slate-200 flex items-start justify-center p-6 overflow-y-auto">
//           <div className="w-full max-w-[560px] bg-white rounded-lg shadow-dropdown overflow-hidden">
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
//           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Template Settings</p>
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


// TemplateEditorPage.jsx – Full working with real navigation
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // ✅ real navigation + URL params

// ===================== Mock API & Hooks =====================
const MOCK_TEMPLATES = {
  '1': { id: '1', templateName: 'Newsletter Template', category: 'promotional', content: {} },
  '2': { id: '2', templateName: 'Abandoned Cart', category: 'transactional', content: {} },
};

const useTemplateDetail = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setData(MOCK_TEMPLATES[id] || null);
      setIsLoading(false);
    }, 300);
  }, [id]);
  return { data, isLoading };
};

const useCreateTemplate = () => {
  const [isPending, setIsPending] = useState(false);
  const mutate = (data, { onSuccess }) => {
    setIsPending(true);
    setTimeout(() => {
      console.log('Created template:', data);
      setIsPending(false);
      if (onSuccess) onSuccess();
    }, 800);
  };
  return { mutate, isPending };
};

const useUpdateTemplate = () => {
  const [isPending, setIsPending] = useState(false);
  const mutate = (data, { onSuccess }) => {
    setIsPending(true);
    setTimeout(() => {
      console.log('Updated template:', data);
      setIsPending(false);
      if (onSuccess) onSuccess();
    }, 800);
  };
  return { mutate, isPending };
};

// Simple breakpoint hook (replaces useBreakpoint)
const useBreakpoint = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(query.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

// ===================== UI Components (Tailwind only) =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading, type = 'button' }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
  };
  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const Input = ({ label, placeholder, error, ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
    <input
      {...props}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
        error ? "border-red-300" : "border-slate-200"
      )}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
        error ? "border-red-300" : "border-slate-200"
      )}
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Alert = ({ children, variant = 'warning', title }) => {
  const variantClass = variant === 'warning'
    ? "bg-amber-50 border-amber-200 text-amber-800"
    : "bg-blue-50 border-blue-200 text-blue-800";
  return (
    <div className={`rounded-xl border p-4 text-sm ${variantClass}`}>
      {title && <p className="font-semibold mb-1">{title}</p>}
      {children}
    </div>
  );
};

// ===================== Icons (SVG) =====================
const SaveIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const EyeIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const XIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const MonitorIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const SmartphoneIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

// ===================== Constants =====================
const BLOCK_TYPES = ['Header', 'Text Block', 'Image', 'Button', 'Divider', 'Two Columns', 'Footer'];
const MERGE_TAGS = ['{{first_name}}', '{{company}}', '{{email}}', '{{unsubscribe_url}}'];
const CATEGORY_OPTIONS = [
  { label: 'Promotional', value: 'promotional' },
  { label: 'Transactional', value: 'transactional' },
  { label: 'Re-engagement', value: 're_engagement' },
  { label: 'Onboarding', value: 'onboarding' },
];

// ===================== Main Component =====================
export default function TemplateEditorPage() {
  const navigate = useNavigate();    // ✅ real navigation
  const { id } = useParams();        // ✅ real URL parameter
  const isEdit = !!id;
  const isMobile = useBreakpoint();

  const { data: existing, isLoading: isLoadingTemplate } = useTemplateDetail(id);
  const createMutation = useCreateTemplate();
  const updateMutation = useUpdateTemplate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'promotional',
  });

  // Load existing data when editing
  useEffect(() => {
    if (existing) {
      setFormData({
        name: existing.templateName || '',
        category: existing.category || 'promotional',
      });
    }
  }, [existing]);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (isEdit) {
      updateMutation.mutate(
        { id, ...formData },
        { onSuccess: () => navigate('/templates') }
      );
    } else {
      createMutation.mutate(
        formData,
        { onSuccess: () => navigate('/templates') }
      );
    }
  };

  if (isMobile) {
    return (
      <div className="p-6">
        <Alert variant="warning" title="Desktop only">
          Template editing requires a desktop or tablet. You can view templates in read-only mode on mobile.
        </Alert>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/templates')}>
          Back to Templates
        </Button>
      </div>
    );
  }

  if (isEdit && isLoadingTemplate) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 bg-white shrink-0">
        <h1 className="text-sm font-bold text-slate-900">
          {isEdit ? (existing?.templateName || 'Template Editor') : 'New Template'}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" leftIcon={<MonitorIcon />}>Desktop</Button>
          <Button variant="ghost" size="sm" leftIcon={<SmartphoneIcon />}>Mobile</Button>
          <Button variant="secondary" size="sm" leftIcon={<EyeIcon />}>Preview</Button>
          <Button variant="secondary" size="sm" leftIcon={<XIcon />} onClick={() => navigate('/templates')}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<SaveIcon />}
            onClick={handleSave}
            loading={createMutation.isPending || updateMutation.isPending}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Three-pane editor */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Block Palette */}
        <aside className="w-full md:w-48 border-r border-slate-200 bg-slate-50 p-3 overflow-y-auto shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Content Blocks</p>
          <div className="space-y-1.5">
            {BLOCK_TYPES.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 cursor-grab hover:border-slate-300 hover:shadow-sm transition-all"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', b)}
              >
                {b}
              </div>
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4 mb-2">Merge Tags</p>
          <div className="space-y-1.5">
            {MERGE_TAGS.map((t) => (
              <div
                key={t}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-mono text-cyan-700 cursor-pointer hover:border-slate-300 transition-all"
                onClick={() => console.log('Insert merge tag:', t)}
              >
                {t}
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas — PLACEHOLDER (email preview stub) */}
        <main className="flex-1 bg-slate-200 flex items-start justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-[560px] bg-white rounded-lg shadow-dropdown overflow-hidden">
            <div className="bg-indigo-600 px-6 py-5 text-center">
              <p className="text-xs text-indigo-200 mb-1">WYNSync</p>
              <p className="text-lg font-bold text-white">Your email heading here</p>
            </div>
            <div className="px-8 py-6">
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Hi <span className="font-semibold text-indigo-600">{'{{first_name}}'}</span>,
              </p>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                Add your email content here. Drag blocks from the left panel to build your layout.
              </p>
              <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-xs text-slate-400 mb-5">
                📸 Image block placeholder
              </div>
              <div className="text-center mb-6">
                <div className="inline-block bg-indigo-600 text-white text-sm font-bold rounded-lg px-6 py-2.5">
                  Call to Action →
                </div>
              </div>
              <hr className="border-slate-100 mb-4" />
              <p className="text-xs text-slate-400 text-center leading-loose">
                WYNSync Pvt. Ltd.<br />
                <a className="underline">Unsubscribe</a> · <a className="underline">Update Preferences</a>
              </p>
            </div>
          </div>
        </main>

        {/* Properties Panel */}
        <aside className="w-full md:w-56 border-l border-slate-200 bg-white p-4 overflow-y-auto shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Template Settings</p>
          <div className="space-y-4">
            <Input
              label="Template Name"
              placeholder="e.g. Product Update"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <Select
              label="Category"
              options={CATEGORY_OPTIONS}
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
          </div>
          <hr className="my-4 border-slate-100" />
          <p className="text-xs text-slate-400">Click a block in the canvas to edit its properties here.</p>
        </aside>
      </div>
    </div>
  );
}