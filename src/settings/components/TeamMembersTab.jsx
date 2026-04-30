// // // TeamMembersTab.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';

// // // ===================== Mock Data & API Hooks =====================
// // const MOCK_TEAM_MEMBERS = [
// //   { id: '1', fullName: 'Subramanian A.', email: 'subramanian@wynsync.com', role: 'owner', inviteStatus: 'accepted', lastActiveAt: new Date().toISOString() },
// //   { id: '2', fullName: 'Priya Sharma', email: 'priya@wynsync.com', role: 'admin', inviteStatus: 'accepted', lastActiveAt: new Date(Date.now() - 86400000).toISOString() },
// //   { id: '3', fullName: 'Rahul Verma', email: 'rahul@wynsync.com', role: 'editor', inviteStatus: 'pending', lastActiveAt: null },
// // ];

// // const useTeamMembers = () => {
// //   const [data, setData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   useEffect(() => {
// //     setTimeout(() => { setData(MOCK_TEAM_MEMBERS); setIsLoading(false); }, 600);
// //   }, []);
// //   return { data, isLoading };
// // };

// // const useInviteMember = () => {
// //   const [isPending, setIsPending] = useState(false);
// //   const mutate = async (data, { onSuccess }) => {
// //     setIsPending(true);
// //     await new Promise(resolve => setTimeout(resolve, 800));
// //     console.log('Invite sent to:', data.email, 'with role:', data.role);
// //     setIsPending(false);
// //     if (onSuccess) onSuccess();
// //   };
// //   return { mutate, isPending };
// // };

// // const useRemoveMember = () => {
// //   const [isPending, setIsPending] = useState(false);
// //   const mutate = async (id) => {
// //     setIsPending(true);
// //     await new Promise(resolve => setTimeout(resolve, 600));
// //     console.log('Removed member:', id);
// //     setIsPending(false);
// //   };
// //   return { mutate, isPending };
// // };

// // // ===================== Icons (SVG) =====================
// // const UserPlusIcon = () => (
// //   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
// //   </svg>
// // );

// // // ===================== UI Components =====================
// // const cn = (...classes) => classes.filter(Boolean).join(' ');

// // const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading }) => {
// //   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
// //   const variants = {
// //     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
// //     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
// //     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
// //   };
// //   const sizes = {
// //     sm: "px-2.5 py-1 text-xs",
// //     md: "px-3 py-1.5 text-sm",
// //   };
// //   return (
// //     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}>
// //       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
// //       {leftIcon && !loading && leftIcon}
// //       {children}
// //     </button>
// //   );
// // };

// // const Badge = ({ children, variant }) => {
// //   const variants = {
// //     admin: 'bg-indigo-100 text-indigo-700',
// //     editor: 'bg-blue-100 text-blue-700',
// //     approver: 'bg-purple-100 text-purple-700',
// //     viewer: 'bg-slate-100 text-slate-700',
// //     owner: 'bg-amber-100 text-amber-700',
// //     active: 'bg-emerald-100 text-emerald-700',
// //     warning: 'bg-amber-100 text-amber-700',
// //     neutral: 'bg-slate-100 text-slate-600',
// //   };
// //   const className = variants[variant] || variants.neutral;
// //   return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// // };

// // const Avatar = ({ name, size = 'sm' }) => {
// //   const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
// //   const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
// //   return (
// //     <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}>
// //       {initials}
// //     </div>
// //   );
// // };

// // const Input = ({ label, type = 'text', placeholder, error, ...props }) => (
// //   <div className="space-y-1">
// //     <label className="block text-sm font-semibold text-slate-700">{label}</label>
// //     <input
// //       type={type}
// //       placeholder={placeholder}
// //       {...props}
// //       className={cn(
// //         "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
// //         error ? "border-red-300" : "border-slate-200"
// //       )}
// //     />
// //     {error && <p className="text-xs text-red-500">{error}</p>}
// //   </div>
// // );

// // const Select = ({ label, options, error, ...props }) => (
// //   <div className="space-y-1">
// //     <label className="block text-sm font-semibold text-slate-700">{label}</label>
// //     <select
// //       {...props}
// //       className={cn(
// //         "w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
// //         error ? "border-red-300" : "border-slate-200"
// //       )}
// //     >
// //       {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
// //     </select>
// //     {error && <p className="text-xs text-red-500">{error}</p>}
// //   </div>
// // );

