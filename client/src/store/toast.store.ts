import { create } from 'zustand'
import type { Toast, ToastStore } from '@lib/types'

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  add: (toast: Omit<Toast, 'id' | 'timerId'>) => {
    const id = crypto.randomUUID()
    const timerId = setTimeout(
      () => {
        get().dismiss(id)
      },
      toast?.duration ? toast.duration - 300 : 3000
    )

    set(state => ({ toasts: [...state.toasts, { ...toast, id, timerId }] }))
  },
  remove: (id: string) => {
    const toast = get().toasts.find(t => t.id === id)
    if (toast) clearTimeout(toast.timerId)
    set(state => ({ toasts: state.toasts.filter(toast => toast.id !== id) }))
  },
  dismiss: (id: string) => {
    set(state => ({
      toasts: state.toasts.map(t =>
        t.id === id ? { ...t, dismissing: true } : t
      ),
    }))
    setTimeout(() => get().remove(id), 300)
  },
}))
