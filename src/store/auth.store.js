import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      workspace: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, workspace, accessToken, refreshToken) =>
        set({ user, workspace, accessToken, refreshToken, isAuthenticated: true }),

      setAccessToken: (token) => set({ accessToken: token }),

      clearAuth: () =>
        set({
          user: null,
          workspace: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'wynreach-auth',
      partialize: (state) => ({
        user: state.user,
        workspace: state.workspace,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Derived selectors (prevents re-renders when unrelated state changes)
export const useCurrentUser = () => useAuthStore((s) => s.user)
export const useWorkspace = () => useAuthStore((s) => s.workspace)
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated)
export const useUserRole = () => useAuthStore((s) => s.user?.role ?? 'viewer')