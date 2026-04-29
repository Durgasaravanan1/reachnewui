import { apiClient } from './client'

export const listsApi = {
  getAll: () =>
    apiClient.get('/lists').then((r) => r.data),

  getById: (id) =>
    apiClient.get(`/lists/${id}`).then((r) => r.data),

  create: (dto) =>
    apiClient.post('/lists', dto).then((r) => r.data),

  update: (id, dto) =>
    apiClient.patch(`/lists/${id}`, dto).then((r) => r.data),

  archive: (id) =>
    apiClient.patch(`/lists/${id}/archive`).then((r) => r.data),

  delete: (id) =>
    apiClient.delete(`/lists/${id}`).then((r) => r.data),

  getContacts: (listId, filters = {}) =>
    apiClient
      .get(`/lists/${listId}/contacts`, { params: filters })
      .then((r) => r.data),

  // Suppression
  getSuppressed: (filters = {}) =>
    apiClient
      .get('/suppression', { params: filters })
      .then((r) => r.data),

  addSuppression: (data) =>
    apiClient.post('/suppression', data).then((r) => r.data),

  removeSuppression: (id, note) =>
    apiClient.delete(`/suppression/${id}`, { data: { note } }).then((r) => r.data),
}