import React, { useState, useMemo, useEffect } from "react";

/* ─── AVATAR COLORS ─────────────────────────────────────────────── */
const AVATAR_COLORS = [
  ["#4f46e5", "#7c3aed"],
  ["#7c3aed", "#a855f7"],
  ["#f59e0b", "#d97706"],
  ["#ef4444", "#dc2626"],
  ["#0ea5e9", "#06b6d4"],
  ["#10b981", "#059669"],
];

/* ─── SEED DATA (exact counts 28,450 total · 26,580 active · 1,870 suppressed) ─── */
const PREDEFINED = [
  { id: "1", fullName: "Ananya Rajesh",  email: "ananya.rajesh@techvista.in",    phone: "+91 98765 43210", status: "active", tags: ["vip", "b2b"],   score: 84, list: "Active Customers", campaign: "April Newsletter",    ci: 0 },
  { id: "2", fullName: "Pradeep Mehta",  email: "p.mehta@blueaxis.com",          phone: "+91 87654 32109", status: "active", tags: ["enterprise"],   score: 62, list: "All Subscribers",  campaign: "Q2 Product Launch",  ci: 1 },
  { id: "3", fullName: "Sunita Nair",    email: "sunita@growfast.co",            phone: "+91 76543 21098", status: "active", tags: ["trial"],        score: 38, list: "Trial Users",      campaign: "April Newsletter",   ci: 2 },
  { id: "4", fullName: "Ramesh Kumar",   email: "ramesh.k@innodev.io",           phone: "+91 65432 10987", status: "suppressed", tags: ["bounced"],  score:  0, list: "All Subscribers",  campaign: "Hard bounce",        ci: 3 },
  { id: "5", fullName: "Kavitha Iyer",   email: "kavitha.iyer@nexustech.com",    phone: "+91 54321 09876", status: "active", tags: ["vip","partner"], score: 91, list: "VIP Customers",    campaign: "WhatsApp Flash Sale", ci: 4 },
  { id: "6", fullName: "Vikram Sharma",  email: "v.sharma@stratbox.in",          phone: "+91 43210 98765", status: "active", tags: ["b2b"],          score: 55, list: "Active Customers", campaign: "April Newsletter",   ci: 5 },
  { id: "7", fullName: "Priya Sharma",   email: "priya.sharmal@yahoo.com",       phone: "+91 99887 66554", status: "active", tags: ["lead"],         score: 21, list: "All Subscribers",  campaign: "Weekly Digest",      ci: 0 },
  { id: "8", fullName: "Neha Sharma",    email: "neha.sharma3@company.co",       phone: "+91 88776 55443", status: "active", tags: ["cold"],         score: 23, list: "VIP Customers",    campaign: "Flash Sale",         ci: 1 },
];

function buildFullDataset() {
  const fns  = ["Amit","Priya","Rahul","Neha","Vijay","Sneha","Kunal","Divya","Manish","Pooja","Raj","Anjali","Suresh","Kirti","Manoj","Riya","Arjun","Deepa","Vinod","Lata"];
  const lns  = ["Sharma","Verma","Gupta","Nair","Reddy","Patel","Singh","Kumar","Joshi","Menon"];
  const doms = ["gmail.com","yahoo.com","outlook.com","company.co","tech.in"];
  const camps = ["Weekly Digest","Product Update","Flash Sale","Newsletter","Webinar Invite","Renewal Notice","Onboarding Series"];
  const listOpts = ["Active Customers","All Subscribers","Trial Users","VIP Customers"];
  const tagPool  = ["customer","lead","hot","cold","partner","loyal","new","repeat"];
  const suppTags = ["bounced","unsubscribed","marked-spam"];

  const TOTAL = 28450, ACTIVE = 26580, SUPP = 1870;
  const remaining  = TOTAL - PREDEFINED.length;
  const needActive = ACTIVE - PREDEFINED.filter(c => c.status === "active").length;
  const needSupp   = SUPP  - PREDEFINED.filter(c => c.status === "suppressed").length;

  const extra = [];
  for (let i = 0; i < remaining; i++) {
    const fn  = fns[i % fns.length];
    const ln  = lns[Math.floor(i / fns.length) % lns.length];
    const stat = i < needActive ? "active" : i < needActive + needSupp ? "suppressed" : "active";
    extra.push({
      id: `g${i}`,
      fullName: `${fn} ${ln}`,
      email:    `${fn.toLowerCase()}.${ln.toLowerCase()}${i % 100}@${doms[i % doms.length]}`,
      phone:    `+91 ${70000 + (i % 30000)} ${10000 + (i % 90000)}`,
      status:   stat,
      tags:     stat === "suppressed" ? [suppTags[i % suppTags.length]] : [tagPool[i % tagPool.length]],
      score:    stat === "suppressed" ? i % 10 : 20 + (i % 80),
      list:     listOpts[i % listOpts.length],
      campaign: stat === "suppressed" ? "Hard bounce" : camps[i % camps.length],
      ci:       i % AVATAR_COLORS.length,
    });
  }
  return [...PREDEFINED, ...extra];
}

