// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Mail, Lock, Zap } from 'lucide-react';

// // ----------------------------- Mock Auth & Data -----------------------------
// const MOCK_USER = {
//   id: 'dev-001',
//   workspaceId: 'ws-001',
//   fullName: 'Subramanian A.',
//   email: 'subramanian@wynsync.com',
//   role: 'owner',
//   isActive: true,
//   lastLoginAt: null,
//   invitedByUserId: null,
//   inviteAcceptedAt: null,
//   notificationPreferences: {
//     campaignSent: { inApp: true, email: true },
//     approvalRequested: { inApp: true, email: true },
//     campaignFailed: { inApp: true, email: true },
//     highBounceAlert: { inApp: true, email: true },
//     automationError: { inApp: true, email: false },
//     contactImportDone: { inApp: true, email: false },
//   },
//   createdAt: new Date().toISOString(),
// };

// const MOCK_WORKSPACE = {
//   id: 'ws-001',
//   name: 'WYNSync',
//   slug: 'wynsync',
//   plan: 'growth',
//   defaultTimezone: 'Asia/Kolkata',
//   defaultSenderName: 'WYNSync Team',
//   defaultReplyToEmail: 'team@wynsync.com',
//   createdAt: new Date().toISOString(),
// };

// // Helper to store auth in localStorage (for persistence)
// const setAuthStorage = (user, workspace, token, refreshToken) => {
//   localStorage.setItem('auth', JSON.stringify({ user, workspace, token, refreshToken }));
// };

// const clearAuthStorage = () => localStorage.removeItem('auth');

// // ----------------------------- UI Components (Tailwind only) -----------------------------
// const Input = ({ label, type = 'text', placeholder, leftAddon, error, autoComplete, ...props }) => {
//   return (
//     <div className="space-y-1">
//       {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
//       <div className="relative">
//         {leftAddon && (
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
//             {leftAddon}
//           </div>
//         )}
//         <input
//           type={type}
//           placeholder={placeholder}
//           autoComplete={autoComplete}
//           className={`
//             w-full rounded-xl border bg-white px-3 py-2.5 text-sm placeholder:text-slate-400
//             focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
//             transition-all
//             ${leftAddon ? 'pl-9' : 'pl-3'}
//             ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200'}
//           `}
//           {...props}
//         />
//       </div>
//       {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//     </div>
//   );
// };

// const Button = ({ children, variant = 'primary', fullWidth = false, loading = false, size = 'md', type = 'button', onClick }) => {
//   const baseClass = "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const sizeClass = size === 'lg' ? 'px-4 py-3 text-sm' : 'px-4 py-2 text-sm';
//   const widthClass = fullWidth ? 'w-full' : '';
//   const variantClass = variant === 'primary'
//     ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500'
//     : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300';

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={loading}
//       className={`${baseClass} ${sizeClass} ${widthClass} ${variantClass}`}
//     >
//       {loading && (
//         <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//         </svg>
//       )}
//       {children}
//     </button>
//   );
// };

// const Alert = ({ children, variant = 'error', className = '' }) => {
//   const variantClass = variant === 'error'
//     ? 'bg-red-50 border-red-200 text-red-700'
//     : 'bg-amber-50 border-amber-200 text-amber-700';
//   return (
//     <div className={`rounded-xl border p-3 text-sm ${variantClass} ${className}`}>
//       {children}
//     </div>
//   );
// };

// // ----------------------------- Zod Schema -----------------------------
// const schema = z.object({
//   email: z.string().email('Enter a valid email address'),
//   password: z.string().min(1, 'Password is required'),
// });

// // ----------------------------- Main Login Component -----------------------------
// export default function LoginPage() {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     // Check localStorage for existing auth
//     return !!localStorage.getItem('auth');
//   });
//   const [authError, setAuthError] = useState(null);
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [showForgot, setShowForgot] = useState(false);
// const [forgotEmail, setForgotEmail] = useState('');
// const [forgotMessage, setForgotMessage] = useState(null);
// const [isSending, setIsSending] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   // If already authenticated, redirect to dashboard or show a simple message
//   if (isAuthenticated) {
//     // In a real app you'd use <Navigate to="/" replace />
//     // Here we simply show a message and a logout button because there's no router.
//     // For a real integration, replace this with your router's redirect.
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8 text-center">
//           <p className="text-green-600 font-medium mb-4">✅ You are already logged in.</p>
//           <button
//             onClick={() => {
//               clearAuthStorage();
//               setIsAuthenticated(false);
//             }}
//             className="text-sm text-indigo-600 hover:underline"
//           >
//             Log out
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // const handleDevLogin = () => {
//   //   setAuthStorage(MOCK_USER, MOCK_WORKSPACE, 'dev-token', 'dev-refresh');
//   //   setIsAuthenticated(true);
//   //   setAuthError(null);
//   // };
//   const handleDevLogin = () => {
//   if (!import.meta.env.DEV) return;

