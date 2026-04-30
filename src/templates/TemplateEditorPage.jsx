// TemplateEditorPage.jsx – Tailwind CSS only, no inline styles (except dynamic widths)
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

// ── Shared Input & Select (Tailwind) ───────────────────────────────────────
const FieldInput = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    />
  </div>
);

const FieldSelect = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// ── Email Canvas Preview (Tailwind + static content) ───────────────────────
const EmailCanvas = ({ maxWidth }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ width: '100%', maxWidth }}>
    {/* Header */}
    <div className="bg-indigo-600 py-5 px-6 text-center">
      <p className="text-[11px] text-indigo-200 font-medium mb-1">WYNSync</p>
      <p className="text-lg font-bold text-white">What's new in WYNReach</p>
    </div>
    {/* Body */}
    <div className="px-8 py-6">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Hi <span className="text-indigo-600 font-semibold">{'{{first_name}}'}</span>,
      </p>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        We've been working hard to bring you powerful new features in WYNReach. Here's everything that's new this month — and what's coming next.
      </p>
      {/* Image placeholder */}
      <div className="bg-indigo-50 h-32 rounded-lg flex items-center justify-center text-slate-400 text-sm mb-4">
        📷 Product screenshot placeholder
      </div>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        The new <strong>AI Copy Assistant</strong> generates subject lines, preview text, and full email body copy in seconds — tailored to your audience and campaign goal.
      </p>
      {/* CTA */}
      <div className="text-center mb-5">
        <div className="inline-block bg-indigo-600 text-white font-bold text-sm rounded-xl px-7 py-3">
          🚀 See What's New →
        </div>
      </div>
      <hr className="border-slate-100 mb-4" />
      <p className="text-sm text-slate-600 mb-5 leading-relaxed">
        Have questions? Just reply to this email — our team reads every message.
      </p>
      {/* Footer */}
      <div className="bg-slate-50 rounded-lg p-4 text-center">
        <p className="text-xs text-slate-400 leading-relaxed">
          WYNSync Pvt. Ltd. · Kista, Stockholm<br />
          <span className="underline cursor-pointer">Unsubscribe</span>
          {' · '}
          <span className="underline cursor-pointer">Update Preferences</span><br />
          © 2026 WYNSync. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

// ── Main Editor Component (Tailwind, no inline styles except dynamic width) ─
export default function TemplateEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: existing, isLoading } = useTemplateDetail(id);

  const [formData, setFormData] = useState({ name: '', category: 'Announcement' });
  const [viewMode, setViewMode] = useState('desktop');
  const [saving, setSaving] = useState(false);

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
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-slate-50">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white shrink-0">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
            {isEdit ? (existing?.templateName || 'Template Editor') + ' Template' : 'New Template'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEdit ? `${existing?.channel === 'email' ? 'Email' : 'WhatsApp'} Template · Last edited 2 days ago` : 'New template'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop / Mobile toggle */}
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {['Desktop', 'Mobile'].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m.toLowerCase())}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  viewMode === m.toLowerCase()
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50">
            👁 Preview
          </button>
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-70"
          >
            {saving && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            💾 Save
          </button>
        </div>
      </div>

      {/* ── Three Panes ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: Block Palette */}
        <aside className="w-48 border-r border-slate-200 bg-white p-3 overflow-y-auto shrink-0">
          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase mb-2">Content Blocks</p>
          <div className="flex flex-col gap-1.5">
            {BLOCK_TYPES.map((b) => (
              <div
                key={b.label}
                draggable
                className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 cursor-grab bg-white hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <span className="text-sm">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>

          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase mt-4 mb-2">Merge Tags</p>
          <div className="flex flex-col gap-1">
            {MERGE_TAGS.map((t) => (
              <div
                key={t}
                className="px-2.5 py-1.5 border border-slate-200 rounded-md text-[11px] font-mono text-cyan-700 cursor-pointer bg-white hover:border-slate-300 transition-colors"
                onClick={() => console.log('Insert:', t)}
              >
                {t}
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Canvas */}
        <main className="flex-1 bg-indigo-50 flex justify-start items-start p-6 overflow-y-auto">
          <div className="w-full flex flex-col items-center gap-2" style={{ maxWidth: canvasMaxW + 48 }}>
            <div className="text-slate-400 text-lg">▲</div>
            <EmailCanvas maxWidth={canvasMaxW} />
            <div className="text-slate-400 text-lg">▼</div>
          </div>
        </main>

        {/* Right: Properties Panel */}
        <aside className="w-56 border-l border-slate-200 bg-white p-4 overflow-y-auto shrink-0">
          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase mb-3">Template Settings</p>
          <div className="flex flex-col gap-3">
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
          <hr className="my-4 border-slate-100" />
          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase mb-2">Selected Block</p>
          <p className="text-xs text-slate-400 leading-relaxed">Click a block in the canvas to edit its properties here.</p>
        </aside>
      </div>
    </div>
  );
}