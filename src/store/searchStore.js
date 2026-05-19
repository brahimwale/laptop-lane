import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useSearchStore = create(
  persist(
    (set, get) => ({
      recentSearches: [],
      searchHistory: [],
      
      addSearch: (query) => {
        if (!query.trim()) return
        
        set((state) => {
          const filtered = state.recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())
          return {
            recentSearches: [query, ...filtered].slice(0, 5)
          }
        })
      },
      
      removeSearch: (query) => {
        set((state) => ({
          recentSearches: state.recentSearches.filter(s => s !== query)
        }))
      },
      
      clearSearchHistory: () => set({ recentSearches: [] })
    }),
    {
      name: 'laptop-lane-search',
      storage: createJSONStorage(() => localStorage)
    }
  )
)