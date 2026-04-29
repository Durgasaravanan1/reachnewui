import axios from 'axios'
import { useAuthStore } from '@/store/auth.store'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// ── Request: attach access token ───────────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Response: handle 401, normalise errors ─────────────────────────────────────
let isRefreshing = false

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (originalRequest?._retry === undefined) {
      originalRequest._retry = false
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        useAuthStore.getState().clearAuth()
        window.location.href = '/login'
        return Promise.reject(error)
      }
      isRefreshing = true
      originalRequest._retry = true

      try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) throw new Error('No refresh token')
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL ?? '/api'}/auth/refresh`, {
          refreshToken,
        })
        useAuthStore.getState().setAccessToken(res.data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
        return apiClient(originalRequest)
      } catch {
        useAuthStore.getState().clearAuth()
        window.location.href = '/login'
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(normaliseError(error))
  }
)

function normaliseError(error) {
  if (error.response?.data?.code) return error.response.data
  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || 'An unexpected error occurred',
  }
}