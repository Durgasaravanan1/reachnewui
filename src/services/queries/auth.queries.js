import { useMutation, useQuery } from '@tanstack/react-query'
import { authApi } from '@/services/api/auth.api'
import { useAuthStore } from '@/store/auth.store'

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth)
  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.workspace, data.tokens.accessToken, data.tokens.refreshToken)
    },
  })
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth)
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => clearAuth(),
  })
}

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn:  () => authApi.getMe(),
    enabled:  isAuthenticated,
    staleTime: 5 * 60000,
  })
}