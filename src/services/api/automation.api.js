import { apiClient } from './client'

export const automationApi = {
  getAll: () =>
    apiClient.get('/workflows').then((r) => r.data),

  getById: (id) =>
    apiClient.get(`/workflows/${id}`).then((r) => r.data),

  create: (dto) =>
    apiClient.post('/workflows', dto).then((r) => r.data),

  update: (id, dto) =>
    apiClient.patch(`/workflows/${id}`, dto).then((r) => r.data),

  activate: (id) =>
    apiClient.patch(`/workflows/${id}/activate`).then((r) => r.data),

  pause: (id) =>
    apiClient.patch(`/workflows/${id}/pause`).then((r) => r.data),

  duplicate: (id) =>
    apiClient.post(`/workflows/${id}/duplicate`).then((r) => r.data),

  delete: (id) =>
    apiClient.delete(`/workflows/${id}`).then((r) => r.data),

  getActivityLog: (id, params) =>
    apiClient
      .get(`/workflows/${id}/logs`, { params })
      .then((r) => r.data),
}