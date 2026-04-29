import { apiClient } from './client'

export const contactsApi = {
  getAll: (filters = {}) =>
    apiClient
      .get('/contacts', { params: filters })
      .then((r) => r.data),

  getById: (id) =>
    apiClient.get(`/contacts/${id}`).then((r) => r.data),

  create: (dto) =>
    apiClient.post('/contacts', dto).then((r) => r.data),

  update: (id, dto) =>
    apiClient.patch(`/contacts/${id}`, dto).then((r) => r.data),

  delete: (id) =>
    apiClient.delete(`/contacts/${id}`).then((r) => r.data),

  bulkDelete: (ids) =>
    apiClient.post('/contacts/bulk-delete', { ids }).then((r) => r.data),

  bulkAddToList: (ids, listId) =>
    apiClient.post('/contacts/bulk-add-to-list', { ids, listId }).then((r) => r.data),

  importCsv: (file, config) => {
    const form = new FormData()
    form.append('file', file)
    form.append('config', JSON.stringify(config))
    return apiClient
      .post('/contacts/import', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data)
  },

  getImportJobStatus: (jobId) =>
    apiClient.get(`/contacts/import/${jobId}`).then((r) => r.data),
}