// // const Modal = ({ open, onClose, title, description, children, footer, size = 'sm' }) => {
// //   if (!open) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
// //       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
// //         <div className="flex justify-between items-center px-6 py-4 border-b">
// //           <div>
// //             <h3 className="text-lg font-bold text-slate-900">{title}</h3>
// //             {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
// //           </div>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
// //         </div>
// //         <div className="px-6 py-4">{children}</div>
// //         {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 rounded-b-2xl">{footer}</div>}
// //       </div>
// //     </div>
// //   );
// // };

// // const TableSkeleton = ({ rows = 4, cols = 5 }) => (
// //   <div className="animate-pulse">
// //     <div className="flex border-b border-slate-100 bg-slate-50 px-4 py-3 gap-4">
// //       {Array(cols).fill().map((_, i) => <div key={i} className="h-3 bg-slate-200 rounded w-20"></div>)}
// //     </div>
// //     {Array(rows).fill().map((_, idx) => (
// //       <div key={idx} className="flex px-4 py-3 gap-4 border-b">
// //         {Array(cols).fill().map((_, j) => <div key={j} className="h-4 bg-slate-100 rounded w-16"></div>)}
// //       </div>
// //     ))}
// //   </div>
// // );

// // // ===================== Zod Schema =====================
// // const inviteSchema = z.object({
// //   email: z.string().email('Enter a valid email'),
// //   role: z.enum(['admin', 'editor', 'approver', 'viewer']),
// // });

// // const ROLE_OPTIONS = [
// //   { label: 'Admin', value: 'admin' },
// //   { label: 'Editor', value: 'editor' },
// //   { label: 'Approver', value: 'approver' },
// //   { label: 'Viewer', value: 'viewer' },
// // ];

// // // ===================== Main Component =====================
// // export default function TeamMembersTab() {
// //   const { data: members = [], isLoading } = useTeamMembers();
// //   const inviteMutation = useInviteMember();
// //   const removeMutation = useRemoveMember();
// //   const [showInvite, setShowInvite] = useState(false);

// //   const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm({
// //     resolver: zodResolver(inviteSchema),
// //     defaultValues: { role: 'editor' },
// //   });

// //   const onInvite = (data) => {
// //     inviteMutation.mutate(data, {
// //       onSuccess: () => { setShowInvite(false); resetForm(); }
// //     });
// //   };

// //   return (
// //     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
// //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
// //         <div>
// //           <h3 className="text-sm font-bold text-slate-900">Team Members</h3>
// //           <p className="text-xs text-slate-400 mt-0.5">{members.length} members</p>
// //         </div>
// //         <Button variant="primary" size="sm" leftIcon={<UserPlusIcon />} onClick={() => setShowInvite(true)}>
// //           Invite Member
// //         </Button>
// //       </div>

// //       {isLoading ? (
// //         <TableSkeleton rows={4} cols={5} />
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="border-b border-slate-100 bg-slate-50">
// //                 {['Member', 'Role', 'Status', 'Last Active', ''].map((h) => (
// //                   <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
// //                     {h}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-slate-100">
// //               {members.map((m) => (
// //                 <tr key={m.id} className="hover:bg-slate-50 transition-colors">
// //                   <td className="px-4 py-3 whitespace-nowrap">
// //                     <div className="flex items-center gap-2.5">
// //                       <Avatar name={m.fullName} size="sm" />
// //                       <div>
// //                         <p className="font-semibold text-slate-800">{m.fullName}</p>
// //                         <p className="text-xs text-slate-400">{m.email}</p>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td className="px-4 py-3 whitespace-nowrap">
// //                     <Badge variant={m.role}>{m.role}</Badge>
// //                   </td>
// //                   <td className="px-4 py-3 whitespace-nowrap">
// //                     <Badge variant={m.inviteStatus === 'accepted' ? 'active' : m.inviteStatus === 'pending' ? 'warning' : 'neutral'}>
// //                       {m.inviteStatus === 'accepted' ? 'Active' : m.inviteStatus === 'pending' ? 'Invite Pending' : 'Expired'}
// //                     </Badge>
// //                   </td>
// //                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
// //                     {m.lastActiveAt ? new Date(m.lastActiveAt).toLocaleDateString() : '—'}
// //                   </td>
// //                   <td className="px-4 py-3 whitespace-nowrap">
// //                     {m.role !== 'owner' && (
// //                       <Button
// //                         variant="ghost"
// //                         size="sm"
// //                         loading={removeMutation.isPending}
// //                         onClick={() => removeMutation.mutate(m.id)}
// //                         className="text-red-400 hover:text-red-600"
// //                       >
// //                         Remove
// //                       </Button>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       <Modal
// //         open={showInvite}
// //         onClose={() => setShowInvite(false)}
// //         title="Invite Team Member"
// //         description="They'll receive an email invitation to join your workspace."
// //         footer={
// //           <>
// //             <Button variant="secondary" onClick={() => setShowInvite(false)}>Cancel</Button>
// //             <Button variant="primary" loading={inviteMutation.isPending} onClick={handleSubmit(onInvite)}>
// //               Send Invite
// //             </Button>
// //           </>
// //         }
// //       >
// //         <form onSubmit={handleSubmit(onInvite)} className="space-y-4">
// //           <Input label="Email Address" type="email" placeholder="colleague@company.com" error={errors.email?.message} {...register('email')} />
// //           <Select label="Role" options={ROLE_OPTIONS} error={errors.role?.message} {...register('role')} />
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // }


