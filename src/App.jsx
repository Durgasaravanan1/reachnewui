


// // App.jsx – Single entry point with routing
// import { lazy, Suspense } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './app/Layout';         // Your layout component (sidebar, topbar)
// import Providers from './app/Provider';    // Toast provider (no React Query)
// import ProtectedRoute from './shared/components/guards/ProtectedRoute';
// import PageLoader from './shared/components/feedback/PageLoader';

// // ===================== Route constants =====================
// const ROUTES = {
//   LOGIN: '/login',
//   CONTACTS: '/contacts',
//   LISTS: '/lists',
//   SUPPRESSION: '/suppression',
//   CAMPAIGNS: '/campaigns',
//   CAMPAIGN_CALENDAR: '/calendar',
//   CAMPAIGN_NEW: '/campaigns/new',
//   TEMPLATES: '/templates',
//   TEMPLATE_NEW: '/templates/new',
//   ANALYTICS: '/analytics',
//   AUTOMATION: '/automation',
//   SETTINGS: '/settings',
// };

// // ===================== Lazy‑loaded feature pages =====================
// const LoginPage = lazy(() => import('./Features/auth/LoginPage'));
// const DashboardPage = lazy(() => import('./dashboard/DashboardPage'));
// const ContactsPage = lazy(() => import('./contacts/ContactsPage'));
// const ListsPage = lazy(() => import('./contacts/ListsPage'));
// const SuppressionPage = lazy(() => import('./contacts/SuppressionPage'));
// const CampaignsPage = lazy(() => import('./campaigns/CampaignsPage'));
// const CampaignDetailPage = lazy(() => import('./campaigns/CampaignDetailPage'));
// const CampaignCalendarPage = lazy(() => import('./campaigns/CampaignCalendarPage'));
// const WizardShell = lazy(() => import('./campaigns/wizard/WizardShell')); // multi‑step wizard
// const TemplateLibraryPage = lazy(() => import('./templates/TemplateLibraryPage'));
// const TemplateEditorPage = lazy(() => import('./templates/TemplateEditorPage'));
// const AnalyticsPage = lazy(() => import('./Features/Analytics/AnalyticsPage'));
// const AutomationPage = lazy(() => import('./Features/automation/AutomationPage'));
// const SettingsPage = lazy(() => import('./settings/SettingsPage'));

// const Wrap = ({ children }) => (
//   <Suspense fallback={<PageLoader />}>{children}</Suspense>
// );

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Providers>
//         <Routes>
//           {/* Public route */}
//           <Route path={ROUTES.LOGIN} element={<Wrap><LoginPage /></Wrap>} />

//           {/* Protected routes */}
//           <Route element={<ProtectedRoute />}>
//             {/* ✅ App layout (sidebar + topbar) for all pages – including new campaign */}
//             <Route element={<Layout />}>
//               <Route index element={<Wrap><DashboardPage /></Wrap>} />

//               {/* Contacts */}
//               <Route path={ROUTES.CONTACTS} element={<Wrap><ContactsPage /></Wrap>} />
//               <Route path={ROUTES.LISTS} element={<Wrap><ListsPage /></Wrap>} />
//               <Route path={ROUTES.SUPPRESSION} element={<Wrap><SuppressionPage /></Wrap>} />

//               {/* Campaigns */}
//               <Route path={ROUTES.CAMPAIGNS} element={<Wrap><CampaignsPage /></Wrap>} />
//               <Route path={ROUTES.CAMPAIGN_CALENDAR} element={<Wrap><CampaignCalendarPage /></Wrap>} />
//               <Route path="/campaigns/:id" element={<Wrap><CampaignDetailPage /></Wrap>} />
              
//               {/* ✅ NEW: Campaign creation wizard INSIDE the layout */}
//               <Route path={ROUTES.CAMPAIGN_NEW} element={<Wrap><WizardShell /></Wrap>} />

//               {/* Templates */}
//               <Route path={ROUTES.TEMPLATES} element={<Wrap><TemplateLibraryPage /></Wrap>} />
//               <Route path={ROUTES.TEMPLATE_NEW} element={<Wrap><TemplateEditorPage /></Wrap>} />
//               <Route path="/templates/:id/edit" element={<Wrap><TemplateEditorPage /></Wrap>} />

//               {/* Analytics, Automation, Settings */}
//               <Route path={ROUTES.ANALYTICS} element={<Wrap><AnalyticsPage /></Wrap>} />
//               <Route path={ROUTES.AUTOMATION} element={<Wrap><AutomationPage /></Wrap>} />
//               <Route path={ROUTES.SETTINGS} element={<Wrap><SettingsPage /></Wrap>} />
//               <Route path="/settings/:tab" element={<Wrap><SettingsPage /></Wrap>} />

//               {/* 404 fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Route>
//           </Route>
//         </Routes>
//       </Providers>
//     </BrowserRouter>
//   );
// }


// // App.jsx – Single entry point with routing
// import { lazy, Suspense } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './app/Layout';         // Your layout component (sidebar, topbar)
// import Providers from './app/Provider';    // Toast provider (no React Query)
// import ProtectedRoute from './shared/components/guards/ProtectedRoute';
// import PageLoader from './shared/components/feedback/PageLoader';
// import Chatbot from './chatbot/Chatbot';

// // ===================== Route constants =====================
// const ROUTES = {
//   LOGIN: '/login',
//   CONTACTS: '/contacts',
//   LISTS: '/lists',
//   SUPPRESSION: '/suppression',
//   CAMPAIGNS: '/campaigns',
//   CAMPAIGN_CALENDAR: '/calendar',
//   CAMPAIGN_NEW: '/campaigns/new',
//   TEMPLATES: '/templates',
//   TEMPLATE_NEW: '/templates/new',
//   ANALYTICS: '/analytics',
//   AUTOMATION: '/automation',
//   SETTINGS: '/settings',
//   CHATBOT: '/chatbot',           // ✅ new route
// };

// // ===================== Lazy‑loaded feature pages =====================
// const LoginPage = lazy(() => import('./Features/auth/LoginPage'));
// const DashboardPage = lazy(() => import('./dashboard/DashboardPage'));
// const ContactsPage = lazy(() => import('./contacts/ContactsPage'));
// const ListsPage = lazy(() => import('./contacts/ListsPage'));
// const SuppressionPage = lazy(() => import('./contacts/SuppressionPage'));
// const CampaignsPage = lazy(() => import('./campaigns/CampaignsPage'));
// const CampaignDetailPage = lazy(() => import('./campaigns/CampaignDetailPage'));
// const CampaignCalendarPage = lazy(() => import('./campaigns/CampaignCalendarPage'));
// const WizardShell = lazy(() => import('./campaigns/wizard/WizardShell'));
// const TemplateLibraryPage = lazy(() => import('./templates/TemplateLibraryPage'));
// const TemplateEditorPage = lazy(() => import('./templates/TemplateEditorPage'));
// const AnalyticsPage = lazy(() => import('./Features/Analytics/AnalyticsPage'));
// const AutomationPage = lazy(() => import('./Features/automation/AutomationPage'));
// const SettingsPage = lazy(() => import('./settings/SettingsPage'));
// const ChatbotPage = lazy(() => import('./chatbot/Chatbot'));   // ✅ chatbot page

// const Wrap = ({ children }) => (
//   <Suspense fallback={<PageLoader />}>{children}</Suspense>
// );

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Providers>
//         <Routes>
//           {/* Public route */}
//           <Route path={ROUTES.LOGIN} element={<Wrap><LoginPage /></Wrap>} />

//           {/* Protected routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<Layout />}>
//               <Route index element={<Wrap><DashboardPage /></Wrap>} />

//               {/* Contacts */}
//               <Route path={ROUTES.CONTACTS} element={<Wrap><ContactsPage /></Wrap>} />
//               <Route path={ROUTES.LISTS} element={<Wrap><ListsPage /></Wrap>} />
//               <Route path={ROUTES.SUPPRESSION} element={<Wrap><SuppressionPage /></Wrap>} />

//               {/* Campaigns */}
//               <Route path={ROUTES.CAMPAIGNS} element={<Wrap><CampaignsPage /></Wrap>} />
//               <Route path={ROUTES.CAMPAIGN_CALENDAR} element={<Wrap><CampaignCalendarPage /></Wrap>} />
//               <Route path="/campaigns/:id" element={<Wrap><CampaignDetailPage /></Wrap>} />
//               <Route path={ROUTES.CAMPAIGN_NEW} element={<Wrap><WizardShell /></Wrap>} />

//               {/* Templates */}
//               <Route path={ROUTES.TEMPLATES} element={<Wrap><TemplateLibraryPage /></Wrap>} />
//               <Route path={ROUTES.TEMPLATE_NEW} element={<Wrap><TemplateEditorPage /></Wrap>} />
//               <Route path="/templates/:id/edit" element={<Wrap><TemplateEditorPage /></Wrap>} />

//               {/* Analytics, Automation, Chatbot, Settings */}
//               <Route path={ROUTES.ANALYTICS} element={<Wrap><AnalyticsPage /></Wrap>} />
//               <Route path={ROUTES.AUTOMATION} element={<Wrap><AutomationPage /></Wrap>} />
//               <Route path={ROUTES.CHATBOT} element={<Wrap><Chatbot/></Wrap>} />   {/* ✅ */}
//               <Route path={ROUTES.SETTINGS} element={<Wrap><SettingsPage /></Wrap>} />
//               <Route path="/settings/:tab" element={<Wrap><SettingsPage /></Wrap>} />

//               {/* 404 fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Route>
//           </Route>
//         </Routes>
//       </Providers>
//     </BrowserRouter>
//   );
// }



// App.jsx – Single entry point with routing
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './app/Layout';
import Providers from './app/Provider';
import ProtectedRoute from './shared/components/guards/ProtectedRoute';
import PageLoader from './shared/components/feedback/PageLoader';
import Billing from './dashboard/Billing';
import WalletCheckout from './dashboard/WalletCheckout';

// ===================== Route constants =====================
const ROUTES = {
  LOGIN: '/login',
  CONTACTS: '/contacts',
  LISTS: '/lists',
  SUPPRESSION: '/suppression',
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_CALENDAR: '/calendar',
  CAMPAIGN_NEW: '/campaigns/new',
  TEMPLATES: '/templates',
  TEMPLATE_NEW: '/templates/new',
  ANALYTICS: '/analytics',
  AUTOMATION: '/automation',
  SETTINGS: '/settings',
  CHATBOT: '/chatbot',
  BILLING: '/billing',               // ✅ new
  WALLET_CHECKOUT: '/wallet/checkout', // ✅ new
};

// ===================== Lazy‑loaded feature pages =====================
const LoginPage = lazy(() => import('./Features/auth/LoginPage'));
const DashboardPage = lazy(() => import('./dashboard/DashboardPage'));
const ContactsPage = lazy(() => import('./contacts/ContactsPage'));
const ListsPage = lazy(() => import('./contacts/ListsPage'));
const SuppressionPage = lazy(() => import('./contacts/SuppressionPage'));
const CampaignsPage = lazy(() => import('./campaigns/CampaignsPage'));
const CampaignDetailPage = lazy(() => import('./campaigns/CampaignDetailPage'));
const CampaignCalendarPage = lazy(() => import('./campaigns/CampaignCalendarPage'));
const WizardShell = lazy(() => import('./campaigns/wizard/WizardShell'));
const TemplateLibraryPage = lazy(() => import('./templates/TemplateLibraryPage'));
const TemplateEditorPage = lazy(() => import('./templates/TemplateEditorPage'));
const AnalyticsPage = lazy(() => import('./Features/Analytics/AnalyticsPage'));
const AutomationPage = lazy(() => import('./Features/automation/AutomationPage'));
const SettingsPage = lazy(() => import('./settings/SettingsPage'));
const ChatbotPage = lazy(() => import('./chatbot/Chatbot'));

// ✅ New imports for billing, wallet, and 404
const BillingPage = lazy(() => import('./dashboard/Billing'));
const WalletCheckoutPage = lazy(() => import('./dashboard/WalletCheckout'));
const NotFoundPage = lazy(() => import('./dashboard/NotFound'));

const Wrap = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          {/* Public route */}
          <Route path={ROUTES.LOGIN} element={<Wrap><LoginPage /></Wrap>} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Wrap><DashboardPage /></Wrap>} />

              {/* Contacts */}
              <Route path={ROUTES.CONTACTS} element={<Wrap><ContactsPage /></Wrap>} />
              <Route path={ROUTES.LISTS} element={<Wrap><ListsPage /></Wrap>} />
              <Route path={ROUTES.SUPPRESSION} element={<Wrap><SuppressionPage /></Wrap>} />

              {/* Campaigns */}
              <Route path={ROUTES.CAMPAIGNS} element={<Wrap><CampaignsPage /></Wrap>} />
              <Route path={ROUTES.CAMPAIGN_CALENDAR} element={<Wrap><CampaignCalendarPage /></Wrap>} />
              <Route path="/campaigns/:id" element={<Wrap><CampaignDetailPage /></Wrap>} />
              <Route path={ROUTES.CAMPAIGN_NEW} element={<Wrap><WizardShell /></Wrap>} />

              {/* Templates */}
              <Route path={ROUTES.TEMPLATES} element={<Wrap><TemplateLibraryPage /></Wrap>} />
              <Route path={ROUTES.TEMPLATE_NEW} element={<Wrap><TemplateEditorPage /></Wrap>} />
              <Route path="/templates/:id/edit" element={<Wrap><TemplateEditorPage /></Wrap>} />

              {/* Analytics, Automation, Chatbot */}
              <Route path={ROUTES.ANALYTICS} element={<Wrap><AnalyticsPage /></Wrap>} />
              <Route path={ROUTES.AUTOMATION} element={<Wrap><AutomationPage /></Wrap>} />
              <Route path={ROUTES.CHATBOT} element={<Wrap><ChatbotPage /></Wrap>} />

              {/* ✅ Billing & Wallet */}
              <Route path={ROUTES.BILLING} element={<Wrap><Billing/></Wrap>} />
              <Route path={ROUTES.WALLET_CHECKOUT} element={<Wrap><WalletCheckout/></Wrap>} />

              {/* Settings */}
              <Route path={ROUTES.SETTINGS} element={<Wrap><SettingsPage /></Wrap>} />
              <Route path="/settings/:tab" element={<Wrap><SettingsPage /></Wrap>} />

              {/* ✅ 404 Not Found – inside layout */}
              <Route path="*" element={<Wrap><NotFoundPage /></Wrap>} />
            </Route>
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}