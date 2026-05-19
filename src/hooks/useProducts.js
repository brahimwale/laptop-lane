import { useState, useEffect, useMemo, useCallback } from 'react'
import { sampleProducts } from '../data/sampleData'

export function useProducts() {
  const [products, setProducts] = useState(sampleProducts)
  const [isLoading, setIsLoading] = useState(false)

  const getProductById = useCallback((id) => {
    return products.find(p => p.id === id)
  }, [products])

  const getProductBySlug = useCallback((slug) => {
    return products.find(p => p.slug === slug)
  }, [products])

  const getProductsByCategory = useCallback((category) => {
    return products.filter(p => p.category === category)
  }, [products])

  const searchProducts = useCallback((query) => {
    if (!query.trim()) return products
    const lowerQuery = query.toLowerCase()
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.specifications && Object.values(p.specifications).some(v => 
        v.toLowerCase().includes(lowerQuery)
      )
    )
  }, [products])

  return {
    products,
    isLoading,
    getProductById,
    getProductBySlug,
    getProductsByCategory,
    searchProducts
  }
}

export function useProductFilters(initialProducts = sampleProducts) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)
  const [filters, setFilters] = useState({
    category: null,
    priceRange: 'all',
    sortBy: 'default',
    search: ''
  })

  const applyFilters = useCallback((products, currentFilters) => {
    let result = [...products]

    if (currentFilters.category) {
      result = result.filter(p => p.category === currentFilters.category)
    }

    if (currentFilters.search) {
      const query = currentFilters.search.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
      )
    }

    if (currentFilters.priceRange !== 'all') {
      switch (currentFilters.priceRange) {
        case 'under500':
          result = result.filter(p => (p.sale_price || p.price) < 500)
          break
        case '500to1000':
          result = result.filter(p => {
            const price = p.sale_price || p.price
            return price >= 500 && price <= 1000
          })
          break
        case '1000to2000':
          result = result.filter(p => {
            const price = p.sale_price || p.price
            return price >= 1000 && price <= 2000
          })
          break
        case 'over2000':
          result = result.filter(p => (p.sale_price || p.price) > 2000)
          break
      }
    }

    switch (currentFilters.sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
        break
      case 'price-high':
        result.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [])

  useEffect(() => {
    setFilteredProducts(applyFilters(initialProducts, filters))
  }, [filters, initialProducts, applyFilters])

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({ category: null, priceRange: 'all', sortBy: 'default', search: '' })
  }, [])

  return {
    filteredProducts,
    filters,
    updateFilter,
    resetFilters
  }
}

export function useRelatedProducts(product, limit = 4) {
  return useMemo(() => {
    if (!product) return []
    return sampleProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit)
  }, [product, limit])
}

export function useProductRecommendations(productId, limit = 8) {
  return useMemo(() => {
    const product = sampleProducts.find(p => p.id === productId)
    if (!product) return []

    const sameCategory = sampleProducts.filter(p => p.category === product.category && p.id !== productId)
    const featured = sampleProducts.filter(p => p.is_featured && p.id !== productId)
    
    const combined = [...sameCategory, ...featured]
    const unique = combined.filter((item, index) => 
      combined.findIndex(i => i.id === item.id) === index
    )
    
    return unique.slice(0, limit)
  }, [productId, limit])
}