import axios from 'axios'
import { useAuthStore } from '../../store/auth.store'

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
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (originalRequest?._retry === undefined) {
      originalRequest._retry = false
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // if (isRefreshing) {
      //   useAuthStore.getState().clearAuth()
      //   window.location.href = '/login'
      //   return Promise.reject(error)
      // }
      if (isRefreshing) {
  return new Promise((resolve, reject) => {
    failedQueue.push({
      resolve: (token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        resolve(apiClient(originalRequest))
      },
      reject: (err) => reject(err),
    })
  })
}
      isRefreshing = true
      originalRequest._retry = true

      try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) throw new Error('No refresh token')
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL ?? '/api'}/auth/refresh`, {
          refreshToken,
        })
        // useAuthStore.getState().setAccessToken(res.data.accessToken)
        // originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
        const newToken = res.data.accessToken
useAuthStore.getState().setAccessToken(newToken)

processQueue(null, newToken)   // ✅ ADD THIS

originalRequest.headers.Authorization = `Bearer ${newToken}`
        return apiClient(originalRequest)
      } catch (err) {
  processQueue(err, null)   // ✅ ADD THIS

  useAuthStore.getState().clearAuth()
  window.location.href = '/login'
  return Promise.reject(err)
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