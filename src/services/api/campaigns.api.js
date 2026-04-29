import { apiClient } from './client'

export const campaignsApi = {
  getAll: (filters = {}) =>
    apiClient
      .get('/campaigns', { params: filters })
      .then((r) => r.data),

  getById: (id) =>
    apiClient.get(`/campaigns/${id}`).then((r) => r.data),

  create: (dto) =>
    apiClient.post('/campaigns', dto).then((r) => r.data),

  update: (id, dto) =>
    apiClient.patch(`/campaigns/${id}`, dto).then((r) => r.data),

  schedule: (id) =>
    apiClient.patch(`/campaigns/${id}/schedule`).then((r) => r.data),

  pause: (id) =>
    apiClient.patch(`/campaigns/${id}/pause`).then((r) => r.data),

  cancel: (id) =>
    apiClient.patch(`/campaigns/${id}/cancel`).then((r) => r.data),

  duplicate: (id) =>
    apiClient.post(`/campaigns/${id}/duplicate`).then((r) => r.data),

  delete: (id) =>
    apiClient.delete(`/campaigns/${id}`).then((r) => r.data),

  sendTest: (id, email) =>
    apiClient.post(`/campaigns/${id}/send-test`, { email }).then((r) => r.data),

  approve: (id) =>
    apiClient.patch(`/campaigns/${id}/approve`).then((r) => r.data),

  reject: (id, reason) =>
    apiClient.patch(`/campaigns/${id}/reject`, { reason }).then((r) => r.data),

  getAnalytics: (id) =>
    apiClient.get(`/campaigns/${id}/analytics`).then((r) => r.data),

  getRecipients: (id, params) =>
    apiClient
      .get(`/campaigns/${id}/recipients`, { params })
      .then((r) => r.data),

  getEventLog: (id, params) =>
    apiClient
      .get(`/campaigns/${id}/events`, { params })
      .then((r) => r.data),

  getLinkClicks: (id) =>
    apiClient.get(`/campaigns/${id}/links`).then((r) => r.data),

  getCalendar: (params) =>
    apiClient.get('/campaigns/calendar', { params }).then((r) => r.data),
}