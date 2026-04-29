// // TemplateLibraryPage.jsx
// import React, { useState, useEffect } from 'react';

// // ===================== Mock Data & API Simulation =====================
// const MOCK_TEMPLATES = [
//   { id: '1', templateName: 'Welcome Email', channel: 'email', category: 'onboarding', usageCount: 12, whatsappMetaStatus: null },
//   { id: '2', templateName: 'Abandoned Cart', channel: 'email', category: 'transactional', usageCount: 8, whatsappMetaStatus: null },
//   { id: '3', templateName: 'Flash Sale Alert', channel: 'email', category: 'promotional', usageCount: 5, whatsappMetaStatus: null },
//   { id: '4', templateName: 'Order Update', channel: 'whatsapp', category: 'transactional', usageCount: 3, whatsappMetaStatus: 'approved' },
//   { id: '5', templateName: 'Customer Feedback', channel: 'whatsapp', category: 'feedback', usageCount: 2, whatsappMetaStatus: 'pending' },
//   { id: '6', templateName: 'Weekly Newsletter', channel: 'email', category: 'promotional', usageCount: 9, whatsappMetaStatus: null },
// ];

// const useTemplateList = ({ channel, search }) => {
//   const [data, setData] = useState({ items: [] });
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       let filtered = [...MOCK_TEMPLATES];
//       if (channel) filtered = filtered.filter(t => t.channel === channel);
//       if (search) {
//         const q = search.toLowerCase();
//         filtered = filtered.filter(t => t.templateName.toLowerCase().includes(q));
//       }
//       setData({ items: filtered });
//       setIsLoading(false);
//     }, 400);
//   }, [channel, search]);
//   return { data, isLoading };
// };

// // ===================== Utility Functions =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // Simple router mock (replace with real useNavigate if needed)
// const useNavigate = () => {
//   return (to) => {
//     console.log(`Navigate to: ${to}`);
//     alert(`Navigate to: ${to}`);
//   };
// };

// const ROUTES = {
//   TEMPLATE_NEW: '/templates/new',
//   TEMPLATE_EDIT: (id) => `/templates/${id}/edit`,
// };

// // ===================== Icons (SVG) =====================
// const PlusIcon = () => (
//   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//   };
//   const variantClass = variants[variant] || variants.primary;
//   return (
//     <button onClick={onClick} className={`${base} ${variantClass}`}>
//       {leftIcon && leftIcon}
//       {children}
//     </button>
//   );
// };

// const PageHeader = ({ title, description, action }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//     <div>
//       <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
//       {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
//     </div>
//     {action && <div>{action}</div>}
//   </div>
// );

// const Badge = ({ children, variant, className }) => {
//   const variants = {
//     email: 'bg-indigo-50 text-indigo-700',
//     whatsapp: 'bg-emerald-50 text-emerald-700',
//   };
//   const variantClass = variants[variant] || 'bg-slate-100 text-slate-600';
//   return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${variantClass} ${className || ''}`}>{children}</span>;
// };

// const FilterTabs = ({ tabs, active, onChange }) => {
//   return (
//     <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
//       {tabs.map(tab => (
//         <button
//           key={tab.value}
//           onClick={() => onChange(tab.value)}
//           className={cn(
//             "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
//             active === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
//           )}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// const SearchInput = ({ placeholder, onSearch, className }) => {
//   const [value, setValue] = useState('');
//   useEffect(() => {
//     const timer = setTimeout(() => onSearch(value), 300);
//     return () => clearTimeout(timer);
//   }, [value, onSearch]);
//   return (
//     <input
//       type="text"
//       placeholder={placeholder}
//       value={value}
//       onChange={e => setValue(e.target.value)}
//       className={cn("border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
//     />
//   );
// };

// const Spinner = () => (
//   <div className="flex justify-center py-12">
//     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
//   </div>
// );

// const EmptyState = ({ title, description, children }) => (
//   <div className="text-center py-12">
//     <p className="text-lg font-semibold text-slate-800">{title}</p>
//     <p className="text-sm text-slate-500 mt-1">{description}</p>
//     {children && <div className="mt-4">{children}</div>}
//   </div>
// );

// // ===================== TemplateThumb and TemplateCard =====================
// const TemplateThumb = ({ template }) => {
//   const accent = template.channel === 'whatsapp' ? '#25D366' : '#4F46E5';
//   return (
//     <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-b border-slate-100">
//       <div className="w-16 bg-white rounded shadow-sm p-2">
//         <div className="h-1.5 rounded mb-1.5" style={{ background: accent }} />
//         <div className="h-1 bg-slate-200 rounded mb-1" />
//         <div className="h-1 bg-slate-200 rounded w-2/3 mb-1" />
//         <div className="h-1.5 w-8 rounded mt-1.5" style={{ background: accent }} />
//       </div>
//     </div>
//   );
// };