const ALL_CONTACTS = buildFullDataset();

/* ─── ICONS ──────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const UploadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ImportIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevLeft = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevRight = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DotsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FileIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const TagIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const ScoreIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M22 12h-4M4.93 19.07l2.83-2.83" strokeLinecap="round" />
    <path d="M12 8v4l2 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ListIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="7" cy="15" r="1" />
    <circle cx="12" cy="15" r="1" />
    <circle cx="17" cy="15" r="1" />
  </svg>
);
const CampaignIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
    <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── SUB-COMPONENTS ─────────────────────────────────────────────── */
const Avatar = ({ name, ci }) => {
  const ini = (name || "?")
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const [from, to] = AVATAR_COLORS[ci % AVATAR_COLORS.length];
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
      style={{ background: `linear-gradient(135deg,${from},${to})` }}
    >
      {ini}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const active = status === "active";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
      ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {active ? "Active" : "Suppressed"}
    </span>
  );
};

const TagChip = ({ label }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
    {label}
  </span>
);

const ListBadge = ({ list }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white whitespace-nowrap">
    {list}
  </span>
);

const EngBar = ({ score }) => {
  const cls = score >= 70 ? { bar: "bg-emerald-500", text: "text-emerald-600" }
            : score >= 40 ? { bar: "bg-indigo-500",  text: "text-indigo-500"  }
            : score > 0   ? { bar: "bg-amber-400",   text: "text-amber-500"   }
            : { bar: "bg-slate-200",   text: "text-slate-400" };
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full rounded-full ${cls.bar}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-black ${cls.text}`}>{score}</span>
    </div>
  );
};

// ── Contact Detail Modal ──
const ContactDetailModal = ({ contact, isOpen, onClose }) => {
  if (!isOpen || !contact) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header with avatar and name */}
        <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <XIcon />
          </button>
          <div className="flex items-center gap-4">
            <Avatar name={contact.fullName} ci={contact.ci} />
            <div>
              <h2 className="text-xl font-bold text-slate-900">{contact.fullName}</h2>
              <p className="text-sm text-slate-500">Contact since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        {/* Details grid */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <MailIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                <p className="text-sm text-slate-800 font-medium mt-0.5">{contact.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PhoneIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Phone</p>
                <p className="text-sm text-slate-800 font-medium mt-0.5">{contact.phone || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TagIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {contact.tags.length > 0 ? contact.tags.map(t => <TagChip key={t} label={t} />) : <span className="text-sm text-slate-400">—</span>}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ScoreIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Engagement Score</p>
                <EngBar score={contact.score} />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ListIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">List</p>
                <ListBadge list={contact.list} />
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CampaignIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Last Campaign</p>
                <p className="text-sm text-slate-800 font-medium mt-0.5">{contact.campaign || "—"}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</p>
                <StatusBadge status={contact.status} />
              </div>
              <button
                onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Modal Components (Import wizard) ──
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <XIcon />
          </button>
        </div>
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Step 1: File Upload
const UploadStep = ({ onFileSelect, selectedFile, onParsed }) => {
  const [isParsing, setIsParsing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onFileSelect(file);
    
    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.split("\n").filter(l => l.trim());
      if (lines.length < 2) {
        alert("Invalid CSV file");
        setIsParsing(false);
        return;
      }
      const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim());
      const preview = [];
      for (let i = 1; i <= Math.min(5, lines.length - 1); i++) {
        const values = lines[i].split(",").map(v => v.replace(/"/g, "").trim());
        const row = {};
        headers.forEach((h, idx) => row[h] = values[idx] || "");
        preview.push(row);
      }
      onParsed({ headers, preview, fullData: lines.slice(1) });
      setIsParsing(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors">
        <div className="flex justify-center mb-3">
          <FileIcon />
        </div>
        <p className="text-sm font-semibold text-slate-700 mb-1">Upload CSV File</p>
        <p className="text-xs text-slate-400 mb-3">Supported format: .csv with headers</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition"
        >
          <UploadIcon /> Choose File
        </label>
        {selectedFile && (
          <p className="text-xs text-emerald-600 mt-3 flex items-center justify-center gap-1">
            ✓ {selectedFile.name}
          </p>
        )}
      </div>
      {isParsing && (
        <div className="flex items-center justify-center gap-2 text-sm text-indigo-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>
          Parsing file...
        </div>
      )}
    </div>
  );
};

// Step 2: Column Mapping
const MappingStep = ({ headers, preview, onMappingComplete }) => {
  const [mapping, setMapping] = useState({});
  
  const requiredFields = [
    { key: "fullName", label: "Full Name", required: true, description: "Contact's full name" },
    { key: "email", label: "Email", required: true, description: "Contact's email address" },
    { key: "phone", label: "Phone", required: false, description: "Contact's phone number" },
    { key: "status", label: "Status", required: false, description: "active/suppressed" },
    { key: "tags", label: "Tags", required: false, description: "Comma-separated tags" },
    { key: "score", label: "Score", required: false, description: "0-100 engagement score" },
    { key: "list", label: "List", required: false, description: "List name" },
  ];

  const handleMap = (field, header) => {
    setMapping(prev => ({ ...prev, [field]: header }));
  };

  const handleContinue = () => {
    const missing = requiredFields.filter(f => f.required && !mapping[f.key]);
    if (missing.length) {
      alert(`Please map required fields: ${missing.map(m => m.label).join(", ")}`);
      return;
    }
    onMappingComplete(mapping);
  };

  if (!headers || headers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">No headers found. Please go back and upload a valid CSV file.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
        <p className="text-xs text-blue-700">📌 Map your CSV columns to contact fields. Required fields must be mapped.</p>
        <p className="text-xs text-blue-600 mt-1">Found {headers.length} columns: {headers.join(", ")}</p>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {requiredFields.map(field => (
          <div key={field.key} className="flex items-center gap-4">
            <div className="w-32">
              <span className="text-sm font-semibold text-slate-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </span>
              <p className="text-xs text-slate-400">{field.description}</p>
            </div>
            <select
              value={mapping[field.key] || ""}
              onChange={(e) => handleMap(field.key, e.target.value)}
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">-- Select column --</option>
              {headers.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {preview && preview.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Preview (first 5 rows)</label>
          <div className="overflow-x-auto border rounded-lg max-h-64 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  {headers.map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-slate-600 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-100">
                    {headers.map(h => (
                      <td key={h} className="px-3 py-2 text-slate-500">{row[h] || "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          onClick={handleContinue}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Continue to Duplicate Rules
        </button>
      </div>
    </div>
  );
};

// Step 3: Duplicate Rules
const DuplicateStep = ({ onComplete, onBack }) => {
  const [duplicateRule, setDuplicateRule] = useState("update");
  const [matchField, setMatchField] = useState("email");

  const handleImport = async () => {
    alert(`Importing with rule: ${duplicateRule}, match on: ${matchField}`);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
        <p className="text-xs text-amber-700">⚠️ Configure how to handle duplicate contacts during import.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Match duplicates by</label>
        <select
          value={matchField}
          onChange={(e) => setMatchField(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="email_or_phone">Email or Phone</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">If duplicate found</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="duplicateRule"
              value="skip"
              checked={duplicateRule === "skip"}
              onChange={(e) => setDuplicateRule(e.target.value)}
              className="text-indigo-600"
            />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Skip duplicate</p>
              <p className="text-xs text-slate-400">Don't import contacts that already exist</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="duplicateRule"
              value="update"
              checked={duplicateRule === "update"}
              onChange={(e) => setDuplicateRule(e.target.value)}
              className="text-indigo-600"
            />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Update existing</p>
              <p className="text-xs text-slate-400">Overwrite existing contact data with new values</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="duplicateRule"
              value="create_new"
              checked={duplicateRule === "create_new"}
              onChange={(e) => setDuplicateRule(e.target.value)}
              className="text-indigo-600"
            />
            <div>
              <p className="font-semibold text-slate-800 text-sm">Create as new</p>
              <p className="text-xs text-slate-400">Always create a new contact even if duplicate exists</p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
        >
          Back
        </button>
        <button
          onClick={handleImport}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
        >
          Confirm Import
        </button>
      </div>
    </div>
  );
};

// Step 4: Success
const SuccessStep = ({ importedCount, onClose }) => {
  return (
    <div className="text-center py-8 space-y-4">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 className="text-xl font-bold text-slate-900">Import Complete!</h4>
      <p className="text-slate-500">
        Successfully imported <span className="font-bold text-emerald-600">{importedCount}</span> contacts.
      </p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
      >
        Close
      </button>
    </div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────── */
export default function ContactsPage() {
  const [contacts, setContacts] = useState(ALL_CONTACTS);
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const LIMIT = 10;

  // Contact detail modal state
  const [selectedContact, setSelectedContact] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Import wizard state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importStep, setImportStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState({ headers: [], preview: [], fullData: [] });
  const [columnMapping, setColumnMapping] = useState({});
  const [importedCount, setImportedCount] = useState(0);

  useEffect(() => setPage(1), [search, listFilter, statusFilter, channelFilter]);

  const filtered = useMemo(() => {
    let result = contacts;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    if (listFilter) result = result.filter(c => c.list === listFilter);
    if (statusFilter) result = result.filter(c => c.status === statusFilter);
    if (channelFilter === "whatsapp") result = result.filter(c => c.score > 50);
    return result;
  }, [contacts, search, listFilter, statusFilter, channelFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

  const activeCount = contacts.filter(c => c.status === "active").length;
  const suppCount = contacts.filter(c => c.status === "suppressed").length;

  const toggleRow = (id) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };
  const toggleAll = (e) => {
    if (e.target.checked) setSelected(new Set(paginated.map(c => c.id)));
    else setSelected(new Set());
  };
  const clearSel = () => setSelected(new Set());
  const allChecked = paginated.length > 0 && paginated.every(c => selected.has(c.id));

  const handleExport = () => {
    const headers = ["Full Name","Email","Phone","Status","Tags","Score","List","Campaign"];
    const rows = filtered.map(c => [c.fullName, c.email, c.phone, c.status, c.tags.join(";"), c.score, c.list, c.campaign]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `contacts_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const handleImport = () => {
    setImportStep(1);
    setSelectedFile(null);
    setParsedData({ headers: [], preview: [], fullData: [] });
    setColumnMapping({});
    setIsImportModalOpen(true);
  };

  const handleFileSelect = (file) => { setSelectedFile(file); };
  const handleParsed = (data) => { setParsedData(data); setImportStep(2); };
  const handleMappingComplete = (mapping) => { setColumnMapping(mapping); setImportStep(3); };
  const handleDuplicateComplete = () => {
    const newContacts = parsedData.fullData.slice(0, 5).map((line, idx) => {
      const values = line.split(",").map(v => v.replace(/"/g, "").trim());
      return {
        id: `imp_${Date.now()}_${idx}`,
        fullName: values[0] || "Unknown",
        email: values[1] || "",
        phone: values[2] || "",
        status: "active",
        tags: [],
        score: 50,
        list: "All Subscribers",
        campaign: "—",
        ci: idx % AVATAR_COLORS.length,
      };
    });
    setContacts(prev => [...newContacts, ...prev]);
    setImportedCount(newContacts.length);
    setImportStep(4);
  };
  const handleImportClose = () => {
    setIsImportModalOpen(false);
    setImportStep(1);
    setSelectedFile(null);
    setParsedData({ headers: [], preview: [], fullData: [] });
    setColumnMapping({});
  };

  const handleAddToList = () => {
    if (!selected.size) return alert("No contacts selected");
    alert(`Add ${selected.size} contacts to list (demo)`);
  };
  const handleApplyTag = () => {
    if (!selected.size) return alert("No contacts selected");
    const tag = prompt("Enter tag name:");
    if (tag?.trim()) {
      setContacts(prev => prev.map(c => selected.has(c.id) ? { ...c, tags: [...c.tags, tag.trim()] } : c));
      alert(`Tag "${tag.trim()}" applied to ${selected.size} contacts`);
      clearSel();
    }
  };
  const handleDelete = () => {
    if (!selected.size) return alert("No contacts selected");
    if (window.confirm(`Delete ${selected.size} contacts permanently?`)) {
      setContacts(prev => prev.filter(c => !selected.has(c.id)));
      clearSel();
    }
  };

  const pageButtons = useMemo(() => {
    const btns = [];
    if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) btns.push(i);
    else {
      btns.push(1);
      if (currentPage > 3) btns.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
      if (currentPage < totalPages - 2) btns.push("...");
      btns.push(totalPages);
    }
    return btns;
  }, [currentPage, totalPages]);

  const startItem = (currentPage - 1) * LIMIT + 1;
  const endItem = Math.min(currentPage * LIMIT, filtered.length);

  // Open contact detail modal
  const openContactDetail = (contact) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-slate-900 leading-[1.2] tracking-[-0.02em]">
            All Contacts
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            {contacts.length.toLocaleString()} total · {activeCount.toLocaleString()} active · {suppCount.toLocaleString()} suppressed
          </p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition">
            <UploadIcon /> Export
          </button>
          <button onClick={handleImport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
            <ImportIcon /> Import Contacts
          </button>
        </div>
      </div>

      {/* BULK ACTION BAR */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-4">
          <span className="text-sm font-bold text-indigo-700">{selected.size} selected</span>
          <button onClick={handleAddToList} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Add to List</button>
          <button onClick={handleApplyTag} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Apply Tag</button>
          <button onClick={handleDelete} className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
          <button onClick={clearSel} className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium">Clear</button>
        </div>
      )}

      {/* CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search by name, email, phone or tag"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <select value={listFilter} onChange={(e) => setListFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
            <option value="">All Lists</option>
            {["Active Customers","All Subscribers","Trial Users","VIP Customers"].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suppressed">Suppressed</option>
          </select>
          <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
            <option value="all">All Channels</option>
            <option value="email">Email eligible</option>
            <option value="whatsapp">WhatsApp eligible</option>
          </select>
          <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 w-10"><input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-indigo-600" /></th>
                {["CONTACT","LISTS","STATUS","TAGS","ENGAGEMENT","LAST CAMPAIGN",""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-16 text-slate-400 text-sm font-medium">No contacts found. Try adjusting your search or filters.</td></tr>
              ) : (
                paginated.map(c => (
                  <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5"><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} className="accent-indigo-600" /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => openContactDetail(c)}>
                        <Avatar name={c.fullName} ci={c.ci} />
                        <div>
                          <p className="font-bold text-slate-800 text-sm leading-tight">{c.fullName}</p>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">{c.email || c.phone || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><ListBadge list={c.list} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3.5"><div className="flex gap-1.5 flex-wrap">{c.tags.slice(0,2).map(t => <TagChip key={t} label={t} />)}{c.tags.length > 2 && <TagChip label={`+${c.tags.length-2}`} />}</div></td>
                    <td className="px-4 py-3.5"><EngBar score={c.score} /></td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 font-medium">{c.campaign || "—"}</td>
                    <td className="px-3 py-3.5"><button className="text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg p-1.5"><DotsIcon /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-sm text-slate-400 font-medium">
            Showing {filtered.length === 0 ? "0" : `${startItem}–${endItem}`} of {filtered.length.toLocaleString()} contacts
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
              <ChevLeft />
            </button>
            {pageButtons.map((b, i) => b === "..." ? (
              <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span>
            ) : (
              <button key={b} onClick={() => setPage(b)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all
                  ${currentPage === b ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
                {b}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
              <ChevRight />
            </button>
          </div>
        </div>
      </div>

      {/* CONTACT DETAIL MODAL */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* IMPORT MODAL - CSV Wizard */}
      <Modal isOpen={isImportModalOpen} onClose={handleImportClose} title="Import Contacts">
        {importStep === 1 && (
          <UploadStep onFileSelect={handleFileSelect} selectedFile={selectedFile} onParsed={handleParsed} />
        )}
        {importStep === 2 && (
          <MappingStep headers={parsedData.headers} preview={parsedData.preview} onMappingComplete={handleMappingComplete} />
        )}
        {importStep === 3 && (
          <DuplicateStep onComplete={handleDuplicateComplete} onBack={() => setImportStep(2)} />
        )}
        {importStep === 4 && (
          <SuccessStep importedCount={importedCount} onClose={handleImportClose} />
        )}
      </Modal>
    </div>
  );
}