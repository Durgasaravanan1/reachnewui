// ─── Campaign Types ───────────────────────────────────────────────────────────

// TypeScript types and interfaces don't exist in JavaScript
// These are for documentation purposes only

/*
export type CampaignChannel = 'email' | 'whatsapp'

export type CampaignStatus =
  | 'draft'
  | 'pending_approval'
  | 'scheduled'
  | 'sending'
  | 'sent'
  | 'completed'
  | 'paused'
  | 'failed'
  | 'cancelled'

export type CampaignGoal =
  | 'promotional'
  | 'transactional'
  | 're_engagement'
  | 'event'
  | 'announcement'

export interface Campaign {
  id: string
  workspaceId: string
  campaignName: string
  channel: CampaignChannel
  status: CampaignStatus
  goalLabel: CampaignGoal | null
  audienceListIds: string[]
  excludeListIds: string[]
  totalRecipients: number
  suppressedRecipients: number
  templateId: string | null
  subjectLine: string | null
  previewText: string | null
  senderIdentityId: string
  senderName: string
  senderEmail: string
  scheduledAt: string | null
  sentAt: string | null
  completedAt: string | null
  timezone: string
  abTestEnabled: boolean
  abVariantBSubject: string | null
  abSplitPercentage: number
  approvedByUserId: string | null
  approvedAt: string | null
  createdByUserId: string
  createdAt: string
  updatedAt: string
}

export interface CampaignFilters {
  status?: CampaignStatus
  channel?: CampaignChannel
  page?: number
  limit?: number
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface CreateCampaignDto {
  campaignName: string
  channel: CampaignChannel
  goalLabel?: CampaignGoal
  audienceListIds: string[]
  excludeListIds?: string[]
  templateId?: string
  subjectLine?: string
  previewText?: string
  senderIdentityId: string
  scheduledAt?: string
  timezone: string
  abTestEnabled?: boolean
  abVariantBSubject?: string
  abSplitPercentage?: number
}

export interface CampaignAnalytics {
  campaignId: string
  sent: number
  delivered: number
  uniqueOpens: number
  uniqueClicks: number
  hardBounces: number
  softBounces: number
  unsubscribes: number
  spamComplaints: number
  deliveryRate: number
  openRate: number
  ctr: number
  ctor: number
  variantA?: Omit<CampaignAnalytics, 'campaignId' | 'variantA' | 'variantB'>
  variantB?: Omit<CampaignAnalytics, 'campaignId' | 'variantA' | 'variantB'>
}

export type CampaignEventType =
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'unsubscribed'
  | 'spam_complaint'

export interface CampaignEvent {
  eventId: string
  campaignId: string
  recipientId: string
  contactId: string
  eventType: CampaignEventType
  eventTimestamp: string
  linkUrl?: string
  linkLabel?: string
  bounceType?: 'soft' | 'hard'
  bounceSubtype?: string
}

export interface CampaignRecipient {
  recipientId: string
  campaignId: string
  contactId: string
  contactName: string
  email?: string
  phone?: string
  variant: 'a' | 'b'
  sendStatus: 'queued' | 'sent' | 'delivered' | 'failed'
  isSuppressed: boolean
  sentAt?: string
  deliveredAt?: string
  lastEvent?: CampaignEventType
  lastEventAt?: string
}

export interface LinkClick {
  linkUrl: string
  linkLabel: string
  totalClicks: number
  uniqueClicks: number
  ctr: number
}
*/

// Example campaign object in JavaScript
const campaign = {
  id: 'camp_123',
  workspaceId: 'ws_456',
  campaignName: 'Summer Sale 2024',
  channel: 'email', // 'email' | 'whatsapp'
  status: 'scheduled', // 'draft' | 'pending_approval' | 'scheduled' | 'sending' | 'sent' | 'completed' | 'paused' | 'failed' | 'cancelled'
  goalLabel: 'promotional', // 'promotional' | 'transactional' | 're_engagement' | 'event' | 'announcement'
  audienceListIds: ['list_1', 'list_2'],
  excludeListIds: ['list_3'],
  totalRecipients: 5000,
  suppressedRecipients: 150,
  templateId: 'tpl_789',
  subjectLine: 'Big Summer Sale!',
  previewText: 'Up to 50% off on all items',
  senderIdentityId: 'sid_123',
  senderName: 'Marketing Team',
  senderEmail: 'marketing@example.com',
  scheduledAt: '2024-06-15T10:00:00Z',
  sentAt: null,
  completedAt: null,
  timezone: 'Asia/Kolkata',
  abTestEnabled: false,
  abVariantBSubject: null,
  abSplitPercentage: 50,
  approvedByUserId: null,
  approvedAt: null,
  createdByUserId: 'user_123',
  createdAt: '2024-06-01T00:00:00Z',
  updatedAt: '2024-06-01T00:00:00Z'
};

// Example campaign filters object
const campaignFilters = {
  status: 'active',
  channel: 'email',
  page: 1,
  limit: 20,
  search: 'summer',
  dateFrom: '2024-06-01',
  dateTo: '2024-06-30'
};

// Example DTO for creating a campaign
const createCampaignDto = {
  campaignName: 'New Campaign',
  channel: 'email',
  goalLabel: 'promotional',
  audienceListIds: ['list_1', 'list_2'],
  excludeListIds: ['list_3'],
  templateId: 'tpl_123',
  subjectLine: 'Check this out!',
  previewText: 'Amazing offers inside',
  senderIdentityId: 'sid_123',
  scheduledAt: '2024-07-01T10:00:00Z',
  timezone: 'Asia/Kolkata',
  abTestEnabled: false,
  abVariantBSubject: null,
  abSplitPercentage: 50
};

// Example campaign analytics
const campaignAnalytics = {
  campaignId: 'camp_123',
  sent: 5000,
  delivered: 4850,
  uniqueOpens: 2500,
  uniqueClicks: 800,
  hardBounces: 50,
  softBounces: 100,
  unsubscribes: 25,
  spamComplaints: 5,
  deliveryRate: 97.0,
  openRate: 50.0,
  ctr: 16.0,
  ctor: 32.0,
  variantA: {
    // A/B test variant data (same structure without campaignId)
    sent: 2500,
    delivered: 2425,
    // ... other metrics
  },
  variantB: {
    // B variant data
    sent: 2500,
    delivered: 2425,
    // ... other metrics
  }
};

// Example campaign event
const campaignEvent = {
  eventId: 'evt_123',
  campaignId: 'camp_123',
  recipientId: 'rcp_456',
  contactId: 'cont_789',
  eventType: 'opened', // 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed' | 'spam_complaint'
  eventTimestamp: '2024-06-15T10:15:00Z',
  linkUrl: 'https://example.com/sale',
  linkLabel: 'Shop Now',
  bounceType: null,
  bounceSubtype: null
};

// Example campaign recipient
const campaignRecipient = {
  recipientId: 'rcp_123',
  campaignId: 'camp_123',
  contactId: 'cont_456',
  contactName: 'John Doe',
  email: 'john@example.com',
  phone: null,
  variant: 'a', // 'a' | 'b'
  sendStatus: 'sent', // 'queued' | 'sent' | 'delivered' | 'failed'
  isSuppressed: false,
  sentAt: '2024-06-15T10:00:00Z',
  deliveredAt: '2024-06-15T10:02:00Z',
  lastEvent: 'opened',
  lastEventAt: '2024-06-15T10:15:00Z'
};

// Example link click analytics
const linkClick = {
  linkUrl: 'https://example.com/sale',
  linkLabel: 'Shop Now',
  totalClicks: 1200,
  uniqueClicks: 800,
  ctr: 12.5
};