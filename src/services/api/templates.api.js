import { apiClient } from './client'

export const templatesApi = {
  getAll: (filters = {}) =>
    apiClient
      .get('/templates', { params: filters })
      .then((r) => r.data),

  getById: (id) =>
    apiClient.get(`/templates/${id}`).then((r) => r.data),

  create: (dto) =>
    apiClient.post('/templates', dto).then((r) => r.data),

  update: (id, dto) =>
    apiClient.patch(`/templates/${id}`, dto).then((r) => r.data),

  duplicate: (id) =>
    apiClient.post(`/templates/${id}/duplicate`).then((r) => r.data),

  archive: (id) =>
    apiClient.patch(`/templates/${id}/archive`).then((r) => r.data),

  delete: (id) =>
    apiClient.delete(`/templates/${id}`).then((r) => r.data),

  submitForMetaApproval: (id) =>
    apiClient.post(`/templates/${id}/submit-meta`).then((r) => r.data),
}