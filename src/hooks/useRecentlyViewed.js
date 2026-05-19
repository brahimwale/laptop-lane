import { useState, useEffect } from 'react'
import { sampleProducts } from '../data/sampleData'

const STORAGE_KEY = 'laptop-lane-recently-viewed'
const MAX_ITEMS = 10

export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const ids = JSON.parse(stored)
        const products = ids
          .map(id => sampleProducts.find(p => p.id === id))
          .filter(Boolean)
        setRecentProducts(products)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const addToRecentlyViewed = (productId) => {
    setRecentProducts(prev => {
      const filtered = prev.filter(p => p.id !== productId)
      const product = sampleProducts.find(p => p.id === productId)
      if (!product) return prev
      
      const updated = [product, ...filtered].slice(0, MAX_ITEMS)
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map(p => p.id)))
      
      return updated
    })
  }

  const clearRecentlyViewed = () => {
    setRecentProducts([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    recentProducts,
    addToRecentlyViewed,
    clearRecentlyViewed
  }
}