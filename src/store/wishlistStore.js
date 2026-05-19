import { create } from 'zustand'

export const useWishlistStore = create((set, get) => ({
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
  }
}))
