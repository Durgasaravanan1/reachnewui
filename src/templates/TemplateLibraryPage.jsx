

// // TemplateLibraryPage.jsx – Exact UI matching ContactsPage (Plus Jakarta Sans)
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ===================== Load Font (same as ContactsPage) =====================
// const loadFont = () => {
//   if (!document.querySelector("#tpl-font")) {
//     const link = document.createElement("link");
//     link.id = "tpl-font";
//     link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//   }
//   if (!document.querySelector("#tpl-font-style")) {
//     const style = document.createElement("style");
//     style.id = "tpl-font-style";
//     style.textContent = `
//       * { font-family: 'Plus Jakarta Sans', sans-serif; }
//       .tpl-heading {
//         font-family: 'Plus Jakarta Sans', sans-serif !important;
//         font-weight: 800 !important;
//         font-size: 26px !important;
//         line-height: 1.2 !important;
//         color: rgb(15, 23, 42) !important;
//         letter-spacing: -0.01em;
//       }
//       .tpl-card-title { font-weight: 600 !important; font-size: 14px !important; }
//       .tpl-badge { font-weight: 600 !important; font-size: 11px !important; }
//       .tpl-meta { font-weight: 400 !important; font-size: 11px !important; color: #94a3b8 !important; }
//     `;
//     document.head.appendChild(style);
//   }
// };

// // ===================== Mock Data =====================
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

// // ===================== Utility =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ===================== Icons =====================
// const PlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
//   </svg>
// );

// // ===================== UI Components =====================
// const Button = ({ children, variant, leftIcon, onClick, disabled, loading }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//   };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary)}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const PageHeader = ({ title, description, action }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//     <div>
//       <h1 className="tpl-heading">{title}</h1>
//       {description && <p className="text-sm text-slate-500 mt-1 font-normal">{description}</p>}
//     </div>
//     {action && <div>{action}</div>}
//   </div>
// );

// const Badge = ({ children, variant }) => {
//   const variants = {
//     email: "bg-indigo-50 text-indigo-700",
//     whatsapp: "bg-emerald-50 text-emerald-700",
//   };
//   const cls = variants[variant] || "bg-slate-100 text-slate-600";
//   return <span className={`inline-flex items-center rounded-full px-2 py-0.5 tpl-badge ${cls}`}>{children}</span>;
// };

// const FilterTabs = ({ tabs, active, onChange }) => (
//   <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
//     {tabs.map(tab => (
//       <button
//         key={tab.value}
//         onClick={() => onChange(tab.value)}
//         className={cn(
//           "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
//           active === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
//         )}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// );

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

// // Template card thumbnail
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

// const TemplateCard = ({ template, onClick }) => (
//   <div
//     onClick={onClick}
//     className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 hover:shadow-md transition-all hover:-translate-y-0.5 group"
//   >
//     <TemplateThumb template={template} />
//     <div className="p-3">
//       <p className="font-semibold text-sm text-slate-800 truncate mb-1">{template.templateName}</p>
//       <div className="flex items-center gap-1.5 flex-wrap">
//         <Badge variant={template.channel}>{template.channel === 'email' ? '✉️ Email' : '💬 WhatsApp'}</Badge>
//         <span className="text-[11px] font-medium text-slate-400 capitalize">{template.category}</span>
//       </div>
//       {template.whatsappMetaStatus && (
//         <p className={cn("text-[10px] font-semibold mt-1.5",
//           template.whatsappMetaStatus === 'approved' ? "text-emerald-600" : "text-amber-500"
//         )}>
//           {template.whatsappMetaStatus === 'approved' ? 'Meta Approved ✓' : `Meta: ${template.whatsappMetaStatus}`}
//         </p>
//       )}
//       <p className="tpl-meta mt-1">Used in {template.usageCount} campaigns</p>
//     </div>
//   </div>
// );

// // ===================== Main Component =====================
// export default function TemplateLibraryPage() {
//   useEffect(loadFont, []);
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