// // TeamMembersTab.jsx – no external dependencies, pure React + Tailwind
// import React, { useState, useEffect } from 'react';

// // ===================== Mock Data & API Hooks =====================
// const MOCK_TEAM_MEMBERS = [
//   { id: '1', fullName: 'Subramanian A.', email: 'subramanian@wynsync.com', role: 'owner', inviteStatus: 'accepted', lastActiveAt: new Date().toISOString() },
//   { id: '2', fullName: 'Priya Sharma', email: 'priya@wynsync.com', role: 'admin', inviteStatus: 'accepted', lastActiveAt: new Date(Date.now() - 86400000).toISOString() },
//   { id: '3', fullName: 'Rahul Verma', email: 'rahul@wynsync.com', role: 'editor', inviteStatus: 'pending', lastActiveAt: null },
// ];

// const useTeamMembers = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     setTimeout(() => { setData(MOCK_TEAM_MEMBERS); setIsLoading(false); }, 600);
//   }, []);
//   return { data, isLoading };
// };

// const useInviteMember = () => {
//   const [isPending, setIsPending] = useState(false);
//   const mutate = async (data, { onSuccess }) => {
//     setIsPending(true);
//     await new Promise(resolve => setTimeout(resolve, 800));
//     console.log('Invite sent to:', data.email, 'with role:', data.role);
//     setIsPending(false);
//     if (onSuccess) onSuccess();
//   };
//   return { mutate, isPending };
// };

// const useRemoveMember = () => {
//   const [isPending, setIsPending] = useState(false);
//   const mutate = async (id) => {
//     setIsPending(true);
//     await new Promise(resolve => setTimeout(resolve, 600));
//     console.log('Removed member:', id);
//     setIsPending(false);
//   };
//   return { mutate, isPending };
// };

// // ===================== Icons (SVG) =====================
// const UserPlusIcon = () => (
//   <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//   </svg>
// );

