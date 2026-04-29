// ─── User & Workspace Types ───────────────────────────────────────────────────

// TypeScript types and interfaces don't exist in JavaScript
// These are for documentation purposes only

/*
export type UserRole = 'owner' | 'admin' | 'editor' | 'approver' | 'viewer'

export type WorkspacePlan = 'free' | 'starter' | 'growth' | 'pro'

export interface User {
  id: string
  workspaceId: string
  fullName: string
  email: string
  role: UserRole
  avatarUrl?: string
  isActive: boolean
  lastLoginAt: string | null
  invitedByUserId: string | null
  inviteAcceptedAt: string | null
  notificationPreferences: NotificationPreferences
  createdAt: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  plan: WorkspacePlan
  defaultTimezone: string
  defaultSenderName: string
  defaultReplyToEmail: string
  logoUrl?: string
  createdAt: string
}

export interface NotificationPreferences {
  campaignSent: { inApp: boolean; email: boolean }
  approvalRequested: { inApp: boolean; email: boolean }
  campaignFailed: { inApp: boolean; email: boolean }
  highBounceAlert: { inApp: boolean; email: boolean }
  automationError: { inApp: boolean; email: boolean }
  contactImportDone: { inApp: boolean; email: boolean }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  workspace: Workspace
  tokens: AuthTokens
}
*/

// Example user object in JavaScript
const user = {
  id: 'user_123',
  workspaceId: 'ws_456',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin', // 'owner' | 'admin' | 'editor' | 'approver' | 'viewer'
  avatarUrl: 'https://example.com/avatars/john.jpg',
  isActive: true,
  lastLoginAt: '2024-06-15T10:30:00Z',
  invitedByUserId: 'user_001',
  inviteAcceptedAt: '2024-01-01T09:00:00Z',
  notificationPreferences: {
    campaignSent: { inApp: true, email: true },
    approvalRequested: { inApp: true, email: true },
    campaignFailed: { inApp: true, email: false },
    highBounceAlert: { inApp: true, email: true },
    automationError: { inApp: true, email: false },
    contactImportDone: { inApp: true, email: true }
  },
  createdAt: '2024-01-01T00:00:00Z'
};

// Example workspace object in JavaScript
const workspace = {
  id: 'ws_456',
  name: 'Acme Inc',
  slug: 'acme-inc',
  plan: 'growth', // 'free' | 'starter' | 'growth' | 'pro'
  defaultTimezone: 'Asia/Kolkata',
  defaultSenderName: 'Acme Marketing',
  defaultReplyToEmail: 'reply@acme.com',
  logoUrl: 'https://example.com/logos/acme.png',
  createdAt: '2024-01-01T00:00:00Z'
};

// Example notification preferences object
const notificationPreferences = {
  campaignSent: { inApp: true, email: false },
  approvalRequested: { inApp: true, email: true },
  campaignFailed: { inApp: true, email: true },
  highBounceAlert: { inApp: false, email: true },
  automationError: { inApp: true, email: false },
  contactImportDone: { inApp: true, email: true }
};

// Example auth tokens object
const authTokens = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  expiresIn: 3600 // seconds
};

// Example login credentials
const loginCredentials = {
  email: 'user@example.com',
  password: 'secure_password_123'
};

// Example login response
const loginResponse = {
  user: {
    id: 'user_123',
    workspaceId: 'ws_456',
    fullName: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    isActive: true,
    lastLoginAt: null,
    invitedByUserId: null,
    inviteAcceptedAt: null,
    notificationPreferences: {
      campaignSent: { inApp: true, email: true },
      approvalRequested: { inApp: true, email: true },
      campaignFailed: { inApp: true, email: true },
      highBounceAlert: { inApp: true, email: true },
      automationError: { inApp: true, email: true },
      contactImportDone: { inApp: true, email: true }
    },
    createdAt: '2024-06-15T00:00:00Z'
  },
  workspace: {
    id: 'ws_456',
    name: 'My Workspace',
    slug: 'my-workspace',
    plan: 'starter',
    defaultTimezone: 'Asia/Kolkata',
    defaultSenderName: 'My Team',
    defaultReplyToEmail: 'reply@myworkspace.com',
    createdAt: '2024-06-15T00:00:00Z'
  },
  tokens: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    expiresIn: 3600
  }
};

// Example: Updating user notification preferences
const updateNotificationPreferences = {
  campaignFailed: { inApp: true, email: false },
  highBounceAlert: { inApp: false, email: true }
};

// Example: Creating a new workspace
const createWorkspaceDto = {
  name: 'New Company',
  slug: 'new-company',
  plan: 'starter',
  defaultTimezone: 'America/New_York',
  defaultSenderName: 'Company Name',
  defaultReplyToEmail: 'noreply@company.com'
};

// Example: Workspace settings update
const updateWorkspaceDto = {
  name: 'Updated Company Name',
  defaultTimezone: 'Europe/London',
  defaultSenderName: 'Support Team'
};