// ProfileTab.jsx - Enhanced Enterprise Grade
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

const BuildingIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ================= UI COMPONENTS ================= */
const Button = ({ children, variant = 'primary', size = 'md', leftIcon, rightIcon, onClick, disabled, loading, className }) => {
  const base = "inline-flex items-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-300",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size], className)}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {!loading && leftIcon && leftIcon}
      {children}
      {!loading && rightIcon && rightIcon}
    </button>
  );
};

const Input = ({ label, value, onChange, type = 'text', placeholder, disabled, error, required, helpText, rightElement }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2",
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-100" 
            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100",
          disabled && "bg-slate-50 text-slate-500 cursor-not-allowed"
        )}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    {helpText && !error && <p className="text-xs text-slate-400 mt-1">{helpText}</p>}
  </div>
);

const Select = ({ label, value, onChange, options, disabled }) => (
  <div>
    {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all disabled:bg-slate-50"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const InfoCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all hover:border-indigo-100">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
        <Icon />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{title}</p>
        <p className="text-sm font-semibold text-slate-900 mt-1 break-words">{value || '—'}</p>
      </div>
    </div>
  </div>
);

const ContactInfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:border-slate-200 transition-all">
    <div className="p-2 bg-white rounded-lg shadow-sm text-slate-500 shrink-0">
      <Icon />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
    </div>
  </div>
);

/* ================= MAIN PROFILE TAB ================= */
export default function ProfileTab() {
  const [view, setView] = useState('profile'); // 'profile', 'edit', 'password'
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profile, setProfile] = useState({
    avatar: null,
    name: 'Subramanian A.',
    email: 'subramanian@wysync.com',
    phone: '+91 98765 43210',
    role: 'Workspace Owner',
    memberSince: 'January 2024',
    timezone: 'Asia/Kolkata',
    language: 'English',
    company: 'WYNSync',
    jobTitle: 'Product Manager',
    bio: 'Building amazing products and helping businesses grow with WYNSync.',
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const timezones = [
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  ];

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Spanish', label: 'Spanish' },
  ];

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setProfile({ ...editForm });
    setIsSaving(false);
    setView('profile');
  };

  const handleUpdatePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      setErrors({ confirm: 'Passwords do not match' });
      return;
    }
    if (passwordData.new.length < 8) {
      setErrors({ new: 'Password must be at least 8 characters' });
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setView('profile');
    setPasswordData({ current: '', new: '', confirm: '' });
    setErrors({});
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // Password View
  if (view === 'password') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <button onClick={() => setView('profile')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-3 transition-colors">
              <ArrowLeftIcon /> Back to Profile
            </button>
            <h2 className="text-xl font-bold text-slate-900">Security</h2>
            <p className="text-sm text-slate-500 mt-1">Update your password to keep your account secure</p>
          </div>
          <div className="p-6 space-y-5">
            <Input
              label="Current Password"
              type={showPassword ? "text" : "password"}
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              placeholder="Enter your current password"
              rightElement={
                <button onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
            <Input
              label="New Password"
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              placeholder="Enter new password"
              error={errors.new}
              helpText="Minimum 8 characters"
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              placeholder="Confirm your new password"
              error={errors.confirm}
            />
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setView('profile')} className="w-full sm:w-auto">Cancel</Button>
              <Button variant="primary" onClick={handleUpdatePassword} loading={isSaving} className="w-full sm:w-auto">
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit View
  if (view === 'edit') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <button onClick={() => setView('profile')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-3 transition-colors">
              <ArrowLeftIcon /> Back to Profile
            </button>
            <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
            <p className="text-sm text-slate-500 mt-1">Update your personal information</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Full Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
              <Input label="Email Address" type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} required />
              <Input label="Phone Number" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
              <Input label="Company" value={editForm.company} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} />
              <Input label="Job Title" value={editForm.jobTitle} onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })} />
              <Select label="Timezone" value={editForm.timezone} onChange={(e) => setEditForm({ ...editForm, timezone: e.target.value })} options={timezones} />
              <Select label="Language" value={editForm.language} onChange={(e) => setEditForm({ ...editForm, language: e.target.value })} options={languages} />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  placeholder="Tell us a little about yourself..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setView('profile')} className="w-full sm:w-auto">Discard</Button>
              <Button variant="primary" onClick={handleSaveProfile} loading={isSaving} className="w-full sm:w-auto">
                <CheckIcon /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile View (enhanced, no overflow)
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover image */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
        
        {/* Main profile section */}
        <div className="px-4 sm:px-6 pb-6">
          {/* Avatar + Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-6 gap-4">
            <div className="relative self-start sm:self-auto">
              <div 
                className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg cursor-pointer hover:opacity-95 transition-opacity ring-4 ring-white"
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
                className="absolute bottom-1 right-1 p-1.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <CameraIcon />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="secondary" leftIcon={<EditIcon />} onClick={() => setView('edit')} className="flex-1 sm:flex-initial">
                Edit Profile
              </Button>
              <Button variant="ghost" leftIcon={<LockIcon />} onClick={() => setView('password')} className="flex-1 sm:flex-initial">
                Change Password
              </Button>
            </div>
          </div>

          {/* Basic info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
                {profile.role}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-sm text-slate-500">Member since {profile.memberSince}</span>
            </div>
            {profile.bio && (
              <p className="text-sm text-slate-600 mt-4 max-w-2xl leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Contact info row - responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <ContactInfoRow icon={MailIcon} label="Email" value={profile.email} />
            <ContactInfoRow icon={PhoneIcon} label="Phone" value={profile.phone} />
            <ContactInfoRow icon={BuildingIcon} label="Company" value={profile.company} />
          </div>

          {/* Additional info section */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard title="Job Title" value={profile.jobTitle} icon={BriefcaseIcon} />
              <InfoCard title="Language" value={profile.language} icon={GlobeIcon} />
              <InfoCard title="Timezone" value={timezones.find(t => t.value === profile.timezone)?.label || profile.timezone} icon={ClockIcon} />
              <InfoCard title="Workspace Role" value={profile.role} icon={BuildingIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}