//   const handleCreateTemplate = () => navigate('/templates/new');
//   const handleEditTemplate = (id) => navigate(`/templates/${id}/edit`);

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       <PageHeader
//         title="Template Studio"
//         description="Reusable email and WhatsApp templates with merge tag support"
//         action={
//           <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateTemplate}>
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
//               <Button variant="primary" onClick={handleCreateTemplate}>
//                 Create First Template
//               </Button>
//             </EmptyState>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {templates.map(t => (
//                 <TemplateCard key={t.id} template={t} onClick={() => handleEditTemplate(t.id)} />
//               ))}
//               {/* New template placeholder */}
//               <div
//                 onClick={handleCreateTemplate}
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



// TemplateLibraryPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Font Loader ────────────────────────────────────────────────────────────
const loadFont = () => {
  if (!document.querySelector('#tpl-font')) {
    const link = document.createElement('link');
    link.id = 'tpl-font';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

// ── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_TEMPLATES = [
  { id: '1', templateName: 'Product Update',     channel: 'email',    category: 'Announcement', usageCount: 4, whatsappMetaStatus: null,      bg: '#EEF2FF', accent: '#4F46E5' },
  { id: '2', templateName: 'Monthly Newsletter', channel: 'email',    category: 'Promo',        usageCount: 6, whatsappMetaStatus: null,      bg: '#EDE9FE', accent: '#7C3AED' },
  { id: '3', templateName: 'Onboarding Welcome', channel: 'email',    category: 'Onboarding',   usageCount: 2, whatsappMetaStatus: null,      bg: '#ECFDF5', accent: '#10B981' },
  { id: '4', templateName: 'Re-engagement',      channel: 'email',    category: 'Re-engage',    usageCount: 1, whatsappMetaStatus: null,      bg: '#FFFBEB', accent: '#D97706' },
  { id: '5', templateName: 'Flash Sale WA',      channel: 'whatsapp', category: 'Promo',        usageCount: 3, whatsappMetaStatus: 'approved', bg: '#DCFCE7', accent: '#16A34A' },
];

const CHANNEL_TABS = [
  { label: 'All (18)',     value: '' },
  { label: 'Email (14)',   value: 'email' },
  { label: 'WhatsApp (4)', value: 'whatsapp' },
];

const CATEGORIES = ['All Categories', 'Promotional', 'Transactional', 'Re-engagement', 'Onboarding'];

// ── Template Thumbnail ─────────────────────────────────────────────────────
const TemplateThumb = ({ tpl }) => (
  <div style={{ height: 170, background: tpl.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #F1F5F9' }}>
    <div style={{ width: 90, background: '#fff', borderRadius: 8, padding: '10px 8px', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
      {tpl.channel === 'whatsapp' ? (
        <>
          <div style={{ background: tpl.accent, borderRadius: 4, padding: '3px 8px', color: '#fff', fontSize: 10, fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>WhatsApp</div>
          <div style={{ height: 4, background: '#E2E8F0', borderRadius: 2, marginBottom: 4 }} />
          <div style={{ height: 4, background: '#E2E8F0', borderRadius: 2, width: '80%', marginBottom: 4 }} />
          <div style={{ height: 4, background: '#E2E8F0', borderRadius: 2, width: '60%' }} />
        </>
      ) : (
        <>
          <div style={{ height: 5, background: tpl.accent, borderRadius: 2, marginBottom: 6 }} />
          <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2, width: '75%', marginBottom: 3 }} />
          <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2, width: '50%', marginBottom: 6 }} />
          <div style={{ height: 4, background: tpl.accent, borderRadius: 2, width: 40 }} />
        </>
      )}
    </div>
  </div>
);

// ── Badge ──────────────────────────────────────────────────────────────────
const Badge = ({ children, bg = '#EEF2FF', color = '#4338CA' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 999, background: bg, color, fontSize: 11, fontWeight: 600, fontFamily: 'inherit' }}>
    {children}
  </span>
);

// ── Template Card ──────────────────────────────────────────────────────────
const TemplateCard = ({ tpl, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff', borderRadius: 16, border: `1px solid ${hov ? '#CBD5E1' : '#E2E8F0'}`,
        overflow: 'hidden', cursor: 'pointer',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition: 'all .15s',
        boxShadow: hov ? '0 4px 16px rgba(0,0,0,.08)' : 'none',
      }}
    >
      <TemplateThumb tpl={tpl} />
      <div style={{ padding: '12px 14px' }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tpl.templateName}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
          {tpl.channel === 'email'
            ? <Badge bg="#EEF2FF" color="#4338CA">✉️ Email</Badge>
            : <Badge bg="#DCFCE7" color="#166534">💬 WhatsApp</Badge>}
          <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{tpl.category}</span>
        </div>
        {tpl.whatsappMetaStatus === 'approved' && <p style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', marginTop: 2 }}>Meta Approved ✓</p>}
        {tpl.whatsappMetaStatus === 'pending'  && <p style={{ fontSize: 11, fontWeight: 700, color: '#D97706', marginTop: 2 }}>Meta: pending</p>}
        <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Used in {tpl.usageCount} campaigns</p>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
export default function TemplateLibraryPage() {
  useEffect(loadFont, []);
  const navigate = useNavigate();
  const [channel, setChannel]   = useState('');
  const [category, setCategory] = useState('All Categories');
  const [search, setSearch]     = useState('');
  const [catOpen, setCatOpen]   = useState(false);
  const catRef = useRef();

  useEffect(() => {
    const h = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const filtered = MOCK_TEMPLATES.filter((t) => {
    if (channel && t.channel !== channel) return false;
    if (category !== 'All Categories' && t.category.toLowerCase() !== category.toLowerCase()) return false;
    if (search && !t.templateName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding: '28px 32px', background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#0F172A', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>Template Studio</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 6, fontWeight: 400 }}>Reusable email and WhatsApp templates with merge tag support</p>
        </div>
        <button
          onClick={() => navigate('/templates/new')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          + Create Template
        </button>
      </div>

      {/* Card */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,.04)', overflow: 'hidden' }}>
        {/* Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
          {/* Channel tabs */}
          <div style={{ display: 'flex', gap: 2, background: '#F1F5F9', borderRadius: 10, padding: 4 }}>
            {CHANNEL_TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setChannel(t.value)}
                style={{
                  padding: '6px 14px', borderRadius: 7, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: channel === t.value ? '#fff' : 'transparent',
                  color: channel === t.value ? '#0F172A' : '#64748B',
                  boxShadow: channel === t.value ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                  transition: 'all .12s', fontFamily: 'inherit',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Category dropdown */}
          <div ref={catRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setCatOpen((v) => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {category} <span style={{ fontSize: 11, color: '#94A3B8' }}>▾</span>
            </button>
            {catOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,.12)', zIndex: 100, minWidth: 180, overflow: 'hidden' }}>
                {CATEGORIES.map((c) => (
                  <div
                    key={c}
                    onClick={() => { setCategory(c); setCatOpen(false); }}
                    style={{ padding: '9px 14px', fontSize: 13, fontWeight: c === category ? 600 : 400, background: c === category ? '#4F46E5' : 'transparent', color: c === category ? '#fff' : '#374151', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '6px 12px', width: 220 }}>
            <span style={{ color: '#4F46E5', fontSize: 14 }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#374151', width: '100%', fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Template Grid */}
        <div style={{ padding: 20 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#374151' }}>No templates found</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>Try adjusting your filters or create a new template.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {filtered.map((t) => (
                <TemplateCard key={t.id} tpl={t} onClick={() => navigate(`/templates/${t.id}/edit`)} />
              ))}
              {/* New Template placeholder */}
              <div
                onClick={() => navigate('/templates/new')}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#94A3B8')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#CBD5E1')}
                style={{ borderRadius: 16, border: '2px dashed #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, cursor: 'pointer', transition: 'border-color .15s' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, color: '#94A3B8', marginBottom: 6 }}>+</div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', fontFamily: 'inherit' }}>New Template</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
