import { create } from 'zustand'

let toastCounter = 0

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  notificationPanelOpen: false,
  activeModal: null,
  toasts: [],

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  toggleNotifPanel: () =>
    set((s) => ({ notificationPanelOpen: !s.notificationPanelOpen })),
  closeNotifPanel: () => set({ notificationPanelOpen: false }),

  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),

  addToast: (toast) => {
    const id = `toast-${++toastCounter}`
    const duration = toast.duration ?? 4000
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
    if (duration > 0) {
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
      }, duration)
    }
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

// Helper hook for adding toasts from anywhere
export const useToast = () => useUIStore((s) => s.addToast)