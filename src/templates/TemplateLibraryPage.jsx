// TemplateLibraryPage.jsx – Tailwind CSS only
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

// ── Template Thumbnail (uses inline styles only for template‑specific colours) ──
const TemplateThumb = ({ tpl }) => (
  <div className="h-[170px] flex items-center justify-center border-b border-slate-100" style={{ background: tpl.bg }}>
    <div className="w-[90px] bg-white rounded-lg p-2.5 shadow-sm">
      {tpl.channel === 'whatsapp' ? (
        <>
          <div className="text-center text-white text-[10px] font-bold py-0.5 mb-1.5 rounded" style={{ background: tpl.accent }}>WhatsApp</div>
          <div className="h-1 bg-slate-200 rounded mb-1" />
          <div className="h-1 bg-slate-200 rounded w-4/5 mb-1" />
          <div className="h-1 bg-slate-200 rounded w-3/5" />
        </>
      ) : (
        <>
          <div className="h-1 rounded mb-1.5" style={{ background: tpl.accent }} />
          <div className="h-0.5 bg-slate-200 rounded mb-0.5" />
          <div className="h-0.5 bg-slate-200 rounded w-3/4 mb-0.5" />
          <div className="h-0.5 bg-slate-200 rounded w-1/2 mb-1.5" />
          <div className="h-1 w-10 rounded" style={{ background: tpl.accent }} />
        </>
      )}
    </div>
  </div>
);

// ── Badge (standardised) ──
const Badge = ({ children, bg = '#EEF2FF', color = '#4338CA' }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: bg, color }}>
    {children}
  </span>
);

// ── Template Card (Tailwind only) ──
const TemplateCard = ({ tpl, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
  >
    <TemplateThumb tpl={tpl} />
    <div className="p-3.5">
      <p className="font-bold text-sm text-slate-800 truncate mb-1.5">{tpl.templateName}</p>
      <div className="flex items-center gap-1.5 flex-wrap mb-1">
        {tpl.channel === 'email'
          ? <Badge bg="#EEF2FF" color="#4338CA">✉️ Email</Badge>
          : <Badge bg="#DCFCE7" color="#166534">💬 WhatsApp</Badge>}
        <span className="text-[11px] font-medium text-slate-400">{tpl.category}</span>
      </div>
      {tpl.whatsappMetaStatus === 'approved' && <p className="text-[11px] font-bold text-emerald-600 mt-0.5">Meta Approved ✓</p>}
      {tpl.whatsappMetaStatus === 'pending'  && <p className="text-[11px] font-bold text-amber-500 mt-0.5">Meta: pending</p>}
      <p className="text-[11px] text-slate-400 mt-1">Used in {tpl.usageCount} campaigns</p>
    </div>
  </div>
);

// ── Main Component ──
export default function TemplateLibraryPage() {
  const navigate = useNavigate();
  const [channel, setChannel]   = useState('');
  const [category, setCategory] = useState('All Categories');
  const [search, setSearch]     = useState('');
  const [catOpen, setCatOpen]   = useState(false);
  const catRef = useRef();

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = MOCK_TEMPLATES.filter((t) => {
    if (channel && t.channel !== channel) return false;
    if (category !== 'All Categories' && t.category.toLowerCase() !== category.toLowerCase()) return false;
    if (search && !t.templateName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Template Studio</h1>
          <p className="text-sm text-slate-500 mt-1.5 font-normal">Reusable email and WhatsApp templates with merge tag support</p>
        </div>
        <button
          onClick={() => navigate('/templates/new')}
          className="inline-flex items-center gap-1.5 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          + Create Template
        </button>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          {/* Channel tabs */}
          <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
            {CHANNEL_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setChannel(tab.value)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  channel === tab.value
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category dropdown */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {category} <span className="text-slate-400 text-xs">▾</span>
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-[180px] overflow-hidden">
                {CATEGORIES.map((c) => (
                  <div
                    key={c}
                    onClick={() => { setCategory(c); setCatOpen(false); }}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      category === c
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
            <span className="text-indigo-500 text-sm">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="border-none bg-transparent outline-none text-sm text-slate-700 w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Grid area */}
        <div className="p-5">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base font-semibold text-slate-700">No templates found</p>
              <p className="text-sm text-slate-400 mt-1.5">Try adjusting your filters or create a new template.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filtered.map((tpl) => (
                <TemplateCard key={tpl.id} tpl={tpl} onClick={() => navigate(`/templates/${tpl.id}/edit`)} />
              ))}
              {/* New template placeholder */}
              <div
                onClick={() => navigate('/templates/new')}
                className="rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[262px] cursor-pointer transition-colors hover:border-slate-400"
              >
                <div className="text-center">
                  <div className="text-3xl text-slate-400 mb-1">+</div>
                  <p className="text-sm font-semibold text-slate-400">New Template</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}