// const TemplateCard = ({ template, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 hover:shadow-md transition-all hover:-translate-y-0.5 group"
//     >
//       <TemplateThumb template={template} />
//       <div className="p-3">
//         <p className="font-semibold text-sm text-slate-800 truncate mb-2">{template.templateName}</p>
//         <div className="flex items-center gap-1.5 flex-wrap">
//           <Badge variant={template.channel} className="text-[10px]">
//             {template.channel === 'email' ? '✉️ Email' : '💬 WhatsApp'}
//           </Badge>
//           <span className="text-[10px] font-medium text-slate-400 capitalize">{template.category}</span>
//         </div>
//         {template.whatsappMetaStatus && (
//           <p className={cn('text-[10px] font-semibold mt-1.5',
//             template.whatsappMetaStatus === 'approved' ? 'text-emerald-600' : 'text-amber-500'
//           )}>
//             {template.whatsappMetaStatus === 'approved' ? 'Meta Approved ✓' : `Meta: ${template.whatsappMetaStatus}`}
//           </p>
//         )}
//         <p className="text-[10px] text-slate-400 mt-1">Used in {template.usageCount} campaigns</p>
//       </div>
//     </div>
//   );
// };

// // ===================== Main Component =====================
// export default function TemplateLibraryPage() {
//   const navigate = useNavigate();
//   const [channel, setChannel] = useState('');
//   const [search, setSearch] = useState('');

//   const { data, isLoading } = useTemplateList({ channel: channel || undefined, search: search || undefined });
//   const templates = data?.items ?? [];

//   const CHANNEL_TABS = [
//     { label: 'All', value: '' },
//     { label: 'Email', value: 'email' },
//     { label: 'WhatsApp', value: 'whatsapp' },
//   ];

//   return (
//     <div className="p-4 md:p-6">
//       <PageHeader
//         title="Template Studio"
//         description="Reusable email and WhatsApp templates with merge tag support"
//         action={
//           <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => navigate(ROUTES.TEMPLATE_NEW)}>
//             Create Template
//           </Button>
//         }
//       />

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <FilterTabs tabs={CHANNEL_TABS} active={channel} onChange={setChannel} />
//           <SearchInput placeholder="Search templates…" onSearch={setSearch} className="ml-auto w-56" />
//         </div>

//         <div className="p-5">
//           {isLoading ? (
//             <Spinner />
//           ) : templates.length === 0 ? (
//             <EmptyState
//               title="No templates yet"
//               description="Create reusable email and WhatsApp templates to save time."
//             >
//               <Button variant="primary" onClick={() => navigate(ROUTES.TEMPLATE_NEW)}>
//                 Create First Template
//               </Button>
//             </EmptyState>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {templates.map((t) => (
//                 <TemplateCard key={t.id} template={t} onClick={() => navigate(ROUTES.TEMPLATE_EDIT(t.id))} />
//               ))}
//               <div
//                 onClick={() => navigate(ROUTES.TEMPLATE_NEW)}
//                 className="rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center min-h-[180px] cursor-pointer hover:border-slate-400 transition-colors"
//               >
//                 <div className="text-center">
//                   <div className="text-2xl mb-2 opacity-40">＋</div>
//                   <p className="text-xs font-semibold text-slate-400">New Template</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// TemplateLibraryPage.jsx – Full working version with real navigation
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ real navigation

// ===================== Mock Data & API Simulation =====================
const MOCK_TEMPLATES = [
  { id: '1', templateName: 'Welcome Email', channel: 'email', category: 'onboarding', usageCount: 12, whatsappMetaStatus: null },
  { id: '2', templateName: 'Abandoned Cart', channel: 'email', category: 'transactional', usageCount: 8, whatsappMetaStatus: null },
  { id: '3', templateName: 'Flash Sale Alert', channel: 'email', category: 'promotional', usageCount: 5, whatsappMetaStatus: null },
  { id: '4', templateName: 'Order Update', channel: 'whatsapp', category: 'transactional', usageCount: 3, whatsappMetaStatus: 'approved' },
  { id: '5', templateName: 'Customer Feedback', channel: 'whatsapp', category: 'feedback', usageCount: 2, whatsappMetaStatus: 'pending' },
  { id: '6', templateName: 'Weekly Newsletter', channel: 'email', category: 'promotional', usageCount: 9, whatsappMetaStatus: null },
];

const useTemplateList = ({ channel, search }) => {
  const [data, setData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...MOCK_TEMPLATES];
      if (channel) filtered = filtered.filter(t => t.channel === channel);
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(t => t.templateName.toLowerCase().includes(q));
      }
      setData({ items: filtered });
      setIsLoading(false);
    }, 400);
  }, [channel, search]);
  return { data, isLoading };
};

