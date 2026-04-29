// ─── List & Suppression Types ─────────────────────────────────────────────────

// TypeScript interfaces don't exist in JavaScript
// These are for documentation purposes only

/*
export interface AudienceList {
  id: string
  workspaceId: string
  listName: string
  description: string | null
  contactCount: number
  emailEligibleCount: number
  whatsappEligibleCount: number
  isDynamic: boolean
  isArchived: boolean
  linkedCampaignCount: number
  createdByUserId: string
  createdAt: string
  updatedAt: string
}

export interface CreateListDto {
  listName: string
  description?: string
}

export interface ContactListMembership {
  contactId: string
  listId: string
  addedAt: string
  addedByUserId: string
}

export type SuppressionReason =
  | 'unsubscribed'
  | 'hard_bounce'
  | 'spam_complaint'
  | 'manual_blacklist'
  | 'opted_out'

export type SuppressionSource = 'campaign_event' | 'manual' | 'import'

export type SuppressionChannel = 'email' | 'whatsapp' | 'both'

export interface SuppressionEntry {
  id: string
  workspaceId: string
  channel: SuppressionChannel
  email: string | null
  phone: string | null
  reason: SuppressionReason
  source: SuppressionSource
  campaignId: string | null
  campaignName?: string
  addedByUserId: string | null
  addedByName?: string
  addedAt: string
  removedAt: string | null
  removedByUserId: string | null
  removalNote: string | null
}

export interface SuppressionFilters {
  search?: string
  reason?: SuppressionReason
  channel?: SuppressionChannel
  page?: number
  limit?: number
}
*/

// Example audience list object in JavaScript
const audienceList = {
  id: 'list_123',
  workspaceId: 'ws_456',
  listName: 'Newsletter Subscribers',
  description: 'Users who opted in for weekly newsletter',
  contactCount: 15000,
  emailEligibleCount: 14800,
  whatsappEligibleCount: 5000,
  isDynamic: false,
  isArchived: false,
  linkedCampaignCount: 5,
  createdByUserId: 'user_123',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-06-01T10:30:00Z'
};

// Example DTO for creating a list
const createListDto = {
  listName: 'New Marketing List',
  description: 'Contacts interested in CFD courses'
};

// Example contact list membership
const contactListMembership = {
  contactId: 'cont_789',
  listId: 'list_123',
  addedAt: '2024-06-15T10:00:00Z',
  addedByUserId: 'user_456'
};

// Example suppression entry object in JavaScript
const suppressionEntry = {
  id: 'supp_123',
  workspaceId: 'ws_456',
  channel: 'email', // 'email' | 'whatsapp' | 'both'
  email: 'unsubscribed@example.com',
  phone: null,
  reason: 'unsubscribed', // 'unsubscribed' | 'hard_bounce' | 'spam_complaint' | 'manual_blacklist' | 'opted_out'
  source: 'campaign_event', // 'campaign_event' | 'manual' | 'import'
  campaignId: 'camp_789',
  campaignName: 'Summer Newsletter',
  addedByUserId: 'system',
  addedByName: 'System',
  addedAt: '2024-06-10T15:30:00Z',
  removedAt: null,
  removedByUserId: null,
  removalNote: null
};

// Example suppression entry with removal info
const removedSuppressionEntry = {
  id: 'supp_456',
  workspaceId: 'ws_456',
  channel: 'both',
  email: 'blocked@example.com',
  phone: '9876543210',
  reason: 'manual_blacklist',
  source: 'manual',
  campaignId: null,
  campaignName: null,
  addedByUserId: 'user_123',
  addedByName: 'Admin User',
  addedAt: '2024-05-01T09:00:00Z',
  removedAt: '2024-06-01T14:00:00Z',
  removedByUserId: 'user_123',
  removalNote: 'User requested removal from blacklist'
};

// Example suppression filters
const suppressionFilters = {
  search: 'example.com',
  reason: 'unsubscribed',
  channel: 'email',
  page: 1,
  limit: 20
};

// Example: Adding a contact to a list
const addToListOperation = {
  contactId: 'cont_123',
  listId: 'list_456',
  addedByUserId: 'user_789'
};

// Example: Bulk suppression import
const bulkSuppressionImport = {
  entries: [
    { email: 'user1@example.com', channel: 'email', reason: 'unsubscribed' },
    { email: 'user2@example.com', channel: 'email', reason: 'hard_bounce' },
    { phone: '9876543210', channel: 'whatsapp', reason: 'opted_out' }
  ],
  source: 'import',
  addedByUserId: 'user_123'
};