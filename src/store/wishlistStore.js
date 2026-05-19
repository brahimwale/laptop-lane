import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          if (state.items.find(item => item.id === product.id)) {
            return state
          }
          return { items: [...state.items, product] }
        })
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId)
      },
      
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'laptop-lane-wishlist',
      storage: createJSONStorage(() => localStorage)
    }
  )
)