// ===================== Utility Functions =====================
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===================== Icons (SVG) =====================
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

// ===================== UI Components =====================
const Button = ({ children, variant, leftIcon, onClick }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
  };
  const variantClass = variants[variant] || variants.primary;
  return (
    <button onClick={onClick} className={`${base} ${variantClass}`}>
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

const Badge = ({ children, variant, className }) => {
  const variants = {
    email: 'bg-indigo-50 text-indigo-700',
    whatsapp: 'bg-emerald-50 text-emerald-700',
  };
  const variantClass = variants[variant] || 'bg-slate-100 text-slate-600';
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${variantClass} ${className || ''}`}>{children}</span>;
};

const FilterTabs = ({ tabs, active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
            active === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const SearchInput = ({ placeholder, onSearch, className }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
      className={cn("border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
    />
  );
};

const Spinner = () => (
  <div className="flex justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
  </div>
);

const EmptyState = ({ title, description, children }) => (
  <div className="text-center py-12">
    <p className="text-lg font-semibold text-slate-800">{title}</p>
    <p className="text-sm text-slate-500 mt-1">{description}</p>
    {children && <div className="mt-4">{children}</div>}
  </div>
);

// ===================== TemplateThumb and TemplateCard =====================
const TemplateThumb = ({ template }) => {
  const accent = template.channel === 'whatsapp' ? '#25D366' : '#4F46E5';
  return (
    <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-b border-slate-100">
      <div className="w-16 bg-white rounded shadow-sm p-2">
        <div className="h-1.5 rounded mb-1.5" style={{ background: accent }} />
        <div className="h-1 bg-slate-200 rounded mb-1" />
        <div className="h-1 bg-slate-200 rounded w-2/3 mb-1" />
        <div className="h-1.5 w-8 rounded mt-1.5" style={{ background: accent }} />
      </div>
    </div>
  );
};

const TemplateCard = ({ template, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 hover:shadow-md transition-all hover:-translate-y-0.5 group"
    >
      <TemplateThumb template={template} />
      <div className="p-3">
        <p className="font-semibold text-sm text-slate-800 truncate mb-2">{template.templateName}</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant={template.channel} className="text-[10px]">
            {template.channel === 'email' ? '✉️ Email' : '💬 WhatsApp'}
          </Badge>
          <span className="text-[10px] font-medium text-slate-400 capitalize">{template.category}</span>
        </div>
        {template.whatsappMetaStatus && (
          <p className={cn('text-[10px] font-semibold mt-1.5',
            template.whatsappMetaStatus === 'approved' ? 'text-emerald-600' : 'text-amber-500'
          )}>
            {template.whatsappMetaStatus === 'approved' ? 'Meta Approved ✓' : `Meta: ${template.whatsappMetaStatus}`}
          </p>
        )}
        <p className="text-[10px] text-slate-400 mt-1">Used in {template.usageCount} campaigns</p>
      </div>
    </div>
  );
};

// ===================== Main Component =====================
export default function TemplateLibraryPage() {
  const navigate = useNavigate(); // ✅ React Router navigation
  const [channel, setChannel] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useTemplateList({ channel: channel || undefined, search: search || undefined });
  const templates = data?.items ?? [];

  const CHANNEL_TABS = [
    { label: 'All', value: '' },
    { label: 'Email', value: 'email' },
    { label: 'WhatsApp', value: 'whatsapp' },
  ];

  const handleCreateTemplate = () => {
    navigate('/templates/new');
  };

  const handleEditTemplate = (id) => {
    navigate(`/templates/${id}/edit`);
  };

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Template Studio"
        description="Reusable email and WhatsApp templates with merge tag support"
        action={
          <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateTemplate}>
            Create Template
          </Button>
        }
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          <FilterTabs tabs={CHANNEL_TABS} active={channel} onChange={setChannel} />
          <SearchInput placeholder="Search templates…" onSearch={setSearch} className="ml-auto w-56" />
        </div>

        <div className="p-5">
          {isLoading ? (
            <Spinner />
          ) : templates.length === 0 ? (
            <EmptyState
              title="No templates yet"
              description="Create reusable email and WhatsApp templates to save time."
            >
              <Button variant="primary" onClick={handleCreateTemplate}>
                Create First Template
              </Button>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {templates.map((t) => (
                <TemplateCard key={t.id} template={t} onClick={() => handleEditTemplate(t.id)} />
              ))}
              {/* New Template card */}
              <div
                onClick={handleCreateTemplate}
                className="rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center min-h-[180px] cursor-pointer hover:border-slate-400 transition-colors"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 opacity-40">＋</div>
                  <p className="text-xs font-semibold text-slate-400">New Template</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}