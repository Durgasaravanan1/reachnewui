// ─── Settings Types ───────────────────────────────────────────────────────────

// TypeScript types and interfaces don't exist in JavaScript
// These are for documentation purposes only

/*
import type { UserRole } from './user.types'

export type DkimStatus = 'unverified' | 'pending' | 'verified' | 'failed'
export type SpfStatus = 'unverified' | 'pending' | 'verified' | 'failed'
export type WhatsAppApiStatus = 'unregistered' | 'pending' | 'active' | 'suspended'
export type InviteStatus = 'pending' | 'accepted' | 'expired'

export type ApiKeyScope =
  | 'contacts:read'
  | 'contacts:write'
  | 'campaigns:read'
  | 'analytics:read'
  | 'webhooks:manage'

export interface SenderIdentity {
  id: string
  workspaceId: string
  channel: 'email' | 'whatsapp'
  senderName: string
  emailAddress: string | null
  emailDomain: string | null
  dkimStatus: DkimStatus
  spfStatus: SpfStatus
  whatsappPhoneNumber: string | null
  whatsappAccountName: string | null
  whatsappApiStatus: WhatsAppApiStatus
  approvedTemplateCount: number
  isDefault: boolean
  createdAt: string
  verifiedAt: string | null
}

export interface TeamMember {
  id: string
  workspaceId: string
  userId: string
  fullName: string
  email: string
  role: UserRole
  status: 'active' | 'inactive'
  inviteStatus: InviteStatus
  lastActiveAt: string | null
  invitedAt: string
}

export interface InviteMemberDto {
  email: string
  role: UserRole
}

export interface ApiKey {
  id: string
  workspaceId: string
  keyName: string
  keyPrefix: string
  scopes: ApiKeyScope[]
  rateLimitPerHour: number
  createdByUserId: string
  createdAt: string
  lastUsedAt: string | null
  expiresAt: string | null
  isActive: boolean
}

export interface CreateApiKeyDto {
  keyName: string
  scopes: ApiKeyScope[]
  rateLimitPerHour?: number
  expiresAt?: string
}

export interface ApiKeyCreatedResponse {
  apiKey: ApiKey
  plainTextKey: string // Only returned once
}

export interface WebhookEndpoint {
  id: string
  workspaceId: string
  url: string
  events: string[]
  isActive: boolean
  lastDeliveryAt: string | null
  createdAt: string
}

export interface BillingUsage {
  plan: string
  planDisplayName: string
  monthlyPrice: number
  currency: string
  renewsAt: string
  emailsSentThisPeriod: number
  emailsLimit: number
  whatsappSentThisPeriod: number
  whatsappLimit: number
  contactsStored: number
  contactsLimit: number
  teamMembersCount: number
  teamMembersLimit: number
}
*/

// Example sender identity object in JavaScript
const senderIdentity = {
  id: 'sid_123',
  workspaceId: 'ws_456',
  channel: 'email', // 'email' | 'whatsapp'
  senderName: 'Marketing Team',
  emailAddress: 'marketing@example.com',
  emailDomain: 'example.com',
  dkimStatus: 'verified', // 'unverified' | 'pending' | 'verified' | 'failed'
  spfStatus: 'verified', // 'unverified' | 'pending' | 'verified' | 'failed'
  whatsappPhoneNumber: null,
  whatsappAccountName: null,
  whatsappApiStatus: 'unregistered', // 'unregistered' | 'pending' | 'active' | 'suspended'
  approvedTemplateCount: 12,
  isDefault: true,
  createdAt: '2024-01-01T00:00:00Z',
  verifiedAt: '2024-01-02T10:00:00Z'
};

// Example team member object
const teamMember = {
  id: 'tm_123',
  workspaceId: 'ws_456',
  userId: 'user_789',
  fullName: 'John Doe',
  email: 'john@example.com',
  role: 'admin', // 'owner' | 'admin' | 'editor' | 'approver' | 'viewer'
  status: 'active', // 'active' | 'inactive'
  inviteStatus: 'accepted', // 'pending' | 'accepted' | 'expired'
  lastActiveAt: '2024-06-15T14:30:00Z',
  invitedAt: '2024-06-01T09:00:00Z'
};

// Example DTO for inviting a team member
const inviteMemberDto = {
  email: 'newmember@example.com',
  role: 'editor'
};

// Example API key object
const apiKey = {
  id: 'ak_123',
  workspaceId: 'ws_456',
  keyName: 'Production API Key',
  keyPrefix: 'wr_abc123',
  scopes: ['contacts:read', 'contacts:write', 'campaigns:read'], // 'contacts:read' | 'contacts:write' | 'campaigns:read' | 'analytics:read' | 'webhooks:manage'
  rateLimitPerHour: 1000,
  createdByUserId: 'user_789',
  createdAt: '2024-06-01T00:00:00Z',
  lastUsedAt: '2024-06-15T12:00:00Z',
  expiresAt: '2024-12-31T23:59:59Z',
  isActive: true
};

// Example DTO for creating an API key
const createApiKeyDto = {
  keyName: 'Development Key',
  scopes: ['contacts:read', 'analytics:read'],
  rateLimitPerHour: 500,
  expiresAt: '2024-12-31T23:59:59Z'
};

// Example API key created response (includes plain text key once)
const apiKeyCreatedResponse = {
  apiKey: {
    id: 'ak_123',
    workspaceId: 'ws_456',
    keyName: 'New API Key',
    keyPrefix: 'wr_xyz789',
    scopes: ['contacts:read'],
    rateLimitPerHour: 100,
    createdByUserId: 'user_123',
    createdAt: '2024-06-15T10:00:00Z',
    lastUsedAt: null,
    expiresAt: null,
    isActive: true
  },
  plainTextKey: 'wr_xyz789_abc123def456...' // Only returned once at creation
};

// Example webhook endpoint object
const webhookEndpoint = {
  id: 'wh_123',
  workspaceId: 'ws_456',
  url: 'https://myapp.com/webhooks/wynreach',
  events: ['campaign.sent', 'contact.created', 'campaign.opened'],
  isActive: true,
  lastDeliveryAt: '2024-06-15T15:00:00Z',
  createdAt: '2024-06-01T00:00:00Z'
};

// Example billing usage object
const billingUsage = {
  plan: 'professional',
  planDisplayName: 'Professional Plan',
  monthlyPrice: 9900,
  currency: 'INR',
  renewsAt: '2024-07-01T00:00:00Z',
  emailsSentThisPeriod: 45000,
  emailsLimit: 50000,
  whatsappSentThisPeriod: 8000,
  whatsappLimit: 10000,
  contactsStored: 12500,
  contactsLimit: 15000,
  teamMembersCount: 5,
  teamMembersLimit: 10
};

// Example: Creating a new sender identity
const createSenderIdentityDto = {
  channel: 'email',
  senderName: 'Support Team',
  emailAddress: 'support@example.com',
  emailDomain: 'example.com'
};

// Example: Updating suppression with team member
const updateSuppressionDto = {
  removedByUserId: 'user_123',
  removalNote: 'User requested removal from suppression list'
};