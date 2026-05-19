import { create } from 'zustand'

export const useToastStore = create((set, get) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = Date.now() + Math.random()
    const newToast = { id, duration: 3000, ...toast }
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }))
    
    if (newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id)
      }, newToast.duration)
    }
    
    return id
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(t => t.id !== id)
    }))
  },
  
  success: (message) => get().addToast({ type: 'success', message }),
  error: (message) => get().addToast({ type: 'error', message }),
  info: (message) => get().addToast({ type: 'info', message }),
  warning: (message) => get().addToast({ type: 'warning', message })
}))