// // ===================== UI Components =====================
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading }) => {
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
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const Badge = ({ children, variant }) => {
//   const variants = {
//     admin: 'bg-indigo-100 text-indigo-700',
//     editor: 'bg-blue-100 text-blue-700',
//     approver: 'bg-purple-100 text-purple-700',
//     viewer: 'bg-slate-100 text-slate-700',
//     owner: 'bg-amber-100 text-amber-700',
//     active: 'bg-emerald-100 text-emerald-700',
//     warning: 'bg-amber-100 text-amber-700',
//     neutral: 'bg-slate-100 text-slate-600',
//   };
//   const className = variants[variant] || variants.neutral;
//   return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// };

// const Avatar = ({ name, size = 'sm' }) => {
//   const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
//   const sizeClass = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm';
//   return (
//     <div className={`rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold ${sizeClass}`}>
//       {initials}
//     </div>
//   );
// };

// const Input = ({ label, type = 'text', placeholder, error, value, onChange }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <input
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className={cn(
//         "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
//         error ? "border-red-300" : "border-slate-200"
//       )}
//     />
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Select = ({ label, options, error, value, onChange }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <select
//       value={value}
//       onChange={onChange}
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

// const Modal = ({ open, onClose, title, description, children, footer }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
//         <div className="flex justify-between items-center px-6 py-4 border-b">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//             {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
//           </div>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
//         </div>
//         <div className="px-6 py-4">{children}</div>
//         {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 rounded-b-2xl">{footer}</div>}
//       </div>
//     </div>
//   );
// };

// const TableSkeleton = ({ rows = 4, cols = 5 }) => (
//   <div className="animate-pulse">
//     <div className="flex border-b border-slate-100 bg-slate-50 px-4 py-3 gap-4">
//       {Array(cols).fill().map((_, i) => <div key={i} className="h-3 bg-slate-200 rounded w-20"></div>)}
//     </div>
//     {Array(rows).fill().map((_, idx) => (
//       <div key={idx} className="flex px-4 py-3 gap-4 border-b">
//         {Array(cols).fill().map((_, j) => <div key={j} className="h-4 bg-slate-100 rounded w-16"></div>)}
//       </div>
//     ))}
//   </div>
// );

// // ===================== Constants =====================
// const ROLE_OPTIONS = [
//   { label: 'Admin', value: 'admin' },
//   { label: 'Editor', value: 'editor' },
//   { label: 'Approver', value: 'approver' },
//   { label: 'Viewer', value: 'viewer' },
// ];

// // ===================== Main Component =====================
// export default function TeamMembersTab() {
//   const { data: members = [], isLoading } = useTeamMembers();
//   const inviteMutation = useInviteMember();
//   const removeMutation = useRemoveMember();
//   const [showInvite, setShowInvite] = useState(false);
//   const [inviteEmail, setInviteEmail] = useState('');
//   const [inviteRole, setInviteRole] = useState('editor');
//   const [emailError, setEmailError] = useState('');

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleInvite = () => {
//     if (!inviteEmail.trim()) {
//       setEmailError('Email is required');
//       return;
//     }
//     if (!validateEmail(inviteEmail)) {
//       setEmailError('Enter a valid email address');
//       return;
//     }
//     setEmailError('');
//     inviteMutation.mutate(
//       { email: inviteEmail, role: inviteRole },
//       {
//         onSuccess: () => {
//           setShowInvite(false);
//           setInviteEmail('');
//           setInviteRole('editor');
//         },
//       }
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
//         <div>
//           <h3 className="text-sm font-bold text-slate-900">Team Members</h3>
//           <p className="text-xs text-slate-400 mt-0.5">{members.length} members</p>
//         </div>
//         <Button variant="primary" size="sm" leftIcon={<UserPlusIcon />} onClick={() => setShowInvite(true)}>
//           Invite Member
//         </Button>
//       </div>

//       {isLoading ? (
//         <TableSkeleton rows={4} cols={5} />
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50">
//                 {['Member', 'Role', 'Status', 'Last Active', ''].map((h) => (
//                   <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {members.map((m) => (
//                 <tr key={m.id} className="hover:bg-slate-50 transition-colors">
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <div className="flex items-center gap-2.5">
//                       <Avatar name={m.fullName} size="sm" />
//                       <div>
//                         <p className="font-semibold text-slate-800">{m.fullName}</p>
//                         <p className="text-xs text-slate-400">{m.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Badge variant={m.role}>{m.role}</Badge>
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     <Badge variant={m.inviteStatus === 'accepted' ? 'active' : m.inviteStatus === 'pending' ? 'warning' : 'neutral'}>
//                       {m.inviteStatus === 'accepted' ? 'Active' : m.inviteStatus === 'pending' ? 'Invite Pending' : 'Expired'}
//                     </Badge>
//                   </td>
//                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
//                     {m.lastActiveAt ? new Date(m.lastActiveAt).toLocaleDateString() : '—'}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap">
//                     {m.role !== 'owner' && (
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         loading={removeMutation.isPending}
//                         onClick={() => removeMutation.mutate(m.id)}
//                         className="text-red-400 hover:text-red-600"
//                       >
//                         Remove
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Modal
//         open={showInvite}
//         onClose={() => setShowInvite(false)}
//         title="Invite Team Member"
//         description="They'll receive an email invitation to join your workspace."
//         footer={
//           <>
//             <Button variant="secondary" onClick={() => setShowInvite(false)}>Cancel</Button>
//             <Button variant="primary" loading={inviteMutation.isPending} onClick={handleInvite}>
//               Send Invite
//             </Button>
//           </>
//         }
//       >
//         <div className="space-y-4">
//           <Input
//             label="Email Address"
//             type="email"
//             placeholder="colleague@company.com"
//             value={inviteEmail}
//             onChange={(e) => setInviteEmail(e.target.value)}
//             error={emailError}
//           />
//           <Select
//             label="Role"
//             options={ROLE_OPTIONS}
//             value={inviteRole}
//             onChange={(e) => setInviteRole(e.target.value)}
//           />
//         </div>
//       </Modal>
//     </div>
//   );
// }



// TeamMembersTab.jsx – Team Management with Invites
import React, { useState } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Icons
const UserPlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MoreHorizontalIcon = () => (
  <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const Badge = ({ children, variant, showCheck = false }) => {
  const styles = {
    Owner: 'bg-[#EEF2FF] text-[#4F46E5]', 
    Admin: 'bg-[#F1F5F9] text-[#475569]', 
    Editor: 'bg-[#F1F5F9] text-[#475569]', 
    Approver: 'bg-[#F1F5F9] text-[#475569]', 
    Viewer: 'bg-[#F1F5F9] text-[#475569]', 
    active: 'bg-[#ECFDF5] text-[#059669]', 
    pending: 'bg-[#FFFBEB] text-[#D97706]', 
  };
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-normal tracking-tight", 
      styles[variant] || styles.Viewer
    )}>
      {children}
      {showCheck && <span className="ml-1 text-[10px]">✓</span>}
    </span>
  );
};

const Avatar = ({ name, color }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-normal shrink-0", color)}>
      {initials}
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, description, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-normal text-slate-900">{title}</h3>
            {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
};

// Dropdown Menu Component
const DropdownMenu = ({ isOpen, onClose, items, anchorEl }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={cn(
              "w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors",
              item.danger ? "text-red-600 hover:bg-red-50" : "text-slate-700"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default function TeamMembersTab() {
  const [members, setMembers] = useState([
    { id: '1', name: 'Subramanian A.', email: 'subramanian@wysync.com', role: 'Owner', status: 'active', lastActive: 'Just now', color: 'bg-[#6366F1]' },
    { id: '2', name: 'Kavitha Raj', email: 'kavitha@wysync.com', role: 'Admin', status: 'active', lastActive: '3h ago', color: 'bg-[#059669]' },
    { id: '3', name: 'Priya Rajan', email: 'priya@wysync.com', role: 'Editor', status: 'active', lastActive: '1d ago', color: 'bg-[#D97706]' },
    { id: '4', name: 'Arun M.', email: 'arun@wysync.com', role: 'Approver', status: 'active', lastActive: '2d ago', color: 'bg-[#8B5CF6]' },
    { id: '5', name: 'Sanjay V.', email: 'sanjay@wysync.com', role: 'Viewer', status: 'pending', lastActive: '—', color: 'bg-[#94A3B8]' },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Editor');
  const [inviteError, setInviteError] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  
  const [showRoleMenu, setShowRoleMenu] = useState(null);
  const [showMemberMenu, setShowMemberMenu] = useState(null);

  // Handle Invite Member
  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      setInviteError('Email is required');
      return;
    }
    if (!inviteEmail.includes('@')) {
      setInviteError('Valid email is required');
      return;
    }
    
    setInviteError('');
    setIsInviting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newMember = {
        id: `member_${Date.now()}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'pending',
        lastActive: '—',
        color: 'bg-[#94A3B8]'
      };
      
      setMembers([...members, newMember]);
      setIsInviting(false);
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('Editor');
      
      alert(`Invitation sent to ${inviteEmail}`);
    }, 800);
  };

  // Handle Resend Invite
  const handleResendInvite = (email, memberId) => {
    alert(`Invitation resent to ${email}`);
    console.log(`[TeamMembersTab] Resent invite to ${email}`);
  };

  // Handle Remove Member
  const handleRemoveMember = (memberId, memberName) => {
    if (window.confirm(`Are you sure you want to remove ${memberName} from the team?`)) {
      setMembers(members.filter(member => member.id !== memberId));
      alert(`${memberName} has been removed from the team`);
    }
  };

  // Handle Change Role
  const handleChangeRole = (memberId, newRole) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
    alert(`Role changed to ${newRole}`);
    setShowRoleMenu(null);
  };

  // Role options for dropdown
  const roleOptions = ['Admin', 'Editor', 'Approver', 'Viewer'];

  return (
    <>
      <div className="bg-white rounded-[16px] border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <h3 className="text-[18px] font-bold text-[#0F172A]">Team Members</h3>
            <p className="text-[13px] text-slate-400 mt-1">{members.length} member{members.length !== 1 ? 's' : ''}</p>
          </div>
          <button 
            onClick={() => setShowInviteModal(true)}
            className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-lg text-sm font-normal flex items-center gap-2 hover:bg-[#4338CA] transition-colors"
          >
            <UserPlusIcon /> Invite Member
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 bg-[#F8FAFC]/50">
  <th className="px-8 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest font-['Plus_Jakarta_Sans']">Member</th>
  <th className="px-4 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest font-['Plus_Jakarta_Sans']">Role</th>
  <th className="px-4 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest font-['Plus_Jakarta_Sans']">Status</th>
  <th className="px-4 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest font-['Plus_Jakarta_Sans']">Last Active</th>
  <th className="px-8 py-4"></th>
</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors relative">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar name={member.name} color={member.color} />
                      <div>
                        <p className="text-[15px] font-medium text-[#0b1220] leading-tight tracking-tight font-['Plus_Jakarta_Sans']">
  {member.name}
</p>
                        <p className="text-[13px] text-slate-400 mt-1 tracking-tight font-['Plus_Jakarta_Sans']">
  {member.email}
</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      {member.role === 'Owner' ? (
                        <Badge variant={member.role}>{member.role}</Badge>
                      ) : (
                        <button
                          onClick={() => setShowRoleMenu(showRoleMenu === member.id ? null : member.id)}
                          className="group flex items-center gap-1 hover:opacity-80"
                        >
                          <Badge variant={member.role}>{member.role}</Badge>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 text-xs">▼</span>
                        </button>
                      )}
                      
                      {showRoleMenu === member.id && member.role !== 'Owner' && (
                        <div className="absolute left-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20">
                          {roleOptions.map(role => (
                            <button
                              key={role}
                              onClick={() => handleChangeRole(member.id, role)}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              {role}
                              {member.role === role && <CheckIcon className="inline ml-2 text-green-500" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={member.status === 'active' ? 'active' : 'pending'} showCheck={member.status === 'active'}>
                      {member.status === 'active' ? 'Active' : 'Invite Pending'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[14px] text-slate-400 font-medium">{member.lastActive}</span>
                  </td>
                  <td className="px-8 py-4 text-right relative">
                    {member.status === 'pending' ? (
                      <button 
                        onClick={() => handleResendInvite(member.email, member.id)}
                        className="text-[13px] font-normal text-[#475569] hover:text-[#0F172A] transition-colors"
                      >
                        Resend
                      </button>
                    ) : member.role !== 'Owner' && (
                      <div className="relative">
                        <button 
                          onClick={() => setShowMemberMenu(showMemberMenu === member.id ? null : member.id)}
                          className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                        >
                          <MoreHorizontalIcon />
                        </button>
                        
                        {showMemberMenu === member.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20">
                            <button
                              onClick={() => handleRemoveMember(member.id, member.name)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Remove Member
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => {
          setShowInviteModal(false);
          setInviteEmail('');
          setInviteRole('Editor');
          setInviteError('');
        }}
        title="Invite Team Member"
        description="They'll receive an email invitation to join your workspace."
        footer={
          <>
            <button
              onClick={() => {
                setShowInviteModal(false);
                setInviteEmail('');
                setInviteRole('Editor');
                setInviteError('');
              }}
              className="px-4 py-2 rounded-lg text-sm font-normal text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              disabled={isInviting}
              className="px-4 py-2 rounded-lg text-sm font-normal bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isInviting && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />}
              Send Invite
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-normal text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className={cn(
                "w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
                inviteError ? "border-red-300" : "border-slate-200"
              )}
            />
            {inviteError && <p className="text-xs text-red-500 mt-1">{inviteError}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-normal text-slate-700 mb-1">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Admin">Admin - Full access to workspace</option>
              <option value="Editor">Editor - Can create and edit</option>
              <option value="Approver">Approver - Can review and approve</option>
              <option value="Viewer">Viewer - Read-only access</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}