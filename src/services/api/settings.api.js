import { apiClient } from './client'

export const settingsApi = {
  // Sender Identities
  getSenderIdentities: () =>
    apiClient.get('/settings/senders').then((r) => r.data),

  createDomain: (data) =>
    apiClient.post('/settings/senders', data).then((r) => r.data),

  verifyDomain: (id) =>
    apiClient.post(`/settings/senders/${id}/verify`).then((r) => r.data),

  deleteSender: (id) =>
    apiClient.delete(`/settings/senders/${id}`).then((r) => r.data),

  setDefaultSender: (id) =>
    apiClient.patch(`/settings/senders/${id}/set-default`).then((r) => r.data),

  // Team
  getTeamMembers: () =>
    apiClient.get('/settings/team').then((r) => r.data),

  inviteMember: (dto) =>
    apiClient.post('/settings/team/invite', dto).then((r) => r.data),

  updateMemberRole: (memberId, role) =>
    apiClient.patch(`/settings/team/${memberId}/role`, { role }).then((r) => r.data),

  removeMember: (memberId) =>
    apiClient.delete(`/settings/team/${memberId}`).then((r) => r.data),

  resendInvite: (memberId) =>
    apiClient.post(`/settings/team/${memberId}/resend-invite`).then((r) => r.data),

  // API Keys
  getApiKeys: () =>
    apiClient.get('/settings/api-keys').then((r) => r.data),

  createApiKey: (dto) =>
    apiClient.post('/settings/api-keys', dto).then((r) => r.data),

  rotateApiKey: (id) =>
    apiClient.post(`/settings/api-keys/${id}/rotate`).then((r) => r.data),

  deactivateApiKey: (id) =>
    apiClient.patch(`/settings/api-keys/${id}/deactivate`).then((r) => r.data),

  // Webhooks
  getWebhooks: () =>
    apiClient.get('/settings/webhooks').then((r) => r.data),

  createWebhook: (data) =>
    apiClient.post('/settings/webhooks', data).then((r) => r.data),

  deleteWebhook: (id) =>
    apiClient.delete(`/settings/webhooks/${id}`).then((r) => r.data),

  // Billing
  getBillingUsage: () =>
    apiClient.get('/settings/billing').then((r) => r.data),

  // Notification preferences
  updateNotificationPreferences: (prefs) =>
    apiClient.patch('/settings/notifications', prefs).then((r) => r.data),
}