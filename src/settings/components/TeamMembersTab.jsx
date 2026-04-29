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
import React, { useState, useEffect } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => num?.toLocaleString() || '0';

// Icons
const UserPlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const Button = ({ children, variant, size, leftIcon, onClick, disabled, loading }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
  };
  const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm" };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, sizes[size] || sizes.md)}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const Badge = ({ children, variant }) => {
  const variants = {
    Owner: 'bg-amber-100 text-amber-700',
    Admin: 'bg-indigo-100 text-indigo-700',
    Editor: 'bg-blue-100 text-blue-700',
    Approver: 'bg-purple-100 text-purple-700',
    Viewer: 'bg-slate-100 text-slate-700',
    active: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${variants[variant] || variants.Viewer}`}>
      {children}
    </span>
  );
};

const Modal = ({ open, onClose, title, description, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div><h3 className="text-lg font-bold text-slate-900">{title}</h3>{description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}</div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
};

const Input = ({ label, placeholder, value, onChange, error, type = 'text' }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      className={cn("w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", error ? "border-red-300" : "border-slate-200")} />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, options, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">{label}</label>
    <select value={value} onChange={onChange}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const Skeleton = ({ className }) => <div className={`bg-slate-200 animate-pulse rounded ${className}`} />;

export default function TeamMembersTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([
    { id: '1', name: 'Subramanian A.', email: 'subramanian@wysync.com', role: 'Owner', status: 'active', lastActive: 'just now' },
    { id: '2', name: 'Kavitha Raj', email: 'kavitha@wysync.com', role: 'Admin', status: 'active', lastActive: '3h ago' },
    { id: '3', name: 'Priya Rajan', email: 'priya@wysync.com', role: 'Editor', status: 'active', lastActive: '1d ago' },
    { id: '4', name: 'Arun M.', email: 'arun@wysync.com', role: 'Approver', status: 'active', lastActive: '2d ago' },
    { id: '5', name: 'Sanjay V.', email: 'sanjay@wysync.com', role: 'Viewer', status: 'pending', lastActive: null },
  ]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Editor');
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    console.log('[TeamMembersTab] Loading team members...');
    setTimeout(() => {
      console.log(`[TeamMembersTab] Loaded ${members.length} team members`);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleInvite = () => {
    if (!inviteEmail.trim()) { alert('Email is required'); return; }
    console.log(`[TeamMembersTab] Inviting member: ${inviteEmail} as ${inviteRole}`);
    setIsInviting(true);
    setTimeout(() => {
      console.log('[TeamMembersTab] Invite sent successfully');
      setIsInviting(false);
      setShowInviteModal(false);
      setInviteEmail('');
      alert(`Invitation sent to ${inviteEmail}`);
    }, 800);
  };

  const handleRemoveMember = (memberId, memberName) => {
    console.log(`[TeamMembersTab] Removing member: ${memberName} (${memberId})`);
    alert(`Remove ${memberName} from team? (Demo action)`);
  };

  const handleResendInvite = (email) => {
    console.log(`[TeamMembersTab] Resending invite to: ${email}`);
    alert(`Invite resent to ${email}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex justify-between mb-4"><Skeleton className="h-6 w-32" /><Skeleton className="h-8 w-24" /></div>
        <Skeleton className="h-16 w-full mb-3" /><Skeleton className="h-16 w-full mb-3" /><Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
        <div><h3 className="text-sm font-bold text-slate-900">Team Members</h3><p className="text-xs text-slate-400 mt-0.5">{members.length} members</p></div>
        <Button variant="primary" size="sm" leftIcon={<UserPlusIcon />} onClick={() => setShowInviteModal(true)}>Invite Member</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-100 bg-slate-50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">MEMBER</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">ROLE</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">STATUS</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">LAST ACTIVE</th>
            <th className="px-4 py-3"></th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3"><p className="font-semibold text-slate-800">{member.name}</p><p className="text-xs text-slate-400">{member.email}</p></td>
                <td className="px-4 py-3"><Badge variant={member.role}>{member.role}</Badge></td>
                <td className="px-4 py-3"><Badge variant={member.status === 'active' ? 'active' : 'pending'}>{member.status === 'active' ? 'Active' : 'Invite Pending'}</Badge></td>
                <td className="px-4 py-3 text-xs text-slate-400">{member.lastActive || '—'}</td>
                <td className="px-4 py-3">
                  {member.status === 'pending' ? (
                    <Button variant="ghost" size="sm" onClick={() => handleResendInvite(member.email)}>Resend</Button>
                  ) : member.role !== 'Owner' && (
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.id, member.name)} className="text-red-500">Remove</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showInviteModal} onClose={() => setShowInviteModal(false)} title="Invite Team Member" description="They'll receive an email invitation to join your workspace."
        footer={<><Button variant="secondary" onClick={() => setShowInviteModal(false)}>Cancel</Button><Button variant="primary" loading={isInviting} onClick={handleInvite}>Send Invite</Button></>}>
        <div className="space-y-4">
          <Input label="Email Address" type="email" placeholder="colleague@company.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
          <Select label="Role" options={[{ label: 'Admin', value: 'Admin' }, { label: 'Editor', value: 'Editor' }, { label: 'Approver', value: 'Approver' }, { label: 'Viewer', value: 'Viewer' }]} value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}