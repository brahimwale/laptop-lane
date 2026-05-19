import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { sampleProducts, categories } from '../data/sampleData'
import ProductCard from '../components/ProductCard'

function Shop() {
  const { category } = useParams()
  const [products, setProducts] = useState(sampleProducts)
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = sampleProducts
    
    if (category) {
      filtered = filtered.filter(p => p.category === category)
    }
    
    // Apply price filter
    if (priceRange === 'under500') {
      filtered = filtered.filter(p => (p.sale_price || p.price) < 500)
    } else if (priceRange === '500to1000') {
      filtered = filtered.filter(p => (p.sale_price || p.price) >= 500 && (p.sale_price || p.price) <= 1000)
    } else if (priceRange === '1000to2000') {
      filtered = filtered.filter(p => (p.sale_price || p.price) >= 1000 && (p.sale_price || p.price) <= 2000)
    } else if (priceRange === 'over2000') {
      filtered = filtered.filter(p => (p.sale_price || p.price) > 2000)
    }
    
    // Apply sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }
    
    setProducts(filtered)
  }, [category, sortBy, priceRange])

  const currentCategory = categories.find(c => c.slug === category)

  return (
    <div className="shop-page">
      {/* Page Header */}
      <div className="shop-header">
        <div className="container">
          <h1>{currentCategory ? currentCategory.name : 'All Products'}</h1>
          <p className="shop-subtitle">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="container shop-content">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${showFilters ? 'open' : ''}`}>
          <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
          
          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="category-list">
              <li>
                <a href="/shop" className={!category ? 'active' : ''}>All Products</a>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <a href={`/shop/${cat.slug}`} className={category === cat.slug ? 'active' : ''}>
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-filters">
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="all" 
                  checked={priceRange === 'all'}
                  onChange={() => setPriceRange('all')}
                />
                All Prices
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="under500" 
                  checked={priceRange === 'under500'}
                  onChange={() => setPriceRange('under500')}
                />
                Under $500
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="500to1000" 
                  checked={priceRange === '500to1000'}
                  onChange={() => setPriceRange('500to1000')}
                />
                $500 - $1,000
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="1000to2000" 
                  checked={priceRange === '1000to2000'}
                  onChange={() => setPriceRange('1000to2000')}
                />
                $1,000 - $2,000
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="over2000" 
                  checked={priceRange === 'over2000'}
                  onChange={() => setPriceRange('over2000')}
                />
                Over $2,000
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Quick Filters</h3>
            <div className="quick-filters">
              <a href="/shop/gaming-laptops" className="filter-tag">Gaming Laptops</a>
              <a href="/shop/business-laptops" className="filter-tag">Business</a>
              <a href="/shop/ultrabooks" className="filter-tag">Ultrabooks</a>
              <a href="/shop/accessories" className="filter-tag">Accessories</a>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="shop-main">
          <div className="shop-toolbar">
            <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
            </button>
            
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="empty-results">
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse all products.</p>
              <a href="/shop" className="btn btn-primary">View All Products</a>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop
