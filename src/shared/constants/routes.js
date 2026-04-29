export const ROUTES = {
  // Auth
  LOGIN: '/login',

  // Dashboard
  DASHBOARD: '/',

  // Contacts
  CONTACTS: '/contacts',
  LISTS: '/contacts/lists',
  SUPPRESSION: '/contacts/suppression',

  // Campaigns
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_DETAIL: (id) => `/campaigns/${id}`,
  CAMPAIGN_CALENDAR: '/campaigns/calendar',
  CAMPAIGN_NEW: '/campaigns/new',

  // Templates
  TEMPLATES: '/templates',
  TEMPLATE_NEW: '/templates/new',
  TEMPLATE_EDIT: (id) => `/templates/${id}/edit`,

  // Analytics
  ANALYTICS: '/analytics',

  // Automation
  AUTOMATION: '/automation',

  // Settings
  SETTINGS: '/settings',
  SETTINGS_TAB: (tab) => `/settings/${tab}`,
}