//   setAuthStorage(MOCK_USER, MOCK_WORKSPACE, 'dev-token', 'dev-refresh');
//   setIsAuthenticated(true);
//   setAuthError(null);
// };
// const handleForgotPassword = () => {
//   setIsSending(true);
//   setForgotMessage(null);

//   setTimeout(() => {
//     if (forgotEmail) {
//       setForgotMessage('Reset link sent to your email');
//     } else {
//       setForgotMessage('Please enter a valid email');
//     }
//     setIsSending(false);
//   }, 800);
// };

//   const handleRealLogin = (data) => {
//     setIsLoggingIn(true);
//     setAuthError(null);

//     // Simulate API call
//     setTimeout(() => {
//       // Accept any email/password for demo (since no backend)
//       if (data.email && data.password) {
//         setAuthStorage(MOCK_USER, MOCK_WORKSPACE, 'real-token', 'real-refresh');
//         setIsAuthenticated(true);
//       } else {
//         setAuthError('Invalid email or password');
//       }
//       setIsLoggingIn(false);
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-sm">
//         <div className="text-center mb-8">
//           <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4">
//             <Mail className="h-6 w-6 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WYNReach</h1>
//           <p className="text-sm text-slate-500 mt-1">Sign in to your workspace</p>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8">
//           {/* DEV BYPASS */}
//           {/* <div className="mb-5">
//             <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 mb-3 text-left">
//               <p className="text-xs font-bold text-amber-700 mb-0.5">🔧 Development Mode</p>
//               <p className="text-xs text-amber-600">No backend needed. Click below to enter with a mock Owner account.</p>
//             </div>
//             <button
//               type="button"
//               onClick={handleDevLogin}
//               className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
//             >
//               <Zap className="h-4 w-4" />
//               Enter App — Dev Login (No Password)
//             </button> */}
//             {import.meta.env.DEV && (
//   <div className="mb-5">
//     <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 mb-3 text-left">
//       <p className="text-xs font-bold text-amber-700 mb-0.5">🔧 Development Mode</p>
//       <p className="text-xs text-amber-600">No backend needed. Click below to enter with a mock Owner account.</p>
//     </div>
//     <button
//       type="button"
//       onClick={handleDevLogin}
//       className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
//     >
//       <Zap className="h-4 w-4" />
//       Enter App — Dev Login (No Password)
//     </button>

//     <div className="flex items-center gap-2 my-4">
//       <div className="flex-1 h-px bg-slate-200" />
//       <span className="text-xs text-slate-400">or use real credentials</span>
//       <div className="flex-1 h-px bg-slate-200" />
//     </div>
//   </div>
// )}
//             {/* <div className="flex items-center gap-2 my-4">
//               <div className="flex-1 h-px bg-slate-200" />
//               <span className="text-xs text-slate-400">or use real credentials</span>
//               <div className="flex-1 h-px bg-slate-200" />
//             </div> */}
          

//           {authError && <Alert variant="error" className="mb-5">{authError}</Alert>}

//          {!showForgot ? (
//   <form onSubmit={handleSubmit(handleRealLogin)} className="space-y-4">
//     <Input
//       label="Email"
//       type="email"
//       placeholder="you@company.com"
//       leftAddon={<Mail className="h-3.5 w-3.5" />}
//       error={errors.email?.message}
//       autoComplete="email"
//       {...register('email')}
//     />

//     <Input
//       label="Password"
//       type="password"
//       placeholder="••••••••"
//       leftAddon={<Lock className="h-3.5 w-3.5" />}
//       error={errors.password?.message}
//       autoComplete="current-password"
//       {...register('password')}
//     />

//     <div className="text-right">
//       <button
//         type="button"
//         onClick={() => setShowForgot(true)}
//         className="text-xs text-indigo-600 hover:underline"
//       >
//         Forgot password?
//       </button>
//     </div>

//     <Button type="submit" fullWidth loading={isLoggingIn} size="lg">
//       Sign in
//     </Button>
//   </form>
// ) : (
//   <div className="space-y-4">
//     <Input
//       label="Enter your email"
//       type="email"
//       placeholder="you@company.com"
//       value={forgotEmail}
//       onChange={(e) => setForgotEmail(e.target.value)}
//     />

//     {forgotMessage && (
//       <Alert variant="warning">{forgotMessage}</Alert>
//     )}

//     <Button onClick={handleForgotPassword} fullWidth loading={isSending}>
//       Send Reset Link
//     </Button>

//     <button
//       onClick={() => setShowForgot(false)}
//       className="text-xs text-slate-500 hover:underline w-full text-center"
//     >
//       Back to login
//     </button>
//   </div>
// )}
//         </div>

//         <p className="text-center text-xs text-slate-400 mt-6">© 2026 WYNSync · Privacy · Terms</p>
//       </div>
//    </div>
//   );
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Zap } from 'lucide-react';

