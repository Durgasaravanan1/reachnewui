import { apiClient } from './client'

export const authApi = {
  login: (credentials) =>
    apiClient.post('/auth/login', credentials).then((r) => r.data),

  logout: () =>
    apiClient.post('/auth/logout').then((r) => r.data),

  refreshToken: (refreshToken) =>
    apiClient
      .post('/auth/refresh', { refreshToken })
      .then((r) => r.data),

  getMe: () =>
    apiClient.get('/auth/me').then((r) => r.data),
}