// ProfileTab.jsx
import React, { useState, useRef } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

/* ================= ICONS ================= */
const CameraIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4Z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" />
  </svg>
);

/* ================= UI COMPONENTS ================= */
const Button = ({ children, variant = 'primary', onClick, disabled, loading, className }) => {
  const base = "inline-flex items-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], className)}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, type = 'text', placeholder, disabled, icon: Icon, required }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
          Icon && "pl-10",
          disabled && "bg-slate-50 text-slate-500"
        )}
      />
    </div>
  </div>
);

const Select = ({ label, value, onChange, options, disabled }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const InfoRow = ({ label, value, onEdit }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100">
    <div>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
    </div>
    {onEdit && (
      <button onClick={onEdit} className="p-1 text-slate-400 hover:text-indigo-600 transition-colors">
        <EditIcon />
      </button>
    )}
  </div>
);

/* ================= MAIN PROFILE TAB ================= */
export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profile, setProfile] = useState({
    avatar: null,
    name: 'Subramanian A.',
    email: 'subramanian@wysync.com',
    phone: '+91 98765 43210',
    role: 'Workspace Owner',
    memberSince: 'January 15, 2024',
    timezone: 'Asia/Kolkata',
    language: 'English',
    company: 'WYNSync',
    jobTitle: 'Product Manager',
    bio: 'Building amazing products and helping businesses grow with WYNSync.',
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const timezones = [
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Asia/Singapore', label: 'Singapore Time (SGT)' },
  ];

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Hindi', label: 'Hindi' },
  ];

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
        setEditForm(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setEditForm({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ ...profile });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setProfile({ ...editForm });
    setIsEditing(false);
    setIsSaving(false);
    alert('Profile updated successfully!');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        {/* Profile Info Section */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex justify-between items-start -mt-12 mb-6">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleAvatarClick}
              >
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  getInitials(profile.name)
                )}
              </div>
              <button 
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <CameraIcon />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            
            {!isEditing && (
              <Button variant="secondary" onClick={handleEdit}>
                <EditIcon /> Edit Profile
              </Button>
            )}
          </div>

          {/* Name and Basic Info */}
          <div className="mb-6">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    icon={MailIcon}
                    required
                  />
                  <Input
                    label="Phone Number"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    icon={PhoneIcon}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  />
                  <Input
                    label="Job Title"
                    value={editForm.jobTitle}
                    onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={3}
                    placeholder="Tell us a little about yourself..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Timezone"
                    value={editForm.timezone}
                    onChange={(e) => setEditForm({ ...editForm, timezone: e.target.value })}
                    options={timezones}
                  />
                  <Select
                    label="Language"
                    value={editForm.language}
                    onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
                    options={languages}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                  <Button variant="primary" onClick={handleSave} loading={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
                <p className="text-slate-500 mt-1">{profile.role}</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <MailIcon className="w-4 h-4" /> {profile.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <PhoneIcon className="w-4 h-4" /> {profile.phone}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <CalendarIcon className="w-4 h-4" /> Member since {profile.memberSince}
                  </span>
                </div>
                {profile.bio && (
                  <p className="text-sm text-slate-600 mt-4 border-l-3 border-indigo-300 pl-3">
                    {profile.bio}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Information Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Account Information</h3>
          <p className="text-xs text-slate-400 mt-0.5">Details about your workspace account</p>
        </div>
        <div className="px-6 py-4">
          <InfoRow label="Workspace Role" value={profile.role} />
          <InfoRow label="Company" value={profile.company} />
          <InfoRow label="Job Title" value={profile.jobTitle} />
          <InfoRow label="Timezone" value={timezones.find(t => t.value === profile.timezone)?.label || profile.timezone} />
          <InfoRow label="Language" value={profile.language} />
          <InfoRow label="Member Since" value={profile.memberSince} />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-sm mt-6">
        <div className="px-6 py-4 border-b border-red-100 bg-red-50 rounded-t-2xl">
          <h3 className="font-semibold text-red-700">Danger Zone</h3>
          <p className="text-xs text-red-500 mt-0.5">Irreversible account actions</p>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">Delete Account</p>
              <p className="text-xs text-slate-400 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <Button 
              variant="danger" 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  alert('Account deletion request submitted');
                }
              }}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}