// ----------------------------- Mock Auth & Data -----------------------------
const MOCK_USER = {
  id: 'dev-001',
  workspaceId: 'ws-001',
  fullName: 'Subramanian A.',
  email: 'subramanian@wynsync.com',
  role: 'owner',
  isActive: true,
};

const MOCK_WORKSPACE = {
  id: 'ws-001',
  name: 'WYNSync',
  slug: 'wynsync',
  plan: 'growth',
};

// ----------------------------- LocalStorage Helpers -----------------------------
const setAuthStorage = (user, workspace, token, refreshToken) => {
  localStorage.setItem(
    'auth',
    JSON.stringify({
      user,
      workspace,
      token,
      refreshToken,
    })
  );
};

const clearAuthStorage = () => {
  localStorage.removeItem('auth');
};

// ----------------------------- Reusable Components -----------------------------
const Input = ({
  label,
  type = 'text',
  placeholder,
  leftAddon,
  error,
  autoComplete,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {leftAddon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leftAddon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`
            w-full rounded-xl border bg-white px-3 py-2.5 text-sm
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500/20
            focus:border-indigo-500 transition-all
            ${leftAddon ? 'pl-9' : 'pl-3'}
            ${
              error
                ? 'border-red-300'
                : 'border-slate-200'
            }
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

const Button = ({
  children,
  type = 'button',
  fullWidth = false,
  loading = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-bold transition-all
        px-4 py-3 text-sm
        bg-gradient-to-r from-indigo-600 to-violet-600
        text-white hover:opacity-90
        disabled:opacity-50
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>

          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0
               C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}

      {children}
    </button>
  );
};

const Alert = ({ children }) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {children}
    </div>
  );
};

// ----------------------------- Validation -----------------------------
const schema = z.object({
  email: z.string().email('Enter valid email'),
  password: z.string().min(1, 'Password is required'),
});

// ----------------------------- Main Component -----------------------------
export default function LoginPage() {
  const navigate = useNavigate();

  const [authError, setAuthError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ----------------------------- DEV LOGIN -----------------------------
  const handleDevLogin = () => {
    setAuthStorage(
      MOCK_USER,
      MOCK_WORKSPACE,
      'dev-token',
      'dev-refresh'
    );

    navigate('/', { replace: true });
  };

  // ----------------------------- REAL LOGIN -----------------------------
  const handleRealLogin = (data) => {
    setIsLoggingIn(true);
    setAuthError(null);

    setTimeout(() => {
      if (data.email && data.password) {
        setAuthStorage(
          MOCK_USER,
          MOCK_WORKSPACE,
          'real-token',
          'real-refresh'
        );

        navigate('/', { replace: true });
      } else {
        setAuthError('Invalid email or password');
      }

      setIsLoggingIn(false);
    }, 800);
  };

  // ----------------------------- FORGOT PASSWORD -----------------------------
  const handleForgotPassword = () => {
    setIsSending(true);

    setTimeout(() => {
      if (forgotEmail) {
        setForgotMessage(
          'Reset link sent to your email'
        );
      } else {
        setForgotMessage(
          'Please enter valid email'
        );
      }

      setIsSending(false);
    }, 800);
  };

  // ----------------------------- UI -----------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4">
            <Mail className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            WYNReach
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Sign in to your workspace
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">

          {/* DEV MODE */}
          {import.meta.env.DEV && (
            <div className="mb-5">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 mb-3">
                <p className="text-xs font-bold text-amber-700">
                  🔧 Development Mode
                </p>

                <p className="text-xs text-amber-600 mt-1">
                  Login instantly without backend
                </p>
              </div>

              <button
                type="button"
                onClick={handleDevLogin}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-bold text-white hover:opacity-90"
              >
                <Zap className="h-4 w-4" />
                Enter App — Dev Login
              </button>

              <div className="flex items-center gap-2 my-4">
                <div className="flex-1 h-px bg-slate-200"></div>

                <span className="text-xs text-slate-400">
                  or
                </span>

                <div className="flex-1 h-px bg-slate-200"></div>
              </div>
            </div>
          )}

          {authError && (
            <Alert>{authError}</Alert>
          )}

          {/* LOGIN FORM */}
          {!showForgot ? (
            <form
              onSubmit={handleSubmit(handleRealLogin)}
              className="space-y-4"
            >
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                leftAddon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftAddon={<Lock className="h-4 w-4" />}
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                fullWidth
                loading={isLoggingIn}
              >
                Sign in
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Input
                label="Enter your email"
                type="email"
                value={forgotEmail}
                onChange={(e) =>
                  setForgotEmail(e.target.value)
                }
              />

              {forgotMessage && (
                <Alert>{forgotMessage}</Alert>
              )}

              <Button
                onClick={handleForgotPassword}
                fullWidth
                loading={isSending}
              >
                Send Reset Link
              </Button>

              <button
                onClick={() => setShowForgot(false)}
                className="text-xs text-slate-500 hover:underline w-full text-center"
              >
                Back to login
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 WYNSync · Privacy · Terms
        </p>
      </div>
    </div>
  );
}